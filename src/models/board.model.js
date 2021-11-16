import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '*/config/mongodb'


// define board collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
   title: Joi.string().required().min(3).max(20).trim(),
   columnOrder: Joi.array().items(Joi.string()).default([]),
   createAt: Joi.date().timestamp().default(Date.now()),
   updateAt: Joi.date().timestamp().default(null),
   _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
   return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
   // abortEarly: true nghia la khi co loi o 1 dong code thi function se dung luon, k tra ve day du loi
}

const createNew = async (data) => {
   try {
      const value = await validateSchema(data)
      const result = await getDB().collection(boardCollectionName).insertOne(value)
      return await getDB().collection(boardCollectionName).findOne(result.insertedId)
      
   } catch (error) {
      throw new Error(error)
   }
}

const updateColumnOrder = async (columnId, boardId) => {
   try {
      const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
         { _id: ObjectId(boardId)},                // boardId va columnId o day nen la String
         { $push: { columnOrder: columnId}}, 
         { returnOriginal: false}
      )
      return result.value
   } catch (error) {
      throw new Error(error)
   }
}

const getFullBoard = async (id) => {
   try {
      const result = await getDB().collection(boardCollectionName).aggregate([
         { $match: {
            _id: ObjectId(id),
            _destroy: false
         }},
         // {
         //    $addFields: {
         //       _id: { $toString: '$_id'}          // ghi de _id tu OJB ID thanh string, 
         //    }                                     // chi ghi de khi query, k anh huong database
         // },
         {
            $lookup: {
               from: 'columns',           // collection name can join
               localField: '_id',       // truong can so sanh o collection board
               foreignField: 'boardId',   // truong can so sanh o collection column
               as: 'columns'              // ten output tra ve 
            }
         },
         {
            $lookup: {
               from: 'cards',           // collection name can join
               localField: '_id',       // truong can so sanh o collection board
               foreignField: 'boardId',   // truong can so sanh o collection column
               as: 'cards'              // ten output tra ve 
            }
         }
      ]).toArray()                        // tra ve mang
      return result[0] || {}
   } catch (error) {
      throw new Error(error)
   }
}

const update = async (id, data) => {
   try {
      const updateData = {
         ...data
      }
      const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
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


export const BoardModel = {
   createNew, getFullBoard, updateColumnOrder, update
}