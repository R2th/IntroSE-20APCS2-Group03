# 1. Node.js là gì ?

1. Node.js là một nền tảng (Platform) phát triển độc lập được xây dựng ở trên Javascript Runtime của Chrome mà chúng ta có thể xây dựng được các ứng dụng mạng một cách nhanh chóng và dễ dàng mở rộng.
2.  Node.Js là môi trường máy chủ mã nguồn mở. (open source server enviroment)
3. Node.js hoàn toàn free.
4. Node.js chạy được trên nhiều nền tảng (Windows, Linux, Unix. Mac OS X, etc.)
5. Node.js sử dụng javascript để chạy trên môi trường server.


# 2. Tại sao lại sử dụng Node.js
**Node.js sử dụng ngôn ngữ lập trình bất đồng bộ  (uses asynchronous programming) !**


### 2.1  Dưới đây là cách mà PHP hoặc ASP xử lý file request

1.  Gửi tác vụ đến hệ thống tệp tin của máy tính (computer's file system).
2.  Đợi cho đến khi hệ thống mở và đọc file thành công.
3.  Trả lại thông tin cho bên client.
4.  Chuẩn bị để có thể đón request tiếp theo.

### 2.2 Đây là cách mà Node.js xử lý file request

1. Gửi tác vụ đến hệ thống file của máy tính (computer's file system).
2. Chuẩn bị để tiếp nhận yêu cầu tiếp theo.
3. Khi hệ thống đã mở và đọc tệp tin, máy chủ sẽ trả nội dung cho client.

Node.js loại bỏ sự chờ đợi và sẵn sàng cho yêu cầu tiếp theo.
Node.js chạy lập trình đơn luồng, non-blocking, bất đồng bộ khiến **(single-threaded, non-blocking, asynchronously programming)** cho hiệu sử dụng hiệu quả bộ nhớ. 

# 3. Javascript

JavaScript chỉ là một ngôn ngữ lập trình phía client chạy trên trình duyệt, phải không? Nhưng điều này không còn đúng chút nào nữa. Node.js là một cách để chạy JavaScript trên server; nhưng nó còn hơn thế nữa. 

Trong một môi trường server điển hình LAMP (Linux-Apache-MySQL-PHP), bạn có một web server là Apache hoặc NGINX nằm dưới, cùng với PHP chạy trên nó. Mỗi một kết nối tới server sẽ sinh ra một thread mới, và điều này khiến ứng dụng nhanh chóng trở nên chậm chạp hoặc quá tải - cách duy nhất để hỗ trợ nhiều người dùng hơn là bằng cách bổ sung thêm nhiều máy chủ. Đơn giản là nó không có khả năng mở rộng tốt. Nhưng với Node.js thì điều này không phải là vấn đề. 

JavaScript là một ngôn ngữ dựa trên sự kiện, vì vậy bất cứ thứ gì xảy ra trên server đều tạo ra một sự kiện non-blocking. Mỗi kết nối mới sinh ra một sự kiện; dữ liệu nhận được từ một upload form sinh ra một sự kiện data-received; việc truy vấn dữ liệu từ database cũng sinh ra một sự kiện. Trong thực tế, điều này có nghĩa là một trang web Node.js sẽ chẳng bao giờ bị khóa (lock up) và có thể hỗ trợ cho hàng chục nghìn user truy cập cùng lúc. Node.js đóng vai trò của server - Apache - và thông dịch mã ứng dụng chạy trên nó. 


# Tài liệu tham khảo.
1. https://www.w3schools.com/nodejs/nodejs_intro.asp
2. https://techmaster.vn/posts/33428/nodejs-la-gi-va-tai-sao-toi-nen-hoc-lap-trinh-nodejs