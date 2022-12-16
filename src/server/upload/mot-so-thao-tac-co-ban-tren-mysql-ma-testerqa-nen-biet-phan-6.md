## I. TỔNG HỢP CÁC HÀM HỮU ÍCH TRONG MYSQL
`Hàm COUNT: `

Hàm tập hợp COUNT trong MySQL được sử dụng để đếm số hàng trong một bảng dữ liệu.

`Hàm MAX:` 
   
Hàm tập hợp MAX trong MySQL cho phép chúng ta lựa chọn giá trị lớn nhất trong một cột cụ thể.

`Hàm MIN:`

Hàm tập hợp MIN trong MySQL cho phép chúng ta lựa chọn giá trị nhỏ nhất trong một cột cụ thể.

`Hàm AVG:`

Hàm tập hợp AVG trong MySQL cho phép chúng ta lựa chọn giá trị trung bình trong một cột cụ thể.

`Hàm SUM:`

Hàm được sử dụng để tìm Tổng của một trường trong các bản ghi.

`Hàm SQRT:` 

Được sử dụng để tính căn bậc hai của một số đã cho.

`Hàm RAND:` 

Được sử dụng để tạo một số ngẫu nhiên bởi sử dụng lệnh trong MySQL.

`Hàm CONCAT:` 

Được sử dụng để nối bất kỳ chuỗi nào trong bất kỳ lệnh MySQL nào.

`Hàm xử lý DATE và Time trong MySQL:` 

Danh sách đầy đủ các hàm liên quan tới Date và Time trong MySQL.

`Hàm xử lý số trong MySQL:` 

Danh sách đầy đủ các hàm cần thiết để thao tác với số trong MySQL.

`Hàm xử lý chuỗi trong MySQL`

Danh sách đầy đủ các hàm cần thiết để thao tác với chuỗi trong MySQL.


## 1. Hàm COUNT

Hàm COUNT trong MySQL là hàm đơn giản nhất, dùng để đếm số bản ghi.

*CÚ PHÁP:*
```
SELECT COUNT(*)
FROM table_name;
```


* **Ví dụ 1:**
Đếm tổng số lượng QA trong table sau:

![](https://images.viblo.asia/e2413f0d-e1a8-4644-8908-f35e4cfd927b.png)

**Cú pháp thực hiện:**

```
SELECT COUNT(*)
FROM thuong.qa_team_leader;
```

![](https://images.viblo.asia/5394e655-571f-4f42-ad6b-17ac6ea8a48e.png)

* **Ví dụ 2:**
Đếm tổng số lượng QA có giới tính là "Nữ":

**Cú pháp thực hiện:**

```
SELECT COUNT(*)
FROM thuong.qa_team_leader;
```

![](https://images.viblo.asia/7e0c27f6-8f0f-4837-90c0-cdfcd3ddb99f.png)


* **Ví dụ 3:**
Đếm tổng số lượng QA có tuổi là 30, 31

**Cú pháp thực hiện:**

```
SELECT COUNT(*) AS Số_Lượng_QA_Tuổi_30_31
FROM thuong.qa_team_leader
WHERE qa_team_leader_age IN (30,31);
```

![](https://images.viblo.asia/2a52b72c-21c7-4c01-ac70-726070cd8377.png)


## 2. Hàm MAX

Hàm MAX trong MySQL được sử dụng để tìm bản ghi với giá trị lớn nhất trong một tập hợp bản ghi

*CÚ PHÁP:*
```
SELECT MAX(name_column)
FROM name_table;
```

* **VÍ DỤ 1:***
Truy vấn QA có tuổi lớn nhất theo bảng dữ liệu sau:

![](https://images.viblo.asia/02a3d539-cfdb-4d08-97c5-57a68520fc8a.png)


**Cú pháp thực hiện:**

```
SELECT MAX(Age)
FROM thuong.qa_member;
```

![](https://images.viblo.asia/2046c866-5149-40ee-92f3-aae584d9e88c.png)

* **VÍ DỤ 2:**
Truy vấn QA giới tính Nữ có tuổi lớn nhất

**Cú pháp thực hiện:**

```
SELECT MAX(Age) 
FROM thuong.qa_member
WHERE gender = 'Nữ';
```

![](https://images.viblo.asia/25680ee2-c66a-48a1-8a7b-d09e41cad69a.png)

* **VÍ DỤ 3:**
Truy xuất toàn bộ thông tin của QA có tuổi lớn nhất

**Cú pháp thực hiện:**

```
SELECT *
FROM thuong.qa_member
WHERE Age = (SELECT MAX(Age) FROM thuong.qa_member);
```

![](https://images.viblo.asia/b2036178-1d84-4fc5-a9d5-70356bd50719.png)

## 3. Hàm MIN

Hàm MIN trong MySQL được sử dụng để tìm bản ghi với giá trị nhỏ nhất trong một tập hợp bản ghi

*CÚ PHÁP:*
```
SELECT MIN(name_column)
FROM name_table;
```

* **VÍ DỤ 1:***
Truy vấn QA có tuổi nhỏ nhất theo bảng dữ liệu sau:

![](https://images.viblo.asia/02a3d539-cfdb-4d08-97c5-57a68520fc8a.png)


**Cú pháp thực hiện:**

```
SELECT MIN(age)
FROM thuong.qa_member;
```

![](https://images.viblo.asia/787be1ce-58d1-42dd-9719-a6db910e2a55.png)

* **VÍ DỤ 2:**
Truy vấn QA giới tính Nam có tuổi nhỏ nhất

**Cú pháp thực hiện:**

```
SELECT MIN(Age) 
FROM thuong.qa_member
WHERE gender = 'Nam';
```

![](https://images.viblo.asia/0925a9eb-27b6-448a-8559-b3a0d57ee514.png)


* **VÍ DỤ 3:**
Truy xuất toàn bộ thông tin của QA có tuổi nhỏ nhất

**Cú pháp thực hiện:**

```
SELECT *
FROM thuong.qa_member
WHERE Age = (SELECT MIN(Age) FROM thuong.qa_member);
```

![](https://images.viblo.asia/7d1237df-a09f-4d9b-bbb8-e08404097d4a.png)


*(Còn tiếp tục ở các bài tiếp theo...)*

Refer:
http://webcoban.vn/
https://hoclaptrinh.vn/