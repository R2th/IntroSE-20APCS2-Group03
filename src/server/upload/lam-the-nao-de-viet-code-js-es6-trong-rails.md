__JS ES6, cái tên chắc chắn không còn quá xa lạ mình không cần giới thiệu nhiều bởi chắc chắn khi bạn đã tìm đến đây thì bạn hẳn đã có ý định muốn tận dụng  sức mạnh của ES6 vào dự án Rails của mình.__

Trước Rails 5.1 thì hầu như bạn phải tự làm bằng tay để có thể cấu hình được babel vào Rails để compile code ES6 về ES5. Rails 5.1 ra đời với một công cụ hết sức hữu ích đó là [Webpacker](https://github.com/rails/webpacker). Nói nôm na Webpacker là một Ruby gem dùng để tích hợp [Webpack](https://webpack.js.org/) vào dự án Rails sử dụng chung với Asset Pipeline.


_OK, bây giờ làm thế nào để viết JS "hiện đại" trong Rails đây? Bắt đầu nào._

## Yêu cầu hệ thống:
> Ruby 2.2+ 
> 
> Rails 4.2+ 
> 
> Node.js 6.0.0+ 
> 
> Yarn 0.25.2+
> 

## Cài đặt
Từ Rails 5.1+ đã có thể thêm `webpacker` vào Rails như 1 option khi khởi tạo project.
```sh
rails new a_rails_app --webpack
```

Hoặc cách truyền thống là add vào `Gemfile`
```Gemfile
gem 'webpacker', '~> 3.5'
```
Sau đó chạy bundle để cài đặt webpack
```sh
bundle install
bundle exec rails webpacker:install

# Or if Rails version is under 5.0
# bundle exec rake webpacker:install
```

Trong quá trình cài đặt nếu bạn gặp warnings "unmet peer dependency", chỉ cần chạy lệnh dưới:
```shell
yarn upgrade
```

#### Lưu ý với Rails 5.2+
Phiên bản Rails 5.2 trở lên cần enable `unsafe-eval` ở môi trường `development`

```rb
# file: config/initializers/content_security_policy.rb

if Rails.env.development?
  policy.script_src :self, :https, :unsafe_eval
else
  policy.script_src :self, :https
end
```

# Sử dụng
Cấu trúc code của webpacker như bên dưới:

```yml
app/javascript:
  ├── packs:
  │   # only webpack entry files here
  │   └── application.js
  └── src:
  │   └── application.css
  └── images:
      └── logo.svg
```

Webpacker cung cấp một số helpers để chèn JS/CSS vào trang views
```html
<!-- Helper generate script, link tag -->
<%= javascript_pack_tag 'application' %>
<%= stylesheet_pack_tag 'application' %>
```

Nếu muốn link một static asset cho thẻ `<link rel="prefetch">` hoặc `<img>` bạn có thể dùng helper `asset_pack_path`:

```html
<link rel="prefetch" href="<%= asset_pack_path 'application.css' %>" />
<img src="<%= asset_pack_path 'images/logo.svg' %>" />
```

Note: Để file style và các file tĩnh dùng được trong view, bạn cần phải link chúng từ thư mục pack.

Hãy thử thêm tí code trong `app/javascript/packs/application.js` xem chúng đã hoạt động chưa nào:
```js
setTimeout(() => alert('Hi there!'), 1000);
```
Sau đó tải lại trang (đảm bảo là bạn đã nhúng file `application.js` vào view rồi nhé). Ispect code JS ra bạn sẽ thấy arrow function đã được dịch thành khai báo hàm như ES5.

## Read more
> Vậy nếu mình muốn dùng Vue, Angualar, React hoặc các thư viện JS hiện đại khác vào Rails app thì nàm thao?
> 
Của bạn đây: https://github.com/tdson/rails_vue_pratice/blob/docs/Vue.md


__Nếu bài viết hữu ích cho bạn nhớ up vote nhé, thanks!__