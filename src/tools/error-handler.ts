import { Request, NextFunction, Response } from "express-serve-static-core"
import logger from "./logger"

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({ exception: err }, "Unhandler error")
  res.status(500).json({ message: "An unexpected error occurred" })
  next(err)
}
