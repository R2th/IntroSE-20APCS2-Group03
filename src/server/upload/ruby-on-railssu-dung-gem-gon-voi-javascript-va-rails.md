**I. GIỚI THIỆU**

Mỗi khi muốn truyền dữ liệu từ controller ra view thì chắc hẳn ai cũng từng gặp khó khăn trong việc sử dụng dữ liệu này để làm việc với javascript. Gem Gon cho phép chúng ta sử dụng dữ liệu của Rails như một phần của JS, đặc biệt với các ứng dụng như Angular, Ember và SPA. Điều này giúp ta tránh phải gọi các hàm JS phức tạp trong view và cho phép chúng ta nhận được đầy đủ thông tin hơn so với việc lấy từng phần dữ liệu nhỏ về đối tượng. 

Ngoài ra hiện tại chúng ta còn có thể dễ dàng làm mới lại dữ liệu trong các biến thông qua `ajax` bằng cách sử dụng `gon.watch!`.



-----


**II. HƯỚNG DẪN SỬ DỤNG TRƯỚC KHI DÙNG**

**1.Hướng dẫn cơ bản**

Khá dễ dàng để cài đặt và sử dụng trong project.

B1: Thêm `gem "gon"` vào Gemfile sau đó chạy lệnh `bundle install`.

B2: Chèn thêm `<%= Gon::Base.render_data %>`
```html
<head>
  <title>some title</title>
  <%= Gon::Base.render_data %>
  <!-- include your action js code -->
```
 hoặc `<%= include_gon %>;`(với rails 3) vào Giữa cặp thẻ `<head></head>` của file layouts/application.html.erb (hoặc đặt ở 1 file cụ thể nếu chỉ muốn sử dụng trong 1 phạm vi nhỏ hơn) để có thể sử dụng. 

```html
<html>
 <head>
   ...
   <%= include_gon %>
   ....
 </head>
 ...
 </html>

```

Bây giờ chúng ta có thể sử dụng nó trong controller để lưu lại giá trị mà chúng ta muốn lấy, ví dụ:

```ruby
class PostsController < ApplicationController
....
    def index
        @posts = Post.all
        gon.posts = @posts
        gon.title = "Title of Post"
    end
....
end

```
Gon có thể nhận dữ liệu theo khá nhiều cách và kiểu dữ liệu khác nhau, ví dụ:
```ruby
@your_int = 123
@your_array = [1,2]
@your_hash = {'a' => 1, 'b' => 2}
gon.your_int = @your_int
gon.your_other_int = 345 + gon.your_int
gon.your_array = @your_array
gon.your_array << gon.your_int
gon.your_hash = @your_hash

gon.all_variables # > {:your_int => 123, :your_other_int => 468, :your_array => [1, 2, 123], :your_hash => {'a' => 1, 'b' => 2}}
gon.your_array # > [1, 2, 123]

# gon.clear # gon.all_variables sẽ được reset thành {}
```

Và gọi nó ra trong file JS


```javascript
$(document).ready(function() {
    gon.posts.forEach(function(val) {
        console.log(val);
    }
    console.log(gon.title)
    console.log(gon.all_variables)
    ...
});
```

**2. Kết hợp với ADM**

Nếu trang web của bạn sử dụng các module AMD bạn có thể sử dụng include_gon_amd để hỗ trợ include các biến và coi các `function` như một module. Các tùy chọn chủ yếu giống như `include_gon`. Ví dụ kết quả sẽ như sau:

```javascript
define('yourNameSpace', [], function() {
  var gon = {};
  gon.yourVariable = yourValue;
  // etc...

  return gon;
});
```
Cách sử dụng:

app/views/layouts/application.html.erb

```html
include_gon_amd namespace: 'data'
```

JavaScript module

```javascript
define(['data'], function(data) {
  alert(data.myVariable);
});
```

**3. Làm mới dữ liệu với gon.watch**

Bạn có thể sử dụng gon để làm mới dữ liệu mà không cần tải lại trang và viết các hàm js dài. Hỗ trợ dùng với `gon.watch.rabl` và `gon.watch.jbuilder`. Chi tiết cách sử dụng `gon.watch` mọi người có thể tham khảo tại: https://github.com/gazay/gon/wiki/Usage-gon-watch.

**4. Các tiện ích khác**

`Gem Gon` còn có thể kết hợp sử dụng cùng với `Rabl`, `Rabl-Rails`, `Jbuilder` hoặc với `gon.global` ta có thể gửi dữ liệu tới js từ bất cứ đâu. Các bạn có thể đọc hướng dẫn trong mục `Tài liệu tham khảo` phía dưới.



-----


**TỔNG KẾT**

Qua đây cho thấy sự tương tác từ controller với javascript thực đơn giản, chúng ta có thể gửi ra 1 chuỗi, mảng, hay 1 object.... giúp việc xử lý trở nên đơn giản.

Note: Chúng ta có thể thay đổi variable namespace, nghĩa là sử dụng `app.variableName` thay cho `gon.variableName` bằng cách thêm `<%= include_gon(namespace: 'app') %>; ` ở B2


-----


**Tài liệu tham khảo**:  https://github.com/gazay/gon

Rabl: https://github.com/gazay/gon/wiki/Usage-with-rabl

Jbuilder: https://github.com/gazay/gon/wiki/Usage-with-jbuilder

gon.global: https://github.com/gazay/gon/wiki/Usage-gon-global