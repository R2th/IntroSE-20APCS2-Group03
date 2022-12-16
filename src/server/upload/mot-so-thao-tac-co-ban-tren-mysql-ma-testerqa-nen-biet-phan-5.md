## I. Xử lý giá trị NULL trong MySQL

Các điều kiện liên quan tới NULL là khá đặc biệt. Bạn không thể sử dụng "= NULL" hoặc "!= NULL" để tìm giá trị NULL trong các cột, nó sẽ làm việc không chính xác.

Để xử lí tình huống truy vấn dữ liệu với giá trị NULL thì MySQL có 3 toán tử sau:

* **IS NULL:** Toán tử này trả về true nếu giá trị cột là NULL.
* **IS NOT NULL:** Toán tử này trả về true nếu giá trị côt không là NULL.
* **<=>:** Toán tử này so sánh các giá trị, mà (không giống toán tử =) là true khi hai giá trị là NULL.

**Ví dụ:**
Truy vấn danh sách những QA chưa có thông tin **address**  theo bảng dữ liệu sau:

![](https://images.viblo.asia/797cb2a9-8ae2-46b7-95e7-bdf7f0d1bcb1.png)

* ***Nếu không sử dụng các toán tử xử lý NULL nêu trên thì sẽ cho ra kết quả như bên dưới:***

![](https://images.viblo.asia/ef86a3ba-477f-40b4-b059-1ce6d7a6217c.png)

* **Nếu sử dụng đúng toán tử xử lý NULL thì sẽ cho ra kết quả như bên dưới**

![](https://images.viblo.asia/2721f6de-2097-4cb1-a65f-2aaccb936008.png)


## II. Cách nhóm các hàng có cùng giá trị lại với 

Trong hệ quản trị cơ sở dữ liệu MySQL, lệnh GROUP BY được dùng để nhóm những hàng có cùng giá trị dựa trên một cột nào đó lại với nhau, nó thường được sử dụng kết hợp với các hàm tính toán tổng hợp như MIN, MAX, SUM, COUNT, AVG, . . . . để tính toán giá trị cột của những hàng được nhóm lại.

*CÚ PHÁP:*
```
SELECT column_name(s)
FROM table_name
GROUP BY column_name;
```

***VÍ DỤ 1:***

Truy vấn số lượng QA ở mỗi tỉnh (Province) theo bảng dữ liệu sau:

![](https://images.viblo.asia/0ea31e58-15d6-4de2-9cc0-96ab102704d0.png)

* ***Cú pháp thực hiện:***

```
SELECT Province, COUNT(qa_code) AS NumberOfQA
FROM thuong.qa_member
GROUP BY Province;
```

* ***Kết quả:***

![](https://images.viblo.asia/fd296c45-897c-4da2-96ee-25584d137a5d.png)


***VÍ DỤ 2:***

Truy vấn số lượng QA ở mỗi tỉnh (Province) với thứ tự tăng dần theo bảng dữ liệu sau:

![](https://images.viblo.asia/e0b680fc-59e8-43ab-abab-fc989ab80886.png)

* ***Cú pháp thực hiện:***

```
SELECT Province, COUNT(qa_code) AS NumberOfQA
FROM thuong.qa_member
GROUP BY Province
ORDER BY NumberOfQA ASC;
```

* ***Kết quả:***

![](https://images.viblo.asia/2894e9a1-e629-44c8-b012-52f96146565f.png)


## III. Đặt bí danh cho cột & bảng bằng lệnh AS

Khi thực hiện truy vấn dữ liệu, đặc biệt đối với những truy vấn phức tạp và nhiều dữ liệu, để dễ xác định được dữ liệu của các column cụ thể là gì, hoặc để cho các column trở nên ngắn gọn, chúng ta nên sử dụng lệnh AS để đặt tên tạm thời (bí danh). Những bí danh này chỉ tồn tại trong khoảng thời gian truy vấn dữ liệu.

*CÚ PHÁP ĐẶT BÍ DANH CHO COLUMN*
```
SELECT column_name AS alias_name
FROM table_name;
```

*CÚ PHÁP ĐẶT BÍ DANH CHO BẢNG*
```
SELECT column_name
FROM table_name AS alias_name;
```

***VÍ DỤ :***

Đặt bí danh cho các column theo bảng dữ liệu sau:

![](https://images.viblo.asia/e0b680fc-59e8-43ab-abab-fc989ab80886.png)

* ***Cú pháp thực hiện:***

```
SELECT qa_full_name AS HỌ_VÀ_TÊN, gender AS GIỚI_TÍNH, age AS TUỔI
FROM thuong.qa_member;
```

* ***Kết quả:***

![](https://images.viblo.asia/7048ed6c-fc74-4b4f-a503-021246393e57.png)


Refer:
http://webcoban.vn/