import { cloneDeep } from "lodash";
import { expect, it } from "vitest";

import postJson from "../__fixtures__/post-application-json.js";
import { Options } from "../RequestStore.js";
import { JSONType } from "../types.js";
import createLeaf from "./create-leaf.js";
import { mergeLeaves } from "./merge.js";
import { defaultOptions } from "./persist-options.js";

const setup = (options: Options) => {
  const harRequest1 = postJson;
  const harRequest2 = cloneDeep(postJson);
  harRequest2.request.postData!.text = '{ "test": true }';
  const responseBody: JSONType = { test: 1 };
  const leaf1 = createLeaf({ harRequest: harRequest1, responseBody, options });
  const leaf2 = createLeaf({ harRequest: harRequest2, responseBody, options });
  const merged = mergeLeaves(leaf1, leaf2);
  return merged;
};

it("merges leaves", () => {
  const options = defaultOptions;
  const result = setup(options);
  expect(result).toEqual({
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
                    type: ["boolean", "string"],
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

it("sets mostRecentRequest and mostRecentResponse", () => {
  const options = { ...defaultOptions, enableMoreInfo: true };
  const result = setup(options);
  expect(
    result.methods["POST"]?.["200"]?.["request"]!["application/json"]
      ?.mostRecent,
  ).toEqual({ test: true });
  expect(
    result.methods["POST"]?.["200"]?.["response"]!["application/json"]
      ?.mostRecent,
  ).toEqual({ test: 1 });
});
