import { BadRequestError } from "../../../src/errors"

it("should create a bad request error without errors", () => {
  const err = new BadRequestError("bad request error")
  expect(err.status).toBe(400)
  expect(err.message).toBe("bad request error")
  expect(err.errors).toStrictEqual([])
})

it("should create a bad request error with errors", () => {
  const err = new BadRequestError("bad request error", [
    "error one",
    "error two",
  ])
  expect(err.status).toBe(400)
  expect(err.message).toBe("bad request error")
  expect(err.errors).toStrictEqual(["error one", "error two"])
})
