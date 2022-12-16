# Mở đầu
Ngoài rails_admin việc xây dưng admin cho 1 app ruby on rails nhỏ trở nên vô cùng đơn giản khi sử dụng gem active_admin.
# Cài đặt
Ta sẽ chuẩn bị tạo trang admin manage đăng nhập với gem devise và 1 tý phân quyền cho tài khoản

```ruby
# Gemfile
gem 'activeadmin'
gem 'devise'
gem 'cancancan'
```
```
rails generate active_admin:install
```

**Migration:**

```ruby
class DeviseCreateAdminUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :admin_users do |t|
      t.string :user_name,              null: false, default: ""
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.integer :permission, null: false, default: 0
      t.datetime :remember_created_at

      t.timestamps null: false
    end

    add_index :admin_users, :user_name, unique: true
    add_index :admin_users, :email, unique: true
  end
end

```

# Cách dùng
Đăng nhập admin với gem devise.

**seeds.rb**
```ruby
AdminUser.create!(user_name: 'admin', email: 'admin@example.com', password: '123456', password_confirmation: '123456', permission: 1) if Rails.env.development?
```
**Tạo resource**
```ruby
rails generate active_admin:resource AdminUsers
```
Tiếp theo sẽ là cấu hình và phân quyền.

**config/initializers/active_admin.eb**
```ruby
config.comments = false
config.authorization_adapter = ActiveAdmin::CanCanAdapter
```
**app/models/admin_users.rb**
```ruby
class AdminUser < ApplicationRecord
  devise :database_authenticatable, :rememberable, :validatable,
    authentication_keys: [:user_name]

  enum permission: {manager: 0, admin: 1}
end

```
Thêm phân quyền cho tài khoản admin.

**app/models/ability.rb**
```ruby
class Ability
  include CanCan::Ability

  def initialize admin_user
    admin_user ||= AdminUser.new
    if admin_user.admin?
      can :manage, :all
    else
      can :read, :all
    end
  end
end

```
**config/routes.rb**
```ruby
devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
```
Bây giờ coi như đã thử được rồi , cơ mà vẫn sửa chút nội dung trang quản lý.

**app/admin/dashboard.rb**
```ruby
ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{I18n.t("active_admin.dashboard")}

  content title: proc{I18n.t("active_admin.dashboard")} do
    div class: "blank_slate_container", id: "dashboard_default_message" do
      span class: "blank_slate" do
        span I18n.t("active_admin.dashboard_welcome.welcome")
        small I18n.t("active_admin.dashboard_welcome.call_to_action")
      end
    end
  end
end

```
**app/admin/admin_users.rb**
```ruby
ActiveAdmin.register AdminUser do
  permit_params :user_name, :email, :password, :password_confirmation

  index do
    selectable_column
    id_column
    column :user_name
    column :email
    column :created_at
    actions
  end

  filter :user_name
  filter :email
  filter :created_at

  form do |f|
    f.inputs do
      f.input :user_name
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end

```
Thế là xong. đặp nhập và xem kết quả thôi.
![](https://images.viblo.asia/a6ee5803-8da2-4d10-9cae-714b4496933f.png)
# lời kết
Quá nhanh quá nguy hiểm cho một app quản lý đơn tuần kiểu CRUD , Các bạn có thể lên trang https://activeadmin.info để đọc thêm. bạn nào còn thắc mắc về cách dùng khác - việc custom view, controller, helper, hay là thêm ảnh, nested attributes, sử dụng ckeditor ... thì comment để mình viết thêm 1 bài nha.
Cảm ơn đã đọc bài. Mình tự đọc document để chạy app rồi viết bài chứ không sao chép, vui lòng không downvote !