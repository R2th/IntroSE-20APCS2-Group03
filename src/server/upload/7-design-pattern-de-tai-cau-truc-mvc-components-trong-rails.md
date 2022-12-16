Để các **Model, View, Controller** trong **rails** được gọn gàng, chúng ta phải liên tục tái cấu trúc lại code. Tái cấu trúc là một tiến trình tái cơ cấu lại code hiện có. Trong khi tái cấu trúc không làm thay đổi bất cứ cái gì từ phía góc nhìn của end user, nó giúp cho code được sạch sẽ, dễ dàng bảo trì, test, đem lại nhiều ích lợi cho developer.
<br/><br/>
Tái cấu trúc tuân theo một quy tắc đơn giản là nếu bạn tạo ra một mớ hỗn độn thì chính bạn nên là người tự dọn dẹp nó. Tái cấu trúc là việc liên tục dọn dẹp những thứ xảy ra sau khi code thay đổi. Bạn không thể xây dựng 1 tòa nhà chọc trời hay vẽ 1 bức tranh kiệt tác mà không có nhiều mớ hỗn độn trong quá trình này, và cũng giống như việc viết ra code chất lượng. Đó chính là lý do tại sao chúng ta cần phải tái cấu trúc lại code mỗi khi implement một tính năng mới nào đó.
<br/><br/>
Ở đây mình sẽ giới thiệu 7 design pattern để tái cấu trúc lại code:
<br/>
* Service Objects. 
* Value Objects.
* Form Objects.
* Query Objects.
* View Objects.
* Policy Objects.
* Decorators.
<br/><br/>

# Service Objects
Service Object được sử dụng khi một action có các tính chất:
* phức tạp (ví dụ như tính tiền lương).
* sử dụng API từ bên ngoài.
* không thuộc về riêng 1 model nào đó (ví dụ như xóa các outdated data).
* sử dụng nhiều model (ví dụ như import data từ 1 file ra nhiều model khác nhau).
<br/>

> **Ví dụ**
<br/>
Trong ví dụ bên dưới, hành động sẽ được thực hiện bởi Stripe service. Stripe service này sẽ tạo 1 Stripe customer dựa trên địa chỉ email và 1 nguồn khác (ví dụ như token) và ràng buộc bất kỳ dịch vụ thanh toán nào cho tài khoản này.
<br/>

> **Vấn đề**
> * Logic của hoạt động này với service bên ngoài được đặt bên trong controller.
> * Controller tạo dữ liệu cho 1 service bên ngoài.
> * Rất khó để duy trì và mở rộng controller.
><br/>
```ruby
class ChargesController  exception
    flash[:error] = exception.message
    redirect_to new_charge_path
  end
end
```
Để giải quyết những vấn đề này, chúng ta đóng gói hoạt động lại với một service bên ngoài.
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
 DEFAULT_CURRENCY = 'USD'.freeze

 def initialize(options = {})
   options.each_pair do |key, value|
     instance_variable_set("@#{key}", value)
   end
 end

 def call
   Stripe::Charge.create(charge_attributes)
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
   @customer ||= Stripe::Customer.create(customer_attributes)
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
Kết quả là **CheckoutService** chịu trách nhiệm về việc tạo và thanh toán tài khoản customer. Nhưng sau khi giải quyết được việc có qua nhiều logic trong controller như trên, ta lại gặp 1 vấn đề khác đó là chuyện gì sẽ xảy ra nếu service bên ngoài kia throw 1 exception (ví dụ như credit card không hợp lệ) và chúng ta phải điều hướng user tới 1 page khác ?.
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
Để giải quyết việc này chúng ta thêm 1 CheckoutService call và chặn các exception với **Interactor Object**. Interactor được sử dụng để gói gọn các logic nghiệp vụ. Mỗi interactor thường mô tả 1 quy tắc nghiệp vụ.
<br/><br/>
Mô hình Interactor giúp chúng ta đạt được Nguyên tắc Trách nhiệm Duy nhất (SRP) bằng cách sử dụng plain old Ruby objects (POROs) - để lại các model chỉ chịu trách nhiệm ở mức ổn định. Interactors gần giống với Service Object nhưng thường trả về một số giá trị cho biết trạng thái thực thi và các thông tin khác (ngoài các hành động thực thi). Dưới đây là 1 ví dụ:
```ruby
class ChargesController < ApplicationController
 def create
   interactor = CheckoutInteractor.call(self)

   if interactor.success?
 redirect_to charges_path
   else
 flash[:error] = interactor.error
 redirect_to new_charge_path
   end
 end
end

class CheckoutInteractor
 def self.call(context)
   interactor = new(context)
   interactor.run
   interactor
 end

 attr_reader :error

 def initialize(context)
   @context = context
 end

 def success?
   @error.nil?
 end

 def run
   CheckoutService.new(context.params)
 rescue Stripe::CardError => exception
   fail!(exception.message)
 end

 private

 attr_reader :context

 def fail!(error)
   @error = error
 end
end
```
Bằng cách chuyển tất cả ngoại lệ liên quan đến card ra ngoài, controller của chúng ta đã trở nên gọn gàng hơn, chỉ chịu trách nhiệm chuyển hướng người dùng đến các trang thanh toán thành công hay không thành công.
<br/>
# Value Objects
Value Object khuyến khích các đối tượng đơn giản, nhỏ (thường chỉ chứa các value cho trước)  và cho phép bạn so sánh các đối tượng này theo một logic nhất định hoặc đơn giản dựa trên các thuộc tính cụ thể (và không dựa trên danh tính của chúng). Một ví dụ về value object là các đối tượng biểu diễn các giá trị tiền bằng các loại tiền tệ khác nhau. Sau đó chúng ta có thể so sánh các value object này theo 1 loại tiền cụ thể (ví dụ USD). Ví dụ, value object cũng có thể biểu thị nhiệt độ và được so sánh bằng thang Kelvin.
> **Ví dụ**<br/>
Giả sử chúng ta có 1 ngôi nhà thông minh với máy sưởi điện, và cái máy này được điều khiện thông qua 1 giao diện web. Nhiệm vụ của controller là nhận các thông số cho máy sưởi thông qua 1 cảm biến nhiệt: nhiệt độ (ở dạng số) và thang nhiệt độ (Fahrenheit, Celsius, hoặc Kelvin). Thông số này sẽ được chuyển về thang Kelvin nếu ở nhưng thang khác và controller sẽ kiểm tra nhiệt độ này có nhỏ hơn 25 ° C hay không hay nó có bằng hoặc lớn hơn nhiệt độ hiện tại hay không.

