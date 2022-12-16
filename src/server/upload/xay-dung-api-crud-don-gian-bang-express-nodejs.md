## 1. Mở đầu
Xin chào các bạn, ở bài viết này chúng ta sẽ cùng tìm hiểu về cách xây dựng API bằng Node.js nhé. Mình sẽ sử dụng framework Express, CSDL là MySQL với Prisma(ORMs). Kết quả sau bài viết này đó là có một ứng dụng web API bao gồm chức năng CRUD đơn giản.

## 2. Init project
### 2.1 Init npm
Đầu tiên các bạn tạo 1 thư mục bất kì và di chuyển vào thư mục đó. Thư mục mình tạo trong bài sẽ là `express_api` nhé:
```
mkdir express_api
cd express_api
```
sau đó chạy: `npm init -y` để khởi tạo project `npm`. Khi quá trình này hoàn tất nó sẽ sinh ra file package.json.
### 2.2 Cài đặt framework Express
Cài đặt framework Express cho app:
```
npm install express cors  --save
```

### 2.3 Cài đặt nodemon
nodemon sẽ tự khởi động lại máy chủ nếu có sự thay đổi ở các file.
Cài đặt nodemon:
```
npm install nodemon --save-dev
```
Sau đó các bạn vào file `package.json` và thêm `"start": "nodemon server"` vào.
```
"scripts": {
    "start": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### 2.4 Cài đặt Prisma
Prisma là một ORMs mã nguồn mở đang là xu hướng hiện nay. Các bạn có thể lên prisma.io[](https://www.prisma.io) để tìm hiểu kĩ hơn về nó nhé :D

Cài đặt Prisma:
```
npm install prisma --save-dev
npm install @prisma/client --save
```
 Tiếp theo chạy lệnh `npx prisma init`. Sau khi chạy lệnh này thì thư mục prisma đã được tạo ra trong project, nó cũng tự động tạo ra `.env` là file dotenv để xác định URL kết nối cơ sở dữ liệu.

Các bạn vào  `prisma/schema.prisma`  thêm "mysql" vào.
```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
 Sau đó vào file  `.env` và thiết lập `DATABASE_URL`.

`DATABASE_URL="mysql://root:password@localhost:3306/apiDB"`

## 3.  Tạo file server.js
Sau khi tạo file `server.js` ta sẽ require thư viện và sử dụng những `middleware `cần thiết. Tiếp theo các bạn tạo một `route` và khai báo cổng cho app.

```
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ "message": "hello world" });
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
```

