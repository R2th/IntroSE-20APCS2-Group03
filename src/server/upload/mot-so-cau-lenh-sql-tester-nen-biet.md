SQL là gì? và tại sao tester cần biết SQL?
-	Ngôn ngữ truy vấn có cấu trúc SQL là một loại ngôn ngữ máy tính phổ biến để tạo, chỉnh sửa, truy vấn và xóa dữ liệu. Hay nói cách khác SQL là ngôn ngữ dùng để quản lý dữ liệu
-	Vì sao tester cần biết sử dụng SQL:
    *  Vì tester là những người cần tạo dữ liệu test chính, tester cần phải biết sử dụng SQL để có thể truy cập vào database để tạo dữ liệu test cho dự án mà không cần phải nhờ đến sự giúp đỡ của dev.
    * Khách hàng báo cáo lỗi và gửi bản dump dữ liệu của họ cho mình, thì tester cũng cần phải biết cách restore dữ liệu để có thể dựng môi trường và tái hiện bug.

 	=> Vì vậy việc nắm được ngôn ngữ truy vấn có cấu trúc SQL là một kỹ năng quan trọng mà tester cần phải biết.
Dưới đây chúng ta sẽ cùng tìm hiểu về một số câu truy vấn đơn giản và cần biết cho một tester.

### **I. Các câu truy vấn**

**1.	Truy vấn Insert**

Lệnh insert trong sql dùng để chèn một hoặc nhiều bản ghi vào một bảng. Có 2 cách để thêm dữ liệu vào một bảng:
-	Cách 1: Chỉ định tên cột và giá trị được thêm:
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```
-	Cách 2: Nếu thêm giá trị cho tất cả các cột trong bảng, thì ta không cần chỉ định tên cột trong bảng 
```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

**2.	Truy vấn Update**

Được sử dụng để sửa đổi, cập nhật  một hoặc nhiều bản ghi trong một bảng
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
**Lưu ý:** Khi thực hiện cập nhật bản ghi, chúng ta nên sử dụng kèm với mệnh đề Where để chỉ định bản ghi cần được update, nếu chúng ta không sử dụng Where thì tất cả các bản ghi trong bảng sẽ được update.

**3.	Truy vấn Delete**

Dùng để xóa bản ghi trong một bảng

```sql
DELETE FROM table_name WHERE condition;
```

**Lưu ý:** Khi thực hiện xóa bản ghi trong bảng, chúng ta nên sử dụng cùng với mệnh đề Where để chỉ định bản ghi cần được xóa, nếu chúng ta không sử dụng Where, tất cả các bản ghi trong bảng sẽ bị xóa

**4.	Truy vấn Select**

Được sử dụng để lấy dữ liệu từ một bảng trong Database và trả về dữ liệu ở dạng bảng dữ liệu kết quả.
```sql
SELECT column1, column2, ...
FROM table_name;
```

### **II. Các mệnh đề thường gặp**

**1.	Mệnh đề Where**

Mệnh đề Where dùng để lọc các bản ghi, trích xuất những bản ghi đáp ứng một điều kiện cụ thể.
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

**Lưu ý:** 
- Where không chỉ được dùng với câu lệnh Select, mà nó cũng được dùng với các câu lệnh Update, Delete
- Sau Where có thể là một hoặc một nhóm các điều kiện kèm theo được kết hợp với nhau bằng AND hoặc OR
 
Ví dụ:

Tìm các đơn hàng có mã khách hàng là 181 và in ra tất cả thông tin của đơn hàng đó.

`SELECT * FROM orders WHERE customerNumber = 181;`

