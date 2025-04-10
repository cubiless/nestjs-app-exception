import { AppExceptionBuilder } from '../src/AppException.builder';
import { AppExceptionExporter } from '../src/AppException.exporter';

describe('AppExceptionExporter', () => {
  it('an simple exception', async () => {
    const exception = AppExceptionBuilder.create()
      .setScope('Database')
      .setCode('P2302')
      .setMessage('ErrorMessage')
      .build();

    const json = new AppExceptionExporter(exception).export();

    expect(json.code).toBe('Database/P2302');
    expect(json.message).toBe('ErrorMessage');
    expect(json.cause).toBe(undefined);
    expect(json.params).toStrictEqual({});
  });

  it('an deep exception', async () => {
    const exception1 = AppExceptionBuilder.create()
      .setScope('Database')
      .setCode('P2302')
      .setMessage('ErrorMessage')
      .build();

    const exception2 = AppExceptionBuilder.create()
      .setCause(exception1)
      .build();

    const json = new AppExceptionExporter(exception2).export();

    expect(json.cause?.code).toBe('Database/P2302');
  });
});
