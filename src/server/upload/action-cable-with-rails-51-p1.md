Hầu hết mọi người đều nghe nói đến Action Cable trên rails, bài viết này mình xin giới thiệu ngắn gọn về ví dụ Action Cable từ console đến webpage mà không cần load lại trang. Cùng bắt đầu nào.
# Tạo rails app
```
rails new action-cable
[...]
cd action-cable
rails generate controller page index
[...]
```
Config routes:
```
Rails.application.routes.draw do
  get ‘page/index’
  root ‘page#index’
end
```
Thêm một đoạn code HTML vào trong view:
```
#app/views/page/index.html.erb
<h1>Action Cable Example</h1>

<div id=”messages”></div>
```
Để nhúng đoạn HTML vào <div id=”messages”></div> trong DOM chúng ta cần sử dụng jQuery mà nó không được tích hợp sẳn trong Rails 5.1. Trong Rails 5.1, việc tích hợp này sẽ được giải quyết bởi một packet quản lý JavaScript mới có tên là Yarn, bạn cần phải cài nó đầu tiên.
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```
Sau đó bạn có thể sử dụng để cài jQuery:
```
bin/yarn add jquery
```
Để thật sự load jQuery trong Rails app thêm dòng sau trong application.js:
```
//= require rails-ujs
//= require jquery
//= require turbolinks
//= require_tree .
```
# Tạo Channel
đây là công đoạn cần phải có khi sử dụng action cable 
Rails cung cấp sẵn một generator để tạo ra một channel mới. Chúng ta gọi channel này là "WebNotifications".
```
rails generate channel WebNotifications
```
Và để tiếp tục thì chúng ta thêm một số CoffeeScript vào đầu trang app/assets/javascripts/page.coffee:
```
App.room = App.cable.subscriptions.create "WebNotificationsChannel",
  received: (data) ->
    $('#messages').append data['message']
```
config lại channel vừa được tạo:
```
class WebNotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "web_notifications_channel"
  end

  def unsubscribed
  end
end
```
chúng ta không thể đẩy messages từ Rails console lên Rails server trong những terminal khác nhau của môi trường development mặc định. Chúng ta phải cần phải thêm gem Redis bằng cách thêm dòng dưới đây vào trong Gemfile. (Trước tiên bạn phải có Redis đang chạy trên hệ thống của bạn)
```
gem ‘redis’, ‘~> 3.0’
```
Chúng ta cần phải config để sử dụng Redis trong file config/cable.yml:
```
redis: &redis
  adapter: redis
  url: redis://localhost:6379/1

production: *redis
development: *redis
test: *redis
```
# Run thôi
```
rails server
```
Trong console của các terminal khác nhau, Chúng ta có thể truyền lên 1 mesage đến web_notifications_channel:
```
rails console
Running via Spring preloader in process 19706
Loading development environment (Rails 5.1.0.rc1)
>> ActionCable.server.broadcast ‘web_notifications_channel’,
message: ‘<p>Hello World!</p>’
```
Như vậy bạn đã sử dụng thành công action cable sử dụng console, bài viết được dịch từ [link](https://medium.com/rubyinside/action-cable-hello-world-with-rails-5-1-efc475b0208b) này.
phần tiếp theo mình sẽ giới thiệu về action cable với react (bow).