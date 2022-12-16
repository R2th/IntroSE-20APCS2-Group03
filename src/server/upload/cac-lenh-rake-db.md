Rake là một tiện ích được xây dựng trong Ruby on Rails, nó cung cấp một cách hiệu quả để quản lý các thay đổi của cơ sở dữ liệu. Bạn có thể dễ dàng migrate các thay đổi của cơ sở dữ liệu tới các server bằng cách chỉ sử dụng một dòng lệnh!

Bạn có thể tự hỏi mình trong suốt quá trình phát triển ứng dụng của mình:
- Điều gì xảy ra khi sử dụng các lệnh rake cơ sở dữ liệu?
- Khi nào nên sử dụng chúng?

Hãy xem cách chúng ta có thể sử dụng các lệnh này để thay đổi cơ sở dữ liệu của chúng ta trong khi phát triển một ứng dụng nhé!

**Creating**

`$ rake db:create`

Khi bạn tạo ứng dụng Rails của mình lần đầu tiên, nó sẽ không có một cơ sở dữ liệu nào để sử dụng. Để bắt đầu, bạn cần phải chắc chắn rằng cơ sở dữ liệu của bạn đang hoạt động.

Cũng giống như khi bạn được khuyến khích sử dụng các gem khác nhau cho mỗi môi trường, bạn cũng nên tạo ba cơ sở dữ liệu, mỗi cái cho môi trường development, testing và production. Bạn có thể cấu hình chúng trong file `config/database.yml` của mình.
```
default: &default
  adapter: postgresql
  encoding: unicode
  username: username
  password: password
  host: localhost
  port: 5432

development:
  <<: *default
  database: story_dev

test:
  <<: *default
  database: story_test

production:
  <<: *default
  database: story
```

**Migrating**

`rake db:migrate`

Migration thiết lập các bảng trong cơ sở dữ liệu. Khi bạn chạy lệnh migration, nó sẽ tìm trong folder `db/migrate/` tất cả các file Ruby và thực thi chúng bằng cách bắt đầu chạt từ file đã tạo lâu nhất. Có dấu thời gian ở đầu mỗi tên file migration.

Mỗi khi bạn migrate cơ sở dữ liệu hoặc thực hiện bất kỳ thay đổi nào đối với nó như thêm một hàng hoặc một cột, thêm một bảng hoặc thay đổi kiểu dữ liệu, bạn phải chạy lệnh này để những thay đổi đó cập nhập trong cơ sở dữ liệu của bạn. 

Migration được tạo ra khi bạn chạy các lệnh như ` rails generate scaffold`,  `rails generate model` hoặc `rails generate migration`.

**Initializing**

`rake db:schema:load`

Không giống như `rake db:migrate` chạy migations cho các migration chưa chạy, `rake db:schema:load` tải schema đã được tạo ra trong `db/schema.rb` vào cơ sở dữ liệu.

Luôn luôn sử dụng lệnh này khi:
- Bạn chạy ứng dụng lần đầu tiên.
- Khi bạn đã xóa cơ sở dữ liệu và bạn cần tạo lại nó.

Lưu ý: nếu bạn chạy `rake db:schema:load` trên môi trường production, nó sẽ xóa tất cả dữ liệu production của bạn!

**Seeding**

`rake db:seed`

Chúng ta luôn có dữ liệu mặc định mà chúng ta muốn có trong ứng dụng của mình cho mục đích testing. Lệnh `seed` tồn tại để tự động hóa quá trình này.

Ví dụ: Tạo một admin_user và lưu dữ liệu của nó trong tệp` db/seed.rb`. Khi bạn chạy `rake db:seed` nó sẽ load tất cả các dữ liệu của admin vào ứng dụng của bạn.
```
Admin.create!(email: 'admin@kolosek.com', 
              password: 'password', 
              password_confirmation: 'password')
```

Seed data thường được sử dụng trong môi trường development hoặc staging, chỉ có 1 ít người dùng trên production, bạn chắc chắn sẽ không muốn ứng dụng của bạn trên production sử dụng dữ liệu giả.

**Rolling Back**

`rake db:rollback`

Bạn đã tạo ra một migration mà bạn không cần nó hay bạn chỉ đơn giản đã thay đổi suy nghĩ của bạn về nó? Đừng sợ! Khi bạn chạy lệnh này, nó sẽ xem xét migration cuối cùng đã được tạo ra và hoàn tác nó!

Ví dụ: Hãy bắt đầu bằng cách tạo một migration mới với `:role` như một số nguyên và chạy migrate. Sau đó, chúng ta quyết định đổi nó thành một string thay vào đó. Vì vậy, chúng ta sẽ chỉnh sửa migration mới được tạo ra và chạy lại, nhưng không có gì xảy ra và các test và factories của bạn sẽ bị fail.
```
class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.integer :role # we will change this to t.string :role
      t.references :user
      t.timestamps
    end
  end
end
```

*Tại sao nó không hoạt động?*

Chỉ có migration được tạo ra cuối cùng được chạy với lệnh `rake db:migrate`. Điều này có nghĩa là không có thay đổi nào được thực hiện bằng cách chỉnh sửa migration đã tồn tại. Để thực hiện việc này, bạn sẽ cần chạy `rake db:rollback` thay thế. Điều này sẽ làm cho Rails thực hiện hai việc:
- Hoàn tác các thay đổi cuối cùng bạn vừa thực hiện với cơ sở dữ liệu.
- Cập nhật dấu thời gian của file migration (ở đầu tên file).

**Dropping**

`rake db:drop`

Đôi khi chúng ta muốn xóa tất cả các dữ liệu và bảng biểu và bắt đầu cái mới. Đó là những gì `rake db:drop` thực hiện. Nếu bạn muốn giữ dữ liệu bạn có, hãy chắc chắn sao lưu nó trước khi chạy lệnh này.

Việc xóa cơ sở dữ liệu cũng sẽ loại bỏ bất kỳ xung đột trong schema hoặc những dữ liệu không tốt. Khi cơ sở dữ liệu bị xóa, bạn sẽ muốn bắt đầu lại quá trình bằng cách tạo lại database, chạy các migration và seed data. Hãy chắc chắn rằng các test RSpec của bạn sẽ pass sau khi sửa lại cơ sở dữ liệu của bạn!

Hãy chắc chắn rằng bạn không có kết nối với cơ sở dữ liệu mà bạn sẽ xóa.

**Resetting**

`rake db:reset`

Đôi khi bạn có thể cần phải xóa cơ sở dữ liệu trên local và bắt đầu lại với dữ liệu được tải từ `db/seeds.rb`. Đây là một lệnh hữu ích khi bạn vẫn đang xây dựng schema của mình, và thường cần thêm các trường vào các model hiện có.

Một khi lệnh reset được sử dụng nó sẽ thực hiện như sau:
1. Xóa database: `rake db:drop`
2. Load từ schema: `rake db:schema:load`
3. Tạo dữ từ file seed: `rake db:seed`

*Tại sao nó dùng `db:schema:load`  mà không phải `db:migrate`?*

`rake db:schema:load` nhanh hơn nhiều so với  `rake db:migrate` bởi vì nó tải schema mà chúng ta đã tạo ra từ `db/schema.rb` thay vì chạy qua tất cả các file migrate lại một lần nữa.


Hy vọng những điều này có thể giúp bạn hiểu được sự khác biệt chính giữa các lệnh rake database!

Link tham khảo: https://rails.devcamp.com/learn-ruby-on-rails-from-scratch/building-your-first-rails-application/list-of-database-rake-tasks-in-a-rails-application