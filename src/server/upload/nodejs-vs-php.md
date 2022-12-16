![](https://images.viblo.asia/d96d3077-5605-47bf-863a-35b92b7a31f9.jpg)
PHP và Node.js đều là hai công nghệ web phổ biến nhất hiện nay. Cả hai đều có thể xây dựng được các ứng dụng phức tạp và có quy mô lớn, tuy nhiên PHP và Node.js khác nhau hoàn toàn về tư tưởng và cấu trúc thiết kế.

## 1.Giới thiệu
### PHP
PHP - là ngôn ngữ lập trình kịch bản (scripting language) mã nguồn mở được dùng để tạo ra các ứng dụng web chạy trên Server. PHP được tạo ra bởi Rasmus Lerdorf vào năm 1994, kể từ đó PHP là sự lựa chọn cho các hệ thống quản lý như WordPress, Drupal và Joomla. Theo thống kê mới nhất năm 2019, hơn 80% trang web trên thế giới được xây dựng bằng PHP
### Node.Js
Node.Js là một nền tảng chạy trên môi trường V8 Javascript runtime, giúp xây dựng các ứng dụng web một cách đơn giản và dễ dàng mở rộng. Node.Js được phát triển bởi Ryan Dahl vào năm 2009, phiên bản ổn định mới nhất là 10.15.3. Node.Js cho phép thực hiện lập trình không đồng bộ (**asynchronous programming**) vì thế hiệu suất của Node.Js rất đáng nể. Tuy nhiên hiện nay độ phổ biến của Nodejs tương đối thấp (chỉ 0.4%), trong tương lai Nodejs sẽ phổ biến hơn đố với các lập trình viên.
> **Xử lý đồng bộ**: thực hiện các công việc theo một thứ tự đã được lập sẵn. Công việc sau bắt đầu thực hiện chỉ khi công việc thứ nhất hoàn thành
>
> **Xử lý bất đồng bộ**: thực hiện nhiều công việc cùng một lúc. Phương pháp này rất phổ biến trong ứng dụng Nodejs.

![](https://images.viblo.asia/20cc4586-daa6-44c1-83f7-e86c4f4de882.png)

## 2. Sự khác nhau giữa Node.Js và PHP
### Môi trường
Mặc dù cả Javascript và PHP đều có thể được nhúng trực tiếp vào mã HTML, nhưng cả hai đều cần trình thông dịch để chạy.

PHP được sử dụng ở phía máy chủ và được cung cấp bởi Zend engine.

Node.Js được chạy trên môi trường runtime, được cung cấp bởi Google V8 Javascript engine.
### Trình quản lý gói
PHP sử dụng các công nghệ cài đặt module như PEAR hay Composer (framework và các package PHP component).
<br>
<br>
Node.Js được đi kèm với hệ thống quản lý gói được gọi là **NPM (Node Package Manager)** .
### Khả năng mở rộng
PHP được hỗ trợ hầu hết trên các hệ thống quản lý nội dung phổ biến như Wordpress, Drupal, Joomla. PHP thường được lựa chọn cho các website blog, thương mại điện tử quy mô nhỏ. Ngược lại, Node.Js đáp ứng hiệu quả xử lý nhiều hoạt động cùng lúc (I/O operations).
### Web server 
PHP được chạy trên máy chủ Apache. PHP cũng được chạy trên IIS server trên hệ điều hành windows.
<br><br>
Node.js không cần web server, Node chạy trên chính môi trường NPM runtime.
### Hiệu suất
Mặc dù Node.Js luôn được đánh giá có hiệu suất cao vì sử dụng mô hình bất đồng bộ, PHP cũng dần phát triển theo hướng này. Với các thư viện như ReactPHP, PHP cũng có thể sử dụng trong lập trình hướng sự kiện
![](https://images.viblo.asia/0e200b71-d36d-4d3c-9eec-0e1044504952.png)
Tuy nhiên khi so sánh hai môi trường Node.Js và PHP, bạn sẽ thấy Node.js có tốc độ nhanh hơn nhiều so với PHP do một vài lý do sau:
* >  Thân thiện với V8 engine trên trình duyệt
* Xử lý bất đồng bộ
* Sử dụng callback function

## 3. Kết luận
Như vậy, qua bài viết này chúng ta nhận thấy sự khác nhau giữa hai công nghệ web nổi tiếng nhất hiện nay là Nodejs và PHP. Cả hai đều có ưu nhược điểm riêng, việc lựa chọn giữa hai công nghệ này sẽ phụ thuộc vào các dự án bạn làm.

> **No programming language is the best, you are the best**