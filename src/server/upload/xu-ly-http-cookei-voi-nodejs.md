Trong bài trước ([tìm hiểu về Cookie](https://viblo.asia/p/tim-hieu-ve-cookies-bXP4W5YKL7G)), chúng ta đã tìm hiểu về khái niệm Cookie rồi,  còn trong bài này chúng ta cùng nhau thực hành với Cookies bằng thư viện NodeJS các bạn nhé,

Trước hết chúng ta cài NodeJS ở trang chủ https://nodejs.org/en/, chọn phiên bản phù hợp với máy tính của bạn như sau và cài đặt bằng cách nhấn next, next...😄😄😄

![image.png](https://images.viblo.asia/45dedb06-a2f2-4dec-aa9c-2e8530ffc01e.png)

Để kiểm tra version của NodeJS, bạn gõ lệnh:
```
$node -v
v16.14.0
```

Để có thể chuyển đổi node version, chúng ta có thể sử dụng thư viện nvm (node version control manager):
```
$nvm use <your_version> 
```
hoặc 
```
$nvm alias default <your_version> 
```

### I. Cài đặt bộ thự viện express để chạy web
Đầu tiên, ta khởi động dự án với lệnh:
```sh
$npm init
```
```
$npm install express cookie-parser --save
```
Cấu trúc file package.json như sau:
```json
{
    "name": "Bài học về Cookie",
    "version": "1.0.0",
    "description": "Mô tả bài học về Cookie",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "cookie-parser": "^1.4.6",
        "express": "^4.18.1"
    }
}

```

Sau đó, chúng ta tạo file app.js và thêm gói thư viện chuyên xử lý web (expressjs) vào:
``` javascript
let express = require('express');
//Thiết lập gói express app
let app = express();

const PORT = 3000;
const URL = 'http://localhost`;

//Đường dẫn trang chủ
app.get('/', (req, res) => {
  res.send('Chào mừng bạn đến với bài học về cookie');
});

//Lắng nghe công 3000
app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Lắng nghe ở cổng http://${URL}:{PORT}`);
});
```
Sau đó chúng ta khởi động app bằng lệnh: ``` node app.js```

```

$node app.js
Lắng nghe ở cổng http://localhost:3000

```

Kết quả sẽ như thế này: 
![image.png](https://images.viblo.asia/a2354e9a-2e0b-485d-9f55-90aa00e8cc68.png)

### II. Web Cookie là gì?
Như vậy, chúng ta đã thiết lập thành công ứng dụng express rồi, bây giờ hãy bắt đầu với cookie thôi nào 😎.
 Đối với cookie, trước tiên, chúng ta cần thêm module trong tệp app.js và sử dụng nó giống như các phần middle chung cho các routes.
 
 ```
 var cookieParser = require('cookie-parser');
 ```
Giả sử, chúng ta có một người dùng và chúng ta muốn thêm dữ liệu người dùng đó vào cookie thì chúng ta cần thêm cookie đó vào response bằng cách sử dụng mã sau:
```
res.cookie(ten_cookie, gia_tri_cookie);
```

Toàn bộ đoạn code sẽ  trông như thế này:
```
let express = require('express'); //Thiết lập gói express app
let cookieParser = require('cookie-parser'); //Thiết lập gói cookie-parser

let app = express();
app.use(cookieParser());

const PORT = 3000;
const URL = `http://localhost`;

//Đường dẫn trang chủ
app.get('/', (req, res) => {
  res.send('Chào mừng bạn đến với bài học về cookie');
});

//Lắng nghe công 3000
let users = {
  name: 'Nguyen Duc My',
  job: 'Nodejs Developer',
};

app.get('/setuser', (req, res) => {
  res.cookie('user', users);
  res.send('<h3>Đã thêm thông tin user vào cookie</h3>');
});

app.get('/getuser', (req, res) => {
  // Xem toàn bộ cookie
  res.send(req.cookies);
});

app.get('/logout', (req, res) => {
  //Xóa dữ liệu cookie
  res.clearCookie('user');
  res.send('user logout successfully');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Lắng nghe ở cổng ${URL}:${PORT}`);
});

```
Kiểm tra lại đường dẫn:

http://localhost:3000/
![image.png](https://images.viblo.asia/6529b001-1564-497e-bcfc-2e1a8d230e1c.png)

http://localhost:3000/setuser

![image.png](https://images.viblo.asia/ba5cbdec-0c4b-433e-9f66-e2dc53f0138b.png)

http://localhost:3000/getuser

![image.png](https://images.viblo.asia/6a01b6f0-ab2b-47e3-96d0-1e0ff2c4bc3d.png)

http://localhost:3000/logout

![image.png](https://images.viblo.asia/d8f44398-0838-4cd6-a422-79b352622728.png)

### Tóm lược
Đây là về cách sử dụng cơ bản của cookie HTTP bằng cookie-parser middleware. Cookie có thể được sử dụng theo nhiều cách như: duy trì các phiên và cung cấp cho mỗi người dùng một cái nhìn khác nhau về trang web dựa trên các giao dịch trước đó của họ trên trang web.

Bài tham khảo:
https://www.geeksforgeeks.org/http-cookies-in-node-js/