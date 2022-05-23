import type { Request, NextFunction, Response } from "express"
import type { RequestValidator } from "./validator-factory"

enum TargetData {
  Query = "query",
  Body = "body",
}

export default (
    validator: RequestValidator,
    target: string = TargetData.Body
  ) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      await validator(req[target])
      next()
    } catch (err) {
      next(err)
    }
  }
