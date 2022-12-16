![](https://images.viblo.asia/546e61db-0ca0-42f4-b23b-6f5f214d55da.png)
Như các bạn đã biết, địa chỉ email là một dang thông tin cá nhân khá là phổ biến và chúng thường được lưu trữ mà không được mã hóa. Nếu haccker giành được quyền truy cập vào cơ sở dữ liệu, thì lúc này dữ liệu email sẽ bị xâm phạm.

Ở bài post này, mình sẽ hướng dẫn các bạn một cách tiếp cận để có thể bảo vệ dữ liệu email người dùng. Nó tương thích với devise, một gem dùng để xác thực người dùng rất phổ biến cho framwork Rails.
## Strategy
Để thực hiện việc bảo mật email người dùng, thì chúng ta sẽ thực hiện hai công việc sau: encryption và blind indexing. Encryption sẽ giúp chúng ta lưu trữ dữ liệu một cách an toàn và blind indexing sẽ giúp chúng ta thực hiên tìm kiếm dữ liệu đã đc mã hóa đó.

Blind indexing hoạt động bằng cách tính toán một hàm băm của dữ liệu. Có thể các bạn sẽ rất quen thuộc với các kiểu băm dữ liệu như là MD5 và SHA1, đây là kiểu mã hóa dữ liệu 1 chiều. Còn ở đây chúng ta sẽ sử dụng kiểu mã hóa dữ liệu 2 chiều, mình sẽ sử dụng hàm băm để tạo ra một khóa bí mật và sử dụng [key stretching](https://en.wikipedia.org/wiki/Key_stretching) để ngăn chặn việc tấn công dạng brute force. Các bạn có thể đọc thêm về [blind indexing ở đây](https://www.sitepoint.com/how-to-search-on-securely-encrypted-database-fields/). 

Mình sẽ sử dụng gem [lockbox](https://github.com/ankane/lockbox) để tiến hành encryption và gem[ blind index](https://github.com/ankane/blind_index) để thực hiện blind indexing.

## Instructions
Hãy giả địng răng bạn có một model User với 1 trường email field.

Đầu tiên, thêm 2 gem này vào trong file Gemfile.
```
gem 'lockbox'
gem 'blind_index'
```

Và chạy bundle để cài đặt:
```
bundle install
```

Tiến hành khởi tạo một key:
```
Lockbox.generate_key
```

Lưu trữ key của bạn ở một nơi nào đó đảm bảo bí mật, thường là sẽ lưu vào Rails credential hoặc là lưu vào biến môi trường ([dotenv](https://github.com/bkeepers/dotenv) là một gem khá tốt để lưu biến môi trường). Và hãy chắc chắn rằng bạn dùng nhưng key khác nhau cho những môi trường phát triển khác nhau.

Cài đặt biến môi trương sau với giá trị là key của bạn đã sinh ra ở trên.

```
LOCKBOX_MASTER_KEY=0000000000000000000000000000000000000000000000000000000000000000
```

Hoặc là bạn có thể tạo một file ***config/initializers/lockbox.rb*** với nội dung là
```
Lockbox.master_key = Rails.application.credentials.lockbox_master_key
```

Tiếp đến, hãy thay thế trường email của bạn bằng một phiên bản đã được mã hóa. Khởi tạo một file migration như bên dưới
```
rails generate migration add_email_ciphertext_to_users
```
Và thêm việc thay đổi trong database vào file migration như sau:
```
class AddEmailCiphertextToUsers < ActiveRecord::Migration[5.2]
  def change
    # encrypted data
    add_column :users, :email_ciphertext, :string

    # blind index
    add_column :users, :email_bidx, :string
    add_index :users, :email_bidx, unique: true

    # drop original here unless we have existing users
    remove_column :users, :email
  end
end
```

Tiến hành migrate database:
```
rails db:migrate
```

Sau đó thêm 2 dòng khai báo sau vào trong User Model
```
class User < ApplicationRecord
  encrypts :email
  blind_index :email
end
```
Sau đó hãy khởi tạo một user và kiểm tra xem thế nào nhé :D
## Existing Users
Trong trường hợp hệ thống của bạn đã tồn tại data user trước đó. Chúng ta cần thực hiện điền lại dữ liệu trước khi tiến hành xóa trường email ra khỏi table. Nghĩ là tiến hành mã hóa dữ liệu cũ trước, lưu lại ròi sau đó mới tiến hành xóa trường email.
```
class User < ApplicationRecord
  encrypts :email, migrating: true
  blind_index :email, migrating: true
end
```
Sau đó tiến hành fill lại dữ liệu ở Rails console
```
Lockbox.migrate(User)
```
Sau đó cập nhật lại model về trạng thái mong muốn.
```
class User < ApplicationRecord
  encrypts :email
  blind_index :email

  # remove this line after dropping email column
  self.ignored_columns = ["email"]
end
```
Cuối cùng là tiến hành drop cột email.
## Logging
Thêm một điều nữa đó là những đia chỉ email sẽ không được hiển thị trong quá trình hệ thống hoạt động. Để làm điều đó, chúng ta thêm dòng sau vào file ***config/initializers/filterparameterlogging.rb***:
```
Rails.application.config.filter_parameters += [:email]
```

Ngoài ra chúng ta có thể sử dụng gem [logstop](https://github.com/ankane/logstop) để có thể filter bất cứ thứ gì trong giống như là một địa chỉ email.
Add gem vào Gemfile
```
gem 'logstop'
```

Và tạo một file ***config/initializers/logstop.rb*** với nội dung:
```
Logstop.guard(Rails.logger)
```
## Summary
OK, bây giờ chúng ta đã biết cách mã hóa email và tiến hành truy vấn dữ liệu lúc cần. Ngoài ra bạn có thể áp dụng cách này cho các field dữ liệu khác. Tuy nhiên việc mã hóa  này sẽ có một sự đánh đổi về mặt performance, cho nên hãy xem xét trước khi thực thi nhé.