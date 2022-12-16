Khi bạn nhận được một input của user trong hệ thống, việc validate chúng là điều không thể bỏ qua. Trong Ruby on Rails, việc validate trong model dường như là bước đầu tiên chúng ta nghĩ đến. Nhưng bạn có biết nhưng cấp validate khác ?
Liệu validate trong model có phải là sự lựa chọn tốt?
Cùng đọc tiếp bài viết để hiểu rõ hơn nhé!!!
# Model Validation 
Dưới đây là cách thông thường chúng ta sử dụng để validate.
```
class User < ActiveRecord::Base
  validates :email, presence: true
end
```
Cách này sẽ giúp bạn tạo hoặc update 1 user phải có email, không được để trống khi chúng ta gọi method User#save hoặc User#save!
Nhưng phải cẩn trọng khi sử dụng những method sau:
* decrement!
* decrement_counter
* increment!
* increment_counter
* toggle!
* touch
* update_all
* update_attribute
* update_column
* update_columns
* update_counters

Những method trên bạn có thể update dữ liệu mà không quan tâm đến validate bên trong model nữa.
# Controller Validation
Xử lý những logic trong controller để validate dữ liệu là trường hợp chắc nhiều bạn cũng đã gặp. Chúng ta sử dụng những câu lệnh if, else để kiểm tra sự đúng đắn của dữ liệu

# Database Validation 
Đây là cấp độ validate an toàn nhất, toàn bộ dữ liệu đều được kiểm tra trước khi lưu vào database. 
Chúng ta thực hiện validate bằng cách thêm file migration như sau:
```
class AddValidationOnUserEmail < ActiveRecord::Migration
  def change
    change_column :users, :email, :string, null: false
    add_index :users, :email, unique: true
  end
end
```
sau khi tạo xong, chúng ta chạy lện `rails db:migrate`. Chúng ta có thể test luôn chức năng của nó bằng cách sử dụng method update_colums:
```
user = User.find(user_id)
user.update_column(:email, nil) # => raises ActiveRecord::StatementInvalid: Mysql2::Error: Column 'email' cannot be null
```
Lỗi đã xuất hiện. Chúng ta thử tiếp update user với email đã tồn tại xem sao:
```
user = User.find(user_id)
user_2 = User.find(user_2_id)

user.update_column(:email, user_2.email) # => raises ActiveRecord::RecordNotUnique: Mysql2::Error: Duplicate entry
```
2 lỗi xảy ra là khác nhau. Lỗi thứ 2 sinh ra khi email pass được validate đầu tiên là presence, nhưng khi tạo index thì xảy ra lỗi bị trùng dữ liệu. Bạn có thể thấy, tạo index không chỉ làm tăng performance hệ thống mà còn đảm bảo cả bảo mật luôn đó.
 # Frontend Validation
 Đây cũng là một biện pháp khá hữu dụng, giúp cho trải nghiệp người dùng tốt hơn, giảm tải cho server. Nhưng nếu tắt Javascript đi thì sẽ bị vô hiệu hoá. 
 Validate tại server là điều cần thiết nhưng chúng ta vẫn nên cần validate tại client. Việc không phải đợi chờ đợi mỗi lỗi sai sau khi submit form thật là thích thú đúng ko nào :))
 
 Trên đây là 4 level validation dữ liệu bạn nên biết để có thể áp dụng trong dự án của mình một cách hợp lý, đảm bảo an toàn về bảo mật và trải nghiệm người dùng. Cám ơn bạn đã đọc bài!
 
 Nguồn: http://pdabrowski.com/blog/ruby-on-rails/four-levels-of-the-data-validation/