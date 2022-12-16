Việc thao tác với database đã trở thành rất thân thuộc đối với các developer. Tuy nhiên, để chương trình chạy hiệu quả, hiệu suất tốt thì không phải ai cũng làm được. Sau đây là một số tips giúp phần nào có thể cải thiện hiệu năng trong việc thiết kế  và xây dựng database, đặc biệt là mysql.
# Không ẩn trong hàm
Một sai lầm phổ biến là ẩn một cột được lập index bên trong một lời gọi hàm. Ví dụ sau cho thấy chỉ mục sẽ không được sử dụng:
```
WHERE DATE(dt) = '2000-01-01'
```
thay vào đó, để sử dụng được INDEX (dt) thì chúng có thể sử dụng như sau:
```
WHERE dt = '2000-01-01' -- if `dt` is datatype `DATE`
```
nếu cột dt là một trong các kiểu DATE, DATETIME, TIMESTAMP,hay thậm chí là DATETIME(6) (microseconds) thì ta sử dụng:
```
WHERE dt >= '2000-01-01'
 AND dt < '2000-01-01' + INTERVAL 1 DAY
```
# Sử dụng OR
Nhìn chung 'OR' giết chết sự tối ưu hóa
```
WHERE a = 12 OR b = 78
```
không thể sử dụng INDEX (a, b),và có thể hoặc không thể sử dụng INDEX (a), INDEX (b) qua  "index merge"."Index merge" vẫn tốt hơn là không có.
```
WHERE x = 3 OR x = 5
```
được biến thành
```
WHERE x IN (3, 5)
```
để có thể sử dụng index với x trong nó.
# Thêm index chính xác
Đây là một chủ đề lớn,nhưng đây cũng là vấn đề quan trọng về "performance"
Bài học chính đề cập ở đây là "composite" indexes.Sau đây là ví dụ:
```
INDEX(last_name, first_name)
```
là rất tuyệt vời cho:
```
WHERE last_name = '...'
WHERE first_name = '...' AND last_name = '...' 
```
nhưng không dành cho
```
WHERE first_name = '...' 
WHERE last_name = '...' OR first_name = '...' -- "OR" is a killer
```
# Có một index:
Điều quan trọng nhất để tăng tốc truy vấn trên bất kỳ bảng không nhỏ nào là có index phù hợp
```
WHERE a = 12 --> INDEX(a)
WHERE a > 12 --> INDEX(a)
WHERE a = 12 AND b > 78 --> INDEX(a,b) is more useful than INDEX(b,a)
WHERE a > 12 AND b > 78 --> INDEX(a) or INDEX(b); no way to handle both ranges
ORDER BY x --> INDEX(x)
ORDER BY x, y --> INDEX(x,y) in that order
ORDER BY x DESC, y ASC --> No index helps - because of mixing ASC and DESC
```
# Subqueries:
Các truy vấn phụ có nhiều hương vị và chúng có tiềm năng tối ưu hóa khác nhau. Đầu tiên, lưu ý rằng truy vấn phụ có thể
hoặc là "tương quan" hoặc "không tương quan". Tương quan có nghĩa là chúng phụ thuộc vào một số giá trị từ bên ngoài
truy vấn phụ. Điều này thường ngụ ý rằng truy vấn con phải được đánh giá lại cho mỗi giá trị bên ngoài
Truy vấn con tương quan này thường khá tốt. Lưu ý: Nó phải trả về tối đa 1 giá trị. Nó thường hữu ích như một
thay thế cho, mặc dù không nhất thiết phải nhanh hơn, một LEFT JOIN
```
SELECT a, b, ( SELECT ... FROM t WHERE t.x = u.x ) ASC
 FROM u ...
SELECT a, b, ( SELECT MAX(x) ... ) ASC
 FROM u ...
SELECT a, b, ( SELECT x FROM t ORDER BY ... LIMIT 1 ) ASC
 FROM u ...
```
Điều này thường không tương quan:
```
SELECT ...
 FROM ( SELECT ... ) AS a
 JOIN b ON ...
```
Lưu ý về FROM-SELECT:
* Nếu nó trả về 1 hàng, tuyệt vời.
* Nếu nó trả về nhiều hàng và JOIN cũng là (SELECT ...) với nhiều hàng, thì hiệu quả có thể rất tồi tệ.
# JOIN + GROUP BY:
Một vấn đề phổ biến dẫn đến một truy vấn không hiệu quả là thực hiện truy vấn như thế này:
```
SELECT ...
 FROM a
 JOIN b ON ...
 WHERE ...
 GROUP BY a.id
```
Đầu tiên, **JOIN** mở rộng số hàng; sau đó **GROUP BY** giảm nó trở lại xuống số lượng hàng trong a.
Có thể không có bất kỳ sự lựa chọn tốt nào để giải quyết vấn đề phát sinh này. Một lựa chọn có thể là để biến THAM GIA
vào một truy vấn con tương quan trong SELECT. Điều này cũng giúp loại bỏ GROUP BY.
# Đặt bộ nhớ cache chính xác:
innodb_buffer_pool_size nên có khoảng 70% RAM có sẵn.
# Phủ định:
Dưới đây là một số điều không có khả năng giúp về hiệu năng. Chúng xuất phát từ thông tin lỗi thời và / hoặc ngây thơ:
* InnoDB đã được cải thiện đến mức mà MyISAM không thể tốt hơn.
* PARTITIONing hiếm khi cung cấp các lợi ích hiệu suất; nó thậm chí có thể làm tổn thương hiệu suất.
* Việc đặt query_cache_size lớn hơn 100M thường sẽ làm tổn thương hiệu suất.
* Việc tăng nhiều giá trị trong my.cnf có thể dẫn đến 'swapping', đó là một vấn đề hiệu suất nghiêm trọng.
* "Prefix indexes" (chẳng hạn như INDEX(foo(20))) thường vô dụng.
* OPTIMIZE TABLE hầu như luôn vô dụng. (Và nó liên quan đến việc khóa bàn.)
# Kết luận:
Nhìn chung, để hiệu năng đạt kết quả cao cần phải có nhiều kinh nghiệm làm việc cùng với học hỏi từ người đã có kinh nghiệm làm việc với database.VỚi bài viết này,mình mong có thể giúp phần nào cải thiện hiểu năng trong việc xây dựng database.