Bật terminar và chạy lệnh `npm start` ( hoặc `node server.js`).
```
> express_api@1.0.0 start /Users/dnpn/express_api
> node server.js

Server is listening on port 8080
```
Nếu terminar ra như thế này thì ta thành công rồi đó. Truy cập [localhost](http://localhost:8080/) để tận hưởng chút thành quả đầu tiên nào :D. 

## 4. Mô hình hóa dữ liệu với Prisma
Đặc điểm chính của ORMs là nó cho phép bạn lập mô hình dữ liệu ứng dụng của mình theo các lớp được ánh xạ tới các bảng trong cơ sở dữ liệu . Trong bài biết này mình sẽ sử dụng Prisma Client và Prisma Migrate để thực hiện việc mô hình hóa dữ liệu.
Các bạn vào  `prisma/schema.prisma`  và thêm model `User`.
```
model User {
  user_id Int     @id @default(autoincrement())
  name    String?
  email   String  @unique
}
```
Prisma Migrate ánh xạ các model này vào các bảng trong cơ sở dữ liệu.  Các bạn chạy lệnh `npx prisma migrate dev`.
```
MySQL database apiDB created at localhost:3306

? Enter a name for the new migration: ›
```
Khi hiện lên như thế này các bạn chỉ cần nhấn `enter` nó sẽ tự động đặt tên cho `migration`. Sau khi chạy xong và hiện ra như thế này có nghĩa là ta đã tạo được database và đồng bộ nó với `schema` thành công
```
The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20210911085943_/
    └─ migration.sql

Your database is now in sync with your schema.
```
## 5. Các method, URL

| method | URL | action |
| -------- | -------- | -------- |
| GET     | /users     |  lấy tất cả user     |
| GET     | /users/1     | lấy user có id = 1     |
| POST     | /users     |  thêm một user     |
| PUT     | /users/1     |  cập nhật user có id =1     |
| DELETE     | /users/1     | xóa user có id = 1     |

## 6. API CRUD
Trước hết ta phải require thư viện `@prisma/client` để có thể truy cập cơ sở dữ liệu.
```
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```
 
### 6.1  API lấy tất cả user
 Các bạn tạo route lấy tất cả dữ liệu user:
```
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    if (users.length === 0) {
      return res.status(400).json({ ok: false, message: "list users are empty" });
    };
    return res.json({ ok: true, data: users });
  }
  catch (error) {
    res.status(500).json({
      ok: false,
      error: "Something went wrong!"
    });
  }
  finally {
    async () =>
      await prisma.$disconnect()
  }
});
```
Gọi API bằng URL : http://localhost:8080/users

Chúng ta sẽ chuyển sang `Postman` để test thử.

![](https://images.viblo.asia/bbe4b559-487e-4752-8a3c-3df696ec8f8d.png)
### 6.2  API lấy user bằng id
 Các bạn tạo route lấy user bằng id:
```
 app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: Number(req.params.id) }
    });
    if (user) {
      return res.json({ ok: true, data: user });
    }
    return res.status(400).json({ ok: false, message: "User not exist" });
  }
  catch (error) {
    res.status(500).json({
      ok: false,
      error: "Something went wrong!"
    });
  }
  finally {
    async () =>
      await prisma.$disconnect()
  }
});
```
 test `Postman`: 
 
![](https://images.viblo.asia/71639e97-ae10-444d-a806-dfc035b64fd6.png)

### 6.3  API thêm một user
 Các bạn tạo route thêm một user:
```
app.post('/users', async (req, res) => {
  try {
    if ((!req.body.name) || (!req.body.email)) {
      return res.status(400).json({ ok: false, message: "Please enter data" });
    }
    const user = await prisma.user.findUnique({
      where: { email: req.body.email }
    });
    if (user) {
      return res.status(400).json({ ok: false, message: "Email was exist" });
    } else {
      const userNew = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email
        },
      });
      return res.json({ ok: true, data: userNew });
    }
  }
  catch (error) {
    res.status(500).json({
      ok: false,
      error: "Something went wrong!"
    });
  }
  finally {
    async () =>
      await prisma.$disconnect()
  }
});
```
 test `Postman`: 
 
  ![](https://images.viblo.asia/998e5c15-0d1b-41d5-a8bf-aec1b74822ae.png)
### 6.4  API cập nhật user
Các bạn tạo route cập nhật user bằng id:
```
app.put('/users/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ ok: false, message: "Please enter data" });
    }
    const user = await prisma.user.update({
      where: { user_id: Number(req.params.id) },
      data: {
        name: req.body.name
      }
    });
    return res.json({ ok: true, data: user });
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      error: "Something went wrong!"
    });
  }
  finally {
    async () =>
      await prisma.$disconnect()
  }
});
```
 test `Postman`: 
 
 ![](https://images.viblo.asia/0bb2bb0b-7b44-4716-bcdc-083555a765a9.png)

### 6.5  API xóa user
Các bạn tạo route xóa user bằng id:
```
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: Number(req.params.id) }
    });
    if (!user) {
      return res.status(400).json({ ok: false, message: "User not exist" });
    };
    const userDelete = await prisma.user.delete({
      where: { user_id: Number(req.params.id) }
    });
    return res.json({ ok: true, message: "Delete success" });
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      error: "Something went wrong!"
    });
  }
  finally {
    async () =>
      await prisma.$disconnect()
  }
});
```
 test `Postman`: 
 
 ![](https://images.viblo.asia/dfb8514e-974b-4e9d-b18e-252d1e84f12b.png)