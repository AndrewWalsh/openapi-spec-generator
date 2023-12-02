import { expect, it } from "vitest";

import postJson from "../__fixtures__/post-application-json.js";
import postXWWWFormUrlEncoded from "../__fixtures__/post-application-x-www-form-urlencoded.js";
import createLeaf, { Params } from "./create-leaf.js";
import { defaultOptions } from "./persist-options.js";

it("creates a leaf when request mime = application/x-www-form-urlencoded", () => {
  const harRequest = postXWWWFormUrlEncoded;
  const responseBody: Params["responseBody"] = { test: 1 };
  const options = defaultOptions;
  const leaf = createLeaf({ harRequest, responseBody, options });
  expect(leaf).toEqual({
    pathname: "/post",
    methods: {
      POST: {
        "200": {
          request: {
            "application/x-www-form-urlencoded": {
              body: {
                type: "object",
                properties: {
                  custname: {
                    type: "string",
                  },
                  custtel: {
                    type: "string",
                  },
                  custemail: {
                    type: "string",
                  },
                  size: {
                    type: "string",
                  },
                  topping: {
                    type: "string",
                  },
                  delivery: {
                    type: "string",
                  },
                  comments: {
                    type: "string",
                  },
                },
                required: [
                  "custname",
                  "custtel",
                  "custemail",
                  "size",
                  "topping",
                  "delivery",
                  "comments",
                ],
              },
            },
          },
          requestHeaders: undefined,
          response: {
            "application/json": {
              body: {
                type: "object",
                properties: {
                  test: {
                    type: "integer",
                  },
                },
                required: ["test"],
              },
            },
          },
          responseHeaders: undefined,
          queryParameters: undefined,
        },
      },
    },
  });
});

it("creates a leaf when mime = application/json for req and res", () => {
  const harRequest = postJson;
  const responseBody: Params["responseBody"] = { test: 1 };
  const options = defaultOptions;
  const leaf = createLeaf({ harRequest, responseBody, options });
  expect(leaf).toEqual({
    pathname: "/v1/track",
    methods: {
      POST: {
        "200": {
          request: {
            "application/json": {
              body: {
                type: "object",
                properties: {
                  test: {
                    type: "string",
                  },
                },
                required: ["test"],
              },
            },
          },
          requestHeaders: {
            type: "object",
            properties: {
              anonymousid: {
                type: "string",
              },
            },
            required: ["anonymousid"],
          },
          response: {
            "application/json": {
              body: {
                type: "object",
                properties: {
                  test: {
                    type: "integer",
                  },
                },
                required: ["test"],
              },
            },
          },
          responseHeaders: undefined,
          queryParameters: {
            type: "object",
            properties: {
              alt: {
                type: "string",
              },
              key: {
                type: "string",
              },
            },
            required: ["alt", "key"],
          },
        },
      },
    },
  });
});
