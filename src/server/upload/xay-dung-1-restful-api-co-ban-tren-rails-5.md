Rails là 1 framework dùng để xây dựng các ứng dụng web, ngoài ra Rails còn hỗ trợ để build
các ứng dụng API. Hiện nay, ở phiên bản Rails 5 thì gem rails-api đã được tích hợp vào trong Rails, vì vậy để build được 1 app API với Rails rất đơn giản, nhưng trong bài viết này mình chỉ tạo với Rails thuần mà thôi. Bây giờ thì chúng ta sẽ cùng nhau xây dựng 1 ứng dụng Rails API cơ bản, ứng dụng đó là my_post.

# Chuẩn bị
Để có thể build được ứng dụng của chúng ta, thì đầu tiên các bạn cần phải cài đặt Ruby 2.2.2 trở lên và Rails 5.
```ruby
ruby -v
-> ruby 2.4.2p198 (2017-09-14 revision 59899) [x86_64-linux]
rails -v
-> Rails 5.1.7
```
Các bạn có thể tham khảo hướng dẫn cài đặt tại đây https://gorails.com/setup/ubuntu/14.04
# Cài đặt project
Để tạo được project API thì chúng ta thêm tùy chọn `--api`  vào command line khi khởi tạo như sau:
```ruby
rails new my_post --api
```
Như vậy thì project của chúng ta đã được tạo thành công.
# Xây dựng API
## Cấu hình Mysql
Theo mặc định thì khi tạo mới 1 ứng dụng rails thì database sẽ là sqlite3, vì vậy chúng ta sẽ cấu hình lại ứng dụng để có thể sử dụng được Mysql.

Đầu tiên chúng ta sẽ thay thế dòng `gem "sqlite3"` bằng dòng `gem "mysql2", ">= 0.3.18", "< 0.5` ở trong file: `Gemfile`
```ruby
source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem "rails", "~> 5.1.7"
gem "mysql2", ">= 0.3.18", "< 0.5"
gem "puma", "~> 3.7"

group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```

Sau đó đừng quên chạy lệnh: `bundle install` nhé.

Tiếp theo chúng ta sẽ sửa lại file: `config/database.yml` như sau:
```ruby
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password: your_pass
  socket: /var/run/mysqld/mysqld.sock

development:
  <<: *default
  database: my_post_dev

test:
  <<: *default
  database: my_post_test

production:
  <<: *default
  database: my_post_product
```

Chúng ta cần chạy lệnh này `rails db:create` để tạo database cho project

Ok. Vậy là chúng ta đã cấu hình xong Mysql cho project, bây giờ chúng ta cùng đi tới các bước tiếp theo

## Khởi tạo Model
Chúng ta sẽ tạo model `Post` như sau:

```ruby
rails g model Post title:string body:text
```

Sau khi chạy lệnh trên thì chúng ta đã tạo được 1 model `Post`

```ruby
class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
```

Tiếp theo chúng ta migrations để tạo bảng trong DB 

```ruby
rails db:migrate
```

Chúng ta sẽ validate các trường của model `Post`

```ruby
# app/models/post.rb

class Post < ApplicationRecord
  validates :title, :body, presence: true
end
```

Tiếp theo chúng ta sẽ seed dữ liệu vào DB:

Bạn phải thêm `gem "faker"` vào `gemfile` và chạy `bundle install`

```ruby
# Gemfile

[...]
group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "faker"
end
[...]
```

Ta sẽ tạo 5 bản ghi mẫu trong file `db/seeds` như sau:

```ruby
# db/seeds
5.times do
  Post.create(title: Faker::Book.title, body: Faker::Lorem.sentence)
end
```

Chạy `rails db:seed` để import data vào db

## Khởi tạo Controller

Chúng tạo sẽ tạo thư mục mới `/app/controllers/api/v1` với file `posts_controller.rb`

```ruby
class Api::V1::PostsController < ApplicationController
  def index
 
  end
end
```

Cấu hình lại file `config/routes.rb` như sau:

```ruby
Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :posts
    end
  end
end
```

## Xây dựng phương thức index

API này sẽ trả về danh sách tất cả `Posts` dưới dạng JSON

```ruby
class Api::V1::PostsController < ApplicationController
  def index
    @posts = Post.order('created_at DESC')
    render json: {
      status: true,
      data: @posts
    }, 
    status: :ok
  end
end
```

Bây giờ  chúng ta cùng test trên Postman nào

