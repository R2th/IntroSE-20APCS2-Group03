Trong phiên bản **Rails 6** mới nhất, bạn có cảm thấy lạc lõng với tất cả những thay đổi liên quan đến assets và **Javascript** không? **Npm, Babel, ES6, Yarn, Webpack, Webpacker, Sprockets**, tất cả chúng có giống như những người hoàn toàn xa lạ với bạn không?

Nếu bạn cần nhanh chóng hiểu về những thứ đó, về cách toàn bộ hệ sinh thái Javascript này hoạt động trong một ứng dụng Rails 6, thì bài viết này là thứ bạn đang tìm kiếm.

Mình sẽ kết thúc bài viết này bằng cách hướng dẫn các bước để tích hợp **Bootstrap 4** và **FontAwesome 5** vào ứng dụng Rails của bạn.
Đầu tiên mình xin phép giới thiệu 1 vài khái niệm để các bạn dễ hiểu hơn.
### NPM
Vậy NPM là trình quản lý gói Javascript (chính xác là các `module NodeJS`). Đó là `Rubygems` của thế giới `Javascript`.
Sau khi cài đặt npm, để cài các gói đó thì ta chỉ cần chạy lệnh:
```
npm install <package>
```

Ví dụ để cài đặt bootstrap cho ứng dụng ta chỉ cần chạy:
```
npm install bootstrap
```
NPM lưu trữ các gói đã tải xuống trong thư mục ./node_modules và giữ một danh sách các gói này trong file ./package.json.
Tại thời điểm này, mình sẽ không nêu bất kỳ liên kết nào giữa NPM và Rails, hãy tiếp tục đọc để hiểu lý do tại sao.
### Yarn
Yarn là một trình quản lý gói mới hơn cho Javascript. Nó tìm nạp các gói từ kho NPM nhưng còn nhiều hơn thế. Nó cho phép bạn khóa các phiên bản mong muốn của các gói NPM của bạn trong một file tự động được tạo ra `yarn.lock` (tương tự `Gemfile.lock`), và nó nhanh hơn nhiều so với NPM, v.v.

Trong một ứng dụng Rails 6, khi bạn cần thêm một thư viện javascript, bạn:
* Trước kia sẽ tiến hành thêm gem mà cung cấp thư viện đó, sau đó bạn cần required trong `app/assets/application.js`(được biên soạn bởi Sprockets).
* Còn bây giờ bạn chỉ cần thêm thư viện đó thông qua yarn `yarn add <package>`. Sau đó thì required nó(chúng ta sẽ thấy sau).
### ES6
ES6 là một` tiêu chuẩn Javascript` mới (một phiên bản `Javascript` mới nếu bạn muốn). Nó đi kèm với các tính năng siêu tiện dụng mới như định nghĩa lớp, destructuring, arrow functions, v.v. Hiện nay ES6 đang dần được ưa chuộng và sử dụng rộng rãi trong các dự án.
### Babel
Do tất cả các trình duyệt Web không hiểu ES6, nên bạn cần một công cụ đọc mã `Javascript ES6` của bạn và dịch nó sang `Javascript ES5 `cũ để nó hoạt động trên tất cả các trình duyệt. `Babel` là trình biên dịch thực hiện bản dịch này.
### Webpack
Có `Babel`, `Yarn` và các tệp cấu hình của chúng và ta cần phải tự động hóa việc biên dịch tài nguyên của bạn và quản lý môi trường, v.v.

Vì bạn muốn tập trung vào viết mã và tự động biên dịch trước tài sản, bạn sẽ sử dụng Webpack, đóng vai trò là người quản trị băng thông. Nó lấy tài sản của bạn và chuyển từng người trong số họ đến các plugin phù hợp. Các plugin sau đó tạo công cụ phù hợp xử lý tệp đầu vào và đưa ra đầu ra dự kiến.

Chẳng hạn, webpack có thể:
* Lấy mã Javascript ES6 của bạn,
* Sử dụng plugin babel-loader để biến Babel biên dịch ES6 thành mã Javascript ES5,
* Sau đó xuất gói kết quả trong một tệp mà bạn có thể đưa vào DOM của mình (<script type = "text / javascript" src = "path-to-es5-javascript-pack.js"> </ script>).
### Webpacker
Webpacker là một gem đã gồm Webpack trong ứng dụng Rails của bạn. Nó đi kèm với một số tệp cấu hình ban đầu (và đủ để bắt đầu) để bạn có thể bắt đầu bằng cách viết mã thực tế mà không phải lo lắng về cấu hình.

