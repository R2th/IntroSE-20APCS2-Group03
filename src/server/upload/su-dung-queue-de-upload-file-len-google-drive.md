# Giới thiệu
Chào mọi người, như mọi người đều biết đến Queue ở trong môn học Cấu trúc dữ liệu và giải thuật. Bài viết hôm nay mình xin chia sẻ đến với moị người việc áp dụng Queue ở trong Laravel và cụ thể là với công việc lưu trữ file trên Google Drive.

# Chuẩn bị
* Cài đặt Project Laravel (ở thời điểm mình viết bài là Laravel 5.7):

  `composer create-project --prefer-dist laravel/laravel google-drive-demo`
* Cài đặt pakage để tương tác với Google Drive - [Flysystem Google Drive](https://github.com/nao-pon/flysystem-google-drive) :

  `composer require nao-pon/flysystem-google-drive:~1.1` (For Google Drive API V3)
  
  `composer require nao-pon/flysystem-google-drive:~1.0.0` (For Google Drive API V2)

    Ở đây mình sẽ dùng với Google Drive API v3

# Bắt đầu
## 1. Tạo Adapter và Service Provider của Google Drive
- Tạo 2 file GoogleDriveAdapter.php và GoogleDriveServiceProvider.php trong thư mục app/Providers:

GoogleDriveAdaper.php:
```php
<?php

namespace App\Providers;

class GoogleDriveAdapter extends \Hypweb\Flysystem\GoogleDrive\GoogleDriveAdapter
{
    public function getService()
    {
        return $this->service;
    }
}
```

GoogleDriveServiceProvider.php:
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class GoogleDriveServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \Storage::extend('google', function ($app, $config) {
            $client = new \Google_Client();
            $client->setClientId($config['clientId']);
            $client->setClientSecret($config['clientSecret']);
            $client->refreshToken($config['refreshToken']);
            $service = new \Google_Service_Drive($client);
            $options = [];
            if (isset($config['teamDriveId'])) {
                $options['teamDriveId'] = $config['teamDriveId'];
            }
            $adapter = new GoogleDriveAdapter($service, $config['folderId'], $options);
            
            return new \League\Flysystem\Filesystem($adapter);
        });
    }
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```

- Khai báo `GoogleDriveServiceProvider` vào `providers` trong `config/app.php`:
```php
'providers' => [

        /*
         * Laravel Framework Service Providers...
         */
         
        ...
        
        /*
         * Package Service Providers...
         */
         
         ...
         
        /*
         * Application Service Providers...
         */
        App\Providers\GoogleDriveServiceProvider::class,
        
    ],
```
- Vì ở đây ta coi Google Drive như là 1 disk nên ta khai báo `google` disk vào trong `config/filesystems.php`:
```php
<?php

return [

    'default' => env('FILESYSTEM_DRIVER', 'cloud'),

    'cloud' => env('FILESYSTEM_CLOUD', 'google'),

    'disks' => [

        /*...*/

        'google' => [
            'driver' => 'google',
            'clientId' => env('GOOGLE_DRIVE_CLIENT_ID'),
            'clientSecret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
            'refreshToken' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
            'folderId' => env('GOOGLE_DRIVE_FOLDER_ID'),
        ],

    ],

];