> **Vấn đề**<br/>
Controller chứa quá nhiều logic liên quan đến việc chuyển đổi và so sánh các giá trị nhiệt độ.
```ruby
class AutomatedThermostaticValvesController < ApplicationController
  SCALES = %w(kelvin celsius fahrenheit)
  DEFAULT_SCALE = 'kelvin'
  MAX_TEMPERATURE = 25 + 273.15

  before_action :set_scale

  def heat_up
    was_heat_up = false
    if previous_temperature < next_temperature && next_temperature < MAX_TEMPERATURE
      valve.update(degrees: params[:degrees], scale: params[:scale])
      Heater.call(next_temperature)
      was_heat_up = true
    end
    render json: { was_heat_up: was_heat_up }
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
    when 'kelvin'
      degrees
    when 'celsius'
      degrees + 273.15
    when 'fahrenheit'
      (degrees - 32) * 5 / 9 + 273.15
    end
  end
end
```
Chúng ta có thể chuyển logic so sánh nhiệt độ sang Model, vậy nên Controller chỉ chuyển các tham số tới phương thức cập nhật. Nhưng Model vẫn không lý tưởng - nó biết quá nhiều về cách xử lý chuyển đổi nhiệt độ.
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
    when 'kelvin'
      degrees
    when 'celsius'
      degrees + 273.15
    when 'fahrenheit'
      (degrees - 32) * 5 / 9 + 273.15
    end
  end
