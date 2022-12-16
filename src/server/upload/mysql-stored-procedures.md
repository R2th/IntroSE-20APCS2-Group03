### 1. Stored Procedure (SP) là gì?
Stored Procedures - Thủ tục lưu trữ: là một tập các khai báo lệnh SQL nhằm thực hiện một hoặc một số các xử lý nào đó. 

Stored Procedure có thể nhận tham số đầu vào nhưng lại không bắt buộc phải trả về kết quả như Function (Hàm), tuy nhiên có thể trả về một lúc nhiều tham số đầu ra - điều mà Function không làm được :joy: Từ đây bạn đã biết được khi nào thì dùng Function vs Stored Procedures rồi chứ nhỉ ;)

**Ưu điểm là gì?**
* Nhanh hơn: SP sẽ được phân tích cú pháp và biên dịch ở lần đầu tiên, từ các lần sau không cần biên dịch lại nữa
* Tính linh động: Khai báo 1 lần nhưng dùng nhiều, có thể chỉnh sửa và tái sử dụng giúp maintanence dễ dàng hơn
* Giảm băng thông (bandwich): Giảm lưu lượng truyền dữ liệu giữa server với DB do chỉ gọi thủ tục thay vì gửi một tập các lệnh SQL
* Bảo mật: Việc đóng gói các lệnh trong SP có thể che dấu các cú pháp từ đó có thể ngăn chặn hacker dùng SQL injection, giới hạn quyền truy cập người dùng vào các table bằng cách chỉ cần cấp phát SP để sử dụng
* Giúp câu lệnh gốc của bạn ngắn gọn hơn, sạch sẽ hơn nhiều khi gọi thủ tục đưa vào xử lý thay vì khai báo một tập lệnh xử lý phức tạp

**Nhược điểm là gì?**
* Thủ tục cũng là một Object cần lưu trữ trong DB, điều này sẽ làm tốn bộ nhớ của Database server
* Cần có hiểu biết nhất định để có thể viết và maintanance SP
*  MySQL chưa hỗ trợ tool debug trong Stored Procedures

### 2. Tạo mới Stored Procedures - CREATE
Cú pháp:
```sql
CREATE PROCEDURE procedure_name (
    [IN | OUT | INOUT] parameter_name datatype[(length)]
)
BEGIN
   statements;
END $$ 
-- Ký tự phân cách $$ có thể định nghĩa lại bằng khai báo DELIMITER <characters> ví dụ: DELIMITER $$
```
##### **Ghi chú:** thường các thủ tục xử lý phức tạp yêu cầu người viết đôi khi sử dụng các kỹ thuật khác để kết hợp trong quá trình viết thủ tục:
* Variables
* IF THEN
* CASE Statement
* LOOP
* WHILE
* REPEAT
* LEAVE
* Cursors
* Handling Errors
* Raising Errors

