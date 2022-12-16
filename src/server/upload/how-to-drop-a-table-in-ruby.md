## Issue
Với những dự án mới hoặc những dự án nhỏ tự làm, hầu hết bạn sẽ phải thường xuyên thay đổi cấu trúc DB dẫn tới việc phải thực hiện các câu lệnh như `rails db:drop db:create db:migrate` khá nhiều lần. Như vậy, DB của bạn sẽ bị reset hoàn toàn và những dữ liệu bạn đã có trước đó sẽ không còn nữa. Nhưng bạn chỉ muốn tạo reset lại table bạn thay đổi thôi thì làm thế nào?


### Drop only a table
Đầu tiên bạn nên xác định xem mình `THÍCH` xử lý vấn đề này ở đâu trong rails console? hay ngoài command line?

Để cho tiện thì ta sẽ xem xét cách sử dụng command line mà Google suggest :v

*Giả sử bạn muốn xóa bảng `users`*

```
rails g migration DropUsers
```
Tạo một file migration rồi dùng method `drop_table`

```
class DropUsers < ActiveRecord::Migration
  def change
    drop_table :users
  end
end
```

*  Lưu ý một điều là cách này sẽ không thể rollback - nghĩ là `rake db:rollback` sẽ faile và raise cho bạn lỗi  `ActiveRecord::IrreversibleMigration` vì chưa biết cụ thể bảng `users` nào :v

Một cách tốt hơn đó là drop table kèm theo tất cả những giá trị của bảng bị xóa
```
class DropUsers < ActiveRecord::Migration
  def change
    drop_table :users do |t|
      t.string :email, null: false
      t.timestamps null: false
    end
  end
end
```

Như vậy ta mới có thể revert lại bảng `users` như ban đầu

### Rollback a specific migration
Rails cũng hỗ trợ thêm command rollback về chính xác 1 migration

Để check chính xác status nào để revert ta sử dụng command
```
root@3b8e3ae65cb1:/app# rails db:migrate:status

database: anime_development

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20201122023538  Create users
   up     20201122025633  Create movies
```
Và giờ muốn drop table `users`
```
rake db:migrate:down VERSION=20201122023538
```

bùm!!! bay màu :joy::joy::joy:

Sau đó nếu cảm thấy chột dạ thì có thể run `rake db:migrate` sẽ tự tìm lại những migration có status `down` để migrate lại

⚠️: Cơ mà cách này thực sự không tốt, vì nó sẽ không đảm bảo được tính nhất quán của dự án và rất dễ conflict => chỉ nên dùng với các dự án mới triển khai

### Define class in rails console
Ở đây ta có 1 vài cách đơn giản mà nhanh gọn nhẹ!

Open rails console
1. ActiveRecord::Migration.drop_table(:table_name)
2. ActiveRecord::Base.connection.execute("drop table table_name")

Đảm bảo tiêu chí 3 không `Không rườm ra, không phức tạp và không thể quay đầu` :rofl::rofl::rofl:.

Nói `không thể quay đầu` cũng không hẳn chỉ là bạn sẽ mất thêm vài thao tác để back lại table bạn vừa mới xóa. Được rồi, đây là những cách xóa mà bạn chắc rằng - sẽ không gặp lại cái `table` này nữa nhé

Còn trong quá trình phát triển bạn muốn thêm column hay change column name, rename table, ... Khai báo 1 class, vì bản chất khi chạy `rails db:migrate` là sẽ tìm các file được định nghĩa theo đường dẫn `db/migrate/...`, sau đó tạo các class bên trong và chạy chúng. Giờ ta sẽ thực hiện ở trong rails console luôn.

Nếu ban đầu bạn đã tạo bảng `users` với 2 trường `name` và `email`
```
class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      
      t.timestamps 
    end
  end
end
```

Và giờ muốn thêm `password` nữa −＞ vào rails console

```
root@3b8e3ae65cb1:/app# rails c
Running via Spring preloader in process 1547
Loading development environment (Rails 6.0.3.4)
[1] pry(main)> class DropUsers < ActiveRecord::Migration[6.0]
[1] pry(main)*   def change  
[1] pry(main)*     drop_table :users do |t|    
[1] pry(main)*       t.string :name      
[1] pry(main)*       t.string :email      
[1] pry(main)*       
[1] pry(main)*       t.timestamps       
[1] pry(main)*     end      
[1] pry(main)*   end    
[1] pry(main)* end  
=> :change
[2] pry(main)> 
[3] pry(main)> class CreateUsers < ActiveRecord::Migration[6.0]
[3] pry(main)*   def change  
[3] pry(main)*     create_table :users do |t|    
[3] pry(main)*       t.string :name      
[3] pry(main)*       t.string :email      
[3] pry(main)*       t.string :password      
[3] pry(main)*       
[3] pry(main)*       t.timestamps       
[3] pry(main)*     end      
[3] pry(main)*   end    
[3] pry(main)* end  
=> :change
[4] pry(main)> 
```
Sau đó
```
[4] pry(main)> DropUsers.new.change
-- drop_table(:users)
   (0.4ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
   (11.7ms)  DROP TABLE `users`
   -> 0.0210s
=> nil
[6] pry(main)> CreateUsers.new.change
-- create_table(:users)
   (13.5ms)  CREATE TABLE `users` (`id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(255), `email` varchar(255), `password` varchar(255), `created_at` datetime(6) NOT NULL, `updated_at` datetime(6) NOT NULL)
   -> 0.0148s
=> nil
[7] pry(main)> 
```

Vậy là xong khi mục đích của ta thay đổi cấu trúc của một bảng nào đó mà không cần phải tạo thêm file migration - vì nếu tạo thêm file thì sẽ càng tăng thời gian tạo các class bên trong để run thôi. Nhưng cũng chỉ nên thực hiện với những dự án nhỏ hoặc mới bắt đầu khi mà DB có sự thay đổi nhiều nhất.

Trên đây là một vài cách mình hay sử dụng để thay đổi hoặc xóa 1 table và chỉ 1 table trong rails. Hãy để lại 1 comment nếu thay hay cũng như muốn đóng góp ý kiến, chào thân ái và quyết thắng!

À quên, vô trong DB cũng xóa được cơ mà thế thì lại căng quá :laughing: :laughing:

R.I.P