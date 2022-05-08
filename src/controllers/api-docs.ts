import { serve, setup } from "swagger-ui-express"
import config from "../swagger"

export default [serve, setup(config)]
