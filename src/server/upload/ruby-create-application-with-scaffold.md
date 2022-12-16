Trong bài này, mình sẽ tạo một ứng dụng nhỏ để tìm hiểu về các tính năng mạnh mẽ của Rails. 
Sử dụng script `scaffold` generator tự động sinh ra phần lớn chức năng để nhanh chóng tạo app, dựa vào đó để học về tổng quan của Web và Rails programming nâng cao.
## Lập kế hoạch
Các bước thực hiện bên dưới đã được giải thích ở bài trước nên có thể [refer](https://viblo.asia/p/ruby-cloud-development-environment-cloud9-RnB5p72YlPG) lại.
1. Trước tiên, chúng ta hãy lên kế hoach để thực hiện tạo ứng dụng. Ta bắt đầu từ việc tạo khung của app bằng lệnh `rails new`.
```
$ cd ~/workspace
$ rails _5.1.2_ new toy_app
```
2. Tiếp theo, Edit `Gemfile`
```
source 'https://rubygems.org'

gem 'rails',        '5.1.2'
gem 'puma',         '3.9.1'
gem 'sass-rails',   '5.0.6'
gem 'uglifier',     '3.2.0'
gem 'coffee-rails', '4.2.2'
gem 'jquery-rails', '4.3.1'
gem 'turbolinks',   '5.0.1'
gem 'jbuilder',     '2.7.0'

group :development, :test do
  gem 'sqlite3', '1.3.13'
  gem 'byebug',  '9.0.6', platform: :mri
end

group :development do
  gem 'web-console',           '3.5.1'
  gem 'listen',                '3.0.8'
  gem 'spring',                '2.0.2'
  gem 'spring-watcher-listen', '2.0.1'
end

group :production do
  gem 'pg', '0.20.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```
3. Install gem ở local (bỏ qua gem dùng cho môi trường product bằng việc add thêm option --without production)
 ```
$ bundle install --without production
```
4. Quản lý version Toy app trên Git
```
$ git init
Reinitialized existing Git repository in /home/ubuntu/workspace/toy_app/.git/
$ git add -A
$ git commit -m "Initialize repository"
```
5. Tạo repo trên Bitbucket rồi push file đã tạo lên remote repository này
```
$ cd /home/ubuntu/workspace/toy_app/.git/
$ git remote add origin git@bitbucket.org:tranthitinh/toy_app.git
$ git push -u origin master
```
6. Chuẩn bị cho việc deploy. (Hiển thị Hello, world)
Add action vào Application controller `app/controllers/application_controller.rb`
```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def hello
    render html: "hello, world!"
  end
end
```
Setting root rooting `config/routes.rb`
```
Rails.application.routes.draw do
  root 'application#hello'
end
```
Push lên heroku
```
$ git commit -am "Add hello"
$ heroku create
Creating app... done, ⬢ vast-lake-37431
https://vast-lake-37431.herokuapp.com/ | https://git.heroku.com/vast-lake-37431.git
$ git push heroku master
```
Đến đây, bạn đã chuẩn bị xong để tạo bên trong app. Khi tạo Web app, thường thì đầu tiên sẽ tạo data model để mô tả cấu trúc của app.
Trong Toy app lần này sẽ tạo micro blog chỉ support user và micro post ngắn. Trước tiên thì tạo user model, tiếp theo là tạo micro post model.
###  Thiết kế model của user
Có rất nhiều phương pháp đăng ký user trên Web nhưng ở đây mình chỉ sử dụng những cái tối thiểu như bên dưới. (id là unique)
| users |  | 
| -------- | -------- |
| id    | integer   | 
| name    | string  | 
| email    | istring   | 
users tương ưng là table của database. Các thuộc tính id, name, email tương ứng là các columns trong table.

###  Thiết kế model của micro post
Cũng như user, tạo model của micro post đơn giản như bên dưới
| microposts |  | 
| -------- | -------- |
| id    | integer   | 
| content    | text  | 
| user_id    | string   |
## Users resource
Ở đây sẽ implement users data model để hiển thị model đó theo Web interface. Data model này và Web interface được tổ hợp thành Users resource, Users có thể được coi là các đối tượng có thể tự do create/ get/ update/ delete thông qua giao thức HTTP. Như đã giới thiệu từ đầu, Users reource này thì toàn bộ sẽ được tạo ra bằng scaffold generator.
**Scaffold** của Rails thì được tạo thông qua lệnh `scaffold` trong `rails generate` script. Tham số của lệnh saffold thì dùng tên resource (ở đây là User), add thêm parameter lựa chọn thuộc tính của data model (ở đây là add thêm option `name:string` và `email:string`, Vì id được tự động add vào database với vai trò là Primary key nên ở đây không cần add)
```
$ rails generate scaffold User name:string email:string
Running via Spring preloader in process 4116
      invoke  active_record
      create    db/migrate/20171102064247_create_users.rb
      create    app/models/user.rb
      invoke    test_unit
      create      test/models/user_test.rb
      create      test/fixtures/users.yml
      invoke  resource_route
       route    resources :users
      invoke  scaffold_controller
      create    app/controllers/users_controller.rb
      invoke    erb
      create      app/views/users
      create      app/views/users/index.html.erb
      create      app/views/users/edit.html.erb
      create      app/views/users/show.html.erb
      create      app/views/users/new.html.erb
      create      app/views/users/_form.html.erb
      invoke    test_unit
      create      test/controllers/users_controller_test.rb
      invoke    helper
      create      app/helpers/users_helper.rb
      invoke      test_unit
      invoke    jbuilder
      create      app/views/users/index.json.jbuilder
      create      app/views/users/show.json.jbuilder
      create      app/views/users/_user.json.jbuilder
      invoke  test_unit
      create    test/system/users_test.rb
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/users.coffee
      invoke    scss
      create      app/assets/stylesheets/users.scss
      invoke  scss
      create    app/assets/stylesheets/scaffolds.scss
```
Tiếp theo, cần migrate database bằng lệnh `rails db:migrate`.
```
$ rails db:migrate
== 20171102064247 CreateUsers: migrating ======================================
-- create_table(:users)
   -> 0.0010s
== 20171102064247 CreateUsers: migrated (0.0011s) =============================
```
※Ở Rails version <5 thì lệnh `db:migrate` không phải lệnh **rails** mà sử dụng lệnh **rake**. Cần phải định nghĩa version của lệnh rake trong Gemfile nên cần chạy lệnh `bundler exec`.
```
 $ bundle exec rake db:migrate
```
Tiếp theo, khởi động Web server của môi trường local bằng lệnh `rails server`
```
$ rails server -b $IP -p $PORT 
```
### Confirm trang user
Khi mở root URL「/」trên trình duyệt thì sẽ hiển thị page「hello, world!」nhưng vì tạo ra Users resource bằng scaffold nên có nhiều trang quản lý user được thêm vào.
| URL | Action | Sử dụng |
| -------- | -------- | -------- |
| /users     | index     | Page list hết toàn bộ user    |
| /users/1     | show     | Page hiển thị user có id=1     |
| /users/new     | new     | Page tạo user mới     |
| /users/1/edit     | edit     | Page edit user có id=1     |
![](https://images.viblo.asia/d8b6b40d-c693-43b7-a676-b92fcb47d8f2.png)
Màn hình tạo mới user: Thử nhập tên và địa chỉ email vào rồi nhấn nút [Create User] 
![](https://images.viblo.asia/35872aff-c0ee-4ca8-bab2-9a76eb9aa350.png)
Danh sách toàn bộ user
![](https://images.viblo.asia/c161b2e7-3c01-4745-b17b-d0d4b6fa004a.png)
Màn hình xem thông tin user
![](https://images.viblo.asia/8ae8b4dd-d045-4446-85ff-74e1b1206452.png)
Màn hình Edit thông tin user
![](https://images.viblo.asia/24df37b4-2d46-44a3-8495-0a652cc4f90e.png)
Xóa user bằng cách nhấn Detroy của user tương ứng.
### Hoạt động của mô hình MVC
Ở đây mình sẽ tìm hiểu về tham chiếu resource của mô hình MVC(Model-View-Controller). Ví dụ xử lý bên trong mô hình MVC khi có action mở trang index trên trình duyệt.
![](https://images.viblo.asia/574a8608-b624-479a-b05d-db38f26434c4.png)
1. Từ trình duyệt gửi request của URL「`/users`」lên Rails server
2. 「`/users`」request được gán cho `index` action trong `Users` controller nhờ cơ chế routing của Rails.
3. Thực hiện `index` action, từ đó gửi yêu cầu get toàn bộ user (User.all) đến `User` model.
4. User model tiếp nhận yêu cầu, get toàn bộ user từ database.
5. Từ `User` model trả về cho controller danh sách toàn bộ user đã get được từ database.
6. ` Users` controller lưu danh sách user vào biến @users rồi chuyển qua `index` view.
7. index view khởi động, chạy ERB (Embedded RuBy) tạo (rendering) HTML.
8. controller tiếp nhận HTML đã tạo ở view rồi trả về cho trình duyệt.
### Nhược điểm của Users resource
Users resource đã tạo ra bằng scaffold thì giúp bạn nhanh chóng nắm được overview của Rails nhưng nó cũng bao gồm những nhược điểm bên dưới:
* Không xác minh data. Ở đây, có thể để trống user name, input mail address bừa bãi cũng được.
* Không xác thực data. Không login/logout nên bất kỳ ai cũng có thể thao tác.
* Không viết test.
* Layout và style không được điều chỉnh đẹp.
* Code khó hiểu.
## Microposts resource
Tương tự như Users reource, bây giờ chúng ta sẽ tạo microposts resource.
```
$ rails generate scaffold Micropost content:text user_id:integer
Running via Spring preloader in process 1725
      invoke  active_record
      create    db/migrate/20171113021918_create_microposts.rb
      create    app/models/micropost.rb
      invoke    test_unit
      create      test/models/micropost_test.rb
      create      test/fixtures/microposts.yml
      invoke  resource_route
       route    resources :microposts
      invoke  scaffold_controller
      create    app/controllers/microposts_controller.rb
      invoke    erb
      create      app/views/microposts
      create      app/views/microposts/index.html.erb
      create      app/views/microposts/edit.html.erb
      create      app/views/microposts/show.html.erb
      create      app/views/microposts/new.html.erb
      create      app/views/microposts/_form.html.erb
      invoke    test_unit
      create      test/controllers/microposts_controller_test.rb
      invoke    helper
      create      app/helpers/microposts_helper.rb
      invoke      test_unit
      invoke    jbuilder
      create      app/views/microposts/index.json.jbuilder
      create      app/views/microposts/show.json.jbuilder
      create      app/views/microposts/_micropost.json.jbuilder
      invoke  test_unit
      create    test/system/microposts_test.rb
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/microposts.coffee
      invoke    scss
      create      app/assets/stylesheets/microposts.scss
      invoke  scss
   identical    app/assets/stylesheets/scaffolds.scss
```
Chạy lệnh migrate
```
$ rails db:migrate
== 20171113021918 CreateMicroposts: migrating =================================
-- create_table(:microposts)
   -> 0.0019s
== 20171113021918 CreateMicroposts: migrated (0.0030s) ========================
```
### Confirm trang Micropost
| URL | Action | Sử dụng |
| -------- | -------- | -------- |
| /microposts    | index     | Page list hết toàn bộ microposts    |
| /microposts/1     | show     | Page hiển thị microposts có id=1     |
| /microposts/new     | new     | Page tạo microposts mới     |
| /microposts/1/edit     | edit     | Page edit microposts có id=1     |
| /microposts/1     | update     | Action update microposts có id=1     |
| /microposts/1     | destroy     | Xóa microposts có id=1     |
### Validation
Ví dụ giới hạn max length của content là 140 ký tự.
**app/models/micropost.rb**
```
class Micropost < ApplicationRecord
  validates :content, length: { maximum: 140 }
end
```
### Quan hệ 1-n, 1-1
Một user có nhiều bài post
**app/models/user.rb**
```
class User < ApplicationRecord
  has_many :microposts
end
```
1 bài post thuộc 1 user
**app/models/micropost.rb**
```
class Micropost < ApplicationRecord
  belongs_to :user
  validates :content, length: { maximum: 140 }
end
```
Trong bảng microposts đã tạo cột user_id nên dựa vào đó Rails và Active Record đã có thể tạo quan hệ giữa micropost và user.
![](https://images.viblo.asia/42be2631-21af-4f04-bfd8-4c33a78a72b9.png)
## Deploy app
Đăng ký trên Bitbucket
```
$ git status
$ git add -A
$ git commit -m "Finish toy app"
$ git push
```
Deploy trên heroku
```

$ git push heroku
$ heroku run rails db:migrate
```