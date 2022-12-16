## 1. Tại sao kiểm thử Database lại quan trọng
Các điểm được đưa ra dưới đây sẽ giải thích tầm quan trọng của việc kiểm thử cơ sở dữ liệu theo một cách ngắn gọn:

* Dữ liệu là một tài sản quan trọng và nó cần được lưu và bảo vệ
* Cơ sở dữ liệu đang trở nên phức tạp với các nền tảng và công nghệ mới. Vì vậy, cơ hội của các lỗi tăng lên
* Có thể có các chức năng quan trọng liên quan đến các giá trị được lưu trữ trong cơ sở dữ liệu
* Các sự cố trong cơ sở dữ liệu hoặc truy vấn có thể dẫn đến các vấn đề về chức năng chính
* Để đảm bảo dữ liệu được ánh xạ chính xác hay không
* Kiểm tra cơ sở dữ liệu có thể được thực hiện như một bài kiểm tra đơn vị, kiểm tra hộp đen , kiểm tra hộp trắng và văn bản hộp xám

## 2. Database CRUD Testing 
Phần mềm xây dựng dựa trên CSDL thường có 4 chức năng chính: Create, Read, Update, và Delete. Đây là bốn chức năng chính và cơ bản của lưu trữ liên tục, chúng thường được thực hiện trong các ứng dụng phần mềm thông qua các biểu mẫu. Khi xây dựng các API, các mô hình cung cấp bốn loại chức năng cơ bản này. Một mô hình cần có khả năng thực hiện tối đa bốn chức năng này. Nếu một action không thể được mô tả bởi một trong bốn thao tác này, thì rất có thể nó một mô hình của riêng chính nó mà thôi.

![](https://images.viblo.asia/be3e971b-3ac0-4f4b-84a3-1ac6f2d23774.png)

### 2.1 CRUD là gì? 

Trong lập trình máy tính, CRUD là viết tắt của Tạo (**C**reate), Đọc (**R**ead), Cập nhật (**U**pdate) và Xóa (**D**elete)

* Tạo (Create) - INSERT một mục trong cơ sở dữ liệu: Create - Sử dụng khi một library book mới được được thêm vào danh mục. Chương trình gọi hàm này sẽ cung cấp các giá trị cho "title", "author", và "isbn". Sau khi chức năng này được gọi, sẽ có một entry mới trong books resource tương ứng với cuốn sách mới này. Ngoài ra, mục nhập mới được gán một id duy nhất, có thể được sử dụng để truy cập vào tài nguyên này.
* Đọc (Read) hoặc Truy xuất (Retrieve) - CHỌN mục nhập từ cơ sở dữ liệu và xem nó: Sử dụng để xem tất cả các sách hiện có trong danh mục. Lệnh gọi hàm này sẽ không thay đổi các sách trong danh mục - nó sẽ đơn giản truy xuất tài nguyên và hiển thị kết quả. Cuốn sách được truy xuất sẽ không được sửa đổi, chỉ lấy ra.
* Cập nhật (Update) - CẬP NHẬT mục nhập hoàn toàn hoặc một phần: Update - Phải có một chức năng để gọi khi thông tin về một cuốn sách phải được thay đổi. Chương trình gọi hàm sẽ cung cấp các giá trị mới cho "title", "author", và "isbn". Sau khi gọi hàm, mục nhập tương ứng trong tài nguyên sách sẽ chứa các trường mới được cung cấp.
* Xóa (Delete) hoặc hủy (Destroy) - DROP / DELETE mục nhập: Delete - Nên có một chức năng i để xóa một cuốn sách thư viện khỏi danh mục. Chương trình gọi hàm sẽ cung cấp một hoặc nhiều giá trị ("title", "author", và/hoặc "isbn") để xác định sách, và sau đó cuốn sách này sẽ bị xóa khỏi tài nguyên. Sau khi chức năng này được gọi, tài nguyên sách chứa tất cả các sách trước đây, ngoại trừ sách đã bị xóa.
* Dựa trên yêu cầu phần mềm, chu kỳ CRUD có thể thay đổi

**Truy vấn MYSQL cho mỗi hoạt động:**


| Hoạt động | Truy vấn mẫu |
| -------- | -------- |
|      CREATE|INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);  | 
|      READ|   SELECT * from table;| 
|    UPDATE  | UPDATE table_name SET column1 = value2, column2 = value3 WHERE condition;  | 
|     DELETE |DELETE FROM TABLE table_name where column1 = ‘value11’;     |

