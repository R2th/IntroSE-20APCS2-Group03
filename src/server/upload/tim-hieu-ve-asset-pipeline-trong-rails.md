## 1. Asset Pipeline là gì? 

Tài liệu về Ruby on Rails đã có một định nghĩa cũng như giải thích khá cụ thể về Asset Pipeline như bên dưới

>The asset pipeline provides a framework to concatenate and minify or compress JavaScript and CSS assets. It also adds the ability to write these assets in other languages and pre-processors such as CoffeeScript, Sass, and ERB. It allows assets in your application to be automatically combined with assets from other gems.

Theo định nghĩa, `Asset pipeline` cho chúng ta một framework để ghép, rút gọn hay nén các tệp `JavaScipt` và `CSS` trong project chúng ta. Ngoài ra, chúng ta còn có thể biên soạn các assets trong ngôn ngữ khác như CoffeeScipt, Sass và ERB, nó cũng cho phép chúng ta kết hợp các assets của gem trong ứng dụng một cách tự động.

Thường thì một ứng dụng Rails khi được tạo mới sẽ đi kèm với gem `sprockets-rails`. Gem này mang trong mình sức mạnh từ 3 gems khác đó là `sass-rails`, `coffee-rails` và `uglifier`, cũng mặc định là gem mang nhiệm vụ implement Asset pipeline trong ứng dụng của chúng ta.

## 2. Các tính năng của Asset Pipeline

Điếm lớn đầu tiên của Asset pipeline là về hiệu năng và tốc độ, ngoài ra nó còn mang lại cho ta một số tính năng bên dưới:

- Thực hiện nối các assets, hay các file css thành một file riêng biệt, giảm số lượng file xuống giúp cho trình duyệt của chúng ta thực hiện ít request hơn.
- Với SHA256 fingerprint, các file được cache tự động đi kèm với fingerprint chỉ được update khi nội dung bên trong file thay đổi, tránh tình trạng trình duyệt cache phiên bản củ của assets gây ra một số lỗi không mong muốn.
- Thu nhỏ và nén cũng giúp cho kích cỡ các file assets của ta giảm đi đồng nghĩa với việc chúng ta sẽ giảm được vài "bytes" cho mỗi request.
- Ngoài ra còn hỗ trợ các ngôn ngữ như Sass, CoffeeScript và ERB.

## 3. Cách sử dụng

Trong một ứng dụng Rails mới, chúng ta có thể tìm thấy nhiều nơi chứa các assets cho ứng dụng nhưng chính vẫn là `app/assets`. Trong thư mục này bao gồm các đường dẫn `images` để chứa hình ảnh, `javascript` để chứa các file JavaScript và cuối cùng là `stylesheets` chứa các file CSS để styling ứng dụng của chúng ta.

### 3.1. Images

Để đính kèm một hình ảnh trong view, chúng ta có thể sử dụng các view helpers của Rails, cụ thể ở đây là `image_tag`

```
<%= image_tag "mouse.jpg", alt: "A Cat named Mouse" %>
```

Ở dòng code trên, chúng ta sử dụng `image_tag` để đính kèm hình của chú mèo có tên là Chuột vào view của mình, `image_tag` sẽ tự mặc định là `mouse.jpg` sẽ nằm trong đường dẫn `app/assets/images`, hoặc chúng ta có thể thêm các thư mục con vào `images` để sắp xếp bộc cục của dự án được trực quan hơn.

```
<%= image_tag "animals/mouse.jpg", alt: "A Cat named Mouse" %>
```

Trong các file CSS sẽ có đôi chút khác biệt, thông thường nếu chúng ta muốn lấy một hình ảnh để làm background cho một element, trong CSS sẽ viết như sau.

```
body {
  background-image: url('/assets/images/mouse.jpg');
}
```

Tiếc là, cách này sẽ không hoạt động. Thay vì thế, chúng ta sẽ lại cần sử dụng một helper để tìm hình ảnh trong assets, đó là `image_url`. Chúng ta sẽ viết như sau

```
body {
  background-image: image-url('mouse.jpg');
}
```
Với cách này chúng ta cũng không cần phải thêm vào đường dẫn, hay nhỉ!

### 3.2. Stylesheets

Trong đường dẫn `app/assets/stylesheets`, chúng ta sẽ thấy có một file `application.css`. Đây là nguồn chứa các CSS cho ứng dụng của bạn mà không được lưu trữ trong `vender` hoặc `lib` (cũng là 2 nơi khác có thể chưa các assets). Ngoài ra, chúng ta cũng có thể đổi đuôi `.css` thành `.scss` để có thể tận dụng lợi ích của `SCSS`, gem `sass-rails` sẽ phát huy tác dụng ở trường hợp này.

Một file `application.css` mặc định sẽ trông như thế này:

```
/* app/assets/stylesheets/application.css */

/*
 * This is a manifest file that'll be compiled into application.css, which will include all the files
 * listed below.
 *
 * Any CSS and SCSS file within this directory, lib/assets/stylesheets, or any plugin's
 * vendor/assets/stylesheets directory can be referenced here using a relative path.
 *
 * You're free to add application-wide styles to this file and they'll appear at the bottom of the
 * compiled file so the styles you add here take precedence over styles defined in any other CSS/SCSS
 * files in this directory. Styles in this file should be added after the last require_* statement.
 * It is generally better to create a new file per style scope.
 *
 *= require_tree .
 *= require_self
 */
```

Ở đây, cú pháp `*=require_tree` trông giống như là một comment nhưng thật ra nó chịu trách nhiệm render tất cả các file có trong `app/assets/stylesheets` và tự động đính kèm chúng vào đây, với cách này chúng ta sẽ không cần phải tự đính kèm bằng tay nữa. `*= require_self` dùng để tự đính kèm chính nó, có nghĩa là nó sẽ apply bất kỳ `css` nào được viết ở đây lên trước bất kỳ `css` nào. Chúng ta cũng có thể thêm bất kỳ file `css` nào và require nó ở đây để sử dụng trong ứng dụng của mình.

Sử dụng các assets trong layout của trang web như bên dưới.

```
<!-- app/views/layouts/application.html.erb -->

<!DOCTYPE html>
<html>
  <head>
    <title>Asset Pipeline</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <div class="container">
      <%= yield %>
    </div>
  </body>
</html>
```
### 3.3. JavaScript

Tương tự như CSS/SCSS, quy luật tương tự cũng áp dụng với JavaScript trong Assets pipeline nhưng cú pháp sẽ khác đôi chút.

```
// app/assets/javascripts/application.js

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require custom 
//= require_tree .
```
Trong file trên, `//=require custom` dùng để đính kèm file custom.js vừa được tạo trong `app/assets/javascripts` một cách tự cho layout của chúng ta. Qúa trình này sẽ giúp ta thu gọn kích cỡ file, kích cỡ của request cũng như tăng tốc độ của ứng dụng. Ở môi trường local sẽ không có nhiều khác biệt nhưng nếu lên production, những thu gọn này sẽ mang lại nhiều giá trị về hiệu năng.

Trên đây là g cơ bản về Assets Pipeline trong Ruby on Rails.

*Link tham khảo*

https://guides.rubyonrails.org/asset_pipeline.html