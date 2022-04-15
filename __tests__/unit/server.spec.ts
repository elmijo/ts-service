import { readFileSync } from "fs"
import http from "http"
import https from "https"
import { Application } from "express-serve-static-core"
import { server as config } from "../../src/config"
import createServer from "../../src/server"

jest.mock("fs")
jest.mock("http")
jest.mock("https")
jest.mock("../../src/config", () => ({
  server: {
    ssl: {
      enable: false,
      port: 6000,
      cert: "",
      key: "",
    },
    port: 5000,
    onListening: jest.fn(),
  },
}))

const appMock = jest.fn() as unknown as Application
const httpMock = http as jest.MockedObjectDeep<typeof http>
const httpsMock = https as jest.MockedObjectDeep<typeof https>
const readFileSyncMock = readFileSync as jest.MockedFunction<
  typeof readFileSync
>
const { Server: ActualHttpServer } = jest.requireActual("http")
const { Server: ActualHttpsServer } = jest.requireActual("https")

const httpServerMock = {
  listen: jest.fn(),
  close: jest.fn(),
} as typeof ActualHttpServer
const httpsServerMock = {
  listen: jest.fn(),
  close: jest.fn(),
} as typeof ActualHttpsServer

// const onListeningMock = jest.fn()

afterEach(() => jest.clearAllMocks())

// config.onListening = onListeningMock

it("should create only http instance and return a server object", () => {
  httpMock.createServer.mockReturnValueOnce(httpServerMock)
  const server = createServer(appMock)
  expect(server).toStrictEqual({
    start: expect.any(Function),
    stop: expect.any(Function),
  })
  expect(http.createServer).toHaveBeenCalledWith(appMock)
  expect(https.createServer).not.toHaveBeenCalled()
  expect(readFileSync).not.toHaveBeenCalled()

  server.start()
  expect(httpServerMock.listen).toHaveBeenCalledWith(5000, expect.any(Function))
  expect(httpsServerMock.listen).not.toHaveBeenCalled()
  server.stop()
  expect(httpServerMock.close).toHaveBeenCalledWith()
  expect(httpsServerMock.close).not.toHaveBeenCalled()
})

it("should create http and https instances and return a server object", () => {
  httpMock.createServer.mockReturnValueOnce(httpServerMock)
  httpsMock.createServer.mockReturnValueOnce(httpsServerMock)
  readFileSyncMock.mockReturnValueOnce("/path/server.key")
  readFileSyncMock.mockReturnValueOnce("/path/server.cert")
  config.ssl.enable = true
  config.ssl.key = "server.key"
  config.ssl.cert = "server.cert"

  const server = createServer(appMock)
  expect(server).toStrictEqual({
    start: expect.any(Function),
    stop: expect.any(Function),
  })

  expect(readFileSync).toHaveBeenCalledWith("server.key")
  expect(readFileSync).toHaveBeenCalledWith("server.cert")

  expect(http.createServer).toHaveBeenCalledWith(appMock)
  expect(https.createServer).toHaveBeenCalledWith(
    { key: "/path/server.key", cert: "/path/server.cert" },
    appMock
  )

  server.start()
  expect(httpServerMock.listen).toHaveBeenCalledWith(5000, expect.any(Function))
  expect(httpsServerMock.listen).toHaveBeenCalledWith(
    6000,
    expect.any(Function)
  )
  server.stop()
  expect(httpServerMock.close).toHaveBeenCalledWith()
  expect(httpsServerMock.close).toHaveBeenCalledWith()

  httpServerMock.listen.mock.calls[0][1]()
  httpsServerMock.listen.mock.calls[0][1]()

  expect(config.onListening).toHaveBeenCalledWith(5000, false)
  expect(config.onListening).toHaveBeenCalledWith(6000, true)
})
