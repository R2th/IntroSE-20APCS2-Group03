Ở phạm vi bài viết này chúng ta sẽ cùng nhau xem xét sự khác biệt về perfomance giữa hai cách lặp qua các record của các table(có hàng triệu records) trong DB MySQL.

Trong một hệ thống phân tích khối lượng lớn, các bảng có hàng triệu records khá phổ biến và lặp đi lặp lại trên toàn bộ bảng hay một tập hợp con của các bảng này thường trở nên cần thiết - cho dù nó có thực hiện tính toán, chạy migrate hay tạo các background job song song trên các record này. 

Chúng ta sẽ tạo một bảng `employees` cỡ 5 triệu records và một bảng `salaries` cỡ 3 triệu records lưu trữ mức lương của các employee đó trong các khoảng thời gian khác nhau để xem xét và so sánh về performance của các method interate.


- bảng `employees`

| field | type | 
| -------- | -------- | -------- |
| employee_number     | int (11)    |
| birth_date     | date  | 
| first_name     | varchar(255)     | 
| last_name     | varchar(255)    |
| gender     | int(11)     |

- bảng `salaries`

| field | type | 
| -------- | -------- | -------- |
| id     | int (11)    |
| employee_number     | int (11)    |
| from_date     | date  | 
| to_date     | date  | 
| salary     | int(11)     | 


### 1. find_each 

`find_each` là một method chuẩn được cung cấp bởi `ActiveRecord` thuần


Bây giờ ta sẽ dùng find_each lặp qua bảng `employees` và đo performace:

```
BATCH_SIZE = 1000
time = Benchmark.realtime do
  Employee.select(:emloyee_number, :first_name, :last_name).
           find_each(batch_size: BATCH_SIZE) do |employee|
  end
end
=> 100.6963519999990
```

query ActiveRecord tạo ra sẽ trông như thế này:

```
Employee Load (2.1ms)  SELECT  `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees`  ORDER BY `employees`.`employee_number` ASC LIMIT 1000
  Employee Load (1.9ms)  SELECT  `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` WHERE (`employees`.`employee_number` > 11000)  ORDER BY `employees`.`employee_number` ASC LIMIT 1000
  Employee Load (1.8ms)  SELECT  `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` WHERE (`employees`.`employee_number` > 12000)  ORDER BY `employees`.`employee_number` ASC LIMIT 1000

...
  Employee Load (1.3ms)  SELECT  `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` WHERE (`employees`.`employee_number` > 5127997)  ORDER BY `employees`.`employee_number` ASC LIMIT 1000
```


### 2. ID Iterator

Với `id iterator`, chúng ta sẽ phân chia tổng số rows thành các batch và sử dụng các điều kiện trên `id` để lặp qua tất cả các bản ghi trong bảng.

cụ thể như sau:

```
time = Benchmark.realtime do
  first_id = Employee.first.employee_number
  last_id = Employee.last.employee_number
  (first_id..last_id).step(BATCH_SIZE).each do |value|
    Employee.where('employee_number >= ?', value).
         where('employee_number < ?', value + BATCH_SIZE).
         order('employee_number ASC').
         select(:employee_number, :first_name, :last_name).each do |employee|
    end
  end
end
=> 101.34066200000234
```

query tương ứng được sinh ra như sau:

```
Employee Load (1.1ms)  SELECT  `employees`.* FROM `employees`  ORDER BY `employees`.`employee_number` ASC LIMIT 1
  Employee Load (1.1ms)  SELECT  `employees`.* FROM `employees`  ORDER BY `employees`.`employee_number` DESC LIMIT 1
  Employee Load (1.5ms)  SELECT `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` WHERE (employees.employee_number > 10001) AND (employees.employee_number <= 11001)
  Employee Load (1.9ms)  SELECT `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` WHERE (employees.employee_number > 11001) AND (employees.employee_number <= 12001)
...
Employee Load (1.8ms)  SELECT `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` WHERE (employees.employee_number >= 5128001) AND (employees.employee_number < 5129001)
```

-----

=>   **Ta thấy rất rõ ràng là 2 method trên điều có performance tương tự, same same nhau.**
  

-----


### 3. Iterating with joins

Bây giờ, ta sẽ so sánh performacne của 2 method trên khi add thêm điều kiện phức tạp hơn trong câu query.

Giả sử, ta sẽ lặp qua tất cả các employee có salary > 80.000 tại bất kỳ thời điểm nào trong khi họ làm việc với công ty. 

Khi đó, `find_each` sẽ trông giống như thế này:

