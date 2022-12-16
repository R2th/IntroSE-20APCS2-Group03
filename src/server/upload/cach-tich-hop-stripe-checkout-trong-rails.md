1. Giới thiệu
2. Tạo tài khoản trên stripe
3. Tạo form thanh toán stripe
4. Cài đặt stripe trong ứng dụng rails
5. Cấu hình stripe keys
6. Cài đặt Controller và Service để sử dụng

# 1. Giới thiệu ?
- Stripe là một cổng thanh toán được công nhận, nó cung cấp API để tích hợp Stripe vào các ứng dụng Ruby on Rails. Bài viết này sẽ hướng dẫn các bạn toàn bộ quá trình tích hợp Stripe với ứng dụng Rails.
- Stripe tự động lưu dữ liệu thanh toán quan trọng trên các máy chủ của nó và thực hiện các bảo mật cần thiết, chẳng hạn như mã hóa dữ liệu thẻ tín dụng.

***Các bước để thêm Stripe Checkout vào ứng dụng Rails:***
1.     Tạo một tài khoản cho nhà phát triển trên trang web của Stripe
2.     Cài đặt Stripe gem sử dụng bundle
3.     Cấu hình stripe keys
4.     Tạo routes,controller

# 2. Tạo tài khoản trên stripe
- Chúng ta phải tạo tài khoản trên trang stripe sau đó lấy các khóa API để sử dụng.Các khóa API của Stripe cần để kiểm tra việc tích hợp của cổng thanh toán hợp lệ.
- Sau khi tạo xong tài khoản bạn phải vào mục api keys để lấy khóa : Your Account/Developers/API KEYS hoặc [Stripe Dashboard => API keys](https://dashboard.stripe.com/account/apikeys)
- Dưới đây là hình ảnh cách lấy khóa api:
![](https://images.viblo.asia/db145cd8-c8d2-469f-95c9-17179ce0ba09.png)
**Lưu ý**: Bạn chỉ sử dụng khóa Stripe Live khi sẵn sàng công khai cổng thanh toán.
# 3. Tạo form thanh toán stripe
- Để thực hiện thanh toán chúng ta phải tích hợp mã này vào trang thanh toán của bạn
```
<%= form_tag charges_path do %>
    <article>
      <% if flash[:error].present? %>
      <div id="error_explanation">
        <p><%= flash[:error] %></p>
      </div>
      <% end %>
      <label class="amount">
      <span>Amount: $<%= @order.price %></span>
      </label>
    </article>
    <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
      data-key="<%= Rails.configuration.stripe[:publishable_key] %>"
      data-description="A month's subscription"
      data-amount="<%= @order.price %>"
      data-locale="auto"></script>
<% end %>
```
Như chúng ta thấy, đây chỉ là một form với mã javascript, chúng ta cần truyền các giá trị thích hợp vào để làm cho nó hoạt động.
Khi form này đã được thêm vào trang thanh toán của bạn sẽ có một nút stripe hiện ra, sau khi người dùng click nút thanh toán này một hình thức thanh toán tự động sẽ xuất hiện.Sau khi người dùng điền đầy đủ thông tin và gửi thì Stripe sẽ trả về thông báo thanh công hay thất bại.
Bạn cũng phải thêm các đoạn mã sau để Stripe gửi phản hồi về trang của bạn:
```
< script src = " https://js.stripe.com/v2/ " > < / script > 
```
và
```
<script>
  Stripe.setPublishableKey(‘pk_test_SAfpkFB2WVKLbQVukGCTVq5Z’);
</script>
```
Một giá trị token để xác thực việc gửi dữ liệu của bạn, nếu không có giá trị này thì việc gửi dữ liệu sẽ thất bại:
```
<input type=”hidden” name=”stripeToken” />
```
# 4. Cài đặt stripe trong ứng dụng rails
- Bạn sẽ phải thêm dòng này vào trong GemFIle
```
gem 'stripe'
```
sau đó cài đặt gem sử dụng command:
```
$ bundle
```
cuối cùng tạo controller cho việc thanh toán Stripe bằng command:
```
$ rails g controller charges
```
Tiếp theo chúng ta sẽ cấu hình API keys
# 5. Cấu hình stripe keys
- Đăng nhập vào trang stripe sau đó lấy api keys như mục 2, các khóa này dùng cho môi trường development:
- Lưu các khóa này vào trong tệp secret.yml trong thư mục config.Lưu ý không sử dụng khóa live vì nó sẽ dễ làm mất tính bảo mật của ứng dụng.
```
development:
  stripe_secret_key: 'sk_test_BRPpISwsTFnO5ih1WlxbvSkz'
  stripe_publishable_key: 'pk_test_SAfpkFB2WVKLbQVukGCTVq5Z'
```
*Các khóa ở trên được dùng để test, nếu bạn đã sãn sàng công khai cổng thanh toán thì bạn phải lưu khóa này vào biến môi trường ENV để đảm bảo an toàn*
- Tiếp theo là cấu hình định tuyến và lớp điều khiển trong. Chúng ta cần phải thêm định tuyến trong tệp routes.rb nằm trong thư mục config:
```
resources :charges, only: [:new, :create]
```
# 6. Cài đặt Controller và Service để sử dụng
- Bạn cần thêm đoạn mã sau vào controller:
```
class ChargesController < ApplicationController
  rescue_from Stripe::CardError, with: :catch_exception
  def new
  end

  def create
    StripeChargesServices.new(charges_params, current_user).call
    redirect_to new_charge_path
  end

  private

  def charges_params
    params.permit(:stripeEmail, :stripeToken, :order_id)
  end

  def catch_exception(exception)
    flash[:error] = exception.message
  end
end
```
và đoạn mã này vào service:
```
class StripeChargesServices
  DEFAULT_CURRENCY = 'usd'.freeze
  
  def initialize(params, user)
    @stripe_email = params[:stripeEmail]
    @stripe_token = params[:stripeToken]
    @order = params[:order_id]
    @user = user
  end

  def call
    create_charge(find_customer)
  end

  private

  attr_accessor :user, :stripe_email, :stripe_token, :order

  def find_customer
  if user.stripe_token
    retrieve_customer(user.stripe_token)
  else
    create_customer
  end
  end

  def retrieve_customer(stripe_token)
    Stripe::Customer.retrieve(stripe_token) 
  end

  def create_customer
    customer = Stripe::Customer.create(
      email: stripe_email,
      source: stripe_token
    )
    user.update(stripe_token: customer.id)
    customer
  end

  def create_charge(customer)
    Stripe::Charge.create(
      customer: customer.id,
      amount: order_amount,
      description: customer.email,
      currency: DEFAULT_CURRENCY
    )
  end

  def order_amount
    Order.find_by(id: order).amount
  end
end
```
Khi hoàn thành các bước thực hiện trên, bạn đã tích hợp thành công Stripe checkout vào ứng dụng Rails.

*Nguồn: [tham khảo](https://rubygarage.org/blog/how-to-integrate-stripe-checkout-in-rails-app)*