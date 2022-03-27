import { Request, Response, NextFunction } from "express-serve-static-core"

export default (_: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "OK" })
  next()
}
