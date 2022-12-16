Khi được điều chỉnh đúng cách cơ sở dữ liệu sẽ mang lại hiệu năng tuyệt vời. Nó không chỉ làm giảm tải tác vụ không cần thiết mà còn tối ưu hóa cơ sở dữ liệu để truy xuất nhanh hơn, tránh được các sự cố không mong muốn xảy ra như deadlock, thiếu hụt tài nguyên,... dấn tới những hậu quả nghiêm trọng.

# Tối ưu hóa câu truy vấn

### 1. Tránh sử dụng các function, bắt đầu bằng một wildcard trong predicate

`VD: SELECT * FROM TABLE1 WHERE UPPER(COL1)='ABC'`

Khi sử dụng hàm UPPER() thì cơ sở dữ liệu sẽ không thể sử dụng index của cột COL1 dẫn tới thực hiện câu lệnh chậm hơn. Nếu không còn cách nào khác và bắt buộc phải sử dụng hàm trong so sánh thì nên tạo thêm một chỉ mục dựa trên hàm hoặc phải tạo cột tùy chỉnh trong cơ sở dữ liệu (có thể là tạo thêm cột mới) để cải thiện hiệu xuất.

`VD: SELECT * FROM TABLE1 WHERE COL1 LIKE '%ABC'`

Khi sử dụng wildcard (%) ví dụ như '%ABC' gây ra quá trình quét toàn bộ bảng. Trong hầu hết trường hợp sử dụng wildcard gây ra hạn chế về hiệu suất.

### 2. Tránh truy vấn các cột không cần thiết trong câu lệnh SELECT

Thay vì sử dụng 'SELECT \*' để lấy ra tất cả dữ liệu của hàng hãy chỉ lấy ra những cột mà bạn sử dụng và thấy cần thiết trong câu lệnh SELECT giúp nên cao hiệu suất của MySQL. Vì những cột không cần thiết sẽ được thêm vào khi load dữ liệu dẫn tới chậm và hiệu năng bị giảm. 

### 3. Sử dụng Inner join thay cho outer join nếu có thể

Chỉ sử dụng outer join khi nó là lựa chọn duy nhất. Nó không chỉ giới hạn về mặt hiệu năng của cơ sở dữ liệu mà còn hạn chế những tùy chọn tối ưu trong câu truy vấn MySQL.

### 4. Chỉ sử dụng ORDER BY, DISTINCT and UNION khi thực sự cần thiết

- Sử dụng mà không có mục đích nào làm chậm câu truy vấn vì phải thực hiện việc sắp xếp dữ liệu. 
Thay vì sử dụng UNION nếu có thể nên sử dụng UNION ALL (kết hợp kết quả mà không xóa những cột trùng lặp) sẽ mang lại hiệu suất cao hơn.



### 5. Subqueries và Join

Theo lý thuyết thì mọi câu lệnh join đều có thể chuyển thành subqueris tuy nhiên bạn cũng nên cân nhắc nên sử dụng subqueries hay join trong từng trường hợp.

- Hiểu một các đơn giản là khi thực hiện câu lệnh JOIN ta sẽ tạo ra một bảng tạm là dữ liệu gộp của các bảng thỏa mãn mệnh đề ON và thực hiện **SELECT** dữ liệu trong bảng tạm đó.

- Subqueries là việc thực hiện câu lệnh **IN** trong dữ liệu từng bảng.
Vậy nên với dữ liệu <20K bản ghi thì việc thực hiện **JOIN** mang lại hiệu quả cao hơn hằn, khi dữ liệu >100k+ thì thực hiện câu lệnh **IN** mang lại kết quả tốt hơn.

# Tối ưu hóa cơ sở dữ liệu

### 6. Hiểu về bốn tài nguyên cơ bản

