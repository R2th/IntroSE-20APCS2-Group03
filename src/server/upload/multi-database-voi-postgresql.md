### 1. Giới thiệu

- Đối với các dự án lớn, với databases quá nhiều thì việc sử dụng multi-databases có lẽ cũng là một giải pháp hay và nên thực hiện. Chúng ta sẽ chia databases lớn đó thành các databases nhỏ hơn và bên trong là table phục vụ cho một chức năng cụ thể. Điều này giúp cho người lập trình xử lý, quản lý table của các chức năng này tốt hơn. 
- Ví dụ đơn giản như: Tôi làm một app liên quan đến quản lý thư viện, tôi chia databases của tôi thành các databases nhỏ làm các nhiệm vụ: 
    + Quản lý sách
    +  Chức năng cho mượn, trả sách
    +  Xuất nhập kho, quản lý người dùng ...

- Trên đây là một ví dụ nhỏ, và với các chức năng như trên, tôi sẽ có 1 databases tương ứng với các model cụ thể ....

- Ví dụ khác là tôi có 2 ứng dụng A và B riêng biệt nhưng sử dụng chung một bảng User, tức là User đã signup ó thể login đc ở B. Vậy multi-databases cũng là một lựa chọn thích hợp cho trường hợp này.
- Thực tế là có rất nhiều giải pháp cho việc setting multi-database trong rails, nhưng ở bài viết này tôi muốn giới thiệu cách là chúng ta sẽ tạo ra các file migrate và schema riêng biệt, generator các db riêng biệt, và với mỗi databases này đều sử dụng được các rake như create, drop, migration ...

### 2. Setting multi-databases

 Tôi lấy ví dụ, tôi sẽ tạo ra 2 databases với tên gọi là db1 và db2. db1 sẽ được ưu tiên là databases default. Còn db2 là một databases mới tôi cần thêm vào trong app của mình
```ruby
# config/database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  username: username
  pool: 5
  host: localhost
  port: 5432
  password: *****

development:
  <<: *default
  database: db1_development
test:
  <<: *default
  database: db1_test
staging:
  <<: *default
  database: db1_staging
```
Đối với db1 việc rake db:create, db:drop, db:migrate là cách mà chúng ta vẫn thường làm việc, không có gì phải bàn cãi ở đây. Cái chúng ta quan tâm là với db2- một databases được viết chung cùng với db1 thì sẽ làm thế nào để create, drop, migrate

Bước 1 Tạo 1 file database_db2.yml cùng thư mục với database.yml để config cho db2

```
efault: &default
  adapter: postgresql
  encoding: unicode
  username: username
  pool: 5
  host: localhost
  port: 5432
  password: alphapassword

development:
  <<: *default
  database: db2_development
test:
  <<: *default
  database: db2_test
staging:
  <<: *default
  database: db2_staging
```

Bước 2: Chúng ta sẽ tạo 1 thư mục db_db2 giống như thư mục db

