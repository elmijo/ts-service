import logger from "../../../src/tools/logger"
import initErrorHandler from "../../../src/tools/init-error-handler"
import { Server } from "../../../src/server"

jest.mock("../../../src/tools/logger")

const exitMock = jest
  .spyOn(process, "exit")
  .mockImplementation(() => "exit" as never)

const serverMock = {
  start: jest.fn(),
  stop: jest.fn(),
} as Server

describe("testing initErrorHandler module", () => {
  it("should logging error, stop server and kill process", () => {
    const err = new Error("any error")
    initErrorHandler(err, serverMock)
    expect(logger.error).toHaveBeenCalledWith(
      "Error launching the application",
      {
        exception: err,
      }
    )
    expect(serverMock.start).not.toHaveBeenCalled()
    expect(serverMock.stop).toHaveBeenCalledWith()
    expect(exitMock).toHaveBeenCalledWith(2)
  })
})
