import express from "express";
import cors from 'cors'

import { connectDB, getDB } from "*/config/mongodb";
import { env } from '*/config/environtment'
import { apiV1 } from '*/routes/v1'
import { corsOptions} from './config/cors'

connectDB()
   .then(() => console.log('connected success'))
   .then(() => bootServer())
   .catch(e => {
      console.log(e)
      process.exit(1)
   })

const bootServer = () => {

   const app = express()

   app.use(cors(corsOptions))    // cors

   app.use(express.json())       // su dung dc req.body

   app.use('/v1', apiV1)         // dung api v1
   
   app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Server is running at ${env.APP_HOST}:${env.APP_PORT}/`)
   })
}