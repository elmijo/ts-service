const isIntgTest =
  process.env["npm_lifecycle_script"].indexOf("__tests__/integration") > 0

if (isIntgTest) {
  jest.unmock("express")
}

export default {}
