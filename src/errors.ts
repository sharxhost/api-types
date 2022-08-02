import { Response } from "express";

export abstract class SharXError {
  code = "";
  data: unknown;
  httpCode: number;

  constructor(data: unknown, httpCode: number, code?: string) {
    this.code = this.code || code || this.constructor.name;
    this.data = data;
    this.httpCode = httpCode;
  }

  toJSON(): Record<string, unknown> {
    return {
      code: this.code,
      data: this.data,
    };
  }

  send(res: Response): void {
    res.status(this.httpCode).json({ success: false, error: this.toJSON() });
  }
}

export class UnknownError extends SharXError {
  code = "UnknownError";
  constructor(data: unknown) {
    super(data, 500);
  }
}

interface NormalError extends SharXError {
  data: Record<string, unknown>;
  code: Exclude<string, "UnknownError">;
}

export function isNormalError(error: SharXError): error is NormalError {
  return error.code !== "UnknownError";
}

export class MalformedRequestError extends SharXError implements NormalError {
  declare data: Record<string, unknown>;
  code = "MalformedRequestError";
  constructor(data: Record<string, unknown> = {}) {
    super(data, 400);
  }
}

interface JsonFieldErrorData extends Record<string, unknown> {
  field: string;
}

export class JsonFieldError extends MalformedRequestError {
  declare data: JsonFieldErrorData;
  code = "JsonFieldError";
  constructor(data: JsonFieldErrorData) {
    super(data);
  }
}

interface IllegalCharacterErrorData extends JsonFieldErrorData {
  character: string;
}

export class IllegalCharacterError extends JsonFieldError {
  declare data: IllegalCharacterErrorData;
  code = "IllegalCharacterError";
  constructor(data: IllegalCharacterErrorData) {
    super(data);
  }
}

interface TooShortFieldErrorData extends JsonFieldErrorData {
  minLength: number;
}

export class TooShortFieldError extends JsonFieldError {
  declare data: TooShortFieldErrorData;
  code = "TooShortFieldError";
  constructor(data: TooShortFieldErrorData) {
    super(data);
  }
}

interface TooLongFieldErrorData extends JsonFieldErrorData {
  maxLength: number;
}

export class TooLongFieldError extends JsonFieldError {
  declare data: TooLongFieldErrorData;
  code = "TooLongFieldError";
  constructor(data: TooLongFieldErrorData) {
    super(data);
  }
}

export class InvalidAuthHeaderError extends MalformedRequestError {
  code = "InvalidAuthHeaderError";
  constructor(data: Record<string, unknown> = {}) {
    super(data);
  }
}

export class InvalidCredentialsError extends SharXError implements NormalError {
  declare data: Record<string, unknown>;
  code = "InvalidCredentialsError";
  constructor(data: Record<string, unknown> = {}) {
    super(data, 401);
  }
}

export class InvalidTokenError extends InvalidCredentialsError {
  code = "InvalidTokenError";
  constructor(data: Record<string, unknown> = {}) {
    super(data);
  }
}

export class ExpiredTokenError extends InvalidTokenError {
  code = "ExpiredTokenError";
  constructor(data: Record<string, unknown> = {}) {
    super(data);
    this.httpCode = 403;
  }
}

export class ResourceNotFoundError extends SharXError implements NormalError {
  declare data: Record<string, unknown>;
  code = "ResourceNotFoundError";
  constructor(data: Record<string, unknown> = {}) {
    super(data, 404);
  }
}

export class ImageNotFoundError extends ResourceNotFoundError {
  code = "ImageNotFoundError";
  constructor(data: Record<string, unknown> = {}) {
    super(data);
  }
}

export class ResourceAlreadyExistsError extends SharXError implements NormalError {
  declare data: Record<string, unknown>;
  code = "ResourceAlreadyExistsError";
  constructor(data: Record<string, unknown> = {}) {
    super(data, 400);
  }
}

interface FieldAlreadyExistsErrorData extends Record<string, unknown> {
  field: string;
}

export class FieldAlreadyExistsError extends ResourceAlreadyExistsError {
  declare data: FieldAlreadyExistsErrorData;
  code = "FieldAlreadyExistsError";
  constructor(data: FieldAlreadyExistsErrorData) {
    super(data);
  }
}

export class UserAlreadyRegisteredError extends ResourceAlreadyExistsError {
  declare data: FieldAlreadyExistsErrorData;
  code = "UserAlreadyRegisteredError";
  constructor(data: FieldAlreadyExistsErrorData) {
    super(data);
  }
}


