Bài viết trước mình đã giới thiệu với các bạn những điều cơ bản về cơ sở dữ liệu, cách để xây dựng một DB cho dự án web và cách triển khai DB trên hệ quản trị CSDL Mysql. <br>
Bài viết hôm nay mình sẽ giới thiệu các bạn về truy vấn dữ liệu trong Mysql
## Tổng quan
```sql
SELECT [ ALL | DISTINCT ] select_list
        [ INTO [ newtable_name ]]
        FROM { table_name }
        ................
        [, { table_name | view_name }]
[JOIN clause]
[WHERE điều kiện chọn]
[GROUP BY nhóm]
[HAVING điều kiện chọn nhóm]
[ORDER BY các cột sắp xếp]
[LIMIT giới hạn số lượng];
```

## Từ khóa SELECT
* Cho phép xem dữ liệu một phần của một bảng bằng cách liệt kê tên các cột sau từ khóa SELECT -> Lấy các cột trong bảng để hiển thị
* Để chọn tất cả các cột trong một bảng có thể sử dụng dấu sao ký hiệu thay vì liệt kê tất cả các tên cột sau từ khoá SELECT
```sql
SELECT * FROM employees
```
Với từ khóa DISTINCT, có thể loại bỏ dữ liệu trùng lặp từ câu lệnh SELECT.
### Thuộc tính suy diễn (Derived Attribute)
* SQL cung cấp khả năng tạo các thuộc tính suy diễn trong bảng kết quả trả về sử dụng các toán tử và hàm dựa trên các thuộc tính có sẵn.
* Tên cột của thuộc tính suy diễn phụ thuộc vào hệ thống, tuy nhiên có thể gán bí danh làm tên cột.
```sql
SELECT orderNumber, (priceEach*quantityOrdered) as
lineTotal
FROM orderdetails
```
## Mệnh đề WHERE
Mệnh đề WHERE của câu lệnh SELECT cho phép chọn các hàng cụ thể phù hợp với điều kiện hoặc tiêu chí tìm kiếm. Sử dụng mệnh đề WHERE để lọc các bản ghi dựa trên một điều kiện<br>
**1. Kết nối các điều kiện với toán tử AND và OR**<br>
```sql
SELECT * FROM customers
WHERE country ='USA' and salesRepEmployeeNumber = 1165
```
**2. IS NULL: tim̀ các giá trị không xác định**<br>
Với các trường chưa được nhập dữ liệu (coi giá trị là chưa xác định), SQL coi giá trị đó là NULL. Để kiểm tra một trường có giá trị là NULL hay không, thay vì sử dụng phép so sánh =, SQL sử dụng phép toán is NULL
```sql
SELECT customerName, salesRepEmployeeNumber FROM customers
WHERE salesRepEmployeeNumber = NULL
```
**3. Toán tử IN**<br>
Toán tử IN cho phép chọn giá trị phù hợp từ một tập các giá trị. Cú pháp sử dụng như sau:
```sql
SELECT danh sách các cột
FROM tên bảng
WHERE cột IN ("giá trị 1","giá trị 2"…)
```
Các cột trong mệnh đề WHERE không cần phải xuất hiện trong danh sách cột đã chọn, nhưng nó phải là một cột trong bảng.<br>
Nếu danh sách có nhiều hơn một giá trị, mỗi mục được phân cách bằng dấu phẩy.<br>
Ngoài ra, có thể sử dụng toán tử NOT đi kèm với toán tử IN cho mục đích phủ định<br>
**4. Toán tử BETWEEN**<br>
BETWEEN cho phép lấy các giá trị trong một phạm vi cụ thể. Nó phải được sử dụng trong mệnh đề WHERE
```sql
SELECT column_list
FROM table_name
WHERE column_1 BETWEEN lower_range AND upper_range
```
**5. Toán tử LIKE**<br>
LIKE cho phép thực hiện việc tìm kiếm thông tin dựa trên sự so sánh ký tự (‘giống như’).<br>
LIKE thường được sử dụng với câu lệnh SELECT trong mệnh đề WHERE. MySQL cung cấp cho hai ký tự đại diện sử dụng với LIKE, đó là % và _.<br>
* Ký tự đại diện tỷ lệ phần trăm (%) đại diện cho bất kỳ chuỗi có thể không có hoặc có nhiều ký tự<br>
* Gạch dưới (_) chỉ đại diện cho một ký tự duy nhất.
## Giới hạn số lượng kết quả với LIMIT
MySQL hỗ trợ một tính năng là LIMIT cho phép hạn chế các bản ghi trả lại với câu lệnh SELECT.
Giả thiết ta có một bảng cơ sở dữ liệu với 10.000 bản ghi và muốn nhận được N bản ghi đầu tiên, có thể sử dụng truy vấn sau đây:
```sql
SELECT * FROM table_name
LIMIT N
```
LIMIT cũng cho phép lấy ra một số lượng bản ghi nhất định tính từ một vị trí nào đó:
```sql
LIMIT S, N
```
Trong câu truy vấn trên, S là điểm bắt đầu ghi chỉ số. MySQL xác định rằng vị trí đầu tiên được ghi lại bắt đầu với 0; N là số lượng bản ghi muốn chọn.
## Mệnh đề  ORDER BY
* Mệnh đề `ORDER BY` cho phép sắp xếp các kết quả trên một hoặc nhiều cột trong kết quả truy vấn theo thứ tự tăng dần hay giảm dần.
* Để sắp xếp kết quả theo thứ tự tăng dần, sử dụng `ASC`; giảm dần là `DESC`. Theo mặc định, `ORDER BY` sẽ sắp xếp các kết quả theo thứ tự tăng dần.
## Mệnh đề GROUP BY
* Mệnh đề GROUP BY được sử dụng để gộp các bản ghi có cùng giá trị tại một hay nhiều cột, thành một tập hợp.
* GROUP BY nếu có thì nó phải đứng sau mệnh đề WHERE hoặc FROM.
* Theo sau từ khoá GROUP BY là một danh sách các biểu thức, phân cách nhau bởi dấu phẩy.
```sql
SELECT col1_,col_2,... col_n, các hàm nhóm(biểu thức)
FROM tên bảng
WHERE điều kiện
GROUP BY col_1, col_2, ... col_n
ORDER BY danh sách cột
```
## Mệnh đề HAVING BY
* HAVING chỉ ra một điều kiệ lọc trên dữ liệu là một nhóm các bản ghi hoặc là kết quả của việc thực hiện hàm nhóm.
* HAVING thường được sử dụng cùng với GROUP BY, khi đó điều kiện lọc chỉ được áp dụng trên các cột xuất hiện trong mệnh đề GROUP BY mà thôi. <br>
*Lưu ý rằng, HAVING áp dụng trên các nhóm bản ghi, còn WHERE áp dụng trên từng bản ghi riêng lẻ*
## Phép nối bảng JOIN
* Thực tế chúng ta cần rất nhiều truy vấn yêu cầu thông tin từ nhiều bảng dữ liệu khác nhau
* Kết hợp các bảng dữ liệu để tạo ra một bảng suy diễn được gọi là phép nối (join).
* Chúng ta sẽ làm quen với phép toán nối để truy vấn dữ liệu từ nhiều bảng: INNER JOIN, LEFT JOIN, SELF JOIN <br>
![](https://images.viblo.asia/9f09906a-b88c-468b-9946-9197828cc733.png)

### INNER JOIN
INNER JOIN hay còn gọi là phép nối trong, là một phần tùy chọn của câu lệnh SELECT. Nó xuất hiện liền ngay sau mệnh đề FROM.<br>
Trước khi sử dụng INNER JOIN, hải xác định rõ các tiêu chí sau đây:
1. Trước tiên, cần phải xác định các bảng mà muốn liên kết với bảng chính. Bảng chính xuất hiện trong mệnh đề FROM. Bảng muốn nối với bảng chính phải xuất hiện sau từ khóa INNER JOIN
1. Thứ hai, cần phải xác định điều kiện nối. Điều kiện nối xuất hiện sau từ khóa ON. Điều kiện nối chính là nguyên tắc để tìm được các bản ghi phù hợp trong các bảng và nối chúng lại với nhau.
<br>
Cú pháp INNER JOIN như sau:
```sql
SELECT column_list
FROM table1
INNER JOIN table2 ON join_condition1
INNER JOIN table3 ON join_condition2
...
WHERE WHERE_conditions;
```
Ví dụ, nếu nối hai bảng A và B, INNER JOIN so sánh mỗi bản ghi của bảng A với mỗi bản ghi của bảng B để tìm tất cả các cặp bản ghi đáp ứng được điều kiện nối. Khi điều kiện nối được thoả mãn, giá trị cột cho mỗi cặp bản ghi phù hợp của bảng A và bảng B được kết hợp thành một bản ghi trong kết quả trả về.
```sql
SELECT products.productCode, products.productName, orderDetails.orderNumber
FROM products
INNER JOIN orderDetails on products.productCode = orderDetails.productCode;
```
Bí danh (Alias): có thể tạo bí danh của bảng tbl_A là A và tham chiếu đến cột M là A.M , như vậy không mất công gõ lại tên bảng nữa. Ví dụ trên có thể viết lại như sau:
```sql
SELECT p.productCode, p.productName, o.orderNumber
FROM products p
INNER JOIN orderDetails o on p.productCode = o.productCode;
```
### LEFT JOIN
Mệnh đề LEFT JOIN sẽ được thực hiện như sau:  *Khi một hàng từ bảng bên trái phù hợp với một hàng từ bảng bên phải dựa trên điều kiện nối, nội dung của hàng đó sẽ được lựa chọn như một dòng trong kết quả đầu ra.  Khi một hàng trong bảng bên trái không tìm được hàng nào phù hợp trong bảng nối, nó vẫn được xuất hiện trong kết quả đầu ra, nhưng kết hợp với một hàng "giả" từ bảng bên phải với giá trị NULL cho tất cả các cột.* <br>
=> Tóm lại, LEFT JOIN cho phép chọn tất cả các hàng từ bảng bên trái ngay cả khi không có bản ghi nào phù hợp với nó trong bảng bên phải. <br> 
⁕ LEFT JOIN rất hữu ích khi muốn tìm các bản ghi trong bảng bên trái mà không phù hợp với bất kỳ một bản ghi nào trong bảng bên phải. có thể thực hiện điều này bằng cách thêm một mệnh đề WHERE để lựa chọn các hàng chỉ có giá trị NULL trong một cột ở bảng bên phải
### SELF JOIN
Một phép tự nối là một kiểu nối trong đó một bảng được nối với chính nó, cụ thể khi một bảng có một khóa ngoài tham chiếu tới khóa chính của nó.
<br> Ví dụ: Bảng employees có một khóa ngoài là reportsTo tham chiếu tới khóa chính employeeNumber của chính bảng employees
```sql
SELECT * FROM employees e1, employees e2
WHERE e1.reportsTo = e2.employeeNumber;
```
## Truy vấn con
* Để kết hợp các bảng dữ liệu với nhau, ngoài các phép nối và các toán tử tập hợp, SQL cung cấp một cách khác để trả lại dữ liệu từ nhiều bảng gọi là truy vấn con (subquery).
* Khi một câu lệnh SELECT được sử dụng trong một câu lệnh khác, câu lệnh SELECT bên trong được gọi là truy vấn con (subquery), cách gọi khác là truy vấn lồng (nested query), truy vấn trong (inner query). 
```sql
SELECT * FROM orders
WHERE orderDate = (SELECT MAX(orderDate) FROM orders)
```
Truy vấn con được chia làm hai loại: truy vấn con không tương quan (non-correlated) và truy vấn con có tương quan (correlated)
### Truy vấn con không tương quan
* Một truy vấn con không tương quan là truy vấn con độc lập với truy vấn bên ngoài. 
* Truy vấn con không tương quan được thi hành thi hành đầu tiên và một lần duy nhất cho toàn bộ câu lệnh.
* Kết quả của truy vấn con được điền vào truy vấn bên ngoài, và cuối cùng thi hành truy vấn bên ngoài.
```sql
SELECT * FROM products
WHERE productCode in (SELECT productCode FROM orderdetails)
```
### Truy vấn con tương quan
* Truy vấn con tương quan không độc lập với truy vấn bên ngoài. Một truy vấn con tương quan là một truy vấn con sử dụng các giá trị từ truy vấn bên ngoài trong mệnh đề WHERE của nó.
* Quá trình thực hiện như sau: các truy vấn bên ngoài được thực hiện trước tiên và sau đó thi hành truy vấn con bên trong cho mỗi dòng kết quả của truy vấn bên ngoài.
* Loại truy vấn con này thường rất chậm do có select_type là DEPENDENT SUBQUERY. Trong thực tế nên hạn chế dùng kiểu truy vấn này.