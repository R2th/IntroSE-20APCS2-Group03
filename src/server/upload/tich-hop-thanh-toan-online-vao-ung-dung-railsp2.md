Ở [phần trước](https://viblo.asia/p/tich-hop-thanh-toan-online-vao-ung-dung-rails-RQqKLQbbZ7z) mình đã chia sẻ với mọi người về vấn đề làm thế nào tích hợp payment vào trong `rails` và chỉ dừng lại ở việc tích hợp `Stripe` và thanh toán bằng hình thức thanh toán một lần `Stripe charge`. Vậy nên hôm nay mình tiếp tục chia sẻ thêm một số hình thức thanh toán khác như thanh toán dài hạn(subscription) theo tuần, theo tháng,... Ngoài `Stripe` thì mình sẽ viết thêm về `Paypal`. Mọi người chưa đọc phần trước thì nên đọc nó [ở đây](https://viblo.asia/p/tich-hop-thanh-toan-online-vao-ung-dung-rails-RQqKLQbbZ7z) trước khi vào phần 2 nhé.

Let's go ✊✊✊
### Stripe
#### Stripe Subscriptions
Thực tế thì ngày nay việc mua bán trả góp hay trả nhiều lần được áp dụng rộng rải giúp đem lại lợi nhuận cho doanh nghiệp và mang lại sự thuận tiện cho người dùng. Vậy nên việc tích hợp thanh toán dài hạn vào các trang thương mại điện tử là điều cần thiết và `Stripe Subscriptions` giúp ta làm việc đó.

Dưới đây là cơ chế hoạt động của `stripe subscription`

![](https://images.viblo.asia/a712efa4-9765-4dce-834a-66fc2bd56153.png)

Mình giải thích sơ qua hình bên trên: Mỗi sản phẩm `product` sẽ có các mức giá `price` phải trả định kì theo tháng, năm,... Khi người dùng đăng kí thì sẽ tạo ra một `Customer` đại diện cho chính người dùng đó, đồng thời cũng đăng kí một `Subscription` như một chìa khoá cho phép người dùng sử dụng sản phẩm, mục đích là để khi người dùng không thanh toán đúng hạn hoặc có vấn đề liên quan thì người dùng không thể tiếp tục sử dụng sản phẩm. Tiếp đến là theo định kì thanh toán mà người dùng chọn khi mua sản phẩm thì sẽ có một `Invoice` giống như lời nhắc nhở `Customer` đến hạn thanh toán và `PaymentIntent` là nơi lưu lại lịch sử bạn thanh toán của từng.

Để có thể hiểu rõ hơn thì mọi người có thể tìm hiểu thêm ở [subscription document](https://stripe.com/docs/billing/subscriptions/overview).

Giờ là đến lúc thực hành thôi ✊✊

##### Step1: Những thứ cần chuẩn bị
- Chuẩn bị `Plan`: 
    - `Plan` ở đây là kế hoạch thanh toán định kì của mỗi sản phẩm `product` bao gồm tuần suất thanh toán(tuần, tháng,...), số tiền thanh toán mỗi lần
    - Để tạo `Plan` thì có 2 cách đó là mn có thể tạo trực tiếp ở [Stripe dashboard](https://dashboard.stripe.com/test/products/create) hoặc có thể tạo ở local máy bằng `rails c`  thông qua `Stripe API`. Ở đây mình sẽ sử dụng cách 2 nhé:
        ```ruby
        Stripe::Plan.create({
          amount: 10000,
          interval: 'month',
          product: {
            name: 'Premium plan',
          },
          currency: 'usd',
          id: 'premium-plan',
        })
        ```
        
- Chuẩn bị `Product`: Mình sẽ tạo `product` có trường `stripe_plan_name` dùng để lưu `plan` của `product` đó nhé. Theo thực tế thì 1 `product` có thể có nhiều `plan` nhưng để đơn giản nên mình làm luôn 1 `product` chỉ có `plan` thôi :D
    ```ruby
    Product.create(
      price_cents: 10000,
      name: 'Premium Plan',
      stripe_plan_name: 'premium-plan'
    )
    ```
- Vậy là chúng ta đã có `product` và `plan` của `product` đó
##### Step2: Migrate thêm một số column cần thiết
- Tiếp đến để có thể quản lí được sự đồng bộ giữa `user mua hàng` ở server chúng ta với `Customer` ở `stripe` thì mình sẽ thêm một cột `stripe_customer_id` vào bảng `User`:
    ```ruby
    rails generate migration AddStripeCustomerIdToUser stripe_customer_id:string

    rails db:migrate
    ```
##### Step3: Xử lí logic để đăng kí một `subscription`
- Tiếp tục phần quan trọng là code chức năng xử lí đăng kí một `subscription`.
- Mọi người mở file `app/services/orders/stripe.rb` và thêm đoạn code phía dưới nhé:
    ```ruby
    def self.execute_subscription(plan:, customer:)
      customer.subscriptions.create({
        plan: plan
      })
    end

    def self.find_or_create_customer(card_token:, customer_id:, email:)
      if customer_id
        stripe_customer = Stripe::Customer.retrieve({ id: customer_id })
        if stripe_customer
          stripe_customer = Stripe::Customer.update(stripe_customer.id, { source: card_token})
        end
      else
        stripe_customer = Stripe::Customer.create({
          email: email,
          source: card_token
        })
      end
      stripe_customer
    end
    ```
    - Ở trên mình có 2 method:
        - `excute_subscription`: Hàm này mục đích dùng để thực thi việc đăng kí một `subscription`  `customer` với `plan` truyền vào
        - `find_or_create_customer`: Hàm này mục đích là để tạo `customer` cho người dùng mua hàng
        - Để hiểu rõ hơn một số hàm có sẵn của Stripe như `Stripe::Customer`, `Stripe::Plan`,... mn tham khảo thêm ở [stripe api doc](https://stripe.com/docs/api/customers/object?lang=ruby) nhé

- Tiếp đến mình sửa lại hàm `excute` ở file `app/services/orders/stripe.rb`, thay dòng comment `#SUBSCRIPTIONS WILL BE HANDLED HERE` thành đoạn code phía dưới:
    ```ruby
    customer =  self.find_or_create_customer(
     card_token: order.token,
     customer_id: user.stripe_customer_id,
     email: user.email
    )
    
    if customer
      user.update(stripe_customer_id: customer.id)
      order.customer_id = customer.id
      charge = self.execute_subscription(plan: product.stripe_plan_name,
                                         customer: customer)
    ```
    - Ở đây mình kiểm tra xem `người dùng` đã đăng kí `Customer` ở `stripe` chưa, nếu chưa thì mình sẽ đăng kí `Customer` thông qua hàm `find_or_create_customer`. Tiếp đến là thực thi đăng kí `subscription` thông qua hàm `excute_subscription`.
  
##### Step 4: Kiểm tra chức năng
Mọi người truy cập lại trang web của mình và chọn mua product có tên là `Premium Plan` và sau đó kiểm tra tại [payment dashboar](https://dashboard.stripe.com/test/payments) để thấy kết quả thanh toán nhé.

### Paypal
Cũng tương tự với `stripe` để có thể tích hợp được `paypal` vào dự án thì chúng ta cần thêm gem [paypal-sdk-rest](https://github.com/paypal/PayPal-Ruby-SDK) và tạo một tài khoản ở [
paypal.com](https://www.paypal.com/)

#### Cấu hình Paypal
##### Step 1: Thêm gem `paypal-sdk-rest`
- Thêm vào `Gemfile`:
    ```ruby
    gem 'paypal-sdk-rest'
    ```
- Chạy lại lệnh `bundle install`
##### Step 2: Tạo Paypal API key
- Tạo một tài khoản Paypal ở  [
developer.paypal.com](https://developer.paypal.com/home/). 
- Khi mn vừa tạo tài khoản xong thì Paypal sẽ tự động generate ra 2 account test ở môi trường sandbox cho mn. Mn có thể truy câp  https://developer.paypal.com/developer/accounts/ để kiểm tra.
    - 1 tài khoản `Personal`: Đại diện cho người dùng thực tế, tới đây mình sẽ dùng tài khoản này để thử mua hàng.
    - 1 tài khoản `Business`: Đại diện cho tài khoản của cửa hàng, doanh nghiệp. Khi người dùng mua hàng thì tiền thanh toán sẽ được chuyển về cho tài khoản này
- Tạo `ứng dụng`: Cũng giống như facebook, google, Paypal cũng áp dụng việc tạo một `ứng dụng` giống như cái cổng cho phép `dự án` của chúng ta kết nối với `Paypal` thông qua `API KEY` có được từ `ứng dụng`. Mn truy cập [applications](https://developer.paypal.com/developer/applications) và tạo một ứng dụng ở trang này. Sau đó sẽ nhận được như hình dưới

![](https://images.viblo.asia/c6855a14-9522-450e-ad30-272881739156.png)

- Sau khi có được `Client ID` và `Secret` mọi người mở file `config/application.yml` và cập nhật giá trị cho các keys `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET_KEY` và `PAYPAL_ENV` thì mọi người để là "sandbox"

##### Step 3:  Config `paypal`
- Tiếp đến là config ở phía server để cho server có thể tương tác được với `paypal`

- Mọi người tạo mới file `config/initializers/paypal.rb` như dưới:
    ```ruby
    PayPal::SDK.configure(
      mode: ENV['PAYPAL_ENV'],
      client_id: ENV['PAYPAL_CLIENT_ID'],
      client_secret: ENV['PAYPAL_CLIENT_SECRET'],
    )
    PayPal::SDK.logger.level = Logger::INFO
    ```
#### Step 4: Tích hợp `paypal` vào giao diện
- Thêm đoạn require `paypal js` vào ở đầu file `index.html.slim`
    ```slim
    script src="https://www.paypal.com/sdk/js?client-id=#{ENV['PAYPAL_CLIENT_ID']}"
    ```
 - Khác với `Stripe`, `Paypal` chỉ có một `button` và khi người dùng click vào nó thì sẽ hiển thị một popup để người dùng login tài khoản và sau đó chọn hình thức thanh toán.
 - Để làm được điều đó Paypal JS có `paypal.Buttons(PARAM1).render(PARAM2)`
     - `PARAM1`: là một object có key `env` là môi trường thực thi, và 2 callback `createOrder` và `onApprove`
     - `PARAM2`:  1 string tên của class hoặc id của elemet html, là nơi mà `button` này hiển thị ở trên view. 
  - Mọi người thêm đoạn code dưới vào phần `javascript` trong file `views/orders/index.html.slim`
      ```js
     (function setupPaypal() {
        function isPayment() {
          return $('[data-charges-and-payments-section] input[name="orders[product_id]"]:checked').length
        }

        function submitOrderPaypal(chargeID) {
          var $form = $("#order-details");
          // Add a hidden input orders[charge_id]
          $form.append($('<input type="hidden" name="orders[charge_id]"/>').val(chargeID));
          // Set order type
          $('#order-type').val('paypal');
          $form.submit();
        }

        paypal.Buttons({
          env: "#{ENV['PAYPAL_ENV']}",
          createOrder: function() {
          },
          onApprove: function(data) {
          }
        }).render('#submit-paypal');
      }());
      ```
       - Cuối cùng bạn truy cập local và chọn hình thức thanh toán là paypal và thấy có button `paypal` thì đã thành công
       
       ![](https://images.viblo.asia/6e3f1c31-22c0-4ca1-8188-c832e0ebf8de.png)
       
#### Cách hoạt động của Paypal
Khác với Stripe thì thanh toán bằng Paypal phức tạp hơn khá là nhiều từ chu trình thanh toán cho đến cách thức tích hợp nó vào dự án. Paypal chia luồng xử lí qua nhiều tầng nên việc request giữa client với server và bên thứ ba `paypal` cũng khá là nhiều. Vậy nên mình sẽ thêm phần này mục đích để chia sẻ sơ qua cách thức hoạt động của thanh toán qua`paypal`

* **Step 1**: Đầu tiên khi mọi người click vào button paypal thì sẽ có một `popup` hiển thị đang loading và lúc này sẽ nhảy vào hàm `createOrder` và hàm này sẽ lấy các thông tin cần thanh toán như sản phẩm, tổng tiền,... và request lên server của mình. Lúc này server nhận thông tin và sử dụng hàm `PayPal::SDK::REST::Payment.new` để tạo một `payment` và gửi lại `payment.token` cho client. Client sau khi từ server một `token`.

   ![](https://images.viblo.asia/bdf06f43-5650-4169-b11c-e40388c470d7.png)

* **Step 2**: Sau khi nhận được `token` thì sẽ hiển thị một form `login` paypal ở `popup`

![](https://images.viblo.asia/7b53e149-6f64-413f-86a0-1b4f1ee63ffa.png)

* **Step 3**: Sau khi đăng nhập thành công thì sẽ hiển thị màn hình thanh toán. Khi mình click button `Pay now` lúc này method `onApprove` sẽ được gọi và hàm này gọi lên server của mình thực thi thanh toán thông qua hàm `payment = PayPal::SDK::REST::Payment.find(payment_id)` và `payment.execute`. Nếu `payment.execute` thành công thì mới tiến hành trigger button submit ở form của mình. Kết thúc thanh toán

    ![](https://images.viblo.asia/95fe1817-760d-493f-b970-9377dbb8fec3.png)


#### Tiến hành thực thi payment
* **Step 1**: Tạo 2 router
    ```ruby
    post 'orders/paypal/create_payment'  => 'orders#paypal_create_payment', as: :paypal_create_payment
  post 'orders/paypal/execute_payment'  => 'orders#paypal_execute_payment', as: :paypal_execute_payment
    ```
    - `paypal_create_payment` dùng để tạo `payment` và trả về `token` cho client tương ứng với `step 1` mình giải thích ở trên nhé
    - `paypal_execute_payment` dùng để thực thi payment tương ứng với `step 3`
  
* **Step 2**: Tạo một service thực thi thanh toán, tạo file `app/services/orders/paypal.rb` với đoạn code phía dưới:
    - Hàm `finish`: đơn giản chỉ là cập trang thái của order sau khi đã hoàn tất việc thanh toán
    - Hàm `create_payment`: Dùng để tạo payment và trả về một `token`
    - Hàm `execute_payment`:  Dùng để thực thì payment qua hàm `payment.execute`
    ```ruby
    class Orders::Paypal
      def self.finish(charge_id)
        order = Order.paypal_executed.find_by(charge_id: charge_id)
        return nil if order.nil?
        
        order.set_paid
        order
      end

      def self.create_payment(order:, product:)
        payment_price = (product.price_cents / 100.0).to_s
        currency = "USD"
        payment = PayPal::SDK::REST::Payment.new({
          intent:  "sale",
          payer: {
            payment_method: "paypal"
          },
          redirect_urls: {
            return_url: "/",
            cancel_url: "/" },
          transactions:  [{
            item_list: {
              items: [{
                name: product.name,
                sku: product.name,
                price: payment_price,
                currency: currency,
                quantity: 1 }
                ]
              },
            amount:  {
              total: payment_price,
              currency: currency
            },
            description:  "Payment for: #{product.name}"
          }]
        })
        if payment.create
          order.token = payment.token
          order.charge_id = payment.id
          return payment.token if order.save
        end
      end

      def self.execute_payment(payment_id:, payer_id:)
        order = Order.recently_created.find_by(charge_id: payment_id)
        return false unless order
        
        payment = PayPal::SDK::REST::Payment.find(payment_id)
        if payment.execute(payer_id: payer_id)
          order.set_paypal_executed
          return order.save
        end
      end
    end
    ```
      
* **Step 3**: Gọi services ở controller `app/controllers/orders_controller.rb`
    - Thêm callback before_action `prepare_new_order`, hàm này tạo ở phần trước nên mọi người có thể xem lại
        ```ruby
        class OrdersController < ApplicationController
          before_action :authenticate_user!
          before_action :prepare_new_order, only: [:paypal_create_payment]
            ...
        end
        ```
    - Chỉnh sửa lại hàm `checkout`, gọi hàm `finish` để hoàn tất việc thanh toán
        ```ruby
        def checkout
            if order_params[:payment_gateway] == "stripe"
              ...
            else
              @order = Order.find_by charge_id: order_params[:charge_id]
              @order.set_paid
            end
            ...
            end

            render html: "Failed"
        end
        ```
     - Thêm 2 action `paypal_create_payment` và `paypal_execute_payment`
          ```ruby
          def paypal_create_payment
            result = Orders::Paypal.create_payment(order: @order, product: @product)
            if result
              render json: { token: result }, status: :ok
            else
              render json: {error: FAILURE_MESSAGE}, status: :unprocessable_entity
            end
          end

          def paypal_execute_payment
            if Orders::Paypal.execute_payment(payment_id: params[:paymentID], payer_id: params[:payerID])
              render json: {}, status: :ok
            else
              render json: {error: FAILURE_MESSAGE}, status: :unprocessable_entity
            end
          end
          ```
     - Cuối cùng mọi người thêm xử lí ở 2 callback `onCreateOrder` và `onApprove`:
         ```js
         paypal.Buttons({
          env: "#{ENV['PAYPAL_ENV']}",
          createOrder: function() {
            $('#order-type').val("paypal");
            if (isPayment()) {
              return $.post("#{paypal_create_payment_url}", $('#order-details').serialize()).then(function(data) {
                return data.token;
              });
            } else {
            }
          },
          onApprove: function(data) {
            if (isPayment()) {
              return $.post("#{paypal_execute_payment_url}", {
                paymentID: data.paymentID,
                payerID:   data.payerID
              }).then(function() {
                submitOrderPaypal(data.paymentID)
              });
            } else {
            }
          }
        }).render('#submit-paypal');
         ```
         
* **Step 4**: Kiểm thử chức năng
    - Truy cập trang order
    - Chọn sản phẩm và chọn hình thức thanh toán `paypal`
    - Nhấn chọn button `Paypal`
        - Đăng nhập tài khoản `personal sanbox` mình tạo ở bước tạo tài khoản
        - Chọn địa điểm ship, hình thức thanh toán của `paypal` cung cấp và nhấn `Pay now`
    - Truy cập vào tài khoản `personal sanbox` ở paypal.com để kiểm tra xem thông tin thanh toán.



Hy vọng qua bài chia sẻ này thì mọi người ứng dụng được các hình thức thanh toán online vào trang web của mình một cách thành công. Nếu có thắc mắc trong quá trình thực hiện thì có thể cmt vào bài viết nhé.

Cảm ơn mn đã đọc hết bài viết của mình. 😁😁

Happy Coding!!!👍👍👍