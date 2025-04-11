import { AppException } from '../AppException';
import { AppExceptionLevel } from '../enums/AppException.level';

export class AppValidationException extends AppException<
  Record<string, unknown>
> {
  constructor(errors: Error[]) {
    super({
      scope: 'Validation',
      code: 'failed',
      level: AppExceptionLevel.External,
      message: 'The Validation of input values are invalid.',
      params: { errors },
    });
  }
}
