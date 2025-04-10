import { AppException } from './AppException';
import { AppExceptionLevel } from './enums/AppException.level';

export class AppExceptionBuilder<Params extends Record<string, unknown>> {
  private scope?: string;
  private code?: string;
  private message?: string;
  private level?: AppExceptionLevel;
  private cause?: Error;
  private params?: Params;

  private constructor() {}

  static create<P extends Record<string, unknown>>(): AppExceptionBuilder<P> {
    return new AppExceptionBuilder<P>();
  }

  setMessage(message: string): AppExceptionBuilder<Params> {
    this.message = message;
    return this;
  }

  setCode(code: string): AppExceptionBuilder<Params> {
    this.code = code;
    return this;
  }

  setScope(scope: string): AppExceptionBuilder<Params> {
    this.scope = scope;
    return this;
  }

  setCause(cause: Error): AppExceptionBuilder<Params> {
    this.cause = cause;
    return this;
  }

  setLevel(level: AppExceptionLevel): AppExceptionBuilder<Params> {
    this.level = level;
    return this;
  }

  setParams(params: Params): AppExceptionBuilder<Params> {
    this.params = params;
    return this;
  }

  build(): AppException<Params> {
    return new AppException<Params>({
      message: this.message ?? 'AppException',
      scope: this.scope,
      code: this.code ?? 'Unknown Error',
      level: this.level,
      params: this.params,
      cause: this.cause,
    });
  }

  throw() {
    throw this.build();
  }
}
