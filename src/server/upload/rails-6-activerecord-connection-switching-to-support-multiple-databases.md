__ActiveRecord trong Rails 6 giờ đây đã hỗ trợ thay đổi các connection (connection switching), điều này có nghĩa là chúng ta có thể sử dụng multiple database. Và hơn thế nữa là dùng nhiều database connections khác nhau cho việc đọc/ghi các bản sao của dữ liệu giúp tăng hiệu năng cho app.__

Trước đây thì sao? Trước Rails 6, có một số gem như [SecondBase](https://github.com/customink/secondbase) hay [MultiVerse](https://github.com/ankane/multiverse) cũng cho phép kết nối các models vào nhiều database khác nhau. Mỗi gem đều có những ưu nhược điểm riêng, nên nhiều người cũng sử dụng các phương thức riêng của mình để kết nối nhiều DB trong Rails.

Rails 6 sẽ giúp loại bỏ sự phụ thuộc vào gem để làm được điều này. Những thay [đổi đó](https://github.com/rails/rails/pull/34052) bao gồm 2 APIs cho ActiveRecord.

## 1. Multi DB support for reading/writing
Một method mới toanh, `connects_to` được giới thiệu để kết nối vào nhiều DB cho qúa trình đọc/ghi.

```rb
connects_to database: { reading: :read_replica_db, writing: :write_replica_db }
```

Nghĩa là sao?
- ActiveRecord sẽ sử dụng `read_replica_db` được cấu hình trong file `database.yml` để thực hiện các queries đọc từ model.
- Và sử dụng `write_replica_db` cũng được cấu hình trong file `database.yml` để thực hiện các câu query ghi từ model.

Ví dụ chúng ta có một model tên `Product` như dưới đây:

```rb
class Product < ApplicationRecord
  self.abstract_class = true
  
  connects_to database: { writing: :products_primary, reading: :products_read }
end
```

- Cấu hình này sẽ sử dụng database được khai báo trong `products_primary` để thực hiện các truy vấn liên quan đến việc ghi trong bảng `products`.
- Và sử dụng sử dụng database được khai báo trong `products_read` để thực hiện các truy vấn liên quan đến việc đọc trong bảng `products`.

## 2. Switch roles or database connections
Rails 6 cung cấp thêm một block method [`connected_to`](https://github.com/rails/rails/pull/34052) hỗ trược việc chuyển (switch) giữa các database connections. Phương thức này đặc biệt hữu dụng khi bạn muốn lấy một data nhất định từ một DB khác hoặc nếu bạn muốn kết nối để đọc các bản sao cho các câu truy vấn nặng...

### connected_to by role
Block method này có thể dùng như sau:

```rb
ActiveRecord::Base.connected_to(role: :reading) do
  Product.first # finds product from replica connected to ApplicationRecord
end
```

Nó sẽ tạo ra một database connection với role là `:reading`.

### connected_to by database
Block method này có thể được dùng như sau:

```rb
ActiveRecord::Base.connected_to(database: :slow_replica) do
  Product.first
end
```

Nó sẽ sử dụng database được chỉnh định ở file `database.yml` với tên là `slow_replica` và thực hiện truy vấn với query được đưa ra bên trong block bằng ActiveRecord.

---
__Tham khảo:__
- [Part 4: Multi db improvements, Basic API for connection switching](https://github.com/rails/rails/pull/34052)
- [Add ability to change the names of the default handlers](https://github.com/rails/rails/pull/35132)
- [Add ActiveRecord::Base.connected_to?](https://github.com/rails/rails/pull/34680)
- [Rails 6 ActiveRecord supports Multi DB connection switching](https://rubyinrails.com/2019/03/25/rails-6-activerecord-multi-db-connection-switching/)