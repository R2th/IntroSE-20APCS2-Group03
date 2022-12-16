# N+1 query là gì ?
Nói đơn giản thì, `N+1 query` là một cách truy vấn không hiệu quả do sử dụng quá nhiều truy vấn. Để hiểu rõ hơn thì chúng ta cùng xem xét một ví dụ sau:

Ở đây mình có 2 model là **User** và **Post** như sau:
```cpp
class User:
public function posts()
{
      return $this->hasMany(Post::class);
}

class Post:
public function user()
{
      return $this->belongsTo(User::class);
}    
```

Đây là một mối quan hệ khá đơn giản, một **User** có thể đăng nhiều bài **Post** (liên tưởng đến fb chẳng hạn)

Bây giờ có một bài toán yêu cầu lấy ra tất cả tên của **User** ở trong tất cả các bài **Post**
Nếu không biết đến `N+1` thì chúng ta đa số sẽ viết:
```markdown
foreach (Post::all() as $post)
{
    echo $post->user->name;
}
```
Đoạn code trên đầu tiên sẽ lấy ra tất cả các bài **post**, sau đó ở mỗi vòng lặp nó lại truy vấn tới bảng **user** để lấy ra tên các **user**. Vậy nếu trong database có **25 bài post** thì nó sẽ truy vấn tới database tổng cộng là **26 lần** (tính cả 1 lần nó lấy Post::all)

Đó chính là N+1 query. 

Với số lượng bản ghi ít thì lượng truy vấn trên không gây ảnh hưởng nhiều, nhưng khi làm một dự án lớn, sô bản ghi lên đến hàng nghìn và hơn như thế nữa thì những truy vấn kiểu này sẽ gây ảnh hưởng rất lớn đến **performance** của chương trình.

Thật may mắn rằng Laravel đã hỗ trợ cho chúng ta một cách tốt hơn nhiều để giải quyết vấn đề trên và nó chính là `Eager Loading` . Và vì bài viết hôm nay mình muốn giới thiệu công cụ hỗ trợ check `N+1 query` nên mình sẽ k đề cập tới Eager Loading nữa. Bạn nào nếu chưa biết về nó thì có thể xem thêm tại [đây](https://viblo.asia/p/laravel-eager-loading-lap-trinh-vien-laravel-can-phai-biet-Az45bY3qlxY)

Bây giờ thì chúng ta cùng tìm hiểu thêm về `laravel-query-detector` nhé ! :smiley:

# Laravel N+1 Query Detector
### 1. Laravel Query Detector dùng để làm gì ?
> The Laravel N+1 query detector helps you to increase your application's performance by reducing the number of queries it executes. This package monitors your queries in real-time, while you develop your application and notify you when you should add eager loading (N+1 queries)

Hiểu đơn giản là giúp giám sát các truy vấn của chúng ta trong khi phát triển ứng dụng, thông báo khi nào nên thêm Eager Loading (khi có N+1 query)

### 2. Cài đặt
Bạn có thể cài đặt thông qua composer:
```markdown
composer require beyondcode/laravel-query-detector --dev
```

### 3. Sử dụng 
Ngay cả khi bạn debug ứng dụng, trình theo dõi truy vấn của **Laravel Query Detector** vẫn hoạt động. Vậy nên bạn không phải lo về việc sẽ phải chỉnh sửa config nữa nhé.

Theo mặc định, package này sẽ thông báo bằng **alert()** khi có N+1 query. Nhưng nếu bạn không muốn hiển thị như vậy thì có thể để nó ghi vào tệp laravel.log của mình. 

Bạn có thể publish config và thay đổi hành vi đầu ra bằng command sau:
```objectivec
php artisan vendor:publish --provider="BeyondCode\QueryDetector\QueryDetectorServiceProvider"
```

Command này sẽ thêm **querydetector.php** file vào thư mục config của bạn.

Mình sẽ chỉnh sửa lại một chút như sau:
* Tại file `/config/querydetector.php` comment dòng alert.
![](https://images.viblo.asia/c5e45633-5f79-4a92-a2b5-53ee9f6fbcef.png)

* Tại file `/app/Providers/AppServiceProvider.php` thêm đoạn code dưới đây vào func boot()
```css
DB::listen(function ($query) {
    Log::info('----------------Start query change----------------------');
    Log::info(json_encode([
        $query->sql,
        $query->bindings,
        $query->time,
    ]));
    Log::info('------------------End query log---------------------------');
});
```

Vậy là xong. Bây giờ mỗi khi bạn run api thì hệ thống sẽ log query vào laravel.log, trường hợp xuất hiện N+1 query thì sẽ hiển thị thêm đoạn INFO như thế này:
![](https://images.viblo.asia/2ae42500-ae34-4751-9b98-30ad30376cb8.png)

Nhìn vào đó chúng ta có thể biết được query của chúng ta đang chưa tối ưu N+1 và thêm **Eager Loading** cho đúng.
Hy vọng bài viết này có thể giúp ích cho các bạn tối ưu được **performance** của ứng dụng, để chúng ta có thể tạo nên nhiều sản phẩm Awesome hơn nữa nhé :smiley:

Hẹn gặp lại các bạn vào những bài viết tiếp theo :wave:

Nguồn tham khảo : 
* [https://github.com/beyondcode/laravel-query-detector](https://github.com/beyondcode/laravel-query-detector)
* [https://beyondco.de/docs/laravel-query-detector/installation](https://beyondco.de/docs/laravel-query-detector/installation)