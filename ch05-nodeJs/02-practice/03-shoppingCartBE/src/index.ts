import express from 'express'
import usersRouter from './routes/users.routes'
import databaseServices from './services/database.services'

const app = express() //dựng lên server
databaseServices.connect()

// const usersRouter = express.Router()
const PORT = 3000

app.use(express.json()) //trước mọi thứ phải có json

//nếu có ai đó truy cập vào localhost:3000/
app.get('/', (req, res) => {
  res.send(`Hello`)
})

app.use('/users', usersRouter)
// //

//mở server ở cổng PORT mình thích
app.listen(PORT, () => {
  console.log(`Server đang mở ở localhost: ${PORT}`)
})


