import { HttpError } from "../../../src/errors"

it.each([
  [400, "Bad request"],
  [404, "Not Found"],
])("should create an error with http status %s", (status, message) => {
  const err = new HttpError(status, message)
  expect(err.status).toBe(status)
  expect(err.message).toBe(message)
})
