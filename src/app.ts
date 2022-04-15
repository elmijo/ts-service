import express, { Application } from "express"
import middleware from "./middleware"
import routers from "./routers"
import { app as config } from "./config"

export default (): Application => {
  const { withMiddleware, errorHandler } = config
  const app = express()
  app.disable("x-powered-by")

  if (withMiddleware) middleware.forEach((middle) => app.use(middle))
  app.use(routers).use(errorHandler)
  return app
}
