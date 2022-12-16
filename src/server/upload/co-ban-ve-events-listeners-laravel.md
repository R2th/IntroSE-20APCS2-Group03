# Cơ bản về Events và Listeners Laravel
Theo chị Google thì **Events** là sự kiện, một hành động nào đó rất quan trọng sẽ xảy ra. **Listener** có thể hiểu là người lắng nghe. Như vậy nếu hiểu theo ý hiểu của dân code chúng ta thì **Events** là một hành động hoặc sự kiện nào đó của người dùng tương tác với hệ thống còn **Listeners** chính là nơi lắng nghe, nắm bắt những hành động hoặc sự kiện và sau đó thực hiện các hành động sau đó. 
Tuy nhiên nếu hiểu theo ý như vậy thì chúng ta dùng Controller trong Laravel cũng sẽ được vậy, tại sao phải dùng **Events và Listener** làm gì cho rắc rối.  

Chúng ta hãy bắt đầu với một ví dụ cụ thể nhé: Người dùng thanh toán và giỏ hàng và việc của hệ thống là bắt sự kiện sau đó gửi email xác nhận giỏ hàng vào email của người dùng (ví dụ rất quen thuộc đúng không :)).  Nếu dùng theo Controller của Laravel thì khi user click vào nút thanh toán, ta sẽ gọi lên Controller xử lý và gửi mail trong đó. Tuy nhiên chúng ta đều biết là chức năng gửi email là một time-consuming task (task mất nhiều thời gian để xử lý) nên mỗi lần user click  nút thanh toán giỏ hàng sẽ phải chờ thêm thời gian khá lâu để hệ thống gửi mail cho họ => trải nghiệm người dùng không tốt. Ngoài ra chúng ta đều biết trong một hệ thống có thể có rất nhiều hành động cần xác nhận gửi mail cho người dùng nên nếu dùng theo Controller thì chúng ta sẽ phải viết đoạn xử lý gửi mail ở rất nhiều chỗ => vi phạm nguyên lý DRY (dont repeat yourself) trong lập trình. Giờ thì hãy thử dùng **Events và Listener** để thấy sự khác biệt nhé.

## Khởi tạo Events và Listener
Trong Laravel, các Events mặc đinh được đặt trong thư mục `app/Events` còn Listeners được đặt trong `app/Listeners`. Ngoài cách tạo các thư mục đó bằng tay, Laravel hỗ trợ dùng lệnh artisan tự động sinh ra hai thư mục trên trong source code của bạn: 
```
php artisan event:generate
```
Tất nhiên đó chỉ là nơi lưu trữ các file events và listener, chúng ta cần phải định nghĩa để Laravel hiểu Events nào được Listeners nào nghe. Lúc này bạn hãy vào thư mục `app/Providers`, ta sẽ thấy file `EventServiceProvider.php` đó là nơi ta sẽ gắn từng event vào các listener: 
```
/**
 * The event listener mappings for the application.
 *
 * @var array
 */
protected $listen = [
    'App\Events\OrderShoppingCart' => [
        'App\Listeners\SendMailConfirmShoppingCart',
    ],
];
```
Biến `$listen` là một array trong đó ta sẽ khai báo các event và listener muốn gắn với nhau. Ở đây ví dụ ta gắn event `OrderShoppingCart` được lắng nghe bởi `SendMailConfirmShoppingCart`.

## Định nghĩa Events
Một Event class là nơi chứa các thông tin liên quan của event đó. Ví dụ ta tạo một event `OrderShoppingCart`:
```
<?php

namespace App\Events;

use App\Order;
use Illuminate\Queue\SerializesModels;

class OrderShoppingCart
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
```
File event không chứa bất kì logic xử lý nào, nó chỉ nhận đầu vào là dữ liệu Order cần xử lý.

## Định nghĩa Listeners
Một Listener class là nơi xử lý logic sau khi bắt được event.
```
<?php

namespace App\Listeners;

use App\Events\OrderShoppingCart;

class SendMailConfirmShoppingCart
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrderShoppingCart  $event
     * @return void
     */
    public function handle(OrderShoppingCart $event)
    {
        // Access the order using $event->order...
    }
}
```
Ở đây ta thấy mọi logic xử lý đều sẽ được viết trong function `handle` và hàm này nhận biến vào chính là event mà nó lắng nghe.

## Sử dụng Queue trong Listener
Một điểm mà mình thực sự thích ở Events & Listener chính là chúng ta có thể sử dụng queue trong listener bằng cách `implements` interface `ShouldQueue` trong class Listener  . Nó giúp ích rất nhiều khi logic đòi hỏi phải xử lý những việc tốn nhiều thời gian như gửi email.
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
## Kích hoạt Events
Khi mọi thứ đã được thiết lập đầy đủ thì vấn đề cuối cùng là làm sao để có thể gọi đến Events mình đã setup. Khi bạn sử dụng lệnh artisan để sinh ra events và listener thì lúc đó bạn có thể gọi events ở bất kì đầu bạn muốn: 
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

        event(new OrderShoppingCart($order));
    }
}
```


Trên là những kiến thức cơ bản về Events & Listeners Laravel, các bạn có thể tham khảo thêm tại : 
[Laravel Events & Listener](https://laravel.com/docs/5.8/events)