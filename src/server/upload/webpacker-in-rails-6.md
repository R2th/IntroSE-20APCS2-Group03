Do việc sử dụng Javascript ngày càng phát triển, việc sử dụng những framework của JS để làm front-end cho ứng dụng ngày càng trở nên phổ biến đẫn đến số lượng code JS trong ứng dụng trở nên rất lớn. Điều đó dẫn đến việc chúng ta cần quản lý file code JS và các packages của nó bằng một công cụ chuyên biệt. Bắt đầu từ Rails 6, Webpacker đã trở thành trình biên dịch mặc định của Javascript trong Rails project. Điều đó có nghĩa là tất cả code javascript sẽ được xử lý bằng webpacker thay thế cho assets pipeline đã cũ :) Webpacker có một số điểm khác biết so với assets pipeline về các thực hiện. Trong bài viết này chúng ta sẽ cùng tìm hiểu các Webpacker xử lý thế nào nhé!

# What is webpacker?

Webpacker là một ruby gem trong webpack - công cụ Javascript phổ biến sử dụng để quản lý và đóng gói Javascript code - và hỗ trợ Rails application sử dụng webpack một cách dễ dàng. Nói một cách đơn giản, nó cung cấp cho Rails cách sử dụng webpack để quản lý các gói javascript.

Chẳng hạn như khi tạo mới 1 Rails application bằng rails 6 ta sẽ nhìn thấy như bên dưới
```
* bin/rails: Spring inserted
       rails  webpacker:install
      create  config/webpacker.yml
Copying webpack core config
      create  config/webpack
      create  config/webpack/development.js
      create  config/webpack/environment.js
      create  config/webpack/production.js
      create  config/webpack/test.js
Copying postcss.config.js to app root directory
      create  postcss.config.js
Copying babel.config.js to app root directory
      create  babel.config.js
Copying .browserslistrc to app root directory
      create  .browserslistrc
The JavaScript app source directory already exists
       apply  /home/huynh.chi.trung/.rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/webpacker-4.2.0/lib/install/binstubs.rb
  Copying binstubs
       exist    bin
      create    bin/webpack
      create    bin/webpack-dev-server
      append  .gitignore
....
```
Lệnh `rails new` cũng sẽ sử dụng yarn để quản lý các npm packages

Bạn cũng sẽ nhìn thấy gem webpacker trong Gemfile, trong trường hợp từ Rails 5 update lên Rails 6 thì gem webpacker sẽ không tự động có, ta cần phải chay lệnh `rails webpacker:install`


# New Javascript folder
Từ trước rails 6, tất cả các file Javascript code được để trong  `app/assets/javascript`, tuy nhiên trong rails 6, thư mục này không còn tồn tại nữa, thay vào đó chúng được đặt trong `app/javascript`.

![](https://images.viblo.asia/68c2bde9-5aec-4592-ae3e-fd7aaa602e53.png)

Đây là cấu trúc thư mục javascript, nó có 2 mục chính: channels sử dụng cho ActionCable, còn packs là nơi lưu trữ chính cho các file js, chúng ta cùng xem file application.js
```javascript
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
```

File application.js này nó sẽ tương đương với file application.js ở trong thư mục app/assets/javascripts ở trong các phiên bản rails trước. Khi bắt đầu biên dịch javascript, nó sẽ tìm các file javascript ở trong folder packs này và tiến hành biên dịch. Mặc định file application này chứa code liên quan đến các thành phần Rails như turbolinks, Active Storage và Action Cable. Tóm lại bạn có thể tạo các file javascript và đặt trong thư mục "app/javascript/packs" để Webpaker có thể tìm và biên dịch.

Chúng ta có thể custom thư mục mặc định load file js bằng cách config lại trong config/webpacker.yml
```yml
default: &default
  source_path: app/javascript
  source_entry_path: packs
  public_root_path: public
  public_output_path: packs
  cache_path: tmp/cache/webpacker
  check_yarn_integrity: false
  webpack_compile_output: true
  ...
```

# Compile code Javascript

Làm thế nào để biên dịch code javascript với webpacker :| Ở môi trường development, chúng ta không cần làm gì cả, khi rails server được chạy, nó sẽ tự động complier giống như với assets pipeline.

Live reloading khi sử dụng webpack-dev-server

Webpacker tạo ra file `bin/webpack-dev-server` để có thế tải lại trang web ngay lập tức khi ở môi trường development. Chúng chạy riêng webpack-dev-server để chúng ta có thế xem được những thay đổi trực tiếp

Trong môi trường production, webpacker tự thêm `webpacker:complie` vào `assets:precompile`, vì vậy khi ta build pipeline,  nó cũng sẽ tự bien dịch bới webpack. Với những package được định nghĩa trong package.json, yarn sẽ tự tìm phiên bản trong file yarn.lock để cài đặt và biên dịch code javascript.

# Including the JavaScript code to project

Vậy làm thế nào để sử dụng các file javascript khi bạn đã đặt chúng vào app/javascript/packs. Rất đơn giản, Webpacker đã cung cấp cho chúng ta method là javascript_pack_tag, method cũng giống như method javascript_link_tag ở trong rails 5

```html
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```
Method javascript_pack_tag sẽ đảm bảo ứng dụng sẽ gọi đến đúng file javascript mà bạn đã cung cấp

# Kết luận

Sau bài viết này, mình hi vọng mọi người có một cái nhìn tổng quan về webpacker và không bị bỡ ngỡ khi tạo project mới với rails 6 mà không biết các file js trong assets đâu rồi. Việc webpacker quản lý js cũng làm cho chúng ta dễ dàng cài đặt các node packages một cách dễ dàng và sử dụng các framework như reactjs, vuejs làm front-end cho rails application. Mọi người có thể tự tạo 1 project với frontend là react với câu lệnh `rails new app_name --webpack=react` và làm quen với webpack xem sao :)

# Tài liệu tham khảo
- [https://prathamesh.tech/2019/08/26/understanding-webpacker-in-rails-6/](https://prathamesh.tech/2019/08/26/understanding-webpacker-in-rails-6/)
- [https://prathamesh.tech/2019/09/24/mastering-packs-in-webpacker/](https://prathamesh.tech/2019/09/24/mastering-packs-in-webpacker/)
- [https://medium.com/@adrian_teh/ruby-on-rails-6-with-webpacker-and-bootstrap-step-by-step-guide-41b52ef4081f](https://medium.com/@adrian_teh/ruby-on-rails-6-with-webpacker-and-bootstrap-step-by-step-guide-41b52ef4081f)

-----