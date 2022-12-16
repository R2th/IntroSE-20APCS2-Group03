Trong bài viết lần này chúng ta sẽ cùng nhau tìm hiểu  hàm, thủ tục và trigger trong SQL Server là cái gì và được sử dụng  như thế nào và cùng xem thử chúng có đáng sợ, nguy hiểm và  cao siêu như những gì mọi người thường nghĩ hay không :kissing:

(Những ví dụ trong bài viết dựa trên cơ sở dữ liệu sakila - https://dev.mysql.com/doc/sakila/en/sakila-installation.html)

##  Stored procedure (Thủ tục)

###  Stored procedure là cái gì?

* Là đoạn chương trình kịch bản (programming scripts) với các câu lệnh SQL nhúng (embedded SQL) được lưu dưới dạng đã được biên dịch và thi hành thực tiếp bởi MySQL server, 

* SP cho phép lưu trữ các logic ứng dụng trên CSDL. Khi gọi SP lần đầu tiên, MySQL sẽ tạo một lịch thực thi và lưu trữ nó trong bộ nhớ đệm. Ở những lần gọi hàm tiếp theo, MySQL sử dụng sử dựng lại lịch thực thi được lưu rất nhanh với hiệu xuất đáng tin cậy.

* SP là một mã SQL đã chuẩn bị sẵn mà bạn có thể lưu, do đó đoạn mã có thể được sử dụng lại nhiều lần.

* Vì vậy, nếu bạn có một truy vấn SQL mà bạn viết đi viết lại nhiều lần, hãy lưu nó dưới dạng một thủ tục được lưu trữ, sau đó chỉ cần gọi nó để thực thi nó.

* Cũng có thể chuyển các tham số cho một thủ tục được lưu trữ, để thủ tục được lưu trữ có thể hoạt động dựa trên (các) giá trị tham số được truyền vào.

### Vì sao nên dùng Stored procedure

* Giảm dư thừa mã chương trình: Các đoạn mã tương tự trong các ứng dụng như thêm, cập nhật có thể lưu ở phía CSDL

* Cải thiện tốc độ thực thi câu lệnh SSQL

* Bảo trì: Nếu có sự thay đổi trong CSDL, mã lệnh cần thay đổi có thể xác định trong các SP

* An ninh CSDL tốt hơn: Trong các ứng dụng an ninh cao, với SP có thể kiểm soát truy cập dữ liệu và đưa ra các qui định an ninh tập trung.

### Nhược điểm của Stored procedure

* Thiếu tính khả chuyển (Lack of Portability)
    * SP khó chuyển từ một DBMS sang một DBMS khác. Yêu cầu lập trình và kiểm thử lại đáng kể
        * SQLServer: T-SQL
        * Oracle: PL-SQL
* Tải DB Server
    * Sử dụng SP nhiều có thể gây quá tải MySQL server (SQL Server phải lưu trữ quá nhiều kế hoạc thực thi)
* Hạn chế ngôn ngữ lập trình
    * Lập trình SP không phong phú như các nền tảng phát triển khác như Java hay PHP 
    * Lưu ý: Các phiên bản tương lai của MySQL có thể cung cấp các giao diện cho phép tạo các SP sử dụng các ngôn ngữ bên ngoài, ví dụ Java


### Sử dụng Stored Procedure khi?
- Thực hiện những phép toán phức tạp, lặp lại nhiều lần
- Project đòi hỏi nghiêm ngặt về tốc độ thực thi . Stored Procedure cho tốc độ thực thi nhanh hơn so với các câu lệnh SQL Server thông thường vì Stored Procedure đã được lưu sẵn tại SQL server, do vậy nó chỉ cần gọi một dòng lệnh để thực thi Stored Procedure, điều này giúp tăng tốc độ thực thi.
- Trong quá trình tạo Stored Procedure, SQL Server đã tối ưu hóa những dòng lệnh này, điều này giúp cho tốc độ thực thi cao hơn câu lệnh SQL thông thường rất nhiều.

### Không cần sử dụng Stored Procedure khi?

- Store Procedured làm quá trình debug trở nên khó khăn hơn. 

Vì vậy hãy nghĩ đến Stored Procedure như là phương án cuối cùng để tối ưu hóa tốc độ thực thi chương trình. 
Các project có size nhỏ và vừa nên ưu tiên sử dụng các thư viện ORM (Object Relation Mapping), như Entity Framework cho C#, TypeORM cho NodeJs. 

### Sự khác nhau của Thủ tục, Hàm 

|  | Thủ tục (PROCEDURE) | Hàm (FUNCTION) |
| -------- | -------- | -------- |
|Cách gọi     |CALL     | Sử dụng các câu lệnh trong sql như SELECT, UPDATE     |
|Giá trị trả về    | Có thể một hoặc nhiều kết quả SELECT và các tham số out     | Trả về một giá trị duy nhất thông qua RETURN     |
| Các tham số    | Giá trị (input) và tham chiếu (output) Các tham số (IN, OUT, INOUT)     | Chỉ các giá trị tham số vào (input). Không cần các thẻ như IN..     |
| Gọi thủ tục/hàm     | Có thể gọi các thủ tục và hàm khác     | Chỉ có thể gọi các hàm khác     |


### Cú pháp tạo Thủ tục/Hàm

`CREATE FUNCTION name ([parameterlist]) RETURNS datatype [options] sqlcode `

`CREATE PROCEDURE name ([parameterlist]) [options] sqlcode `

#### Ví dụ

Tạo một thủ tục tên uspActorList trả về danh sách first_name, last_name của các actor sắp xếp theo first_name

```
CREATE PROCEDURE uspActorList
AS
BEGIN
    SELECT 
        first_name, 
        last_price
    FROM 
        actor
    ORDER BY 
        first_name;
END;
```

Tạo một thủ tục tên uspActorList có tham số đầu vào là max_id trả về danh sách first_name, last_name của các actor sắp xếp theo first_name và có id < max_id

```
CREATE PROCEDURE actorList(IN max_id INT)
AS
BEGIN
    SELECT 
        first_name, 
        last_price
    FROM 
        actor
    WHERE
        actor_id < max_id
    ORDER BY 
        first_name;
END;
```

Tạo một function tên film_in_stock trả về số lượng  với đầu vào (IN) là p_film_id, p_store_id, đầu ra (OUT) là p_film_count

```

CREATE PROCEDURE film_in_stock(IN p_film_id INT, IN p_store_id INT, OUT p_film_count INT)
READS SQL DATA
BEGIN
     SELECT inventory_id
     FROM inventory
     WHERE film_id = p_film_id
     AND store_id = p_store_id
     AND inventory_in_stock(inventory_id);

     SELECT FOUND_ROWS() INTO p_film_count;
END $$

```

### Các câu lệnh khác

#### DELIMITER $$

* Thường được sử dụng khi xác định các hàm, thủ tục và trình kích hoạt (trong đó bạn phải sử dụng nhiều câu lệnh). Dấu ` $$` được sử dụng để xác định phần đầu của toàn bộ thủ tục,  bên trong các câu lệnh riêng lẻ được kết thúc bởi `;`. Bằng cách đó, khi mã được chạy trong máy khách mysql, máy khách có thể cho biết nơi toàn bộ thủ tục kết thúc và thực thi nó như một đơn vị thay vì thực thi các câu lệnh riêng lẻ bên trong.

* Lưu ý rằng từ khóa DELIMITER chỉ là một chức năng của command line mysql client (và một số máy khách khác) và không phải là một cấu trúc của SQL thông thường. Nó sẽ không hoạt động nếu  chuyển nó qua một API ngôn ngữ lập trình đến MySQL. Một số ứng dụng khách khác như PHPMyAdmin có các phương thức khác để chỉ định dấu phân cách không mặc định.

#### Gán giá trị cho biến

Sử dụng SET hoặc SELECT INTO.

VD: 

`SET @model_year = 2018;`

#### Gọi thủ tục:

`Call film_in_stock(1,1, @film_count);`

`Select @film_count;`

#### Mệnh đề IF THEN

```
IF condition THEN 
commands; 
[ELSEIF condition THEN 
commands;] 
[ELSEcommands;] 
END IF; 
```

#### Mệnh đề CASE

```
CASE expression 
WHEN value1 THEN commands; 
[WHEN value2 THEN commands;] 
[ELSE commands;] 
END CASE; 
```

#### Mệnh đề REPEAT UNTIL

```
[loopname:] 
REPEAT commands; 
UNTIL condition 
END REPEAT [loopname]; 
```

#### Mệnh đề WHILE

```
[loopname:] 
WHILE condition DO commands;
 END WHILE [loopname];
```

#### Mệnh đề LEAVE
* LEAVE dùng thoát khỏi vòng lặp
* LEAVE cũng có thể dùng để thoát khỏi BEGIN-END

Tương tự như mệnh đề BREAK trong các ngôn ngữ lập trình khác

#### Xử lý lỗi thông qua Handlers

* Luôn có khả năng Store Procedure gặp lỗi trong khi thực thi  các lệnh SQL. MySQL cung cấp kỹ thuật xử lý lỗi thông qua Handler

* Một handler cần định nghĩa sau khai báo các biến, con trỏ và điều kiện, nhưng trước các lệnh SQL

* Cú pháp khai báo một Handler
   
                                `DECLARE type HANDLER FOR condition1, condition2, condition3, ... statement; `
  * type: CONTINUE hoặc EXIT
  * condition(s): Các điều kiện mà handler sẽ được gọi (VD: Not found, SqlException,..)
  * statement: Câu lệnh sẽ thi hành khi có điều kiện xảy ra
  
VD: Nếu không tim thấy (NOT FOUND) customer_id là khách hàng chưa trả đĩa thuê có id được lưu trong kho là p_inventory_id thì sẽ trả về NULL
```
CREATE FUNCTION inventory_held_by_customer(p_inventory_id INT) RETURNS INT
READS SQL DATA
BEGIN
  DECLARE v_customer_id INT;
  DECLARE EXIT HANDLER FOR NOT FOUND RETURN NULL;

  SELECT customer_id INTO v_customer_id
  FROM rental
  WHERE return_date IS NULL
  AND inventory_id = p_inventory_id;

  RETURN v_customer_id;
END $$

```

### Quản lý store procedure

* Hiển thị tất cả những Stored procedure đang tồn tại trong tất cả các cơ sở dữ liệu

    `SHOW PROCEDURE STATUS;`

* Hiển thị tất cả những Function đang tồn tại trong tất cả các cơ sở dữ liệu

    `SHOW FUNCTION STATUS;`

* Nếu chỉ muốn hiển thị ra stored procedure của một cơ sở dữ liệu cụ thể sử dụng câu lệnh:

    `SHOW PROCEDURE STATUS WHERE Db = 'db_name';`

* Tương tự với functions:

    `SHOW FUNCTION STATUS WHERE Db = 'db_name';`

    `SHOW FUNCTION STATUS LIKE 'repeat%'; `

    `SHOW PROCEDURE STATUS LIKE 'film%'; `

* Hiển thị thông tin cụ thể của một procedure

    `SHOW CREATE PROCEDURE <name procedure>;`

### Ví dụ
1. Tạo một stored procedure tên là displayFilmInfo nhận category_id và language_id như là các tham số:

* Nếu category_id và language_id được chỉ rõ, trả lại thông tin các film có
category_id và language bằng các giá trị truyền vào.
* Nếu 0 được truyền như một tham số cho language_id thì trả lại thông tin
các film có category_id là tham số truyền vào.
* Nếu 0 được truyền như một tham số cho category_id thì trả lại các film có
language_id là tham số truyền vào.

```
DELIMITER $$
DROP PROCEDURE IF EXISTS displayFilmInfo;
CREATE PROCEDURE displayFilmInfo(IN p_category_id INT, IN p_language_id INT)
BEGIN
    IF(p_language_id = 0) THEN
        SELECT film.film_id FROM film
        JOIN film_category ON film.film_id = film_category.film_id AND film_category.category_id = p_category_id;

    ELSEIF (p_category_id = 0) THEN
        SELECT film.film_id FROM film
        WHERE film.language_id = p_language_id;

    ELSEIF (p_language_id > 0 AND p_category_id > 0) THEN
        SELECT film.film_id FROM film
        JOIN film_category ON film.film_id = film_category.film_id AND film_category.category_id = p_category_id
        WHERE film.language_id = p_language_id;

    END IF;
END $$
DELIMITER ;
# thực thi procedure
CALL displayFilmInfo(1,1);
```
Kết quả
```

mysql> CALL displayFilmInfo(1,1);
+---------+
| film_id |
+---------+
|      19 |
|      21 |
|      29 |
|      38 |
|      56 |
|      67 |
....
64 rows in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

```

2. Viết hàm tính tổng số đĩa film được thuê của của hàng trong tháng, năm. Với tham số đầu vào là mã của hàng, tháng, năm. Sau đó sử dụng hàm trong lệnh SELECT đưa ra các cửa hàng và tổng số film được thuê tại cửa hàng trong tháng 2/2006.

* Procedure
```
DELIMITER $$
DROP PROCEDURE IF EXISTS total_movies;
CREATE PROCEDURE  total_movies(IN p_store_id INT, IN p_month INT, IN p_year INT)
BEGIN
    SELECT inventory.store_id as store,count(rental.inventory_id) FROM inventory
        JOIN rental ON inventory.inventory_id = rental.inventory_id AND month(rental.rental_date)=p_month AND year(rental.rental_date)=p_year
    GROUP BY inventory.store_id 
    HAVING inventory.store_id=p_store_id;
END$$
DELIMITER ;

call total_movies(1,2,2006);
```
Kết quả
```
mysql> call total_movies(1,2,2006);
+-------+----------------------------+
| store | count(rental.inventory_id) |
+-------+----------------------------+
|     1 |                         92 |
+-------+----------------------------+
1 row in set (0.03 sec)

Query OK, 0 rows affected (0.03 sec)

```

* Function:

```
DELIMITER $$
DROP FUNCTION IF EXISTS total_inventory;
CREATE FUNCTION total_inventory (p_store_id INT, p_month INT, p_year INT) RETURNS int
BEGIN
    DECLARE v_out INT;
    SELECT count(rental.inventory_id) INTO v_out FROM inventory
    JOIN rental ON inventory.inventory_id = rental.inventory_id AND month(rental.rental_date)=p_month AND year(rental.rental_date)=p_year
    GROUP BY inventory.store_id 
    HAVING inventory.store_id=p_store_id;
    return v_out;
END$$
DELIMITER ;

select store_id, total_inventory(store_id,2,2006) from store; 
```
Kết quả

```
mysql> select store_id, total_inventory(store_id,2,2006) from store; 
+----------+----------------------------------+
| store_id | total_inventory(store_id,2,2006) |
+----------+----------------------------------+
|        1 |                               92 |
|        2 |                               90 |
+----------+----------------------------------+
2 rows in set (0.07 sec)
```
## Trigger (Hàm)

###  Trigger là cái gì?


* Triggers là quá trình tự động thi hành các lệnhSQL hoặc SP sau hoặc trước các lệnh INSERT, UPDATE, hoặc DELETE. 
* Các ứng dụng có thể bao gồm: lưu lại thay đổi hoặc cập nhật dữ liệu các bảng khác.
* Trigger chạy sau mỗi câu lệnh cập nhật bảng do đó có thể thêm tải với CSDL 

### Cú pháp
```
CREATE TRIGGER name BEFORE | AFTER INSERT |UPDATE | DELETE ON tablename 
	FOR EACH ROW sql-code 
```

Cú pháp lệnh bên trong tương tự SP

Trong trigger, mã lệnh có thể truy cập các cột của bản ghi hiện tại

* OLD.columnname trả lại nội dung của bản ghi trước khi bị thay đổi hoặc xóa (UPDATE, DELETE)
*  NEW.columnname trả lại nội dung của bản ghi mới hoặc bản ghi thay thế (INSERT, UPDATE)


### Ví dụ

```
DELIMITER $$

CREATE TRIGGER `upd_film` AFTER UPDATE ON `film` FOR EACH ROW BEGIN
    IF (old.title != new.title) or (old.description != new.description)
    THEN
        UPDATE film_text
            SET title=new.title,
                description=new.description,
                film_id=new.film_id
        WHERE film_id=old.film_id;
    END IF;
  END;;
DELIMITER ;

```
Tạo trigger trên bảng payment, mỗi khi thêm, sửa bảng payment sẽ cập nhật thông tin đó cùng với thông tin là thời gian thêm, sửa vào bảng payment_log (tạo thêm)
```
drop table payment_log;
show create table payment;
CREATE TABLE payment_log (
   payment_id smallint(5) DEFAULT NULL,
   customer_id smallint(5)  DEFAULT NULL ,
   staff_id tinyint(3) unsigned DEFAULT NULL,
   rental_id int(11) DEFAULT NULL,
   amount decimal(5,2) DEFAULT NULL,
   payment_date datetime DEFAULT NULL,
   changedate DATETIME DEFAULT NULL,
    action VARCHAR(50) DEFAULT NULL
   );
   

DELIMITER $$
DROP TRIGGER if exists update_payment;
CREATE TRIGGER update_payment AFTER UPDATE ON payment
FOR EACH ROW
BEGIN
    INSERT INTO payment_log 
    SET action = 'update',
            payment_id = OLD.payment_id,
            customer_id = OLD.customer_id,
            staff_id = OLD.staff_id,
            rental_id = OLD.rental_id,
            amount = OLD.amount,
            payment_date = OLD.payment_date,
            changedate = NOW();
END$$
DELIMITER ;
```

### Quản lý trigger
* Trigger được lưu trữ 
* Trigger is stored as plain text file in the database folder as follows: /data_folder/database_name/table_name.trg, 
* Để hiển thị các trigger gắn với 1 bảng dữ liệu

    SELECT * FROM \`Information_Schema\`.\`Triggers\` WHERE Trigger_schema = 'database_name'
*  Xóa một trigger

     `DROP TRIGGER tablename.triggername `
*  Thay đổi một trigger

    `ALTER TRIGGER, SHOW CREATE TRIGGER, hoặc SHOW TRIGGER STATUS. `



Đọc xong bạn cảm thấy có zui hông? :kissing_heart: