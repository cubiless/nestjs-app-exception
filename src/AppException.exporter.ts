import { AppException } from './AppException';
import { AppExceptionLevel } from './enums/AppException.level';
import { AppExceptionExport } from './AppException.export';
import { AppInternalException } from './exceptions/App.internal.exception';

export class AppExceptionExporter {
  private readonly exception: Error;
  private level: AppExceptionLevel = AppExceptionLevel.External;

  constructor(exception: Error) {
    this.exception = exception;
  }

  setLevel(level: AppExceptionLevel) {
    this.level = level;
  }

  private exportAppException(exception: Error): AppExceptionExport {
    if (exception instanceof AppException) {
      if (
        exception.level === AppExceptionLevel.Internal ||
        (exception.level === AppExceptionLevel.External &&
          this.level === AppExceptionLevel.External)
      ) {
        return {
          code: `${exception.scope}/${exception.code}`,
          message: exception.message,
          params: exception.params ? exception.params : {},
          cause: exception.cause
            ? this.exportAppException(exception.cause)
            : undefined,
        };
      }
    } else if (this.level === AppExceptionLevel.Internal) {
      return {
        message: exception.message,
        code: exception.name,
        params: { exception },
      };
    }

    return this.exportAppException(new AppInternalException());
  }

  export(): AppExceptionExport {
    return this.exportAppException(this.exception);
  }

  exportCauseAppException() {
    let exception: Error = this.exception;

    while (exception instanceof AppException && exception.cause) {
      exception = exception.cause;
    }

    return exception;
  }
}
