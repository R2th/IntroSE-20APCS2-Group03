Trong bài viết này, mình sẽ giới thiệu về các cách để tạo admin role trong rails.
### Option 1: with a admin model
- Sử dụng gem devise
```
$ rails generate devise Admin
```
- Trong admin model
```
class Admin < ActiveRecord::Base
  devise :database_authenticatable, :trackable, :timeoutable, :lockable 
end
```
- Migration
```
class DeviseCreateAdmins < ActiveRecord::Migration
  def self.up
    create_table(:admins) do |t|
      t.string :email,              :null => false, :default => ""
      t.string :encrypted_password, :null => false, :default => ""
      t.integer  :sign_in_count, :default => 0
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip
      t.integer  :failed_attempts, :default => 0 # Only if lock strategy is :failed_attempts
      t.string   :unlock_token # Only if unlock strategy is :email or :both
      t.datetime :locked_at
      t.timestamps
    end
  end

  def self.down
    drop_table :admins
  end
end
```
- Trong route
```
devise_for :admins
```
### Option 2: Adding an admin attribute
- Sử dụng attribute admin
```
$ rails generate migration add_admin_to_users admin:boolean
```
- Migration 
```
class AddAdminToUsers < ActiveRecord::Migration
  def change
    add_column :users, :admin, :boolean, default: false
  end
end
```
- Bây giờ bạn có thể kiểm tra user admin:
```
if current_user.try(:admin?)
  # do something
end
```
### Option 3: Using Active Record enum
- add attribute role
```
 rails g migration AddRoleToUsers role:integer
```
- Sử dụng enum role trong model user
```
class User < ApplicationRecord
  enum role: [:user, :vip, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end

  # ...
end
```
- Bây giờ bạn có thể gọi
```
user.admin?
user.admin!
user.role
user.user?
user.vip?
```
Hẹn gặp lại mọi người trong bài viết tiếp theo.
Happy coding!