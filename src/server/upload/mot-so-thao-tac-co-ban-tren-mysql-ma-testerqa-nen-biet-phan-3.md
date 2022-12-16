Hãy chuẩn bị các bảng dữ liệu để cùng thực hiện những cú pháp bên dưới nhé:

Bảng **qa_member**

![](https://images.viblo.asia/98b70c40-65ab-40fe-b02d-19f6196de464.jpg)

Bảng **qa_team_leader**

![](https://images.viblo.asia/6f36f924-5d19-4597-aed7-c23fde7ee1cc.jpg)

## I. Cách gộp kết quả từ nhiều câu lệnh truy vấn dữ liệu 

Để gộp tập kết quả của hai hay nhiều câu lệnh truy vấn dữ liệu (SELECT) lại với nhau, chúng ta sử dụng toán tử UNION và UNION ALL.

-----
Trong đó:
* Toán tử UNION chỉ lấy mỗi loại giá trị một lần duy nhất (tức là không có trường hợp các giá trị trùng nhau)
* Toán tử UNION ALL sẽ lấy hết tất cả các kết quả, mặc cho chúng có bị trùng nhau hay không.
-----
Những quy tắc khi sử dụng toán tử UNION và UNION ALL:

* Các câu lệnh SELECT phải có chung số lượng cột.
* Thứ tự cột trong các câu lệnh SELECT phải được sắp xếp theo đúng thứ tự cột của cái bảng kết hợp.
* Các cột tương ứng giữa các câu lệnh SELECT phải có kiểu dữ liệu giống nhau.

### 1. Toán tử UNION

```
Cú pháp sử dụng UNION:

SELECT column1, column2, column3, . . . . FROM table1 WHERE condition
UNION
SELECT column1, column2, column3, . . . . FROM table2 WHERE condition;
```

**Ví dụ 1:**


-----


Liệt kê tất cả họ tên qa của **qa_member** và **qa_team_leader** (họ tên từ 2 bảng không được phép trùng nhau)

```
Cú pháp thực hiện:

Select qa_full_name AS FULL_NAME From qa_member
UNION
Select qa_team_leader_fullname From qa_team_leader;
```

**Kết quả:** Liệt kê được tất cả các **qa** từ 2 bảng và loại bỏ những **qa** trùng tên.

![](https://images.viblo.asia/9d1aa64e-83b7-4cbf-b0b2-97fe37843db6.jpg)


**Ví dụ 2:**

-----


Gộp danh sách các **qa_member** và **qa_team_leader**  vào cùng một bảng, đồng thời tạo một column tạm để phân biệt vai trò của từng "qa".


```
Cú pháp thực hiện:

Select "QA Member" AS ROLE,
      qa_full_name AS FULL_NAME,
            gender AS GENDER,
               age AS AGE FROM qa_member
UNION
Select "QA Team Leader" AS ROLE, qa_team_leader_fullname, qa_team_leader_gender, qa_team_leader_age FROM qa_team_leader;
```

**Kết quả:** Liệt kê được tất cả danh sách và thể hiện được role hiện tại của  "qa" 

![](https://images.viblo.asia/2beedcae-0959-412e-b395-0650861d71f4.jpg)


### 2. Toán tử UNION ALL

```
Cú pháp sử dụng UNION ALL:

SELECT column1, column2, column3, . . . . FROM table1 WHERE condition
UNION ALL
SELECT column1, column2, column3, . . . . FROM table2 WHERE condition;
```

**Ví dụ 1:**  Gộp tất cả các "qa" có giới tính Nữ vào cùng một bảng (lấy các thông tin fullname, age, gender)


-----


```
Cú pháp thực hiện:

SELECT qa_full_name, age, gender FROM qa_member WHERE gender = "Nữ"
UNION ALL
SELECT qa_team_leader_fullname, qa_team_leader_age, qa_team_leader_gender FROM qa_team_leader WHERE qa_team_leader_gender = "Nữ";
```

**Kết quả:**

![](https://images.viblo.asia/d5b249ca-8fe4-47e7-af5a-982d5b1ec9d5.jpg)

**Ví dụ 2:**  Gộp tất cả các **qa_member** và **qa_team_leader** vào cùng một bảng (lấy các thông tin fullname, age, gender) và sắp xếp theo thứ tự giảm dần dựa trên độ tuổi


-----

```
Cú pháp thực hiện:

Select qa_full_name AS FULL_NAME,
		                    gender AS GENDER,
			                      age AS AGE FROM qa_member
UNION ALL
Select qa_team_leader_fullname, qa_team_leader_gender, qa_team_leader_age FROM qa_team_leader
Order by age Desc;

```

**Kết quả:**

![](https://images.viblo.asia/f4d66af2-ef61-4c0d-be11-33c606da0dbc.jpg)


## II. Cách lấy dữ liệu không bị trùng lặp

Đối với một bảng dữ liệu, có thể tồn tại nhiều dữ liệu trùng lặp nhau tại một số cột, nhưng đôi khi chúng ta chỉ muốn lấy những giá trị khác nhau, để làm được điều đó thì ta cần phải sử dụng lệnh SELECT DISTINCT.

SELECT DISTINCT là cú pháp dùng để truy xuất dữ liệu với mỗi loại giá trị chỉ lấy một lần duy nhất (điều đó đồng nghĩa với việc không có trường hợp các giá trị trả về bị trùng nhau).

```
Cú pháp:

SELECT DISTINCT column1, column2, column3, . . . .
FROM table_name;
```

**Ví dụ:**    List danh sách các độ tuổi trong bảng **qa_member** (mỗi tuổi chỉ lấy 1 lần) và sắp xếp theo thứ tự tăng dần.

-----

```
Cú pháp sử dụng:

Select DISTINCT age From qa_member
order by age ASC;
```

**Kết quả:**

![](https://images.viblo.asia/d7a2eade-8f85-4af8-aa0d-92eeaba93495.jpg)

## III. Cách sử dụng các toán tử AND, OR, NOT 

Các toán tử AND - OR - NOT thường được sử dụng kết hợp với mệnh đề WHERE để xác định những hàng (bản ghi) mà chúng ta muốn chọn để thực hiện các thao tác dữ liệu bao gồm: truy xuất, cập nhật và xóa.

Trong đó, toán tử AND và OR thực hiện việc chọn lọc dữ liệu dựa trên nhiều điều kiện.

* Toán tử **AND** chỉ lấy những hàng mà dữ liệu trên hàng đó thỏa hết tất cả các điều kiện được đặt ra.
* Toán tử **OR** lấy những hàng mà dữ liệu trên hàng đó thỏa ít nhất một trong số các điều kiện được đặt ra.
* Toán tử **NOT** lấy những hàng mà dữ liệu trên hàng đó không thỏa điều kiện được đặt ra.

### 1. Toán tử AND

-----

```
Cú pháp:

SELECT column1, column2, column3, . . . .
FROM table_name
WHERE condition1 AND condition2 AND condition3 . . . .;
```

**Ví dụ:**    Liệt kê những 'qa' Nữ có độ tuổi là 18.

-----

```
Cú pháp sử dụng:

Select qa_full_name, gender, age from qa_member 
Where gender = "Nữ" and age = 18;
```

**Kết quả:**

![](https://images.viblo.asia/2582b449-4ac7-429d-bea3-3f51e60fa363.jpg)

### 2. Toán tử OR

-----

```
Cú pháp:

SELECT column1, column2, column3, . . . .
FROM table_name
WHERE condition1 OR condition2 OR condition3 . . . .;
```

**Ví dụ 1:**    Liệt kê những 'qa' ở 'Quảng Bình' hoặc 'TP Hồ Chí Minh'

-----

```
Cú pháp sử dụng:

Select * from qa_member
Where Province = "Quảng Bình" OR Province = "TP Hồ Chí Minh";
```

**Kết quả:**

![](https://images.viblo.asia/3ef86155-79c1-4b4d-bd48-5c886220e841.jpg)

**Ví dụ 2:**    Liệt kê những 'qa' NỮ ở độ tuổi 18 hoặc 20

-----

```
Cú pháp sử dụng:

Select * from qa_member
Where gender = "Nữ" and (age = 18 OR age = 20); 
```

**Kết quả:**

![](https://images.viblo.asia/effa3a23-0a26-46da-afc2-bc0a2bfbf887.jpg)

### 3. Toán tử NOT

-----

```
Cú pháp:

SELECT column1, column2, column3, . . . .
FROM table_name
WHERE NOT condition;
```

**Ví dụ:**    Liệt kê những 'qa' ở KHÔNG sống ở 'Đà Nẵng' và 'Hà Nội'

-----
Với ví dụ này chúng ta có thể sử dụng kết hợp giữa toán tử **NOT - AND** hoặc **NOT - OR** để lấy ra được cùng một kết quả mong muốn.

```
* Cú pháp 1:

Select * from qa_member
Where (NOT Province ="Đà Nẵng") AND (NOT Province ="Hà Nội");

* Cú pháp 2:

Select * from qa_member
Where NOT (Province ="Đà Nẵng" OR Province ="Hà Nội");
```

**Kết quả:**

![](https://images.viblo.asia/d183abb9-870b-4a33-a10f-833faee06dff.jpg)


Refer:

https://freetuts.net/hoc-mysql/mysql-can-ban

http://webcoban.vn/