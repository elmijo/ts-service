import "./tools/config-env"
import app from "./app"
import { logger } from "./tools"

const { SERVER_PORT = "3000" } = process.env

const server = app.listen(SERVER_PORT)

server.on("listening", () => {
  logger.info(`The application is running on http://localhost:${SERVER_PORT}`)
})
