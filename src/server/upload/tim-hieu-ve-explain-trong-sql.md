## EXPLAIN trong SQL
### Explain là gì
Explain là câu lệnh trong sql giúp bạn biết được những gì xảy ra bên trong một câu lệnh khác. Sử dụng explain một các thành thục sẽ giúp bạn tránh khỏi các câu query tồi, cũng như cải thiện câu truy vấn được tốt hơn
Giả sử mình có một câu sql như sau
```
 explain select `activity_logs`.*, `notifications`.`user_id` as `pivot_user_id`, `notifications`.`activity_id` as `pivot_activity_id`, `notifications`.`id` as `pivot_id`, `notifications`.`status` as `pivot_status` from `activity_logs` inner join `notifications` on `activity_logs`.`id` = `notifications`.`activity_id` where `notifications`.`user_id` = 844 order by `created_at` desc limit 20 offset 0
```

Khi explain câu sql sẽ có kết quả như sau:
![](https://images.viblo.asia/8f8214fc-50a1-4f7c-a155-34ba82a4f094.png)
 
 Ta thấy từ một câu querry to sẽ được break ra thành nhiều câu query nhỏ. Với mỗi câu query nhỏ đó, chúng ta sẽ có nhiều thông số để biết được là query nhỏ đó thuộc loại nào, lấy từ index ra sao...  
**1. ID**
* Là số thứ tự cho mỗi câu SELECT trong truy vấn của bạn (trường hợp bạn sử dụng các truy vấn lồng nhau – nested subqueries).

**2. SELECT_TYPE**
* Về cơ bản thì bạn hiểu đây là tham số về kiểu query. Nó bao gồm các giá trị sau
* SIMPLE – Là một câu truy vấn đơn không có subqueries hay unions nào. Truy vấn là một câu SELECT cơ bản, không có bất cứ truy vấn con (subqueries) hay câu lệnh hợp (UNION) nào.
* PRIMARY – Query là câu SELECT ngoài cùng của một phép JOIN
* DERIVED – Query nằm bên trong một FROM
* SUBQUERY – Query đầu tiên nằm trong subquery, không phụ thuộc vào query nào khác. Query này sẽ được execute đúng lần đầu tiên, sau đó kết quả sẽ được cache lại.
* DEPENDENT SUBQUERY – Query mà phụ thuộc vào query nằm ngoài nó
* UNCACHEABLE SUBQUERY – Query không thể cache lại được
* UNION – Query là câu SELECT thứ hai của lệnh UNION
* DEPENDENT UNION – Khi mà trong subquery có union, và subquery đó thuộc loại DEPENDENT SUBQUERY
* UNCACHEABLE UNION – Khi mà trong uncacheable subquery có chứa union
* –UNION RESULT – Query là kết quả của lệnh UNION.

**3. TABLE**

Nó chỉ là tên bảng liên quan đến câu truy vấn.

**4. TYPE**
 
Trường này thể hiện cách MySQL joins các bảng. Đây có thể coi là trường quan trọng nhất trong kết quả của explain. Nó có thể chỉ ra các index bị thiếu và nó cũng có thể cho thấy câu truy vấn của bạn cần phải xem xét lại. Các giá trị của trường này là:
* system – Bảng có 0 hoặc 1 dòng
* const – Bảng chỉ có duy nhất 1 dòng đã được đánh chỉ mục mà khớp với điều kiện tìm kiếm. Đây là loại join nhanh nhất, bởi bảng chỉ cần đọc một lần duy nhất và giá trị của cột được xem như là hằng số khi join với các bảng khác.
* eq_ref – Giống như const nhưng trường được sử dụng không đứng riêng mà nằm trong câu lệnh JOIN. Đây là loại join tốt thứ hai chỉ sau const.
* ref – Khi trường được tìm kiếm có được đánh index , tuy nhiên trường đó không phải là UNIQUE. Kiểu join này thường xảy ra với các cột được so sánh với toán tử = hoặc <=>
* fulltext – Phép join các bảng sử dụng FULLTEXT index
* ref_or_null – Gần giống như ref nhưng chứa cả các dòng với cột mang giá trị null
* index_merge – Phép join sử dụng một danh sách các index để đưa ra tập kết quả. Ở cột KEY sẽ liệt kê các key được sử dụng
* unique_subquery – Truy vấn con với lệnh IN sẽ trả về duy nhất một kết quả và sử dụng primary key
* index_subquery – Gần giống như unique_subquery nhưng trả về nhiều hơn một dòng
* range – Một index được sử dụng để tìm các hàng phù hợp trong một khoảng xác định khi khóa được so sánh với hằng số thông qua các toán tử BETWEEN, IN, >, >=,…
* index – Toàn bộ cây index được duyệt để tìm ra row thỏa mãn điều kiện, do đó sẽ rất chậm
* all – Toàn bộ bảng được quét để tìm ra các hàng phù hợp cho join. Kiểu join này được coi là tệ nhất và thường cho thấy việc thiếu các index trên các bảng

**5.  POSSIBLE_KEYS**
* List tất cả các key bởi MySql để tìm ra các dòng trong bảng. Các key này có thể có hoặc không được sử dụng trong thực tế

**6.  KEY**

Key được chính thức MySql sử dụng để làm index để tìm kiếm. Cột này có thể chứa khóa không được liệt kê ở cột possible_keys

**7.  KEY_LEN**

Hiển thị độ dài của index trình tối ưu hóa truy ván chọn để sử dụng. Ví dụ, key_len = 2 tức là cần bộ nhớ để lưu 2 ký tự

**8.  REF**

Hiển thị các cột hoặc các hằng số được so sánh với index được nêu ra ở cột key. Trong trường hợp query là JOIN thì đây chính là giá trị của key ở bảng tương ứng mà được join cùng với bảng chính

**9.  ROWS**

* Nó thể hiện số dòng mà mysql “dự định” sẽ fetch ra từ bảng trong query đó. Đây là một chỉ số rất quan trọng, nhất là khi bạn dùng JOIN hoặc truy vấn con
* Có một điểm chú ý là khi query thuộc type là “DERIVED” tức là nó sẽ là một subquery nằm trong FROM statement, thì khi đó nếu không execute query thì mysql sẽ không thể nào “đoán” được số dòng cần lấy ra. Do vậy khi đó EXPLAIN sẽ khá là tốn thời gian nếu subquery đó nặng

**10. EXTRA**

Đây cũng là một thông số rất quan trọng. Các giá trị kiểu như Using Temporary, Using filesort,… của cột này có thể cho thấy một truy vấn không thực sự tốt. Chỉ cần nhìn qua extra thì bạn sẽ đoán được phần nào chuyện gì sẽ xảy ra đằng sau một query nào đó

### Khắc phục sự cố về hiệu năng với EXPLAIN

**1. Index tất cả các cột dùng trong lệnh ‘where', ‘order
by' và ‘group by'**

Ngoài việc đảm bảo nhận dạng duy nhất các bản ghi, MySQL Indexes
còn giúp máy chủ MySQL lấy bản ghi từ CSDL nhanh hơn. Index cũng
rất có ích khi sắp xếp các bản ghi. MySQL Indexes có thể chiếm
nhiều dung lượng hơn và giảm hiệu suất khi insert, delete và
update. Tuy nhiên, nếu bảng của bạn có nhiều hơn 10 records, nó
thể giảm đáng kể thời gian thực hiện truy vấn. 

**2. Tối ưu lệnh LIKE với UNION**

Đôi khi, bạn có thể muốn chạy truy vấn bằng toán tử so sánh OR
trên các cột khác nhau trong một bảng cụ thể. Khi từ khóa OR
được sử dụng quá nhiều trong mệnh đề WHERE, nó có thể khiến
trình tối ưu hóa MySQL chọn quét toàn bộ bảng để lấy bản ghi.

Mệnh đề UNION có thể làm cho truy vấn chạy nhanh hơn, đặc biệt
nếu bạn có Index cho cột trong mệnh đề WHERE

Ví dụ, xét trường hợp bạn đang chạy truy vấn bên dưới với
‘first_name’ và ‘last_name’ được đánh index:
```
mysql> select * from students where first_name like 'Le%'
or last_name like 'Hau%'
```

Truy vấn trên có thể chạy chậm hơn nhiều so với truy vấn bên
dưới sử dụng toán tử UNION kết hợp 2 kết quả của các truy vấn
riêng biệt để tận dụng Index.

```
mysql> select from students where first_name like 'Le%'
union all select from students where last_name like 'Hau%'
;
```

**3. Tránh dùng LIKE Expressions với ký tự đại diện ở đầu**

MySQL không thể sử dụng các Index khi có một ký tự đại diện ở
đầu trong một truy vấn. Ta lấy ví dụ ở trên trên bảng students,
tìm kiếm như thế này sẽ khiến MySQL thực hiện quét toàn bộ bảng
ngay cả khi bạn đã đánh index trường ‘first_name’ trên bảng
students.

```
mysql> select * from students where first_name like '%nam'
;
```

Ta có thể thấy điều đó khi chạy lệnh EXPLAIN:
```
mysql> explain select * from students where first_name like
'%nam' ;
```



| id | select_type | table | partitions | type |possible_keys | key | key_len | ref | rows | filtered  |Extra |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1 | SIMPLE | students | NULL | ALL | NULL| NULL | NULL | NULL | 500 | 11.11 | Using where |


Như bạn thấy, MySQL phải duyệt qua 500 rows trong bảng students,
điều đó làm chậm truy vấn của ta đi rất nhiều.

**4. Sử dụng MySQL Full-Text Search**

Nếu bạn gặp phải tình huống cần tìm kiếm dữ liệu bằng ký tự đại
diện và bạn không muốn CSDL của mình chạy chậm, bạn nên cân nhắc
sử dụng tìm kiếm toàn văn bản – MySQL Full-Text Search (FTS) vì
nó nhanh hơn nhiều so với truy vấn sử dụng ký tự đại diện.
Hơn nữa, FTS cũng có thể mang lại kết quả tốt hơn và phù hợp hơn
khi bạn tìm kiếm trong một CSDL lớn.
Để thêm Index tìm kiếm toàn văn vào bảng students, ta có thể sử
dụng lệnh MySQL bên dưới:
```
mysql>ALTER TABLE students ADD FULLTEXT (first_name,
last_name);
mysql>SELECT * FROM students WHERE MATCH(first_name,
last_name) AGAINST ('Hau');
```

Trong ví dụ trên, ta đã chỉ định các cột mà ta muốn khớp
(first_name và last_name) theo từ khóa tìm kiếm (‘Hau’). Chạy
lệnh EXPLAIN cho truy vấn trên, ta có kết quả tối ưu như dưới
đây:

```mysql> EXPLAIN SELECT * FROM students WHERE
MATCH(first_name, last_name) AGAINST ('Hau');
```

| id | select_type | table | partitions | type |possible_keys | key | key_len | ref | rows |filtered | Extra |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1 | SIMPLE | students | NULL | fulltext |first_name | first_name | 0 | const | 1 |100.00 | Using where; Ft_hints: sorted |


### Tổng kết

Bằng việc nhìn vào id/select_type, chúng ta sẽ biết "trình tự" access vào các bảng như là vào bảng nào để lấy ra gì, sau đó
dùng kết quả đó để kết hợp với bảng khác ra sao.

Bằng việc nhìn vào type/key/ref/rows, chúng ta sẽ biết với mỗi
bảng sẽ có những thông tin gì được fetch ra, access vào bảng nào
sẽ bị nặng, qua đó tuning index cho việc access vào bảng đó
Bằng việc nhìn vào Extra, chúng ta sẽ biết được hành vi của
optimizer , biết là khi access vào bảng nào thì optimizer sẽ dự
định làm gì. Qua Extra chúng ta sẽ có một cái nhìn tổng quát về
query đó.

### Tài liệu tham khảo
https://www.exoscale.com/syslog/explaining-mysql-queries/
https://dev.mysql.com/doc/refman/8.0/en/explain.html
https://kipalog.com/posts/Everything-about-mysql-explain