import pino from "pino"
import "../../../src/tools/logger"
import { name } from "../../../package.json"

jest.mock("pino")

it("Should create a logger", () => {
  expect(pino).toBeCalledWith({
    name,
    level: "info",
    prettyPrint: false,
    redact: ["req.headers.Authorization", "req.headers.Authentication"],
  })
})
