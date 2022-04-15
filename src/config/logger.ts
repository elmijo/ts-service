import { env } from "../tools"
import { name } from "../../package.json"
import { LoggerOptions } from "pino"

export default {
  name,
  level: env("LOG_LEVEL", "info"),
  prettyPrint: env.bool("LOG_PRETTY") ? { translateTime: true } : false,
  redact: ["req.headers.Authorization", "req.headers.Authentication"],
} as LoggerOptions