Cần 4 nguồn là CPU, disk, memory, network để tạo ra chức năng của cơ sở dữ liệu. Nếu bất kì nguồn tài nguyên nào không hoạt động đúng sẽ gây ảnh hưởng tới máy chủ cơ sở dữ liệu và dẫn tới hiệu suất kém. Trong hầu hết các trường hợp việc nâng cấp phần cứng có thể cải thiện được hiệu năng của hệ thống.

VD: Chọn ENGINE phù hợp với mục đích sử dụng

MYSQL hỗ trợ rất nhiều loại ENGINE ta có thể sử dụng câu lệnh dưới để hiển thị thông tin của từng kiểu ENGINE

```
mysql> SHOW ENGINES\G
*************************** 1. row ***************************
      Engine: InnoDB
     Support: DEFAULT
     Comment: Supports transactions, row-level locking, and foreign keys
Transactions: YES
          XA: YES
  Savepoints: YES
*************************** 2. row ***************************
      Engine: MRG_MYISAM
     Support: YES
     Comment: Collection of identical MyISAM tables
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 3. row ***************************
      Engine: MEMORY
     Support: YES
     Comment: Hash based, stored in memory, useful for temporary tables
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 4. row ***************************
      Engine: BLACKHOLE
     Support: YES
     Comment: /dev/null storage engine (anything you write to it disappears)
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 5. row ***************************
      Engine: MyISAM
     Support: YES
     Comment: MyISAM storage engine
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 6. row ***************************

```
Các loại ENGINE được sử dụng nhiều:
- InnoDB: 

    Hỗ trợ giao dịch (ACID compliant) commit, rollback. 

    Hỗ trợ khóa mức dòng (row-level locking), tăng hiệu năng và đa người dùng 
    
    Hỗ trợ toàn ràng buộc tham thiếu khóa ngoài FOREIGN KEY. InnoDB là kiểu lưu trữ ngầm định từ MySQL 5.5.5 

- MyISAM: 

    Được sử dụng phổ biến cho Web, kho dữ liệu (data warehousing), là kiểu lưu trữ ngầm định trong phiên bản trước MySQL 5.5.5

- Memory: 

    Lưu tất cả dữ liệu trong RAM, cho truy cập cực nhanh (Có tên gọi trước HEAP). 


**VD:** Chọn kiểu dữ liệu cho trường, kích cỡ của cache, ... một cách có tính toán, vì khi ta cấp bao nhiêu vùng nhớ thì cơ sở dữ liệu sẽ sử dụng bấy nhiêu tài nguyên mà chúng ta đưa dù nó không thực sự cần nhiều như thế.  Khi ta đặt kiểu cho trường tên thì thường chỉ để VARCHAR(255), ...

**VD:** Với những trường dữ liệu số như là ID ta thường đặt kiểu là INT (`id INT AUTO_INCREMENT PRIMARY KEY`) và coi đó là điều hiển nhiên không thể nào khác nhưng nếu suy nghĩ kỹ một chút thì ta có thể nhận ra rằng trường ID của chúng ta không bao giờ là số âm như vậy nếu chúng ta để là INT(4 bytes) trong khoảng -2147483648 đến 2147483647 hẳn nhiên là sẽ bị lãng phí phần lưu trữ âm để tận dụng thì ra có thể dử dụng (`id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY`) với INT UNSIGNED nằm trong khoảng 0 đến 4294967295.

### 7. Sử dụng bộ nhớ đệm 

