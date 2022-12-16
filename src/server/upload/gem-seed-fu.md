Gem Seed Fu là một lưa chọn chọn tốt cho việc tạo dữ liệu cho database trong ứng dụng Rails của bạn.

# **Ví dụ cơ bản**

Trong `db/fixtures/users.rb`:

```Ruby

User.seed do |s|
  s.id    = 1
  s.login = "jon"
  s.email = "jon@example.com"
  s.name  = "Jon"
end

User.seed do |s|
  s.id    = 2
  s.login = "emily"
  s.email = "emily@example.com"
  s.name  = "Emily"
end
```

Để load data:

```Ruby

$ rake db:seed_fu
== Seed from /path/to/app/db/fixtures/users.rb
 - User {:id=>1, :login=>"jon", :email=>"jon@example.com", :name=>"Jon"}
 - User {:id=>2, :login=>"emily", :email=>"emily@example.com", :name=>"Emily"}
```

# **Cài đặt**

- Rails 3.1, 3.2, 4.0, 4.1, 4.2, 5.0:
Thêm gem 'seed-fu', '~> 2.3' đến Gemfile của bạn.

- Rails 3.0: Thêm gem 'seed-fu', '~> 2.0.0' đến Gemfile của bạn.

- Rails 2.3: Thêm gem 'seed-fu', '~> 1.2.0' đến Gemfile của bạn.


# **Tính ràng buộc**

Các ràng buộc được xác định trong seeds, chúng có thể được cập nhật khi cần thiết. Ví dụ:

```Ruby

Point.seed(:x, :y) do |s|
  s.x = 4
  s.y = 7
  s.name = "Home"
end
```

Lần đầu tiên file seed được load, sẽ tạo ra một bản ghi Point. Bây giờ giả sử name được thay đổi:

```Ruby

Point.seed(:x, :y) do |s|
  s.x = 4
  s.y = 7
  s.name = "Work"
end
```

Khi chạy file seeds, Seed Fu sẽ tìm một bản ghi Point thích hợp với các ràng buộc :x và :y được cung cấp. Nó sẽ thấy một bản ghi phù hợp đã tồn tại và sau đó cập nhật các thuộc tính thay vì tạo một bản ghi mới.

Nếu bạn không muốn data bị update sau khi chúng được tạo, hãy sử dụng seed_once:

```Ruby

Point.seed_once(:x, :y) do |s|
  s.x = 4
  s.y = 7
  s.name = "Home"
end
```

Ràng buộc mặc định sẽ kiểm tra theo id của bản ghi.

# **Nơi để đặt file seeds**
Mặc định file seeds sẽ được tìm thấy theo đường dẫn sau:
- `#{Rails.root}/db/fixtures` và `#{Rails.root}/db/fixtures/#{Rails.env}` trong app Rails.
- `./db/fixtures` khi load mà không có Rails.

Bạn có thể thay đổi các giá trị mặc định này bằng cách sửa đổi mảng `SeedFu.fixture_paths`.

Các file seed có thể được đặt tên bất kỳ và được tải theo thứ tự bảng chữ cái.

# **Cú pháp Terser**

Khi tải nhiều bản ghi, cú pháp trên có thể khá dài dòng. Bạn có thể sử dụng như sau:

```Ruby

User.seed(:id,
  { :id => 1, :login => "jon",   :email => "jon@example.com",   :name => "Jon"   },
  { :id => 2, :login => "emily", :email => "emily@example.com", :name => "Emily" }
)
```

# Rake task
Các file Seed có thể được chạy tự động bằng cách sử dụng `rake db:seed_fu`. Hoặc thêm options:

- `rake db:seed_fu FIXTURE_PATH=path/to/fixtures` 
- `rake db:seed_fu FILTER=users,articles` -- Chỉ chạy những file seed có file name được filter

Tài liệu dịch: https://github.com/mbleigh/seed-fu