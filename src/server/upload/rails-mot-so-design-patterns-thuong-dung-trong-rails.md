# Service Objects
Service Objects được dùng khi:

* Có logic xử lý phức tạp (ví như việc tính toán lương của nhân viên)
* Sử dụng API của các dịch vụ bên ngoài (external service)
* Không thuộc về bất kỳ 1 model nào
* Sử dụng nhiều model để xử lý (ví dụ: việc import dữ liệu từ 1 file excel bao gồm thêm data vào nhiều bảng khác nhau)

### Ví dụ

Trong ví dụ dưới đây, công việc được thực hiện bới Strip service bên ngoài (external Strip service). Strip service tạo ra một Strip customer dựa trên email và source (token), và ràng buộc dịch vụ thanh toán (service payment) với tài khoản này.

**Vấn đề**

1. Logic xử lý với external service được nằm trong controller
1. Controller tạo dữ liệu cho một external service
1. Điều này gặp khó khăn trong việc bảo trì và phân bổ controller


```ruby
class ChargesController < ApplicationController
 def create
   CheckoutService.new(params).call
   redirect_to charges_path
 rescue Stripe::CardError => exception
   flash[:error] = exception.message
   redirect_to new_charge_path
 end
end

class CheckoutService
  DEFAULT_CURRENCY = "USD".freeze

  def initialize options = {}
    options.each_pair do |key, value|
      instance_variable_set "@#{key}", value
    end
  end

  def call
    Stripe::Charge.create charge_attributes
  end

  private

  attr_reader :email, :source, :amount, :description

  def currency
    @currency || DEFAULT_CURRENCY
  end

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
      customer: customer.id,
      amount: amount,
      description: description,
      currency: currency
    }
  end
end
```

**CheckoutService** chịu trách nhiệm cho việc tạo tài khoản của Customer và thanh toán. Chúng ta đã giải quyết được vấn đề xử lý nhiều logic trong controller, tuy nhiên vẫn còn vấn đề khác chưa giải quyết. Điều gì sẽ xảy ra nếu external service ném ra 1 ngoại lệ (exception) (ví như khi credit card không hợp lệ) và chúng ta chuyển hướng người dùng đến 1 trang khác?

```ruby
class ChargesController < ApplicationController
  def create
    CheckoutService.new(params).call
    redirect_to charges_path
  rescue Stripe::CardError => exception
    flash[:error] = exception.error
    redirect_to new_charge_path
  end
end
```


Để xử lý vấn đề này, chúng ta sẽ gọi **CheckoutService** và ngăn chặn exception với Interactor Object. Interactors được dử dụng để đóng gói logic nghiệp vụ (business logic). Mỗi Iteractor thường mô tả 1 quy tắc nghiệp vụ (business rule).

Interactor tương tự như **Service Objects**, nhìn chung chúng đều trả về một vài giá trị hiển thị trạng thái thực thi và một số thông tin khác (ngoài việc thực hiện các hành động). Thông thường cũng có sử dụng **Service Objects** bên trong **Interactor Objects.**

Sau đây ta sẽ đi vào ví dụ về cách sử dụng design pattern này:

```ruby
class ChargesController < ApplicationController
  def create
    interactor = CheckoutInteractor.call self

    if interactor.success?
      redirect_to charges_path
    else
      flash[:error] = interactor.error
      redirect_to new_charge_path
    end
  end
end

class CheckoutInteractor
  def self.call context
    interactor = new context 
    interactor.run
    interactor
  end

  attr_reader :error

  def initialize context
    @context = context
  end

  def success?
    @error.nil?
  end
  

  def run
    CheckoutService.new context.params
  rescue Stripe::CardError => exception
    fail! exception.message
  end

  private

  attr_reader :context

  def fail! error
    @error = error
  end
end
```

Di chuyển tất cả các exception có liên quan đến 1 nơi, chúng ta có thể skinny controller. Bây giờ controller chỉ chịu trách nhiệm chuyển hướng người dùng đến các trang cho việc thanh toán thành công hay không thành công

# Form Objects

Form Object is a design pattern that encapsulates logic related to validating and persisting data.

### Ví dụ

Ví dụ điểm hình là việc tạo mới 1 nguời dùng

**Vấn đề**

Model chứa tất cả các logic liên quan đến validation, vì vậy sẽ không thể dùng được cho các thực thể khác, ví như: Admin

