Ở bài viết này, mình xin được giới thiệu về một số string functions thường gặp trong SQL. Ở mỗi RDBMS (Hệ quản trị cơ sở dữ liệu quan hệ) có thể sẽ sử dụng các string functions khác nhau, ngoài ra cú pháp của các function cũng có thể sẽ khác nhau với mỗi RDBMS cho dù tên chúng có giống nhau.

### 1. CAST

Hàm CAST trong SQL cho phép chuyển đổi dữ liệu từ kiểu dữ liệu này sang kiểu dữ liệu khác. Ví dụ, chúng ta có thể sử dụng hàm CAST để chuyển đổi dữ liệu dạng số sang dạng chuỗi ký tự.

**Syntax**
```
CAST (expression AS [data type])
```

**Ví dụ**

Ở ví dụ này chúng ta sử dụng bảng **StudentScore** dưới đây.

|StudentID |	First_Name |	Score |
| -------- | -------- |-------- |
|1|	Jenny |	85.2 |
|2|	Bob | 92.5 |
|3|	Alice |	90 |
|4|	James |	120.1 |

* **Ví dụ 1:**
```
SELECT First_Name, CAST(Score AS Integer) Int_Score FROM Student_Score
```

Kết quả:
```
First_Name	Int_Score
Jenny	    85
Bob	        92
Alice	    90
James	    120
```

Trong ví dụ 1 này, chúng ta đã sử dụng hàm CAST để chuyển đổi dữ liệu cột Score từ FLOAT sang INTEGER

* **Ví dụ 2:**
```
SELECT First_Name, CAST(Score AS char(3)) Char_Score FROM Student_Score;
```

Kết quả:
```
First_Name	Char_Score
Jenny	           85.
Bob	               92.
Alice	           90  
James	           120
```
Trong ví dụ 2 này, chúng ta đã sử dụng hàm CAST để chuyển đổi dữ liệu cột Score từ FLOAT sang CHAR(3). Do chỉ lấy 3 kí tự đầu tiên, nên nếu có nhiều hơn 3 kí tự, thì những kí tự sau 3 kí tự đầu sẽ bị lược bỏ đi.

### 2. CONCATENATE
Hàm Concatenate được sử dụng để kết hợp các xâu kí tự với nhau. Mỗi DB lại có cách riêng để tiến hành hàm này:
* My SQL: CONCAT( )
* Oracle: CONCAT( ), ||
* SQL Server: +

**Syntax**
```
CONCAT (str1, str2, str3, ...)
```

*Đối với Oracle thì hàm CONCAT( )  chỉ cho phép 2 arguments, tuy nhiên lại có thể kết hợp nhiều hơn 2 chuỗi kí tự với cú pháp '||'
```
str1 || str2 || str3 ...
```

```
str1 + str2 + str3 ...
```

**Ví dụ**

Trong ví dụ này ra sử dụng bảng **Geography** sau:

|Region_Name|	Store_Name|
|-----|-----|
|East|	Boston|
|East|	New York|
|West|	Los Angeles|
|West|	San Diego|

* **Ví dụ 2: Sử dụng hàm CONCAT( )**

MySQL / Oracle
```
SELECT CONCAT(Region_Name, Store_Name) FROM Geography
WHERE Store_Name = 'Boston';
```

Kết quả:

```
'EastBoston'
```

* **Ví dụ 1: Sử dụng '||'**

Oracle:
```
SELECT Region_Name || ' ' || Store_Name FROM Geography
WHERE Store_Name = 'Boston';
```
Kết quả:
```
'East Boston'
```

* **Ví dụ 3: Sử dụng '+'**

SQL Server:
```
SELECT Region_Name + ' ' + Store_Name FROM Geography
WHERE Store_Name = 'Boston';
```
Kết quả:
```
'East Boston'
```

