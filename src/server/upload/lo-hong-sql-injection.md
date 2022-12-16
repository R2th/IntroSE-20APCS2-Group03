# Giới thiệu
Mở đầu cho Series bảo mật cơ bản, tớ sẽ chia sẻ về cách SQL Injection hoạt động và cách phòng chống nó ra sao. Yep, đầu tiên sẽ là khái niệm:
> Wiki: SQL injection là một kỹ thuật cho phép những kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thi hành các câu lệnh SQL bất hợp pháp. SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác, delete, insert, update, v.v. trên cơ sở dữ liệu của ứng dụng, thậm chí là server mà ứng dụng đó đang chạy. SQL injection thường được biết đến như là một vật trung gian tấn công trên các ứng dụng web có dữ liệu được quản lý bằng các hệ quản trị cơ sở dữ liệu như SQL Server, MySQL, Oracle, DB2, Sysbase...
# Cách thức hoạt động
Mal là 1 thanh niên thích nghịch ngợm, khi đăng nhập, Mal không thích viết email và password hợp lệ mà thay vào đó là chèn ký tự đặc biệt kiểu như email:`email@gmail.com` và password:`123'`, lúc này câu truy vấn sql sẽ trở thành
```sql
SELECT *
FROM users
WHERE email = 'email@gmail.com'
    AND pass  = '123'' LIMIT 1
```
Lỗi sẽ xảy ra đại loại như `An unexpected error occurred.` . Mal không dừng lại ở đó, anh ta sẽ thử tiếp vẫn email như cũ, và password là `123' or 1=1 --`, câu sql sẽ trở thành
```sql
SELECT *
FROM users
WHERE email = 'email@gmail.com'
    AND pass  = '123' or 1=1 --' LIMIT 1
```
and yep, như bạn thấy thì vế sau đã bị comment `--`, và 1=1 là câu truy vấn trả về luôn đúng ... Mal đăng nhập thành công mà không cần biết password với tài khoản email@gmail.com !

Đây là 1 ví dụ giúp bạn dễ hình dung, và từ ví dụ đơn giản này bạn cũng sẽ dễ tưởng tượng ra với các câu lệnh thêm, sửa, xóa, ... nguy hiểm hơn là Mal thao tác với câu lệnh drop chẳng hạn :))
# Làm sao để phòng tránh
1. Parameterized Statements
```php
$statement = $dbh->prepare("select * from users where email = ?");
$statement->execute(array(email));
```

2. Object Relational Mapping
```php
$flight = App\Flight::where('number', 'FR 900')->first(); // laravel
```
3. Escaping & Sanitizing Inputs: loại bỏ ký tự đặc biệt, validate cả phía frontend lẫn backend, sử dụng Regex, ...
4. Password Hashing
5. Third Party Authentication: Facebook, google, ...

# Tổng kết
Đây là lỗi bảo mật mà rất nhiều ông lớn đã từng gặp phải như Yahoo và Sony, nhìn chung nó dễ bị khai thác, có tác dụng ngay lập tức, có ảnh hưởng cực kỳ lớn đến hệ thống. Cảm ơn các bạn đã theo dõi !