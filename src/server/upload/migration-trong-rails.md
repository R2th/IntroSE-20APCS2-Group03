# Migration là gì?
Migration là 1 tập hợp các cài đặt cho DataBase. Nó mô tả lại các thay đổi của DataBase. Trong 1 Migration chúng ta có thể tạo Table, thay đổi cấu trúc Table như thêm Column, xoá Column, xoá Table và nhiều điều khác liên quan đến DataBase. Nhờ Migration chúng ta có thể chọn được phiên bản thay đổi của DataBase.

> Note: Nếu ai đã dùng Git rồi thì mọi người có thể tưởng tượng là thay vì **quản lý phiên bản của Source Code** thì Migration sẽ **quản lý phiên bản của Database**. Ở Git mỗi phiên bản sẽ tương ứng với 1 **commit**, ở Migration mỗi phiên bản thì tương ứng với 1 **file Migration** thôi :D.

# Tại sao lại cần sử dụng Migration?

Các file Migration sẽ được lưu giữ cùng với Source Code của chúng ta. Nếu như bạn muốn chạy Project Rails trên 1 máy tính mới, bạn có thể dễ dàng di chuyển DataBase sang máy tính mới đó nhờ Migration. Ngoài ra, chúng ta còn có thể chia sẽ những thay đổi DataBase cho các thành viên trong dự án. Bạn có thể chọn phiên bản của DataBase tuỳ ý.

# Tạo Migration

Chúng ta có thể tạo các file Migration bằng cách lệnh có sẵn của Rails. Ví dụ:

```
rails generate migration PetInformation
```

Luôn sử dụng format Camel Case cho tên của Migration. Lệnh này sẽ tạo ra 1 tệp tin trong db/migrate/20200614041848_pet_information.rb. Tên tệp tin bắt đầu bằng thời gian tạo tệp tin và sử dụng dấu gạch dưới `_` trên mỗi chữ in hoa của tên Migration. Nêu bạn tạo nhiều Migration có cùng tên thì thành phần thời gian của file Migration sẽ giúp chúng ta sử dụng được tất cả. Nó làm cho mỗi Migration là duy nhất.

```
➜  RubyTraining git:(master) rails generate migration PetInformation
      invoke  active_record
      create    db/migrate/20200614041848_pet_information.rb
```

Tệp Migration của chúng ta sẽ như thế này:

```
class PetInformation < ActiveRecord::Migration[5.2]
  def change
  end
end
```

Bằng Migration, bạn có thể làm nhiều việc khác:
- Tạo Table
- Tạo quan hệ các Table
- Thay đổi Table
- Thay đổi Column
- Sửa Column
- Thêm Foreign Key

# Các method của Migration

Hiện tại các method của Migration có những method sau:
- add_column
- add_foreign_key
- add_index
- add_reference
- add_timestamps
- change_column_default
- change_column_null
- create_join_table
- create_table
- disable_extension
- drop_join_table
- drop_table
- enable_extension
- remove_column
- remove_foreign_key
- remove_index
- remove_reference
- remove_timestamps
- rename_column
- rename_index
- rename_table

# Các command hay được sử dụng
1. Tạo Migration:

```
rails generate migration PetInformation
```

2. Thực thi Migration:

```
rails db:migrate
```

3. Thực thi 1 phiên bản Migration nhất định

```
rails db:migrate:up VERSION=20200614041848
```

4. Bỏ đi phiên bản Migration cuối cùng:

```
rails db:rollback
```

5. Bỏ đi 4 phiên bản Migration cuối cùng:

```
rails db:rollback STEP=4
```

Mình xin kết thúc bài viết tại đây. Cảm ơn các bạn đã dành thời gian đọc bài viết này. Link tham khảo:
- https://medium.com/oceanize-geeks/ruby-on-rails-migrations-3b32b4c398cf