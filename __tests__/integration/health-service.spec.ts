import request from "supertest"
import app from "../../src/app"

describe("Get health check status", () => {
  describe("When call /", () => {
    it("Should resposne 200", () =>
      request(app).get("/").expect(200, { message: "OK" }))
  })

  describe("When call /health", () => {
    it("Should resposne 200", () =>
      request(app).get("/health").expect(200, { message: "OK" }))
  })
})
