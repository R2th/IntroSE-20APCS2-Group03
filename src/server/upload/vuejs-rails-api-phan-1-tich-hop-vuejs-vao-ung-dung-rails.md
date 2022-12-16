Như chúng ta đã biết, `Rails` hoạt động theo mô hình kiến trúc Model-View-Controller `(MVC)`, và mặc định Rails có hỗ trợ cả `HTML`, `CSS`, `JS`. Nhưng thực tế, khi thực hiện xử lý `JS` trong phần `View` thường gặp khá nhiều khó khăn. Qua đó, thấy được nhiều hạn chế khi dùng `View Rails` làm `front-end`.<br><br>
Các ứng dụng Rails ngày nay cũng chuyển dần sang xu hướng xử lý riêng biệt 2 phần `back-end` và front-end. Việc tích hợp thêm và tận dụng tối đa những lợi ích của các `responsive framework` như `Vue.js`, `React` hay `Angular` có thể giúp chúng ta giải quyết tốt những "nỗi đau" mà front-end đem lại.
### Vậy tại sao lại là Vue.js?
Khi mà các ứng dụng web ngày càng phong phú thì việc nâng cao trải nghiệm người dùng luôn là tiêu chí hàng đầu, do đó `JS` rất được ưa chuộng khi kết hợp xây dựng giao diện xử lý các tác vụ người dùng. Và gần đây, `Vue.js` nổi lên như hiện tượng công nghệ mới, giúp xây dựng các ứng dụng Single-Page Applications `(SPA)` với độ phức tạp cao một cách đơn giản và nhanh chóng.<br><br>
`Vue.js` gọi tắt là `Vue`, là một framework linh động `(progressive framework)` được khởi chạy vào năm 2013, dùng để xây dựng giao diện người dùng có khả năng `tương tác cao`, được thiết kế khác với các framework nguyên khối (`monolithic` - loại hỗ trợ đầy đủ tất cả mọi thứ cần có để xây dựng một ứng dụng trong một framework). Khi phát triển phần giao diện, chỉ cần dùng thư viện lõi `(core library)` của `Vue` tích hợp với các thư viện hoặc dự án có sẵn khác. <br><br>
Hiện nay cũng có rất nhiều các thư viện hay `JS framework` mạnh mẽ như `React` được phát triển bởi `Facebook`, `Angular` được phát triển bởi `Google`, `Ember`, ... Nhưng `Vue` lại là sự lựa chọn lý tưởng cho các ứng dụng web ở mức `vừa và nhỏ` do hiệu năng `đáng nể` so với các đối thủ khác, dung lượng tải thấp do lõi nhỏ gọn với khả năng tương thích cao nên tăng tốc độ tải của toàn trang, xử lý nhanh với `Virtual DOM`, giúp thảm thiểu tối đa công sức. Thêm vào đó tài liệu tham khảo đơn giản, chi tiết, dễ học, `API` gọn nhẹ, khả năng tích hợp tuyệt vời.<br><br>
Tuy nhiên, `Vue` còn khá thiếu nguồn lực do thị phần nhỏ hơn nhiều so với `React` hay `Angular`, và khi tích hợp vào các dự án lớn, `Vue`có thể gây rủi ro về tính linh hoạt.<br>
Có 2 cách tiếp cận khi sử dụng `Vue` với `Rails` để xây dựng một `full-stack` web app:
1. Chia thành các ứng dụng `front-end` (Vue) và `back-end` (Rails) riêng biệt.
2. Include `Vue` vào `views` của Rails. Hữu ích khi bạn muốn sử dụng Vue thay vì `JS` hay `jQuery` đơn giản.

Trong bài viết này, mình sẽ nói rõ hơn về cách tiếp cận thứ hai. <br>
### Tích hợp Vue vào ứng dụng Rails bằng Webpacker
`Webpacker` giúp bạn dễ dàng sử dụng bộ tiền xử lý `JS` và `bundler webpack` để quản lý giống như ứng dụng `JS` trong Rails. Nó cùng tồn tại với `asset pipeline`, vì mục đích chính của `webpack` là xử lý như một ứng dụng `JS`, không phải `images`, `CSS` hay thậm chí là `JS Sprinkles` (tất cả vẫn có trong **app/assets**). Tuy nhiên, vẫn có thể sử dụng `Webpacker` cho `CSS`, `images`, và `fonts assets`, trong trường hợp đó thậm chí không cần `asset pipeline`. Cái này chủ yếu có liên quan khi chỉ sử dụng các `JS frameworks` hướng `component`.<br><br>
Để cài đặt `Webpacker` cần có:
* **Ruby** 2.2+
* **Rails** 4.2+
* **Node.js** 6.14.4+
* **Yarn** 1.x+

