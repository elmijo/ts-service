import type { Request, NextFunction, Response } from "express"
import type { SchemaValidator } from "../../../src/validator/validator-factory"
import { requestValidator } from "../../../src/validator"

const reqMock = { query: {}, body: {} } as Request
const resMock = {} as Response
const nextMock = jest.fn() as NextFunction
const validatorMock = jest.fn() as jest.MockedFunction<SchemaValidator>

afterEach(() => {
  jest.clearAllMocks()
  reqMock.query = {}
  reqMock.body = {}
})

it.each([
  ["query", { name: "any name" }],
  ["body", { name: "any name", number: 10 }],
])(
  "should call next function with an error when validation fails",
  async (target, data) => {
    reqMock[target] = data
    validatorMock.mockRejectedValueOnce(new Error("Validation error"))
    const middle = requestValidator(validatorMock, target)
    await expect(middle(reqMock, resMock, nextMock)).resolves.toBeUndefined()
    expect(validatorMock).toHaveBeenCalledWith(data)
    expect(nextMock).toHaveBeenCalledWith(new Error("Validation error"))
  }
)

it.each([
  ["query", { name: "any name" }],
  ["body", { name: "any name", number: 10 }],
])(
  "should call next function with anything when validation succeeds",
  async (target, data) => {
    reqMock[target] = data
    validatorMock.mockResolvedValueOnce()
    const middle = requestValidator(validatorMock, target)
    await expect(middle(reqMock, resMock, nextMock)).resolves.toBeUndefined()
    expect(validatorMock).toHaveBeenCalledWith(data)
    expect(nextMock).toHaveBeenCalledWith()
  }
)

it("should call next function with anything when validation succeeds (default target)", async () => {
  reqMock["body"] = { name: "any name", number: 10 }
  validatorMock.mockResolvedValueOnce()
  const middle = requestValidator(validatorMock)
  await expect(middle(reqMock, resMock, nextMock)).resolves.toBeUndefined()
  expect(validatorMock).toHaveBeenCalledWith({ name: "any name", number: 10 })
  expect(nextMock).toHaveBeenCalledWith()
})
