import * as dotenv from "dotenv"
import "../../../src/tools/config-env"

jest.mock("dotenv")

describe("Testing server module", () => {
  beforeEach(() => jest.resetModules())
  afterEach(() => jest.clearAllMocks())
  it("Validate if module is instantiable", () => {
    expect(dotenv.config).toHaveBeenCalled()
  })
})
