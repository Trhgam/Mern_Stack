import express from 'express'
import { forgotPasswordController, getMeController, loginController, logoutController, registerController, resendVerifyEmailController, resetPasswordController, updateMeController, verifyEmailController, verifyForgotPasswordController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator
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



/*verify-forgot-password 
des: người dùng bấm vào link trong mail là gửi forgot_password_token cho FE
FE sẽ gửi forgot pasword về BE để kiểm tra verify
trước khi hiển thị giao diện nhập mật khẩu mới 
method: POST
body:{
  forgot_password_token : string
}
*/
usersRouter.post(
  '/verify-forgot-password', //
  forgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordController)
)

/* reset-password
des: người dùng nhập mật kkhaaur mới và gửi về backend để cập nhật
path : /users/reset-password
method : POST
body:{
  forgot_password+token : string,
  password : string,
  confirm_password : string
}

*/
usersRouter.post(
  '/reset-password',
  forgotPasswordTokenValidator, //kiểm tra forgot_password_token có rồi
  resetPasswordValidator, // kiểm tra password , confirm_password
  wrapAsync(resetPasswordController)
)
//login | forgot | reset | test lạmi login

/*getMe
des : lấy thông tin của chính người dùng đang đăng nhập
path : /users/me
method : POST (vì mình phải cho hệ thôgn biết mình là ai )
headers{
  Authentication : 'Bear access_token' (cung cấp access_token để biết mình là ai)

} */
usersRouter.post(
  '/me',//
  accessTokenValidator, //verify_token mình làm rồi
  wrapAsync(getMeController))
//send : gửi nguyên htmlk cho FE để nó hiển thị ra ngoài



/*
des: update profile của user
path: '/me'
method: patch
Header: {Authorization: Bearer <access_token>}
body: {
  name?: string
  date_of_birth?: Date
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional}
*/

usersRouter.patch(
  "/me",
  accessTokenValidator,
  updateMeValidator,
  wrapAsync(updateMeController)
);
export default usersRouter 
