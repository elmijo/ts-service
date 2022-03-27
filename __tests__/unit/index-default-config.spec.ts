import app from "../../src/app"
import "../../src"

jest.mock("../../src/app")

const loggerInfo = jest.spyOn(console, "log").mockReturnValue()

it("Should start successfully", () => {
  //@ts-ignore
  const server = app.listen.mock.results[0].value
  const sucessFunction = server.on.mock.calls[0][1]
  expect(app.listen).toBeCalledWith("3000")
  expect(server.on).toBeCalledWith("listening", expect.any(Function))
  sucessFunction()
  expect(loggerInfo).toBeCalledWith(
    "The application is running on http://localhost:3000"
  )
})
