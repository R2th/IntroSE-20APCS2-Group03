# 1.Tạo abstract class khi sử dụng với multiple databases
Rails bắt đầu hỗ trợ nhiều cơ sở dữ liệu từ Rails 6.0. 

Để sử dụng một cơ sở dữ liệu cụ thể, chúng ta có thể chỉ định kết nối cơ sở dữ liệu trong mô hình bằng cách sử dụng connect_to. 

Trong trường hợp sau, có model Person kết nối với cơ sở dữ liệu "crm". 

```ruby
class Person < ApplicationRecord
  connects_to database: { writing: :crm }
end
```

Khi ứng dụng phát triển, ngày càng nhiều model bắt đầu chia sẻ cùng một cơ sở dữ liệu.

Bây giờ rất nhiều model có thể chứa callback connect_to đến cùng một cơ sở dữ liệu.

```ruby
class Person < ApplicationRecord
  connects_to database: { writing: :crm }
end

class Order < ApplicationRecord
  connects_to database: { writing: :crm }
end

class Sale < ApplicationRecord
  connects_to database: { writing: :crm }
end
```

Để tránh trùng lặp, có thể tạo một ```abstract class``` kết nối với cơ sở dữ liệu và kế thừa thủ công tất cả các model khác từ Class đó.

```ruby
class CrmRecord < ApplicationRecord
  self.abstract_class = true

  connects_to database: { writing: :crm }
end

class Person < CrmRecord
end

class Order < CrmRecord
end


class Sale < CrmRecord
end
```

Trước Rails 6.1, không có lựa chọn nào khác ngoài việc tạo ```abstract class``` theo cách thủ công. 

Rails 6.1 cho phép tạo một ```abstract class``` khi chúng ta tạo một model bằng cách sử dụng ```scaffold```

```ruby
$ rails g scaffold Person name:string --database=crm
```

```scaffold``` tạo ra một ```abstract class``` với tên của cơ sở dữ liệu được nối với record. Model được tạo tự động kế thừa từ ```abstract class``` mới.

```ruby
# app/models/users_record.rb
class CrmRecord < ApplicationRecord
  self.abstract_class = true

  connects_to database: { writing: :crm }
end

# app/models/admin.rb
class Person < CrmRecord
end
```

Nếu ```abstract class``` đã tồn tại, nó sẽ không được tạo lại. Có thể sử dụng một Class hiện có làm ```abstract class``` bằng cách chuyển ```parent``` cho lệnh ```scaffold```.

```ruby
$ rails g scaffold Customer name:string --database=crm --parent=PrimaryRecord
```

Điều này bỏ qua việc tạo class ```CrmRecord``` vì đã chỉ định Rails để sử dụng ```abstract class``` ```PrimaryRecord``` làm parent class.

# 2. Run db:rollback với multiple databases
Rails 6.1 bổ sung hỗ trợ để xử lý ```db: rollback``` trong trường hợp có nhiều ứng dụng cơ sở dữ liệu.

Trước thay đổi này, khi thực thi ```db: rollback```, Rails được sử dụng để rollback ```latest migration``` của primary database 

```ruby
Rails 6.0.0
> rails db:rollback:secondary

rails aborted!
Don't know how to build task `db:rollback:secondary` (See the list of available tasks with `rails --tasks`)
Did you mean?  db:rollback
```

Ở Rails 6.1, cần chuyển tên cơ sở dữ liệu cùng với ```db:rollback:[NAME]``` nếu không sẽ xuất hiện RuntimeError.

```ruby
Rails 6.1.0
> rails db:rollback

rails aborted!
You're using a multiple database application. To use `db:migrate:rollback` you must run the namespaced task with a VERSION. Available tasks are db:migrate:rollback:primary and db:migrate:rollback:secondary.

> rails db:rollback:primary

== 20200731130500 CreateTeams: reverting ======================================
-- drop_table(:teams)
   -> 0.0060s
== 20200731130500 CreateTeams: reverted (0.0104s) =============================
```

Cảm ơn các bạn đã quan tâm theo dõi bài viết !!! Xin chào và hẹn gặp lại!

Link tham khảo 

https://blog.bigbinary.com/2020/08/04/rails-6-1-automatically-generates-abstract-class-when-using-multiple-databases.html?ck_subscriber_id=691531045

https://blog.bigbinary.com/2020/08/12/rails-6-1-raises-on-db-rollback-for-multiple-database-applications.html?ck_subscriber_id=691531045