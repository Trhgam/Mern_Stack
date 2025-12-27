import { NextFunction, Request, Response } from 'express'
import { checkSchema, ParamSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { REGEX_USERNAME } from '~/constants/regex'
import { ErrorWithStatus } from '~/models/Errors'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'
const nameSchema: ParamSchema = {
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
}

const passwordSchema: ParamSchema = {
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
const confirmPasswordSchema: ParamSchema = {
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
}

const dateOfBirthSchema: ParamSchema = {
  isISO8601: {
    options: {
      strict: true,
      strictSeparator: true
    },
    errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_BE_ISO8601
  }
}
const imageSchema: ParamSchema = {
  optional: true,
  isString: {
    errorMessage: USERS_MESSAGES.IMAGE_URL_MUST_BE_A_STRING ////messages.ts thêm IMAGE_URL_MUST_BE_A_STRING: 'Image url must be a string'
  },
  trim: true, //nên đặt trim dưới này thay vì ở đầu
  isLength: {
    options: {
      min: 1,
      max: 400
    },
    errorMessage: USERS_MESSAGES.IMAGE_URL_LENGTH_MUST_BE_LESS_THAN_400 //messages.ts thêm IMAGE_URL_LENGTH_MUST_BE_LESS_THAN_400: 'Image url length must be less than 400'
  }
}
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
      password: passwordSchema
    },
    ['body']
  )
)

// validate hàm đặc biệt , tìm hiểu kĩ lại
export const registerValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
      date_of_birth: dateOfBirthSchema
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
              const decoded_authorization = await verifyToken({
                token: access_token, //
                privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
              })
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
              const decoded_refresh_token = await verifyToken({
                token: value, //
                privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
              }) //value là REFRESH_TOKEN

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

export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED
        },
        //mneeus có thì mình phải verify và koc ó hàm nào có sẵn cả
        custom: {
          options: async (value: string, { req }) => {
            //trong đó value là email_verify_token
            try {
              const decoded_email_verify_token = await verifyToken({
                token: value,
                privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
              })
              //cần lưu vào req để dùng cho controller
              ;(req as Request).decoded_email_verify_token = decoded_email_verify_token
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: capitalize((error as JsonWebTokenError).message)
              })
            }
            //return true phải ngaouif try catch nha
            return true // passed validator
          }
        }
      }
    },
    ['query']
  )
)

// Forgot Password
export const forgotPasswordValidator = validate(
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
      }
    },
    ['body']
  )
)

// Verify Forgot Password
export const forgotPasswordTokenValidator = validate(
  checkSchema(
    {
      forgot_password_token: {
        // Mình phải luôn trim để tạo thế phòng bị cho mình nha
        trim: true,
        notEmpty: {
          errorMessage: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_REQUIRED
        },

        // Nếu có thì mình phải verify
        custom: {
          options: async (value: string, { req }) => {
            // Trong đó value là forgot_password_token
            try {
              const decoded_forgot_password_token = await verifyToken({
                // Email Verify Token
                token: value,
                privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string
              })

              // mình cần định nghĩa để chấm nó xổ ra thuộc tính
              ;(req as Request).decoded_forgot_password_token = decoded_forgot_password_token
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, // 401
                message: capitalize((error as JsonWebTokenError).message)
              })
            }

            // Nhớ phải retturn nha
            return true // passed validator
          }
        }
      }
    },
    ['body']
  )
)

export const resetPasswordValidator = validate(
  checkSchema(
    {
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)

export const updateMeValidator = validate(
  checkSchema(
    {
      name: {
        optional: true, //đc phép có hoặc k
        ...nameSchema, //phân rã nameSchema ra
        notEmpty: undefined //ghi đè lên notEmpty của nameSchema
      },
      date_of_birth: {
        optional: true, //đc phép có hoặc k
        ...dateOfBirthSchema, //phân rã nameSchema ra
        notEmpty: undefined //ghi đè lên notEmpty của nameSchema
      },
      bio: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGES.BIO_MUST_BE_A_STRING ////messages.ts thêm BIO_MUST_BE_A_STRING: 'Bio must be a string'
        },
        trim: true, //trim phát đặt cuối, nếu k thì nó sẽ lỗi validatior
        isLength: {
          options: {
            min: 1,
            max: 200
          },
          errorMessage: USERS_MESSAGES.BIO_LENGTH_MUST_BE_LESS_THAN_200 //messages.ts thêm BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Bio length must be less than 200'
        }
      },
      //giống bio
      location: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGES.LOCATION_MUST_BE_A_STRING ////messages.ts thêm LOCATION_MUST_BE_A_STRING: 'Location must be a string'
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 200
          },
          errorMessage: USERS_MESSAGES.LOCATION_LENGTH_MUST_BE_LESS_THAN_200 //messages.ts thêm LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Location length must be less than 200'
        }
      },
      //giống location
      website: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGES.WEBSITE_MUST_BE_A_STRING ////messages.ts thêm WEBSITE_MUST_BE_A_STRING: 'Website must be a string'
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 200
          },

          errorMessage: USERS_MESSAGES.WEBSITE_LENGTH_MUST_BE_LESS_THAN_200 //messages.ts thêm WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200'
        }
      },
      username: {
        optional: true,
        isString: {
          errorMessage: USERS_MESSAGES.USERNAME_MUST_BE_A_STRING ////messages.ts thêm USERNAME_MUST_BE_A_STRING: 'Username must be a string'
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 50
          },
          errorMessage: USERS_MESSAGES.USERNAME_LENGTH_MUST_BE_LESS_THAN_50 //messages.ts thêm USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Username length must be less than 50'
        },
        custom: {
          options: (value: string, { req }) => {
            //value lúc này là username , đại diện cho trường dữ liệu đang chứa nó
            if (!REGEX_USERNAME.test(value)) {
              // nếu là value trước thì dùng matches
              // còn regex trước thì phải dùng test
              throw new Error(USERS_MESSAGES.USERNAME_IS_INVALID)
            }
            return true
          }
        }
      },
      avatar: imageSchema,
      cover_photo: imageSchema
    },
    ['body']
  )
)

export const changePasswordValidator = validate(
  checkSchema(
    {
      old_password: passwordSchema,
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)