![](https://images.viblo.asia/bfed07f6-2ef1-41f6-9c42-bba456efb6aa.png)

Khi nhận được một câu lệnh truy vấn từ người dùng thì SQL kiểm tra trong cache có kết quả của câu truy vấn hay không, nếu có thì sẽ trả về luôn cho người dùng mà không cần thực thi lại câu lệnh, nếu chưa có trong cache thì MySQL mới thực thi truy vấn vào trong cơ sở dữ liêu, sau đó lưu kết quả vào cache và trả kết quả cho người dùng.

- Dùng câu lệnh EXPLAIN để lấy thông tin về quá trình thực hiện một truy vấn của MySQL  để có chiến lược thực thi mang lại hiệu quả tốt nhất.

```
mysql> EXPLAIN SELECT * FROM app_productmessage WHERE content='asd';
+----+-------------+--------------------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table              | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+--------------------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | app_productmessage | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 1303 |    10.00 | Using where |
+----+-------------+--------------------+------------+------+---------------+------+---------+------+------+----------+-------------+
1 row in set, 1 warning (0.01 sec)

```

- Lưu lại những câu truy vấn cũng như kết quả của chúng. Query cache thích hợp với những bảng không thay đổi thường xuyên. Nếu một bảng thay đổi thì tất cả các cached query sử dụng bảng không còn sử dụng được và bị loại ra khỏi cache.

Mặc dù các giá trị có khả năng được truy xuất từ bộ nhớ (từ InnoDB buffer pool hoặc MyISAM key cache), sử dụng query cache tránh quá tải trong sử lý truy vấn, quyết định liệu có sử dụng quét bảng và xác định các khối dữ liệu cho mỗi dòng.

**Hiển thị các giá trị của cache**

Kiểm tra lại những giá trị của cache để điều chỉnh sao cho phù hợp với tài nguyên.

![](https://images.viblo.asia/a5f547ae-1cde-494f-bd01-d9b068437b81.png)

* query_cache_type: Xác định chế độ hoạt động của query cache
     * 0 hoặc OFF: Không lưu trữ các kết quả hoặc truy xuất các kết quả được lưư trữ
    * 1 hoặc ON: Cho phép lưu trữ trừ các câu lệnh bắt đầu với SELECT SQL_NO_CACHE. 
    * 2 hoặc DEMAND: Chỉ lưu trữ các kết quả bắt đầu SELECT SQL_CACHE. 

* query_cache_limit: Xác định kích thước lớn nhất cho một kết quả có thể lưu trong cache

* query_cache_size: Xác định dung lượng bộ nhớ phân phối cho các Query cache. Giá trị ngầm định của biến là 0, có nghĩa query caching không được bật

VD: Đặt lại lại giá trị cho biến
```
mysql> SET GLOBAL query_cache_size = 40000;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```


### 8. Xem thông tin các luồng đang thi hành

Có thể xem những công việc MySQL servert đang thi hành để xác định các điểm tắc. Kiểm tra danh sách các luồng đang thi hành trong server:

```
mysql> SHOW FULL PROCESSLIST;
+------+------+-----------------+------------+---------+-------+----------+-----------------------+
| Id   | User | Host            | db         | Command | Time  | State    | Info                  |
+------+------+-----------------+------------+---------+-------+----------+-----------------------+
|  576 | root | localhost       | voicetokyo | Sleep   | 23467 |          | NULL                  |
| 1325 | root | localhost       | voicetokyo | Sleep   |  5612 |          | NULL                  |
| 1333 | root | localhost       | voicetokyo | Query   |     0 | starting | SHOW FULL PROCESSLIST |
| 1334 | root | localhost:52500 | voicetokyo | Sleep   |  4193 |          | NULL                  |
| 1335 | root | localhost:52502 | voicetokyo | Sleep   |  4185 |          | NULL                  |
+------+------+-----------------+------------+---------+-------+----------+-----------------------+
5 rows in set (0.00 sec)
```

Để hủy một tiến trình đang thi hành không hiệu quả ta có thể sử dụng câu lệnh
```
KILL <ID_PROCESS>
```

### 9. Transaction
- Sử dụng các transaction, ngắn giúp tăng hiệu năng, giảm nguy cơ deadlock, mang lại độ chính xác. Tuy nhiên hiệu năng với độ chính xác lại không đi cùng đường với nhau :)).
- Có thể xem xét sử dụng READ UNICOMMITED nếu không cần dữ liệu quá chính xác (mức độ cô lập giữa các transaction càng cao thì hiệu năng sẽ giảm) để tăng hiệu năng thực thi truy vấn vào cơ sở dữ liệu
- Với bảng MyISAM không không hỗ trợ transaction thì ta sử dụng cơ chế khóa bảng

    `LOCK TABLEs <table name> READ/WRITE`
    
    * READ: các kết nối khác có đọc những không thể ghi vào bảng
    
    * WRITE: Kết nối hiện tại có thể ghi + đọc bảng, các kết nối khác không thể truy cập tới bảng
    
