import jwt from 'jsonwebtoken'
//khi dùng dữ liệu trong env phải import nhge chưa má
import dotenv from 'dotenv'
import { TokenPayLoad } from '~/models/request/User.requests'
dotenv.config()
// tạo ra hàm ký token
// 1 json gồn 3 tp header(thuật toán mã hóa , ngày hết hạn của token)
//                 payLoad
//                 chữ ký
//-------------------------------------------------------------------------------------
// export const signToken = (
//     payload: any,
//     privateKey : string,
//     options: jwt.SignOptions
// ) => {
//     //đừng thiếu return nha chưa má
//     return new Promise<string>((resolve, reject) => {
//         jwt.sign(payload, privateKey, options, function(error, token) {
//             if (error) throw reject(error)
//             return resolve(token as string)
//         })
//     })
// }
//------------------------------------
// export const signToken = (payload: any, privateKey: string, options: jwt.SignOptions) => {
//   //đừng thiếu return nha chưa má
//   return new Promise<string>((resolve, reject) => {
//     jwt.sign(payload, privateKey, options, function (error, token) {
//       if (error) throw reject(error)
//       return resolve(token as string)
//     })
//   })
// }

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: any
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  //đừng thiếu return nha chưa má
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, function (error, token) {
      if (error) throw reject(error)
      return resolve(token as string)
    })
  })
}

signToken


export const verifyToken = ({
  token,
  privateKey = process.env.JWT_SECRET as string
} : {
  token : string
  privateKey? : string
}) => {
  return new Promise<TokenPayLoad>((resolve , reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) throw reject(error)
      resolve(decoded as TokenPayLoad) //đã thay thể từ jwt.JwtPayLoad
    })
  })
}