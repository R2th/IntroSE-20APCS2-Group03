# Mở đầu


# Cài đặt

## Tạo Paypal sandbox 

Để thực hiện các cuộc gọi đến PayPal API chúng ta cần phải tạo ra một ứng dụng trong  [developer.paypal.com](developer.paypal.com).

1. Đăng nhập bằng tài khoản nhà phát triển vào trang PayPal’s Developer. Nếu bạn đang truy cập lần đầu tiên, hãy đăng ký và tạo một tài khoản mới.
2. Sau khi đăng nhập, bạn sẽ được chuyển hướng đến trang các ứng dụng của tôi, ở đó bạn có thể tạo một ứng dụng mới ở [https://developer.paypal.com/developer/applications/create](https://developer.paypal.com/developer/applications/create)

![](https://images.viblo.asia/32e49414-7c98-45a0-b93a-a55b501c62cc.png)

3. Điền tên ứng dụng, chọn tài khoản Sandbox Business account  và bấm vào tạo ứng dụng. Một khi các ứng dụng được tạo ra, bạn có thể nhận thấy Client id & Secret. Chúng ta sẽ cần các thành phần này cho đồng thời server và ứng dụng client. Bạn có thể chỉnh sửa các feature cho Paypal app, trong bài viết này Sandbox app của mình sử dụng các feature này

![](https://images.viblo.asia/917a6533-5cd2-46cd-8bf0-292e0d4d2412.png)

## Init project
Trước tiên của init 1 project Laravel trước cho chắc =))

Công việc này khá là quen thuộc với các bạn đã làm việc với Laravel, chúng ta cần clone Laravel app từ Github về bằng các command dưới đây :

```bash
$ git clone git@github.com:laravel/laravel.git my-laravel
$ cd my-laravel
$ cp .env.example .env
$ sudo chmod -R 777 storage/
$ composer install
```

Trong dự án này mình sử dụng package `srmklive/paypal` để tương tác với API của Paypal bằng cách chạy lệnh 

```bash
$ composer require srmklive/paypal:~3.0
```

sau bước này chúng ta sẽ thêm 1 file config cho package vào trong `config/paypal.php` với nội dung như sau

```config/paypal.php
<?php
/**
 * PayPal Setting & API Credentials
 * Created by Raza Mehdi <srmk@outlook.com>.
 */

return [
    'mode' => env('PAYPAL_MODE', 'live'), // Can only be 'sandbox' Or 'live'. If empty or invalid, 'live' will be used.
    'client_id' => env('PAYPAL_CLIENT_ID', ''),
    'client_secret' => env('PAYPAL_CLIENT_SECRET', ''),
    'app_id' => env('PAYPAL_APP_ID', ''),
    'payment_action' => env('PAYPAL_PAYMENT_ACTION', 'Sale'), // Can only be 'Sale', 'Authorization' or 'Order'
    'currency' => env('PAYPAL_CURRENCY', 'AUD'),
    'notify_url' => env('PAYPAL_NOTIFY_URL', ''), // Change this accordingly for your application.
    'locale' => env('PAYPAL_LOCALE', 'en_US'), // force gateway language  i.e. it_IT, es_ES, en_US ... (for express checkout only)
    'validate_ssl' => env('PAYPAL_VALIDATE_SSL', true), // Validate SSL when creating api client.
    'webhook_id' => env('PAYPAL_WEBHOOK_ID', ''),
    'gateway_url' => env('PAYPAL_MODE', 'live') === 'sandbox' ? 'https://www.sandbox.paypal.com' : 'https://www.paypal.com',
];
```

Nếu tham khảo trên doc của package thì file `config/paypal.php` của package này xây dựng sẵn sẽ hơi khác, nhưng vì mình không thích cách cấu hình đấy nên mình flat hết chúng ra luôn :(

Tiếp theo bạn sử dụng ClientID & Secrets vừa tạo ở trên bổ sung vào trong `.env`
```shell:.env
#PayPal Setting & API Credentials
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xx-xxx
PAYPAL_WEBHOOK_ID=xxx
```

## Thanh toán cho 1 order

![](https://images.viblo.asia/1f5ac997-4f07-4691-8838-ad5e167e048b.gif)


### Thêm button thanh toán Paypal phía client

Để sử dụng button thanh toán Paypal phía client, chúng ta sử dụng luôn Javascript SDK của paypal vào trong view 

```html:welcome.blade.php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <!-- PAYPAL SDK -->
        <script src="https://www.paypal.com/sdk/js?client-id={{ config('paypal.client_id') }}" data-sdk-integration-source="buttons"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    </head>
    <body class="antialiased">
        <div id="paypal-button-container"></div>
    </body>
   
</html>

```

Sau đó thêm đoạn js này để có thể render button trên trang của mình 
```js 
<script>
        paypal.Buttons({
            fundingSource: paypal.FUNDING.PAYPAL,
            disableS: false,
            createOrder: function (data, actions) {
                return axios.post('/api/paypal/order/create/')
                    .then(function(orderData) {
                        console.log(orderData);
                        return orderData.data.id;
                    });
            },
            onApprove: function (data, actions) {
                return axios.post('/api/paypal/order/' + data.orderID + '/capture/')
                    .then(function(orderData) {
                        console.log(orderData.data);
                        alert('Transaction completed by ' + orderData.data.payer.name.given_name);
                    });
            }
        }).render('#paypal-button-container');
</script>
```

Đoạn JS trên thực hiện mục đích render ra Paypal button và gán các chức năng cho nó bao gồm:

- Tạo order thông qua func `createOrder`, hàm này nhận vào 2 param data & actions, tuy nhiên việc xử lý thanh toán của mình đặt ở backend nên mình không sử dụng nó. Thay vào đó mình sẽ tiến hành gọi lên backend API để lấy được orderID (orderID này được tạo thông qua việc gọi lên Paypal API)
- OrderID được trả về từ backend sẽ được Paypal SDK sử dụng để dựng popup thanh toán cho bạn, tại bước này bạn sẽ trải nghiệm việc thanh toán ở Paypal, sau khi order được approve thì tạo hàm `onApprove` chúng ta sẽ gọi tới  backend API đến tiến hành kiểm tra xem order này đã thanh toán thành công chưa và đưa về kết trả cho client.


Để hiểu rõ hơn về luồng hoạt động của button này, bạn có thể xem hình ảnh này 

![](https://www.paypalobjects.com/ppdevdocs/img/docs/checkout/v2/paypal-checkout-overview-pay-now-orders-api.svg)

### Xây dựng API create order

Tiếp theo chúng ta tiến hành xây dựng controller để xử lý việc thanh toán cho 1 order. Trước tiên chúng ta cần setup cho package 1 chút, bởi vì mình có thay đổi lại file `config/paypal.php` một chút 

```app\Http\Controllers\PaymentController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal;

class PaymentController extends Controller
{
    private PayPal $paypal;

    public function __construct(PayPal $paypal)
    {
        $this->paypal = $paypal;
        $this->paypal->setApiCredentials($this->buildPaypalConfig(config('paypal')));
        $this->paypal->setAccessToken($this->paypal->getAccessToken());
    }
    
    public function buildPaypalConfig($config)
    {
        return [
            'mode' => data_get($config, 'mode'),
            'sandbox' => [
                'client_id' => data_get($config, 'client_id'),
                'client_secret' => data_get($config, 'client_secret'),
                'app_id' => data_get($config, 'app_id'),
            ],
            'live' => [
                'client_id' => data_get($config, 'client_id'),
                'client_secret' => data_get($config, 'client_secret'),
                'app_id' => data_get($config, 'app_id'),
            ],

            'payment_action' => data_get($config, 'payment_action'),
            'currency' => data_get($config, 'currency'),
            'notify_url' => data_get($config, 'notify_url'),
            'locale' => data_get($config, 'locale'),
            'validate_ssl' => data_get($config, 'validate_ssl'),
            'webhook_id' => data_get($config, 'webhook_id'),
        ];
    }
}
    
```

- Do mình sử dụng `use Srmklive\PayPal\Services\PayPal;` nên trong `__constructor` chúng ta cần setApiCredentials và setAccessToken cho provider này
- Func `buildPaypalConfig($config)` sẽ thực hiện map config sang cấu trúc mà package cần đế sử dụng

---
Đầu tiên với API create order

```app\Http\Controllers\PaymentController.php
public function createOrder(Request $request)
    {
        $paypalOrder = $this->paypal->createOrder([
            'intent'=> 'CAPTURE',
            'application_context' => [
                'brand_name' => config('app.name'),
                'landing_page' => 'BILLING',
                "user_action" => "PAY_NOW",
            ],
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => '100.00'
                    ],
                ],
            ],
        ]);

        // Thêm logic lưu thông tin order vào DB
        return $paypalOrder;
    }
```

---
Với API capture order, đơn giản hơn chúng ta chỉ cần gọi tới paypal API để capture trạng thái của order vừa tạo 

```app\Http\Controllers\PaymentController.php
public function captureOrder($orderId)
    {
        $capturedOrder = $this->paypal->capturePaymentOrder($orderId);

        // Thêm logic cập nhập thông tin order vào DB

        return $capturedOrder;
    }
    
```

Thông tin về captureOrder chứa trạng thái order, số tiền mà payer đã thanh toán và nhiều thông tin các nữa

![](https://images.viblo.asia/53a255f6-6e0b-4bfa-9f91-1be03364808b.png)

## Thanh toán cho 1 subscription

Subscription là một chức năng thích hợp cho các sản phẩm có yêu cầu nghiệp vụ là phải gia hạn hằng tháng hoặc hàng tuần chẳng hạn. Đối với những dịch vụ này, việc website chúng ta chủ động yêu cầu ngừoi dùng bấm lại nút thanh toán sẽ gây phiền toái khá nhiều, vì vậy Paypal đã hỗ trợ việc tự động thanh toán hằng tháng. 

Để tích hợp được chức năng này cho website, chúng ta cần follow qua các bước 

- Đầu tiên chúng ta cần tạo các Subscription Plan trên giao diện Paypal bằng việc tài khoản Business 
- Sau đó ở phía website sẽ sử dụng Paypal API tiến hành subscribe người dùng tới Plan vừa tạo
- Mỗi chu kỳ thanh toán, chúng ta sẽ nhận được Notification từ paypal về trạng thái thanh toán của Subscription đó.

### Tạo Subscription plan trên Paypal
Đầu tiên chúng ta cần tạo các Subscription Plan trên giao diện Paypal bằng việc truy cập tài khoản Business, vì mình đang ở môi trường dev qua Sandbox nên mình truy cập địa chỉ này [https://www.sandbox.paypal.com/billing/plans/plan/create/choose-product?from=plans](https://www.sandbox.paypal.com/billing/plans/plan/create/choose-product?from=plans)

Vì mỗi plan sẽ yêu cầu bạn tạo kèm 1 hoặc 1 số Product nên bạn cần fill kha khá thông tin. Sau khi tạo thành công chúng ta sẽ có được 1 Plan như này 

![](https://images.viblo.asia/3b5ad9de-1bdd-417e-8cda-b025f31dd09b.png)

Có rất nhiều thông tin, nhưng chúng ta chỉ cần quan tâm Plan ID thôi.

Demo thanh toán Subscription 
![](https://images.viblo.asia/b63018a1-d1f0-400b-bd9a-8923f99fabf2.gif)


### Thêm nút Subscribe Plan dưới client

Đối với Subscription thì chúng ta cần thay đổi SDK 1 chút, chúng ta sẽ bổ sung thêm intent subscription vào trong SDK

```html:subscription.blade.php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <!-- PAYPAL SDK -->
        <script src="https://www.paypal.com/sdk/js?client-id={{ config('paypal.client_id') }}&vault=true&intent=subscription" data-sdk-integration-source="buttons"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    </head>
    <body class="antialiased">
        <div id="paypal-button-container"></div>
    </body>
    
</html>
```

Tiếp theo là render button Paypal

```js
<script>
        paypal.Buttons({
            fundingSource: paypal.FUNDING.PAYPAL,
            disableS: false,
            createSubscription: function (data, actions) {
                return axios.post('/api/paypal/subscription/create/')
                    .then(function(orderData) {
                        console.log(orderData);
                        return orderData.data.id;
                    });
            },
            onApprove: function (data, actions) {
                return axios.post('/api/paypal/subscription/' + data.subscriptionID + '/capture/')
                    .then(function(orderData) {
                        console.log(orderData.data);
                        alert(orderData.data.status + " Subscription plan\n" + 'Transaction completed by ' + orderData.data.subscriber.name.given_name);
                    });
            }
        }).render('#paypal-button-container');
    </script>
```

###  Xây dựng API create subscription 

Tương tự với API create order, chúng ta cần gọi tới Paypal API để lấy được thông tin subscription và truyền ID đó cho SDK sử dụng để tạo popup thanh toán và sau khi user approve giao dịch xong, chúng ta cần capture thông tin subscription để lưu chúng vào DB chẳng hạn

```php:app\Http\Controllers\PaymentController.php
public function createSubscription()
    {
        $subscription =  $this->paypal->createSubscription([
            "intent"=> "SUBSCRIPTION",
            "plan_id" => 'P-54D952024E7319535MB2GZOI', // Thay Plan ID của bạn vào đây
            'application_context' => [
                'brand_name' => config('app.name'),
                'landing_page' => 'BILLING',
                "user_action" => "SUBSCRIBE_NOW",
                "payment_method" => [
                    "payer_selected" => "PAYPAL",
                    "payee_preferred" => "IMMEDIATE_PAYMENT_REQUIRED"
                ],
            ],
        ]);

        // Thêm logic lưu thông tin subscription vào DB

        return $subscription;
    }

    public function captureSubscription($subscriptionId)
    {
        $subscription = $this->paypal->showSubscriptionDetails($subscriptionId);

        // Thêm logic update thông tin subscription vào DB

        return $subscription;
    }
```

---
Sau khi tiến hành hoàn thành luồng, chúng ta có thể truy cập vào tài khoản business để xem Subscription cho user vừa tạo và trạng thái 
![](https://images.viblo.asia/65dcc9f0-c522-4849-b64f-f6fb0a147ba7.png)

## Tạm kết
Hy vọng bài viết này sẽ giúp các bạn giải quyết được chút khó khăn khi tích hợp chức năng thanh toán với Paypal, trong bài viết tới mình sẽ bổ sung thêm những use case khác liên quan tới Paypal, các bạn đón đọc nhé 

## Tham khảo
- Github repository: [https://github.com/daothaison/paypal-checkout-demo](https://github.com/daothaison/paypal-checkout-demo)