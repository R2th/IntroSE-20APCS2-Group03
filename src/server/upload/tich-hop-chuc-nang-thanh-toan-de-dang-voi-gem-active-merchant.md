# Mở đầu
Ở thời đại công nghệ phát triển như bây giờ, shopping online đang cực kỳ phát triển. Ta có thể khẳng định điều đó hơn nữa khi đại dịch covid-19 càn quét, khối tài sản của ông chủ amazone đã tăng thêm tới 70 tỷ đô. Lý do là mọi người mua sắm online nhiều hơn khi cách ly, mà mua sắm online thì cần có 1 cổng giao dịch đáng tin cậy thay vì ship COD có thể bị bùng đơn hàng gây mất thời gian và tiền bạc cho người kinh doanh. Sau đây mình xin giới thiệu về gem active_merchant sẽ giúp chúng ta thanh toán 1 cách đơn giản. Gem được support bởi nền tảng ecommerce cực kỳ lớn shopify, và nhà phát triển của CMS ecommerce cũng khá lớn đó là  Spreedly.

# 1. Cài đặt
Mở cmd và tạo project nhé.
- Tạo project
```javascript
rails new app ecommerce_with_active_merchant
```

- Cài đặt gem
```
cd ecommerce_with_active_merchant

gem install activemerchant
```
- Sau đó các bạn nhớ thêm vào gem file nhé
```ruby:GemFile
gem 'activemerchant'
```


- Tạo model
```ruby
rails g scaffold order new cart_id:integer ip_address:string first_name:string last_name:string card_type:string card_expires_on:date

rails g model order_transaction order_id:integer action:string amount:integer success:boolean authorization:string message:string params:text
```

- Config development
```ruby:config/environment/development.rb
config.after_initialize do
  ActiveMerchant::Billing::Base.mode = :test
  ::GATEWAY = ActiveMerchant::Billing::PaypalGateway.new(
    :login => "seller_1229899173_biz_api1.railscasts.com",
    :password => "FXWU58S7KXFC6HBE",
    :signature => "AGjv6SW.mTiKxtkm6L9DcSUCUgePAUDQ3L-kTdszkPG8mRfjaRZDYtSu"
  )
end
```
- Config test
```ruby:config/environment/test.rb
config.after_initialize do
  ActiveMerchant::Billing::Base.mode = :test
  ::GATEWAY = ActiveMerchant::Billing::BogusGateway.new
end
```
- Config production
```ruby:config/environment/production.rb
config.after_initialize do
  ActiveMerchant::Billing::Base.mode = :production
  ::GATEWAY = ActiveMerchant::Billing::PaypalGateway.new(
    :login => "seller_1229899173_biz_api1.railscasts.com",
    :password => "FXWU58S7KXFC6HBE",
    :signature => "AGjv6SW.mTiKxtkm6L9DcSUCUgePAUDQ3L-kTdszkPG8mRfjaRZDYtSu"
  )
end
```

- Ta thêm action xử lý create trong controller
```ruby:orders_controller.rb
def create
  @order = current_cart.build_order(params[:order])
  @order.ip_address = request.remote_ip
  if @order.save
    if @order.purchase
      render :action => "success"
    else
      render :action => "failure"
    end
  else
    render :action => 'new'
  end
end
```

- Tạo model cart.rb
```
rails g model cart
```
- Vì mỗi cart sẽ ứng với 1 order nên ta thêm relation
```ruby:models/cart.rb
class Cart < ApplicationRecord
  has_one :order
end
```

- Chỉnh sửa model order
```ruby:models/order.rb
class Order < ApplicationRecord
  belongs_to :cart
  has_many :transactions, class_name: "OrderTransaction"
  
  attr_accessor :card_number, :card_verification
  
  validate_on_create :validate_card
  
  def purchase
    response = GATEWAY.purchase(price_in_cents, credit_card, purchase_options)
    transactions.create!(:action => "purchase", :amount => price_in_cents, :response => response)
    cart.update_attribute(:purchased_at, Time.now) if response.success?
    response.success?
  end
  
  def price_in_cents
    (cart.total_price*100).round
  end

  private
  
  def purchase_options
    {
      :ip => ip_address,
      :billing_address => {
        :name     => "Sun Staff",
        :address1 => "13F KNE Pham Hung street",
        :city     => "HaNoi",
        :state    => "HN",
        :country  => "VI",
        :zip      => "100000"
      }
    }
  end
  
  def validate_card
    unless credit_card.valid?
      credit_card.errors.full_messages.each do |message|
        errors.add_to_base message
      end
    end
  end
  
  def credit_card
    @credit_card ||= ActiveMerchant::Billing::CreditCard.new(
      :type               => card_type,
      :number             => card_number,
      :verification_value => card_verification,
      :month              => card_expires_on.month,
      :year               => card_expires_on.year,
      :first_name         => first_name,
      :last_name          => last_name
    )
  end
end
```
- Transaction cho order
```ruby:models/order_transaction.rb
class OrderTransaction < ApplicationRecord
  belongs_to :order
  serialize :params

  def response=(response)
    self.success       = response.success?
    self.authorization = response.authorization
    self.message       = response.message
    self.params        = response.params
  rescue ActiveMerchant::ActiveMerchantError => e
    self.success       = false
    self.authorization = nil
    self.message       = e.message
    self.params        = {}
  end
end
```
- Chỉnh sửa form hiển thị thanh toán
```ruby:views/orders/new.html.erb
<%= form_for @order do |f| %>
  <%= f.error_messages %>
  <p>
    <%= f.label :first_name %><br />
    <%= f.text_field :first_name %>
  </p>
  <p>
    <%= f.label :last_name %><br />
    <%= f.text_field :last_name %>
  </p>
  <p>
    <%= f.label :card_type %><br />
    <%= f.select :card_type, [["Visa", "visa"], ["MasterCard", "master"], ["Discover", "discover"], ["American Express", "american_express"]] %>
  </p>
  <p>
    <%= f.label :card_number %><br />
    <%= f.text_field :card_number %>
  </p>
  <p>
    <%= f.label :card_verification, "Card Verification Value (CVV)" %><br />
    <%= f.text_field :card_verification %>
  </p>
  <p>
    <%= f.label :card_expires_on %><br />
    <%= f.date_select :card_expires_on, :discard_day => true, :start_year => Date.today.year, :end_year => (Date.today.year+10), :add_month_numbers => true %>
  </p>
  <p><%= f.submit "Submit" %></p>
<% end %>
```

- Thêm action và view tương ứng cho trạng thái xử lý order
```ruby:order_controller.rb
def success; end
def failure; end
```
```ruby:views/orders/success.html.erb
SUCCESS
```
```ruby:views/orders/failure.html.erb
FAILED
```

### Mirgate database rồi rails s để xem thành quả nhé.
- create order view
![](https://images.viblo.asia/44e7a642-4d1f-4c85-8614-b33477c95b40.png)

-