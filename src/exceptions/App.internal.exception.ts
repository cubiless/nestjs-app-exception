import { AppException } from '../AppException';
import { AppExceptionLevel } from '../enums/AppException.level';

export class AppInternalException extends AppException<
  Record<string, unknown>
> {
  constructor(cause?: Error) {
    super({
      scope: 'App',
      code: 'Internal',
      level: AppExceptionLevel.Internal,
      message: 'Internal Exception',
      cause: cause,
    });
  }
}
