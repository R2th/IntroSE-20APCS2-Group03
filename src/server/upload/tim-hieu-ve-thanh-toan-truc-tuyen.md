Như mọi người đã biết thì thương mại điện tử đang ngày càng phát triển, bởi sự tiện lợi, hỗ trợ tối đa dành cho cả khách hàng và doanh nghiệp và việc kết nối giữa hai bên cũng trở nên dễ dàng hơn rất nhiều. Đóng góp vào sự phát triển này không thể không nói tới sự ra đời của các cổng thanh toán trực tuyến.  Trong bài viết lần này, mình sẽ giới thiệu với các bạn cách hoạt động của nó và sau đó là cách tích hợp cổng thanh toán trực tuyến (cụ thể là Braintree) vào ứng dụng của bạn.
 
## Cổng thanh toán trực tuyến là gì?
Cổng thanh toán trực tuyến là một dịch vụ hướng tới thương mại điện tử với mục đích kết nối ngân hàng với các thương nhân, cho phép việc thanh toán của khách hàng trở nên dễ dàng hơn bao giờ hết. Cụ thể hơn, nó thực hiện các công việc xác thực tài khoản thanh toán của khách hàng với các chiến lược chống lừa đảo, là một bên tin cậy để ủy quyền thực hiện các giao dịch bởi dữ liệu như số thẻ tín dụng, số xác nhận thẻ (CVV), ngày hết hạn,... được mã hóa, vận chuyển một cách bảo mật nhất giữa các bên. Ngoài ra các cổng thanh toán điện tử còn cung cấp các dịch vụ thống kê giao dịch, chính sách hoàn tiền, xử lý tranh chấp rõ ràng, hỗ trợ nhiều phương thức thanh toán, nhiều loại tiền tệ. Một số cổng thanh toán trực tuyến phổ biến có thể kể đến là PayPal/Braintree, Stripe, Square,...

Còn hiểu theo cách kỹ thuật thì có thể coi cổng thanh toán trực tuyến là một ứng dụng phần mềm mà các dịch vụ thanh toán cung cấp giúp đơn giản hóa việc xây dựng chức năng thanh toán trong ứng dụng của bạn với một mức phí nhỏ. 
## Cổng thanh toán trực truyến hoạt động như thế nào?
Về cơ bản nhất thì việc thanh toán trực tuyến sẽ qua các bước sau:
1. Khách hàng thực hiện một giao dịch trên ứng dụng của bạn.
2. Ứng dụng của bạn gửi dữ liệu giao dịch tới cổng thanh toán trực tuyến một cách bảo mật. Cổng thanh toán sau đó chuyển tiếp dữ liệu tới ngân hàng liên kết để thực hiện việc xác thực.
3. Khi quá trình xác thực được hoàn tất, hoạt động thanh toán sẽ được ủy quyền hoặc từ chối bởi ngân hàng (dựa vào độ chính xác của thông tin khách hàng nhập hay số dư khả dụng trong tài khoản khách hàng).
4. Dựa vào kết quả giao dịch có được ủy quyền hay từ chối, cổng thanh toán sẽ đưa ra thông báo tới ứng dụng của bạn.
5. Nếu việc ủy quyền thành công, ngân hàng liên kết sẽ thực hiện chuyển tiền tới cổng thanh toán trực tuyến (cụ thể là tài khoản của người bán)

