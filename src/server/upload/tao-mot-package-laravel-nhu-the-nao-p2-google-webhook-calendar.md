Ở trong [phần một](https://viblo.asia/p/tao-mot-package-laravel-nhu-the-nao-p1-bWrZnwX9lxw) mình đã giới thiệu với các bạn một số bước cơ bản để setup cơ bản để chúng ta bắt tay vào tạo một package laravel. Trong series này mình cùng các bạn tạo package `Google webhook calendar`. Package này sẽ giúp chúng ta tích hợp các tài khoản google calendar của mình và các event trên tài khoản google calendar đó

![](https://images.viblo.asia/5d47c609-76b0-47c5-8c66-8e1ff8b7b479.jpg)


Package sẽ sử dụng webhook của google để tự động thực hiện việc cập nhật các event khi có sự thay đổi trên google calendar

Đầu tiên chúng ta sẽ phân tích một số vấn đề trước khi bắt tay vào code:
- Một User sẽ có nhiều GoogleAccount
- Một GoogleAccount sẽ có nhiều calendar. GoogleAccount sẽ có các thuộc tính sau:
    - google_id
    - name
    - token
- Một calendar sẽ có nhiều event. Calendar sẽ có các thuộc tính sau:
    - google_id
    - timeZone
    - summary
- Event:
    - event_id
    - summary
    - description
    - creator
    - startTime
    - endTime
    - link

Các bạn có thể vào https://developers.google.com/calendar/v3/reference để test và xem các event trả về những dữ liệu gì và chúng ta cần những dữ liệu nào để xác định các thuộc tính. Ở đây mình chỉ lấy một số thuộc tính cơ bản 
## Tạo migration
Dựa vào các thuộc tính và các bạn thêm khóa chính khóa ngoại cho các bảng tương ứng nữa chúng ta sẽ có các trường của từng thực thể để chúng ta tạo migration

Chúng ta tạo migration cho package bằng cách vào folder `database/migrations` ở trong package và tạo bằng tay hoặc chúng ta sử dụng command tạo migration mà Laravel đã cũng cấp cho chúng ta rồi sau đó move file migration đã tạo vào thư mục `database/migrations` của package

Ví dụ: Mình sẽ tạo một file migration của `GoogleAccount`,  thư mục sẽ được đặt ở `packages/lyhuynh/googlewebhookcalendar/src/database/migrations`, nội dung file sẽ như sau:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGoogleAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('google_accounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');
            $table->string('google_id');
            $table->string('name');
            $table->json('token');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('google_accounts');
    }
}
```
Tương tự, chúng ta sẽ tạo file migration cho `Calendar` và `Event`

Sau khi tạo xong làm sao project của chúng ta nhận được các file `migrations` từ package mà chúng ta đã tạo để migrate. Để nhận được file này thì chúng ta phải load các file migration này vào project, để thực hiện điều đó thì chúng ta vào file `GoogleWebhookCalendarServiceProvider` và thêm dòng này vào function `boot`:
```php
$this->loadMigrationsFrom(__DIR__.'/database/migrations');
```
Sau khi thêm thì chúng ta có thể vào thư mục gốc của project để thực hiện migrate

## Tạo Model
Tương tự với cách tạo `migration` chúng ta sẽ tạo model trong thư mục `packages/lyhuynh/googlewebhookcalendar/src/Models`. Và các bạn phải chú ý đến namespace của các models này

## Thêm file Route
Để kiểm tra xem project của chúng ta đã load được package mà chúng ta đã tạo hay chưa. Bên trong thư mục routes của package chúng ta tạo file `web.php` để định nghĩa các route của chúng ta ở đây. 

Trong file web.php có nội dung như sau:
```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return "Test package google webhook calendar";
});
```

Sau khi thêm file này chúng ta thử chạy server và mở `http://localhost:8000/test` kết quả màn hình sẽ thông báo `not found`. Vì project của chúng ta chưa load được file `route` của package

