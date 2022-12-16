Bạn cảm thấy lạc lõng với tất cả những thay đổi liên quan đến assets và Javascript? Npm, Babel, ES6, Yarn, Webpack, Webpacker, Sprockets, tất cả đều là những khái niệm hoàn toàn xa lạ với bạn?
<br>

Nếu bạn cần một bài viết ngắn gọn, dễ hiểu về cách toàn bộ hệ sinh thái Javascript này hoạt động trong một ứng dụng Rails 6, thì bài viết này chính là thứ bạn đang tìm kiếm.

---

# NPM

[NPM](https://docs.npmjs.com/) là một trình quản lý các package Javascript (chính xác là các module NodeJS). Tương tự như Ruby có RubyGems
 thì Javascript có NPM.
 <br>
 
 `npm install <package>`
 <br>
 
 Ví dụ nếu bạn muốn cài bootstrap:
 <br>
 
 `npm install bootstrap`
 <br>
 
 NPM sẽ lưu các package đã tải vào `./node_modules` và tạo ra một list các package ở `./package.json`.
 <br>
 
 # Yarn
 
 [Yarn](https://classic.yarnpkg.com/en/) là một trình quản lý package Javascript mới hơn. Nó lấy các package từ repository của NPM và còn hơn thế nữa. Nó cho phép bạn lock định phiên bản NPM package mà bạn mong muốn trong file `yarn.lock` được tự động tạo ra (tương tự như `Gemfile.lock`), nó nhanh hơn nhiều so với NPM, v.v...
 <br>
 
 Trong một ứng dụng Rails, khi cần một thư viện Javascript:
 - trước đây: bạn cần add một gem của thư viện đó và require nó trong `app/assets/application.js` (và được compile bởi Sprockets)
 - giờ đây: bạn phải add chúng qua Yarn (https://yarnpkg.com): `yarn add <package>`, rồi require nó (chúng ta sẽ xem chúng được require như thế nào sau).

> *Note: NPM sau này cũng đã thêm tính năng lock bằng file `package-lock.json`*

# ES6

[ES6](http://es6-features.org/#Constants) là một tiêu chuẩn Javascript. Nó đem đến rất nhiều tính năng siêu tiện dụng như là định nghĩa class, destructuring, arrow functions, etc.

# Babel

Vì không phải mọi trình duyệt Web đều đã có thể hiểu được ES6, bạn sẽ cần một công cụ có thể đọc các đoạn mã Javascript ES6 của mình và dịch nó thành Javascript ES5 cũ để chúng có thể hoạt động được trên mọi trình duyệt. [Babel](https://babeljs.io/) chính là compiler có thể thực hiện được việc biên dịch này.

# Webpack

Đã có Babel, đã có Yarn và các file config của chúng thì sẽ xuất hiện nhu cầu tự động hóa việc biên dịch assets và quản lý môi trường, v.v...
<br>

Nếu bạn muốn tập trung vào việc viết code và tự động hóa quá trình biên dịch trước asset, bạn có thể sử dụng [Webpack](https://webpack.js.org/) với vai trò quản lý tổng thể. Nó sẽ lấy các asset của bạn và chuyển từng asset đến các plugin phù hợp để xử lý chúng thành các output bạn mong muốn.
<br>

Ví dụ, Webpack có thể:
- nhận các đoạn code Javascript ES6,
- sử dụng plugin `babel-loader` để khiến Babel compile mã Javascript từ ES6 thành ES5,
- xuất ra kết quả ra thành các pack trong một file mà bạn có thể include vào HTML DOM (`<script type="text/javascript" src="path-to-es5-javascript-pack.js"></script>`).

# Webpacker

[Webpacker](https://github.com/rails/webpacker) là một gem giúp bạn dễ dàng include Webpack vào trong ứng dụng Rails của mình. Nó đi kèm với một số file config ban đầu, đủ để bạn có thể bắt đầu viết code mà không phải bận tâm tới chuyện config.
<br>

Cáu hình mặc định của Webpacker sẽ cho bạn những thứ sau:
- `app/javascript/packs/` sẽ chứa các pack Javascript của bạn (ví dụ như `application.js`)
- Bạn có thể include một Javascript pack vào trong view như sau: `javascript_pack_tag '<pack_name>'` (Ví dụ: `<%= javascript_pack_tag 'my_app' %>` sẽ include `app/javascript/packs/my_app.js`)

> khi bạn chạy lệnh `rails assets:precompile`, có thể bạn nghĩ rằng Rails sẽ chỉ precompile nhưng thứ trong `app/assets/`. Nhưng thực ra Rails sẽ precompile cả Webpack asset ở thư mục `app/javascript` nữa.

# Sprockets 4

Giống như Webpack, Sprockets cũng là một asset pipeline, có nghĩa là nó sẽ nhận các asset làm input (Javascript, CSS, images, v.v.) và xử lý chúng rồi tạo ra các output với format mong muốn.
<br>

Kể từ Rails 6, Webpack thay thế [Sprockets](https://github.com/rails/sprockets) làm tiêu chuẩn mới để viết Javascript trong các ứng dụng Rails. Tuy nhiên, Sprockets vẫn là cách mặc định để thêm CSS vào ứng dụng của bạn.
<br>

Với Sprockets:
- trước đây bạn phải liệt kê các asset đang có trong `config.asets.precompile` (Sprockets 3, Rails 5)
- giờ thì bạn liệt kê chúng trong một file manifest `app/assets/config/manifest.js` (Sprockets 4, Rails 6)

Nếu như bạn muốn include một asset nào đó từ Sprockets pipeline, bạn cần:
- Viết file asset (ví dụ: `app/assets/stylesheets/my_makeup.css`)
- Đảm bảo rằng `app/assets/config/manifest.js` sẽ khiến cho file bạn viết ra có thể sử dụng được với `stylesheet_link_tag` thông qua `link_tree`, `link_directory` hoặc một lệnh `link` (ví dụ: `link my_makeup.css`)
- Include nó vào view bằng `stylesheet_link_tag` (`<%= stylesheet_link_tag 'my_makeup' %>`)

# Đừng cố dùng Webpack theo cách mà bạn dùng Sprockets!

Bạn cần phải hiểu những điều sau nếu bạn không muốn lãng phí vô số giờ ngụp lội trong code, google. Lý tưởng nhất là bạn nên dành một chút thời gian học ES6 nếu không thì ít nhất bạn có thể nhớ điều này:
<br>

**Webpack khác với Sprockets ở chỗ nó compile các [module](https://exploringjs.com/es6/ch_modules.html).**
<br>

Chính xác thì là các module ES6 (nếu như bạn dùng cấu hình mặc định của Rails 6). Điều này có ý nghĩa gì? Nó có ý nghĩa rằng mọi thứ bạn khai báo trong một module có thể coi là namespace bởi vì chúng viết ra không để truy cập từ phạm vi global mà cần được import sau đó sử dụng. Mình sẽ cho bạn một ví dụ.
<br>

Bạn có thể làm như sau với Sprockets:

```javascript:app/assets/javascripts/hello.js
function hello(name) {
  console.log("Hello " + name + "!");
}
```
<br>

```javascript:app/assets/javascripts/user_greeting.js
function greet_user(last_name, first_name) {
  hello(last_name + " " + first_name);
}
```
<br>

```html:app/views/my_controller/index.html.erb
<%= javascript_link_tag 'hello' %>
<%= javascript_link_tag 'user_greeting' %>

<button onclick="greet_user('Dire', 'Straits')">Hey!</button>
```

Khá đơn giản để hiểu. Vậy giờ với Webpacker thì làm thế nào?
<br>

Nếu bạn nghĩ rằng bạn chỉ cần di chuyển các tệp Js này tới `app/javascript/packs` rồi include chúng bằng cách sử dụng `javascript_pack_tag` là xong thì bạn đã nhầm.
<br>

Tại sao? Bởi vì `hello()` sẽ được compile do nó nằm trong một module ES6 (tương tự với `user_greeting()`), có nghĩa là cho đến khi hàm `user_greeting()` hoạt động, dù cả hai tệp Js được include trong view, hàm `hello()` vẫn không tồn tại.
<br>

Vậy làm thế nào để bạn có thể nhận được kết quả tương tự như khi dùng Sprockets:

```javascript:app/javascript/packs/hello.js
function hello(name) {
  console.log("Hello " + name + "!");
}
```
<br>

```javascript:app/javascript/packs/user_greeting.js
import { hello } from './hello';

function greet_user(last_name, first_name) {
  hello(last_name + " " + first_name);
}
```
<br>

```html:app/views/my_controller/index.html.erb
<%= javascript_pack_tag 'user_greeting' %>

<button onclick="greet_user('Dire', 'Straits')">Hey!</button>
```

Một lần nữa code không hoạt động vì lý do tương tự: `welcome_user` không thể truy cập từ view vì nó bị *ẩn* bên trong một module sau khi nó được compile.
<br>

Cuối cùng chúng ta cũng tới được ý quan trọng nhất của phần này:
- Với Sprockets: view có thể tương tác với những gì mà tệp JS của bạn expose ra (sử dụng một biến, gọi một hàm, ..)
- Với Webpack: view KHÔNG có quyền truy cập vào những gì mà các pack JS của bạn có.

Vậy, làm thế nào bạn có thể làm cho một nút kích hoạt một hàm JS? Từ pack, bạn thêm một hành vi vào một phần tử HTML (bằng cách sử dụng vanilla JS, JQuery, StimulusJS, v.v).
<br>

Dưới đây là một ví dụ sử dụng JQuery:
```javascript
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

**Quy tắc chung: với Webpack, bạn thiết lập hành vi mong muốn trong các pack chứ không phải trong view.**
<br>

Hãy để mình nhắc lại với một ví dụ cuối cùng:
<br>

Nếu bạn cần sử dụng một thư viện (ví dụ: select2 hoặc jQuery), thì việc import nó vào trong một pack và sử dụng nó trong một view có khiến nó hoạt động không? Không. Một là bạn import nó trong một  pack và sử dụng nó trong pack đó, hai là.. bạn hãy đọc phần tiếp theo của bài viết này.
<br>

> *Đối với những người muốn hiểu rõ về việc “mọi thứ đều ẩn/namespaced”: khi một mô-đun ES6 được biên dịch thành mã ES5, nội dung của mô-đun được đóng gói bên trong một hàm ẩn danh để bên ngoài hàm này, bạn không thể truy cập bất kỳ biến/hàm nào. được khai báo trong mô-đun.*

# Bạn vẫn có thể sử dụng Sprockets cho Javascript

Tài liệu của Webpacker nêu rõ những điều sau:
<br>

> *[…] Mục đích chính của webpack là app-like JavaScript, không phải image, CSS hay là JavaScript Sprinkles (tất cả đều tiếp tục tồn tại trong app/assets).*

<br>
Có nghĩa là nếu bạn cần hoặc muốn một số Javascript asset có thể dùng cho view, bạn vẫn có thể sử dụng Sprockets.

- Tạo thư mục `app/asset/javascripts` (lưu ý javascripts ở đây ở dạng số nhiều)
- Cập nhật `app/assets/config/manifest.js` cho phù hợp (`//= link_directory ../javascripts .js`)
- Đưa các tệp Javascript của Sprockets vào view của bạn bằng cách sử dụng `javascript_include_tag` (lưu ý sự khác biệt: `javascript_include_tag` cho Sprockets, `javascript_pack_tag` cho Webpacker)

Cá nhân mình cố gắng tránh làm như thế này càng nhiều càng tốt, nhưng biết thêm cũng tốt.
<br>

> *Lưu ý: bạn có thể thắc mắc tại sao có cả tệp `manifest.js` và mảng `config.assets.precompile` cho cùng một mục đích là hiển thị các file cần compile. Mục đích là để tương thích ngược. Tuy nhiên [hướng dẫn upgrade](https://github.com/rails/sprockets/blob/master/UPGRADING.md) không khuyến khích bạn sử  dụng`config.assets.precompile`.*

# Dùng jQuery trong tất cả các pack

Nếu bạn cần sử dụng jQuery (hoặc bất kỳ dependency) trong hầu hết các pack của mình, thì việc require nó trong mỗi pack là rất phức tạp. Một giải pháp mà mình thích là cung cấp nó cho tất cả các pack thông qua cấu hình (mình nhắc lại một lần nữa, nó sẽ không dùng được trong các view, chỉ trong các pack).
<br>

Để thực hiện được điều này, hãy copy/paste đoạn code sau vào `config/webpack/environment.js`:
```javascript
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

Đoạn snippet này khiến cho Webpack “cung cấp” mô-đun jQuery cho tất cả các pack thông qua `$`. Nó tương đương với việc thêm dòng sau vào đầu mỗi pack:

```javascript
import $ from 'jquery';
```