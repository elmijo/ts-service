import * as dotenv from "dotenv"
import app from "../../src/app"
import logger from "../../src/tools/logger"

jest.mock("dotenv")
jest.mock("../../src/app")
jest.mock("../../src/tools/logger")

const { env } = process
// const loggerInfo = jest.spyOn(console, "log").mockReturnValue()

beforeAll(() => {
  process.env.SERVER_PORT = "3001"
})
afterAll(() => {
  process.env = { ...env }
})

it("Should start successfully", () => {
  return import("../../src").then(() => {
    //@ts-ignore
    const server = app.listen.mock.results[0].value
    const sucessFunction = server.on.mock.calls[0][1]
    expect(dotenv.config).toBeCalledWith()
    expect(app.listen).toBeCalledWith("3001")
    expect(server.on).toBeCalledWith("listening", expect.any(Function))
    sucessFunction()
    expect(logger.info).toBeCalledWith(
      "The application is running on http://localhost:3001"
    )
  })
})
