import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email or password is missing'
    })
  }
  next()
}

export const registerValidator = validate (
  checkSchema(
    {
      name: {
        notEmpty: true,
        isString: true,
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          }
        }
      },
      email: {
        notEmpty: true,
        isEmail: true,
        trim: true
      },
      password: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 8,
            max: 50
          }
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
          }
        },
        errorMessage:
          'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
      },
      confirm_password: {
        notEmpty: true,
        isString: true,
        isLength: {
          options: {
            min: 8,
            max: 50
          }
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage:
            'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
        },
        custom: {
          options: (value, { req }) => {
            // value là trường dữ liệu đang có : confirm_password
            if (value !== req.body.password) {
              // Lúc này các dữ liệu được lưu trong request nha
              // Chui vào body và lấy nha

              throw new Error('Confirm password does not match password')
            } else {
              return true
            }
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          }
        }
      }
    },
    ['body']
  )
)
