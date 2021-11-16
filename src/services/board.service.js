import { BoardModel } from "../models/board.model"
import { cloneDeep } from "lodash"

const createNew = async (data) => {
   try {
     const result = await BoardModel.createNew(data)
     return result
   } catch (error) {
     throw new Error(error) // dung throw thi err chuyen den phan catch ben controller
   }                                // k neu dung return vi err chuyen den pahn try ben controller
}


const getFullBoard = async (id) => {
    try {
      const board = await BoardModel.getFullBoard(id)
      if(!board || !board.columns){
        throw new Error('Board not found')
      }

      const transformBoard = cloneDeep(board)
      transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)
      // push card to column
      transformBoard.columns.forEach(column => {
        column.cards = transformBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
      });
      // remove card from board
      delete transformBoard.cards
      return transformBoard
    } catch (error) {
      throw new Error(error)
    }
}

const update = async (id, data) => {
  try {
    if(data._id) delete data._id
    if(data.columns) delete data.columns

    const updateData = {
      ...data,
      updateAt: Date.now()
    }
    const updatedBoard = await BoardModel.update(id, updateData)
   
    return updatedBoard
  } catch (error) {
    throw new Error(error)        // dung throw thi err chuyen den phan catch ben controller
  }                                // k neu dung return vi err chuyen den phan try ben controller
}

export const boardService = {
   createNew, getFullBoard, update
}