> Bài này chúng ta sẽ cùng tìm hiểu về cách sử dụng Event trong laravel 5.8 nhé. 😃
## Introduction
 Laravel cung cấp, triển khai event một cách đơn giản, cho phép bạn đăng ký và lắng nghe các event  khác nhau xảy ra trong ứng dụng của bạn. Các lớp sự kiện thường được lưu trữ trong thư mục `app/Events` , trong khi trình nghe của chúng được lưu trữ trong `app/Listeners`. Đừng lo lắng nếu bạn không thấy các thư mục này trong ứng dụng của mình, vì chúng sẽ được tạo cho bạn khi bạn tạo các event  và trình nghe bằng các lệnh của artisan console commands.

Các event  đóng vai trò là một cách tuyệt vời để tách rời các khía cạnh khác nhau của ứng dụng của bạn, một event  có thể có nhiều người nghe không phụ thuộc vào nhau. Ví dụ: bạn có thể muốn gửi thông báo Slack cho người dùng của mình mỗi khi đơn hàng được giao. Thay vì ghép mã xử lý đơn đặt hàng của bạn với mã thông báo Slack, bạn có thể đưa ra một sự kiện `OrderShipped`, người nghe có thể nhận và chuyển đổi thành thông báo Slack.

## Registering Events & Listeners

`EventServiceProvider` đi kèm trong Laravel cung cấp một vị trí tiện ích cho việc đăng kí tất cả các event listener. Thuộc tính `listen` chứa một mảng tất cả các events (khoá) và listeners của chúng (values). Dĩ nhiên, bạn có thể thêm vào bao nhiêu events tuỳ ý trong mảng này nếu như ứng dụng yêu cầu. Ví dụ thêm cho `OrderShipped event`.

```
   /**
 * The event listener mappings for the application.
 *
 * @var array
 */
protected $listen = [
    'App\Events\OrderShipped' => [
        'App\Listeners\SendShipmentNotification',
    ],
];
```

### Generating Events & Listeners

Việc tạo file thủ công cho từng event và listener khá là khó khăn. Vì thế, bạn có thể thêm event với listener vào trong `EventServiceProvider` và sử dụng câu lệnh `event:generate` để tạo các file cho event và listener cho những event, và listener được khai vào trong `EventServiceProvider`. Những event và listener nào đã tồn tại trước đó rồi thì sẽ được để nguyên:
```
 php artisan event:generate
```
### Manually Registering Events

Về cơ bản, event cần được đăng kí vào trong `EventServiceProvider` trong mảng `$listen`; tuy nhiên, bạn cũng có thể tự đăng kí với event dispatcher bằng cách sử dụng `Event` facade hoặc contract `Illuminate\Contracts\Events\Dispatcher`:
```
    /**
     * Register any other events for your application.
     *
     * @param  \Illuminate\Contracts\Events\Dispatcher  $events
     * @return void
     */
    public function boot(DispatcherContract $events)
    {
        parent::boot($events);

        $events->listen('event.name', function ($foo, $bar) {
            //
        });
    }
```
#### Wildcard Event Listeners

Bạn có thể đăng kí các listener sử dụng dấu wildcard `*`, cho phép bạn bắt nhiều event trong cùng một listener. Wildcard listener nhận toàn bộ mảng dữ liệu trong một đối số truyền vào:
```
    $events->listen('event.*', function (array $data) {
        //
    });
```
## Event Discovery
Thay vì đăng ký các event thủ công trong mảng $listen  của  EventServiceProvider, bạn có thể kích hoạt  sự kiện tự động. Khi phát hiện sự kiện được bật, Laravel sẽ tự động tìm và đăng ký các sự kiện và người nghe của bạn bằng cách quét thư mục ứng dung. Ngoài ra, mọi sự kiện được xác định rõ ràng được liệt kê trong `EventServiceProvider` sẽ vẫn được đăng ký.

Phát hiện sự kiện bị tắt theo mặc định, nhưng bạn có thể kích hoạt nó bằng cách ghi đè phương thức `ShouldDiscoverEvent`s của `EventServiceProvider`.
```
/**
 * Get the listener directories that should be used to discover events.
 *
 * @return array
 */
protected function discoverEventsWithin()
{
    return [
        $this->app->path('Listeners'),
    ];
}
```

## Defining Events

Một event class đơn giản chỉ là một data container chứa thông tin liên quan tới event. Ví dụ, giả dụ chúng ta có tạo ra event `OrderShipped` và nhận vào một  `Eloquent ORM`.
```
   <?php

namespace App\Events;

use App\Order;
use Illuminate\Queue\SerializesModels;

class OrderShipped
{
    use SerializesModels;

    public $order;

    /**
     * Create a new event instance.
     *
     * @param  \App\Order  $order
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }
}
/**
     * Handle the event.
     *
     * @param  \App\Events\OrderShipped  $event
     * @return void
     */
    public function handle(OrderShipped $event)
    {
        // Access the order using $event->order...
    }
}
```
Như bạn thấy, event class này không có chứa logic nào. Nó đơn giản chỉ là một container cho đối tượng `Podcast` được mua. Trait `SerializeModels` sử dụng bởi event sẽ thực hiện serialize bất cứ Eloquent model nào nếu như đối tượng event được serialize sử dụng hàm `serialize` của PHP.
### Stopping The Propagation Of An Event
Đôi khi, bạn có thể muốn ngừng việc truyền bá một event đến những người nghe khác. Bạn có thể làm như vậy bằng cách trả về false từ phương thức lắng nghe của handle .

