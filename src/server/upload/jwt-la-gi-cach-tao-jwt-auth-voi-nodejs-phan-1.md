# JWT là gì
`JWT` là viết tắt của `JSON Web Token`  là 1 tiêu chuẩn mở (RFC 7519) định nghĩa cách thức truyền tin an toàn giữa các thành viên bằng 1 đối tượng JSON, nó an toàn vì nó có chứa một chữ ký số. Cấu trúc của một JWT bao gồm 3 phần

* HEADER:  chứa thông tin thuật toán dùng đẽ mã hóa và loại token được lưu dưới dạng object, và được endcode base 64.
* PAYLOAD: cũng tương tự `header` chứa các thông tin của người dùng  cũng dạng  object và được encode base64.
* SIGNATURE: Chữ ký Signature trong JWT là một chuỗi được mã hóa bởi header, payload cùng với một chuỗi bí mật gọi là secret key nó được bảo mật ở phía server 
 
 Dưới đây là 1 JSON Web Token, các thành phần HEADER, PAYLOAD, SIGNATURE tương ứng cách nhau bởi dấu `.` 
 ```
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
 SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 ```
 # Tại sao cần sử dụng JWT ?
 Đầu tiên chúng ta cùng tìm hiểu  authorization với session id cookie
 ![](https://images.viblo.asia/f5fbad3c-f1ef-47da-b08f-0a092ac6a462.png)
Khi User truy cập và login vào trang web thành công thì phía server sẽ tạo và lưu một session chứa thông tin của người dùng đang đăng nhập và trả lại cho client session ID để truy cập  cho những request sau. Từ những request tiếp theo thì user sẽ gửi kèm theo session id đó, server sẽ tìm kiếm session id đó trong session log để biết được user đang đăng nhập là user nào. Phương thức này hoạt động tốt khi có một server duy nhất, vì thế khi khi những ứng dụng web sử dụng nhiều server thì nó sẽ có một một số hạn chế. 

![](https://images.viblo.asia/5cf3b021-785d-4c69-adce-e454947a1980.jpg)

Khi user thực hiện đăng nhập và được định hướng đến server1 thì thông tin đăng nhập của user sẽ được lưu trữ ở server 1. khi người dùng gửi request tiếp theo và được định hướng đến server 2 thì ở server 2 lúc này sẽ không có thông của user vì thông tin đó đang lưu ở server 1. Thì đó JWT sẽ giúp để giải quyết được vấn đề này thay vì lưu trữ thông tin ở server và trả về một sesion id thì  bây giờ chúng ta sẽ trả về thông tin người dùng dưới dạng token, khi request được gửi đi thì token đó cũng được gửi đi theo và được xác thực ở phía server. Khi đó những server có  chung `secret key` thì đều có thể dùng `secret key` để verify  request từ client gửi lên. 

Tiếp theo chúng ta sẽ cùng nhau tạo  ra một JWT token nhé :D

# Tạo một JWT token 
Để tạo một `JWT token` chúng ta cần tạo ra  một node server và cài một số package, nếu chưa biết tạo ta một node server thì các bạn có thể xem lại serises về nodejs cơ bản của mình tại  [đây](https://viblo.asia/s/nodejs-cho-nguoi-moi-bat-dau-DVK2jDkXKLj). Và chúng ta cần cài thêm một số thứ như sau : express, jsonwebtoken,  dotenv à và cả nodemon nữa nhé :D. oki bây giờ vào tạo một file index.js và setup để chạy server lên đã, file index của mình như sau 
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res){
    res.send("Hello World");
})

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})
```
Oki tiếp theo sẽ là phần để tạo ra một token khi mà user đã đăng nhập thành công và gửi thông tin lên server. Nó sẽ như thế này, khi user đăng nhập thành công và gửi thông tin lên server thì server sẽ tiến hành lấy thông tin đó + với `sercet key` để tạo ra token và gửi lại cho client. Vì thế ở trên mình mới cài `dotenv` để  lưu `secret key` vào trong file `.env`. Bây giờ mình sẽ tạo một router login để thực hiện lấy data mà user gửi lên + `secret key` để tạo ra một token rồi sau đó trả lại cho client nhé 
```js 
app.post('/login', (req, res) => {
    const data = req.body;
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s',
    });
    res.json({ accessToken });
})
```
à các bạn nhớ  require `dotenv` với `jsonwebtoken` vào nhé và tao thêm một  file `.env` thêm biến `ACCESS_TOKEN_SECRET` bằng giá trị bất kì mà các bạn muốn. và để đọc được dữ liệu json từ request thì chúng ta cần thêm 
```js
app.use(express.json());
```
file index.js của mình bây giờ sẽ như sau 
```js
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/login', (req, res) => {
    const data = req.body;
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s',
    });
    res.json({ accessToken });
})

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})
```

Giải thích một chút phần code ở trên thì ở đây mình giả sử user đã login thành thông.mình sẽ lấy thông tin mà user gửi lên thông qua `req.body` rồi đưa vào làm tham số thứ nhất của hàm tạo token (sign), tham số thứ hai là một `secret key` được lấy từ  file .env, tham số thứ 3 là thời gian hết hạn của token. Cuối cùng là sau khi tạo được token thì chúng ta trả lại cho client thôi. Rồi bây giờ dùng Postman test thử thì chúng ta được kết quả 

![Screenshot from 2021-08-27 21-44-18.png](https://images.viblo.asia/a865111e-abb7-4535-8d73-47e8436dab7d.png)
 Vậy là token đã được tạo.
 
 Tiếp theo là phần xác thực xem token mà người dùng gửi lên serve có hợp lệ không. Ý tưởng của mình sẽ là tạo ra một router để get data, router này sẽ gửi kèm token lên để server xác thực token đó có hợp lệ không thông qua middleware nếu hợp lệ thì mới cho phép thực thi router đó.
  
  hàm middleware của mình như sau 
  ```js
  function authenToken(req, res, next) {
    const authorizationClient = req.headers['authorization'];
    const token = authorizationClient && authorizationClient.split(' ')[1]

    if (!token) return res.sendStatus(401)

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next();
    } catch (e) {
        return res.sendStatus(403)
    }
}
  ```
  và môt router get data với middleware `authenToken` như sau: 
  ```js
  app.get('/users', authenToken, function(req, res){
    res.json({data: users});
})
  ```
  với `users` là 
  ```js
  const users = [
    {
        id: 1,
        name: 'Hoang'
    },
    {
        id: 2,
        name: 'Huy'
    }
]
  ```
  Hàm middleware `authenToken` sẽ hoạt động như sau đầu tiên là nó sẽ lấy `authorization` từ headers được gửi lên ở phía client.  vì authorization được gửi lên từ client có dạng `Beaer [token]` nên để lấy được token thì chúng ta cần split() nó. Tiếp theo kiểm tra token null thì trả về status 401 còn không thì sẽ tiến hành xác thực token đó với hàm `verify`  của jwt với 2 tham số, tham số đầu tiên là token chúng ta vừa lấy được, tham số thứ 2 là `secret key`. Ở đoạn verify này mình cũng try catch để nếu có lỗi thì sẽ trả về lỗi  403 không thì gọi đến method next() để logic trong router get  /users được thực thi.
  # Kết Luận
  Như vậy mình đã giới thiệu đến các bạn về JWT là gì, vì sao cần dùng nó và các tạo ra một JWT token cũng như xác thực nó trên server. Phần sau mình sẽ cùng tìm hiểu về Refresh Token là gì? Tại sao lại sử dụng Refresh Token?. Cảm ơn các bạn đã đọc nếu thấy bài viết hữu ích hãy cho mình một upvote nhé. Cảm ơn các bạn