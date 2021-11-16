
import { columnService } from "../services/column.service"
import { httpStatusCode } from '../utilities/constants'


// dieu huong
const createNew = async (req, res) => {
   try {
     const result = await columnService.createNew(req.body) 
     res.status(httpStatusCode.OK).json(result)
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json({
         errors: error.message
      })
   }
}

const update = async (req, res) => {
   try {
     const { id } = req.params
     const result = await columnService.update(id, req.body) 
     res.status(httpStatusCode.OK).json(result)
   } catch (error) {
      res.status(httpStatusCode.INTERNAL_SERVER).json({
         errors: error.message
      })
   }
}

export const columnController = {
   createNew, update
}