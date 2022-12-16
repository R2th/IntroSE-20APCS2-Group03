# Exception filters
Nest đi kèm với một exception filter tích hợp có trách nhiệm xử lý tất cả các exception chưa được xử lý trên một ứng dụng. Khi một exception không được xử lý bởi mã ứng dụng của bạn, nó sẽ bị lớp này bắt giữ, sau đó nó sẽ tự động gửi một phản hồi thân thiện với người dùng.
![](https://images.viblo.asia/869a5683-c375-4ec2-b98d-986ab4dc2db8.png)

Có 1 exception filter mặc định mà khi có một exception, lớp này sẽ trả về một thông tin json như sau:

```
{
  "statusCode": 500,
  "message": "Internal server error"
}
```


# Throwing standard exceptions
Nest cung cấp một lớp `HTTPException`, được export từ gói `@nestjs/common`. Đối với các ứng dụng dựa trên  HTTP REST/GraphQL API, cách tốt nhất là gửi các đối tượng HTTP  response tiêu chuẩn khi xảy ra một số điều kiện lỗi nhất định.

Ví dụ, trong `CatsContoder`, chúng ta có một phương thức `findAll()`. Chúng ta hãy giả sử rằng trình xử lý tuyến đường này ném một exception vì một số lý do. Để chứng minh điều này, chúng ta sẽ code nó như sau:

```
// cats.controller.ts

@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```
Khi client gọi điểm cuối này, phản hồi sẽ như thế này:

```
{
  "statusCode": 403,
  "message": "Forbidden"
}
```


Hàm tạo `HttpException ` lấy hai đối số bắt buộc để xác định response:

* Đối số response xác định  JSON response  body. Nó có thể là một string hoặc một object như được mô tả dưới đây.
* Đối số status  xác định HTTP status code.

Phần JSON response body chứa hai thuộc tính:
* statusCode: mặc định cho HTTP status code được cung cấp trong đối số status 
* message: mô tả ngắn về lỗi HTTP dựa trên status


Để ghi đè 1 phần message của JSON response body, hãy cung cấp một string trong đối số response. Để ghi đè toàn bộ phầnJSON response body, hãy truyền một object trong đối số response. Nest sẽ serialize object và trả về nó dưới dạng JSON response body

Đối số thứ hai của hàm tạo - status  - phải là  HTTP status code hợp lệ.

Đây là một ví dụ ghi đè lên toàn bộ JSON response body:

```
// cats.controller.ts

@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
```
Đây là response :

```
{
  "status": 403,
  "error": "This is a custom message"
}
```
# Custom exceptions

Trong nhiều trường hợp, bạn sẽ không cần phải viết các custom exceptions và có thể sử dụng Nest HTTP exception tích hợp, như được mô tả trong phần tiếp theo. Nếu bạn cần tạo các custom exceptions, thì cáccustom exceptions của bạn kế thừa từ lớp `HttpException` cơ sở. Với phương pháp này, Nest sẽ nhận ra các exceptions  của bạn và tự động xử lý các phản hồi lỗi. Hãy thực hiện một custom exceptions như vậy:

```
forbidden.exception.tsJS

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```
Vì `ForbiddenException`  extends  `HttpException`, nó sẽ hoạt động trơn tru với trình xử lý exception tích hợp, và do đó chúng ta có thể sử dụng nó bên trong phương thức `findAll()`.

```
cats.controller.tsJS

@Get()
async findAll() {
  throw new ForbiddenException();
}
```
# Built-in HTTP exceptions
Nest cung cấp một tập hợp các exceptions tiêu chuẩn kế thừa từ `HTTPException` cơ sở. Chúng được đại diện cho nhiều trường hợp HTTP exceptions phổ biến nhất:

* BadRequestException
* UnauthorizedException
* NotFoundException
* ForbiddenException
* NotAcceptableException
* RequestTimeoutException
* ConflictException
* GoneException
* PayloadTooLargeException
* UnsupportedMediaTypeException
* UnprocessableEntityException
* InternalServerErrorException
* NotImplementedException
* ImATeapotException
* MethodNotAllowedException
* BadGatewayException
* ServiceUnavailableException
* GatewayTimeoutException

# Exception filters
Mặc dù bộ exception filter có thể tự động xử lý nhiều trường hợp cho bạn, nhưng bạn có thể muốn toàn quyền kiểm soát lớp exception. Ví dụ: bạn có thể muốn thêm 1 loging hoặc sử dụng  JSON schema khác dựa trên một số yếu tố động. Exception filters được thiết kế cho chính xác mục đích này. Chúng cho phép bạn kiểm soát luồng và nội dung của phản hồi được gửi lại cho client.

Chúng ta hãy tạo một exception filter chịu trách nhiệm bắt các exception là một thể hiện của lớp `HttpException` và triển khai logic response tùy chỉnh cho chúng. Để làm điều này, chúng ta sẽ cần truy cập vào các đối tượng `Request` và `Response`. Chúng ta sẽ truy cập đối tượng `Request` để chúng ta có thể lấy url và đưa thông tin đó vào thông tin logging. Chúng tôi sẽ sử dụng đối tượng `Response` để kiểm soát trực tiếp phản hồi được gửi, sử dụng phương thức `response.json()`.

```
http-exception.filter.tsJS

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


`@Catch(HttpException)` decorator liên kết siêu dữ liệu cần thiết với exception filter, nói với Nest rằng bộ lọc cụ thể này đang tìm kiếm exception của loại `HTTPException`. Trình `@Catch()` decoratorcó thể lấy một tham số hoặc danh sách được phân tách bằng dấu phẩy. Điều này cho phép bạn thiết lập bộ lọc cho một số loại ngoại lệ cùng một lúc.
# Arguments host
Chúng ta hãy xem các tham số của phương thức `Catch()`. Tham số exception là đối tượng ngoại lệ hiện đang được xử lý. Tham số `host ` lưu trữ là một đối tượng `Argumenthost`. `Argumenthost` là một đối tượng tiện ích mạnh mẽ mà chúng ta sẽ kiểm tra thêm trong chương `execution context`. Trong code mẫu này, chúng ta sử dụng nó để có được một tham chiếu đến các đối tượng `Request` và `Response` đang được chuyển đến trình xử lý yêu cầu ban đầu (trong bộ điều khiển có ngoại lệ bắt nguồn). Trong code mẫu này, chúng ta đã sử dụng một số phương thức trợ giúp trên `Argumenthost` để nhận các `Request` và `Response` mong muốn. Tìm hiểu thêm về `ArgumentsHost`  [tại đây](https://docs.nestjs.com/fuentals/execution-context).


# Binding filters
Chúng ta hãy kết nối `HttpExceptionFilter` mới của chúng ta với phương thức `create()` của `CatsContoder`.

cat.controll.tsJS

```
// cats.controller.ts

@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

Chúng ta đã sử dụng `@UseFilters()` decorator. và `@Catch()` decorator, nó có thể lấy một thể hiện bộ lọc duy nhất hoặc một danh sách các thể hiện bộ lọc được phân tách bằng dấu phẩy. Ở đây, chúng tôi đã tạo ra 1 thể hiện của `HTTPExceptionFilter`. Ngoài ra, bạn có thể truyền lớp (thay vì một thể hiện), để lại trách nhiệm khởi tạo cho framework và cho phép `dependency injection`

```
// cats.controller.ts

@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```


Trong ví dụ trên, `HTTPExceptionFilter` chỉ được áp dụng cho trình xử lý `create()`, làm cho nó có phạm vi phương thức. Các Exception filters có thể được phân chia theo các mức khác nhau: phạm vi method, phạm vi controller hoặc phạm vi toàn cầu. Ví dụ: để thiết lập bộ lọc dưới dạng phạm vi controller, bạn sẽ làm như sau:

```
cats.controller.ts

@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

Cấu trúc này thiết lập Bộ lọc `HttpExceptionFilter` cho mọi trình xử lý tuyến đường được xác định bên trong `CatsController`.

Để tạo bộ lọc phạm vi toàn cầu, bạn sẽ làm như sau:

chính.tsJS

```
// main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```
Hoặc:
```
// app.module.tsJS

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

# Catch everything
Để bắt mọi exception chưa được xử lý (bất kể loại ngoại lệ nào), hãy để trống danh sách tham số của `@Catch()`, ví dụ: 
```
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

Trong ví dụ trên, bộ lọc sẽ bắt từng exception được ném, bất kể loại (lớp) của nó.

# Inheritance
```
// all-exceptions.filter.ts

import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```
   
   
```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
```