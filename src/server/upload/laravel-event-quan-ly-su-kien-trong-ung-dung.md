# 1. Laravel Event là gì?
Khi tìm hiểu về Laravel, chúng ta được tiếp xúc với nhiều các khái niệm, cách thức làm việc mới, đơn giản và dễ sử dụng. Laravel Event là một trong số đó, nó chỉ là một phần nhỏ trong những thứ làm nên một Laravel tuyệt vời.

- **Một sự kiện trong máy tính là hành động hay một điều gì đó xảy ra tại một thời điểm xác định bởi một chương trình máy tính và có thể quản lý bằng các chương trình máy tính.** 
- Một vài ví dụ về sự kiện trong Laravel: Một người dùng đăng ký tài khoản mới, Một bài viết mới được đăng, Một người dùng viết bình luận, Một Người dùng like một bức ảnh...
   
# 2. Tại sao sử dụng Laravel Event?
Mình sẽ đưa ra một số lý do cơ bản để thấy được Laravel Event có ý nghĩa như thế nào:

- Laravel Event giúp chúng ta tách biệt các thành phần trong ứng dụng, khi một sự kiện xảy ra, sự kiện không cần biết những gì khác ngoài việc thực thi công việc của nó.
- Không có Laravel Event sẽ phải đặt rất nhiều các code logic ở một chỗ.
- Một lý do nữa khi sử dụng Laravel Event đó là tăng tốc độ trong xử lý dữ liệu ứng dụng. 
    - Ví dụ: Khi một bài viết mới được đăng sẽ gửi mail đến tất cả các thành viên, việc gửi mail đến hàng triệu thành viên sẽ mất khá nhiều thời gian, với Laravel event gửi email sẽ là một trigger khi một bài viết mới được tạo ra. Với cách code cũ trước đây, tất cả xử lý đưa vào tính năng đăng bài mới khiến việc đăng một bài mất rất nhiều thời gian. Một ví dụ khác, khi thanh toán đơn hàng, phải gửi email thông báo đến khách hàng, việc thanh toán đơn hàng là ưu tiên nhất và cần thời gian xử lý cực nhanh đảm bảo trải nghiệm tốt cho khách hàng, nếu email khách hàng nhận hiện đang có vấn đề, xử lý gửi mail sẽ vào một vòng lặp thử liên tục gửi, như vậy việc thanh toán sẽ rất lâu. Với Laravel Event mọi việc được tách biệt rất rõ và tăng tốc trong xử lý dữ liệu ứng dụng.

# 3. Laravel Event hoạt động như thế nào?

Chúng ta đã dần hiểu Laravel Event là gì và lợi ích của nó, tiếp theo chúng ta sẽ đi vào tìm hiểu xem Laravel Event hoạt động như thế nào?

Laravel Event cho phép bạn đăng ký sự kiện và tạo các listener cho rất nhiều các sự kiện xảy ra trong ứng dụng. Các class Event được lưu trữ trong app/Events và các listener được lưu trong app/Listeners. Nếu bạn không thấy hai thư mục này trong project của bạn cũng đừng lo vì các câu lệnh artisan tạo các event, listerner sẽ tự động tạo ra chúng. 

Một event có thể có rất nhiều listerner được tạo ra và các listener này độc lập với nhau. Chúng ta sẽ xem các bước tạo, đăng ký và sử dụng Event, Listerner trong Laravel.

## Bước 1: Định nghĩa Event
Event được tạo ra  bằng cách sử dụng câu lệnh artisan

```php
    php artisan make:event OrderPayment
```

sau khi chạy lệnh, sẽ tạo ra một class **Event** nằm trong **app\Events**:

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

    class OrderPayment
    {
        use Dispatchable, InteractsWithSockets, SerializesModels;

        /**
         * Create a new event instance.
         *
         * @return void
         */
        public function __construct()
        {
            //
        }

        /**
         * Get the channels the event should broadcast on.
         *
         * @return Channel|array
         */
        public function broadcastOn()
        {
            return new PrivateChannel('channel-name');
        }
    }
```

## Bước 2: Tạo Event Listener
Ngay khi một event xảy ra, ứng dụng cần biết để thực hiện các công việc khác, do đó cần có Event Listerner.
Để tạo Listerner ta sử dung lệnh artisan:

```php
    c:\xampp\htdocs\laravel-event>php artisan make:listener SendEmailAfterOrderPayment --event="OrderPayment"
    Listener created successfully.
