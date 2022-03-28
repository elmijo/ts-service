import pino from "pino"
import { name } from "../../../package.json"

jest.mock("pino")

const { env } = process

beforeAll(() => {
  process.env.LOG_LEVEL = "debug"
  process.env.LOG_PRETTY = "true"
})

afterAll(() => {
  process.env = { ...env }
})

it("Should create a logger", () => {
  return import("../../../src/tools/logger").then(() => {
    expect(pino).toBeCalledWith({
      name,
      level: "debug",
      prettyPrint: { translateTime: true },
      redact: ["req.headers.Authorization", "req.headers.Authentication"],
    })
  })
})
