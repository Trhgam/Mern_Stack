import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { LoginReqBody, LogoutReqBody, RegisterReqBody, TokenPayLoad } from '~/models/request/User.requests'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core' //quan trọng
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import { USERS_MESSAGES } from '~/constants/messages'

// //kiểm tra
// const { email, password } = req.body
// //chua đinh nghia nen ko xo ra 5 prop
// if (email != 'hehe@gmail.com' || password != '111') {
//   return res.status(401).json({
//     message: 'UnAnthentication'
//   })
// }
// //đóng gói response
// return res.status(200).json({
//   message: 'Login Successfully'
// })

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  //cách 2
  // dữ liệu dc gửi lên cho mình thông qua body gồm email và password
  //
  const result = await usersServices.login(req.body)

  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  //khưi lỗi trong request -  important
  // const error = validationResult(req)
  // if(!error.isEmpty()){
  //   return res.status(400).json({
  //     message : 'Register failed',
  //     error : error.mapped()
  //   })
  // }

  // const { email, password } = req.body
  // có lỗi nếu db  cúp điện nên phải bọc catch

  const isExisted = await usersServices.checkEmaiExist(req.body.email)
  if (isExisted) {
    // cách 1 custom lỗi bthg
    // const customError = new Error('Email has been used')
    // Object.defineProperty(customError, 'message', {
    //   enumerable: true
    // })
    // throw customError

    // cách 2 :
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, // 422
      message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS
    })
  }

  // dữ liệu mà vào đc đến tầng này thì nó đã sạch rồi
  // kiểm tra validator và senidator (data đã đủ và sạch)
  // nhiệm vụ ở đây sẽ kiểm tra logic thôi
  // và

  // * kiểm tra  logic có liên quan đến database đúng của data
  // - kiểm tra email đã có người dùng chưa ?
  // - tạo user mới và lưu trữ
  const result = await usersServices.register(req.body) //{email, password}
  //đóng gói
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.REGISTER_SUCCESSFULLY,
    result
  })

  //* đóng gói response
}

//----------------------logout
export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>, // express định nghĩa req này 6 vùng
  res: Response
) => {
  // console.log(req.decoded_authorization)
  // đến đây thì dữ liệu đã sạch và ac và rf đc deccode
  // mình sẽ so sánh 2 user_id trong payload của rf và ac
  const { user_id : user_id_ac } = req.decoded_authorization as TokenPayLoad
  const { user_id : user_id_rf } = req.decoded_refresh_token as TokenPayLoad
  // nếu không khớp user_id thì
  if(user_id_ac !== user_id_rf){
    throw new ErrorWithStatus({
      status : HTTP_STATUS.UNAUTHORIZED,
      message : USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
    })
  }
  //nếu khớp thì
  // kiểm tra (tìm) xem rf còn tồn tại trong database hay không ?
  await usersServices.checkRefreshToken({
    user_id: user_id_rf,
    refresh_token: req.body.refresh_token
  })
  // nếu tồn tại thì tiến hành xóa
  await usersServices.logout(req.body.refresh_token)

  // thông báo thành công
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}
