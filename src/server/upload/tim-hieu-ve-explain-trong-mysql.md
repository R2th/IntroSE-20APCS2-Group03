# Explain trong MySql

Explain là câu lệnh được sử dụng để thu được kế hoạch thực thi truy vấn, hay MySQL sẽ thực thi truy vấn của chúng ta như thế nào. Bạn có thể thấy thông tin về kế hoạch đó bằng cách thêm lệnh EXPLAIN vào đầu mỗi query. Nó hoạt động với các mệnh đề SELECT, DELETE, INSERT, REPLACE, và UPDATE, và nó hiển thị thông tin từ trình tối ưu hóa về kế hoạch thực thi câu truy vấn. 

EXPLAIN là một trong những công cụ quan trọng giúp hiểu và tối ưu truy vấn MySQL. Nếu sử dụng một cách thuần thục thì sẽ giúp chúng ta tránh khỏi các query tồi, cũng giống như phát hiện ra các bottle neck của hệ thống như chưa dán index... 

# Các thông số của Explain

Chúng ta cùng tìm hiểu kết quả trả về của một câu truy vấn đơn giản qua ví dụ sau.

`EXPLAIN SELECT * FROM Author` 

```
+----+-------------+------------+--------+---------------+---------+---------+----------------+------+-------------+
| id | select_type | table      | type   | possible_keys | key     | key_len | ref            | rows | Extra       |
+----+-------------+------------+--------+---------------+---------+---------+----------------+------+-------------+
|  1 | PRIMARY     | <derived2> | ALL    | NULL          | NULL    | NULL    | NULL           |  237 |             |
|  1 | PRIMARY     | Author     | eq_ref | PRIMARY       | PRIMARY | 3       | A1.AuthorCode  |    1 |             |
|  2 | DERIVED     | Book       | ALL    | NULL          | NULL    | NULL    | NULL           | 4079 | Using where |
+----+-------------+------------+--------+---------------+---------+---------+----------------+------+-------------+
3 rows in set (0.00 sec)
```

Ở đây explain đã trả về tất cả là 10 cột, và chúng ta sẽ đi tìm hiểu về từng cột này nhé

## 1. id

Là số thứ tự cho mỗi câu SELECT trong truy vấn của bạn (trường hợp bạn sử dụng các truy vấn lồng nhau - nested subqueries).

## 2. select_type

Về cơ bản thì bạn hiểu đây là tham số về kiểu query. Nó bao gồm các giá trị sau

- **SIMPLE** - Là một câu truy vấn đơn không có subqueries hay unions nào.    Truy vấn là một câu SELECT cơ bản, không có bất cứ truy vấn con (subqueries) hay câu lệnh hợp (UNION) nào.
- **PRIMARY** - Query là câu SELECT ngoài cùng của một phép JOIN
- **DERIVED** - Query nằm bên trong một FROM
- **SUBQUERY** - Query đầu tiên nằm trong subquery, không phụ thuộc vào query nào khác. Query này sẽ được execute đúng lần đầu tiên, sau đó kết quả sẽ được cache lại.
- **DEPENDENT SUBQUERY** - Query mà phụ thuộc vào query nằm ngoài nó
- **UNCACHEABLE SUBQUERY** - Query không thể cache lại được
- **UNION** - Query là câu SELECT thứ hai của lệnh UNION
- **DEPENDENT UNION** - Khi mà trong subquery có union, và subquery đó thuộc loại DEPENDENT SUBQUERY
- **UNCACHEABLE UNION** - Khi mà trong uncacheable subquery có chứa union
-**UNION RESULT** - Query là kết quả của lệnh UNION.

## 3. table

Nó chỉ là tên bảng liên quan đến câu truy vấn.

## 4. type

  Trường này thể hiện cách MySQL joins các bảng. Đây có thể coi là trường quan trọng nhất trong kết quả của explain. Nó có thể chỉ ra các index bị thiếu và nó cũng có thể cho thấy câu truy vấn của bạn cần phải xem xét lại. Các giá trị của trường này là:
  
 - **system** - Bảng có 0 hoặc 1 dòng
 - **const** - Bảng chỉ có duy nhất 1 dòng đã được đánh chỉ mục mà khớp với điều kiện tìm kiếm. Đây là loại join nhanh nhất, bởi bảng chỉ cần đọc một lần duy nhất và giá trị của cột được xem như là hằng số khi join với các bảng khác.
