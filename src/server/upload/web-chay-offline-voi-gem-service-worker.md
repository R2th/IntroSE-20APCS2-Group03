Service worker là công nghệ mới cho phép chạy script bên phía trình duyệt mà không cần có mạng, qua đó giảm khoảng cách của app và web. Giờ đây người dùng chỉ cần vào web và web sẽ trở thành app có thẻ chạy offline và dễ dàng update ngay trên trình duyệt. Nếu bạn muốn tìm hiểu thêm về service worker bạn có thể xem qua bài viết này: [Giới thiệu về Service Worker](https://viblo.asia/p/gioi-thieu-ve-service-worker-Qbq5QLgXlD8). Trong bài viết này mình sẽ thử làm 1 web có thể chạy offline bằng gem **serviceworker-rails** với 1 web đọc bài viết trên viblo offline.
# Tạo project
Tạo project rails
<br>
> $ rails new offline --skip-active-record --skip-action-mailer 
<br>

Thêm 2 gem cần sử dụng vào Gemfile<br>
```ruby
gem 'httparty'
gem 'serviceworker-rails'
```
Bundle install thôi
<br>
# Setup service worker
Install gem trước đã
> $ rails g serviceworker:install

Giờ trong project sẽ sinh ra vài file mới.

* config/initializers/serviceworker.rb - Config service worker cho rails app
* app/assets/javascripts/serviceworker.js.erb - Ví dụ về 1 service worker
* app/assets/javascripts/serviceworker-companion.js - Register service worker
* app/assets/javascripts/manifest.json.erb - file manifest cơ bản
* public/offline.html - page sẽ show khi offline<br>

Đồng thời nội dụng các file dưới đây cũng được sửa:<br>

* application.js - require serviceworker-companion.js
* Thêm serviceworker.js và manifest.json vào list compiled assets trong config/initializers/assets.rb
* thêm tag vào head của app/views/layouts/application.html.erb để linking manifest file

Ok giờ thử chạy rails s, vào localhost:3000 để web load về.
Nếu làm đúng bạn sẽ thấy service worker được đăng kí trong application của chrome<br>
![](https://images.viblo.asia/87809d8a-fd60-4073-8966-af483790f6f8.png)<br>
Ok giờ tắt thử rails server đi xem, vào lại trang sẽ thấy trang offline hiện ra chứ không phải lỗi của trình duyệt.<br>
![](https://images.viblo.asia/904be368-9fe1-449d-b8e2-11c8f42d9ff8.png)
# Thử cache để chạy offline
Tạo 1 controller đơn giản lấy bài viết từ viblo:
> $ rails g controller home index fetch

Tạo route vào controller này:
```ruby
Rails.application.routes.draw do
  root "home#index"
  get "/:id", to: "home#fetch", as: "fetch"
end
```
Dùng HTTParty để lấy bài viết từ viblo ở home_controller.rb:
```ruby
class HomeController < ApplicationController
  def index
    response = HTTParty.get('https://viblo.asia/api/posts/newest?limit=20')
    json = JSON.parse(response.body)
    @data = json["data"].collect {|d| {slug: d["slug"], title: d["title"]} }
  end

  def fetch
    response = HTTParty.get('https://viblo.asia/api/p/' + params[:id])
    json = JSON.parse(response.body)
    @data = json["contents"]
  end
end
```
index.html.erb:
```ruby
<ul>
  <% @data.each do |data| %>
    <li>
      <%= link_to data[:title], fetch_path(data[:slug]) %>
    </li>
  <% end %>
</ul>
```
fetch.html.erb
```ruby
<%= @data %>
```
Ok giờ web chạy online được rồi dù xấu mù, chưa có tí css nào cả. Giờ đến vụ cache. Mặc định sẽ cache trang index, thêm **'/'** vào **cache.addAll** trong **function onInstall(event)** ở file serviceworker.js.erb.
```js
function onInstall(event) {
  console.log('[Serviceworker]', "Installing!", event);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function prefill(cache) {
      return cache.addAll([
        '<%#= asset_path "application.js" %>',
        '<%= asset_path "application.css" %>',
        '/offline.html',
        '/'
      ]);
    })
  );
}
```

Rồi giờ nếu làm cho vào đọc bài viết nào thì bài viết đò sẽ được cache lại. Thêm 1 đoạn script vào fetch.html.erb thôi:
```html
<script>
  caches.open(CACHE_NAME).then(function prefill(cache) {
    return cache.addAll([
      window.location.pathname
    ]);
  });
</script>
```

Giờ thử chạy rails, vào ra 1 vài trang bài viết. rồi cắt mạng và chạy thử offline xem.
# Tổng kết
Thấy nhiều bài viết phần này nên viết vào cho đúng form. Service worker khá hay và nhiều ứng dụng mà mình mới thấy có vài web lớn như google, youtube... sử dụng. Hi vọng service worker sẽ phổ biến hơn.