```ruby
class UsersController < ApplicationController
  def create
    @user = User.new user_params

    if @user.save
      render json: @user
    else
      render json: @user.error, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user)
      .permit :email, :full_name, :password, :password_confirmation
  end
end

class User < ActiveRecord::Base
  EMAIL_REGEX = /@/ # Some fancy email regex

  validates :full_name, presence: true
  validates :email, presence: true, format: EMAIL_REGEX
  validates :password, presence: true, confirmation: true
end
```

Có 1 giải pháp đó là chuyển toàn bộ logic phần validation đến 1 class đơn được gọi là **UserForm**

```ruby
class UserForm
  EMAIL_REGEX = // # Some fancy email regex

  include ActiveModel::Model
  include Virtus.model

  attribute :id, Integer
  attribute :full_name, String
  attribute :email, String
  attribute :password, String
  attribute :password_confirmation, String

  validates :full_name, presence: true
  validates :email, presence: true, format: EMAIL_REGEX
  validates :password, presence: true, confirmation: true

  attr_reader :record

  def persist
    @record = id ? User.find(id) : User.new

    if valid?
      @record.attributes = attributes.except(:password_confirmation, :id)
      @record.save!
      true
    else
      false
    end
  end
end
```
Sau khi chuyển logic validation đến UserForm, chúng ta sử dụng trong controller:

```ruby
class UsersController < ApplicationController
  def create
    @form = UserForm.new user_params

    if @form.persist
      render json: @form.record
    else
      render json: @form.errors, status: :unpocessably_entity
    end
  end

  private

  def user_params
    params.require(:user)
      .permit :email, :full_name, :password, :password_confirmation
  end
end
```

Và kết quả, model User không còn logic phần validation:


```ruby
class User < ActiveRecord::Base
end
```

# Policy Objects

**Policy Objects** design pattern tương tự như Service Objects, nhưng nó chịu trách nhiệm cho việc read operations, trong khi Service Objects thì write operations. Policy Objects đóng gói các business rule phức tạp và có thể dế dàng thay thế bới Policy Objects với business rule khác.

### Ví dụ

Khi user tạo 1 project thì Controller sẽ kiểm tra xem current user có phải là manager hay không, kiểm tra xem số lượng project của user này đã đạt maximum chưa,....

**Vấn đề**

1. Chỉ có mỗi Controller đó mới sử dụng được policy tạo project
1. Controller sẽ bị phình to vì phải chưa đoạn logic đó

```ruby
class ProjectsController < ApplicationController
   def create
     if can_create_project?
       @project = Project.create!(project_params)
       render json: @project, status: :created
     else
       head :unauthorized
     end
   end

  private

  def can_create_project?
     current_user.manager? &&
       current_user.projects.count < Project.max_count
   end

  def project_params
     params.require(:project).permit(:name, :description)
   end
end

def User < ActiveRecord::Base
  enum role: [:manager, :employee, :guest]
end
  ```
  
  Để giải quyết 2 vấn đề trên chúng ta hay thử sử dụng **Policy Objects** xem thế nào.
  
  ```ruby
  class CreateProjectPolicy
      def initialize(user)
        @user = user
      end

      def allowed?
        @user.manager? && below_project_limit
      end

     private

      def below_project_limit
        @user.projects.count < Project.max_count
      end
end

class ProjectsController < ApplicationController
      def create
        if policy.allowed?
           @project = Project.create!(project_params)
           render json: @project, status: :created
         else
           head :unauthorized
         end
      end

      private

      def project_params
         params.require(:project).permit(:name, :description)
      end

      def policy
         CreateProjectPolicy.new(current_user)
      end
end

def User < ActiveRecord::Base
       enum role: [:manager, :employee, :guest]
end
```

Kết quả nhận được là Controller và Model rất clean, **CreateProjectPolicy** sẽ đảm nhận nhiệm vụ kiểm tra permission và bất cứ Controller hay View.... muốn sử dụng permission logic này đều có thể gọi lại **CreateProjectPolicy**
  
# Decorators

**Decorator Pattern** cho phép chúng ta thêm bất kỳ behavior phụ trợ vào từng đối tượng mà không ảnh hưởng đến các đối tượng khác trong cùng 1 class. Design pattern này được sử dụng rộng rãi để phân chia các chứ năng giữa các class khác nhau là một sự thay thế tốt cho các lớp con để tuân thủ nguyên tắc Single Responsibility Principle. - SRP

