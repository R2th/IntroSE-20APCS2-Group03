### I. Giới thiệu
Hôm nay mình xin giới thiệu về cách tạo một project về nestjs kết hợp graphql và sử dụng postgresSQL để truy vấn dữ liệu

### II. Nestjs là gì
- Là một framwork chạy trên nền nodejs. 
- Vì sao lại là nestjs
- Đơn giản là nó là tổng hợp của 2 thứ cần có của một framwork hiện nay là phổ biến và hiệu suất cao (phổ biến nhất là expressJS, hiệu suất nhất là Fastify, còn thằng này thì tổng hợp cả 2).

### III. GraphQL là gì
Mình có nói trong bài này [giới thiệu graphQL](https://viblo.asia/p/gioi-thieu-ve-graphql-Do754bzVZM6)

### IV. Postgres là gì
Là ngôn ngữ truy vấn dữ liệu, giống MySQL và SQL server

### V. Tạo project
#### 1. Mở đầu
- Đầu tiên bạn phải cài nestjs, cài thế nào thì trong này có nói [nestjs document overview](https://docs.nestjs.com/cli/overview)
- Để tạo project ta dùng lệnh `nest new <tên project>`, khi đang cài đặt, nest sẽ có hỏi bạn là muốn sử dụng trình cài đặt gì (npm hay yarn), cái này tùy bạn chọn
- Sau khi tạo xong, ta mở project sẽ được như này

![](https://images.viblo.asia/ef7c6e18-21ad-488c-bc78-10e5f62952c0.PNG)

- Chạy lệnh npm install để cài đặt các package có sẵn trong project
- Cài thêm các gói package về grapQL: `npm i @nestjs/graphql graphql-tools graphql`
- trong file `src/app.module.ts`, ta sửa file
```
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [GraphQLModule.forRoot()],
})
export class AppModule {}
```
- Khi chạy lệnh `npm run start:dev`, ta sẽ được thông báo 1 lỗi
```
node_modules/@nestjs/graphql/dist/graphql.module.d.ts:3:34 - error TS2307: Cannot find module 'apollo-server-core'.
```
- Lỗi này đơn giản là do mình chưa cài thêm package apollo-server, cài xong ta sẽ nhận được thêm một lỗi mới
```
(node:15720) UnhandledPromiseRejectionWarning: Error: Apollo Server requires either an existing schema, modules or typeDefs
```
- Đọc lỗi thì sẽ thấy apollo server yêu cầu file schema của graphQL
- Thêm đoạn code tự động generate file schema trong `src/app.module.ts`
```
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
  )],
})
export class AppModule {}
```
- Tiếp tục nhận lỗi mới =))
```
GraphQLError: Type Query must define one or more fields.
```
- Lỗi này đơn giản là yêu cầu bạn cần có ít nhất một câu query hoặc mutation

#### 2. Tạo module, resolver
- Bạn có đang thắc mắc vì sao đang lỗi bên trên không lo sửa, lại đi qua phần khác không :v, vì qua phần này sửa được lỗi ở trên.
- Dùng câu lệnh `nest g module item`, sẽ tạo cho bạn 1 file module có tên `item.module.ts` và được import vào trong file `app.module.ts`

![](https://images.viblo.asia/b8ca8cf6-ab12-4f27-a50d-bcf9f431661a.PNG)

![](https://images.viblo.asia/0350aa50-0ad1-4724-a77e-2436e85b9533.PNG)

- Câu lệnh này méo phải sửa lỗi =)), tiếp tục tạo thêm 1 file resolver với câu lệnh: `nest g resolver item`
- Nó tự generate file và cung cấp vào `ItemModule`, mọi người tự coi, mình mệt chụp rồi =))
- Rồi tới phần sửa lỗi. Bây giờ trong file `item.resolver.ts` ta tạo một function để có thể tạo ra câu query bên schema graphQL
```
import { Resolver, Query } from '@nestjs/graphql';

@Resolver('Item')
export class ItemResolver {
  @Query(returns => String) // Bắt buộc phải có @Query và có kiểu trả về bên trong nếu muốn generate
  // Tên query bên phía schema sẽ dựa theo tên function
  // Nestjs sử dụng typescript nên bạn sử dụng Promise<string> để bắt buộc kiểu trả về, nếu trả về kiểu INT sẽ báo lỗi
  async item(): Promise<string> {
    return 'Hello world!';
  }
}
```
- Trong project sẽ tự generate file `schema.gql`

