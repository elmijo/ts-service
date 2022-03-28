import express from "express"
import middleware from "./middleware"
import routers from "./routers"

const app = express()
app.disable("x-powered-by")
middleware.forEach((middle) => app.use(middle))
app.use(routers)

export default app
