Mình đã code bằng Ruby on Rails trong kha khá thời gian và đã giải quyết nhiều bài toán khá phức tạp bằng cách sử dụng framework tuyệt vời này. Dựa trên kinh nghiệm làm việc với RoR, mình đã lập nên một danh sách các Gem mà mình cho là hữu ích nhất. Trong bài viết này, mình muốn chia sẻ danh sách này và cho các bạn thấy làm thế nào để tìm được các Gem hữu ích cho RoR.

Bạn có thể tìm thấy nhiều gem trên tran [rubygems.org](https://rubygems.org/) hoặc trên [github](https://github.com/). Việc tìm kiếm có thể được thực hiện thông qua việc mô tả chức năng gem (trên GitHub, bạn phải chọn Ruby trong danh sách các ngôn ngữ được đưa ra).

Một trang đáng được nhắc đến khi bạn muốn tìm kiếm Gem là [Ruby Toolbox](https://www.ruby-toolbox.com/). Nó cho phép bạn tìm kiếm Gem theo thể loại và mức độ phổ biến. Nhưng không nên chỉ dựa vào nguồn này vì tác giả của trang web [Ruby Toolbox](https://www.ruby-toolbox.com/)  cập nhập danh sách Gem một cách hoàn toàn thủ công.

# 1. Foreigner:
Gem này giúp chúng ta tạo các khóa ngoại cho các bảng. Nó rất dễ sử dụng. Bạn chỉ cần đặt nó vào Gemfile, chạy bundle,  nó sẽ thêm cho bạn hai phương thức mới vào migrations : **add_foreign_key** và **remove_foreign_key**. Ngoài ra, bạn sẽ có thể thêm / xóa các khóa ngay từ  khi **create_table** và cả khi **change_table** với các phương thức **foreign_key** và **remove_foreign_key**.

Hãy tưởng tượng rằng chúng ta cần thêm một khóa từ bảng comments vào bảng posts. Chúng ta có thể làm điều đó theo cách sau:

```
class CreateComments < ActiveRecord::Migration
   def change
      create_table :comments do |t|
         # … t.references :post
         # ...
         t.foreign_key :posts
      end
   # …
   end
end
```
Các phương pháp này có một số tùy chọn bổ sung, ví dụ như:  name, column, dependent,... Bạn có thể đọc thêm về chúng trong [tài liệu này](https://github.com/matthuhiggins/foreigner).

Một số người có thể cho rằng nó không hữu dụng trong các phiên bản của Rails, nhưng điều đó chỉ tính từ phiên bản 4.2 (khi mà chức năng như vậy đã có sẵn). Trong các trường hợp khác, theo ý kiến của mình, Gem này xứng đáng có 1 vị trí trong danh sách những Gem hữu dụng cho RoR.

[**Link to GitHub**](https://github.com/ryanb/letter_opener)
# 2. Letter_opener:
Một Gem đơn giản nhưng rất hữu ích. Trong thực tế, nó là một plugin để lưu email trong các tập tin thay vì gửi chúng. Để kích hoạt gem này, bạn phải đặt letter_opener như một delivery method trong cấu hình của app (ví dụ trong config / enviroments / development.rb).

`config.action_mailer.delivery_method =: letter_opener`

Bây giờ tất cả các thư gửi đi sẽ được lưu trữ trong thư mục / tmp / letter_opener và các email mới sẽ được xem trước trong trình duyệt ngay sau khi dược gửi. Nó rất dễ dàng và thiết thực.

[**Link_to_GitHub**](https://github.com/ryanb/letter_opener)

# 3. Kaminari:
Nếu bạn đã từng làm việc với Rỏ trong một khoảng thời gian, ắt hẳn bạn sẽ không còn xa lạ gì với Gem này nữa. Kaminari cho phép bạn dễ dàng tạo các phân trang cho bất cứ danh sách nào.

Để bắt đầu sử dụng Kaminari, bạn cần đưa nó vào trong Gemfile. Một số chức năng sẽ có sẵn ngay sau khi chạy bundle, ví dụ như: page, per_page và padding. Bây giờ bạn có thể dễ dàng chuyển đổi mảng của bạn thành từng phần phân trang một và  theo sau đó là rất nhiều tính năng phân trang hữu ích.
```
@paginatable_array = Kaminari.paginate_array(my_array_object).page(params[:page]).per(10)
```

Cấu hình mặc định có thể được chỉnh sửa trong Kaminari.configure. default_per_page, max_per_page, max_pages - đây chỉ là một danh sách ngắn các tùy chọn có thể được thay đổi thoe ý thích người dùng.

Bên cạnh đó, phân trang có thể được cấu hình riêng cho từng model:
```
class User < ActiveRecord::Base 
paginates_per 50
end
```
Các mẫu sẽ được tạo trong app/views/kaminari/ và bây giờ bạn có thể dễ dàng chỉnh sửa chúng.

I18n và labels, thêm và url cũng như các tùy chọn hữu ích khác có thể được tìm thấy trong tài liệu hướng dẫn cho Gem này.

[**Link to GitHub**](https://github.com/kaminari/kaminari)

# 4. CarrierWave:
Tương tự Kaminari, CarrierWave là một Gem hết sức phổ biến đối với người dùng RoR.
Với Gem này, bạn có thể tải lên bất kỳ files nào từ ứng dụng RoR của bạn. Tất cả những gì bạn cần làm là:
Tạo một uploader:
```
rails generate uploader ProductPhotoUploader
```
Tiếp theo, thêm vài dòng tùy chọn:
```
class ProductPhotoUploader < CarrierWave::Uploader::Base
   include CarrierWave::MiniMagick
   storage :file
   def store_dir
      "product_images"
   end
   def extension_white_list
      %w(jpg jpeg gif png)
   end
   def filename
      Digest::SHA1.hexdigest(self.read) + File.extname(original_filename)
   end
end
```
Và bạn đã có thể sử dụng uploader để lưa files:
```
uploader = ProductPhotoUploader.new
uploader.store!(my_file)
```

CarrierWave cũng cho phép lưu trữ tệp trong phần lưu trữ tạm thời, hệ thống tệp và thậm chí trong cả đám mây.

Bạn có thể kết nối trình tải lên CarrierWave với ActiveRecord model và lưu tệp của bạn bằng cách lưu bản ghi trong cơ sở dữ liệu:
```
class Retailer < ActiveRecord::Base
   mount_uploader :logo, RetailerLogoUploader
end
retailer = Retailer.new
File.open('logo.jpg') { |f| retailer.logo = f }
retailer.save!
retailer.logo.url # => '/url/to/logo.png'
```
Ngoài ra, bạn còn có thể thay đổi chất lượng của hình ảnh đã tải lên, cắt hình ảnh, mã hóa các tệp và nhiều thứ khác, trong khi tải chúng lên - tất cả điều này có thể được tìm thấy trong tài liệu của CarrierWave.

[**Link_to_GitHub**](https://github.com/carrierwaveuploader/carrierwave)

# 5. Urlify:
Một Gem đơn giản và dễ sử dụng để chuyển đổi các chuỗi ký tự lạ phụ thành chuỗi URI an toàn ASCII. Sau khi cài đặt gem này, bạn có thể gọi hàm urlify cho bất kỳ chuỗi nào và nó sẽ ngay lập tức được chuyển đổi thành một URI tương thích:
```
URLify.urlify('Kj?le Test') #=> kjoele_test
```
Hoặc:
```
URLify.urlify('Kj?le Test', '-') #=> kjoele-test
```
[**Link_to_GitHub**](https://github.com/beastaugh/urlify)

# 6. WickedPdf:
Nó là một plugin cho RoR, giúp tạo PDF từ html. Sau khi thêm Gem này, bạn cần thực hiện các bước tiếp theo:
Chạy lệnh khởi tạo:
```
rails generate wicked_pdf
```
Ghi lại loại:
```
Mime::Type.register "application/pdf", :pdf
```
Hãy chú ý rằng Gem này sử dụng tiện ích wkhtmltopdf và đường dẫn đến tiện ích này sẽ được chỉ định trong phần cài đặt của gem.
```
WickedPdf.config = { exe_path: '/usr/local/bin/wkhtmltopdf' }
```
[**Link_to_GitHub**](https://github.com/mileszs/wicked_pdf)

# 7.Countries:
Nếu bạn phải đối mặt với vấn đề đòi hỏi phải có thông tin khác nhau về các quốc gia, Gem này sẽ cung cấp tất cả dữ liệu bạn cần để giải quyết nó. Nó cho phép tìm kiếm theo tên quốc gia và theo vùng, thông tin tiền tệ (ký hiệu, mã), các định dạng khác nhau về số điện thoại, tọa độ, v.v. Tất cả những gì cần sau khi cài đặt là tạo một đối tượng quốc gia (hoặc lấy nó từ phần trợ giúp toàn cầu) và sau đó bạn có thể rút ra các thông tin cần thiết:
```
c = ISO3166::Country.new('UA')
# or to use global helper  = Country['UA']
c.name      #=> "Ukraine"
c.alpha2#=> "UK" c.alpha3#=> "UKR"
c.longitude #=> "49 00 N"
c.latitude  #=> "32 00 E"
```
Cách lấy thông tin tiền t
```
c.currency.code   #=> "UAH"
c.currency.symbol #=> "?"
c.currency.name   #=> "Hryvnia"
```
Bạn phân vân không biết quốc gia đó có thuộc EU hay ko?
```
c.in_eu? #=> false
```
Dưới đây là ví dụ về tìm kiếm quốc gia theo tên và đơn vị tiền tệ:
```
c = ISO3166::Country.find_country_by_name('Ukraine') 
c = ISO3166::Country.find_country_by_currency('UAH')
```
[**Link_to_GitHub**](https://github.com/hexorx/countries)

# 8.CanCanCan
Lại một Gem hết sức quen thuộc nữa. 

CanCanCan cho phép bạn cài đặt quyền trong RoR. Với sự trợ giúp của nó, bạn có thể dễ dàng hạn chế quyền truy cập vào một số tài nguyên nhất định. Sự tiện lợi của nó nằm trong việc quản lý các quyền truy cập của người dùng với tất cả các quyền được lưu trữ ở một nơi duy nhất. Đó là lý do tại sao bạn không phải lặp lại chúng trong controller, views hoặc những truy vấn cơ sở dữ liệu của bạn.

CanCanCan cần một phương thức **current_user** được định nghĩa trong controller. Vì vậy, lúc đầu, bạn phải chỉnh lại phần xác thực  (ở đây mình đã sử dụng Devise, nhưng cũng có những gem khác có chức năng tương tự). Sau đó, tạo ability:
```
rails generate cancan:ability
```
Chỉ định các quyền của người dùng (các phương thức có thể / không thể) với các action: **:read**, **:create**, **:update** và **:destroy** (bạn có thể tìm hiểu thêm trong tài liệu).
```
class Article::Ability  
  include CanCan::Ability
  def initialize(user)
case user   
  when Admin     
    cannot :manage, :profile     
    can :read, :all       
  when Moderator     
    can :manage, [Apartment, RoomPrice], { lessor_id: user.id }        
    can :manage, Photo, { photographer_id: user.id }     
    can :manage, Lessor, { id: user.id }     
    can :manage, :profile 
end
  end
end
```
Sau đó, trong views bạn có thể sử dụng các helper **can?** và **cannot** để kiểm tra quyền của người dùng hiện tại đối với các hành động cụ thể:
```
<% if can? :update, @article %> <%= link_to "Edit", edit_article_path(@article) %> <% end %>
```
Ngoài ra, bạn có thể sử dụng **authorize!** để cho phép các action trong controller:
```
def show  
  @article = Article.find(params[:id])  
  authorize! :read, @article
end
```
Hoặc bạn có thể sử dụng **load_and_authorize_resource** để tải tài nguyên và cấp quyền cho chúng.

Để xử lý các lỗi liên quan đến quyền, bạn có thể bắt ngoại lệ bằng **CanCan :: AccessDenied** theo cách sau:
```
class ApplicationController < ActionController::Base 
   rescue_from CanCan::AccessDenied do |exception| 
      redirect_to root_url, :alert => exception.message 
   end
end
```
Thông tin bổ sung của CanCanCan có thể tìm thấy trong tại liệu dưới đây.

[**Link_to_GitHub**](https://github.com/CanCanCommunity/cancancan)

# 9.Formtastic:
Gem này cung cấp một DSL (Domain Specific Language) lớn, bằng cách đó, bạn có thể dễ dàng tạo ra các form đẹp, dễ đọc, ngữ nghĩa phong phú. DSL này rất tiện dụng: chỉ cần liệt kê các trường trong một khối **semantic_form_for** cho đối tượng cần thiết và bạn sẽ nhận được một form hoàn chỉnh:
```
<%= semantic_form_for @post do |f| %> 
   <%= f.inputs "Basic", :id => "basic" do %> 
      <%= f.input :title %> 
      <%= f.input :body %> 
   <% end %> 
   <%= f.inputs :name => "Advanced Options", :id => "advanced" do %> 
      <%= f.input :slug, :label => "URL Title", :hint => "Created automatically if left blank", :required => false %> 
      <%= f.input :section, :as => :radio %> 
      <%= f.input :user, :label => "Author" %> 
      <%= f.input :categories, :required => false %> 
      <%= f.input :created_at, :as => :string, :label => "Publication Date", :required => false %> 
   <% end %>
   <%= f.actions do %>
      <%= f.action :submit %> 
   <% end %>
<% end %>
```
Nó cũng hoạt động với các dữ liệu lông nhau:
```
<%= semantic_form_for [@author, @post] do |f| %>
```
Form lồng nhau cũng hoàn toàn khả dụng. Bạn có thể sử dụng **f.semantic_form_for** nhưng phong cách Formtastic trông đẹp hơn với **:for** tùy chọn:
```
<%= semantic_form_for @post do |f| %>
   <%= f.inputs :title, :body, :created_at %> 
   <%= f.inputs :first_name, :last_name, :for => :author, :name => "Author" %> 
   <%= f.actions %>
<% end %>
```
Bạn có thể dễ dang thay đổi input:
```
class StringInput < Formtastic::Inputs::StringInput 
   def to_html
      puts "this is my modified version of StringInput"
      super
   end
end
```
Tạo input của riêng bạn với dữ liệu hiện có:
```
class FlexibleTextInput < Formtastic::Inputs::StringInput 
   def input_html_options 
      super.merge(:class => "flexible-text-area")
   end
end
```
Sau đó bạn có thể sử dụng nó như sau:
```
 :as => :date_picker
```
Formtastic hỗ trợ một danh sách ấn tượng các kiểu đầu vào bao gồm: select, check_boxes, radio, time_zone, datetime_select, range,... localization cơ bản và nâng cao, belongs_to, has_many và has_and_belongs_to_many liên kết và nhiều tính năng khác mà bạn có thể đọc từ [**tài liệu sau**](https://github.com/justinfrench/formtastic).

[**Link_to_GitHub**](https://github.com/justinfrench/formtastic)

# 10.Capistrano:
Công cụ này cho phép thực hiện các lệnh trên nhiều máy từ xa song song thông qua SSH. Gem này cho phép bạn xác định các tác vụ sẽ được áp dụng cho các máy có vai trò nhất định. Nó cũng hỗ trợ các kết nối tunnel thông qua một máy cổng vào.

Sau khi cài đặt Gem, bạn phải chạy lệnh:
```
bundle exec cap install
```
Điều này sẽ tạo một thư mục để cấu hình.

Nếu bạn định sử dụng các môi trường khác nhau, bạn phải thêm thông số STAGES, ví dụ: STAGES = local, sandbox, qa, production.

Để chạy một cap-script, sử dụng lệnh **exec-bundle exec cap [ environments separated by gaps ]  [ command ]**. Ví dụ, triển khai cho môi trường staging sẽ như sau:
```
bundle exec cap staging deploy
```
Dưới đây là một ví dụ đơn giản:
```
server 'example.com', roles: [:web, :app]
server 'example.org', roles: [:db, :workers]
desc "Report Uptimes"
task :uptime do 
   on roles(:all) do |host|
      execute :any_command, "with args", :here, "and here"
      info "Host #{host} (#{host.roles.to_a.join(', ')}):\t#{capture(:uptime)}"
   end
end
```
Xem tài liệu dưới đây để tra cứu các tham số có thể có, biết thêm chi tiết về cách xác định tác vụ, kết nối các plug-ins và nhiều thứ khác.

[**Link_to_GitHub**](https://github.com/capistrano/capistrano)

Vậy là các bạn đã đi qua hết danh sách các Gem mà mình cho là rất hữu dụng trong việc lập trình nên một trang web hoàn chỉnh. Hi vọng các bạn sẽ tìm lấy cho mình được những thông tin bổ ích trong bài viết này. Nếu có điều gì cần chia sẻ hay có một Gem cho RoR mà bạn cực kỳ tâm đắc nhưng không có trong danh sách trên, hãy comment vào bên dưới để chúng ta cùng trao đổi và nâng cao thêm những thông tin hữu ích nhé. Hẹn gặp lại các bạn trong bài viết sau!
[Nguồn](https://dzone.com/articles/10-ruby-on-rails-gems-for-web-development)