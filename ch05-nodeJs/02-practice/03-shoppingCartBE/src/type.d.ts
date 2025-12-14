import { Request } from 'express';
import { TokenPayLoad } from './models/request/User.requests';


//định nghia lại lại cái gì đó để nó xổ ra , gợi ý code cho mình
// có 2 loại định nghĩa là tạo ra 
// 1 kiểu dữ liệu mới (TokenPayLoad => JwtPayLoad)
// 2 là vô express sửa định nghĩa của nó luôn
// tùy vào cách sử dụng sẽ làm t=khác nhau
declare module 'express' {
    interface Request {
        decoded_authorization? : TokenPayLoad
        decoded_refresh_token? : TokenPayLoad
    }
}