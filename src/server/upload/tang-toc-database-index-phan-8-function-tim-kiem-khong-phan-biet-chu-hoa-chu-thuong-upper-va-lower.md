Các bạn có thể xem đầy đủ các phần tại [đây](https://viblo.asia/s/lam-sao-de-trang-web-chay-nhanh-DVK2jDrnKLj) nhé

Nếu các bạn chưa đọc bài trước có thể đọc tại link này [Tăng tốc database index phần 7 -Index chậm 2](https://viblo.asia/p/tang-toc-database-index-phan-7-index-cham-2-GrLZDBon5k0)

Phần này trong thực tế mình không gặp, do mình luôn để collation trong DB là Case-Insensitive, tuy nhiên vì mình dịch từ bài gốc của tác giả nên mình sẽ dịch luôn và không cắt gọt. 
Biết đâu có lúc nào đó lại thiết kế db Case-Sensitive thì sao. Lúc đó có thể dùng được chỗ này. Trong trường hợp database thiết kế có phân biệt hoa thường, mà cần truy vấn không phân biệt hoa thường, cách thông thường sẽ truy vấn như thế này.

```
SELECT first_name, last_name, phone_number
  FROM employees
 WHERE UPPER(last_name) = UPPER('winand')
```

Phải UPPER cả hai bên để cho dù có viết hoa hết, hay viết hoa chữ đầu, hay viết Hoa thế nào đi nữa thì cũng giống nhau.

Execution plan sẽ như thế này

```
----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |   10 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |   10 |  477 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - filter(UPPER("LAST_NAME")='WINAND')
```

Nó lại quay lại với full table scan, dù ta có đánh index ở trường LAST_NAME. Index này không dùng được vì nó đánh trên LAST_NAME chứ không phải trên UPPER(LAST_NAME). Với góc nhìn của database hai điều này là hoàn toàn khác nhau.

Chúng ta rất dễ dính lỗi này, có thể lỗi UPPER LOWER thì ít nhưng mình thấy nhiều bạn hay dùng mấy hàm so sánh ngày bằng hàm DATE(), hoặc tháng năm bằng hàm MONTH(), YEAR(). Những hàm này không được index nên có thể gây ra vấn đề hiệu năng. Cách khắc phục là so sánh BETWEEN với thời gian đầu ngày với và cuối ngày (Tương tự với tháng năm). Con người thì nhận ra mỗi liên quan giữa LAST_NAME và UPPER(LAST_NAME) và nghĩ rằng database cũng nhận ra. Tuy nhiên trong thực tế trình tối ưu sẽ nhìn thấy kiểu như thế này 

```
SELECT first_name, last_name, phone_number
  FROM employees
 WHERE BLACKBOX(...) = 'WINAND'
```

Hàm UPPER là một cái hộp đen (BLACKBOX) tham số và hàm không liên quan tới nhau bởi vì không có mối liên hệ nào giữa tham số và kết quả của hàm.

> Compile Time Evaluation
> 
> Trình tối ưu có thể đánh giá phần bên phải của biểu thức (UPPER('winand')) trong thời gian biên dịch (compile time) bởi vì nó có đủ các tham số, do tham số truyền vào có giá trị không đổi chứ không như phần bên trái tùy thuộc vào dữ liệu.   Oracle execution plan (trong phần “Predicate Information” ) vì thế chỉ show kết quả sau khi upper của từ khóa tìm kiếm ('WINAND'). Điều này cũng như trình biên dịch dịch các hằng số trong compile time, sẽ nhét luôn giá trị hằng số vào trong code.

Để xử lý trường hợp này, chúng ta cần một index có thể áp dụng được cho các trường hợp tìm kiếm thực tế. Nghĩa là không cần index trên trường LAST_NAME mà cần index trên UPPER(LAST_NAME).

```
CREATE INDEX emp_up_name 
    ON employees (UPPER(last_name))
```

Các index được định nghĩa trên hàm hoặc biểu thức được gọi là **function-based index(FBI).** Thay vì copy dữ liệu trực tiếp lên index function-based thực hiện function trước rồi lấy kết quả gán lên index. Kết quả là index lưu trữ tên với định dạng chữ IN HOA.

Database có thể sử dụng function-based index nếu chính xác hàm hoặc biểu thức xuất hiện trong câu truy vấn. Trong ví dụ trên execution plan sẽ là
```

--------------------------------------------------------------
|Id |Operation                   | Name        | Rows | Cost |
--------------------------------------------------------------
| 0 |SELECT STATEMENT            |             |  100 |   41 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |  100 |   41 |
|*2 |  INDEX RANGE SCAN          | EMP_UP_NAME |   40 |    1 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  2 - access(UPPER("LAST_NAME")='WINAND')
```

Kết quả là sử dụng INDEX RANGE SCAN, như đã nói ở phần [trước](https://viblo.asia/p/tang-toc-database-index-phan-4-index-cham-RnB5pOOrlPG)  Database sẽ duyệt trên B-Tree và Index để lấy kết quả. Không có cú pháp riêng nào với function-based index này.

> Thỉnh thoảng ORM tool tự thêm UPPER và LOWER mà developer không biết. Ví dụ Hibernate tự thêm [lower case ](https://use-the-index-luke.com/sql/myth-directory/dynamic-sql-is-slow#myth-dynamic-sql-sample)vào khi tìm kiếm không phân biệt hoa thường.

Execution plan vẫn không giống với bài trước khi không có UPPER, số lượng row được ước tính quá cao. Đặc biệt lạ là trình tối ưu ước tính lấy nhiều dòng dữ liệu trong bảng hơn với số lượng dòng lấy được từ index. Làm thế nào trả về 100 dòng từ bảng khi chỉ có 40 khi tìm trên index? Câu trả lời là nó không thể, việc ước tính sai lầm thế này thường là do statistic có vấn đề. Trong trường hợp này là do Oracle không cập nhật lại statistic khi thêm mới index.

> Oracle Statistics for Function-Based Indexes
> 
> Oracle database thường duy trì thông tin về các giá trị đơn nhất (distinct value) của các cột trong bảng như một tiêu chí thống kê, những số liệu này được sử dụng lại nếu column là một phần của nhiều index.Statistics của function-based index (FBI) cũng được giữ trên bảng như một cột ảo. Mặc dù Oracle update *index statistics* khi có index mới một cách tự động ([từ bản 10g)](https://docs.oracle.com/cd/B14117_01/server.101/b10763/compat.htm#sthref320), nhưng nó không update *table statistics*. Vì lý do này Oracle khuyến cáo update table statistics  sau khi tạo function-based index
> 
> *After creating a function-based index, collect statistics on both the index and its base table using the DBMSSTATS package. Such statistics will enable Oracle Database to correctly decide when to use the index* [Oracle Database SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/12.2/sqlrf/CREATE-INDEX.html#GUID-1F89BBC0-825F-4215-AF71-7588E31D8BFE)
> 
> Cá nhân tôi còn khuyến nghị xa hơn, sau khi index thay đổi hãy update statistic của cả table và tất cả các index của nó. Tuy nhiên nó có thể dẫn tới những tác dụng phụ không mong muốn, nên làm điều này cùng với DBA và backup statistic ban đầu.

Sau khi cập nhật statistic database estimate chuẩn hơn

```
--------------------------------------------------------------
|Id |Operation                   | Name        | Rows | Cost |
--------------------------------------------------------------
| 0 |SELECT STATEMENT            |             |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_UP_NAME |    1 |    1 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  2 - access(UPPER("LAST_NAME")='WINAND')
```

Mặc dù cập nhật statistic không giúp cải thiện hiệu năng trong trường hợp này, (index vẫn được dùng đúng) nhưng nó giúp ta kiểm tra ước lượng của trình tối ưu hóa, số dòng cần xử lý cho mỗi Operation cũng là một con số quan trọng trong execution plan của SQLServer và PostgreSQL. (Phần execution plan mình sẽ nói sau, nếu muốn đọc tiếng anh có thể xem tại [đây](https://use-the-index-luke.com/sql/explain-plan))

SQL Server và MySQL không hỗ trợ FBI nhưng chúng ta có thể đánh index trên computed hoặc generated column. Để thực hiện cần thêm một computed column  mới và đánh index trên cột đó

MYSQL
```
ALTER TABLE employees
  ADD COLUMN last_name_up VARCHAR(255) AS (UPPER(last_name));
CREATE INDEX emp_up_name ON employees (last_name_up);
```

SQL Server
```
ALTER TABLE employees ADD last_name_up AS UPPER(last_name)
CREATE INDEX emp_up_name ON employees (last_name_up)
```

Trong trường hợp này index có thể được sử dụng cả với trường last_name_up trong query và UPPER(last_name) trong query (trình tối ưu sẽ thấy hàm UPPER() này giống với cột mới thêm được đánh index nên sẽ truy vấn theo cột đó). Tuy nhiên đôi khi phải sửa câu truy vấn thành cột mới để có thể ăn được index, cần kiểm tra execution plan nếu có nghi ngờ, tốt nhất là cứ dùng cột mới query cho nó chắc cú.

Bài hôm nay đến đây là hết rồi, phần sau mình sẽ trình bày tiếp về User-Defined Functions nhé!
Link bài sau [Tăng tốc database index phần 9 - Function- User-Defined Function](https://viblo.asia/p/tang-toc-database-index-phan-9-function-user-defined-function-3P0lPBVnKox)