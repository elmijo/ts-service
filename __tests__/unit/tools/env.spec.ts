import env from "../../../src/tools/env"

describe("env function", () => {
  it("when env-var is undefined and default value is null return null", () => {
    expect(env("any")).toBeNull()
  })
  it("when env-var is undefined and default value is 'any-value' return 'any-value'", () => {
    expect(env("any", "any-value")).toBe("any-value")
  })
  it("when env-var is '123' and default value is null return '123", () => {
    process.env["any"] = "123"
    expect(env("any")).toBe("123")
    delete process.env["any"]
  })
  it("when env-var is '123' and default value is 'any-value' return '123'", () => {
    process.env["any"] = "123"
    expect(env("any", "any-value")).toBe("123")
    delete process.env["any"]
  })
})
describe("env.int function", () => {
  it("when env-var is undefined and default value is null return null", () => {
    expect(env.int("any")).toBeNull()
  })
  it("when env-var is undefined and default value is 123456 return 123456", () => {
    expect(env.int("any", 123456)).toBe(123456)
  })
  it("when env-var is 123 and default value is null return 123", () => {
    process.env["any"] = "123"
    expect(env.int("any")).toBe(123)
    delete process.env["any"]
  })
  it("when env-var is 123 and default value is 123456 return 123", () => {
    process.env["any"] = "123"
    expect(env.int("any", 123456)).toBe(123)
    delete process.env["any"]
  })
})
describe("env.float function", () => {
  it("when env-var is undefined and default value is null return null", () => {
    expect(env.float("any")).toBeNull()
  })
  it("when env-var is undefined and default value is 12.45 return 12.45", () => {
    expect(env.float("any", 12.45)).toBe(12.45)
  })
  it("when env-var is 34.2 and default value is null return 34.2", () => {
    process.env["any"] = "34.2"
    expect(env.float("any")).toBe(34.2)
    delete process.env["any"]
  })
  it("when env-var is 34.2 and default value is 12.45 return 34.2", () => {
    process.env["any"] = "34.2"
    expect(env.float("any", 12.45)).toBe(34.2)
    delete process.env["any"]
  })
})
describe("env.bool function", () => {
  it("when env-var is undefined return false", () => {
    expect(env.bool("any")).toBeFalsy()
  })
  it("when env-var is 'any-value' return false", () => {
    process.env["any"] = "any-value"
    expect(env.bool("any")).toBeFalsy()
    delete process.env["any"]
  })
  it("when env-var is 'false' return false", () => {
    process.env["any"] = "false"
    expect(env.bool("any")).toBeFalsy()
    delete process.env["any"]
  })
  it("when env-var is '0' return false", () => {
    process.env["any"] = "0"
    expect(env.bool("any")).toBeFalsy()
    delete process.env["any"]
  })
  it("when env-var is 'true' return true", () => {
    process.env["any"] = "true"
    expect(env.bool("any")).toBeTruthy()
    delete process.env["any"]
  })
  it("when env-var is '1' return true", () => {
    process.env["any"] = "1"
    expect(env.bool("any")).toBeTruthy()
    delete process.env["any"]
  })
})
