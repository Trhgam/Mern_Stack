//viết hàm kiểm tra thư mục dự án có folder upload không
//nếu chưa có thì tạo

import path from 'path'
import fs from 'fs' //module chuyên xử lý file

export const initFolder = () => {
  //lưu đường dẫn đến thư mục luuuw ảnh
  const uploadsFolderPath = path.resolve('uploads')
  //kiểm tra xem uploadsFolderPath có đưa mình đến folder nào không
  if (!fs.existsSync(uploadsFolderPath)) {
    //tạo
    fs.mkdirSync(uploadsFolderPath, {
      recursive: true //đệ quy
    })
  }
}
