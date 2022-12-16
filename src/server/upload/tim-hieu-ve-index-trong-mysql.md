Trong bài viết này chúng ta sẽ cùng tìm hiểu về cách sử dụng index trong mysql thêm, sửa, xóa và đổi tên của index trong mysql.
### What is an Index in MySQL?
Index là bảng tra cứu đặc biệt mà Database Search Engine có thể sử dụng để tăng nhanh thời gian và hiệu suất để xử lý dữ liệu. một chỉ mục là một con trỏ tới dữ liệu trong một bảng. Một chỉ mục trong một Database tương tự như một chỉ mục trong Mục lục của cuốn sách.
### When create  index?
Bất cứ khi nào bạn thay đổi cấu trúc bảng bàn cần phải đánh lại index => Bạn cần cân nhắc nếu database mà sử dụng INSERT hay UPDATE nhiều hơn select thì index sẽ làm việc thao tác với  database chậm hơn

Khi bạn muốn tối ưu câu truy vấn . Để tạo index tốt bạn cần phải  xem xét về cách bạn sẽ truy vẫn dữ liệu như thế nào để lấy ra thông tin và bạn sẽ tạo index để nó tăng tốc câu truy vẫn của bạn.
### The Types of Index
Mysql  cung cấp 3 kiểu index là B-Tree, Hash và R-Tree.
#### B-Tree Index
index trong B-Tree được tổ chức và lưu trữ theo tree. Giá trị các note tăng dần từ trái qua phải.
Khi truy vấn dữ liệu thì việc tìm kiếm trong B-Tree là 1 quá trình đệ quy.
B-Tree được sử dụng đánh cho các column trong bảng khi muốn tìm giá trị trong khoảng nào đó.
#### Hash Index
Index được tổ chức theo dạng key-value
Nên được sử dụng trong các biểu thức toán tử  (=,<>)
Hash index có tốc độ nhanh hơn kiểu Btree.
### R-Tree Index
Mysql chỉ hỗ trợ R-tree index cho SPATIAL cho dữ liệu kiểu geometric. Và chỉ hỗ trợ trong MyISAM engine
### Create an Index
Chúng ta có 2 cách để tạo chỉ mục. Bạn có thể tạo một chỉ mục khi lần đầu tiên table bằng câu lệnh CREATE TABLE hoặc bạn có thể sử dụng câu lệnh CREATE INDEX sau khi table đã được tạo.
Cách tạo chỉ mục khi bạn tạo table:
```
CREATE TABLE table_name
( 
  column1 datatype [ NULL | NOT NULL ],
  column2 datatype [ NULL | NOT NULL ],
  ...
  column_n datatype [ NULL | NOT NULL ],

  INDEX index_name [ USING BTREE | HASH ]
    (index_col1 [(length)] [ASC | DESC], 
     index_col2 [(length)] [ASC | DESC],
     ...
     index_col_n [(length)] [ASC | DESC])
);
```
Cách tạo chỉ mục khi table đã được ra:
```
CREATE [UNIQUE | FULLTEXT | SPATIAL] INDEX index_name
  [ USING BTREE | HASH ]
  ON table_name
    (index_col1 [(length)] [ASC | DESC], 
     index_col2 [(length)] [ASC | DESC],
     ...
     index_col_n [(length)] [ASC | DESC]);
```
##### UNIQUE
Không bắt buộc. Công cụ sửa đổi UNIQUE chỉ ra rằng sự kết hợp của các giá trị trong các cột được lập chỉ mục phải là duy nhất.
#### FULLTEXT
Không bắt buộc. Công cụ sửa đổi FULLTEXT lập chỉ mục cho toàn bộ column và không cho phép tiền tố. Các table InnoDB và MyISAM hỗ trợ tùy chọn này.
#### SPATIAL
Không bắt buộc. Công cụ sửa đổi SPATIAL lập chỉ mục cho toàn bộ column và không cho phép các column được lập chỉ mục chứa các giá trị NULL. Các table InnoDB (bắt đầu trong MySQL 5.7) và bảng MyISAM hỗ trợ tùy chọn này.
#### index_name
Tên để gán cho index.
#### table_name
Tên của table để tạo index
#### index_col1, index_col2, ... index_col_n
Những column sử dụng để đánh index
#### length 
Không bắt buộc. Nếu được chỉ định, chỉ một tiền tố của column được đánh index chứ không phải toàn bộ column.
Đối với các columns chuỗi non-binary, giá trị này là số ký tự của column cần lập chỉ mục. Đối với các column chuỗi nhị phân, giá trị này là số byte đã cho của column  cần lập index.
#### ASC
Không bắt buộc. Index được sắp xếp theo thứ tự tăng dần cho cột đó.
#### DESC
Không bắt buộc. Index được sắp xếp theo thứ tự giảm dần cho cột đó.

