## Giới thiệu

`Laravel Telescope` là 1 package cung cấp giao diện hỗ trợ debug cho Laravel Framework. `Telescope` cung cấp tổng quan về các request đến ứng dụng, exceptions, logs, các query đến database, các job trong queue, mail, notifications, các biến được dump,... Telescope là công cụ hỗ trợ hiệu quả cho môi trường Dev.

![](https://images.viblo.asia/35586d95-d507-4c51-80fe-efbd90866d41.png)

## Cài đặt

Phiên bản Telescope 1.0 yêu cầu Laravel của bạn phải ở phiên bản 5.7.7 trở lên và dễ dàng cài đặt qua Composer vào trong project:

``` bash
composer require laravel/telescope
```

Sau đó chạy 
``` bash
$ php artisan telescope:install
Publishing Telescope Service Provider...
Publishing Telescope Assets...
Publishing Telescope Configuration...
Telescope scaffolding installed successfully.

$ php artisan migrate
Migrating: 2018_08_08_100000_create_telescope_entries_table
Migrated:  2018_08_08_100000_create_telescope_entries_table

```
để publish assets của Telescope và tạo các table cần thiết cho quá trình sử dụng Telescope.

Ngoài ra, nếu chỉ muốn cài Telescope ở môi trường Dev, bạn sử dụng thêm option `--dev` . Sau khi publish assets của Telescope bằng `telescope:install`, bạn xóa `TelescopeServiceProvider` khỏi `app`, và thêm đoạn code này vào trong method `register` trong `AppServiceProvider`

``` PHP
/**
 * Register any application services.
 *
 * @return void
 */
public function register()
{
    if ($this->app->isLocal()) {
        $this->app->register(TelescopeServiceProvider::class);
    }
}
```

Đoạn code trên nhằm mục đích chỉ định sử dụng Telescope ở trên môi trường Dev (Local).

### Cấu hình cho Telescope

Sau khi publish các asset của Telescope, một file cấu hình sẽ được đặt trong `config/telescope.php`. File cấu hình này cho phép bạn lựa chọn các `Watchers` được sử dụng để theo dõi hoạt đọng ứng dụng, chúng đều được gắn mô tả để dễ dàng hiểu được mục đích của `Watcher`. Nếu muốn disble hoạt động của Telescope, bạn có thể disable nó từ file `.env` qua key `TELESCOPE_ENABLED` hoặc trong file `config/telescope.php`
``` PHP
TELESCOPE_ENABLED=false
# hoặc
'enabled' => env('TELESCOPE_ENABLED', false),
```

### Xử lý loại bỏ dữ liệu
Telescope cung cấp 1 command phục vụ việc xử lý xóa bỏ dữ liệu các bản ghi được lưu trong bảng `telescope_entries`, để công việc này được hoạt động tự động, bạn có thể lập lịch cho nó là 1 command chạy hằng ngày: 

``` PHP
$schedule->command('telescope:prune')->daily();
```

Mặc định, Telescope sẽ xóa dữ dữ liệu từ 24h trước, tuy nhiên bạn có thể sử dụng option `--hours`, khi chạy command với option, Telescope sẽ nhận ra cần xóa dữ liệu trong thời gian bao lâu, ví dụ dưới đây sẽ xóa các bản ghi được tạo 48h trước
``` php
$schedule->command('telescope:prune --hours=48')->daily();
```

## Đăng nhập Dashboard
Chúng ta sử dụng đường dẫn `/telescope` để truy cập vào Dashboard của Telescope. Mặc định, chúng ta chỉ có thể sử dụng Dashboard ở môi trường Dev. Method `gate` trong file `app/Providers/TelescopeServiceProvider.php`, cho phép bạn có thể truy cập vào Telescope ở những môi trường khác (ngoài môi trường dev),  bạn có thể sửa đổi logic của method `gate` để hạn chế việc truy cập vào Dashboard của Telescope:

``` PHP

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
            'my-email@gmail.com',
        ]);
    });
}

```

## Bộ lọc
### Filter
 Telescope cho phép chúng ta lọc các dữ liệu được ghi thông qua `filter` callback được viết trong `TelescopeServiceProvider`. Mặc định, callback này sẽ lưu toàn bộ dữ liệu ở môi trường Dev và exceptions, failed jobs, scheduled  task, và toàn bộ dữ liệu đươc quản lý theo tags ở tất cả môi trường:
 
 ``` PHP
 /**
 * Register any application services.
 *
 * @return void
 */
public function register()
{
    $this->hideSensitiveRequestDetails();

    Telescope::filter(function (IncomingEntry $entry) {
        if ($this->app->isLocal()) {
            return true;
        }

        return $entry->isReportableException() ||
            $entry->isFailedJob() ||
            $entry->isScheduledTask() ||
            $entry->hasMonitoredTag();
    });
}
 ```
 
 ### Batches
 Trong khi `filter` lọc dữ liệu cho từng chỉ mục riêng, thì `filterBatch` method là một callback cho phép lọc toàn bộ dữ liệu cho request, console command. Nếu callback return `true` thì toàn bộ dữ liệu sẽ được ghi lại:
 
 ``` PHP
 use Illuminate\Support\Collection;

/**
 * Register any application services.
 *
 * @return void
 */
public function register()
{
    $this->hideSensitiveRequestDetails();

    Telescope::filterBatch(function (Collection $entries) {
        if ($this->app->isLocal()) {
            return true;
        }

        return $entries->contains(function ($entry) {
            return $entry->isReportableException() ||
                $entry->isFailedJob() ||
                $entry->isScheduledTask() ||
                $entry->hasMonitoredTag();
            });
    });
}

```

## Giới thiệu về các Tabs/Watchers

Telescope watchers thu thập dữ liệu từ ứng dụng khi có request hoặc console command được sử dụng. Bạn có thể tự cấu hình các watchers mà bạn muốn bên trong file cấu hình `config/telescope.php`

``` PHP
'watchers' => [
    Watchers\CacheWatcher::class => true,
    Watchers\CommandWatcher::class => true,
    ...
],
```
Một vài watcher cũng có thêm các option 
``` PHP
'watchers' => [
    Watchers\QueryWatcher::class => [
        'enabled' => env('TELESCOPE_QUERY_WATCHER', true),
        'slow' => 100,
    ],
    ...
],
```

### HTTP Requests
![](https://images.viblo.asia/cd2c2a86-8520-4130-b51b-1bda58192f49.png)
Tab này cho phép chúng ta theo dõi toàn bộ các HTTP Request đến ứng dụng của mình. Bạn có thể inspect toàn bộ HTTP Request và sắp xếp các thông tin hữu ích từ mỗi request
![](https://images.viblo.asia/696e2101-6c91-42a7-ac96-d8f0e78604d4.png)
![](https://images.viblo.asia/0095044d-8c49-4a83-90c4-557286e86b1b.png)
![](https://images.viblo.asia/e05832fb-38b6-49a8-aa84-2a426ab721a0.png)
Mỗi tab đều hiển thị toàn bộ các dữ liệu từ các watcher khác nếu dữ liệu đó có liện quan quan đến request. Ví dụ như sự kiện lấy dữ liệu từ trong DB và thời gian thực thi của nó, người dùng nào thực thi request đó
### Command
![](https://images.viblo.asia/53412199-4db9-4a86-aafc-feb381929228.png)
Command tab sẽ hiển thị toàn bộ các command được thực thi và exit code của chúng. Khi bạn nhấn vào từng command, bạn sẽ thấy cả các agrument, options.
![](https://images.viblo.asia/cdbad7fa-2e24-40ad-8cdb-19c503b9451b.png)
### Schedule
Liệt kê các task được lập lịch. Ở mỗi trang thông tin chi tiết của page sẽ hiển thị toàn bộ thông tin của task đã được lập lịch.
![](https://images.viblo.asia/550e7a8b-bf89-4afd-8c37-f931161bb42f.png)
### Jobs
Ở tab Jobs, danh sách các jobs đã và đang chạy sẽ được liệt kê. Nó giống như Horizon, nhưng Horizon chỉ hiện thị nhưng jobs chạy với Redis và có thể tương tác với các queue worker đang chạy, còn Telescope bản chất chỉ là 1 User interface. Trong Jobs tab bạn có thể theo dõi tên job, queue và connection được sử dụng, trạng thái và thời gian thực thi. Trong trang chi tiết về thông tin, bạn sẽ xem được hostname, thông tin của Class, connection, số lần chạy lại, timeout, tags.
![](https://images.viblo.asia/ffcb55f3-2d05-4119-a401-3d8725adc015.png)
![](https://images.viblo.asia/35fa0ac4-abbc-4c9d-bba0-a02662c5ac2f.png)

### Exceptions
Hiển thị toàn bộ các exceptions và cho phép bạn inspect chúng. Mỗi exception đều hiển thị các thông tin như những tab khác gồm hostname, type, request, tag, user
![](https://images.viblo.asia/6856b6a2-d1f7-401a-8b6d-ddd52f7e5eca.png)
Ngoai ra thông tin về dòng code nào tạo ra exception đó sẽ được highlight, cũng như xem được stack trace.
![](https://images.viblo.asia/f6c525bf-be42-47ce-ab76-12eca173fa59.png)
![](https://images.viblo.asia/8e8913fd-d450-468d-988a-4014e1f254ee.png)
## Tạm kết
`Laravel Telescope` là một công cụ có giao diện thân thiện, phù hợp trong việc debug ứng dụng. Bạn có thể sử dụng 1 UI để debug cho nhiều ứng dụng bằng cách chỏ các log của chúng vào chung 1 database và sử dụng tag/ filter để tách biệt chúng. Hơn nữa, Telescope cũng hỗ trợ Notification qua Slack, giúp thông tin về ứng dụng luôn được cập nhập. Đồng thời, dữ liệu của Telescope cũng được prune nên nó sẽ không chiếm nhiều resource của bạn.