## Giới thiệu
Như các bạn đã biết Rails 6 ActiveRecord hộ trợ [Multiple database connection switching](https://github.com/rails/rails/pull/34052).
Hơn nữa, chúng ta có thể sử nhiều database khác nhau nhằm cho mục đích reading/wirting trên các database master và database slave nhằm cải thiện 1 phần performance của hệ thống.

Trước khi có Rails 6, các dev thường sử dụng các gem như SeconDBase hay MultiVese để connect tới nhiều databases khác nhau. Mỗi cái lại có nhưng ưu nhược điểm riêng để kết nối tới DB

Và Rails 6 đã bỏ các gem liên quan để kết nối tới DBs. Thay vào đó sẽ 2 APIs được thêm cho ActiveRecord.

## 1. Multi DB hỗ trợ reading/wirting.
Có một method mới là `connects_to` đã được thêm vào để nhằm mục đich kết tới nhiều DB nhằm mục đích reading/writing
```ruby
connects_to database: { reading: :read_replica_db, writing: :write_replica_db }
```
Cái này được hiểu là:

* ActiveRecord sẽ sử dụng `read_replica_db` được config trong file `database.yml` nhằm mục đích trỏ những queries(SELECT,..) đọc data từ db relication nhằm giảm tại cho db master (1 db chỉ đọc và 1 db chỉ ghi).
* ActiveRecord sẽ sử dụng `read_replica_db` được config trong file `database.yml` nhằm mục đích trỏ những queries(INSERT,UPDATE..) write data từ db relication nhằm giảm tại cho db master (1 db chỉ đọc và 1 db chỉ ghi). 

Và được đây ta có 1 model Product thì method trên sẽ được thực thi như sau:
```ruby
class Product < ApplicationRecord
  self.abstract_class = true
  connects_to database: { writing: :products_primary, reading: :products_read }
end
```

Vậy với như trên thì model Product sẽ.

*   Reading data từ db products_read.
* Writing data vào db products_primary.

## 2.Switch roles or database connections
Môt block method `connect_to` đã được thêm vào để hỗ trợ việc switch qua lại với các DBs. Đây là một cái khá là hay if như chúng ta nhất định muốn lấy data từ một DB khác hoặc nếu chúng ta muốn connect để đọc data từ db relica phục vụ các queries nặng.
### connected_to by role
 Đây là một block method có thể sử dụng như sau:
  ```
  ActiveRecord::Base.connected_to(role: :reading) do
  Product.first # Tìm product từ replica đã kết nối tới ApplicationRecord
end
  ```
Nó sẽ tạo 1 kết nối read tới DB (Với role là : `:reading`)
Ngòai method `connect_to` còn có một dạng khác như sau:
```ruby
ActiveRecord::Base.connected_to(database: :slow_replica) do
  Product.first
end
```
Nhằm mục đích thực hiện query tới 1 database chị định.
## 3. References:
https://rubyinrails.com/2019/03/25/rails-6-activerecord-multi-db-connection-switching/