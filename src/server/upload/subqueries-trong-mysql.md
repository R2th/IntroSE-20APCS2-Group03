## Subquery là gì?
-----
Để kết hợp các bảng dữ liệu với nhau, ngoài các phép nối và các toán tử tập hợp, SQL cung cấp một cách khác để trả lại dữ liệu từ nhiều bảng gọi là truy vấn con (subquery). Khi một câu lệnh SELECT được sử dụng trong một câu lệnh khác, câu lệnh SELECT bên trong được gọi là truy vấn con (subquery), cách gọi khác là truy vấn lồng (nested query), truy vấn trong (inner query). Cơ bản một truy vấn con có thể được sử dụng ở bất cứ nơi đâu mà một biểu thức có thể được sử dụng (sau SELECT, FROM, WHERE..) với số lượng không giới hạn.


-----

Databases Schema Example:
![](https://viblo.asia/uploads/8c3ca952-7476-424c-af04-d02c48fbf98c.png)
Ví dụ: Đưa ra thông tin đơn hàng cũ nhất:
`SELECT * FROM orders WHERE orderDate = (SELECT MIN(orderDate) FROM orders);`
![](https://viblo.asia/uploads/4e1f04ab-1fd2-4b10-8394-f75d62b00542.png)
-----
- Dựa vào cách hoạt động, người ta chia subquery thành 2 dạng:
    + Truy vấn con không tương quan (subquery non-correlated)
    + Truy vấn con tương quan (subquery correlated)
-----
###  1. Truy vấn con không tương quan (subquery non-correlated)
- Một truy vấn con không tương quan là truy vấn con độc lập với truy vấn bên ngoài. Truy vấn con không tương quan được thi hành thi hành đầu tiên và một lần duy nhất cho toàn bộ câu lệnh. Kết quả của truy vấn con được điền vào truy vấn bên ngoài, và cuối cùng thi hành truy vấn bên ngoài.

- Ví dụ: Đưa ra sản phẩm (product) thuộc loại sản phẩm (productLine) có mã là "Trains" có số lượng hàng tồn kho (QuantityInStock) là lớn nhất:
 
    `SELECT productCode, productName, productLine, quantityInStock FROM products WHERE quantityInStock = (SELECT MAX(quantityInStock) FROM products WHERE productLine = "Trains");`
![](https://viblo.asia/uploads/e4b6f59b-ad8f-4250-925e-26353bbd8e8f.png)

### 2. Truy vấn con tương quan (subquery correlated) 
   - Truy vấn con tương quan không độc lập với truy vấn bên ngoài. Một truy vấn con tương quan là một truy vấn con sử dụng các giá trị từ truy vấn bên ngoài trong mệnh đề WHERE của nó. Quá trình thực hiện như sau: các truy vấn bên ngoài được thực hiện trước tiên và sau đó thi hành truy vấn con bên trong cho mỗi dòng kết quả của truy vấn bên ngoài
   - Ví dụ: với mỗi dòng đơn hàng, đưa vào thêm tên của khách hàng.
  ` SELECT orderNumber, orderDate, (SELECT customerName FROM customers c WHERE c.customerNumber = o.customerNumber) AS "Customer Name" FROM orders o;`
   ![](https://viblo.asia/uploads/abe95c3f-a9bd-4585-bf65-09ab740ea272.png)
  

-----

Loại truy vấn con này thường rất chậm do có select_type là DEPENDENT SUBQUERY. Trong thực tế nên hạn chế dùng kiểu truy vấn này. Chúng ta có thể kiểm tra bằng cách thêm `explain extended ` vào trước câu truy vấn để xem rõ quá trình truy vấn của câu lệnh. 
 ![](https://viblo.asia/uploads/60d1a07a-c679-4471-9c55-f76b0f278f0f.png)
### 3. Kết Luận:
   Trên đây là một số ví dụ về subquery, việc nên lựa chọn subquery hay không thì còn phụ thuộc vào hoàn cảnh cụ thể
   Bài tiếp theo mình sẽ so sánh hiệu năng giữa subquery và join trong một số trường hợp.
   
------

>    Tham khảo: 
       https://www.w3resource.com/sql/subqueries/understanding-sql-subqueries.php
       http://phpcoban.com/truy-van-con-trong-sql-subquery/