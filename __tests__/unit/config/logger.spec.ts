import env from "../../../src/tools/env"

jest.mock("../../../src/tools/env")
jest.mock("../../../src/tools", () => ({ env }))

const envMock = env as jest.MockedFunctionDeep<typeof env>

let config: { default: any }

afterEach(() => jest.clearAllMocks())

it("should return a logger configuration with default values", () => {
  envMock.mockReturnValueOnce("info")
  envMock.bool.mockReturnValueOnce(false)
  config = require("../../../src/config/logger")
  expect(config.default).toStrictEqual({
    name: "@elmijo/ts-service",
    level: "info",
    prettyPrint: false,
    redact: ["req.headers.Authorization", "req.headers.Authentication"],
  })
  expect(envMock).toHaveBeenCalledWith("LOG_LEVEL", "info")
  expect(envMock.bool).toHaveBeenCalledWith("LOG_PRETTY")
})
it("should return a logger configuration with custom values", () => {
  envMock.mockReturnValueOnce("debug")
  envMock.bool.mockReturnValueOnce(true)

  jest.isolateModules(() => {
    config = require("../../../src/config/logger")
  })

  expect(config.default).toStrictEqual({
    name: "@elmijo/ts-service",
    level: "debug",
    prettyPrint: { translateTime: true },
    redact: ["req.headers.Authorization", "req.headers.Authentication"],
  })
  expect(envMock).toHaveBeenCalledWith("LOG_LEVEL", "info")
  expect(envMock.bool).toHaveBeenCalledWith("LOG_PRETTY")
})
