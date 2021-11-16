import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '*/config/mongodb'

// define column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
   boardId: Joi.string().required(),
   title: Joi.string().required().min(3).max(20).trim(),
   cardOrder: Joi.array().items(Joi.string()).default([]),
   createAt: Joi.date().timestamp().default(Date.now()),
   updateAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
   return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
   // abortEarly: true nghia la khi co loi o 1 dong code thi function se dung luon, k tra ve day du loi
}

const createNew = async (data) => {
   try {
      const value  = await validateSchema(data)
      const validateValue = {
         ...value,
         boardId: ObjectId(value.boardId)
      }
      const result = await getDB().collection(columnCollectionName).insertOne(validateValue)
      return await getDB().collection(columnCollectionName).findOne(result.insertedId)
      
   } catch (error) {
      throw new Error(error)
   }
}

const update = async (id, data) => {
   try {
      const updateData = {
         ...data
      }
      if(data.boardId){
         updateData.boardId = ObjectId(data.boardId)
      }
      const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnOriginal: false }       // false:  tra ve ban ghi sau update
                                       // true : tra ve ban ghi goc
      )
      return result.value
   } catch (error) {
      throw new Error(error)
   }
}


const updateCardOrder = async (cardId,columnId) => {
   try {
      const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
         { _id: ObjectId(columnId)},                
         { $push: { cardOrder: cardId}}, 
         { returnOriginal: false}
      )
      return result.value
   } catch (error) {
      throw new Error(error)
   }
}

export const ColumnModel = {
   createNew, update, updateCardOrder
}