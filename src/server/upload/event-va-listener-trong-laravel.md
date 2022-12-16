## 1. Event là gì?
Event là một sự kiện, một hành động xảy ra trong hệ thống ở một thời điểm xác định. Các sự kiện có thể phát sinh từ hành động của người dùng hoặc tự phát sinh trong nội bộ của hệ thống. Ứng dụng của event trong lập trình là rất lớn, không chỉ Laravel mà rất nhiều framework PHP khác, rộng hơn nữa là các ngôn ngữ lập trình khác đều sử dụng event. Event cho phép chúng ta chèn một đoạn mã xử lý khác vào mã hiện tại tại những điểm nhất định. Bạn có thể đính kèm đoạn mã tùy chỉnh vào một sự kiện, để khi sự kiện được kích hoạt thì đoạn mã trên sẽ tự động được thực thi. Các đoạn mã này chính là các Listener: các đối tượng sẽ được gọi để xử lý khi sự kiện được kích hoạt.

Một ví dụ đơn giản là bạn cần gửi một email welcome thành viên mới mỗi khi có người dùng đăng ký tài khoản thành công. Hiểu theo logic code sẽ là khi sự kiện đăng ký thành công đươc kích hoạt thì sẽ hệ thống sẽ tự động gửi email chào mừng thành viên mới. Event ở đây là hành động đăng ký thành công, Listener là đối tượng email (phần mã phụ trách việc gửi email tới người dùng).

Event giúp cho chúng ta có thể tách các đoạn xử lý khác ra khỏi bussiness logic hiện tại mà không ảnh hưởng đến xử lý hiện tại. Một sự kiện phát sinh có thể được xử lý bởi rất nhiều lớp xử lý khác nhau và hoàn toàn tách biệt.

Trong Laravel, các lớp sự kiện sẽ được đặt trong app/Events, các lớp lắng nghe được đặt trong app/Listeners.

Laravel cung cấp nhiều cách khác nhau để triển khai Event & Listener, tuy nhiên nó chỉ xoay quanh 4 điểm chính, nắm được 4 điểm này thì chúng ta hoàn toàn có thể tùy ý triển khai:
```
1. Định nghĩa một event

2. Định nghĩa một listener

3. Mapping giữ listener và event: Khai báo cho listener biết cần lắng nghe sự kiện nào

4. Khởi tạo một event
```

## 2. Đăng ký event & listener 
Cũng chính là khai báo event nào sẽ được lắng nghe bởi listener nào. Laravel cung cấp 2 cách chính để đăng ký event & listener.

- Đăng ký trong EventServiceProvider

- Tự đăng ký event (sử dụng helper hoặc facede Laravel cung cấp)

Ngoài ra còn 1 số phương pháp khác như sử dụng event auto discovery, event subscribers cũng tương tự.

## 3. Khai báo event
Là đăng ký một class mang tính chất như một data container chứa các thông tin của event. Class này hầu như không có logic gì mà chỉ gán thông tin cần thiết vào event. Tạo mới một event sử dụng command `php artisan event:generate` nếu chúng ta đã khai báo đầy đủ trong mảng $listen trong EventServiceProvider, hoặc command `php artisan make:event Event`

Một ví dụ về class PostViewedEvent để khai báo sự kiện khi bài viết được xem.

```
class PostViewedEvent
{
    use SerializesModels;

    public $post;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }
}
```

Đây là event được gọi mỗi khi bài viết được xem để tăng số lượng xem của bài viết (view_count), class chỉ thực hiện duy nhất việc gán đối tượng $post được xem vào data của event.

Lưu ý: ở đây ta có thể gán trực tiếp một Eloquent model Post vào hàm __construct vì đã sử dụng trait SerializesModels. model sẽ được serialized và unserialized khi job được thực thi.

## 4. Khai báo listener
Listener là class để handle các sự kiện và thực thi xử lý logic. Listener nhận một instance của đối tượng event trong hàm **handle()**. Tại đây ta có thể truy xuất các thông tin của đối tượng phát sinh event. Một ví dụ cho listener PostViewedListener xử lý sự kiện xem bài viết bên trên:

```
class PostViewedListener
{

    /**
     * Handle the event.
     *
     * @param object $event
     * @return void
     */
    public function handle($event)
    {
        $post = $event->post;

        // @TODO: process logic here
        $post->increment('view_count');
    }
}
```

## 5. Cách khởi tạo một event
Để bắn ra một sự kiện, Larvel cung cấp 2 phương thức là sử dụng helper Event hoặc static method dispatch (event cần phải sử dụng trait Dispatchable)

