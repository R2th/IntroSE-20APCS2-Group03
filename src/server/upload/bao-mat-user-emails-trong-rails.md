Địa chỉ email là một dữ liệu cá nhân phổ biến và chúng thường được lưu trữ không được mã hóa. Nếu kẻ tấn công có quyền truy cập vào csdl hoặc bản sao lưu, email sẽ bị xâm phạm. Bài viết này sẽ hướng dẫn bạn tiếp cận cách để bảo vệ email. Nó hoạt động với Devise, một anthentication framwork phổ biến nhất của Rails.
# Chiến lược
Chúng ta sẽ sử dụng hai khái niệm để thực hiện điều này: encryption và [blind indexing](https://www.sitepoint.com/how-to-search-on-securely-encrypted-database-fields/). Mã hóa cho chúng ta một cách để lưu trữ dữ liệu một cách an toàn và lập chỉ mục mù cho chúng ta một cách để tìm kiếm nó. Chúng ta sẽ sử dụng gem `attr_encrypted` để mã hóa và gem `blind_index` để lập chỉ mục mù.
# Hướng dẫn
Giả sử bạn có model `User` với trường `email`.

Thêm vào Gemfile của bạn:
```
gem 'attr_encrypted'
gem 'blind_index'
```
Và chạy `bundle install`.

Tiếp theo, hãy thay thế trường `email` bằng một trường được mã hóa. Tạo một migration:
```
rails g migration add_encrypted_email_to_users
```
Và thêm:
```
class AddEncryptedEmailToUsers < ActiveRecord::Migration[5.2]
  def change
    # encrypted data
    add_column :users, :encrypted_email, :string
    add_column :users, :encrypted_email_iv, :string

    # blind index
    add_column :users, :encrypted_email_bidx, :string
    add_index :users, :encrypted_email_bidx, unique: true

    # drop clumn email ở đây trừ khi chúng ta có người dùng hiện tại
    remove_column :users, :email
  end
end
```
Chúng ta sử dụng một cột để lưu trữ dữ liệu được mã hóa, một cột để lưu trữ [IV](http://www.cryptofails.com/post/70059609995/crypto-noobs-1-initialization-vectors) và một cột khác để lưu trử chỉ mục mù.

Đừng quên chạy migrate: 
```
rails db:migrate
```
Tiếp theo, tạo khóa. Hãy sử dụng các biến môi trường để lưu trữ chúng (sử dụng [dotenv](https://github.com/bkeepers/dotenv) cho điều này).  Tạo một key để mã hóa và một key để băm. Trong môi trường development, bạn có thể sử dụng chúng:
```
EMAIL_ENCRYPTION_KEY=00000000000000000000000000000000
EMAIL_BLIND_INDEX_KEY=99999999999999999999999999999999
```
Thêm đoạn code sau vào model `User`:
```
class User < ApplicationRecord
  attr_encrypted :email, key: ENV["EMAIL_ENCRYPTION_KEY"]
  blind_index :email, key: ENV["EMAIL_BLIND_INDEX_KEY"]
end
```
Tạo một user mới và xác nhận nó hoạt động.

Nếu bạn có user đã tồn tại, chúng ta cần backfill data trước khi drop cột email. Chúng ta tạm thời sử dụng thuộc tính ảo `protected_email`.
```
class User < ApplicationRecord
  attr_encrypted :protected_email, key: ENV["EMAIL_ENCRYPTION_KEY"], attribute: "encrypted_email"
  blind_index :protected_email, key: ENV["EMAIL_BLIND_INDEX_KEY"], attribute: "email", bidx_attribute: "encrypted_email_bidx"

  before_validation :protect_email, if: ->(r) { r.email_changed? }

  def protect_email
    self.protected_email = email
    compute_protected_email_bidx
  end
end
```
Backfill data trong Rails console:
```
User.where(encrypted_email: nil).find_each do |user|
  user.protect_email
  user.save!
end
```
Sau đó cập nhật model như lúc trước:
```
class User < ApplicationRecord
  attr_encrypted :email, key: ENV["EMAIL_ENCRYPTION_KEY"]
  blind_index :email, key: ENV["EMAIL_BLIND_INDEX_KEY"]

  # xóa dòng này sau khi drop trường email
  self.ignored_columns = ["email"]
end
```
Cuối cùng, hãy drop trường email.
# Logging
Chúng ta cần đảm bảo địa chỉ email không được ghi lại. Thêm vào `config/initializers/filter_parameter_logging.rb`:
```
Rails.application.config.filter_parameters += [:email]
```
Sử dụng [Logstop](https://github.com/ankane/logstop) để lọc bất cứ thứ gì trông giống như địa chỉ email như một cách bảo vệ bổ sung. Thêm vào Gemfile:
```
gem 'logstop'
```
Và tạo `config/initializers/logstop.rb` với:
```
Logstop.guard(Rails.logger)
```
# Nguồn
https://shorts.dokkuapp.com/securing-user-emails-in-rails/