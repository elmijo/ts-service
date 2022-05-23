import { Request, NextFunction, Response } from "express-serve-static-core"
import { HttpError } from "../errors"
import logger from "./logger"

type AnyError = HttpError | Error

interface ErrorMessageResponse {
  message: string
  errors?: Array<string>
}

const errorStatus = (err: AnyError) =>
  err instanceof HttpError ? err.status : 500

const errorBody = (err: AnyError) => {
  const body: ErrorMessageResponse = {
    message: "An unexpected error occurred",
  }

  if (err instanceof HttpError) {
    body.message = err.message
    if (Array.isArray(err.errors)) body.errors = err.errors
  }

  return body
}

const errorLog = (
  req: Request,
  err: AnyError
): [Record<string, any>, string] => [
  {
    status: errorStatus(err),
    id: req.headers["X-Trace-Id"] || null,
    stack: (err.stack || "")
      .split("\n")
      .slice(1)
      .map((val) => val.trim()),
    context: err instanceof HttpError ? err.context : [],
    errors: err instanceof HttpError ? err.errors : [],
  },
  err.message,
]

export default function (
  err: AnyError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    logger.error(...errorLog(req, err))
    res.status(errorStatus(err)).json(errorBody(err))
  }

  next()
}
