import { v4 } from "uuid"
import { Logger } from "pino"
import pinoHttp, { HttpLogger } from "pino-http"
import { request as req, response as res, NextFunction } from "express"
import logger from "../../../src/tools/logger"
import httpLogger from "../../../src/middleware/http-logger"

jest.mock("uuid")
jest.mock("pino-http")
jest.mock("../../../src/tools/logger")

const next = jest.fn<NextFunction, []>()
const v4Mock = v4 as jest.MockedFunction<typeof v4>
const pinoHttpMock = pinoHttp as jest.MockedFunction<typeof pinoHttp>

req.headers = {}
res.setHeader = jest.fn()
const pinoHttpMiddle = jest.fn<HttpLogger, []>(() => pinoHttpMiddle)
pinoHttpMiddle.prototype.logger = jest.fn<Logger, []>()
pinoHttpMock.mockReturnValue(new pinoHttpMiddle())

afterEach(() => {
  req.headers = {}
  jest.clearAllMocks()
})

it("Should init http logger", () => {
  v4Mock.mockReturnValueOnce("123")
  httpLogger(req, res, next)
  const pninoHttpMidleware = pinoHttpMiddle.mock.results[0].value
  const genReqId = pinoHttpMock.mock.calls[0][0]["genReqId"]

  expect(v4).toBeCalledWith()
  expect(pinoHttp).toBeCalledWith({ logger, genReqId })
  expect(pninoHttpMidleware).toBeCalledWith(req, res)
  expect(res.setHeader).toBeCalledWith("X-Trace-Id", "123")
  expect(next).toBeCalledWith()
  expect(genReqId()).toBe("123")
})

it("Should init http logger with request trace id", () => {
  req.headers["X-Trace-Id"] = "123456"
  httpLogger(req, res, next)
  const pninoHttpMidleware = pinoHttpMiddle.mock.results[0].value
  const genReqId = pinoHttpMock.mock.calls[0][0]["genReqId"]

  expect(v4).not.toBeCalled()
  expect(pinoHttp).toBeCalledWith({ logger, genReqId })
  expect(pninoHttpMidleware).toBeCalledWith(req, res)
  expect(res.setHeader).toBeCalledWith("X-Trace-Id", "123456")
  expect(next).toBeCalledWith()
  expect(genReqId()).toBe("123456")
})
