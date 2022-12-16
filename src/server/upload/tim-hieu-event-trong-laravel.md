Xin chào anh em, cũng đã khá lâu mình mới lại viết bài chia sẻ về những điều thú vị trong Laravel. Để tiếp tục series **Laravel và những điều thú vị** này , hôm nay mình sẽ cùng tìm hiểu và chia sẻ về **Event** trong Laravel nhé.
# 1. Event là gì ?
`Event` là sự kiện , là một hành đông hay một tác vụ nào đó xả ra ở một thời điểm xác định. Trong những hệ thống web của chúng ta cũng có rất nhiều sự kiện xảy ra. Ví dụ như sự kiện một sản phẩm mới vừa được tạo, hay sự kiện khi chúng ta nhấn vào một button nào đỏ, hay đổi khi trên Facebook chúng ta cũng có những nut like, dislike cũng là một sự kiện...vv. Đôi khi chúng ta cần xử lý những sự kiện này hay nói một cách khác đó chính là cần một phản hồi lại cho user khi kích hoạt một sự kiện nào đó trong hệ thống của chúng ta. Để làm được điều này thì thật may mắn Laravel cũng cấp cho chúng ta cái gọi là `Event`. Để dễ hiểu hơn một chút thì trong bài viết này mình sẽ đưa ra một ví dụ thực tế cụ thể  đó chính là khi một chương trình quảng cáo được tạo ra thì chúng ta se gửi mail cho người dùng hệ thống.
# 2. Ví dụ cụ thể
## 2.1 Đặt vấn đề
Bài toán của chúng ta đưa ra là gửi mail cho tất cả người dùng hệ thống khi có một chương trình quảng cáo được tạo ra.
## 2.2 Thực thi bài toán
Giả sử bảng discounts của chúng ta chỉ có các trường sau : id, title,content, created_at, updated_at cho nó đơn giản nhé. Các bước tạo model, migration các bạn tự tạo nhé, nếu bạn nào chưa rỏ cách tạo model và migration có thể tham khảo [Eloquent Model](https://viblo.asia/p/tim-hieu-eloquent-trong-laravel-phan-1-eloquent-model-database-QpmleBAo5rd) và [Migration](https://viblo.asia/p/tim-hieu-ve-migration-trong-laravel-bWrZn1MpKxw) của mình ở đây nhé.
### 2.2.1 Tạo Event và Listener
Tiếp theo chúng ta sẽ tạo event và listener nhé, folder chứa sự kiện là `app\Events`, folder chứa listener là `app\Listeners`. Nhưng ban đầu khi init project Laravel thì các bạn sẽ không thấy đâu, chúng ta có thể tự tạo hoặc sử dụng hỗ trợ command line Artisan. Chúng ta có 2 cách để tạo sự kiện và listener bằng command line

```PHP
php artisan make:event DiscountEvent
// và chúng ta tạo listerner tương ứng cho sự kiện này
php artisan make:listener SendEmailDiscountEvent --event="DiscountEvent"
//sau khi tạo ra event là listener ở trên chúng ta phải vào app/Providers/EventServiceProvider.php để khai báo
protected $listen = [
    'App\Events\DiscountEvent' => [
        'App\Listeners\SendEmailDiscountEvent'
    ],
];
```

hoặc là chúng ta sẽ khai báo trước trong `app/Providers/EventServiceProvider.php` như trên và sau đó sử dụng câu lệnh sau để generate ra event và listener  
```PHP
php artisan event:generate
```
Mình thì hay dùng cách thứ 2 hơn vì nó nhanh gọn :)
### 2.2.2 Cách định nghĩa Event và Listener
```PHP
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Discount;

class SendEmailUser
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $discount;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Discount $discount)
    {
        $this->discount = $discount;
    }
}
```
Như chúng ta thấy event này của chúng ta không chứa bất cứ logic nào. Nó đơn giản là một container cho đối tượng `Discount`.