### 2.2 Các cách để người kiểm thử thủ công có thể thực hiện 

* Thực thi các truy vấn của chính chúng ta - Người thử nghiệm (tester) có hiểu biết tốt về yêu cầu phần mềm và ngôn ngữ SQL có thể thực hiện các truy vấn riêng để kiểm tra cơ sở dữ liệu. Bằng cách này, tất cả các trường hợp có thể được xác minh với các truy vấn tốt.
* Thực hiện các truy vấn với sự trợ giúp của nhà phát triển - Người thử nghiệm có thể bắt đầu bằng việc xác minh giao diện người dùng của ứng dụng và nhận các truy vấn từ nhà phát triển.

Đối với thử nghiệm hộp đen CRUD, chúng ta chỉ cần một truy vấn, đó là SELECT 
Như chúng ta đều biết, cơ sở dữ liệu lưu trữ dữ liệu. Khi chúng ta cần lấy dữ liệu, truy vấn SELECT được sử dụng

Trong thử nghiệm hộp đen, chỉ cần sử dụng truy vấn này để xem các hành động thông qua giao diện người dùng có hiển thị phản ánh đúng trong cơ sở dữ liệu hay không


**‘SELECT’ có thể được sử dụng theo các cách sau:**

Nếu người kiểm tra muốn kiểm tra và xác minh tất cả dữ liệu, anh ta có thể sử dụng biểu tượng bắt đầu (*) trong truy vấn SELECT. Đây là dạng truy vấn SELECT đơn giản nhất.

```
SELECT * FROM table_name;
```

Câu lệnh trên chọn tất cả các trường từ tất cả các hàng từ bảng table_name.

Trong một số trường hợp, kết quả truy vấn đầu tiên có thể lộn xộn. Nếu trình kiểm tra chỉ quan tâm đến một số trường, thì tập lệnh sau có thể được sử dụng.

```
SELECT ‘field1’, ‘field2’, ‘field3’ FROM tablename;
```

Câu lệnh trên chọn các trường, ‘field_1’, ‘field_2’ và ‘field_3’ từ tất cả các hàng từ bảng table_name.

Nếu người thử nghiệm muốn xem kết quả dựa trên bất kỳ tiêu chí nào, thì mệnh đề WHERE có thể được sử dụng.

```
SELECT ‘field1’ FROM tablename WHERE field2 = ‘success’;
```

Câu lệnh trên chọn trường, ‘field_1’ từ tất cả các hàng từ bảng table_name, trong đó ‘field2’ là ‘success’.

## 3. Các trường hợp nên tiến hành testdata 
### 3.1 Fake data

Fake data có lẽ đó là khái niệm không xa lạ gì đối với một Developer không phải vì thế mà các Tester bỏ qua lĩnh vực này và không đụng chạm đến nó.  Một ví dụ đơn giản, bạn test chức năng Sign Up, bạn phải test 10 case. Chỉ mỗi chuyện tạo 10 email để test thôi là mệt thở rồi. Nhưng mà, nếu bạn biết cách vào trong database thì công việc sẽ dễ dàng hơn

Chính vì thế chúng ta cần: 

* Learn DB structure,
* Học cách execute SQL,
* Học câu lệnh Update.

Ví dụ:

