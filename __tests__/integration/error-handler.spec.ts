import request from "supertest"
import createApp from "../../src/app"
import { BadRequestError } from "../../src/errors"
import errorHandler from "../../src/tools/error-handler"

const app = createApp()

app.use("/error", (_, __, next) => {
  return next(new Error("Testing unhandler error"))
})

app.use("/validation-error", (_, __, next) => {
  return next(
    new BadRequestError("Testing validation error", ["error one", "error two"])
  )
})

app.use(errorHandler)

describe("get an error response", () => {
  it("should resposne 500, when there is an unexpected error", () =>
    request(app)
      .get("/error")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(500, { message: "An unexpected error occurred" }))

  it("should resposne 400, when triggers a bad request error", () =>
    request(app)
      .get("/validation-error")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400, {
        message: "Testing validation error",
        errors: ["error one", "error two"],
      }))
})
