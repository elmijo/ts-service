// import {
//   Request,
//   Response,
//   NextFunction,
//   Send,
// } from "express-serve-static-core"
import { request as req, response as res, NextFunction } from "express"
import controller from "../../../src/controllers/health"

const next = jest.fn() as NextFunction

it("should return a success response", () => {
  expect(controller(req, res, next)).toBeUndefined()
  expect(res.json).toHaveBeenCalledWith({ message: "OK" })
  expect(next).toHaveBeenCalledWith()
})
