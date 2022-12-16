# Stripe là gì?
- Stripe là 1 cổng thanh toán của Mỹ, cho phép các trang thương mại điện tử nhận thanh toán trên website của mình, gồm hơn 135 loại tiền tệ bao gồm 26 nước và đứng thứ 2 trong các cổng thanh toán trực tuyến sau paypal. Bạn có thể thanh toán bằng Visa, Mastercard, American Express, Discover, JCB, Diners Club credit and debit cards

Đọc xong cũng thấy khá nhiều ưu điểm của nó rồi nhỉ ^^, đáng để tìm hiểu và ứng dụng vào trong các website thương mại điện tử đúng không nào?

# Stripe hoạt động như thế nào?
Để xây dựng 1 web thanh toán trực tuyến với strip thì đầu tiên ta phải hiểu nguyên lý hoạt động của nó đã

bao gồm Stripe, Client, Web Server

-  Client sẽ gửi thông tin thẻ tín dụng (email, số thẻm ngày hết hạn, CVC, số tiền) lên Strip
-  Stripe sau khi kiểu tra thông tin hợp lệ sẽ trả về cho Client token.
-  Client nhận được token lúc này mới gửi lên Web server
-  Web server nhận được token và gửi lên Stripe để xác nhận giao dịch
-  Sau khi giao dịch thành công, Stripe sẽ trả response lại cho web server kết quả giao dịch
-  Web server trả kết quả giao dịch lại cho client

