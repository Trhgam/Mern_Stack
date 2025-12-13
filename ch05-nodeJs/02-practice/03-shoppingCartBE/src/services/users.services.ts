import User from '~/models/User.schema'
import databaseServices from './database.services'
import { LoginReqBody, RegisterReqBody } from '~/models/request/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { StringValue } from 'ms'
import { TokenType } from '~/constants/enums'
import dotenv from 'dotenv'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
dotenv.config()

class UserServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as StringValue }
    })
  }
  //---------------------------------------------------------
  async register(payLoad: RegisterReqBody) {
    //{ email: string ; password : string }
    const result = await databaseServices.users.insertOne(
      new User({
        ...payLoad,
        date_of_birth: new Date(payLoad.date_of_birth),
        password: hashPassword(payLoad.password) //ghi đè lại date_of_bỉth
      })
    )

    //ký ac and rf. Lấy user id của user vừa tạo để làm token
    const user_id = result.insertedId.toString()
    //ký
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])

    return {
      access_token,
      refresh_token
    }
  }

  async checkEmaiExist(email: string) {
    //promise ở đây

    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }

  async login(payLoad: LoginReqBody) {
    //tìm user sở hữu 2 thông tin email và password
    const user = await databaseServices.users.findOne({
      ...payLoad, //
      password: hashPassword(payLoad.password)
    })
    //nếu không tìm được
    if(!user){
      throw new ErrorWithStatus({
        status : HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message : USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }
    // Nếu có user thì sao ?
    // phải đưa token chứ sao
    // tạo ac và rf token từ id vừa tìm được
    // muốn kí 1 mã phải có user id
    const user_id = user._id.toString();
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])  
    return {
      access_token,
      refresh_token
    }
  
  }
}
const usersServices = new UserServices()
export default usersServices
//What Why How When
