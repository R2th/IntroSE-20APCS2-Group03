# 1. Migration
- Hầu như tất cả Rails developer đều quen thuộc và sử dụng [active record migrations ](https://guides.rubyonrails.org/active_record_migrations.html) để modify database.
- Với rails generator, bạn có thể tạo ra migration file với chỉ 1 command duy nhất
- Ví dụ để tạo table mới trong database.
    ```ruby
    rails generate migration CreateProducts name:string

    # db/migrate/20210721140838_create_products.rb
    class CreateProducts < ActiveRecord::Migration[6.0]
      def change
        create_table :products do |t|
          t.string :name
        end
      end
    end
    
    rails db:migrate
    ```
- Tương tự cho `add_column`, `add_foreign_key`, .... và các chức năng khác.
- Nhanh, đơn giản, dễ sử dụng.
- Tuy nhiên không phải tất cả migration được generate ra đều safe và good.
- Gem `strong_migrations` được sử dụng để kiểm tra, phát hiện và ngăn các migraion này chạy.
- Bạn có thể hiểu gem `strong_migrations` có tính năng như gem `rubocop` nhưng được dùng cho migration thay cho syntax, lint

# 2. Strong migration
## a. Install
- Thêm gem `strong_migrations` vào `Gemile`
    ```bash
    # Gemfile
    gem 'strong_migrations'
    ```
- Chạy command để install gem strong_migrations
    ```bash
    bundle install
    ```
## b. Config
- Chạy command để generate ra file config cho gem strong_migrations 
    ```bash
    rails generate strong_migrations:install
    ```
- File config được gen ra có nội dung như sau
    ```ruby
    # config/initializers/strong_migrations.rb
    # Mark existing migrations as safe
    StrongMigrations.start_after = 20210721142403

    # Set timeouts for migrations
    StrongMigrations.lock_timeout = 10.seconds
    StrongMigrations.statement_timeout = 1.hour

    # Analyze tables after indexes are added
    # Outdated statistics can sometimes hurt performance
    StrongMigrations.auto_analyze = true

    # Set the version of the production database
    # so the right checks are run in development
    # StrongMigrations.target_version = 10

    # Add custom checks
    # StrongMigrations.add_check do |method, args|
    #   if method == :add_index && args[0].to_s == "users"
    #     stop! "No more indexes on the users table"
    #   end
    # end
    ```
- Các config như `StrongMigrations.start_after`, `StrongMigrations.lock_timeout` được sử dụng để config gem `strong_migrations`
## c. How it works
- Các chức năng cơ bản của gem `strong_migration` bao gồm
1. Phát hiện các migration unsafe
2. Rails error và ngăn các migration unsafe được chạy
3. Hiển thị hướng dẫn để làm migration safe hơn
- Tất cả các chức năng này được thực hiện khi bạn chạy command `rails db:migrate` các migration được khởi tạo sao `StrongMigrations.start_after` sẽ được check

# 3. Check
## a. Removing a column
### i. Bad
- Migration được gen cho removing a column thường là
    ```ruby
    class RemoveSomeColumnFromUsers < ActiveRecord::Migration[6.1]
      def change
        remove_column :users, :some_column
      end
    end
    ```
- Sau khi migraion này được chạy, app vẫn query tới column bị remove thì sẽ bị lỗi và raise exception cho đễn khi app được reboot, nhận source code mới.
### ii. Good
- Sử dụng method [ignored_columns](https://api.rubyonrails.org/classes/ActiveRecord/ModelSchema/ClassMethods.html#method-i-ignored_columns) để column cần remove trong model.
    ```ruby
    class User < ApplicationRecord
      self.ignored_columns = ["some_column"]
    end
    ```
- Với method này thì các getter, setter liên quan đến column sẽ raise exception, các query vào model sẽ không query vào column này.
- Deploy code
- Tạo migration để remove the column (sử dụng `safety_assured` block)
    ```ruby
    class RemoveSomeColumnFromUsers < ActiveRecord::Migration[6.1]
      def change
        safety_assured { remove_column :users, :some_column }
      end
    end
    ```
- Deploy code và run migration
## b. Adding a column with a default value
### i. Bad
- Migration được gen cho adding a column with a default value thường là
    ```ruby
    class AddSomeColumnToUsers < ActiveRecord::Migration[6.1]
      def change
        add_column :users, :some_column, :text, default: "default_value"
      end
    end
    ```
- Khi migraion này được chạy sẽ rewrite lại toàn bộ table và lock table đến khi migration được chạy xong, các request từ app đến DB trong thời gian này sẽ bị timeout và raise exception
### ii. Good
- Tách thành 2 migration `add_column`và `change_column_default`
    ```ruby
    class AddSomeColumnToUsers < ActiveRecord::Migration[6.1]
      def up
        add_column :users, :some_column, :text
        change_column_default :users, :some_column, "default_value"
      end

      def down
        remove_column :users, :some_column
      end
    end
    ```
## c. Other checks
- Gem strong_migrations còn cung cấp thêm các check khác như changing the type of a column, renaming a column, ...
- Bạn có thể tìm hiểu nhiều hơn ở [README.md](https://github.com/ankane/strong_migrations/blob/master/README.md)