SQL là một kỹ năng bắt buộc phải có đối với bất kỳ kỹ sư phần mềm nào trong thời đại này. Bởi vì hầu hết các phần mềm hiện nay phụ thuôc vào loại dữ liệu có khả năng tích hợp tốt với RDBMS (Hệ thống quản lý cơ sở dữ liệu quan hệ). RDBMS đều có mặt ở cả ứng dụng web, API hay ứng dụng nội bộ . Và SQL là ngôn ngữ dùng để truy vấn RDBMS.

Nếu bạn là một nhà khoa học dữ liệu, việc biết SQL và các kỹ thuật liên quan của nó là rất quan trọng. SQL sẽ là yêu cầu tối thiểu để bạn có thể truy vấn RDBMS và trả lời cho các câu hỏi cụ thể về loại dữ liệu bạn đang xử lý.

Trong bài hướng dẫn này, bạn sẽ được học cách viết các PROCEDURE (Thủ tục) và CURSOR (cursor); một khía cạnh quan trọng khác của SQL. Bạn đã bao giờ muốn RDBMS của mình tự động thực hiện một số hành động nhất định khi một hành động cụ thể khác được thực hiện chưa? Ví dụ: giả sử bạn đã tạo một bản ghi mới trong bảng ```Employees``` và bạn muốn bản ghi này được phản ánh trong các bảng có liên quan khác như ```Departments```. Chà, bạn đang đến đúng nơi rồi.

Trong bài viết này, bạn sẽ học được:

- PROCEDURE  trong RDBMS là gì?
- Làm thế nào bạn có thể viết một PROCEDURE ?
- Các loại PROCEDURE khác nhau
- cursor trong RDBMS là gì?
- Làm thế nào để viết các loại cursor khác nhau?
- Các loại cursor khác nhau

Nghe hấp dẫn đấy chứ? Bắt đầu nào.

### PROCEDURE trong RDBMS là gì?

Trước khi tiếp tục với các procedure và cursor, bạn sẽ cần biết một chút về PL/SQL, ngôn ngữ có cấu trúc kết hợp sức mạnh của SQL với các câu lệnh procedure. 

Nếu bạn có một câu truy vấn SQL và bạn muốn thực hiện nó nhiều lần, PROCEDURE có thể giúp bạn. PROCEDURE thường được dùng ở đây vì chúng có thể được lưu trữ trong RDBMS (Stored Procedure) và được gọi lên dựa trên một hành động cụ thể nào đó . Các procedure còn được gọi là ```Procs```.

Giờ thì chúng ta hãy viết một PROCEDURE.

### Cách viết PROCEDURE:

Cú pháp chung để viết một procedure như sau:
```sql
CREATE PROCEDURE procedure_name
AS
sql_statement
GO;
```
Cú pháp này áp dụng cho hầu hết mọi RDBMS, có thể là Oracle, PostgreSQL hoặc MySQL.

Sau khi bạn đã tạo một procedure, bạn sẽ phải thực hiện nó:

```sql
EXEC procedure_name;
```
Bây giờ chúng ta hãy viết một procedure đơn giản. Ảnh dưới đây có một bảng có tên là ```Customers```.

