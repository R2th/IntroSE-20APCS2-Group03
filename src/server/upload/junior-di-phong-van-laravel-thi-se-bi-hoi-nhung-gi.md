Đã bao giờ bạn tự hỏi rằng đi phỏng vấn thì sẽ bị hỏi những câu hỏi như thế nào. Đã bao giờ bạn tự đặt mình vào vị trí NTD (nhà tuyển dụng) chưa. Thử đặt mình vào đó để xem bạn đã tự hỏi và tự trả lời được những gì nhé. 

Trong lúc rảnh rỗi thì mình có ngồi tự bịa ra một số câu hỏi và tự tìm kiếm câu trả lời khi đi phỏng vấn. Tất cả chúng đều là những câu hỏi liên quan đến Laravel và ở mức độ junior (theo ý kiến của mình).


Mình làm như vậy vừa để ôn lại lí thuyết cũng như củng cố lại kiến thức đã học và làm. Mời các bạn tham khảo phía dưới đây. 
### 1. Event và Listener là gì? Dùng khi nào? Tại sao dùng? Ví dụ?
Trả lời: Là sự kiện - đúng nghĩa đen luôn. Mình tìm hiểu trên docs và tài liệu về Event là gì cũng thấy toàn cái khó hiểu.

Thế nên mình lấy một số ví dụ cho dễ hiểu nhé. Nhiều lắm ý. Ví dụ như như sinh nhật crush, crush có người yêu mới, chia tay người yêu...
và rất rất nhiều. :D 

Khi nào dùng Event nhỉ. Lấy ví dụ cho dễ chứ nói không cũng không hay. Mình sẽ áp dụng ngay một số event ở trên nhé. 

>Hôm nay thứ 6 ngày 13, crush bảo là có người yêu mới. Vì quá buồn và chán. Bạn quyết định ngồi nhà làm một chai bia 333 về uống. Ngẫm lại một lúc, bạn lại nghĩ rằng uống bia có hại cho sức khỏe, thế là bạn thay đổi ý định bằng cách đi mua luôn 1 chai rượu nếp cái hoa vàng rồi kiếm 1 người bạn thân tâm sự về chuyện của mình.

Vậy ra là **Event** là bạn đang buồn vì chuyện của crush, còn **Listener** chính là việc bạn lắng nghe cái event đó như thế nào. Đây là hai khái niệm rất liên quan đến nhau mà gần như chắc chắn bạn sẽ dính khi đi phỏng vấn.

Lý do mình dùng Event thay vì không phải dùng trực tiếp trong Controller đó là khi bạn muốn cập nhật dữ liệu của bảng khác mà không phải gọi nó lặp lại trong Controller. Chưa kể đến việc xử lý theo từng event sẽ rất khác nhau, sẽ có những đoạn rất dài và cồng kềnh. 

Ví dụ mình đang là viết một bài post, khi viết bài mình muốn bài viết của mình là sẽ là bài hot ngay lập tức. Thay vì việc xét bài viết của mình thành bài viết hot tại hàm xử lý của Controller, mình sẽ tách ra làm một event SetHotPost và một Listener để handle event này. Sau đó sẽ dùng Controller gọi đến event này. 

