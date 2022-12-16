`EXPLAIN` được sử dụng để thu được kế hoạch thực thi truy vấn, hay MySQL sẽ thực thi truy vấn của chúng ta như thế nào. Nó hoạt động với các mệnh đề `SELECT`, `DELETE`, `INSERT`, `REPLACE`, và `UPDATE`, và nó hiển thị thông tin từ trình tối ưu hóa về kế hoạch thực thi câu truy vấn. Tài liệu chính thức của Mysql giải thích rất rõ `EXPLAIN` có thể giúp chúng ta như thế nào:
```
With the help of EXPLAIN, you can see where you should add indexes to tables so that the statement executes faster by using indexes to find rows.
You can also use EXPLAIN to check whether the optimizer joins the tables in an optimal order.
```
Để minh họa cách sử dụng của `EXPLAIN`, tôi sẽ sử dụng câu truy vấn sau:
```
SELECT * FROM `homestead`.`users` WHERE email = 'claudio.ribeiro@examplemail.com';
```
Để sử dụng lệnh `EXPLAIN`, ta đơn giản chỉ cần đặt nó trước câu truy vấn:
```
EXPLAIN SELECT * FROM `homestead`.`users` WHERE email = 'claudio.ribeiro@examplemail.com';
```
Và đây là kết quả:


| id       | select_type | table    | partitions | type  | possible_keys          | key                    | key_len | ref    | rows  | filtered | Extra | 
| -------- | ----------- | -------- | ---------- | ----- | ---------------------- | ---------------------- | ------- | ------ | ----- | -------- | ----- |
| 1        | SIMPLE      | ‘users’  | NULL       |‘const’| ‘UNIQ_1483A5E9E7927C74’|	‘UNIQ_1483A5E9E7927C74’| ‘182’   | ‘const’| 100.00| NULL     |       |

