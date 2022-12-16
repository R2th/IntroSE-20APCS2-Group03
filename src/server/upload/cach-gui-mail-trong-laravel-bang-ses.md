*Để giúp cho việc việc gửi mail trở nên đơn giản và nhanh chóng hơn Laravel hỗ trợ một số driver như Mailgun, SparkPost hay SES, bài viết này mình sẽ nói về cách gửi mail trong laravel với SES driver*  
# Cài đặt
## Bước 1: Thiết lập tài khoản trên Amazon SES
Trước hết bạn cần phải truy cập vào website https://aws.amazon.com/ses/ và đăng ký tài khoản của mình. Sau khi đăng ký và đăng nhập thành công, đi đến list các service của amazon và chọn SES(Simple Emails Service)
![](https://images.viblo.asia/ebdbdf6c-29ee-4162-a9ce-041a22e4cb3f.png)

Sau khi chọn SES bạn sẽ được chuyển hướng tới Dashboard SES. Ở đây bạn có thể kiểm tra các thông số như giới hạn gửi mail, số lượng mail đã gửi và một số thông số khác 

Với người dùng mới, bạn sẽ ở chế độ sandbox và chỉ có thể gửi email đến email đã được verified trong SES với số lượng gửi nhất định (200 mail/ 24 giờ). Nếu bạn muốn tăng tốc độ và giới hạn gửi lên cùng với việc có thể gửi mail đến bất kỳ địa chỉ email nào ngoài những email đã được verified trong SES bạn có thể request trong SES Dashboard.

Để dùng được api AWS SES, bạn cẩn phải gen ra một bộ keys bằng việc chọn Get Started with IAM Users, bạn sẽ được chuyển hướng đến IAM's page(đây là hệ thống AWS cho việc quản lý định danh). Sau đó tạo tạo tài khoản của mình và Lấy Access Key cùng với Secret Key để thực hiện trong bước tiếp theo là config SES trong laravel
## Bước 2: Cài đặt driver với laravel
Để sử dụng được SES Amazon driver bạn phải cài đặt Amazon AWS SDK cho PHP.  
Cách 1: Sử dụng lệnh composer
> composer require aws/aws-sdk-php
> 
Cách 2: Trong file *composer.json* ta thêm như sau:
```
{
    "require": {
      "aws/aws-sdk-php-laravel": "~3.0"
    }
}
```
và chạy lại lệnh
> composer update
>
## Bước 3: Config trong laravel
Trong file .env bạn thêm những thông số sau:
```
SES_KEY=...(access key)
SES_SECRET=...(secret key)
SES_REGION=...(mã khu vực)
```
Mã khu vực bạn có thể tìm kiếm ở đây: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/regions.html

Tiếp theo, cần chỉnh sửa lại mail driver thành ses:
```
MAIL_DRIVER=ses
```
Và trong file config/service.php sử dụng những thông số trên để thiết lập cho ses:
```
'ses' => [
    'key' => env('SES_KEY'),
    'secret' => env('SES_SECRET'),
    'region' => 'us-east-1',
],
```
Nếu bạn cần thiết lập một địa chỉ gửi hoặc một địa chỉ nhận nhất định bạn có thể chỉnh sửa trong file config/mail.php
```
'from' => [
    'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'), //Địa chỉ email của người gửi
    'name' => env('MAIL_FROM_NAME', 'Example'), //Tên người gửi
],
'to' => [
    'address' => 'example@example.com', //Địa chỉ email người nhận
    'name' => 'Example', //Tên người nhận
],
```
# Sử dụng
Sau khi cài đặt xong bạn có thể sẵn sàng để thực hiện các bước tiến hành gửi mail bằng ses trong laravel. Để dễ hiểu hơn mình sẽ thực hiện việc gửi mail qua một ví dụ đơn giản đó là thông báo cho người dùng về tên và tổng giá trị đơn hàng của họ.
## Mailable
Bạn có thể tạo một mailable là Order để thực hiện gửi mail với câu lệnh:
> php artisan make:mail Order
> 
Tất cả các mailable được tạo ra bởi câu lệnh trên sẽ nằm trong thư mục app\mail.

Trong mailable bạn có thể tùy chỉnh người gửi (from(...)), giao diện của mail (view(...)), dữ liệu để gửi xuống view (with([...])), nội dung (text(...)), các file đính kèm (attach(...)), ...  
*Ngoài mailable thông thường, bạn cố thể tạo ra một markdown mailable để gửi mail với giao diện viết theo kiểu markdown*

Với việc thông báo về order cho người dùng mailable của mình sẽ trông như sau:
```
public $order;

public function __construct(Order $order)
{
    $this->order = $order;
}

/**
 * Build the message.
 *
 * @return $this
 */
public function build()
{
    return $this->view('emails.order')
        ->with(['orderName' => $this->order->name, 'orderPrice' => $this->order->price]);
}
```

Ở bên trên mình đã thực hiện các mail về order có template là order nằm trong thư mục emails với dữ liệu truyền xuống view là orderName: tên của order và orderPrice: tổng giá trị của order đó. Với order là Order model được truyền vào khi khởi tạo mailable.
## View
Mình tạo một blade cơ bản cho việc gửi mail. Trong thư mục emails tạo file order.blade.php, đây chính là file view mà lúc nãy mailable đã gọi. File đó có nội dung như sau
```
<h1> {{ $orderName }} </h1>
Chung toi xin thong bao tong gia tri don hang cua ban la: {{ $orderPrice }}
```
Dữ liệu truyền xuống view được gọi theo đúng key trong array truyền xuống. 
## Gửi mail.
Mình sẽ thực hiện việc gửi mail trong controller
```
<?php

namespace App\Http\Controllers;

use App\Order;
use App\Mail\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * Ship the given order.
     *
     * @param  Request  $request
     * @param  int  $orderId
     * @return Response
     */
    public function order(Request $request, $orderId)
    {
        $order = Order::findOrFail($orderId);

        // Send email

        Mail::to($request->user())->send(new Order($order));
    }
}
```
Tìm kiếm order trong cơ sở dữ liệu với orderId được truyền vào và gửi mail cho người dùng có trong request về tên và giá của order đó (lưu ý user phải có email). Khi gọi đến controller này việc gửi mail sẽ được thực hiện.

Chỉ với các thao tác đơn giản như trên bạn đã có thể hoàn thành việc gửi bằng laravel với ses driver. Chúc bạn thành công!
# Tài liệu tham khảo
> https://laravel.com/docs/5.6/mail
> 
> https://medium.com/@awonwon/laravel-5-4-mail-with-amazon-ses-3a0d2dd6984b