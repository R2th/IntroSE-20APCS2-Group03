# Giới thiệu về mongodb
MongoDB là 1 hệ thống CSDL mã nguồn mở được phát triển và hỗ trợ bởi 10gen, là CSDL NoSQL hàng đầu được hàng triệu người sử dụng.
Thay vì lưu trữ dữ liệu dưới dạng bảng và các tuple như trong các CSDL quan hệ thì nó lưu  trữ dữ liệu dưới dạng JSON (trong MongoDB được gọi là dạng BSON vì nó lưu trữ dưới dạng binary từ 1 JSON document).
# Sự tương quan giữa các thuật ngữ được sử dụng trong RDBMS và MongoDB


| RDBMS | MongoDB | 
| -------- | -------- |
| Database    | Database     |
| Table    | Collection     |
| Tuple/Row    | Document     |
| column    | Field     |
| Table Join    | Embedded Douments    |
| Primary Key    | Primary Key(mặc định là_id)     |

# Một số câu lệnh được sử dụng trong MongoDB
## 1.Tạo database trong MongoDB
```
use DatabaseName
```
Trong đó DatabaseName là tên của database các bạn muốn tạo.
vd: Tạo database có tên là projectdemo.
```
use projectdemo
```
## 2.Xem database đang sử dụng
Để xem database đang sử dụng(current database) thì chúng ta sử dụng lệnh:
```
db
```
## 3.Xem tất cả các database trong hệ thống
Để xe tất cả các database đã được tạo trên MongoDB thì mọi người sử dụng lệnh sau:
```
show dbs
```
Chú ý: Lệnh này sẽ chỉ hiện ra các database đã có ít nhất một collection(hiểu như table trong MySql), còn nếu chưa có thì nó sẽ không hiện ra.
## 4.Lấy tất cả dữ liệu trong collection
Để lấy tất cả dữ liệu trong collection chúng ta sử dụng phương thức find() với cú pháp sau:
```
db.collectionName.find()
```
Trong đó collectionName là tên của collection mà các bạn muốn truy vấn.
Nếu như bạn muốn dữ liệu trả về được hiển thị theo cấu trúc đã được định sẵn thì chỉ cần thêm hàm pretty() vào phía sau hàm find().
```
db.collectionName.find().prettey()
```
## 5.Truy vấn có điều kiện trong MongoDB
Để truy vấn có điều kiện trong MongoDB thì bạn cũng sử dụng cú pháp tương tự như phần 1, nhưng lúc này chúng ta sẽ thêm điều kiện vào trong hàm find() với cú pháp sau:
```
db.collectionName.find(condition)
```
Cú pháp của các mệnh đề điều kiện:


| Phép toán | Cú pháp |
| -------- | -------- | -------- |
| Bằng(Equality)     | {key: value}     |
| Nhỏ hơn (Less Than)     |{key: {$lt: value}}     |
| Nhỏ hơn bằng (Less Than Equals)     | {key: {$lte: value}}     |
| Lơn hơn (Greater Than)     | {key: {$gt: value}}     |
| Lớn hơn bằng (Greater Than Equals)     | {key: {$gte: value}}     |
| Khác (Not Equals)     | {key: {$ne: value}}     |
| Trong ( In)	     | {key: {$in: [value1, value2,..]}}     |
| Không Thuộc (Not In)     | {key: {$nin: [value1, value2,..]}}     |
# Tổng kết
Bài viết còn nhiều thiếu sót, mong các bạn góp ý để mình có thể hoàn thiện tốt hơn.