Mới nhìn qua thì kết quả mà ta nhận được từ `EXPLAIN` thật khó hiểu, vì vậy hãy xem xét lần lượt từng giá trị:
* `id`: Đây đơn giản chỉ là id định danh cho mỗi truy vấn trong mệnh đề `SELECT`.
* `select_type`: Kiểu của truy vấn `SELECT`. Trường này có một số giá trị khác nhâu, tuy nhiên chúng ta chỉ tập trung vào những giá trị quan trọng nhất:
    * `SIMPLE`: Một truy vấn đơn không có subqueries hay unions
    * `PRIMARY`: Câu `SELECT` ở ngoài cùng của truy vấn trong mội phép `JOIN`
    * `DERIVED`: Câu `SELECT` là một phần của subquery nằm trong mệnh đề `FROM'
    * `SUBQUERY`: Câu `SELECT` đầu tiên trong một subquery.
    * `UNION`: Câu `SELECT` từ thứ 2 trở đi trong một phép `union`.
Tất cả giá trị cảu `select_type` có thể tìm thấy ở [đây](https://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_select_type)
* `table`: Bảng được tham chiếu bởi hàng kết quả đang xét.
* `type`: trường này thể hiện cách MySQL joins các bảng. Đây có thể coi là trường quan trọng nhất trong kết quả của `explain`. Nó có thể chỉ ra các `index` bị thiếu và nó cũng có thể cho thấy câu truy vấn nên được viết lại như thế nào. Các giá trị có thể có của trường này là: (sắp xếp từ tốt nhất cho tới tệ nhất):
    * `system`: bảng có 0 hoặc 1 hàng.
    * `const`: bảng chỉ có 1 hàng phù hợp được đánh index. Đây là kiểu `join` nhanh nhất.
    * `eq_ref`: tất cả index được sử dụng để `join` và index là `PRIMARY_KEY` hoặc `UNIQUE NOT NULL`. 
    * `ref`: tất cả các hàng phù hợp của một cột index được đọc cho mỗi sự kết hợp các hàng từ bảng trước đó. Kiểu join này thường xảy ra với các cột được so sánh với toán tử `=` hoặc `<=>`.
    * `fulltext`: phép join các bảng sử dụng FULLTEXT index.
    * `ref_or_null`: loại này giống với `ref` nhưng chứa cả những hàng chứa giá trị NULL.
    * `index_merge`: phép join sử dụng một danh sách các index để đưa ra tập kết quả. Cột `KEY` của mệnh đề `explain` sẽ chứa các key được sử dụng.
    * `unique_subquery`: một IN subquery trả về chỉ 1 kết quả từ bảng và sử dụng primary key.
    * `range`: một index được sử dụng để tìm các hàng phù hợp trong một khoảng xác định.
    * `index`: toàn bộ cây index được quét để tìm ra các hàng phù hợp.
    * `all`: cả bảng được quét để tìm ra các hàng phù hợp của phép join. Đây là kiểu join tệ nhất và thường cho thấy việc thiếu các index trên các bảng.
* `possible_keys`: hiển thị các khóa có thể được sử dụng bới MySQL để tìm ra các hàng từ các bảng. Các khóa này có thể hoặc không được sử dụng trong thực tế.
* `keys`: cho biết các index thực sự được sử dụng bới MySQL. MySQL luôn luôn tìm kiếm một khóa tối ưu có thể được sử dụng cho truy vấn. Khi join nhiều bảng, nó có thể tìm ra một số khóa không được liệt kê trong `possible_keys` nhưng tối ưu hơn.
* `key_len`: hiển thị độ dài của index trình tối ưu hóa truy ván chọn để sử dụng.
* `ref`: Hiển thị các cột hoặc các hằng số được so sánh với index được đặt tên trong cột `key`.
* `rows`: liệt kê số lượng các bản ghi được quét để có được đầu ra. Đây là một chỉ số rất quan trọng; càng ít bản ghi được kiểm tra thì càng tốt.
* `Extra`: chứa thông tin bổ sung. Các giá trị như 'Using filesort' hay 'Using temporary' có thể chỉ ra một truy vấn không cần thiết.

Tài liệu đầy đủ về định dạng đầu ra của mệnh đề `EXPLAIN` có thể được tìm thấy ở [trang chủ của MySQL](https://dev.mysql.com/doc/refman/5.5/en/explain-output.html) 

Quay lại với câu truy vấn đơn giản mà tôi đã viết ở trên, nó có kiểu select là 'SIMPLE' và kiểu join là 'const'. Đây là trường hợp truy vấn tốt nhất mà ta có thể có. Nhưng điều gì xảy ra khi ta cần câu truy vấn lớn và phức tạp hơn?

Xem xét truy vấn sau:
```
SELECT gal.name, gal.description, img.filename, img.description FROM `homestead`.`users` AS users
LEFT JOIN `homestead`.`galleries` AS gal ON users.id = gal.user_id
LEFT JOIN `homestead`.`images` AS img on img.gallery_id = gal.id
WHERE img.description LIKE '%dog%';
```
Hãy thử `EXPLAIN` câu truy vấn trên:
```
EXPLAIN SELECT gal.name, gal.description, img.filename, img.description FROM `homestead`.`users` AS users
LEFT JOIN `homestead`.`galleries` AS gal ON users.id = gal.user_id
LEFT JOIN `homestead`.`images` AS img on img.gallery_id = gal.id
WHERE img.description LIKE '%dog%';
```
Và đây là kết quả:

| id       | select_type | table    | partitions | type  | possible_keys                                       | key                     | key_len | ref   | rows  | filtered    | Extra | 
| -------- | ----------- | -------- | ---------- | ----- | --------------------------------------------------- | ----------------------- | ------- | ----- | ----- | ----------  | ----- |
| 1        | SIMPLE      | ‘users’  | NULL       |‘index’| ‘PRIMARY,UNIQ_1483A5E9BF396750’                     |‘UNIQ_1483A5E9BF396750’	| ‘108’   | NULL  | 100.00|‘Using index’|      |
| 1        | SIMPLE      | ‘gal’    | NULL       |‘ref’  | ‘PRIMARY,UNIQ_F70E6EB7BF396750,IDX_F70E6EB7A76ED395’|‘UNIQ_1483A5E9BF396750’  | ‘108’   | ‘homestead.users.id’	  | 100.00|NULL|     | 
| 1        | SIMPLE      | ‘img’    | NULL       |‘ref’  | ‘IDX_E01FBE6A4E7AF8F’                               |‘IDX_E01FBE6A4E7AF8F’  | ‘109’   | ‘homestead.gal.id’  | ‘25.00’|‘Using where’|     | 

Hãy xem xét kỹ hơn và xem chúng ta có thể cải thiện những gì trong câu truy vấn trên.

Như ta đã thấy trước đây, cột chính mà ta nên quan sát đầu tiên là cột `type` và cột `rows`. Mục tiêu là làm sao để có được giá trị tốt hơn trong cột `type` và giảm được nhiều nhất có thể số lượng trên cột `rows`.

Kết quả trên truy vấn đầu tiên là `type` 'index' và nó không phải là một kết quả tốt. Điều đó có nghĩa là ta có thể cải thiện nó.

Xem xét câu truy vấn, có hai cách tiếp cận. Đầu tiên, bảng 'users' không được sử dụng. Bảng 'users' trong câu truy vấn nên được bỏ đi. Nó chỉ làm cho câu truy vấn trở nên phức tạp và tiêu tốn thêm thời gian.
```
SELECT gal.name, gal.description, img.filename, img.description FROM `homestead`.`galleries` AS gal
LEFT JOIN `homestead`.`images` AS img on img.gallery_id = gal.id
WHERE img.description LIKE '%dog%';
```
Và đây là kết quả thu được sau khi `EXPLAIN` truy vấn trên:
| id       | select_type | table    | partitions | type  | possible_keys                                       | key                     | key_len | ref   | rows  | filtered    | Extra | 
| -------- | ----------- | -------- | ---------- | ----- | --------------------------------------------------- | ----------------------- | ------- | ----- | ----- | ----------  | ----- |
| 1        | SIMPLE      | ‘gal’  | NULL       |‘ALL’| ‘PRIMARY,UNIQ_1483A5E9BF396750’                     |NULL	| NULL   | NULL  | 100.00|NULL|      |
| 1        | SIMPLE      | ‘img’  | NULL       |‘ref’| ‘IDX_E01FBE6A4E7AF8F’                  |‘IDX_E01FBE6A4E7AF8F’	| ‘109’   | ‘homestead.gal.id’	  | ‘25.00’|‘Using where’|      |
Bây giờ kết quả của `EXPLAIN` chỉ còn hai hàng, tuy nhiên có một hàng có `type` là 'ALL'. Mặc dù 'ALL' là loại join tệ nhất, có những lúc nó là lựa chọn duy nhất. 

Còn một điều cuối cùng mà ta có thể cải thiện. Vì ta đang sử dụng `LIKE` và nó không sử dụng index, do đó ta có thể thêm `FULLTEXT` index vào trường 'img.description'. Bằng cách này, ta có thể thay thế `LIKE` thành `match()` và cải thiện hiệu suất. Thông tin về `FULLTEXT` index có thể tìm thấy ở [đây](https://dev.mysql.com/doc/refman/5.6/en/innodb-fulltext-index.html)

Ngoài ra còn hai trường hợp khá thú vị ta cần xem xét:
```
EXPLAIN SELECT * FROM `homestead`.`galleries` AS gal
LEFT JOIN `homestead`.`users` AS u ON u.id = gal.user_id
WHERE u.id = 1
ORDER BY gal.created_at DESC
LIMIT 5;
```
```
EXPLAIN SELECT * FROM `homestead`.`galleries` AS gal
ORDER BY gal.created_at DESC
LIMIT 5;
```
Nhìn thoáng qua thì ta có thể thấy là các truy vấn này sẽ rất nhanh vì nó sử dụng `LIMIT`. Tuy nhiên, thật không may là 2 câu truy vấn trên lại sử dụng `ORDER BY`. Vì sao lại tồi tệ khi sử dụng `ORDER BY`, hãy thử `EXPLAIN`:
| id       | select_type | table    | partitions | type  | possible_keys                                       | key                     | key_len | ref   | rows  | filtered    | Extra | 
| -------- | ----------- | -------- | ---------- | ----- | --------------------------------------------------- | ----------------------- | ------- | ----- | ----- | ----------  | ----- |
| 1        | SIMPLE      | ‘gal’  | NULL       |‘ALL’| ‘IDX_F70E6EB7A76ED395’                     |NULL	| NULL   | NULL  | 100.00|‘Using where; Using filesort’|      |
| 1        | SIMPLE      | ‘u’  | NULL       |‘eq_ref’| ‘PRIMARY,UNIQ_1483A5E9BF396750’                 |‘PRIMARY’	| ‘108’   | ‘homestead.gal.id’	  | ‘100.00’|NULL|      |
và
| id       | select_type | table    | partitions | type  | possible_keys                                       | key                     | key_len | ref   | rows  | filtered    | Extra | 
| -------- | ----------- | -------- | ---------- | ----- | --------------------------------------------------- | ----------------------- | ------- | ----- | ----- | ----------  | ----- |
| 1        | SIMPLE      | ‘gal’  | NULL       |‘ALL’| NULL                    |NULL	| NULL   | NULL  | 100.00|‘Using filesort’|      |
Có thể thấy, ta có trường hợp tệ nhất của loại join: `ALL`. Việc sử dụng `ORDER BY` của MySQL, đặc biệt cùng với `LIMIT` thường là nguyên nhân gây ra các vấn đề về hiệu năng MySQL.
## Kết luận
Như đã thấy, `EXPLAIN` có thể rất hữu ích để phát hiện sớm các vấn đề trong truy vấn của chúng ta. Có rất nhiều vấn đề mà chúng ta chỉ nhận thấy khi ứng dụng được đưa lên môi trường production và có một lượng lớn dữ liệu. Nếu những điều này có thể phát hiện sớm nhờ `EXPLAIN`, ta có thể giảm được đáng kể các vấn đề về hiệu suất trong tương lai.
## Tham khảo
* [https://www.sitepoint.com/mysql-performance-indexes-explain/](https://www.sitepoint.com/mysql-performance-indexes-explain/)
* [ftp://203.157.240.9/pub/docs/High.Performance.MySQL.3rd.Edition.pdf](ftp://203.157.240.9/pub/docs/High.Performance.MySQL.3rd.Edition.pdf)