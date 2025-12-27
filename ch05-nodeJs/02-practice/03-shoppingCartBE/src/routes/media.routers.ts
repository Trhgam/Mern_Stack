import {Router} from 'express'
import { wrap } from 'lodash'
import { uploadSingleImageController } from '~/controllers/medias.controllers'
const mediaRouter = Router()

//tạo route để người dùng upload ảnh
mediaRouter.post('/upload-image', uploadSingleImageController)

//hiện đang ko bắt đc lỗi khi gửi lên file quá lớn , cần wrapAsync

export default mediaRouter 

//Sharp giảm độ nặng của file