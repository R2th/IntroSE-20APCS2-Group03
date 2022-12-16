MySQL rất là phổ biến, được sử dụng nhiều, nhưng mọi người thường hay quên mất cú pháp của nó, lúc nào cần dùng lại đi tra google. Vì thế bài viết này sẽ tổng hợp lại các cú pháp, từ cơ bản cho đến nâng cao, để lúc nào cần mọi người có thể tiện sử dụng luôn.

### Kết nối tới MySQL Server
Bước đầu tiên để làm việc với MySQL database là kết nối với nó. Trong terminal, gõ lệnh:
```
mysql [-h machine] -u <user> -p [db_name]
```
Nếu server và client đều chạy trên cùng 1 máy, không cần thiết phải thêm `-h`. `db_name` cũng không bắt buộc, vì trong phần tiếp theo, ta sẽ thấy có thể tạo và thay đổi database hiện tại chỉ với 1 câu lệnh.  Để kết thúc kết nối tới MySQL, ta có thể gõ `\q`, `quit` hoặc `Ctrl + D`.

### Tạo User và Database
MySQL làm việc với user mặc định là root, tuy nhiên nó chỉ nên dùng để quản lý database, không phải để thao tác dữ liệu. Đó là lý do chúng ta nên tạo user. 
```
CREATE USER 'mike' IDENTIFIED BY 'difficultpassword'
CREATE USER 'mike'@'localhost' IDENTIFED BY 'difficultpassword'
```
Đoạn code trên, chúng ta không tạo ra 2 user, mà là 1 user có thể sử dụng được kể cả khi client ở trong hay bên ngoài server. Giờ chúng ta sẽ xem cách để tạo database và phân quyền cho các user khác nhau.
```

-- Tạo database
CREATE DATABASE University;

-- Chọn database để sử dụng
USE University;

-- Phân quyền
GRANT ALL ON University TO mike
GRANT INSERT, UPDATE ON University.Students TO william
GRANT SELECT(id, name) ON University.Teachers TO john 

-- Xóa database
DROP DATABASE University;
```

