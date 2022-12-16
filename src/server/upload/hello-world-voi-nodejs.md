# Bắt đầu
Bạn là một Front End Developer, bạn master javascrip :D và bạn đang muốn theo hướng full stack developer, Bạn quyết định học thêm một ngôn ngữ để làm server, vậy đâu là lựa chọn tốt nhất giành cho bạn để giúp bạn tận dụng tối đa đươc khả năng sẵn có của mình. Vâng không ai khác đó chính là `Nodejs` vì sao ư, đơn giản là vì bạn chỉ cần biết javascrip là có thể làm được rồi, không cần phải mất công học thêm một ngôn ngữ nữa để làm server quá tuyệt phải không, học một làm được hai :D. Không dài dòng nữa chúng ta cùng nhau tìm hiểu về  `Nodejs`, Vậy  `Nodejs` là gì nó làm được những gì. Bắt đầu luôn nhé  :D
 ### Nodejs là gì ?
 Theo mình tìm hiểu được trên wikipedia thì `Nodejs` là : 
 * Một mã nguồn mở được xây dựng dựa trên nền tảng Javascript V8 Engine
của Google
* `NodeJS` hoàn toàn miễn phí chạy trên server
* Có thể cài đặt trên nhiều nền tảng khách nhau (Windows, Linux, Unix, Mac OS X, v.v.)

Nó còn có một số đặc trưng như sau:
* Tối ưu hóa thời gian thực hiện tiến trình
* Có khả năng mở rộng trong các ứng dụng web với nhiều hoạt đông I/O liên tục
* Dễ dàng xây dựng các ứng dung real-time
* Cách viết ứng dụng với Node đó là các ứng dụng được cấu tạo từ các module nhỏ
sau đó được kết hợp lại với nhau điều này đảm bảo cho việc sửa đổi bảo trì một cách
nhanh chóng...
Tiếp theo chúng ta cài đặt `Nodejs` để viết những dòng code đầu tiên nhé, ở đây mình sẽ hướng dẫn cài đặt trên ubuntu

# Cài Đặt
Để cài đặt`Nodejs` trên ubuntu rất đơn giản bạn chỉ cần mở terminal lên và chạy command:
```php
          sudo apt install nodejs
```
Tiếp theo để kiểm tra xem đã cài đặt thành công `Nodejs` hay chưa bạn chỉ cần chạy command
```php
node -v hoặc node –version
```
 ![](https://images.viblo.asia/13d77011-19cf-4a9a-b900-a26a17b8cb82.png) 
 
 Nếu nó hiện ra như thế này thì có nghĩa bạn đã cài đặt thành công  :D

* Npm (Node package manager) là một công cụ tạo và quản lý các thư viện lập trình Javascript cho Node.js nó được tích hợp sẵn vào trong node.js. Nên khi các bạn cài đặt node.js thì đã có  npm luôn rồi. 

Bây giờ chúng ta sẽ tạo một project `Nodejs` với `npm` bạn chỉ cần chạy command:
```php
npm init --yes hoặc npm init
```
Mình thì hay chạy `npm init --yes` hơn  vì  khi thêm `--yes` n sẽ tạo luôn project mặc định cho mình mà không cần hỏi một vài tham số như `author`...

Tiếp theo mình sẽ cd đến thư mục vừa cài project  nodejs để cài thêm framework `express` của `Nodejs`, khi đã có `npm` thì việc cài đặt rất đơn giản vì `express` nó đã là một module trong `npm` bạn chỉ cần chạy command sau để cài :
```php
          npm install express --save
```
thêm `--save` để có thể lưu phiên bản của module vào phần  `dependencies` trong file `package.json`.
# Hello world
Tiếp theo chúng ta sẽ thử viết và in ra màn hình `Hello world`. Nhưng trước tiên chúng ta cần tìm hiểu xem cấu trúc của project `Nodejs` chúng ta vừa tạo nó như thế nào nhé :D. Sau khi chúng ta chạy lệnh `npm init --yes` và `install` thêm module `express` thì chúng ta được một file có tên là `package.json`  và đây là những gì có trong file `package.json`
```php
{
  "name": "Nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
Ngoài ra khi chúng ta install các module thì `Nodejs` còn sinh ra một folder là `node_modules` để chứa các thứ liên quan đến module bạn vừa cài đặt, nhìn chung là cũng không cần quan tâm đến folder này lắm  :D. Khi `Nodejs` chạy nó sẽ chạy vào file được chỉ định trong key `main` ở file `packager.json` và ở đây mình đang đang để mặc đinh là file `index.js` vì thế mình sẽ tạo một file mới có tên là `index.js` để đảm bảo viết code vào đó thì chắc chắn code được chạy  :D.
Và đây là file `index.js` của mình 
```php
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
Sau đây mình sẽ giải thích qua đoạn code trên :

`const express = require('express');` Trong `Nodejs` bạn muốn sử dung module nào thì bạn cần phải `require` module đó vào, ở đây mình muốn sử dụng `express` nên mình phải `require` nó vào thôi :D.

`const app = express();` Tạo một `app` sử dụng module `express` mình vừa `require` ở trên

`const port = 3000;` Khai báo một cổng để chạy ứng dụng NodeJS của bạn trên server, bạn có thể để cổng khác tùy ý tránh bị trùng cổng giữa các  ứng dụng là được :)

```php
app.get('/', function(req, res){
    res.send("Hello World");
})
```
Hàm get() sẽ có 2 tham số, tham số đầu tiên là địa chỉ mà server sẽ nhận request từ client để thực thi function là tham số thứ 2. Ở đây khi truy cập vào đường dẫn `http://localhost:3000/` thì bạn sẽ nhận được kết quả 

![](https://images.viblo.asia/808f40cf-dddd-4641-af7b-69599835b51a.png)

```php
app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})
```
Hàm listen() sẽ khởi động server. Hàm này có 2 tham số, tham số đầu tiên là port mà ứng dụng NodeJS của bạn sẽ chạy, tham số thứ 2 là một callback function sẽ được gọi khi server khởi động. Function này lại chứa một tham số `error` để bắt lỗi khi mà server không thể khởi động vì một lý do nào đó. Ở đây mình `console.log()` để biết là server có khởi động thành công hay gặp lỗi, còn nếu các bạn không thích thì có thể viết lại như thế này 
```php
app.listen(port)
```
nó vẫn chạy bình thường :D.

Bây giờ thử chạy lênh `node index.js` để xem có lỗi gì không nhé. nếu terminal của bạn hiện `server is running port:  3000` là bạn đã chạy thành công, bây giờ hãy thử truy cập vào `localhost:3000` xem có gì nhé, kết quả là đây :) 

![](https://images.viblo.asia/808f40cf-dddd-4641-af7b-69599835b51a.png)

# Kết luận

 Vậy là mình đã cùng mọi người tạo một project `Nodejs`vào in ra `Hello World` (ví dụ kinh điển) :D. Phần sau mình sẽ tiếp tục làm một số thứ để code của chúng ta trông ngầu hơn như tự tạo câu lệnh run project thay vì câu lệnh `node index.js` như hôm nay, dùng `yarn ` thay vì `npm` xem có khác gì không :v, sử dụng `nodemon` để không phải tự mình khởi động lại server khi code của mình thay đổi....Cảm ơn các bạn đã đón đọc, các bạn có thắc mắc hay bổ sung gì thì hãy cmt xuống bên dưới để mình giải đáp và hoàn thiện bài viết hơn. Hẹn gặp lại trong bài  viết tiếp theo.