### Ví dụ

Chưa sử dụng `Decorator Pattern` trong view có chứa rất nhiều logic

```ruby
#/app/controllers/cars_controller.rb
class CarsController < ApplicationController
 def show
   @car = Car.find(params[:id])
 end
end
```

```html
#/app/views/cars/show.html.erb
<% content_for :header do %>
 <title>
   <% if @car.title_for_head %>
     <%="#{ @car.title_for_head } | #{t('beautiful_cars')}" %>
   <% else %>
     <%= t('beautiful_cars') %>
   <% end %>
 </title>
 <% if @car.description_for_head%>
   <meta name='description' content= "#{<%= @car.description_for_head %>}">
 <% end %>
<% end %>

<% if @car.image %>
 <%= image_tag @car.image.url %>
<% else %>
 <%= image_tag 'no-images.png'%>
<% end %>
<h1>
 <%= t('brand') %>
 <% if @car.brand %>
   <%= @car.brand %>
 <% else %>
    <%= t('undefined') %>
 <% end %>
</h1>

<p>
 <%= t('model') %>
 <% if @car.model %>
   <%= @car.model %>
 <% else %>
    <%= t('undefined') %>
 <% end %>
</p>

<p>
 <%= t('notes') %>
 <% if @car.notes %>
   <%= @car.notes %>
 <% else %>
    <%= t('undefined') %>
 <% end %>
</p>

<p>
 <%= t('owner') %>
 <% if @car.owner %>
   <%= @car.owner %>
 <% else %>
    <%= t('undefined') %>
 <% end %>
</p>

<p>
 <%= t('city') %>
 <% if @car.city %>
   <%= @car.city %>
 <% else %>
    <%= t('undefined') %>
 <% end %>
</p>
<p>
 <%= t('owner_phone') %>
 <% if @car.phone %>
   <%= @car.phone %>
 <% else %>
    <%= t('undefined') %>
 <% end %>
</p>

<p>
 <%= t('state') %>
 <% if @car.used %>
   <%= t('used') %>
 <% else %>
   <%= t('new') %>
 <% end %>
</p>

<p>
 <%= t('date') %>
 <%= @car.created_at.strftime("%B %e, %Y")%>
</p>
```


Sử dụng **Decorator Pattern** 

Viết tất cả logic xử lý ngoài View vào class **CarDecorator**

```ruby
#/app/controllers/cars_controller.rb
class CarsController < ApplicationController
 def show
   @car = Car.find(params[:id]).decorate
 end
end

#/app/decorators/car_decorator.rb
class CarDecorator < Draper::Decorator
 delegate_all
 def meta_title
   result =
     if object.title_for_head
       "#{ object.title_for_head } | #{I18n.t('beautiful_cars')}"
     else
       t('beautiful_cars')
     end
   h.content_tag :title, result
 end

 def meta_description
   if object.description_for_head
     h.content_tag :meta, nil ,content: object.description_for_head
   end
 end

 def image
   result = object.image.url.present? ? object.image.url : 'no-images.png'
   h.image_tag result
 end

 def brand
   get_info object.brand
 end

 def model
   get_info object.model
 end

 def notes
   get_info object.notes
 end

 def owner
   get_info object.owner
 end

 def city
   get_info object.city
 end

 def owner_phone
   get_info object.phone
 end

 def state
   object.used ? I18n.t('used') : I18n.t('new')
 end

 def created_at
   object.created_at.strftime("%B %e, %Y")
 end

 private

 def get_info value
   value.present? ? value : t('undefined')
 end
end
```

Ở view này sẽ rất gọn gàng:

```html
#/app/views/cars/show.html.erb
<% content_for :header do %>
 <%= @car.meta_title %>
 <%= @car.meta_description%>
<% end %>
​
<%= @car.image %>
<h1> <%= t('brand') %> <%= @car.brand %> </h1>
<p> <%= t('model') %> <%= @car.model %>  </p>
<p> <%= t('notes') %> <%= @car.notes %>  </p>
<p> <%= t('owner') %> <%= @car.owner %>  </p>
<p> <%= t('city') %> <%= @car.city %>    </p>
<p> <%= t('owner_phone') %> <%= @car.phone %> </p>
<p> <%= t('state') %> <%= @car.state %>   </p>
<p> <%= t('date') %> <%= @car.created_at%> </p>
```