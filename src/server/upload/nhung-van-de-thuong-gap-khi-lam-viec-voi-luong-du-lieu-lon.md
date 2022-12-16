![](https://images.viblo.asia/587edcd4-9ca4-424e-a9b5-eeb14d1fdb21.jpeg)
Trong quá trình làm việc hàng ngày tiếp xúc với lượng dữ liệu khổng lồ, chắc hẳn không ít lần bạn gặp phải những vấn đề liên quan đến việc xử lý dữ liệu lớn như insert cùng lúc nhiều, rất nhiều bản ghi  vào database, import một file csv, excel nặng nhiều Megabyte , import một file sql dung lượng lớn để tạo databse và gặp lỗi đại loại như :
> You probably tried to upload too large file. Please refer to documentation for ways to workaround this limit.
> 
## Single insert & Multiple insert

Khi chúng ta có một danh sách mảng dữ liệu lớn, cần phải insert chúng vào databse, thông thường có 2 cách mà chúng ta thường làm:

1- Loop qua array đó và tại mỗi vòng lặp chúng ta insert 1 record vào DB

2- Dùng mysql query để insert một nhóm các record một lần kiểu như:
```SQL
INSERT INTO example
  (example_id, name, value, other_value)
VALUES
  (100, 'Name 1', 'Value 1', 'Other 1'),
  (101, 'Name 2', 'Value 2', 'Other 2'),
  (102, 'Name 3', 'Value 3', 'Other 3'),
  (103, 'Name 4', 'Value 4', 'Other 4');
```

Trong 2 cách trên chúng ta thấy ngay được có sự khác biệt rõ ràng, giả sử có 1 array với 1000 000 phần tử, với cách thứ 1 chúng ta cần mất 1000 000 lần sử dụng câu lệnh `Insert Into table ...`. Còn trong cách thứ 2 , nếu mỗi lần chúng ta insert một nhóm gồm 1000 records thì chỉ cần mất 1000 lần sử dụng câu lệnh trên. Vậy khác biệt gì ở đây? con số nào sẽ là số record tốt nhất cho mỗi lần insert.

![](https://images.viblo.asia/985b5d99-1835-4890-8471-52481c387255.png)

Hình 1: Số lượng record hoạt động tốt nhất trên mỗi câu lệnh insert

![](https://images.viblo.asia/b9d101b9-47d5-4a78-b44f-c79d935f5bdd.png)

Hình 2: So sánh thời gian giữa single insert và multiple insert 

Trong hình 1 chúng ta có thể thấy, insert hoạt động tốt nhất tại khoảng 25 record / lần insert. Hình 2 cho ta thấy trong cùng 1 tập dữ liệu là 1 triệu records thì single insert mất khoảng 57 seconds để load xong , còn mới multiple insert với 25 records / lần insert sẽ rút ngắn thời gian chỉ còn khoảng 9 seconds.

Có bạn sẽ hỏi tại sao chúng ta không insert  luôn một phát 1 triệu records ?. Câu trả lời là không. Lý do là số lượng record bao nhiêu không thành vấn đề, có thể 1 record của bạn chỉ có 2 columns đương nhiên sẽ khác với 1 record có tới 100 columns. Vấn đề là mysql defautl cho phép chúng ta insert 1MB dữ liệu,
vì câu sql của chúng ta thực chất là một chuỗi string insert ... select dài miên man. 

![](https://images.viblo.asia/7fcedad3-7dd4-4e6b-8ec7-7a8e51c77071.jpg)

## max_allowed_packet
Đôi khi để trống đối với việc bị limit việc insert này chúng ta có kiểu setting lại config của mysql
Hiển thị config hiện tại :
```sql
show variables like 'max_allowed_packet';
```
Thay đổi config từ 1MB sang 500 MB
```sql
SET GLOBAL max_allowed_packet=524288000;
```

Gía trị của max_allowed_packet chính là limit cho data mỗi lần insert vào database của bạn, con số 500 mà bạn tăng lên có thể sẽ giải quyết được vấn đề, tuy nhiên mình khuyên bạn không nên lạm dụng việc này, thay vào đó bạn có thể sử dụng cách trên là tách cục data ra thành nhiều cục nhỏ với mỗi cục là 25 record như vậy sẽ tối ưu được cả thời gian xử lý.

## upload_max_filesize 
Trong quá trình làm việc chắc hẳn không ít lần chúng ta nhận được 1 file sql data của khách hàng để import lên database local. Tuy nhiên default file upload của php chỉ là 2M, và thời gian thực thi quá lâu dẫn đến lỗi `timeout`.
Chúng ta có thể chống chế bằng cách thường làm sau, thay đổi config trong file php.ini
```php
php_value upload_max_filesize 80M
php_value post_max_size 80M
php_value max_execution_time 300
php_value max_input_time 300
```

Cách này sẽ tăng dung lượng file upload và tăng thời gian thực thi lên, thường vấn đề này hay gặp khi chúng ta dùng các tool quản lý cơ sở dữ liệu kiểu PHPMyAdmin, workbench ...
Có một cách hài hước có thể thay thế việc trên đó là như này:
```sql
mysql -h yourhostname -u username -p databasename < yoursqlfile.sql
```

Đấy là vào thẳng mysql import file bằng command line, tránh được việc phải thao tác thông qua thằng PHP.

## CSV to Database
Thông thường khi import một file CSV vào database chúng ta cũng thường dùng 1 package nào đó để đọc và tạo thành array insert vào databse, tuy nhiên mysql cung cấp các syntax cho việc load file và insert có thể như sau:
```sql
LOAD DATA INFILE 'path_to_file/fileBigData.csv' IGNORE 
INTO TABLE table_name
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
```
Bằng cách này chúng ta có thể insert cả triệu record mà có thể không gây ra lỗi gì, còn thời gian thực thi thì còn phải đánh giá thêm.

## Kết luận
Trên đây là một vài mẹo nhỏ trong quá trình làm việc với dữ liệu lớn mà mình đã tìm hiểu, chúng ta cần cố gằng làm sao ít sửa config defult của mysql nhất mà vẫn có thể thực hiện được công việc như mong muốn, Hy vọng sẽ phần nào giúp các bạn giảm nhẹ được gánh nặng trong quá trình làm việc, và đem lại hiệu quả hơn. Cảm ơn các bạn đã đón đọc!