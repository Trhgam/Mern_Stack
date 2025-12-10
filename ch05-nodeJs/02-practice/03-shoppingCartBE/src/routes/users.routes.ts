import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
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
usersRouter.post('/login', loginValidator, loginController)

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
  wrapAsync(registerController),
)

export default usersRouter
