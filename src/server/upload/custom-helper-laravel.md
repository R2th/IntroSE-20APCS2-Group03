Chào mọi người hôm nay mình sẽ giới thiệu đến các bạn làm thế nào để tạo một hàm helper trong ứng dụng laravel :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: và làm thế nào để gọi helper đã tạo ở bất kì nơi nào trong project laravel. Các bạn chỉ cần đi theo step-by-step trong bài này là các bạn sẽ tự tạo được cho riêng mình custom helper đấy. :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Trong Laravel bạn có thể custom helper theo ý muốn của bạn và gọi nó ở bất kì đâu trong project giống như là cách gọi của route, blade view, models, controller... đây thực sự là một giải pháp tốt để tránh việc bị trùng lặp code và cũng dễ dàng bảo trì source code còn một điều quan trọng là sẽ tiết kiệm được rất nhiều thời gian :100::100:. Trọng tâm bài viết này mình sẽ hướng dẫn cho các bạn một ví dụ về cách tạo/sử dụng custom helper.

# 1. Ví dụ

Mình sẽ lấy một ví dụ mà chúng ta thường gặp nhất đó là khi chúng ta cần chuyển đổi hay format lại định dạng của ngày tháng năm chảng hạn. :sweat_smile:

# 2. Tạo file helper
Ở bước đầu tiên này chúng ta cần phải tạo file helper, mình sẽ đặt luôn tên là `Helper` cho đơn giản :D `app/Helpers/Helper.php`
Trong file `Helper.php` mình sẽ viết một hàm tiện ích dùng để định dạng ngày tháng như dưới đây:
```
if (!function_exists('formatDate')) {
    function formatDate($date, string $format = 'Y/m/d')
    {
        if ($date instanceof \Carbon\Carbon) {
            return $date->format($format);
        }

        return $date;
    }
}
``` 

# 3. Thêm file helper vào file composer.json
Ở bước này chúng ta sẽ thêm đường dẫn của file `Helper.php` đã tạo ở trên vào file `composer.json` như sau. Trong file `composer.json` tìm đến phần `files` và thêm vào đường dẫn file helper như thế này: 

```
"autoload": {
    "classmap": [
        ...
    ],
    "psr-4": {
        "App\\": "app/"
    },
    "files": [
        "app/Helpers/Helper.php"
    ]
},
```
# 4. Run Command
Vậy là bạn đã tạo xong file helper của chính bạn rồi đấy :+1::+1: nhưng mà khoan đã chúng ta cần phải chạy composer load như sau:
```
composer dump-autoload
```
Sau khi bạn đã chạy lệnh trên thì bạn có thể sử dụng function `formatDate` ở bất kì đâu trong project chảng hạn như bạn gọi trong file `blade.php` chảng hạn:
```
{{ formatDate($profile->birth_day) }}
```
hay trong controler hoặc bất kì đâu cũng tương tự như vậy:
```
$product->create([
	'name' => 'Áo thun nam nữ'
	'size' => Size::M,
	'date_ship' => formatDate($now),
	...
]);

``` 
# 5. Kết luận
Helper thật là tiện đúng không nào :grinning:, trong bài viết này mình đã hướng dẫn các bạn làm thế nào để tạo một helper function và làm thế nào để gọi helper function trong project laravel.

# 6. Tham khảo 

* https://laravel-news.com/creating-helpers
* https://laravelcode.com/post/how-to-create-custom-helper-in-laravel-55