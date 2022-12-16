### 1.Tại sao chúng ta cần sao lưu ứng dụng của mình ?

 
 Chúng ta đều không muốn mất bất kì tệp dữ liệu hay cơ sở dữ liệu nào của mình. Không có nhà cung cấp dịch vụ lưu trữ nào có thể đảm bảo 100% thời gian hoạt động cho máy chủ của bạ. Các nhà cung cấp dịch vụ lưu trữ phổ biến như DigitalOcean, HostGator, GoDaddy và các nhà cung cấp  khác đôi khi cũng bị lỗi.
   <br>
   <br>
   Một hy vọng nhỏ để lấy  được cơ sở dữ liệu mới nhất khi máy chủ sập là một số nhà cung cấp hosting cũng cung cấp tính năng sao lưu cơ sở dữ      liệu. Vấn đề ở đây là cơ sở dữ liệu được sao lưu hàng tuần không phải hàng ngày. Vì vậy, khi máy chủ ngừng hoạt động vào ngày cuối cùng trước khi sao lưu, bạn sẽ mất dữ liệu 6 ngày của mình.

### 2. Giải pháp


   Để giải quyết cho các vấn đề như vậy , chúng ta sẽ  sử dụng gói laravel-backup. Gói này cung cấp nhiều tính năng khác ngoài việc sao lưu tệp và cơ sở dữ liệu như là :
    
   - Sao lưu tệp và cơ sở dữ liệu.
   - Dọn dẹp các bản sao lưu cũ.
    - Gửi thông báo.
    - Giám sát các bản sao lưu
    
Ok. Giờ chúng ta sẽ bắt đầu thực hiện các bước để back up 1 ứng dụng . Let go.
### 3. Cài đặt ứng dụng và Migration

 **Tạo ứng dụng sử dụng composer**
```PHP
         composer create project laravel/laravel kodementor
```

   **Thiết lập cơ sở dữ liệu.**
   
   Sau khi tạo ứng dụng, chúng ta hãy thiết lập cơ sở dữ liệu. Đối với điều này, tạo một cơ sở dữ liệu mới và sửa đổi tập tin .env của bạn  sao cho phù hợp.
   
  ```PHP
            DB_CONNECTION=mysql
            DB_HOST=127.0.0.1
            DB_PORT=3306
            DB_DATABASE=kodementor
            DB_USERNAME=root
            DB_PASSWORD=secret
  ```
  **Migration.**
  
   Chúng ta sẽ migrate các tệp migration mặc định được sử dụng để xác thực. Để migrate , chỉ cần chạy lệnh :
  ```PHP
             php artisan migrate
  ```
  **Seeding**
  
  Chúng ta sử dụng tinker để seed cho bảng users.
  ```PHP
      php artisan tinker
      // in tinker shell run below command
            >>> factory(App\User::class, 20)->create();
  ```
### 4. Install Package

Để cài đặt đưcọ spatie packages, project của bạn phải đáp ứng được các yêu cầu sau :
<br>
<br>
PHP >= 7
<br>
Laravel >=5.3
<br>
Cần đủ dung lượng trống cho tệp zip được sao lưu
<br>
Nên có mysqldump cài đặt để sao lưu MYSQL DB
<br>
Nên có pg_dump cài đặt để sao lưu Mongo DB
<br>
gói guzzlehttp/guzzle tùy chọn cho thông báo Slack.
<br>
<br>
Để cài đặt package laravel-backup chúng ta sẽ  cài đặt thông qua composer. Chạy câu lệnh : 
```PHP
      composer require spatie/laravel-backup
  ```
###   5.Cấu hình

  Ở phiên bản v5 sẽ tự động đăng kí với nhà cung cấp dịch vụ. chúng ra sẽ config các tập tin cấu hình với lệnh :
  ```PHP
   php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

Sau khi chạy câu lệnh trên sẽ tạo 1 fiel cấu hình mới config/backup.php. Nếu bạn mở nó ra sẽ tìm thấy một tùy chọn cấu hình khác.

```PHP
<?php
 
