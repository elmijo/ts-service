/**
 * {@link https://swagger.io/specification/#response-object | Response Object}
 */
export default {
  Response: {
    headers: {},
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiMessage",
        },
        example: {
          traceId: "0aa0c138-5564-43c8-a9e2-5d1a1b42a9c2",
          message: "A success response message.",
        },
      },
    },
  },
  200: {
    allOf: [
      { $ref: "#/components/responses/Response" },
      { description: "Succeessful response" },
    ],
  },
  201: {
    allOf: [
      { $ref: "#/components/responses/Response" },
      { description: "Request has succeeded and new resource was created" },
    ],
  },
  207: {
    headers: {},
    description:
      "Request has succeeded and has information about multiple resources.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/MultiRecordMessage",
        },
        example: {
          traceId: "0aa0c138-5564-43c8-a9e2-5d1a1b42a9c2",
          message: "A success response message.",
          data: [
            { id: "1", status: "201" },
            { id: "2", status: "201" },
          ],
        },
      },
    },
  },
  400: {
    headers: {},
    description: "A 400 response noting bad request input.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiMessage",
        },
        examples: {
          simpleError: {
            $ref: "#/components/examples/simpleError",
          },
        },
      },
    },
  },
  "400Extended": {
    headers: {},
    description:
      "A 400 response indicating bad request input, including validation errors.",
    content: {
      "application/json": {
        schema: {
          oneOf: [
            { $ref: "#/components/schemas/ApiMessage" },
            { $ref: "#/components/schemas/ValidationMessage" },
          ],
        },
        examples: {
          simpleError: {
            $ref: "#/components/examples/simpleError",
          },
          validationError: {
            $ref: "#/components/examples/validationError",
          },
        },
      },
    },
  },
  401: {
    headers: {},
    description:
      "Inalid authentication credentials for the requested resource.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiMessage",
        },
        examples: {
          simpleError: {
            $ref: "#/components/examples/simpleError",
          },
        },
      },
    },
  },
  403: {
    headers: {},
    description: "Insufficient right permissions for the requested resource.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiMessage",
        },
        examples: {
          simpleError: {
            $ref: "#/components/examples/simpleError",
          },
        },
      },
    },
  },
  404: {
    headers: {},
    description: "Resource not found.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiMessage",
        },
        examples: {
          simpleError: {
            $ref: "#/components/examples/simpleError",
          },
        },
      },
    },
  },
  500: {
    headers: {},
    description:
      "An error occurred within the server or with some external services.",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiMessage",
        },
        examples: {
          simpleError: {
            $ref: "#/components/examples/simpleError",
          },
        },
      },
    },
  },
}
