/**
 * {@link https://swagger.io/specification/#paths-object | Paths Object}
 */
export default {
  "/health": {
    get: {
      tags: [],
      summary: "Health check endpoint",
      description: "This endpoint let you know server health",
      operationId: "healthCheck",
      produces: ["application/json"],
      parameters: [],
      responses: {
        200: {
          $ref: "#/components/responses/200",
        },
        500: {
          $ref: "#/components/responses/500",
        },
      },
    },
  },
}
