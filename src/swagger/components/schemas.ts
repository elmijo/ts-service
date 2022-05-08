/**
 * {@link https://swagger.io/specification/#parameter-object | Schema Object}
 */
export default {
  ApiMessage: {
    type: "object",
    properties: {
      traceId: {
        type: "string",
      },
      message: {
        type: "string",
      },
    },
  },
  SingleRecordMessage: {
    allOf: [
      { $ref: "#/components/schemas/ApiMessage" },
      {
        type: "object",
        properties: {
          data: {
            type: "object",
          },
        },
      },
    ],
  },
  MultiRecordMessage: {
    allOf: [
      { $ref: "#/components/schemas/ApiMessage" },
      {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                status: { type: "string" },
              },
            },
          },
        },
      },
    ],
  },
  PaginationMessage: {
    allOf: [
      { $ref: "#/components/schemas/ApiMessage" },
      {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
            },
          },
          pagination: {
            type: "object",
            properties: {
              total: { type: "integer" },
              page: { type: "integer" },
              perPage: { type: "integer" },
            },
          },
        },
      },
    ],
  },
  ValidationMessage: {
    allOf: [
      { $ref: "#/components/schemas/ApiMessage" },
      {
        type: "object",
        properties: {
          errors: {
            type: "Array",
            items: {
              type: "string",
            },
          },
        },
      },
    ],
  },
}
