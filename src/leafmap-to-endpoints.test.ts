import { expect, it } from "vitest";

import { LeafMap } from "../utils/types";
import postJson, { postHost } from "./__fixtures__/post-application-json";
import leafMapToEndpoints from "./leafmap-to-endpoints";
import { createLeaf } from "./store-helpers";
import { defaultOptions } from "./store-helpers/persist-options";

const leaf = createLeaf({
  harRequest: postJson,
  responseBody: { foo: "bar" },
  options: defaultOptions,
});

it("flattens data into endpoints", () => {
  const leafMap: LeafMap = {
    [postHost]: {
      "/1/2/3": { data: leaf },
      "/1/:param1/3": { data: leaf },
      "/1/2/3/4": { data: leaf },
      "/1/2/3/4a": { data: leaf },
      "/1/2/3/": { data: leaf },
      "/1/2/3/:param4/param5/a/:param7/b": { data: leaf },
    },
  };
  const endpoints = leafMapToEndpoints(leafMap);
  expect(endpoints).toHaveLength(6);
  expect(endpoints).toMatchSnapshot();
});