```
## 2. Lấy Google Drive API Key
### a. Client ID & Secret:
- Truy cập vào Google Console và tạo 1 App: https://console.developers.google.com
- Ở đây mình đã tạo xong app google-drive-demo, vào Library tìm Google Drive API và **enable**: ![](https://images.viblo.asia/c6ef9b4c-1775-4701-b28a-69a14ccc0499.png)
- Sau đó, vào Credentials, tạo OAuth client ID:
![](https://images.viblo.asia/9fd9cfa8-1cc0-4652-8f2e-0b33049ce3b1.png)
Tại phần này chúng ta nhớ để trong phần Authorized redirect URIs là `https://developers.google.com/oauthplayground`. Sau khi tạo xong, chúng ta sẽ có `client ID` và `client secret`
### b. Refresh Token:
- Truy cập vào đường dẫn: https://developers.google.com/oauthplayground, ở góc bên phải phần cài đặt ta dán client ID và client secret: ![](https://images.viblo.asia/1f8b2973-6a82-4977-9a48-c8217f03a71b.png)
- Sau đó, ở bên trái, tìm và chọn Google Drive API V3, chọn dòng đầu tiên:![](https://images.viblo.asia/95f6dfa3-d62f-4ac9-bb7e-8656d9eb09f0.png) 
- Tiếp tục ta làm theo các bước như hình bên dưới: ![](https://images.viblo.asia/d6fa2243-9fb8-4465-99ca-fda16742a5b9.png)

![](https://images.viblo.asia/de286c53-5277-4513-8436-11b5a6782990.png)

Cuối cùng ta lấy được Refresh token.
### c. Lấy ID thư mục lưu trữ (Root):
- Truy cập vào Google Drive của mình và tạo một thư mục, ở đây mình sẽ tạo thư mục và lấy tên là Demo, đây là thư mục mà chúng ta sẽ tương tác, ID chính là phần cuối trong URL như hình: ![](https://images.viblo.asia/b90aca13-cb7c-4e70-8f7d-c28cbc515837.png)

Sau khi lấy được tất cả các thông tin trên, chúng ta paste vào file .env :
```
FILESYSTEM_CLOUD = google
GOOGLE_DRIVE_CLIENT_ID = ***
GOOGLE_DRIVE_CLIENT_SECRET = ***
GOOGLE_DRIVE_REFRESH_TOKEN = ***
GOOGLE_DRIVE_FOLDER_ID = ***
```

Xong, bây giờ chúng ta có thể truy cập Google Drive như một disk của Storage rồi.
## 3. Tạo file
- Đầu tiên chúng ta tạo file `demo.blade.php` trong `resources/views` để Upload File:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Google Drive Demo</title>
</head>
<body>
    <form action="{{ route('post.file') }}" method="POST">
        <input type="file" name="file">
        <br><br>
        <button type="submit">Upload</button>
    </form>
</body>
</html>
```
- Tạo `DemoController.php`: `php artisan make:controller DemoController`
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DemoController extends Controller
{
    public function store(Request $request)
    {
        $name = $request->file->getClientOriginalName();
        $request->file->storeAs('/', $name, 'google');

        return 'File was saved to Google Drive';
    }
}
```
- File `web.php`:
```php
<?php

Route::get('/', function () {
    return view('demo');
});

Route::post('/', 'DemoController@store')->name('post.file');

```
Bây giờ chúng ta thử Upload 1 file lên thử xem. Ổn, file đã được upload lên Google Drive, tuy nhiên ta có thể thấy rằng thời gian chờ đợi upload khoảng gần 3s cho 1 file ~2Mb. Do đó, việc sử dụng Queue Job ở đây để thực hiện việc upload file là một cách để giải quyết vấn đề trên.

## 4. Tạo Queue Job
- Để chạy queue job trong Laravel đã hỗ trợ kha khá driver, nhưng ở đây để đơn giản mình sẽ sử dụng database để lưu lại Job:
- Tạo table jobs: 
    - `php artisan queue:table`
    - `php artisan migrate`
- Ở file `.env` chúng ta sửa `QUEUE_CONNECTION=database`
- Tạo Job: `php artisan make:job PutFile`, một file `PutFile.php` được tạo ở trong `app/Jobs/`, sửa lại nội dung như sau:
```php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;

class PutFile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $name;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $filePut = Storage::disk('public')->get('/' . $this->name);
        Storage::cloud()->put('/' . $this->name, $filePut);
        Storage::disk('public')->delete('/' . $this->name);
    }
}
```

- Sửa lại file `DemoController.php`:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\PutFile;

class DemoController extends Controller
{
    public function store(Request $request)
    {
        $name = $request->file->getClientOriginalName();
        $request->file->storeAs('/', $name, 'public');
        
        PutFile::dispatch($name);

        return 'File was saved to Google Drive';
    }
}
```
Xong! Bây giờ chúng ta mở Terminal và chạy `php artisan queue:work`. Upload lại thử file và quan sát Job đã được đẩy vào trong hàng đợi và bạn sẽ thấy web được load nhanh hơn.

![](https://images.viblo.asia/5419bab0-16a1-4012-8bc0-8b191e26bd2e.png)

**Giải thích 1 chút:** Do Job không cho phép truyền trực tiếp đối tượng `$request->file` nên ở đây mình upload file lên disk local là public, sau đó ở trong Job mình mới lấy ra file ở local upload lên Google Drive, và cuối cùng là xóa file ở disk local đi.
# Kết luận
Trong bài viết này, mình đã chia sẻ đến mọi người cách để lưu trữ file trên Google Drive kết hợp dùng Queue Job. Bài viết này mình mới chỉ dừng ở mức demo rất đơn giản, hi vọng sẽ giúp ích 1 phần nào đó cho các bạn.
Ngoài việc lưu trữ file các bạn có thể tìm hiểu nhiều hơn với các thao tác xóa file, hay các thao tác với thư mục,...[tại đây](https://github.com/ivanvermeyen/laravel-google-drive-demo). Ngoài ra các bạn cũng có thể thao tác với các Cloud khác như [Amazone S3](https://github.com/thephpleague/flysystem-aws-s3-v3), [Azure](https://github.com/thephpleague/flysystem-azure-blob-storage), [Dropbox](https://github.com/spatie/flysystem-dropbox), ...

# Tham khảo
[BKFA Team](https://www.facebook.com/bkfateam/)

[Laravel & Google Drive Storage](https://github.com/ivanvermeyen/laravel-google-drive-demo)

[Filesystem abstraction for PHP](http://flysystem.thephpleague.com/docs/)

[Laravel Queue](https://laravel.com/docs/5.7/queues)