end
```
Để làm cho model trở nên gọn hơn, chúng ta tạo **Value Object**. Khi khởi tạo, các đối tượng nhận các giá trị nhiệt độ và thang độ. Khi so sánh các đối tượng này, spaceship method (<=>) sẽ so sánh nhiệt độ của chúng, chuyển thành Kelvin. 
<br/><br/>
Value Object này cũng chứa 1 method to_h để gán các thuộc tính khối. Value Object cung cấp các method **from_kelvin, from_celsius, and from_fahrenheit** để dễ dàng tạo các object từ nhưng thang độ khác nhau.(ví dụ **Temperature.from_celsius(0)** sẽ tạo 1 object với 0°C hoặc 273°К)
<br/>
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
  DEFAULT_SCALE = 'kelvin'

  attr_reader :degrees, :scale, :kelvin_degrees

  def initialize(degrees, scale = 'kelvin')
    @degrees = degrees.to_f
    @scale = case scale
    when *SCALES then scale
    else DEFAULT_SCALE
    end

    @kelvin_degrees = case @scale
    when 'kelvin'
      @degrees
    when 'celsius'
      @degrees + 273.15
    when 'fahrenheit'
      (@degrees - 32) * 5 / 9 + 273.15
    end
  end

  def self.from_celsius(degrees_celsius)
    new(degrees_celsius, 'celsius')
  end

  def self.from_fahrenheit(degrees_fahrenheit)
    new(degrees_celsius, 'fahrenheit')
  end

  def self.from_kelvin(degrees_kelvin)
    new(degrees_kelvin, 'kelvin')
  end

  def <=>(other)
    kelvin_degrees <=> other.kelvin_degrees
  end

  def to_h
    { degrees: degrees, scale: scale }
  end

  MAX = from_celsius(25)
end
```
Kết quả là ta có 1 model và controller khá gọn gàng. **Controller** (AutomatedThermostaticValvesController) không hề biết gì về các chuyển đổi nhiệt độ, **Model** (AutomatedThermostaticValve) thì cũng không biết gì luôn mà chỉ sử dụng duy nhất các method từ **Temperature value object**.
# Form Objects
Form Object là một design pattern đóng gói logic liên quan đến việc xác thực và lưu trữ dữ liệu.
> **Ví dụ**<br/>
Giả sử chúng ta có một Rails Model và Controller rất cơ bản để tạo user mới.

> **Vấn đề**<br/>
Model chứa tất cả logic xác thực, vì vậy nó không thể sử dụng lại cho các thực thể khác, ví dụ: Admin.
```ruby
class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      render json: @user.error, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:email, :full_name, :password, :password_confirmation)
  end
end

class User < ActiveRecord::Base
  EMAIL_REGEX = /@/ # Some fancy email regex

  validates :full_name, presence: true
  validates :email, presence: true, format: EMAIL_REGEX
  validates :password, presence: true, confirmation: true
end
```
Một giải pháp là di chuyển logic xác nhận vào 1 class chịu trách nhiệm riêng biệt duy nhất là **UserForm**:
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
Sau khi chúng ta chuyển logic xác thực sang UserForm, chúng ta có thể sử dụng nó trong Controller như sau:
```ruby
class UsersController < ApplicationController
  def create
    @form = UserForm.new(user_params)

    if @form.persist
      render json: @form.record
    else
      render json: @form.errors, status: :unpocessably_entity
    end
  end

  private

  def user_params
    params.require(:user)
          .permit(:email, :full_name, :password, :password_confirmation)
  end
end
```
Kết quả là, Model user không còn chịu trách nhiệm xác thực dữ liệu:
```ruby
class User < ActiveRecord::Base
end
```
# Query Objects
Query Object là một design pattern cho phép chúng ta trích xuất logic truy vấn từ Controller và Model thành các lớp có thể tái sử dụng.
> **Ví dụ**<br/>
Chúng ta muốn request 1 list các article có type "video" có lượt xem lớn hơn 100 và người dùng hiện tại có thể truy cập.