## Queued Event Listeners
Queued có thể có lợi nếu người nghe của bạn sẽ thực hiện một nhiệm vụ chậm như gửi e-mail hoặc thực hiện một yêu cầu HTTP. Trước khi bắt đầu với trình nghe xếp hàng, hãy đảm bảo định cấu hình hàng đợi của bạn và bắt đầu trình nghe hàng đợi local hoặc development environment.

Để xác định một event nắng nghe queued, add the ShouldQueue interface to the listener class. Listeners được tạo vởi event:generate Artisan command a được nhập vào không gian tên hiện tại, vì vậy bạn có thể sử dụng nó ngay lập tức:
```
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    //
}
```

Bây giờ, khi listener  này được gọi cho một sự kiện, nó sẽ tự động được xếp hàng bởi  điều phối sự kiện bằng hệ thống queue của Laravel. Nếu không có ngoại lệ nào được đưa ra khi người nghe được thực thi bởi hàng đợi, công việc được xếp hàng sẽ tự động bị xóa sau khi xử lý xong.
### Customizing The Queue Connection & Queue Name
Nếu bạn muốn tùy chỉnh kết nối hàng đợi, tên hàng đợi hoặc thời gian trì hoãn hàng đợi của event lisener, bạn có thể xác định các thuộc tính $Connection, $queue hoặc $delay trên listener  class:
```
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    /**
     * The name of the connection the job should be sent to.
     *
     * @var string|null
     */
    public $connection = 'sqs';

    /**
     * The name of the queue the job should be sent to.
     *
     * @var string|null
     */
    public $queue = 'listeners';

    /**
     * The time (seconds) before the job should be processed.
     *
     * @var int
     */
    public $delay = 60;
}
```

#### Manually Accessing The Queue

Nếu bạn cần truy xuất vào queue qua hai hàm `delete` và `release`, bạn có thể thêm vào trait `Illuminate\Queue\InteractsWithQueue` đã được import sẵn, và bạn có thể sử dụng hai hàm này:

   ```
   <?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrderShipped  $event
     * @return void
     */
    public function handle(OrderShipped $event)
    {
        if (true) {
            $this->release(30);
        }
    }
}
   ```
   
### Handling Failed Job
Đôi khi queued event listeners có thể thất bại. Nếu queued listener Nếu người nghe xếp hàng vượt quá số lần thử tối đa như được xác địnhhương thức thất bại sẽ được gọi trên trình nghe của bạn. Phương thức thất bại nhận được cá thể sự kiện và ngoại lệ gây ra lỗi:

```
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrderShipped  $event
     * @return void
     */
    public function handle(OrderShipped $event)
    {
        //
    }

    /**
     * Handle a job failure.
     *
     * @param  \App\Events\OrderShipped  $event
     * @param  \Exception  $exception
     * @return void
     */
    public function failed(OrderShipped $event, $exception)
    {
        //
    }
}
```

### Dispatching Events
Để gửi một event, bạn có thể chuyển một thể hiện của event cho event helper. Helper sẽ gửi sự kiện đến tất cả những event đã đăng ký của nó. Vì trình trợ giúp sự kiện có sẵn globally , bạn có thể gọi nó từ bất kỳ đâu trong ứng dụng của bạn
```
<?php

namespace App\Http\Controllers;

use App\Order;
use App\Events\OrderShipped;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * Ship the given order.
     *
     * @param  int  $orderId
     * @return Response
     */
    public function ship($orderId)
    {
        $order = Order::findOrFail($orderId);

        // Order shipment logic...

        event(new OrderShipped($order));
    }
}
```

## Event Subscribers

Event subscriber là class mà bạn có thể dùng để đăng kí nhiều event bên trong class, và bạn có thể tạo ra các event handler khác nhau chỉ trong một class. Subscriber cần khai báo một hàm `subscribe`, mà sẽ được truyền vào trong event dispatcher:
```
    <?php

    namespace App\Listeners;

    class UserEventListener
    {
        /**
         * Handle user login events.
         */
        public function onUserLogin($event) {}

        /**
         * Handle user logout events.
         */
        public function onUserLogout($event) {}

        /**
         * Register the listeners for the subscriber.
         *
         * @param  Illuminate\Events\Dispatcher  $events
         */
        public function subscribe($events)
        {
            $events->listen(
                'App\Events\UserLoggedIn',
                'App\Listeners\UserEventListener@onUserLogin'
            );

            $events->listen(
                'App\Events\UserLoggedOut',
                'App\Listeners\UserEventListener@onUserLogout'
            );
        }

    }
```
#### Registering Event Subscribers
Khi mà subscriber được tạo, nó sẽ được đăng kí với event dispatcher. Bạn có thể đăng kí subscriber sử dụng thuộc tính `$subscribe` trong `EventServiceProvider`. Ví dụ, hãy thêm vào `UserEventListener`.
```
    <?php

    namespace App\Providers;

    use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
    use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

    class EventServiceProvider extends ServiceProvider
    {
        /**
         * The event listener mappings for the application.
         *
         * @var array
         */
        protected $listen = [
            //
        ];

        /**
         * The subscriber classes to register.
         *
         * @var array
         */
        protected $subscribe = [
            'App\Listeners\UserEventListener',
        ];
    }

```

Bài viết của mình đến đây là hết hẹn gặp lại các bạn ở các bài viết tiếp theo. 😄

Tài liệu tham khảo:

https://en.wikipedia.org/wiki/Laravel

https://laravel.com/docs/5.8/events