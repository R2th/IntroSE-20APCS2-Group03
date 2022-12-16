## Introduction
Trong bài viết này mình sẽ chia sẻ kiến thức mình đọc được về rails 6. Chủ đề lần này là cài đặt thư viện cơ bản Bootstrap, Jquery trên rails 6

Mặc định rails 6 khi bạn init project thì webpack sẽ được sử dụng, trong tương lại việc import thư viện css hoặc javascript bằng gem sẽ có rất nhiều hạn chế do đó chúng ta sẽ phải làm quen dần với việc chạy các thư viện thông qua webpack .

## Create a Rails project
Mình sẽ thử tạo project với rails 6 như sau. Trước tiên là kiểm tra version của rails đang được cài trên máy mình hiện tại:

```
$ rails --version
Rails 6.0.2.1
```

Init project:

```
$ rails new rails6.0.2.1
$ cd rails6.0.2.1
```

Chạy scaffold để tạo model, controller, view cho User:

```
$ rails g scaffold User name
```

Migrate cho user vừa được tạo ra:

```
$ rails db:create db:migrate
```

Thêm các thư viện Bootstrap jQuery Popper.js với yarn.

```
$ yarn add bootstrap jquery popper.js
```

Sửa file `config/webpack/environment.js` như sau:

```
const { environment } = require('@rails/webpacker')

const webpack = require('webpack')

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))

module.exports = environment
```

Các bạn có thể thấy, ta sẽ sử dụng function `ProvidePlugin` của webpack để add thư viện vào toàn bộ javascript pack thay vì phải import bằng tay vào từng file khi muốn sự dụng thư viện jQuery.

Tiếp theo ta sẽ config cho boostrap

```
import "bootstrap"
import "../stylesheets/application"
```

Tạo file `app/javascript/stylesheets/application.scss` và thêm nội dung như sau:

```
@import "~bootstrap/scss/bootstrap";
```

Việc đặt file scss trong thư mục javascript trông có vẻ mơ hồ, nhưng mình cũng đọc các bài viết trên mạng họ đều suggest không sử dụng asset pipeline  thay vào đó là sử dụng webpack để compile. Mình nghĩ rằng trong tương lại gem rails/sprockets sẽ không còn được sử dụng(deprecated)

Việc tiếp theo ta sẽ sửa file `application.html.erb`. Thay thế  file stylesheet_link_tag như sau:

```
...
  <head>
   ...
    <%= stylesheet_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>
...
  ```
  
  Đồng thời move file `scaffolds.scss` từ folder `assets/stylesheets` sang folder `javascript/stylesheets`. Sửa code của thẻ a để kiểm tra xem rails đã nhận được chưa :
  
  ```
  a {
  color: #000;

  &:visited {
    color: #666;
  }

  &:hover {
    color: #fff;
    background-color: #000;
  }
}
  ```
  
  Nhớ import `scaffolds.scss` vào file application.sss
  ```
  @import "~bootstrap/scss/bootstrap";
  @import "./scaffolds.scss";
  ```
  
  ## Kết luận
  
  Trên đây là tip mình nghĩ rằng nên áp dụng trong rails 6. Mình sẽ cố gắng viết thêm một số bài nữa về rails 6 hy vọng các bạn ủng hộ