![](https://images.viblo.asia/beaecc5f-da7a-442d-ae6e-3a017b4b623c.png)

Đến đây có lẽ chúng ta cũng hiểu cách làm mà tôi muốn giới thiệu là chúng ta đang xây dựng những file, thư mục liên quan đến databases theo như những gì mà câu lệnh 
```
rails app new
```
sinh ra cho chúng ta :D

Bước 3: Tạo các file rake để có thể sử dụng rake db:create, db:drop ... như những gì chúng ta đã làm 

```ruby
task spec: ["db2:db:test:prepare"]

namespace :db2 do

  namespace :db do |ns|
    task :create do
      Rake::Task["db:create"].invoke
    end
    
    task :drop do
      Rake::Task["db:drop"].invoke
    end
    
    task :migrate do
      Rake::Task["db:migrate"].invoke
    end
        
    task :setup do
      Rake::Task["db:setup"].invoke
    end
    
    task :rollback do
      Rake::Task["db:rollback"].invoke
    end

    task :seed do
      Rake::Task["db:seed"].invoke
    end

    task :version do
      Rake::Task["db:version"].invoke
    end

    namespace :schema do
      task :load do
        Rake::Task["db:schema:load"].invoke
      end

      task :dump do
        Rake::Task["db:schema:dump"].invoke
      end
    end

    namespace :test do
      task :prepare do
        Rake::Task["db:test:prepare"].invoke
      end
    end

    # append and prepend proper tasks to all the tasks defined here above
    ns.tasks.each do |task|
      task.enhance ["db2:set_custom_config"] do
        Rake::Task["db2:revert_to_original_config"].invoke
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
    ENV['SCHEMA'] = "db_db2/schema.rb"
    Rails.application.config.paths['db'] = ["db_db2"]
    Rails.application.config.paths['db/migrate'] = ["db_db2/migrate"]
    Rails.application.config.paths['db/seeds'] = ["db_db2/seeds.rb"]
    Rails.application.config.paths['config/database'] = ["config/database_db2.yml"]
  end

  task :revert_to_original_config do
    # reset config variables to original values
    ENV['SCHEMA'] = @original_config[:env_schema]
    Rails.application.config = @original_config[:config]
  end
end

```

Bạn từng thực hiện với databases các thao tác như thế nào, thì chúng ta sẽ viết các file rake như thế.
Chỉ khác namspace chúng ta cần thêm vào ví dụ:
```ruby
$rake db2:db:create
```
**Chú ý:** Rake task set_custom_config, revert_to_original_config cung cấp cho chúng ta những biến môi trường, biến cấu hình để phù hợp với db2 của chúng ta

Đến đây, chúng ta có thể sử dụng:
![](https://images.viblo.asia/4cbcdb8a-3bc9-4bcd-a211-4de42d2e0856.png)
Chúng ta sẽ vào psql để kiểm tra xem  databases d2_development đã có trong databses chưa
```
$ sudo -su postgres psql
postgres=# \list

```
![](https://images.viblo.asia/7d9d003b-f15b-408a-94f6-002d22674206.png)

**Kết quả**: Ngoài databases db1_development và db1_test thì chúng ta đã tạo đc db2_development và db2_test, vậy là câu lệnh của chúng ta đã hoạt động

Một câu hỏi đặt ra ở thời điểm này. Là khi tôi create một table làm thế nào để table đó biết là nó thuộc db1 hay db2 ?
Và đối với db2 thì việc chạy lệnh 
```
rails g migration CreateModel
```
có được hay không?

### 3. Custom generator

Câu trả lời cho phần 2 là:
chúng ta ko thể sử dụng câu lệnh migration ở trên để create model cho db2 vì:

```
def create_migration_file
  set_local_assigns!
  validate_file_name!
  migration_template @migration_template, "db/migrate/#{file_name}.rb"
end
```
Như ta thấy thì method create_migration_file đã fix cứng thư mục tạo ra file migration là "db/migrate/#{file_name}.rb"

Vậy không còn cách nào khác là chúng ta sẽ ghi đè method này khi muốn create file migration trong db_db2/migrate

```ruby
# lib/generators/stats_migration_generator.rb
require 'rails/generators/active_record/migration/migration_generator'
 
class Db2MigrationGenerator < ActiveRecord::Generators::MigrationGenerator
  source_root File.join(File.dirname(ActiveRecord::Generators::MigrationGenerator.instance_method(:create_migration_file).source_location.first), "templates")
 
  def create_migration_file
    set_local_assigns!
    validate_file_name!
    migration_template @migration_template, "db_db2/migrate/#{file_name}.rb"
  end
end
```
Chung ta thử kết quả chạy lệnh tạo table nào:
![](https://images.viblo.asia/e3789c08-9d10-4dd5-9f01-81471b75f78b.png)

![](https://images.viblo.asia/1cae9cb8-fd8e-4625-9003-298494fb495d.png)

### 4. Conection model

- Tạo file config/initializers/db_db2.rb với nội dung
```
DB_STATS = YAML::load(ERB.new(File.read(Rails.root.join("config","database_db2.yml"))).result)[Rails.env]
```
trong model Book 
```
class Book < ActiveRecord::Base
  establish_connection DB_DB2

end
```
Kiểm tra bằng rails console
![](https://images.viblo.asia/d5c45180-f0a0-4b70-a27c-34bf805677c6.png)

### 5. Kết luận

Việc sử dụng multi-databases đối với những dự án lớn với số lượng table lớn là một giải pháp hữu ích để người lập trình có thể quản lý, xử lý một cách dễ dàng, giúp nắm bắt chức năng của các table tốt hơn. Tuy nhiên đối với các dự án nhỏ thì việc sử dụng nó lại khiến cho dự án trở nên phức tạp. Do đó, người đọc nên cân nhắc trước khi sử dụng.

### 6. Tài liệu tham khảo
http://www.ostinelli.net/setting-multiple-databases-rails-definitive-guide/
http://www.thegreatcodeadventure.com/managing-multiple-databases-in-a-single-rails-application/