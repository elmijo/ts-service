import HttpError from "./HttpError"

export default class BadRequestError extends HttpError {
  readonly errors: Array<string>

  constructor(
    message: string,
    errors: Array<string> = [],
    context: Record<string, any> = {}
  ) {
    super(400, message, context)
    this.name = this.constructor.name
    this.errors = errors
  }
}
