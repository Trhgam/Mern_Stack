import { Request } from "express"
import sharp from "sharp"
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR } from "~/constants/dir"
import { getNameFormFileName, handleUploadSingleImage } from "~/utils/file"
import fs from 'fs'

class MediasService{
    // 
    async uploadSingleImage (req : Request){
        const file = await handleUploadSingleImage(req)
        file.newFilename = getNameFormFileName(file.newFilename) + '.jpg'
        //tạo đuòng dẫn mà mình lưu file
        const newPath  = UPLOAD_IMAGE_DIR + '/' + file.newFilename
        //sharp | file.filepath : là đường dẫn lưu trữ trong temp
        //--------------------------------------------------
        // hình sẽ bị bóp dạnng ở dòng code này
        await sharp(file.filepath as string).jpeg().toFile(newPath)
        //----------------------------------------------------
        //lưu vào folder chính thức (newPath)
        //xóa file cũ đi
        fs.unlinkSync(file.filepath)
        //trả ra link để người dùng xài
        return `http://localhost:3000/static/image/${file.newFilename}`
    }
}

//dependency inject
const mediasService = new MediasService()
export default mediasService