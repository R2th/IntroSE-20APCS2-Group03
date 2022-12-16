Chương này giải thích các toán tử tích hợp của Hive. Có bốn loại toán tử trong Hive:

Toán tử quan hệ

Toán tử số học

Toán tử logic

Toán tử phức tạp
# 1. Relational Operators - Toán tử quan hệ
Các toán tử này được sử dụng để so sánh hai toán hạng. Bảng sau đây mô tả các toán tử quan hệ có sẵn trong Hive:

| Toán tử | Toán hạng | Mô tả |
| -------- | -------- | -------- |
| A = B     | Tất cả các dạng nguyên thuỷ     | TRUE nếu biểu thức A tương đương với biểu thức B nếu không thì FALSE.    |
| A != B     | Tất cả các dạng nguyên thuỷ    | TRUE nếu biểu thức A không tương đương với biểu thức B nếu không thì FALSE.     |
| A < B     | Tất cả các dạng nguyên thuỷ    | TRUE nếu biểu thức A nhỏ hơn biểu thức B nếu không thì FALSE.     |
| A <= B     | Tất cả các dạng nguyên thuỷ     | TRUE nếu biểu thức A nhỏ hơn hoặc bằng biểu thức B nếu không thì FALSE.    |
| A > B     | Tất cả các dạng nguyên thuỷ     | TRUE nếu biểu thức A lớn hơn biểu thức B nếu không thì FALSE.    |
| A >= B     | Tất cả các dạng nguyên thuỷ    | TRUE nếu biểu thức A lớn hơn hoặc bằng biểu thức B nếu không thì FALSE.     |
| A IS NULL    | Tất cả các dạng     | TRUE nếu biểu thức A ước lượng thành NULL nếu không thì FALSE.     |
| A IS NOT NULL    | Tất cả các dạng     | SAI nếu biểu thức A ước lượng thành NULL nếu không thì TRUE.     |
| A LIKE B     | Strings    | TRUE nếu mẫu chuỗi A khớp với B nếu không thì FALSE.    |
| A RLIKE B     | Strings    | NULL nếu A hoặc B là NULL, TRUE nếu bất kỳ chuỗi con nào của A khớp với biểu thức chính quy Java B, nếu không thì FALSE.    |
| A REGEXP B     | Strings    | Giống RLIKE     |

**Ví dụ :**
Ta giả định bảng employee bao gồm nhiều trường: Id, Name, Salary, Designation, Dept như sau. Tạo một query để lấy thông tin employee có Id = 1205.
```
+-----+--------------+--------+---------------------------+------+
| Id  | Name         | Salary | Designation               | Dept |
+-----+--------------+------------------------------------+------+
|1201 | Gopal        | 45000  | Technical manager         | TP   |
|1202 | Manisha      | 45000  | Proofreader               | PR   |
|1203 | Masthanvali  | 40000  | Technical writer          | TP   |
|1204 | Krian        | 40000  | Hr Admin                  | HR   |
|1205 | Kranthi      | 30000  | Op Admin                  | Admin|
+-----+--------------+--------+---------------------------+------+
```

Query sau đây được thực thi để lấy thông tin employee sử dụng bảng trên:
```
hive> SELECT * FROM employee WHERE Id=1205;
```

Thực thi thành công câu query ta sẽ có response sau:
```
+-----+-----------+-----------+----------------------------------+
| ID  | Name      | Salary    | Designation              | Dept  |
+-----+---------------+-------+----------------------------------+
|1205 | Kranthi   | 30000     | Op Admin                 | Admin |
+-----+-----------+-----------+----------------------------------+
```

Câu query sau thực thi để lấy thông tin employee có lương lớn hơn hoặc bằng Rs 4000.
```
hive> SELECT * FROM employee WHERE Salary>=40000;
```
Và response:
```
+-----+------------+--------+----------------------------+------+
| ID  | Name       | Salary | Designation                | Dept |
+-----+------------+--------+----------------------------+------+
|1201 | Gopal      | 45000  | Technical manager          | TP   |
|1202 | Manisha    | 45000  | Proofreader                | PR   |
|1203 | Masthanvali| 40000  | Technical writer           | TP   |
|1204 | Krian      | 40000  | Hr Admin                   | HR   |
+-----+------------+--------+----------------------------+------+
```

# 2. Arithmetic Operators - Toán tử số học
Các toán tử này hỗ trợ các phép toán số học phổ biến khác nhau trên các toán hạng. Tất cả đều trả về các loại số. Bảng sau đây mô tả các toán tử số học có sẵn trong Hive:

| Toán tử | Toán hạng | Mô tả |
| -------- | -------- | -------- |
| A + B     | Tất cả dạng số    | Cho kết quả tổng A và B   |
| A - B     | Tất cả dạng số    | Cho kết quả hiệu A trừ B   |
| A * B     | Tất cả dạng số    | Cho kết quả phép nhân 2 số A, B    |
| A / B     | Tất cả dạng số    | Cho kết quả A chia cho B  |
| A % B     | Tất cả dạng số    | Cho kết quả A trừ B lấy phần dư  |
| A & B     | Tất cả dạng số    | Cho kết quả bit AND của A và B   |
| A | B     | Tất cả dạng số    | Cho kết quả bit OR của A và B   |
| A ^ B     | Tất cả dạng số    | Cho kết quả bit XOR của A và B   |
| ~A    | Tất cả dạng số    | Cho kết quả bit NOT của A    |

**Example:**
Truy vấn sau tính tổng 2 số: 20 và 30:
```
hive> SELECT 20+30 ADD FROM temp;
```

Response khi thực thi thành công :

```
+--------+
|   ADD  |
+--------+
|   50   |
+--------+
```

# 3. Logical Operators - Toán tử logic
Các toán tử là biểu thức logic. Tất cả đều trả về TRUE hoặc FALSE.

| Toán tử | Toán hạng | Mô tả |
| -------- | -------- | -------- |
| A AND B    | boolean     | TRUE nếu cả A và B đều TRUE, nếu khác thì FALSE    |
| A && B     | boolean     | Như A AND B    |
| A OR B     | boolean     | TRUE nếu có một trong 2 hoặc cả A và B đều TRUE, khác thì trả về FALSE    |
| A || B     | boolean     | Như A OR B     |
| NOT A     | boolean     | Trả về TRUE nếu A là FALSE, và nếu khác thì trả về FALSE     |
| !A     | boolean     | Như NOT A    |

**Example:**

Query sau đây lấy thông tin employee có Deparment là TP và Salary lớn hơn Rs 40000.
```
hive> SELECT * FROM employee WHERE Salary>40000 && Dept=TP;
```

Thực thi thành công sẽ ra kết quả:

```
+------+--------------+-------------+-------------------+--------+
| ID   | Name         | Salary      | Designation       | Dept   |
+------+--------------+-------------+-------------------+--------+
|1201  | Gopal        | 45000       | Technical manager | TP     |
+------+--------------+-------------+-------------------+--------+
```


# 4. Complex Operators - Toán tử phức hợp
Các toán tử này cung cấp một biểu thức để truy cập các phần tử của Complex Types.

| Toán tử | Toán hạng | Mô tả |
| -------- | -------- | -------- |
| A[n]     | A là một Array và n là một int    | Trả về phần tử thứ n của mảng A. Phần tử đầu tiên có index = 0    |
| M[key]    | M là một Map<K,V> và key có dạng K     | Trả về giá trị tương ứng với key trong map   |
| S.x     | S là struct    | Trả về trường x của S     |