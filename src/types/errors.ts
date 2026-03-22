export class AppError<T> extends Error {
  code: T;
  constructor({ code, msg, cause }: AppErrorParams<T>) {
    super(msg, { cause: cause });
    this.code = code;
  }
}

export interface AppErrorParams<T> {
  code: T;
  msg: string;
  cause: string;
}

export interface MacroError extends AppErrorParams<MacroErrorCode> {
  code: MacroErrorCode;
}

export enum MacroErrorCode {
  MACRO_LIMIT_REACHED = 403,
  CONTENT_TOO_LARGE = 413,
  MACRO_NOT_FOUND = 404,
  UNHANDLED_EXCEPTION = 500,
}
