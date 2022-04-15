import { exit } from "process"
import { Server } from "../server"
import logger from "./logger"

export default (err: Error, server: Server): void => {
  logger.error("Error launching the application", { exception: err })
  server.stop()
  exit(2)
}