![](https://images.viblo.asia/ac783243-d86a-4a42-8bc6-ef6260e83aa2.png)

Hiểu đơn giản thì cổng thanh toán trực tuyến chịu trách nhiệm trung gian cho việc thanh toán một cách nhanh chóng và bảo mật giữa khách hàng và người bán, xin ủy quyền và rút tiền từ tài khoản khách hàng sau đó gửi vào tài khoản người bán (có tính phí)
## Lợi ích của việc sử dụng cổng thanh toán trực tuyến
* Là một trong số ít cách để kết nối được ứng dụng của bạn tới các hệ thống thanh toán bởi thường chỉ có các nhà cung cấp lớn mới có thể kết nối trực tiếp tới ngân hàng, đơn vị tài chính.
* Phí sử dụng dịch vụ không đáng kể so với những tính năng nó mang lại (kết nối ngân hàng, quản lý tài chính, chính sách xử lý rủi ro, hỗ trợ đa dạng phương thức thanh toán và tiền tệ)
* Giúp người bán quản lý tài chính tốt hơn nhờ các thống kê mà nó cung cấp

## Cổng thanh toán trực truyến Braintree
Braintree là một nền tảng thanh toán cho phép ứng dụng của bạn chấp nhận thanh toán qua thẻ tín dụng, thẻ ghi nợ, PayPal, Google Pay, Samsung Pay,... và hỗ trợ trên nhiều quốc gia, được sử dụng bởi các công ty lớn như Airbnb và Uber. Braintree cũng cung cấp các dịch vụ tương tự như các cổng thanh toán trực tuyến khác như Stripe, Square. Sự khác biệt có lẽ chỉ khác biệt ở chính sách tính phí dịch vụ, tuy nhiên Braintree còn nổi bật với việc dễ dàng tích hợp vào ứng dụng với bộ tài liệu rõ ràng có sẵn ví dụ cho từng ngôn ngữ hỗ trợ. Dưới đây là flow phổ biến khi tích hợp Braintree vào ứng dụng của bạn (bao gồm client và server)
![](https://images.viblo.asia/f3990629-6aae-4021-907f-a9b37fcf036a.png)
1. Client của bạn sẽ request một client token từ server của bạn để khởi tạo client SDK của Braintree.
2. Server của bạn sẽ sinh ra và gửi client token tới client của bạn sử dụng server SDK của Braintree.
3. Một khi client SDK được khởi tạo và khách hàng thông qua đó gửi đi thông tin thanh toán, Braintree sẽ thực hiện liên kết với ngân hàng để xác thực và trả về một nonce (number used only once) trong trường hợp thành công.
4. Client của bạn nhận được nonce và gửi cho server của bạn.
5. Server của bạn nhận được nonce, sau đó sử dụng server SDK để tạo giao dịch hoặc thực hiện các chức năng khác.
## Ví dụ tích hợp Braintree với Ruby on Rails
Chúng ta sử dụng ví dụ mà Braintree cung cấp [tại đây](https://github.com/braintree/braintree_rails_example), các bạn có thể tải về chạy thử, còn trong bài viết mình sẽ chỉ nói sơ qua các file quan trọng.
```ruby
# Gemfile
...
gem 'braintree', '~> 2.87'

gem 'dotenv', '~> 2.0'
...
```
Thêm 2 gem trên vào `Gemfile` của bạn. Gem braintree cho phép bạn sử dụng server SDK của Braintree, gem dotenv để load các key của Braintree từ file `.env` 
```ruby
# .env
BT_ENVIRONMENT='sandbox'
BT_MERCHANT_ID='7gxs5qtnmgjdbqr2'
BT_PUBLIC_KEY='8495yjksr4zz7qc8'
BT_PRIVATE_KEY='c529f6f1df0a808e423933a59d9c21ca'

```
đây là file lưu public key, private key, merchant id chúng ta sử dụng để kết nối với Braintree, các bạn có thể sử dụng tài khoản của mình (vì môi trường sandbox mà Braintree cũng phân biệt key giữa production với sandbox ^^) hoặc tạo tài khoản mới [tại đây](https://www.braintreepayments.com/sandbox)

```ruby
# controllers/checkouts_controller.rb
  ...
  
  def new
    @client_token = gateway.client_token.generate # sinh client token và lưu vào biến instance để sử dụng trong view
  end

  ...
  
  private
  def gateway
    env = ENV["BT_ENVIRONMENT"]

    @gateway ||= Braintree::Gateway.new(
      :environment => env && env.to_sym,
      :merchant_id => ENV["BT_MERCHANT_ID"],
      :public_key => ENV["BT_PUBLIC_KEY"],
      :private_key => ENV["BT_PRIVATE_KEY"],
    )
  end
  
  ...
  
# views/checkouts/new.html.erb
<div class="wrapper">
    ...

      <div class="bt-drop-in-wrapper">
        <div id="bt-dropin"></div>
       </div>
       
    ...

        <input type="hidden" id="nonce" name="payment_method_nonce" />
        <button class="button" type="submit"><span>Test Transaction</span></button>
        
    ...
</div>

<script src="https://js.braintreegateway.com/web/dropin/1.14.1/js/dropin.min.js"></script> # thư viện javascript client SDK của Braintree
<script>
  var form = document.querySelector('#payment-form');
  var client_token = "<%= @client_token %>"; # lưu client token nhận được từ server

 # khởi tạo UI mặc định do Braintree cung cấp (bọc trong div id="bt-dropin")
  braintree.dropin.create({
    authorization: client_token,
    container: '#bt-dropin',
    paypal: {
      flow: 'vault'
    }
  }, function (createErr, instance) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      instance.requestPaymentMethod(function (err, payload) {
        if (err) {
          console.log('Error', err);
          return;
        }

        # Thêm nonce vào trong form và submit
        document.querySelector('#nonce').value = payload.nonce;
        form.submit();
      });
    });
  });
</script>
```
Đoạn code xử lý submit transaction
```ruby
  # controllers/checkouts_controller.rb
  ...
  
  def create
    amount = params["amount"] # nhận amount submit từ form, khuyến cáo không nên nhận trực tiếp như này trong production
    nonce = params["payment_method_nonce"] # nhận nonce được trả về từ Braintree thông qua form submit

    # gọi API của Braintree để tạo transaction
    result = gateway.transaction.sale(
      amount: amount,
      payment_method_nonce: nonce,
      :options => {
        :submit_for_settlement => true
      }
    )

    if result.success? || result.transaction
      redirect_to checkout_path(result.transaction.id) # show transaction dựa vào id của transaction nếu thành công
    else
      error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" } 
      flash[:error] = error_messages
      redirect_to new_checkout_path # về trang tạo mới transaction và hiển thị lỗi nếu thất bại
    end
  end
  
  ...
```
Đoạn code hiển thị transaction được tạo
```ruby
   # controllers/checkouts_controller.rb
  ...
  
  def show
    # gọi API của Braintree để lấy giữ liệu transaction theo id và lưu trong biến instance
    # sau đó có thể truy xuất thông tin transaction để hiển thị trong view, ví dụ:
    # @transaction.amount
    # @transaction.status
    # @transaction.credit_card_details.token 
    # @transaction.customer_details.email
    # ...
    @transaction = gateway.transaction.find(params[:id]) 
    @result = _create_result_hash(@transaction)
  end
   
 ...
   
 private
 
 # tạo một biến lưu thông báo dựa vào status của transaction
 def _create_result_hash(transaction) 
    status = transaction.status

    if TRANSACTION_SUCCESS_STATUSES.include? status
      result_hash = {
        :header => "Sweet Success!",
        :icon => "success",
        :message => "Your test transaction has been successfully processed. See the Braintree API response and try again."
      }
    else
      result_hash = {
        :header => "Transaction Failed",
        :icon => "fail",
        :message => "Your test transaction has a status of #{status}. See the Braintree API response and try again."
      }
    end
  end
  
 ...
```
Và đây là kết quả


![](https://images.viblo.asia/e551c612-d157-4d03-8c93-b5a2872d8cf3.png)


Chỉ với vài dòng code ngắn gọn, chúng ta đã có thể tích hợp thanh toán trực tuyến vào hệ thống (trong môi trường sandbox, Braintree cung cấp các trường hợp ví dụ cho trạng thái của transaction theo thông tin thẻ và số tiền nhập vào, tham khảo [tại đây](https://developers.braintreepayments.com/reference/general/testing/node)). 

Ví dụ một transaction thành công
![](https://images.viblo.asia/cd0867d8-a201-427d-aaf4-a0cf8768ffbe.png)

Rất mong bài viết có thể giúp ích cho bạn ^^