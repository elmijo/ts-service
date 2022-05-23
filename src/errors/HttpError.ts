/**
 * Base HRRP error class
 */
export default class HttpError extends Error {
  [key: string]: any
  readonly status: number
  readonly context: Record<string, any> = {}
  constructor(
    status: number,
    message: string,
    context: Record<string, any> = {}
  ) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.context = context
  }
}