Sắp tới, vì mình là admin nên mình muốn có chức năng one click để thay đổi trạng thái set bài viết hot mà không cần phải chạy vào để edit nữa. Mình sẽ lại viết thêm một hàm xử lý khác và gọi đến event SetHotPost vừa rồi. Như vậy sẽ tiện hơn khá nhiều. Giả sử cái hàm event SetHotPost này nó có 100 dòng, nếu có 2 Controller gọi đến nó thì bạn sẽ đều phải lặp lại 100 dòng code kia. Vi phạm nguyên tắc DRY (Don't repeat your self) - lặp code. 
### 2. Queue là gì? Tại sao lại phải dùng Queue? Có mấy loại? Ví dụ về sử dụng Queue?
Lại hỏi là gì à. (yaoming).

Trong cuộc sống, bạn sẽ thường gặp phải những tình huống phải triển khai nhiều công việc đồng thời, và dân gian thường nói rằng: Việc dễ thì làm trước, khó làm sau. Queue của Laravel được xây dựng như vậy => Trích của bạn Đào Thái Sơn. 

Tại sao dùng Queue.  Queue giúp chúng ta phân phối các task, cân bằng không gây trì trệ cho các task sắp tới. Có 2 loại Queue là Queue đồng bộ và Queue bất đồng bộ. 

Queue hỗ trợ chúng ta rất nhiều các connection. Có thể xem ở file `queue.php`
```php
'connections' => [
    'sync' => [
        'driver' => 'sync',
    ],

    'database' => [
        'driver' => 'database',
        'table' => 'jobs',
        'queue' => 'default',
        'retry_after' => 90,
    ],

    'beanstalkd' => [
        'driver' => 'beanstalkd',
        'host' => 'localhost',
        'queue' => 'default',
        'retry_after' => 90,
        'block_for' => 0,
    ],

    'sqs' => [
        'driver' => 'sqs',
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
        'queue' => env('SQS_QUEUE', 'your-queue-name'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'redis' => [
        'driver' => 'redis',
        'connection' => 'default',
        'queue' => env('REDIS_QUEUE', 'default'),
        'retry_after' => 90,
        'block_for' => null,
    ],

],
```

Ví dụ về sử dụng Queue: Lại quay lại câu chuyện trên cùng về Event và Listener. Bạn vẫn đang buồn vì chuyện tình yêu của bản thân. Tuy nhiên bạn rút ra được rằng, nên từ bỏ. Bạn online Facebook và đăng một cái status:
![](https://images.viblo.asia/7db3f781-985d-45b2-8b70-edc971f5034d.png)

Lại giả sử bạn có một 1k người follows, sẽ nhận thông báo khi bạn đăng bài. Thì 1k người này sẽ nhận được thông báo khi bạn đăng cái status kia. Và Queue sẽ thực hiện tuần tự việc gửi mail chứ không gửi đùng 1 cái hết sạch luôn được. 

**Bonus** : Việc gửi mail không phải do Laravel trực tiếp gửi mà phải gửi qua một bên - gọi là bên thứ 3. Có một số service gửi mail mà mình hay dùng như sendgrid, mailtrap.... Tuy nhiên bên thứ 3 này giới hạn số lượt request theo thời gian mà họ đề ra. Với sendgrid bạn có thể thực hiện tối đa 10.000 request/sec. Mỗi email bao gồm tối đa 1000 người nhận. Hơn nữa việc gửi mail nếu không có queue sẽ có thể khiến cho phần cứng của bạn bị nghẽn cổ chai. Lưu ý luôn luôn dùng queue khi gửi mail hoặc các tác vụ liên quan đến notifications.

### 3. CSRF Token là gì? Tại sao lại cần nó? Có bắt buộc phải có không? Nếu tôi không muốn có cái này thì có được không?
Hiểu cơ bản thì CSRF Token là một đoạn mã để gửi kèm lên server giúp cho việc check xem request có bạn có được thực thi hay không.
Ví dụ như bạn đang có một api http://domain/api/post/{id}/delete sẽ xóa id của một bài post. Bạn tạo một cái thẻ img có nội dung như sau. 
```php
<img src="http://domain/api/post/1/delete" height=0 width=0 />
```
và bạn gửi link hoặc email có kèm cái đoạn code kia. Vậy là sau khi cái ảnh này được load, dữ liệu của bạn sẽ được xóa. Rất đơn giản phải không. Vậy nên Laravel hỗ trợ chúng ta một cái gọi là CSRF token giúp chúng ta có thể bảo vệ được điều tồi tệ này. 

Ngoài thẻ `img` ra thì còn các thẻ khác như `iframe`, `script`... và những thẻ có thể chèn các thông tin xấu khi được load. 

Laravel tự động tạo ra một CSRF token cho mỗi phiên người dùng đang hoạt động do ứng dụng quản lý. Token này dùng để xác minh rằng người dùng đã được chứng thực là người thực hiện yêu cầu cho ứng dụng. Tuy nhiên điều này cũng chỉ giúp các bạn đỡ đi phần nào chứ không thể hoàn phòng tránh triệt để được . 

Vì thế bạn nên không nên ấn vào các link, ảnh không rõ nguồn gốc. Mình thấy có rất nhiều bạn ấn vào link nhạy cảm trên facebook  và ngay sau đó bị đổi tên thành **Messenger Thông Báo**, ngoài ra bạn cũng nên sử dụng method đúng cách như method GET chỉ để truy vấn dữ liệu, còn POST, PUT, PATCH, DELETE dùng để thay đổi dữ liệu trong hệ thống. 

CSRF token không hề bắt buộc nhé. Mặc định khi bạn gửi lên mà không đi kèm CSRF token thì sẽ bị server trả về lỗi 419 (Token Miss Match). Vì mặc định tất cả các request gửi lên đều mặc định chạy qua middleware **VerifyCsrfToken** nên bạn bắt buộc phải kèm token đi theo. Bạn có thể expect bằng cách mở file **VerifyCsrfToken.php** trong thư mục middleware và thêm các URL mà bạn muốn. Ví dụ:

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'uploads/',
        'store/',
    ];
}
```

### 4. Mô tả luồng dữ liệu khi người dùng bắt đầu nhập URL đến khi kết thúc. (Request Lifecycle)
Trả lời: 
Khi người dùng nhập URL, **public/index.php** sẽ là file được chạy vào đầu tiên, sau đó sẽ trải qua quá trình autoload, tạo Kernel, tạo Application, bootstrapping,  base Service Provider, register base Middleware, register base path, environment... rồi cuối cùng mới dispatch request lên Router. Sau khi đến router nó sẽ tiếp tục đẩy qua Controller, trong đây nó trải qua quá trình authorize rồi mới đến bước cuối cùng là `response/redirect`. 

Ở đây mình chỉ nói về việc Laravel sẽ thực hiện như thế nào nên các bước khác không liên quan đến Laravel mình sẽ bỏ qua hết. 

![](https://images.viblo.asia/8eec82d2-7776-4ec1-a1d0-4fa81f6eeb99.jpg)

Mình cũng có viết một bài về Lifecycle Hook, các bạn có thể đọc và comment tại [Laravel đã xử lý một request như thế nào?
](https://viblo.asia/p/laravel-da-xu-ly-mot-request-nhu-the-nao-bJzKmG7Ol9N)


### 5. Qua loa về service provider và service container?
Trả lời: Service provider là trung tâm của việc khởi tạo tất cả các ứng dụng trong Laravel. Tất cả service trong core của laravel sẽ được bootstrapped bởi service providers. Đây là thành phần cực kỳ quan trọng trong Laravel. 

Để đăng kí một service providers mới bạn cần tạo một file Provider sau đó sử dụng method `register` để đăng kí (hầu hết các provider đều sẽ có chưa method `register` và `boot`). Trong method này bạn sẽ sử dụng kĩ thuật về binding trong **Service Container**.

```php
<?php

