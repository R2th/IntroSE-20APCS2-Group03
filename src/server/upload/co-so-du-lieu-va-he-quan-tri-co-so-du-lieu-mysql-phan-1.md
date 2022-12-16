Hôm này mình xin giới thiệu với các bạn mới học lập trình những kiến thức về cơ sở dữ liệu và hệ quản trị cơ sở dữ liệu MySQL mà chúng ta phải nắm chắc để áp dụng khi thực hiện xây dựng website
## Cơ sở dữ liệu
Cơ sở dữ liệu (Database): Một tập hợp những dữ liệu có liên quan với nhau được lưu trữ trong máy tính đáp ứng nhu cầu khai thác của nhóm người sử dụng với các mục đích xác định nào đó.

### Mô hình E-R

#### 1. Thực thể
* Là một đối tượng của thế giới thực; 
* Thực thể được mô tả bởi một tập các thuộc tính; 
* Là 1 đối tượng vật lý cụ thể hoặc trừu tượng
Ví dụ như hệ thống E-learning có thực thể Người dùng, Môn học, Đăng ký môn học,...
#### 2. Thuộc tính
* Là các đặc trưng để mô tả thực thể, thực thể có thể có nhiều thuộc tính.<br>
* Mỗi thực thể cụ thể sẽ có các giá trị cho mỗi thuộc tính của nó.<br>
* Miền giá trị của thuộc tính (domain): tập tất cả các giá trị hợp lệ có thể gán cho thuộc tính
#### 3. Thuộc tính khóa
* Khóa của kiểu thực thể: là thuộc tính mà giá trị của nó khác nhau trên 2 thực thể bất kỳ thuộc kiểu thực thể đó. 
* Khóa để phân biệt các thực thể trong kiểu thực thể.
#### 4. Quan hệ: Là sự liên kết giữa 2 hay nhiều thực thể 
* **Kiểu quan hệ giữa các kiểu thực thể:** tập tất cả các quan hệ giống nhau trên các thực thể  của kiểu thực thể.<br>
* **Cấp liên kết**: Là số kiểu thực thể tham gia vào liên kết đó
* **Ràng buộc trên kiểu liên kết**<br>
**Ràng  buộc tỉ số:** Xét mối quan hệ nhị phân R (cấp 2) giữa 2 tập thực thể A và B<br>
<br>
![](https://images.viblo.asia/da7bfc3e-4f9e-4fa7-bdb7-189f5640686a.png)
<br>**Ràng buộc (min, max)**: chỉ định mỗi thực thể  tham gia ít nhất và nhiều nhất vào thể hiện của R

### Mô hình quan hệ
#### Quan hệ
Các thông tin lưu trữ trong CSDL được tổ chức thành bảng (table) 2 chiều gọi là quan hệ <br>
Quan hệ gồm
1. Tên
1. Tập hợp các cột: Cố định, Được đặt tên, Có kiểu dữ liệu (Thuộc tính)
1. Tập hợp các dòng: Thay đổi theo thời gian (Bộ)

* Một dòng ~ Một thực thể, hay một sự kiện liên quan 
* Một cột (trường) ~ Một thuộc tính
* Quan hệ ~ Tập thực thể, tập sự kiện
<br>
![](https://images.viblo.asia/f6358928-364a-480e-95b2-1f37371a5dde.png)
#### Thuộc tính
* Tên các cột của quan hệ
* Mô tả ý nghĩa cho các giá trị tại cột đó
* Tất cả các dữ liệu trong cùng 1 một cột đều có cùng kiểu dữ liệu, các giá trị là nguyên tố
#### Miền giá trị (domain)
Kí hiệu Dom(A) là miền giá trị của A; tức là các giá trị A có thể nhận
#### Bộ (tuple)
Là các dòng của quan hệ (trừ dòng tiêu đề - tên của các thuộc tính) thể hiện dữ liệu cụ thể các thuộc tính của 1 một thực thể hay sự kiện liên quan trong quan hệ

#### Ràng buộc
Ràng buộc (Constraint):  Là những qui tắc, điều kiện cần được thỏa mãn trong một thể hiện của CSDL quan hệ<br>
**1. Ràng buộc miền**<br>
Giá trị của bộ t tại thuộc tính A (t[A]) phải thuộc Miền giá trị A.<br>
**2. Ràng buộc khóa**<br>
Giả sử cho R(A1,..An). t1, t2 < R, tồn tại tập thuộc tính SK sao cho t1[SK] # t2[SK] => SK gọi là siêu khóa. Khóa là siêu khóa tối thiểu <br>
* **2.1. Ràng buộc toàn vẹn thực thể (Khóa chính)**<br>
Chọn một trong các khóa dự tuyển làm cơ sở để nhận biết các bộ (khóa được chọn có ít thuộc tính nhất)<br>
Khóa được chọn gọi là khóa chính <br>
![](https://images.viblo.asia/3d141861-1717-45ef-a9ee-b3548789e3df.png)
* **2.2. Ràng buộc toàn vẹn tham chiếu (Khóa ngoài)**<br>
Một bộ trong quan hệ R, tại thuộc tính A nếu nhận một giá trị từ một thuộc tính B của quan hệ S, ta gọi R tham chiếu S. Bộ được tham chiếu phải tồn tại trước<br>
Xét 2 lược đồ R1 và R2 . Gọi FK là tập thuộc tính (khác rỗng) của R1 ; PK là khóa chính của R2. FK là khóa ngoài (Foreign Key) của R1 khi:<br>
Các thuộc tính trong FK phải có cùng miền giá trị với PK (R2)<br>
Giá trị tại FK của một bộ t1<R1 (t1[FK]) hoặc bằng giá trị tại khóa chính của một bộ t2<R2 (t2[PK]) hoặc  t1[FK] = Null<br>

* Một thuộc tính vừa có thể tham gia vào khóa chính, vừa tham gia vào khóa ngoài
* Khóa ngoài có thể tham chiếu đến khóa chính trên cùng 1 lược đồ quan hệ 
* Có thể có nhiều khóa ngoài tham chiếu đến cùng một khóa chính.

## Cách xây dựng cơ sở dữ liệu cho dự án web
#### * B1: Xác định tập thực thể (quan hệ)
#### * B2: Xác định mối quan hệ (liên kết)
#### * B3: Xác định thuộc tính và gắn thuộc tính cho thực thể và mối quan hệ
#### * B4: Quyết định miền giá trị cho thuộc tính
#### * B5: Quyết định thuộc tính khóa
#### * B6:  Xác định ràng buộc (tỉ số; min-max; ràng buộc tham gia) cho mối quan hệ<br>
* Mỗi mối quan hệ n-n xác định 1 bảng trong mô hình quan hệ<br>
* Mỗi mối quan hệ 1-n xác định 1 khóa ngoài
#### Thực hiện trên công cụ Cacoo https://cacoo.com/
## Hệ quản trị cơ sở dữ liệu MySQL
MySQL là một hệ Quản trị Cơ sở dữ liệu quan hệ sử dụng Ngôn ngữ truy vấn có cấu trúc (SQL).
<br>Sau khi thực hiện xây dựng CSDL qua mô hình E-R ta chuyển sang lược đồ quan hệ rồi từ đó xây dựng các bảng, ràng buộc trên các hệ QT CSDL để hiện thực hóa.
### Cài đặt và cấu hình MySQL
Các bạn có thể tham khảo hai bài viết sau để biết cách cài nha<br>
https://openplanning.net/10221/cai-dat-co-so-du-lieu-mysql-tren-windows<br>
https://blog.hostvn.net/chia-se/huong-dan-cai-dat-mysql-tren-ubuntu-18-04.html
### Tạo và sửa đổi cấu trúc bảng
Để tạo bảng, MySQL sử dụng câu lệnh CREATE TABLE. Câu lệnh có cấu trúc như sau:
```sql
CREATE TABLE [IF NOT EXISTS] table_name(
    <column name><type> [<default value>] [column constraints],
    ...
    <column name><type> [<default value>] [column constraints],
    <table constraint>,
    ...
    <table constraint>
) type=table_type
```
**IF NOT EXISTS** để tránh lỗi tạo bảng đã tồn tại trong CSDL, table_name là tên bảng muốn tạo<br>
**Table_type**: xác định kiểu của bảng dữ liệu khi lưu trữ (chú ý thuộc tính này là đặc điểm riêng của MySQL). Nếu không xác định thì MySQL sẽ sử dụng kiểu bảng ngầm định.<br>
*MyISAM*: Các bảng MyISAM làm việc rất nhanh, nhưng không hỗ trợ giao dịch. Thường được sử dụng trong các ứng dụng Web, là kiểu bảng ngầm định trong các phiên bản MySQL trước 5.5<br>
*InnoDB*: Các bảng InnoDB hỗ trợ giao dịch an toàn, hỗ trợ khóa ngoài. InnoDB là kiểu lưu trữ ngầm định từ phiên bản MySQL 5.5.<br>
**Định nghĩa tập các cột**: Các cột được liệt kê với các thuộc tính như kiểu dữ liệu, giá trị ngầm định nếu có, các ràng buộc trên cột.<br>
**Constraint (Ràng buộc)**<br>
**PRIMARY KEY (ràng buộc khóa chính)**: Ràng buộc này định nghĩa một cột hoặc một tổ hợp các cột xác định duy nhất mỗi dòng trong bảng<br>
**NOT NULL**: Ràng buộc này yêu cầu giá trị của cột không được phép là NULL<br>
**UNIQUE:** ràng buộc yêu cầu các giá trị của cột là phân biệt. Chú ý với ràng buộc này giá trị của cột có thể là NULL nếu ràng buộc NOT NULL không được áp dụng trên cột.<br>
**FOREIGN KEY (Ràng buộc khóa ngoài)**<br>
Từ khóa FOREIGN KEY được dùng để xác định khóa ngoài<br>
```sql
CREATE TABLE city (
        city_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
        city VARCHAR(50) NOT NULL,
        country_id SMALLINT UNSIGNED NOT NULL,
        last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(city_id),
        CONSTRAINT fk_city_country FOREIGN KEY (country_id)
        REFERENCES country (country_id) ON DELETE RESTRICT ON
        UPDATE CASCADE
)
```
*ON DELETE RESTRICT*: có nghĩa không cho phép xóa dòng dữ liệu ở bảng được tham chiếu khi còn dữ liệu tham chiếu tới<br>
*ON UPDATE CASCADE:* có nghĩa khi cập nhật dữ liệu ở bảng được tham chiếu, dữ liệu bên bảng tham chiếu sẽ được tự động cập nhật<br>
Khi không sử dụng các tùy chọn này, ngầm định RESTRICT sẽ được sử dụng cho các sự kiện DELETE và UPDATE<br>
Cú pháp của lệnh ALTER TABLE như sau:
```sql
ALTER TABLE table_name tùy chọn[, tùy chọn...]
    Các tùy chọn:
    ADD [COLUMN] <column_definition>
    MODIFY [COLUMN] <create_definition>
    DROP [COLUMN] <column_name>
    ADD <table_constraint>
    DROP <constraint_name>
```
Trên đây mình đã trình bày những kiến thức căn bản về cơ sở dữ liệu, cách xây dựng cơ sở dữ liệu cho sản phẩm, cách tạo CSDL với hệ quản trị CSDL MySQL. Ở bài viết sau mình sẽ trình bày phần truy vấn trong MySQL, mong các bạn sẽ đón đọc.<br>
Cảm ơn mọi người đã đọc bài. Mong rằng qua bài viết mọi người có thể xây dựng được CSDL một cách hiệu quả.!

## Nguồn tham khảo
* Bài giảng môn cơ sở dữ liệu - Khoa công nghệ thông tin - Đại học Công nghệ - ĐH quốc gia Hà Nội
* https://www.w3schools.com/sql/default.asp