import { Application } from "express"
import createApp from "../../src/app"
import createServer, { Server } from "../../src/server"
import { initErrorHandler } from "../../src/tools"

jest.mock("../../src/app", jest.fn)
jest.mock("../../src/server", jest.fn)
jest.mock("../../src/tools", () => ({
  initErrorHandler: jest.fn(),
}))
jest.mock("../../src/tools/config-env", jest.fn)

const initErrorHandlerMock = initErrorHandler as jest.MockedFunctionDeep<
  typeof initErrorHandler
>
const createAppMock = createApp as jest.MockedFunctionDeep<typeof createApp>
const createServerMock = createServer as jest.MockedFunction<
  typeof createServer
>
const appMock = jest.fn() as unknown as Application
const serverMock = {
  start: jest.fn(),
  stop: jest.fn(),
} as Server

const serverStartMock = serverMock.start as jest.MockedFunction<
  typeof serverMock.start
>

afterEach(() => jest.clearAllMocks())

it("should start successfully", () => {
  createAppMock.mockReturnValueOnce(appMock)
  createServerMock.mockReturnValueOnce(serverMock)
  require("../../src")
  expect(createServerMock).toHaveBeenCalledWith(appMock)
  expect(serverMock.start).toHaveBeenCalledWith()
  expect(serverMock.stop).not.toHaveBeenCalled()
  expect(initErrorHandlerMock).not.toHaveBeenCalled()
})

it("should fail start", () => {
  const initError = new Error("Init error.")
  createAppMock.mockReturnValueOnce(appMock)
  createServerMock.mockReturnValueOnce(serverMock)
  serverStartMock.mockImplementationOnce(() => {
    throw initError
  })
  jest.isolateModules(() => {
    require("../../src")
  })
  expect(createServerMock).toHaveBeenCalledWith(appMock)
  expect(serverMock.start).toHaveBeenCalledWith()
  expect(serverMock.stop).not.toHaveBeenCalled()
  expect(initErrorHandlerMock).toHaveBeenCalledWith(initError, serverMock)
})
