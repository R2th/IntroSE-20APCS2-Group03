Trong bài viết trước, mình đã giới thiệu về NestJS và các thành phần cơ bản của framework này cũng như xây dựng demo một api bằng NestJS. Như mình đã giới thiệu, NestJS có một hệ sinh thái hỗ trợ cho chúng ta trong quá trình phát triển mà các framework khác như Express, Fastify,... phải tự build hoặc sử dụng các lib do cộng đồng phát triển. Trong bài viết này, mình sẽ giới thiệu về các thành phần đó cũng như cách apply chúng vào dự án NestJS của bạn.

## 1. Middleware

![](https://images.viblo.asia/f324733c-baa3-4643-9d53-835c1cbe7951.png)

Middleware là một function được thực hiện trước hàm xử lý route để thực hiện một tác vụ nhất định nào đó. Ở một số framework như Express thì Middleware thường được xử dụng để xác thực user, permission, validate data,.. nhưng ở NestJS việc xác thực hay validate đã có các thành phần riêng biệt đảm nhận nhiệm vụ này như **Pipes** và **Gruads** nên bạn sẽ không phải dùng đến Middleware nữa. Tuy nhiên, không chỉ có xác thực mà middleware còn làm rất nhiều nhiệm vụ khác tuỳ theo mục đích xử lý của trong api của bạn. 

Trong NestJS, Middleware có thể được tạo ra bằng function hoặc class. Mình sẽ demo về 2 cách tạo middleware bên dưới đây

Với class bạn cần define @Injectable() và implement `NestMiddleware`. Như trong bài trước mình đã nói, @Injectable() sẽ đưa class của bạn vào DI Container để khởi tạo và quản lý cũng như truyền phụ thuộc vào các bạn mà nó được sử dụng nhé.  

```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

```

Để triển khai Middleware vào các router, NestJS cung cấp interface `NestModule` với phương thức configure cho phép apply Middleware vào các route tương ứng trong `forRoutes()` .Tại app.module.ts chúng ta config như sau:

```js
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

Ngoài ra trong controller /cats, chúng ta có thể apply Middleware theo request method tương ứng bằng cách truyền tham số `{ path: String, method: RequestMethod }` vào  `forRoutes`. Việc config như dưới đây sẽ hạn chế sử dụng Middleware trong các request không cần sử dụng chúng:

```js
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
```

Với multiple middleware bạn chỉ cần truyền các middleware vào `apply()` như các tham số:

```js
consumer.apply(cors(), helmet(), logger).forRoutes('cats');
```

Đối với middleware đơn giản như `LoggerMiddleware` mình nhận thấy sử dụng class là không cần thiết vì nó không có phụ thuộc hay các phương thức xử lý phức tạp khác. Vì vậy chúng ta có thể sử dụng function middleware để thực hiện nhiệm vụ này

```js
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

Và tất nhiên rồi, việc apply chúng cũng giống như class:

```js
consumer
  .apply(logger)
  .forRoutes(CatsController);
```

## 2. Exception filters

![](https://images.viblo.asia/b557d104-96c8-4ea0-a936-ecf35ec03b61.png)

Nest cung cấp một thành phần xử lý các trường hợp ngoại lệ mà ứng dụng của bạn chưa xử lý. Khi một ngoại lệ xảy ra, nếu ứng dụng của bạn không xử lý Exception filters sẽ xử lý ngoại lệ đó và trả về response cho người dùng. Ngoài ra  Exception filters cũng tích hợp sẵn cho chúng ta một bộ lọc ngoại lệ tiêu chuẩn để response cho người dùng. Nest cung cấp class `HttpException` để gửi các response http tiêu chuẩn khi có lỗi xảy ra. Ngoài ra, bạn có thể tạo ra các bộ lọc riêng cho ứng dụng của mình bằng cách kế thừa `HttpException`. Trong cats.controller.ts, mình có trả về một ngoại lệ trong findAll như sau:

```js
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

Trong ví dụ trên, findAll() sẽ trả về lỗi ngoại lệ với instance của HttpException có 2 tham số đầu vào là @response và @status. Tham số @response có thể là message hoặc cũng có thể là object như bên dưới đây.

```js
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
```


Mặc dù bộ lọc ngoại lệ được tích hợp sẵn để xử lý cho nhiều trường hợp ngoại lệ nhưng Nest vẫn cho phép bạn kiểm soát toàn quyền việc xử lý ngoại lệ. Ví dụ như bạn muốn trả về timestamp hoặc path của route bị lỗi hay ghi log tất cả exception thì đều có thể làm được.  Ví dụ:

```js
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```

@Catch (HttpException) liên kết  metadata được yêu cầu  với bộ lọc ngoại lệ, cho Nest biết rằng bộ lọc cụ thể này đang tìm kiếm các ngoại lệ của loại HttpException. @Catch () có thể nhận một tham số duy nhất hoặc một danh sách được phân tách bằng dấu phẩy. Điều này cho phép bạn thiết lập bộ lọc cho một số loại ngoại lệ cùng một lúc. Trong method `catch()` có 2 tham số là `HttpException` và `ArgumentsHost`, HttpException có trách nhiệm lấy ra dữ liệu và ngoại lệ trả về như status, response còn ArgumentsHost cho phép chúng ta truy cập đến đối tượng request và response về cho người dùng.

Sau đó để apply bộ lọc ngoại lệ cho tất cả các api thì chúng ta chỉ cần config như sau:

```js
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

## 3. Tổng kết

Trong bài viết trên mình đã giới thiệu 2 thành phần quan trọng mà không thể thiếu được trong NestJS. Tiếp cận với NestJS còn khá khó khăn với nhiều người bởi tính phức tạp và nghiêm ngặt của nó. Vì vậy mình sẽ cố gắng xây dựng bài viết một cách chi tiết để mọi người có thể nắm bắt được. Tuy phức tạp nhưng khi tiếp cận với NestJS bạn sẽ thấy nó có rất nhiều ưu điểm tốt hơn các framework cũng như hệ sinh thái của nó hỗ trợ ta tất tốt trong quá trình phát triển .Hẹn gặp các bạn ở bài viết tiếp theo.