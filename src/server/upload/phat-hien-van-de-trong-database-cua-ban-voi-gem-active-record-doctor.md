# Giới thiệu
Trong bài viết này, mình sẽ giới thiệu về gem `active_record_doctor` - một gem hữu hiệu để phát hiện ra những vấn đề trong database của bạn trước khi deploy lên môi trường production, giúp performance của ứng dụng mượt mà, tối ưu hơn.

![](https://images.viblo.asia/8a3673ec-9b6e-4657-bad7-b112a807013e.jpg)

# Cài đặt
Đơn giản là thêm `active_record_doctor` vào `Gemfile` của bạn:
```
gem 'active_record_doctor', group: :development
```

Sau đó chạy
```
bundle install
```

# Cách sử dụng

## 1. Đánh index cho các khoá ngoại chưa được đánh index

1. Sinh ra một danh sách các khoá ngoại chưa được đánh index
```
bundle exec rake active_record_doctor:unindexed_foreign_keys > unindexed_foreign_keys.txt
```

Giả sử sinh ra được 1 file như sau:
```txt
comments parent_id
inquiries user_id
stamp_users user_id
```

2. Loại bỏ các cột mà bạn cho rằng không nên đánh index (ví dụ như các cột có đuôi `_id` mà không phải khoá ngoại)

3. Tạo file migrations

```
rails generate active_record_doctor:add_indexes unindexed_foreign_keys.txt
```

Chúng ta sẽ có 3 file migration như sau:
![](https://images.viblo.asia/ba9413e0-d9b4-4776-9e52-9ac272d2f366.png)

4. Chạy migration thôi !
```
rails db:migrate
```

## 2. Phát hiện khoá ngoại bị thiếu ràng buộc

Nếu `users.profile_id` tham chiếu đến một bản ghi ở `profiles`, đó được mô tả ở database level với một ràng buộc khoá ngoại. Nó bắt buộc `users.profile_id` phải trỏ tới một bản ghi có sẵn trong `profiles`. Vấn đề đặt ra ở đây là trong nhiều ứng dụng Rails, việc ràng buộc không được thực hiện dưới tầng database.

`active_record_doctor` có thể tự động nhận diện bị thiếu ràng buộc ở trong database của bạn. Bạn có thể lấy được danh sách cách khoá còn thiếu như sau:
```
bundle exec rake active_record_doctor:missing_foreign_keys
```

Output sẽ như sau:
```
users profile_id
comments user_id article_id
```

Chúng ta có thể thấy được `users.profile_id`, `comments.user_id`, `comments.article_id` đang thiếu mất ràng buộc. Để thêm ràng buộc cho `users.profile_id` vào chúng ta tạo file migration như sau:
```ruby
class AddForeignKeyConstraintToUsersProfileId < ActiveRecord::Migration
  def change
    add_foreign_key :users, :profiles
  end
end
```

## 3. Phát hiện models tham chiếu đến bảng không tồn tại

ActiveRecord dự đoán tên table dựa trên tên của class đó. Có một số trường hợp tên có thể bị sai (ví dụ như bạn quên commit file migration hoặc đổi tên table). Active Record Doctor có thể giúp bạn nhận diện các trường hợp đó trước khi lên môi trường production.

Việc duy nhất bạn chỉ cần làm là:

```
bundle exec rake active_record_doctor:undefined_table_references
```

Nếu có model nào tham  chiếu đến bảng không tồn tại bạn sẽ thấy message như thế này:
```
The following models reference undefined tables:
Contract (the table contract_records is undefined)
```

Một điều nữa là ở đây `rake` sẽ exit với status code là 1. Bạn có thể sử dụng để thêm vào một công đoạn kiểm tra trong Continuous Integration pipeline của bạn.

## 4. Phát hiện Uniqueness Validations không được đánh index hỗ trợ

Validate Uniqueness ở lớp Model nên được hỗ trợ bởi việc đánh index ở tầng database để được chặt chẽ hơn. Ngược lại, bạn sẽ có khả năng insert các giá trị bị trùng nhau, gây xử lí nặng nề hơn dưới database.
```
bundle exec rake active_record_doctor:missing_unique_indexes
```

Output:
```
The following indexes should be created to back model-level uniqueness validations:
  users: email
```

Điều đó có nghĩa là bạn nên đánh index unique cho `users.email`

# Kết luận
Trên đây mới chỉ là một số ví dụ mà gem này có thể giúp bạn trong việc tối ưu database. Còn có nhiều chức năng khác nữa, các bạn có thể tìm hiểu thêm tại document của gem mình để sẵn bên dưới. Chúc mọi người có một kì nghỉ lễ 30/4 - 1/5 vui vẻ! 


# Tham khảo
https://github.com/gregnavis/active_record_doctor