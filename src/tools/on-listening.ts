import logger from "./logger"

export default (port: number, isHttps: boolean): void => {
  logger.info(`Server runing on http${isHttps ? "s" : ""}://localhost:${port}`)
}
