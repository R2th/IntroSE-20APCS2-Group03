# Introduction

Nest (NestJS) là một framework để xây dựng các ứng dụng server-side bằng Node.js hiệu quả, và dể mở rộng. Nó sử dụng ngôi ngữ bậc cao của javascrip là TypeScript (nhưng vẫn cho phép các nhà phát triển  sử dụng JavaScript thuần túy) và kết hợp các tính chất của OOP (Lập trình hướng đối tượng), FP (Lập trình chức năng) và FRP (Lập trình phản ứng chức năng).

Về bản chất Nest sử dụng các framework máy chủ HTTP mạnh mẽ như là Express (mặc định) và có thể tùy chọn cấu hình để sử dụng Fastify.

Nest cung cấp một tầng trừu tượng trên các framework Node.js phổ biến này (Express / Fastify), nhưng cũng hỗ trợ API của họ trực tiếp cho nhà phát triển. Điều này cho phép các nhà phát triển tự do sử dụng vô số các mô-đun của bên thứ ba có sẵn cho nền tảng cơ bản. Có thể hiểu là tất cả các package mà chúng ta cài thêm khi sử dụng Express / Fastify đều có thể tích hợp dể dàng vào Nestjs.
# Philosophy
Trong những năm gần đây, nhờ có Node.js, JavaScript đã trở thành ngôn ngữ chung cho cả Frontend và Backend. Điều này đã tạo ra các dự án tuyệt vời như Angular, React và Vue, giúp cải thiện năng suất của nhà phát triển và cho phép tạo ra các ứng dụng frontend nhanh, có thể mở rộng. Tuy nhiên, trong khi có rất nhiều thư viện, công cụ tuyệt vời tồn tại cho Node, nhưng không có thư viện nào giải quyết hiệu quả vấn đề chính là kiến trúc. Có hiểu là chưa có 1 mô hình phát triển dự án backend cố định như như RubyOnRails.

Nest cung cấp một kiến trúc ứng dụng vượt trội cho phép các nhà phát triển và các nhóm tạo ra các ứng dụng có thể kiểm tra cao, có thể mở rộng và dễ bảo trì.
# Installation
Để bắt đầu, bạn có thể scaffold một dự án với Nest CLI. Để scaffold một dự án với Nest CLI, hãy chạy các lệnh sau. 
```
npm i -g @nestjs/cli
nest new project-name
```
Điều này sẽ tạo một thư mục dự án mới và chứa các tệp Nest lõi ban đầu và các mô đun hỗ trợ, tạo cấu trúc cơ sở thông thường cho dự án của bạn. Cụ thể có 3 file chính bạn cần xem là:
1. app.controller.ts: Đây là controller của route gốc: http://localhost:3000/.
2. app.module.ts: Đây là module gốc của ứng dụng. Đảm nhận đóng gói tất cả mọi thứ của dự án.
3. main.ts: Đây là lối vào của dự án. Đảm nhận tạo 1 ứng dụng Nest và khởi tạo web server.


Để chạy dự án, hãy chạy các lệnh sau:
```
cd project
npm install
npm run start
```

Ngay bay giờ bạn có thể mở trình duyệt vào truy cập vào http://localhost:3000/.
# Controllers
Controllers chịu trách nhiệm xử lý các request đến và response lại client. Giống như các framework khác mỗi controller đảm nhận xử lý các request đến 1 router. Để tạo 1 controller chúng ta sử dụng  các class và decorator. Decorator liên kết các class với các siêu dữ liệu cần thiết và cho phép Nest tạo 1 router liên kết đến controller đó. Chúng ta có thể sử dụng NestCLI để tạo 1 controller bằng lệnh `nest g controller cat`

```
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Chúng ta có thể tùy chọn truyền 1 path cho decorator `@Controller()`. `@Get()` phía trên method findAll là 1 decorator để nói với Nest tạo 1 trình xử lý cho http request với method *GET* đến endpoint này. Phương thức này sẽ trả về status code 200 và dữ liệu trong trường hợp này chỉ là một chuỗi. Một điểm hay ở đây mà các framwork khác chứa có là: khi chúng ta trả về dữ liệu kiểu nguyên thủy như string, number, boolean thì Nest chỉ đơn giản là response chúng về client. Nhưng khi chúng ra trả về 1 object hay 1 array thì Nest sẽ tự động serialize nó sang JSON. Điều này giúp chúng ta chỉ cần trả về giá trị, việc còn lại Nest sẽ đảm nhận.

## Request object
Tại trình xử lý cần truy cập vào request để lấy dữ liệu mà client gửi lên. Nest cung cấp 1 đối đượng request để tham chiếu đến request - (Express by default).  Chúng ta có thể truy cập đến đối tượng request này bằng các sử dụng  decorator `@Req()` tại tham số của method findAll.

```
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```
Ngoài ra còn có rất nhiều các decorator để chúng ta có thể lấy dữ liệu từ trong đối tượng request như:

`@Session() // req.session`, 

`@Param(key?: string) // req.params / req.params[key]`, 

`@Body(key?: string) // req.body  / req.body[key]`, 

`@Query(key?: string) // req.query  / req.query[key]`, 

`@Headers(name?: string) // req.headers  / req.headers[key]`, 

`@Ip() // req.`, 

## Resources
Chúng ta đã đi qua cách để định nghĩa 1 trình xử lý cho 1 endpoint lấy dữ liệu. TIếp theo  nếu bạn muốn tạo 1 endpoint để tạo 1 record mới thì hay tạo 1 POST handler:
```
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```
## Request payloads
Trong ví dụ trước chúng ta đã tạo 1 POST handler nhưng không truy cập vào dữ liệu client gửi lên. Hãy sữa điều đó bằng decorator `@Body()`. Nhưng trước tiên chúng ta cần định nghĩa 1 DTO (Data Transfer Object). Một DTO là 1 object xác định làm thế nào dữ liệu được gửi qua network. Tạo 1 DTO băng cách khái báo 1 class với các thuộc tính tương ứng các dữ liệu mà client gửi lên.
```
//create-cat.dto.ts
export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
```
Sau đó tại controller chúng ta có thể sử dụng DTO này:
```
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

# Full resource sample

```
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

# Final
Mình sẽ tạm dựng bài viết tại đây, và tiếp tục chia sẽ với mọi người về framework Nestjs này trong các bài viết sau :D

https://docs.nestjs.com/controllers