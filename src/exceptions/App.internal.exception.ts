import { AppException } from '../AppException';
import { AppExceptionLevel } from '../enums/AppException.level';

export class AppInternalException extends AppException<
  Record<string, unknown>
> {
  constructor() {
    super({
      scope: 'App',
      code: 'Internal',
      level: AppExceptionLevel.External,
      message: 'Internal Exception',
    });
  }
}
