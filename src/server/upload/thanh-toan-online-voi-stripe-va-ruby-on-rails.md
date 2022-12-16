Hello mọi người, gần đây Stripe mới update một số tính năng nên dự án mình có maintain lại chức năng thanh toán sử dụng Stripe. Vì vậy mình cũng tìm hiểu được một chút về Stripe nên hôm nay mình sẽ chia sẻ một số thứ mình đã tìm hiểu được nha :ok_hand:
# What is Stripe?
> Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.

Stripe là một công ty công nghệ có mục tiêu xây dựng cơ sở hạ tầng kinh tế cho internet. Phục vụ cho tất cả doanh nghiệp thuộc mọi quy mô — từ các công ty mới thành lập đến các công ty lớn — Stripe hỗ trợ thanh toán trực tuyến và quản lý việc kinh doanh trực tuyến.
Sau một thời gian ngắn tìm hiểu thì nói chung mình thấy Stripe hỗ trợ rất nhiều mảng khác nhau không chỉ là thanh toán trực tuyến. Nhưng hôm nay trong khuôn khổ bài viết này mình chỉ xin giới thiệu một phần nhỏ các bước để làm chức năng thanh toán trực tuyến sử dụng Stripe.
# Create your account
Trước khi bắt tay vào code bạn cần tạo mới một tài khoản trên hệ thống của Stripe để lấy các key cần thiết và Setup một số thứ.
Truy cập vào https://dashboard.stripe.com/login để tạo mới tài khoản.
Sau khi tạo thành công và đăng nhập, bạn hãy di chuyển đến trang Dashboard của Stripe. Ở đây tại mục `Developer > API keys` bạn có thể lấy được thông tin `Publishable key` và `Secret key`. 
![](https://images.viblo.asia/ceedbeb7-8930-4610-9e81-3a67c280406a.png)
Tiếp theo bạn cần set account name cho ứng dụng ở góc trên bên trái màn hình dashboard.
Ngoài việc thanh toán online Stripe cũng hỗ trợ rất nhiều tính năng khác như quản lý sản phẩm, quản lý người dùng,... Bạn có thể tìm hiểu dần trên trang dashboard nha.
# Build checkout page
Stripe gợi ý hai hướng làm đó là sử dụng Checkout Page của stripe hoặc là bạn có thể tự custom một page checkout riêng của bạn. Nhưng mình xin giới thiệu cách sử dụng Checkout Page của Stripe cho nó đơn giản :grinning:. Thực ra cách tự custom page checkout riêng mình cũng chưa sử dụng. Nhưng bạn có thể tham khảo thêm về nó ở [đây](https://stripe.com/docs/payments/integration-builder)
Mình xin giới thiệu qua về một chút về luồng hoạt động của nó nha:
* Người dùng click vào nút thanh toán
* Chuyển hướng sang trang thanh toán của Stripe
* Người dùng nhập vào các thông tin và thanh toán
* Nếu thanh toán thành công thì quay về trang success (tự định nghĩa từ trước)
* Nếu thanh toán thất bại hoặc người dùng click chọn quay về trong trang Checkout thì quay về trang cancel (tự định nghĩa từ trước)
## Install the Stripe Ruby library
Trước tiên bạn cần install bản mới nhất của Stripe. Thêm dòng sau vào Gemfile sau đó bundle lại ứng dụng
```
gem "stripe", "~> 5.32.1"
```
Tại thời điểm mình viết bài này thì phiên bản mới nhất của nó đang là `5.32.1`.
Hoặc bạn có thể run câu lệnh `gem install stripe` trong terminal.
Sau khi install thành công gem `stripe` bạn cần set secret key cho Stripe. Tạo file `config/initializers/stripe.rb` và thêm vào dòng
```
Stripe.api_key = "your_stripe_serect_key"
```
Config luôn trong file này thì sẽ giảm thiểu việc bạn phải set lại mỗi lần gọi đến Stripe
## Create a Checkout Session
Tạo một action controller để lấy giá trị session id
```
post '/create-checkout-session' do
  content_type 'application/json'
  session = Stripe::Checkout::Session.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        unit_amount: 2000,
        currency: 'usd',
        product_data: {
          name: 'Stubborn Attachments',
          images: ['https://i.imgur.com/EHyR2nP.png'],
        },
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: YOUR_DOMAIN + '/success.html',
    cancel_url: YOUR_DOMAIN + '/cancel.html',,
    client_reference_id: your_client_id
  })
  {
    id: session.id
  }.to_json
end
```
Checkout session dùng để định nghĩa các thông tin mà sẽ được hiển thị trong trang checkout khi người dùng thanh toán. Ví dụ như các thông tin sản phẩm: giá tiền, loại tiền tệ thanh toán, số lượng sản phẩm, tên sản phẩm và hình ảnh của sản phẩm. Khi người dùng click chọn thanh toán, sẽ call đến action `/create-checkout-session` để tạo mới session. `Stripe::Checkout::Session.create()` sẽ có nhiệm vụ tạo mới session. Bạn nên bắt thêm exception ở đây và trả về thông báo lỗi vì có thể có những trường hợp bị dính exception. Ví dụ như Stripe chỉ hỗ trợ thanh toán số tiền nhỏ nhất của từng mệnh giá. Ví dụ như đối với đồng Yên Nhật là 50 Yên. Nếu người dùng thanh toán ít hơn 50 Yên thì sẽ trả về thông báo của Stripe thay vì bị exception.
### Payment method
```
payment_method_types: ['card']
```
Checkout hỗ trợ nhiều loại payment method dựa trên card. Nếu có nhiều loại payment method được truyền vào tham số `payment_method_types` thì Stripe sẽ tự động sắp xếp lại chúng dựa trên độ phổ biến của phương thức thanh toán ở nơi bạn sống và các tiêu chí khác (mình cũng không hiểu Stripe sắp xếp lại kiểu gì :sweat_smile:).
### Line items
```
line_items: [{
  price_data: {
    unit_amount: 2000,
    currency: 'usd',
    product_data: {
      name: 'Stubborn Attachments',
      images: ['https://i.imgur.com/EHyR2nP.png'],
    },
  },
  quantity: 1,
}],
```
Định nghĩa các thông tin về sản phẩm. Trong đó name và images sẽ được hiển thị như là thông tin của sản phẩm ở trang checkout của Stripe. Thay vì truyền trực tiếp vào các thông tin như trên, bạn cũng có thể định nghĩa trước các thông tin về sản phẩm hay thông tin về giá ở trang Dashboard của Stripe và chỉ cần truyền vào đây id của product và price.
### The mode
```
mode: 'payment'
```
Stripe có 3 loại mode là: `payment`, `subscription` và `setup`. Mỗi loại payment lại được sử dụng trong những trường hợp khác nhau. Đối với payment thì có thể hiểu là sử dụng để thanh toán luôn và thanh toán một lần này và muốn thanh toán lần sau thì phải tạo cái khác. Còn hai loại còn lại thì bạn có thể tìm hiểu thêm ở đây: [subscription](https://stripe.com/docs/billing/subscriptions/checkout) và [setup](https://stripe.com/docs/payments/save-and-reuse#checkout)
### Redirect URLs
```
success_url: YOUR_DOMAIN + '/success.html',
cancel_url: YOUR_DOMAIN + '/cancel.html',
```
Bạn có thể chỉ định url mà Stripe sẽ redirect về sau khi thanh toán thành công hoặc thất bại. Lưu ý là url phải public để Stripe có thể truy cập được. Bạn có thể cung cấp hai url khác nhau cho hai trường hợp thành công và thất bại hoặc bạn cũng có thể chỉ định chung một url cho chúng. Thêm nữa bạn có thể custom hai trang đó bằng cách truyền vào đó session_id, và từ session_id có thể lấy được các thông tin của giao dịch.
Truyền vào params:
```
session_id={CHECKOUT_SESSION_ID}
```
## Add a success page
Tiếp theo là tạo trang mà Stripe sẽ redirect về khi mà thanh toán thành công. Ở đây bạn có thể làm gì tùy ý nha. Nhưng url của trang phải trùng với url mà bạn đã truyền vào ở trên nha.
```
success.html

<html>
<head>
  <title>Thanks for your order!</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <section>
    <p>
      We appreciate your business! If you have any questions, please email
    </p>
  </section>
</body>
</html>
```
## Add a canceled page
Tương tự như success page nha
```
cancel.html

<html>
<head>
  <title>Checkout canceled</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <section>
    <p>Forgot to add something to your cart? Shop around then come back to pay!</p>
  </section>
</body>
</html>
```
## Add an order preview page
Tiếp theo là tạo mới một trang để hiển thị các thông tin sản phẩm và button thanh toán, đồng thời xử lý các action khi ngườ dùng lick vào thanh toán.
```
checkout.html

<!DOCTYPE html>
<html>
  <head>
    <title>Buy cool new product</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch"></script>
    <script src="https://js.stripe.com/v3/"></script>
  </head>
  <body>
    <section>
      <div class="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div class="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <button type="button" id="checkout-button">Checkout</button>
    </section>
  </body>
  <script type="text/javascript">
    // Create an instance of the Stripe object with your publishable API key
    var stripe = Stripe("your_public_key");
    var checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", function () {
      fetch("/create-checkout-session", {
        method: "POST",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    });
  </script>
</html>
```
### Load Stripe.js
Để có thể sử dụng được Stripe ở js bạn cần load thư viện js của Stripe vào trang
```
<script src="https://js.stripe.com/v3/"></script>
```
### Add a checkout button
Thêm button thanh toán để check sự kiện mỗi khi người dùng click vào button thì sẽ thực hiện việc thanh toán
```
<button type="button" id="checkout-button">Checkout</button>
```
### Initialize Stripe.js
Tiếp theo bạn cần khai báo một biến Stripe sử dụng public key đã lấy được ở trang dashboard
```
var stripe = Stripe("your_public_key");
```
### Fetch a Checkout Session
```
checkoutButton.addEventListener("click", function () {
      fetch("/create-checkout-session", {
        method: "POST",
      })
```
Mỗi khi người dùng click vào button thanh toán thì sẽ gọi đến action `/create-checkout-session` để lấy về giá trị session id mới được tạo. Ở phía server có thể tạo thành công session hoặc không nên bạn cần bắt trường hợp không tạo thành công và hiển thị thông báo cho người dùng.
### Redirect to Checkout
```
return stripe.redirectToCheckout({ sessionId: session.id });
```
Cuối cùng là bạn cần gọi đến function của Stripe với giá trị truyền vào là session_id mà bạn vừa lấy được. Khi `stripe.redirectToCheckout()` được gọi đến người dùng sẽ được redirect sang trang thanh toán của Stripe. Và từ đây sẽ là do bên Stripe sử lý, bạn sẽ không cần xử lý gì cả và bạn chỉ cần bắt giá trị trả về xem có thanh toán thành công hay không thôi.

Như vậy là bạn đã có thể tự tạo cho mình tính năng thanh toán online sử dụng Stripe. Bạn có thể vào trang Dashboard của Stripe để check xem đã thực sự thanh toán thành công không nha. Stripe sẽ ghi lại tất cả các action giao dịch, cả những lỗi mà hệ thống gặp phải trong quá trình thanh toán nha.
Bạn có thể tìm hiểu thêm các tính năng mà Stripe hỗ trợ ở trang docs của họ nha: https://stripe.com/docs
Chúc mọi người thành công :beers: