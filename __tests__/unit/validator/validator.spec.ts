import Ajv from "ajv"
import ajvFormats from "ajv-formats"
import ValidationError from "ajv/dist/runtime/validation_error"
import { BadRequestError } from "../../../src/errors"
import { validatorFactory } from "../../../src/validator"
import { schema, errors, listErrors } from "../../__fixtures__/validator.json"

jest.mock("ajv")
jest.mock("ajv-formats")

type AjvType = typeof Ajv

const ajvMock = Ajv as jest.MockedClass<AjvType>
const ajvFormatsMock = ajvFormats as jest.MockedFunction<typeof ajvFormats>
const ajvValidatorMock = jest.fn()
const ajvInstanceMock = {
  compile: jest.fn(() => ajvValidatorMock),
} as Partial<AjvType>

//@ts-ignore
ajvMock.mockReturnValue(ajvInstanceMock)
//@ts-ignore
ajvFormatsMock.mockReturnValue(ajvInstanceMock)

const error = new BadRequestError("Invalid request parameters", listErrors)

// @ts-ignore
ajvValidatorMock.errors = errors

afterEach(() => jest.clearAllMocks())

const data = { id: "1", name: "user", number: 10 }
const asyncSchema = { ...schema, ...{ $async: true } }

describe("testing schema validator", () => {
  it("should return a validator and throw a BacRequestError", async () => {
    ajvValidatorMock.mockReturnValueOnce(false)
    const validator = validatorFactory(schema)
    await expect(() => validator({})).rejects.toThrow(error)
    expect(Ajv).toHaveBeenCalledWith({})
    expect(ajvFormats).toHaveBeenCalledWith(ajvInstanceMock)
    expect(ajvValidatorMock).toHaveBeenCalledWith({})
  })
  it("should return a validator and excecutes a success validation", async () => {
    ajvValidatorMock.mockReturnValueOnce(true)
    const validator = validatorFactory(schema, { allErrors: true })
    await expect(validator(data)).resolves.toBeUndefined()
    expect(Ajv).toHaveBeenCalledWith({ allErrors: true })
    expect(ajvFormats).toHaveBeenCalledWith(ajvInstanceMock)
    expect(ajvValidatorMock).toHaveBeenCalledWith(data)
  })
})

describe("testing async schema validator", () => {
  const validatonError = new ValidationError(errors)

  it("should return a validator and throw a BacRequestError", async () => {
    ajvValidatorMock.mockRejectedValueOnce(validatonError)
    const validator = validatorFactory(asyncSchema)
    await expect(() => validator({})).rejects.toThrow(error)
    expect(Ajv).toHaveBeenCalledWith({})
    expect(ajvFormats).toHaveBeenCalledWith(ajvInstanceMock)
    expect(ajvValidatorMock).toHaveBeenCalledWith({})
  })
  it("should return a validator and throw original error", async () => {
    const originalError = new Error("Ups!!")
    ajvValidatorMock.mockRejectedValueOnce(originalError)
    const validator = validatorFactory(asyncSchema)
    await expect(() => validator({})).rejects.toThrow(originalError)
    expect(Ajv).toHaveBeenCalledWith({})
    expect(ajvFormats).toHaveBeenCalledWith(ajvInstanceMock)
    expect(ajvValidatorMock).toHaveBeenCalledWith({})
  })
  it("should return a validator and excecutes a success validation", async () => {
    ajvValidatorMock.mockResolvedValueOnce(true)
    const validator = validatorFactory(asyncSchema, { allErrors: true })
    await expect(validator(data)).resolves.toBeUndefined()
    expect(Ajv).toHaveBeenCalledWith({ allErrors: true })
    expect(ajvFormats).toHaveBeenCalledWith(ajvInstanceMock)
    expect(ajvValidatorMock).toHaveBeenCalledWith(data)
  })
})
