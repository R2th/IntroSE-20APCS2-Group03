### A.GIỚI THIỆU
- Nestjs có thể dụng các cơ sở dữ liệu khác nhau như NoSQL , SQL
- Để connect với SQL cũng có rất nhiều package hỗ trợ như TypeORM, Sequelize.
- Nhưng bài viết ngày hôm này mình sẽ cùng các bạn tìm hiểu về package TypeORM vì TypeORM được sử dụng phổ biến hơn
### B.TypeORM
- Tích hợp TypeORM để connect với cơ sở dữ liệu SQL. Nhà nest cung cấp gói package @Nestjs/typeorm
- TypeORM được dùng để ánh xạ các table trong CSDL thành các entity(class) trong Typescript
#### 1. Installation
> TypeORM có thể thực hiện trên nhiều loại CSDL khác nhau như sqlite, mysql, posgreSQL. Hôm nay mình sẽ 
giới thiệu về TypeORM với  CSDL posgreSQL


``` $ npm install --save @nestjs/typeorm typeorm pg ```

> Install ts-node globally để có thể thao tác trực tiếp code Typescript trên Node mà ko cần biên dịch trước

``` npm install -g ts-node ```

#### 2. Connect to DB
Để connect đến DB ta có 2 cách chính:
* Cách 1: Import trực tiếp object cấu hình vào method forRoot
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      "entities": [
        "src/entity/**/*.ts"
       ],
      synchronize: true,
      "migrations": [
        "src/migration/**/*.ts"
      ],
      "subscribers": [
        "src/subscriber/**/*.ts"
      ]
    }),
  ],
})
export class AppModule {}
```
#### Cách 2: Import cấu hình vào file ormconfig.json
* Nếu bạn không muốn cấu hình trực tiếp vào method forRoot, bạn có thể tạo 1 file ormconfig.json , khi thực thi thì Nest sẽ tự động lấy 
 
thông tin cấu hình từ file ormconfig.json khi mà forRoot method chưa được cấu hình
* Nội dung của file ormconfig.json củng tương tự 
```
{
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'test',
  "entities": [
    "src/entity/**/*.ts"
  ],
  synchronize: true,
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ]
}
```
> Mình giới thiệu  1 chút về thông tin cấu hình:
* entities: là thư mục chứa các entities mapping với CSDL
* synchronize: được dùng để xác định là cơ sở dữ liệu của bạn có tự động đồng bộ nếu như entity thay đổi hay không?

synchronize: true ta không nên sữ dụng trên môi trường production nó sẽ làm ảnh hưởng tới csdl của chúng ta khi có 1 sự thay đổi nhỏ nào đó ở các entities
* migrations: Chỉ định cho TypeORM biết thư mục chứa file migration
* cli/migrationsDir: Chỉ định thư mục chưa file migration khi tạo file với CLI
### C.Migrations
* Migrations cung cấp một cách để cập nhật từng bước database schema để giữ cho nó đồng bộ với mô hình dữ liệu của ứng dụng 

trong khi vẫn bảo toàn dữ liệu hiện có trong cơ sở dữ liệu. Để tạo, chạy và hoàn nguyên quá trình di chuyển, TypeORM cung cấp CLI chuyên dng.
* Nếu bạn sữ dụng synchronize: true thì không cần phải migrations vì nó sẽ tự động đồng bộ dữ liệu cho bạn nhưng nó lại khá rũi ro  

khi bạn chỉ muốn thay đổi ở entities nhưng chưa muốn thay đổi trong database hiện tại
#### 1. Thêm CLI command
Chúng ta thêm 3 script vào file package.json:
```
"migrate:create": "ts-node ./node_modules/typeorm/cli.js migration:create -n",
"migrate:up": "ts-node ./node_modules/typeorm/cli.js migration:run",
"migrate:down": "ts-node ./node_modules/typeorm/cli.js migration:revert"
```
> Để chạy được migration đầu tiên bạn phải tạo ra 1 entity
```
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```
> Chạy lệnh sau để generate ra file migration
```
npm run migrate:createcreate create-article
```
> Chạy migration sau khi genarate
```
import {MigrationInterface, QueryRunner} from "typeorm";

export class createArticle1558196824347 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, 
        CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
```
> Cuối cùng chạy lệnh migrate:up để sinh ra bảng trong database nhé:
`npm run migrate:up`

### Kết
Trên đây là quá trình vắn tắt áp dụng TypeORM cho project NestJS. TypeORM các rất nhiều nội dung
liên quan đến relationship thì mình sẽ trình bày ở bài sau.
> Happy coding !