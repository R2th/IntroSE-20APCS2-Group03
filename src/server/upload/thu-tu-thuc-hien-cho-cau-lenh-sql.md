### 1. Mở đầu:
Như chúng ta biết câu lệnh SELECT dùng để truy vấn dữ liệu trong SQL server. Nhưng chúng ta có thật sự controll thứ tự thực hiện của các từ khóa trong câu truy vấn chưa. Việc biết được thứ tự thực hiện trước sau của các thành phần trong câu query sẽ giups chúng ta rất lớn trong qua trình design ra câu query sao cho tối ưu (đẹp, ngắn và perfermonce tốt). Sau đây tôi sẽ cung cấp cho các bạn thứ tự thực hiện của các thành phần trong một câu truy vấn SQL.

### 2. Cú pháp:
Cú pháp đầy đủ của câu lệnh SELECT rất phức tạp, nhưng các mệnh đề chính có thể được tóm tắt như sau:

 ```SQL
 [ WITH { [ XMLNAMESPACES ,] [ <common_table_expression> ] } ]

SELECT select_list [ INTO new_table ]

[ FROM table_source ] [ WHERE search_condition ]

[ GROUP BY group_by_expression ]

[ HAVING search_condition ]

[ ORDER BY order_expression [ ASC | DESC ] ]
 ```
 Các toán tử UNION, EXCEPT và INTERSECT có thể được sử dụng giữa các truy vấn để kết hợp hoặc so sánh kết quả của chúng thành một tập kết quả.
 
 ### 3. Trình tự xử lý logic của câu lệnh SELECT:
 
Các bước sau đây cho thấy thứ tự xử lý logic hoặc thứ tự ràng buộc cho câu lệnh SELECT. Thứ tự này xác định khi các đối tượng được xác định trong một bước được cung cấp cho các mệnh đề trong các bước tiếp theo. Ví dụ: nếu bộ xử lý truy vấn có thể liên kết với các TABLE hoặc VIEWS được xác định trong mệnh đề FROM, các đối tượng này và các cột của chúng được cung cấp cho tất cả các bước tiếp theo. Ngược lại, vì mệnh đề SELECT là bước 8, nên bất kỳ column aliases or derived columns nào được xác định trong mệnh đề đó đều không thể được tham chiếu bởi các mệnh đề trước. Tuy nhiên, chúng có thể được tham chiếu bởi các mệnh đề tiếp theo như mệnh đề ORDER BY. Việc thực thi vật lý thực tế của câu lệnh được xác định bởi bộ xử lý truy vấn và thứ tự có thể thay đổi từ danh sách này.

1. FROM
2. ON
3. JOIN
4. WHERE
5. GROUP BY
6. WITH CUBE or WITH ROLLUP
7. HAVING
8. SELECT
9. DISTINCT
10. ORDER BY
11. TOP

 ### 4. Lưu ý:
 
Trình tự trước thường đúng. Tuy nhiên, có những trường hợp không phổ biến trong đó trình tự có thể khác nhau.

Ví dụ: giả sử bạn có một clustered index trên a view và view loại trừ một số hàng trong table và danh sách column select của view sử dụng một CONVERT thay đổi một kiểu dữ liệu từ varchar thành số nguyên. Trong tình huống này, CONVERT có thể thực thi trước khi mệnh đề WHERE. Thật sự không phổ biến. Thường có một cách để sửa đổi để tránh thay đổi thứ tự thực thi của câu truy vấn.