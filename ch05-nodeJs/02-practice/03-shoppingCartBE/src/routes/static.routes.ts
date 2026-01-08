import express from 'express'
import { serverSingleImageController } from '~/controllers/medias.controllers'
import { wrapAsync } from '~/utils/handler'
const staticRouter = express.Router()


///image
staticRouter.get( //
    '/image/:filename', //
    wrapAsync(serverSingleImageController)
)
export default staticRouter



