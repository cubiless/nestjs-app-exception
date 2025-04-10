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
    if (!(exception instanceof AppException)) {
      return this.exportAppException(new AppInternalException());
    }

    switch (this.level) {
      case AppExceptionLevel.External:
        if (exception.level === AppExceptionLevel.Internal) {
          return this.exportAppException(new AppInternalException());
        }
    }

    return {
      code: `${exception.scope}/${exception.code}`,
      message: exception.message,
      params: exception.params ? exception.params : {},
      cause: exception.cause
        ? this.exportAppException(exception.cause)
        : undefined,
    };
  }

  export(): AppExceptionExport {
    return this.exportAppException(this.exception);
  }
}
