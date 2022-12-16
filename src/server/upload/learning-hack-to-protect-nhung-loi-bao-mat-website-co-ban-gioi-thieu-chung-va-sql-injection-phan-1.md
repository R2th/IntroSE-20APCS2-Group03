## Giới thiệu
Xin chào mọi người, chả là dạo gần đây mình cũng tìm hiểu được một chút kiến thức kiến thức về Hacking ở trên trang [https://www.hacksplaining.com](https://www.hacksplaining.com) nên mình muốn chia sẻ cho mọi người một chút kiến thức ít ỏi về hacking mà mình tìm hiểu được.
Hackingsplan là trang web tốt nhất về cách dạy chúng ta các lỗ hổng bảo mật của web và cách phòng chống chúng. Trang web dạy theo format step by step, và cách dạy cuả họ thực sự là mình cảm thấy dễ tiếp thu cũng như là dễ hiểu qua ví dụ, hay là ghi nhớ, kiểm tra qua bài tập. Và quan trọng là nó free
![](https://images.viblo.asia/c00f7e66-7422-423b-ab4f-64f6ae990e8a.png)

Đây cũng là những loại có thể nói là phổ biến nhất mà website hay gặp phải mà chúng ta nên phòng tránh nó:
1. SQL Injection
2. Clickjacking
3. Session Fixation
4. Cross-Site Scripting
5. Weak Session IDs
6. Reflected XSS
7. Dom-Based XSS
8. Cross-Site Request Forgery
9. File Upload Vulnerability
10. XML Bombs
11. Open Directs
12. User Enumeration
13. Broken Access Control
14. Unencrypted Communication
15. XML External Entities
16. Information Leakage
17. Password Mismanagement
18. Privilege Escalation
19. Command Execution
20. Directory Traversal

Theo mô hình của Hacksplan thì chúng ta sẽ đi theo 3 bước: 

- Bước 1: Ở bước này, chúng ta sẽ được học về lý thuyết về nó sẽ xảy ra như thế nào, xảy ra ra sao,  và tác hại của lỗ hồng này là như thế nào?

- Bước 2: Bước này chúng ta sẽ được học về cách phòng chống lỗ hổng đó ra làm sao

- Bước 3: Bước này chúng ta sẽ đc test một số câu hỏi trắc nghiệm liên quan đến phần mình đã học.

Và hôm nay, mình sẽ giới thiệu với các bạn về SQL injection- 1 lỗi mà hầu hết các dự án đều gặp phải. Đây cũng là bài viết mình vừa dịch vừa hiểu theo ý của mình, mong rằng nếu có sai hay chưa đúng thì các bạn comment để mình sửa nhé ạ!.

## Processing
Vậy SQL injectiion là gì? SQL injection là một loại lỗ hổng cũng khá là nghiêm trọng trong lập trinh web. Từ injection ở đây cũng có ý nghĩa của loại lỗ hổng này. Hacker sẽ tìm cách xâm nhập vào bằng cách chèn một số câu query vào đường dẫn, hay là bằng cách nào đó hacker sẽ chèn vào câu lệnh truy vấn Sql của chúng ta ví dụ như đăng nhập không cần mật khẩu, lấy data khách hàng, dump database, thậm chí là xóa luôn database, và cũng nghiêm trọng không kém là lấy luôn thông tin credit và "tiêu hộ" khách của mình. Vậy nên nó là một loại cũng nguy hiểm, nhưng k cẩn thận là rất dễ bị tấn công.
![](https://images.viblo.asia/cb8fa249-c97d-4871-afc6-a18c89af1290.png)

### Tìm web có lỗ hổng này
Mà tốt nhất là chúng ta tự tạo một website demo để thử
Còn ở trong hacksplan thì khi bắt đầu vào học, chúng ta sẽ nhìn thấy 1 website có thể hack được lỗi sql injection, và phần dứới là phần Log của server. 
![](https://images.viblo.asia/3e087500-b874-4f15-8335-9187a22250fb.png)

Còn về trang web thì chúng ta thử nhập vào input mật khẩu text: `' or 1=1--`. Nếu như đăng nhập thành công thì đây chính là SQL injection, còn k thì dĩ nhiên là không rồi ạ.
### Vậy tại sao nhập ' or 1=1-- lại pass đăng nhập
Mình sẽ tạo một database và tạo một table có tên là `GirlFriends` với cấu trúc như sau:
```sql
mysql> desc GirlFriends;
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| id    | int(11)      | YES  |     | NULL    |       |
| name  | varchar(255) | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+
2 rows in set (0,00 sec)
```

và insert giá trị như sau vào table:
```sql
mysql> select * from GirlFriends;
+------+------+
| id   | name |
+------+------+
|    1 | Hoa  |
|    1 | Lan  |
|    1 | Hue  |
+------+------+
3 rows in set (0,00 sec)
```
Sau đó chúng ta thực hiện câu query:
```sql
mysql> select * from GirlFriends where name = 'ffff' or 1=1;
+------+------+
| id   | name |
+------+------+
|    1 | Hoa  |
|    1 | Lan  |
|    1 | Hue  |
+------+------+
3 rows in set (0,00 sec)
```
=>>> Kết quả là select ra được all giá trị với name = ffff không nằm trong database. 

Nhưng đối với website thì ta nhập dạng `ffff' or 1=1--` (đối với MS SQL) và thay `--` bằng `#` với MySQL. Ký tự này là ký tự để cho sql biết rằng hết dòng query ở đây và thứ đằng sau coi như bị bỏ qua.

Dòng query trên sẽ query bảng Người yêu với tên có bằng ffff hay không. Còn khi or `1=1` thì đã luôn đúng rồi vậy nên nó sẽ có giá trị.

Ở ví dụ của hacksplans thì nó có đưa ra câu query như sau:
![](https://images.viblo.asia/1fcbc9a6-e7a3-4ead-8b07-ddd15f6a85bc.png)

Thì chúng ta có thể thấy rằng việc query để đăng nhập như thế này thì chúng ta có thể dễ dàng đăng nhập được mà k cần dùng đến password đúng mà chỉ cần nhập `abc' or 1=1--` thì đã có giá trị của câu select đó và dĩ nhiên đã đăng nhập được rồi.
Sẽ có người thắc mắc rằng, nếu kết quả ra all thì nó biết đăng nhập cái gì.? Ở đây, sau khi đăng nhập xong, chúng ta sẽ find user để load lên màn hình bằng cách

```sql
select * from Users where email = "user@email.com"
```
Ngoài giá trị 1=1 ra thì chúng ta có ta có thể thử bằng cách 
```sql
' or 1=1-- 

" or 1=1-- 

or 1=1-- 

' or 'a'='a 

" or "a"="a 

') or ('a'='a
```
Trên đây chỉ là một trong nhưng cách để triển khai sql injection thôi, còn rất nhiều cách khác nữa.
### How to protect

#### Parameterized Statements
Như chúng ta đã biết là SQL giao tiếp với ngôn ngữ lập trình bằng database driver. Cái driver này cho phép ứng dụng tổ chức, xây dựng và chay các câu lệnh SQL trên DB, export và thao tác dữ liệu khi cần thiết. Các lệnh parameterized đảm bảo rằng dữ liệu được truyền từ ngoài vào là dữ liệu an toàn để sql xử lý một cách an toàn.
Ví dụ sau đây là một cách an toàn để chạy truy vấn SQL trong JDBC bằng cách sử dụng câu lệnh parameterized:

```php
// -------------<<< SAFE >>>-------------
// Define which user we want to find.
String email = "user@email.com";

// Connect to the database.
Connection conn = DriverManager.getConnection(URL, USER, PASS);
Statement stmt = conn.createStatement();

// Construct the SQL statement we want to run, specifying the parameter.
String sql = "SELECT * FROM users WHERE email = ?";

// Run the query, passing the 'email' parameter value...
ResultSet results = stmt.executeQuery(sql, email);

while (results.next()) {
  // ...do something with the data returned.
}
```

Ngược lại với sự an toàn của việc parameterized thì duới đây lại là việc cộng chuỗi SQL rất nguy hiểm:
```php
// -------------<<< DANGER >>>-------------
// The user we want to find.
String email = "user@email.com";

// Connect to the database.
Connection conn = DriverManager.getConnection(URL, USER, PASS);
Statement stmt = conn.createStatement();

// Bad, bad news! Don't construct the query with string concatenation.
String sql = "SELECT * FROM users WHERE email = '" + email + "'";

// I have a bad feeling about this...
ResultSet results = stmt.executeQuery(sql);

while (results.next()) {
  // ...oh look, we got hacked.
}
```
Cái mấu chốt vấn đề ở đây chính là method `executeQuery`. 
Trong case đầu tiên, chuỗi string đã parameterized và những param này được truyền riêng cho tùng field.
Còn trong case2 thì chúng ta có thể được việc cộng chuỗi ở đây, và việc cộng chuỗi và hơn nữa là dữ liệu được xác định trước khi driver chạy làm cho việc ngươi dùng có thể truyền vào cái gì cũng đc => `DANGER`

Vậy nên trong các scope trong ruby thì chúng ta thường thấy rằng việc order là dễ dính lỗi này nhất. Bởi vì nhiều khi mình cần truyền key và type order vào nên mình sẽ dùng việc cộng chuỗi vào. vi dụ:

```ruby
scope :search, ->(order_key, order_type) do
    order("#{order_key} #{order_type}")
end
```
Việc cộng chuỗi này cũng rất là nguy hiểm, nhưng chắc chắn là k pass qua được `brakeman` thì chúng ta có cách viết như sau:
```ruby
scope :search, ->(order_key, order_type) do
    order_key, order_type = [sanitize_sql(order_key), sanitize_sql(order_type)]
    order("#{order_key} #{order_type}")
end
```
Thì nó sẽ pass `brakeman`

Tuy nhiên vẫn có thể truyền vào từ đường dẫn được.
```ruby
[2] pry(main)> Admin.sanitize_sql("id")
=> "id"
[3] pry(main)> Admin.sanitize_sql("ddd")
=> "ddd"
[4] pry(main)> Admin.sanitize_sql("sleep(3)")
=> "sleep(3)"
```
vậy nên trước khi order thì chúng ta phải check bằng tay xem nó có nằm trong những giá trị chúng ta cho phép order không, nếu không thì k order, để tránh hâu quả nghiêm trọng
```ruby
scope :search, ->(name, order_key, order_type) do
    result = where(name: name)
    order_type = order_type == "desc" ? "desc" : "asc"
    result.order("#{order_key} #{order_type}") if order_key.in? %(name)
    result
end
```

#### Object Relational Mapping(ORM)
ORM thì nhiều người làm ruby chắc cũng biết về nó tiện và safe rồi, nếu dùng đúng cách. HIểu nôm na là nó giúp coder hạn chế viết lệnh SQL thuần để chạy nữa mà mình sử dụng câu lệnh của ORM để chạy SQL tương ứng, và may thay là nó đã tích hợp việc parameterized rồi. (honho). Hàng xịn sò nhất thì chắc là `Active Record` của ruby on rails:
Giả sử như chúng ta lấy current_user, nó sẽ khác nhau như thế nào trong việc cách sử dụng nhé:
```ruby
# Active Record
# safe
def current_user(email)
   User.find_by_email(email)
end

# danger
def current_user(email)
  User.where("email = '" + email + "'")
end


# Sequel
# safe
def current_user(email)
  User.where(:email=>email)
end

# danger
def current_user(email)
  User.where("email = #{params[:email]}")
end
```
Sử dụng ORM cũng k có nghĩa là chúng ta được an toàn đối với SQL injection, mà phụ thuộc vào chúng ta, ở cái `find_by_email` thì chúng ta có thể thấy rằng khi truyền dữ liệu vào thì query nó sẽ thành dạng `where(:email=>email)` và nó đã parameterized rồi, nên là chúng ta có thể yên tâm. Còn về việc cộng chuỗi thì nhìn vào phần Sequel sẽ thấy được sự danger mà mình đã nói ở đoạn trên. 
#### Escaping Inputs
Nếu như chúng ta dùng 2 cái trên thì chúng ta sử dụng nốt cách là bỏ qua các ký tự đặc biệt trong tham số đầu vào.

Các cuộc tấn công SQL injection thì hacker thường tạo ra các ký tự đặc biệt để đóng sớm truy vấn phù hợp với mục đích của hacker. Đó cũng lý do chúng ta hay thấy có ký tự `'` or `"` trong những cái test sql injection.

Mỗi ngôn ngữ lập trình sẽ có tiêu chuẩn về việc dấu qoutes mô tả chuỗi string khác nhau, nhưng đều hướng đến mục đích là tránh việc bị cắt chuỗi giữa chừng làm cho câu truy vấn chết giữa chừng, gây ra hậu quả nghiêm trọng.

Tuy nhiên phương pháp này thì cần lưu ý một số điều:

- Cần phải cẩn thận mọi nơi mà có câu lệnh SQL
- Không phải các cuộc tấn công đều dựa vào việc lợi dụng ký tự đặc biệt.

#### Sanitizing Inputs

Việc chúng ta santitize cũng là cách để loại bỏ những đầu vào có vẻ như nguy hiểm đối với ứng dụng trong tầm tay, nhưng cũng phải chú ý nó là sẽ có lúc vô tình loại bỏ luôn cả cái đúng.

## SUMMARY
Qua bài viết trên chúng ta có thể thấy được cách tấn công sql injection là rất nhiều cách, và cũng có cách phòng chống riêng, hi vọng là bài viết này có thể giúp chút ít cho các bạn về bảo mật cơ bản. Bài viết còn thiếu sót mong mọi người comment và cho ý kiến ạ.

## Tài liệu tham khảo
https://www.hacksplaining.com

https://www.hacksplaining.com/prevention/sql-injection