Bắt đầu từ Rails 6, Webpacker đã trở thành trình biên dịch JavaScript mặc định. Điều đó có nghĩa là tất cả code JavaScript sẽ được xử lý bởi Webpacker thay vì asset pipeline hay còn gọi là Sprockets. Webpacker khác với asset pipeline về cả cách thức hoạt động lẫn cách áp dụng nó vào hệ thống. Trong bài này, chúng ta sẽ cùng tìm hiểu về cách Webpacker xử lý JavaScript. (go)

# Webpacker là gì
`webpacker` là một gem chứa `webpack`  - *một tool khá nổi tiếng dùng để quản lý và bundle code JavaScript* - và cung cấp các `helper` để chúng ta có sử dụng `webpack` trong ứng dụng Rails của mình. Nói dễ hiểu hơn thì `webpacker` giúp Rails sử dụng được `webpack`.

Ngay khi tạo một app Rails 6 mới, bạn sẽ nhìn thấy output sau trong console.

```
      rails  webpacker:install
RAILS_ENV=development environment is not defined in config/webpacker.yml, falling back to production environment
      create  config/webpacker.yml
Copying webpack core config
      create  config/webpack
      create  config/webpack/development.js
      create  config/webpack/environment.js
      create  config/webpack/production.js
      create  config/webpack/test.js
```

Bạn cũng sẽ thấy gem `webpacker` được mặc định add vào `Gemfile`. Câu lệnh `new` của Rails cũng đồng thời cài một đống npm package với `yarn`

> Với các  hệ thống cũ được upgrade lên Rails 6 sẽ không được tự động cài gem `webpacker`. Bạn cần phải tự thêm nó vào `Gemfile` và sau đó chạy câu `rails webpacker:install` 

# Cây thư mục mới cho code JavaScript

Trước Rails 6, tất cả code JS phải được để ở đường dẫn `app/assets/javascripts`. Tuy nhiên ở ứng dụng Rails 6 thì đường dẫn này không còn tồn tại nữa mà thay vào đó chúng ta có hẳn một cây thư mục mới `app/javascript` để chứa toàn bộ code JavaScript và hoàn toàn có thể chứa được toàn bộ code Front end của cả hệ thống.  

Cây thư mục mới này có dạng như sau: 

```
▶ tree app/javascript
app/javascript
├── channels
│   ├── consumer.js
│   └── index.js
└── packs
    └── application.js

2 directories, 3 files
```

Nó chứa 2 thư mục con, `channels` và `packs`. Thư mục `channels` được sinh ra bởi Action Cable của Rails. Tạm thời chúng ta có thể bỏ qua nó và tập trung vào phần quan trọng nhất ở đây - *thư mục `packs`* - và xem nó chứa những gì nhé:

```javascript
// app/javascript/application.js
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
```

# Pack là gì?

`webpack` có một khái niệm là `entry points` và nó có nghĩa là nhưng files mà nó sẽ tìm đến đầu tiên khi bắt đầu biên dịch code JavaScript của bạn. `webpacker` tạo một pack `application` dưới dạng file `application.js` nằm trong thư mục `app/javascript/packs`. File này sẽ tương đương với file `app/assets/javascripts/application.js` của asset pipeline.

Pack `application` được tạo bởi Rails sẽ chứa code liên quan đến các component của Rails như turbolinks, Active Storage và Action Cable. 

> Có thể bạn sẽ để ý rằng tất cả những framework Rails có chứa các thành phần JavaScript như Rails-UJS, Turbolinks, Active Storage đều được migrate để tương thích với Webpacker. Ngay cả framework mới được giới thiệu ở Rails 6 như Action Text cũng được tương thích với Webpacker

Do đó pack `application` sẽ là entry point cho toàn bộ code JavaScript của bạn. Chúng ta cũng có thể tạo được pack mới và để trong thư mục `app/javascript/packs` và Webpacker tự động sẽ tìm đến chúng khi chạy biên dịch. Tất cả việc này được config sẵn ở file `config/webpacker.yml`

```ruby
# config/webpacker.yml
5:  source_entry_path: packs
```

Nếu chúng ta muốn `webpack` tìm tới các thư mục khác để chạy code JavaScript thì chúng ta có thể config setting `resolved_paths` ở trong file `config/webpacker.yml`. Mọi thứ trong file này cũng khá là dễ đọc dễ hiểu về mục đích của từng dòng config nên mình sẽ để mọi người tự tìm hiểu nhé.

# Compile code JavaScript

Việc biên dịch và chạy code JavaScript ở môi trường Development hoàn toàn được Webpacker và webpack thực hiện hết, bạn không cần phải làm gì hết. Khi chạy server Rails, việc compile được thực hiện ngay trong quá trình request giống hệt như cách Rails làm với asset pipeline.

## Reloading bằng webpack-dev-server

Webpacker sinh ra một file `bin/webpack-dev-server` để thực hiện việc reload trực tiếp (live reloading) ở môi trường Development.  Để xem cách webpack thực hiện việc live reloading và hotswap module thì chúng ta cần phải chạy riêng `webpack-dev-server` .

## Webpacker ở môi trường Production

Ở Production, Webpacker sẽ thêm task `webpacker:compile` vào task `assets:precompile`. Do đó nếu bạn build pipeline  bằng cách chạy `assets:precompile` thì nó cũng đồng thời compile luôn những file được chỉ định bởi webpack. Vì package webpack là 1 phần của `package.json`, nên `yarn` sẽ tự động install webpack để nó có thể compile code JS.

# Include code JavaScript vào ứng dụng

Bên trên mình đã giới thiệu về làm thế nào để compile code JS bằng cách sử dụng Webpacker, nhưng làm thể nào để include code JS vào ứng dụng của chúng ta nhỉ ?

Để làm được việc này, Webpacker đã cung cấp 1 helper method `javascript_pack_tag` để include các pack của webpacker vào file layout của hệ thống. Method này tương ứng với method `javascript_link_tag` của asset pipeline

```ruby
# app/views/layouts/application.html.erb

<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```

Method `javascript_pack_tag`  sẽ đảm bảo việc chỉ định đến đúng file và code cần thiết để compile trên cả môi trường Development lẫn Production giống như asset pipeline.

# Tạm kết

Bài viết vừa rồi của mình đã giới thiệu tổng quan về cách Webpacker giúp chúng ta có thể sử dụng được webpack ở một ứng dụng Rails 6 và cũng hiểu được rằng `packs` trong Webpacker là gì. Trong bài sau chúng ta sẽ đi sâu vào cách sử dụng các packs trong Webpacker

Xin chào và hẹn gặp lại :D

*Nguồn : [ Understanding Webpacker in Rails 6 - Prathamesh Sonpatki](https://prathamesh.tech/2019/08/26/understanding-webpacker-in-rails-6/)*