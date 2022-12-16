Đầu tiên để rõ hơn vào nội dung bài viết, mình xin giới thiệu qua một chút về **NestJS**. Nghe NodeJs thì chắc nhiều dev sẽ nghĩ ngay đến Express (một framework  xây dựng trên nền tảng Nodejs) với rất tính năng và ứng dụng cho web application và mobile. Còn **NestJs** là một framework để xây dựng các ứng dụng server-side bằng Node.js, được hỗ trợ đầy đủ với TypeScript. Vào chủ đề chính của bài viết, mình sẽ giới thiệu các bạn cách viết và generate ra file migrations trong **NestJs**.

### I. Thiết lập các thứ viện cần thiết
NestJS cho phép dễ dàng tích hợp, sử dụng SQL và NoSQL database. Chúng ta có thể sử dụng những thư viện tích hợp database như **Sequelize**, **TypeORM**,  **Prisma**. Ở bài viết này mình sẽ giới thiệu sử dụng **TypeORM** và **Mysql**.

Cài đặt TypeORM và Mysql: 
```
npm install --save @nestjs/typeorm typeorm mysql
```

Sau khi đã cài đặt thành công, chúng ta sẽ tiến hành thiết lập thông tin database vào project NestJs:

Chúng ta tạo 1 file **ormconfig.json** trong project root : 
```
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test",
  "entities": ["dist/**/*.entity{.ts,.js}"],
   "migrations": [
      "src/migrations/*.ts",
      "dist/migrations/*{.ts,.js}"
    ],
  "cli": {
    "migrationsDir": "src/migrations"
  },
  "synchronize": true
}
```
Nhìn qua thì chắc chắn ai cũng hiểu trên chính là thông tin cơ bản để kết nối vào database của chúng ta, tuy nhiên có một phần cần lưu ý là 2 thuộc tính **entities**  và **migrations**.

**entities**:  là nơi ta khai báo đường dẫn đến các entities hay gọi là model .

**migrations**: là nơi ta sẽ đặt những file migrations

Như vậy là đã xong phần thiết lập kết nối database, tiếp theo chúng ta cần config các câu lệnh để chạy migration trong file **package.json**: 
```
    "migrate:create": "ts-node ./node_modules/typeorm/cli.js migration:create -n",
    "migrate:up": "ts-node ./node_modules/typeorm/cli.js migration:run",
    "migrate:down": "ts-node ./node_modules/typeorm/cli.js migration:revert"
```

Giờ hãy thử chạy xem sao nhé. Đầu tiên chạy lệnh create để sinh ra file migration
```
npm run migrate:createcreate create-customer-table
```

![](https://images.viblo.asia/f18089cd-8b7b-466f-a205-6e1114b69ac6.png)

Tiếp theo cùng tạo các file trong file customer: 
```
import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class createCustomerTable1600607159610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "customers",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: 'now()',
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("customers");
    }

}
```

Cuối cùng chạy lệnh migrate:up để sinh ra bảng trong database nhé: 
```
npm run migrate:up
```

![](https://images.viblo.asia/0cd84213-26c0-4315-8e59-bb3df3ff21ed.png)

Như vậy là chúng ta đã hoàn thành phần migration cho database trong NestJS sử dụng TypeORM và SQL.

Bài viết được tham khảo từ: 
https://docs.nestjs.com/techniques/database