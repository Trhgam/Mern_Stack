import express from 'express'
import { forgotPasswordController, loginController, logoutController, registerController, resendVerifyEmailController, verifyEmailController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'

const usersRouter = express.Router()

/*
login
path: /users/login
method: POST
headers | body | params | query string
body:{
    email: string,
    password : string,
}
    loginValidator: kiểm tra tính hợp lệ của email, password
    loginController : kiểm tra database(serrvices) đóng gói kiện hàng
*/
usersRouter.get('/', () => {
  console.log('ahihi')
})
usersRouter.post('/login', loginValidator, wrapAsync(loginController))

/* 
register : dang ki tai khoan
  path : users/register
  method: post
  body : {
    email: string,
    name: string,
    password: string,
    confirm_password: string,
    date_of_birth: ISO8061,
}

*/
usersRouter.post(
  '/register',
  registerValidator, //
  wrapAsync(registerController)
)

/* logout
  path: /users/logout
  mehtod: post
  hedeaders{
    Authorization : 'Bear access_token'
  }
  body:{
    refresh_token : string
  }
*/
usersRouter.post(
  '/logout',
  accessTokenValidator, //
  refreshTokenValidator,
  wrapAsync(logoutController)
)

/*
verify-email
des: người dùng bấm vào link trong email , là gián tiếp 
gửi lại email_verufy_token cho mình thông qua request query
path: /users/verify-email/?email_verify_email : string
query{
  email_verify_email : string
}

*/
// người dùng bấm vào đg link để xd email nên đó là method get thôi á 
usersRouter.get(
  '/verify-email', 
  emailVerifyTokenValidator,// hàm kiểm tra email_verify_email
  wrapAsync(verifyEmailController) //bug ở bậc senior 
)
    
/*resend-verify-email
des : người dùng yêu cầu gửi lại mail verify
path: /users/resend-verify-email
method: post (em muốn gửi lại thì em phải cho anh biết em là ai, gửi vào mail nào)
headers{
  Authorizattion : 'Bear access_token'
}
 */
usersRouter.post(
  '/resend-verify-email',
  accessTokenValidator,
  wrapAsync(resendVerifyEmailController))

//đăng ký , đăng nhập , resend-verify-email , bấm vô link 1 ko đc , link 2 đc 

//-----------------------------------------------------------
/* forgot pasword
des: người dùng quên mật khẩu , yêu cầu gửi mail đặt lại mật khẩue
và nên nhớ rằng lúc này người dùng kkôcfn gì cả ngoài email 
path: post
body:{
  email : string
}

*/

usersRouter.post(
  '/forgot-password', //
  forgotPasswordValidator,// kiểm tra email người dùng gửi lên qua body
  wrapAsync(forgotPasswordController)
)
export default usersRouter
