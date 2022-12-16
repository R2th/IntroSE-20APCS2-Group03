Kể từ ngày release của Rails 6, Webpack đã trở thành JavaScript bundler mặc định cho các Rails App. Vốn đã quen với việc sử dụng Sprockets, và vốn là một Dev backend, mình cũng như không ít các bạn sẽ khó hiểu và khó tiếp cận với công cụ Webpack mới này. Ở bài viết này, mình sẽ cố gắng hướng dẫn và gỉai thích các khái niệm và ý tưởng cơ bản từ góc nhìn của một Dev Rails đã quen làm việc với Assets Pipeline, và so sánh cả 2 bundler này trong các ví dụ thực tế.

# Một vài từ khoá
- Một **Bundler** là một công cụ giúp xử lý, compile và nén các asset như JavaScript, CSS, ảnh, video, ...
- [Webpack](https://webpack.js.org/) là một bundler chạy trên nền NodeJS.
- [Webpacker](https://github.com/rails/webpacker) là một gem giúp kết nối Rails với Webpack.
- [Sprockets](https://github.com/rails/sprockets), giống như Webpack, là một bundler chạy trên nền Ruby.
- [Sprockets-Rails](https://github.com/rails/sprockets-rails) là một gem giúp kết nối Rails với Sprockets.
- [Asset Pipeline](https://guides.rubyonrails.org/asset_pipeline.html) là một khái niệm sử dụng bởi Rails để nói về việc sử dụng Sprockets-Rails để quản lý assets.

>Có nhiều các bundler khác như Rollup, Parcel hay Browserify. Mình sẽ không đề cập chúng ở bài này.

# Cấu trúc thư mục

Khi sử dụng Sprockets, ta sẽ thường để toàn bộ assets ở `app/assets`, và trong thư mục đó sẽ chứa các thư mục `stylesheet`, `images`, `javascript`, ... và trong các thư mục đó sẽ chứa các file tương ứng.

Khi sử dụng Webpack, trong một app Rails bình thường thì chúng ta sẽ để toàn bộ các file JavaScript ở trong thư mục  `app/javascript`. Đây là config mặc định của Rails, nếu bạn mong muốn thay đổi cách quản lý assets hay đơn giản là chỉ muốn đổi tên thư mục thì chúng ta có thể config lại ở `config/webpacker.yml`:

```ruby
# before
source_path: app/javascript
# after
source_path: app/webpack
```

Chúng ta thường sẽ để các assets khác ở trong `app/javascript` hay  `app/javascript/src` và giữ những file javascript chính ở trong thư mục  `app/javascript/packs`.

>Chúng ta cũng có thể quản lý các loại assets khác trong thư mục `app/javascript/images` hay `app/javascript/css`, lúc này thì chúng ta nên config lại `source_path` thành một cái tên khác phù hợp hơn :D.

# Pack

Khi sử dụng Webpack, một trong những việc đầu tiên chúng ta cần làm là thay `javascript_include_tag` bằng `javascript_pack_tag` và `stylesheet_link_tag` bằng `stylesheet_pack_tag` đối với CSS.

> Chú ý rằng mặc định thì Rails sẽ sử dụng Sprocket cho CSS và Webpack cho JS, do đó chúng ta sẽ có cả `stylesheet_link_tag` và `javascript_pack_tag` ở layout. Tuy nhiên chúng ta vẫn có thể sử dụng những helper khác nếu cần.

Tương tự với việc link tới một file đã được compile ở thư mục `public/assets/` của `javascript_include_tag`, `javascript_pack_tag` cũng sẽ link tới một file đã được compile ở thư mục `public/packs`. Chúng ta cũng có thể config lại ở `config/webpacker.yml`:

```ruby
  public_root_path: public
  public_output_path: packs
```

# Quản lý nhiều Pack

Khi sử dụng Sprockets, chúng ta sẽ phải báo cho Rails biết phải đọc và compile JS và CSS nào với `application.css`, `application.js` (mặc định) và một số các loại asset khác. Chúng ta sẽ phải config thêm nếu mong muốn Rails lấy từ nguồn nào khác:

```ruby
# config/initializers/assets.rb

Rails.application.config.assets.precompile += %w(application_admin.js application_admin.css)
```

Để làm việc tương tự với Webpack, chúng ta không cần phải config gì cả. Tất cả các file nằm dưới thư mục `app/javascript/packs` (Hay còn gọi là `entry points`) sẽ được compile. Chúng ta có thể config đường dẫn của thư mục entry của app tại `config/webpacker.yml`: 

```ruby
source_entry_path: packs
```

Mặc định sẽ có một file `application.js`, nhưng ta có thể thêm vào những file khác như `application_admin.js`.

```javascript
// app/javascript/packs/application_admin.js

console.log('Admin loaded !!');
// chúng ta có thể viết toàn bộ code hoặc require các file cần thiết cho riêng admin.
```

Như vậy là khi Webpack compile, nó sẽ compile cả `application.js` và `application_admin.js`.

Việc này tương tự với CSS (hoặc SCSS):

```css
/* app/javascript/packs/application_admin.scss */

/* chúng ta cũng có thể sử dụng cú pháp import của sass ở đây. */

@import some_sass_module 

.big-red {
    color: red;
    font-size: 72px;
}
```

> Có một chú ý về CSS pack, mình sẽ đề cập đến khi nói về việc xử lý ảnh.
>
>Chú ý rằng **TẤT CẢ** các file dưới thư mục `/packs` sẽ được compile. Do đó ta không được để toàn bộ code ở đây, chỉ những file mà chúng ta phải truy cập trực tiếp. Source code phải để ở thư mục `/javascript` hoặc các thư mục con của nó, ngoài thư mục `/packs`.


# Node Modules

Rails dùng [YARN](https://yarnpkg.com/) để quản lý các package Node. Tất cả các package được download về ở thư mục `node_modules` ở root của project.

> Nên nhớ rằng chúng ta cần thêm `node_modules` vào `.gitignore` vì không ai muốn đẩy cả thư mục này lên repo cả :D

Những package này có thể sử dụng bởi cả Sprockets và Webpack, do đó bạn có thể lấy CSS bằng Sprockets và JS bằng Webpack từ  `node_modules`.

Để Sprockets tìm được file trong folder này thì chúng ta phải config thêm chút chút:

```ruby
# config/initializers/assets.rb

Rails.application.config.assets.paths << Rails.root.join('node_modules')
```

Webpack mặc định đã có thể tìm file trong `node_modules` mà không cần phải config thêm gì cả, nhưng nếu chúng ta muốn Webpack có thể check ở các folder khác thì ta có thể add thêm các path đó vào `additional_paths` ở `config/webpacker.yml`.

Khi ta `require` hay `import` và một file JS, `@import` ở một file SCSS hay `// require` ở một file CSS, trình biên dịch sẽ tìm tên folder đó trong tất cả các asset path đã được định nghĩa. Ví dụ: 

```javascript
// app/javascript/packs/application.js

require("@rails/ujs").start();
```

Webpack sẽ tìm đến một module trong thư mục `node_modules/@rails/ujs`, và nó sẽ check trong `package.json` trong thư mục đó để biết được phải load những gì. Ta cũng có thể đưa tên chính xác của file thay vì một module, ví dụ trong `package.json` của `@rails/ujs` có dòng này: 

```javascript
"main": "lib/assets/compiled/rails-ujs.js",
```
 
Đây chính là file sẽ được sử dụng nếu gọi đến module `@rails/ujs`, do đó chúng ta có thể làm như sau và cho ra kết quả tương tự:

```javascript
require("@rails/ujs/lib/assets/compiled/rails-ujs.js").start();
```

# Các function global/variable

Ví dụ ta có file JS này:

```javascript
function authenticate(userId) {
  // Xác minh người dùng đã đăng nhập chưa
}
```

Chúng ta muốn hàm này sẽ có thể gọi được từ bất cứ đâu, ngay lúc page load, ấn vào link hay trước khi gọi AJAX.

Khi sử dụng với Sprockets, tất cả JavaScript sẽ được nén vào một file và tất cả sẽ được chạy với global scope. Do đó ta có thể gọi hàm `authenticate` ở mọi nơi, tiện đúng không ... Tuy nhiên việc này sẽ có một vấn đề là nó sẽ gây ra việc làm phình global scope, và có thể sẽ gây ra việc trùng tên hàm nếu như có một hoặc vài modules cũng sử dụng tên giống nhau.

Khi sử dụng Webpack, một script đều được đóng gói riêng biệt do đó không có gì có thể thay đổi global scope một cách mặc định, và chỉ có thể export những thứ ta cho phép export (class, function, object, ...). Việc này sẽ giải quyết được vấn đề phình global scope, tuy nhiên ta sẽ không thể sử dụng hàm `authenticate` ở mọi nơi do nó không nằm ở global nữa rồi.

Để có thể làm được việc này thì ta phải khai báo hàm này một cách rõ ràng trong module:

```javascript
global.authenticate = function(userId) {
  // Xác minh người dùng đã đăng nhập chưa
};

// hoặc

const authenticate = userId => {
  // Xác minh người dùng đã đăng nhập chưa
};

global.authenticate = authenticate;
```


# jQuery

Nhiều project đều yêu cầu phải có jQuery và cần hàm `$` có thể sử dụng được ở mọi nơi. Cách đơn giản nhất để làm việc này là báo cho Webpack đẩy hàm `$` và `jQuery` ra global scope:

```javascript
// config/webpack/environment.js
const { environment } = require("@rails/webpacker");

const webpack = require("webpack");
environment.plugins.prepend(
  "Provide",
  new webpack.ProvidePlugin({
    $: "jquery/src/jquery",
    jQuery: "jquery/src/jquery"
  })
);

module.exports = environment;
```

# LiveReload

Webpacker có sẵn một file `bin` khi chạy sẽ tự động reload mỗi khi có thay đổi trong asset, do đó ta không cần phải F5 thủ công nữa (haha). Bạn cần chỉ việc chạy `rails s` ở một terminal và `bin/webpack-dev-server` ở terminal khác là có thể sử dụng được LiveReload của Webpacker rồi. Nếu muốn chạy đồng thời 2 server này thì chúng ta có thể sử dụng `foreman` để chạy.

Trước hết ta tạo file `Procfile`

```
rails: rails s -p 3000
js: ./bin/webpack-dev-server
```

Sau đó chạy `foreman start` để start cùng lúc 2 server.

# Quản lý những asset không phải JavaScript với Webpacker

## CSS

Khi sử dụng Webpacker, chúng ta có thể sẽ gặp những đoạn như này trong file JS 
```
import "style.css";

// hay dị hơn

import "image.png";
``` 

Ở đây Webpack có thể  lấy được các loại asset khác nhau và compile chúng vào những file riêng biệt. Nếu `application.js` có import CSS thì Webpack sẽ tạo ra một file `application.css` với content của CSS đó. Chúng ta config như sau:

```javascript
// config/webpacker.yml

production: extract_css: true;
```

## Ảnh

Trong file `application.js` mặc định, ta sẽ thấy dòng comment sau:

```javascript
// packs/application.js

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
```

Chúng ta có thể cho Webpack đọc thêm các file ở `../images` bằng cách bỏ comment ở dòng đầu tiên:

```javascript
require.context("../images", true);
```

Bây giờ ta có thể để tất cả ảnh và video vào `app/javascript/images` và Webpack sẽ đưa chúng vào `public/packs/media/images` trong khi compile. Chúng ta có thể xem các loại file được hỗ trợ ở config  `static_assets_extensions` trong `config/webpacker.yml`.

Chúng ta có thể gắn asset vào các file `.erb` bằng các sử dụng các helper `asset_pack_path/url` và `image_pack_path/url` của Webpacker.

> Note rằng để làm được việc này thì chúng ta không được sử dụng pack `application.css`. Hiện đang có một [open issue](https://github.com/rails/webpacker/issues/2144#issuecomment-745745635) trên repo Webpacker.

# Ưu nhược điểm

## Sprockets

### Ưu điểm

- Quen thuộc với các Dev Rails (Asset Pipeline, cách quản lý asset, ... ).
- Có thể dùng assets từ `gem` và từ `node_modules`.

### Nhược điểm

- Khó có thể tương thích với các tính năng của Javascript trong tương lai ([theo lời của DHH](https://discuss.rubyonrails.org/t/webpacker-presents-a-more-difficult-oob-experience-for-js-sprinkles-than-sprockets-did/75345/9))
- Khiến global scope bị phình to.
- Không còn là trình bundler mặc định cho JS, các guide sau này sẽ tập trung hơn vào Webpack.

## Webpack

### Ưu điểm

- Cho phép sử dụng những tính năng mới nhất của JS.
- Cho phép sử dụng nhiều plugin khác nhau để xử lý quá trình compile.
- Dễ dàng setup các framework JS (React, Vue, ... ) ngay trong qúa trình tạo Project.
- Không đụng đến global scope trừ khi ta cho phép.
- Có sẵn chức năng Auto-Reload.
- Có thể áp dụng được resource chung của Webpack để áp dụng vào Rails.

### Nhược điểm

- Khá là confuse khi có thể (và nên) import CSS và các asset khác vào JS.
- Khó để đọc asset từ gem, cái này mình chưa thử, phải nghiên cứu thêm.


# Tổng kết

Qua bài so sánh này, mình nghĩ rằng việc sử dụng Webpack cho JavaScript và Sprockets cho tất cả mọi thứ còn lại là cách dễ dàng nhất để tích hợp Webpack vào hệ thống (cho tới thời điểm này). Điều này cho phép chúng ta có thể sử dụng các tính năng mới nhất của JavaScript bằng Webpack, còn lại những asset khác chúng ta để cho Sprockets lo, như vậy sẽ đảm bảo chúng ta vẫn có thể sử dụng được những điều tốt đẹp nhất của 2 trình bundler này (*The best of both worlds*), và cũng sẽ quen thuộc với những dev đã quen với Asset Pipeline. Còn đối với những dev đã làm việc với Webpack rồi thì có thể cách dễ dàng hơn vẫn là cho Webpack xử lý hết tất cả asset, và bỏ quách Sprockets đi (yaoming).

Cảm ơn các bạn đã đọc bài viết của mình, hẹn gặp lại các bạn vào những bài viết sau (bow).

**Nguồn:**
- [Webpacker Document](https://github.com/rails/webpacker/#docs)
- [A Webpack Survival Guide - Ross Kaffenberger](https://www.youtube.com/watch?v=ivQ7HrnBJe8)
- [Webpack vs Sprockets - Ariel Juodziukynas](https://www.ombulabs.com/blog/learning/webpack/webpack-vs-sprockets.html)
- [Webpacker vs Asset Pipeline - Danielle Gordon](https://www.youtube.com/watch?v=2v4ySqyua1s)