## Back-end
Back-end của chúng ta sẽ là một ứng dụng Rails được lược bỏ phần view. Rails cung cấp chế độ "api" một cách tiện lợi bằng cách thêm flash --api khi chạy lệnh tạo ứng dụng mới.
 
### Tạo ứng dụng với chế độ API
```
$ rails new recordstore-back --api
```

**Thêm Gems**
1. Bỏ comment **rack-cors** và **bcrypt**
2. Thêm **redis** và **jwt_sessions**
3. Chạy lệnh **bundle install**

**Gem file ở hiện tại sẽ như này:**
```RUBY
# Gemfile - Jan 2019
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.2'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'
gem 'redis', '~> 4.1'
gem 'jwt_sessions', '~> 2.3'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
``` 


### Tạo User model
Như đã nói ở bài trước, chúng ta sẽ không sử dụng gem Devise, Rails có một số tích hợp tiện dụng khác cho việc thiết lập xác thực người dùng (authentication). Gem Devise có vẻ khá phổ biến và dù sao chúng ta cũng đang tìm hiểu công nghệ, tại sao chúng ta không thử thêm các loại gem khác hoạt động tương tự Devise, nhỉ? :relieved::relieved:

Để đơn giản, chúng ta sẽ tạo User model chưa có quan hệ với Record hoặc Artist. Những quan hệ này sẽ được thêm vào sau  để User có thể tương tác (thêm, sửa, xóa) Artist và Record trên ứng dụng với giao diện front-end.
```
$ rails g model User email:string password_digest:string
```

Trường **password_digest** sẽ sử dụng gem **bcrypt** mà chúng ta đã bỏ comment trong quá trình thiết lập ban đầu. Nó tạo ra một phiên bản token của mật khẩu để bảo mật tốt hơn.

Chúng ta cần phải sửa đổi *migration file* để các trường **email** và **password_digest** mặc định không thể null.

```Ruby
# db/migrate/20190105164640_create_users.rb
class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false

      t.timestamps
    end
  end
end
```
Chạy lệnh migrate:
```
$ rails db:migrate
```


### Tạo Artist model
Model Artist sẽ có quan hệ has_many đối với mỗi Record (sẽ tạo ở dưới)
```
$ rails g scaffold Artist name
```
Thông thường khi chạy *scaffold*, Rails sẽ tự động sinh tất cả các thứ cần có để có thể tương tác ngay với một model: model, controller, view... nhưng ở đây Rails không sinh ra view, điều này xảy ra là do API-mode đang hoạt động đấy.

### Tạo Record model
Record sẽ có thêm vài trường so với Artist, *belongs_to* Artist và User
```
$ rails g scaffold Record title year artist:references user:references
```
Chạy lệnh migrate:
```
$ rails db:migrate
```

### Namespacing API
Tiếp theo, chúng ta cần làm việc với routing. APIs thường thay đổi, xu hướng chung là giới thiệu các phiên bản, cho phép bên thứ ba chọn phiên bản API mới nếu họ thấy phù hợp. Điều này giúp ít lỗi hơn cho mọi người nhưng đi kèm với việc bạn phải thiết lập back-end, chủ yếu liên quan đến routing và vị trí tệp.

Để namespace ứng dụng với phiên bản đầu tiên, chúng ta cần sửa lại ở routing:
```ruby
# /config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
     # routes go here
    end
  end
end
```

### Update routes
Tiếp theo, chúng ta cần thêm các *resources* bên trong các namespace
```ruby
# /config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :artists
      resources :records
    end
  end
end
```
Sau khi cập nhật routes.rb, chúng ta cũng cần đặt controllers về đúng vị trí: di chuyển **artistscontroller.rb** và **recordscontroller.rb** vào thư mục trong đường dẫn *app/controllers/api/v1/* ... Hãy chắn chắn bạn đã sửa cả hai, sau đấy restart lại server nếu nó vẫn đang chạy.

Dưới đây là artists controller:
```RUBY
# app/controllers/api/v1/artists_controller.rb
module Api
  module V1
    class ArtistsController < ApplicationController
      before_action :set_artist, only: [:show, :update, :destroy]

      def index
        @artists = Artist.all

        render json: @artists
      end

      def show
        render json: @artist
      end

      def create
        @artist = Artist.new(artist_params)

        if @artist.save
          render json: @artist, status: :created
        else
          render json: @artist.errors, status: :unprocessable_entity
        end
      end

      def update
        if @artist.update(artist_params)
          render json: @artist
        else
          render json: @artist.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @artist.destroy
      end

      private
      def set_artist
          @artist = Artist.find(params[:id])
      end

      def artist_params
          params.require(:artist).permit(:name)
      end
    end
  end
end
```

Và records_controller.rb 
```ruby
module Api
  module V1
    class RecordsController < ApplicationController
      before_action :set_record, only: [:show, :update, :destroy]

      def index
        @records = current_user.records.all

        render json: @records
      end

      def show
        render json: @record
      end

      def create
        @record = current_user.records.build(record_params)

        if @record.save
          render json: @record, status: :created
        else
          render json: @record.errors, status: :unprocessable_entity
        end
      end

      def update
        if @record.update(record_params)
          render json: @record
        else
          render json: @record.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @record.destroy
      end

      private
      def set_record
        @record = current_user.records.find(params[:id])
      end

      def record_params
        params.require(:record).permit(:title, :year, :artist_id)
      end
    end
  end
end
```

Như vậy chúng ta đã config cơ bản các model, routing, controller cho back-end, vẫn còn khá đơn giản và không có gì mới ngoài Rails nhỉ? :sweat_smile::sweat_smile: Phần sau mình sẽ thiết lập xác thực người dùng sử dụng JWT_Sessions nhé, phần này đến đây thôi. :relieved:

Sayonara!! (｡◡﹏◡｡)
<br><br>
**Nguồn tham khảo**

https://web-crunch.com/ruby-on-rails-api-vue-js/