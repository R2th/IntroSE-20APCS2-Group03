Dạo gần đây dự án mình có requirement về payment & khách hàng họ yêu cầu dùng Stripe để thanh toán. Và đó là lí do có bài viết này  
Ở phần 1 này mình sẽ hướng dẫn cách sử dụng Stripe 1 cách cơ bản nhất

# Stripe là gì
Stripe là một công ty công nghệ xây dựng cơ sở hạ tầng kinh tế cho internet. Các doanh nghiệp thuộc mọi quy mô — từ các công ty mới khởi nghiệp đến các công ty đại chúng — sử dụng phần mềm của chúng tôi để chấp nhận thanh toán và quản lý doanh nghiệp của họ trực tuyến.  
Stripe kết hợp nền tảng thanh toán với các ứng dụng đưa dữ liệu doanh thu vào trung tâm hoạt động kinh doanh.  
Để có thể sử dụng các dịch vụ của Stripe bạn phải đăng kí tài khoản tại [đây](https://dashboard.stripe.com/register) & bạn vào phần Developer để lấy public_key(pk_xxx), secret_key(sk_xxx)

# Tạo form để nhập thẻ
Stripe cung cấp cho chúng ta 1 lib js để có thể check card có hợp lệ hay không
```html
<script src="https://js.stripe.com/v3/"></script>

<form action="/charge" method="post" id="payment-form">
  <div class="form-row">
    <label for="card-element">
      Credit or debit card
    </label>
    <div id="card-element">
      <!-- A Stripe Element will be inserted here. -->
    </div>

    <!-- Used to display form errors. -->
    <div id="card-errors" role="alert"></div>
  </div>

  <button>Submit Payment</button>
</form>
```

```javascript
// Create a Stripe client.
var stripe = Stripe('pk_xxxx');

// Create an instance of Elements.
var elements = stripe.elements();

// Create an instance of the card Element.
var card = elements.create('card');

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});
```

Ở mỗi dòng code cũng đã có comment rồi nên mình không giải thích nhiều nhé  
Bạn có thể dùng các card test của Stripe để nhập tại [đây](https://stripe.com/docs/testing)
Sau khi nhập card, expired date & cvc => click button submit, ta sẽ gửi thông tin card đó lên `https://api.stripe.com/v1/tokens`. Stripe sẽ verify card & trả về cho ta thông tin chi tiết của card  
![](https://images.viblo.asia/3ece4a3c-c31e-4144-913d-abe4f1054526.png)  
Ta sẽ chỉ cần quan tâm `id` của thẻ thôi (`tok_1DAgKREeUWkPH95Qj2YnqjtL`). Và trên server ta sẽ dùng token đó để tạo thẻ cho user

# Tạo customer
Đầu tiên trên server bạn phải install lib cho stripe
> composer require stripe/stripe-php
> 

```php
\Stripe\Stripe::setApiKey("sk_test_xxx");

\Stripe\Customer::create(array(
  "description" => "Customer for truongbt",
  "source" => "tok_xxx" // token mà bạn nhận được từ client
));
```

Stripe sẽ trả về cho ta 1 customer object, trong đó có id của customer trên stripe (`cus_xxx`). Bạn cần phải lưu id này vào db để sử dụng sau này

# Tạo plan
Plan có 2 loại pricing
1. Recurring quantity: Nghĩa là thanh toán hàng tháng. Giống như gói cước internet nhà bạn vậy. Cứ đến ngày thanh toán trong tháng (due date) thì stripe sẽ tự động trừ tiền của bạn. Và thời điểm thanh toán sẽ là đầu kì
2. Metered usage: Nghĩa là bạn dùng bao nhiêu thì sẽ tính tiền bấy nhiêu. Giống như gói cước di động trả sau vậy. Và thời điển thanh toán sẽ là cuối kì

Trong bài viết này mình sẽ tạo plan với pricing là recurring cho phổ biến

```php
\Stripe\Stripe::setApiKey("sk_test_xxx");

\Stripe\Plan::create(array(
  "amount" => 5000,
  "interval" => "month",
  "product" => array(
    "name" => "Gold special"
  ),
  "currency" => "usd",
));
```

Ở đây mình tạo 1 plan với thời hạn thanh toán là monthly (Stripe có cung cấp các thời hạn khác: daily, weekly, 3 month, 6 month, yearly hoặc bạn có thể tự custome thời hạn thanh toán)  
Currency ở đây mình chọn là $ với số tiền là 5000 và nằm trong product là `Gold Special` (1 product có thể chứa nhiều plan)  
Response sẽ là 1 object plan, trong đó có id của plan trên stripe (`plan_xxx`). Bạn phải giữ kín thông tin này, tránh để lộ ra ngoài


# Tạo subscription
Sau khi đã tạo customer & plan thì ta cần kết hợp chúng lại với nhau. 1 customer có thể đăng kí nhiều plan & 1 plan cũng có nhiều customer đăng kí nó  
```php
\Stripe\Stripe::setApiKey("sk_test_xxxx");

\Stripe\Subscription::create(array(
  "customer" => "cus_xxx",
  "items" => array(
    array(
      "plan" => "plan_xxx",
    ),
  )
));
```

Ta đã đăng kí customer & plan (mà ta vừa tạo ở phía trên) lại với nhau  
Response ở đây sẽ là 1 subscription object trong đó có id của subscription trên stripe (`sub_xxx`)  
Ở đây mình sẽ giải thích thêm 1 chút nữa về pricing  
Ví dụ tạo tạo subscription này vào 15/09 với interval là monthly => Stripe sẽ trừ $5000 trong thẻ của bạn & số tiền đó là dành cho khoảng thời gian bạn sử dụng hệ thống (15/09 - 15/10). Và đến 15/10, Stripe sẽ lại tự động trừ $5000 & số tiền đó là dành cho giai đoạn (15/10 - 15/11)  
Bạn có thể check việc này bằng cách lấy invoice của customer đó
```php
\Stripe\Stripe::setApiKey('sk_test_xxx');
\Stripe\Invoice::all(['customer' => 'cus_xxx']);
```


Vậy là mình đã hướng dẫn cách dùng cơ bản Stripe. Ở phần 2 mình sẽ hướng dẫn các case khó hơn, các case mà trong dự án thực tế mà mình gặp