### Example
Hãy xem xét một ví dụ về cách tạo một index trong MySQL bằng cách sử dụng câu lệnh CREATE TABLE. Câu lệnh này sẽ tạo cả table cũng như index cùng một lúc.
```
CREATE TABLE contacts
( contact_id INT(11) NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(25),
  birthday DATE,
  CONSTRAINT contacts_pk PRIMARY KEY (contact_id),
  INDEX contacts_idx (last_name, first_name)
);
```
Trong ví dụ này chúng ta đã tạo table contracts và index  có tên là contact_idx, bao gồm các columnn last_name và First_name.
Tiếp theo chúng ta sẽ tạo table trước rồi sau đó sẽ tạo Index sau
```
CREATE TABLE contacts
( contact_id INT(11) NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(25),
  birthday DATE,
  CONSTRAINT contacts_pk PRIMARY KEY (contact_id)
);

CREATE INDEX contacts_idx
  ON contacts (last_name, first_name);
```
Trong ví dụ này, câu lệnh CREATE TABLE sẽ tạo table contract. Câu lệnh CREATE INDEX sẽ tạo một index có tên là contact_idx bao gồm các trường last_name và First_name
### Unique Index
Để tạo một index duy nhất trên một bảng, bạn cần chỉ định từ khóa UNIQUE khi tạo index. Điều này có thể được thực hiện bằng câu lệnh CREATE TABLE hoặc câu lệnh CREATE INDEX.
```
CREATE TABLE contacts
( contact_id INT(11) NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(25),
  birthday DATE,
  CONSTRAINT contacts_pk PRIMARY KEY (contact_id),
  UNIQUE INDEX contacts_idx (last_name, first_name)
);
```
OR
```
CREATE TABLE contacts
( contact_id INT(11) NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(25),
  birthday DATE,
  CONSTRAINT contacts_pk PRIMARY KEY (contact_id)
);

CREATE UNIQUE INDEX contacts_idx
  ON contacts (last_name, first_name);
```
Cả 2 câu lệnh trên sẽ tạo một index unique là first_name và last_name sao cho sự kết hợp của các trường này phải luôn luôn là một giá trị duy nhất không được trùng lặp
Đây là một cách để thực thi tính toàn vẹn trong cơ sở dữ liệu của bạn nếu bạn yêu cầu các giá trị duy nhất trong các cột không phải là một phần của khóa chính của bạn.
### Drop an Index
Bạn có thể xóa index trong mysql bằng sử dụng câu lệnh DROP INDEX như sau:
```
DROP INDEX index_name
  ON table_name;
```
index_name
Tên của index sẽ được xóa
table_name
Tên của table mà index muốn xóa đã được tạo.
Example
```
DROP INDEX contacts_idx
  ON contacts;
```
Trong ví dụ trên chúng ta đã xóa index contacts_idx từ table contract
### Rename an Index
Bạn có thể rename index trong mysql bằng câu lệnh ALTER TABLE 
```
ALTER TABLE table_name
  DROP INDEX index_name,
  ADD INDEX new_index_name [ USING BTREE | HASH ]
    (index_col1 [(length)] [ASC | DESC], 
     index_col2 [(length)] [ASC | DESC],
     ...
     index_col_n [(length)] [ASC | DESC]);
```
OR
```
ALTER TABLE table_name
  RENAME INDEX index_name TO new_index_name;
```
Example
```
ALTER TABLE contacts
  DROP INDEX contacts_idx,
  ADD INDEX contacts_new_index (last_name, first_name);
```
OR
```
ALTER TABLE contacts
  RENAME INDEX contacts_idx TO contacts_new_index;
```

### Some note
Bạn nên tránh dùng chỉ mục trong 1 vài trường hợp sau:

Các bảng thường xuyên update, insert.

Các index không nên sử dụng trên các column mà chứa số lượng lớn các bản ghi null

Không dùng index trên các colum thường xuyên update

Tài liệu tham khảo:

https://dev.mysql.com/doc/refman/8.0/en/create-index.html

https://www.techonthenet.com/mysql/indexes.php