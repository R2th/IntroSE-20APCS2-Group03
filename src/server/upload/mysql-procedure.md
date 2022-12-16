# 1. Stored Procedure là gì?
Stored Procedures - là một tập các câu lệnh SQL nhằm thực thi tác vụ nào đó.

VD: Giả sử chúng ta có câu lệ như sau, muốn lưu trữ lại để sử dụng mà không phải viết lại query, chúng ta có thể sử dụng procedure
```sql
SELECT 
    customerName, 
    city, 
    state, 
    postalCode, 
    country
FROM
    customers
ORDER BY customerName;
```

có thể viết tạo stored procedure wrap câu lệnh trên.
```sql
DELIMITER $$

CREATE PROCEDURE GetCustomers()
BEGIN
	SELECT 
		customerName, 
		city, 
		state, 
		postalCode, 
		country
	FROM
		customers
	ORDER BY customerName;    
END$$
DELIMITER ;
```

để chạy stored procedure có thể gọi
```
CALL GetCustomers();
```

### Advantages

**Giảm băng thông:** Thay vì gửi 1 tập các câu lệnh giữa application vs Mysql server, application chỉ cần phải gửi tên và parameter tới Mysql Serve
**Bảo mật**: Có thể giới hạn quyền truy cập, chỉ cho phép application truy cập các stored procedure cụ thể, thay vì cung cập quyền truy cập đến bất cứ table nào.
**Logic tập trung ở tầng DB**: Có thể tạo các stored procedure có cùng logics và sử dụng chung giữa các application, việc này có thể loại bỏ các trùng lặp logic giữa các application.

### Disadvantages
- Chưa hỗ trợ debug tool
- Cần có hiểu biết nhất định mới có thể maintain Stored procedure
- Làm tốn nhiều bộ nhớ của database nếu lạm dụng

# 2.Stored procedure basic

## 2.1 Tạo mới 
```sql
DELIMITER //
CREATE procedure GetAllProducts()
BEGIN
    Select * from products;
END //
DELIMITER ;
```
Ở cau lệnh trên
- Change default delimiter thành //
- Sử dụng ';' trong body procedure, sau đó // sau keyword END để kết thúc stored procedure
- chuyển delimiter về ';'

## 2.2 Drop 
Cú pháp
```sql
DROP PROCEDURE [IF EXISTS] stored_procedure_name;
```
## 2.3 Variable

Cú pháp
```sql
DECLARE variable_name datatype(size) [DEFAULT default_value];
```

DECLARE define local varaible, scope của local variable là từ BEGIN đến END trong procedure
```sql
DELIMITER $$

CREATE PROCEDURE GetTotalOrder()
BEGIN
	DECLARE totalOrder INT DEFAULT 0;
    
    SELECT COUNT(*) 
    INTO totalOrder
    FROM orders;
    
    SELECT totalOrder;
END$$

DELIMITER ;
```
```sql
call GetTotalOrder()  -- 326
```

## 2.4 Parameter
```sql
[IN | OUT | INOUT] parameter_name datatype[(length)]
```
- IN: khai báo input của SP
- OUT: Output cúa SP
- INOUT: biến được khai báo được input vào SP, và trả về giá trị mới. Một lưu ý là variable được truyền vào INOUT sẽ bị thay đổi sau khi thực thi procedure. Ở IN thì không thay đổi variable.

VD:
```sql
DELIMITER $$

CREATE PROCEDURE SetCounter(
	INOUT counter INT,
    IN inc INT
)
BEGIN
	SET counter = counter + inc;
END$$

DELIMITER ;
```
```sql
SET @counter = 1;
CALL SetCounter(@counter,1); -- 2
CALL SetCounter(@counter,1); -- 3
CALL SetCounter(@counter,5); -- 8
SELECT @counter; -- 8
```

## 2.5 Drop
```sql
DROP PROCEDURE [IF EXISTS] procedure_name;
```
## 2.6 Show 
```sql
SHOW PROCEDURE STATUS [LIKE 'pattern' | WHERE search_condition];
```
VD:
Show theo database
```sql
SHOW PROCEDURE STATUS WHERE db = 'classicmodels';
```
Show theo tên procedure
```sql
SHOW PROCEDURE STATUS LIKE '%Order%'
```

