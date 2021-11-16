import { CardModel } from '../models/card.modal'
import { ColumnModel } from '../models/column.modal'

const createNew = async (data) => {
   try {
     const newCard = await CardModel.createNew(data) 
     await ColumnModel.updateCardOrder(newCard._id.toString(), newCard.columnId.toString())
     return newCard
   } catch (error) {
      throw new Error(error)
   }
}

const update = async (id, data) => {
   try {
     if(data._id) delete data._id
    
     const updateData = {
       ...data,
       updateAt: Date.now()
     }
     const updatedCard = await CardModel.update(id, updateData)
    
     return updatedCard
   } catch (error) {
     throw new Error(error)        
   }                                
}
 
export const cardService = {
   createNew, update
}