import pino from "pino"
import { name } from "../../package.json"

const { LOG_LEVEL = "info", LOG_PRETTY = "false" } = process.env

const logger = pino({
  name,
  level: LOG_LEVEL,
  prettyPrint: LOG_PRETTY === "true" ? { translateTime: true } : false,
  redact: ["req.headers.Authorization", "req.headers.Authentication"],
})

export default logger
