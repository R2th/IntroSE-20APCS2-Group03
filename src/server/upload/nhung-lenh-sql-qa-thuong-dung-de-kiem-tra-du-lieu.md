Xin chào mọi người, đối với một QA/Tester, thì tầm quan trọng của SQL là một điều không thể phủ nhận. Vì sao nó quan trọng thì các bạn đọc thêm ở bài viết trước của mình nhé ( link bài viết trước ). Vậy, với tầm quan trọng như thế và đặc biệt là những bạn QA/Tester mới vào nghề, thì SQL có dễ học và dễ dùng không? Thì trong bài viết này, mình sẽ gửi tới các bạn một số câu lệnh SQL ( SQL Statement ) phổ biến và được dùng nhiều trong việc kiểm thử phần mềm của các QA/Tester.

Ok, vào vấn đề thôi. Và những câu lệnh đầu tiên mình muốn gửi đến các bạn đó là:


### 1.  SELECT

Select là một trong những câu lệnh đơn giản và hay sử dụng nhất của QA để lấy dữ liệu kiểm tra. 
    
Cú pháp:
```
SELECT column1, column2, ...
FROM table_name;
```
VÍ dụ: 
```
SELECT * FROM CUSTOMERS;
```

Dấu * dùng để lấy hết tất cả các records trong bảng **CUSTOMERS**. 
Bạn cũng có thể lấy từng cột muốn truy xuất như sau. 

Ví dụ:  Mình muốn lấy tên và tuổi của toàn bộ khách hàng có trog cơ sở dữ liệu thì chúng ta thực hiện với select như sau: 
```
SELECT Name, Age FROM CUSTOMERS;
```

### 2.  WHERE

Nếu ở trên câu lệnh Select dùng để lấy dữ liệu trong các bảng thì Where sẽ là người bạn đồng hành tuyệt vời cũng nó. Muốn thực thi lấy ra dữ liệu với các điều kiện nhất định thì bạn sẽ cần đến WHERE.

Cú pháp: 
```
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```
Ví dụ:  Mình sẽ lấy tất cả các khách hàng có giới tính là nữ.

```
SELECT *
FROM CUSTOMERS
WHERE Gender = 'Female';
```
Bên cạnh đó Where còn có thể sử dụng cho UPDATE và DELETE. Mình sẽ giải thích cụ thể hơn ở phần dưới. 