Tiếp theo khi sự kiện đã được kích hoạt thì chúng ta cần một phản hồi lại cho sự kiện, lúc đó `Listener` sẽ đảm nhận nhiệm vu này
```PHP
namespace App\Listeners;

use App\Events\DiscountEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ListenerSendEmailEvent
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
     * @param  Discount  $event
     * @return void
     */
    public function handle(DiscountEvent $event)
    {
        //
    }
```
Phương thức `handle()` với tham số đầu vào là một instance của Event mà Listener được gán vào. Phương thức này sẽ được dùng để thực hiện các công việc cần thiết để phản hồi hay đáp lại Event mà nó theo dõi. Instance đầu vào của phương thức này cũng chứa cá các giá trị mà Event truyền sang. Ví dụ ta sẽ xử lý sự kiện mà mình đã nếu trong bài toán của chúng ta như sau:
```PHP
public function handle(DiscountEvent $event)
{
    $users = User::all();
    foreach ($users as $user) {
        Mail::to($user->email)
            ->send(new SendEmailUser($event->discount));
    }
}
```
Trong phương thức `hanlde()` trên nếu bạn muốn ngừng cái hồi đáp từ listener cho event thì bạn có thể return `false` để dừng ngay những phản hồi đó.
Các bạn có thể tham khảo [bài viết](https://viblo.asia/p/gui-email-trong-laravel-ap-dung-voi-gmail-KE7bGoB4M5e2) này để hiểu rõ hơn về cách gửi mail nhé.
Một vấn đề ở đây là nếu gửi mail cho tất cả các thành viên khi ấn submit bài post thì sẽ cực kỳ lâu. Các bạn có thể tìm hiểu `BackgroudJob`, trong Laravel nó là [Queue](https://laravel.com/docs/5.6/queues). Các bạn có thể xếp event listener vào hàng đợi để quá trình khi submit bài post không bị chờ đợi load quá lâu.
### 2.2.3. Queue
Việc gửi mail cho tất cả người dùng trong hệ thống là khá tốn thời gian. Thay vì khi submit một chương trình discount phải chờ đợi cho nó load hết để gửi hết mail cho mọi người thì chúng ta có thể gác việc gửi mail sang một bên bằng cách đưa việc gửi mail vào hàng đợi và gửi dần sau đó. Để áp dụng Queue cho listener ta chỉ cần implement interface `ShouldQueue` vào listener 
```PHP
use Illuminate\Contracts\Queue\ShouldQueue;
class SendMailDiscountEvent implements ShouldQueue
{
    //...
}
```
### 2.2.3.Kích hoạt Event.
Có rất nhiều cách để kích hoạt Event trong Laravel, các bạn tham khảo một số cách sau nhé. Cách đầu tiên chúng ta sẽ sử dụng helper `event`.
```PHP
public function store(Request $request)
{
    $discount = new Discount();
    $discount->title = $request->title;
    $discount->content = $request->content;
    $discount->save();
  
    event(new DiscountEvent($discount));
    
    return redirect()->route('discounts');
}
```
Cách thứ 2 chúng ta sẽ sử dụng Facade `Event`
```PHP
public function store(Request $request)
{
    $discount = new Discount();
    $discount->title = $request->title;
    $discount->content = $request->content;
    $discount->save();
  
    Event::fire('discount', ['discount' => $discount]);
    
    return redirect()->route('discounts');
}
```
Xong rồi trong app/Providers/EventServiceProvider.php chúng ta cần đăng ký listener nào sẽ phục vụ sự kiện này.
```PHP
public function boot()
{
        parent::boot();

        Event::listen('discount', 'App\Events\DiscountEvent');
}
```
# 3. Tổng kết
Vậy qua những chia sẻ của mình ở trên về `Events` trong Laravel cũng giúp các bạn mường tượng được Event trong Laravel nó là cái gì, nó cũng không phức tạp lắm để tiếp cận với nó . Mong rằng qua bài chia sẻ của mình có ịch đối với các bạn. Cảm ơn các bạn đã đọc bài chia sẻ của mình.
# 4. Tham khảo
https://laravel.com/docs/5.6/events#manually-accessing-the-queue