Bài viết này mình sẽ giúp các bạn có cái nhìn tổng quan về MongoDB. Chúng ta không lạ gì với cơ sở dữ liệu quan hệ, còn với cơ sở dữ liệu phi quan hệ thì sao? **MEAN stack** (MongoDB, Express, AngularJS, NodeJS) đang dần thay thế cho **LAMP stack** (Linux, Apache, MySQL, PHP/Python). Để tìm hiểu về MongoDB thì đầu tiên chúng ta sẽ cùng tìm hiểu xem NoSql là gì nhé
## 1. NoSql
Đầu tiên về cơ sở dữ liệu phi quan hệ chúng ta cùng tìm hiểu về NoSql nhé, vậy NoSql là gì?.
- NoSQL là 1 dạng CSDL mã nguồn mở và được viết tắt bởi: None-Relational SQL hay có nơi thường gọi là Not-Only SQL.
- NoSQL được phát triển trên Javascript Framework với kiểu dữ liệu là JSON và dạng dữ liệu theo kiểu key và value.
- NoSQL ra đời như là 1 mảnh vá cho những khuyết điểm và thiếu xót cũng như hạn chế của mô hình dữ liệu quan hệ RDBMS (Relational Database Management System - Hệ quản trị cơ sở dữ liệu quan hệ) về tốc độ, tính năng, khả năng mở rộng,...
- Với NoSQL bạn có thể mở rộng dữ liệu mà không lo tới những việc như tạo khóa ngoại, khóa chính, kiểm tra ràng buộc .v.v ...
- NoSQL bỏ qua tính toàn vẹn của dữ liệu và transaction để đổi lấy hiệu suất nhanh và khả năng mở rộng.
- NoSQL được sử dụng ở rất nhiều công ty, tập đoàn lớn, ví dụ như FaceBook sử dụng Cassandra do FaceBook phát triển, Google phát triển và sử dụng BigTable,... 

Đến đây chắc các bạn cũng phần nào hiểu về NoSql rồi phải không, giờ chúng ta đi đến khái niệm MongoDB nhé.

## 2, MongoDB là gì?