Cấu hình mặc định của Webpacker nói như sau:
* `app/javascript/packs/` sẽ chứa các gói javascript của bạn (chẳng hạn: application.js)
* Bạn có thể cung cấp các gói javascript ở trên view sử dụng `javascript_pack_tag '<pack_name>'` (chẳng hạn: <%= javascript_pack_tag 'my_app' %> sẽ bao gồm `app/javascript/packs/my_app.js`).

Mình sẽ đưa ra một ví dụ rất rõ ràng về cách tất cả những thứ này hoạt động ở cuối bài viết này, mình chỉ cần nói một chút về Sprockets trước.

Lưu ý rằng khi bạn chạy: `rails assets:precompile`, bạn có thể thấy rằng rails sẽ chỉ biên dịch trước những gì trong `app/assets/`. Rails thực sự sẽ biên dịch trước cả **Webpack app/javascript/ assets** và **Sprockets app/assets/ assets**.
### Sprockets 4
Giống như **Webpack**, **Sprockets** là một asset pipeline, có nghĩa là nó lấy các tệp tài sản làm đầu vào (Javascript, CSS, hình ảnh, v.v.) và xử lý chúng để tạo đầu ra theo định dạng mong muốn.

Kể từ Rails 6, **Webpack**(er) thay thế **Sprockets** làm tiêu chuẩn mới để viết Javascript trong các ứng dụng Rails của bạn. Tuy nhiên, Sprockets vẫn là cách mặc định để thêm CSS vào ứng dụng của bạn.

Với Sprockets, bạn:
* Được sử dụng để liệt kê các assets có sẵn trong **config.assets.precompile** (Sprockets 3, Rails 5).
* Còn bây giờ phải làm điều đó trong tệp **app/assets/config/manifest.js** (Sprockets 4, Rails 6).

Nếu bạn muốn thêm một asset từ Sprockets pipeline, bạn sẽ:
* Viết CSS của bạn (chẳng hạn: `app/assets/stylesheets/my_makeup.css`).
* Đảm bảo `app/assets/config/manifest.js` được tạo có sẵn cho `stylesheet_link_tag` thông qua `link_tree`, `link_directory` hay `link my_makeup.css`.
* Thêm chúng vào view sử dụng `stylesheet_link_tag (<%= stylesheet_link_tag 'my_makeup' %>)`.
### Đừng cố sử dụng Webpack như bạn sẽ sử dụng Sprockets!
Webpack khác với Sprockets theo nghĩa là nó biên dịch các mô-đun.

Các mô-đun ES6 phải chính xác (trong trường hợp Rails 6 với cấu hình mặc định). Điều đó có nghĩa là gì? Vâng, nó ngụ ý rằng tất cả mọi thứ bạn khai báo trong một mô-đun là loại được đặt tên bởi vì nó không có nghĩa là có thể truy cập từ phạm vi toàn cầu mà cần phải được import sau đó được sử dụng. Tôi sẽ cho bạn một ví dụ:

Bạn có thể làm như sau với Sprockets:
Trong `app/assets/javascripts/hello.js`:
```
function hello(name) {
  console.log("Hello " + name + "!");
}
```

Trong `app/assets/javascripts/user_greeting.js`:
```
function greet_user(last_name, first_name) {
  hello(last_name + " " + first_name);
}
```
Trong `app/views/my_controller/index.html.erb`:
```
<%= javascript_link_tag 'hello' %>
<%= javascript_link_tag 'user_greeting' %>
<button onclick="greet_user('Dire', 'Straits')">Hey!</button>
```
Khá đơn giản và dễ hiểu, vậy với Webpacker thì sao:

Nếu bạn nghĩ rằng bạn chỉ đơn giản là di chuyển các tệp JS này trong `app/javascript/packs`, include chúng bằng `javascript_pack_tag` và được thực hiện, hãy để tôi dừng bạn tại đó ngay vì nó sẽ không hoạt động.

Tại sao ư? Bởi vì` hello()` sẽ được biên dịch như là trong một mô-đun ES6 (tương tự như vậy đối với `user_greet()`), điều đó có nghĩa là theo như hàm `user_greet ()`, ngay cả khi cả hai tệp JS đều được đưa vào view, hàm `hello()` sẽ không tồn tại.

Vậy làm thế nào bạn có được kết quả tương tự với **Webpack**.

Trong `app/javascript/packs/hello.js`:
```
export function hello(name) {
  console.log("Hello " + name + "!");
}
```

Trong `app/javascript/packs/user_greeting.js`:
```
import { hello } from './hello';
function greet_user(last_name, first_name) {
  hello(last_name + " " + first_name);
}
```
Sau đó trong view `app/views/my_controller/index.html.erb`:
```
<%= javascript_pack_tag 'user_greeting' %>
<button onclick="greet_user('Dire', 'Straits')">Hey!</button>
```

