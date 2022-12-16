### LỜi GIỚI THIỆU
- Nestjs có thể dụng các cơ sở dữ liệu khác nhau như MongoDB , sql... <br>
- Để connect với sql cũng có rất nhiều package hỗ trợ như TypeORM, Sequelize. <br>
- Nhưng bài viết ngày hôm này mình sẽ cùng các bạn tìm hiểu về package TypeORM vì mình thấy TypeORM được sử dụng phổ biến hơn hôm khác mình sẽ tìm hiểu về ưu điểm, nhược điểm của các package <br>
### TypeORM 
- Tích hợp TypeORM để connect với cơ sở dữ liệu SQL và NoQuery. Nhà nest cung cấp gói package  `@Nestjs/typeorm`.
- Như Nest có nói đây là package trình ánh xạ quan hệ đối tượng hoàn thiện nhất có sẵn cho TypeScript. Và cũng vì nó được viết bằng TypeScript nên nó rất thích hợp với nest(được ví như cậu với mợ :)))<br>
### Bước 1:  install package<br>
`npm install --save @nestjs/typeorm typeorm mysql`<br>
Install ts-node globally để dễ thao tác lệnh hơn<br>
`npm install -g ts-node`<br>
Thêm typeorm command ở trong scripts package.json<br>
```
"scripts" {
    ...
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js"    
}
```
giờ câu lệnh của bạn sẽ dễ thao tác hơn.<br>
vd: `npm run typeorm migration:run`<br>
### bước 2:  khởi tạo new TypeORM project.<br>
`typeorm init`
khởi tạo xong chúng t có cấu trúc thư mục của  typeorm như sau:
```
MyProject
├── src              // place of your TypeScript code
│   ├── entity       // place where your entities (database models) are stored
│   │   └── User.ts  // sample entity
│   ├── migration    // place where your migrations are stored
│   └── index.ts     // start point of your application
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options
```
### bước 3: config connect database.
```
{
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "test",
   "password": "test",
   "database": "test",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
```
### bước 4: Create a new migration
`typeorm migration:create -n UserMigration`
`UserMigration`  được sinh ra trong folder `src/migration ` như đã config ở trên.
sau đó ta được file `UserMigration` có cấu trúc như sau:
```
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1584696612114 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
```

Mình sẽ ví dụ tạo 1 bảng users như sau:

```
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1584696612114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "first_name",
                    type: "varchar",
                },
                {
                    name: "last_name",
                    type: "varchar",
                },
                {
                    name: "age",
                    type: "int",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
```

sau đó mình sẽ chậy lệnh migration: <br>
 `npm run typeorm migration:run`<br>
chạy xong thì chúng ta sẽ có bảng users như ảnh:<br>
http://prntscr.com/rjjahm

### Tổng kết
Trên là bài tìm hiểu cơ bản typeORM - nestjs của mình. Mình cũng là người mới học nên có j hay ho hơn mọi người góp ý nhé.<br>
Bài sau mình sẽ tìm hiểu về model va Repository xem có j thú vị không.<br>
THANKS.