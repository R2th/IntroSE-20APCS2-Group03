Làm việc với framework Laravel chúng ta không lạ gì với các chức năng cần dùng **queues**. Tuy nhiên có những lúc chức năng queues đó không hoạt động như ý muốn và chúng ta phải vất vả chui vào từng file log, debug từng dòng code để kiểm tra xem vấn đề nằm ở đâu. Thật sự kinh khủng đúng không nào :(. 

### Giới Thiệu Laravel Horizon
**Laravel Horizon**  đã ra đời để hỗ trợ việc kiểm tra và quản lý queues dễ dàng hơn. **Horizon** cung cấp giao diện thân thiện đẹp mắt và cấu hình theo hướng mã cho các hàng đợi Redis do Laravel hỗ trợ. **Horizon** cho phép bạn dễ dàng theo dõi các chỉ số chính của hệ thống hàng đợi của mình như thông lượng công việc, thời gian chạy và lỗi công việc với những thiết lập đơn giản và tiện lợi. Bây giờ chúng ta sẽ bắt đầu tìm hiểu và cài đặt **Laravel Horizon** nhé. 

### Cài Đặt 
Để có thể cài đặt Laravel Horizon, chúng ta có thể sử dụng Composer: 
```
composer require laravel/horizon
```

Sau khi chạy composer thành công: 
```
php artisan horizon:install
```

### Cấu Hình Cơ Bản
Laravel Horizon có một file config chính được đặt tại `config/horizon.php`. Chúng ta cùng tìm hiểu một chút về các options có trong file đó nhé:

- **Balance Options**

    Horizon cung cấp 3 options: **simple**, **auto**, **false**.
    ```
    'balance' => 'simple',
    ```
    
    **simple** là cấu hình mặc định ban đầu, nó chia đều các công việc đến giữa các quy trình. 
    
   **auto** sẽ điều chỉnh số lượng công việc trên mỗi hàng đợi dựa trên khối lượng công việc hiện tại của hàng đợi. Ví dụ: nếu một hàng đợi A của bạn có 1.000 công việc đang chờ trong khi hàng đợi khác của bạn trống, Horizon sẽ phân bổ nhiều **worker** hơn vào hàng đợi A của bạn cho đến khi nó trống.
   
   Khi bạn chọn option **false**, hành vi Laravel mặc định sẽ được sử dụng, xử lý hàng đợi theo thứ tự chúng được liệt kê trong cấu hình của bạn.
   
- **Job Trimming**

    Horizon cho phép bạn thiết lập thời gian tồn taị của `job`hiện tại và `job` thất bại. Mặc định thì `job` hiện tại sẽ tồn tại trong một giờ, còn `job` thất bại sẽ được giữ trong một tuần.

    ```
    'trim' => [
        'recent' => 60,
        'failed' => 10080,
    ],
    ```
    
### Dashboard Authorization
Để mở được giao diện của Horizon, chúng ta truy cập vào đường dẫn `/horizon`. Mặc định thì bạn chỉ có thể truy cập vào giao diện Horizon trên môi trường **local**. Tuy nhiên với file `app/Providers/HorizonServiceProvider.php` sẽ giúp bạn thiết lập hiển thi giao diện đó trên các môi trường khác như **staging** hoặc **production.

```
/**
 * Register the Horizon gate.
 *
 * This gate determines who can access Horizon in non-local environments.
 *
 * @return void
 */
protected function gate()
{
    Gate::define('viewHorizon', function ($user) {
        return in_array($user->email, [
            'taylor@laravel.com',
        ]);
    });
}
```

### Chạy Laravel Horizon
Sau khi đã hoàn thành các cấu hình trong file `config/horizon`, chúng ta có thể bắt đầu chạy Horizon bằng lệnh Artisan. Lệnh này sẽ khởi động tất cả các thiết lập của bạn cho **worker**.
```
php artisan horizon
```

Chúng ta cũng có thể tạm dừng hoặc tiếp tục Horizon bằng các lệnh sau: 
```
php artisan horizon:pause

php artisan horizon:continue
```

Nếu muốn kiểm tra trạng thái của Horizon: 
```
php artisan horizon:status
```

Khi bạn muốn dừng lại Horizon, hãy chạy lệnh sau: 
```
php artisan horizon:terminate
```
Khi đó các `job` đang chạy sẽ tiếp tục chạy hoàn thành và dừng lại.


Trên là những kiến thức cơ bản về **Laravel Horizon**, hy vọng nó sẽ có ích cho các bạn

Tài liệu tham khảo : https://laravel.com/docs/7.x/horizon#dashboard-authorization

https://medium.com/@taylorotwell/introducing-laravel-horizon-4585f66e3e