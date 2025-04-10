## Installation

```
$ npm i @cubiles/nestjs-app-exception
```

## Example

```ts
// App.config.ts
import { FromEnv } from '@cubiles/nestjs-config-utils';
import { IsString, IsNumber } from 'class-validator';

export class AppConfig {
  @FromEnv('APP_ADDRESS')
  @IsString()
  readonly address: string = 'localhost';

  @FromEnv('APP_PORT')
  @IsNumber()
  readonly port: number = 1234;
}
```
