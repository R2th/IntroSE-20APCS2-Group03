Việc truy vấn data trên 1 bảng thì khá đơn giản và dễ dùng trong SQL.
Nhưng với từ 2 bảng trở lên, query sẽ trở nên khó khăn hơn khi phải móc nối nhiều table với nhau. Phải tìm được điều kiện và cách nối thích hợp để truy vấn được data mà bạn mong muốn. 

Trong bài này mình sẽ giới thiệu tới những cách sử dụng câu lệnh Joins trong SQL. Tùy theo ngữ cảnh và mục đích sử dụng. Hi vọng bạn sẽ lựa chọn được cách dùng thích hợp.

Dữ liệu mình đưa ra để ví dụ có 2 bảng như sau 

table1:  **Orders** 
| OrderID | CustomerID |  OrderDate | 
| --------| -------- | -------- | 
| 10101| CU001     | 2021-09-18     |  
| 10102| CU002     | 2021-09-18     | 
| 10103| CU001     | 2021-09-20    |  
| 10104| CU004     | 2021-09-20    |   

table2:  **Customers** 
| CustomerID | CustomerName| Address | City |
| -------- | -------- | -------- |-------- |-------- |
| CU001     | Nam Hà     | 16 Lý Thường Kiệt     |Đà Nẵng     |
| CU002     | Văn Thanh     | 10 Hùng Vương     |Hà Nội|
| CU003     | Cẩm Tú     | 14 An Thượng     |Hải Phòng|


### 1.  INNER JOIN
--> Kết nối dựa trên dữ liệu chung của 2 bảng 

**Syntax** 
```
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

**Example** 

```
SELECT Orders.OrderID, Customers.CustomerName,Customers.Address,Customers.City
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

Thực hiện so sánh bảng [Orders] và [Customers]. 

* Với mỗi dòng ở table Orders thực hiện tìm các dòng tương ứng ở bảng Customers. 
* Nếu tìm thấy dòng thỏa mãn điều kiện có cùng CustomerID sẽ thực hiện thêm dòng vào kết quả tương ứng.
*  Trường hợp tìm được nhiều dòng thõa mãn thì nhiều dòng kết quả sẽ được hiển thị 

**Result**
| OrderID | CustomerName| Address |City |  
| -------- | -------- |  -------- |   -------- | 
| 10101     | Nam Hà     |  16 Lý Thường Kiệt     |Đà Nẵng     |
| 10102     | Văn Thanh    | 10 Hùng Vương     |Hà Nội|
| 10103|Nam Hà     | 16 Lý Thường Kiệt     | Đà Nẵng     |
 
### 2.  LEFT JOIN
**Syntax** 
```
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

**Example** 

```
SELECT Orders.OrderID, Customers.CustomerName,Customers.Address,Customers.City
FROM Orders
LEFT JOIN Customers 
ON Orders.CustomerID = Customers.CustomerID;
```

Thực hiện so sánh bảng [Orders] và [Customers]. 

* Cách làm tương tự với INNER JOIN tuy nhiên với các dòng ở bảng Orders nếu không tìm được dòng tương ứng ở Customers vẫn được hiển thị. Lúc này các giá trị tương ứng ở table Customers sẽ hiển thị NULL 


**Result**
| OrderID | CustomerName| Address |City |  
| -------- | -------- |  -------- |   -------- | 
| 10101     | Nam Hà     |  16 Lý Thường Kiệt     |Đà Nẵng     |
| 10102     | Văn Thanh    | 10 Hùng Vương     |Hà Nội|
| 10103|Nam Hà     | 16 Lý Thường Kiệt     | Đà Nẵng     |
| 10104|*null*     | *null*     | *null*     |


### 3.  RIGHT JOIN

**Syntax** 
```
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```
Note:  RIGHT JOIN hoặc  RIGHT OUTER JOIN đều được nhé. 

**Example** 

```
SELECT Orders.OrderID, Customers.CustomerName,Customers.Address,Customers.City
FROM Orders
RIGHT JOIN Customers 
ON Orders.CustomerID = Customers.CustomerID;
```

Thực hiện so sánh bảng [Orders] và [Customers]. 

* Cách làm tương tự với INNER JOIN tuy nhiên với các dòng ở bảng Customers không tương ứng với bảng Orders vẫn được hiển thị. Lúc này các giá trị tương ứng ở table Orders sẽ hiển thị NULL 


**Result**
| OrderID | CustomerName| Address |City |  
| -------- | -------- |  -------- |   -------- | 
| 10101     | Nam Hà     |  16 Lý Thường Kiệt     |Đà Nẵng     |
| 10102     | Văn Thanh    | 10 Hùng Vương     |Hà Nội|
| 10103|Nam Hà     | 16 Lý Thường Kiệt     | Đà Nẵng     |
| *null*     | Cẩm Tú     | 14 An Thượng     |Hải Phòng|

### 4.  FULL JOIN
**Syntax** 
```
SELECT column_name(s)
FROM table1
FULL JOIN table2
ON table1.column_name = table2.column_name
```
Note:  FULL JOIN hoặc  FULL OUTER JOIN đều được nhé. 

**Example** 
```
SELECT Orders.OrderID, Customers.CustomerName,Customers.Address,Customers.City
FROM Orders
FULL JOIN Customers 
ON Orders.CustomerID = Customers.CustomerID;
```

Thực hiện so sánh bảng [Orders] và [Customers]. 

* Cách làm tương tự với INNER JOIN tuy nhiên với các dòng ở bảng Customers không tương ứng với bảng Orders vẫn được hiển thị. Lúc này các giá trị tương ứng ở table Orders sẽ hiển thị NULL 
* Các dòng ở bảng Orders không tương ứng với bảng Customers vẫn được được hiển thị. Lúc này các giá trị tương ứng ở table Customers sẽ hiển thị NULL

**Result**
| OrderID | CustomerName| Address |City |  
| -------- | -------- |  -------- |   -------- | 
| 10101     | Nam Hà     |  16 Lý Thường Kiệt     |Đà Nẵng     |
| 10102     | Văn Thanh    | 10 Hùng Vương     |Hà Nội|
| 10103|Nam Hà     | 16 Lý Thường Kiệt     | Đà Nẵng     |
| 10104|*null*     | *null*     | *null*     |
| *null*     | Cẩm Tú     | 14 An Thượng     |Hải Phòng|


### 5.  SELF JOIN
--> Ngoài việc join từ 2 bảng thì chúng ta có thể tự join chính nó để truy vấn và tìm ra những dữ liệu cần dùng tới.

**Syntax** 
```
SELECT column_name(s)
FROM table1 T1, table1 T2
WHERE condition;
```

**Example** 
```
SELECT A.OrderID as Order01, B.OrderID as Order02, A.OrderDate
FROM Orders A, Orders B
WHERE A.OrderID <> B.OrderID
AND A.OrderDate = B.OrderDate 
```

Bảng [Orders] được kết hợp ngay với chính nó, để tìm ra các OrderID có cùng OrderDate

**Result**
| Order01 | Order02| OrderDate |  
| -------- | -------- |  -------- |  
| 10101     |10102  | 2021-09-18      |
| 10103     | 10104|  2021-09-20|


### Different Types of SQL JOINs
Dưới đây là một cái nhìn tổng quát để bạn dễ dàng so sánh sự khác nhau giữa các loại Joins. 
Hi vọng bài viết sẽ có ích giúp bạn. 
![](https://images.viblo.asia/e31c27a2-2c04-4403-bb81-7594952e1a42.png)

Bài viết có tham khảo https://www.w3schools.com