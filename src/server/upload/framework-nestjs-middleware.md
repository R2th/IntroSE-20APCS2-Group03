# Middleware
Middleware là 1 function được gọi trước router handler. Middleware có thể truy cập vào đối trượng `request` và `response`, và gọi `next()` để gọi đến middlewave tiếp theo trong chu kì request-response của ứng dụng.
![](https://images.viblo.asia/ae44463f-3823-4768-ab76-cb2aec197a76.png)
Mặt định, Nest middlewave tương đương với Expess middlewave. Theo mô tả từ tài liệu chính thức của express thì các khả năng của middlewave như sau:
Middlewave có thể thực hiện các nhiệm vụ sau:
* Thực thi một đoạn code bất kì.
* Thay đổi đối tượng request và response
* Kết thúc chu kì request-response
* Gọi middlewave tiếp theo trong chuổi
* Nếu middlewave hiện tại không kết thúc chu kỳ request-response, thì nó cần phải gọi `nest()` để chuyển quyền điều kiển đến middlewave tiếp theo. Nếu không request sẽ bị treo.



Để triển khai một Nest middlewave, bạn có thể viết một function hoặc một class với decorator `@Injectable()` . Class cần implement interface `NestMiddleware`, trong kh function thì không có bất kỳ yêu cầu đặc biệt nào. Hãy bắt đầu bằng cách thực hiện một middlewave đơn giản bằng cách sử dụng class.

```
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}

```

# Dependency injection
Nest middlewave có đầy đủ hỗ trợ của Dependency Injection. Giống như provider và controller. Chúng có thể inject dependencies mà có sẳn trong module hiện tại. Điều này được thực hiện thông qua hàm `contructor`.
# Applying middleware

Không có chỗ cho middlewave trong decorator `@Module()`. Thay vào đó, chúng ta thiết lập middlewave bằng cách sử dụng hàm `configure()`. Một module muốn bao gồm middlewave cần phải implement interface `NestModule`. Bây giờ chúng ta sẽ thiếp lập `LoggerMiddleware`  vào `AppModule`.
```
// app.module.ts
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

Trong ví dụ trên, chúng ta đã thiết lập `LoggerMiddleware` cho các route handlers của `/cats`đã được xác định trước đó bên trong `CatsController`. 
Chúng ta cũng có thể tiếp tục hạn chế middlewave cho một phương thức yêu cầu cụ thể bằng cách chuyển một đối tượng có chứa `path` và `method` đến phương thức `forRoutes()` khi định cấu hình middlewave.

```
// app.module.ts
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

```
# Route wildcards
Các tuyến đường dựa trên pattern cũng được hỗ trợ. Chẳng hạn, dấu hoa thị được sử dụng làm ký tự đại diện và sẽ khớp với bất kỳ tổ hợp ký tự nào:
```
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

# Middleware consumer
`MiddlewareConsumer` là một helper. Nó cung cấp 1 vài method để quản lý middlewave. Tất cả chúng đèo được gọi theo chuổi.


```
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller.ts';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
```

# Excluding routes
Đôi khi chúng tôi muốn loại trừ các tuyến nhất định khỏi việc áp dụng phần mềm trung gian:

```
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```

# Functional middleware
```
// logger.middleware.ts
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

```
// app.module.ts
consumer
  .apply(logger)
  .forRoutes(CatsController);
```

# Multiple middleware

Như đã đề cập ở trên, để liên kết nhiều middlewave được thực hiện tuần tự, chỉ cần cung cấp một danh sách được cách nhau bằng dấu phẩy bên trong phương thức `apply()`:
```
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

# Global middleware
Nếu chúng ta muốn liên kết phần middlewave với mọi tuyến đã đăng ký cùng một lúc, chúng ta có thể sử dụng phương thức `use()` được cung cấp bởi đối tượng `INestApplication`:
```
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```