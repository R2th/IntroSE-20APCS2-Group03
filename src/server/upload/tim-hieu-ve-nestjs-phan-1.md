Nếu đã từng phát triển NodeJS Server App thì chắc các bạn cũng không còn xa lạ gì với 2 framwork nổi tiếng là [Express](https://expressjs.com/) và [Fastify](https://www.fastify.io/). Về cơ bản thì mình thấy 2 framework này đang thực hiện khá tốt trong việc phát triển server-side, tuy nhiên chúng cũng khiến cho các nhà phát triển phải suy nghĩ khá nhiều trong việc làm sao để xây dựng một project  với clean structure, highly scalable, testable và dễ dàng maintaince. Đặc biệt là một lập trình viên mới bắt đầu với NodeJS thì chắc hẳn đây sẽ là một vấn đề. Nếu build tốt ngay từ đầu khi đến một giai đoạn nào đó chúng ta sẽ tốn khá nhiều chi phí phát triển cũng như maintaince. [NestJS](https://nestjs.com/) được tạo ra để giúp chúng ta phần nào đó giải quyết được vấn đề này. Trong bài viết này mình và các bạn sẽ cùng tìm hiểu qua về NestJS nhé.

## 1. NestJS là gì?
NestJS là một NodeJS framework dùng để phát triển server-side applications hiệu quả và có thể mở rộng. NestJS là sự kết hợp bởi OOP(Object Oriented Programming), FP(Functional Programming), FRP(Functional Reactive Programming). NestJS sử dụng TypeScript để phát triển nhưng nó cũng hỗ trợ cả Javascript. Vì vậy bạn không cần phải lo lắng việc mình không thể làm tốt NestJS vì không biết TypeScript.

Nest được lấy cảm hứng từ kiến trúc Agular nên với các bạn đã làm việc với Agular thì chắc hẳn sẽ không còn xa lạ gì và có thể dễ dàng tiếp cận.

Tin vui với các lập trình viên yêu thích Express hay Fastify là Nest cho phép tích hợp sử dụng Express và Fastify như một middleware. Nó được đóng gói trong 2 package của npm là [platform-express](https://www.npmjs.com/package/@nestjs/platform-express) và [platform-fastify](https://www.npmjs.com/package/@nestjs/platform-fastify)

Quan trọng hơn, nó buộc các nhà phát triển sử dụng một kiến trúc cụ thể bằng cách giới thiệu các module, provider và controller, đảm bảo ứng dụng highly scalable, testable và dễ dàng maintaince. Nest rất khắt khe và chặt chẽ trong việc xây dựng cấu trúc project. Vì vậy hãy tuân thủ theo nó

## 2. Vì sao sử dụng NestJS?

Như mình đã nói ở trên, không có một kiến trúc tiêu chuẩn nào cho các dự án NodeJS với Express hoặc Fastify hiện tại. Mỗi dự án đều có một kiến trúc phù hợp khác nhau như MVC, kiến trúc thành phần hoặc các kiến trúc khác. Với một nhà phát triển mới làm việc với NodeJS thì họ sẽ không có tư duy về architecture, scable hay maintainable thì trong quá trình phát triển có thể gây ra việc tạo ra kiến trúc code không chất lượng làm xáo trộn dự án. NestJS cung cấp cho chúng ta một kiến trúc cụ thể và rõ dàng để giải quyết vấn đề này.

Còn với perfomance, vì chưa có dự án lớn thực tế nào với NestJS nên mình không thể đánh giá được nó. Mình có tham khảo qua cộng động developer Nest thì có tham khảo được dưới đấy. Các bạn xem qua nhé:.
![](https://images.viblo.asia/6cd0fa05-d1c5-4ac9-85b6-74e45ed8b7c5.png)

## 3. Các thành phần quan trọng trong NestJS

Trước khi tìm hiểu các thành phần trong Nest thì chúng ta sẽ cài Nest CLI để tạo một project Nest nhé. 

```
npm i -g @nestjs/cli
```

```
nest new project-name
```

Sau khi chạy 2 lệnh trên ta sẽ có một source code với cấu trúc như sau:

![](https://images.viblo.asia/c9b434cd-bb2b-4c88-b8a9-27cd3bc70949.png)

Mình sẽ giải thích đôi chút về các thành phần trên

* app.controller.ts: Chứa các router để xử lý các request và trả về response cho client.

* app.controller.spec.ts: Có nhiệm vụ viết unit-test cho các controller.

* app.module.ts: Root module của ứng dụng.

* app.service.ts: Service chứa các logic mà controller sẽ dùng đến.

* main.ts: Sử dụng NestFactory để khởi tạo ứng dụng.


Về cơ bản thì main.ts sẽ sử dụng static method create() của NestFactory để tạo server app như sau:

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

Ngoài ra, NestJS khuyến khích chúng ta nên tuân thủ theo cấu trúc project như sau để luôn giữ cho mã sạch, tái sử dụng, độc lập và khả năng mở rộng cao,...

![](https://images.viblo.asia/55e76541-b477-4b79-abef-6961e7599c5c.png)


### Module

![](https://images.viblo.asia/13526c5b-6edc-481e-a040-3e9a0639d178.png)

Module có nhiệm vụ đóng gói những logic liên quan của các chức năng cần triển khai đến client một cách độc lập. Một module trong Nest là class được define với @Module ().  @Module () sẽ cung cấp metadata mà Nest sử dụng để tổ chức cấu trúc ứng dụng.  Một file module cơ bản sẽ như sau:

users/users.module.ts
```
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```
Trong một module sẽ bao gồm các thành phần chính sau đây:

* providers:  Có nhiệm vụ khởi tạo và cung cấp các service mà sẽ được controller trong module sẽ sử dụng đến.

* controllers: Có nhiệm vụ khởi tạo những controller đã được xác định trong module.

* imports:  Có nhiệm vụ import những thành phần của một module khác mà module sẽ sử dụng.
 
* exports: Có nhiệm vụ export các thành phần của provider và các module khác sẻ import để sử dụng.

Nest cũng hỗ trợ tạo ra các module, controller, provider bằng CLI. Để tạo ra một module users, chúng ta sử dụng lệnh sau:

```$ nest g module users```

Sau khi define modul users, việc cần làm bây giờ là import nó vào root module của project là app.module.ts

```
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

Ngoài ra, Nest còn một tính năng khác đó là Share Module. Bạn có thể chia sẻ bất kì provider nào trong module hiện tại cho các module khác. Ví dụ bạn có thể chia sẻ UserService cho các module khác sử dụng bằng cách thêm nó vào mảng exports trong users.module.ts như sau.

```
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

Sau khi export, các module khác đều có thể import UsersModule và truy cập vào UsersService để sử dụng.

Còn một tính năng khác trong Nest đó là global module. Nếu bạn không muốn phải import một module nào đó quá nhiều lần thì Nest cung cấp @Global() cho phép bạn sử một module từ module khác mà không cần import. Như vậy chúng ta có thể sử dụng service của các module khác rất dễ dàng phải không. Chỉ cần thêm @Global() như dưới đây là có thể biến nó trở thành global module.

```
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

Nest cũng hỗ trợ mạnh mẽ trong việc cấu hình các module động đó là Dynamic modules. Việc cấu hình module động này giúp ta có thể thực hiện các thao tác khác nhau trước khi export một module. Để tìm hiểu chi tiết về Dynamic modules bạn có thể tham khảo trong [link](https://docs.nestjs.com/fundamentals/dynamic-modules) này Dưới đây là một ví dụ về cấu hình cơ bản Dynamic modules.

```
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

### Controller

![](https://images.viblo.asia/14a4dd32-a4ba-4395-a903-4128c8d91ab5.png)

Như các bạn đã biết, controller là nơi xử lý các request và trả về response cho người dùng. Mỗi controller sẽ chứa các router thực hiện hành động và nhiệm vụ khác nhau được yêu cầu từ client. Để tạo ra một controller chúng ta sử dụng một và @Controller(). @Controller() sẽ có nhiệm vụ liên kết class Controller đó với request tương ứng. Chúng ta sẽ tạo một controller cơ bản như sau, bạn cũng có thể tạo controller bằng cmd: `$ nest g controller users`

```
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
```
Như vậy chúng ta đã tạo ra một API với url `GET: /users`. Trong @Controller mình có sử dụng tiền tố users làm route path, việc sử dụng như vậy sẽ tập hợp các route liên quan và giảm thiểu code lặp lại. Để xác định method cụ thể cho một request chúng ta sẽ define @Get() trên function findAll(). Việc khai báo như vậy sẽ giúp Nest có thể ánh xạ request Get: /users đến function findAll() này để xử lý và response lại cho client. Ngoài Get() thì Nest cũng cung cấp đầy đủ các method như framework khác như @Post(), @Delete(), @Put(), @Path(), @All(),... Ngoài ta ta cũng có thể truyền path vào @Get chẳng hạn như @Get('all') sẽ tạo ra một api GET /users/all. Chúng ta cũng có thể config http status code và header như sau:

```
@Post()
@HttpCode(204)
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

Nest cung cấp bộ decorator khá đầy đủ để ta có thể thực hiện truy vấn vào các request cũng như xử lý response data về cho client. Bạn có thể tham khảo qua

![](https://images.viblo.asia/01989a88-739d-407d-8c52-10d8633d8b18.png)

Ngoài ra Nest cũng cho phép ràng buộc dữ liệu gửi lên từ request giúp ngăn chặn những dữ liệu không hợp lệ trước khi thực hiện xử lý, đó là DTO (Data Transfer Object). Trong folder `dto` chúng ta tạo file `create-user.dto.ts`:
```
export class CreateUserDto {
  name: string;
  age: number;
  address: string;
  job: string;
}
```

Sau đó chúng ta sẽ sử dụng CreateUserDto trong controller để thực hiện ràng buộc data type gửi lên. Trong users.controller.ts hãy thêm như sau:

```
@Post()
async create(@Body() createUserDto: CreateUserDto) {
  return 'This action adds a new user';
}
```

### Providers

![](https://images.viblo.asia/51c7a63b-07cc-4585-b610-3aa8386c0bd1.png)

Provider là nơi cung cấp các serivce, repositories, factories, helpers,... cho controller trong một module sử dụng. Đây cũng là nơi sẽ chứa những logic xử lý đã được tách biệt với controller. Để tạo ra một provider chúng ta chỉ cần khai báo @Injectable () trước một class đã định nghĩa. Việc sử dụng @Injectable() sẽ cho Nest biết đây là một class thuộc provider. Để tạo ra một service nơi mà chứa các logic xử lý của UserController, chúng ta hãy tạo ra một UserService trong file user.service.ts dưới đây hoặc sử dụng cmd `$ nest g service cats`

```
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(cat);
  }

  findAll(): User[] {
    return this.users;
  }
}
```

Trong service trên mình có sử dụng một interface để định nghĩa một User. Trong folder interface hãy tạo user.interface.ts nhé:

```

export interface User {
  name: string;
  age: number;
  job: string;
}
```

Việc cuối cùng cần làm là sử dụng nó bên trong các route của controller

```
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
```
Các Service ở trên đều được Nest sử dụng Singleton của Design Pattern để khởi tạo. Vì vậy nếu đã được sử dụng ở một module hoặc controller khác thì nó sẽ trả về instance đã khởi tạo trước đó.

## Tổng kết
Việc tiếp cận Nest phức tạp hơn so với Express và Fastify nên trong bài viết này mình có nói chi tiết một chút. Bài viết trên mình các nói qua các tính năng và thành phần cơ bản cũng như quan trọng nhất trong Nest. Tuy nhiên, Nest còn rất nhiều tính năng thú vị mà mình không thể nói hết trong một bài viết. Hẹn găp lại các bạn ở bài viết tiếp theo của series về NestJS nhé. Cảm ơn các bạn