Liệu điều đó có hiệu quả? Không. Tại sao? Một lần nữa, vì lý do tương tự: không thể truy cập `hello_user()` từ view vì nó bị ẩn bên trong mô-đun một khi nó được biên dịch.

Cuối cùng chúng ta cũng đạt đến điểm quan trọng nhất của phần này:
* Với **Sprockets**: các view có thể tương tác với những gì tệp JS của bạn phơi bày (sử dụng biến, gọi hàm, ..)
* Với **Webpack**: các view KHÔNG có quyền truy cập vào những gì mà gói JS của bạn chứa.

Vì vậy, làm thế nào bạn sẽ làm cho một button kích hoạt một hành động trong JS? Từ một gói, bạn thêm một hành vi cho một phần tử HTML. Bạn có thể làm điều đó bằng cách sử dụng vanilla JS, JQuery, StimulusJS, bạn đặt tên cho nó.

Dưới đây, một ví dụ sử dụng JQuery:
```
import $ from 'jquery';
import { hello } from './hello';
function greet_user(last_name, first_name) {
  hello(last_name + " " + first_name);
}
$(document).ready(function() {
  $('button#greet-user-button').on(
    'click',
    function() {
      greet_user('Dire', 'Strait');
    }
  );
});
/* Or the ES6 version for this: */
$(() =>
  $('button#greet-user-button').on('click', () => greet_user('Dire', 'Strait'))
);
```

Và ở view `app/views/my_controller/index.html.erb:`
```
<%= javascript_pack_tag 'user_greeting' %>
<button id="greet-user-button">Hey!</button>
```

**Nguyên tắc chung**: với Webpack, bạn thiết lập hành động mong muốn trong các gói, không phải trong view.

### Bạn vẫn có thể sử dụng Sprockets cho mã Javascript
Tài liệu về Webpacker nói rõ như sau: 

`[…] the primary purpose for webpack is app-like JavaScript, not images, CSS, or even JavaScript Sprinkles (that all continues to live in app/assets)`

Điều đó có nghĩa là nếu bạn cần hoặc muốn cung cấp một số nội dung Javascript cho view, bạn vẫn có thể sử dụng Sprockets bằng cách:
* Tạo thư mục `app/assets/javascripts` (chú ý rằng javascripts ở đây ở dạng số nhiều).
* Cập nhật file `app/assets/config/manifest.js` bằng `//= link_directory ../javascripts .js`.
* Thêm các tệp Sprockets Javascript của bạn trong view của bạn bằng cách sử dụng `javascript_include_tag`.
* Và sau đó là làm những việc của bạn.

Cá nhân mình cố gắng tránh điều này càng nhiều càng tốt, nhưng nó đáng để bạn biết thêm.
### Cách thêm bootstrap 4 và fontawesome 5 vào ứng dụng Rails 6 của bạn
Để giúp bạn hiểu rõ hơn, tôi khuyên bạn nên áp dụng khi bạn đọc. Nó sẽ giúp rất nhiều trong việc nắm bắt những điều mới lạ này.

**1. Tạo mới một ứng dụng Rails 6**
```
rails new bloggy
```
Tôi muốn bạn hãy xem các tập tin sau đây. Mục tiêu không phải là để bạn hiểu mọi thứ, chỉ cần biết nó tồn tại và có một hình ảnh tinh thần mơ hồ về những gì họ chứa để bạn có thể dễ dàng quay lại với nó sau này nếu cần.

**Yarn**: `package.json`

**Webpacker**:

    * config/webpacker.yml
    
    *  app/javascript/packs/application.js
    
    * app/views/layouts/application.html.erb
**Sprockets**:

    * app/assets/config/manifest.json
    
    
**2. Thêm trang root**

 `rails generate controller welcome index`
 
 Và thêm `root to: 'welcome#index'` vào `config/routes.rb`
 
 Sau đó chạy ứng dụng của bạn để đảm bảo mọi thứ đều tốt.
 
