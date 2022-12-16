`Disign pattern` là một trong những giải pháp tối ưu trong việc giải quyết những lỗi kiểu common hay vấn đề tương đối là ngớ ngẩn nếu mắc phải trong quá trình phát triển phần mềm. Khi xây dựng một ứng dụng, giả dụ đứng trên ngôn ngữ Ruby on Rail, bạn sẽ phải thường xuyên đối mặt với những vấn đề như vậy, đặc biệt là khi bạn làm việc với những dự án cỡ lớn mà lại đang không tuân theo một kiến trúc thiết kế phần mềm nào cả.<br />
Ở bài viết này, đơn giản chỉ là điểm mặt qua những mấu thiết kế thường được sử dụng trong quá trình phát triển một ứng dụng băng `Ruby on rail`. Những mẫu `pattern` được nêu ra ắt hẳn phải có những ưu điểm nổi trội gì đó nên mới được tin dùng, nhưng không vì thế mà lạm dụng vì trong một số trường hợp, chúng có thể gây hại kiến trúc của ta thay vì làm nó trở nên tốt hơn.<br />
## Tại sao chúng ta nên sử dụng `design pattern`
Nếu bạn biết tìm ra tiếp cận phù hợp khi sử dụng các mẫu `design pattern` sẽ đem lại rất nhiều lợi ích thiết yếu cho kiến trúc mà bạn đang xây dựng, dưới đây là những ưu điểm, cũng như lý do tại sao bạn nên sử dụng chúng: <br />
1. **Quá trình phát triển nhanh hơn** - chúng ta có thể tăng tốc độ phát triển phần mềm bằng cách sử dụng các mẫu đã được kiểm tra và thiết kế tốt.
2. **Các giải pháp để không có lỗi** - bằng cách sử dụng các mẫu thiết kế, chúng ta có thể loại bỏ một số vấn đề không thể nhìn thấy ở giai đoạn đầu của quá trình phát triển nhưng có thể thấy nhiều hơn trong tương lai. Nếu không có các mẫu thiết kế, việc mở rộng code hoặc xử lý nhiều tình huống hơn có thể sẽ trở nên khó khăn hơn. 
3. **Code dễ đọc hơn và có thể coi là tài liệu cho những chức năng tương tự** - bằng cách áp dụng các quy tắc kiến trúc cụ thể, chúng ta có thể làm cho code của mình dễ đọc hơn. Cũng sẽ dễ dàng hơn khi tuân theo các quy tắc có sẵn mà ai ai cũng nắm rõ.

## Nhược điểm của việc sử dụng `design patterns` sai cách
Mặc dù các mẫu `design pattern` được tạo ra để đơn giản hóa và cải thiện quá trình phát triển kiến trúc, việc sử dụng không phù hợp có thể gây hại cho kiến trúc và làm cho quá trình mở rộng code trở nên khó khăn hơn. <br />
Việc sử dụng sai các mẫu `design patterns` có thể dẫn đến những rủi ro sau:
1. **Thêm logic không cần thiết** - chúng ta có thể làm cho bản thân đoạn code đơn giản hơn nhưng lại chia nó thành nhiều files và tạo một `class` logic bổ sung sẽ khiến việc duy trì kiến trúc và hiểu các quy tắc của một người không tham gia vào việc tạo mã code trở nên khó khăn hơn, phức tạp hơn mức cần thiết.
2. **Quá phức tạp vấn đề** - đôi khi một chức năng chỉ cần đơn giản viết trong 1 hàm, 1 class, do đơn giản quá nên cũng không cần nhất thiết phải tuân theo bất kỳ `design pattern` nào cả dường như lại là lựa chọn đúng đắn.

## Các mẫu thiết kế thường được sử dụng trong các ứng dụng Rails
### 1. Service object
Theo wiki thì Service object PORO – Plain Old Ruby Object, là một ý tượng rất đơn giản về việc tạo ra một class có nhiệm vụ chỉ làm một việc duy nhất.
##### Khi nào thì sử dụng service objects?
1. Khi chúng ta cần thực hiện các phép tính phức tạp hoặc một logic nghiệp vụ, ví dụ: nếu chúng ta cần tính lương của nhân viên dựa trên sự tham gia(những việc làm) của họ.
2. Khi chúng ta cần implement bất kỳ API khác.
3. Khi chúng ta muốn import/export data.
4. Khi chúng ta cần xóa dữ liệu không sử dụng ra khỏi CSDL theo cách hiệu quả mà nó sẽ không ảnh hưởng đến dữ liệu hiện có.