return [
 
    'backup' => [
 
        /*
         * The name of this application. You can use this name to monitor
         * the backups.
         */
        'name' => config('app.name'),
 
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
                ],
 
                /*
                 * Determines if symlinks should be followed.
                 */
                'followLinks' => false,
            ],
 
            /*
             * The names of the connections to the databases that should be backed up
             * MySQL, PostgreSQL, SQLite and Mongo databases are supported.
             *
             * The content of the database dump may be customized for each connection
             * by adding a 'dump' key to the connection settings in config/database.php.
             * E.g.
             * 'mysql' => [
             *       ...
             *      'dump' => [
             *           'excludeTables' => [
             *                'table_to_exclude_from_backup',
             *                'another_table_to_exclude'
             *            ]
             *       ]
             * ],
             *
             * For a complete list of available customization options, see https://github.com/spatie/db-dumper
             */
            'databases' => [
                'mysql',
            ],
        ],
 
        /*
         * The database dump can be gzipped to decrease diskspace usage.
         */
        'gzip_database_dump' => false,
 
        'destination' => [
 
            /*
             * The filename prefix used for the backup zip file.
             */
            'filename_prefix' => '',
 
            /*
             * The disk names on which the backups will be stored.
             */
            'disks' => [
                'local',
            ],
        ],
 
        /*
         * The directory where the temporary files will be stored.
         */
        'temporary_directory' => storage_path('app/backup-temp'),
    ],
 
    /*
     * You can get notified when specific events occur. Out of the box you can use 'mail' and 'slack'.
     * For Slack you need to install guzzlehttp/guzzle.
     *
     * You can also use your own notification classes, just make sure the class is named after one of
     * the `Spatie\Backup\Events` classes.
     */
    'notifications' => [
 
        'notifications' => [
            \Spatie\Backup\Notifications\Notifications\BackupHasFailed::class         => ['mail'],
            \Spatie\Backup\Notifications\Notifications\UnhealthyBackupWasFound::class => ['mail'],
            \Spatie\Backup\Notifications\Notifications\CleanupHasFailed::class        => ['mail'],
            \Spatie\Backup\Notifications\Notifications\BackupWasSuccessful::class     => ['mail'],
            \Spatie\Backup\Notifications\Notifications\HealthyBackupWasFound::class   => ['mail'],
            \Spatie\Backup\Notifications\Notifications\CleanupWasSuccessful::class    => ['mail'],
        ],
 
        /*
         * Here you can specify the notifiable to which the notifications should be sent. The default
         * notifiable will use the variables specified in this config file.
         */
        'notifiable' => \Spatie\Backup\Notifications\Notifiable::class,
 
        'mail' => [
            'to' => 'vijayrana.me@gmail.com',
        ],
 
        'slack' => [
            'webhook_url' => '',
 
            /*
             * If this is set to null the default channel of the webhook will be used.
             */
            'channel' => null,
 
            'username' => null,
 
            'icon' => null,
 
        ],
    ],
 
    /*
     * Here you can specify which backups should be monitored.
     * If a backup does not meet the specified requirements the
     * UnHealthyBackupWasFound event will be fired.
     */
    'monitorBackups' => [
        [
            'name' => config('app.name'),
            'disks' => ['local'],
            'newestBackupsShouldNotBeOlderThanDays' => 1,
            'storageUsedMayNotBeHigherThanMegabytes' => 5000,
        ],
 
        /*
        [
            'name' => 'name of the second app',
            'disks' => ['local', 's3'],
            'newestBackupsShouldNotBeOlderThanDays' => 1,
            'storageUsedMayNotBeHigherThanMegabytes' => 5000,
        ],
        */
    ],
 
    'cleanup' => [
        /*
         * The strategy that will be used to cleanup old backups. The default strategy
         * will keep all backups for a certain amount of days. After that period only
         * a daily backup will be kept. After that period only weekly backups will
         * be kept and so on.
         *
         * No matter how you configure it the default strategy will never
         * delete the newest backup.
         */
        'strategy' => \Spatie\Backup\Tasks\Cleanup\Strategies\DefaultStrategy::class,
 
        'defaultStrategy' => [
 
            /*
             * The number of days for which backups must be kept.
             */
            'keepAllBackupsForDays' => 7,
 
            /*
             * The number of days for which daily backups must be kept.
             */
            'keepDailyBackupsForDays' => 16,
 
            /*
             * The number of weeks for which one weekly backup must be kept.
             */
            'keepWeeklyBackupsForWeeks' => 8,
 
            /*
             * The number of months for which one monthly backup must be kept.
             */
            'keepMonthlyBackupsForMonths' => 4,
 
            /*
             * The number of years for which one yearly backup must be kept.
             */
            'keepYearlyBackupsForYears' => 2,
 
            /*
             * After cleaning up the backups remove the oldest backup until
             * this amount of megabytes has been reached.
             */
            'deleteOldestBackupsWhenUsingMoreMegabytesThan' => 5000,
        ],
    ],
];
?>
```
### 6. Tiến hành backup

Sau khi config chúng ta có thể bắt đầu backup ứng dụng của mình, Để sao lưu tất cả các tệp, bao gồm cả cơ sở dữ liệu, hãy chạy câu lệnh: 
```PHP 
    php artisan backup:run
