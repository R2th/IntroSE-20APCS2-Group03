SQL Injection (SQLI) là một trong những lỗ hổng bảo mật lâu đời nhất. Ngày nay, với sự hỗ trợ của những ngôn ngữ và framework hiện đại, chúng ta có thể vô tình quên đi sự tồn tại của lỗ hổng này. 

Tuy nhiên, theo báo cáo WAAR của Imperva công bố vào tháng 7 năm 2020, 29% of ứng dụng web hiện nay vẫn dễ bị tấn công bởi SQLI, bằng chứng là gần đây,  website của một công ty bảo mật đã bị tấn công dễ dàng bởi hình thức này :grinning:. 

Trong phạm vi bài viết này, mình sẽ giới thiệu một số lưu ý để tránh gặp phải SQL Injection khi sử dụng Framework Laravel.
![](https://images.viblo.asia/6361a781-6fdb-40a1-9b28-97802fde4efc.png)

## SQL Injection là gì
Ứng dụng của chúng ta thường lưu trữ và sử dụng dữ liệu bên trong cơ sở dữ liệu, ta sử dụng  Structured Query Language (SQL) để truy vấn các dữ liệu này. SQL Injection có thể xuất hiện ở bất cứ đâu truy vấn dữ liệu dựa trên input người dùng nhập vào. Lấy một ví dụ đơn giản nhất là đăng nhập. 

Giả sử trong database có một record: 

| id | username | password |
| -------- | -------- | -------- |
| 26     | sownbanana     | superstrong123     |

-----
Câu truy vấn để kiểm tra thông tin đăng nhập sẽ có dạng:
```SQL
SELECT * FROM users
WHERE users.username = 'sownbanana' 
AND users.password = 'superstrong123'
LIMIT 1
```
Controller trong Laravel có thể được viết một cách đơn giản nhất như sau
```php
public function login(Request $request)
{
    $user = DB::select(
        "select * from users 
        where username = '$request->username' 
        and password = '$request->password' 
        limit 1"
    );
    if ($user) {
        return $user;
    } 
       return "BUSTED!!!";
}
```

Khi nhập đúng mật khẩu, backend sẽ trả về thông tin của người dùng
![Peek 2021-08-22 18-53.gif](https://images.viblo.asia/8d4bb588-4c9e-4411-a0dc-9c2e3ef5679c.gif)

Tuy nhiên, nếu bạn để ý hai dòng này trong controller
```php
"where username = '$request->username' 
and password = '$request->password'"
```
Chúng ta dùng trực tiếp dữ liệu trường username và password người dùng đã nhập để cho vào chuỗi câu lệnh truy vấn. Nếu kẻ tấn công nhập vào trường password như sau:
![](https://images.viblo.asia/bdd7d2ef-999a-4e26-8c15-e6c634fd7e55.gif)
Câu truy vấn đã được thực hiện là
```SQL
SELECT * FROM users
WHERE users.username = 'anyone' 
AND users.password = 'fakepass' 
or 1=1 -- ''
LIMIT 1

SELECT * FROM users
WHERE users.username = 'anyone' 
AND users.password = 'fakepass' 
or 1=1 -- -''LIMIT 1 //comment limit => toàn bộ user được lấy ra
```


Như các bạn thấy, dù không nhập đúng mật khẩu hay thậm chí username nhưng kẻ tấn công vẫn có thể lấy được thông tin của một hay thậm chí tất cả người dùng trong hệ thống của bạn!

Vậy Laravel  bảo vệ hệ thống của bạn như thế nào?
## Query Builder
[Laravel database query builder](https://laravel.com/docs/5.6/queries#introduction) cung cấp một giải pháp dễ dàng, hiệu quả để xây dựng và thực thi các truy vấn cơ sở dữ liệu. Laravel query builder sử dụng PDO parameter binding để bảo vệ ứng dụng trước SQL injection. 

Chúng ta có thể viết lại controller như sau:
```php
public function login(Request $request)
{
    $user = User::where('username', $request->email)
             ->where('password', $request->password)
             ->first();
    if ($user) {
        return $user;
    } 
   return "BUSTED!!!";
}
```
![](https://images.viblo.asia/2cd10129-d42d-4e58-ba73-6f7235f53fa8.gif)

Kẻ tấn công không thể lấy được dữ liệu của chúng ta nữa rồi, nhưng vì sao vậy? Giống như function `real_escape_string()`  của class `mysqli`, các ký tự đặc biệt, trong trường hợp này là `'`(dấu nháy đơn ), sẽ được ***escape*** trong câu truy vấn. Câu truy vấn trở thành:
```SQL
SELECT * FROM users
WHERE users.username = 'anyone' 
AND users.password = 'fakepass\' or 1=1 -- \''
LIMIT 1

SELECT * FROM users
WHERE users.username = 'anyone' 
AND users.password = 'fakepass\' or 1=1 -- -\''
LIMIT 1
```
Câu lệnh so sánh password sẽ so sánh `password` với toàn bộ chuỗi  `fakepass' or 1=1 -- -'`, kẻ tấn công không thể sử dụng ký tự `'` để **escape** khỏi câu lệnh so sánh nữa :D

Tuy nhiên, lại một tuy nhiên nữa :laughing:, có nhiều trường hợp câu truy vấn quá phức tạp, không thể sử dụng các hàm Query builder thông thường mà buộc chúng ta phải sử dụng `Raw SQL`.
## Raw Expressions
Vì không có thời gian tìm ví dụ hợp lý nên mình tiếp tục sử dụng vi dụ login controller này :sweat_smile:

Khi truy vấn raw SQL, mình tin rằng nhiều bạn sẽ viết như thế này:
```php
public function login(Request $request)
{
    $user = User::whereRaw(
        "username = '$request->email' 
        and password = '$request->password'"
    )->first();
    
    if ($user) {
        return $user;
    } 
   return "BUSTED!!!";
}
```
Hãy lưu ý rằng bạn không được bảo vệ tự động giống như các function khác của query builder khi bạn sử dụng raw SQL. Hệ thống của bạn vẫn bị SQL Injection.
![Peek 2021-08-22 18-52.gif](https://images.viblo.asia/2e41cf3e-c9e4-41e0-8287-0daa4bb4f9b8.gif)

Giống với tinh thần của Query Builder, để khắc phục điều này, chúng ta cần tự **escape** các ký tự đặc biệt. Đối với Laravel, chúng ta có thể escape các ký tự đặc biệt bằng cách binding input của người dùng vào chuỗi truy vấn như sau:
```php
public function login(Request $request)
{
     $user = User::whereRaw("username = :email and password = :password")
            ->setBindings([
                'email' => $request->email, 
                'password' => $request->password
            ])->first();

     // Hoặc ngắn gọn hơn
     $user = User::whereRaw("username = ? and password = ?")
            ->setBindings([$request->email, $request->password])
            ->first();

     // Hoặc ngắn gọn hơn nữa
      $user = User::whereRaw(
                  "username = ? and password = ?", 
                  [$request->email, $request->password]
              )->first();

    if ($user) {
        return $user;
    } 
    return "BUSTED!!!";
}
```
Như vậy, hệ thống của chúng ta lại được bảo vệ trước lỗ hổng SQL Injection.
## Kết luận
Vậy là chúng ta đã cùng đi qua một số vấn đề cơ bản nhất để không gặp phải lỗ hổng bảo mật SQL Injection khi làm việc với Laravel. Hy vọng bài viết của mình có ích cho các bạn và mong nhận được thêm những góp ý của các bạn!