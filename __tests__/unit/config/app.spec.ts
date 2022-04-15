import config from "../../../src/config/app"

jest.mock("../../../src/tools", () => ({ errorHandler: jest.fn() }))

afterEach(() => jest.clearAllMocks())

it("should return an app configuration", async () => {
  expect(config).toStrictEqual({
    withMiddleware: true,
    errorHandler: expect.any(Function),
  })
})
