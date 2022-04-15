import { request as req, response as res, NextFunction } from "express"
import logger from "../../../src/tools/logger"
import errorHandler from "../../../src/tools/error-handler"

jest.mock("../../../src/tools/logger")

const next = jest.fn() as NextFunction

it("should be called with an error", () => {
  const err = new Error("Any error.")
  expect(errorHandler(err, req, res, next)).toBeUndefined()
  expect(logger.error).toHaveBeenCalledWith(
    { exception: err },
    "Unhandler error"
  )
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.json).toHaveBeenCalledWith({
    message: "An unexpected error occurred",
  })
  expect(next).toHaveBeenCalledWith(err)
})