## 6. Queued Event Listeners
Bản chất Laravel là chạy tuần tự các bước, do đó có một số task nặng và tốn thời gian xử lý (gửi email là một ví dụ như thế) sẽ vẫn ảnh hưởng tới hiệu năng của hệ thống. Khi đó bạn sẽ muốn tách riêng các nghiệp vụ xử lý này ra một luồng xử lý khác. Laravel đã cung cấp rất nhiều giải pháp cho việc đó, Queued Event Listeners là một ví dụ.

Bản chất của việc này là Laravel sẽ đẩy dữ liệu của event vào một queue để xử lý sau, queue này có thể lưu trữ ở database hoặc redis và một số queue backend khác, bạn có thể cấu hình nó trong **config/queue.php**. Việc này cũng tương đương với các khái niệm job, task scheduling mà có thể bạn sẽ bắt gặp trong Laravel.

Để chạy các listener để xử lý các event này, bạn cần setup hệ thống job listener chạy để xử lý các sự kiện:
```
php artisan queue:work
```

Lưu ý rằng, chạy command này thì phần code xử lý sẽ được lưu vào bộ nhớ, do đó khi có sự thay đổi về code xử lý, bạn cần restart lại queue sử dụng command:

```
php artisan queue:restart
```

Chi tiết hơn xem bạn có thể xem tại Laravel [docs](https://laravel.com/docs/7.x/queues).

## 7. Event Subscribers
Event subscriber là một class cho phép bạn đăng ký nhiều event + handler xử lý trong cùng 1 class. Subscriber cần phải có một phương thức subscribe, và cần được đăng ký trong **EventServiceProvider** sử dụng thuộc tính **$subscribe**:

```
<?php

namespace App\Listeners;

class PostEventListener
{
    /**
     * Handle post viewed events.
     */
    public function onPostViewed($event)
    {
    }

    /**
     * Handle post created events.
     */
    public function onPostCreated($event)
    {
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param Illuminate\Events\Dispatcher $events
     */
    public function subscribe($events)
    {
        $events->listen(
            'App\Events\PostViewedEvent',
            'App\Listeners\PostEventListener@onPostViewed'
        );

        $events->listen(
            'App\Events\PostCreatedEvent',
            'App\Listeners\PostEventListener@onPostCreated'
        );
    }
}
```

Và đăng ký trong **EventServiceProvider**:

```
<?php

namespace App\Providers;

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

    protected $subscribe = [
        'App\Listeners\PostEventListener',
    ];
}
```

## 8. Broadcasting Event
Tương tự queued event, tuy nhiên cách thức và mục đích của broadcasting event có hơi khác biệt. Broadcasting event thường được sử dụng với mục đích real time, có tính chất thông báo, cập nhật thay đổi cho client. Để làm việc này, Laravel cung cấp một biện pháp đơn giản để `broadcast` các event qua một kết nối websocket. Phía client front-end sẽ thông qua websocket này để nhận dữ liệu cập nhật từ server. Về phía client, Laravel cũng cung cấp sẵn package Laravel Echo để xử lý các broadcast event. (https://laravel.com/docs/7.x/broadcasting#receiving-broadcasts)

Muốn sử dụng broadcast, ngoài việc phải config queue listener, bạn cần config backend cho broadcast tại config/broadcasting.php. Laravel hỗ trợ một số driver backend như Pusher Channels, Redis và log (để test local). Nếu muốn bỏ hoàn toàn việc broadcast, bạn chỉ cần config broadcaster này về null. Về việc vì sao phải cấu hình queue listener thì là  Laravel thiết kế mọi broadcast event đều được xếp hàng vào queue xử lý để không ảnh hưởng tới xử lý của hệ thống chính.

Để triển khai broadcast event, chúng ta chỉ cần implement interface **Illuminate\Contracts\Broadcasting\ShouldBroadcast** trong event class. Interface này sẽ yêu cầu class phải có phương thức broadcastOn, phương thức này sẽ trả về kênh mà sự kiện sẽ được phát trên đó.

```
<?php

namespace App\Events;

use App\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class OrderCreated implements ShouldBroadcast
{
    use SerializesModels;

    public $order;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('order.'.$this->order->id);
    }
}
```

## 9. Kết thúc
Như vậy chúng ta đã nắm được cơ bản về event trong Laravel cũng như một số kỹ thuật nâng cao hơn như queued event, event broadcasts. Cám ơn các bạn đã theo dõi.