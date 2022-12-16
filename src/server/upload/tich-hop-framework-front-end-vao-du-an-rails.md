Xu hướng của lập trình web hiện nay đã khác trước rất nhiều, khi mà phần lớn các xử lý logic phần lớn nằm ở phía front-end làm cho gánh nặng càng ngày càng đè lên vai JavaScript (JS) thì các công cụ hỗ trợ cho JS như typing, task runner, test tools,... và rất nhiều thứ, nói chung là không thể thiếu được đối với 1 web front-end developer. Từ đó mà trên đời sinh ra một thứ gọi là `Webpack`.

Webpack là gì? Nó là một __module loader__ cho JS một cách cơ bản nhất. :confused: Module loader là cái quái gì nữa? tí nữa mình sẽ nói qua.
Nói sơ qua về Webpack thì nó hiện là module loadẻ được sử dụng rộng rãi nhất hiện nay với một cộng đồng support rất đông và hung hãng :heart_eyes: Ở thời điểm hiện tại phiên bản mới nhất của nó là __4.11.1__ với hơn 41k stars trên github.

### Module loader là gì?
Có khi nào bạn sử dụng các thư viện JS nổi tiếng như jQuery, Lodash, MomentJS, LeafletJS, datetpicker,... chưa? Cách đơn giản thông thường nhất à đưa đường dẫn của sources vào các thẻ `<script>` để load vào theo thứ tự. Khi trình duyệt tải trang nó sẽ đọc và thực thi JS từ trên xuống dưới. 

Nhưng mà năm 2018 rồi :smile: code web không còn chỉ vài dòng _vanilla-js_ hay _jQuery_ là xong :no_good: việc code front-end bây giờ ngày càng phức tạp và phình to nên việc quản lý code JS ngày càng quan trọng, từ đó khái niệm Module Loader ra đời :fireworks: 

Bên cạnh webpacker, cũng có một số cái tên khác như Tiny Loaders, RequireJS, Browserify, SystemJs và gần đây cũng đang nổi lên là RollupJS (nghe nói FB đang dùng thằng này cho React).

Mình chỉ có đôi lời giới thiệu qua thôi, muốn tìm hiểu nhiều hơn về webpack các bạn ghé trang chủ nhé https://webpack.js.org/

### Webpacker là gì?
Webpacker là một ruby gem, dùng để tích hợp Webpack vào Rails sử dụng chung với Asset Pipeline. Với việc có thể pre-compile được code JS trong Rails, gem này sẽ là cứu cách trong việc tích hợp các front-end framework như ReactJS, VueJS, AngularJS vào Rails.

#### Yêu cầu cài đặt

> Ruby 2.2+
>> Rails 4.2+
>>> Node.js 6.0.0+
>>>> Yarn 0.25.2+

#### Cài đặt Webpacker
Với phiên bản Rails 5.1 trở lên, bạn có thể cài đặt Webpacker ngay từ lúc khởi tạo dự án Rails bằng cách thêm tuỳ chọn `--webpack`
```sh
$ rails new app ---webpack
```
Hoặc với những project đang chạy, chỉ cần thêm vào `Gemfile`
```Gemfile
# Gemfile
gem 'webpacker', '~> 3.5'

# OR if you prefer to use master
gem 'webpacker', git: 'https://github.com/rails/webpacker.git'

# OR to try out 4.x pre-release
gem 'webpacker', '>= 4.0.x'
$ yarn add @rails/webpacker@4.0.0-pre.2 
```

Sau đó chạy các lệnh dưới để cài đặt webpacker
```sh
$ bundle
$ bundle exec rails webpacker:install

# OR (on rails version < 5.0)
$ bundle exec rake webpacker:install
```

#### Cài đặt front-end framwork
Ở đây mình sẽ làm mẫu với VueJS, với React hay Angular các bạn cũng có thể làm tương tự hoặc xem thêm [document tại github](https://github.com/rails/webpacker).

Khởi tạo kèm theo lúc khởi tạo dự án Rails
```sh
# Chỉ dùng cho Rails 5.1+
$ rails new app --webpack=vue
```
Hoặc nếu dự án đã khởi tạo thì chạy 
```sh
$ bundle exec rails webpacker:install:vue
```

Trình cài đặt sẽ tự động thêm Vue và các thư viện cần thiết khác vào file cài đặt và tạo ra một component hello world ngay trong thư mục `app/javascript` để có thể xem ngay kết quả.

#### Sử dụng:
Sau khi cài đặt, bạn hoàn toàn có thể sử dụng hết các sức mạnh của JS ES6 để code, code JS sẽ được đặt trong thư mục `app/javascript`

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
Bạn có thể đưa source JS vào `views` của Rails qua helper `javascript_pack_tag` và import style bằng helper `stylesheet_pack_tag`.

```erb
<%= javascript_pack_tag 'application' %>
<%= stylesheet_pack_tag 'application' %>
```
**Note:**

Một lưu ý nhỏ là nếu muốn sử dụng `stylesheet_pack_tag` bạn phải import module CSS/SCSS vào app thông qua file `application.js` (hoặc bất cứ file JS nào chứa app của bạn)
```application.js
// your CSS: app/javascript/styles/main.css
// In app/javascript/packs/application.js

import '../styles/main'
```

#### Deployment
Mặc định, webpacker thêm 1 task vào rails khi chạy `assets:precompile` là `webpacker:compile`. Task này sẽ tự động chạy mỗi khi compile assets.

Nếu bạn không sử dụng __Sprockets__, `webpacker:compile` được xem như là `assets:precompile`. Tương tự như sprockets, cả 2 tasks đều compile packs trong chế độ production nhưng sử dụng biến môi trường `RAILS_ENV` để tải cấu hình từ file `config/webpacker.yml`.

#### Kết luận

Trên đây mình đã giới thiệu cách setup một dự án front-end ngay trong lòng Rails :))

Nếu bạn muốn một app mẫu làm ví dụ hoặc còn thắc mắc thêm việc tích hợp các thứ linh tinh xung quanh như ESLint, Tes... để lại comment bên dưới, có thời gian mình sẽ viết thêm 1 bài hướng dẫn.