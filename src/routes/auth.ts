import { ExpiredTokenError, IllegalCharacterError, InvalidAuthHeaderError, InvalidCredentialsError, InvalidTokenError, SharXError, TooLongFieldError, TooShortFieldError, UserAlreadyRegisteredError } from "../errors";
import { SharXJSONErrorResponse, SharXJSONRequestBody, SharXJSONSuccessResponse, SharXResponse } from "../index";

/**
 * An API response to an endpoint that requires user JWT authentication
 */
export type AuthenticatedSharXResponse<T extends SharXResponse = SharXResponse> = T | SharXJSONErrorResponse<InvalidAuthHeaderError | InvalidTokenError | ExpiredTokenError | SharXError>;

/**
 * A SharX username
 * 
 * Minimum length: 3 (otherwise throws `TooShortFieldError`)
 * Maximum length: 16 (otherwise throws `TooLongFieldError`)
 * Characters: `a`-`z`, `A`-`Z`, `0`-`9`, `_`, `-` (otherwise throws `IllegalCharacterError`)
 */
export type SharXUsername = string;


///


/**
 * JSON body for POST /auth/create
 */
export interface AuthCreateBody extends SharXJSONRequestBody {
  /**
   * The username of the user to create
   */
  username: SharXUsername;

  /**
   * The cleartext password of the user to create
   * 
   * Minimum length: 5 (otherwise throws `TooShortFieldError`)
   */
  password: string;

  /**
   * The email of the user to create
   * 
   * Minimum length: 1 (otherwise throws `TooShortFieldError`)
   */
  email: string;
}

/**
 * JSON response for POST /auth/create
 */
export type AuthCreateResponse = AuthCreateSuccessResponse | SharXJSONErrorResponse<TooShortFieldError | TooLongFieldError | IllegalCharacterError | UserAlreadyRegisteredError>;

/**
 * Successful JSON response for POST /auth/create
 */
interface AuthCreateSuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The created user's v4 UUID
   */
  uuid: string;

  /**
   * The JWT token used for authentication
   */
  token: string;
}


///


/**
 * JSON body for POST /auth/login
 */
export interface AuthLoginBody extends SharXJSONRequestBody {
  /**
   * The email of the user to log in to
   */
  email: string;

  /**
   * The cleartext password of the user to log in to
   */
  password: string;
}

export type AuthLoginResponse = AuthLoginSuccessResponse | SharXJSONErrorResponse<InvalidCredentialsError>;

/**
 * Successful JSON response for POST /auth/login
 */
interface AuthLoginSuccessResponse extends SharXJSONSuccessResponse {
  /**
   * The user's v4 UUID
   */
  uuid: string;

  /**
   * The JWT token used for authentication
   */
  token: string;
}


///


/**
 * JSON response for DELETE /auth/logout
 */
export type AuthLogoutResponse = AuthenticatedSharXResponse<AuthLogoutSuccessResponse> | SharXJSONErrorResponse;

/**
 * Successful JSON response for DELETE /auth/logout
 */
type AuthLogoutSuccessResponse = SharXJSONSuccessResponse;


///


/**
 * JSON body for POST /auth/changePassword
 */
export interface AuthChangePasswordBody extends SharXJSONRequestBody {
  /**
   * The cleartext old user's password
   */
  oldPassword: string;

  /**
   * The cleartext new password
   * 
   * Minimum length: 5 (otherwise throws `TooShortFieldError`)
   */
  password: string;
}

/**
 * JSON response for POST /auth/changePassword
 */
export type AuthChangePasswordResponse = AuthenticatedSharXResponse<AuthChangePasswordSuccessResponse> | SharXJSONErrorResponse<TooShortFieldError | InvalidCredentialsError>

/**
 * Successful JSON response for POST /auth/changePassword
 */
type AuthChangePasswordSuccessResponse = SharXJSONSuccessResponse;

