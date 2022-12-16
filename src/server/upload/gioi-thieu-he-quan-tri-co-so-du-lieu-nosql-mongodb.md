## Sơ lược

Thế giới này có âm thì phải có dương, có nam thì phải có nữ và có SQL thì phải có NoSQL :D :D

**SQL**: Structured Query Language: Ngôn ngữ truy vấn có cấu trúc. (SQL thì m.n gặp cũng khá nhiều rồi từ những năm học ĐH cho tới khi đi làm nên e sẽ không bàn nhiều về nó :D)

**NoSQL**: Non-Relational SQL Là loại Cơ sở dữ liệu mà không truy vấn bằng ngôn ngữ SQL. Các Hệ quản trị cơ sở dữ liệu NoSQL sử dụng các kỹ thuật lưu trữ khác nhau: cặp khóa – giá trị (key-value pair) trên RAM, cặp khóa – giá trị (key-value pair) trên ổ cứng, tài liệu/tập tin (document). NoSQL không có các chuẩn chung thống nhất như SQL. Các cơ sở dữ liệu NoSQL đang được sử dụng ngày càng nhiều trong các ứng dụng dữ liệu lớn và ứng dụng nền web thời gian thực.

## Tổng quan
* MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở, là CSDL thuộc NoSql và được hàng triệu người sử dụng, MongoDB là một database hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON.
MongoDB được phát triển bởi MongoDB Inc. và được cấp phép theo Giấy phép Công cộng phía Máy chủ (SSPL).
* Với CSDL quan hệ chúng ta có khái niệm bảng, các cơ sở dữ liệu quan hệ (như MySQL hay SQL Server…) sử dụng các bảng để lưu dữ liệu thì với MongoDB chúng ta sẽ dùng khái niệm là collection thay vì bảng.
* So với RDBMS thì trong MongoDB collection ứng với table, còn document sẽ ứng với row , MongoDB sẽ dùng các document thay cho row trong RDBMS.
* Các collection trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ không cần tuân theo một cấu trúc nhất định.

## Một số câu lệnh cơ bản
```
//Tạo CSDL
use ten_CSDL;
//Tạo bảng
db.createCollection('ten_bang');
//Thêm record
db.ten_bang.insert({ name:'duong', age: 23});
// Cập nhật
db.ten_bang.update({ _id: 1 },{$set:{ name: 'duong updated' }});
// Xóa
db.ten_bang.remove({ _id: 1});
//Lấy tất cả record
db.ten_bang.find({});
//Lấy tất cả record theo điều kiện
db.ten_bang.find({ name: 'duong'});
```
## Ưu điểm khi sử dụng MongoDB
1. Lưu trữ dữ liệu dưới dạng JSON, mỗi một collection sẽ có các kích cỡ và các document khác nhau nên sẽ rất linh hoạt cho việc lưu trữ dữ liệu.
2. Khác với RDBMS dữ liệu trong đây không có sự ràng buộc và không có yêu cầu tuân theo khuôn khổ nhất định nên các thao tác được thực hiện rất nhanh => tối ưu performance.
3. Tiếp đến cũng là về hiệu suất, khi có trư vấn dữ liệu thì các record được cached lên bộ nhớ Ram, để lượt truy vấn sau diễn ra nhanh hơn mà không cần đọc từ ổ cứng.
4. Rất dễ mở rộng, MongoDB dễ dàng mở rộng hệ thống bằng cách thêm node vào cluster – cụm các node chứa dữ liệu giao tiếp với nhau.

## Khi nào nên dùng MongoDB

* Với những ưu điểm trên thì khi lựa chọn MongoDB thì các ứng dụng yêu cầu realtime (thời gian thực), phản hồi nhanh, tương tác thường xuyên thì MongoDB là lựa chọn rất phù hợp.
* Khi một số hệ thống yêu cầu việc lưu trữ dữ liệu lớn, yêu cầu truy vấn nhanh như các hệ thống BigData.

## Kết luận

Trên đây là bài giới thiệu sơ lược của mình về MongoDB và ngoài MongoDB ra thì còn có các NoSQL Database khác như Cassandra, Redis, HBase, ... Hy vọng sẽ hữu ích đối vs mn.
### Link tham khảo
* https://sites.google.com/site/smartjobvncongnghethongtin/gioi-thieu-he-quan-tri-co-so-du-lieu-nosql-mongodb
* https://wiki.matbao.net/mongodb-la-gi-tinh-nang-noi-bat-tu-mongodb-ban-can-biet/#mongodb-la-gi
* https://topdev.vn/blog/mongodb-la-gi-co-so-du-lieu-phi-quan-he/