### 3. SUBSTRING
Hàm Substring được sử dụng để trả về một phần của string đầu vào. Mỗi DB lại có cách riêng để tiến hành hàm này.
* MySQL: SUBSTR( ), SUBSTRING( )
* Oracle: SUBSTR( )
* SQL Server: SUBSTRING( )

**Cú pháp**
```
SUBSTR (str, position, [length])
```

Trong đó, **position** và **length** đều lại integer. Cú pháp trên có ý nghĩa là lấy ra xâu kí tự có độ dài **length** tính từ kí tự ở vị trí **position** trong xâu **str**.

Trong MySQL thì **length** là một tham số không bắt buộc, tuy nhiên ở Oracle thì **length** là bắt buộc.

SUBSTR() có thể được sử dụng trong mệnh đề SELECT, WHERE, và ORDER BY.

**Ví dụ**

Trong ví dụ này ta sử dụng bảng **Geography** dưới đây

|Region_Name|	Store_Name|
|-----|-----|
|East|	Chicago|
|East|	New York|
|West|	Los Angeles|
|West|	San Diego|

* **Ví dụ 1**
   
```
SELECT SUBSTR (Store_Name, 3)
FROM Geography
WHERE Store_Name = 'Los Angeles';
```
Kết quả:
```
SUBSTR (Store_Name, 3)
s Angeles
```

* **Ví dụ 2**
```
SELECT SUBSTR (Store_Name, 2, 4)
FROM Geography
WHERE Store_Name = 'San Diego';
```
Kết quả:
```
SUBSTR (Store_Name, 2, 4)
an D
```

### 4.TRIM
Hàm Trim trong SQL được sử dụng để loại bỏ những tiền tố, hậu tố trong string. Trong đó, pattern thường hay được loại bỏ nhất là dấu cách (white space). Với mỗi DB khác nhau hàm này cũng được gọi khác nhau:
* MySQL: TRIM( ), RTRIM( ), LTRIM( )
* Oracle: RTRIM( ), LTRIM( )
* SQL Server: RTRIM( ), LTRIM( )

**Cú pháp**
* Cú pháp của hàm TRIM
```
TRIM( [ [LOCATION] [remstr] FROM ] str)
```

* Cú pháp của hàm LTRIM
```
LTRIM (str)
```

LTRIM xoá bỏ hết các dấu cách ở đầu xâu

* Cú pháp của hàm RTRIM
```
RTRIM (str)
```

RTRIM xoá bỏ hết các dấu cách ở cuối xâu

**Ví dụ**
* **Ví dụ 1: TRIM function**
```
SELECT TRIM('   Sample   ');
```
Kết quả:
```
'Sample'
```
* **Ví dụ 2: LTRIM function**
```
SELECT LTRIM('   Sample   ');
```
Kết quả:
```
'Sample   '
```
* **Ví dụ 3: RTRIM function**
```
SELECT RTRIM('   Sample   ');
```
Kết quả:
```
'   Sample'
```

### 5. LENGTH
Hàm Length được sử dụng để trả về độ dài của string. Hàm này có tên khác nhau ở các DB khác nhau:
* MySQL: LENGTH( )
* Oracle: LENGTH( )
* SQL Server: LEN( )

**Cú pháp**
```
Length (str)
```

**Ví dụ**
Trong ví dụ này ta sử dụng bảng **Geography** dưới đây

|Region_Name|	Store_Name|
|-----|-----|
|East|	Chicago|
|East|	New York|
|West|	Los Angeles|
|West|	San Diego|

* **Ví dụ 1**
```
SELECT Length (Store_Name)
FROM Geography
WHERE Store_Name = 'Los Angeles';
```
Kết quả:
```
Length (Store_Name)
11
```

* **Ví dụ 2**
```
SELECT Region_Name, Length (Region_Name)
FROM Geography;
```
Kết quả:
```
Region_Name	 Length (Region_Name)
East	     4
East	     4
West	     4
West	     4
```

### References
https://www.1keydata.com/sql/sql-string-functions.html