###  10. Tối ưu hóa bảng

Câu lệnh **OPTIMIZE TABLE** thực hiện một số chức năng như chống phân mảnh, sắp xếp các chỉ mục của các bảng.
OPTIMIZE TABLE thực hiện các tác vụ sau:
- Tạo một bảng tạm 
- Xóa bản gốc sau khi tối ưu hóa nó (Thu nhỏ các trang dữ liệu, Thu hẹp các trang chỉ mục, Tính toán thống kê chỉ mục mới)
- Cuối cùng, đổi tên bảng tạm thành tên ban đầu.

### 11. Lưu những truy vấn chậm

Với những truy vấn có thời gian thực thi mà ta lại đợi nó thực thi xong mới thực thi được các tác vụ khác thì quả thực là 'gãy' cách tốt nhất là ta nên lưu những truy vấn này lại để có thể tiếp tục được các hành động khác.

**Ví dụ:** những tác vụ có tính thống kê thường tốn rất nhiều thời gian thì ra có thể lưu truy vấn thống kê kèm một thông báo đang xử lý và người dùng có thể thực hiện các tác vụ khác, khi truy vấn thực hiện xong thì thông báo lại cho người dùng)

Kiểm tra lại các giá trị được cấu hình phù hợp chưa.

```
mysql> SHOW GLOBAL VARIABLES LIKE 'slow\_%';
+---------------------+------------------------------------+
| Variable_name       | Value                              |
+---------------------+------------------------------------+
| slow_launch_time    | 2                                  |
| slow_query_log      | OFF                                |
| slow_query_log_file | /var/lib/mysql/i120915-pc-slow.log |
+---------------------+------------------------------------+

```
```

	log-slow-queries[=<path/filename>] 
    long_query_time=<time-in-seconds> 
```

- long_query_time = [value] :

    Giá trị này sẽ quy định rằng nếu 1 query tốn nhiều thời gian để thực thi hơn số thời gian mà mình quy định ở phần cấu hình này thì MySQL sẽ ghi log lại thông tin liên quan đến query đó. Ở đây mình để nó là số “1“, nên cũng gần như là ghi lại hết các slow query tốn thời gian thực thi hơn 1 giây. Mặc định là giá trị “10” tức 10 giây.

- slow_query_log = [0/1]

    Nếu giá trị là “0” thì là tắt tính năng log slow query, còn “1” là kích hoạt chức năng này. Mặc định là MySQL tắt tính năng.


### 12. Đánh chỉ mục
Nên đánh chỉ mục khi:
- Cột xuất hiện nhiều trong mệnh đề WHERE/JOIN
- MySQL tự động đánh chỉ mục cho khóa chính và khóa ngoại

Không nên
- Không nên đánh cho những cột chỉ xuất hiện trong select, không tạo chỉ mục bữa bãi
- Các cột có miền giá trị nhỏ (MySQL thực hiện đánh giá nêu 1 giá trị xuất hiện >= 30% trong bảng thì sẽ không tự động đánh chỉ mục)

Loại chỉ mục
- Hash index: rất nhanh với so sánh chính xác, nhưng chậm với so sánh giá trị trong khoảng giá trị.
- B-tree index: sử dụng hiệu quả với cả so sánh chính xác, khoảng. Có thể sử dụng cho tìm kiếm LIKE (nếu không bắt đầu bằng wildcard)