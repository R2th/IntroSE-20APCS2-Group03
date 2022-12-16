## Initialization project

Đầu tiên chúng ta sẽ init một project laravel 
sau đó sẽ config Database Mysql và thiết lập các biến môi trường cho ứng dụng

copy env.example thành .env .

```
cp .env.example .env
DB_HOST=localhost
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
.env
```

Bây giờ sẽ dùng composer để cài đặt các gói của ứng dụng

> composer install
> 
Chạy migrate để tạo ra bảng và sinh ra dữ liệu

> php artisan migrate --seed


Mối quan hệ Users

Chúng ta muốn user có khả năng theo dõi user khác, và theo dõi bởi user khác. do đo chúng ta sẽ tạo ra quan hệ Many To Many. 

> php artisan make:migration create_followers_table --create=followers

Chúng ta cần tạo thêm vài trường để sinh bảng. user_id đại diện cho user người đang theo dõi và follows_id đại diện cho user đang được theo dõi

Cập nhật các trường cho followers

```php
public function up()
{
    Schema::create('followers', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->index();
        $table->integer('follows_id')->index();
        $table->timestamps();
    });
}
```

Chạy migrate để tạo bảng

> php artisan migrate

Gán mới quan hệ cho Model User

```php

// ...
class extends Authenticatable
{
    // ...

    public function followers() 
    {
        return $this->belongsToMany(self::class, 'followers', 'follows_id', 'user_id')
                    ->withTimestamps();
    }

    public function follows() 
    {
        return $this->belongsToMany(self::class, 'followers', 'user_id', 'follows_id')
                    ->withTimestamps();
    }
}
```

app/User.php

Chúng ta cần một vài chức năng cho theo theo dõi người khác, và kiểm tra xem user nào đang được Following

```php
// ...
class extends Authenticatable
{
    // ...
    public function follow($userId) 
    {
        $this->follows()->attach($userId);
        return $this;
    }

    public function unfollow($userId)
    {
        $this->follows()->detach($userId);
        return $this;
    }
    public function isFollowing($userId) 
    {
        return (boolean) $this->follows()->where('follows_id', $userId)->first(['id']);
    }
}
```

app/User.php

### Danh sách Users

Cài đặt  route 

```php

//...
Route::group(['middleware' => 'auth'], function () {
    Route::get('users', 'UsersController@index')->name('users');
    Route::post('users/{user}/follow', 'UsersController@follow')->name('follow');
    Route::delete('users/{user}/unfollow', 'UsersController@unfollow')->name('unfollow');
});
```

routes/web.php

Tao controller mới cho users

> php artisan make:controller UsersController

```php
// ...
use App\User;
class UsersController extends Controller
{
    //..
    public function index()
    {
        $users = User::where('id', '!=', auth()->user()->id)->get();
        return view('users.index', compact('users'));
    }
}
```

app/Http/Controllers/UsersController.php

```php

@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="col-sm-offset-2 col-sm-8">

            <!-- Following -->
            <div class="panel panel-default">
                <div class="panel-heading">
                    All Users
                </div>

                <div class="panel-body">
                    <table class="table table-striped task-table">
                        <thead>
                        <th>User</th>
                        <th> </th>
                        </thead>
                        <tbody>
                        @foreach ($users as $user)
                            <tr>
                                <td clphpass="table-text"><div>{{ $user->name }}</div></td>
                                @if (auth()->user()->isFollowing($user->id))
                                    <td>
                                        <form action="{{route('unfollow', ['id' => $user->id])}}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('DELETE') }}

                                            <button type="submit" id="delete-follow-{{ $user->id }}" class="btn btn-danger">
                                                <i class="fa fa-btn fa-trash"></i>Unfollow
                                            </button>
                                        </form>
                                    </td>
                                @else
                                    <td>
                                        <form action="{{route('follow', ['id' => $user->id])}}" method="POST">
                                            {{ csrf_field() }}

                                            <button type="submit" id="follow-user-{{ $user->id }}" class="btn btn-success">
                                                <i class="fa fa-btn fa-user"></i>Follow
                                            </button>
                                        </form>
                                    </td>
                                @endif
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
```

resources/views/users/index.blade.php

Đường dẫn /users page hiển thị danh sách users.

Class UsersController thêm chức năng flow và unfollow . 

