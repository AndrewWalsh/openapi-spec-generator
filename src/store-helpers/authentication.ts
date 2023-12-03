import type { Entry } from "har-format";
import { isEmpty } from "lodash-es";

import { Leaf } from "../types.js";
import { parseAuthHeaders } from "./authentication-headers.js";

export const getAuthType = (auth: string) => {
  const split = auth.split(" ");
  if (!split.length) return "";
  return split[0]!.toLowerCase();
};

type DetermineAuthFromHAR = (
  harRequest: Entry
) => Leaf["authentication"] | undefined;
const determineAuthFromHAR: DetermineAuthFromHAR = (harRequest) => {
  const finalAuth: Leaf["authentication"] = {};
  const authItems = parseAuthHeaders(harRequest.request.headers);
  authItems.forEach((auth) => {
    finalAuth[auth.authType] = auth;
  });
  if (isEmpty(finalAuth)) return;
  return finalAuth;
};

export default determineAuthFromHAR;