![](https://images.viblo.asia/a7b951bd-a18c-46ae-95a3-4f6253f79c28.PNG)

- Lỗi cũng đã được fix, thử thành quả nào, vào browser gõ đường link: `http://localhost:3000/graphql`

![](https://images.viblo.asia/d6959dc6-0a28-4586-87b9-90cd958479b8.PNG)

- Toẹt vời :v 

#### 3. Tạo entity, sử dụng typeorm
- Cài các package này vào: `npm install @nestjs/typeorm typeorm pg`
- Sau khi cài xong, thêm `TypeOrmModule.forRoot()` vào `app.module.ts`
```
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemModule } from './item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    ItemModule,
  ],
})
export class AppModule {}
```
- À quên trước khi bỏ vào phải tạo file `ormconfig.json` nếu không muốn bị báo lỗi =)), nó nằm ngang hàng với src
- Mẫu:
```
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": 1,
  "database": "BK_HC_TEST",
  "synchronize": false,
  "logging": true,
  "entities": ["dist/**/*.entity.js"],
  "migrations": ["dist/database/migrations/*.js"],
  "subscribers": ["dist/database/subscriber/*.js"],
  "cli": { "migrationsDir": "src/database/migrations" }
}
```
- Nhớ tạo DB trước nhé
- Bây giờ bắt tay tạo entity, cái này phải tạo tay, không có lệnh để chạy đâu :v, tạo file `item/item.entity.ts`, nội dung bên trong
```
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;
}
```
- Vì sao có nội dung bên trong thì bạn đọc thêm trong doc typeorm
- Chạy lệnh `typeorm migration:generate -n create-item-entity` để tạo ra file migration (nếu bạn học các ngôn ngữ như rails hay php sẽ biết nó là gì, nói nôm na là nó dùng để tạo các câu lệnh xuống db)
- Sau khi generate thành công, ta tiếp tục chạy: `typeorm migration:run` để tạo bảng `items` dưới db
- Nếu chạy 2 lệnh không có sự thay đổi tức là bạn cần chạy `npm run build` để nó build mới lại rồi chạy lại 2 lệnh trên, còn nếu bạn đang bật `npm run start:dev` thì không cần, nó tự động thực hiện việc build
- Vào db bằng tool hoặc lệnh tạo 1 record

#### 4. tạo DTO và service để truy vấn db
- DTO là file mình sẽ định nghĩa Type, InputType bên graphQL
- Trước tiên ta thêm package `npm i type-graphql`
- ta tạo 1 file với là `src/item/item.dto.ts` tên class là `ItemDTO`
```
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class ItemDTO {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => Date)
  updated: Date;

  @Field(type => Date)
  created: Date;
}
```
- Quay lại resolver ta bắt kiểu trả về là `ItemDTO`
```
import { Resolver, Query } from '@nestjs/graphql';

import { ItemDTO } from './item.dto';

@Resolver('Item')
export class ItemResolver {
  @Query(returns => ItemDTO)
  async item(): Promise<ItemDTO> {
    return null; // Vì ta đang bắt kiểu là object nên việc string sẽ bị lỗi, vì vậy tạm thời để null
  }
}
```
- Tạo service để truy vấn tới db: `nest g service item`
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ItemEntity } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    // Khai báo Repository để kết nối db
    @InjectRepository(ItemEntity)
    private itemRepo: Repository<ItemEntity>,
  ) {}

  item() {
    return this.itemRepo.findOne({});
  }
}
```
- Bên resovler sửa lại
```
import { Resolver, Query } from '@nestjs/graphql';

import { ItemDTO } from './item.dto';
import { ItemService } from './item.service';

@Resolver('Item')
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query(returns => ItemDTO)
  async item(): Promise<ItemDTO> {
    return await this.itemService.item();
  }
}
```
- Vì ta đang dùng `ItemEntity` mà chưa khai báo nên sẽ có lỗi xảy ra
- Quay lại file module item, thêm import
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { ItemEntity } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
```
- Xem thành quả
![](https://images.viblo.asia/f5f3399f-1d8a-476a-a536-964f44afffb4.PNG)

### VI. Kết
Rồi, quẩy thôi =))