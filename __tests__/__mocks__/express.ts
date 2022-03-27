import {
  Send,
  IRouter,
  Request,
  Response,
  Application,
  NextFunction,
  RequestHandler,
  IRouterHandler,
  // IRouterMatcher,
  ErrorRequestHandler,
} from "express-serve-static-core"

import { Server } from "http"

interface IRouterMock {
  use: typeof jest.fn
}

// @ts-ignore
const RouterMock = {
  use: jest.fn<IRouterHandler<IRouterMock>, []>(() => RouterMock),
}

export const Router = jest.fn<IRouter, []>(() => RouterMock)
export const request = jest.fn<Request, []>()
export const response = jest.fn<Response, []>()
export const next = jest.fn<NextFunction, []>()
export const middle = jest.fn<RequestHandler, []>()
export const errors = jest.fn<ErrorRequestHandler, []>()
export const endpoint = jest.fn<IRouter, []>()
export const application = jest.fn<Application, []>()

//@ts-ignore
response.json = jest.fn<Send, []>(() => response)
//@ts-ignore
response.status = jest.fn(() => response)

// @ts-ignore
const express = jest.fn(() => ({
  use: RouterMock.use,
  Router,
  application,
  disable: jest.fn(() => express),
  listen: jest.fn<Partial<Server>, []>(() => ({
    on: jest.fn(),
  })),
}))

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default express
