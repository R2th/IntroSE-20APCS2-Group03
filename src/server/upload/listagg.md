> Đây là một hàm không quá phổ biến. Nhưng trong quá trình làm mình đã gặp. Mình tìm hiểu. Và mình viết bài viết này để chia sẻ về nó.
## 1. Syntax
```
LISTAGG(measure_expr [, 'delimiter']) 
    WITHIN GROUP (order_by_clause) [OVER query_partition_clause]
```
## 2. Parameters or Arguments
* The measure_expr: Có thể là cột hoặc biểu thức là giá trị mà mình muốn gộp chung lại ở phần output. Giá trị NULL trong measure_column sẽ được bỏ qua.
* The delimiter_expr: Cái này chỉ là Optionals, Defaults sẽ là NULL, bản chất là nó là dấu phân cách để sử dụng khi phân tách các giá trị của cột đó khi xuất ra kết quả.
* The order-by_clause: Cái này thì dễ rồi. Nó dùng để xác định thứ tự của các value được concat với nhau
## 3. Purpose
Nối các giá trị của measure_column cho mỗi GROUP dựa trên mệnh đề order_by. 
* Single-set aggregate function (Tức là những aggregate function không có group by trong câu query): thì bản chất LISTAGG sẽ là: **operates on all rows and returns a single output row**.
* Group-set aggregate: (Tức là những câu query dùng listagg mà có group by trong đó): **the function operates on and returns an output row for each group defined by the GROUP BY clause.**
* Analytic function ( Về Analytics mình sẽ viết 1 bài về phần này riêng sau nhé. giờ cứ tạm hiểu là mấy câu SQL mà có order by () over () ấy nhé): **LISTAGG partitions the query result set into groups based on one or more expression in the query_partition_clause.**
Vẫn hơi khó hiểu đúng không? Đến các ví dụ cụ thể chúng ta sẽ dễ hình dung hơn rất nhiều.
## 4. Returns
Đầu ra LISTAGG sẽ trả về giá trị là string_Value (varchar2)
## 5. Aggregate Examples
Ví dụ 1: 
Giả sử có 1 table như sau: 

| product_id | product_name |
| -------- | -------- | -------- |
| 1001     | Bananas     | 
| 1002     | Apples     | 
| 1003     | Pears     |
| 1004     | Oranges     |

Khi đó nếu sử dụng hàm LISTAGG sẽ trả về cho ta 1 single row duy nhất. 
```
SELECT LISTAGG(product_name, ', ') WITHIN GROUP (ORDER BY product_name) "Product_Listing"
FROM products;
```
Kết quả đầu ra: 

| Product_Listing |
| -------- | -------- | -------- |
| Apples, Bananas, Oranges, Pears| 
Ngoài ra như đã đề cập ở mục 2. Chúng ta có nhắc đến về The delimiter_expr. Thay vì dùng  dấu ", " Chúng ta có thể dùng dấu " ; " để phân cách value như sau: 
```
SELECT LISTAGG(product_name, '; ') WITHIN GROUP (ORDER BY product_name DESC) "Product_Listing"
FROM products;
```
Results: 
| Product_Listing |
| -------- | -------- | -------- |
| Apples; Bananas; Oranges; Pears| 
## 6. Analytic Example
```
SELECT department_id "Dept", hire_date "Date", last_name "Name",
       LISTAGG(last_name, '; ') WITHIN GROUP (ORDER BY hire_date, last_name)
         OVER (PARTITION BY department_id) as "Emp_list"
  FROM employees
  WHERE hire_date < '01-SEP-2003'
  ORDER BY "Dept", "Date", "Name";
```

Output sẽ trả ra như sau :
```
Dept Date      Name            Emp_list
----- --------- --------------- ---------------------------------------------
   30 07-DEC-02 Raphaely        Raphaely; Khoo
   30 18-MAY-03 Khoo            Raphaely; Khoo
   40 07-JUN-02 Mavris          Mavris
   50 01-MAY-03 Kaufling        Kaufling; Ladwig
   50 14-JUL-03 Ladwig          Kaufling; Ladwig
   70 07-JUN-02 Baer            Baer
   90 13-JAN-01 De Haan         De Haan; King
   90 17-JUN-03 King            De Haan; King
  100 16-AUG-02 Faviet          Faviet; Greenberg
  100 17-AUG-02 Greenberg       Faviet; Greenberg
  110 07-JUN-02 Gietz           Gietz; Higgins
  110 07-JUN-02 Higgins         Gietz; Higgins
```
## 7. Tài liệu tham khảo: 
1. https://docs.oracle.com/cd/E11882_01/server.112/e41084/functions089.htm#SQLRF30030
2. https://www.techonthenet.com/oracle/functions/listagg.php