import HTTP_STATUS from "~/constants/httpStatus"

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

// Định nghĩa loại lỗi mới do mình tạo ra
export class ErrorWithStatus {
  status: number
  message: string
  constructor({ status, message }: { status: number; message: string }) {
    this.status = status
    this.message = message
  }
}
// tạo sao nên để truyền vô object
// 2 thứ có xu hướng tạo ra 1 thứ nào đó
// default giá trị mặc định
// và ko cần truyền theo đúng thứ tự
// tạo tính liên kết



export class EntityError extends ErrorWithStatus {
  errors : ErrorType
  constructor({errors, 
    message = 'Validation Error'
  } : {
    errors : ErrorType,
    message? : string
  }){
    super({message, status : HTTP_STATUS.UNPROCESSABLE_ENTITY})
    this.errors = errors
  }
}
// tại sao lại có phần này ??
// custom fomat lỗi khi quăng ra ui đẹp