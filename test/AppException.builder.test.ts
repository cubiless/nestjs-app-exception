import { AppExceptionBuilder, AppExceptionLevel } from '../src';

describe('AppExceptionBuilder', () => {
  it('an simple exception', async () => {
    const exception = AppExceptionBuilder.create()
      .setScope('Database')
      .setCode('P2302')
      .setMessage('ErrorMessage')
      .setLevel(AppExceptionLevel.Internal)
      .build();

    expect(exception.code).toBe('P2302');
    expect(exception.scope).toBe('Database');
    expect(exception.level).toBe(AppExceptionLevel.Internal);
    expect(exception.cause).toBe(undefined);
    expect(exception.message).toBe('ErrorMessage');
  });

  it('an deep exception', async () => {
    const exception1 = AppExceptionBuilder.create()
      .setScope('Database')
      .setCode('P2302')
      .setMessage('ErrorMessage')
      .setLevel(AppExceptionLevel.Internal)
      .build();

    const exception2 = AppExceptionBuilder.create()
      .setCause(exception1)
      .build();

    expect(exception2.cause).toBe(exception1);
  });
});
