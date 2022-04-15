import pino from "pino"
import config from "../../../src/config/logger"
// import * as config from "../../../src/config"

// import "../../../src/tools/logger"
// import { name } from "../../../package.json"

jest.mock("pino")
jest.mock("../../../src/config/logger")

const configMock = config as jest.MockedObject<typeof config>

afterEach(() => jest.clearAllMocks())

it("should create a logger with default configuration", () => {
  require("../../../src/tools/logger")
  expect(pino).toHaveBeenCalledWith({
    name: "@elmijo/ts-service",
    level: "info",
    prettyPrint: false,
    redact: [],
  })
})

it("should create a logger with custom configuration", () => {
  configMock.level = "debug"
  configMock.prettyPrint = { translateTime: true }
  jest.isolateModules(() => {
    require("../../../src/tools/logger")
  })
  expect(pino).toHaveBeenCalledWith({
    name: "@elmijo/ts-service",
    level: "debug",
    prettyPrint: { translateTime: true },
    redact: [],
  })
})
