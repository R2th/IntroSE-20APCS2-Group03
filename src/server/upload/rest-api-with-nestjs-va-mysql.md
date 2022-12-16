## Giới thiệu về NestJS
Nest là một framework để xây dựng server-side applications hiệu quả và scalable với Node.js.  
Nó sử dụng JavaScript lũy tiến, được xây dựng với TypeScript (nhưng vẫn cho phép dùng JavaScript) và kết hợp các yếu tố của OOP (Lập trình hướng đối tượng), FP (Lập trình chức năng) và FRP (Lập trình phản ứng chức năng).

Nest sử dụng các khung máy chủ HTTP mạnh mẽ như Express (mặc định) và Fastify . 

## Có nên dùng
Trong những năm gần đây, nhờ có Node.js, JavaScript đã trở thành ngôn ngữ trực tuyến trên web cho cả Front-end và Back-end. Điều này đã tạo ra các dự án tuyệt vời như Angular , React và Vue , giúp cải thiện năng suất làm việc và các dự án có thể thực hiện nhanh chóng và dễ mở rộng. Tuy nhiên, trong khi có rất nhiều thư viện, trình trợ giúp và công cụ tuyệt vời tồn tại cho Node (và JavaScript phía máy chủ), không có thư viện nào giải quyết hiệu quả vấn đề chính - kiến trúc .

Nest cung cấp giải pháp kiến trúc ứng dụng vượt trội cho phép các nhà phát triển và các nhóm tạo ra các ứng dụng có thể kiểm tra cao, có thể mở rộng và dễ bảo trì.



## Cài đặt NestJS Project
Để bắt đầu, chúng ta có thể tạo dự án với Nest CLI hoặc sao chép dự án khởi động (cả hai sẽ tạo ra kết quả tương tự).

Để dàn dựng dự án với Nest CLI, hãy chạy các lệnh sau. Điều này sẽ tạo một thư mục dự án mới và điền vào thư mục các tệp Nest lõi ban đầu và các mô đun hỗ trợ, tạo cấu trúc cơ sở thông thường cho dự án của bạn. Tạo một dự án mới với Nest CLI được khuyến nghị cho người dùng lần đầu.

```
$ npm i -g @nestjs/cli
$ nest new nestjs-mysql
```
Sau khi cài đặt xong project, hãy mở Terminal lên và gõ:
```
$ npm run start:dev
```
Hoặc nếu như bạn dùng Yarn
```
$ yarn run start:dev
```
Sau đó truy cập: localhost:3000, chúng ta sẽ thấy dòng chữ  'Hello World'.
Tiếp theo hãy xem làm sao để tạo một REST API với Nest nhé.
### Khái niêm về Module, Service and Controller

#### Module
Bất cứ một project Nest nào cũng sẽ có một Module gốc. Ở đây nó sẽ quản lý tất cả các Module con.
Các thuộc tính quan trọng:
* **imports**: Các modules khác sẽ được import vào đây để sử dụng. Nó tương tự với cái file router.rb khi chúng ta dùng ROR, khi add resource vào thì chúng ta mới sử dụng được, Ở đây cũng thế.
* **controllers**: chỉ định bộ điều khiển.
* **providers**: chỉ định service điều khiển
* **exports**: có thể sử dụng được bởi các Module khác khi các bạn export ra.

#### Service
Service là nơi chúng ta xử lý với Database tương ứng với các Method của Controller. Nó na ná giống với file model của ROR.
#### Controllers
Controller là một class để chúng ta handle các HTTP request.

### Bắt đầu thôi!
Hãy bắt đầu tạo các file cần thiết.
Như ở trên thì mình đã tạo 1 project với tên là nestjs-mysql.
Hãy vào thư mục này, mở Terminal lên và gõ những lệnh sau: 
```
nest g module task
nest g service task
nest g controller task
nest g class task/task.entity
```
#### Installing Mysql And typeORM

```
npm install --save @nestjs/typeorm typeorm mysql
```

### Code

Đầu tiên là file **task.entity.ts**. Đây sẽ là file chúng ta định nghĩa các field cho task.
```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 }) 
  name: string;

  @Column('text')
  description: string;

  @Column()
  isDone: boolean;
}
```

Tiếp theo sẽ đến file **task.service.js**
```ts
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async findAll (): Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async findOne (id: number): Promise<Task> {
    return await this.taskRepo.findOne(id)
  }


  async create (task: Task): Promise<Task> {
    return await this.taskRepo.save(task)
  }

  async update(task: Task): Promise<UpdateResult> {
    return await this.taskRepo.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }
}

```

**task.controller.js**

```ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service'
import { Task } from './task.entity'


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {

  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll()
  }

  @Get(':id')
  get(@Param() params) {
    return this.taskService.findOne(params.id);
  }

  @Post()
  create(@Body() task: Task) {
    return this.taskService.create(task);
  }

  @Put()
  update(@Body() task: Task) {
    return this.taskService.update(task);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.taskService.delete(params.id);
  }
}

```

Update file **task.module.ts**
```ts
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
```
Và bây giờ mở file app.module.ts để kết nối với CSDL và thêm module task vào nha.
Ở đây mình sử dụng Database là **nestjs**. Các bạn hãy chỉnh port và tên của db để phù hợp với máy của mình nhé.
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}

```

Mở Terminal lên và chạy:
```
yarn run start:dev
```
### Test với Postman

#### Creat Task
![](https://images.viblo.asia/ce45c0b7-05a1-4f4e-8859-66f2414bb938.png)

#### Get List
![](https://images.viblo.asia/fdef49a5-be80-4c95-8cc3-83f5e840a274.png)

## Kết luận
Vậy là chúng ta đã làm xong một REST API cơ bản với Nestjs và mySQL.
Nếu có gì thắc mắc các bạn hãy comment nhé.
Cám ơn các bạn đã đọc bài viết này.