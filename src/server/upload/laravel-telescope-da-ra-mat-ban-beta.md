Bản beta đầu tiên của Laravel Telescope đã được ra mắt, cùng trải nghiệm xem Laravel Telescope có gì nhé. Nói sơ qua một tý, Laravel Telescope là một package hổ trợ bạn debug trong quá trình phát triển ứng dụng Laravel
> Laravel Telescope is an elegant debug assistant for the Laravel framework. Telescope provides insight into the requests coming into your application, exceptions, log entries, database queries, queued jobs, mail, notifications, cache operations, scheduled tasks, variable dumps and more. Telescope makes a wonderful companion to your local Laravel development environment.

## Cài đặt và cấu hình
Cài đặt thông qua composer, Telescope yêu cầu Laravel 5.7+:

```
composer require laravel/telescope --dev
```

Publish assets bằng command `telescope:install` và migrate database:

```
php artisan telescope:install

php artisan migrate
```

File config cho package được lưu tại `config/telescope.php` nếu chưa thấy xuất hiện, run command `vendor:publish` và chọn tag `telescope-config`, sau đó tùy chỉnh cho phù hợp.

## Dashboard Authorization
Sau khi cài đặt xong, truy cập `/telescope` để sử dụng. Mặc định bạn chỉ có thể truy cập vào route này khi setting `APP_ENV=local`. Tuy nhiên bạn cũng có thể tùy chỉnh quyền truy cập vào những route này khi `APP_ENV` khác local, trong phương thức `gate` của `app/Providers/TelescopeServiceProvider.php`.

