Theo mặc định, Rails cung cấp cho chúng ta một số Flash message đơn giản. Hôm nay chúng ta cùng làm cho chúng hiển thị bắt mắt hơn với thư viện [Toastr](https://github.com/CodeSeven/toastr) của Javascript.

### 1. Thêm Toastr vào project
Trước tiên chúng ta cần thêm Toastr vào project, có khá nhiều cách để thêm, sau đây mình sẽ chỉ ra 2 cách để thêm chúng vào project:

**Cách 1: Dùng gem "toastr-rails"**

Thêm dòng sau vào *Gemfile*:
```
# Gemfile

gem "toastr-rails"
```
Sau khi thêm chúng ta chạy lệnh: `$ bundle install`

Tiếp theo, require Toastr trong *app/assets/stylesheets/application.css* và *app/assets/javascripts/application.js*:
```
# app/assets/stylesheets/application.css

*= require toastr
```
```
# app/assets/javascripts/application.js

//= require toastr
```
Vậy là xong cách thứ nhất rồi! Các bạn có thể chuyển sang thực hiện bước 2 luôn hoặc đọc thêm cách thứ 2 cũng khá thú vị đấy!

**Cách 2: Thêm 2 file toastr.css, toastr.js**

Cách này chỉ cần thêm 2 file **toastr.css** và **toastr.js**, có thể sử dụng online hoặc tải về tùy bạn:
- Dùng online thì thêm 2 dòng sau vào thẻ `<head> </head>` của file view, thường là file *app/views/layouts/application.html.erb* nhé:
```
# app/views/layouts/application.html.erb

<%= stylesheet_link_tag "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css" %>
<%= javascript_include_tag "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js" %>
```
- Tải về thì các bạn vào [Github của Toastr](https://github.com/CodeSeven/toastr) tải 2 file *toastr.css* và *toastr.js* (hoặc *toastr.min.css* và *toastr.min.js*).

    Sau đó thêm lần lượt chúng vào thư mục *app/assets/stylesheets* và *app/assets/javascript*.
    
    Cuối cùng để sử dụng thì cần require chúng trong *app/assets/stylesheets/application.css* và *app/assets/javascripts/application.js* như phần cuối của cách 1.

### 2. Cố định các loại Flash
Trong *app/controllers/applicationcontroller.rb* thêm dòng sau: `add_flash_types :success, :danger, :info`
```
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  add_flash_types :success, :danger, :warning
end
```
Với điều này, bạn có thể xác định tất cả các loại Flash bạn muốn.

### 3. Chuyển đổi Flash thành Toastr
Bây giờ đi đến file *app/views/layouts/application.html.erb*, trước thẻ `<%= yield %>`, thêm:
```
# app/views/layouts/application.html.erb

<!DOCTYPE html>
<html>
  <head>
   ...
  </head>

  <%= render partial: "layouts/flash_messages", flash: flash %>
  <%= yield %>
</html>
```
Và trong *app/views/layouts/flashmessages.html.erb* chúng ta có:
```
# app/views/layouts/flashmessages.html.erb

<% if flash.present? %>
  <div id="flash">
    <script>
      <% if flash[:success] %>
        toastr.success("<%= flash[:success] %>")
      <% end %>
      <% if flash[:warning] %>
        toastr.warning("<%= flash[:warning] %>")
      <% end %>
      <% if flash[:danger] %>
        toastr.error("<%= flash[:danger] %>")
      <% end %>
    </script>
  </div>
<% end %>
```

### 4. Sử dụng
Cuối cùng là sử dụng, thêm Flash message như chúng ta vẫn thường dùng thôi!
```
redirect_to root_path, success: "This is a successful flash message"
```
hoặc:
```
flash[:danger] = "This is a dangerous flash message"
redirect_to root_path
```
hoặc:
```
flash.now[:warning] = "This is a warning flash message"
render :new
```
Và kết quả đạt được sau những nỗ lực trên đó là:

Success Flash:
![](https://images.viblo.asia/dcad74d4-61ea-43af-a340-7ac5ea6e4302.png)

Danger Flash:
![](https://images.viblo.asia/0b0953d2-a850-461c-99c4-0b3f2f6fbbd4.png)

Warning Flash:
![](https://images.viblo.asia/639cef71-bc19-4d62-8f94-f31808a4c8b3.png)

Để hiểu bài viết trên nhiều hơn hay muốn tùy chỉnh các thông báo với Toastr, các bạn hãy đọc thêm ở [ĐÂY](https://codeseven.github.io/toastr/)

Thank you so much for reading!!! :kissing_heart:

**Tham khảo:**

[Custom Rails flash notification with Toastr](https://ftovaro.github.io/ruby/rails/bootstrap/notification/flash/toast/alerts/2016/11/19/custom-flash-notifications-with-bootstrap.html)

[Easily add Toastr flash notices to Rails apps](http://til.obiefernandez.com/posts/77b3196c4c-easily-add-toastr-flash-notices-to-rails-apps)