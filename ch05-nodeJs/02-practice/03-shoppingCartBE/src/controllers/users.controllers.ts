import {
  ForgotPasswordReqBody,
  ResetPasswordReqBody,
  UpdateMeReqBody,
  VerifyEmailReqQuery,
  VerifyForgotPasswordReqBody
} from './../models/request/User.requests'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { LoginReqBody, LogoutReqBody, RegisterReqBody, TokenPayLoad } from '~/models/request/User.requests'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core' //quan trọng
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import { USERS_MESSAGES } from '~/constants/messages'
import { UserVerifyStatus } from '~/constants/enums'

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
  const { user_id: user_id_ac } = req.decoded_authorization as TokenPayLoad
  const { user_id: user_id_rf } = req.decoded_refresh_token as TokenPayLoad
  // nếu không khớp user_id thì
  if (user_id_ac !== user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
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

export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, any, VerifyEmailReqQuery>, //
  res: Response
) => {
  //
  // phải định nghia nha
  // lưu ý vị trí của nó nha vìnos là query á
  // ko phải any đâu nha
  // nó là ParsedQs nên cần tìm gốc của nó để định nghĩa import bên file User.request.ts
  // nó giống ParamDictionary đó (yêu cầu kihn nghiệm mới biết đc nên phải nhứo rõ nhaaa)

  // vô
  const { email_verify_token } = req.query
  const { user_id } = req.decoded_email_verify_token as TokenPayLoad

  // kiểm tra xem email_verify_token này có
  // phải thuộc sở hữu của user_id không

  await usersServices.checkEmailVerifyToken({
    user_id,
    email_verify_token
  })
  // nếu ok thì, mình sẽ verify email đó
  // mình sẽ verifyEmail(cập nhật thông tin user
  //thông qua user_id )
  await usersServices.verifyEmail(user_id)
  // thông báo thành công khi ok hết
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS
  })
}

export const resendVerifyEmailController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  //đến đây thì ac đã đc doce
  //đến được tàng này nghxia là mình đã qua được accessTokenValidator
  //có nghxia là có decoded_authorization và trong đó có user_id
  //dùng user_id để tìm user và lấy ra thông tin verify
  //từ đó nếu chưa verify thì gửi mail verify lại
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const verify = await usersServices.getVerifyStatus(user_id) //trong doc sai
  //nếu trạng thái của người dùng verified thì mình không lại link
  if (verify == UserVerifyStatus.Verified) {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  //nếu bị banned thì cũng ko đc gửi
  if (verify == UserVerifyStatus.Banned) {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.ACCOUNT_HAS_BEEN_BANNED
    })
  }
  //nếu chưa verify thì gửi lại link
  if (verify == UserVerifyStatus.Unverified) {
    await usersServices.resendVerifyEmail(user_id)
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS
    })
  }
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response
) => {
  // người ta gửi mail để xin link thì mình phải xem email này
  // có thuộc sở hữu của user nào không
  const { email } = req.body
  const isExisted = await usersServices.checkEmaiExist(email)
  // nếu không có thì báo lỗi
  if (!isExisted) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  // nếu có thì mình mơi tạo forgot_pasword_token và gửi mail
  await usersServices.forgotPassword(email)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.CHECK_YOUR_EMAIL_TO_RESET_PASSWORD
  })
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>, //
  res: Response
) => {
  //mình sẽ kiểm tra xem forgot_password_token có còn thuộc sỡ hữu của
  //user_id hay không
  const { forgot_password_token } = req.body
  const { user_id } = req.decoded_forgot_password_token as TokenPayLoad
  await usersServices.checkForgotPasswordToken({
    user_id,
    forgot_password_token
  })
  //nếu có thì nghĩa là forgot_password_token đã verify
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response
) => {
  //vì người dùng có gửi forgot_password_token
  // nên mình cần kiểm tra xem nó ccos hợp leeej không với user_id không
  const { forgot_password_token, password } = req.body
  const { user_id } = req.decoded_forgot_password_token as TokenPayLoad
  await usersServices.checkForgotPasswordToken({
    user_id,
    forgot_password_token
  })
  // nếu có thì mình tiến hành đổi mặt khẩu
  await usersServices.resetPassword({
    user_id,
    password
  })
  //nếu ok hết thì
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}

export const getMeController = async (req: Request, res: Response) => {
  // kiểm tra xem user_id còn tồn tại không , nếu có thì hiển thị thông tin
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const userInfor = await usersServices.getMe(user_id)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    result: userInfor
  })
  //send : gửi nguyên htmlk cho FE để nó hiển thị ra ngoài thay cho json
}

export const updateMeController = async (req: Request<ParamsDictionary, any, UpdateMeReqBody>, res: Response) => {
  //kiểm tra xem user_id đã verif chưa , nếu có thì mới cho update profile
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const verify = await usersServices.getVerifyStatus(user_id)
  // nếu trạng tái verify của ngươid ùng ko phải là verified  thì mình không cho update pprofile
  if (verify != UserVerifyStatus.Verified) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
      message: USERS_MESSAGES.USER_NOT_VERIFIED
    })
  }

  await usersServices.updateMe({ user_id, payload: req.body })
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPDATE_PROFILE_SUCCESS
  })
}
