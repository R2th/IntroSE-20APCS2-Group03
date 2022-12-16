**Ở phần trước mình cũng đã giới thiệu vài cách tối ưu truy vấn trong SQL. Hôm nay, mình xin giới thiệu phần 2 về chủ đề này**
# 1. Nhận trợ giúp từ PROCEDURE ANALYSE()
`PROCEDURE ANALYSE()` sẽ để MySQL giúp bạn phân tích các lĩnh vực của bạn và dữ liệu thực tế của họ và sẽ cung cấp cho bạn một số gợi ý hữu ích 
* Ví dụ: nếu bạn tạo trường `INT` làm khóa chính, nhưng không có nhiều dữ liệu, sau đó `PROCEDURE ANALYZE ()` sẽ đề nghị bạn thay đổi loại trường này thành `MEDIUMINT`
```sql
SELECT … FROM … WHERE … PROCEDURE ANALYSE([max_elements,[max_memory]])
```
// Example
```sql
 SELECT col1, col2 FROM table1 PROCEDURE ANALYSE(10, 2000);
```
* `max_elements` (mặc định 256) là số lượng giá trị riêng biệt tối đa mà `ANALYZE ()` nhận thấy trên mỗi cột.
* `max_memory` (mặc định 8192) là dung lượng bộ nhớ tối đa mà `ANALYZE ()` phân bổ cho mỗi cột.
# 2. Luôn đặt ID cho mỗi bảng
Chúng ta nên đặt` ID` làm khóa chính cho mỗi bảng trong cơ sở dữ liệu và tốt nhất là kiểu `INT`  `AUTO_INCREMENT`
```sql
CREATE TABLE users (
  id int(5) NOT NULL AUTO_INCREMENT,
  email varchar(20) NOT NULL,
  name varchar(20)
);
```
* Việc sử dụng kiểu `VARCHAR` làm khóa chính sẽ làm giảm hiệu suất
* Hơn nữa, trong cơ sở dữ liệu MySQL, vẫn còn một số thao tác cần sử dụng khóa chính.
# 3. Sử dụng ENUM thay cho VARCHAR
Nếu bạn có một vài trường dữ liệu như `“gender”`, ` “status”`, `“department”`... và bạn biết giá trị của các trường này bị giới hạn và cố định, thì bạn nên sử dụng `ENUM` thay vì `VARCHAR`
Thông thường
```sql
CREATE TABLE Persons (
 PersonID int,
 Status varchar(25)
);
```
Cách tốt hơn 
```sql
CREATE TABLE Persons (
 PersonID int,
 Status enum('Married', 'Single') NOT NULL
);
```
* Loại `ENUM` rất nhanh và nhỏ gọn. Nó lưu dưới dạng `TINYINT`, nhưng hình thức của nó được hiển thị dưới dạng chuỗi
* Bằng cách này, sử dụng trường này để thực hiện danh sách tùy chọn trở nên tốt hơn.
# 4. Tối ưu hóa bằng cache
Hầu hết các máy chủ MySQL có kích hoạt bộ nhớ đệm truy vấn. Đây là một trong những cách hiệu quả nhất để cải thiện hiệu suất và được xử lý bởi công cụ cơ sở dữ liệu MySQL.

Khi nhiều truy vấn giống hệt nhau được thực thi nhiều lần, kết quả của các truy vấn này sẽ được đặt trong bộ đệm, để các truy vấn giống hệt tiếp theo sẽ truy cập trực tiếp vào kết quả được lưu trong bộ nhớ cache mà không cần vào trực tiếp database để truy vấn vào các bảng.

Bạn có thể kích hoạt truy vấn đệm bằng cách chỉnh sửa tệp cấu hình MySQL
`sudo nano /etc/mysql/my.cnf`

Thêm các tùy chọn sau vào cuối tập tin của bạn:
```
/etc/mysql/my.cnf
...
[mysqld]
query_cache_type=1
query_cache_size = 10M
query_cache_limit=256K
```
# 5. Thông thường, số lượng index nên ít hơn 5
* Bạn càng có ít chỉ mục thì càng tốt, trong khi chỉ mục cải thiện hiệu quả của các truy vấn, chúng cũng làm giảm hiệu quả của việc thêm mới và cập nhật.
* Tốt nhất, một bảng nên có không quá 5 chỉ mục, nhưng nếu có quá nhiều, hãy xem xét loại bỏ một số chỉ mục không cần thiết.
* Chỉ nên đặt chỉ mục cho các trường cố định và ít có sự thay đổi.
# 6. Nếu kiểu trường là một chuỗi, nó phải được đặt trong dấu ngoặc kép
Thông thường:
```sql
select * from user where userid =123;
```
Cách tốt hơn:
```sql
select * from user where userid = ‘123’ ;
```
* Khi dấu ngoặc đơn không được thêm vào, đó là so sánh giữa một chuỗi và một số và các kiểu của chúng không khớp.
* MySQL lúc này sẽ chuyển đổi kiểu ngầm định, rồi mới so sánh. Nó sẽ làm tăng thêm việc tính toán.
# 7. Tối ưu hóa bảng tạm thời
Khi tạo bảng tạm thời, nếu bạn chèn một lượng lớn dữ liệu cùng một lúc, bạn có thể sử dụng `select into` thay vì `create table` để tránh một số lượng lớn nhật ký để cải thiện tốc độ.

Nếu lượng dữ liệu không lớn, để giảm bớt tài nguyên của bảng hệ thống, trước tiên bạn nên `create table`, sau đó `insert`.
# 8. Khi sử dụng left join làm sao để kết quả của bảng bên trái càng nhỏ càng tốt
Nếu bạn muốn sử dụng `left join`, kết quả dữ liệu của bảng bên trái càng nhỏ càng tốt.
Thông thường
```sql
select * from 
  table1 t1 left join table2 t2 
  on t1.size = t2.size 
  where t1.id>2;
```
Cách tốt hơn:
```sql
select * from 
  (select * from table1 where id >2) 
  t1 left join table2 t2 
  on t1.size = t2.size;
```
* Trong `inner join`, số lượng hàng được trả về là tương đối nhỏ, do đó hiệu suất sẽ tương đối tốt hơn.
* Tương tự, nếu sử dụng `left join`, kết quả dữ liệu của bảng bên trái càng nhỏ càng tốt và các điều kiện được đặt trên bảng bên trái càng nhiều càng tốt, điều đó có nghĩa là số lượng hàng được trả về có thể tương đối nhỏ.
# Tổng kết
* Ưu tiên của bạn nên theo thứ tự: inner join, left join.
* Luôn đặt ID trong bảng.
* Sử dụng `ENUM` thay cho `VARCHAR` nếu cột của bạn bao gồm danh sách tùy chọn vì `ENUM` sử dụng `TINYINT` giúp cải thiện hiệu quả.
* Nhận lời khuyên từ `PROCEDURE ANALYSE()` về việc sử dụng kiểu dữ liệu chính xác.
* Chuỗi của bạn phải được đặt trong dấu ngoặc kép

Trên đây là vài cách để bạn có thể tối ưu hơn câu truy vấn của mình, mong sẽ giúp ích được cho mọi người.

# Nguồn tham khảo: 

https://towardsdatascience.com/how-to-optimize-sql-queries-part-ii-407311784112