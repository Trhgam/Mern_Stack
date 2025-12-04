import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Promise nên phải return
    await validation.run(req)
    const error = validationResult(req)
    if (error.isEmpty()) {
      return next()
    } else {
      return res.status(400).json({
        message: 'Validation Failed',
        error: error.mapped()
      })
    }
  }
}
