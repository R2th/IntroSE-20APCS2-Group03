![](https://images.viblo.asia/13076778-fe09-4eb1-9ae7-a5b0c4a2bda7.jpg)

Từ trước tới nay, trong một dự án Rails, mình vẫn thường quen với việc chỉ quản lý và làm việc với duy nhất một database mà thôi. Khi đó thì  mọi cấu hình cho db, chúng ta để trong file `config/database.yml`; và tất cả thông tin cũng như việc migrate các bảng trong db sẽ được đặt trong thư mục `db/` có cấu trúc như sau:

![](https://images.viblo.asia/8364afe0-54e7-46fc-a3f1-e5bf5ab0aac9.png)

Khi cần thay đổi gì trong cấu trúc của db, ta lại sinh ra một file trong thư mục `db/migrate/` rồi chạy `bundle exec rake db:migrate` là xong. Chắc hẳn chúng ta đã quá quen thuộc với việc này.

Trong bài viết này mình xin trình bày một bài toán mới: dự án Rails phải làm việc đồng thời với nhiều database cùng lúc. Với một dự án lớn, có độ phức tạp cao hơn thì ta sẽ hay gặp phải những tình huống như thế.

Và tất nhiên, cấu hình và việc migrate cho các db này cũng hoàn toàn độc lập với nhau. Nhưng khi làm việc thì bạn vẫn có thể kết hợp được dữ liệu từ các db này để đưa ra kết quả.

Nghe qua thì có vẻ nó phức tạp, nhưng khi bắt tay vào làm, bạn sẽ thấy nó cũng không phức tạp lắm đâu. Bắt đầu nhé.

#### Bài toán.

Ví dụ của mình là chỉ làm việc với 2 db mà thôi:

- `db_main`

- `db_second`

Để đơn giản thì cấu hình và thông tin của db `db_main` ta sẽ chứa trong file `config/database.yml` và thư mục `db/` sẵn có của Rails.

#### Cấu hình.

File `config/database.yml`

Mình chỉ ví dụ với môi trường development, các môi trường khác cũng hoàn toàn tương tự nhé.

```ruby
development:
  adapter: mysql2
  encoding: utf8mb4
  collation: utf8mb4_unicode_ci
  pool: 5
  database: db_main
  host: host_main
  username: user_main
  password: password_main
```

Tạo file `config/database_second.yml` để cấu hình cho db `db_second`:

```ruby
development:
  adapter: mysql2
  encoding: utf8mb4
  collation: utf8mb4_unicode_ci
  pool: 5
  database: db_second
  host: host_second
  username: user_second
  password: password_second
```

Tạo thêm thư mục `db_second/` mới để chứa thông tin của db `db_second`.

![](https://images.viblo.asia/9eaf0f5d-045b-49d8-8c16-817c94b8c8a7.png)

### Thêm custom generator.
Ruby có `ActiveRecord::Generators::MigrationGenerator` để định nghĩa việc migration db. Tuy nhiên, mặc định khi chạy lệnh `rails generate migration create_...` thì nó sẽ tạo ra file db trong thư mục `db/migrate/` cho db chính.

Để tiến hành migration file db cho riêng `db_second`, ta sẽ phải tạo mới để khai báo việc đó.

File `lib/generators/second_migration_generator.rb`

```ruby
require 'rails/generators/active_record/migration/migration_generator'

class SecondMigrationGenerator < ActiveRecord::Generators::MigrationGenerator
  migration_file = File.dirname(
    ActiveRecord::Generators::MigrationGenerator
      .instance_method(:create_migration_file)
      .source_location.first
  )

  source_root File.join(migration_file, "templates")

  def create_migration_file
    set_local_assigns!
    validate_file_name!
    migration_template @migration_template, "db_second/migrate/#{file_name}.rb"
  end
end
```

Với khai báo trên, ta sẽ chạy câu lệnh với `second_migration` để generate ra file db như sau:

```
framgias-Mac-mini:test vo.tai.tri$ rails g second_migration create_tribeo
      create  db_fueling/migrate/20180315082949_create_tribeo.rb
```

Sau khi chạy câu lệnh này thì file mới sẽ được sinh ra trong thư mục `db_second/migrate/`

### Thêm custom rake task.

Đến đây ta đã định nghĩa được vị trí thư mục chứa các file db. Tiếp đến, ta muốn việc tạo, migrate, schema của db `db_second` độc lập với db chính nên sẽ phải tạo ra file rake task để khai báo cho việc đó.

Tạo mới file `lib/tasks/db_second.rake` như sau:

```ruby
namespace :second do
  namespace :db do |ns|
    %i(drop create setup migrate rollback seed version).each do |task_name|
      task task_name do
        Rake::Task["db:#{task_name}"].invoke
      end
    end

    namespace :schema do
      %i(load dump).each do |task_name|
        task task_name do
          Rake::Task["db:schema:#{task_name}"].invoke
        end
      end
    end

    # append and prepend proper tasks to all the tasks defined here above
    ns.tasks.each do |task|
      task.enhance ['second:set_custom_config'] do
        Rake::Task['second:revert_to_original_config'].invoke
      end
    end
  end

  task :set_custom_config do
    # save current vars
    @original_config = {
      env_schema: ENV['SCHEMA'],
      config: Rails.application.config.dup
    }

    # set config variables for custom database
    ENV['SCHEMA'] = 'db_second/schema.rb'
    Rails.application.config.paths['db'] = ['db_second']
    Rails.application.config.paths['db/migrate'] = ['db_second/migrate']
    Rails.application.config.paths['db/seeds'] = ['db_second/seeds.rb']
    Rails.application.config.paths['config/database'] = ['config/database_second.yml']
  end

  task :revert_to_original_config do
    # reset config variables to original values
    ENV['SCHEMA'] = @original_config[:env_schema]
    Rails.application.config = @original_config[:config]
  end
end
```

Với khai báo namespace `:second` và `:db` cùng với các task `:create`, `:drop`, `:migrate`... như trên, ta sẽ có thể thao tác đến `db_second` bằng lệnh với `second:db:` như sau:

```
bundle exec rake second:db:create
```

Đến bước này thì ta đã có thể quản lý được thông tin cũng như tạo bảng mới, thay đổi cấu trúc bảng,... của `db_second`

Và cuối cùng là bước connect dự án đến `db_second` để lấy dữ liệu và làm việc.

### Connect db.

Tạo file `config/initializers/db_second.rb` như sau:

```ruby
config=YAML::load(ERB.new(File.read(Rails.root.join('config','database_second.yml'))).result)

DB_SECOND = config[Rails.env]
```

File này định nghĩa biến `DB_SECOND` lưu thông tin của `db_second` cho những model nào cần connect đến

Tạo model `app/models/db_second/connection.rb` để connect đến `db_second`, model này chỉ là một `abstract_class` mà thôi, code như sau:

```ruby
class DbSecond::Connection < ActiveRecord::Base
  self.abstract_class = true

  establish_connection DB_SECOND
end
```

Định nghĩa model cho `db_second`, ta chỉ cần kế thừa nó từ `DbSecond::Connection` đã định nghĩa bên trên và chỉ ra `table_name` cho nó như sau:

```ruby
class DbSecond::Tribeo < DbSecond::Connection
  self.table_name = 'tribeo'
  ...
end
```

Đến đây thì ta có thể sử dụng model `DbSecond::Tribeo` như mọi model khác của dự án Ruby.

```
[2] pry(main)> DbSecond::Tribeo
=> DbSecond::Tribeo(id: integer, name: string, created_at: datetime, updated_at: datetime)
[3] pry(main)> DbSecond::Tribeo.first
  DbSecond::Tribeo Load (4.4ms)  SELECT  `tribeo`.* FROM `tribeo`  ORDER BY `tribeo`.`id` ASC LIMIT 1
=> #<DbSecond::Tribeo:0x007fc8710ff6b8
 id: 1,
 name: "champion",
 created_at: Fri, 09 Mar 2018 13:09:18 JST +09:00,
 updated_at: Fri, 09 Mar 2018 16:09:19 JST +09:00>
```

### Tham khảo.

- http://www.ostinelli.net/setting-multiple-databases-rails-definitive-guide/

***

Hi vọng bài viết sẽ có ích với bạn.

Cám ơn vì đã đọc bài viết!