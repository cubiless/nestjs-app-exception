## Installation

```
$ npm i @cubiles/nestjs-app-exception
```

## Example

### Usage as nestjs filter

```ts
 app.useGlobalFilters(new AppExceptionFilter());
```

### Define AppException

#### Create an AppException

```ts
const exception = AppExceptionBuilder.create()
  .setScope('Database')
  .setCode('P2302')
  .setMessage('ErrorMessage')
  .build();
```

#### Create an AppException and throw it

```ts

const exception = AppExceptionBuilder.create()
  .setScope('Database')
  .setCode('P2302')
  .setMessage('ErrorMessage')
  .throw();
```

#### Create an AppException with a another cause

```ts
const anotherExpception = AppExceptionBuilder.create()
  .setScope('Account')
  .setCode('P2302')
  .setCause(exception)
  .throw();
```
