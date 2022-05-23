import { Router } from "express"
import health from "../controllers/health"
import swagger from "../controllers/api-docs"

const router = Router()

router.use("/api-docs", ...swagger)
router.get(["/", "/health"], health)

export default router
