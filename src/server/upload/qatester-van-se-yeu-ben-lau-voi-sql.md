Mình tiếp tục bài viết trước [Cùng QA/Tester, yêu lại từ đầu với SQL nào!](https://viblo.asia/p/cung-qatester-yeu-lai-tu-dau-voi-sql-nao-QpmleJ495rd) để note lại những câu lệnh SQL cơ bản mà mình hay sử dụng trong công việc kiểm thử nhé.

### 1. SQL INNER JOIN, LEFT JOIN, RIGHT JOIN.
Giả sử có 2 bảng dữ liệu:
```
SELECT * FROM Orders where CustomerID <= 7
ORDER BY CustomerID;
```
![](https://images.viblo.asia/47a487b9-d573-4fc1-9b6e-ac1ba9e4ac14.png)

```
SELECT * FROM Customers where CustomerID <= 7
```
![](https://images.viblo.asia/f88a31c1-156b-459a-9cdf-bb1095fbbf67.png)


* **INNER JOIN:** Trả về các bản ghi thỏa mãn điều kiện trong cả hai bảng.

Cú pháp:
```
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```
trong đó, có thể gọi `table1.column_name = table2.column_name` là điều kiện join.

Ví dụ: Lấy ra các order cùng thông tin của 7 khách hàng đầu tiên.
```
SELECT Orders.OrderID, Customers.CustomerName, Customers.CustomerID
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
where Customers.CustomerID <= 7
ORDER BY Customers.CustomerID;
```
![](https://images.viblo.asia/ce74b9e3-9941-416f-b62f-28d0c31c4370.png)
**Note:** 

+Inner join được sử dụng nhiều nhất, thông dụng hơn left join, right join.

+Có thể thực hiện join nhiều bảng, xem ví dụ sau: Thông tin Order lấy cả tên của Shipper và Customer.
```
SELECT Orders.OrderID, Customers.CustomerID, Customers.CustomerName, Shippers.ShipperID, Shippers.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID)
where Customers.CustomerID <= 7
ORDER BY Customers.CustomerID
```
![](https://images.viblo.asia/91152f19-8a66-4aea-87c4-10e8b5010d33.png)

* **LEFT JOIN**: Trả về tất cả các bản ghi từ bảng bên trái (table1) và các bản ghi khớp với điều kiện từ bảng bên phải (table2). Nếu từ phía phải không có kết quả phù hợp thì trả về giá trị NULL.

Cú pháp:
```
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```
Ví dụ: Có chương trình khuyến mại cho 7 khách hàng đầu tiên, kiểm tra xem các khách hàng này đã có Order nào chưa? Nếu chưa thông tin Order sẽ là NULL
```
SELECT Customers.CustomerID, Customers.CustomerName, Orders.OrderID, Orders.OrderDate
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID=Orders.CustomerID
where Customers.CustomerID <=7
ORDER BY Customers.CustomerID;
```

![](https://images.viblo.asia/68e01b61-2518-4269-8a2b-1df71dc31bd5.png)

* **RIGHT JOIN**: Trả về tất cả các bản ghi từ bảng bên phải (table2) và các bản ghi khớp với điều kiện từ bảng bên trái (table1). Nếu từ phía trái không có kết quả phù hợp thì trả về giá trị NULL.

Cú pháp:
```
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```
Ví dụ: Tương tự với LEFT JOIN

```
SELECT Orders.OrderID, Orders.OrderDate, Customers.CustomerID, Customers.CustomerName
FROM Orders
RIGHT JOIN Customers
ON Customers.CustomerID=Orders.CustomerID
where Customers.CustomerID <=7
ORDER BY Customers.CustomerID;
```
![](https://images.viblo.asia/a82588c5-1eaf-4257-a574-e51780b0742a.png)

### 2. SQL MIN() và MAX()
- Hàm MIN () trả về giá trị nhỏ nhất của cột đã chọn.
```
SELECT MIN(column_name1), MIN(column_name2)
FROM table_name
WHERE condition;
```
- Hàm MAX () trả về giá trị lớn nhất của cột đã chọn.
```
SELECT MAX(column_name1), MAX(column_name2)
FROM table_name
WHERE condition;
```

### 3. SQL COUNT(), AVG() and SUM()
- Hàm COUNT () trả về số bản ghi thỏa mãn điều kiện query.
```
SELECT COUNT(column_name)
FROM table_name
WHERE condition;
```
- Hàm AVG () trả về giá trị trung bình của một cột (cột có dữ liệu kiểu số).
```
SELECT AVG(column_name1), AVG(column_name2)
FROM table_name
WHERE condition;
```
- Hàm SUM () trả về tổng của một cột (cột có dữ liệu kiểu số).
```
SELECT SUM(column_name1), SUM(column_name2)
FROM table_name
WHERE condition;
```
### 4. SQL GROUP BY
Câu lệnh GROUP BY để nhóm các bản ghi có cùng giá trị của một cột, kết hợp thực hiện các hàm COUNT, MAX, MIN, SUM, AVG theo từng giá trị.

Cú pháp:
```
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);
```

Ví dụ: Xác định số đơn mà 1 shipper nhận. Giả sử thông tin của bảng "Orders", "Shippers" như sau:
![](https://images.viblo.asia/ea12080c-311b-4653-9964-0d075177ce80.png)
![](https://images.viblo.asia/54dfcf68-a183-4798-8cf5-d5c88e93432a.png)
Sử dụng lệnh GROUP BY kết hợp với INNER JOIN thế này:
```
SELECT Shippers.ShipperName, Count(Orders.ShipperID)
FROM Orders
Inner join Shippers
where Shippers.ShipperID = Orders.ShipperID
Group by Shippers.ShipperName
```

Mình kết thúc chuỗi bài viết về SQL ở đây rồi, hứa sẽ chăm chỉ học hỏi và tích lũy kinh nghiệm nhiều hơn...để viết những bài hữu ích hơn cho chị em QA nhé.