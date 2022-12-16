Bài viết được tham khảo [tại đây](https://medium.com/rubyinside/https-medium-com-wintermeyer-caching-in-ruby-on-rails-5-2-d72e1ddf848c) là một bản sao của Chương 14 về bộ nhớ đệm từ cuốn sách “Learn Rails 5.2”

# Sơ lượt
Với bộ nhớ đệm của các ứng dụng web, hầu hết mọi người có xu hướng chờ đợi để thực hiện nó cho đến khi họ gặp phải vấn đề về hiệu suất. Trước tiên, quản trị viên thường xem xét cơ sở dữ liệu và thêm chỉ mục tại đây và ở đó. Nếu điều đó không giúp được gì, quản trị viên sẽ xem xét các chế độ xem và thêm bộ nhớ đệm phân đoạn. Nhưng đây không phải là cách tiếp cận tốt nhất để làm việc với cache.
Mục đích của chương này là giúp bạn hiểu cách hoạt động của bộ nhớ cache dựa trên key-based.
Có hai đối số chính để sử dụng bộ nhớ đệm:
* Ứng dụng trở nên nhanh hơn cho người dùng. Trang web nhanh hơn 
dẫn đến người dùng hạnh phúc hơn, dẫn đến tỷ lệ chuyển đổi tốt hơn.
* Bạn cần ít phần cứng hơn cho máy chủ web vì bạn cần ít 
tài nguyên CPU và RAM hơn để xử lý các truy vấn.

# Mình sẽ quan tâm đến 2 caching methods:
* HTTP caching:
    Đây là sledgehammer trong số các phương pháp lưu trữ và công thức hiệu suất tối thượng. Đặc biệt, các trang web dành cho thiết bị di động nên cố gắng tận dụng tối đa bộ nhớ đệm HTTP . Nếu bạn sử dụng kết hợp bộ nhớ cache dựa trên khóa hết hạn và bộ đệm ẩn HTTP, bạn sẽ tiết kiệm được một lượng thời gian xử lý lớn trên máy chủ và cả băng thông.
* Page caching:
    Đây là tuốc nơ vít trong số các phương pháp lưu trong bộ nhớ cache. Bạn có thể nhận được rất nhiều hiệu suất ra khỏi hệ thống, nhưng nó không phải là tốt như bộ nhớ đệm HTTP.
# Chúng ta bắt tay vào ví dụ nào:
tạo mới một project theo như bên dưới:
```
$ rails new phone_book
 […]
$ cd phone_book
$ rails generate scaffold company name
 […]
$ rails generate scaffold employee company:references  last_name first_name phone_number
 […]
$ rails db:migrate
 […]
```
# Model
chúng ta setup 2 model
```
class Company < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :employees, dependent: :destroy

 def to_s
   name
 end
end
```
và
```
class Employee < ApplicationRecord
  belongs_to :company, touch: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :company, presence: true

  def to_s
  "#{first_name} #{last_name}"
  end
end
```
# Views
ở app/views/companies/index.html.erb
```
<p id="notice"><%= notice %></p>

<h1>Companies</h1>

<table>
  <thead>
   <tr>
     <th>Name</th>
     <th>Number of employees</th>
     <th colspan="3"></th>
    </tr>
  </thead>

  <tbody>
    <% @companies.each do |company| %>
       <tr>
       <td><%= company.name %></td>
       <td><%= company.employees.count %></td>
       <td><%= link_to 'Show', company %></td>
       <td><%= link_to 'Edit', edit_company_path(company) %></td>
       <td><%= link_to 'Destroy', company, method: :delete, data: { confirm: 'Are you sure?' } %></td>
       </tr>
    <% end %>
  </tbody>
</table>

<br>

<%= link_to 'New Company', new_company_path %>
```
ở app/views/companies/show.html.erb
```
<p id="notice"><%= notice %></p>
<p>
  <strong>Name:</strong>
  <%= @company.name %>
</p>
<% if @company.employees.any? %>
  <h1>Employees</h1>
  <table>
    <thead>
      <tr>
      <th>Last name</th>
      <th>First name</th>
      <th>Phone number</th>
      </tr>
    </thead>
    <tbody>
      <% @company.employees.each do |employee| %>
        <tr>
          <td><%= employee.last_name %></td>
          <td><%= employee.first_name %></td>
          <td><%= employee.phone_number %></td>
        </tr>
      <% end %>
    </tbody>
  </table>
<% end %>
<%= link_to 'Edit', edit_company_path(@company) %> |
<%= link_to 'Back', companies_path %>
```
thêm gem: ``` gem 'faker'``` rồi sau đó bundle

add db seed:
```
30.times do
  company = Company.new(:name => Faker::Company.name)
  if company.save
    SecureRandom.random_number(100).times do
      company.employees.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name,
      phone_number: Faker::PhoneNumber.phone_number
      )
    end
  end
end
```
sau đó ```rails db:seed```
# Tốc độ bình thường của trang để tối ưu hóa
### Danh sách tất cả các công ty (Index View)
Tạo trang mất 110.8ms trên máy của tôi.
Hoàn thành 200 OK trong 756ms (Số lần xem: 7737.1ms | ActiveRecord: 12.8ms)
xem riêng 1 cty:
Tạo trang mất 14.6ms trên máy của tôi.
Hoàn thành 200 OK trong 41ms (Số lần xem: 30.8ms | ActiveRecord: 1.8ms)
# HTTP Caching
Trong khung Rails, mục đích của bạn là trả lời câu hỏi “Có một trang đã thay đổi không?” Trong bộ điều khiển. Thông thường, phần lớn thời gian được sử dụng để hiển thị trang trong chế độ xem. Tôi muốn lặp lại rằng: phần lớn thời gian được sử dụng để hiển thị trang trong chế độ xem!
### Sửa đổi lần cuối
chỉnh sửa phương thức hiển thị trong app/controller/companies_controller.rb như sau
```
# GET / companies / 1 
# GET /companies/1.json 
def show 
    fresh_when last_modified: @company.updated_at 
end
```
Sau khi khởi động lại ứng dụng Rails, hãy xem tiêu đề HTTP 
của   http://localhost:3000/companies/1, như được hiển thị ở đây:
```
curl -I http://localhost:3000/companies/1
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Last-Modified: Tue, 29 May 2018 11:26:50 GMT
```
Mục Last-Modified trong tiêu đề HTTP được tạo bởi fresh_when 
trong controller. Nếu sau này bạn truy cập vào cùng một trang web và chỉ định 
thời gian này, thì bạn sẽ không lấy lại trang web; bạn nhận được thông báo 304 
Not Modified, như được hiển thị ở đây:
Trong bản ghi của Rails sẽ thấy:
```
Started HEAD "/companies/1" for 127.0.0.1 at 2018-05-29 18:44:00 +0700
Processing by CompaniesController#show as */*
  Parameters: {"id"=>"1"}
  Company Load (0.1ms)  SELECT  "companies".* FROM "companies" WHERE "companies"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  Rendering companies/show.html.erb within layouts/application
  Employee Exists (0.1ms)  SELECT  1 AS one FROM "employees" WHERE "employees"."company_id" = ? LIMIT ?  [["company_id", 1], ["LIMIT", 1]]
  Employee Load (0.1ms)  SELECT "employees".* FROM "employees" WHERE "employees"."company_id" = ?  [["company_id", 1]]
  Rendered companies/show.html.erb within layouts/application (2.3ms)
Completed 200 OK in 15ms (Views: 19.2ms | ActiveRecord: 0.3ms)
```
Phải mất Rails 15ms trên máy của tôi để trả lời yêu cầu này, so với 
41ms của biến thể chuẩn. Điều này nhanh hơn nhiều! Vì vậy, bạn đã sử dụng 
ít tài nguyên hơn trên máy chủ và lưu một lượng lớn băng thông. 
Người dùng sẽ có thể xem trang nhanh hơn rất nhiều.

# Page Caching
chúng ta thêm gem ```gem 'actionpack-page_caching'``` rồi sau đó ```bundle install```
sau đó chúng ta config tiếp ở config/application.rb
```
config.action_controller.page_cache_directory = "#{Rails.root.to_s}/public/deploy"
```
kích hoạt page caching trong development:
vào ```config/environments/development.rb```
```
config.action_controller.perform_caching = true
```
## Caching Company index và show view
add ```caches_page :show``` vào ```class CompaniesController < ApplicationController
 caches_page :show```
##  gz Versions
Nếu bạn sử dụng bộ nhớ đệm trang, bạn cũng nên lưu vào bộ nhớ cache các tệp .gz được nén trực tiếp. Bạn có thể thực hiện điều này thông qua tùy chọn: gzip => true 
thêm ```gzip: true ``` vào như sau
```
class CompaniesController < ApplicationController
 caches_page :show, gzip: true
```
## Models
ở app/models.company.rb chúng ta sửa thành như sau:
```
class Company < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :employees, dependent: :destroy

  after_create :expire_cache
  after_update :expire_cache
  before_destroy :expire_cache
  
  def to_s
    name
  end

  def expire_cache
    ActionController::Base.expire_page(Rails.application.routes.url_helpers.company_path(self))
    ActionController::Base.expire_page(Rails.application.routes.url_helpers.companies_path)
  end
end
```

ở app/models/employee.rb sửa thành:
```
class Employee < ApplicationRecord
  belongs_to :company, touch: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :company, presence: true

  after_create :expire_cache
  after_update :expire_cache
  before_destroy :expire_cache

  def to_s
    "#{first_name} #{last_name}"
  end

  def expire_cache
    ActionController::Base.expire_page(Rails.application.routes.url_helpers.employee_path(self))
    ActionController::Base.expire_page(Rails.application.routes.url_helpers.employees_path)
    self.company.expire_cache
  end
end
```

dưới đây là  [link bài](https://github.com/ledinhdoan/caching) mẫu của mình hoặc các bạn có thể tham khảo thêm tại [link](http://guides.rubyonrails.org/caching_with_rails.html) này nhé.