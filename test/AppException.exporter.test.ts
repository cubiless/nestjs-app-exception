import { AppExceptionBuilder, AppExceptionExporter } from '../src';

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

  it('an deep exception', async () => {
    const exception1 = AppExceptionBuilder.create()
      .setScope('Database')
      .setCode('P2302')
      .setMessage('ErrorMessage')
      .build();

    const exception2 = AppExceptionBuilder.create()
      .setCause(exception1)
      .build();

    const exception3 = AppExceptionBuilder.create()
      .setCause(exception2)
      .build();

    const exception4 = AppExceptionBuilder.create()
      .setCause(exception3)
      .build();

    const json = new AppExceptionExporter(exception4).export();

    expect(json.cause?.cause?.cause?.code).toBe('Database/P2302');
  });
});