- **eq_ref** - Giống như const nhưng trường được sử dụng không đứng riêng mà nằm trong câu lệnh JOIN. Đây là loại join tốt thứ hai chỉ sau const.
- **ref** - Khi trường được tìm kiếm có được đánh index , tuy nhiên trường đó không phải là UNIQUE. Kiểu join này thường xảy ra với các cột được so sánh với toán tử = hoặc <=> 
- **fulltext** - Phép join các bảng sử dụng FULLTEXT index
- **ref_or_null** - Gần giống như ref nhưng chứa cả các dòng với cột mang giá trị null
- **index_merge** - Phép join sử dụng một danh sách các index để đưa ra tập kết quả. Ở cột KEY sẽ liệt kê các key được sử dụng
- **unique_subquery** - Truy vấn con với lệnh IN sẽ trả về duy nhất một kết quả và sử dụng primary key
- **index_subquery** - Gần giống như unique_subquery nhưng trả về nhiều hơn một dòng
- **range** - Một index được sử dụng để tìm các hàng phù hợp trong một khoảng xác định khi khóa được so sánh với hằng số thông qua các toán tử BETWEEN, IN, >, >=,...
- **index** - Toàn bộ cây index được duyệt để tìm ra row thỏa mãn điều kiện, do đó sẽ rất chậm
- **all** - Toàn bộ bảng được quét để tìm ra các hàng phù hợp cho join. Kiểu join này được coi là tệ nhất và thường cho thấy việc thiếu các index trên các bảng

## 5. possible_keys 

 List tất cả các key bởi MySql để tìm ra các dòng trong bảng. Các key này có thể có hoặc không được sử dụng trong thực tế
 
 ## 6. key
 
 Key được chính thức MySql sử dụng để làm index để tìm kiếm. Cột này có thể chứa khóa không được liệt kê ở cột **possible_keys**
 
 ## 7. key_len
 
 Hiển thị độ dài của index trình tối ưu hóa truy ván chọn để sử dụng. Ví dụ, key_len = 2 tức là cần bộ nhớ để lưu 2 ký tự
 
 ## 8. ref 
  
 Hiển thị các cột hoặc các hằng số được so sánh với index được nêu ra ở cột key. Trong trường hợp query là JOIN thì đây chính là giá trị của key ở bảng tương ứng mà được join cùng với bảng chính
 
 ## 9. rows 
 
 Nó thể hiện số dòng mà mysql "dự định" sẽ fetch ra từ bảng trong query đó. Đây là một chỉ số rất quan trọng, nhất là khi bạn dùng JOIN hoặc truy vấn con
 
 Có một điểm chú ý là khi query thuộc type là "DERIVED" tức là nó sẽ là một subquery nằm trong FROM statement, thì khi đó nếu không execute query thì mysql sẽ không thể nào "đoán" được số dòng cần lấy ra. Do vậy khi đó EXPLAIN sẽ khá là tốn thời gian nếu subquery đó nặng
 
 ## 10. extra 
 
 Đây cũng là một thông số rất quan trọng. Các giá trị kiểu như Using Temporary, Using filesort,... của cột này có thể cho thấy một truy vấn không thực sự tốt. Chỉ cần nhìn qua extra thì bạn sẽ đoán được phần nào chuyện gì sẽ xảy ra đằng sau một query nào đó

# Kết luận

Thông qua giá trị của id và select_type, ta có thể biết được trình tự access vào các bảng để lấy ra cái gì, kết hợp với bảng khác như nào.

Thông qua giá trị của type, key, ref và rows, ta có thể biết ứng với mỗi bảng sẽ có những thông tin gì được fetch ra, truy cập vào bảng nào sẽ nặng, để chúng ta có thể đánh index cho bảng đó

Thông qua giá trị của extra, chúng ta sẽ có một cái nhìn tổng quát về query nào đó

# Tham khảo
https://www.eversql.com/mysql-explain-example-explaining-mysql-explain-using-stackoverflow-data/