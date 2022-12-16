## Giới thiệu 
![](https://images.viblo.asia/6e70ef1d-9173-4607-a817-c6ace5469080.png)
Trong các dụng rails hầu hết mọi người đều sử dụng các icon trên và nhiều icon nữa để làm nên các giao diện đẹp và sống động.  Những icon đó được lấy [Font Awesome](https://fontawesome.com/) để đưa các icon đó vào trong ứng dụng rails mình sử dụng gem 'font-awesome-sass'

Font Awesome cung cấp một biểu tượng đẹp, có thể mở rộng mà bạn có thể sử dụng trong ứng dụng của mình. Tính đến phiên bản 4.2 Font Awesome có gần 500 biểu tượng có sẵn hoàn toàn miễn phí. Font Awesome quản lý điều này bằng cách làm cho mỗi phần biểu tượng của một phông chữ để có thể thu nhỏ và tùy chỉnh khi cần. Trong bài viết này, chúng tôi sẽ chỉ cho bạn cách sử dụng Font Awesome trong Ứng dụng Rails của bạn. Băt đâu nào
## Cài đặt ứng dụng Rails
Để sử dụng Font Awesome trong ứng dụng Rails của bạn, hãy thêm gem 'font-awesome-sass' vào Gemfile của bạn.
```
//Gemfile:
gem 'font-awesome-sass', '~> 4.2.0'
```
Sau đó chạy bundle install
```
//Terminal Commands:
bundle install
```
Tạo một controller home
```
rails g controller homes show
```
Config trong routes
```
Rails.application.routes.draw do
  resource :homes, only: [:show]
  root to: "homes#show"
end
```
Bây giờ chúng ta sẽ import FontAwesome vào trong file app/assets/stylesheets/application.css.scss hoăc app/assets/stylesheets/application.scss
```
@import "font-awesome-sprockets";
@import "font-awesome";
```
Tuyệt vời, bây giờ chúng ta bắt đầu dùng thử font-awesome nào. Thêm dòng này vào show của home controller 
```
//app/views/homes/show.html.erb:
<i class="fa fa-github"></i>
<i class="fas fa-alarm-clock"></i>
```
Bây giờ các bạn có thể sử dụng các icon đẹp, độc, lạ từ Font Awesome

Với Font Awesome 5.x có 3 kiểu: 
- solid (fas)
- regular (far)
- brands (fab)

Nguồn:
https://github.com/FortAwesome/font-awesome-sass