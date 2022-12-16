Vậy là Rails 6 đã vừa được ra mắt với rất nhiều tính năng mới. Trong quá trình nâng cấp có thể ta sẽ gặp một vài vấn đề.
Dù rails 5 vẫn là phiên bản được support nhưng tương lai việc sử dụng rails 6 ngay từ ban đầu hoặc nâng cấp từ sớm sẽ giúp đỡ khó khăn trong việc nâng cấp phiên bản sau này.


## Cập nhật Gemfile
1. Nâng  phiên bản rails lên `6.0.0 `
2. Thêm gem `webpacker`
3. Thêm gem `image_processing` nếu sử dụng Active Storage
```
# Gemfile
...
gem "image_processing"
...
gem "rails", "~> 6.0.0"
...
gem "webpacker"
...
...
```
Sau đó chạy 
```
bundle update rails
rails app:update
bundle exec rails webpacker:install
```

Lúc này rails sẽ bắt đầu hỏi về việc ghi đè những file đang có sẵn, bạn cần ấn `h` để xem các options, ấn `d` để kiểm tra sự khác biệt để kiểm tra xem những thay đổi này là gì. Ví dụ:

![](https://images.viblo.asia/14f62114-9112-40ed-9c0f-40329ae07ba7.png)

Trong quá trình này các file sau sẽ bị hỏi có cần thay đổi, bạn nên ấn `y` hết sau đó dùng `git diff` để kiểm tra các sự thay đổi, sau đó revert nếu cần thiết.
```
bin/rails
bin/rake
bin/setup
config/cable.yml
config/environments/development.rb
config/environments/production.rb
config/environments/test.rb
config/initializers/content_security_policy.rb
config/locales/en.yml
config/puma.rb
config/spring.rb
```
Và cuối cùng sẽ có thể 1 migration mới liên quan đến activestorage với tên `_add_foreign_key_constraint_to_active_storage_attachments_for_blob_id.active_storage.rb`.
Bạn cần chạy `rails db:migrate` để chạy migration này.

---
## Config Webpack để quản lý static assets
### Webpack
Đối với ai đã từng tìm hiểu về các javascript framework như angular, react hay vuejs, thì có thể đã làm việc với webpack rồi.
Webpacker lại là một gem của rails, hỗ trợ việc sử dụng webpack trong việc quản lý các thư viện js trong rails. Bắt đầu từ rails 6 webpacker được đi kèm với rails, cũng như webpack sẽ thay thế sprockets để quản lý các thư viện javascript. 

Tuy nhiên với việc nâng cấp lên rails 6 thì việc chuyển sang webpack sẽ không được tự động mà sẽ do người thực hiện.

*Lưu ý: Một số file khác cũng có sự thay đổi như babel.config.js và postcss.config.js ở project rails 6 cũng sẽ khác với file config cũ sử dụng webpacker phiên bản cũ hơn.*

### Cấu trúc thư mục mới của project rails 6
Bạn có thể tạo 1 project mới bằng rails 6 để kiểm tra thử cấu trúc thư mục assets của project rails 6 và rails 5 khác nhau như thế nào:
```
rails _5.2.3_ new prj5
rails _6.0.0_ new prj6
```
![](https://images.viblo.asia/ba76267d-d92e-4acb-a9ae-fe70ddd0ba9f.png)

Như vậy là không thấy `javascripts` trong thư mục `app/assets` như trên rails 5. Trên rails 6 thư mục `javascripts` được đổi tên thành `javascript` đã được chuyển ra ngoài thư mục `assets`

![](https://images.viblo.asia/30c3f3da-0c6d-4d7b-93f1-fe05fc10d779.png)

Để so sánh rõ hơn thì ta sẽ so sánh 2 file `views/layouts/application.html.erb`

![](https://images.viblo.asia/177a740c-093f-4750-8ccd-c243c01d0ccc.png)

Ta thấy trong file này ở rails 6 hàm gọi `javascript_include_tag` đã được thay thế bởi  `javascript_pack_tag` ở rails 6. Đây là hàm của webpacker để load javascript từ webpack. 

Còn đối với hàm `stylesheet_link_tag` thì không có sự thay đổi, đó là do ở Rails 6, Webpack/Webpacker *mặc định* chỉ quản lý javascript, còn css/images thì vẫn do sprockets quản lý.

### Sử dụng webpack để quản lý css
Webpack có thể được sử dụng để quản lý cả javascript và css. Như vậy ta có thể bỏ một số gem sau khỏi gemfile: bootstrap, jquery, ... 

Để asset pipelines load css từ webpack, ta cần thay hàm `stylesheet_link_tag` thành `stylesheet_pack_tag`. 

Trong file layout ta dùng `stylesheet_link_tag` + tên file css, tuy nhiên ở đây khi sử dụng `stylesheet_pack_tag`, ta không phải là load file css, mà sẽ là load css được file javascript import.

Có thể hiểu ở đây, `stylesheet_pack_tag` và `javascript_pack_tag` sẽ cùng trỏ đến cùng 1 file .js. Trong file js này, cần có 1 dòng import đến 1/các files css:
Ví dụ:

![](https://images.viblo.asia/bb616126-0c7d-4f81-a575-f9c3030166e6.png)

Đến đây nếu ta giữ nguyên dòng `import '...` như ảnh trên, nhưng bỏ `stylesheet_pack_tag` đi thì có được không? Câu trả lời là css vẫn load, **nhưng** chỉ ở môi trường development. 

Lý do là ở môi trường development, tất cả các css được file js import đều được chèn inline, còn khi ở môi trường production mà compile assets sử dụng `rails assets:precompile`, phải **bắt buộc** phải có `stylesheet_pack_tag` trỏ đến file javascript đó.
### Thêm các thư viện vào webpack trên rails 6
Các thư viện ta cần thêm cơ bản của rails 6, ta dùng lệnh:
```
yarn add turbolinks @rails/activestorage @rails/actioncable @rails/ujs
```
Đây là các thư viện cơ bản, ngoài ra còn các thư viện phổ biến như jquery, bootstrap thay thế cho các gem jquery, bootstrap nếu đang sử dụng.

```
yarn add bootstrap jquery
```

Sau đó ta import vào file javascript

```javascript
// app/javascript/packs/application.js

// Import stylesheet files
import '../src/application.scss'

// Import javascript files
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels") // ActionCable
require("bootstrap")

// Cần định nghĩa window.$ để $ hoạt động với file js.erb. 
// Nếu dùng ProvidePlugin sẽ chỉ hoạt động với các file javascript do Webpack quản lý, 
//   và không có tác dụng với form remote: true
window.$ = window.jQuery = require("jquery");
// hoặc chạy "yarn add expose-loader" và thêm:
// require("expose-loader?$!jquery");
```

Nếu bạn cần các thư viện phức tạp hơn thì có thể tham khảo:
- Vue: `bundle exec rails webpacker:install:vue` Tương tự với `react`, `angular` và `elm`.
- ERB: `bundle exec rails webpacker:install:erb` (hỗ trợ load erb bên trong file `.js.erb` (không hỗ trợ `.css.erb`).


## Kết
---
Rails 6 có rất nhiều chức năng mới, vì thế cũng như upgrade mọi major version ta cần nghiên cứu kĩ để tránh gây lỗi cho dự án. Mong qua bài viết nhanh này sẽ giúp ích cho mọi ngừoi trong việc bắt đầu với các dự án trên rails 6.
Các bạn nên tham khảo thêm trang chủ của rails để quá trình nâng cấp được suôn sẻ: https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#upgrading-from-rails-5-2-to-rails-6-0