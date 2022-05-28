import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import httpLogger from "./http-logger"

export default [cors(), helmet(), compression(), httpLogger]
