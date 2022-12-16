Paypal hỗ trợ thanh toán nhanh chóng chỉ bằng cách đăng nhập bằng tài khoản paypal. Và paypal cũng có một sdk cho ngôn ngữ ruby giúp developer xây dựng chức năng thanh toán qua paypal chỉ với việc nhúng 1 button html vào trang web. Hãy cùng test thử chức năng này nhé !

## Chuẩn bị 1 tài khoản paypal developer để test trên môi trường sandbox của paypal
* Bạn đăng ký 1 account tại https://www.paypal.com/, sau đó có thể dùng để đăng nhập vào trang dành cho developer https://developer.paypal.com
* Tại đây bạn cần tạo 1 app (vd tên là `app-test`) mới tại https://developer.paypal.com/developer/applications, tạo xong mặc định app sẽ ở chế độ sandbox (chuyển sang live là cản thận vỡ mồm đấy).
* ![](https://images.viblo.asia/f5c11cdd-6c1b-4857-a6bd-c30ebcde569f.png)
* Bạn có sẵn 2 account paypal sandbox để test, 1 là account personal dùng để đăng nhập khi thanh toán, còn 1 là account business được liên kết với app vừa tạo dùng để nhận tiền.
*![](https://images.viblo.asia/05c5991b-f86e-41b9-81ed-6ebcb4751052.png)
* 2 account sandbox testing bạn có thể đăng nhập vào trang https://www.sandbox.paypal.com/, đây là trang dùng để test cho trang chủ https://www.paypal.com/

## Tạo rails app
### model payment để lưu thông tin order id sau khi thanh toán thành công
* Ở bước này bạn đọc tự tạo ra 1 rails app mới
* Và chỉ cần tạo thêm 1 bảng để lưu thông tin thanh toán: `rails generate model Payment order_id:string payer_id:string`
```ruby
class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.string :order_id
      t.string :payer_id

      t.timestamps
    end
  end
end
```
### Render ra 1 trang payment để nhúng button
 Bước này ko có gì cần quan tâm cả: tạo sẵn routes, controller, model, view để nhúng button thôi.
 
 `routes.rb`:
 ```ruby
    resources :payments
```
`payments_controller.rb`:
```
class PaymentsController < ApplicationController
  def new
  end
end
```

## Nhúng button checkout vào trang.
* Api doc của paypal: https://developer.paypal.com/docs/api/overview
* Cách tạo button: https://developer.paypal.com/docs/checkout/integrate/
 
### 1. Nhúng button checkout
Đầu tiên bạn xem qua cách button làm việc: https://developer.paypal.com/docs/checkout/#how-the-buttons-work
![](https://developer.paypal.com/img/docs/checkout/v2/paypal-checkout-overview-pay-now-orders-api.svg)
Flow đơn giản như sau:
1. Tại trang thanh toán của tôi có 1 button thanh toán của paypal. Button này liên kết với `app-test` mà ta đã tạo bên trên qua client id
2. Người dùng thực hiện đăng nhập và thanh toán(tạo order) trên paypal. Bước này sẽ call api order của paypal.com
3. Nếu order được paypal approve thì tức là thành công.

`app/views/payments/new.html.erb`:
```js
<script src="https://www.paypal.com/sdk/js?client-id=<%= ENV['CLIENT_ID'] %>"></script>

<div id="paypal-button-container"></div>

<script>
  paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '0.69'
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      alert("Thanh toán thành công!");
      return actions.order.capture().then(function(details) {
        // This function shows a transaction success message to your buyer.
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }
  }).render('#paypal-button-container');
</script>
```
Bạn cần vào trang https://developer.paypal.com/developer/applications chọn `app-test` để  copy lấy client id và secret.
Bạn thay `<%= ENV['CLIENT_ID'] %>` bằng client id vừa copy được. Như vậy button paypal sẽ hoạt động.
=> kết quả:
![](https://images.viblo.asia/336411c4-1a22-49ce-a1e5-a317ed2a5def.gif)

=> đến đây khi người dùng tạo order thành công với paypal thì server chả lấy được thông tin gì cả vì thế ta cần dùng ruby sdk https://github.com/paypal/Checkout-Ruby-SDK để  capture thông tin order của người dùng tại server.

### 2. Sử dụng sdk để xử lý kết quả checkkout
Bạn cài gem `gem paypal-checkout-sdk` giúp hỗ trợ các request từ server tới paypal
Tại bước sau khi approved order ta đổi code thành post thông tin order_id lên server:
`app/views/payments/new.html.erb`:
```js
onApprove: function (data, actions) {
      $.ajax({
        url: '<%= payments_path %>',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          'order_id': data.orderID,
          'payer_id': data.payerID
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': $('meta[name="csrf-token"]').content
        }
      }).then(function () {
        alert("Thanh toán thành công!");
      });
}
```
Đầu tiên ta cần copy thêm secret của `app-test` sử dụng để `Access Token for Sandbox authen.`
`payments_controller.rb`:
```ruby
class PaymentsController < ApplicationController
  def new
  end
  
  def create
    environment = PayPal::SandboxEnvironment.new(ENV['CLIENT_ID'], ENV['SECRET'])
    client = PayPal::PayPalHttpClient.new(environment)
    request = PayPalCheckoutSdk::Orders::OrdersCaptureRequest::new(params[:order_id])
    begin
      # Call API with your client and get a response for your call
      response = client.execute(request)

      # If call returns body in response, you can get the deserialized version from the result attribute of the response
      order = response.result
      Payment.create order_id: order.id, payer_id: order.payer.payer_id
    rescue PayPalHttp::HttpError => ioe
      # Something went wrong server-side
      puts ioe.status_code
      puts ioe.headers["debug_id"]
    end
  end
end
```

### 3. Kiểm tra trạng thái order
Ngoài việc sử dụng ruby sdk bên trên bạn còn có 1 số cách self test kết quả của chức năng này:
1. Xem luôn api call tại https://developer.paypal.com/developer/dashboard/sandbox/
2. Chọn app và add webhook  https://developer.paypal.com/developer/applications/
3. Dùng trực tiếp api:

+ lấy access_token bằng postman: https://developer.paypal.com/docs/api/get-an-access-token-postman/
+ create order và get order: https://developer.paypal.com/docs/api/orders/v2/ 
+ demo get order info: `curl -v -X GET https://api.sandbox.paypal.com/v2/checkout/orders/0VF52814937998046 -H "Content-Type: application/json" -H "Authorization: Bearer Access-Token"` (trong đó `0VF52814937998046` là order_id cần tìm, `Access-Token` thay bằng access_token của bạn)

## Kết Luận
* Chức năng thanh toán 1 lần qua button paypal thực sự dễ dàng với người đăng ký tài khoản paypal.(dùng acccount paypal để thanh toán quốc tế với mọi tài khoản ngân hàng, ví điện tử, mastercard liên kết với paypal account)
* Paypal đã & đang chuyển đổi version API v1 -> v2 nên cần xem api doc để chắc chắn code hoạt động đúng.
* Thanh toán sang tiền Việt là một vấn đề. (Bạn thử tạo sandbox account sẽ không có option chọn tại Việt Nam) 
* Thanh toán không dùng account paypal mà qua creaditcard dù thanh toán thành công vẫn phải chờ (khoảng 21 ngày) mới có tiền. link: 
* Một chức năng thanh toán khác của paypal là subscription (kiểu tự động thanh toán tiền hàng tháng giống K+ của Việt Nam) cũng gặp vấn đề với account tại Việt Nam nên theo tôi biết là thời điểm hiện tại vẫn chưa thực hiện được.