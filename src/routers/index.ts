import { Router } from "express"
import health from "../controllers/health"

const router = Router()

router.use(["/", "/health"], health)

export default router