**3. Thêm required yarn packages**

 Chúng ta sẽ thêm bootstrap 4 ( yêu cầu jquery và popper.js) và font-awesome 5.
 
 `yarn add bootstrap jquery popper.js @fortawesome/fontawesome-free`
 
 Bây giờ Yarn đã được cached trong `./bloggy/node_modules/` và cập nhật file `package.json`. Tuy nhiên các gói này vẫn không được sử dụng trong ứng dụng. Hãy sửa nó đi. Chúng ta sẽ bắt đầu bằng cách bao gồm phần JS trước và sẽ quan tâm phần CSS sau.
 
 **4. Include phần JS của Bootstrap và fontawesome**
 
 Trong layout của bạn, đã có thẻ `javascript_pack_tag 'application'`, có nghĩa là bạn đang yêu cầu Webpack biên dịch `app/javascript/packs/application.js` và include đầu ra trong layout này. Để thêm bootstrap, chúng ta có thể tạo một gói khác dành riêng cho việc include `bootstrap` hoặc chúng ta có thể sử dụng gói `application.js`. Chúng ta hãy làm sau vì chúng ta không xây dựng một ứng dụng thực sự.
 
 Hãy thêm vào `app/javascript/packs/application.js`:
 ```
 require("bootstrap");
require("@fortawesome/fontawesome-free");
```

Chú ý rằng tôi đã required `bootstrap` chứ không phải `bootstrap/dist/js/bootstrap.min`. Điều này là do trừ khi tôi chỉ định một đường dẫn tập tin, mô-đun gói `package.json` (bloggy/node_modules/bootstrap/package.json) sẽ cung cấp thông tin cần thiết về các gói được thêm. Tôi có thể đã required `"bootstrap/dist/js/bootstrap.min"` và nó sẽ hoạt động tốt.

Quay lại để thiết lập bootstrap và fontawesome  trong ứng dụng của chúng ta. Nếu bạn khởi động máy chủ Rails và nhìn vào bảng điều khiển Javascript, bạn sẽ thấy nó hoạt động chính xác mặc dù chúng ta không require `jQuery` trong `application.js`.

Nếu trước đây bạn đã xem các hướng dẫn khác giải thích cách đưa bootstrap thông qua Webpacker, có lẽ bạn nhận thấy rằng hầu hết chúng đều yêu cầu jQuery trước sau đó yêu cầu bootstrap. Điều này thực sự vô dụng.

Tại sao? Bởi vì chúng tôi đã cài đặt jQuery thông qua Yarn, bootstrap có thể tự yêu cầu jQuery. Không có điểm nào để chúng ta yêu cầu nó trong `application.js` vì nó sẽ làm cho nó có sẵn trong application.js, không phải trong mô-đun bootstrap. Vì vậy, trừ khi bạn thực sự cần sử dụng jQuery trực tiếp trong application.js, ở đó, không cần phải require nó ở đó.

**5. Include phần S(CSS) của bootstrap và fontawesome**

Tôi thích làm việc với SCSS, vì vậy trước khi include `bootstrap` và` font-awesome`, hãy để đổi tên `application.css` thành `application.scss` và xóa nó khỏi tất cả các comments luận và các hướng dẫn Sprockets khác.

Bây giờ ta có file `application.scss` như sau:
```
$fa-font-path: '@fortawesome/fontawesome-free/webfonts';
@import '@fortawesome/fontawesome-free/scss/fontawesome';
@import '@fortawesome/fontawesome-free/scss/regular';
@import '@fortawesome/fontawesome-free/scss/solid';
@import '@fortawesome/fontawesome-free/scss/brands';

@import 'bootstrap/scss/bootstrap';
```

Như vậy bạn đã thiết lập xong tất cả.

Hãy để thêm một `Button` và một íon trong view của chúng ta để đảm bảo mọi thứ hoạt động chính xác:

Thêm `<a href="#" class="btn btn-primary">Yeah <i class="far fa-thumbs-up"></i></a>` vào file  `app/views/welcome/index.html.erb` và chạy ứng dụng. Ta sẽ thấy kết quả ngay thôi.
### Làm cho jQuery khả dụng trong tất cả các gói
Nếu bạn cần sử dụng jQuery (hoặc bất kỳ phụ thuộc nào) trong hầu hết các gói của mình, yêu cầu nó trong mỗi gói là cồng kềnh. Một giải pháp mà tôi thích là làm cho nó có sẵn cho tất cả các gói thông qua cấu hình (một lần nữa, nó sẽ không có sẵn trong các view, chỉ trong các gói).

Để đạt được điều này, hãy sửa file `config/webpack/environment.js`:
```
const { environment } = require('@rails/webpacker')
var webpack = require('webpack');
environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
  })
)
module.exports = environment
```

Đoạn mã này làm cho Webpack sẽ cung cấp mô-đun jQuery cho tất cả các gói thông qua tên $. Nó tương đương với việc thêm các mục sau vào đầu mỗi gói:
```
import $ from 'jquery';
```

### Tài liệu tham khảo
https://github.com/rails/webpacker
https://blog.capsens.eu/how-to-write-javascript-in-rails-6-webpacker-yarn-and-sprockets-cdf990387463