```

 Backup thành công khi trên terminal của bạn có hiện message "Backup completed".
 Các tệp sao lưu sẽ nằm trong thư mục được chỉ định trong cấu hình. Theo mặc định, nó sẽ xuất sang thư mục App\storage\app\Laravel.
 Chúng ta cũng có thể chỉ sao lưu các tệp ứng dụng mà không có cơ sở dữ liệu bằng lệnh sau :
 
 ```PHP
             php artisan backup:run --
 ```
###  7. Làm sạch backup

 Tại 1 số thời điểm chúng ta cần dọn dẹp bộ nhớ cũ được sao lưu. Chúng ta chỉ cần chạy lệnh sau :
 ```PHP
            php artisan backup:clean
```
### 8. Giám sát tình trạng sao lưu

 Một tính năng hữu ích khác của package này là chúng ta có thể kiếm tra tình trạng của các tập tin sao lưu . 
 <br>
 Thông thường nếu tệp sao lưu quá     cũ hoặc nếu dung lượng lưu trữ cần thiết cho các bản sao lưu không có sẵn, thì bản sao lưu được coi là không lành mạnh.
 <br>
 <br>
 Chúng ta có thể kiểm tra trạng thái sao lưu của mình bằng cách sử dụng lệnh sau :
```PHP
            php artisan backup:monitor
```
Chúng ta có thể tạo command để tự động lập lịch backup:run và backup:clean.
```PHP
            //app/Console/Kernel.php

        protected function schedule(Schedule $schedule)
        {
           $schedule->command('backup:monitor')->daily()->at('03:00');
        }
```
Bên cạnh đó bạn có thể config cài đặt monitor từ file configuration:
```PHP
     // app/config/backup.php

        /*
         * Here you can specify which backups should be monitored.
         * If a backup does not meet the specified requirements the
         * UnHealthyBackupWasFound event will be fired.
         */
        'monitorBackups' => [
            [
                'name' => config('app.name'),
                'disks' => ['local'],
                'newestBackupsShouldNotBeOlderThanDays' => 1,
                'storageUsedMayNotBeHigherThanMegabytes' => 5000,
            ],

            /*
            [
                'name' => 'name of the second app',
                'disks' => ['local', 's3'],
                'newestBackupsShouldNotBeOlderThanDays' => 1,
                'storageUsedMayNotBeHigherThanMegabytes' => 5000,
            ],
            */
        ],

```
### 9. Thông báo

Laravel-packup gửi thông báo tới nguời dùng thông qua mail và slack. Vì vậy chúng ta nên cài đặt guzzlehttp/guzzle cho slack. Theo mặc định,     chúng ta sẽ nhận được mail cho mọi hoạt động.

Nếu bạn muốn tìm hiểu chi tiết hơn về các class thông báo thực hiện theo đoạn code dưới trong file backup.php
```PHP
/config/backup.php

        /*
         * You can get notified when specific events occur. Out of the box, you can use 'mail' and 'slack'.
         * For Slack you need to install guzzlehttp/guzzle.
         *
         * You can also use your own notification classes, just make sure the class is named after one of
         * the `Spatie\Backup\Events` classes.
         */
        'notifications' => [

            'notifications' => [
                \Spatie\Backup\Notifications\Notifications\BackupHasFailed::class         => ['mail'],
                \Spatie\Backup\Notifications\Notifications\UnhealthyBackupWasFound::class => ['mail'],
                \Spatie\Backup\Notifications\Notifications\CleanupHasFailed::class        => ['mail'],
                \Spatie\Backup\Notifications\Notifications\BackupWasSuccessful::class     => ['mail'],
                \Spatie\Backup\Notifications\Notifications\HealthyBackupWasFound::class   => ['mail'],
                \Spatie\Backup\Notifications\Notifications\CleanupWasSuccessful::class    => ['mail'],
            ],

            /*
             * Here you can specify the notifiable to which the notifications should be sent. The default
             * notifiable will use the variables specified in this config file.
             */
            'notifiable' => \Spatie\Backup\Notifications\Notifiable::class,

            'mail' => [
                'to' => 'your@email.com',
            ],

            'slack' => [
                'webhook_url' => '',
            ],
```
### 10. Lưu ý

 Tất cả các tệp bao gồm cấu hình và thông tin đăng nhập nhạy cảm  sẽ được sao lưu trong ứng dụng của bạn. Vì vậy, hãy chắc chắn để làm cho cáctập tin an toàn trên máy chủ.
<br>
<br>
Link tham khảo : http://www.kodementor.com/how-to-backup-laravel-app-and-database/?fbclid=IwAR3pb1A5mWsl770t6qeXuSyid3RKsZk1922GxfjeiLfRoJ4UxK08DS8uGg4