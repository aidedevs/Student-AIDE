/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as academic from "../academic.js";
import type * as events from "../events.js";
import type * as faqs from "../faqs.js";
import type * as feedbacks from "../feedbacks.js";
import type * as http from "../http.js";
import type * as news from "../news.js";
import type * as requests from "../requests.js";
import type * as resources from "../resources.js";
import type * as studentCenter from "../studentCenter.js";
import type * as tasks from "../tasks.js";
import type * as users from "../users.js";
import type * as writers from "../writers.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  academic: typeof academic;
  events: typeof events;
  faqs: typeof faqs;
  feedbacks: typeof feedbacks;
  http: typeof http;
  news: typeof news;
  requests: typeof requests;
  resources: typeof resources;
  studentCenter: typeof studentCenter;
  tasks: typeof tasks;
  users: typeof users;
  writers: typeof writers;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