> **Vấn đề**<br/>
Tất cả logic truy vấn nằm trong Controller (tất cả các điều kiện truy vấn được áp đặt trong Controller).
> * Logic này không thể tái sử dụng được.
> * Khó để test.
> * Bất kì thay đổi nào với article schema cũng có thể break the code.
<br/>
```ruby
class Article < ActiveRecord::Base
    # t.string :status
    # t.string :type
    # t.integer :view_count
  end

 class ArticlesController < ApplicationController
    def index
      @articles = Article
                  .accessible_by(current_ability)
                  .where(type: :video)
                  .where('view_count > ?', 100)
    end
  end
```
Bước đầu tiên để refactor lại controller này là giấu và đóng gói các điều kiện truy vấn cơ bản và cung cấp một API đơn giản cho query models. Trong rails chúng ta có thể sử dụng scope:
```ruby
class Article < ActiveRecord::Base
  scope :with_video_type, -> { where(type: :video) }
  scope :popular, -> { where('view_count > ?', 100) }
  scope :popular_with_video_type, -> { popular.with_video_type }
end
```
Bây giờ chúng ta có thể sử dụng API đơn giản này để truy vấn mọi thứ chúng ta cần mà không phải lo lắng về việc triển khai cơ bản. Nếu article schema bị thay đổi, ta chỉ cần thực hiện thay đổi đối với class article:
```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article
                .accessible_by(current_ability)
                .popular_with_video_type
  end
end
```
Cách làm trên cũng tốt, tuy nhiên lại phát sinh một số vấn đề mới. Chúng ta phải tạo scope cho mỗi điều kiện truy vấn ta muốn đóng gói. Làm cho model trở nên chật chội với các combination khác nhau của mỗi scope cho các use case khác nhau. Một vấn để khác là scope không thể tái sử dụng cho các model khác nhau. Không nhưng thế chúng ta còn phá vỡ quy tắc trách nhiệm duy nhất vì đã ném tất cả các trách nhiệm liên quan đến truy vấn vào class Article. Lời giải cho vấn để này là sử dụng **Query Object**
```ruby
class PopularVideoQuery
  def call(relation)
    relation
      .where(type: :video)
      .where('view_count > ?', 100)
  end
end

class ArticlesController < ApplicationController
  def index
    relation = Article.accessible_by(current_ability)
    @articles = PopularVideoQuery.new.call(relation)
  end
end
```
Bây giờ nó có thể tái sử dụng được, chúng ta có thể sử dụng lớp này để truy vấn bất kỳ kho lưu trữ nào khác có lược đồ tương tự:
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
Nếu chúng ta muốn chain chúng:
```ruby
class BaseQuery
  def |(other)
    ChainedQuery.new do |relation|
      other.call(call(relation))
    end
  end
end

class ChainedQuery < BaseQuery
  def initialize(&block)
    @block = block
  end

  def call(relation)
    @block.call(relation)
  end
end

class WithStatusQuery < BaseQuery
  def initialize(status)
    @status = status
  end

  def call(relation)
    relation.where(status: @status)
  end
end

query = WithStatusQuery.new(:published) | PopularVideoQuery.new
query.call(Article.all).to_sql
# "SELECT \"articles\".* FROM \"articles\" WHERE \"articles\".\"status\" = 'published' AND \"articles\".\"type\" = 'video' AND (view_count > 100)"

```
Bây giờ chúng ta có một lớp có thể tái sử dụng với tất cả các logic truy vấn được đóng gói, với một giao diện đơn giản, dễ dàng để kiểm tra.
# View Objects
View Object cho phép chúng ta lấy dữ liệu và tính toán chỉ cần thiết để hiển thị Model trong View - chẳng hạn như trang HTML cho trang web hoặc JSON response API - nằm ngoài Controller và Model.
> **Ví dụ**<br/>
Có nhiều hành động (tính toán) khác nhau xảy ra trong View. View:
> * Tạo 1 image URL từ protocol host và image path.
> * Lấy tiêu đề và mô tả bài viết; nếu không có bất kỳ giá trị tùy chỉnh nào, nó sẽ có giá trị mặc định.
> * Nối tên và họ để hiển thị họ tên đầy đủ.
> * Áp dụng định dạng đúng cho ngày tạo bài viết.
<br/>

