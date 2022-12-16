Trong bài viết này, chúng ta sẽ so sánh Ruby on Rails và Sinatra bằng cách xây dựng cùng một ứng dụng web để thấy sự khác nhau giữa chúng nhé.
Bài viết hướng tới những bạn mới bắt đầu với ruby và phân vân nên chọn framework nào để bắt đầu nhé.
# Sinatra là gì?
- Có lẽ nhiều bạn đã quá quen thuộc với rails vậy sinatra là gi? cùng google 1 tí nhé
- Sinatra là một thư viện web mã nguồn mở, được viết trong Ruby. Sinatra framework nhỏ và rất linh động, nó không tuân theo mô hình MVC truyền thống trong lập trình web mà tập trung vào triết lý "nhanh chóng tạo ra ứng dụng web bằng ngôn ngữ Ruby với một nỗ lực tối thiểu". Một vài công ty lớn hiện đang sử dụng Sinatra framework cho các web của mình như : Heroku, Github, LinkedIn,...
- Các bạn có thể tìm hiểu kĩ hơn tại đây: http://sinatrarb.com/
# Deploy 1 app "Hello World" lên Heroku
## Sinatra
Đầu tiên, chúng ta tạo thư mục và code Ruby cần thiết để tạo app "Hello World!", ở đây việc install và cú pháp sinatra cơ bản bạn có thể xem tại trang chủ của sinatra nhé.
Ta sẽ có 1 file như sau: public-bookmarks.rb
```
require 'sinatra'

get '/' do
 "#{['Hello', 'Hi', 'Hey', 'Yo'][rand(4)]} World!"
end
```
Chỉ với vài dòng code như trên bạn hoàn toàn đã tạo cho mình 1 "Hello World" , bạn hoàn toàn có thể chạy thử bằng cách:
```
$ gem install sinatra
$ ruby public-bookmarks.rb
```
- Bây giờ chúng ta sẽ deploy nó lên heroku thử nhé, trước tiên, để deploy thì heroku cần có Gemfile và config.ru
+ Bạn tạo 2 file như sau:
config.ru
```
require './public-bookmarks'
run Sinatra::Application
```
gemfile
```
source 'https://rubygems.org'
gem 'sinatra'
ruby '2.1.2'
```
- Deploy lên heroku nhé:
```
$ git init
$ heroku apps:create

$ git add .
$ git commit -m 'first commit'
$ git push heroku master
```
- Chỉ với 9 dòng code và 3 file duy nhất, bạn đã hoàn thành 1 ứng dụng "Hello World" bằng sinatra 1 cách nhanh gọn.
## Rails
Đầu tiên cùng tạo 1 app "Hello world" bằng rails nhé
rails new public-bookmarks-rails --skip-test-unit --database=postgresql
- Vì rails sử dụng mô hình mvc trước hết ta tạo controller nhé 
```
rails generate controller hello_world index
```
```
# app/controllers/hello_world_controller.rb
class HelloWorldController < ApplicationController
  def index
  end
end
```
method controller index của chúng ta để trống, nó sẽ gọi tới view trong cấu trúc thư mục của rails. Ta sẽ tạo tiếp view cho index nhé
```
#app/views/hello_world/index.html.erb
Hello World!
```
- Note: Ở đây bạn cũng có thể làm như sau thay vì tạo file view, nhưng ở đây minh sẽ sử dụng cách thông thường và theo chuẩn mvc của rails để so sánh với sinatra nhé
```
class HelloWorldController < ApplicationController
  def index
    render inline: "<span>#{['Hello', 'Hi', 'Hey', 'Yo'][rand(4)]} World!</span>"
  end
end
```
- Bây giơ ta sẽ tạo file route nhé
```
# config/routes.rb
Rails.application.routes.draw do
 root 'hello_world#index'
end
```
- Bạn cần thiêt lập lại config/database.ymln và thêm 2 gem để có thể deploy lên heroku nữa nhé:
```
$ echo "gem 'rails_12factor', group: :production" >> Gemfile
$ echo "ruby '2.1.2'" >> Gemfile
$ git init
$ heroku apps:create
$ git add .
$ git commit -m 'first commit'
$ git push heroku master
```
#  Tổng kết
- Việc tạo và viết 1 ứng dụng "Hello World" đầu tiên và có thể chạy được trên heroku cho bạn cái nhìn tổng quan về cả 2, ở phần này bạn có thể sinatra hoàn toàn  gọn nhẹ hơn so với rails, nhiêu ý kiến cho rằng không nên gọi sinatra là 1 framework, trên trang chủ sinatra đã tự định nghĩa Sinatra is a DSL for quickly creating web applications in Ruby with minimal effort. 
- Ở bài viết này trong sinatra mình đã chỉ render 1 plain text thay vi 1 file html trong phần tiếp theo chúng ta sẽ đi sâu hơn trong việc tạo 1 ứng dụng cơ bản với các chức năng hoàn chỉnh hơn cho cả rails và sinatra nhé