### Tạo bảng
Bảng là khái niệm cốt lõi của hệ quản trị cơ sở dữ liệu như MySQL. Chúng ta sẽ học cách tạo bảng đơn giản, và cách để set primary keys, restrictions, foreign keys, và giá trị mặc định.
```
CREATE TABLE Teachers (name VARCHAR(30), age INT);

-- Primary key:
CREATE TABLE Teachers (id INT PRIMARY KEY, name VARCHAR(30), age INT); # primary key: id, không thể lặp lại
CREATE TABLE Students (id INT, name VARCHAR(30), age INT, PRIMARY KEY (code, name, age)); # primary key là tổ hợp
CREATE TABLE Subjects (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(30)); # primary key tăng tự động, bắt đầu từ 1, 2, 3...

-- Restrictions:
CREATE TABLE Teachers (id INT PRIMARY KEY NOT NULL, name VARCHAR(30) NOT NULL, age INT NOT NULL); # NOT NULL: giá trị cột này không thể rỗng
CREATE TABLE Teachers (id INT PRIMARY KEY, name VARCHAR(30), age INT, CHECK (age>18 and age<70)); # CHECK: giá trị của cột phải tuân theo điều kiện
CREATE TABLE Students (id INT, name VARCHAR(30), age INT, passport VARCHAR (20), UNIQUE(passport)); # UNIQUE: giá trị của cột này là duy nhất, không trùng lặp giữa các bản ghi.

-- Foreign keys:
CREATE TABLE Studies (student INT NOT NULL, subject INT NOT NULL, FOREIGN KEY (student) REFERENCES Students(id), FOREIGN KEY (subject) REFERENCES Subjects(id)); # foreign keys: mối quan hệ giữa các bảng

-- Default values:
CREATE TABLE Students (id INT, name VARCHAR(30), age INT, country VARCHAR(20) DEFAULT "Spain"); # nếu thuộc tính "country" không được chỉ định, nó sẽ lưu giá trị mặc định là "Spain"
```
### Thêm bản ghi
Sau khi tạo bảng, bước tiếp theo là thêm data. Ví dụ tiếp theo bao gồm cả cách thêm 1 bản ghi và nhiều bản ghi cùng lúc
```
-- Thêm 1 bản ghi, cung cấp giá trị cho từng cột
INSERT INTO Students VALUES (1, 'Peter', 25);

-- Thêm 1 bản ghi, không cung cấp đủ giá trị cho tất cả các cột
INSERT INTO Students(id, name) VALUES (1, 'Peter');

-- Thêm nhiều bản ghi cùng lúc
INSERT INTO Students VALUES (1, 'Peter', 25), (2, 'Frank', 19), (3, 'William', 21);
```
### Thực hiện truy vấn
Truy vấn sẽ được hoàn thành chỉ với một câu lệnh `SELECT`, nó cho phép chúng ta lấy dữ liệu từ database. MySQL cho phép chúng ta thực hiện các câu truy vấn phức tạp, lấy dữ liệu từ nhiều bảng hoặc tạo các toán tử logic từ kết quả của các câu query khác.
```
-- Truy vấn cơ bản
SELECT * FROM Students;

-- Lấy 1 vài cột và lọc kết quả
SELECT name, country FROM Students WHERE age>28;

-- Giới hạn số lượng kết quả trả về và sắp xếp theo trình tự alphabetically
SELECT * FROM Students SORT BY name LIMIT 20;

-- Lấy tổng số học sinh của mỗi quốc gia
SELECT COUNT(age) FROM Students GROUP BY country;

-- Lấy tuổi trung bình của các học sinh trong mỗi quốc gia, và chỉ lấy những kết quả nhỏ hơn 30
SELECT AVG(age) FROM Students GROUP BY country HAVING AVG(age)<30;

-- Lấy tên và tuổi của tất cả học sinh và giá viên, nếu dùng UNION thì sẽ chỉ lấy 1 lần nếu giá trị bị duplicate, UNION ALL thì cho phép cả các giá trị duplicate lặp lại
SELECT (name, age) FROM Students UNION ALL SELECT (name, age) FROM Teachers;

-- Join 2 bảng Students và Grades, lấy dữ liệu từ cả 2 bảng
SELECT Student.name, Grades.course, Grades.value FROM Students INNER JOIN Grades ON Students.id = Grades.student_id;

-- Lấy tên của các học sinh lớp A
SELECT name FROM Students WHERE id IN (SELECT student_id FROM Grades WHERE value=='A');
```
### Tạo View
View cho phép chúng ta gói lệnh `SELECT` vào trong 1 view giống như 1 bảng mới. Sau đó chúng ta có thể set quyền cho các user đối với view đó. Tuy nhiên, nếu như lệnh `SELECT` được gói có các hàm tính toán như `SUM`, `MIN`,... hoặc sử dụng `GROUP BY`, `DISTINCT`,... thì không thể thực hiện các thao tác `INSERT`, `UPDATE`, hay `DELETE` với view đó.
```
-- Câu này
SELECT (id, name, age) FROM Students UNION ALL SELECT (id, name, age) FROM Teachers;

-- sẽ tương tự với
CREATE VIEW People AS SELECT (id, name, age) FROM Students UNION ALL SELECT (id, name, age) FROM Teachers;
SELECT * from People;
```
### Thực hiện Transaction
Transaction là 1 nhóm các lệnh, nếu 1 lệnh trong transaction không thành công MySQL sẽ hoàn tác lại các lệnh trước đó.
```
-- Enabling và disabling transactions tự động

SET AUTOCOMMIT = 1; -- mỗi câu SQL là 1 transaction; nó sẽ tự động commit vào DB (mặc định sẽ là cái nafy)
SET AUTOCOMMIT = 0; -- câu SQL không được tự động commit vào DB, vì vậy phải thực hiện thủ công với lệnh COMMIT
COMMIT; -- commits transaction

--  Bắt đầu 1 transaction
START TRANSACTION;
    -- ... các lệnh muốn thực hiện trong transaction ...
COMMIT;
```
### Tạo Stored Procedure
Stored Procedure là một chuỗi câu SQL có thể được gọi bất cứ lúc nào từ console hay file `.sql`. Nó tương tự như function trong các ngôn ngữ lập trình.
```
DELIMITER //
CREATE PROCEDURE get_age(IN user_id INT, OUT user_age INT) -- procedure có 1 tham số truyền vào và 1 biến lưu giá trị trả về
BEGIN
    SELECT age INTO user_age FROM Students WHERE id = user_id;
    -- một vài lệnh gì đó khác --
END //
DELIMITER ; 

CALL get_age(12, @age); -- gọi procedure, truyền 1 tham số và lưu trữ kết quả trong biến @age
```
### Chơi với các biến
Biến là một cách hữu dụng để lưu trữ tạm thời kết quả của câu query hoặc giá trị của 1 cột trong một bản ghi để dùng sau. Có 2 loại biến chính trong MySQL: local và user-defined (hay còn gọi là biến session). Loại đầu tiên được khai báo trước khi sử dụng, và phạm vi của chúng được giới hạn trong `stored procedure`, nơi định nghĩa chúng. Loại thứ 2 không phải khai báo trước, giá trị của nó có thể sử dụng bất cứ lúc nào, nhưng chỉ trong session được tạo bởi client.
```
-- Local variables (phải được khai báo ở trong STORED PROCEDURE)
DECLARE john_age INT; -- khai báo biến
SET john_age = 21; -- set giá trị cứng cho biến
SELECT age INTO jonh_age FROM Students WHERE id = 10; -- lưu kết quả câu query vào trong biến

-- Session (user-defined) variables
SET @current_age = 21; -- không cần khai báo trước
SELECT age INTO @current_age FROM Students WHERE id = 10; -- lưu kết quả câu query vào trong biến
```
### Chơi với Cursors
Cursor là một công cụ giống như vòng lặp chạy qua từng bản ghi trong kết quả của câu truy vấn. Nó sẽ rất hữu dụng khi muốn chuyển mỗi bản ghi thành 1 object chẳng hạn. Cách khai báo và sử dụng cũng rất dễ dàng:
```
-- Khai báo cursor
DECLARE end_cursor BOOLEAN DEFAULT FALSE; -- trả về true khi cursor chạy đến bản ghi cuối cùng
DECLARE my_cursor CURSOR FOR SELECT * from Students;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET end_cursor = TRUE;

-- chạy vòng lặp thông qua cursor
WHILE NOT end_cursor DO
    FETCH cursor INTO @my_student;
    -- Làm cái gì bạn muốn với bản ghi cursor --
END WHILE;
```
### Điều khiển luồng
Bên trong stored procedure, chúng ta có thể điều khiến luồng, giống như trong các ngôn ngữ lập trình khác
```
-- if-else
IF boolean_condition THEN
    -- ... instructions ...
[ELSEIF boolean_condition THEN] 
    -- ... instructions ...
ELSE
    -- ... instructions ...
END IF

-- normal loop
LOOP
    -- ... instructions ...
    LEAVE; -- cái này vô cùng quan trọng để rời khỏi vòng lặp, nếu không, nó sẽ chạy mãi mãi
END LOOP;

-- while loop
WHILE boolean_condition DO
    -- ... instructions ...
END WHILE;

-- do-while loop
REPEAT
    -- ... instructions ...
UNTIL boolean_condition;
END REPEAT;
```
### Tạo Trigger
Trigger là một phương thức được chạy trước hoặc sau một hành động nào đó, ví dụ như insert, update, hay delete trong table hoặc view. Chúng ta cần cẩn thận với trigger vì nó có thể tốn khá nhiều tài nguyên server.
```
-- Triggered chạy sau INSERT trong table "Students"
CREATE TRIGGER my_trigger AFTER INSERT ON Students FOR EACH ROW
BEGIN
    -- ... lệnh muốn thực hiện ... --

END;

-- Triggered chạy trước DELETE trong bảng "Teachers"
CREATE TRIGGER my_trigger BEFORE DELETE ON Teachers FOR EACH ROW
BEGIN
    -- ... lệnh muốn thực hiện ... --

END;
```
### Tạo một Scheduled Event
Scheduled Event là một trigger được thực thi vào một tời điểm cụ thể nào đó. Có sự kiện diễn ra 1 lần, lên lịch vào ngày, giờ cụ thể nào đó, hoặc là các sự kiện định kì, chạy vào mỗi phút, giờ, ngày,... trong 1 khoảng thời gian cố định.
```
SET GLOBAL event_scheduler = ON; -- chắc chắn rằng MySQL event scheduler đã được set ON
    
-- Sự kiện một lần
CREATE EVENT IF NOT EXISTS my_event
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 12 HOUR -- event được chạy vào 12h và sau đó sẽ bị xóa
DO
    DELETE * FROM Logs;

CREATE EVENT IF NOT EXISTS my_event
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 24 MINUTE -- sự kiện sẽ được chạy sau 24 phút...
ON COMPLETION PRESERVE -- ... sau đó sẽ bị xóa
DO
    DELETE * FROM Logs; 
    

-- Sự kiện định kì
CREATE EVENT IF NOT EXISTS my_event
ON SCHEDULE EVERY 1 HOUR -- chạy mỗi giờ
STARTS CURRENT_TIMESTAMP -- ... từ hiện tại ...
ENDS CURRENT_TIMESTAMP + INTERVAL 1 DAY -- ... cho đến ngày hôm sau
DO
    DELETE * FROM Logs; 
```
MySQL rất là phức tạp và có quá nhiều thứ để nói, không thể trình bày hết trong bài viết này. Tuy nhiên những điều trên chắc cũng khá đủ cho phần lớn các mục đích thông thường, nếu cần nhiều hơn, bạn có thể tham khảo [tài liệu chính thức này](https://dev.mysql.com/doc/refman/8.0/en/).

Nguồn: https://medium.com/better-programming/the-mysql-cheatsheet-we-all-need-d1af0377bdc6