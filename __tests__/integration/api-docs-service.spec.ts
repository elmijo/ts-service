import request from "supertest"
import createApp from "../../src/app"

const app = createApp()

describe("get api documentation", () => {
  describe("when call /api-docs", () => {
    it("should resposne 200", () =>
      request(app)
        .get("/api-docs")
        .expect("Content-Type", "text/html; charset=UTF-8")
        .expect(301, /Redirecting to.+(\/api-docs\/)/))
  })
})
