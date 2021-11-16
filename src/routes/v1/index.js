import express from "express"

import { httpStatusCode } from '*/utilities/constants'
import { boardRoutes } from "./board.route"
import { columnRoutes } from "./column.route "
import { cardRoutes } from "./card.route"


const router = express.Router()

router.get('/status', (req, res) => {
   res.status(httpStatusCode.OK).json({ status: 'OK' })
})

// board API
router.use('/boards', boardRoutes)
// column API
router.use('/columns', columnRoutes)
// card API
router.use('/cards', cardRoutes)

export const apiV1 = router