import { ColumnModel } from "../models/column.modal"
import { BoardModel } from '../models/board.model'
import { CardModel } from "../models/card.modal"

const createNew = async (data) => {
   try {
     const newColumn = await ColumnModel.createNew(data)
     newColumn.cards = []
     await BoardModel.updateColumnOrder(newColumn._id.toString(), newColumn.boardId.toString())
     
     return newColumn
   } catch (error) {
     throw new Error(error)         // dung throw thi err chuyen den phan catch ben controller
   }                                // k neu dung return vi err chuyen den phan try ben controller
}

const update = async (id, data) => {
  try {
    if(data._id) delete data._id
    if(data.cards) delete data.cards

    const updateData = {
      ...data,
      updateAt: Date.now()
    }
    const updatedColumn = await ColumnModel.update(id, updateData)
    if(updatedColumn._destroy){
      CardModel.deleteCards(updatedColumn.cardOrder)
    }
    return updatedColumn
  } catch (error) {
    throw new Error(error)        // dung throw thi err chuyen den phan catch ben controller
  }                                // k neu dung return vi err chuyen den phan try ben controller
}

export const columnService = {
   createNew, update
}