// hàm nhận vào RequestHandler : (req , res, next) => {}
// và biến nó thành 1 RequestHandler khác
// có cấu trúc try catch next
import { RequestHandler } from 'express'
import { NextFunction, Request, Response } from 'express-serve-static-core'

export const wrapAsync = (func: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
        await func(req, res, next) //tự nhứo tự thêm await nha
        } catch (error) {
            next(error)
        }
    }
}
