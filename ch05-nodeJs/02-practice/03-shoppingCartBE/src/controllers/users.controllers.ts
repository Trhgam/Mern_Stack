import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import usersServices from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  //kiểm tra
  const { email, password } = req.body
  if (email != 'hehe@gmail.com' || password != '111') {
    return res.status(401).json({
      message: 'UnAnthentication'
    })
  }
  //đóng gói response
  return res.status(200).json({
    message: 'Login Successfully'
  })
}


export const registerController = async (req: Request, res: Response) => {
  //khưi lỗi trong request -  important
  // const error = validationResult(req)
  // if(!error.isEmpty()){
  //   return res.status(400).json({
  //     message : 'Register failed',
  //     error : error.mapped()
  //   })
  // }


  const {email , password} = req.body
  // có lỗi nếu db  cúp điện nên phải bọc catch
  try{
    const isExisted = await usersServices.checkEmaiExist(email)
    if(isExisted){
      const customError = new Error('Email has been used')
      Object.defineProperty(customError, 'message',{
        enumerable:true
      })
      throw customError
    }
  // dữ liệu mà vào đc đến tầng này thì nó đã sạch rồi
  // kiểm tra validator và senidator (data đã đủ và sạch)
  // nhiệm vụ ở đây sẽ kiểm tra logic thôi
  // và

  // * kiểm tra  logic có liên quan đến database đúng của data
  // - kiểm tra email đã có người dùng chưa ?
  // - tạo user mới và lưu trữ
  const result = await usersServices.register({ email , password })
  //đóng gói
  return res.status(200).json({
    message : 'Register Success',
    result
  })
  }catch(error){
    return res.status(400).json({
      message : 'Register failed',
      error
    })
  }


  //* đóng gói response

}