![](https://images.viblo.asia/29322fc4-a1b0-4416-9dce-0d4b34843cf6.png)

- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở, là CSDL thuộc NoSql và được hàng triệu người sử dụng.
- MongoDB là một database hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON thay vì dạng bảng như CSDL quan hệ nên truy vấn sẽ rất nhanh.
- Với CSDL quan hệ chúng ta có khái niệm bảng, các cơ sở dữ liệu quan hệ (như MySQL hay SQL Server...) sử dụng các bảng để lưu dữ liệu thì với MongoDB chúng ta sẽ dùng khái niệm là **collection** thay vì bảng
- So với RDBMS thì trong MongoDB **collection** ứng với **table**, còn **document** sẽ ứng với **row** , MongoDB sẽ dùng các document thay cho row trong RDBMS.
- Các collection trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ không cần tuân theo một cấu trúc nhất định.
- Thông tin liên quan được lưu trữ cùng nhau để truy cập truy vấn nhanh thông qua ngôn ngữ truy vấn MongoDB

Vậy là mình đã giới thiệu xong khái niệm và một số điểm khác cơ bản của MongoDB so với CSDL quan hệ rồi, tiếp theo sẽ là một vài thao tác với MongoDB để các bạn có thể hình dung rõ hơn nhé

## 3. Một số câu lệnh cơ bản trên MongoDB



| CSDL                | MySQL                                                            |            MongoDB                                               |
| --------            | --------                                                         | --------                                                         |
|   Tạo csdl          |      CREATE DATABASE test;                                       | use test;                                                        |
|   Tạo bảng          |    CREATE TABLE students (ten_cot - kieu_du_lieu);               | db.createCollection('students');                                 |
|   Tạo bản ghi       |INSERT INTO studetns ('name', 'gender') VALUES('thanh', 'male');  |db.students.insert({ name:'thanh', gender: 'male'});              |
|   Cập nhật          |UPDATE students SET name = 'thanh update' WHERE id = 1;           |db.students.update({ _id: 1 },{$set:{ name: 'thanh update' }});  |
|   Xóa bản ghi       |   DELETE FROM students Where id = 1;                             | db.students.remove({ _id: 1});                                   |
|   Tìm kiếm all      |  SELECT * FROM students;                                         |db.students.find({});                        |
|   Tìm kiếm          |  SELECT * FROM students WHERE name = 'thanh';                    |db.students.find({ name: 'thanh' });                              |

## 4. Ưu điểm của mongoDB.
- Do MongoDB sử dụng lưu trữ dữ liệu dưới dạng Document JSON nên mỗi một collection sẽ có các kích cỡ và các document khác nhau, linh hoạt trong việc lưu trữ dữ liệu, nên bạn muốn gì thì cứ insert vào thoải mái.
- Dữ liệu trong MongoDB không có sự ràng buộc lẫn nhau, không có join như trong RDBMS nên khi insert, xóa hay update nó không cần phải mất thời gian kiểm tra xem có thỏa mãn các ràng buộc dữ liệu như trong RDBMS.
- MongoDB rất dễ mở rộng (Horizontal Scalability). Trong MongoDB có một khái niệm cluster là cụm các node chứa dữ liệu giao tiếp với nhau, khi muốn mở rộng hệ thống ta chỉ cần thêm một node với vào cluster:
- Trường dữ liệu “_id” luôn được tự động đánh index (chỉ mục) để tốc độ truy vấn thông tin đạt hiệu suất cao nhất.
- Khi có một truy vấn dữ liệu, bản ghi được cached lên bộ nhớ Ram, để phục vụ lượt truy vấn sau diễn ra nhanh hơn mà không cần phải đọc từ ổ cứng.
- Hiệu năng cao: Tốc độ truy vấn (find, update, insert, delete) của MongoDB nhanh hơn hẳn so với các hệ quản trị cơ sở dữ liệu quan hệ (RDBMS). Với một lượng dữ liệu đủ lớn thì thử nghiệm cho thấy tốc độ insert của MongoDB có thể nhanh tới gấp 100 lần so với MySQL.
![](https://images.viblo.asia/12f487ee-855b-48b3-9d28-930d1718d22e.jpg)

## 5. Nhược điểm của mongoDB.
- Một ưu điểm của MongoDB cũng chính là nhược điểm của nó. MongoDB không có các tính chất ràng buộc như trong RDBMS nên khi thao tác với mongoDB thì phải hết sức cẩn thận.
- Tốn bộ nhớ do dữ liệu lưu dưới dạng key-value, các collection chỉ khác về value do đó key sẽ bị lặp lại. Không hỗ trợ join nên dễ bị dữ thừa dữ liệu.
- Khi insert/update/remove bản ghi, MongoDB sẽ chưa cập nhật ngay xuống ổ cứng, mà sau 60 giây MongoDB mới thực hiện ghi toàn bộ dữ liệu thay đổi từ RAM xuống ổ cứng điêù này sẽ là nhược điểm vì sẽ có nguy cơ bị mất dữ liệu khi xảy ra các tình huống như mất điện...


## 6. khi nào nên dùng MongoDB
Ví dụ như các hệ thống realtime (thời gian thực) yêu cầu phản hồi nhanh, Các hệ thống bigdata với yêu cầu truy vấn nhanh hay các hệ thống có lượng request lớn thì MongoDB sẽ là sự lựa chọn ưu tiên hơn CSDL quan hệ. Tùy theo dự án và trường hợp cụ thể để sử dụng CSDL quan hệ hay sử dụng MongoDB đem lại hiệu quả cao. 


**Link tham khảo:**

http://expressmagazine.net/development/2330/dinh-nghia-mongodb-nosql-la-gi
https://viblo.asia/p/tim-hieu-ve-mongodb-4P856ajGlY3#_8-khi-nao-nen-su-dung-mongodb--7
https://stackjava.com/mongodb/uu-nhuoc-diem-cua-mongodb-khi-nao-nen-dung-mongodb.html