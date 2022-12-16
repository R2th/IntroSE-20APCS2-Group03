Có thể bạn thấy việc hiển thị flash mặc định của gem devise khá nhàm chán và bạn muốn chúng nhìn thân thiện hơn. `Toastr `là một lựa chọn rất tốt bạn có thể thử và trải nghiệm. toastr là một thư viện Javascript dùng cho việc hiển thị các thông báo một cách độc lập. Để sự dụng toastr trong Rails chúng ta có thể thử các bước đơn giản như sau:
   
#    1. Installation with bower or npm
```bash
bower install toastr --save
OR
npm install --save toastr
```
Theo cách này, giờ đây và tất cả sự phụ thuộc của nó sẽ được cài đặt trong các thành phần Rails của bạn. Bây giờ chúng ta có thể tiếp tục và sử dụng nó trong ứng dụng rails.
# 2. Gọi toastr trong ứng dụng rails.
```ruby
#application.js
//= require toastr
```
    
```ruby
#application.scss
@import 'toastr'
```
    
Tiếp đến tại `application_helper.rb` chúng ta thêm một method như sau:

```ruby
def custom_bootstrap_flash
    flash_messages = []
    option = "{'closeButton': true}"
    flash.each do |type, message|
      type = "success" if type == "notice"
      type = "error" if type == "alert"
      text = "toastr.#{type}('#{message}');"
      flash_messages << text if message
    end
    flash_messages.join("\n")
  end
```
Một số tùy chọn khác của Toastr
```ruby
toastr.options = ({
 “closeButton”: true,
 “debug”: false,
 “positionClass”: “toast-bottom-right”,
 “onclick”: null,
 “showDuration”: “300”,
 “hideDuration”: “1500”,
 “timeOut”: “5000”,
 “extendedTimeOut”: “1000”,
 “showEasing”: “swing”,
 “hideEasing”: “linear”,
 “showMethod”: “fadeIn”,
 “hideMethod”: “fadeOut”
 });
```


Ok, về cơn bản phần cài đặt đã xong, giờ để sử dụng trong layouts/application.html.erb phần body chúng ta thêm đoạn sau

```html
 <script>
   <%= sanitize custom_bootstrap_flash %>
 </script>
```

Toastr hỗ trợ bạn hiển thị 4 loại message thông báo thông thường là Success, Info, Warning và Error. Ở trên tôi mới sử dụng type success và error

Chúc các bạn thành công!!