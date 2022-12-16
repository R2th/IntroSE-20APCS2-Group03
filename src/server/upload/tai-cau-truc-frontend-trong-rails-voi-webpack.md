## I. Lời nói đầu

Xin chào các bác (bow).

Dù là backend developer, nhưng chắc chắc rằng bạn phải rờ mó tới front-end phải không.

Công cụ "kinh điển" mà Rails làm việc với front-end là sử dụng `Asset Pipeline`, `Sprockets`, `CoffeeScript` và `Sass`.

Nhưng bạn hãy thử nhìn sang cộng đồng frontend - những thứ đã xảy ra trong nửa thập kỷ vừa qua mà xem: 
- Sự thống trị của Javascript package manager - `npm` 
-  **ES6** ra đời.
-  Hay tốc độ phát triển vãi lúa của `PostCSS`.
-  ...

Đó là còn chưa nhắc tới những framework frontend cực thành công như **React** và **Vue**, đã thay đổi hoàn toàn về mặt tư duy coding:
> Cấu trúc code thành các **"components"** thay vì **"pages"**. :hushed:

Như vậy, việc tiếp tục sử dụng cái "kinh điển" kia, đồng nghĩa với việc bỏ bạn đã bỏ qua những cái mới mẻ, hay ho mà cộng đồng đã dày công phát triển nên.

