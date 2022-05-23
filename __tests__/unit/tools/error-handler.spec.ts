// import { request as req, response as res, NextFunction } from "express"
import { Request, Response, NextFunction } from "express-serve-static-core"
import logger from "../../../src/tools/logger"
import errorHandler from "../../../src/tools/error-handler"
import { BadRequestError } from "../../../src/errors"

jest.mock("../../../src/tools/logger")

const next = jest.fn() as NextFunction
const req = {
  headers: {},
} as unknown as Request

const res = {
  status: jest.fn(() => res),
  json: jest.fn(() => res),
} as unknown as Response

afterEach(() => {
  jest.clearAllMocks()
  req.headers = {}
})

it("should be called with an error", () => {
  const err = new Error("Any error.")
  delete err.stack
  expect(errorHandler(err, req, res, next)).toBeUndefined()
  expect(logger.error).toHaveBeenCalledWith(
    {
      id: null,
      stack: [],
      status: 500,
      errors: [],
      context: [],
    },
    "Any error."
  )
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.json).toHaveBeenCalledWith({
    message: "An unexpected error occurred",
  })
  expect(next).toHaveBeenCalledWith()
})

it("should be called with a bad request error", () => {
  const err = new BadRequestError(
    "Validation Error.",
    ["error one", "error two"],
    { userId: "1", value: "value" }
  )
  expect(errorHandler(err, req, res, next)).toBeUndefined()
  expect(logger.error).toHaveBeenCalledWith(
    {
      id: null,
      stack: expect.any(Array),
      status: 400,
      errors: ["error one", "error two"],
      context: {
        userId: "1",
        value: "value",
      },
    },
    "Validation Error."
  )
  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.json).toHaveBeenCalledWith({
    message: "Validation Error.",
    errors: ["error one", "error two"],
  })
  expect(next).toHaveBeenCalledWith()
})
