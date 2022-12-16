Ở bài trước mình có giới thiệu cho các bạn những khái niệm cơ bản về Authentication và Authorization. Các bạn có thể đọc [ở đây](https://viblo.asia/p/tim-hieu-ve-khai-niem-xac-thuc-nguoi-dung-authentication-ByEZkrM4KQ0) nếu như chưa đọc nhé!    

[Bài trước](https://viblo.asia/p/tim-hieu-ve-khai-niem-xac-thuc-nguoi-dung-authentication-ByEZkrM4KQ0) mình có nói là có 2 giải pháp tốt nhất được biết đến cho vấn đề xác thực :
 1. Dùng JSON Web Token (JWTs) : Tức là call api để xác thực
 2. Dùng OAuth 
 Bài viết này mình sẽ hướng dẫn cách bạn build một ví dụ về người dùng Authentication với chức năng Registation và Login & Authorization với [JsonWebToken](https://jwt.io/) (JWT)      

## Nội dung bài viết
- Flow xác thực người dùng với JWT : User Signup & User Login.
- Dùng Node.js Express với CORS, Authentication & Authorization middlewares, Mongoose ODM.
- Cách config các routes của Express để làm việc với JWT.
- Cách tạo database cùng với Mongoose.

##  Xác thực người dùng dựa trên token
- Đầu tiên phải hiểu được flow authentication. Mình tóm tắt ngắn gọn về phía người dùng. ví dụ: bạn bắt đầu bạn sử dụng app nào đó thì có phải bạn đăng kí rồi lấy account đó đăng nhập đúng ko ? Vậy điều gì xảy ra từ lúc bạn nhấn đăng kí.   

![image.png](https://images.viblo.asia/cbdda786-322a-446b-8e9d-4ef1079d10f6.png)

- Khi nhận được token từ server trả về, thì bạn có thể lưu Token ở Cookie hoặc Local Storage. Để so sánh sự khác nhau của 2 nơi này bạn có thể đọc thêm [ở đây.](https://www.tutorialspoint.com/What-is-the-difference-between-local-storage-vs-cookies)  
- Token mình nhận được thì sẽ có 3 phần: **Header, Payload, Signature.**  Chúng kết hợp với nhau thành chuỗi chữ số có dạng **header.payload.signature**
- Có 2 cách sử dụng token để  đính kèm  trên header để user gửi request đến server:
  + Bearer token hay gọi là Bearer authentication chính là token authentication:   `Authorization: Bearer [header].[payload].[signature]`
  +  Chỉ dùng x-access-token trên header :  `x-access-token: [header].[payload].[signature]`

## Xây dựng User Authentication bằng Node.js & MongoDB   
 Ví dụ này mình sẽ làm những gì? 
- User có thể đăng kí 1 account mới, login bằng username & password từ account đã đăng kí.
- Tạo 3 role (**admin, moderator, user**), User có thể bảo vệ resources bằng các role có thể access hay không.
- Những api mà ví dụ này mình tạo : 


| **Methods** | **Urls** | **Actions** |
| -------- | -------- | -------- |
| POST     | /api/auth/signup     | đăng kí account mới     |
| POST     | /api/auth/signin     | login bằng account    |
| POST     | /api/test/all     | get data public ( ko cần đăng nhập, ko cần authentication)     |
| POST     | /api/test/user     | get data nội dung của user có role là User ( cần phải đăng nhập account vs role User)|
| POST     | /api/test/mod     | get data nội dung của user có role là Moderator ( cần phải đăng nhập account vs role Moderator)|
| POST     | /api/test/admin     | get data nội dung của user có role là Admin ( cần phải đăng nhập account vs role Admin)|   

## Flow cho Signup & Login với JWT Authentication
Sơ đồ sau thể hiện flow mà mình sẽ build chức năng **User Registration**, **User Login** và **Authorization.**
![](https://images.viblo.asia/da3ec693-75d8-49c7-9cfd-c1458530e0fb.png)  

## Kiến trúc của Node.js Express với Authentication & Authorization   
Dưới đây là tổng quan về Ứng dụng Node.js Express:
![image.png](https://images.viblo.asia/8bd0787b-d011-4eb7-a0bb-1e69593a5bff.png)

Thông qua các Express routes, thì HTTP request của route sẽ được kiểm tra nhờ CORS Middleware để check route đó có quyền truy cập hay không.
Middleware là các phần được Security gồm : 
- JWT Authentication Middleware: verify SignUp, verify token.
- Authorization Middleware: check User’s roles record trong database.

Controller : nơi tương tác với MongoDB database dùng thư viện mongoose và trả về data  (token, user information, role,...) qua giao thức HTTP cho người dùng.

## Technology mình sử dụng 
- Express 4.17.1
- bcryptjs 2.4.3
- jsonwebtoken 8.5.1
- mongoose 5.9.1
- MongoDB

## Cấu trúc project mình build
![image.png](https://images.viblo.asia/3016b91c-f388-4119-9047-87ae3409ed54.png)

## Create Node.js App
- Tạo một thư mục và cd vào thư mục đó mở terminal lên chạy : `npm init`  cứ auto enter nhé! ^^ (nếu như bạn ko có nhu cầu sửa tên: name, author,...bla..bla
- Tiếp theo cài đặt các modules mình sẽ sử dụng trong app này:  **express, cors, body-parser, mongoose, jsonwebtoken and bcryptjs**.
Bằng lệnh  `npm install express mongoose body-parser cors jsonwebtoken bcryptjs --save`

## Setup Express web server nào!
1. File **server.js** :

```
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
```

Đoạn code trên chúng ta vừa tạo:
- Import các modules:  express, body-parser và cors 
  + Express: xây dựng các Rest api.
  + body-parser: giúp parse request mà client gửi lên và tạo thành dạng object ở req. body .
  + cors: là module cung cấp Express middleware enable CORS.
- Sau khi add body-parser và cors middlewares sử dụng qua method app.use() .
- Mở terminal và chạy: `node server.js` Bạn sẽ thấy kết quả :   
![image.png](https://images.viblo.asia/a8db7ba4-ed9c-448f-9b22-64b8e5ba06ed.png)

Như vậy chúng ta đã tạo được server be bé rùi đó, phần tiếp theo mình sẽ hướng dẫn các bạn install mongoDB (sửa dụng MongoDB compass quản lý database), Connect server của mình vừa tạo với MongoDB, tạo các collection (user, role), và tạo Middlewares để xét quyền truy cập của các router các bạn nhé!.

## Kết 
Mong rằng bài viết của mình giúp ích phần nào cho các bạn. Cảm ơn các bạn. Hẹn gặp lại các bạn trong các bài viết tiếp theo nhé ! ❤️

Nguồn: https://www.bezkoder.com/node-js-mongodb-auth-jwt/