![](https://images.viblo.asia/b476b31d-9665-4af6-8708-597b1cfdf805.png)

Chúng ta sẽ có thể sử dụng email member@sun-asterisk.com bao nhiêu lần tùy thích để nhận được email confirmation và test nó.

### 3.2 Clean data
Dùng trong trường hợp chúng ta muốn test environment  được sạch sẽ để demo cho client, để test case empty data, hoặc có quá nhiều data rác. Lúc này, chưa chắc trên Front End đã có feature REMOVE, mà nếu remove bằng tay thì cũng chết.

1 câu lệnh DELETE sẽ giúp bạn tiết kiệm rất nhiều thời gian:

```
DELETE FROM table_name [WHERE Clause]
```

Để đảm bảo được tính thống nhất của data, chúng ta phải chắc chắn rằng mình hiểu rõ database structure của product 

### 3.3 Dump initial data

Với những tình uống sau đây, nên cân nhắc tạo ra 1 bộ data chuẩn và lưu giữ nó lại:

Cần 1 lượng data lớn để test performance
Không muốn client của bạn phải vào test khi chưa có 1 data nào trong website sau mỗi lần deploy.
Cần 1 bộ data gồm nhiều case, giả sử như First Name có đủ kiểu từ chữ thường cho đến tiếng Hoa, Tiếng Hàn, “?!@#”,… để test layout.
Muốn test case: structure của Dabase cũ sẽ được migrate sang thành structure mới khi server start
Automation test case cần phải có 1 bộ data chuẩn, vì test case được thiết kế để kiểm tra đúng sai trên đúng bộ data đó! Là cái khác, sai 1 chút thì sẽ có 1 test case fail.

Team bạn đang thực hiện testing và data của họ bị xóa. Đặc biệt là client. Nếu bạn đang dùng chung 1 environment, thì phải có sự đồng thuận của tất cả mọi người
Update data test để có structure mới nhất.
Ví dụ, mình tạo ra 1 bộ data test, lúc đó database chỉ có field email, username và password thôi. Một thời gian sau, mình có thêm 1 field mới nữa là Name. Khi mình dump data test cũ vào, hệ thống báo lỗi.

Nếu team bạn có làm migration tốt, đó sẽ là một test case hay. Nhưng nếu team bạn không có kế hoạch làm nó, thì bộ data test của bạn phải được update structure thường xuyên, nếu không sao khi dump data, feature của bạn có thể chạy sai.

## 4. Ví dụ và một số câu lệnh SQL thường sử dụng trong database testing 
Ví dụ ta có 2 bảng dữ liệu sau 

Bảng sinhvien


| sinhvien_id | sinhvien_ten |
| -------- | -------- | -------- |
| 100     | Nguyen Van A    | 
| 101     | Nguyen Van B    | 
| 102    |Phan Thi C    | 
| 103    | Hoang Thi D    | 
 Bảng monhoc
 

| monhoc_id | sinhvien_id | diemmonhoc |
| -------- | -------- | -------- |
| A200     | 100   | 7    |
| A201     | 101   | 8    |
| A202     | 103  | 9   |
| A203     | 108   | 7    |


### 4.1 Truy vấn hay cần tìm một dữ liệu trong database

Cấu trúc chung : 
```
SELECT * from table_name;
```

Truy vấn ra tất cả thông tin trong bảng monhoc

Câu lệnh:

```
SELECT * from sinhvien;
```

Kết quả:
| sinhvien_id |sinhvien_ten |
| -------- | -------- | -------- |
| 100     | Nguyen Van A    | 
| 101     | Nguyen Van B    | 
| 102    |Phan Thi C    | 
| 103    | Hoang Thi D    | 

Truy vấn ra thông tin sinh viên có mã 100

Câu lệnh:

```
SELECT * from sinhvien WHERE sinhvien_id='100' ;
```

 Kết quả:
 | sinhvien_id | sinhvien_ten |
| -------- | -------- | -------- |
| 100     | Nguyen Van A    | 
### 4.2 Thêm mới dữ liệu
Cấu trúc chung

```
INSERT INTO table_name(column_name 1, column_name 2) VALUES ('value 1', 'value 2');
```

Ví dụ thêm sinh viên Le Mai B mã sinh viên 104 vào bảng sinhvien

```
INSERT INTO sinhvien (sinhvien_id, Sinhvien_ten) VALUES ('104', 'Le Mai B');
```
Kết quả:
| sinhvien_id |sinhvien_ten |
| -------- | -------- | -------- |
| 100     | Nguyen Van A    | 
| 101     | Nguyen Van B    | 
| 102    |Phan Thi C    | 
| 103    | Hoang Thi D    | 
|104|Le Mai B|

### 4.3 Update dữ liệu
Câu lệnh:

```
UPDATE table_name SET column_name ='new values' WHERE column_name ='values';
```

 Ví dụ sử điểm của sinh viên có id=100 từ 7 thành 8 điểm trong bảng monhoc
 
```
 UPDATE monhoc SET diemmonhoc='8' WHERE sinhvien_id='100';
```
 | monhoc_id | sinhvien_id | diemmonhoc |
| -------- | -------- | -------- |
| A200     | 100   | 8    |

### 4.4 Xóa dữ liệu
Câu lệnh:

```
DELETE FROM table_name WHERE column_name ='values';
```

Ví dụ muốn xóa sinh viên có mã 100 ra khỏi danh sách sinh viên ta sử dụng câu lệnh:

```
DELETE FROM sinhvien WHERE sinhvien_id='100';

```
Sau khi thực hiện câu lệnh bảng sinhvien còn
| sinhvien_id | sinhvien_ten |
| -------- | -------- | -------- |
| 101     | Nguyen Van B    | 
| 102    |Phan Thi C    | 
| 103    | Hoang Thi D    | 
### 4.5 Câu lệnh join
Trong SQL Server (Transact-SQL) JOIN được dùng để lấy dữ liệu từ nhiều bảng, xảy ra khi 2 hoặc nhiều bảng được kết nối với nhau trong một lệnh SQL. Dưới đây là 4 loại JOIN trong SQL Server

INNER JOIN - hay còn gọi là hình thức kết nối đơn giản


LEFT OUTER JOIN - hay LEFT JOIN

RIGHT OUTER JOIN - hay RIGHT JOIN

FULL OUTER JOIN - hay FULL JOIN


**Cú pháp INNER JOIN**

```
SELECT cot
FROM bang1
INNER JOIN bang2
ON bang1.cot = bang2.cot;
```
![](https://images.viblo.asia/1edb2dd3-0a70-4173-a241-5afd433be9d6.jpg)

Ví dụ dùng câu lệnh INNER JOIN để lấy ra những sinh viên đã có điểm từ 2 bảng sinhvien và monhoc

```
SELECT sinhvien.sinhvien_id, sinhvien.sinhvien_ten, monhoc.diemmonhoc
FROM sinhvien
INNER JOIN monhoc
ON sinhvien.sinhvien_id=monhoc.sinhvien_id;
```

Kết quả ta được bảng 
| sinhvien_id | sinhvien_ten |diemmonhoc|
| -------- | -------- | -------- |
| 100     | Nguyen Van A    | 7|
| 101     | Nguyen Van B    | 8|
| 103    | Hoang Thi D    | 9|
**LEFT  JOIN**
Kiểu kết nối này trả về các hàng nằm ở bảng bên trái trong điều kiện ON và chỉ lấy ở các bảng còn lại những hàng đáp ứng được điều kiện đặt ra

Cú pháp LEFT JOIN

```
SELECT cot

FROM bang1

LEFT JOIN bang2

ON bang1.cot = bang2.cot;
```

![](https://images.viblo.asia/c296eb10-b913-4975-a104-78e07c9d273b.jpg)

Ví dụ dùng câu lệnh LEFT JOIN để lấy điểm của tất cả sinh viên

```
SELECT sinhvien.sinhvien_id,sinhvien.sinhvien_ten, monhoc.diemmonhoc

FROM sinhvien

LEFT JOIN monhoc

ON sinhvien.sinhvien_id=monhoc.sinhvien_id;
```

Kết quả ta được bảng 
| sinhvien_id | sinhvien_ten |diemmonhoc|
| -------- | -------- | -------- |
| 100     | Nguyen Van A    | 7|
| 101     | Nguyen Van B    | 8|
| 102    | Phan Thi C    | null|
| 103   | Hoang Thi D    |9|


**RIGHT  JOIN**
 Kiểu kết nối này trả về các hàng nằm ở bảng bên phải trong điều kiện ON và chỉ lấy ở các bảng còn lại những hàng đáp ứng được điều kiện đặt ra

Cú pháp RIGHT JOIN

```
SELECT cot

FROM bang1

RIGHT JOIN bang2

ON bang1.cot = bang2.cot;
```
![](https://images.viblo.asia/a8440bde-6b63-4031-b145-28c883e6c381.jpg)

Ví dụ ta truy vấn câu lệnh :

```
SELECT monhoc.monhoc_id, monhoc.sinhvien_id,monhoc.diemmonhoc,sinhvien.sinhvien_ten

FROM sinhvien

RIGHT JOIN monhoc

ON sinhvien.sinhvien_id=monhoc.sinhvien_id;
```

Kết quả trả về là tất cả sinh viên trong bảng monhoc và chỉ các sinh viên đáp ứng được yêu cầu trong bảng sinhvien

Kết quả ta được bảng 
| monhoc_id | sinhvien_id | diemmonhoc |
| -------- | -------- | -------- |
| A200     | 100   | 7    |Nguyen Van A    | 
| A201     | 101   | 8    |Nguyen Van B    | 
| A202     | 103  | 9   |Hoang Thi D    |
| A203     | 108   | 7    |null   |

**FULL  JOIN**
Một số cơ sở dữ liệu dùng FULL JOIN thay vì FULL OUTER JOIN. Kiểu kết nối này trả về tất cả các hàng nằm ở bảng trái và phải và giá trị NULL đặt ở những nơi không đáp ứng được điều kiện.

Cú pháp FULL JOIN
```
SELECT cot

FROM bang1

FULL  JOIN bang2

ON bang1.cot = bang2.cot;
```
![](https://images.viblo.asia/7e486fb8-c070-4664-87ca-a3048f10afa1.jpg)

Ví dụ về câu lệnh FULL JOIN

```
SELECT monhoc.monhoc_id, monhoc.sinhvien_id,monhoc.diemmonhoc,sinhvien.sinhvien_ten
 
FROM sinhvien

FULL JOIN monhoc

ON sinhvien.sinhvien_id=monhoc.sinhvien_id;
```

Sau khi thực hiện câu lệnh ta được kết quả

  | sinhvien_id | sinhvien_ten |monhoc_id |diemmonhoc |
| -------- | -------- | -------- |-------- |
| 100     | Nguyen Van A    | A200     |  7    |
| 101     | Nguyen Van B    | A201     |  8    |
| 102    |Phan Thi C    | A202     |  null  |
| 103    | Hoang Thi D    | A203     |  7    |
  | 108  | null| A203     |  7    |
 
[Tìm hiểu về Database Testing (Phần 1)](https://viblo.asia/p/tim-hieu-ve-database-testingphan-1-63vKj2jVK2R)
  
Tài liệu tham khảo:

https://hoclaptrinh.vn/tutorial/hoc-sql-server/database-la-gi 
https://www.tutorialspoint.com/database_testing

Hy vọng bài viết bổ ích cho bạn!