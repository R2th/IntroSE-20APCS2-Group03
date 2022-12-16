Xin chào các bạn, tiếp tục seri tìm hiểu về Stripe, hôm nay mình xin giới thiệu về webhook của Stripe. Sau khi thanh toán thành công chắc chắn bạn sẽ phải update data trong database của hệ thống ví dụ như là chuyển trạng thái của order hay là thông báo đến người dùng. Khi đó chúng ta sẽ cần sử dụng đến webhook của Stripe.

Bạn có thể ghé qua bài [Thanh toán online với Stripe và Ruby on Rails](https://viblo.asia/p/thanh-toan-online-voi-stripe-va-ruby-on-rails-gDVK2eow5Lj) trước đó của mình để hiểu hơn về Stripe trước khi đọc bài này nha.
# 1. What are webhooks?
HIểu một cách đơn giản thì webhooks như là một số điện thoại mà Stripe sẽ gọi đến để thông báo về những hành động xảy ra ở tài khoản Stripe của bạn. Hành động đó có thể là tạo mới một customer hay là việc thanh toán thành công cho ngân hàng. Webhook endpoint như là người ở đầu dây bên kia sẽ nhận cuộc gọi đó và tùy thuộc vào thông tin mà bên Stripe cung cấp để thực hiện các hành động thay đổi bên hệ thống của mình.

Trong đó webhook endpoint sẽ là một action trong hệ thống của bạn (VD: https://example.com/webhooks), nơi sẽ nhận các thông tin đến từ Stripe.
# 2. When to user webhooks?
Có nhiều sự kiện trong Stripe sẽ trả về kết quả ngay tức thì. Ví dụ như là khi tạo thành công một customer thì sẽ ngay lập tức trả về một `Customer` object. Khi đó bạn sẽ không cần thiết phải sử dụng webhook, khi mà các thông tin đã đầy đủ và chính xác.

Một vài sự kiện xảy ra không đồng bộ: xảy ra vào một khoảng thời gian sau mà không phải là lúc Stripe trả về response.
* Payment intent API
* Thông báo của payouts
* Subscriptions
Với những trường hợp trên và những trường hợp tương tự thì bạn phải sử dụng webhook để có thể bắt các sự kiện đó và thực hiện các thay đổi trong hệ thống của bạn.
# 3. Setup webhook endpoint
Trước tiên bạn cần tạo một endpoint trong tài khoản của bạn.
* Đăng nhập vào tài khoản Stripe
* Vào trang Dashboard > Developers > Webhooks > Add endpoint
* Điền các thông tin

 ![image.png](https://images.viblo.asia/77f57f89-3a04-4a32-bdae-f47f854026aa.png)
 
 Trong đó: Endpoint URL là url được định nghĩa trong hệ thống của bạn mà bạn sẽ sử dụng để nhận các thông báo từ Stripe
 Event to send: để định nghĩa danh sách các sự kiện mà bạn sẽ nhận được thông báo khi mà nó xảy ra. Bạn chỉ nên định nghĩa các event mà bạn sẽ sử dụng để tránh trường hợp có quá nhiều request thừa từ Stripe. Sau khi tạo thành công bạn sẽ nhận được secret key của endpoint mà Stripe cung cấp.
# 4. Setup an endpoint
### Create a new endpoint
Trước tiên bạn cần tạo một POST action trong hệ thống của bạn. Chú ý là để action là public, bỏ đi mọi authenticate cho action đó để Stripe có thể access vào nó. Trước khi thực hiện một event, luôn luôn kiểm tra rằng nó đến từ Stripe trước đã.
```
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = "sk_test_51IqUpbGNj484wMFxpRDcV1NGAGwT0IM80xUcCDUJgF7TEYmEGT7mkLJVhSRx2mbJkmO70XTCm3QOheBRpzWdNWdx00uEPN6jRM"

require 'sinatra'

# You can find your endpoint's secret in the output of the `stripe listen`
# command you ran earlier
endpoint_secret = 'whsec_...'

post '/webhook' do
  event = nil

  # Verify webhook signature and extract the event
  # See https://stripe.com/docs/webhooks/signatures for more information.
  begin
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    payload = request.body.read
    event = Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
  rescue JSON::ParserError => e
    # Invalid payload
    return status 400
  rescue Stripe::SignatureVerificationError => e
    # Invalid signature
    return status 400
  end

  # Print out the event so you can look at it
  puts event.inspect

  status 200
end
```
`endpoint_secret` là key mà bạn nhận được khi tạo mới một endpoint ở trên. Nó sẽ được sử dụng để kiểm tra xem có đúng là request được thực hiện từ Stripe hay không.

`event` là object đại diện cho sự kiện mà nhận được từ Stripe. Bao gồm các thông tin như là kiểu sự kiện gì, data liên quan đế sự kiện đó.
### Fulfill the order
Để có thể cập nhật thông tin order, bạn sẽ cần phải bắt sự kiện `checkout.session.completed`. Dựa trên payment method mà bạn sử dụng (cards, mobile wallets) mà bạn sẽ cần phải xử lý các sự kiện tương ứng bên hệ thống của bạn.
```
# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
Stripe.api_key = "sk_test_51IqUpbGNj484wMFxpRDcV1NGAGwT0IM80xUcCDUJgF7TEYmEGT7mkLJVhSRx2mbJkmO70XTCm3QOheBRpzWdNWdx00uEPN6jRM"

require 'sinatra'

# You can find your endpoint's secret in the output of the `stripe listen`
# command you ran earlier
endpoint_secret = 'whsec_...'

post '/webhook' do
  event = nil

  # Verify webhook signature and extract the event
  # See https://stripe.com/docs/webhooks/signatures for more information.
  begin
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    payload = request.body.read
    event = Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
  rescue JSON::ParserError => e
    # Invalid payload
    return status 400
  rescue Stripe::SignatureVerificationError => e
    # Invalid signature
    return status 400
  end

  if event['type'] == 'checkout.session.completed'
    checkout_session = event['data']['object']

    fulfill_order(checkout_session)
  end

  status 200
end

def fulfill_order(checkout_session)
  # TODO: fill in with your own logic
  puts "Fulfilling order for #{checkout_session.inspect}"
end
```
Sau khi lấy được object `event` bạn có thể kiểm tra sự kiện của event đó để thực hiện việc update order (hàm `fulfill_order()`).

`checkout_session` là object mà bạn nhận được khi tạo mới một Checkout session khi thanh toán(mình đã nói ở bài trước - [Thanh toán online với Stripe và Ruby on Rails](https://viblo.asia/p/thanh-toan-online-voi-stripe-va-ruby-on-rails-gDVK2eow5Lj))

Bây giờ bạn sẽ thắc mắc làm sao để biết được sự kiện này là của cái order nào trong khi hệ thống có rất nhiều order được thực hiện thành công một lúc. Nếu để ý bạn có thể thấy khi tạo một Checkout session, bạn có thể truyền vào params là `client_reference_id`. Ở đây bạn có thể truyền vào id của order mà đang được thanh toán. Khi đó, sau khi nhận được sự kiện `checkout.session.completed` và lấy được checkout_session bạn có thể lấy được thông tin order_id mà bạn đã truyền vào trước đó và thực hiện update order đó.

Ngoài sự kiện `checkout.session.completed` bạn cũng có thể check các sự kiện thanh toán thất bại khác để thông báo đến người dùng:
```
case event['type']
  when 'checkout.session.completed'
    checkout_session = event['data']['object']

    # Save an order in your database, marked as 'awaiting payment'
    create_order(checkout_session)

    # Check if the order is already paid (e.g., from a card payment)
    #
    # A delayed notification payment will have an `unpaid` status, as
    # you're still waiting for funds to be transferred from the customer's
    # account.
    if checkout_session.payment_status == 'paid'
      fulfill_order(checkout_session)
    end
  when 'checkout.session.async_payment_succeeded'
    checkout_session = event['data']['object']

    # Fulfill the purchase...
    fulfill_order(checkout_session)
  when 'checkout.session.async_payment_failed'
    session = event['data']['object']

    # Send an email to the customer asking them to retry their order
    email_customer_about_failed_payment(checkout_session)
  end
```
# 5. Testing
Như bạn thấy khi tạo endpoint ở trên, bạn phải truyền vào một url của hệ thống để Stripe request đến đó, nhưng làm sao để test được ở localhost của bạn. Bạn không thể truyền vào đó url như là: http://localhost:5000/webhooks được.

Có nhiều cách để test webhook endpoint:
* Tạo các action để test ở tài khoản của bạn
* Gửi các event test một cách thủ công từ Dashboard
* Sử dụng Stripe CLI
Hai cách đầu yêu cầu xác thực endpoint với tài khoản của bạn, nó sẽ tốn ít effort hơn. Nhưng bạn sẽ gặp phải các vấn đề liên quan đến tường lửa khi sử dụng các đó, đặc biệt là khi test ở localhost.

Stripe CLI là cách dễ nhất và nhanh nhất để test webhook endpoint ở dưới local. Ok, chúng ta cùng đi qua các bước để test được ở dưới local nào.
### Step 1: Install the Stripe CLI
Với mỗi môi trường khác nhau sẽ có cách install khác nhau. Bạn có thể tham khảo các cách đó ở [đây](https://stripe.com/docs/webhooks/test)
### Step 2: Link your Stripe account
Sau khi đã install thành công Stripe CLI, bạn cần login sử dụng tài khoản Stripe bạn đã đăng ký: run `stripe login` trong terminal. Bạn sẽ được cung cấp link đăng nhập, sử dụng link đó để đăng nhập vào Stripe.

![image.png](https://images.viblo.asia/0cb50c35-d514-4362-b2cd-9d28fd054c06.png)

### Step 3: Forward events to your server
Sau khi link đến tài khoản Stripe, bạn có thể sử dụng Stripe CLI để lắng nghe các sự kiện thông qua `stripe event`. Nhưng để có thể test được ở localhost bạn cần forward nó về localhost. Sử dụng option `--forward-to` để forward nó.

![image.png](https://images.viblo.asia/696c6a8f-0277-4219-8564-18868f943694.png)

Sau khi listen thành công bạn có thể lấy được `WEBHOOK_SIGNING_SECRET` và sử dụng nó thay thế cho secret key mà Stripe cung cấp cho lúc tạo endpoint ở trên. Khi đó mỗi khi có sự kiện nào đó ở tài khoản của bạn, nó sẽ được lắng nghe bởi Stripe CLI và forward đến localhost của bạn.

![image.png](https://images.viblo.asia/5832260f-4f49-4e14-9dc7-0cd7eac39d16.png)

# 6. Tài liệu tham khảo
* https://stripe.com/docs/payments/checkout/fulfill-orders
* https://stripe.com/docs/webhooks/test