```php
//...
class UsersController extends Controller
{
    //...
    public function follow(User $user)
    {
        $follower = auth()->user();
        if ($follower->id == $user->id) {
            return back()->withError("You can't follow yourself");
        }
        if(!$follower->isFollowing($user->id)) {
            $follower->follow($user->id);

            // sending a notification
            $user->notify(new UserFollowed($follower));

            return back()->withSuccess("You are now friends with {$user->name}");
        }
        return back()->withError("You are already following {$user->name}");
    }

    public function unfollow(User $user)
    {
        $follower = auth()->user();
        if($follower->isFollowing($user->id)) {
            $follower->unfollow($user->id);
            return back()->withSuccess("You are no longer friends with {$user->name}");
        }
        return back()->withError("You are not following {$user->name}");
    }
}
```
app/Http/Controllers/UsersController.php


Notifications

Laravel cung cấp API cho việc gửi thông báo qua nhiều kênh khác nhau

Follow notification: Được gửi khi user  được follow bởi một user khác.

Tạo post notification: Mỗi khi bài viết mới được tạo sẽ gửi đến người follow.

User Followed Notification

Sử dụng artisan commands để tạo ra bảng và dữ liệu mẫu

> php artisan notifications:table

> php artisan migrate

tiếp theo tạo thêm notifi. Chạy lệnh sau để  tạo ra class UserFollowed

> php artisan make:notification UserFollowed
> 
Sau đó chúng ta sẽ cập nhật fle class notification mà chúng ta vừa tạo ra:

```php
class UserFollowed extends Notification implements ShouldQueue
{
    use Queueable;

    protected $follower;

    public function __construct(User $follower)
    {
        $this->follower = $follower;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'follower_id' => $this->follower->id,
            'follower_name' => $this->follower->name,
        ];
    }
}
```

app/Notifications/UserFollowed.php

Bằng cách sử dụng ShouldQueue. Laravel tự đông đẩy Notifi vào trong queue và chạy ngầm, nó làm tăng tốc độ xử lý

```php
// ...
use App\Notifications\UserFollowed;
class UsersController extends Controller
{
    // ...
    public function follow(User $user)
    {
        $follower = auth()->user();
        if ( ! $follower->isFollowing($user->id)) {
            $follower->follow($user->id);

            // add this to send a notification
            $user->notify(new UserFollowed($follower));

            return back()->withSuccess("You are now friends with {$user->name}");
        }
        return back()->withSuccess("You are already following {$user->name}");
    }
    //...
}
```

app/Http/Controllers/UsersController.php

Đánh đấu Notification đã được đọc

Notifi chứa một vài thông tin liên quan đến resource. Ví dụ, khi người dùng nhận được thông báo có bài viết mới, Notifi hiên thị nội dung và khi người dùng click vào nội dung đó thì phải hướng đến bài post mới và cờ phải gán là đã đọc 

Bây giờ tiếp theo chúng ta sẽ phải kiểm tra xem notifi đã được đọc hay chưa

Tạo middleware bằng câu lệnh sau

> php artisan make:middleware MarkNotificationAsRead


```php
class MarkNotificationAsRead
{
    public function handle($request, Closure $next)
    {
        if($request->has('read')) {
            $notification = $request->user()->notifications()->where('id', $request->read)->first();
            if($notification) {
                $notification->markAsRead();
            }
        }
        return $next($request);
    }
}
```

app/Http/Middleware/MarkNotificationAsRead.php

```php
//...
class Kernel extends HttpKernel
{
    //...
    protected $middlewareGroups = [
        'web' => [
            //...

            \App\Http\Middleware\MarkNotificationAsRead::class,
        ],
        // ...
    ];
    //...
}
```

app/Http/Kernel.php

Hiển thị thông báo

```php
// ...
class UsersController extends Controller
{
    // ...
    public function notifications()
    {
        return auth()->user()->unreadNotifications()->limit(5)->get()->toArray();
    }
}
```

app/Http/Controllers/UsersController.php

Notifi trả về ít nhất 5 thông báo chưa đọc. 

```php
//...
Route::group([ 'middleware' => 'auth' ], function () {
    // ...
    Route::get('/notifications', 'UsersController@notifications');
});
```

routes/web.php

Bây giờ thêm dropdown cho notifications

