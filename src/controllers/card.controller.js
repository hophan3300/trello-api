
import { cardService } from '../services/card.service'
import { httpStatusCode } from '../utilities/constants'


const createNew = async (req, res) => {
    try {
      const result = await cardService.createNew(req.body)
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
    const result = await cardService.update(id, req.body) 
    res.status(httpStatusCode.OK).json(result)
  } catch (error) {
     res.status(httpStatusCode.INTERNAL_SERVER).json({
        errors: error.message
     })
  }
}

export const cardController = {
   createNew, update
}