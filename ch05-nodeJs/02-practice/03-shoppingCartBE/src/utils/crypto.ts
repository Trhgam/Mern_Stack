// Hàm mã hóa 1 nội dung bất kì theo chuẩn

import { createHash } from 'crypto'

// SHA256 + digest Hex
function sha256(content: string) {
    return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRECT) //chữ ký bí mật secrectSign
  //phải thêm để bảo mật
}