```html
<head>
    <!-- // ... // -->

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>

    <!-- This makes the current user's id available in javascript -->
    @if(!auth()->guest())
        <script>
            window.Laravel.userId = <?php echo auth()->user()->id; ?>
        </script>
    @endif
</head>
<body>
    <!-- // ... // -->
    @if (Auth::guest())
        <li><a href="{{ url('/login') }}">Login</a></li>
        <li><a href="{{ url('/register') }}">Register</a></li>
    @else
        <!-- // add this dropdown // -->
        <li class="dropdown">
            <a class="dropdown-toggle" id="notifications" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <span class="glyphicon glyphicon-user"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="notificationsMenu" id="notificationsMenu">
                <li class="dropdown-header">No notifications</li>
            </ul>
        </li>
<!-- // ... // -->
    
```
resources/views/layouts/app.blade.php

> npm install

Thêm code sau vào app.js

```javascript
window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

var notifications = [];

const NOTIFICATION_TYPES = {
    follow: 'App\\Notifications\\UserFollowed'
};
```
app/resources/assets/js/app.js

```javascript
//...
$(document).ready(function() {
    // check if there's a logged in user
    if(Laravel.userId) {
        $.get('/notifications', function (data) {
            addNotifications(data, "#notifications");
        });
    }
});

function addNotifications(newNotifications, target) {
    notifications = _.concat(notifications, newNotifications);
    // show only last 5 notifications
    notifications.slice(0, 5);
    showNotifications(notifications, target);
}
```

app/resources/assets/js/app.js

```javascript
//...
function showNotifications(notifications, target) {
    if(notifications.length) {
        var htmlElements = notifications.map(function (notification) {
            return makeNotification(notification);
        });
        $(target + 'Menu').html(htmlElements.join(''));
        $(target).addClass('has-notifications')
    } else {
        $(target + 'Menu').html('<li class="dropdown-header">No notifications</li>');
        $(target).removeClass('has-notifications');
    }
}
```
app/resources/assets/js/app.js

```javascript
//...

// Tạo ra chuỗi Notifi
function makeNotification(notification) {
    var to = routeNotification(notification);
    var notificationText = makeNotificationText(notification);
    return '<li><a href="' + to + '">' + notificationText + '</a></li>';
}

// get the notification route based on it'sotifi
function routeNotification(notification) {
    var to = '?read=' + notification.id;
    if(notification.type === NOTIFICATION_TYPES.follow) {
        to = 'users' + to;
    }
    return '/' + to;
}

// get the notification text based on it's type
function makeNotificationText(notification) {
    var text = '';
    if(notification.type === NOTIFICATION_TYPES.follow) {
        const name = notification.data.follower_name;
        text += '<strong>' + name + '</strong> followed you';
    }
    return text;
}
```

app/resources/assets/js/app.js

Thêm file app.scss c
//... 
#notifications.has-notifications {
  color: #bf5329
}
app/resources/assets/sass/app.scss

> npm run dev

> php artisan make:notification NewPost

```php
// ..
use App\Post;
use App\User;
class NewArticle extends Notification implements ShouldQueue
{
    // ..
    protected $following;
    protected $post;

    public function __construct(User $following, Post $post)
    {
        $this->following = $following;
        $this->post = $post;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'following_id' => $this->following->id,
            'following_name' => $this->following->name,
            'post_id' => $this->post->id,
        ];
    }
}
```

app/Notifications/NewArticle.php

Tạo observer của Post và lắng nghe sự kiện với class: app/Observers/PostObserver.php

```php
namespace App\Observers;

use App\Notifications\NewPost;
use App\Post;

class PostObserver
{
    public function created(Post $post)
    {
        $user = $post->user;
        foreach ($user->followers as $follower) {
            $follower->notify(new NewPost($user, $post));
        }
    }
}
```

Sau đó đăng ký observer của AppServiceProvider:

```php
//...
use App\Observers\PostObserver;
use App\Post;

class AppServiceProvider extends ServiceProvider
{
    //...
    public function boot()
    {
        Post::observe(PostObserver::class);
    }
    //...
}
```

app/Providers/AppServiceProvider.php

