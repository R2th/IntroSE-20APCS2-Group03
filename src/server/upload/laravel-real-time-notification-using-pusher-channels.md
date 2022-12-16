### Realtime là gì ?

Chắc ai cũng biết rồi. Ứng dụng realtime hiểu nôm na là ứng dụng tương tác với người dùng theo thời gian thực. ex: notifications, chat, gaming, web-page updates, newsfeed facebook....

### Pusher là gì?

Pusher là một dịch vụ cloud, cung cấp cho người dùng 1 Server ảo làm trung gian xử lý các dữ liệu với thời gian thực. Dễ dàng sử dụng, tích hợp nhanh vào app, rút ngắn thời gian dev .

**Cách thức hoạt động**

![](https://images.viblo.asia/9be11205-1dcb-4c49-b3f1-7ec8303cb82e.png)

Client duyệt web - > dữ liệu sẽ được chuyến đến sever-> sever chuyển tiếp đến Pusher  thông qua pusher API -> Pusher trả kết  lại cho client .

Pusher cung cấp cho chúng ta 3 options. Gói free (100 Max Connections
200k Messages / Day) thế là đủ sài thoải mái rồi, nếu ứng  dụng lớn thì cần nâng cấp gói cao hơn.

![](https://images.viblo.asia/23035309-bf71-4365-aee0-d6643c905ca5.png)

### Example

![](https://images.viblo.asia/3098ab1b-dd1c-4a14-85ed-6248c4b8162e.gif)

### Các Bước Thực hiện

##### 1. Install Laravel 5.6

```php
composer create-project --prefer-dist laravel/laravel demo_notification
```

#### 2. Install pusher-php-server Package

```php
composer require pusher/pusher-php-server
```
#### 3. Setup Pusher

Step 1. Đầu tiên bạn cần đăng ký 1 account tại địa chỉ. [https://pusher.com/](https://pusher.com/) 

Step 2. Sau đó tạo 1 Pusher channels

![](https://images.viblo.asia/a73ae156-4523-4b26-91cd-100c7398833d.png)

Step 3. Sau khi tạo xong bạn sẽ thấy app_id, key, secret, cluster
![](https://images.viblo.asia/165aec04-7a79-411d-9c44-cb8d49ca97f5.png)

Step 4. Config .env

```
BROADCAST_DRIVER=pusher

PUSHER_APP_ID=xxxxx
PUSHER_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
PUSHER_APP_SECRET=xxxxxxxxxxxxxxxxxx
PUSHER_APP_CLUSTER=xxx
```

Sau khi chỉnh sửa file .env nhớ run cmd sau, để các variable đc active.
```
$php artisan config:clear
$php artisan cache:clear
```
Step 5: config/app.php
Loại bỏ comment 
```
App\Providers\BroadcastServiceProvider::class
```

#### 4. Create event

```php
php artisan make:event Notify
```

Nội dung file: app\event\Notify.php

```php
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class Notify
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $title;

    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->title = $data['title'];
        $this->message  = $data['content'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('send-message');
    }
}


```

##### 5. Create Controller

```php
php artisan make:controller SendMessageController
```

Nội dung:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;

class SendMessageController extends Controller
{
    public function index()
    {
        return view('send_message');
    }
    public function sendMessage(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required'
        ]);
        
        $data['title'] = $request->input('title');
        $data['content'] = $request->input('content');

        $options = array(
            'cluster' => 'mt1',
            'encrypted' => true
        );

        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            $options
        );

        $pusher->trigger('Notify', 'send-message', $data);

        return redirect()->route('send');
    }
}

```

##### 6. Create Route

```php
Route::get('/', function () {
    return view('welcome');
});
Route::get('/send', 'SendMessageController@index')->name('send');
Route::post('/postMessage', 'SendMessageController@sendMessage')->name('postMessage');
```
##### 7. Create View
**welcome.blade.php**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Demo Application</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://skywalkapps.github.io/bootstrap-notifications/stylesheets/bootstrap-notifications.css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Demo App</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="dropdown dropdown-notifications">
                    <a href="#notifications-panel" class="dropdown-toggle" data-toggle="dropdown">
                        <i data-count="0" class="glyphicon glyphicon-bell notification-icon"></i>
                    </a>

                    <div class="dropdown-container">
                        <div class="dropdown-toolbar">
                            <div class="dropdown-toolbar-actions">
                                <a href="#">Mark all as read</a>
                            </div>
                            <h3 class="dropdown-toolbar-title">Notifications (<span class="notif-count">0</span>)</h3>
                        </div>
                        <ul class="dropdown-menu">
                        </ul>
                        <div class="dropdown-footer text-center">
                            <a href="#">View All</a>
                        </div>
                    </div>
                </li>
                <li><a href="#">Timeline</a></li>
                <li><a href="#">Friends</a></li>
            </ul>
        </div>
    </div>
</nav>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://js.pusher.com/4.3/pusher.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<script type="text/javascript">
    var notificationsWrapper   = $('.dropdown-notifications');
    var notificationsToggle    = notificationsWrapper.find('a[data-toggle]');
    var notificationsCountElem = notificationsToggle.find('i[data-count]');
    var notificationsCount     = parseInt(notificationsCountElem.data('count'));
    var notifications          = notificationsWrapper.find('ul.dropdown-menu');


    // Enable pusher logging - don't include this in production
     Pusher.logToConsole = true;

    var pusher = new Pusher('{{env('PUSHER_APP_KEY')}}', {
        cluster: 'mt1',
        encrypted: true
    });

    // Subscribe to the channel we specified in our Laravel Event
    var channel = pusher.subscribe('Notify');

    // Bind a function to a Event (the full Laravel class)
    channel.bind('send-message', function(data) {
        var existingNotifications = notifications.html();
        var avatar = Math.floor(Math.random() * (71 - 20 + 1)) + 20;
        var newNotificationHtml = `
          <li class="notification active">
              <div class="media">
                <div class="media-left">
                  <div class="media-object">
                    <img src="https://api.adorable.io/avatars/71/`+avatar+`.png" class="img-circle" alt="50x50" style="width: 50px; height: 50px;">
                  </div>
                </div>
                <div class="media-body">
                  <strong class="notification-title">`+data.title+`</strong>
                  <p class="notification-desc">`+data.content+`</p>
                  <div class="notification-meta">
                    <small class="timestamp">about a minute ago</small>
                  </div>
                </div>
              </div>
          </li>
        `;
        notifications.html(newNotificationHtml + existingNotifications);

        notificationsCount += 1;
        notificationsCountElem.attr('data-count', notificationsCount);
        notificationsWrapper.find('.notif-count').text(notificationsCount);
        notificationsWrapper.show();
    });
</script>
</body>
</html>
```

**send_mesage.balde.php**

```html
<div class="container">
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <form action="{{route('postMessage')}}" method="post">
        @csrf
        <label for="fname">Title</label>
        <input type="text" id="title" name="title" placeholder="Your Title..">

        <label for="subject">Content</label>
        <textarea id="content" name="content" placeholder="Write something.." style="height:200px"></textarea>

        <input type="submit" value="Submit">

    </form>
</div>

<style>
    /* Style inputs with type="text", select elements and textareas */
    input[type=text], select, textarea {
        width: 100%; /* Full width */
        padding: 12px; /* Some padding */
        border: 1px solid #ccc; /* Gray border */
        border-radius: 4px; /* Rounded borders */
        box-sizing: border-box; /* Make sure that padding and width stays in place */
        margin-top: 6px; /* Add a top margin */
        margin-bottom: 16px; /* Bottom margin */
        resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
    }

    /* Style the submit button with a specific background color etc */
    input[type=submit] {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    /* When moving the mouse over the submit button, add a darker green color */
    input[type=submit]:hover {
        background-color: #45a049;
    }

    /* Add a background color and some padding around the form */
    .container {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
        width: 500px;
        margin: 0 auto;
    }
    .alert-danger { color: red}
</style>
```
Sau khi đã tạo blade xong, bạn bật console của browser lên để kiểm tra app của mình đã được kết nối với pusher hay chưa, nếu connect k thành công thì bạn kiểm tra lại các biến PUSHER_APP_XX trong file .env nhé.  

![](https://images.viblo.asia/d5371bde-9a13-408c-8be5-e6d8a74884d4.png)

Đây là form send message:

![](https://images.viblo.asia/4d4b04a6-8690-4902-8d4b-c0effa5d67b3.png)

#### 8. Test

Bây giờ test xem nó hoạt động thế nào.
![](https://images.viblo.asia/3098ab1b-dd1c-4a14-85ed-6248c4b8162e.gif)

Như vậy là kết thúc rồi, hy vọng sẽ giúp ích cho mọi người, (thankyou) !!!

Nguồn tham khảo [https://pusher.com/](https://pusher.com/tutorials/web-notifications-laravel-pusher-channels)