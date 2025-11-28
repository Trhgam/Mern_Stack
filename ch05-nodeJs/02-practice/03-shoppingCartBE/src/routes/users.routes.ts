import express from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'

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

export default usersRouter