![](https://images.viblo.asia/ffa9ebbd-4273-40c1-bc94-c68d602c60c9.jpg)
<div align="center">Nguồn: W3Schools</div>

Bạn sẽ viết một procedure có tên là ```SelectAllCustomers``` sẽ lấy dữ liệu (select) tất cả khách hàng từ ```Customers```.

```sql
CREATE PROCEDURE SelectAllCustomers
AS
SELECT * FROM Customers
GO;
```

Thực hiên SelectAllCustomers bằng câu :

```sql
EXEC SelectAllCustomers;
```

Các procedure cũng có thể không cần phụ thuộc vào bất kỳ bảng nào. Ví dụ sau tạo một procedure đơn giản để hiển thị dòng chữ ‘Hello World!’ 
```sql
CREATE PROCEDURE welcome
AS
BEGIN
dbms_output.put_line('Hello World!');
END;
```
Có 2 cách để thực thi một câu procedure:
- Sử dụng từ khóa EXEC
- Gọi tên của procedure từ khối PL/SQL
Quy trình có tên 'welcome' được gọi với từ khóa EXEC :
```sql
EXEC welcome;
```
Method tiếp theo sẽ gọi welcome từ một khối PL/SQL khác.
```sql
BEGIN
welcome;
END;
```
Một procedure có thể được thay thế bằng một procedure mới. Chỉ cần thêm từ khóa ```REPLACE``` :

```sql
CREATE OR REPLACE PROCEDURE welcome
AS
BEGIN
dbms_output.put_line('Hello World!');
END;
```
Xóa một procedure cũng rất đơn giản:
```sql
DROP PROCEDURE procedure-name;
```
Các procedure cũng có thể khác nhau dựa trên các tham số. 

Bạn hãy nhìn lại bảng ```Customers``` ở ảnh dưới.

![](https://images.viblo.asia/88ea6764-96a6-4543-83f5-a373cd7297d0.jpg)

Bạn sẽ viết một procedure để lấy dữ liệu Khách hàng đến từ một Thành phố cụ thể :
```sql
CREATE PROCEDURE SelectAllCustomers @City nvarchar(30)
AS
SELECT * FROM Customers WHERE City = @City
GO;
```
Hãy phân tích các thành phần ở câu trên:

Bạn viết một tham số ```@City``` đầu tiên và xác định kiểu dữ liệu và kích cỡ của tham số.
@City thứ hai được gán cho biến điều kiện City, là một cột trong bảng ```Customers```.
Ta thực hiện procedure:
```sql
EXEC SelectAllCustomers City = "London";
```

Bây giờ hãy cùng xem loại procedure có nhiều tham số .

Các procedure viết với nhiều tham số hoàn toàn giống với các procedure trước đó. Bạn chỉ cần nối đuôi cho chúng.
```sql
CREATE PROCEDURE SelectAllCustomers @City nvarchar(30), @PostalCode nvarchar(10)
AS
SELECT * FROM Customers WHERE City = @City AND PostalCode = @PostalCode
GO;
```
Thực hiện procedure như sau:
```sql
EXEC SelectAllCustomers City = "London", PostalCode = "WA1 1DP";
```

Các câu code trên rất dễ đọc đúng không? Khi câu code thấy dễ đọc , ta sẽ thấy thú vị hơn khi code. Chúng ta kết thúc phần procedure. Bây giờ bạn sẽ nghiên cứu về cursor.

### Cursor trong RDBMS là gì?
Các cơ sở dữ liệu như Oracle tạo một vùng bộ nhớ, được gọi là vùng ngữ cảnh, để xử lý câu lệnh SQL, chứa tất cả thông tin cần thiết để xử lý câu lệnh, ví dụ - số hàng được trả về khi bạn thực hiện câu lệnh select.

Một cursor là một pointer tới vùng ngữ cảnh này. PL/SQL kiểm soát vùng ngữ cảnh thông qua cursor. cursor là vùng lưu trữ tạm thời được tạo trong bộ nhớ hệ thống khi một câu lệnh SQL được thực thi. Cursor chứa thông tin về câu lệnh select và các hàng dữ liệu được truy cập bởi nó. Do đó, cursor được sử dụng để tăng tốc thời gian xử lý truy vấn trong cơ sở dữ liệu lớn. Lý do bạn có thể cần sử dụng cursor cơ sở dữ liệu là vì bạn cần thực hiện các hành động trên từng các hàng dữ liệu một cách riêng lẻ.

Cursor có thể có hai loại:

- Implicit cursor (con trỏ tiềm ẩn)
- Explicit cursor (con trỏ tường minh)

### Cách Viết cursor:
Bạn sẽ bắt đầu phần này bằng cách hiểu implicit cursors là gì.

**Implicit cursors** được Oracle tự động tạo bất cứ khi nào một câu lệnh SQL được thực thi khi không có cursor rõ ràng được xác định cho câu lệnh. Người lập trình không thể kiểm soát các implicit cursor và thông tin trong đó. Bất cứ khi nào một câu lệnh DML (Ngôn ngữ thao tác dữ liệu) (INSERT, UPDATE và DELETE) được đưa ra, một implicit cursor được liên kết với câu lệnh đó. Đối với thao tác INSERT, cursor chứa dữ liệu cần chèn. Đối với các hoạt động UPDATE và DELETE, cursor xác định các hàng sẽ bị ảnh hưởng bởi câu lệnh.

Implicit cursor trong SQL luôn có các thuộc tính như:

- %FOUND,
- %ISOPEN,
- %NOTFOUND,
- %ROWCOUNT.

Hình ảnh sau đây chứa các mô tả ngắn gọn cho các thuộc tính này:

![](https://images.viblo.asia/2229782c-028f-4145-a81e-794b982a9579.jpeg)

<div align="center">Nguồn: TutorialsPoint</div>

Hãy xem xét bảng  ```Employee``` ở dưới đây:

![](https://images.viblo.asia/8114bb67-09b1-43c9-b330-25bc4770ae20.jpeg)

Bạn sẽ viết một cursor mà cursor này sẽ tăng lương thêm 1000 cho những người có độ tuổi dưới 30.
```sql
DECLARE
total_rows number(2);
BEGIN
UPDATE Employee
SET salary = salary + 1000
where age < 30;
IF sql%notfound THEN
    dbms_output.put_line('No employees found for under 30 age');
ELSIF sql%found THEN
    total_rows := sql%rowcount;
    dbms_output.put_line( total_rows || ' employees updated ');
END IF;
END;
```
Bây giờ hãy xem lại tất cả những gì bạn đã viết:

- Bạn đã khai báo một biến có tên là total_rows để lưu số lượng nhân viên sẽ bị ảnh hưởng do hành động của cursor.
- Bạn đã bắt đầu khối cursor bằng lệnh BEGIN và viết một câu truy vấn SQL đơn giản để cập nhật mức lương của những người dưới 30 tuổi.
- Bằng thuộc tính %notfound, bạn đã xử lý đầu ra trong trường hợp không có bản ghi của nhân viên dưới 30 trong CSDL. Lưu ý rằng chúng ta có một implicit cursor ```sql``` ở đây để lưu trữ tất cả các thông tin liên quan.
- Cuối cùng, bạn đã in số bản ghi bị ảnh hưởng bởi cursor bằng cách sử dụng thuộc tính %rowccount

Bạn đang làm rất tốt đó!

Khi đoạn code trên được thực thi, kết quả sẽ như sau:

**2 Employees updated (giả sử có 2 bản ghi trong đó tuổi <30)**

Bây giờ bạn sẽ nghiên cứu về explicit cursor.

**Explicit cursors** cho phép ta điều khiển được vùng ngữ cảnh một cách sâu hơn. Nó được tạo chung Câu lệnh SELECT mà trả về nhiều hơn một hàng.

Cú pháp để tạo một explicit cursor là
```sql
CURSOR cursor_name IS select_statement;
```
Nếu bạn làm việc với các explicit cursor, bạn cần thực hiện theo trình tự các bước như sau:

- Declare (Khai báo) cursor để khởi tạo trong bộ nhớ
- Open (Mở) cursor cấp phát vùng nhớ
- Fetch (Lấy) cursor để lấy dữ liệu
- Close (Đóng) cursor để giải phóng bộ nhớ
Hình ảnh sau biểu thị vòng đời của một explicit cursor điển hình:

![](https://images.viblo.asia/ee810518-4915-457b-93cf-a1099f1d1cdf.jpg)

Bây giờ bạn sẽ nghiên cứu thêm về từng bước này.

### Khai báo cursor:
Bạn khai báo một cursor cùng với câu lệnh SELECT. Ví dụ:
```sql
CURSOR C IS SELECT id, name, address FROM Employee where age > 30;
```
### Open cursor:
Khi bạn open một cursor, CPU sẽ phân bổ bộ nhớ cho cursor và cursor của bạn đã sẵn sàng để fetch lấy các hàng được trả về bởi câu lệnh SQL liên quan đến nó. Ví dụ chúng ta sẽ open cursor ở trên như sau:
```sql
OPEN C;
```
### Fetch cursor:
Fetch cursor cho phép truy cập từng hàng một từ bảng liên quan đến cursor.

```sql
FETCH C INTO C_id, C_name, C_address;
```
### Close cursor:
Close cursor có nghĩa là giải phóng bộ nhớ được cấp phát. Bạn sẽ đóng cursor đã mở ở trên dưới dạng:

```sql
CLOSE C;
```
Bây giờ bạn sẽ ghép tất cả các phần này lại với nhau.

### Tổng hợp lại:
```sql
DECLARE
C_id Employee.ID%type;
C_name Employee.NAME%type;
C_address Employee.ADDRESS%type;
CURSOR C is
SELECT id, name, address FROM Employee where age > 30;
BEGIN
OPEN C;
LOOP
FETCH C INTO C_id, C_name, C_address; 
dbms_output.put_line(ID || ' ' || NAME || ' ' || ADDRESS); 
EXIT WHEN C%notfound;
END LOOP;
CLOSE C;
END;
```
Bạn cũng đã học cách khai báo các biến cursor C_id, C_name và C_address. ```C_id Employee.ID%type;``` - dòng này là để đảm bảo rằng C_id được tạo với cùng kiểu dữ liệu với kiểu dữ liệu của ID trong bảng ```Employee```.

Bằng cách sử dụng LOOP, bạn đã lặp qua cursor để fetch các bản ghi và hiển thị nó. Bạn cũng đã xử lý trường hợp nếu cursor không tìm thấy bản ghi nào.

Khi code được thực thi, kết quả là -

![](https://images.viblo.asia/1ca9673d-8043-4bef-b963-a947b1454c56.jpg)

### Kết bài:
Xin chúc mừng! Bạn đã đọc đến cuối bài viết. Bạn đã hoàn thành hai chủ đề phổ biến nhất của thế giới cơ sở dữ liệu — procedure và cursor. Đây là những thứ được dùng rất nhiều trong các ứng dụng phải xử lý số lượng giao dịch khổng lồ. Bạn đoán chính xác rồi đó! Các ngân hàng đã sử dụng chúng từ thời xa xưa rồi. Bạn đã học cách viết một procedure, các thể loại khác nhau của nó và tại sao chúng lại như vậy. Bạn cũng đã nghiên cứu cursor và một số biến thể của nó và cách bạn có thể viết chúng.

Tuyệt vời!

Sau đây là một số tài liệu tham khảo trong quá trình viết bài:

[Introduction to procedures and cursors in SQL](https://towardsdatascience.com/introduction-to-procedures-and-cursors-in-sql-f9d9b9ea1fe7)

[Oracle PL/SQL Programming](https://www.amazon.com/Oracle-SQL-Programming-Steven-Feuerstein/dp/1565923359)

[TutorialsPoint blog on Cursors](https://www.tutorialspoint.com/plsql/plsql_cursors.htm)

[SQL Stored Procedures — W3Schools](https://www.w3schools.com/sql/sql_stored_procedures.asp)