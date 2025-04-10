import { AppExceptionLevel } from './enums/AppException.level';

export type AppExceptionOption<Params extends Record<string, unknown>> = {
  code: string;
  scope?: string;
  params?: Params;
  message: string;
  cause?: Error;
  level?: AppExceptionLevel;
};

export class AppException<
  Params extends Record<string, unknown>,
> extends Error {
  readonly scope?: string;
  readonly code: string;
  readonly params?: Params;
  readonly cause?: Error;
  readonly level: AppExceptionLevel;

  constructor(options: AppExceptionOption<Params>) {
    super(options.message);
    this.code = options.code;
    this.scope = options.scope;
    this.cause = options.cause;
    this.params = options.params;
    this.level = options.level ?? AppExceptionLevel.External;
  }
}
