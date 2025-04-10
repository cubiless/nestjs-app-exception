import { Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlContextType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql/error';
import { AppExceptionExporter } from '../AppException.exporter';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('AppExceptionFilter');

  catch(exception: Error, host: ExecutionContextHost) {
    this.logger.error(exception);
    switch (host.getType<GqlContextType>()) {
      case 'http':
        return this.onHttpError(exception);
      case 'graphql':
        return this.onGraphQLError(exception);
    }
  }

  protected onHttpError(exception: Error) {
    const exporter = new AppExceptionExporter(exception);
    return new HttpException(exporter.export(), 200);
  }

  protected onGraphQLError(exception: Error) {
    if (exception instanceof GraphQLError) {
      return exception;
    }

    const exporter = new AppExceptionExporter(exception);

    return new GraphQLError(exception.message, {
      extensions: exporter.export(),
    });
  }
}
