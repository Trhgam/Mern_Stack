// import { initFolder } from './file';
//viết hàm kiểm tra thư mục dự án có folder upload không
//nếu chưa có thì tạo

// import path from 'path'

//----------------------------------------------------------------------------
import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs' //module chuyên xử lý file file system
import path from 'path'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
// có thể tạo thêm xóa tìm thư mục , hỗ trợ đồng bộ và bất đồng bộ

//chứa các function xử ký file
//tạo hàm tự tạo folder upload

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      })
    }
  })
}

export const handleUploadSingleImage = (req: Request) => {
  // __dirname : cung cấp đường dẫn đến thư mục chứa file
  // console.log(__dirname);

  // console.log(path.resolve('uploads'))
  //path cung cấp đường dẫn tính từ thư mục dự án
  //  và nó đang hướng về uploads dù upload không tồn tại
  //  và đây là đường dẫn trong mơ mình muốn lưu trữ hình ảnh

  //tạo 1 tấm lưới lọc file bằng formidable
  //--------------------------------------------------------------------

  // hàm này tiếp nhận file từ req , và kiểm tra formiable và lưu tạm
  const form = formidable({
    maxFiles: 1, //tối đa 1 file /hình
    maxFileSize: 1024 * 300, //300kb kích thước tối đa
    // 1 là 1024 là 1kb
    //kích thước 1 bức ảnh [nhẹ 100-500kb, nặng 2tr byte]
    keepExtensions: true, //giữ lại đuôi file có nhìu file ng dùng gửi lên
    // file ese [mã độc] , nhung mình chỉ muốn nhận file png thôi
    uploadDir: path.resolve(UPLOAD_IMAGE_TEMP_DIR),
    filter: function ({ name, originalFilename, mimetype }) {
      // name là trường dữ liệu được gửi từ form
      // originalFilename là tên gốc của file
      // mimetype : loại file của type
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) form.emit('error' as any, new Error('Not File Type') as any)
      return valid
    } //giống bên custom bên validator
  })
  //tạo ra lưới rồi nên giờ sẽ xài

  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      //xử lý fields hoặc files
      //ko đc đóng gòi res ở đây => controller
      //nếu không có lỗi trong quá trình parse
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      //nếu mà có gửi và đầy đủ thì
      return resolve(files.image[0] as File)
    })
  })

  // giống jwt verify nên nó chơi với nó xong cần câllback xử lý lỗi/thành công
  // khi gọi hàm xong luôn có thành công và thất bại
  // phải có enctype đế nén dữ liệu trong thẻ form và action

  // 1 bức ảnh ngoài hình thì nó còn thông tin
  // 1 bức hình có thuộc tính matchedata
  // có thông tin chụp ở đâu , mãy ảnh nào , tone màu ngày giừo thắng năm
}

//--------------------------------------------------------------

// export const initFolder = () => {
//   //lưu đường dẫn đến thư mục luuuw ảnh
//   const uploadsFolderPath = path.resolve('uploads')
//   //kiểm tra xem uploadsFolderPath có đưa mình đến folder nào không
//   if (!fs.existsSync(uploadsFolderPath)) {
//     //tạo
//     fs.mkdirSync(uploadsFolderPath, {
//       recursive: true //đệ quy
//     })
//   }
// }

///ssdd.ssdd.png ==> ssdd.ssdd
export const getNameFormFileName = (filename: string) => {
  const nameArr = filename.split('.')
  nameArr.pop()
  return nameArr.join('.')
}
export const getExtFormFileName = (filename: string) => {
  const nameArr = filename.split('.')
  return nameArr.pop()
}



