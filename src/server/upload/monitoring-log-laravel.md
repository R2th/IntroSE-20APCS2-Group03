# Đặt vấn đề 
 Xin chào các bạn, phải nói incident là 1 từ ngữ ám ảnh tất cả anh em làm dev, QA và PM dự án nói chung. Với những dự án làm với KH Nhật, incident gần như là điều tối kị với họ. 

Vậy làm thế nào để hạn chế incident nhất có thể và khắc phục nhanh chóng. Ngoài yếu tố về mặt coding phải chặt chẽ, QA nắm chắc hệ thống, đưa ra được nhiều `test case` thì việc `monitoring` hệ thống để phát hiện kịp thời bug phát sinh cũng như đưa ra giải pháp kịp thời cũng là 1 công việc cực kì quan trọng. 

Tôi lấy ví dụ tôi có 1 tác vụ gửi mail được chạy trong queue. Khi hệ thống chạy thực tế trên `production`, bằng một cách nào đó `queue` đột nhiên bị `thọt`. Email không được gửi đi và cũng không có bất cứ dấu hiệu nào để đội dev biết là chức năng của mình đã bug. Chỉ khi người dùng feedback "Tôi không nhận được email !!". Khi đó đội ngũ phát triển mới cuống cuồng vào bảng `fail_jobs` check lỗi để và sửa lỗi.

Thêm một ví dụ nữa về việc chạy `cron job` thống kê đơn hàng đã bán được trong ngày được thực hiện bởi hệ thống vào lúc 23h đêm. Vào một ngày đẹp trời, job lăn quay ra chết, đến cuối tháng mới phát hiện ra ngày hôm đó không thống kê được đơn hàng. 

Câu chuyện quay lại 2 chữ giá như. Giá như pháp hiện sớm hơn việc queue không chạy, giá như phát hiện sớm cron job không chạy. Giá như và giá như :D

