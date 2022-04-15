import { onListening, logger } from "../../../src/tools"

jest.mock("../../../src/tools/logger", () => ({
  info: jest.fn(),
}))

describe("testinf module onListening", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it.each([
    [3000, false, "Server runing on http://localhost:3000"],
    [9000, true, "Server runing on https://localhost:9000"],
  ])(
    "should writes a log with port: %s and isHttps: %s",
    (port, isHttps, expected) => {
      expect(onListening(port, isHttps)).toBeUndefined()
      expect(logger.info).toHaveBeenCalledWith(expected)
    }
  )
})
