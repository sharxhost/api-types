import { SharXError, UnknownError } from "./errors";

/**
 * A generic SharX API Response
 */
export type SharXResponse = SharXJSONResponse | SharXBinaryResponse;

/**
 * A JSON response from the API
 */
export interface SharXJSONResponse {
  /**
   * Determines if the request was successful
   */
  success: boolean;
}

/**
 * Checks if the API response is a JSON response
 */
export function isJsonResponse(response: SharXResponse): response is SharXJSONResponse {
  return !Buffer.isBuffer(response);
}

/**
 * A successful API response
 */
export interface SharXJSONSuccessResponse extends SharXJSONResponse {
  success: true;
}

/**
 * Checks if the JSON API response has succeeded
 */
export function isSuccessfulResponse(response: SharXJSONResponse): response is SharXJSONSuccessResponse {
  return response.success;
}

/**
 * A failed API response, also includes error info
 */
export interface SharXJSONErrorResponse<T extends SharXError = SharXError> extends SharXJSONResponse {
  success: false;
  error: T | UnknownError;
}

/**
 * Checks if the JSON API response has failed
 */
export function isFailedResponse<T extends SharXJSONResponse>(response: SharXJSONResponse): response is (T extends (SharXJSONSuccessResponse | SharXJSONErrorResponse) ? Exclude<T, SharXJSONSuccessResponse> : SharXJSONErrorResponse) {
  return !response.success;
}

/**
 * A binary API response used for sending files
 */
export type SharXBinaryResponse = Buffer;

/**
 * Checks if the API response is a JSON response
 */
export function isBinaryResponse(response: SharXResponse): response is SharXBinaryResponse {
  return Buffer.isBuffer(response);
}

export type SharXJSONRequestBody = Record<string, unknown>;