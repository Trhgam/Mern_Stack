import { Request, Response, NextFunction } from 'express'
import formidable from 'formidable'
import path from 'path'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  // __dirname : cung cấp đường dẫn đến thư mục chứa file
  // console.log(__dirname);

  console.log(path.resolve('uploads'))
  //path cung cấp đường dẫn tính từ thư mục dự án
  //  và nó đang hướng về uploads dù upload không tồn tại
  //  và đây là đường dẫn trong mơ mình muốn lưu trữ hình ảnh

  //tạo 1 tấm lưới lọc file bằng formidable
  const form = formidable({
    maxFiles: 1, //tối đa 1 file /hình
    maxFileSize: 1024 * 300, //300kb kích thước tối đa
    // 1 là 1024 là 1kb
    //kích thước 1 bức ảnh [nhẹ 100-500kb, nặng 2tr byte]
    keepExtensions: true, //giữ lại đuôi file có nhìu file ng dùng gửi lên
    // file ese [mã độc] , nhung mình chỉ muốn nhận file png thôi
    uploadDir: path.resolve('uploads')
  })
  //tạo ra lưới rồi nên giờ sẽ xài
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    } else {
      //xử lý fields hoặc files
      res.json({
        message: 'Upload image successfully'
      })
    }
  })
  //giống jwt verify nên nó chơi với nó xong cần câllback xử lý lỗi/thành công
  //khi gọi hàm xong luôn có thành công và thất bại
  // phải có enctype đế nén dữ liệu trong thẻ form và action

  // 1 bức ảnh ngoài hình thì nó còn thông tin
  // 1 bức hình có thuộc tính matchedata 
  // có thông tin chụp ở đâu , mãy ảnh nào , tone màu ngày giừo thắng năm
}
