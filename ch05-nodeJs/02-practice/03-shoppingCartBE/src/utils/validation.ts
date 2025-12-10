import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Promise nên phải return
    await validation.run(req) //chạy check và lưu lỗi
    const error = validationResult(req)
    if (error.isEmpty()) {
      return next()
    }
    // else {
    //   return res.status(400).json({
    //     message: 'Validation Failed',
    //     error: error.mapped()
    //   })
    // }  ko dùng nữa


    //ko phải tất cả là 422 , nên phải phân loại
    // ko dùng đc cách check str, chỉ đi qua key để check đc thôi 
    const errorObject = error.mapped()
    const entityError = new EntityError({errors : {}})

    for (const key in errorObject) {
      const {msg} = errorObject[key]
      if(
        msg instanceof ErrorWithStatus 
        && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY
      ){
        return next(msg)
      }      
      entityError.errors[key] = msg
    }

    // return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
    //   //422
    //   // message: 'Validation Failed', bỏ vì ko quan trọng
    //   error: errorObject
    // })

    return next(entityError)
  }
}


/*
422 : lỗi bình thường
300-499 : 423 401 400 : lỗi đặc biệt, lỗi do mình tạo ErrorWith Status
        sẽ có status
500 : lỗi tự nhiên có : ko có mã , lỗi mà do hệ thống ko biết

*/