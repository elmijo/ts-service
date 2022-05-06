/**
 * {@link https://swagger.io/specification/#example-object | Example Object}
 */
export default {
  simpleError: {
    summary: "Simple error message.",
    value: {
      traceId: "0aa0c138-5564-43c8-a9e2-5d1a1b42a9c2",
      message: "An error response message.",
    },
  },
  validationError: {
    summary: "Validartion errors message.",
    value: {
      traceId: "0aa0c138-5564-43c8-a9e2-5d1a1b42a9c2",
      message: "An error response message.",
      errors: ["error one", "error two"],
    },
  },
}