namespace App\Providers;
use Chatwork;

use Illuminate\Support\ServiceProvider;

class ChatworkServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('chatwork', function ($app) {
            return new Chatwork($apiKey, $room);
        });
    }
}
```

Sau đó bạn sẽ add service provider này vào `config/app.php` , nơi chứa toàn bộ các providers của bạn. 

Chém gió một chút về Service Container, thì đây là một, một gì mình cũng không biết, gọi là một thứ cũng không phải :v tòm lại nó dùng để thực hiện cho việc binding và resolve. Như ví dụ trên thì mình đã tự binding cái gọi là `'redis'` với cái class Redis. Sau khi mình binding, Service Provider sẽ làm việc còn lại đó là đăng kí. Sau đó thì mình chỉ việc gọi đến cái class Redis bằng `redis()` hoặc `app('redis')` là được. 

>Đừng hiểu lầm giữa Service Container và DI (Dependencies Injection). Thực chất nhìn thì có vẻ chúng có liên quan đến nhau nhưng lại là hai khái niệm khác nhau. Laravel Service Container - binding và resolve, còn DI - Dependency Inject là 1 kỹ thuật, 1 design pattern cho phép xóa bỏ sự phụ thuộc hard-code và làm cho ứng dụng của bạn dễ mở rộng và maintain hơn. 


Phía trên là một số câu hỏi mà nhà tuyển dụng sẽ hay hỏi khi đi phỏng vấn về Laravel với mức độ Junior. Và câu trả lời cũng là quan điểm cá nhân của riêng mình. Còn rất nhiều phần nữa như Notifications, Eloquent, Task Scheduling, Observe, Testing các bạn có thể tìm hiểu trên document của Laravel. 

Ở một mức độ kỹ thuật cao hơn về Laravel thì đó là về các kĩ thuật như Design Pattern, Architecture, optimize... và các câu hỏi tại sao, tại sao lại thế chứ không hẳn là khái niệm và ví dụ đơn giản. Khi ấy trên docs cũng không có và bạn sẽ phải tự nghiên cứu và tìm tòi.

Bài viết nhiều chữ quá nên mình xin phép dừng tại đây. Rảnh rỗi bạn hãy thử tự đặt ra câu hỏi cho mình và tự tìm kiếm đáp án trả lời nhé. 

Chúc các bạn tìm hiểu được nhiều điều awesome với Laravel.! Nhớ để lại comments nếu thấy có vấn đề gì nhé. Tạm biệt và hẹn gặp lại.!