(Ở đây mình giới thiệu Variables kết hợp với IF ELSE, còn lại các bạn tự tìm hiểu thêm kỹ thuật ở trên nha :sweat_smile:)
##### **Ví dụ**: 
Cho Database Ecommerce đơn giản như sau:
![](https://images.viblo.asia/9776dc17-10ce-4909-b194-1ce572a653a8.png)

Yêu cầu: Tạo Stored Procedure tính **tổng doanh thu** bán hàng, **trung bình doanh thu** một **mặt hàng bất kỳ** truyền vào. Trường hợp mặt hàng truyền vào không có dữ liệu thì thông báo lỗi.

```sql
USE ecommerces; -- Khai báo database sử dụng dùng để khai báo thủ tục

-- Khai báo thay đổi ký tự phân cách mặc định thành $
-- Tùy cách bạn muốn chọn ký tự bất kỳ, ở đây mình chọn là $
-- Mặc dù không thuộc syntax của thủ tục, nhưng nó là bắt buộc để bắt đầu thủ tục
DELIMITER $	

CREATE PROCEDURE revenue_product(
	IN product_id int, 
    OUT total decimal(10,2),
    OUT average decimal(10,2)
)
BEGIN
    DECLARE count int default 0;	-- Khai báo biến count kiểu integer mặc định = 0
    -- Gán giá trị biến count bằng số lượng row product có id = tham số product_id
    SET count = (SELECT COUNT(id) FROM products WHERE id = product_id);
    IF count > 0 THEN 	-- Kiểm tra điều kiện count > 0 thì thực hiện xử lý bên trong
		SET total = (SELECT SUM(price * quantity) 
					FROM order_details WHERE product_id = product_id);
		SET average = (SELECT AVG(price * quantity) 
					FROM order_details WHERE product_id = product_id);
	ELSE	-- Ngược lại
		SET total = 0;
        SET average = 0;
        SELECT  CONCAT('YOUR PARAMETER ', product_id, 'IS NOT EXISTS!!!') AS 'ERROR';
		-- Hiển thị message lỗi: YOUR PARAMETER XXX IS NOT EXISTS!!!
	END IF;		-- Kết thúc khối check điều kiện
END $
 
DELIMITER ; 	-- Khai báo dấu phân cách trở lại mặc định là dấu chấm phẩy ;
```

### 3. Gọi thực thi Stored Procedures - CALL
Cú pháp gọi thực thi SP:
```sql
CALL <procedure name> ([<List value input> , <List output: @out_name>]);
```
Ví dụ gọi thực thi cho SP đã tạo ở phần trên:

Trường hợp 1: Tham số đầu vào là giá trị KHÔNG hợp lệ
```sql
CALL revenue_product(9999, @total, @avg);
```
Kết quả: Hiển thị message lỗi
![](https://images.viblo.asia/a1cd5169-73bb-4bd2-a4ae-ece150701bd2.png)

Trường hợp 2: Tham số đầu vào là giá trị hợp lệ
```sql
-- Trường hợp product_id là valid:
CALL revenue_product(9999, @total, @avg);
SELECT @total, @avg;   -- Select kết quả của tham số trả về
```
Kết quả: Có 2 giá trị đầu ra tương ứng
![](https://images.viblo.asia/a0311cb4-dff7-4d73-b291-6c549281c5c9.png)

### 4. Xóa Stored Procedures - DROP
**Cú pháp**:
```sql
DROP PROCEDURE [IF EXISTS] procedure_name;
```
Trong đó option **IF EXISTS** dùng trong trường hợp bạn muốn ngăn không cho raise error nếu thủ tục drop đó không tồn tại trong DB.

**Ví dụ**: Xóa stored procedure đã define ở ví dụ trên 
```sql
DROP PROCEDURE revenue_product;
```

### 5. Sửa đổi Stored Procedures
Một cái dở là MySQL không cung cấp cú pháp sửa đổi stored procedures nếu như bạn muốn thay đổi mã xử lý bên trong hay danh sách parameters :tired_face:
Vậy nên nếu muốn thay đổi thì bạn hãy xóa SP cũ rồi tạo SP mới nhé :joy:

### 6. Xem danh sách Stored Procedures - SHOW
Cú pháp xem danh sách các SP hiện có trên server DB:
```sql
SHOW PROCEDURE STATUS [LIKE 'pattern' | WHERE search_condition];
```
Trong đó:

**- SHOW PROCEDURE STATUS** : Sẽ trả về danh sách các stored procedures tồn tại với đầy đủ thông tin phản ánh các đặc tính của SP

Ví dụ: 
![](https://images.viblo.asia/51567ea0-bb86-4b97-9af3-628296fbbbcd.png)

**- WHERE search_condition** : Nếu bạn chỉ muốn hiển thị các thủ tục được lưu trữ trong một cơ sở dữ liệu cụ thể, bạn có thể sử dụng mệnh đề WHERE 

Ví dụ:
![](https://images.viblo.asia/655aec44-9670-473a-91b4-e6ab63c68449.png)

**- LIKE 'pattern'** : Sử dụng trong trường hợp bạn muốn tìm các SP có tên chứa một từ cụ 
thể

Ví dụ:
![](https://images.viblo.asia/1ea0356e-e7a7-4ba8-89d7-bfad9b26f2f0.png)

### Kết
Trên đó là giới thiệu giúp bạn có cái nhìn tổng quan và biết cách thêm/sửa/xóa/xem một Stored Procedure sử dụng DBMS là MySQL.
Hi vọng sẽ giúp ích cho các bạn trong công việc của bạn :wink:

Nguồn tham khảo: http://www.mysqltutorial.org/mysql-stored-procedure