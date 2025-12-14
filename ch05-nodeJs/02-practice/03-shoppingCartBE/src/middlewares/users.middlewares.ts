import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: false
            // false : chỉ return true nếu password mạnh, false nếu k
            // true : return về chất lượng password(trên thang điểm 10)
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

// validate hàm đặc biệt , tìm hiểu kĩ lại
export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: false
            // false : chỉ return true nếu password mạnh, false nếu k
            // true : return về chất lượng password(trên thang điểm 10)
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_BE_ISO8601
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED //422
        },
        custom: {
          options: async (value: string, { req }) => {
            // trong đó value là Authorization : 401

            const access_token = value.split(' ')[1]
            // nếu không có access_token
            if (!access_token) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401 do cố ý gửi thiếu
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
              })
            }
            // nếu có access_token thì verify bằng privateKey của mình
            try {
              const decoded_authorization = await verifyToken({ token: access_token })
              ;(req as Request).decoded_authorization = decoded_authorization //mới
              // luê vô req thì khi qua conteoller mới lấy user_id để dùng được
              // ko đc đứng ở middleware mà đục vô db nha, phảu qua cointroller và vande la controller sẽ ko có user_í nên buộc
              // phải lưu vô req để gửi
              // vì req của midd và controller là 1
              //tạo  ra vùng mới tên v
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: capitalize((error as JsonWebTokenError).message)
                // lỗi của jwt là  JsonWebTokenError nên ta lấy luôn mess của nó luôn
                // và lodash cho ta hàm capitalize vì lỗi của jwt luôn là lowercase
                // ta nên đưa nó về cappitalize tức viết hoa chữ đầu
                // lồi này phải 401 nên nếu ko bắt nó sẽ vô checkSchema và mang lỗi 422
              })
            }
            //
            return true
          }
        }
      }
    },
    ['headers']
  )
)

//------------------------------------------------------
// body{
//   refresh_token : string
// }

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED //422
        },
        custom: {
          options: async (value: string, { req }) => {
            // trong đó value là REFRESH_TOKEN_IS_REQUIRED : 401

            // nếu không có REFRESH_TOKEN
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401 do cố ý gửi thiếu
                message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
              })
            }
            // nếu có REFRESH_TOKEN thì verify bằng privateKey của mình
            try {
              const decoded_refresh_token = await verifyToken({ token: value }) //value là REFRESH_TOKEN

              // req.decoded_refresh_token = decoded_refresh_token // cái cũ

              ;(req as Request).decoded_refresh_token = decoded_refresh_token //mới

              // luê vô req thì khi qua conteoller mới lấy user_id để dùng được
              // ko đc đứng ở middleware mà đục vô db nha, phảu qua cointroller và vande la controller sẽ ko có user_í nên buộc
              // phải lưu vô req để gửi
              // vì req của midd và controller là 1
              //tạo  ra vùng mới tên v
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: capitalize((error as JsonWebTokenError).message)
                // lỗi của jwt là  JsonWebTokenError nên ta lấy luôn mess của nó luôn
                // và lodash cho ta hàm capitalize vì lỗi của jwt luôn là lowercase
                // ta nên đưa nó về cappitalize tức viết hoa chữ đầu
                // lồi này phải 401 nên nếu ko bắt nó sẽ vô checkSchema và mang lỗi 422
              })
            }
            //
            return true
          }
        }
      }
    },
    ['body'] // ko kt header nữa mà qua body nha
  )
)
