import "./tools/config-env"
import createApp from "./app"
import createServer from "./server"
import { initErrorHandler } from "./tools"

const server = createServer(createApp())

const init = async (): Promise<void> => {
  try {
    server.start()
  } catch (err) {
    initErrorHandler(err as Error, server)
  }
}

export default init()
