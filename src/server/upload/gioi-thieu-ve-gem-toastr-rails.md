Bạn đã chán với việc hiển thị các thông báo flash như thế này ?

![](https://images.viblo.asia/ca3d8bf2-7b08-483d-9b87-7fb56420f324.png)

Và muốn chuyển đổi sang hiển thị thế này:

![](https://images.viblo.asia/ab774673-a776-4e2b-94a5-1f6c88183eca.png)

Vậy thì gem toastr-rails là dành cho bạn !

# 1. Giới thiệu chung
**toastr** là một thư viện Javascript được phát triển dựa trên Jquery và được xây dựng để phục vụ cho việc hiển thị thông báo một cách đẹp đẽ hơn và có thể customize được.
Ngoài gem toastr-rails được sử dụng trong Rails thì ta cũng có thể tìm thấy toast trên thư viện Bootstrap 4, tuy nhiên gem này được xây dựng để hỗ trợ tốt hơn cho Rails.

Phiên bản hiện tại của gem toastr-rails là 2.0.1.

Các bạn có thể xem qua demo của gem này tại đây: https://codeseven.github.io/toastr/demo.html

# 2. Ví dụ sử dụng

## 1. Cài đặt Jquery trên Rails
Thêm
```ruby
gem 'jquery-rails'
```
vào Gemfile.

Thêm
```js
//= require jquery
//= require jquery_ujs
```
vào application.js. Nếu đang sử dụng Rails 5.1+ thì chỉ cần thêm dòng `//= require jquery` vào file này là được.

## 2. Cài đặt gem toastr-rails
Thêm
```ruby
gem 'toastr-rails'
```
vào Gemfile.

Thêm
```js
//= require toastr
```
vào application.js.

Và
```css
*= require toastr
```
vào application.css.

## 3. Tạo helper

```ruby
# app/helpers/application_helper.rb

def custom_bootstrap_flash
  flash_messages = []
  flash.each do |type, message|
    type = 'success' if type == 'notice'
    type = 'error'   if type == 'alert'
    text = "<script>toastr.#{type}('#{message}');</script>"
    flash_messages << text.html_safe if message
  end
  flash_messages.join("\n").html_safe
end
```

Và thêm dòng sau đây vào layout, ngay dưới js include tag
```
<%= javascript_include_tag "application" %>
<%= custom_bootstrap_flash %>
```

## 4. Sử dụng
Sau khi có helper kia thì việc sử dụng toast trên controller không khác gì việc sử dụng flash, ta chỉ cần sử dụng đơn giản như sau:
```ruby
flash[:success] = "Đăng nhập thành công"
```

Còn nếu như sử dụng trong file JS thì gem toastr-rails đã có hỗ trợ sẵn các hàm sau:
```js
 // Display an info toast with no title
 toastr.info('Are you the 6 fingered man?')
 
 // Display a warning toast, with no title
toastr.warning('My name is Inigo Montoya. You Killed my father, prepare to die!')

// Display a success toast, with a title
toastr.success('Have fun storming the castle!', 'Miracle Max Says')

// Display an error toast, with a title
toastr.error('I do not think that word means what you tink it means.', 'Inconceivable!')
```

## 5. Customize
Ngoài việc hiển thị, ta còn có thể thay đổi một vài thông số cho toastr. Ta thay đổi các thông số này bằng cách chỉnh sửa object toastr.options trong file js (ở ví dụ sau đây là file application.js nhưng bạn cũng có thể thay đổi tùy theo yêu cầu trên ứng dụng của bạn)

```js
// application.js
toastr.options = {
  // thay đổi nội dung hiển thị trên nút close, vd như "Đóng"
  "closeButton": false,
  
  // thay đổi vị trí của notification
  "positionClass": "toast-top-right",
  
  // Các thông báo có hiển thị cùng 1 lúc hay khi cái sau xuất hiện sẽ ẩn cái trước
  "preventDuplicates": false,
  
  // action khi click vào thông báo
  "onclick": null,
  
  // thời gian, hiệu ứng hiển thị và ẩn
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
```

# 3. Nguồn tham khảo
1. https://github.com/tylergannon/toastr-rails
2. https://coderwall.com/p/ximm8a/coverting-rails-flash-messages-to-toastr-notifications