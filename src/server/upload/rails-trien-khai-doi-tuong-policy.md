Bài viết này yêu cầu bạn cần có kiến thức về hướng đối tượng, Ruby và Ruby on Rails.

Mẫu thiết kế policy object là gì?
> Các đối tượng Policy đóng gói và thể hiện một quy tắc nghiệp vụ duy nhất. 
> 
> Trong các ứng dụng của mình, chúng ta có thể có các quy tắc nghiệp vụ khác nhau được mã hóa chủ yếu dưới dạng if - else hoặc câu lệnh switch.
> Các quy tắc này đại diện cho các khái niệm trong miền (domain) của bạn, ví dụ như:
> - Liệu "khách hàng có đủ điều kiện để được giảm giá hay không?"
> - Liệu "email có được gửi hay không?"
> - Liệu "người chơi có được tặng điểm hay không?"
> 
> Nguồn: [Bài viết này](https://medium.com/@steverob/policy-object-d158495265fa)

Bắt đầu thôi nào! (Tác giả sử dụng Rails API làm ví dụ nhưng bài viết này cũng có thể được triển khai trong Rails bình thường)

# 1. Đặt vấn đề
Giả sử chúng ta có bộ điều khiển (controller) sau:
```ruby
# app/controllers/discounts_controller.rb
class DiscountsController < ApplicationController
  def create
    if can_user_get_discount?
      code = GenerateDiscountVoucherCode.new(@current_user.id).call
      render json: { status: "OK", message: "Your Discount Voucher Code: #{code}" }, status: 201
    else
      render json: { status: "Failed", message: "You are not allowed to get Discount Voucher" }, status: 422
    end
  end

  private

  def can_user_get_discount?
    is_premium? &&
    last_discount_more_than_10_days_ago? &&
    high_buyer?
  end

  def is_premium?
    @current_user.premium?
  end

  def last_discount_more_than_10_days_ago?
    @current_user.last_discount_sent_at < ten_days_ago
  end

  def ten_days_ago
    Time.now - 10.days
  end

  def high_buyer?
    @current_user.total_purchase_this_month > 5_000
  end
end
```
Bạn đặt tất cả các logic policy (quy tắc nghiệp vụ) trong controller của mình. Đây không phải là một giải pháp tốt. Đặc biệt trong trường hợp bạn phải xử lý nhiều logic phức tạp (controller nên chỉ sử dụng để điều hướng, tránh xử lý nhiều logic phức tạp).

Nhưng, ta có thể bỏ qua class `GenerateDiscountVoucherCode`. Ta chỉ cần biết là lớp này chịu trách nhiệm tạo ra mã voucher giảm giá.
# 2. Di chuyển logic Policy vào trong model
Well, chúng ta có thể chuyển logic policy vào trong model. Vì thế, nó chuyển thành như vầy:

`app/controllers/discounts_controller.rb`
```ruby
class DiscountsController < ApplicationController
  def create
    if @current_user.can_get_discount?
      code = GenerateDiscountVoucherCode.new(@current_user.id).call
      render json: { status: "OK", message: "Your Discount Voucher Code: #{code}" }, status: 201
    else
      render json: { status: "Failed", message: "You are not allowed to get Discount Voucher" }, status: 422
    end
  end
end
```
`app/models/user.rb`
```ruby
class User < ApplicationRecord
  enum membership: ['regular', 'premium']
  MINIMUM_PURCHASE = 5_000

  def can_get_discount?
    self.premium? &&
    self.last_discount_more_than_10_days_ago? &&
    self.high_buyer?
  end

  def last_discount_more_than_10_days_ago?
    self.last_discount_sent_at < ten_days_ago
  end

  def ten_days_ago
    Time.now - 10.days
  end

  def high_buyer?
    self.total_purchase_this_month > MINIMUM_PURCHASE
  end
end
```
Nhưng đây vẫn chưa phải giải pháp tối ưu. Việc thêm logic policy object mặc dù đã giúp tối ưu controller nhưng lại làm phồng model. Bây giờ, hãy triển khai mẫu thiết kế policy object!
# 3. Tạo một lớp riêng biệt
Bây giờ, ta sẽ tạo một lớp riêng biệt chứa các logic policy như sau:
```ruby
# app/lib/discount_voucher_policy.rb
class DiscountVoucherPolicy
  MINIMUM_PURCHASE = 5_000

  def initialize(user)
    @user = user
  end

  def allowed?
    is_premium? &&
    last_discount_more_than_10_days_ago? &&
    high_buyer?
  end

  private

  def is_premium?
    @user.premium?
  end

  def last_discount_more_than_10_days_ago?
    @user.last_discount_sent_at < ten_days_ago
  end

  def ten_days_ago
    Time.now - 10.days
  end

  def high_buyer?
    @user.total_purchase_this_month > MINIMUM_PURCHASE
  end
end
```
Như vậy, controller và model sẽ trông như sau:

`app/controllers/discounts_controller.rb`
```ruby
class DiscountsController < ApplicationController
  def create
    if policy.allowed?
      code = GenerateDiscountVoucherCode.new(@current_user.id).call
      render json: { status: "OK", message: "Your Discount Voucher Code: #{code}" }, status: 201
    else
      render json: { status: "Failed", message: "You are not allowed to get Discount Voucher" }, status: 422
    end
  end

  private

  def policy
    DiscountVoucherPolicy.new(@current_user)
  end
end
```
`app/models/user.rb`
```ruby
class User < ApplicationRecord
  enum membership: ['regular', 'premium']
end
```
# 4. Tổng kết
So với controller ban đầu của chúng ta, việc này "chỉ là" đặt logic policy vào một class riêng. Đó là sự thật, vì mục đích chính của chúng ta là chuyển logic policy ra khỏi controller và model. 
> Các đối tượng policy đóng gói và thể hiện một quy tắc nghiệp vụ duy nhất.

Bạn sẽ thấy mẫu thiết kế này hữu ích trong trường hợp bạn có logic policy phức tạp. Ví dụ mà tác giả đưa ra là một logic policy đơn giản. 

# Tài liệu tham khảo
Bài viết trên được dịch từ nguồn [Rails: Policy Objects Implementation](https://dev.to/kputra/rails-policy-objects-implementation-50ni)

Cảm ơn các bạn đã đọc bài, chúc các bạn có một ngày làm việc hiệu quả :hugs: