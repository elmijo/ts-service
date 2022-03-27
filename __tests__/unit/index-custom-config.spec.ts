// import express from "express"
// import routers from "../../src/routers"

// jest.mock("express")
// jest.mock("../../src/routers")

// const expressMock = express as jest.MockedFunction<typeof express>
// const loggerInfo = jest.spyOn(console, "log").mockReturnValue()

// it("Should start successfully", () => {
//   return import("../../src").then(() => {
//     const app = expressMock.mock.results[0].value
//     const server = app.listen.mock.results[0].value
//     const sucessFunction = server.on.mock.calls[0][1]

//     expect(app.disable).toBeCalledWith("x-powered-by")
//     expect(app.use).toBeCalledWith(routers)
//     expect(app.listen).toBeCalledWith("3001")
//     expect(server.on).toBeCalledWith("listening", expect.any(Function))
//     sucessFunction()
//     expect(loggerInfo).toBeCalledWith(
//       "The application is running on http://localhost:3001"
//     )
//   })
// })
import app from "../../src/app"
// import "../../src"

jest.mock("../../src/app")

const { env } = process
const loggerInfo = jest.spyOn(console, "log").mockReturnValue()

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
    expect(app.listen).toBeCalledWith("3001")
    expect(server.on).toBeCalledWith("listening", expect.any(Function))
    sucessFunction()
    expect(loggerInfo).toBeCalledWith(
      "The application is running on http://localhost:3001"
    )
  })
})