> **Vấn đề**<br/>
View chứa quá nhiều logic tính toán.
```ruby
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
     <%= @article.title_for_head_tag || I18n.t('default_title_for_head') %>
 </title>
 <meta name='description' content="<%= @article.description_for_head_tag || I18n.t('default_description_for_head') %>">
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
 <%= image_tag 'no-image.png'%>
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
<%end%>

<p>
 <%= t('date') %>
 <%= @article.created_at.strftime("%B %e, %Y")%>
</p>
```
Để giải quyết vấn đề này, chúng ta tạo 1 **presenter** class và tạo 1 **ArticlePresenter** class instance. ArticlePresenter method trả về các tag mong muốn với các phép tính thích hợp:
```ruby
#/app/controllers/articles_controller.rb
class ArticlesController 
```
Bây giờ chúng ta đã có View không bao gồm bất kì logic tính toán nào hết , tất cả đã được chuyển qua presenter và có thể tái sử dụng ở View khác.
```ruby
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
# Policy Objects
Policy Object gần tương tự với Service Object, nhưng chịu trách nhiệm cho các hoạt động đọc trong khi các Service Object chịu trách nhiệm cho các hoạt động ghi. Policy Object đóng gói các quy tắc nghiệp vụ phức tạp và có thể dễ dàng được thay thế bằng các Policy Object khác với các rule khác nhau. Ví dụ: chúng ta có thể kiểm tra xem người dùng khách có thể truy xuất một số tài nguyên nhất định hay không bằng cách dùng Policy Object.  Nếu người dùng là admin, chúng ta có thể dễ dàng thay đổi Policy Objecth khách này thành Policy Object của admin chứa các rule của admin.
> **Ví dụ**<br/>
Trước khi user tạo 1 project, controller sẽ check xem user hiện tại là manager hay không, check xem họ có quyền tạo project hay không, hay check xem số lượng project mà user đã tạo đã đạt giới hạn hay chưa và kiểm tra sự hiện diện của các block trong khi tạo project bằng việc key / value trong Redis.

> **Vấn đề**<br/>
> * Chỉ có Controller mới biết về các policy của việc tạo project.
> * Controller chứa logic quá mức.
<br/>
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
       current_user.projects.count < Project.max_count &&
       redis.get('projects_creation_blocked') != '1'
   end

  def project_params
     params.require(:project).permit(:name, :description)
   end

  def redis
      Redis.current
    end
  end

  def User < ActiveRecord::Base
     enum role: [:manager, :employee, :guest]
  end
```
Để làm gọn lại controller, chúng ta chuyển policy logic qua Model. Kết quả là tất cả đã được ném ra khỏi controller nhưng Model lại biết quá nhiều về Redis và Project class logic.
```ruby
def User < ActiveRecord::Base
  enum role: [:manager, :employee, :guest]

  def can_create_project?
    manager? &&
      projects.count < Project.max_count &&
        redis.get('projects_creation_blocked') != '1'
  end

  private

  def redis
    Redis.current
  end
end

class ProjectsController < ApplicationController
  def create
    if current_user.can_create_project?
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
end
```
Trong trường hợp này, ta có thể làm cả Model va Controller gon lại bằng cách chuyển các logic policy qua Policy Object:
```ruby
class CreateProjectPolicy
  def initialize(user, redis_client)
    @user = user
    @redis_client = redis_client
  end

  def allowed?
    @user.manager? && below_project_limit && !project_creation_blocked
  end

 private

  def below_project_limit
    @user.projects.count < Project.max_count
  end

  def project_creation_blocked
    @redis_client.get('projects_creation_blocked') == '1'
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
     CreateProjectPolicy.new(current_user, redis)
  end

  def redis
     Redis.current
  end
end

def User < ActiveRecord::Base
   enum role: [:manager, :employee, :guest]
end

```
Kết quả là 1 controller và model khá sạch sẽ gọn gàng. Policy Object đóng gói logic kiểm tra quyền, và tất cả các phụ thuộc bên ngoài được inject từ Controller vào Policy Object. Tất cả các class đều làm công việc của riêng mình và không có ai khác.
# Decorators
Decorator cho phép chúng ta thêm bất kỳ loại hành vi phụ trợ nào vào các đối tượng riêng lẻ mà không ảnh hưởng đến các đối tượng khác của cùng một class. Design Pattern này được sử dụng rộng rãi để phân chia chức năng trên các class khác nhau và là một lựa chọn tốt cho các class con để tôn trọng Nguyên tắc về trách nhiệm duy nhất (Single Responsibility Principle).
> **Ví dụ**<br/>
Giả sử chúng ta có rất nhiều các hành động(tính toán) xảy ra trong view:
> * Tiêu đề được hiển thị khác nhau tùy thuộc vào giá trị của **title_for_head**.
> * View hiển thị hình ảnh mặc định khi không được cung cấp URL hình ảnh tùy chỉnh.
> * View hiển thị văn bản mặc định khi các giá trị không được xác định.
> * ....
<br/>

> **Vấn đề**<br/>
View chứa hơi nhiều logic rồi đấy -_-
```ruby
#/app/controllers/cars_controller.rb
class CarsController < ApplicationController
 def show
   @car = Car.find(params[:id])
 end
end

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
Chúng tôi có thể giải quyết vấn đề này với **gem Draper**, di chuyển tất cả logic đến các method CarDecorator:
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
Sau đó thì View chỉ cần thế này:
```ruby
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
# Tổng kết lại
Những khái niêm trên cung cấp cho chúng ta những hiểu biết cơ bản về việc refactor lại code, khi nào cần refactor và refactor thế nào. Bằng cách viêt code cẩn thận và đặt các logic hợp lý ngay từ ban đầu, bạn có thể giảm phần lớn thời gian ngồi hì hục refactor lại code.
<br/><br/>
Hy vọng bài viêt này có ích với các ban.
<br/>
Chào thân ái và không hẹn gặp lại  △.
<br/>
*~~wasted 10 minutes of your life~~*
<br/>


-----


Nguồn: https://www.sitepoint.com/7-design-patterns-to-refactor-mvc-components-in-rails/