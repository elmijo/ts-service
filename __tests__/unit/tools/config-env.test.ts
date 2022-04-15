import * as dotenv from "dotenv"
import "../../../src/tools/config-env"

jest.mock("dotenv")

describe("testing server module", () => {
  beforeEach(() => jest.resetModules())
  afterEach(() => jest.clearAllMocks())
  it("validate if module is instantiable", () => {
    expect(dotenv.config).toHaveBeenCalledWith()
  })
})
