import { SharXJSONErrorResponse, SharXJSONSuccessResponse } from "../index";

/**
 * JSON response for GET /service/info
 */
export type ServiceInfoResponse = ServiceInfoSuccessResponse | SharXJSONErrorResponse;

/**
 * Successful JSON response for GET /service/info
 */
interface ServiceInfoSuccessResponse extends SharXJSONSuccessResponse {
  /**
   * Git repo information
   */
  git: {
    /**
     * Current git commit hash
     */
    commit: string;

    /**
     * Current git tag
     */
    tag: string;

    /**
     * Current git branch
     */
    branch: string;

    /**
     * Current git semantic version
     */
    semver: number[];
  };

  /**
   * Custom service name
   * 
   * Set with `$CUSTOM_HOST_NAME`
   */
  name: string;

  /**
   * Custom service description
   * 
   * Set with `$CUSTOM_HOST_DESCRIPTION`
   */
  desc: string;
}


///


/**
 * JSON response for GET /service/stats
 */
export type ServiceStatsResponse = ServiceStatsSuccessResponse | SharXJSONErrorResponse;

/**
 * Successful JSON response for GET /service/stats
 */
interface ServiceStatsSuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The service uptime in seconds
   */
  uptime: number;

  /**
   * The total number of uploaded images
   */
  images: number;

  /**
   * The registered user count
   */
  users: number;

  /**
   * The total number of logged in dashboard sessions
   */
  sessions: number;
}