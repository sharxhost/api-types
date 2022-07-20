import { ExpiredTokenError, ImageNotFoundError, InvalidAuthHeaderError, InvalidTokenError, MalformedRequestError, ResourceAlreadyExistsError } from "../errors";
import { SharXBinaryResponse, SharXJSONErrorResponse, SharXJSONSuccessResponse } from "../index";

/**
 * JSON response for POST /image/upload
 */
export type ImageUploadResponse = ImageUploadSuccessResponse | SharXJSONErrorResponse<InvalidAuthHeaderError | InvalidTokenError | MalformedRequestError | ExpiredTokenError | InvalidTokenError | ResourceAlreadyExistsError>;

/**
 * Successful JSON response for POST /image/upload
 */
interface ImageUploadSuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The image's 8-character short ID
   */
  shortid: string;

  /**
   * The image's v4 UUID
   */
  uuid: string;
}


///


/**
 * JSON response for GET /image/:id/meta
 */
export type ImageMetaResponse = ImageMetaSuccessResponse | SharXJSONErrorResponse<ImageNotFoundError>;

/**
 * Successful JSON response for GET /image/:id/meta
 */
interface ImageMetaSuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The image's 8-character short ID
   */
  shortid: string;

  /**
   * The image's v4 UUID
   */
  uuid: string;

  /**
   * The image's filename
   */
  name: string;

  /**
   * The UNIX timestamp of when the image was uploaded
   */
  uploaded: number;

  /**
   * The image size in bytes
   */
  size: number;

  /**
   * The image's hash
   * 
   * Computed using https://github.com/danm/image-hash with bits=16, precise=true
   */
  hash: string;
}


///


/**
 * Response for GET /image/:id
 */
export type ImageResponse = ImageSuccessResponse | SharXJSONErrorResponse<ImageNotFoundError>;

/**
 * Successful binary response for GET /image/:id
 * Returns the raw image data
 */
type ImageSuccessResponse = SharXBinaryResponse;