Tạo ra định dang message
```php
// ...
const NOTIFICATION_TYPES = {
    follow: 'App\\Notifications\\UserFollowed',
    newPost: 'App\\Notifications\\NewPost'
};

//...
function routeNotification(notification) {
    var to = `?read=${notification.id}`;
    if(notification.type === NOTIFICATION_TYPES.follow) {
        to = 'users' + to;
    } else if(notification.type === NOTIFICATION_TYPES.newPost) {
        const postId = notification.data.post_id;
        to = `posts/${postId}` + to;
    }
    return '/' + to;
}

function makeNotificationText(notification) {
    var text = '';
    if(notification.type === NOTIFICATION_TYPES.follow) {
        const name = notification.data.follower_name;
        text += `<strong>${name}</strong> followed you`;
    } else if(notification.type === NOTIFICATION_TYPES.newPost) {
        const name = notification.data.following_name;
        text += `<strong>${name}</strong> published a post`;
    }
    return text;
}
```

app/resources/assets/js/app.js
## Pusher là gì
Pusher là một kênh giao tiếp thời gian thực giữa server, apps và thiết bị, Pusher được sử dụng cho  notifications, chat, gaming và nhiều hệ thống yêu cầu giao tiêp thời gian thực

![](https://images.viblo.asia/7d1a7556-420d-4e73-bcfa-36fab56df96a.png)

Pusher xử lý thời gian thực thông qua cơ chế hỗ  trợ giao tiếp 2 chiều WebSockets tới ứng dụng web, điện thoại di động hoặc bất kỳ thiết bị kết nối Internet nào khác. 

Xem thêm tại đây: https://pusher.com/docs

Đăng ký tài khoản miễn phí tại  pusher.com

```
...
BROADCAST_DRIVER=pusher
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_APP_ID=
...
```
Cài đặt tài khoản bên trong file cấu hình broadcasting:
```php
    //...
    'connections' => [

            'pusher' => [
                //...
                'options' => [
                    'cluster' => 'eu',
                    'encrypted' => true
                ],
            ],
    //...
```
config/broadcasting.php

Thêm App\Providers\BroadcastServiceProvider vào trong  providers .

```php
// ...
'providers' => [
    // ...
    App\Providers\BroadcastServiceProvider
    //...
],
//...
```

config/app.php

Cài đặt thêm Pusher’s PHP SDK cho Laravel
> composer require pusher/pusher-php-server
> 
> npm install --save laravel-echo pusher-js

Chúng ta có thế gán thông báo đến broadcast. Để cập nhật thông báo đến UserFollowed
```php
class UserFollowed extends Notification implements ShouldQueue
{
    // ..
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }
    //...
    public function toArray($notifiable)
    {
        return [
            'id' => $this->id,
            'read_at' => null,
            'data' => [
                'follower_id' => $this->follower->id,
                'follower_name' => $this->follower->name,
            ],
        ];
    }
}
```

app/Notifications/UserFollowed.php

Thêm bài viết mới:

```php
//...
class NewPost extends Notification implements ShouldQueue
{

    //...
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }
    //...
    public function toArray($notifiable)
    {
        return [
            'id' => $this->id,
            'read_at' => null,
            'data' => [
                'following_id' => $this->following->id,
                'following_name' => $this->following->name,
                'post_id' => $this->post->id,
            ],
        ];
    }
}
```

app/Notifications/NewPost.php

```php
// ...
window.Pusher = require('pusher-js');
import Echo from "laravel-echo";

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-pusher-key',
    cluster: 'eu',
    encrypted: true
});

var notifications = [];
//...

$(document).ready(function() {
    if(Laravel.userId) {
        //...
        window.Echo.private(`App.User.${Laravel.userId}`)
            .notification((notification) => {
                addNotifications([notification], '#notifications');
            });
    }
});
```

app/resources/assets/js/app.js

Như vậy mình đã làm xong một ví dụ đơn giản, từ ví dụ này, các bạn có thể tự phát triển vào project của mình những ý tưởng khác nhau, như là chức năng bình luận thời gian thực, chat real time…vv..


![](https://images.viblo.asia/ae03eb3e-e9aa-44c3-8fd0-918b4b9ef4e3.gif)

Refs : Sourse Code 

https://github.com/hoanghungict/realtimeNoti

https://pusher.com/docs/

https://www.sitepoint.com/add-real-time-notifications-laravel-pusher/