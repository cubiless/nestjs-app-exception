import { AppException } from '../AppException';
import { AppExceptionLevel } from '../enums/AppException.level';

export class AppDeniedException extends AppException<Record<string, unknown>> {
  constructor(cause?: Error) {
    super({
      scope: 'App',
      code: 'Denied',
      level: AppExceptionLevel.External,
      message: 'Access Denied',
      cause: cause,
    });
  }
}
