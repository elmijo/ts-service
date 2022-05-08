import { RequestHandler } from "express-serve-static-core"
import config from "../../../src/swagger"

const serveMock = jest.fn()
const handlerMock = jest.fn<RequestHandler, []>()
const mockSetup = jest.fn()

jest.mock("swagger-ui-express", () => ({
  serve: serveMock,
  setup: mockSetup.mockImplementation(() => handlerMock),
}))

afterEach(() => jest.clearAllMocks())

it("should return a success response", async () => {
  const {
    default: [serve, setup],
  } = await import("../../../src/controllers/api-docs")

  expect(serve).toBe(serveMock)
  expect(setup).toBe(handlerMock)
  expect(serve).not.toHaveBeenCalled()
  expect(mockSetup).toHaveBeenLastCalledWith(config)
})
