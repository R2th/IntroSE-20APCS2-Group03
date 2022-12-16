&nbsp;&nbsp;&nbsp;&nbsp; Chắc hẳn chúng ta đã từng phải debug ứng dụng và nếu là ứng dụng Laravel thì chúng ta chắc đã từng sử dụng **Laravel DebugBar** để debug nhiều thứ hơn trong app mà mình mong muốn. Cá nhân thì mình thấy giao diện của DebugBar trông hơi tù và nó không ghi lại hết những gì đã xảy ra trong ứng dụng của mình. Hôm nay mình xin giới thiệu với các bạn 1 package rất hay của chính Laravel đó là **Telescope**.


&nbsp;&nbsp;&nbsp;&nbsp; Laravel Telescope là một package giúp **debug** cho framework Laravel. Laravel Telescope cung cấp cái nhìn sâu sắc về các **requests đến ứng dụng, exceptions, log entries, database queries, queued jobs, mail, notifications, cache operations, scheduled tasks, variable dumps ...** Là một người bạn đồng hành tuyệt vời với môi trường phát triển Laravel

![](https://images.viblo.asia/966283b4-1ca7-4d0e-87fd-a246143963d5.png)

# 1. Installation

&nbsp;&nbsp;&nbsp;&nbsp;Chúng ta có thể sử dụng composer để install Telescope vào project Laravel :

```
composer require laravel/telescope
```

&nbsp;&nbsp;&nbsp;&nbsp;Sau khi Telescope, ta sẽ publish các assets của nó sử dụng: telescope:install Artisan command. Sau khi cài đặt Telescope, bạn cũng nên chạy lệnh migrate command:

```
php artisan telescope:install

php artisan migrate
```

# 2. Updating Telescope

&nbsp;&nbsp;&nbsp;&nbsp; Khi nào update Telescope, ta sẽ chạy lại Telescope's assets:

```
php artisan telescope:publish
```

# 3. Configuration

&nbsp;&nbsp;&nbsp;&nbsp; Sau khi cấu hình assets của Telescope, file config chính của nó sẽ được đặt tại **config/telescope.php**. File cấu hình này cho phép ta định cấu hình các tùy chọn người xem và mỗi tùy chọn cấu hình bao gồm mô tả về mục đích của nó, vì vậy hãy chắc chắn ta xem kỹ file này.

&nbsp;&nbsp;&nbsp;&nbsp; Nếu muốn, ta có thể tắt hoàn toàn bộ option data của Telescope bằng cách enabled configuration option:
```
'enabled' => env('TELESCOPE_ENABLED', true),
```

# 4. Data Pruning

&nbsp;&nbsp;&nbsp;&nbsp; Nếu không **pruning**, bảng telescope_entries có thể tích lũy các bản ghi rất nhanh. Để giảm thiểu điều này, ta nên đặt lịch **telescope:prune** Artisan command để chạy hàng ngày:

```
$schedule->command('telescope:prune')->daily();
```

&nbsp;&nbsp;&nbsp;&nbsp; Theo mặc định, tất cả các bản ghi cũ hơn 24 giờ sẽ được pruning. Ta có thể sử dụng option hour để xác định thời gian lưu giữ dữ liệu của telescope. Ví dụ: lệnh sau sẽ xóa tất cả các bản ghi được tạo hơn 48 giờ trước:

```
$schedule->command('telescope:prune --hours=48')->daily();
```

# 5. Dashboard Authorization

&nbsp;&nbsp;&nbsp;&nbsp;  Telescope có exposes 1 dashboard tại **/telescope**. Ta sẽ chỉ có thể truy cập dashboard này trong local environment. Trong file **app/Providers/TelescopeServiceProvider.php** của ta, có một method **gate()**. Ta có thể tự do chỉnh sửa method này khi cần để hạn chế quyền truy cập vào việc installation Telescope của mình:

```
/**
 * Register the Telescope gate.
 *
 * This gate determines who can access Telescope in non-local environments.
 *
 * @return void
 */
protected function gate()
{
    Gate::define('viewTelescope', function ($user) {
        return in_array($user->email, [
            'taylor@laravel.com',
        ]);
    });
}
```

<br>
&nbsp;&nbsp;&nbsp;&nbsp;  Như vậy là đã xong việc cài đặt Telescope, giờ ta có thể thấy trên dashboard rất đẹp và thân thiện của Telescope có rất nhiều thông tin hữu ích khi ta muốn debug ứng dụng của mình như xem được tất cả các câu truy vẫn và số lượng các câu query là bao nhiêu, telescope cũng lắng nghe realtime mọi thứ khác nữa khi có điều gì xảy ra trong ứng dụng, ta có thể khám phá thêm về package vô cùng hữu dụng này nữa.

<br>&nbsp;&nbsp;&nbsp;&nbsp;  Nguồn: https://laravel.com/docs/6.x/telescope#configuration