Như các bạn đã biết thì hiện tại Laravel đang là framework rất hot và được rất nhiều người tin dùng và sử dụng.  Không phải ngẫu nhiên mà nó có được cộng đồng sử dụng lớn đến vậy, và hôm nay trong hướng dẫn này tôi sẽ hướng dẫn các bạn cách tối ưu khi sử dụng Laravel.

**Config Caching**

Laravel cung cấp lệnh command rất tốt cho việc tăng hiệu suất. Cách sử dụng cơ bản như sau
```
php artisan config:cache
```

Khi bạn chạy lệnh này, những thay đổi bạn thực hiện sẽ không có hiệu lực. Nếu bạn muốn làm mới bộ đệm, hãy chạy lệnh này một lần nữa. Để xóa bộ đệm cấu hình, sử dụng lệnh sau:
```
php artisan config:clear
```
**Routing Cache**

Routes caching là tính năng tối ưu rất quan trọng khi bạn có nhiều routes. Routes cache là một mảng đơn giản và giúp tăng tốc hiệu suất của Laravel. Bạn chạy lệnh command sau:
```
php artisan route:cache
```
Nên nhớ chạy lệnh mỗi khi bạn thực hiện thay đổi trong routes file và thêm bất kỳ route mới nào. Để xóa cache, sử dụng lệnh command sau:
```
php artisan route:clear
```
**Remove Unused Service**

Có thể trong quá trình sử dụng, nhiều dịch vụ bạn không sử dụng đến vậy nên bạn có thể xóa nó ra khỏi files config.

**Composer Optimize Autoload**

Đó là một ý tưởng tốt để sử dụng composer scan và tạo liên kết one-to-one của classes và files trong ứng dụng. Sử dụng lệnh command sau:
```
composer dumpautoload -o
```

**Limit Included Libraries**

Điều quan trọng là luôn luôn review tất cả thử viện được gọi tới trong ứng dụng. Nếu bạn nghĩ rằng bạn không sử dụng đến thì bạn có thể xóa nó trong config/app.php để tăng tốc ứng dụng.

**Cache Queries Results**

Lưu trữ kết quả những truy vấn mà bạn sử dụng thường xuyên là một cách tuyệt vời để tối ưu ứng dụng của bạn. Bạn có thể tham khảo như sau:

```
$posts = Cache::remember('index.posts', 30, function()
{return Post::with('comments', 'tags', 'author', 'seo')->whereHidden(0)->get();});
```

Tham khảo:

https://laravel.com/

https://meramustaqbil.com/2019/05/19/tips-for-laravel-performance-optimization/