```
time = Benchmark.realtime do
  Employee.select(:employee_number, :first_name, :last_name).
            joins(:salaries).
            where('salary > 80000').
            find_each(batch_size: BATCH_SIZE) do |employee|
  end
end

=> 1181.770457000006
```


Và method `id interator` sẽ có một cải thiện performance đáng kể như sau:

```
time = Benchmark.realtime do
first_id = Employee.first.employee_number
  last_id = Employee.last.employee_number
(first_id..last_id).step(BATCH_SIZE).each do |value|
    Employee.where('employee_number >= ?', value).
         where('employee_number < ?', value + BATCH_SIZE).
         joins(:salaries).
         where('salary > 80000').   
         order('employee_number ASC').      
         select(:employee_number, :first_name, :last_name).each do |employee|
    end
  end
end
=> 72.75677799998084
```


*Các kết quả trên cho thấy rằng sử dụng method `find_each` dẫn đến hiệu suất kém hơn nhiều trong khi đó method `id iterator` nhanh hơn khoảng 15 lần.*

Performance giảm nhiều hơn trên các bảng lớn hơn. Khi bạn đạt tới hàng trăm triệu records, việc hiểu các truy vấn cơ bản càng trở nên quan trọng hơn bởi vì nó có thể dẫn đến chênh lệch 100x hoặc 1000x.

Do đó, ta sẽ thấy thật rõ ràng khi EXPLAIN kiểm tra các truy vấn được thực hiện bởi hai method này(xem cụ tỷ bọn này đã làm cái quần què gì mà tạo nên sự khác nhau đến vậy). 


- find_each 

```
- query:
SELECT  `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` INNER JOIN `salaries` ON `salaries`.`employee_number` = `employees`.`employee_number` WHERE (salary > 80000)  ORDER BY `employees`.`employee_number` ASC LIMIT 1000


- explain query tương ứng: 

1 SIMPLE salaries ALL salary,employee_number NULL NULL NULL 2837536 Using where; Using temporary; Using filesort
1 SIMPLE employees eq_ref PRIMARY PRIMARY 4 employees.salaries.employee_number 1 Using index
```

*không được sử dụng cả index về salary và index trên empnumber để filter bảng `salaries`.*

- id iterator:

```
- query:

SELECT `employees`.`employee_number`, `employees`.`first_name`, `employees`.`last_name` FROM `employees` INNER JOIN `salaries` ON `salaries`.`employee_number` = `employees`.`employee_number` WHERE (employees.employee_number >= 5128001) AND (employees.employee_number < 5129001) AND (salary > 80000)

- explain query
1 SIMPLE salaries range salary,employee_number employee_number 4 NULL 1 Using index condition; Using where
1 SIMPLE employees eq_ref PRIMARY PRIMARY 4 employees.salaries.employee_number 1 Using index

```

*EXPLAIN cho thấy có tối ưu hóa query sử dụng index trên emloyeenumber trong bảng `salaries`*

 => **Điều này lý giải tại sao `find_each` chậm hơn nhiều so với `id iterator`**
 
 
 Tóm lại là, luôn luôn sử dụng thằng `EXPLAIN` để hiểu `MySQL query optimizer` thực sự làm gì để ta có thể tạo các query được tối ưu hóa nhất. Và dựa trên việc phân tích kết quả của `EXPLAIN`, có thể đưa ra quyết định về cách tiếp cận nào cần được thực hiện cho các lần lặp trên các bảng lớn.
 
 - `JOINs` trên các bảng có kích thước lớn thường dẫn đến performance kém. Chính vì vậy, tốt nhất là tránh dùng chúng và chỉ dùng `JOINs` khi tập kết quả đã được thu hẹp đáng kể thông qua việc sử dụng một điều kiện dựa trên chỉ mục trên một trong các bảng.
 
 - Cố gắng tạo ra việc sử dụng tốt nhất các chỉ mục cho các query nói chung. Sử dụng các query mà `MySQL query optimizer` chọn sử dụng các chỉ mục có sẵn trong bảng. Thêm các chỉ mục vào bảng có thể giúp tăng tốc các câu query trong khi hiểu được sự đánh đổi về mặt suy giảm hiệu suất ghi.

- Tránh chạy select * mà thay vào đó chỉ select các column mình cần. Vì điều này sẽ làm giảm  lượng data cần gửi đặc biệt là khi có nhiều column TEXT trong bảng.

Bài viết được dịch từ nguồn [activerecord-on-mysql-iterating-over-large-tables-with-condition](https://hackernoon.com/activerecord-on-mysql-iterating-over-large-tables-with-conditions-453bd8761c8b)

**Thanks for your reading!**