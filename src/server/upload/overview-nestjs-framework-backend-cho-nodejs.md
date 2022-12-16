Ở bài viết này mình sẽ giới thiệu qua về nestJS, các khái niệm cơ bản và lợi ít của framework này.

### giới thiệu chung:
**NestJS là gì?**
Theo định nghĩa ở trang chủ thì ta có định nghĩa như sau:
```
Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript,
is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) 
and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).
 ```
   nói ngắn gọn dể hiểu thì Nest  là một `framework` hỗ trợ người dùng xây dựng các ứng dụng `node` `server-side` một cách hiệu quả và dễ dàng mở rộng
   
**Ngôn ngữ sử dụng:** 
   Nest được hỗ trợ sử dụng với Typescript và cả Javascript thuần  và có đầy đủ các tính chất của:
   - OOP (Lập trình hướng đối tượng)
   - FP (Lập trình chức năng)
   - FRP (Lập trình phản ứng chức năng)
### Cài đặt và tạo ứng dụng NestJS:
Thiết lập một dự án mới khá đơn giản với Nest CLI. Với npm được cài đặt, bạn có thể tạo một project Nest mới với các lệnh sau:
```
$ npm i -g @nestjs/cli
```

Cài đặt nestjs-cli:
```
nest new project-name
```
Sau khi chạy lệnh trên thì thư mục project sẽ được tạo ra, các file mẫu và các file thư viện trong node modules cũng sẽ được cài đặt.
![image.png](https://images.viblo.asia/dfa668d8-bcaf-4e84-b047-45f4be5991db.png)
Để run chương trình hãy dùng lệnh sau:
```
npm start
```
Sau đó truy cập trình duyệt tại http://localhost:3000, để thấy được ứng dụng Nest vừa được tạo đang chạy.
### Cấu hình và chuyển đổi giữa ExpressJS và Fastify
Có hai nền tảng HTTP mà NestJS có thể hỗ trợ: `Express` và Fastify.

`Express`: rất phổ biến trong cộng đồng phát triển web Nodejs. Express là framework web tối giản nổi tiếng dành cho node.

`Fastify`: có hiệu suất tốt hơn. Đó là một framework có hiệu suất cao và chi phí thấp, tập trung vào việc cung cấp hiệu quả và tốc độ tối đa.

Bạn có thể chọn một để phù hợp nhất với nhu cầu của bạn.

Mặc định, Nest sử dụng Express framework.
```
import './LoadEnv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT || 3000);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
```

### Routing trong NestJS
Routing trong NestJS rất dễ để định nghĩa. Chúng ta sẽ sử dụng decorator `@Controller(‘users’)` để xác định các `routing` cơ bản cho `users`. Các routing cho `Post`, `Get`, `Put`, `Delete`, `Param`, và `Body` được đánh dấu bằng Nestjs annotation tương ứng.

- GET /users
- GET /users/id
- POST /users

Sử dụng tiền tố đường dẫn ‘users’ trong decorator `@Controller(‘users’) `cho phép chúng ta gán các routing liên quan lại với nhau, và giảm thiểu code bị lặp lại.
```
@Controller('users')
export class UsersController {
  @Get()
  find() {
    return this.usersService.find();
  }
  @Get(':id')
  findById(@Param('id') id) {
    return this.usersService.findById(id);
  }
  @Post()
  add(@Body() createUserDto: CreateUserDto) {
    return this.usersService.add(createUserDto);
  }
  @Patch(':id')
  update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
```

Chúng ta có thể truy cập các request body bằng cách thêm decorator @Body () vào trong định nghĩa của hàm.
```
@Post()
 add(@Body() createUserDto: CreateUserDto) {
   return this.usersService.add(createUserDto);
}
```

Decorator @Param() được sử dụng để truy cập parameter của phương thức. Xem ví dụ bên dưới, để truy cập parameter id chỉ cần gọi @Param(‘id’).
```
@Get(':id')
  findById(@Param('id') id) {
    return this.usersService.findById(id);
}
```
### Các khái niệm trong NestJS
Providers: là một khái niệm cơ bản trong Nest.Nhiều class Nest cơ bản có thể được dùng như là provider: services, repositories, factories, helpers, v.v. Mục đích của một provider là nó có thể inject dependencies; điều này có nghĩa là các đối tượng có thể tạo ra các mối quan hệ khác nhau với nhau; và việc tạo các instance của các object được thực hiện bởi Nest runtime. Một provider chỉ đơn giản là một lớp được liên kết với một decorator @Injectable().

Hãy bắt đầu tạo service đơn giản. UsersService – Service này sẽ đảm nhận lưu trữ và trả về dữ liệu, và được thiết kế để sử dụng bởi UsersController, vì vậy chúng ta nên tạo 1 provider để 2 class này có thể tạo quan hệ với nhau.

```
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ name: username, deleted: 0 });
  }
  async find(option?: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(option);
  }
  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }
  async add(user: CreateUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }
  async update(user: UpdateUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }
}
```

HINT: Có thể tạo một service bằng cách sử dụng CLI: nest g service users @Injectable() sẽ giúp Nest biết rằng đây là 1 provider. Vì thế Nest sẽ tự động tạo 1 instance của lớp này và truyền vào UsersController:

Modules: Một module là một lớp được chú thích với một decorator @Module (). Decorator @Module() cung cấp metadata mà Nest sử dụng để tổ chức cấu trúc ứng dụng.
![image.png](https://images.viblo.asia/5306ce3a-4152-41fd-b145-f08b84dca5be.png)

Mỗi ứng dụng có ít nhất một module, một module gốc.  Mỗi module cấu thành nên một tính năng cụ thể trong ứng dụng của bạn. Nest khuyến khích việc xây dựng sourcecode thông qua các module để sắp xếp các tính năng.. Cấu trúc source code của bạn có thể trông như thế này:
![image.png](https://images.viblo.asia/78a77ea7-f2c6-467e-97f3-079de260d61b.png)

### GraphQL
Như nhiều người được biết. GraphQL là một ngôn ngữ truy vấn mạnh mẽ cho API và giúp cho việc truy xuất dữ liệu, load data sẵn có. Nest cũng giúp ta tạo ra một server GraphQL ổn định.
Giả sử rằng bạn đã có hiểu biết cơ bản về GraphQL, bây giờ hãy tìm hiểu cách sử dụng GraphQL với Nest.

Bắt đầu bằng cách cài đặt các package cần thiết:
 ```
 npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql type-graphql
```
Tùy thuộc vào nền tảng cơ bản nào bạn sử dụng (Express hoặc Fastify), bạn cũng phải cài đặt cả apollo-server-express or apollo-server-fastify.

Dưới đây là danh sách các khái niệm chính bạn cần biết vềGraphQL:
- Schema
- Query
- Mutation
- Type
- Resolver

NestJS cung cấp cho chúng tôi hai cách khác nhau để xây dựng các ứng dụng GraphQL:
- Schema first
- Code first

### Tổng quan
Với tất cả các tính năng đã được liệt kê ở trên, nó xác minh rằng NestJS có rất nhiều tính năng thú vị có thể giúp các nhà phát triển dễ dàng xây dựng một ứng dụng backend. Mặc dù nó vẫn có một số nhược điểm nhưng sức mạnh và tính hữu dụng của nó không thể phủ nhận. Dưới đây là tóm tắt về ưu và nhược điểm của Nest:

Ưu điểm:
- Mã nguồn mở
- Dễ sử dụng, là một framework mạnh, nhiều tiện ích.
- Tài liệu dễ hiểu.
- Thời gian phát triển ứng dụng nhanh.
- Theo hệ sinh thái NodeJS.
- Có hỗ trợ Graphql.
- Kiến trúc tốt.
- Typescript giúp nó tích hợp tốt trong vscode.

Nhược điểm:
- Quá nhiều thay đổi trong một bản update.
- Không ổn định.
- Khó debug.