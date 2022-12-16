Khi nghĩ về validation trong Rails, người ta thường nghĩ đến validation ở model đầu tiên. Vậy các cấp validation khác thì sao? Validation bằng model có phải một giải pháp hoàn hảo? Bài viết này sẽ giới thiệu về 4 cấp validation trong rails, và thảo luận về ưu nhược điểm của mỗi cách thông qua cột `email` trong model `User` ở ví dụ.

## Validation ở model

Đây là cách tiếp cận phổ biến nhất trong Rails. Chúng ta cần đảm bảo mỗi bản ghi `User` luôn luôn phải có `email`, vì vậy ta định nghĩa validation trong model như sau:
```
class User < ActiveRecord::Base
  validates :email, presence: true
end
```
Đây là cách để đảm bảo dữ liệu hợp lệ, nhưng vẫn có cách để tạo một bản ghi User mà không cần email. Khi chúng ta gọi đến `User#save` hoặc `User#save!"`, dữ liệu sẽ không được lưu nếu không hợp lệ, trừ khi sử dụng các phương thức:
* `decrement!`
* `decrement_counter`
* `increment!`
* `increment_counter`
* `toggle!`
* `touch`
* `update_all`
* `update_attribute`
* `update_column`
* `update_columns`
* `update_counters`
Chúng ta nên cẩn thận khi sử dụng chúng, đặc biệt là các phương thức có tiền tố `update_`. Đôi khi ta lại không cần xác thực trường `email` thì sao? Chúng ta có thể sử dụng thêm `:if` hoặc validation ở controller 

## Validation ở controller
Như đã nói ở trên, đôi khi chúng ta chỉ cần validation trong 1 vài trường hợp. Sử dụng `:if` hoặc `:unless` cũng là một lựa chọn tốt, tuy nhiên nó có thể làm rối các quy tắc validation của ta, khiến các validation khó đọc và khó test hơn. Validation ở controller là một giải pháp thay thế. Chúng ta nên sử dụng [Form Object pattern](https://robots.thoughtbot.com/activemodel-form-objects). Tuy nhiên, việc sử dụng validation ở controller khó hơn nhiều validation ở model. Form Object pattern rất hữu dụng trong những ứng dụng lớn, khi ta có 1 model có nhiều validation chỉ được dùng trong một vài trường hợp.

## Validation ở database
Đây là cách validation dữ liệu an toàn nhất, vì sẽ không có cách nào để lưu một bản ghi không hợp lệ. Validation hay được dùng nhất là `presence` và `uniqueness` - cả hai đều vô cùng hoàn hảo cho cột `email` của model User. Vậy làm thế nào để thêm nó? Bằng cách tạo một migration: 
```
class AddValidationOnUserEmail < ActiveRecord::Migration
  def change
    change_column :users, :email, :string, null: false
    add_index :users, :email, unique: true
  end
end
```
Sau khi chạy `rake db:migrate` chúng ta có thể test validation này. Hãy thử sử dụng phương thức `update_collumn` để lưu một bản ghi mà không có email:
```
user = User.find(user_id)
user.update_column(:email, nil) # => raises ActiveRecord::StatementInvalid: Mysql2::Error: Column 'email' cannot be null
```
Nó trả ra lỗi. Giờ thử lưu một bản ghi có email bị trùng:
```
user = User.find(user_id)
user_2 = User.find(user_2_id)

user.update_column(:email, user_2.email) # => raises ActiveRecord::RecordNotUnique: Mysql2::Error: Duplicate entry
```
Lỗi cũng sẽ được ném ra nếu bạn cố gắng lưu dữ liệu có kiểu không hợp lệ.
```
user = User.find(user_id)
user.update_column(:created_at, "string") # => raises ActiveRecord::StatementInvalid: Mysql2::Error: Incorrect datetime value
```

## Validation ở front-end
Đây là cách validation kém an toàn nhất. Bạn có thể pass bằng cách disable Javascript trên browser hoặc thực hiện một request trực tiếp bằng code hoặc extension của browser như Postman
Bạn nên bảo vệ dữ liệu bằng cách sử dụng validation ở back-end trước. Sau đó, có thể thêm validation ở front-end để cải thiện trải nghiệm người dùng, không cần phải đợi form submit xong mà chỉ lỗi sẽ hiện ra ngay ở ô có dữ liệu không hợp lệ.

Nguồn: [http://pdabrowski.com/blog/ruby-on-rails/four-levels-of-the-data-validation/](http://pdabrowski.com/blog/ruby-on-rails/four-levels-of-the-data-validation/)