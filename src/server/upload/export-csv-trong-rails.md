Bài viết này sẽ giới thiệu một chức năng mà mọi người thường thấy trong các ứng dụng Web đó là Export Csv(Excel).

Mình sẽ demo một ví dụ đơn giản là export dữ liệu người dùng bao gồm các thông tin: tên, số điện thoại, địa chỉ. 

### Tạo mới project và model User
Tạo 1 project mới
``` ruby
rails new export_csv
```

Tạo model User
``` ruby
rails g model user name:string address:text phone:string
```

Migrate
``` ruby
rails db:migrate
```

### Tạo controller, view và thêm route
Tạo home controller
``` ruby
class HomeController < ApplicationController
  def index
  end
end
```

Tạo mới export users controller
``` ruby
# app/controller/export_users_controller.rb
class ExportUsersController < ApplicationController
  def index
  end
end
```

Thêm route, ở đây chúng ta chỉ sử dụng method index.
``` ruby
# config/routes.rb
Rails.application.routes.draw do
  root "home#index"
  resources :export_users, only: :index
end
```

View
``` ruby
# app/views/home/index.html.erb
<h1>Export csv</h1>
```

### Tạo service generate CSV

Chúng ta sẽ sử dụng gem CSV có sẵn của Ruby nên cần require vào trong service

Service sẽ có 2 tham số truyền vào:
- objects: data lấy ra từ database
- attributes: các field cần export
``` ruby
# app/services/export_csv_service.rb
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
Tạo header cho file csv, sử dụng I18n nhé
``` ruby
# app/services/export_csv_service.rb
require "csv"

class ExportCsvService
  def initialize objects, attributes
    @attributes = attributes
    @objects = objects
    @header = attributes.map { |attr| I18n.t("header_csv.#{attr}") }
  end

  def perform
  end

  private
  attr_reader :attributes, :objects, :header
end
```
Tạo file csv trong hàm perform chúng ta sẽ được 1 service hoàn chỉnh
``` ruby
# app/services/export_csv_service.rb
require "csv"

class ExportCsvService
  def initialize objects, attributes
    @attributes = attributes
    @objects = objects
    @header = attributes.map { |attr| I18n.t("header_csv.#{attr}") }
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

### Khai báo các field export trong model

``` ruby
# app/models/user.rb
class User < ApplicationRecord
  CSV_ATTRIBUTES = %w(name address phone).freeze
end
```

### Gọi service export csv trong controller

Ở đây mình sẽ lấy hết User, các bạn có thể query theo ý thích
``` ruby
# app/controllers/export_users_controller.rb
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

### Thêm nút export và I18n cho header
``` ruby
# app/views/home/index.html.erb

<h1><%= t ".title" %></h1>
<%= link_to t(".link_export"), export_users_path(format: :csv) %>
```

``` ruby
# config/locales/en.yml
en:
  home:
    index:
      link_export: Export Users
      title: Export CSV
  header_csv:
    name: Full Name
    address: Address
    phone: Phone Number
```

Ok vậy là demo của mình đã hoàn thành đây là file csv sau khi export
![](https://images.viblo.asia/53870ef4-7bfc-4997-81df-3f7f14eb4bc9.png)

source: https://github.com/cuongtobi/export_csv

library: https://github.com/ruby/csv

Thank for reading!!!!!!