Trả qua trả lại cho nhau như vậy đó. Các bạn có thể xem lại sơ đồ miêu tả sau
![](https://images.viblo.asia/1c9268a5-97d9-4277-b03f-b03e6506163d.png)

# Chuẩn bị những thứ gì?
- Tạo new project với rails : rails g new demo-stripe
- add gem 'stripe'
- bundle and rails s
- Tạo tài khoản Stripe trên https://dashboard.stripe.com/register
- Sau khi đăng ký thành công truy cập https://dashboard.stripe.com/test/dashboard có thể nhìn thấy đc publishable key và secret key  
  Lưu ý: stripe cung cấp 2 loại key là `test API key` dùng để test và khi đã sẵn sàng thanh toán thì dùng `live card`

# Test thử với rails c
1. Tạo token
   ```
   require "stripe"
    Stripe.api_key = "sk_test_..."

    Stripe::Token.create(
      card: {
        number: "4242424242424242",
        exp_month: 1,
        exp_year: 2020,
        cvc: "314",
      },
    )
   ```
2.  Hãy thử tạo 1 giao dịch với Stripe::Charge.create
     ```
     require "stripe"
    Stripe.api_key = "sk_test_..."

    Stripe::Charge.create(
      :amount => 2000,
      :currency => "usd",
      :source => "tok_visa", # obtained with Stripe.js
      :description => "Charge for jenny.rosen@example.com"
    )
     ```
     Kết quả trả về sẽ là 1 dạng json bao gồm các thông tin của giao dịch đó. Dễ hiểu phải ko nào
   
   # Áp dụng vào ứng dụng
   Ở bài này mình sẽ demo thử 1 chức năng tạo giao dịch với stripe nhé
   
1.    Tạo controller `charges`
       `rails g controller charges` 
 2. Khái báo pulic key và secrect key trong initializers/stripe.rb
     ```
     Rails.configuration.stripe = {
      :publishable_key => "pk_test_...",
      :secret_key      => "sk_test_..."
    }
    Stripe.api_key = "sk_test_..."
     ```
    Nhớ restart lại server nhé
 3.  Tạo form html để call lên strip và webserver
       Về cơ bản thì Stripe cũng cấp cho chúng ta 1 thư viện js "checkout.js" để tạo ra form thanh toán, và yêu cầu đưa publish key vào làm params key
       
     Các bạn chỉ cần biết trong file
     ```
     # views/charges/new.html.erb
     <%= form_tag charges_path do %>
      <article>
        <% if flash[:error].present? %>
          <div id="error_explanation">
            <p><%= flash[:error] %></p>
          </div>
        <% end %>
        <label class="amount">
          <span>Amount: $5.00</span>
        </label>
      </article>

      # Tạo nút thanh toán bằng thư viện `checkout.js`
      <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
              data-key="<%= Rails.configuration.stripe[:publishable_key] %>"
              data-description="A month's subscription"
              data-amount="500"
              data-name="MinhDT"
              data-image=""
              data-locale="auto">
      </script>
     <% end %>
     ```
     Khá giống với VD 1 ở console phía trên nhỉ!
     
     Note : Nếu bạn ko có cards thì có thể https://stripe.com/docs/testing#cards để test
     
     Ok vậy là thiết lập view đã xong, khá là đơn giản. Như chúng ta đã nói ở phần 2 stripe hoạt động như thế nào? Thì từ client gửi thông tin lên stripe trước và sau khi nhận đc token từ stripe trả về thì lúc đó nó mới gửi lên webserver
     
  4. Kiếm tra params
   
       có thể check lúc này params đc gửi lên server sẽ là:
      - stripeToken: Chính là token từ strip trả về
      - stripeEmail: Email mà ta đã nhập ở form
      - stripeTokenType: type card
  5. charges 
      copy nguyên phần chúng ta đã test ở rails c phía trên vào controller
     ```
     #charges_controllers.rb
     Stripe::Charge.create(
      :amount => 500,
      :currency => "usd",
      :source => params[:stripeToken]
      :description => "Charge for jenny.rosen@example.com"
     )
     ```
     OK như vậy là giao dịch đã thành công
   
       Khá đơn giản đúng không nào?

       Or bạn có thể lấy thông tin customer để có thể thanh toán cho lần sau (phần này mình sẽ nói sau nhé ^^)
       ```
       #charges_controllers.rb
       customer = Stripe::Customer.create(
        :email => params[:stripeEmail],
        :source  => params[:stripeToken]
      )

      charge = Stripe::Charge.create(
        :customer    => customer.id,
        :amount      => 500,
        :description => 'Rails Stripe customer',
        :currency    => 'usd'
      )
       ```
#   Customize form thanh toán
1. Stripe.js là thư viện js để xây dựng các luồng thanh toán + độ bảo mật thông tin cá nhân 1 cách an toàn nhất bao gồm:
   - Thông tin thẻ
   - Chi tiết tài khoản ngân hàng 
   - Thông tin cá nhân  
   - Các phương thức thanh toán thông quá Api
2. Strip Element là các element được xây dựng sẵn để có thể sử dụng với Stripe.js nó giúp cho:
   - Tự động format thông tin card
   - translate placeholders
   - Thiết kế để phù hợp với màn hình mobile
   - Customizeable style    
3.  Customize form thanh toán
    -  Nhúng thư viện stripe.js vào application html
       ```
       <script src="https://js.stripe.com/v3/"></script>
       ```
     -  Tạo 1 instance's element chứa public key.
        ```
        // stripe.js
        $(document).ready(function(){
          var stripe = Stripe('pk_test_HOPRBh4wVwSz9lgfZXjrjvdY');
          var elements = stripe.elements();
        })
        ```
        Nhớ add thêm gem jquery-rails vào nhé ^^
     - Tạo Form thanh toán
        ```
        <%= form_tag charges_path, id: "payment-form" do %>
          <div class="form-row">
            <label for="card-element">
              Credit or debit card
            </label>
            <div id="card-element">
              <!-- A Stripe Element will be inserted here. -->
            </div>

            <!-- Used to display Element errors. -->
            <div id="card-errors" role="alert"></div>
          </div>

          <button>Submit Payment</button>
        <% end %>
        ```

       Nó như 1 component đã được tạo sắn. và chúng ta có thể customize nó ở đây.
       
     -  Add các input vào vào `<div id="card-element">`
        ```
        // Custom styling can be passed to options when creating an Element.
        var style = {
          base: {
            // Add your base input styles here. For example:
            fontSize: '16px',
            color: "#32325d",
          }
        };

        // Create an instance of the card Element.
        var card = elements.create('card', {style: style});

        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');
        ```
        
        Giải thích chỗ này 1 chút
        Đầu tiên chúng ta sẽ tạo style theo ý thích vs base (là style cơ bản của component (ở đây bạn nào có dùng qua react or material thì sẽ ko khó để hiểu và customize đâu))
        
        Sau đó tạo card. Ở đây Stripe cung cấp cho ta các component có sẵn như `'card', 'cardNumber', 'cardExpity', 'cardCvc', 'paymentRequestButton', 'iban', 'idealBank'`
        
        Note: `card` ở đây bao gồm 3 thằng luôn 'cardNumber', 'cardExpity', 'cardCvc' và style `flexible single-line`
        
        Bạn có thể custom từng input 1. thay vì dùng `card` Chúng ta dùng từng cái 1
        
        Các bạn có thể xem chi tiết ở đây https://stripe.com/docs/stripe-js/reference#elements-create
        
      - Chúng ta cũng nên validate khi có sự thay đổi input
        ```
        $(card).change(function(){
          var displayError = document.getElementById('card-errors');
          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = '';
          }
        })
        ```
        
   4. Gắn sự kiện submit form để tạo token
      ```
        // Create a token or display an error when the form is submitted.
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
          event.preventDefault();

          stripe.createToken(card).then(function(result) {
            if (result.error) {
              // Inform the customer that there was an error.
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              // Send the token to your server.
              stripeTokenHandler(result.token);
            }
          });
        });
      ```
      Khi submit sẽ client sẽ call lên Strip băng cách `stripe.createToken` và sẽ trả về token `result.token` nếu success còn không sẽ trả về lỗi `result.error`
      
     5. Sau khi có token thì client chúng ta phải truyền lên webserver để  có thể server có token để thực hiện được giao dịch
         ```
         function stripeTokenHandler(token) {
          // Insert the token ID into the form so it gets submitted to the server
          var form = document.getElementById('payment-form');
          var hiddenInput = document.createElement('input');
          hiddenInput.setAttribute('type', 'hidden');
          hiddenInput.setAttribute('name', 'stripeToken');
          hiddenInput.setAttribute('value', token.id);
          form.appendChild(hiddenInput);

          // Submit the form
          form.submit();
        }
         ```
         
         Tạo các hidden field input để truyền dữ liệu vào rồi gửi lên web server
#      Kết Luận
Việc áp dụng Stripe vào ứng dụng thật sự không hề khó phải không nào. Ở bài sau mình sẽ tiếp tục viết về Saveing Card và 3D Secure,.. Cảm ơn các bạn đã theo dõi