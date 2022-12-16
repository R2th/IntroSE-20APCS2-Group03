Trong phần này sẽ mô tả phần mà hầu hết các sách giáo khoa về SQL không nói đến, truy vấn với tham số.
Các bạn có thể xem đầy đủ các phần tại [đây](https://viblo.asia/s/lam-sao-de-trang-web-chay-nhanh-DVK2jDrnKLj) nhé

Nếu các bạn chưa đọc bài trước có thể đọc tại link [Tăng tốc database index phần 9 - Function- User-Defined Function](https://viblo.asia/p/tang-toc-database-index-phan-9-function-user-defined-function-3P0lPBVnKox)


Có hai cách để truyền dữ liệu vào database, một là truyền trực tiếp qua câu lệnh, hai là truyền qua tham số, thường là sử dụng *?*, :*name* or *@name*   và truyền giá trị tương ứng qua lời gọi. 

Truyền thẳng giá trị vào câu lệnh cũng không hẳn là tệ tuy nhiên nếu bạn truyền tham số thì sẽ có những lợi ích sau:
1. Bảo mật: Truyền qua tham số là cách tốt nhất để tránh [SQL Injection ](https://en.wikipedia.org/wiki/SQL_injection)
2. Hiệu năng: Database có execution plan như SQL Server và Oracle có thể sử dụng lại execution plan nhiều lần với câu lệnh giống nhau. Nó tiết kiệm công sức để xây dựng một execution plan mới nhưng nó chỉ hiệu quả khi câu lệnh là giống hệt nhau. Nếu bạn thêm vào một giá trị khác database sẽ hiểu đó là một câu lệnh khác và xây dựng lại một execution plan khác. Vậy nếu muốn câu lệnh  kiểu giống nhau vẫn được tái sử dụng execution plan thì bạn có thể sử dụng tham số. Do câu lệnh khi đó được chừa các khoảng trống cho các tham số nên được tính là không thay đổi dù với các tham số khác nhau

Đương nhiên vẫn có những ngoại lệ, sử dụng tham số mà câu lệnh lại chậm hơn, ví dụ nếu số lượng dữ liệu bị ảnh hưởng phụ thuộc vào giá trị truyền vào ví dụ.

```
SELECT first_name, last_name
  FROM employees
 WHERE subsidiary_id = 20
99 rows selected.

----------------------------------------------------------------
|Id | Operation                   | Name         | Rows | Cost |
----------------------------------------------------------------
| 0 | SELECT STATEMENT            |              |   99 |   70 |
| 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |   99 |   70 |
|*2 |   INDEX RANGE SCAN          | EMPLOYEES_PK |   99 |    2 |
----------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("SUBSIDIARY_ID"=20)
```

Tìm kiếm theo index có hiệu năng tốt nhất trong trường hợp Subsidiary  nhỏ, nhưng trong trường hợp Subsidiary lớn TABLE ACCESS FULL có thể có hiệu năng tốt hơn

```
SELECT first_name, last_name
  FROM employees
 WHERE subsidiary_id = 30
1000 rows selected.

----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           | 1000 |  478 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES | 1000 |  478 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("SUBSIDIARY_ID"=30)
```

Trong trường hợp này trình tối ưu sẽ xác định tần xuất của mỗi SUBSIDIARY_ID trong bảng dựa vào [Histogram](https://docs.oracle.com/database/121/TGSQL/tgsql_histo.htm#TGSQL367) của nó. Bạn hiểu đơn giản Histogram là cái lưu dữ liệu tần xuất của các cột trong bảng. Vì tần xuất dữ liệu của hai câu lệnh khác nhau, nên cost của hai câu lệnh khách nhau. Trình tối ưu sẽ chọn cách tối ưu nhất để thực hiện. Với Subsidiary nhỏ nó sẽ query theo index.

Với dữ liệu lớn hơn chi phí của TABLE ACCESS BY INDEX ROWID phụ thuộc vào số lượng dòng, nếu số lượng dòng tăng gấp 10 lần như trong ví dụ ( từ 99 đến 1000) chi phí sẽ thay đổi đáng kể. Giả sử 99 dòng cost là 70, 1000 dòng cost sẽ là khoảng 700, so với full table scan là 478 rõ ràng chi phí của full table scan thấp hơn. Vì vậy trình tối ưu sẽ chọn phương án fulltable scan.

Khi sử dụng tham số, trình tối ưu không có giá trị nào biết trước để ước lượng tần suất của dữ liệu. nên nó giả định rằng các giá trị được phân phối đều nhau và ước tính số lượng bản ghi và cost giống nhau. Và vì thế nó luôn chọn execution plan giống nhau.

> TIP: Column histogram hữu ích nhất khi các giá trị trong cột  phân bố không đều. Đối với các cột được phân bố đồng đều có thể ước lượng số lượng bằng cách chia số lượng dòng cho số giá trị duy nhất (distinct values) trong đó. Lúc này dùng tham số sẽ có hiệu quả.

> Nếu chúng ta so sánh trình tối ưu (optimizer) với trình biên dịch (compiler). Việc dụng tham số giống với việc bạn sử dụng biến, còn nếu thêm giá trị trực tiếp vào câu lệnh nó giống với hằng. Database có thể sử dụng giá trị từ câu lênh SQL để tối ưu cũng giống như việc trình biên dịch sử dụng hằng số trong quá trình biên dịch.( Trình biên dịch sẽ bế luôn giá trị hằng số vào trong code luôn). Trình tối ưu không thể sử dụng tham số cũng giống như việc trình biên dịch không thể biết giá trị trong khi chạy (runtime value) của biến trong lúc biên dịch vậy.

Thế theo ví dụ trên thì sử dụng biến rõ ràng làm chậm đi câu lệnh chứ không phải nhanh hơn đúng không? Vì trình tối ưu sẽ sử dụng index cả khi full table scan có tốc độ nhanh hơn nếu truyền qua biến. Rõ ràng nếu không truyền biến thì database sẽ  chọn được execution plan tốt nhất. Vấn đề ở đây là cân đối thôi. Việc lúc nào cũng phải tính toán cost và chọn execution plan cho rất nhiều câu lệnh giống hệt nhau cũng khá tốn kém mà nhiều khi nó chả mang lại tác dụng gì?( Nếu dùng biến thì chạy được luôn không phải qua bước này nữa). (Việc không sử dụng biến cũng giống nhau việc biên dịch lại code mỗi lần chạy vậy)

Việc chọn lại một execution plan có sẵn trong cache ( cái này có phải chưa là tối ưu nhất với tham số hiện tại) hoặc thử tất cả các trường hợp để tìm execution plan tốt nhất cũng khá là khó xử với databse. Vấn đề là database không biết execution plan đưa ra đã tối ưu nhất hay chưa nếu chưa thử tất cả các trường hợp. Các nhà cung cấp database cố gắng giải quyết vấn đề này bằng phương pháp [heuristic](https://vi.wikipedia.org/wiki/Heuristic) nhưng thành công khá hạn chế.

Bạn có thể sử dụng tham số để giải quyết vấn đề này (cache hay not cache đó là vấn đề). Bạn luôn luôn nên dùng tham số trừ trường hơp tham số đó ảnh hưởng tới execution plan. 

Vấn để là tham số như thế nào thì ảnh hưởng tới execution plan. Một trường hợp hay gặp là truy vấn theo trạng thái (status) ví dụ có hai trạng thái là "todo" và "done", số lượng bản ghi có trạng thái **done** thường nhiều hơn số lượng bản ghi có trạng thái **todo** rất nhiều,  sử dụng index chỉ có ý nghĩa nếu tìm kiếm theo trạng thái "todo" nếu bạn tìm theo trạng thái done mà execution plan đã cache trạng thái todo thì sẽ gây vấn đề. Một ví dụ khác là partition nếu bạn chia bảng và index và lưu dữ liệu ở nhiều chỗ khác nhau giá trị truyền vào có thể ảnh hưởng tới việc quyết định phân vùng nào được quét. Hiệu suất của truy vấn  LIKE cũng bị ảnh hưởng nếu truyền theo tham số, tôi sẽ nói điều này ở phần sau.

> Trong thực tế có ít trường hợp mà tham số ảnh hưởng tới execution plan. Nếu bản nghi ngờ tham số có ảnh hưởng cứ mạnh dạn dùng tham số vì nó hạn chế SQL Injection.

Dưới đây là một số ví dụ dùng tham số với một số ngôn ngữ lập trình
```
C#
Without bind parameters:

int subsidiary_id;
SqlCommand cmd = new SqlCommand(
                   "select first_name, last_name" 
                 + "  from employees"
                 + " where subsidiary_id = " + subsidiary_id
                 , connection);
                 
Using a bind parameter:

int subsidiary_id;
SqlCommand cmd =
       new SqlCommand(
                      "select first_name, last_name" 
                    + "  from employees"
                    + " where subsidiary_id = @subsidiary_id
                    , connection);
cmd.Parameters.AddWithValue("@subsidiary_id", subsidiary_id)
```

```
JAVA
Without bind parameters:

int subsidiary_id;
Statement command = connection.createStatement(
                    "select first_name, last_name" 
                  + "  from employees"
                  + " where subsidiary_id = " + subsidiary_id
                  );
Using a bind parameter:

int subsidiary_id;
PreparedStatement command = connection.prepareStatement(
                    "select first_name, last_name" 
                  + "  from employees"
                  + " where subsidiary_id = ?"
                  );
command.setInt(1, subsidiary_id);
```

```
PHP
Using MySQL, without bind parameters:

$mysqli->query("select first_name, last_name" 
             . "  from employees"
             . " where subsidiary_id = " . $subsidiary_id);
Using a bind parameter:

if ($stmt = $mysqli->prepare("select first_name, last_name" 
                           . "  from employees"
                           . " where subsidiary_id = ?")) 
{
   $stmt->bind_param("i", $subsidiary_id);
   $stmt->execute();
} else {
  /* handle SQL error */
}
```

 CHÚ Ý: Sử dụng tham số không thể thay đổi cấu trúc của câu lệnh SQL, nghĩa là bạn không thể sử dụng tham số thay cho tên bảng hoặc tên cột ví dụ
```
String sql = prepare("SELECT * FROM ? WHERE ?");
 sql.execute('employees', 'employee_id = 1');
```
Nếu muốn thực hiện điều này bạn cần sử dụng Sql động (Dynamic SQL)

>Trình tối ưu và câu lệnh càng phức tạp, càng cần cache nhiều. SQL Server và Oracle có cơ chế để tự biến cấu truy vấn của bạn thành dạng truyền tham số. Tính năng này được gọi là CURSOR_SHARING (Oracle) hoặc forced parameterization (SQL Server).

Link bài sau [Tìm kiếm theo Khoảng, Lớn Hơn, Nhỏ Hơn, và BETWEEN](https://viblo.asia/p/tim-kiem-theo-khoang-lon-hon-nho-hon-va-between-Qbq5QBbzKD8)