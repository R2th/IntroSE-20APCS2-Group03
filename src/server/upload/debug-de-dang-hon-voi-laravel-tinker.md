# Giới thiệu
Laravel là một PHP framework vô cùng mạnh mẽ, trang bị một loạt tính năng như Authenticate, Migration, Authorization,... Laravel Tinker là một trong những tính năng được đi kèm với Laravel truy cập qua command ```php artisan tinker```, Tinker là một ứng dụng có dạng  REPL (read-eval-print loop). Một ứng dụng có dạng REPL có khả năng cho phép bạn tương tác với ứng dụng bằng ngôn ngữ native (với Tinker sẽ là ngôn ngữ PHP, tự như phần console mà các trình duyệt hỗ trợ để chạy javascript). Với Tinker chúng ta có thể test thử một số thay đổi nhỏ với DB, thử ý tưởng code mới thay cho việc dùng các tool code PHP online,...
# Sử dụng
Để sử dụng Tinker, các bạn bắt đầu bằng command ```php artisan tinker``` tại Terminal.
```
Psy Shell v0.9.9 (PHP 7.2.19-1+ubuntu16.04.1+deb.sury.org+1 — cli) by Justin Hileman
>>> 
```
## dd()
Trong quá trình code cũng như debug chúng ta thường thêm helper dd() vào trong code, sau đó refresh lại trang, và rồi quan sát kết quả, lặp lại quá trình này rất nhiều lần, từ đó làm phức tạp thêm tình hình và có thể tốn thời gian hơn cho việc debug. Lúc này, hãy sử dụng Tinker =))
## Bắt đầu với Tinker khi thao tác với DB
Giả sử bạn muốn tìm một user có id = 1 trong bảng user để phục vụ debug, tương tự như chúng ta thường debug, chỉ cần ```$user = User::find(1)``` tại terminal. Tinker sẽ tự hiểu User sẽ được set alias đến model User có namespace là ```'App\Models\User```
```
=> App\Models\User {#3250
     id: 1,
     name: "Kellie Schuppe II",
     email: "lennie.stracke@example.com",
     email_verified_at: "2019-04-02 12:52:16",
     created_at: "2019-04-02 12:52:21",
     updated_at: "2019-04-02 12:52:21",
     deleted_at: null,
   }
>>> 
```
Không khác gì chúng ta thêm dòng dd(User::find(1)) trong code phải không ạ, nhưng Tinker đâu chỉ có mỗi thế này :rofl:
Lúc này biến $user đã được lưu tại session của Tinker, chúng ta có thể toàn quyền sử dụng biển $user như trong code
Ví dụ muốn lấy attribute là email và name của $user 
```
>>> $user->email
=> "lennie.stracke@example.com"
>>> $user->name
=> "Kellie Schuppe II"
>>> 
```
Bạn thấy tên này không được hay cho lắm, cũng tương tự như khi code
```
>>> $user->name ="Ten nay hay hon nay"
=> "Ten nay hay hon nay"
>>> $user
=> App\Models\User {#3250
     id: 1,
     name: "Ten nay hay hon nay",
     name: "Kellie Schuppe II",
     email: "lennie.stracke@example.com",
     email_verified_at: "2019-04-02 12:52:16",
     created_at: "2019-04-02 12:52:21",
     updated_at: "2019-04-02 12:52:21",
     deleted_at: null,
   }
```
Nhìn có vẻ đúng nhưng mà chưa đúng lắm =)), trong quá trình này biển $user mới chỉ bị tác động trong session của Tinker mà thôi, bạn muốn có tác dụng trong DB luôn? Thêm ```$user->save()``` là được ngay mà :grinning:

Trong quá trình debug sẽ có lúc bạn nghi ngờ QueryBuilder hoặc Eloquent sinh ra câu SQL sai với ý của mình, và bạn muốn xem câu SQL lúc này ra sao? Đơn giản chỉ cần ```User::find(1)->toSql()```  lúc này tinker sẽ trả về câu SQL thuần cho bạn, thay vì phải vất vả click trên trình duyệt n bước, chúng ta chỉ cần test/debug trước trong tinker là được :grinning:
## Test thử function
Trong quá trình làm, bạn nghĩ ra một ý tưởng nào đó, lúc này tinker cũng có thể hỗ trợ bạn một cách đắc lực
```
>>> function sayHello($name) {
... return "Hello {$name}"; }
=> null
>>> sayHello("World")
=> "Hello World"
```
Hoặc bạn có một array/collection dữ liệu muốn xử lý về kiểu dữ liệu mong muốn? Tinker vẫn có thể hỗ trợ tận răng =))
```
>>> $collection = collect([0, 1, 2, 3, 4, 5])
=> Illuminate\Support\Collection {#3247
     all: [
       0,
       1,
       2,
       3,
       4,
       5,
     ],
   }
>>> $collection->sum()
=> 15
>>> 
```
Tóm lại, tuy Tinker không thể làm được tất cả mọi thứ nhưng cũng làm được gần như tất cả những thứ mà bạn muốn =))
## Laravel Tinker Server 
Laravel Tinker Server là một package cho phép bạn truy cập đến một biến trong thời gian thực trong khi ứng dụng đang chạy, package này thu thập data vào tinker thông qua helper tinker(), cho phép bạn toàn quyền tương tác với biến trong tinker. Cách này lợi ích gì hơn so với dd()?
Khi dùng tinker() sẽ cho phép bạn giữ đúng luồng chạy của code thay vì dừng lại ngay khi gặp dd(), với những biến bạn nghi ngờ do bug, lúc này thay vì dd() từng bước để điều tra, ta có thể sử dụng tinker để debug
### Cài đặt
Cài đặt thông qua composer 
```composer require beyondcode/laravel-tinker-server```
Package này sẽ tự động đăng ký vào ```Provider``` các bạn nhé
### Sử dụng
Đầu tiên, chúng ta cần 
```php artisan tinker-server```

Cách sử dụng rất đơn giản, các bạn chỉ cần thêm helper tinker() vào bên trong code tương tự như cách debug bằng dd(), dữ liệu được truyền vào tinker() sẽ được đẩy vào Tinker với thời gian thực. Lúc này chúng ta có thể tiếp tục debug tại Tinker hoặc có thể so sánh dữ liệu trong suốt luồng chạy của code.
```php
$user = App\User::find(1);

tinker($user);
```

![](https://images.viblo.asia/724d76f5-e6d9-41d3-a992-23368c5095dc.gif)
# Kết
Quá trình code đã rất khó khăn rồi nhưng debug còn khó khăn hơn =))
Hy vọng qua bài viết này của mình mọi người sẽ có thêm một cách debug khiến cho quá trình fix bug dễ thở hơn.
Chúc mọi người code ít bug :stuck_out_tongue_winking_eye: