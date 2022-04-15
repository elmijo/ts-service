import env from "../../../src/tools/env"

const onListening = jest.fn()
jest.mock("../../../src/tools/env")
jest.mock("../../../src/tools", () => ({ env, onListening }))

const envMock = env as jest.MockedFunctionDeep<typeof env>

let config: { default: any }

afterEach(() => jest.clearAllMocks())

it("should return a server configuration with default values", () => {
  envMock.bool.mockReturnValueOnce(false)
  envMock.int.mockReturnValueOnce(6000)
  envMock.mockReturnValueOnce("")
  envMock.mockReturnValueOnce("")
  envMock.int.mockReturnValueOnce(5000)

  config = require("../../../src/config/server")
  expect(config.default).toStrictEqual({
    port: 5000,
    onListening,
    ssl: { enable: false, port: 6000, cert: "", key: "" },
  })
  expect(envMock.bool).toHaveBeenCalledWith("HTTPS_ENABLE")
  expect(envMock.int).toHaveBeenCalledWith("HTTPS_PORT", 6000)
  expect(envMock).toHaveBeenCalledWith("HTTPS_CERT")
  expect(envMock).toHaveBeenCalledWith("HTTPS_KEY")
  expect(envMock.int).toHaveBeenCalledWith("HTTP_PORT", 5000)
})

it("should return a server configuration with custom values", () => {
  envMock.bool.mockReturnValueOnce(true)
  envMock.int.mockReturnValueOnce(6001)
  envMock.mockReturnValueOnce("/some/file.cert")
  envMock.mockReturnValueOnce("/some/file.key")
  envMock.int.mockReturnValueOnce(5001)

  jest.isolateModules(() => {
    config = require("../../../src/config/server")
  })
  expect(config.default).toStrictEqual({
    port: 5001,
    onListening,
    ssl: {
      enable: true,
      port: 6001,
      cert: "/some/file.cert",
      key: "/some/file.key",
    },
  })
  expect(envMock.bool).toHaveBeenCalledWith("HTTPS_ENABLE")
  expect(envMock.int).toHaveBeenCalledWith("HTTPS_PORT", 6000)
  expect(envMock).toHaveBeenCalledWith("HTTPS_CERT")
  expect(envMock).toHaveBeenCalledWith("HTTPS_KEY")
  expect(envMock.int).toHaveBeenCalledWith("HTTP_PORT", 5000)
})
