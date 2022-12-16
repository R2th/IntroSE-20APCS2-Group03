Đọc thì có vẻ giật tít nhưng khoan, mọi chuyện không như bạn nghĩ, hãy nghe mình giải thích :laughing:

# 1. Tại sao lại là NestJS?

Theo bạn, vấn đề lớn nhất của `NodeJS` là gì? Sẽ nhiều bạn nghĩ là performance. Nhưng đó thực sự không phải là vấn đề lớn đối với NodeJS. Performance của NodeJS không tệ như bạn nghĩ mà ngược lại còn khá ổn. Dĩ nhiên là không thể so sánh với C++ hay Go, Java. Nhưng nó đáp ứng đủ phần lớn các nhu cầu cho một hệ thống backend có hàng triệu người dùng.

Trong những năm gần đây, nhờ có `NodeJs`, JavaScript đã trở thành một ngôn ngữ tuyệt vời trên web cho cả ứng dụng frontend và backend. `NodeJS` giúp cải thiện năng suất của nhà phát triển và cho phép tạo ra các ứng dụng một cách nhanh chóng, testable và scalable. Tuy nhiên, trong khi có rất nhiều framework cho `NodeJS`, không có framework nào giải quyết hiệu quả vấn đề chính của `NodeJS` - vấn đề về **Architecture**

> Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

> Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.


Đây là những gì được viết trên trang chủ của NestJS, và bạn có thể hình dung được sơ qua được `NestJS` rồi đấy!

# 2. Vậy NestJS có những gì?

- NestJS tương thích với cả `Typescript` và `Javascript thuần`, default là `Typescript`.
- Design Pattern xuyên suốt NestJS là Dependency Injection, và cú pháp của NestJS rất giống Angular. Nên nếu bạn đã có kiến thức về Angular thì việc bắt đầu với NesJS sẽ khá dễ dàng.
- NestJS có rất nhiều module hỗ trợ bạn, từ việc `hot reload`, `logger` cho đến `GraphQL`, `Websocket` rồi  `cqrs` pattern, `microservices`,... Bạn chỉ cần NestJS để làm tất cả mọi thứ.
- Module `microservices` của NestJS hỗ trợ đủ loại kết nối: `RabbitMQ`, `gRPC`, `Kafka`, `Redis`,... đây là một trong những điều mình rất thích, mình chỉ cần tập trung vào code cho phần business, còn infra thì NestJS đã implement sẵn chỉ việc dùng.

# 3. First step

Đầu tiên bạn hãy cài đặt `@nestjs/cli` và khởi tạo project của bạn.

```
$ npm i -g @nestjs/cli
$ nest new project-name
```

nestjs/cli sẽ genarate một project có cấu trúc

```
src
  ├──app.controller.ts
  ├──app.module.ts
  ├──main.ts
```

Chạy ứng dụng của bạn với câu lệnh:

```
$ npm run start
```

# 4. Đi vào sâu hơn chút
Tạo một module mới:
```
nest generate module user-module
```

File user-module sẽ như sau:

```
// user-module.module.ts
import { Module } from ‘nestjs/common’;
@Module({})
export class UserModule{} 
```

Nó sẽ được import vào AppModule:
```
//app.module.ts
import { Module } from ‘@nestjs/common’;
import { AppController } from ‘./app.controller’;
import { AppService } from ‘./app.service’;
import { UserModuleModule } from ‘./user-module/user-module.module’;
@Module({
 imports: [UserModuleModule],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}
```

Như vậy là bạn đã có một module mới rồi, hãy tạo controller và service cho nó:
```
$ cd src/user-module
$ nest generate provider user-service
$ nest generate controller user-controller
```

File service sẽ như sau:

```
// user-service.ts
import { Injectable } from ‘@nestjs/common’;
@Injectable()
export class UserService {
  getUser(){
    return “User”;
  }
}
```

Các bạn có thể thấy `@Injectable()` để inject UserService, khá giống Angular và Java Spring nhỉ? :grinning:

Tiếp đến là controller:

```
// user-controller.controller.ts
import { Controller,Get } from '@nestjs/common';
import {UserService} from '../user-service';
@Controller('user-controller')
export class UserControllerController {
 constructor(private readonly service:UserService){}
 @Get()
 getUser(){
  return this.service.getUser()
 }
}
```

Như vậy là khi truy cập vào http://localhost:3000/user-controller server sẽ trả về “User” rồi.

# 5. Kết luận

Đây chỉ là bài viết giới thiệu về NestJS, một framework còn khá mới (ra mắt 2017) mà theo mình là rất đáng để tìm hiểu. Hi vọng bài viết sẽ giúp các bạn có thêm sự lựa chọn cho backend server