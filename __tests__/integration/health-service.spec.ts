import request from "supertest"
import createApp from "../../src/app"

const app = createApp()

describe("get health check status", () => {
  describe("when call /", () => {
    it("should resposne 200", () =>
      request(app).get("/").expect(200, { message: "OK" }))
  })

  describe("when call /health", () => {
    it("should resposne 200", () =>
      request(app).get("/health").expect(200, { message: "OK" }))
  })
})
