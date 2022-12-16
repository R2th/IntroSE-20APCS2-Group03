Chào các bạn! <br>
Sau khi kết thúc loạt bài về làm quen với Node.js . Mình sẽ tiếp tục làm loạt bài về Express, một web framework, cho Node.js. <br>
Và để bắt đầu cho một sự khởi đầu mới, mình mời các bạn cùng đến với bài mở đầu "Hello World". <br>
Loạt bài này mình thực hiện trên hệ điều hành Ubuntu 16.04, và sử dụng terminal mặc định trên hệ điều hành.
# 1. Giới thiệu về Express:
Thay vì giới thiệu từ đầu về Express, mình giới thiệu với các bạn bài viết "[[Phần 1] Tìm hiểu Express js Framework](https://viblo.asia/p/phan-1-tim-hieu-express-js-framework-Qbq5Qq7m5D8)" của tác giả "[Le Van Liem](https://viblo.asia/u/vanliem_l)". Các bạn có thể tham khảo bài viết này để có được cái nhìn ban đầu, cách cài đặt Express framework. <br>
+ Express ra đời khi nào? :::: Phiên bản Express release đầu tiên vào tháng 11 năm 2010. Phiên bản hiện tại là 4.17.1.  Và không dừng lại ở đó, phiên bản Express 5.0 đang được xây dựng, các bạn có thể trải nghiệm với phiên bản 5.0 alpha. <br>
+ Express hỗ trợ những gì? ::::: Quản lý và xử lý routing của ứng dụng web. Tích hợp với các view engine để hồi đáp các request thông qua các view template đi kèm với dữ liệu. Hỗ trợ các cài đặt như cổng kết nối server, địa chỉ các tài nguyên, ... để hồi đáp cho các request. Có các "middlewave" để hỗ trợ cho việc xử lý các request bất cứ lúc nào. <br>
Ở mỗi bài viết mình sẽ giới thiệu thêm về một số thành phần trong Express.
# 2. Hello World :
Một chương trình "Hello World" chắc chắn không thể làm khó được mình hoặc các bạn, nhưng sẽ giúp chúng ta có bước làm quen dễ dàng hơn với Express.<br>
Ở đây, mình setting trong package.json file dùng để khởi chạy chương trình là *app.js* ("main": "app.js"). Các bạn có thể thiết lập ban đầu khi khởi tạo *npm init*.<br>
Nội dung chương trình "Hello World" như sau:
```
const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Hello World app listening on port ${port}!`));
```
Bật terminal và chạy *app.js* và truy cập localhost:3002. Chúng ta cùng "Hello World".
# 3. Express generator:
Để thuận tiện hơn trong việc tạo project với Express, chúng ta có thể dụng *express-generator package* để tự động khởi tạo phần khung dự án.<br>
Các bạn cài đặt *Express Generator* theo hướng dẫn tại [đây](https://www.npmjs.com/package/express-generator). Sau khi cài đặt xong, mở terminal, chạy *npm install* để cài đặt các dependencies sẵn có trong *package.json*, và sau đó chạy server bằng lệnh *npm start* . Truy cập localhost chúng ta có được thành quả. <br>
![](https://images.viblo.asia/7c2f9cd9-6ba0-4efb-8daf-4303649f62fc.png)

*Cảm ơn các bạn đã đọc bài viết đầu tiên trong loạt bài về Express. <br>*

*Nguồn: http://expressjs.com/en/starter/hello-world.html*