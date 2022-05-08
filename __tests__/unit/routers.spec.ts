import { Router } from "express"
import "../../src/routers"
import health from "../../src/controllers/health"

jest.mock("express")
jest.mock("../../src/controllers/health")
jest.mock("../../src/controllers/api-docs", () => ["serve", "setup"])

const routerMock = Router as jest.MockedFunction<typeof Router>

it("sould register all routers", () => {
  const router = routerMock.mock.results[0].value
  expect(router.use).toHaveBeenCalledWith(["/", "/health"], health)
  expect(router.use).toHaveBeenCalledWith("/api-docs", "serve", "setup")
})