![](https://images.viblo.asia/3a014659-4941-453b-8a43-84ff9c8d990c.gif)

Bạn có cảm thấy khó chịu không, khi không sử dụng được các công nghệ mới?

Dưới đây mình xin giới thiệu một phương pháp hiện đại mà Rails làm việc với front-end, đang được recommend trong các phiên bản Rails mới ra mắt - **Webpack**.

Nguồn của bài viết này, mình nhận được từ chia sẻ của [Tuấn bổng](https://viblo.asia/u/tran.van.tuan), cảm ơn thằng em :triumph:.
## II. Classic Rails

### 1. Asset Pipeline có nhược điểm gì?

Đầu tiên phải nói rõ rằng, sử dụng **Asset Pipeline** thì app của chúng ta vẫn hoạt động ngon nghẻ như bình thường. 

Bạn vẫn có thể dựa trên những setup mặc định của Rails để xây dựng front-end: *views template*, *scripts*, và *styles* được xử lý bởi **Asset Pipeline**.

Tuy nhiên, đối với developers chúng ta còn cần phải quan tâm thêm đến những vấn đề:
- Code cần có tính cô lập (**Isolated**), có khả năng tái sử dụng (**reusable**), dễ test (**testable**).
- Dễ bảo trì, maintain.
- Quản lý các package, thư viện dễ dàng.

Tất nhiên, "classic" Rails đã phân tách folder thành các phần riêng biệt như phần cho views, JS, CSS, Images rồi. 

Nhưng nếu front-end ngày càng nhiều và phức tạp, thì khả năng cao sẽ biến đống code của chúng ta thành một mớ hổ lốn, cực khó để debug và maintain.

Một nguyên nhân nữa để ta cân nhắc việc thay đổi đó chính là **tốc độ**.

Vấn đề này đã được đề cập nhiều và thậm chí Heroku còn có bài [hướng dẫn](https://blog.heroku.com/speeding-up-sprockets) để optimize lại Asset Pipeline. 

Nếu các bạn từng deploy phần code có thay đổi JS, CSS thì chắc hẳn đã nhận ra điều này.

Asset Pipeline là phần có tốc độ deploy chậm nhất trong cả quá trình Deploy rails app:

> Trung bình, nó chậm hơn khoảng 20 lần so với việc cài đặt các dependencies thông qua *bundle install*.

#### Về các dependencies thì sao?

Để **Asset Pipeline** quản lý các thư viện CSS, JS thì khá lằng nhằng.

Nếu muốn add thêm thư viện JS hoặc update nó, thì bạn phải paste url CDN trong các file `app/assets`, `lib/assets`, `vendor/assets` hoặc chờ ai đó viết ra 1 gem wrap nó mà dùng. 

Trong khi đó, cộng đồng JavaScripts hiện nay chỉ cần sử dụng 1 lệnh đơn giản: 
`npm install` hoặc `yarn add` là xong.

Điều cuối cùng, **Sprockets** - build tool của **Asset Pipeline**, có vẻ như đang bị các **Contributors** bỏ rơi, không thấy phát triển và maintain thêm nữa:
![](https://images.viblo.asia/78a69e74-e347-4587-83d1-c96e34173aa1.jpg)


### 2. Giải pháp thay thế

Trong năm 2017, DHH và cộng đồng Rails đã mang tới cho chúng ta phiên bản Rails 5.1, cùng với sự tích hợp của:
- Webpack từ gem `webpacker`
- `node_modules` thông qua `Yarn`
- Support cho `Babel`, `React`, `Vue` và `PostCSS`.

Tuy nhiên Asset Pipeline, Coffeescript vẫn được sử dụng làm mặc định lúc bạn khởi tạo một project mới bằng `rails new`.

Nhưng đừng bận tâm tới điều đó, Rails app lúc này có thể áp dụng tất cả các phương pháp mới rồi.

#### PostCSS vs Sass
Luôn song hành với Rails là `Sass`. Nhưng bạn hãy thử dủng PostCss xem.

Trước tiên, việc xử lý CSS bằng Postcss trong Rails nhanh hơn [x36.4 lần](https://github.com/postcss/benchmark) so với Sass.

Nó được viết bằng 100% Javascript thuần.

Nó dễ dàng mở rộng và custom với hàng đống [plugins](https://www.postcss.parts/).

Đang được phát triển rất nhanh, nhiều người sử dụng -> cộng đồng phát triển [mạnh theo](https://twitter.com/codeinarocket/status/914851470599745536)

#### Thay đổi tư duy

React dạy chúng ta tư duy theo kiểu [components](https://reactjs.org/docs/thinking-in-react.html). 

Các framework front-end hiện đại bây giờ cũng hướng tới điều đó.

Triết lý đằng sau nó nói một cách đơn giản là: "UI cần phải khép kín".

Rails không như vậy, nó break views thành một partial riêng và nếu views đó có Javascripts, thì JS lại nằm ở 1 folder khác rất xa xôi là `app/assets/javascripts`.

Bài demo dưới đây sẽ không sử dụng kiến trúc của React hay Vue để làm. Nhưng nó sẽ sử dụng các tool và kiến trúc mới để dần dần hình thành mindset cho frontend của ta sau này.

## III. Demo
### 1. Công việc phải làm

Để minh họa, ta sẽ xây dựng một chat application đơn giản có `Auth` và `ActionCable`.

App này sẽ gửi lời chào tạm biệt tới **Assets Pipeline**, **Scss** và **Coffee**. 

Ta vẫn sử dụng `ERB` làm engine cho phần views, nhưng bạn hoàn toàn có thể thay thế nó bằng `Slim` hoặc `Haml`.

Cấu trúc folder cho phần views cũng thay đổi lại. Tất cả những phần liên quan đến frontend đều sẽ được nhét chung vào 1 folder `frontend`, xóa bỏ đi cấu trúc `app/assets` cũ.

Trước khi đi vào đoạn code thật, ta sẽ tạo mới rails app, cài đặt và config các tool hịn để phục vụ quá trình dev thái tài hơn.

### 2. Cài đặt và config

Như đã nói ở trên, nếu ta tạo ra rails app bằng câu lệnh kinh điển `rails new` thì chả có gì khác với cấu trúc cũ cả, nên ta cần sửa lại:

```
rails new evil_chat --skip-coffee --skip-sprockets --skip-turbolinks --webpack --database=postgresql  -T
```

Các option này bỏ qua những thứ ta không cần tới như **CoffeeScript** hay **Sprocket**.

Ta sẽ sử dụng **PostgreSQL** để lát nữa deploy lên Heroku ez hơn.

Option quan trọng nhất ở đây là `--webpack`. Nó báo với Rails rằng ta sẽ sử dụng gem `webpacker` để bundle toàn bộ các assets bằng Webpack. 

Cùng với đó, project sẽ bao gồm thêm các tools như:
- `node_modules` folders này sẽ chứa toàn bộ các JS dependencies.
- `package.json` là nơi khai báo các dependencies mà sẽ sử dụng.
- `.babelrc` file config việc chuyển đổi từ ES6 sang Javascript code cho bất cứ browser nào có hơn 1% [thị phần](http://browserl.ist/?q=%3E+1%25) hiện nay.
- `.postcssrc.yml` file config để ta có thể sử dụng postcss, cssnext.

Ở đây hơi thiếu 1 tý,  đó là config cho `browserslist` - tool này tương tự như [Autoprefixer](https://github.com/postcss/autoprefixer) plugin cho PostCSS.

```
touch .browserslistrc
```

Bên trong chỉ cần thêm 1 dòng `> 1%` là xong.

Còn điều nữa ta nên xử lý ngay từ lúc này, đó là config lại cái Rails generators. 

Vì mặc định, nếu lệnh generate của ta có tự động sinh ra css, js, nó sẽ mặc định đặt trong folder `app/assets` - folder sau này ta sẽ không dùng nữa, nên hãy sửa file `application.rb`

```Ruby
# config/application.rb
config.generators do |g|
  g.test_framework  false
  g.stylesheets     false
  g.javascripts     false
  g.helper          false
  g.channel         assets: false
end
```

Viết di trúc đã xong, lúc này hãy gửi lời chào tới Asset Pipeline - thẳng tay cho folder `app/assets` lên bảng đếm số :smiling_imp:

Ta dùng cái gì để thay thế nó bây giờ:
- `--webpack` option lúc khởi tạo rails app sẽ tạo cho ta folder `app/javascript`. Chuyển nó tới folder *root*, và đổi tên thành `frontend` (hoặc tên khác cũng được). 
- File `application.js` bên trong `frontend/packs` vẫn giữ nguyên.

- Mở file `application.html.erb` và sửa từ:
```HTML
...
  <head>
    <title>EvilChat</title>
    <%= csrf_meta_tags %>

    <%= stylesheet_link_tag    'application', media: 'all' %>
    <%= javascript_include_tag 'application' %>
  </head>

  <body>
    <%= yield %>
  </body>
...
```

Chuyển thành
```
...
<head>
    <title>EvilChat</title>
    <%= csrf_meta_tags %>

    <%= stylesheet_pack_tag 'application'%>
  </head>

  <body>
    <%= yield %>

    <%= javascript_pack_tag 'application' %>
  </body>
...
```

Chỉ thay thế 1 từ thôi đã làm ý nghĩa hoàn toàn khác đi:

- Nếu `javascript_include_tag` làm nó hiểu Javascript sẽ được complied bới Sprockets, thì `javascript_pack_tag` đưa vào Webpack bundle tạo ra từ file **entry point** `frontend/packs/application.js`.

- Thay thế `stylesheet_link_tag, media: 'all'` thành `stylesheet_pack_tag` giúp ta sử dụng CSS theo kiểu components và `styles` được quản lý cùng bởi webpacker.

Giờ ta cần cho webpacker biết vị trí files để bundle. Với `webpacker 3.0`, config sẽ được đặt bên trong file `config/webpacker.yml`. 
Hãy sửa để nó trỏ tới đúng folder frontend mà ta đã thay đổi ở bước phía trên:

```Ruby
default: &default
  source_path: frontend
  source_entry_path: packs
  public_output_path: packs
  cache_path: tmp/cache/webpacker
```

Phần `Views` cũng sẽ được đặt bên trong `frontend` folder, nên với `controllers` như hiện tại, nó sẽ không biết đường nào mà lần. 

Hãy chỉ ra cho nó biết bằng cách sửa file `application_controller.rb`:
```Ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # That's all there is:
  prepend_view_path Rails.root.join("frontend")
end
```

### Smoke test
Đây là lúc thử test xem các config của mình hoạt động đúng chưa. 

Ta sẽ add vào trong file `frontend/packs/application.js` vài đoạn JS để đảm bảo rằng webpacker đã hoạt động.

Đầu tiên hãy generate một `controller` và `routes` đơn giản:
```
rails g controller pages home
```

```Ruby
# config/routes.rb
Rails.application.routes.draw do
  root to: "pages#home"
end
```

Mở file `application.js` remove đi toàn bộ nội dung bên trong, thay thế nó bằng:
```
// frontend/packs/application.js
import "./application.css";

document.body.insertAdjacentHTML("afterbegin", "Webpacker works!");
```

Cùng với đó, hãy tạo file `application.css` ở cùng folder, thêm CSS vào:

```CSS
/* frontend/packs/application.css */
html, body {
  background: lightyellow;
}
```
Đối với webpacker 3.0, chúng ta [không cần process riêng](http://weblog.rubyonrails.org/2017/8/30/webpacker-3-0/) để compile assets trên development. 

Nhưng nếu ta muốn page **tự động refresh** mỗi khi thay đổi JS/CSS code, ta vẫn cần chạy lệnh `bin/webpack-dev-server` song song với `rails s`.

Bây giờ hãy chạy server lần đầu. 

Bạn mở 2 tab terminal, 1 tab chạy `rails s`, 1 tab chạy `bin/webpack-dev-server` và mở browsers xem kết quả:

![](https://images.viblo.asia/96213459-a86c-4640-891f-46b69ee72d65.jpg)

Bạn sẽ thấy 1 điếu thú vị nho nhỏ ở đây. 

Nếu bạn thay đổi file `application.js` (giả dụ thay đổi đoạn "Webpacker works!") rồi save file lại, lập tức trang web trên browser sẽ thay đổi theo mà không cần ấn vào nút `refresh`.

### Coding tools

Có rất nhiều cách để viết Javascript và nó có thể gây bối rối khi ta mới join vào dự án.

Thay vì việc ngồi học thuộc hoặc tranh luận về cách viết nào đẹp trai hơn, ta có thể dùng code format có sẵn mà các ông lớn khác đang sử dụng như [Standard](https://standardjs.com/) hay [Prettier](https://prettier.io/). 
(Cái này kiểu tương tự như Rubocop bên backend)

Lần này mình sẽ thử chọn **Prettier**.

Ta thiết lập để hệ thống tự động check linting bằng [ESLint](https://eslint.org/). 

Đồng thời, ta cũng sẽ code dựa trên style guide từ [Airbnb](https://github.com/airbnb/javascript) để code đẹp và dễ bảo trì hơn.

Giờ sẽ add vài cái `devDependencies` trong file `package.json`.

```Json
{
  "name": "evil_chat",
  "private": true,
  "dependencies": {
    "@rails/webpacker": "3.4"
  },
  "devDependencies": {
    "webpack-dev-server": "2.11.2",
    "babel-eslint": "^8.0.1",
    "eslint": "^4.8.0",
    "eslint-config-airbnb-base": "^12.0.1",
    "eslint-config-prettier": "^2.6.0",
    "eslint-import-resolver-webpack": "^0.8.3",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-prettier": "^2.3.1",
    "lint-staged": "^4.2.3",
    "pre-commit": "^1.2.2",
    "prettier": "^1.7.3"
  }
}
```

Cuối cùng, ta sẽ tạo thêm file `.eslintrc` ở root folder để **ESLint** biết làm thế nào để apply cái rules code vào.

```
touch .eslintrc
```

Đưa đoạn code này vào bên trong:
```
{
  "extends": ["eslint-config-airbnb-base", "prettier"],

  "plugins": ["prettier"],

  "env": {
    "browser": true
  },

  "rules": {
    "prettier/prettier": "error"
  },

  "parser": "babel-eslint",

  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "modules": ["frontend", "node_modules"]
          }
        }
      }
    }
  }
}
```

Thứ tự sắp xếp trong mảng có key là `extends` khá quan trọng: Nó chỉ cho `ESLint` rằng, sẽ ưu tiên rules của **Airbnb** hơn.

Cùng với đó key `import/resolver`, để đảm bảo rằng bất cứ những gì `import` vào trong JS files bắt buộc phải tồn tại và handle bởi Webpack.

### CSS thì sao?

Với CSS, chúng ta sẽ sử dụng [normalize.css](https://github.com/necolas/normalize.css/) và [stylelint](https://stylelint.io/) để detect errors, convention trong các file stylesheets.

Ta tiếp tục add thêm vào trong file `package.json`:
```
"devDependencies": {
    ...
    "stylelint": "^8.1.1",
    "stylelint-config-standard": "^17.0.0"
  }
  ```

Và tất nhiên, ta phải tạo thêm file `.stylelintrc` ở root folder để "dạy" cái linter.
```
touch .stylelintrc
```

```Json
{
  "extends": "stylelint-config-standard"
}
```

Cùng với đó, add thêm `normalize.css` bên dưới key `dependencies` trong `package.json` (không phải `devDevdependencies`)

```
"dependencies": {
    "@rails/webpacker": "3.4",
    "normalize.css": "^7.0.0"
  },
  ...
```

Giờ để check các lint một cách tự động, ta sẽ sử dụng [git hook](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks). 

Ý tưởng ở đây là, mỗi lần gọi lệnh `git commit`, đoạn script bên trong `package.json` sẽ hoạt động và gọi các **checker** đi check hàng.

```
...
"scripts": {
    "lint-staged": "$(yarn bin)/lint-staged"
  },
  "lint-staged": {
    "config/webpack/**/*.js": [
      "prettier --write",
      "eslint",
      "git add"
    ],
    "frontend/**/*.js": [
      "prettier --write",
      "eslint",
      "git add"
    ],
    "frontend/**/*.css": [
      "prettier --write",
      "stylelint --fix",
      "git add"
    ]
  },
  "pre-commit": [
    "lint-staged"
  ],
  ...
```

Bây giờ, mỗi lần ta commit, tất cả các file trong mục chỉ định đều được kiểm tra lỗi, và sửa format.

Để cài đặt tất cả các `dependencies` mới khai báo, chỉ cần chạy lệnh `yarn` trong terminal là xong.


Giờ ta hay test thử cái linting này xem.

Bạn hãy mở file `frontend/packs/application.js`, bỏ đi dấu "**;**" ở cuối dòng, rồi commit sẽ thấy Terminal chạy task:
![](https://images.viblo.asia/5936b2d5-5b58-4712-b481-8c0e9aaa99a5.jpg)

Quay lại file `frontend/packs/application.js` dấu chấm phẩy được add trở lại (dance2).

Config xong hết rồi, giờ thì cấu trúc thư mục của ta trông sẽ như thế này:

![](https://images.viblo.asia/7a54a18b-df26-4603-8be0-c574b5433162.jpg)

### 3. Component  đầu tiên

Mãi mới xong cái đống config ở trên. Nhưng nó đáng và sẽ giúp giảm thời gian code sau này.

Đầu tiên, ta hãy xóa toàn bộ nội dung bên trong file `application.css` và `application.js` vì nó chỉ cho vào để smoke test thôi.

Từ bây giờ, `application.js` sẽ là **entry point** của ta - nơi chỉ import để tổng hợp lại.

Ta cần một nơi khác để giữ các **stylesheets** và **javascripts** GLOBAL, tạo ra thêm folder `init`.

```
mkdir frontend/init
touch frontend/init/index.js
touch frontend/init/index.css
```

Giờ ta đăng ký folder mới bên trong entry point `packs/application.js`:
```
// frontend/packs/application.js
import "init";
```

Trong file `init/index.js` thì import css:
```
// frontend/init/index.js
import "./index.css";
```

Và khai báo CSS tại `index.css`:
```CSS
/* frontend/init/index.css */
@import "normalize.css/normalize.css";

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
}
```

Tại đây, nó chứa các styles, js tổng quan cho cả hệ thống. 

Sau này, trong đây còn chứa các trang errors hoặc các function mà **không** trực thuộc cố định một components nào cả, có thể được load từ bất cứ đâu (đây là folder đặc biệt duy nhất).

#### Mỗi một component là folder với ba file bên trong: ERB, scripts và styles.

Tất cả các components được đặt bên trong folder `frontend/components`. Hãy tạo ra component đầu tên là `page`.

```
mkdir -p frontend/components/page
touch frontend/components/page/{_page.html.erb,page.css,page.js}
```

Hiện tại chưa có phần JS nào cho trang này, nên `page.js` đơn thuần chỉ import CSS file:

```Javascript
// frontend/components/page/page.js
import "./page.css";
```

Thêm CSS vào trong `page.css`:
```CSS
/* frontend/components/page/page.css */
.page {
  height: 100vh;
  width: 700px;
  margin: 0 auto;
  overflow: hidden;
}
```
Cuối cùng là tới file erb:
```HTML
<!-- frontend/components/page/_page.html.erb -->
<div class="page">
  <%= yield %>
</div>
```

Vì component này mới tạo, nên ta cần import nó vào trong file `application.js`

```Javascript
import "components/page/page";
```

Tại trang chủ `home.html.erb` thì ta render cái components vừa rồi ra:

```HTML
<!-- app/views/pages/home.html.erb -->
<%= render "components/page/page" do %>
  <p>Hello from our first component!</p>
<% end %>
```

Chạy thử trên server, kết quả của ta sẽ là như sau:

![](https://images.viblo.asia/93a9b675-337c-4d76-ba64-06227537bbb9.jpg)

**TL;DR** mệt vãi lúa :disappointed_relieved:

Tạm như vậy đã, về cơ bản các components sau này sẽ được implement theo cách như vậy.

Ở phần sau, ta sẽ đưa vào các function để giải quyết bài toán đặt ra ban đâu theo cách tương tự như vậy.

**GLHF**

### Nguồn:
- http://weblog.rubyonrails.org/2017/4/27/Rails-5-1-final/
- https://reactjs.org/docs/thinking-in-react.html
- https://blog.heroku.com/speeding-up-sprockets
- https://github.com/rails/webpacker
- https://evilmartians.com/chronicles/evil-front-part-1