Để xử lý vấn đề này thì chúng ta phải vào service provider của package `GoogleWebhookCalendarServiceProvider` và load route ở trong function `boot()`. Sau khi thêm function này sẽ như sau:
```php
...
public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/routes/web.php');
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');
    }
...
```
- `__DIR__` đề cập đến thư mục hiện tại chứa tệp.
- `/routes/web.php` đề cập đến thư mục route của chúng ta sẽ tạo cho package của mình, thư mục này sẽ nằm trong thư mục src của chúng ta, không phải các tuyến Laravel mặc định.

Sau khi thêm bạn mở lại `http://localhost:8000/test` để kiểm tra 
Ở file này sau chúng ta sẽ sử dụng để định nghĩa các route cần thiết cho package
## Kết nối Google API
Để kết nối với Google API chúng ta install apiclient của google:
```
composer require google/apiclient
```
Sau đó, chúng ta vào `https://console.developers.google.com/` tạo project. Các bạn lưu ý khi tạo project trên console developer của google thì enable `Google Calendar API` và `Google+ API`.

Tiếp theo chúng ta tạo `Credentials` ở đây chúng ta lưu ý chọn `Web application` để tạo. Sau khi tạo xong thì google sẽ cung cấp cho chúng ta `Client ID` và `Client secret`. Ở `Credentials` chúng ta sẽ đăng ký một url `GOOGLE_REDIRECT_URI` để khi thực hiện việc lâý resource qua google. Tiếp theo là `GOOGLE_WEBHOOK_URI` để nhận các event khi thực hiện việc cập nhật các event trên google calendar

Tiếp đến chúng ta sẽ `Domain verification` việc này bắt buộc vì để nhận được webhook notifications từ google. Ở bước này chúng ta có thể sử dụng local tunel như `ngrok.io`, `serveo.net`, `localhost.run`,... để public local của chúng ta và thực hiện `Domain verification` ở trên `https://console.developers.google.com/` trong project của chúng ta đã tạo

Các variable này chúng ta sẽ để ở file `.env` của project:
```
APP_URL=example.serveo.net

GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
GOOGLE_WEBHOOK_URI="${APP_URL}/google/webhook"
```

## Config Google Service
Ở trong file `config/services.php` chúng ta thêm config của google:
```php
...
'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect_uri' => env('GOOGLE_REDIRECT_URI'),
        'webhook_uri' => env('GOOGLE_WEBHOOK_URI'),
        'scopes' => [
            \Google_Service_Oauth2::USERINFO_EMAIL,
            \Google_Service_Calendar::CALENDAR,
        ],
        'approval_prompt' => 'force',
        'access_type' => 'offline',
        'include_granted_scopes' => true,
    ],
...
```

Để kiểm soát service của google dễ dàng hơn thì trong package mình sẽ tạo một file service `Google`:
```php
...
protected $client;

function __construct()
{
    $client = new \Google_Client();
    $client->setClientId(config('services.google.client_id'));
    $client->setClientSecret(config('services.google.client_secret'));
    $client->setRedirectUri(config('services.google.redirect_uri'));
    $client->setScopes(config('services.google.scopes'));
    $client->setApprovalPrompt(config('services.google.approval_prompt'));
    $client->setAccessType(config('services.google.access_type'));
    $client->setIncludeGrantedScopes(config('services.google.include_granted_scopes'));
    $this->client = $client;
}

public function service($service)
{
    $classname = "Google_Service_$service";

    return new $classname($this->client);
}

public function __call($method, $args)
{
    if (! method_exists($this->client, $method)) {
        throw new \Exception("Call to undefined method '{$method}'");
    }

    return call_user_func_array([$this->client, $method], $args);
}
...
```
Trong service thì trong hàm `__construct()`thì sẽ khởi tạo các config cơ bản của service Google. Trong quy ước của google api khi tạo một service là Google_Service_Abc($client) trong đó Abc là tên service mà chúng ta muốn sử dụng
## Kết luận
Trong bài viết này thì mình đã giới thiệu về các project của chúng ta tạo và load route, model, migration và config cũng như setup một số bước cần thiết để sử dụng dịch vụ google calendar của google api. Trong bài viết tiếp theo chúng ta sẽ thực hiện việc quản lý google account và fetch data từ google calendar. Cảm ơn các bạn đã theo dõi bài viết <3