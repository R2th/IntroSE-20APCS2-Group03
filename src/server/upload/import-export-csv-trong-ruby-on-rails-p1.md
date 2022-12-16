Nay mình sẽ hướng dẫn cách import và export file csv đơn giản mà mình biết.
# 1. Tạo project và set up những thứ CẦN thiết
tạo 1 project mới:
```
rails new csv
```

sau đó tạo model:
```
rails g model user name:string email:string phone:string address:string
```

và migrate:
```
rails db:migrate
```

## Tạo controller, view và thêm routes
Tạo home controller: app/controllers/home_controller.rb
```
class HomeController < ApplicationController
  def index
    @users = User.all
  end
end

```

Tạo mới export users controller: app/controllers/export_users_controller.rb
```
class ExportUsersController < ApplicationController
  def index
  end
end
```
Thêm routes:config/routes.rb
```
Rails.application.routes.draw do
  root "home#index"
  resources :export_users
end
```
Rồi tới view: app/views/home/index.html.erb
```
<h1>Đây là màn hình</h1>
```
# 2. Chúng ta cùng đến với export trước nhé
## Tạo service generate CSV
sử dụng gem có sẵn của ruby nên chỉ cần require vào trong service
Service sẽ có 2 tham số truyền vào:

objects: data lấy ra từ database
attributes: các field cần export
app/services/export_csv_service.rb
```
require "csv"

class ExportCsvService
  def initialize objects, attributes
    @attributes = attributes
    @objects = objects
  end

  def perform
  end

  private
  attr_reader :attributes, :objects
end
```
## Tạo header cho file csv
```
class ExportCsvService
  require "csv"
  
  def initialize objects, attributes
    @attributes = attributes
    @objects = objects
    @header = attributes.map { |attr| "#{attr}" }
  end

  def perform
  end

  private
  attr_reader :attributes, :objects, :header
end
```
Tạo file csv trong hàm perform:
```

class ExportCsvService
  require "csv"

  def initialize objects, attributes
    @attributes = attributes
    @objects = objects
    @header = attributes.map { |attr| "#{attr}" }
  end

  def perform
    CSV.generate do |csv|
      csv << header
      objects.each do |object|
        csv << attributes.map{ |attr| object.public_send(attr) }
      end
    end
  end

  private
  attr_reader :attributes, :objects, :header
end
```

Khai báo các field export trong model:
```
class User < ApplicationRecord
  CSV_ATTRIBUTES = %w(name email phone address).freeze
end
```
Gọi service export csv trong controller: app/controllers/export_users_controller.rb
```
class ExportUsersController < ApplicationController
  def index
    csv = ExportCsvService.new User.all, User::CSV_ATTRIBUTES
    respond_to do |format|
      format.csv { send_data csv.perform,
        filename: "users.csv" }
    end
  end
end
```
Thêm nút export và chỉnh lại ngoài view tí nhé:
```
<h1>Đây là màn hình list user</h1>
<table>
  <thead>
    <th>name</th>
    <th>email</th>
    <th>phone</th>
    <th>address</th>
  </thead>
  <% @users.each do |u| %>
    <tbody>
      <td><%= u.name %></td>
      <td><%= u.email %></td>
      <td><%= u.phone %></td>
      <td><%= u.address %></td>
    </tbody>
  <% end %>
</table>
<%= link_to "Ếch pọt", export_users_path(format: :csv) %>

```

À đừng quên add gem mysql2 nhé:
```
gem "mysql2", ">= 0.3.18", "< 0.5"
```

tạo file seed cho model User: db/seeds.rb
```
puts "Creating User ..."
20.times do |index|
  user_params = {
    name: "Name#{index}",
    email: "email_framgia#{index}@gmail.com",
    phone: "0000000#{index}",
    address: "DN#{index}"
  }
  User.create(user_params)
end
```
sau đó chạy seed nhé.
Đến đây chúng ta đã OK chức năng export csv thông thường rồi nhé :D
# 3. Tiếp theo chúng ta cùng đến import nhé
## Dùng gem Roo để hỗ trợ đọc file
add vào gem file:
```
gem "roo"
```
## Tạo controller import
app/controllers/imports_controller.rb
```
class ImportsController < ApplicationController
  def index
    @import = User.new
  end

  def create
    @import = User.import_file params[:file]
    redirect_to root_path
  end
end
```
## Thiết lập view
tại app/views/imports/index.html.erb:

```
<div>
  <h4>Import data</h4>
  <%= form_tag imports_path, multipart: true do %>
    <%= file_field_tag :file %>
    <%= submit_tag "Import" %>
  <% end %>
</div>

```
## Model
thiết lập import tại app/models/user.rb:
```
class User < ApplicationRecord
  CSV_ATTRIBUTES = %w(name email phone address).freeze
  attr_accessor :file

  class << self
    def import_file file
      spreadsheet = Roo::Spreadsheet.open file
      header = spreadsheet.row 1
      (2..spreadsheet.last_row).each do |i|
        row = [header, spreadsheet.row(i)].transpose.to_h
        create! row
      end
    end
  end
end
```
## Routes
```
Rails.application.routes.draw do
  root "home#index"
  resources :export_users
  resources :imports
end
```
chúng ta chỉnh view lại tí nhé:
tại app/views/home/index.html.erb :
```
<h1>Đây là màn hình list user</h1>
<table>
  <thead>
    <th>name</th>
    <th>email</th>
    <th>phone</th>
    <th>address</th>
  </thead>
  <% @users.each do |u| %>
    <tbody>
      <td><%= u.name %></td>
      <td><%= u.email %></td>
      <td><%= u.phone %></td>
      <td><%= u.address %></td>
    </tbody>
  <% end %>
</table>
<%= link_to "Import", imports_path %>
<%= link_to "Ếch pọt", export_users_path(format: :csv) %>
```

đến đây chúng ta đã thành công chức năng import file csv thông thường và phải theo đúng định dạng rồi nhé :D

## Tóm lại:
Bài viết này mình chia sẽ cách import và export đơn giản nhất, phần tiếp theo mình sẽ chia sẽ về validate file import và một số thứ nâng cao hơn nhé !

[Link demo](https://github.com/ledinhdoan/csv) và file csv mẫu để import