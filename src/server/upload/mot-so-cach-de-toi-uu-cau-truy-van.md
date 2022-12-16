Các câu lệnh SQL được sử dụng để trích xuất dữ liệu từ database. Có rất nhiều cách truy vấn khác nhau để cho cùng một kết quả mà chúng ta mong muốn. Nhưng việc sử dụng câu truy vấn nào là tốt nhất là điều đáng nên xem xét khi chúng ta quan tâm đến hiệu năng của hệ thống. Dưới đây sẽ trình bày một số các lưu ý nhỏ khi sử dụng các câu truy vấn sao cho hiệu quả mà vẫn trả về kết quả như mong muốn.

# 1. SELECT những trường cần thiết

Theo như thói quen của khá nhiều người, SELECT * dường như ăn vào tiềm thức mỗi khi viết một câu truy vấn nào đó. Tuy nhiên, đây là thói quen không hề tốt bởi việc lấy hết dữ liệu các trường là dư thừa đối với các truy vấn chỉ cần trả về một vài trường.
```
SELECT id, first_name, last_name, age, subject FROM student_details;
```
Thay vì:
```
SELECT * FROM student_details;
```

# 2. Không nên lạm dụng HAVING
HAVING là câu lệnh được sử dụng trong việc lọc các hàng sau khi các hàng đã được GROUP BY thành từng nhóm. HAVING được hoạt động dựa trên kết quả của hàm tổng hợp. Vì vậy, đối với những trường hợp lọc điều kiện mà chỉ phụ thuộc vào kết quả của một hàng thay vì một nhóm, thì ta nên để điều kiện đó ở mệnh đề WHERE nằm phía trước GROUP BY.
```
SELECT subject, count(subject) 
FROM student_details 
WHERE subject != 'Science' 
AND subject != 'Maths' 
GROUP BY subject;
```
Thay vì:
```
SELECT subject, count(subject) 
FROM student_details 
GROUP BY subject 
HAVING subject!= 'Vancouver' AND subject!= 'Toronto';
```

# 3. Giảm thiểu số lượng truy vấn phụ
Trong một vài trường hợp, chúng ta cần nhiều hơn một truy vấn trong câu truy vấn chính. Tuy vậy, hãy cố gắng giảm thiểu lượng câu truy vấn phụ nhiều nhất có thể:
```
SELECT name 
FROM employee 
WHERE (salary, age ) = (SELECT MAX (salary), MAX (age) 
FROM employee_details) 
AND dept = 'Electronics'; 
```
Thay vì:
```
SELECT name 
FROM employee
WHERE salary = (SELECT MAX(salary) FROM employee_details) 
AND age = (SELECT MAX(age) FROM employee_details) 
AND emp_dept = 'Electronics';
```

# 4. EXISTS vs IN
Theo như nhiều tài liệu đề cập, hiệu suất của EXISTS hầu như là nhanh hơn so với IN. EXISTS sẽ cho bạn biết liệu truy vấn có trả về bất kỳ kết quả nào không. Còn IN được sử dụng để so sánh một giá trị với một vài giá trị.
- IN hiệu quả khi hầu hết các tiêu chí lọc nằm trong truy vấn phụ.
- EXISTS hiệu quả khi hầu hết các tiêu chí lọc nằm trong truy vấn chính.
```
Select * from product p 
where EXISTS (select * from order_items o 
where o.product_id = p.product_id)
```
Thay vì
```
Select * from product p 
where product_id IN 
(select product_id from order_items
```

