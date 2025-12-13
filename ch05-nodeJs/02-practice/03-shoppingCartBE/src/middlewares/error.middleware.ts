import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'






export const defaultErrorHandeler = (
    err : any, 
    req : Request ,
     res : Response , 
     next : NextFunction
    ) => {
      //cách 1
      // return res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']) )


      // cách cải tiến

      // Error Handler Tổng nhận tất cả lỗi từ hệ thống
      // nếu là ErrorWithStatus
      if (err instanceof ErrorWithStatus) {
        return res.status(err.status).json(omit(err, ['status']))
      }
      //nếu là lỗi bất kỳ
      Object.getOwnPropertyNames(err).forEach((key) => {
        Object.defineProperty(err, key, { enumerable: true })
      })
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR) //500
        .json(omit(err, ['stack']))
    }

    // tại sao tách ra như vậy vì khi để như cách cũ thì nó sẽ ko hiện message khi lỗi 500
    // tức là lỗi của hệ thống
    // nên làm v để in ra message
    // nhưng khi làm như cách 2 để in ra mes thì sẽ có 1 điều là
    // 1 .nó sẽ in ra hết stack
    // nên buộc phải dùng omit để loại bỏ , 
    // 2.nhưng khi muốn vô để bật nó (enumberable) thì phải dùng Object... ( cái mà ở trong forin foreach forof á) 