Trong ví dụ dưới đây, chúng ta thực hiện tích hợp `Stripe` với sự trợ giúp của `Service object`. Tại đây, `Stripe Service` sẽ tạo `Stripe customers` dựa trên email address và token.
```ruby
class PaymentsController < ApplicationController
  def create
    PaymentService.new(param).call
    redirect_to payments_path
  
    rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_Payment_path
  end
end
```
Giờ thì tạo payment_service.rb trong your_project/app/services folder.
```ruby
class PaymentService
  def initialize(options = {})
    options.each_pair do |key, value|
      instance_variable_set "@#{key}", value
    end
  end

  def call
    Stripe::Charge.create charge_attributes
  end

  private

  attr_reader :email, :source, :amount, :description

  def amount
    @amount.to_i * 100
  end

  def customer
    @customer ||= Stripe::Customer.create customer_attributes
  end

  def customer_attributes
    {
      email: email,
      source: source
    }
  end

  def charge_attributes
    {
      custormer: customer.id,
      amount: amount,
      description: description
    }
  end
end
```
###  2. View Objects (Presenter)
Cho phép bạn đóng gói tất cả các logic liên quan đến model và views gọn gàng hơn. Các `View object` là mẫu pattern rất dễ để test vì đơn giản chúng là các class.<br />
Để giải quyết vấn đề logic tính toán, chúng ta có thể sử dụng rails helper, nhưng nếu độ phức tạp của đoạn mã quá to, trong trường hợp đó, chúng ta nên sử dụng `Presenter`.
```ruby
<p>
  User Full Name: <%= "#{user.first_name} #{user.last_name}" %>
  <%= link_to "View More Detail", user, class: "w-75 p-3 text-#{user.active? "orange" : "green"} border-#{user.active? ? "orange" : "green"}" %>
</p>
```
Ở đây, chúng ta có thể thấy đoạn nối firsts_name và last_name ở ngay trên views luôn. Đó không phải là một ý tưởng tốt. Do đó để giải quyết vấn đề này, chúng ta sử dung **presenter**. <br />
Hãy tạo một presenter class để giải quyết vấn đề này.
```ruby
class UserPresenter
  def initialize user
    @user = user
  end

  def full_name
    "#{@user.first_name} #{@user.last_name}"
  end

  def css_color
    @user.active? "orange" : "green"
  end
end
```
Hãy lưu đoạn code trên dưới tên file app/presenter/user_presenter.rb và tạo presenter folder nếu bạn chưa có. <br />
Bây giờ, hãy xem lại thành quả của chúng ta sau khi sử dụng presenter nào. 
```ruby
<% presenter = UserPresenter.new(user) %>

<p>
  User Full Name: <%= presenter.full_name %>
  <%= link_to "View More Detail", user, class: "w-75 p-3 text-#{presenter.css_color} border-#{presenter.css-color}" %>
</p>
```
### 3. Query Object
`Query Object` là loại design pattern trong rails cho phép chúng ta tìm và nạp logic truy vấn từ Controller và Models vào các class để có thể tái sử dụng lại. <br />
Ví dụ như chúng ta muốn request một list các post có thể loại là video có số view lớn hơn 1000 và current user có thể access được.
```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.accessible_by(current_ability)
                 .where(type: :view)
                 .where('view_count > ?', 100)
  end
end
```
Sẽ gặp phải vấn đề gì trong đoạn mã trên? <br />
- Đoạn mã trên không thể sử dụng lại
- Rất khó để test
- Bất kỳ thay đổi nào đối với post có thể sẽ phá vỡ logic/code trên.

