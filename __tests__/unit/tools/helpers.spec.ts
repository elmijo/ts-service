import { isEmail, parseBool } from "../../../src/tools/helpers"

describe("testing isEmail helper", () => {
  it.each([
    [false, ""],
    [false, "   "],
    [false, "any"],
    [false, "any.com"],
    [false, "any-all"],
    [false, "any@any"],
    [true, "any@any.es"],
    [true, "any@any.com"],
  ])("should return %s when given %s", (expected, val) => {
    expect(isEmail(val)).toBe(expected)
  })
})

describe("testing parseBool helper", () => {
  it("false result", () => {
    expect(parseBool(undefined)).toBeFalsy()
    expect(parseBool(null)).toBeFalsy()
    expect(parseBool(0)).toBeFalsy()
    expect(parseBool("0")).toBeFalsy()
    expect(parseBool("false")).toBeFalsy()
    expect(parseBool(false)).toBeFalsy()
  })
  it("true result", () => {
    expect(parseBool(true)).toBeTruthy()
    expect(parseBool("true")).toBeTruthy()
    expect(parseBool(1)).toBeTruthy()
    expect(parseBool("1")).toBeTruthy()
  })
})
