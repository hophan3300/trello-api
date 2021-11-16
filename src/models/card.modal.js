import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '*/config/mongodb'

// define card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
   boardId: Joi.string().required(),
   columnId: Joi.string().required(),
   title: Joi.string().required().min(3).max(30),
   cover: Joi.string().default(null),
   createAt: Joi.date().timestamp().default(Date.now()),
   updateAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
   return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
   // abortEarly: true nghia la khi co loi o 1 dong code thi function se dung luon, k tra ve day du loi
}

const createNew = async (data) => {
   try {
      const value = await validateSchema(data)
      const validateValue = {
         ...value,
         boardId: ObjectId(value.boardId),
         columnId: ObjectId(value.columnId)
      }
      const result = await getDB().collection(cardCollectionName).insertOne(validateValue)
      return await getDB().collection(cardCollectionName).findOne(result.insertedId)
      
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
      if(data.columnId){
         updateData.columnId = ObjectId(data.columnId)
      }

      const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
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

// ids la 1 mang chua cac id dang string
export const deleteCards = async(ids) => {
   try {
      const tranformId = ids.map(i => ObjectId(i))
      const result = await getDB().collection(cardCollectionName).updateMany(
         { _id: { $in: tranformId }},
         { $set: { _destroy: true }}
      )
      return result
   } catch (error) {
      throw new Error(error)
   }
}

export const CardModel = {
   createNew, deleteCards, update
}