# 3. Condition statement
## 3.1 IF THEN ELSE  ELSEIF END IF
Cú pháp
```sql
IF condition THEN
ELSEIF condition2
ELSE
END IF;
```
Ví dụ 
```sql
DELIMITER $$

CREATE PROCEDURE GetCustomerLevel(
    IN  pCustomerNumber INT, 
    OUT pCustomerLevel  VARCHAR(20))
BEGIN
    DECLARE credit DECIMAL DEFAULT 0;

    SELECT creditLimit 
    INTO credit
    FROM customers
    WHERE customerNumber = pCustomerNumber;

    IF credit > 50000 THEN
        SET pCustomerLevel = 'PLATINUM';
    ELSEIF credit <= 50000 AND credit > 10000 THEN
        SET pCustomerLevel = 'GOLD';
    ELSE
        SET pCustomerLevel = 'SILVER';
    END IF;
END $$

DELIMITER ;
```

```sql
CALL GetCustomerLevel(447, @level); 
SELECT @level; -- GOLD
```
## 3.2 Loop, Repeate loop(do while), while loop
Mình sẽ trình bày về loop, còn repeate loop và while loop các bạn tự tìm hiểu nhé
Cú pháp
```sql
[begin_label:] LOOP
    statement_list
END LOOP [end_label]
```


```sql
DROP PROCEDURE LoopDemo;

DELIMITER $$
CREATE PROCEDURE LoopDemo()
BEGIN
	DECLARE x  INT;
	DECLARE str  VARCHAR(255);
        
	SET x = 1;
	SET str =  '';
        
	loop_label:  LOOP
		IF  x > 10 THEN 
			LEAVE  loop_label;
		END  IF;
            
		SET  x = x + 1;
		IF  (x mod 2) THEN
			ITERATE  loop_label;
		ELSE
			SET  str = CONCAT(str,x,',');
		END  IF;
	END LOOP;
	SELECT str;
END$$

DELIMITER ;
```
- Leave tương tự với break
- Iterate tương tự với continue

```sql
CALL LoopDemo();
+-------------+
| str         |
+-------------+
| 2,4,6,8,10, |
+-------------+
1 row in set (0.01 sec)

Query OK, 0 rows affected (0.02 sec)
```

# 4. Error handling
Cú pháp 
```sql
DECLARE action HANDLER FOR condition_value statement;
```
action có các gia trị
- continue: tiếp tục chạy SP
- exit: dừng SP, chạy code block trong BEGIN END handler

condition_value có thể nhận giá trị
- A MySQL error code. https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html
- giá trị SQLSTATE, hoặc SQLWARNING , NOTFOUND, SQLEXCEPTION ...
VD: 
```sql
CREATE TABLE SupplierProducts (
    supplierId INT,
    productId INT,
    PRIMARY KEY (supplierId , productId)
);
```

```sql
DELIMITER $$
CREATE PROCEDURE InsertSupplierProduct(
    IN inSupplierId INT, 
    IN inProductId INT
)
BEGIN
    -- exit if the duplicate key occurs
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
 	SELECT CONCAT('Duplicate key (',inSupplierId,',',inProductId,') occurred') AS message;
    END;
    
    -- insert a new row into the SupplierProducts
    INSERT INTO SupplierProducts(supplierId,productId)
    VALUES(inSupplierId,inProductId);
    
    -- return the products supplied by the supplier id
    SELECT COUNT(*) 
    FROM SupplierProducts
    WHERE supplierId = inSupplierId;
    
END$$

DELIMITER ;
```
Cách hoạt động
Khi có lỗi xảy ra, duplicate key 1062, Sẽ chạy terminate procedure, sau đó thực thi block code begin-end của handler trả về message 

```sql
CALL InsertSupplierProduct(1,1);
CALL InsertSupplierProduct(1,2);
CALL InsertSupplierProduct(1,3);
CALL InsertSupplierProduct(1,3);
+------------------------------+
| message                      |
+------------------------------+
| Duplicate key (1,3) occurred |
+------------------------------+
1 row in set (0.01 sec)
```
Nếu thay exit thành continue ở trên handler thi câu lệnh select vẫn được chạy, và trả về giá trị
```sql
DECLARE EXIT HANDLER FOR 1062
BEGIN
SELECT CONCAT('Duplicate key (',inSupplierId,',',inProductId,') occurred') AS message;
END;

CALL InsertSupplierProduct(1,3);
+----------+
| COUNT(*) |
+----------+
|        3 |
+----------+
1 row in set (0.01 sec)

Query OK, 0 rows affected (0.02 sec)
```