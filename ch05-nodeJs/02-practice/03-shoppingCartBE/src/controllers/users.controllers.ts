import { Request, Response } from 'express'

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
