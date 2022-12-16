> Bài viết này xuất phát từ bài toán mà mình gặp rất nhiều trong quá trình test data. Bạn cần visualize lên các dashboard hay đơn giản cần export raw data để lấy dữ liệu chính xác. Nhưng dữ liệu của bạn được kéo về từ nhiều nguồn khác nhau? Bạn cần check raw data có bị duplicate hay không? Vậy cách check là gì? Bài viết sẽ chia sẻ tips để có thể check được duplicates data.
> 
> Đầu tiên để check được table đó bị duplicate data không, Cần xác định được **unique key** của nó. Tức là tập hợp một/nhiều columns gộp lại với nhau tạo thành 1 giá trị unique của table. 
> Sẽ được chia thành 02 trường hợp như sau: 
> 1. Duplicate Values in One Column
> 2. Duplicate Values in Multiple Columns
> 
## 1. Duplicate Values in One Column
Giả sử có 1 sample data như sau: 
![](https://images.viblo.asia/51c24157-fc51-4b8a-bc24-017e9f15db20.png)

Và ở table này unique key = {OrderID} Tức là với mỗi OrderID sẽ là 1 và duy nhất. Nếu có từ 2 hoặc nhiều giá trị OrderID trùng nhau --> Bị duplicate data. 
* Query:
```sql
SELECT OrderID, COUNT(OrderID)
FROM Orders
GROUP BY OrderID
HAVING COUNT(OrderID)>1
```

## 2. Duplicate Values in Multiple Columns

Giả sử có sample data như sau:
![](https://images.viblo.asia/3cf10da1-77c4-4fbb-9d36-4924f33cd0d3.png)

Table này có unique key = {OrderID, ProductID}. Tức là ví dụ OrderID = 10248, ProductID = 11 thì tập hợp {OrderID, ProductID}. = {10248, 11} là 1 và duy nhất. Nếu có từ 2 rows trở lên trong table có trùng 2 giá trị trên --> Bị duplicate data. 
* Query
```sql
SELECT OrderID, ProductID, COUNT(*)
FROM OrderDetails
GROUP BY OrderID, ProductID
HAVING COUNT(*)>1
``` 

Note: 
* Khi có nhiều cột cần check duplicate (tức là table đó có nhiều columns tạo nên unique key) thì bạn chỉ cần thêm các columns_name vào sau select, và group by. 
* Ngoài ra có 1 cách hữu dụng khác bạn có thể sử dụng để check bên cạnh việc dùng hàm group by and having. Đó là dùng row_number () over (partition by.... ordery by....)--> Hàm này sẽ được chia sẻ ở bài viết sau.
 
## 3. TIPS
*Bài toán: Cần lấy toàn bộ thông tin  (all columns) của các rows bị duplicate trong table?*
* Như ở mục (1) và (2) đã chỉ ra cách để tìm ra những rows bị duplicate data. Nhưng nếu ta muốn có thêm thông tin của các dữ liệu này? Ta có thể dùng inner join (join) như sau: 

```sql
SELECT a.*
FROM OrderDetails a
JOIN (SELECT OrderID, ProductID, COUNT(*)
FROM OrderDetails 
GROUP BY OrderID, ProductID
HAVING count(*) > 1 ) b
ON a.OrderID = b.OrderID
AND a.ProductID = b.ProductID
ORDER BY a.OrderID
```
hoặc 
```sql
select *
  from OrderDetails a
 where ( OrderID, ProductID ) in   
       ( select OrderID, ProductID
           from OrderDetails 
          group by OrderID, ProductID
         having count(*) > 1 )
```
 
##  4. Link tài liệu tham khảo:
1.https://learnsql.com/blog/how-to-find-duplicate-values-in-sql/