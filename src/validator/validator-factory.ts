import Ajv, {
  Options as AjvOptions,
  AnySchemaObject as AjvSchema,
  ValidateFunction,
  ErrorObject,
  AsyncValidateFunction,
} from "ajv"
import ajvFormats from "ajv-formats"
import ValidationError from "ajv/dist/runtime/validation_error"
import BadRequestError from "../errors/BadRequestError"

export interface RequestValidator {
  (data: any): Promise<void>
}

const validationError = (
  errors: Array<Partial<ErrorObject>>,
  err: any = null
) =>
  err === null || err instanceof ValidationError
    ? new BadRequestError(
        "Invalid request parameters",
        errors.map(({ keyword, message }) => `${keyword}: ${message}`)
      )
    : err

const validate = (validator: ValidateFunction) => {
  return async (data: any) => {
    if (!validator(data)) {
      //@ts-ignore
      throw validationError(validator.errors)
    }
  }
}

const asyncValidate = (validator: AsyncValidateFunction) => {
  return async (data: any) => {
    try {
      await validator(data)
    } catch (err) {
      //@ts-ignore
      throw validationError(err.errors || [], err)
    }
  }
}

export default (
  schema: AjvSchema,
  options: AjvOptions = {}
): RequestValidator => {
  const ajv = ajvFormats(new Ajv(options))
  const validator = ajv.compile(schema)
  return !schema.$async
    ? validate(validator)
    : asyncValidate(validator as AsyncValidateFunction)
}
