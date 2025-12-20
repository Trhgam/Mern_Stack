import User from '~/models/User.schema'
import databaseServices from './database.services'
import { LoginReqBody, RegisterReqBody } from '~/models/request/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { StringValue } from 'ms'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import dotenv from 'dotenv'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'
import RefreshToken from '~/models/RefreshToken.schema'
dotenv.config()

class UserServices {
  private signAccessToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as StringValue }
    })
  }
  //-------------------------------------------------------------
  private signEmailVerifyToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      payload: { user_id, token_type: TokenType.EmailVerificationToken },
      options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN as StringValue }
    })
  }
  //-------------------------------------------------------------------
  private signForgotPasswordToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      payload: { user_id, token_type: TokenType.ForgotPassWordToken },
      options: { expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN as StringValue }
    })
  }
  //---------------------------------------------------------
  async register(payLoad: RegisterReqBody) {
    //{ email: string ; password : string }
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())

    const result = await databaseServices.users.insertOne(
      new User({
        _id: user_id,
        email_verify_token,
        ...payLoad,
        date_of_birth: new Date(payLoad.date_of_birth),
        password: hashPassword(payLoad.password) //ghi đè lại date_of_bỉth
      })
    )

    //ký ac and rf. Lấy user id của user vừa tạo để làm token
    // const user_id = result.insertedId.toString() // thằng này đã đuuwa về string

    //ký
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id.toString()),
      this.signRefreshToken(user_id.toString())
    ])

    // thiếu hành động lưu mã rf vào database
    await databaseServices.refreshTokens.insertOne(
      new RefreshToken({
        // muốn đưa id lên collection phải chuyen ve object
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    // tạo link và gửi qua email
    console.log(`http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}`)

    return {
      access_token,
      refresh_token
    }
  }
  // nhớ viết đúng quy ttắckhi giao tiếp với postman nha , ví dụ / register
  //---------------------------------------------------------

  async checkEmaiExist(email: string) {
    //promise ở đây

    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  // -----------------------------------------------------------------
  async login(payLoad: LoginReqBody) {
    //tìm user sở hữu 2 thông tin email và password
    const user = await databaseServices.users.findOne({
      ...payLoad, //
      password: hashPassword(payLoad.password)
    })
    //nếu không tìm được
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }
    // Nếu có user thì sao ?
    // phải đưa token chứ sao
    // tạo ac và rf token từ id vừa tìm được
    // muốn kí 1 mã phải có user id
    const user_id = user._id.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    // thiếu hành động lưu mã rf vào database
    await databaseServices.refreshTokens.insertOne(
      new RefreshToken({
        // muốn đưa id lên collection phải chuyển về object thì mới lưu được
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    return {
      access_token,
      refresh_token
    }
  }
  //---------------------------------------------------------

  async checkRefreshToken({
    user_id, //
    refresh_token
  }: {
    user_id: string
    refresh_token: string
  }) {
    //tìm refresh token dựa vào 2 thông tin đó
    const refreshToken = await databaseServices.refreshTokens.findOne({
      user_id: new ObjectId(user_id),
      token: refresh_token
    })
    // nếu ko có thì lỗi
    if (!refreshToken) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
      })
    }
    //còn nếu có thì thôi
    return true
  }
  //-----------------------------------------------------------------------------
  async logout(refresh_token: string) {
    //xóa rf dựa vào token
    await databaseServices.refreshTokens.deleteOne({ token: refresh_token })

    return true
  }

  async checkEmailVerifyToken({
    user_id, //
    email_verify_token
  }: {
    user_id: string
    email_verify_token: string
  }) {
    // tìm user từ các thông tuin trên , nếu ko có nghĩa là 2 thông
    // tin trên không khớp
    const user = await databaseServices.users.findOne({
      _id: new ObjectId(user_id), // trong database nó là _id : ObjectId
      email_verify_token
    })
    //nếu không có
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED, // 401
        message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_INVALID
      })
    }
    // nếu có thì thôi ko làm gì cả 
  }

  async verifyEmail(user_id : string){
    await databaseServices.users.updateOne(
      {
        _id : new ObjectId(user_id)
      },[
        {
          $set : {
            verify : UserVerifyStatus.Verified, //1
            email_verify_token : '',
            updated_at: '$$NOW'
          }
        }
      ]
    )
  }
  //
  async getVerifyStatus(user_id : string){
    const user = await databaseServices.users.findOne({_id : new ObjectId(user_id)})
    if(!user){
      throw new ErrorWithStatus({
        status : HTTP_STATUS.NOT_FOUND, //401
        message : USERS_MESSAGES.USER_NOT_FOUND
      })  
    }
    return user.verify // chỉ return trạng thái verify , ko được return user
  }

  async resendVerifyEmail(user_id : string){
    // tạo email_verify_token từ user_id
    const email_verify_token = await this.signEmailVerifyToken(user_id)
    //cập nhật lại email_verify_token vào user
    await databaseServices.users.updateOne(
      {_id : new ObjectId(user_id)},
      [
        {
          $set : {
            email_verify_token,
            updated_at : '$$NOW'
          }
        }
      ]
    )
    // gửi lại link verify qua email (link này lấy trong hàm register)
    console.log(`http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}`)
    
  }

  async forgotPassword(email : string){
    //tìm user thông qua email để lấy user_id
    //từ user_id đó mới tạo được token
    const user = await databaseServices.users.findOne({ email })
    const user_id = user!._id.toString() //đảm bảo có user rồi    | chấm than ngược
    //từ user_id mới tạo được mã forgot_pasword_token
    const forgot_pasword_token = await this.signForgotPasswordToken(user_id)
    //cập nhật forgot_pasword_token vào user
    await databaseServices.users.updateOne(
      {_id : new ObjectId(user_id)},//
      [
        {
          $set : {
            forgot_pasword_token,
            updated_at : '$$NOW'
          }
        }
      ]
    )
    // tạo link 
    console.log(`http://localhost:3000/users/reset-pasword/?forgot_pasword_token=${forgot_pasword_token}`)
    
  }
}


const usersServices = new UserServices()
export default usersServices
//What Why How When
