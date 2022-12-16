Ở bài viết trước mình cùng các bạn xây dựng 1 project sử dụng service backup tự động DB (nếu chưa đọc bạn có thể [Đọc ngay ở đây](https://viblo.asia/p/service-backup-db-hang-ngay-don-gian-trong-laravel-co-demo-YWOZr3eNlQ0) ), chắc hẳn đã có rất nhiều bạn làm được. Hôm nay mình sẽ cùng các bạn làm thêm tính năng mới, đó là sau khi backup xong thì gửi thông báo vào trong nhóm của Slack để cho các Admin tiện theo dõi hoặc khi sự cố xảy ra thì kịp thời triển khai phương án phù hợp.

**Nội dung tính năng:**

> 1. Xây dựng service auto backup Database và all source code
> 2. Custom backup theo thời gian mong muốn
> 3. Gửi thông báo về Nhóm Slack hoặc Email

![](https://images.viblo.asia/9a50c30e-bfe9-4641-bed6-f1d49bb52c2c.jpg)


### 1. Cài đặt service Spatie

 Hôm nay chúng ta dùng 1 thư viện có tên Spatie được xây dựng dành riêng cho việc backup source code và DB. Các bước cài đặt cũng rất đơn giản.

**Yêu cầu trước khi cài đặt:**

- Bạn có thể lựa chọn phiên bản phù hợp cho cấu hình server/local hiện tại. Nếu bản spatie > 6.0 cần phải chạy trên PHP 7.3 và Laravel 6.0 trở lên
- Bạn đang dùng cấu hình server thấp hơn nên cài đặt spatie version 5 hoặc thấp hơn nữa thì version 3. Ở dưới mình có lệnh cài đặt chi tiết

Nếu cấu hình phù hợp cho bản 6 trở lên , các bạn mạnh dạn ném luôn lệnh này vào root project nha :D 

`composer require spatie/laravel-backup`

 *Kết quả của mình:*
 
` Installing spatie/laravel-backup (6.11.1): Extracting archive`

 Nếu cấu hình của bạn phù hợp với bản 5.0:
 
` composer require "spatie/laravel-backup:^5.0.0"`

**Note:** Sau khi cài xong bạn phải publish cái service backup của nó lên:

`php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"`

Giờ chúng ta chuyển sang phần 2 config những thứ cần thiết

### 2. Config file Backup (Quan trọng)

Bạn vào đường dẫn: **storage** tạo thêm 1 folder **backup**

Sau đó vào file `config/backup.php` thêm dòng : `storage_path('backup'),` trong nhánh **source=>exclude** :

```
'source' => [

            'files' => [

                /*
                 * The list of directories and files that will be included in the backup.
                 */
                'include' => [
                    base_path(),
                ],

                /*
                 * These directories and files will be excluded from the backup.
                 *
                 * Directories used by the backup process will automatically be excluded.
                 */
                'exclude' => [
                    base_path('vendor'),
                    base_path('node_modules'),
                    storage_path('backup'),
                ],

                /*
                 * Determines if symlinks should be followed.
                 */
                'follow_links' => false,

                /*
                 * Determines if it should avoid unreadable folders.
                 */
                'ignore_unreadable_directories' => false,
            ],
```

Tiếp theo mục **disk** trong **destination** chuyển local -> backup , như đoạn code phía dưới :


```
'destination' => [

            /*
             * The filename prefix used for the backup zip file.
             */
            'filename_prefix' => '',

            /*
             * The disk names on which the backups will be stored.
             */
            'disks' => [
                'backup',
            ],
        ],
```

*Mục đích là:* Toàn bộ dữ liệu sau khi backup sẽ được lưu trong path : **storage/backup** đã tạo lúc nãy 

Tiếp theo: Trong path **config/filesystem.php**

 Thêm phần khai báo đường dẫn file backup vào:
 
 ```
'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'backup' => [
            'driver' => 'local',
            'root' => storage_path('backup'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
        ],

    ],
```

**Lưu ý:** Khi server của các bạn đang chạy hệ quản trị khác mysql thì cần đổi tên cho phù hợp trong `config/backup.php`

```
'databases' => [
                'mysql',
            ],
```

*Spatie nó hỗ trợ :* MySQL, PostgreSQL, Mongo

Như vậy việc config cơ bản đã hoàn tất, cùng chuyển sang mục số 3

### 3. Lên lịch chạy và backup tự động

Để tiến hành chạy backup thủ công bạn cần thực hiện 1 lệnh duy nhất là xong:

`php artisan backup:run`

**Kết quả:** Như hình ảnh dưới đây.

![](https://images.viblo.asia/5c97664d-b248-4d7f-aabb-7382c221724a.png)


Hãy vào path `storage/backup` để kiểm tra kết quả backup gồm những gì nào :grinning:

*(Hình ảnh kết quả)*

![](https://images.viblo.asia/20957582-6f95-4901-9e49-2b3ac0f8cfa5.jpg)


Nếu muốn backup theo lịch trình, bạn cần khai báo thêm trong schedule.

Truy cập file: `Console/Kernel.php`

 Uncomment dòng sau:

```
protected function schedule(Schedule $schedule)
    {
         $schedule->command('backup:run')->everyMinute();
    }
```

Trong code trên mình muốn test nhanh để có kết quả nên chọn *everyMinute* :D trong thực tế thường `->daily();` nếu hệ thống lớn có thể dùng `hourly();` Tất cả phụ thuộc mong muốn của bạn.

Sau khi xong bạn chạy lệnh:

`php artisan schedule:run`

**Kết qủa:**

> Running scheduled command: '/usr/bin/php7.2' 'artisan' backup:run > '/dev/null' 2>&1

Điều này tương đương với việc mỗi phút mình lại chạy lệnh backup:run 1 lần cũng khá tiện rồi. Tuy nhiên chúng ta còn muốn chạy tự động luôn, có 1 service ngầm để làm việc này. Và mỗi lần chạy xong thì gửi message vào group Slack cho ae Admin được biết.

### 4. Tích hợp Cronjob và Gửi Message vào Slack hoặc Email


**Config Cronjob**

Việc này rất đơn giản với vài thao tác sau, bạn chạy lệnh :

`crontab -e`

Sau đó edit thêm dòng lệnh này:

`* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1`

**/path-to-your-project** thay bằng đường dẫn tới project của bạn.

Trường hợp của mình đang là project trên server thật thì như sau: `* * * * * cd /var/www/backupdbauto/thanhvietserver && php artisan schedule:run >> /dev/null 2>&1`

Sau thời gian bạn đã config ở schedule, hãy vào kiểm tra folder `storage/backup` để xem file backup được cập nhật chuẩn không. Nếu làm đúng với những config trên bạn sẽ có được kết quả mong muốn thôi. :D 

**Cài đặt gửi message về Slack**

**Bước1:** Cài đặt thêm app **Incoming WebHooks** trong Channel 

Sau khi cài xong bạn sẽ được như hình ảnh dưới.

![](https://images.viblo.asia/2e045d2a-accf-4a26-bf5e-6ac5ba52c4ee.png)


Và channel name của mình: #daily-backup

Webhook URL có dạng: https://hooks.slack.com/services/xxxxxxxxxxxxxxxxxx8UB8523VNpRraycLY3PXcwt

**Bước2** 
Bạn cần copy nó để paste vào `config/backup.php` và thay chỗ notification từ **mail** thành **slack** 

```
'notifications' => [

        'notifications' => [
            \Spatie\Backup\Notifications\Notifications\BackupHasFailed::class => ['slack'],
            \Spatie\Backup\Notifications\Notifications\UnhealthyBackupWasFound::class => ['slack'],
            \Spatie\Backup\Notifications\Notifications\CleanupHasFailed::class => ['slack'],
            \Spatie\Backup\Notifications\Notifications\BackupWasSuccessful::class => ['slack'],
            \Spatie\Backup\Notifications\Notifications\HealthyBackupWasFound::class => ['slack'],
            \Spatie\Backup\Notifications\Notifications\CleanupWasSuccessful::class => ['slack'],
        ],

        /*
         * Here you can specify the notifiable to which the notifications should be sent. The default
         * notifiable will use the variables specified in this config file.
         */
        'notifiable' => \Spatie\Backup\Notifications\Notifiable::class,

        'mail' => [
            'to' => 'your@example.com',

            'from' => [
                'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
                'name' => env('MAIL_FROM_NAME', 'Example'),
            ],
        ],

        'slack' => [
            'webhook_url' => 'https://hooks.slack.com/services/xxxxxxxxxxxxxxxxxx8UB8523VNpRraycLY3PXcwt',

            /*
             * If this is set to null the default channel of the webhook will be used.
             */
            'channel' => 'daily-backup',

            'username' => 'ThanhVietServerBot',

            'icon' => null,

        ],
    ],
```

Sau khi config thành công, bây giờ sau mỗi phút bạn sẽ nhận được thông báo message trong slack như dưới đây: :heart_eyes:

![](https://images.viblo.asia/9274517f-19d6-4b66-8998-77d85fbb3eaa.png)

Rất tiện phải không nào. Đối với email thì các bạn config host như việc gửi mail thông thường, cũng rất đơn giản

### 5. Tổng kết 

Với những bước làm trên đây kèm với Demo trong thực tế, mình hy vọng các bạn sẽ tìm thấy sự hữu ích để phục vụ cho công việc và dự án của chính bạn. Nếu có vướng mắc bạn có thể để lại comment, mình và các bạn ghé qua sẽ giúp đỡ. Xin chào và hẹn gặp lại các bạn trong bài viết tới đây! :D