Để làm cho Controller của bạn gọn gàng hơn, dễ đọc hơn thì chúng ta có thể sử dụng scopes:
```ruby
class Post < ActiveRecord::Base
  scope :video_type, -> { where(type: :video)}
  scope :popular, -> { where("view_count > ?", 1000)}
  scope :popular_video_type, -> { popular.video_type }
end
```
Như vậy, controller sẽ trông như này này:
```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.accessible_by(current_ability)
                 .popular_video_type
  end
end
```
Tuy nhiên, đây lại không phải là giải pháp phù hợp. ở đây chúng ta cần tạo scopes cho một điều kiện truy vấn mà chúng ta muốn thêm, mặc dù đã tăng đoạn mẵ trong model với nhiều tổ hợp scopes khác nhau. <br />
Để giải quyết vấn đề này chúng ta cần sử dụng `Query Object`:
video_query.rb
```ruby
class VideoQuery
  def call ability
    ability
      .where(type: :video)
      .where("video_count > ?", 1000)
  end
end
```
post_controller.rb
```ruby
class PostsController < ApplicationController
  def index
    ability = Post.accessible_by current_ability
    @posts = ViewQuery.new.call ability
  end
end
```
Giờ chúng ta có thể sử dụng class VideoQuery ở bất kỳ chỗ nào mà mình cần.
### 4. Decorators
`Decorator` là một mẫu thiết kế cho phép hành vi được thêm vào một object, độc lập và không ảnh hưởng đến cách hành vi của  các object khác cùng class. **Decorators** có thể rất hữu ích để làm sạch logic/code được viết trong view và controller.<br />
(1) Trước tiên hãy tạo 1 folder `app/decoratr` <br />
(2) Sau đó thêm `decorator helper` vào trong `ApplicationHelper`
```ruby
module ApplicationHelper
  def decorator model_name, decorator_class = nil
    (decorator_class || "#{model_name.class}Decorator".constantize).new(model_name)
  end
end
```
(3) Thêm `base_decorator.rb` vào `app/decorators` folder
```ruby
class BaseDecorator < SimpleDelegator
  def decorate model_name, decorator_class = nil
    ApplicationController.helpers.decorator(model_name, decorator_class)
  end
end
```
(4) Thêm `user_decorator.rb` vào `app/decorators` folder
```ruby
class UserDecorator < BaseDecorator
  def full_name
    "#{full_name} #{last_name}"
  end
end
```
(5)  Khởi tạo @user_decorator trong user_controller
```ruby
class UsersController < ApplicationController
  def show
    @user_decorator = helpers.decorate(current_user)
  end
end
```
(6) Giờ thì hãy sử dụng trên view (show.html.erb)
```ruby
<%= @user_decorator.full_name %>
<%= @user_decorator.email %>
```
### 5. Form Object
`Form Object` là mẫu thiết kế được sử dụng để đóng gói code liên quan đến validation và persisting data thành một đơn vị duy nhất.<br />
Hãy xem ví dụ về Form Object sau để hiểu rõ hơn:<br />
app/controller/posts_controller.rb
```ruby
class PostsController < ApplicationController
  def create
    @post = Post.new post_params
    
    if @post.save
      render json: @post
    else
      render json: @post.error, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :content)
  end
end
```
app/model/post.rb
```ruby
class Post < ActiveRecord::Base
  validates :title, presence: true
  validates :content, presence: true
end
```
Giải pháp tốt hơn là chuyển logic validation sang một lớp đơn lẻ riêng biệt mà chúng ta có thể gọi là PostForm
```ruby
class PostForm
  include ActiveModel::Model
  include Virtus.model

  attribute :id, Integer
  attribute :title, String
  attribute :description, String
  attribute :content, String

  attr_reader :record
  
  def persist
    @record = id ? Post.find(id) : Post.new

    if valid?
      @record.save!
      true
    else
      false
    end
  end
end
```
Bây giờ, chúng ta có thể sử dụng trong posts_controller rồi.
```ruby
class PostsController < ApplicationController
  def create
    @form = PostForm.new post_params
    
    if @form.persist
      render json: @form.record
    else
      render json: @form.error, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :content)
  end
end
```
### 6. Value Object
`Value Object` được khuyến khích sử dụng với mẫu object cỡ nhỏ, đơn giản và cho phép bạn so sánh đối tượng này theo logic đã cho hoặc các thuộc tính cụ thể.<br />
Nó đại diện cho giá trị nhưng không phải là một cái gì đó duy nhất trong hệ thống của bạn như kiểu user object. `Value Object` luôn luôn chỉ trả về giá trị.
```ruby
class EmailReport
  def initialize emails
    @emails = emails
  end

  def data
    emails_data = []

    emails.each do |email|
      emails_data << {
        username: email.match(/([^@]*)/).to_s,
        domain: email.split("@").last
      }
    end

    emails_data
  end

  private
  attr_reader :emails
end
```
Chúng ta sẽ phải áp dụng những điều sau đây với xử lý email:
- Không thay đổi giá trị của email
- Luôn chỉ trả về giá trị

```ruby
def Email
  def initialize email
    @email = email
  end

  def username
    email.match(/([^@]*)/).to_s
  end

  def domain
    email.split("@").last
  end

  def to_h
    { username: username, domain: domain }
  end

  private
  attr_reader :email
end
```

Bây giờ, chúng ta chỉ cần sử dụng đối tượng Email là được
```ruby
class EmailReport
  def initialize emails: emails
    @emails = emails
  end

  def data
    emails.map { |email| Email.new(email).to_h }
  end

  private
  attr_reader :emails
end
```
#### Tham khảo
https://longliveruby.com/articles/rails-design-patterns-the-big-picture