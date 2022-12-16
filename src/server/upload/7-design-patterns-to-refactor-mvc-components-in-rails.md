> Trong bài viết trước, [The Basics of MVC in Rails: Skinny Everything](https://viblo.asia/p/the-basics-of-mvc-in-rails-skinny-everything-LzD5dDPe5jY), chúng ta đã cùng đưa ra các khía cạnh lý thuyết về mô hình MVC design pattern. Chúng ta đã định nghĩa MVC là gì, các thành phần trong mô hình MVC, và đưa ra giải pháp cho việc *Skinny* khi một trong các thành phần chứa logic dư thừa. Trong bài này, chúng ta sẽ đi vào các **Design pattern** cụ thể để cải thiện các thành phần trong mô hình MVC.

## Service Objects (and Interactor Objects)
**Service Objects** được tạo ra khi 1 hành động (action):
- Là phức tạp (ví như việc tính toán lương của nhân viên)
- Sử dụng API của các dịch vụ bên ngoài (`external service`)
- Không thuộc về bất kỳ 1 model nào
- Sử dụng nhiều model để xử lý (ví dụ: việc import dữ liệu từ 1 file excel bao gồm thêm data vào nhiều bảng khác nhau)

**Ví dụ**

Trong ví dụ dưới đây, công việc được thực hiện bới *Strip* service bên ngoài (external Strip service). *Strip* service tạo ra một *Strip* customer dựa trên email và source (token), và ràng buộc dịch vụ thanh toán (service payment) với tài khoản này.

**Vấn đề**
- Logic xử lý với external service được nằm trong controller
- Controller tạo dữ liệu cho một external service
- Điều này gặp khó khăn trong việc bảo trì và phân bổ controller

Để giải quyết vấn đề này, ta cần đóng gói toàn bộ công việc trong một external service:
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
`CheckoutService` chịu trách nhiệm cho việc tạo tài khoản của Customer và thanh toán. Chúng ta đã giải quyết được vấn đề xử lý nhiều logic trong controller, tuy nhiên vẫn còn vấn đề khác chưa giải quyết. Điều gì sẽ xảy ra nếu `external service` ném ra 1 ngoại lệ (`exception`) (ví như khi credit card không hợp lệ) và chúng ta chuyển hướng người dùng đến 1 trang khác?
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
Để xử lý vấn đề này, chúng ta sẽ gọi `CheckoutService` và ngăn chặn exception với **Interactor Object**. **Interactors** được dử dụng để đóng gói logic nghiệp vụ (business logic). Mỗi Iteractor thường mô tả 1 quy tắc nghiệp vụ (business rule).

> `Interactor pattern`  helps us achieve the Single Responsibility Principle (SRP) by using plain old Ruby objects (POROs) – leaving models responsible only at the persistence level

**Interactor** tương tự như **Service Objects**, nhìn chung chúng đều trả về một vài giá trị hiển thị trạng thái thực thi và một số thông tin khác (ngoài việc thực hiện các hành động). Thông thường cũng có sử dụng **Service Objects** bên trong **Interactor Objects**.

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
Di chuyển tất cả các exception có liên quan đến 1 nơi, chúng ta có thể *skinny controller*. Bây giờ controller chỉ chịu trách nhiệm chuyển hướng người dùng đến các trang cho việc thanh toán thành công hay không thành công
## Value Objects
> The `Value Object` design pattern encourages simple, small objects (which usually just contain given values), and lets you compare these objects according to a given logic or simply based on specific attributes (and not on their identity)
> 
Ví dụ: những đối tượng đặc trưng như giá trị tiền tệ (money values) với đa dạng các lợi tiền tệ khác nhau. Sau đó thì ta có thể so sánh `value objects` bằng cách sử dụng 1 đơn vị tiền tệ (như USD). `Value objects` cũng có thể biểu diễn cho nhiệt độ và được so sánh bằng thang đo độ *Kelvin*

**Ví dụ**

Giả sử chúng ta có 1 ngôi nhà thông minh với hệ thống nhiệt điện, và lò sưởi được điều khiển thông qua giao diện của 1 ứng dụng Web.

Một action trong controller nhận tham số đầu vào cho lò sưởi từ bộ cảm biến nhiệt (temperature sensor): nhiệt độ (giá trị số), thang nhiệt độ (Fahrenheit - độ F, Celsius - độ C, or Kelvin -  độ K). Nhiệt độ này được chuyển thành độ K, nếu được cung cấp 1 thang đo độ khác, và Controller sẽ kiểm tra xem liệu nhiệt độ dưới 25 độ C và so sánh với nhiệt độ hiện tại

**Vấn đề**

Controller có chứa nhiều logic lieên quan đến vieec chuyển đổi và so sánh giá trị nhiệt độ
```ruby
class AutomatedThermostaticValvesController < ApplicationController
  SCALES = %w(kelvin celsius fahrenheit)
  DEFAULT_SCALE = "kelvin"
  MAX_TEMPERATURE = 25 + 273.15

  before_action :set_scale

  def heat_up
    was_heat_up = false
    
    if previous_temperature < next_temperature && next_temperature < MAX_TEMPERATURE
      valve.update(degrees: params[:degrees], scale: params[:scale])
      Heater.call(next_temperature)
      was_heat_up = true
    end
    render json: {was_heat_up: was_heat_up}
  end

  private

  def previous_temperature
    kelvin_degrees_by_scale(valve.degrees, valve.scale)
  end

  def next_temperature
    kelvin_degrees_by_scale(params[:degrees], @scale)
  end

  def set_scale
    @scale = SCALES.include?(params[:scale]) ? params[:scale] : DEFAULT_SCALE
  end

  def valve
    @valve ||= AutomatedThermostaticValve.find(params[:id])
  end

  def kelvin_degrees_by_scale(degrees, scale)
    degrees = degrees.to_f
    case scale.to_s
    when "kelvin"
      degrees
    when "celsius"
      degrees + 273.15
    when "fahrenheit"
      (degrees - 32) * 5 / 9 + 273.15
    end
  end
end
```
Chúng ta chuyển phần logic so sánh nhiệt độ tới model, do đó controller chỉ truyền tham số cho method `update`. Tuy nhiên Model vẫn không phải nơi lý tưởng, vì nó chứa quá nhiều cách xử lý chuyển đổi nhiệt độ
```ruby
class AutomatedThermostaticValvesController < ApplicationController
  def heat_up
    valve.update(next_degrees: params[:degrees], next_scale: params[:scale])

    render json: { was_heat_up: valve.was_heat_up }
  end

  private

  def valve
    @valve ||= AutomatedThermostaticValve.find(params[:id])
  end
end

class AutomatedThermostaticValve < ActiveRecord::Base
  SCALES = %w(kelvin celsius fahrenheit)
  DEFAULT_SCALE = 'kelvin'

  before_validation :check_next_temperature, if: :next_temperature
  after_save :launch_heater, if: :was_heat_up

  attr_accessor :next_degrees, :next_scale
  attr_reader :was_heat_up

  def temperature
    kelvin_degrees_by_scale(degrees, scale)
  end

  def next_temperature
    kelvin_degrees_by_scale(next_degrees, next_scale) if next_degrees.present?
  end

  def max_temperature
    kelvin_degrees_by_scale(25, 'celsius')
  end

  def next_scale=(scale)
    @next_scale = SCALES.include?(scale) ? scale : DEFAULT_SCALE
  end

  private

  def check_next_temperature
    @was_heat_up = false
    if temperature < next_temperature && next_temperature <= max_temperature
      @was_heat_up = true
      assign_attributes(
        degrees: next_degrees,
        scale: next_scale,
      )
    end
    @was_heat_up
  end

  def launch_heater
    Heater.call(temperature)
  end

  def kelvin_degrees_by_scale(degrees, scale)
    degrees = degrees.to_f
    case scale.to_s
    when "kelvin"
      degrees
    when "celsius"
      degrees + 273.15
    when "fahrenheit"
      (degrees - 32) * 5 / 9 + 273.15
    end
  end
end
```
Để `Skinny model`, chúng ta cần sử dụng **Value Objects**. Trong khi khởi tạo, `value objects` lấy các giá tri nhiệt độ và thang đo nhiệt. Khi so sánh các đối tượng này, sử dụng method `<=>` để so sánh nhiệt độ của chúng, chuyển đổi thành độ K.
```ruby
class AutomatedThermostaticValvesController < ApplicationController
  def heat_up
    valve.update(next_degrees: params[:degrees], next_scale: params[:scale])
    render json: {was_heat_up: valve.was_heat_up}
  end

  private

  def valve
    @valve ||= AutomatedThermostaticValve.find(params[:id])
  end
end

class AutomatedThermostaticValve < ActiveRecord::Base
  before_validation :check_next_temperature, if: :next_temperature
  after_save :launch_heater, if: :was_heat_up

  attr_accessor :next_degrees, :next_scale
  attr_reader :was_heat_up

  def temperature
    Temperature.new(degrees, scale)
  end

  def temperature=(temperature)
    assign_attributes(temperature.to_h)
  end

  def next_temperature
    Temperature.new(next_degrees, next_scale) if next_degrees.present?
  end

  private

  def check_next_temperature
    @was_heat_up = false
    if temperature < next_temperature && next_temperature <= Temperature::MAX
      self.temperature = next_temperature
      @was_heat_up = true
    end
  end

  def launch_heater
    Heater.call(temperature.kelvin_degrees)
  end
end

class Temperature
  include Comparable
  SCALES = %w(kelvin celsius fahrenheit)
  DEFAULT_SCALE = "kelvin"

  attr_reader :degrees, :scale, :kelvin_degrees

  def initialize(degrees, scale = 'kelvin')
    @degrees = degrees.to_f
    @scale = case scale
    when *SCALES then scale
    else DEFAULT_SCALE
    end

    @kelvin_degrees = case @scale
    when "kelvin"
      @degrees
    when "celsius"
      @degrees + 273.15
    when "fahrenheit"
      (@degrees - 32) * 5 / 9 + 273.15
    end
  end

  def self.from_celsius(degrees_celsius)
    new(degrees_celsius, "celsius")
  end

  def self.from_fahrenheit(degrees_fahrenheit)
    new(degrees_celsius, "fahrenheit")
  end

  def self.from_kelvin(degrees_kelvin)
    new(degrees_kelvin, "kelvin")
  end

  def <=>(other)
    kelvin_degrees <=> other.kelvin_degrees
  end

  def to_h
    {degrees: degrees, scale: scale}
  end

  MAX = from_celsius(25)
end
```
Đây là kết quả của `Skinny controller` và `Skinny model`. Controller không biết bất kỳ điều gì về việc xử lý logic liên quan đến nhiệt độ, và Model cũng không biết về việc so sánh nhiệt độ.
## Form Objects
> `Form Object` is a design pattern that encapsulates logic related to validating and persisting data.
> 
**Ví dụ**

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
Có 1 giải pháp đó là chuyển toàn bộ logic phần validation đến 1 class đơn được gọi là `UserForm`
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
Sau khi chuyển logic validation đến `UserForm`, chúng ta sử dụng trong controller:
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
## Query Objects
> `Query Object` is a design pattern that lets us extract query logic from Controllers and Models into reusable classes.
> 
**Ví dụ**

Yêu cầu 1 danh sách các bài viết với loại là "video", có số lượt xem lớn hơn 100, và người dùng hiện tại có thể truy cập

**Vấn đề**

Tất cả truy vấn logic trong controller:
* Logic này không được tái sử dụng
* Khó khăn để test
* Bất kỳ sự thay đổi nào bên trong đều có thể break đoạn code này

```ruby
class Article < ActiveRecord::Base
  # t.string :type
  # t.integer :view_count
end

class ArticlesController < ApplicationController
  def index
    @articles = Article.accessible_by(current_ability)
      .where type: :video, "view_count > ?", 100
  end
end
```
Bước đầu tiên trong việc cải thiện controller này, ẩn và đóng gói những điều kiện truy vấn cơ bản, cung cấp API đơn giản cho mô hình truy vấn. Trong Rails chúng ta làm điều này bằng cách tao ra các `scope`:
```ruby
class Article < ActiveRecord::Base
  scope :with_video_type, -> {where type: :video}
  scope :popular, -> {where "view_count > ?", 100}
  scope :popular_with_video_type, -> { popular.with_video_type }
end
```
Và bây giờ chúng ta sử dungj API đơn giản để truy vấn mọi thứ cần thiết mà không phải lo lắng
```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.accessible_by(current_ability)
      .popular_with_video_type
  end
end
```
Cách giải quyết này tốt hơn cách làm trước đó, tuy nhiên có một số vấn đề khác phát sinh, chúng ta phải tạo `scope` cho mọi điều kiện truy vấn mà chúng ta muốn gói gọn. Một điều khác nữa `scope` không được sử dụng lại qua các Model khác nhau. Giải pháp cho vấn đề này là sử dụng `Query Object`
```ruby
class PopularVideoQuery
  def call(relation)
    relation.where(type: :video).where("view_count > ?", 100)
  end
end

class ArticlesController < ApplicationController
  def index
    relation = Article.accessible_by(current_ability)
    @articles = PopularVideoQuery.new.call(relation)
  end
end
```
Và bây giờ có thể tái sử dụng, thực hiện truy vấn trên bất kỳ repositories nào có cấu trúc giống nhau.
```ruby
class Attachment < ActiveRecord::Base
  # t.string :type
  # t.integer :view_count
end

PopularVideoQuery.new.call(Attachment.all).to_sql
# "SELECT \"attachments\".* FROM \"attachments\" WHERE \"attachments\".\"type\" = 'video' AND (view_count > 100)"
PopularVideoQuery.new.call(Article.all).to_sql
# "SELECT \"articles\".* FROM \"articles\" WHERE \"articles\".\"type\" = 'video' AND (view_count > 100)"
```
Nếu muốn thay đổi chúng, điều này khá đơn giản:
```ruby
class BaseQuery
  def |(other)
    ChainedQuery.new do |relation|
      other.call call(relation)
    end
  end
end

class ChainedQuery < BaseQuery
  def initialize &block
    @block = block
  end

  def call relation
    @block.call relation
  end
end

class WithStatusQuery < BaseQuery
  def initialize status
    @status = status
  end

  def call(relation)
    relation.where status: @status
  end
end

query = WithStatusQuery.new(:published) | PopularVideoQuery.new
query.call(Article.all).to_sql
# "SELECT \"articles\".* FROM \"articles\" WHERE \"articles\".\"status\" = 'published' AND \"articles\".\"type\" = 'video' AND (view_count > 100)"
```
## View Objects (Serializer/Presenter)
> A `View Object` allows us to take data and calculations that are needed only for surfacing a representation of the Model in the View – such as an HTML page for a website or a JSON response from an API endpoint – out of the Controller and Model.
> 
**Ví dụ**

Chúng ta có đa dạng các actions xả ra tại view, View:
* Tạo 1 ảnh
* Lấy tiêu đề và phần mô tả của bài viết, nếu như không có giá trị thì trả về giá trị mặc định
* Nối họ và tên để thành tên đầy đủ
* Định dạng ngày taoj của bài viết

**Vấn đề**

View chứa nhiều logic tính toán:
```
#before refactoring
#/app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
 def show
   @article = Article.find(params[:id])
 end
end

#/app/views/articles/show.html.erb
<% content_for :header do %>
  <title>
    <%= @article.title_for_head_tag || I18n.t("default_title_for_head") %>
  </title>
  <meta name="description" content="<%= @article.description_for_head_tag || I18n.t("default_description_for_head") %>">
  <meta property="og:type" content="article">
  <meta property="og:title" content="<%= @article.title %>">
  <% if @article.description_for_head_tag %>
    <meta property="og:description" content="<%= @article.description_for_head_tag %>">
  <% end %>
  <% if @article.image %>
    <meta property="og:image" content="<%= "#{request.protocol}#{request.host_with_port}#{@article.main_image}" %>">
  <% end %>
<% end %>

<% if @article.image %>
  <%= image_tag @article.image.url %>
<% else %>
  <%= image_tag "no-image.png"%>
<% end %>
<h1>
  <%= @article.title %>
</h1>

<p>
  <%= @article.text %>
</p>

<% if @article.author %>
  <p>
    <%= "#{@article.author.first_name} #{@article.author.last_name}" %>
  </p>
<% end %>

<p>
  <%= t "date" %>
  <%= @article.created_at.strftime("%B %e, %Y")%>
</p>
```
Để giải quyết vấn đề này, chúng ta tạo ra 1 class presenter đơn giản `ArticlePresenter`, và 1 instance của nó. Bên trong class này thực hiện việc tính toán thích hợp. Và giờ trong View:
```
#/app/views/articles/show.html.erb
<% presenter @article do |article_presenter| %>
  <% content_for :header do %>
    <%= article_presenter.meta_title %>
    <%= article_presenter.meta_description %>
    <%= article_presenter.og_type %>
    <%= article_presenter.og_title %>
    <%= article_presenter.og_description %>
    <%= article_presenter.og_image %>
  <% end %>
  <%= article_presenter.image%>
  <h1> <%= article_presenter.title %> </h1>
  <p>  <%= article_presenter.text %> </p>
  <%= article_presenter.author_name %>
<% end %>
```
## Policy Objects
> `Policy Objects` design pattern tương tự như `Service Objects`, nhưng nó chịu trách nhiệm cho việc `read operations`, trong khi `Service Objects` thì `write operations`. **Policy Objects** đóng gói các *business rule* phức tạp và có thể dế dàng thay thế bới **Policy Objects** với *business rule* khác.

  Kết quả của `Clearn controller và Model`, **Policy objects** đóng gói logic kiểm tra permission, và tất cả sự phục thuộc bên ngoài (external dependencies) từ controller vào `policy objects`, tất cả class đều đảm nhiệm công việc của mình, không xử lý gì thêm
## Decorators
> `Decorator Pattern` cho phép chúng ta thêm bất kỳ behavior phụ trợ nào vào từng đối tương mà không ảnh hưởng đến các đối tượng khác trong cùng 1 class. Design pattern này được sử dụng rộng rãi để phân chia các chứ năng giữa các class khác nhau là một sự thay thế tốt cho các lớp con để tuân thủ nguyên tắc `Single Responsibility Principle. - SRP`


**Ví dụ**

Một vài vấn đề với View:
* Hiển thị ảnh mặc định khi không cung cấp ảnh
* Hiển thi text mặc định nếu các trường không có giá trị
* Định dạng ngày tạo

**Vấn đề**

View chứa nhiều logic xử lý:
```
#/app/controllers/cars_controller.rb
class CarsController < ApplicationController
  def show
    @car = Car.find_by id: params[:id]
  end
end

#/app/views/cars/show.html.erb
<% content_for :header do %>
  <title>
    <% if @car.title_for_head %>
      <%= "#{ @car.title_for_head } | #{t('beautiful_cars')}" %>
    <% else %>
      <%= t("beautiful_cars") %>
    <% end %>
  </title>
  <% if @car.description_for_head%>
    <meta name="description" content= "#{<%= @car.description_for_head %>}">
  <% end %>
<% end %>

<% if @car.image %>
  <%= image_tag @car.image.url %>
<% else %>
  <%= image_tag "no-images.png" %>
<% end %>
<h1>
  <%= t("brand") %>
  <% if @car.brand %>
    <%= @car.brand %>
  <% else %>
    <%= t("undefined") %>
 <% end %>
</h1>

<p>
  <%= t("model") %>
  <% if @car.model %>
    <%= @car.model %>
  <% else %>
    <%= t("undefined") %>
  <% end %>
</p>

<p>
 <%= t("notes") %>
 <% if @car.notes %>
   <%= @car.notes %>
 <% else %>
    <%= t("undefined") %>
 <% end %>
</p>

<p>
  <%= t("owner") %>
  <% if @car.owner %>
    <%= @car.owner %>
  <% else %>
    <%= t("undefined") %>
  <% end %>
</p>

<p>
 <%= t("city") %>
 <% if @car.city %>
   <%= @car.city %>
 <% else %>
    <%= t("undefined") %>
 <% end %>
</p>
<p>
  <%= t("owner_phone") %>
  <% if @car.phone %>
    <%= @car.phone %>
  <% else %>
    <%= t("undefined") %>
  <% end %>
</p>

<p>
  <%= t("state") %>
  <% if @car.used %>
    <%= t("used") %>
  <% else %>
   <%= t("new") %>
  <% end %>
</p>

<p>
  <%= t("date") %>
  <%= @car.created_at.strftime("%B %e, %Y")%>
</p>
```
Cách xử lý:
```ruby
#/app/controllers/cars_controller.rb
class CarsController < ApplicationController
 def show
   @car = Car.find_by(id: params[:id]).decorate
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
        t("beautiful_cars")
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
    object.used ? I18n.t("used") : I18n.t("new")
  end

  def created_at
    object.created_at.strftime("%B %e, %Y")
  end

  private

  def get_info value
    value.present? ? value : t("undefined")
  end
end
```
Và bây giờ kết quả của View:
```
#/app/views/cars/show.html.erb
<% content_for :header do %>
  <%= @car.meta_title %>
  <%= @car.meta_description%>
<% end %>
​
<%= @car.image %>
<h1> <%= t("brand") %> <%= @car.brand %> </h1>
<p> <%= t("model") %> <%= @car.model %>  </p>
<p> <%= t("notes") %> <%= @car.notes %>  </p>
<p> <%= t("owner") %> <%= @car.owner %>  </p>
<p> <%= t("city") %> <%= @car.city %>    </p>
<p> <%= t("owner_phone") %> <%= @car.phone %> </p>
<p> <%= t("state") %> <%= @car.state %>   </p>
<p> <%= t("date") %> <%= @car.created_at%> </p
```
## Tài liệu tham khảo
1, https://www.sitepoint.com/7-design-patterns-to-refactor-mvc-components-in-rails/

2,  https://codeclimate.com/blog/7-ways-to-decompose-fat-activerecord-models/