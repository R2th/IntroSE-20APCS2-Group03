Hãy tạo một bảng dữ liệu để cùng thực hiện những cú pháp bên dưới nhé:

![](https://images.viblo.asia/69fcd66a-c362-48b9-b7d1-7e5b3367e4c8.jpg)

## I. Cách lấy dữ liệu không bị trùng lặp trong MySQL

Trong một table (bảng) hoặc một column (cột) thường có thể có nhiều giá trị trùng lặp giống nhau, nhưng đôi khi chúng ta chỉ muốn lấy danh sách các giá trị khác nhau, không bị trùng lặp. 
Để thực hiện việc này chúng ta sẽ dùng câu lệnh với SELECT DISTINCT.

"SELECT DISTINCT được sử dụng để  truy xuất dữ liệu với mỗi loại giá trị chỉ lấy một lần duy nhất (điều đó đồng nghĩa với việc không có trường hợp các giá trị trả về bị trùng nhau)".

```
Cú pháp:

SELECT DISTINCT column1, column2, column3, . . . .
FROM table_name;
```

* *Ví dụ 1:*
*Lấy tất cả các giá trị bên trong cột Province (mỗi loại giá trị chỉ lấy một lần duy nhất)*

```
SELECT DISTINCT Province FROM qa_member;
```
* *Kết quả sẽ là*:

![](https://images.viblo.asia/88e5fa70-025d-4c2b-a073-db7b3a531291.jpg)

* *Ví dụ 2:*
*Lấy các cặp giá trị của hai cột qa_full_name & Province (mỗi cặp giá trị chỉ lấy một lần duy nhất)*

```
SELECT DISTINCT qa_full_name, Province FROM qa_member;
```

* *Kết quả sẽ là*: 

![](https://images.viblo.asia/be158823-2685-4d4d-992f-d5f8f24b5ed0.jpg)


## II. Cách giới hạn số lượng kết quả trả về trong MySQL

Khi chúng ta sử dụng lệnh SELECT để lấy dữ liệu trên một bảng thì mặc định sẽ lấy hết tất cả những hàng thỏa điều kiện. Tuy nhiên, có những trường hợp chúng ta chỉ muốn lấy thông tin ở một số lượng hàng (row) nhất định.
Để thực hiện được việc này, chúng ta sử dụng từ khóa LIMIT nằm cuối câu lệnh SELECT.

```
Cú pháp:

SELECT column1, column2, column3, . . . .
FROM table_name
WHERE condition
LIMIT số lượng hàng muốn lấy;
```

* *Ví dụ 1*: 
*Liệt kê 5 QA (nằm ở đầu bảng)*

```
SELECT * FROM qa_member LIMIT 5;
```

* *Kết quả sẽ là*:

![](https://images.viblo.asia/09583c55-bb24-47d9-969b-9c3faeb8195b.jpg)

* *Ví dụ 2*: 
*Liệt kê 3 QA (nằm ở cuối bảng)*

```
SELECT * FROM qa_member ORDER BY id DESC LIMIT 3;
```

* *Kết quả sẽ là*:

![](https://images.viblo.asia/cfcb89dd-53c3-4d46-bf39-a154dfb7be4a.jpg)

* *Ví dụ 3*: 
*Liệt kê 3 QA sống ở Đà Nẵng (nằm ở đầu bảng)*

```
SELECT * FROM qa_member WHERE Province = "Đà Nẵng" LIMIT 3;
```

* *Kết quả sẻ là*:

![](https://images.viblo.asia/efef8db1-9fb4-4751-8aff-7472058470f0.jpg)

## III. Cách sắp xếp thứ tự của các kết quả trả về trong MySQL

Khi thực hiện truy vấn dữ liệu, chúng ta muốn thực hiện sắp xếp dữ liệu trả về theo thứ tự mong muốn (tăng dần hoặc giảm dần), hãy sử dụng lệnh ORDER BY -  thường được dùng kết hợp với lệnh SELECT để thực hiện những yêu cầu này

* Sắp xếp kết quả theo thứ tự tăng dần

```
SELECT column1, column2, column3, . . . .
FROM table_name
ORDER BY columnN ASC;
```

* Sắp xếp kết quả theo thứ tự giảm dần

```
SELECT column1, column2, column3, . . . .
FROM table_name
ORDER BY columnN DESC;
```

*Ví dụ  tăng dần*:
*Liệt kê danh sách QA theo thứ tự tuổi tăng dần*

```
SELECT * FROM qa_member ORDER BY age ASC;
```

*Kết quả sẽ là*:

![](https://images.viblo.asia/2450ac51-0d72-4960-a539-8420e2803c19.jpg)

*Ví dụ giảm dần*:
*Liệt kê danh sách QA theo thứ tự tuổi giảm dần*

```
SELECT * FROM qa_member ORDER BY age DESC;
```

*Kết quả sẻ là*: 

![](https://images.viblo.asia/2450ac51-0d72-4960-a539-8420e2803c19.jpg)


Refer:

https://freetuts.net/hoc-mysql/mysql-can-ban

http://webcoban.vn/