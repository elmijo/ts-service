import express from "express"
import routers from "./routers"

const app = express()
app.disable("x-powered-by")
app.use(routers)

export default app