![](https://images.viblo.asia/ad29da63-c38c-41f0-8707-e55f6a1afc2b.jpeg)

# Giải quyết vấn đề
Từ câu chuyện bên tôi ý thức được cần có một cách nào đó để thông báo kịp thời cho team phát triển mỗi khi có bug xảy ra, theo một cách đơn giản nhất -  gửi message.

Công ty hiện tại của tôi đang làm việc chủ yếu dùng chatwork trong việc giao tiếp giữa mọi người trong dự án nên tôi lựa chọn chatwork là kênh để thông báo mỗi khi hệ thống có vấn đề. Và thêm một việc nữa là dự án tôi chủ yếu dùng Laravel, nên tôi đang đứng trên hệ quy chiếu của một người giám sát hệ thống sử dụng Laravel trong việc phát triển hệ thống.
1. Tạo 1 box riêng chỉ dành cho việc notify hệ thống

2. Monitor tất cả những exception có thể xảy ra khi hệ thống chạy. Ở đây tôi focus vào 2 exception chính là do queue và do tầng application.


Chi tiết thêm bạn có thể theo dõi tại [Giám sát Log Laravel và gửi thông báo về Chatwork](https://viblo.asia/p/giam-sat-log-laravel-va-gui-thong-bao-ve-chatwork-gDVK2GovZLj)

Mình đã áp dụng với khoảng 2-3 dự án và nhận ra phương pháp trên cực kì hiệu quả để phát hiện cũng như xử lí bug một cách nhanh chóng.

Mỗi tội là phải code đi code lại nhiều lần ở mỗi dự án, thế là một ngày đẹp trời mình đóng gói nó lại thành package. Cho mọi người có thể dễ dàng áp dụng nó vào dự án hơi. Mong muốn nhận được nhiều feedback hơn để phát triển nó. 
![](https://images.viblo.asia/94c7b24d-889f-4088-8583-5bab3e4542b2.png)



# Về Package Monitoring Log Laravel

Package được xây dựng bởi thành viên của AvengersCodeLovers. Một nhóm nhỏ những bạn yêu thích lập trình, mong muốn tìm hiểu, xây dựng tool hỗ trợ vấn đề của mọi người gặp phải.

**Monitoring Log Laravel hoạt động như thế nào ?**

Dựa trên cơ chế report cũng như ghi log của Laravel. Tôi bắn tất cả các `exception` được coi là nguyên nhân gây ra bug của hệ thống về chatwork thông qua một tài khoản được coi là `bot`. Nhờ đó, team phát triển có thể đọc và đưa ra giải pháp một cách nhanh chóng để xử lí chúng.

Hiện tại package vẫn rất sơ sài cần thêm contributor. Chính vì vậy nên mới có bài viết này =)). Với mong muốn sẽ có nhiều chức năng hơn.
Ví dụ như có thể gửi về nhiều workspace khác nhau như skype, facebook các thứ. Hay là có thể thống kê 1 ngày có bao nhiêu log tất cả, bao nhiêu log mỗi loại, bla bla chẳng hạn. Hay là viết test cho những function đang có.

Hiện tại package đang open source và rất cần mọi người xây dựng thêm. Chi tiết xem tại https://github.com/AvengersCodeLovers/laravel-log-monitoring.

# Áp dụng vào dự án thực tế
Nói đi nói lại cuối cùng vẫn phải đưa cho mọi người cái hướng dẫn sử dụng. Thực ra mình có viết thành doc rồi nhưng vẫn mong muốn chia sẻ ở nội dung bài viết.

Để bắt đầu với `Monitoring Log Laravel`, sử dụng Composer tải về project của bạn 
```
composer require avengers-code-lovers/laravel-log-monitoring
```
**Laravel 5.5+**: Laravel sử dụng `Package Auto-Discovery`, vì vậy bạn không cần config thủ công vào `ServiceProvider`

**Laravel < 5.5:**: Nếu bạn không dùng `auto-discovery`, vui lòng config trong `config/app.php`

```php
'providers' => [
    // Other service providers...

    AvengersGroup\MonitoringServiceProvider::class

],
```

Bạn cũng cần thêm api_key cho chatwork đặt làm bot nhắc nhở cũng như định danh room sẽ bắn thông báo về chatwork. Với `Monitoring Log Laravel` mọi thông báo sẽ được gửi đến đích danh admin box để check toall spam kênh chatwork.
```php
    'chatwork' => [
        'api_key' => env('CHATWORK_API_KEY'),
        'room_id_sos' => env('CHATWORK_API_ROOM_ID'),
        'role' => [
            'admin' => 'admin'
        ]
    ]
```


Thêm key vào .env
```
CHATWORK_API_KEY=xxxxx
CHATWORK_API_ROOM_ID=xxxxx
```
Sử dụng chúng trong `App/Exceptions/Handler.php`. Như các bạn biết, Laravel Report và  log một exception tại phương thức `report()`. Vậy chúng ta sẽ thêm dòng sau.
```php
public function report(Exception $exception)
{
    app('monitoring')->sendExceptionToChatWork($exception);

    parent::report($exception);
}
```
Ngoài ra có một số $exception không mong muốn cần phải gửi về như `ValidationException`, `AuthenticationException`. bạn có thể khai báo trong thuộc tính 

```php
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];
```
Với những job đang chạy queue, chúng ta chỉ cần định nghĩa thêm trong phương thức `failed()` của job

```php
    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed(Exception $exception)
    {
        app('monitoring')->sendExceptionToChatWork($exception);
    }
```
Vậy là xong, chúng ta đã có một hệ thống nho nhỏ để giám sát hệ thống trong 1 phút config.
# Tổng kết
Như vậy là tôi đã giới thiệu sơ lược về các team đang quản lí bug phát sinh. Cũng như mong muốn sẽ có nhiều hơn nữa contributor để package có thể hoàn thiện hơn.

Tất nhiên là giải pháp trên chỉ phù hợp với hoàn cảnh bug phát sinh ở tầng application. Tức là bug phát sinh từ những dòng code, chứ để quản lí thêm về hệ thống chịu tải hay khi server `oẳng` thì chưa giám sát được. 

Xin cảm ơn mọi người đã lắng nghe và hẹn gặp lại ở những bài viết lần sau.