```

Sau khi chạy lệnh trên, sẽ tạo ra class **SendEmailAfterOrderPayment.php** trong **app\Listerners** như sau:

```php
    <?php

    namespace App\Listeners;

    use App\Events\OrderPayment;
    use Illuminate\Queue\InteractsWithQueue;
    use Illuminate\Contracts\Queue\ShouldQueue;

    class SendEmailAfterOrderPayment
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
         * @param  OrderPayment  $event
         * @return void
         */
        public function handle(OrderPayment $event)
        {
            //
        }
    }
```

Phương thức handle() có tham số đầu vào là một instance của Event mà Listener được gán vào, phương thức này sẽ được dùng để thực hiện các công việc cần thiết để đáp lại Event. 
Instance đầu vào của phương thức cũng chứa cả các giá trị mà Event truyền sang. Ví dụ:

```php
/**
     * Handle the event.
     *
     * @param  OrderPayment  $event
     * @return void
     */
    public function handle(OrderPayment $event)
    {
        //
        $order_amout = $event->order->amount;
       ...
    }
```

Trong trường hợp bạn muốn dừng Event này đến các Listener khác, bạn chỉ cần trả về giá trị false trong phương thức handle() của Listerner đang xử lý.

## Bước 3: Đăng ký Event
Trước khi đến các bước xử lý trong Event, chúng ta cần đăng ký Event.
Mở file **app/Providers/EventServiceProvider.php** và tìm thuộc tính **$listener**.

```php
    protected $listen = [
        'App\Events\OrderPayment' => [
            'App\Listeners\SendEmailAfterOrderPayment',
        ],
    ];
```

Ở đây chúng ta có thể thấy mình đã khai báo Listerner này của Event nào. 

Một Event có thể có nhiều các Listener khác nhau:

```php
    protected $listen = [
        'App\Events\OrderPayment' => [
            'App\Listeners\SendEmailAfterOrderPayment',
            'App\Listeners\SendSMSAfterOrderPayment',
        ],
    ];
```

Ba bước trên có thể được thực hiện đơn giản hơn bằng cách gán Listener cho Event trong file **app/Providers/EventServiceProvider.php** sau đó chạy lệnh:

```php
    c:\xampp\htdocs\laravel-event>php artisan event:generate
    Events and listeners generated successfully!
```

Khi đó, các class trong app\Events và app\Listeners sẽ được tự động tạo ra.

## Bước 4: Tạo ra thông báo sự kiện xảy ra
Khi thực hiện một đoạn code nào đó, muốn thông báo đến hệ thống là sự kiện xảy ra để các listener có thể biết được chúng ta sử dụng **phương thức fire()**.

```php
    use Event;
    use App\Events\OrderPayment;

    // Các xử lý thanh toán đơn hàng ở đây
    $order = new Order;
    $order->amount = 2000000;
    $order->note = 'Tạo đơn hàng mẫu';
    ...
    $order->save();
    // Phần xử lý thanh toán xong, tạo ra thông báo sự kiện xảy ra cho các Listener biết
    event(new OrderPayment($order));
```

Hoặc cũng có thể dùng helper method event để tạo ra thông báo

```php
    use App\Events\OrderPayment;

    // Các xử lý thanh toán đơn hàng ở đây
    ...
    // Phần xử lý thanh toán xong, tạo ra thông báo sự kiện xảy ra cho các Listener biết
    event(new OrderPayment($order));
```

Đối tượng $order sẽ được truyền sang Listener.

## Bước 5 (Tùy chọn): Đưa Event Listener vào hàng đợi
Đôi khi bạn không muốn các event và listener làm ảnh hưởng đến hoạt động của ứng dụng, ví dụ khi người dùng thanh toán đơn hàng không phải chờ đợi thời gian email về thanh toán gửi tới địa chỉ mail người dùng, bạn có thể đưa event listener vào hàng đợi và nó sẽ được quản lý bởi queue driver do bạn xác định. Để làm điều này ta implement Illuminate\Contracts\Queue\ShouldQueue.

```php
    <?php

    namespace App\Listeners;

    use App\Events\OrderPayment;
    use Illuminate\Contracts\Queue\ShouldQueue;

    class SendEmailAfterOrderPayment implements ShouldQueue
    {
        //
    }
```

Khi đó, khi Listener được gọi bởi một Event, nó sẽ tự động được đưa vào hàng đợi bởi hệ thống hàng đợi của Laravel. Nếu không có exception nào xảy ra, queue job sẽ tự động được xóa sau khi nó hoàn thành xử lý.

Laravel còn cho phép truy xuất các Listener trong queue job một cách thủ công bằng các phương thức như delete(), handle(), chú ý phải sử dụng trail Illuminate\Queue\InteractsWithQueue. Đôi khi các job trong hàng đợi cũng có thể gặp lỗi, để xử lý chúng dùng phương thức failed().

```php
    <?php

    namespace App\Listeners;

    use App\Events\OrderShipped;
    use Illuminate\Queue\InteractsWithQueue;
    use Illuminate\Contracts\Queue\ShouldQueue;

    class SendShipmentNotification implements ShouldQueue
    {
        use InteractsWithQueue;

        public function handle(OrderShipped $event)
        {
            if (true) {
                $this->release(30);
            }
        }

        public function failed(OrderShipped $event, $exception)
        {
            //
        }
    }
