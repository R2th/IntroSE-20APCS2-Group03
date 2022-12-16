# Introduction

Let's try out the new features added to Rails 6. This time it is case_sensitive.

Rails 6 now gives a warning when using MySQL when using uniqueness validation.

I did confirm on Ruby 2.6.4, Rails 6.0.0, MySQL 8.0.17 

```
$ rails --version
Rails 6.0.0
```
Today, I will checkout on using the `rails console` after creating `User` model

# Create Project
```
rails new rails_sandbox
cd rails_sandbox
```

# Create `User` model
I will create an `User` model that contains `name` property

```
bin/rails g model User name
```

# Add validation to `User` model
Add User's name attribute as an unique attribute

* app/models/user.rb
```
class User < ApplicationRecord
  validates :name, uniqueness: true
end
```
# Register seed data
I registered only 1 record of User

```
db/seed.rb
User.create(name: 'Taro')
```
# Execute migration and register `seed` data
```
bin/rails db:create db:migrate db:seed
```
# Confirm in `rails console`
Check in `rails console`

Create `user` object by `User.new(name: 'taro')`

```
irb(main):001:0> user = User.new(name: 'taro')
   (0.4ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
=> #<User id: nil, name: "taro", created_at: nil, updated_at: nil>
```

Execute validation are done by `user.valid?`

```
irb(main):002:0> user.valid?
DEPRECATION WARNING: Uniqueness validator will no longer enforce case sensitive comparison in Rails 6.1. To continue case sensitive comparison on the :name attribute in User model, pass `case_sensitive: true` option explicitly to the uniqueness validator. (called from irb_binding at (irb):2)
  User Exists? (0.9ms)  SELECT 1 AS one FROM `users` WHERE `users`.`name` = BINARY 'taro' LIMIT 1
=> true
```

I know that I had a `DEPRECATION WARNING`

And also, the SQL WHERE clause that performs validation checks

```
WHERE `users`.`name` = BINARY 'taro'
```
also note that BINARY are attached.

# Problem of this action
When saving an user
```
irb(main):003:0> user.save
DEPRECATION WARNING: Uniqueness validator will no longer enforce case sensitive comparison in Rails 6.1. To continue case sensitive comparison on the :name attribute in User model, pass `case_sensitive: true` option explicitly to the uniqueness validator. (called from irb_binding at (irb):3)
   (0.5ms)  BEGIN
  User Exists? (0.7ms)  SELECT 1 AS one FROM `users` WHERE `users`.`name` = BINARY 'taro' LIMIT 1
  User Create (0.7ms)  INSERT INTO `users` (`name`, `created_at`, `updated_at`) VALUES ('taro', '2019-09-01 04:37:55.708725', '2019-09-01 04:37:55.708725')
   (13.0ms)  COMMIT
=> true
```
Then we search the `name` that equals to `taro`
```
irb(main):006:0> User.where(name: 'taro').count
   (0.8ms)  SELECT COUNT(*) FROM `users` WHERE `users`.`name` = 'taro'
=> 2
```

We received 2 results `Taro` and `taro`

# Because of that
Since Rails 6.1 and later will stop this inconsistent behavior and default to case-insensitive validation.

Use the: case_sensitive option if you want the behavior as before.

# when `:case_sensitive` is set to `true`

* app/models/user.rb
```
class User < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: true }
end
```

Let's try to check `validation` here

```
irb(main):006:0> reload!
Reloading...
=> true
irb(main):007:0> user = User.new(name: 'taRo')
=> #<User id: nil, name: "taRo", created_at: nil, updated_at: nil>
irb(main):008:0> user.valid?
  User Exists? (0.8ms)  SELECT 1 AS one FROM `users` WHERE `users`.`name` = BINARY 'taRo' LIMIT 1
=> true
```

This time there's no warning that comes out

# when `:case_sensitive` is set to `false`
* app/models/user.rb

```
class User < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false }
end
```
Let's try to check `validation` here

```
irb(main):009:0> reload!
Reloading...
=> true
irb(main):010:0> user = User.new(name: 'taRo')
=> #<User id: nil, name: "taRo", created_at: nil, updated_at: nil>
irb(main):011:0> user.valid?
  User Exists? (0.8ms)  SELECT 1 AS one FROM `users` WHERE `users`.`name` = 'taRo' LIMIT 1
=> false
```

This time the warning also do not pop out, but note that validation is also checked without regard to case.

The result of `user.valid?` is false, and the SQL where clause used in validation does not have BINARY.


# What happens if MySQL is case sensitive in the first place?

First, let's see what happens if migration is running, so that MySQL is case sensitive.
```
$ bin/rails g migration user_name_column_to_binary
```
Edit the created migration file.
* db/migrate/20190901051514_user_name_column_to_binary.rb
```
class UserNameColumnToBinary < ActiveRecord::Migration[6.0]
  def up
    execute('ALTER TABLE users MODIFY name varchar(255) BINARY')
  end

  def down
    execute('ALTER TABLE users MODIFY name varchar(255)')
  end
end
```
Return model as follows.

* app/models/user.rb
```
class User < ApplicationRecord
  validates :name, uniqueness: true
end
```
Run the migration and re-register the seed data.
```
$ bin/rails db:migrate db:seed:replant
```

Re-check again in rails console
```
irb(main):001:0> user = User.new(name: 'taro')
   (0.3ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
=> #<User id: nil, name: "taro", created_at: nil, updated_at: nil>
```
There is no warning when we run the `valid?` method
```
irb(main):002:0> user.valid?
  User Exists? (0.4ms)  SELECT 1 AS one FROM `users` WHERE `users`.`name` = 'taro' LIMIT 1
=> true
```
Save to `user`, there is only 1 result if searching `taro`
```
irb(main):003:0> user.save
   (0.5ms)  BEGIN
  User Exists? (0.7ms)  SELECT 1 AS one FROM `users` WHERE `users`.`name` = 'taro' LIMIT 1
  User Create (0.3ms)  INSERT INTO `users` (`name`, `created_at`, `updated_at`) VALUES ('taro', '2019-09-01 05:32:29.403443', '2019-09-01 05:32:29.403443')
   (13.0ms)  COMMIT
=> true
irb(main):004:0> User.where(name: 'taro').count
   (0.7ms)  SELECT COUNT(*) FROM `users` WHERE `users`.`name` = 'taro'
=> 1
```

In this case, it seems to work without any warnings or inconsistencies.

Although it is snake-legged, it seems that you can also set the case-sensitivity in table units instead of column units (but unconfirmed). 

Also, there seems to be a case-sensitive setting in the MySQL DB itself (config/database.yml), but I couldn't find it.

# Used Source code
https://github.com/suketa/rails_sandbox/tree/try081_mysql_comparison

If MySQL was case-sensitive

https://github.com/suketa/rails_sandbox/tree/try081_mysql_comparison_user_name_column_to_binary

# Reference Info
[What is new in Rails 6.0
](https://bogdanvlviv.com/posts/ruby/rails/what-is-new-in-rails-6_0.html)

[Deprecate mismatched collation comparison for uniquness validator](https://github.com/rails/rails/pull/35350)