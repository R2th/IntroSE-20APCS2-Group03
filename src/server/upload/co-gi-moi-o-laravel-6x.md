Xin chào mọi người, đối với những ai đang là dev nói chung và là một PHP dev nói riêng thì framework Laravel là một trong những framework rất nổi tiếng và được rất nhiều dev PHP ưa dùng. Và đợt tháng 9 vừa qua, Laravel 6.0 đã được cho release cùng với những bản cập nhật Laravel 6.1 và 6.2 được phát hành gần đây, thì trong bài viết này, mình sẽ tổng hợp lại và gọi chung là những thứ "hay ho" sẽ xuất hiện trong đợt release bảng Laravel 6.x này nhé. Hy vọng nếu nó không "hay ho" lắm thì mọi người cũng đừng downvote cả tội nghiệp mình ạ :joy:

Nói sơ qua về phiên bản lần này thì đây sẽ là version LTS ( Long Term Support ), tức là đây là một phiên bản hỗ trợ dài hạn với việc hỗ trợ fix bug tới tận 03/09/2021 và security đến 03/09/2022. Chúng ta cùng xem qua lại các lần release từ trước đến nay của Laravel ở hình dưới đây nhé:
![](https://images.viblo.asia/0971e3d2-8ca6-4d5a-8ece-33dea6326b71.PNG)

Luyên thuyên vậy cũng đủ rồi, chúng ta sẽ vào phần chính để xem là có gì mới và hay ho trong đợt release 6.x này của Laravel nhé.

### 1. Ignition Error Page

Ignition là một open source mới, hỗ trợ xử lý Exception dành cho Laravel, được viết bởi Freek Van der Herten và Marcel Pociot. Nó có rất nhiều công dụng hơn phiên bản trước đó là cải thiện việc xử lý lỗi trên blade engine, cải thiện các vấn đề về UX.

![](https://images.viblo.asia/2437f0e4-99ca-4383-baaa-912195f6f933.png)

Các bạn có thể tìm hiểu sau hơn ở đây: [Laracasts’ What’s New in Laravel 6: Ignition is Laravel’s Amazing New Error Page video.](https://laracasts.com/series/whats-new-in-laravel-6/episodes/2)

### 2. Improved Authorization Responses

Ở phiên bản Laravel 6.x này, việc trả về cho người dùng một thông báo lỗi tùy chỉnh cũng dễ dàng hơn so với phiên bản trước, với respone message và Gate::inspect, một phương thức cung cấp các authorize policy's respone, vì vậy việc giải thích cho người dùng vì sao việc request của họ bị từ chối cũng trở nên đơn giản hơn

```
$response = Gate::inspect('view', $flight);

if ($response->allowed()) {
    // User is authorized to view the flight...
}

if ($response->denied()) {
    echo $response->message();
}
```

### 3. Job Middleware
Job Middleware là một tính năng mới trong phiên bản này được phát triển bởi Taylor Otwell, nó cho phép các jobs có thể chạy thông qua middleware:

```
// Add a middleware method to a job class
public function middleware()
{
     return [new SomeMiddleware];
}

// Specify middleware when dispatching a job
SomeJob::dispatch()->through([new SomeMiddleware]);
```

Việc này sẽ giúp bạn tránh được các xử lý logic tùy chỉnh ở trong method handle() khi bạn làm việc với jobs. Các bạn có thể xem cụ thể hơn ở đây: [Job Middleware is Coming to Laravel 6.](https://laravel-news.com/laravel-6)

### 4. Lazy Collections
Collection là một khái niệm đã không còn với các developer đang làm việc với Framework đúng không nào? Và trong phiên bản release này, Lazy Collections được ra mắt với nhiệm vụ hỗ trợ các developer có thể xử lý những khối dữ liệu lớn nhưng ngược lại tiêu tốn ít tài nguyên hơn.

Ví dụ, với Lazy Collections thì thay vì phải load lại toàn bộ những dữ liệu cũ thì nó sẽ chia nhỏ ra các thành phần và lưu trong bộ nhớ một thời điểm nào đó nhất định, vì vậy ta có thể giảm thiểu được rất nhiều bộ nhớ sử dụng. Ví dụ khi bạn làm việc với 10000 bản ghi, nếu sử dụng bình thường không dùng Lazy collections thì cả 10000 bản ghi sẽ được load một lúc, nhưng với Lazy collections, mọi chuyện sẽ khác:
```
// Do not use Lazy collections
$users = App\User::all()->filter(function ($user) {
    return $user->id > 500;
});
```

Với việc sử dụng method `cursor` nó trả về 1 LazyCollection instance. Việc này cho phép bạn chỉ chạy 1 truy vấn duy nhất nhưng vẫn có thể giữ lại một Eloquent model được tải trong bộ nhớ ở một thời điểm nhất điểm. Việc này cho phép giảm tải đáng kể trong việc sử dụng bộ nhớ:

```
$users = App\User::cursor()->filter(function ($user) {
    return $user->id > 500;
});

foreach ($users as $user) {
    echo $user->id;
}
```

### 5. Eloquent Subquery Enhancements

Giả sử mình có 2 bảng trong CSDL là chuyến bay (flights) và đích đến (destinations), trong bảng flights sẽ có trường arrived_at thể hiện cho việc thời điểm hạ cánh của máy bay.

Bạn muốn lấy ra danh sách các đích đến (destinations) và tên chuyến bay (flights) cuối cùng hạ cánh xuống đó, bạn chỉ cần thực hiện câu truy vấn sau:

```
return Destination::addSelect(['last_flight' => Flight::select('name')
    ->whereColumn('destination_id', 'destinations.id')
    ->orderBy('arrived_at', 'desc')
    ->limit(1)
])->get();
```

Ngoài ra, nếu bạn muốn sắp xếp các đích đến theo thứ tự thời gian chuyến bay cuối cùng hạ cánh xuống đó (sort theo trường arrived_at ở bảng flights), cú pháp sử dụng subquery cũng rất đơn giản:

```
return Destination::orderByDesc(
    Flight::select('arrived_at')
        ->whereColumn('destination_id', 'destinations.id')
        ->orderBy('arrived_at', 'desc')
        ->limit(1)
)->get();
```

### 6. Laravel UI
Frontend scaffolding được cung cấp cùng với các bản Laravel 5.x bây giờ đã có thể trích xuất trong một package có tên là laravel/ui. Các bạn có thể tham khảo thêm tại [đây](https://github.com/laravel/ui)

Nếu bạn muốn chạy theo kiểu truyền thống với Bootstrap/Vue/ , bạn có thể chạy lệnh sau:

```
composer require laravel/ui
php artisan ui vue --auth
```

### 7. Password Confirm
Bản Laravel 6.2 vừa released 8/10/2019 bổ sung một tính năng cực kỳ hữu ích đó là Password Confirm.

Ngữ cảnh đặt ra thường thấy khi bạn dùng các trang web đó là dù bạn đăng nhập rồi nhưng sẽ có một vài hành động trên đó cần phải nhập lại mật khẩu, ví dụ như trang facebook bạn thêm người quản lý mới sẽ hiện lên một dialog bắt nhập mật khẩu.

Sau khi nhập mật khẩu hành động sẽ được chấp thuận và được thông qua trong 3 giờ sau đó (10800 giây) bạn có thể thay đổi trong configs/auth -> 'password_timeout' => 10800

> Như vậy là mình vừa tổng hợp xong những thứ đáng chú ý được release trong phiên bản Laravel 6.x lần này, bài viết được dịch và tổng hợp từ nhiều nguồn khác nhau, nên nếu có bất kỳ sai xót nào các bạn hãy comment ở phía dưới giúp mình nhé. Cảm ơn các bạn đã theo dõi bài viết. Hẹn gặp lại các bạn vào các bài viết tiếp theo.


**Tài liệu tham khảo:**

https://www.facebook.com/LaravelVietNam

https://laravel-news.com/laravel-6

https://topdev.vn/blog/laravel-6-co-gi-hot/