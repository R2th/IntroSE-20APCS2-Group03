# Giới thiệu
Gần đây, các frontend framework/library như VueJS hay React ngày càng trở nên phổ biến hơn. Với đặc tính reactive giúp dễ dàng phản chiếu trạng thái lên giao diện người dùng, cùng lượng thư viện từ NPM phong phú, frontend framework giúp dễ dàng xây dựng các ứng dụng Web với giao diện người dùng phức tạp. Ví dụ cụ thể là xây dựng ra các Single-page Application, tức các trang Web mà người dùng có thể tương tác như một App mà không cần load lại trang sau mỗi hành động. Trong bài này, mình xin hướng dẫn cách tích hợp VueJS với backend Rails bằng cách sử dụng gem [Webpacker](https://github.com/rails/webpacker).

Trước khi thực hiện theo hướng dẫn, hãy đảm bảo chắc chắn máy bạn đã có các phiên bản Ruby, Rails, NodeJS và yarn mới nhất. Tương tự việc sử dụng [rbenv](https://github.com/rbenv/rbenv) để cài Ruby, bạn nên sử dụng [nvm](https://github.com/nvm-sh/nvm) để dễ dàng cài đặt NodeJS bản mới nhất và quản lý nhiều phiên bản NodeJS khác nhau.
# Tiến hành
## Cài đặt
Để khởi tạo một ứng dụng Rails mới với webpacker + vue, bạn đơn giản chỉ cần chạy câu lệnh như sau:
```
rails new myapp --webpack=vue
```

Tuy nhiên, đa số mọi người sẽ muốn tích hợp webpacker/vuejs với một project Rails sẵn có. Không sao hết! Bạn có thể làm theo những bước dưới đây:
Thêm gem webpacker vào Gemfile:
```ruby
gem 'webpacker', '~> 4.x'
```
Chạy lần lượt các lệnh sau:
```ruby
bundle
rails webpacker:install
rails webpacker:install:vue
```

Bạn có thể gặp 2 warning như sau:
```
You need to allow webpack-dev-server host as allowed origin for connect-src.
This can be done in Rails 5.2+ for development environment in the CSP initializer
config/initializers/content_security_policy.rb with a snippet like this:
policy.connect_src :self, :https, "http://localhost:3035", "ws://localhost:3035" if Rails.env.development?
```
```
You need to enable unsafe-eval rule.
This can be done in Rails 5.2+ for development environment in the CSP initializer
config/initializers/content_security_policy.rb with a snippet like this:
if Rails.env.development?
  policy.script_src :self, :https, :unsafe_eval
else
  policy.script_src :self, :https
end
```
Nếu vậy, hãy làm như hướng dẫn. Mở file `config/initializers/content_security_policy.rb` lên và thêm vào phía dưới cùng như sau:
```ruby
Rails.application.config.content_security_policy do |policy|
  policy.connect_src :self, :https, "http://localhost:3035", "ws://localhost:3035" if Rails.env.development?

  if Rails.env.development?
    policy.script_src :self, :https, :unsafe_eval
  else
    policy.script_src :self, :https
  end
end
```
Vậy hiện tại bạn đã hoàn thành xong thiết lập ban đầu của Rails với Webpacker rồi đấy. Hãy để ý đến các file và thư mục trong đường dẫn `app/javascript`, nó hiện trông như này:
```
app/javascript
├── app.vue
└── packs
    ├── application.js
    └── hello_vue.js
```
Hãy để ý đến thư mục `packs`. Webpack sẽ tự động load các file javascript trong thư mục này. Nhưng không chỉ thế, nếu trong các file đó, bạn có sử dụng `require` hay ES6 `import` một module hay file js khác ở ngoài thư mục packs, webpack cũng sẽ thông minh bao gồm các file khác đó giúp bạn luôn. Nếu làm theo hướng dẫn này, bạn nên đọc trước nội dung của file `application.js` và `hello_vue.js`, có thể nó sẽ hữu ích cho bạn khi đọc phần dưới. ***Spoil:** file `application.js` chỉ có một dòng console.log nói webpacker xin chào, còn `hellovue.js` thì khởi tạo Vue và load component `app.vue`, có nội dung in ra dòng chữ thành công "Hello Vue!".*

Tuy nhiên nếu bạn chạy `rails s` bây giờ, bạn sẽ không thấy "Hello Vue!" mà vẫn chỉ thấy trang mặc định với dòng chữ "Yay! You’re on Rails!" thần thánh.

![Trang mặc định của Rails](https://images.viblo.asia/071d4224-5e13-45ac-9380-0ddec1f346bd.png)

Đừng hoảng sợ, chúng ta chỉ cần tạo một trang mới và load đoạn javascript đã được bundle bởi webpack là xong. Hãy xem tiếp hướng dẫn ở phần dưới.
## Tạo view
Dùng lệnh sau để tạo ra một controller cùng action với view tương ứng để load mã javascript vuejs của chúng ta (đừng quên `cd` vào thư mục myapp trước).
```
rails g controller pages index
```
Đoạn lệnh trên sẽ tạo ra `app/controllers/pages_controller.rb` có action `index` cũng như view `app/views/pages/index.html.erb`.

Bước tiếp theo, sửa routes để địa chỉ root vào `pages#index` mới tạo của chúng ta. Mở file `config/routes.rb` lên và sửa:
```ruby
Rails.application.routes.draw do
  root to: "pages#index"
end
```

Địa chỉ mặc định đã được đổi thành công:
![Sử dụng action mới tạo làm root của Rails](https://images.viblo.asia/3a2c66de-2865-46df-a956-dd126ba0c354.png)

Giờ bạn cần mở file `app/views/pages/index.html.erb` lên, xóa nội dung cũ đi và thay bằng:
```ruby
<%= javascript_pack_tag 'hello_vue' %>
```

Đã xong, vuejs đã được load thành công!
![](https://images.viblo.asia/b5b25d94-79e0-4c27-8740-a9f0b1c01343.png)

Nhân tiện, làm quen với VueJS một chút nhỉ.
## Làm quen với Vue
VueJS có một tính năng chính rất mạnh mẽ: ta có thể gắn kết trạng thái với giao diện, khi trạng thái thay đổi, giao diện cũng thay đổi theo. Mình sẽ thử làm một tính năng đơn giản: đó là tăng/giảm một số cho trước. Khi nhấn vào nút +/- tương ứng, số trên màn hình sẽ tăng hay giảm đi 1. Sửa file `app/javascript/app.vue` như sau:
```ruby
<template>
  <div id="app">
    <p>{{ num }}</p>
    <button @click="inc">+</button>
    <button @click="dec">-</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      num: 0
    }
  },
  methods: {
    inc() {
      this.num++;
    },
    dec() {
      this.num--;
    }
  }
}
</script>
```
Sau đó reload lại trang. Kết quả như sau:
![Ví dụ tăng giảm số](https://images.viblo.asia/9f8012d6-b938-4d16-96d2-1bf8ee0ae606.gif)

# Thông tin thêm
Nếu cần tìm hiểu thêm thông tin, bạn hãy xem thêm tài liệu vuejs tại http://vuejs.org/ và webpacker tại https://github.com/rails/webpacker.