![](https://images.viblo.asia/ecee84f4-0908-468c-a0a5-c5b2db237a89.png)

## Xây dựng phương thức show

API này sẽ trả về 1 bản ghi `Post` dưới dạng JSON

```ruby
class Api::V1::PostsController < ApplicationController
  before_action :load_post, only: %i(show)

  def index
    @posts = Post.order('created_at DESC')
    render json: {
      status: true,
      data: @posts
    }, 
    status: :ok
  end

  def show
    render json: {
      status: true,
      data: @post
    }, 
    status: :ok
  end

  private

  def load_post
    @post = Post.find_by id: params[:id]
    return if @post
    render json: {
      status: false,
      message: 'Not found'
    }, 
    status: :not_found
  end
end
```

Kết quả như sau:

![](https://images.viblo.asia/2f1b58f7-1aff-4e66-9b66-88631d3c921d.png)

Trong trường hợp không tìm thấy `Post`

![](https://images.viblo.asia/a1caa209-26fd-4cd8-ade5-4753b03974e0.png)

## Xây dựng phương thức create

API này sẽ tạo 1 bản ghi được lưu vào DB và trả về bản ghi đó dạng JSON

```ruby
class Api::V1::PostsController < ApplicationController
  before_action :load_post, only: %i(show)

  def index
    @posts = Post.order('created_at DESC')
    render json: {
      status: true,
      data: @posts
    }, 
    status: :ok
  end

  def show
    render json: {
      status: true,
      data: @post
    }, 
    status: :ok
  end

  def create
    @post = Post.new post_params

    if @post.save
      render json: {
        status: true,
        data: @post
      }, 
      status: :created
    else
      render json: {
        status: false,
        error: @post.errors
      }, 
      status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit :title, :body
  end

  def load_post
    @post = Post.find_by id: params[:id]
    return if @post
    render json: {
      status: false,
      message: 'Not found'
    }, 
    status: :not_found
  end
end
```

Chúng ta cùng test nào.
Chú ý trong postman chúng ta sẽ đổi lại type từ `GET` thành `POST` nhé

Bên tab `Headers` chúng ta sẽ tạo `Key`: `Content-Type` có `Value`: `application/json`

```ruby
        Key                   Value
        Content-Type          application/json
```

Bên tab `Body` chúng ta sẽ tạo data như sau:

```ruby
{
	"title": "Title",
	"body": "Body"
}
```

![](https://images.viblo.asia/19c8bc74-8161-4067-b4d1-57f4f5766fbf.png)

## Xây dựng phương thức update
API cập nhật 1 bản ghi trong DB

```ruby
class Api::V1::PostsController < ApplicationController
  before_action :load_post, only: %i(show update)

  def index
    @posts = Post.order('created_at DESC')
    render json: {
      status: true,
      data: @posts
    }, 
    status: :ok
  end

  def show
    render json: {
      status: true,
      data: @post
    }, 
    status: :ok
  end

  def create
    @post = Post.new post_params

    if @post.save
      render json: {
        status: true,
        data: @post
      }, 
      status: :created
    else
      render json: {
        status: false,
        error: @post.errors
      }, 
      status: :unprocessable_entity
    end
  end

  def update
    if @post.update_attributes post_params
      render json: {
        status: true,
        data: @post
      }, 
      status: :created
    else
      render json: {
        status: false,
        error: @post.errors
      }, 
      status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit :title, :body
  end

  def load_post
    @post = Post.find_by id: params[:id]
    return if @post
    render json: {
      status: false,
      message: 'Not found'
    }, 
    status: :not_found
  end
end
```

Test phương thức update thì phần data tương tự như create, còn type thì chúng ta sẽ để là `PUT` nhé

![](https://images.viblo.asia/4443d698-c185-4155-9e75-d234a2917298.png)

## Xây dựng phương thức delete
API xóa 1 bản ghi khỏi DB

```ruby
class Api::V1::PostsController < ApplicationController
  before_action :load_post, only: %i(show update destroy)

  def index
    @posts = Post.order('created_at DESC')
    render json: {
      status: true,
      data: @posts
    }, 
    status: :ok
  end

  def show
    render json: {
      status: true,
      data: @post
    }, 
    status: :ok
  end

  def create
    @post = Post.new post_params

    if @post.save
      render json: {
        status: true,
        data: @post
      }, 
      status: :created
    else
      render json: {
        status: false,
        error: @post.errors
      }, 
      status: :unprocessable_entity
    end
  end

  def update
    if @post.update_attributes post_params
      render json: {
        status: true,
        data: @post
      }, 
      status: :updated
    else
      render json: {
        status: false,
        error: @post.errors
      }, 
      status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    render json: {
      status: true,
      data: @post
    }, 
    status: :ok
  end

  private

  def post_params
    params.permit :title, :body
  end

  def load_post
    @post = Post.find_by id: params[:id]
    return if @post
    render json: {
      status: false,
      message: 'Not found'
    },
    status: :not_found
  end
end
```

Khi test chúng ta chú ý đổi lại type thành `DELETE` nhé

![](https://images.viblo.asia/b00cd868-10a8-4581-99be-8207a5a0f18e.png)

Như vậy là chúng ta đã tạo xong 1 RESTful API cơ bản rồi. Hi vọng qua bài viết này thì bạn có thể nắm được cách tạo ra một ứng dụng API đơn giản, chúc các bạn thành công!

# Tài liệu tham khảo
https://jee-appy.blogspot.com/2016/03/how-to-make-rest-api-in-rails.html
https://jee-appy.blogspot.com/2016/03/how-to-make-rest-api-in-rails-part-2.html
https://www.youtube.com/watch?v=QojnRc7SS9o&t=348s