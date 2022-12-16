*Bài dịch từ trang [laravel-news.com](https://laravel-news.com/laravel-model-events-getting-started)*

Các sự kiện Model Laravel cho phép bạn tham gia vào các điểm khác nhau trong vòng đời của Model và thậm chí có thể ngăn không cho thao tác lưu hoặc xóa xảy ra. Laravel model events documentation phác thảo cách bạn có thể kết nối vào các sự kiện này với các class sự kiện, nhưng bài viết này nhằm mục đích xây dựng và điền vào một vài chi tiết bổ sung về thiết lập các events và listeners.

# Events Overview
Eloquent có nhiều sự kiện mà bạn có thể gắn vào và thêm chức năng tuỳ chỉnh vào Model của bạn. Model có các sự kiện sau đây tại thời điểm bài viết này được thực hiện.
* retrieved
* creating
* created
* updating
* updated
* saving
* saved
* deleting
* deleted
* restoring
* restored

Đây là cách chúng hoạt động được lấy từ documentation, và bạn có thể vọc vào lớp Model để xem chúng hoạt động như thế nào:
```
The retrieved event will fire when an existing model is retrieved from the database. When a new model is saved for the first time, the creating and created events will fire. If a model already existed in the database and the save method is called, the updating / updated events will fire. However, in both cases, the saving / saved events will fire.
```

Tài liệu cung cấp một cách tổng quan và giải thích làm thế nào để móc được vào những sự kiện này, nhưng hãy đọc thêm nếu bạn mới sử dụng hoặc không quen thuộc với cách kết nối event listeners với các custom model event này.

# Registering Events
Điều đầu tiên bạn cần làm để móc vào một event trên model của bạn là sử dụng $dispatchesEvents property để đăng ký event objects, thứ sẽ chạy thông qua phương thức HasEvents::fireCustomModelEvent(), và sẽ được gọi thông qua phương thức fireModelEvent(). Phương thức fireCustomModelEvent() nhìn sẽ giống như thế này:

```
/**
 * Fire a custom model event for the given event.
 *
 * @param  string  $event
 * @param  string  $method
 * @return mixed|null
 */
protected function fireCustomModelEvent($event, $method)
{
    if (! isset($this->dispatchesEvents[$event])) {
        return;
    }

    $result = static::$dispatcher->$method(new $this->dispatchesEvents[$event]($this));

    if (! is_null($result)) {
        return $result;
    }
}
```

Một số sự kiện, chẳng hạn như xóa, sẽ kiểm tra xem sự kiện có trả về sai và sau đó quay trở lại hoạt động đó. Ví dụ: bạn có thể sử dụng móc này để thực hiện một số kiểm tra và ngăn người dùng tạo hoặc xóa. Sử dụng App\User model làm ví dụ, đây là cách bạn có thể cấu hình model event của mình:

```
protected $dispatchesEvents = [
    'saving' => \App\Events\UserSaving::class,
];
```

Bạn có thể sử dụng lệnh artisan make:event để tạo sự kiện này cho bạn, nhưng về cơ bản đây là những gì bạn sẽ thấy:

```
<?php

namespace App\Events;

use App\User;
use Illuminate\Queue\SerializesModels;

class UserSaving
{
    use SerializesModels;

    public $user;

    /**
     * Create a new event instance.
     *
     * @param \App\User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
```

Class event của chúng ta cung cấp $user property công khai để bạn có thể truy cập vào User model instance trong saving event. Bước tiếp theo để có được công việc này là thiết lập một listener thực tế cho event. Khi mô hình User model kích hoạt saving event, listeners sẽ được gọi, do đó cho phép chúng tôi có thể sử dụng mô hình trong sự kiện này. 

# Creating an Event Listener
Giờ đây, User model event tùy chỉnh của chúng taã kích hoạt trong quá trình lưu, chúng tôi cần phải đăng ký một listener cho nó. Chúng ta sẽ xem xét sử dụng một model observer, nhưng tôi muốn hướng dẫn bạn cách cấu hình một event và lister cho một sự kiện. Event listener giống như bất kỳ Laravel event listener nào khác, và phương thức handle()  sẽ chấp nhận một instance của App\Events\UserSaving event class.

Bạn có thể sử dụng php artisan make:listener, đây là những gì bạn tạo ra.

```
<?php

namespace App\Listeners;

use App\Events\UserSaving as UserSavingEvent;

class UserSaving
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\UserSavingEvent $event
     * @return mixed
     */
    public function handle(UserSavingEvent $event)
    {
        app('log')->info($event->user);
    }
}
```
Tôi chỉ cần thêm một cuộc gọi đến logger để tôi có thể kiểm tra các model truyền cho listener bây giờ. Để làm việc này, chúng ta cần đăng ký người nghe trong thuộc tính EventServiceProvider::$listen property:
```
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        \App\Events\UserSaving::class => [
            \App\Listeners\UserSaving::class,
        ],
    ];

    // ...
}
```
Bây giờ khi model truyền evente này, listener của chúng tôi đã được đăng ký và bây giờ được gọi trong suốt sự kiện saving. 


# Trying out the Event Handler
Chúng tôi có thể cung cấp cho event listener code của chúng tôi một thử với một tinker session:
```
php artisan tinker
>>> factory(\App\User::class)->create();
=> App\User {#794
     name: "Aiden Cremin",
     email: "josie05@example.com",
     updated_at: "2018-03-15 03:57:18",
     created_at: "2018-03-15 03:57:18",
     id: 2,
   }
```

Nếu bạn đã đăng ký event và listener chính xác, bạn sẽ thấy một JSON representation của model trong tệp laravel.log:

```
[2018-03-15 03:57:18] local.INFO: {"name":"Aiden Cremin","email":"josie05@example.com"}  
```

Lưu ý rằng tại thời điểm này model không có thuộc tính created_at hoặc updated_at. Nếu bạn gọi save() một lần nữa trong model, log sẽ có một bản ghi mới với timestamps vì saving event được kích hoạt trên cả created records và existing records:

```
>>> $u = factory(\App\User::class)->create();
=> App\User {#741
     name: "Eloisa Hirthe",
     email: "gottlieb.itzel@example.com",
     updated_at: "2018-03-15 03:59:37",
     created_at: "2018-03-15 03:59:37",
     id: 3,
   }
>>> $u->save();
=> true
>>>
```

# Stopping a Save
Một số model events cho phép bạn ngăn hành động này không được tiến hành. Trong ví dụ của chúng ta, giả sử chúng ta không muốn cho phép lưu model của bất kỳ người dùng nào có tên Paul ở trong thuộc tính $user->name.
```
/**
 * Handle the event.
 *
 * @param  \App\Events\UserSaving $event
 * @return mixed
 */
public function handle(UserSaving $event)
{
    if (stripos($event->user->name, 'paul') !== false) {
        return false;
    }
}
```

Trong phương thức Eloquent Model::save(), là kiểm tra event này sẽ dừng việc lưu trữ xảy ra dựa trên kết quả của event handler.

```
public function save(array $options = [])
{
    $query = $this->newQueryWithoutScopes();

    // If the "saving" event returns false we'll bail out of the save and return
    // false, indicating that the save failed. This provides a chance for any
    // listeners to cancel save operations if validations fail or whatever.
    if ($this->fireModelEvent('saving') === false) {
        return false;
    }
```

Phương thức save () là một ví dụ điển hình về các custom events của bạn có thể khai thác vào vòng đời của model và làm việc một cách thụ động như log data hoặc dispatch a job.

# Using Observers

Nếu bạn đang nghe nhiều events, bạn sẽ thấy thuận tiện hơn khi sử dụng observer class để nhóm nhiều events trong cùng một class.
```
<?php

namespace App\Observers;

use App\User;

class UserObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function created(User $user)
    {
        //
    }

    /**
     * Listen to the User deleting event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function deleting(User $user)
    {
        //
    }
}
```

Bạn đăng ký các observers thông qua một service provider trong phương thức boot ().
```
/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    User::observe(UserObserver::class);
}
```