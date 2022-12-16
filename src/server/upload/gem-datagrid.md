Trong bài viết này tôi sẽ giới thiệu cho bạn gem DataGrid. Nó cho phép bạn dễ dàng xây dựng datagrid hay còn gọi là bảng dữ liệu với column được sắp xếp và filters.

# Introduction
Thư viện Ruby giúp bạn xây dựng và biểu diễn dữ liệu dạng bảng với:

*     Customizable filtering
*     Columns
*     Sort order
*     Localization
*     Export to CSV

# ORM Support
* ActiveRecord
* Mongoid
* MongoMapper
* Sequel
* Array (slow but possible)

Để tạo một datagrid ta có đoạn code mẫu như sau
```
class UsersGrid

  include Datagrid

  scope do
    User.includes(:group)
  end

  filter(:category, :enum, select: ["first", "second"])
  filter(:disabled, :xboolean)
  filter(:group_id, :integer, multiple: true)
  filter(:logins_count, :integer, range: true)
  filter(:group_name, :string, header: "Group") do |value|
    self.joins(:group).where(:groups => {:name => value})
  end

  column(:name)
  column(:group, order: -> { joins(:group).order(groups: :name) }) do |user|
    user.name
  end
  column(:active, header: "Activated") do |user|
    !user.disabled
  end

end
```

# Grid DSL
Để tạo báo cáo, bạn cần xác định:
1. Phạm vi của các đối tượng để xem qua
1. Bộ lọc sẽ được sử dụng để lọc dữ liệu
1. Cột sẽ được hiển thị và có thể sắp xếp (nếu có thể)

# Scope
Phạm vi mặc định của các đối tượng để lọc và hiển thị. Trong trường hợp phổ biến, nó là lớp con ActiveRecord::Base (hoặc bất kỳ ORM nào khác được hỗ trợ) với một số phạm vi chung như :
```
scope do
  User.includes(:group)
end
```

# Filters
Mỗi bộ lọc được define bao gồm:
1. Tên của bộ lọc
1. Loại bộ lọc sẽ được sử dụng cho định dạng giá trị
1. Khối điều kiện áp dụng cho phạm vi đã xác định
1. Tùy chọn bổ sung

Datagrid hỗ trợ các loại bộ lọc khác nhau bao gồm:
* text
* integer
* float
* date
* datetime
* boolean
* xboolean - the select of "yes", "no" and any
* enum - selection of the given values
* string
* dynamic - build dynamic SQL condition

# Columns
Mỗi cột được biểu diễn bằng tên và code block để tính giá trị.
```
column(:activated, :header => "Active", :order => "activated", :after => :name) do
  self.activated?
end
```

Một số tùy chọn định dạng cũng có sẵn. Mỗi cột có thể sắp xếp được.

# Front end
## Using Generator
Datagrid có một builtin generator:
```
rails g datagrid:scaffold skills
```

Lệnh cung cấp cho bạn code sử dụng ngay:
```
create  app/grids/skills_grid.rb
create  app/controllers/skills_controller.rb
create  app/views/skills/index.html.erb
route  resources :skills
insert  app/assets/stylesheet/application.css
```

## Customize Built-in partials
Để có thể  kiểm soát datagrid built-in partials hãy chạy:
```
rake datagrid:copy_partials
```
## Advanced frontend
[Advanced frontend được mô tả chi tiết ở đây](https://github.com/bogdan/datagrid/wiki/Frontend)

![](https://images.viblo.asia/6ab6b5a7-a374-4740-8db1-df15594e786d.PNG)

Ref: https://github.com/bogdan/datagrid
Live Demo: http://datagrid.herokuapp.com/