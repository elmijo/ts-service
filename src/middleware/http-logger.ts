import { v4 } from "uuid"
import pinoHttp from "pino-http"
import { logger } from "../tools"
import { Request, Response, NextFunction } from "express-serve-static-core"

export default (req: Request, res: Response, next: NextFunction) => {
  const traceId = req.headers["X-Trace-Id"] ? req.headers["X-Trace-Id"] : v4()
  pinoHttp({ logger: logger, genReqId: () => traceId })(req, res)
  res.setHeader("X-Trace-Id", traceId)
  next()
}
