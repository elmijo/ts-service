const isIntgTest = process.argv.some((val) => val === "__tests__/integration")

if (isIntgTest) {
  jest.unmock("express")
}

export default {}
