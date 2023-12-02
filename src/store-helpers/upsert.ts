import decodeUriComponent from "decode-uri-component";
import type { Entry } from "har-format";
import { createRouter } from "radix3";

import { pathToArray } from "../helpers.js";
import type { Options } from "../RequestStore.js";
import { JSONType, Leaf, RouterMap } from "../types.js";
import createLeaf from "./create-leaf.js";
import { mergeLeaves } from "./merge.js";

type Params = {
  harRequest: Entry;
  responseBody: JSONType;
  store: RouterMap;
  options: Options;
};

type Returns = {
  insertedPath: string;
  insertedLeaf: Leaf;
  insertedHost: string;
};

export default function upsert({
  harRequest,
  responseBody,
  store,
  options,
}: Params): Returns | null {
  const url = new URL(harRequest.request.url);
  const { host } = url;
  const pathname = decodeUriComponent(url.pathname);
  const parts = pathToArray(pathname);
  if (parts.length === 0) return null;
  // Set the host on first visit
  if (!store[host]) {
    store[host] = createRouter();
  }
  // Create or update the leaf
  const insertLeaf = createLeaf({ harRequest, responseBody, options });
  const router = store[host]!;
  const matchedRoute = router.lookup(pathname);
  const nextLeaf = matchedRoute
    ? mergeLeaves(matchedRoute.data, insertLeaf)
    : insertLeaf;
  const parameterisedPath = matchedRoute?.data.pathname || pathname;
  nextLeaf.pathname = parameterisedPath;
  router.insert(parameterisedPath, { data: nextLeaf });
  return {
    insertedPath: parameterisedPath,
    insertedLeaf: nextLeaf,
    insertedHost: host,
  };
}
