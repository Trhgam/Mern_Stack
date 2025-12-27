import { pick } from "lodash"
import { Request, Response, NextFunction } from "express"

export const filterMiddlewares = <T>(filterKeys : Array<keyof T>) =>{
  //nhận vào mảng chứa nhưunxg chuỗi key
  // filterKeyslaf mảng chứa chuỗi tên của các key nhằm sàng lọc dât khi user
  // gửi dư , hacker cố ý
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
  // omit loại bỏ
  // pick ngược lại với loại bỏ
  // middleware này sẽ độ lại biến cái ng dùng đưa thành object chỉ chứa các thông tin
  // mà mk muốn lấy , còn lại nó lọai bỏ
}
// dùng Generic ở filterKey để nó có thể spam code cho mk thay vì dùng string[]