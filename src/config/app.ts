import { ErrorRequestHandler } from "express-serve-static-core"
import { errorHandler } from "../tools"

interface AppConfig {
  withMiddleware: boolean
  errorHandler: ErrorRequestHandler
}

export default {
  withMiddleware: true,
  errorHandler,
} as AppConfig
