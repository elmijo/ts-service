import routers from "../../src/routers"
import { app as config } from "../../src/config"
import createApp from "../../src/app"

jest.mock("express")
jest.mock("../../src/routers", jest.fn)
jest.mock("../../src/middleware", () => ["middleware-one", "middleware-two"])
jest.mock("../../src/config", () => ({
  app: {
    withMiddleware: true,
    errorHandler: jest.fn(),
  },
}))

afterEach(() => jest.clearAllMocks())

it("should create an express application with middleware", () => {
  const app = createApp()
  expect(app.disable).toHaveBeenCalledWith("x-powered-by")
  expect(app.use).toHaveBeenCalledTimes(4)
  expect(app.use).toHaveBeenCalledWith("middleware-one")
  expect(app.use).toHaveBeenCalledWith("middleware-two")
  expect(app.use).toHaveBeenCalledWith(routers)
  expect(app.use).toHaveBeenCalledWith(config.errorHandler)
})

it("should create an express application without middleware", () => {
  config.withMiddleware = false
  const app = createApp()
  expect(app.disable).toHaveBeenCalledWith("x-powered-by")
  expect(app.use).toHaveBeenCalledTimes(2)
  expect(app.use).toHaveBeenCalledWith(routers)
  expect(app.use).toHaveBeenCalledWith(config.errorHandler)
})