# 5. EXISTS vs DISTINCT
Tránh sử dụng DISTINCT trên danh sách SELECT khi các trường DISTINCT lại chính là các trường nằm trong câu điều kiện bởi SQL sẽ thực sự tìm nạp tất cả các hàng thỏa mãn tham gia bảng và sau đó sắp xếp và lọc ra các giá trị trùng lặp. Ví dụ như: 1 "department" có nhiều "employee":
```
SELECT DISTINCT dept_no, dept_name
FROM   dept D, emp E
WHERE  D.dept_no = E.dept_no ;
```
Do đây là quan hệ một-nhiều nên sẽ trả về nhiều bản ghi trùng nhau về dept_no và dept_name nên cần phải DISTINCT để lấy ra kết quả cuối cùng. Tuy nhiên, ta có thể dùng EXISTS bởi trình tối ưu hóa của hệ quản trị cơ sở dữ liệu quan hệ - RDBMS nhận ra rằng khi truy vấn phụ đã được thỏa mãn một lần, không cần phải tiến hành lọc thêm nữa, và hàng tiếp theo có thể được tìm nạp.
```
SELECT dept_no, dept_name
   FROM   dept D
   WHERE  EXISTS ( SELECT 'X'
                   FROM   emp E
                   WHERE  E.dept_no = D.dept_no );
```
# 6. UNION ALL vs UNION
Chúng ta nên cố gắng sử dụng UNION ALL (nếu có thể) thay vì sử dụng UNION bởi UNION sẽ thực hiện một lệnh DISTINCT trên tập kết quả trả về để loại bỏ đi các bản ghi trùng lặp. Trong khi đó, UNION ALL lại không. Giả sử như tập kết quả mà bạn trả về không có kết quả trùng lặp (hoặc không cần loại bỏ các kết qua trùng lặp) hãy sử dụng UNION ALL.
```
SELECT id, first_name 
FROM customer 
UNION ALL 
SELECT id, first_name 
FROM staff;
```
Thay vì:
```
SELECT id, first_name 
FROM customer 
UNION 
SELECT id, first_name 
FROM staff;
```

# 7. WHERE
Việc sử dụng thận trọng các điều kiện trong câu truy vấn WHERE là điều cần thiết bởi đây là câu lệnh có mặt ở hầu hết các câu truy vấn. Có một vài các mẹo nhỏ khi sử dụng câu truy vấn này:
* Sử dụng > (hoặc <) thay vì >= (hoặc <=) bởi việc thự hiện phép > sẽ nhanh hơn việc thực hiện 2 phép toán là > và =
```
SELECT id, first_name, age FROM student_details WHERE age > 8;
```
Thay vì:
```
SELECT id, first_name, age FROM student_details WHERE age >= 9;
```
* Sử dụng BEETWEN thay cho việc so sánh với 2 đầu mút
```
SELECT product_id, product_name 
FROM product 
WHERE unit_price BETWEEN MAX(unit_price) AND MIN(unit_price)
```
Thay vì:
```
SELECT product_id, product_name 
FROM product 
WHERE unit_price <= MAX(unit_price) 
AND unit_price >= MIN(unit_price)
```
* Các biểu thức không liên quan tới các cột để riêng một bên thay vì để chung với các cột bởi chúng sẽ tính đi tính lại mỗi lần nạp một bản ghi vào để tính toán
```
SELECT id, name, salary 
FROM employee 
WHERE salary < 25000;
```
Thay vì:
```
SELECT id, name, salary 
FROM employee 
WHERE salary + 10000 < 35000;
```
# 8. Tận dụng sức mạnh của INDEX
Trong nhiều trường hợp, có thể ta sẽ không để ý tới tận dụng index một cách hiệu quả khiến việc đánh index trở nên dư thừa. Vì vậy, hãy nghĩ tới việc sử dụng index trong các câu truy vấn lấy dữ liệu trước tiên rồi nghĩ tới các cách truy vấn khác để đảm bảo index không bị trở nên vô dụng.
Tận dụng index trên trường "dept" được đánh sẵn:
```
SELECT ssnum
FROM Employee
WHERE Employee.dept = ’IT’
AND salary > 40000
```
Thay vì:
```
SELECT * INTO Temp
FROM Employee
WHERE salary > 40000

SELECT ssnum
FROM Temp
WHERE Temp.dept = ’IT’
```

# 9. Số lượng INDEX
Số lượng index nên được tối thiểu hóa nhằm đảm bảo hiệu năng cho hệ thống. Chúng ta nên chọn lọc ra những trường thực sự cần thiết để đánh index chứ không nên lạm dụng index mà đánh trên toàn bộ các trường của bảng bởi nó sẽ hao phí bộ nhớ cũng như giảm hiệu năng của hệ thống trong các câu truy vấn làm thay đổi dữ liệu bảng.

# Kết luận
Phía trên là một số các lưu ý nhỏ khi bạn thiết lập các câu truy vấn. Mặc dù đây là những điều tương đối đơn giản nhưng nó sẽ mang lại hiệu quả khá lớn trong các bộ dữ liệu khổng lồ. Mong rằng bài viết đã đem lại cho bạn một số hữu ích để truy vấn tốt hơn.
* Link tham khảo: 

http://beginner-sql-tutorial.com/sql-query-tuning.htm

https://stackoverflow.com/questions/49925/what-is-the-difference-between-union-and-union-all

https://technocityhub.com/2017/08/21/oracle-exists-vs-distinct/