```

# 4. Ví dụ sử dụng Laravel Event

Ví dụ đặt ra như sau: Khi tạo mới một sản phẩm sẽ gửi email đến quản trị viên liên quan. Quá trình gửi email được xử lý bằng Laravel Event.

## Bước 1: Tạo Event
Tạo class **NewProduct** trong **app\Events\NewProduct.php** bằng câu lệnh:

```php
    c:\xampp\htdocs\laravel-event>php artisan make:event NewProduct
    Event created successfully.
```

## Bước 2: Tạo Listener
Tạo class SendEmailAfterNewProduct trong app\Listener bằng câu lệnh:


```php
    c:\xampp\htdocs\laravel-event>php artisan make:listener SendEmailAfterNewProduct --event="NewProduct"
    Listener created successfully.
```

## Bước 3: Đăng ký Event và gán với Listener
Mở file **EventServiceProvider.php** trong **app\Providers** thêm thuộc tính **$listener** như sau:

```php
     /**
         * The event listener mappings for the application.
         *
         * @var array
         */
        protected $listen = [
            'App\Events\NewProduct' => [
                'App\Listeners\SendEmailAfterNewProduct',
            ],
        ];
```

## Bước 4: Thêm code để hiện thông báo khi sự kiện NewProduct xảy ra và xử lý ở Listener.

Thêm code tạo thông báo sự kiện xảy ra trong phương thức store() ở ProductController.php (app\Controllers).

```php
    use Event;
    use App\Events\NewProduct;
    ...

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'       => 'required|max:255',
            'price'      => 'required|number',
            'content'    => 'required',
            'image_path' => 'required'
        ]);

        if ($validator->fails()) {
            return redirect('product/create')
                    ->withErrors($validator)
                    ->withInput();
        } else {
            // Lưu thông tin vào database
            $active = $request->has('active')? 1 : 0;
            $product_id = DB::table('product')->insertGetId(
                'name'       => $request->input('name'),
                'price'      => $request->input('price'),
                'content'    => $request->input('content'),
                'image_path' => $request->input('image_path'),
                'active'     => $active
                );
            // fire a new product event 
            $product = Product::find($product_id);
            event(new NewProduct($product));
            return redirect('product/create')
                    ->with('message', 'Sản phẩm được tạo thành công với ID: ' . $product_id);
        }
    }
```

Thêm code vào phương thức handle() của Listener SendEmailAfterNewProduct trong app\Listeners, chúng ta tạm thời coi như việc ghi vào file text nội dung tạo sản phẩm mới như là việc gửi email.

```php
    /**
         * Handle the event.
         *
         * @param  NewProduct  $event
         * @return void
         */
        public function handle(NewProduct $event)
        {
            // Tam dung 10 phut
            sleep(600);

            $fileName = $event->product->id . '.txt';
            $data = 'Sản phẩm mới tạo: ' . $event->product->name . ' với ID: ' . $event->product->id; 
            File::put(public_path('/txt/' . $fileName), $data);
            return true;
        }
```

Bây giờ chúng ta kiểm tra xem các đoạn code hoạt động như thế nào. Chúng ta vào đường dẫn http://laravel.dev/admin/product/create. Nhập vào các thông tin về sản phẩm, sau đó click vào Tạo sản phẩm

![](https://images.viblo.asia/8e7f9855-88d8-4684-9fa8-7b9376f974d8.png)

xem trong thư mục public/txt có file text xuất hiện với nội dụng như trong handle().

![](https://images.viblo.asia/575ce3b1-128d-453c-b4e2-59c8e1ee0023.png)

Như ví dụ này chúng ta thấy rằng việc gửi email sau khi tạo sản phẩm mới đã được tách biệt giữa Event và Listener.

# 5. Kết luận
   Vậy là chúng ta đã làm quen với một số thao tác cơ bản khi làm việc với event trong laravel. Như tạo sự kiện, tạo listener, phát đi và lắng nghe sự kiện, xử lý khi nó xảy ra.... Trong ứng dụng trang web có rất nhiều trường hợp cần sử dụng event. Qua bài viết trên, hy vọng sẽ giúp ích cho mọi người về cách sử dụng event trong laravel.