Chúng ta có thể tích hợp `Vue` vào ứng dụng `Rails` thông qua `Webpacker` trong quá trình cài đặt bằng cách sử dụng tùy chọn `--webpack` trong lệnh:
```ruby
# Available Rails 5.1+
$ rails new myapp --webpack=vue
```
Tùy chọn `--webpack=vue` sẽ nói Rails sử dụng `Webpack` để quản lý `assets`.<br><br>
Hoặc thêm `gem 'webpacker'` trong `Gemfile`:
```ruby
# Gemfile
gem 'webpacker'
```
Tiếp tục chạy:
```ruby
$ bundle install
$ rails webpacker:install
# Tạo một front-end setup 
$ rails webpacker:install:vue
# Khởi tạo một template, settings và install Vue.js
$ yarn install
# Install tất cả các npm packages, được định nghĩa trong package.json 
# trong thư mục gốc
```
Khi hoàn thành, sẽ có một thư mục **/javascript** trong thư mục **/app**. Khi sử dụng `Asset Pipeline`, chúng ta để `JS code` ở **app/assets/javascript**. Với `Webpack`, chúng ta sẽ để ở **app/javascript/packs**.<br><br>
Khi nhận được thông điệp như sau, cài đặt của bạn đã thành công rồi đó :D <br><br>
![](https://images.viblo.asia/52ef5a74-9ccd-4bc0-a3e6-3a0b3fd1bfc3.png)

Cấu trúc thư mục **/javascript** trong ứng dụng <br> <br>
![](https://images.viblo.asia/87cfe0d1-01c5-4710-a2ac-e16013d3a429.png)

### Hello Vue!
`Webpacker` cho phép chúng ta tạo thêm một số `packs`. Điều này rất tiện lợi khi chúng ta có một số ứng dụng front-end trong dự án.<br><br>
Chỉnh sửa file **app/javascript/packs/application.js** mặc định
```ruby
import Vue from 'vue'
import App from '../app.vue'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})
```
Nó chờ cho `DOM-tree` load và sau đó bắt đầu khởi tạo một vue-app, hoạt động giống như `jQuery.ready()`, nhưng không có `jQuery`. <br><br>
**app/javascript/app.vue** được gọi từ **application.js**
```javascript
<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        message: "Hello Vue!"
      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 60px;
    text-align: center;
    color: green;
    font-weight: bold;
  }
</style>
```
Đây là cấu trúc của một `Vue-component` đơn giản. Nó gồm `template`, `logic` và `style` gắn liền với `component`. <br> <br>
***Phía back-end***<br><br>
**application_controller.rb**
```ruby
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    render template: 'application'
  end
end
```
**routes.rb**
```ruby
Rails.application.routes.draw do
  root "application#index"
end
```
Thêm `<%= javascript_pack_tag 'application' %>` để liên kết `JS pack` với `Rails views`. Đây là một `helper` mới của `Webpacker`, nó lấy file **application.js** được chỉ định từ **app/javascript/packs** và sau đó tạo một ứng dụng bằng cách sử dụng đường dẫn bên trong `entrypoint`.<br><br>
**app/views/application.html.erb**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Myapp</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'application' %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```
Ngoài ra, mình sử dụng thêm `gem 'foreman'` để xử lý một số quy trình tại cùng một thời điểm (chạy đồng thời cả 2 server của Rails và Vue.js), quản lý đa tiến trình trong môi trường phát triển.<br>
Thêm `gem 'foreman'` vào `Gemfile` và tạo một file `Procfile` đồng cấp với `Gemfile`
```dev
backend: bin/rails s -p 3000
frontend: bin/webpack-dev-server
```
Cuối cùng, chạy 
```ruby
$ foreman start
```
Và đây là kết quả, chạy trên http://localhost:3000 <br> <br>
![](https://images.viblo.asia/61bc6506-a561-48c9-b37e-4af84b5dade6.png)

Qua bài, chúng ta đã tìm hiểu được một phương pháp đơn giản để có thể tích hợp Vue vào ứng dụng Rails. Không cần cài đặt npm, yarn trendy, không cần viết file package.json một cách thủ công, không cần hiểu rõ ES5/ES6, ... <br><br>
Bài viết còn nhiều thiếu sót, rất mong nhận được nhiều ý kiến đóng góp phản hồi từ bạn đọc. (bow)<br><br> 
Tham khảo <br>
* [Webpacker](https://github.com/rails/webpacker#vue)<br>
* [Rails 5 + Vue.js](https://mkdev.me/en/posts/rails-5-vue-js-how-to-stop-worrying-and-love-the-frontend)