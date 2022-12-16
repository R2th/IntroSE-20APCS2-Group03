## Cài đặt
```
gem 'friendly_id'
```
 sau đó bundle install
 ## Cách sử dụng
+ Tạo 1 bảng posts Và thêm 1 trường slug vào bảng posts
```
# terminal
   rails g scaffold post title:string content:text
   rails generate friendly_id
   rails g migration AddSlugToPosts slug:string
   rails db:migrate
```
+ Thêm  method trong model
```
class Post < ApplicationRecord
  extend FriendlyId

  friendly_id :title, use: :slugged 
end
```
+ controller
```
class PostsController < ApplicationController
  def show
    @post = Post.friendly.find params[:id]
  end
end
```
+ routes
```
resources :posts, path: "tin-tuc"
```
+ Bây giờ tạo dự liệu 
```
rails c
Post.create title: "xe moi 2018", content: "..."
```
+ Kết quả
Nếu dùng friendly_id url:
```
http://localhost:3000/tin-tuc/xe-hoi-2018
```
Nếu không dùng friendly_id url:
```
http://localhost:3000/tic-tuc/1
```

## Tài liệu tham khảo
https://github.com/norman/friendly_id