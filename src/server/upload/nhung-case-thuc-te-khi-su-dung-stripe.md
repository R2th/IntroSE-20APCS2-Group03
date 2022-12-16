Để nối tiếp [phần 1](https://viblo.asia/p/dung-thu-stripe-phan-1-maGK7j1D5j2), ở phần 2 này mình sẽ trình bày thêm những case trong dự án thực tế mình gặp khi sử dụng Stripe

# 1. Sử dụng Trial
Bài toán 1: Hệ thống của bạn là private. User phải đăng kí tài khoản & thanh toán tiền thì mới được sử dụng. May mắn cho user là họ có khoảng 2 tuần (14 ngày) dùng thử hệ thống của bạn trước khi chính thức thanh toán tiền

Vậy với Stripe ta có 1 option khi tạo plan `trial_end`. Lưu í là bạn phải convert sang định dạng timestamp nhé

```php
\Stripe\Stripe::setApiKey("sk_test_xxx");

\Stripe\Plan::create(array(
  "amount" => 5000,
  "interval" => "month",
  "product" => array(
    "name" => "Gold special"
  ),
  "currency" => "usd",
  "trial_end" => 1538495126,
));
```
Ở đây mình chọn `trial_end` là vào lúc 2018-10-10 10:10:10. Qua thời điểm này plan của chúng ta sẽ chính thức có hiệu lực - Phần việc này là Stripe làm giúp chúng ta

# 2. Charge thêm tiền
Bài toán 2: Nếu user mà để quá giai đoạn trial mới thèm add card thì hệ thống sẽ tự động charge thêm 1 khoản phí (Gọi là phí gia nhập đi, cái tội add card muộn). Nhưng khoản tiền này chỉ charge 1 lần duy nhất mà thôi

Vậy với Stripe ta có giải pháp sau
```php
\Stripe\Stripe::setApiKey("sk_test_xxx");

\Stripe\InvoiceItem::create(array(
    "customer" => "cus_xxx",
    "amount" => 2500,
    "currency" => "usd",
    "description" => "One-time setup fee")
);
```

1 invoice có nhiều invoiceItem. VD: Plan của chúng ta là monthly, thì hàng tháng Stripe sẽ tự động trừ tiền & tạo ra 1 hóa đơn, trong hóa đơn đó có 1 invoiceItem. Ở đây ta tạo mới 1 invoiceItem & item này sẽ tự động được add vào invoice kế tiếp

# 3. Sử dụng webhook
Bài toán 3: Chắc hẳn nhiều bạn thắc mắc là nãy giờ toàn gửi API từ server mình lên Stripe mà không thấy Stripe gửi lại gì cho server nhỉ

Webhook sẽ là câu trả lời cho phần này
## 3.1 Đăng kí webhook
Default của laravel là có package cashier nhưng vì 1 vài lí do nên dự án mình không dùng. Nhưng về nguyên lí thì mình cũng copy cách làm của cashier mà thôi
1. Bạn tạo file WebhookController với function. Bạn có thẻ xem bản full ở [đây](https://github.com/laravel/cashier/blob/7.0/src/Http/Controllers/WebhookController.php)
```php
    /**
     * Handle a Stripe webhook call.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handleWebhook(Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        $method = 'handle'.studly_case(str_replace('.', '_', $payload['type']));

        if (method_exists($this, $method)) {
            return $this->{$method}($payload);
        } else {
            return $this->missingMethod();
        }
    }
    
    /**
     * Handle calls to missing methods on the controller.
     *
     * @param  array  $parameters
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function missingMethod($parameters = [])
    {
        return new Response;
    }
```

2. Ở file web.php, ta tạo mới 1 url để nhận dữ liệu từ Stripe
```php
Route::post('stripe_webhook', 'WebhookController@handleWebhook');
```

Như bạn có thể thấy là mình tạo 1 url với action `WebhookController@handleWebhook`. Ở trong function này mình detect request & tạo ra được biến `$method`. Đây chính là function mà ta xử lí cho từng event

VD với event `InvoicePaymentSuccedded` thì function xử lý sẽ là `handleInvoicePaymentSucceeded`
3. Bạn vào trang dashboard > Developers > Webhooks > Add endpoint. Nhập url server của bạn (nhớ có /stripe_hook ở đuôi nhé) & click button `Add endpoint`. Nếu server bạn ở local, chưa public thì bạn có thể dử dụng [ngrok](https://ngrok.com/) để public lên site của họ

![](https://images.viblo.asia/edffa65d-c78d-48aa-829f-bd1e41fbad70.png)

## 3.2 Sử dụng webhook
Như ở trên mình có phần tích. Sau khi thanh toán thành công, Stripe sẽ tự động bắn 1 API về cho chúng ta & hàm xử lí công việc này sẽ là
```php
protected function handleInvoicePaymentSucceeded(array $payload)
{
}
```

Ở đây `$payload`sẽ chứa thông  tin về customer, invoice. Tùy từng event thì `payload` sẽ có những giá trị khác nhau

# 4. Xóa thẻ
Bài toán 4: Nếu 1 lúc nào đó user không muốn dùng hệ thống nữa, họ muốn xóa thẻ của họ để tránh bị trừ tiền từ Stripe
Vậy với Stripe ta sẽ có API 
```php
\Stripe\Stripe::setApiKey("sk_test_xxx");

$customer = \Stripe\Customer::retrieve("cus_xxx");
$customer->sources->retrieve($customer->sources->data[0]->id)->delete();
```

# 5. Change Plan
Bài toán 5: Hệ thống của bạn có 3 gói. Silver ($3000), Gold ($5000), Platinum ($12000). Ban đầu user đăng kí gói Silver. nhưng sau đó họ muốn upgrade lên gói Platinum
Vậy với Stripe ta sẽ có API
```php
\Stripe\Stripe::setApiKey("sk_test_6qIoNTnsAwCOZ7vDaSb9oUvn");

$subscription = \Stripe\Subscription::retrieve('sub_xxx');
\Stripe\Subscription::update('sub_xxx', [
  'cancel_at_period_end' => false,
  'items' => [
        [
            'id' => $subscription->items->data[0]->id,
            'plan' => 'plan_xxx', // new plan
        ],
    ],
]);
```

Ở đây mình xin giải thích 1 chút về cách tính tiền của Stripe. Do Stripe không có tính năng refund nên họ sẽ tính cộng trừ cái khoảng thời gian chưa sử dụng
VD: Gói Silver ($3000) - Interval: monthly
Gói Platinum ($10000) - Interval: monthly

Nếu user sử dụng gói Silver từ ngày 10/09, đến ngày 20/09 họ muốn chuyển sang Platinum ($12000). Vì chuyển sang cùng invertal nên dua date không bị thay đổi
Với gói Silver:
=> Thời gian đã sử dụng của gói Silver: 10 ngày/30 ngày
=> Số tiền đã sử dụng của gói Silver: 3000 * 10 / 30 = 1000
Do lúc đăng kí gói Silver, user đã phải trả $3000 rồi => Số tiền chưa sử dụng: 3000 - 1000 = 2000 (Số tiền này sẽ được trừ khi sử dụng dịch vụ khác)

Với gói Platinum:
=> Thời gian sẽ sử dụng: 10/10 - 20/09 = 20 ngày/30 ngày
=> Số tiền sẽ phải thanh toán cho gói Platinum: 12000 * 20 / 30 = 8000
===> Tổng số tiền mà user phải trả cho sự chênh lệch giữa 2 gói: 8000 - 2000 = 6000 - Đây là số tiền mà user sẽ phải trả thêm

Trên đây là những bài toán mà dự án mình gặp phải khi sử dụng Stripe. Nếu có bất kì thắc mắc hay í kiến xin vui lòng comment