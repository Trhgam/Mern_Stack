// Lưu những mô tả request chức năng có liên quan đến đối tượng User

import { JwtPayload } from "jsonwebtoken"
import { TokenType } from "~/constants/enums"

// mô tả -> interface
export interface RegisterReqBody {
  email: string
  name: string
  password: string
  confirm_password: string
  date_of_birth: string // chuoi co cau truc ISO8601 ,lưu chuỗi-xử lý date ISO
}
//file này rất quan trọng, nó có thể biến thánh doc để ép ng dùng làm

export interface LoginReqBody {
  email: string
  password: string
}


export interface LogoutReqBody {
  refresh_token: string
}
export interface TokenPayLoad extends JwtPayload{
  user_id : string,
  token_type : TokenType
}

