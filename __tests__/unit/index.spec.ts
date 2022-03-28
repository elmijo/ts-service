import * as dotenv from "dotenv"
import app from "../../src/app"
import logger from "../../src/tools/logger"
import "../../src"

jest.mock("dotenv")
jest.mock("../../src/app")
jest.mock("../../src/middleware")
jest.mock("../../src/tools/logger")

it("Should start successfully", () => {
  //@ts-ignore
  const server = app.listen.mock.results[0].value
  const sucessFunction = server.on.mock.calls[0][1]
  expect(dotenv.config).toBeCalledWith()
  expect(app.listen).toBeCalledWith("3000")
  expect(server.on).toBeCalledWith("listening", expect.any(Function))
  sucessFunction()
  expect(logger.info).toBeCalledWith(
    "The application is running on http://localhost:3000"
  )
})