### 3.  JOIN 
![](https://images.viblo.asia/533c34bf-ede8-4f84-a47d-c049064ae4bb.png)

Join là một lệnh dùng để kết hợp hai hoặc nhiều bảng với nhau để lấy dữ liệu. Có các loại join : 

(INNER) JOIN:  Trả về các bản ghi có giá trị khớp trong cả hai bảng

LEFT (OUTER) JOIN: Trả về tất cả các bản ghi từ bảng bên trái và các bản ghi khớp từ bảng bên phải

RIGHT (OUTER) JOIN: Trả về tất cả các bản ghi từ bảng bên phải và các bản ghi khớp từ bảng bên trái

FULL (OUTER) JOIN: Trả về tất cả các bản ghi có trong bảng bên trái và bên phải.

Ví dụ: 

Cho 2 bảng dữ liệu như sau:

CUSTOMERS (ID, Name, Gender, Birthday,Role_id )

ROLES (ID, Name)

 a. (INNER) JOIN: 

Chỉ lấy tất cả record mapping với điều kiện CUSTOMERS.Role_id = ROLES.ID

```
Select *
From CUSTOMERS 
INNER JOIN ROLES 
ON CUSTOMERS.Role_id = ROLES.ID;
```
b. LEFT  JOIN: 

Với LEFT JOIN mình sẽ lấy được tất cả các Customer có Roles và không có Roles. 
```
Select CUSTOMERS.Name, ROLES.Name 
From CUSTOMERS 
LEFT JOIN ROLES 
ON CUSTOMERS.Role_id = ROLES.ID;
```
c. RIGHT JOIN:

Ở đây tượng tự như LEFT JOIN nhưng nó sẽ hiển thị ngược lại, mình lấy tất cả các Roles có Customers và không có Customers
```
Select CUSTOMERS.Name, ROLES.Name 
From CUSTOMERS 
RIGHT JOIN ROLES 
ON CUSTOMERS.Role_id = ROLES.ID;
```
d. FULL JOIN:

Mình sẽ dùng FULL JOIN để lấy ra các record có Customers.Role_id mapping với Role.ID, tất cả Customers không có role và  tất cả role không có Customers.
```
Select CUSTOMERS.Name, ROLES.Name 
From CUSTOMERS 
FULL JOIN ROLES 
ON CUSTOMERS.Role_id = ROLES.ID;
```

### 4.  GROUP BY

GROUP BY trong SQL được sử dụng với câu lệnh SELECT với các hàm  (COUNT, MAX, MIN, SUM, AVG) để nhóm kết quả được đặt theo một hoặc nhiều cột.

Cú pháp: 
```
SELECT column_name(s)
FROM table_name
WHERE [condition]
GROUP BY column_name(s)
```

Ví dụ:  Mình có một bảng City như hình: 
![](https://images.viblo.asia/466a3227-f91e-4155-b00f-6ee142480331.png)

và mình muốn đếm ứng với mỗi CountryCode sẽ có bao nhiêu người thì mình sẽ đếm theo Name. Mình sẽ thực hiện câu lệnh như sau: 

```
SELECT CountryCode, count(Name)

FROM city

GROUP BY CountryCode;
```

Kết quả sau khi chúng ta dùng GROUP BY như sau: 
![](https://images.viblo.asia/dc1c8330-2e22-4efd-9a15-39115c6953d3.png)


### 5.  ORDER BY
ORDER BY dùng để sắp xếp các bảng ghi theo thứ tự giảm dần (DESC) hoặc tăng dần (ASC)

Cú pháp: 

```
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

Ví dụ: 
Ở ví dụ dành cho Order by mình sẽ lấy lại bảng City khi dùng cho lệnh Group by để các bạn có thể dễ dàng theo dõi hơn. 
Bây giờ mình muốn sắp xếp tên các thành phố theo thứ tự tăng dần (ASC) của ID mình sẽ thực hiện câu lệnh như sau: 

```
SELECT * 

FROM city 

ORDER BY ID asc;
```
Kết quả thu được của chúng ta sẽ như sau: 
![](https://images.viblo.asia/cbaab791-8611-4b04-9890-53f8a49afb0e.png)

### 6. INSERT

INSERT  là lệnh dùng để thêm một record vào bảng. Có hai cách để bạn thêm một record vào một bảng. 
Nếu bạn muốn thêm giá trị vào các cột được chỉ định: 

Cú pháp: 

```
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

Trong trường hợp bạn muốn thêm giá trị vào tất cả các cột thì chỉ cần ghi giá trị mà không cần ghi rõ tên cột. 

Cú pháp:
```
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

Ví dụ: Thêm một khách hàng vào Cơ sở dữ liệu.

```
INSERT INTO CUSTOMERS (Name, Gender, Birthday)
VALUES ('Cadinal' , 'Male' , '12-01-1987');
```

### 7. UPDATE

Khi bạn muốn thay đổi dữ liệu của một bản ghi có sẵn trong cơ sở dữ liệu thì có thể thao tác với lệnh Update. 

Cú pháp: 

```
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

Ở đây mình sẽ dùng lệnh where để kết hợp với Update để chuyển đổi dữ liệu theo điều kiện: 

Ví dụ: Thay đổi ngày sinh của khách hàng có ID = 2

```
UPDATE CUSTOMERS
SET Birthday = '01-03-1987'
WHERE ID = 2;
```

### 8.  DELETE

Nếu Update dùng để hỉnh sửa dữ liệu thì Delete có nhiệm vụ là xóa những record có sẵn trong Database

Cú pháp: 

`DELETE FROM table_name WHERE condition;`

Ví dụ:  Xóa một khách hàng có tên là "Cadinal". 

`DELETE FROM CUSTOMERS WHERE Name = 'Cadinal';`

### 9. ROLLUP

Đối với một QA việc thống kê sữ liệu khi test là điều thường gặp.  Để thống kê dữ liệu, các hệ quản trị cơ sở dữ liệu cung cấp các hàm tổng hợp dữ liệu như AVG(), SUM(), COUNT(),… sử dụng kết hợp với mệnh đề GROUP BY và các tùy chọn như là các hàm ROLLUP  giúp cho việc thống kê dễ dàng hơn.

Cú pháp:

```
SELECT 
    select_list
FROM 
    table_name
GROUP BY
    column1, column2, column3, ... WITH ROLLUP;
```

Ví dụ:  

Mình có 1 bảng động vật (animals), với trường check là số lần kiểm tra chiều cao (height), cân nặng (weight) của mỗi động vật, tương ứng với mỗi trường là giá trị của mỗi lần đo (value)

![](https://images.viblo.asia/151f3d2d-5b3c-47d0-873f-638cf32073ba.png)

Nếu bạn muốn lấy tổng chiều cao (height), cân nặng (weight) ở tất cả các làm check thì chúng ta làm như sau:

```
SELECT `name`, `check`, SUM(value) as 'Sum of all times check'

FROM demo_rollup.animals

GROUP BY `name`, `check`;
```

Kết quả sau khi select như sau: 
![](https://images.viblo.asia/917cd651-4d67-4d0d-9da9-02990ffa69ee.png)

Như các bạn đã thấy, chúng ta đã lấy được tổng chiều cao và cân nặng của từng động cho tất cả các lần check. Nhưng ở đây nếu chúng ta muốn lấy thêm tổng của cả chiều cao và cân nặng thì phải làm sao? Roll up sẽ giúp chúng ta điều này, bạn chỉ cần thêm câu lệnh như sau:

```
SELECT `name`, `check`, SUM(value) as 'Sum of all times check'
FROM demo_rollup.animals
GROUP BY `name`, `check`
WITH ROLLUP;
```

Kết quả hiển thị sau khi Select là: 
)
![](https://images.viblo.asia/fda1cbdf-79c0-4d19-ac25-295c10df2bb5.png)


Vậy là mình đã chia sẻ xong một số câu lệnh phổ biến và được dùng nhiều trong việc kiểm thử của các QA/Tester. Hy vọng qua bài viết này, các bạn có thể thấy được sự hữu ích khi thực hiện các truy vấn SQL để hỗ trợ trong việc kiểm thử phần mềm của mình.

Nếu có bất kỳ thắc mắc hay góp ý cho bài viết này, các bạn hãy comment ở dưới nhé. Mình sẽ phản hồi sớm nhất có thể. Cảm ơn các bạn đã theo dõi bài viết. Hẹn gặp lại các bạn ở bài viết sau.

> Tài liệu tham khảo: 
> 
> https://www.w3schools.com/sql
> 
> http://acegik.net/blog/rdbms/sqlserver/transact-sql-vi-du-minh-hoa-group-by.html