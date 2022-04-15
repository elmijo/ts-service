import { Router } from "express"
import "../../src/routers"
import health from "../../src/controllers/health"

jest.mock("express")
jest.mock("../../src/controllers/health")

const routerMock = Router as jest.MockedFunction<typeof Router>

it("sould register all routers", () => {
  const router = routerMock.mock.results[0].value
  expect(router.use).toHaveBeenCalledWith(["/", "/health"], health)
})