```php
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

## Các tabs
### (HTTP) Requests

![](https://images.viblo.asia/7a4fd397-299e-4960-bfe1-c433454c4643.png)

Tab này hIển thị danh sách và thông tin chi tiết tất cả request đến ứng dụng của bạn.

![](https://images.viblo.asia/29bc7576-626d-45b7-825d-f7e5d4436445.png)

![](https://images.viblo.asia/b146b652-4650-446a-a65e-7a6a6f6e2d3c.png)

![](https://images.viblo.asia/d3da9c12-efbd-4d02-aaef-cf6e05f009ad.png)

Mỗi request sẽ bao gồm nhiều thông tin khác như database queries và thời gian thực hiện query; user nào thực hiện request đó...

![](https://images.viblo.asia/a6fc3ce3-3961-4a67-a972-7bd4c2f9b191.png)

### Commands

![](https://images.viblo.asia/d3a15710-56a2-4355-870f-7ddd37a05cfb.png)

Tab này cho phép bạn nhìn thấy các command đã được chạy và exit code của chúng, bấm vào xem chi tiết bạn có thể xem được thêm arguments, options của command đó cũng như một số thông tin liên quan.

![](https://images.viblo.asia/7d6cf6ab-5ff7-41c6-baf2-03de3ea5698b.png)

### Schedule

Show danh sách scheduled task đã được chạy, bấm vào để xem thông tin chi tiết

![](https://images.viblo.asia/8cf8093e-e16d-474d-ba67-56cb2d2f2e3c.png)

### Jobs

![](https://images.viblo.asia/a39b5160-6fa3-4017-9cb4-b6e7249c44cc.png)

Show danh sách job đã và đang chạy. Tương tự Horizon nhưng Horizon chỉ hổ trợ redis và không chỉ đơn thuần là UI, Telescope là UI đơn thuần và hổ trợ tất cả queue driver.

![](https://images.viblo.asia/85bd5981-dfbf-4d0b-86cf-3af7e17063d4.png)

Ở trang job list, bạn có thể xem được job name,queue và connection job đó đang chạy, job status và khi nào nó sẽ xảy ra.

Ở trang detail, có thể xem được nhiều thông tin hơn: hostname, connection, queue, số lần thử, timeout, tags, class name...

![](https://images.viblo.asia/2b75cce5-34f2-4c02-9eaf-efc5554de466.png)

### Exceptions

![](https://images.viblo.asia/21798bc5-75a7-47a6-8cab-ce57d21ca033.png)

Show tất cả exception cũng như thông tin chi tiết của từng exception.

![](https://images.viblo.asia/21798bc5-75a7-47a6-8cab-ce57d21ca033.png)

Xem vị trí xảy ra exception trong code, highlight và xem stack trace.

![](https://images.viblo.asia/931688b0-a6c4-4ff8-b622-0d057072c5c0.png)

![](https://images.viblo.asia/93fd3bd3-8c3e-4958-812f-26d510fa2da0.png)

![](https://images.viblo.asia/cdec40b6-bd8d-4f77-8666-169ec58a9034.png)

### Logs

Xem tất cả log, log level và thời gian log

![](https://images.viblo.asia/0edb277a-10f7-49a5-b26f-eaebff95cfc4.png)

Xem nhiều thông tin về log ở trang chi tiết:

![](https://images.viblo.asia/2ac05338-e6fc-4653-8d88-504c0748a9c5.png)

## Dump screen

![](https://images.viblo.asia/b87b14ee-5ce0-4790-87a1-05f5ec02a6bf.png)

Khi bạn sử dụng phương thức dump() trong code của bạn và màn hình Telescope dump được mở, bạn sẽ nhìn thấy dữ liệu đó sẽ được dump trong telescope và không xuất hiện trong ứng dụng của bạn, các "dump" cũng được link đến request gọi đến nó. Nếu bạn đóng màn hình này đi, các "dump" sẽ xuất hiện trở lại trong ứng dụng.

## Queries 

![](https://images.viblo.asia/61541eaf-0383-4e18-bebb-cbed6dc88697.png)

Show thông tin về tất cả database queries giống debug bar, click vào trang detail để xem chi tiết hơn: thời gian thực hiện, request nào gọi query đó...

![](https://images.viblo.asia/a24220ef-5984-42dd-a3f2-1aeb55765301.png)

Bạn có thể config thời gian 1 query được xem là chậm và khi thực thi vượt ngưỡng đó, query sẽ bị đánh dấu đỏ là slow trong danh sách query

## Models

![](https://images.viblo.asia/519b8e19-59fa-4e26-b29e-d2cfcfa47c0c.png)

Bạn có thể xem được các sự kiện `create`, `update`, `delete` của model cũng như sự thay đổi của data trong từng sự kiện.

![](https://images.viblo.asia/bee6a5c9-de9c-42b1-af88-48ba9f592960.png)

## Events

![](https://images.viblo.asia/519b8e19-59fa-4e26-b29e-d2cfcfa47c0c.png)

Show tất cả các thông tin về event và listener

![](https://images.viblo.asia/bee6a5c9-de9c-42b1-af88-48ba9f592960.png)

## Mail

![](https://images.viblo.asia/506fe1e6-fa85-43b1-8100-25adf44f5ca7.png)

Show danh sách mail đã được gửi, ai là người nhận, được gửi khi nào hoặc những email đang được queued và thời gian nó sẽ được gửi. Bạn có thể xem thông tin mail giống như mailtrap khi bấm vào xem chi tiết.

![](https://images.viblo.asia/1b21657a-13ea-4df6-a991-b87d3f4e8994.png)

## Notifications

![](https://images.viblo.asia/199a606b-d5db-492f-a036-fed414376fcf.png)

Show danh sách notifications, type của chúng, có thể xem thêm thông tin về Job nếu notofication đang được queue...

## Cache

Show key, data, thời gian hết hạn của cache, request nào trigger đến nó...

![](https://images.viblo.asia/3ae15d66-d0dc-426e-910c-6d46e8a1e8ea.png)

## Redis

Giống như tab cache

Trên đây là một số thông tin cơ bản về package mới - Laravel Telescope, hi vọng bạn sẽ cảm thấy hữu ích

Tham khảo:
* https://github.com/laravel/telescope
* https://mattstauffer.com/blog/introducing-laravel-telescope/