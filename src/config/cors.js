import { whitelist } from "../utilities/constants"

export const corsOptions = {
  origin:  (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`${origin} not allowed by CORS`))
    }
  },
  optionsSuccessStatus: 200
}