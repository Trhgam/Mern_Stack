import express from 'express'
import usersRouter from './routes/users.routes'
import databaseServices from './services/database.services'
import { defaultErrorHandeler } from './middlewares/error.middleware'
import mediaRouter from './routes/media.routers'
import { initFolder } from './utils/file'

const app = express() //dựng lên server
databaseServices.connect()
initFolder()
// const usersRouter = express.Router()
const PORT = 3000

app.use(express.json()) //trước mọi thứ phải có json //trc khi len server phai chuyen thanh object
//ko co no se bi loi ko the doc

//nếu có ai đó truy cập vào localhost:3000/
// app.get('/', (req, res) => {
//   res.send(`Hello`)
// })

app.use('/users', usersRouter)
app.use('/medias', mediaRouter)
// //
//hệ thống Error Handler Tổng
// app.use((err, req, res, next) => {
//   console.log('Lỗi nè' + err.message)
//   return res.status(err.status).json({ message: err })
// })

app.use(defaultErrorHandeler)

//mở server ở cổng PORT mình thích
app.listen(PORT, () => {
  console.log(`Server đang mở ở localhost: ${PORT}`)
})
