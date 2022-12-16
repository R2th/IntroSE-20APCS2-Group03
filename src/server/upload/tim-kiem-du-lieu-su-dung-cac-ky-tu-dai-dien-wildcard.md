Trong Testing, việc sử dụng thành thạo các truy vấn SQL sẽ giúp bạn đẩy nhanh tốc độ test ở một số chức năng cần truy vấn, tìm kiếm dữ liệu. Các kí tự đại diện (Wildcard) hỗ trợ trong việc tìm kiếm dữ liệu thường được sử dụng là:

%: *Dấu phần trăm biểu thị bằng không, một hoặc nhiều ký tự.*

_: *Dấu gạch dưới đại diện cho một ký tự đơn.*

[charlist]: *Xác định tập hợp và phạm vi ký tự để khớp.*  

[! charlist]: *Xác định tập hợp và phạm vi ký tự KHÔNG khớp.*

* Các kí tự đại diện này được sử dụng kết hợp với toán tử LIKE. 

* Các kí tự "%" và "_" được sử dụng ở cả MySQL và SQL Server. 

* Các kí tự "[charlist]" hoặc "[! charlist]" chỉ được sử dụng ở SQL Server.
 
 
## I. Kí tự "%"

### **1. Cú pháp và Mô tả**

| Cú pháp   | Toán Tử LIKE | Mô Tả | 
| ------------- | --------- | -------- |
|1| WHERE column_name LIKE 'a%' | Tìm giá trị bắt đầu với "a" | 
|2| WHERE column_name LIKE '%a'     | Tìm giá trị kết thúc với "a"     | 
|3|WHERE column_name LIKE '%a%'     | Tìm giá trị có "a" ở bất kì vị trí    | 
|4|WHERE column_name LIKE 'a%o'    | Tìm giá trị bắt đầu với "a" và kết thúc với "o"   |

### 2. Ví dụ áp dụng 

**Bảng Cơ Sở Dữ Liệu**

![](https://images.viblo.asia/678f8f91-90b9-41d8-b7c0-799334284227.png)


***Cú pháp 1: Tìm tất cả các QA có qa_full_name bắt đầu bằng "T":***

```
SELECT * FROM thuong.qa_member where qa_full_name LIKE 'T%';
```
![](https://images.viblo.asia/03a05792-b442-4d0d-bce3-f19e23dda276.png)

***Cú pháp 2: Tìm tất cả các QA có qa_full_name kết thúc bằng "Trinh":***

```
SELECT * FROM thuong.qa_member where qa_full_name LIKE '%Trinh';
```
![](https://images.viblo.asia/37ac1afd-4e78-4235-b050-eb6f7dd5a477.png)

***Cú pháp 3: Tìm tất cả các QA có qa_full_name chứa "Thị" ở vị trí bất kỳ:***

```
SELECT * FROM thuong.qa_member WHERE qa_full_name LIKE '%Thị%';
```
![](https://images.viblo.asia/0a60aca1-c047-4255-a9fd-9b40665ad442.png)

***Cú pháp 4: Tìm tất cả các QA có qa_full_name bắt đầu bằng "Nguyễn" và kết thúc bằng "h":***
```
SELECT * FROM thuong.qa_member WHERE qa_full_name LIKE 'Nguyễn%h';
```
![](https://images.viblo.asia/537d12d9-8e24-4504-b39d-b8ebb4406a9a.png)


## II. Kí tự "_"
### **1. Cú pháp và Mô tả**

| Cú pháp   | Toán Tử LIKE | Mô Tả | 
| ------------- | -------- | -------- |
| 1|WHERE column_name LIKE '_a%'     | Tìm bất kỳ giá trị có "a" ở vị trí thứ 2     | 
| 2|WHERE column_name LIKE 'a%_%'     | Tìm giá trị bắt đầu với "a" và có ít nhất 3 kí tự     | 
| 3|WHERE column_name LIKE '_a%o'     | Tìm giá trị "a" ở vị trí thứ 2 và kết thúc bằng "o"   | 

### 2. Ví dụ áp dụng 

***Cú pháp 1: Tìm tất cả các QA có qa_short_name chứa "u" ở vị trí thứ 2 :***

```
SELECT * FROM thuong.qa_member WHERE qa_short_name LIKE '_u%';
```

![](https://images.viblo.asia/6ef519af-d68c-4a3b-a82e-db8bcf726cde.png)

***Cú pháp 2: Tìm tất cả các QA có qa_short_name bắt đầu với "T" và có ít nhất 3 ký tự :***

```
SELECT * FROM thuong.qa_member WHERE qa_short_name LIKE 'T%_%';
```

![](https://images.viblo.asia/f3cf474e-4185-4e55-8f12-9ffe03eb5c18.png)

***Cú pháp 3: Tìm tất cả các QA có qa_short_name có "u" ở vị trí thứ 2 và kết thúc bằng "g":***

```
SELECT * FROM thuong.qa_member WHERE qa_short_name LIKE '_u%g';
```

![](https://images.viblo.asia/aedfdcad-7400-4003-a48a-7719b21f9ec0.png)


## II. Kí tự "[charlist]"

**Cú pháp: Tìm tất cả các QA có qa_short_name bắt đầu bằng "T", "L"**

`SELECT * FROM thuong.qa_member WHERE qa_short_name LIKE '[TL]%';`

Kết quả sẽ là:
![](https://images.viblo.asia/27698da0-1815-46db-9e02-651b94c57c3c.png)


## II. Kí tự "[! charlist]"

**Cú pháp: Tìm tất cả các QA có qa_short_name KHÔNG bắt đầu bằng "T", "L"**

`SELECT * FROM thuong.qa_member WHERE qa_short_name LIKE '[!TL]%';`

hoặc

`SELECT * FROM thuong.qa_member WHERE qa_short_name NOT LIKE '[TL]%';`

Kết quả sẽ là:
![](https://images.viblo.asia/8132b718-bd72-4cb9-baf2-7e2e1b25de3a.png)


Refer: 
https://o7planning.org/vi/10239/huong-dan-hoc-sql-cho-nguoi-moi-bat-dau-voi-sql-server
https://www.codehub.vn/Hoc-SQL/Ky-Tu-Dai-Dien-Wildcard-trong-SQL
https://www.w3schools.com/sql/sql_wildcards.asp