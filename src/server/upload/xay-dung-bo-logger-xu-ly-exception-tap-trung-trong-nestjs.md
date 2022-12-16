# Giới thiệu
Trong các ứng dụng Backend việc xây dựng logger và xử lý exception tập trung rất quan trọng cho việc xử lý và điều tra lỗi.
NestJS đã cung cấp sẵn một số module, chúng ta có thể implement tùy ý tùy theo logic mình mong muốn.
# Logger
NestJS đã cung cấp sẵn một bộ text-base logger, được sử dụng trong suốt quá trình bootstraping, một số trường hợp khác như hiển thị exception.
## Basic
Trong một số trường hợp và tùy vào dự án chúng ta sử dụng một số bộ log khác như Winston:

Bạn có thể tắt, hoặc xác định log level ngay từ quá trình bootstraping ứng dụng
```js
const app = await NestFactory.create(ApplicationModule, {
  logger: false,
});
await app.listen(3000);
```

**Xác định log level tại thời điểm bootstraping:**
```js
const app = await NestFactory.create(ApplicationModule, {
  logger: ['error', 'warn'],
});
await app.listen(3000);
```

Các log level được support: `log`, `error`, `warn`, `debug`, `verbose`
## Custom
NestJS cung cấp trước class base là `LoggerService` và `Logger`, chúng ta có thể custom lại một số log level.

Ví dụ
```js
import { Logger } from '@nestjs/common';

export class MyLogger extends Logger {
    error(message: string, trace: string) {
    // Send stack trace to chatwork, or some others logic
    super.error(message, trace);
  }
}
```
## Xây dựng log module
### DI (Dependency injection)
Như các bạn đã biết, NestJS được xây dựng theo mô hình DDD, project sẽ được chia thành các module nhỏ. Mình sẽ xây dựng một module chuyên xử lý các vấn đề về log, từ đó có thể Inject vào các module khác.

Tạo class LoggerService
```js
import { Injectable, Logger, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  error(message: any, trace?: string, context?: string) {
    // TO DO
    super.error(message, trace, context)
  }

  warn(message: any, context?: string) {
    // TO DO
    super.warn(message, context)
  }

  log(message: any, context?: string) {
    // TO DO
    super.log(message, context)
  }

  debug(message: any, context?: string) {
    // TO DO
    super.debug(message, context)
  }

  verbose(message: any, context?: string) {
    // TO DO
    super.verbose(message, context)
  }
}
```

Tạo module logger
```js
import { Module } from '@nestjs/common'
import { LoggerService } from './logger.service'

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
```
### Application logging
Sau khi xây dựng xong Log Module, để sử dụng chúng ta chỉ cần Inject module vào bất kỳ context, controller nào :D
Ví dụ Inject logger vào controller
```js
import { Injectable } from '@nestjs/common';
import { MyLogger } from './my-logger.service';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(private myLogger: MyLogger) {
    this.myLogger.setContext('CatsService');
  }

  findAll(): Cat[] {
    this.myLogger.warn('About to return cats!');
    return this.cats;
  }
}
```
# Exception
Sau khi đã xây dựng xong bộ logger, lúc này tiếp đến là phần Exception Handling.
Về cơ bản, tất cả những exception không được catch trong code sẽ được catch tập trung tại layer này

![](https://images.viblo.asia/269ce1b2-5f41-4058-be63-7b3ad631159c.png)

```js
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { LoggerService } from '../logger/custom.logger'
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface'
import { Response } from 'express'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp()
    const response: Response = ctx.getResponse()
    
    // Handling error message and logging
    this.handleMessage(exception)
    
    // Response to client
    AllExceptionFilter.handleResponse(response, exception)
  }
  
  private handleMessage(exception: HttpException | Error): void {
    let message = 'Internal Server Error'
    
    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse())
    } else if (exception instanceof Error) {
      message = exception.stack.toString()
    }
  
    this.logger.error(message)
  }
  
  private static handleResponse(response: Response , exception: HttpException | Error): void {
    let responseBody: any = { message: 'Internal server error' }
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    
    if (exception instanceof HttpException) {
      responseBody = exception.getResponse()
      statusCode = exception.getStatus()
      
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: statusCode,
        message: exception.stack
      }
    }
  
    response.status(statusCode).json(responseBody)
  }
}
```

Tại đây mình sẽ phân biệt 2 loại exception chính, đó là Built-in Error và HttpException
Sau khi catch được exception, sẽ tiến hành lấy error message, status code.
Ở đây mình đã inject **Logger service** vào class **AllExceptionFilter**, khi catch được exception ngoài repsone về cho phía client thì sẽ tiến hành ghi vào log.

Trên đây mình có vắn tắt lại quá trình xây dựng bộ log và xử lý exception tập trung, chi tiết các bạn có thể tham khảo tại repo:
https://github.com/hoangtm1601/nest-base