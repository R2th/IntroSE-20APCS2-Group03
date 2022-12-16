![](http://www.kodementor.com/wp-content/uploads/2018/09/space-3262811_1280-696x380.jpg)

Hiệu suất là 1 điều tuyệt rất tuyệt vời trong bất kỳ ứng dụng. Mọi người đều muốn hệ thống của họ được nhanh chóng. Không công ty nào có thể thúc đẩy hoạt động kinh doanh của mình mà không có một hệ thống phù hợp với hiệu suất tốt. Chúng ta đã thấy nhiều công ty bị bỏ lại bởi các đối thủ cạnh tranh do ứng dụng có hiệu suất không tốt. Do đó, để cạnh tranh trên thị trường, chúng ta cần một hệ thống có hiệu suất tuyệt vời.

Laravel là một Framework PHP phổ biến nhất trong những năm gần đây. Nó đã liên tục bổ sung thêm các tính năng mới từ lúc phát hành phiên bản đầu tiên. Nó được sử dụng để xây dựng các ứng dụng từ nhỏ cho đến lớn cho doanh nghiệp. Laravel nhanh nhưng chúng ta có thể làm nó nhanh hơn nữa bằng một số mẹo và thủ thuật.

Dưới đây là các bước chúng ta có thể làm theo để tối ưu hóa ứng dụng Laravel.

## 1. Route Caching

Caching là một tính năng tuyệt vời trong Laravel giúp tăng hiệu năng. Caching routes giúp giảm đáng kể lượng thời gian đăng ký tất cả các route của ứng dụng. Chúng ta có thể tạo ra một route cache bằng cách chạy command artinsan sau đây:

`php artisan route:cache`

Sau khi chúng ta chạy lệnh, tất cả các route sẽ được lưu vào bộ nhớ cache. Vì vậy, khi người dùng yêu cầu những route nhất định, những route sẽ được tải từ bộ nhớ cache. Tuy nhiên, khi các route mới được thêm vào, chúng ta sẽ không truy cập được trừ khi chúng ta xóa bộ nhớ cache. Vì vậy, tốt nhất là nên lưu trữ cache các route trên môi trường production. Chúng ta có thể xóa cache của các route bằng command artisan:

`php artisan route:clear`

Lưu ý: Nếu bạn gặp vấn đề với bộ nhớ cache của ứng dụng, bạn có thể xóa cache routes, views, configs và application data cache trong Laravel 5 theo các bước được đề cập trong bài viết này.

## 2. Config Caching

Tương tự như route cache, chúng ta có tính năng cho config cache. Chúng ta có thể lưu các file config vào một file duy nhất và sẽ được tải nhanh chóng theo yêu cầu bởi framework. Command artisan này cũng nên được thực hiện trên môi trường production bởi vì, trong giai đoạn phát triển, chúng ta cần thêm và thay đổi các file config khác nhau. Để lưu các file config, hãy chạy lệnh sau:

`php artisan config:cache`

## 3. Eager Loading of Data

Một phương pháp khác mà chúng ta có thể thực hiện là giảm các truy vấn với cơ sở dữ liệu. Điều này thực sự quan trọng để tối ưu hóa hiệu suất của ứng dụng. Các nhà phát triển thực sự nên làm theo truy vấn này với cơ sở dữ liệu của họ. Khi cơ sở dữ liệu của chúng ta có nhiều relationship, chúng ta phải thực hiện chế độ eager loading.

Cái vấn đề với các eloquent relationship có phải là vấn đề truy vấn N + 1? Nó sẽ nhanh hơn khi thực hiện 1 truy vấn trả về 100 kết quả hơn là thực hiện 100 truy vấn, mỗi truy vấn trả lại 1 kết quả. Ví dụ, chúng ta có một bảng hotels và bảng rooms relationship với nhau. Trong trường hợp này, chúng ta có thể thực thi theo cách thông thường như sau:

```
$hotels = App\Hotel::all();
 
foreach ($hotels as $hotel) {
    echo $hotel->room->name;
}
```
Tuy nhiên, bằng cách sử dụng eager loading, chúng ta có thể giảm các truy vấn cơ sở dữ liệu như sau:

```
$hotels = App\Hotel::with('room')->get();
 
foreach ($hotels as $hotel) {
    echo $hotel->room->name;
}

```


## 4. Right Cache & Sesion Driver

Theo mặc định, Laravel sử dụng file để lưu cache. Để có hiệu suất tối ưu, bạn có thể sử dụng Memcached hoặc Redis. Đây là những công nghệ nâng cao hơn và nhanh hơn so với lưu cache dưới dạng file. Để xem cài đặt và cấu hình cho cache, bạn có thể đọc tài liệu chính thức tại https://laravel.com/docs/5.6/cache . Ngoài ra bạn có thể tìm hiểu và cấu hình về bộ nhớ cache trong file 'config/cache.php'

Tương tự như cache, bạn có thể chọn cách lưu trữ nhanh hơn cho session. Session trong Laravel hỗ trợ lưu dưới dạng file, cookie, database, Memcached và Redis. Bạn có thể tìm thấy cấu hình về session trong file 'config/session.php'.

## 5. Queues

Queues giúp trong quá trình xử lý không đồng bộ bằng cách đặt các heavy tasks lên stack và gửi đi các tác vụ này. Chúng ta có thể sử dụng queue cho các heavy task khác nhau như gửi email. Sử dụng queue cho nhiệm vụ như vậy sẽ làm tăng đáng kể hiệu suất của hệ thống. Nguyên tắc chính đằng sau điều này là các task được thực hiện không đồng bộ. Bạn cũng có thể đọc cách thực hiện Cách sử dụng Hàng đợi trong Laravel 5 trong bài viết này http://www.kodementor.com/how-to-use-queue-in-laravel-5/.

## 6. Database Caching

Một điểm khác giúp tăng hiệu suất của ứng dụng là Database Caching. Với database caching, chúng ta có thể hiển thị kết quả truy vấn cơ sở dữ liệu lặp lại từ bộ nhớ cache. Điều này sẽ giúp giảm truy vấn quá tải cho cơ sở dữ liệu làm cho truy vấn nhanh hơn. Khi chúng ta thực hiện truy vấn lần đầu tiên, sau khi chúng ta nhận được kết quả, chúng ta có thể lưu vào bộ nhớ cache kết quả. Sau đó, chúng ta có thể hiển thị kết quả từ bộ nhớ cache khi được yêu cầu sau. Đối với điều này, chúng ta cần phải vượt qua thời gian cho biết thời gian kết quả nên được lưu trữ. Ví dụ:
```
$value = Cache::remember('hotels', $minutes, function () {
            return DB::table('hotels')->get();
        });
```
Tương tự, nếu chúng ta cũng có thể đặt kết quả truy vấn trong bộ nhớ cache mãi mãi. Điều này đặc biệt hữu ích khi chúng ta biết rằng kết quả không thay đổi mãi mãi. Ví dụ, danh sách các quốc gia.

```
$value = Cache::rememberForever('countries', function() {
            return DB::table('countries')->get();
        });
```

## 7. Assets bundling

[Laravel Mix](https://laravel.com/docs/5.6/mix) cung cấp một API để xác định các bước xây dựng Webpack cho ứng dụng Laravel của bạn bằng cách sử dụng một số bộ xử lý CSS và JavaScript phổ biến. Laravel Mix giúp chúng ta kết hợp nhiều stylesheets và script thành một single file. Đoạn code dưới đây sẽ kết hợp hai stylesheet normalize.css và videojs.css vào một stylesheet duy nhất all.css.

```
mix.styles([
    'public/css/vendor/normalize.css',
    'public/css/vendor/videojs.css'
], 'public/css/all.css');
```

Tương tự, chúng ta có thể kết hợp các script thành một file như dưới đây:
```
mix.scripts([
    'public/js/admin.js',
    'public/js/dashboard.js'
], 'public/js/all.js');
```

## 8. Latest PHP Version

Phiên bản mới nhất của PHP là 7.2 được coi là bản phát hành mang tính cách mạng. Có nhiều lý do khác nhau cho việc này. Lý do chính là nó có hiệu suất rất nhanh so với các phiên bản PHP trước đó. Bạn cần nâng cấp phiên bản PHP cho server của bạn lên phiên bản mới nhất để tăng hiệu suất của ứng dụng của bạn. Bên cạnh tốc độ, có nhiều tính năng mới được giải thích chi tiết trong bài viết [Tính năng mới trong PHP 7](http://www.kodementor.com/all-the-new-features-in-php-7-explained/) .

## 9. Comment Unused Service

Khi bạn mở file config/app.php, bạn sẽ thấy có rất nhiều service providers được load vào đầu ứng dụng. Bạn có thể không cần tất cả các service provider đó. Trong trường hợp này, bạn có thể 'comment' các service provider không sử dụng để làm cho ứng dụng của bạn tải nhanh hơn. Tuy nhiên, bạn cần phải cẩn thận rằng nó không ảnh hưởng đến ứng dụng chính của bạn.

## Kết luận

Một trong những yếu tố chính ảnh hưởng trực tiếp đến sự thành công của doanh nghiệp là hiệu suất của ứng dụng. Các ứng dụng Laravel rất nhanh nhưng chúng ta thậm chí có thể tăng hiệu năng với sự trợ giúp của các phương pháp nêu trên. Bạn thậm chí có thể thử và thử nghiệm trên môi trược local development. Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, vui lòng nhận xét bên dưới.

Bài viết tham khảo và được dịch từ: http://www.kodementor.com/optimize-performance-of-laravel-application/