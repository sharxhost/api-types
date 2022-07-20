import { SharXJSONErrorResponse, SharXJSONSuccessResponse } from "../index";

/**
 * JSON response for GET /
 */
export type MainIndexResponse = MainIndexSuccessResponse | SharXJSONErrorResponse;

/**
 * Successful JSON response for GET /
 */
interface MainIndexSuccessResponse extends SharXJSONSuccessResponse {
  message: "Hello World!";
}