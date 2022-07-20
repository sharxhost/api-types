import { SharXJSONErrorResponse, SharXJSONSuccessResponse } from "../index";
import { AuthenticatedSharXResponse } from "./auth";

/**
 * JSON response for POST /user/uploadKey
 */
export type PostUserUploadKeyResponse = AuthenticatedSharXResponse<PostUserUploadKeySuccessResponse> | SharXJSONErrorResponse;

/**
 * Successful JSON response for POST /user/uploadKey
 */
interface PostUserUploadKeySuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The created upload key
   */
  key: string;
}


///


/**
 * JSON response for GET /user/uploadKey
 */
export type GetUserUploadKeyResponse = AuthenticatedSharXResponse<GetUserUploadKeySuccessResponse> | SharXJSONErrorResponse;

/**
 * Successful JSON response for GET /user/uploadKey
 */
interface GetUserUploadKeySuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The user's upload keys
   */
  key: string[];
}


///


/**
 * JSON response for DELETE /user/uploadKey/:key
 */
export type DeleteUserUploadKeyResponse = AuthenticatedSharXResponse<DeleteUserUploadKeySuccessResponse> | SharXJSONErrorResponse;

/**
 * Successful JSON response for DELETE /user/uploadKey/:key
 */
type DeleteUserUploadKeySuccessResponse = SharXJSONSuccessResponse;


///


/**
 * JSON response for GET /user/info
 */
export type UserInfoResponse = AuthenticatedSharXResponse<UserInfoSuccessResponse> | SharXJSONErrorResponse;

/**
 * Successful JSON response for GET /user/info
 */
interface UserInfoSuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The user's v4 UUID
   */
  uuid: string;

  /**
   * The user's username
   */
  username: string;

  /**
   * The user's email
   */
  email: string;

  /**
   * The UNIX timestamp of when the user was created
   */
  createdAt: number;
}