import { ApiRequest } from "../types";

export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE";

interface request {
  type: typeof FETCH_AUTH_REQUEST;
  payload: ApiRequest;
}
interface success {
  type: typeof FETCH_AUTH_SUCCESS;
  payload: ApiRequest;
}
interface falture {
  type: typeof FETCH_AUTH_FAILURE;
  payload: ApiRequest;
}
export type AUTH = request | success | falture;
export type { ApiRequest };