Kết quả:
![](https://images.viblo.asia/a4a04325-c0be-4687-9af6-b744b12d7e73.png)

**2.	Mệnh đề Distinct**

Từ khóa Distinct được sử dụng kết hợp với lệnh SELECT để loại các bản sao trùng lặp, trả về tập dữ liệu duy nhất. 

**Lưu ý:** 
- Khi mệnh đề DISTINCT chỉ có 1 biểu thức, truy vấn sẽ trả về các giá trị duy nhất cho biểu thức đó.
- Khi mệnh đề DISTINCT có nhiều hơn 1 biểu thức, truy vấn sẽ trả về tổ hợp duy nhất của các biểu thức.

Ví dụ: Liệt kê vị trí công việc của tất cả nhân viên trong bảng nhân viên:

`SELECT DISTINCT jobTitle FROM employees;`

Kết quả:
![](https://images.viblo.asia/54121000-a31a-478a-afd3-ceda69188aaa.png)

**3.	Mệnh đề Like**

Sử dụng để so sánh một giá trị với các giá trị tương tự bởi sử dụng các toán tử wildcard.
Có 2 wildcard được sử dụng trong toán tử Like là:
-	Ký hiệu "%" biểu diễn 0,1 hoặc nhiều ký tự.
-	Ký tự "_" biểu diễn một hoặc một số ký tự đơn
```sql
SELECT column1, column2, ...
FROM table_name
WHERE columnN LIKE pattern;
```

Ví dụ 1: 

```
SELECT * FROM Customers	
WHERE Phone LIKE ‘[4-6]_6%’
```
-	Số điện thoại bắt đầu là 1 số trong khoảng từ 4-6
-	Ký tự thứ 2 trong số điện thoại có thể là bất kỳ ký tự nào (_)
-	Ký tự thứ 3 trong số điện thoại là 6
-	Phần còn lại của số điện thoại có thể là bất kỳ chuỗi nào (%) 

Ví dụ 2:
Tìm các sản phẩm có mã chứa chuỗi ‘_20’

```
SELECT productCode, productName

FROM products

WHERE productCode LIKE '%\_20%';
```

Kết quả: 

![](https://images.viblo.asia/4e02696e-b2bc-40bf-a865-1146f9076b07.png)

**4.	Mệnh đề Having**

Mệnh đề HAVING trong SQL cho phép bạn chỉ định điều kiện lọc mà kết quả nhóm xuất hiện trong kết quả.
Mệnh đề WHERE đặt các điều kiện trên các cột đã lựa chọn, trong khi mệnh đề HAVING đặt các điều kiện trên các nhóm đã được tạo bởi mệnh đề GROUP BY.
```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```

Ví dụ: Liệt kê những đơn hàng có tổng giá trị lớn hơn $1000 và có hơn 600 mặt hàng trong đó

```
SELECT ordernumber, sum(quantityOrdered) AS itemsCount, sum(priceeach) AS total

FROM orderdetails 

GROUP BY ordernumber 

HAVING total > 1000 AND itemsCount > 600;
```

Kết quả:

![](https://images.viblo.asia/de750171-8f40-445e-ae8b-851eb7fbb60a.png)

### **III. Các toán tử và các hàm thường dùng**


**1.	SQL Join**

Join dùng để kết hợp 2 hoặc nhiều bảng lại với nhau dựa vào một cột có liên quan

Có 4 loại join
-	(Inner) join: trả về các bản ghi có giá trị khớp với giá trị trong cả 2 bảng
-	Left (outer) join: trả về tất cả các bản ghi ở bảng bên trái, và các bản ghi có giá trị khớp với bảng bên phải.
-	Right (outer) join: trả về tất cả các bản ghi ở bảng bên phải, và các bản ghi có giá trị khớp với bảng bên trái.
-	Full (outer) join: trả về tất cả các bản ghi ở cả 2 bảng

       ![](https://images.viblo.asia/568369a0-7dfe-46c7-90a5-59f1e9eb9c5d.gif)
       ![](https://images.viblo.asia/15d9d67a-2024-42c2-8562-b2c209a64f1b.gif)

      ![](https://images.viblo.asia/c36fe589-73e9-447a-8c64-8e2c8836e23f.gif)
      ![](https://images.viblo.asia/8d306b3e-f936-428c-ae80-783bb798b8b9.gif)
      
      

**2.	Toán tử IN**

Toán tử IN nhằm bổ sung cho tiêu chí tìm kiếm, cho phép bạn chỉ định nhiều giá trị trong mệnh đề Where

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);
```

Hoặc là:

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name IN (SELECT STATEMENT);
```

Ví dụ: Tìm tất cả các văn phòng được đặt tại Mỹ (USA) và Pháp (France)

```
SELECT officeCode, city, phone

FROM offices

WHERE country IN ('USA','France');
```

Kết quả:
![](https://images.viblo.asia/ef73c7c3-7420-44b5-9918-81dc8409f36e.png)

**3.  Toán tử Between**

Toán tử Between cho phép chọn các giá trị trong một phạm vi nhất định, các giá trị này có thể là số, văn bản hoặc ngày.

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

Ví dụ: tìm tất cả các sản phẩm có giá nằm trong phạm vi 90 $ và 100 $

```
SELECT productCode, ProductName, buyPrice

FROM products 

WHERE buyPrice 

BETWEEN 90 AND 100 

ORDER BY buyPrice DESC;
```

Kết quả:

![](https://images.viblo.asia/46ade63f-b24c-425c-9d6b-8db71aa7d3da.png)

**4.	Toán tử Exists**

Được sử dụng để kiểm tra sự tồn tại của bất kỳ bản ghi nào trong truy vấn con. Toán tử Exists trả về true nếu truy vấn con có bản ghi phù hợp trả về.
```sql
SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);
```

Ví dụ: Liệt kê các sản phẩm có mặt trong bảng đơn hàng

```
SELECT * FROM products as p 

WHERE exists (SELECT productCode 

FROM orderdetails

WHERE productCode = p.productCode);
```

Kết quả: 

![](https://images.viblo.asia/09068acf-402c-46cb-a7ac-2a17ee4a70d8.png)



**5.	Các hàm Count(), Avg(), Sum()**

-	Hàm Count() trả về số lượng hàng khớp với một tiêu chí đã chỉ định
```sql
SELECT COUNT(column_name)
FROM table_name
WHERE condition;
```

Ví dụ: Đếm số lượng sản phẩm đang được bán

`SELECT COUNT(*) AS Total FROM products`

Kết quả: 
 

![](https://images.viblo.asia/3a6f60c7-fad7-4fd1-909b-bcb909f447b5.png)

-	Hàm Avg() trả về giá trị trung bình của một cột số, ta chỉ có thế sử dụng hàm Avg() với những cột là dạng số.
```sql
SELECT AVG(column_name)
FROM table_name
WHERE condition;
```

Ví dụ: Tính giá trung bình của tất cả các sản phẩm đã mua

`SELECT AVG(buyPrice) AS average_buy_price FROM Products`

Kết quả:
![](https://images.viblo.asia/ce55b17f-9b12-42c5-bd8c-ba0f579ef955.png)

-	Hàm Sum() trả về tổng của một cột số, ta chỉ có thế sử dụng hàm Sum() với những cột là dạng số.
```sql
SELECT SUM(column_name)
FROM table_name
WHERE condition;
```

Ví dụ: Tính tổng số lượng hàng hóa hiện còn trong kho 

`SELECT SUM(quantityInStock) FROM products;`

Kết quả: 

![](https://images.viblo.asia/5a640dda-ae81-467a-a15c-a9d37738baf4.png)
      

**Kết luận**: Qua bài tìm hiểu này, mong rằng các bạn sẽ có những hiểu biết cơ bản về một số câu lệnh SQL, từ đó có thể vận dụng linh hoạt vào quá trình học tập cũng như công việc một cách tốt nhất.

Một số nguồn tham khảo: 

https://www.w3schools.com/sql/

https://www.tutorialspoint.com/sql