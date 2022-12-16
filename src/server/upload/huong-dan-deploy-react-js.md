# Hướng dẫn deploy ReactJS app
### Trong quá trình phát triển ứng dụng cùng với thư viện React, chúng ta đang lập trình trong môi trường nhà phát triển (*development mode*). Bạn có thể xác định bằng React Dev Tool sẽ có biểu tượng màu đỏ. 
Sau đây, mình sẽ liệt kê các cách để triển khai ứng dụng ReactJS trong **Production mode**
## I. Buid ứng dụng
- Tại folder chứa code của bạn chạy câu lệnh:
```
 npm run buid
```
- Sau bước này sẽ tạo ra 1 thư mục build. Đây chính là thư mục dùng để triển khai.
## II. Triển khai ứng dụng
` **Lưu ý**: Server của bạn phải được cài NodeJS và npm`
### 1. Static Server
Sử dụng 1 dịch vụ dựa trên môi trường Node đó là [Serve](https://github.com/vercel/serve):
``` 
npm install -g serve
```
``` 
serve -s build
```
- build là đường dẫn tới folder build mà bạn vừa chạy câu lệnh   ``` npm run build  ```.
- Bạn cũng có thể chọn cổng được bind cho ứng dụng của bạn:
```
serve -s build -l 4000
```
- Xem chi tiết các câu lệnh của Serve:
```
serve -h
```
### 2 .  Các cách khác
Bạn có thể sử dụng Node và Express như sau(cái này cũng tương tự như [Serve](https://github.com/vercel/serve) nhưng bạn cần tạo 1 dịch vụ, còn bên trên đã dựng sẵn )
```
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);

```
- dirname là đường dẫn tới thư mục build của bạn
==> Thôi cứ dùng cách trên cho nhanh
- Sử dụng các bên thứ 3 như [ Azure ](https://azure.microsoft.com/) or   [Firebase](https://firebase.google.com/)
## III. Kết luận
- Bạn nên sử dụng cách đầu tiên, là 1 cách dễ dàng nhất trong triển khai ứng dụng lên server của bạn.