> Ở bài viết này chúng ta sẽ cùng tìm hiểu sao lưu database lên goole dirver với project laravel
### Requirements
Cài đặt project laravel

Google Drive lưu trữ

Mysql 

Kiến thức cơ bản về PHP thiết lập package trong laravel.

### Installation

Chúng ta sẽ bắt đầu với việc cài đặt package spatie/laravel-backup vào project laravel.
```
$ composer require spatie/laravel-backup
```
> Đăng ký service provider trong file config/app.php.
```
'providers' => [
     ...
     Spatie\Backup\BackupServiceProvider::class
]
```
> Xuất bản file config.
```
$ php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```
> Lên lịch trình chạy backupdate database custome mà sẽ ko send mail thông báo.
```
// Backups (to Google Drive)
$schedule->command('backup:clean --disable-notifications')->dailyAt('01:30');
$schedule->command('backup:run --only-db --disable-notifications')->dailyAt('01:35');
```
> Thay đổi cấu hình file app/backup.php để sử dụng google diriver.
```
'disks' => [
    'google',                
    'local',             
],
```
> Cài đặt Flysystem để sử dụng Google Drive:
```
$ php artisan make:provider GoogleDriveServiceProvider.php
```
Sau đó trong file `GoogleDriveServiceProvider.php` vừa được tạo trong phương thức `boot()` chúng ta sẽ sửa lại như sau để thêm google driver cho filesystem.
```
\Storage::extend('google', function ($app, $config) {
    $client = new \Google_Client();
    $client->setClientId($config['clientId']);
    $client->setClientSecret($config['clientSecret']);
    $client->refreshToken($config['refreshToken']);
    $service = new \Google_Service_Drive($client);
    $adapter = new \Hypweb\Flysystem\GoogleDrive\GoogleDriveAdapter($service, $config['folderId']);
    return new \League\Flysystem\Filesystem($adapter);
});
```
> Đăng ký GoogleDriveServiceProvider provider trong  config/app.php
```
'providers' => [
     ...
    App\Providers\GoogleDriveServiceProvider::class,
]
```
> Thêm lưu trữ về goole driver vào config/filesystems.php của chúng ta:
```
return [
  
    // ...
    
    'disks' => [
        
        // ...
        
        'google' => [
            'driver' => 'google',
            'clientId' => env('GOOGLE_DRIVE_CLIENT_ID'),
            'clientSecret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
            'refreshToken' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
            'folderId' => env('GOOGLE_DRIVE_FOLDER_ID'),
        ],
        
        // ...
        
    ],
    
    // ...
];
```
> Cập nhật file .env của bạn:
```
GOOGLE_DRIVE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=xxx
GOOGLE_DRIVE_REFRESH_TOKEN=xxx
GOOGLE_DRIVE_FOLDER_ID=null
```
### Get Google credentials
Đi đến trang https://console.developers.google.com/  và tạo mới project của chúng ta.
![](https://images.viblo.asia/44065211-ebb4-41f3-b599-95b4a45c6c13.png)
Tiếp theo chúng ta Library và tìm kiếm google driver và enable google driver api.
![](https://images.viblo.asia/cdc2ef75-f635-4428-8d32-3b34de390fc9.png)
Tiếp theo chúng ta sẽ tạo OAuth client ID


![](https://images.viblo.asia/1d833cdc-6373-49f8-b047-d9c6ced7631c.png)
Tiếp theo chũng ta sẽ chọn Web Application và đặt tên cho nó. và cầ phải thêm Authorized redirect URIs tạo một khóa sản xuất riêng sau này và sau đó create.

Thêm https://developers.google.com/oauthplayground tạm thời, bởi vì bạn sẽ cần sử dụng nó trong bước tiếp theo.
![](https://images.viblo.asia/6e3a75e5-8239-4c2a-ad1e-6cfdba8451b5.png)

Lúc này cửa sổ popup show lên sẽ có `Your Client ID` và `Your Client Secret`.
Tiếp theo chúng ta hãy đến trang: https://developers.google.com/oauthplayground.
Hãy chắc chắn rằng  `URL to your Authorized redirect URIs` ở bước trước là đúng đến trang web của bạn.
Ở bên góc phải của màn hình  click icon setting và check, `Use your own OAuth credentials` và bạn háy dán `Client ID` và `Client Secret` vừa lấy được ở bước trước vào. Và thêm các ứng dụng được phép trùy cập vào google driver của bạn.

![](https://images.viblo.asia/3c1980e4-0e4e-4d0c-a316-e44e57522af8.png)
Sau đó nhấn button `Authorize APIs` và chấp nhận quyền truy cập.
Tiếp theo chúng ta sẽ đến bước 2. và check vào Auto-refresh the token before it expires”  và click “Exchange authorization code for tokens”.![](https://images.viblo.asia/b2377904-f9e0-419d-9b62-61d650fb1fba.png)
> Lúc này chúng ta đã lấy được Refresh token.
Tiếp theo dựa vào các thông tin mới lấy được lúc trên chúng ta cập nhât .env
### Update .env config
```
GOOGLE_DRIVE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=xxx
GOOGLE_DRIVE_REFRESH_TOKEN=xxx
GOOGLE_DRIVE_FOLDER_ID=null
```
> Để lấy id thư mục sao lưu chúng ta truy cập vào thư mục sau đó lấy ID sau đó cập nhật vào .env

![](https://images.viblo.asia/9e3649ff-edbf-47fa-b9d9-a4ba87987c3d.png)

Bây giờ chúng ta sẽ thực hiện công việc backup database .
### Run bacth backup
```
backup:run --only-db
```
Nếu có lỗi bạn sẽ sửa lại config trong config/backup.php như sau rồi chạy lại.
```
'name' => env('GOOGLE_DRIVE_FOLDER_ID', ''),
```
Tiếp theo chúng ta sẽ kiểm tra kết quả trên thư mục mà chúng ta sao lưu kết quả.
Bài viết của mình đến đây là hết hẹn gặp lại các bạn ở các bài viết tiếp theo: :)

### Tài liệu tham khảo:

https://console.developers.google.com/

https://developers.google.com/oauthplayground/

https://laravel.com/docs/7.x

https://medium.com/@dennissmink/laravel-backup-database-to-your-google-drive-f4728a2b74bd