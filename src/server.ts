import { readFileSync as readFile } from "fs"
import http from "http"
import https from "https"
import { Application } from "express-serve-static-core"
import { server as config } from "./config"

const getHttpsServer = (app: Application) => {
  const {
    ssl: { enable, cert, key },
  } = config

  return enable
    ? https.createServer({ key: readFile(key), cert: readFile(cert) }, app)
    : null
}

export interface Server {
  start: () => void
  stop: () => void
}

export default (app: Application): Server => {
  const {
    port,
    onListening,
    ssl: { port: sslPort },
  } = config
  const httpServer = http.createServer(app)
  const httpsServer = getHttpsServer(app)

  return {
    start: (): void => {
      httpServer.listen(port, () => onListening(port, false))
      if (httpsServer)
        httpsServer.listen(sslPort, () => onListening(sslPort, true))
    },
    stop: (): void => {
      httpServer.close()
      if (httpsServer) httpsServer.close()
    },
  }
}
