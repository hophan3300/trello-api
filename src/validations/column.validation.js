import Joi from "joi";

import { httpStatusCode } from "*/utilities/constants"

const createNew = async (req, res, next) => {
   const condition = Joi.object({
      boardId: Joi.string().required(),
      title: Joi.string().required().min(3).max(20).trim()
   })

   try {
      await condition.validateAsync(req.body, { abortEarly: false })
      next()
   } catch (error) {
      res.status(httpStatusCode.BAD_REQUEST).json({
         errors: new Error(error).message
      })
   }
}

const update = async (req, res, next) => {
   const condition = Joi.object({
      title: Joi.string().min(3).max(20).trim()
   })

   try {
      await condition.validateAsync(req.body, {
         abortEarly: false,
         allowUnknown: true     // cho phep update nhung thuoc tinh khac title da khai bao o bien condition
      })
      next()
   } catch (error) {
      res.status(httpStatusCode.BAD_REQUEST).json({
         errors: new Error(error).message
      })
   }
}

export const columnValidation = {
   createNew, update
}