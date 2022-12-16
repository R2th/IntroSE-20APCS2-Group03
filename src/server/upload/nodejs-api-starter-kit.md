## 1. Mở đầu
Chào mọi người, bài viết này mình sẽ giới thiệu các bạn một Starter Kit hay ho bao gồm một số công nghệ thuộc NodeJS như GraphQL, ReactJS, NextJS.
Bài viết này cũng là mở đầu cho serie bài về quá trình phát triển ứng dụng website **Server Side Rendering (SSR)** với bộ công nghệ trên, các tips & trick cũng sẽ được mô tả để các các bạn không va phải những lỗi đau đầu.
Một số yêu cầu kiến thức bạn cần có trước khi làm việc với bộ Kit này:
* Đã từng thực hành ReactJS
* Hiểu ý nghĩa cơ bản của các thành phần chính GraphQL
* Biết cách sử dụng NextJS cơ bản

## 2. Starter Kit
Github: https://github.com/kriasoft/nodejs-api-starter

Dự án mẫu này được tạo dựa trên Yarn v2 để bắt đầu nhanh các dự án xây dựng ứng dụng website sử dụng GraphQL API và PostgreSQL. Trong Kit này sẽ có sẵn cây thư mục đầy đủ cho một dự án website của bạn.

* env - chứa các biến môi trường
* db - cấu trúc dữ liệu và các công cụ thao tác với database
* api - GraphQL API và các phương thức trung gian (middleware)
* proxy - xử lý proxy nếu có sử dụng đến Cloudflare Workers
* web - khung thư mục website với NextJs
* scripts - các công cụ tự động tự động

Ngay sau khi clone kit về có thể khởi động ngay
```shell
$ cd ./apikit
$ yarn setup
$ yarn start
```
Nếu mọi cài đặt đều là mạc định. API server sẽ chạy ở http://localhost:8080/graphql. Website sẽ chạy ở http://localhost:3000/.

## 3. Thiết kế database với knex.js
Trang chủ: http://knexjs.org/

Knex là công cụ hỗ trợ việc khởi tạo và thao tác với database cho Javascript nói chung. Knex hỗ trợ kết nối đến rất nhiều database thông dụng như mySQL, PostgreSQL, OracleDB, MSSQL...

Một số câu lệnh hữu ích các bạn nên nhớ:
```shell
$ yarn db:version               # In ra phiên bản hiện tại
$ yarn db:migrate               # Cập nhật cấu trúc Database đến phiên bản cuối cùng
$ yarn db:seed                  # Tạo dữ liệu mới trong Database
$ yarn db:rollback              # Cập nhật lại cấu trúc Database đến phiên bản cũ nhất
$ yarn db:reset                 # Khợi tạo cấu trúc Database đến phiên bản cuối cùng và thêm dữ liệu mới
$ yarn db:update-types               # Cập nhật file chứa cấu trúc Database
```
Tạo file mới trong thư mục `db/migrations` mới với tên `002_post_table.js` hoặc cũng có thể viết tiếp vào file `001_initial.js` có sẵn. Trọng số ở đầu tên file rất quan trọng, Knex sẽ chạy từ file đầu tiên đến file cuối cùng trong thư mục sắp xếp theo tên của file. Nên nếu đặt thứ tự không đúng có thể gây ra lỗi, đặc biệt là với những dữ liệu có liên kết khoá ngoại yêu cầu thứ tự các bảng cần tạo đúng.

```javascript
  const defaultCategories = [
    "movies",
    "books",
    "food",
    "travel",
    "other"
  ];
  
  module.exports.up = async ( /** @type {Knex} */ db) /* prettier-ignore */ => {
  
    // Custom UID types for better user experience (unlocks having short URLs etc.)
    await db.raw(`CREATE DOMAIN user_id AS TEXT CHECK(VALUE ~ '^[0-9a-z]{6}$')`);
  
    // Custom types
    await db.raw(`CREATE TYPE category_enum AS ENUM (${defaultCategories.map(x => `'${x}'`).join(', ')})`);
  
    await db.schema.createTable("posts", (table) => {
      table.increments("post_id").primary();
      table.specificType("category", "category_enum").notNullable();
      table.specificType("author_id", "user_id").notNullable();
      table.string("author_name", 100);
  
      table.string("title", 100);
      table.string("slug", 200).unique();
      table.string("question", 100);
      table.string("content", 1000);
      table.string("image", 500);
  
      //Quick filter for stat
      table.integer("count_user_action");
      table.integer("count_user_view");
      table.integer("count_avg_point");
      table.integer("count_shared");
  
      table.timestamps();
  
      table.foreign('author_id').references('id').inTable('users');
    });
  };
  
  module.exports.down = async ( /** @type {Knex} */ db) => {
    await db.schema.dropTableIfExists("posts");
    await db.raw("DROP TYPE IF EXISTS category_enum");
    await db.raw("DROP DOMAIN IF EXISTS user_id");
  };
  
  module.exports.configuration = {
    transaction: true
  };
  
```

Quan sát file migrate phía trên, nếu đã làm việc qua với những công cụ ORM khác chắc hản bạn đã hiểu cấu trúc trương đồng của chúng. Có một phương thức mới đó là `specificType`, nó cho phép tự tạo kiểu dữ liệu theo tính năng mà PostgreSQL cung cấp. Tác dụng thường thấy của nó sẽ là tạo kiểu mẫu *Enum* cho dữ liệu. Hãy nhớ kiểm tra kết nối đến database trước khi chạy câu lệnh cập nhật cấu trúc `yarn db:migrate`. 

Với lần đầu tạo Database hoặc nếu có cập nhật về cấu trúc, bạn cần phải chạy thêm `yarn db:update-types` để hệ thống tự động sinh lại file `types.d.ts`, đây là file liệt kê cấu trúc dữ liệu dưới dạng `type` để các logic sau này có thể thao tác được với Database.

Còn một phần liên quan Database đó là *seed*, tuy nhiên mình sẽ viết ở bài cuối cùng sau khi các logic API đã viết xong. Ở bài sau mình sẽ viết về GraphQL nên hãy chắc rằng các bạn đã tạo được một Database đúng, nếu không sẽ không thể thao tác được với dữ liệu. Mình sẽ trả lời các câu hỏi ở comment nhé!