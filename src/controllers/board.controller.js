
import { boardService } from "../services/board.service"
import { httpStatusCode } from '../utilities/constants'


// dieu huong
const createNew = async (req, res) => {
   try {
     const result = await boardService.createNew(req.body) 
     res.status(httpStatusCode.OK).json(result)
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json({
         errors: error.message
      })
   }
}

const getFullBoard = async (req, res) => {
   const { id } = req.params
   try {
      const result = await boardService.getFullBoard(id)
      res.status(httpStatusCode.OK).json(result)
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json({
         error: error.message
      })
   }
}

const update = async (req, res) => {
   try {
     const { id } = req.params
     const result = await boardService.update(id, req.body) 
     res.status(httpStatusCode.OK).json(result)
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json({
         errors: error.message
      })
   }
}

export const boardController = {
   createNew, getFullBoard, update
}