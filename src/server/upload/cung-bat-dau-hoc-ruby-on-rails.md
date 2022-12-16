# Giới thiệu Rails 
Ruby on Rails(hay thường được gọi tắt là Rails) là 1 framework phục vụ cho phát triển web sử dụng ngôn ngữ Ruby. Ngay từ khi ra mắt năm 2004, Ruby on Rails đã trở thành một trong những công cụ phát triển mạnh mẽ và phổ biển cho các ứng dụng web. Rails được sử dụng bởi các công ty như Airbnb, Basecamp, Disney, GitHub, Hulu, Kickstarter, Shopify, Twitter và Yellow Pages.

Điều gì làm cho Rails được nhiều công ty lớn sử dụng như vậy? Đầu tiên, Rails là mã nguồn mở 100%, cùng với [MIT License](https://opensource.org/licenses/mit-license.php) thì nghiễm nhiên sử dụng Rails là hoàn toàn miễn phí. Rails được đánh giá là có thiết kế gọn nhẹ, bằng cách khai thác triệt để ngôn ngữ Ruby, Rails đã được tạo ra để dành riêng cho việc viết các ứng dụng web. Kết quả là những tác vụ phổ biến cho việc lập trình web như tạo HTML, tạo các Model và định tuyến URL trở nên dễ dàng khi sử dụng Rails. Khi đọc code trong ứng dụng cũng rất dễ vì nó rất ngắn gọn.

Rails cũng thích nghi nhanh chóng với những công nghệ phát triển web mới. Ví dụ như Rails là 1 trong những framework triển khai kiến trúc REST cho ứng dụng web của mình.

Cuối cùng, Rails nhờ có 1 cộng đồng hỗ trợ nhiệt tình với hàng ngàn đóng góp mã nguồn mở, các cuộc trao đổi chia sẽ kiến thức khắp thế giới, 1 lượng lớn Gem(theo mình hiểu là các gói code đã được viết sẵn) đã được tạo. Rails càng ngày càng hoàn thiện hơn.

# Cài đặt Rails 
Đầu tiên bạn nên sửu dụng lệnh:
```
ruby -v
```
trên terminal để kiểm tra xem trên máy bạn đã cài đặt Ruby chưa. Nếu kết quả tương tự như này thì bạn đã cài Ruby trên máy rồi đó.
```
➜  ~ ruby -v
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin18]
```
Còn nếu chưa có bạn có thể cài bằng lệnh sau:
```
brew install ruby
```

>Hướng dẫn trên dành cho hệ điều hành MacOS, nếu bạn dùng hệ điều hành khác bạn có thể tham khảo [ở đây](https://www.ruby-lang.org/vi/documentation/installation/). 


Sau khi đã cài Ruby trên máy tiếp đó là cài Rails, chúng ta sẽ sử dụng lệnh **gem** được cung cấp bởi gói quản lý RubyGems:
```
gem install rails
```
Để kiểm tra xem đã cài thành công chưa bạn có thể dùng lệnh sau để kiểm tra:
```
➜  ~ rails -v
Rails 6.0.2.2
```

# Tạo ứng dụng bằng Rails

Tiếp nối truyền thống lâu đời trong lập trình, mục tiêu sau khi cài đặt xong môi trường thì chúng ta sẽ tạo 1 ứng dụng Hello World. Và lần này chúng ta sẽ tạo ứng dụng đó bằng Rails. Để tạo được 1 ứng dụng Rails thì Rails đã hỗ trợ chúng ta câu lệnh hết sức đơn giản đó là **rails new**.
Đầu tiên trước khi tạo ứng dụng thì tôi khuyên các bạn nên di chuyển đến thư mục dành riêng cho các ứng dụng thực hành. VD ở máy tôi:
```
➜  ~ cd Work 
➜  Work 
```
Sau khi đã di chuyển tới khu vực để thực hành thì chúng ta bắt đầu tạo ứng dụng đầu tiên thôi. Mình sẽ lấy tên ứng dụng là **hello_app**.
```
➜  Work rails new hello_app 
      create  
      create  README.md
      create  Rakefile
      create  .ruby-version
      create  config.ru
      create  .gitignore
      create  Gemfile
      .
      .
      .
      create  storage
      create  storage/.keep
      create  tmp/storage
      create  tmp/storage/.keep
      remove  config/initializers/cors.rb
      remove  config/initializers/new_framework_defaults_6_0.rb
         run  bundle install
         .
         .
         .
```
Sau khi chạy **rails new** chúng ta sẽ được kết quả như trên thì coi như đã thành công rồi. Chúng ta cùng ngó qua thành quả nhé, bạn chạy lệnh:
```
➜  Work cd hello_app 
➜  hello_app git:(master) ✗ open .
```
để vào xem thư mục có những gì nhé.

![](https://images.viblo.asia/984046e7-bc2c-4968-b978-82ba417a9061.png)

|Thư mục| Mục đích|
| - | - |
|app/ |	Phần lõi của ứng dụng nằm ở đây, nó bao gồm Models, Views, Controllers và Helpers|
|app/assets | Các tài nguyên của ứng dụng như là CSS file, JS file, ảnh |
|bin/ |	Các tệp tin nhị phân |
|config/ |	Cấu hình của ứng dụng |
|db/ |	Các file cơ sở dữ liệu |
|doc/ |	Tài liệu cho ứng dụng |
|lib/ |	Thư viện |
|lib/assets | Các tài nguyên của thư viện như là CSS file, JS file, ảnh  |
|log/ |	Các file nhật ký của ứng dụng |
|public/ |	Dữ liệu có thể truy cập công khai (ví dụ: qua trình duyệt web), chẳng hạn như các trang lỗi |
|test/ | Test của ứng dụng |
|tmp/ |	Các file tạm |
|vendor/ |	Code của bên thứ 3 |
|vendor/assets | Các tài nguyên của bên thứ 3 như là CSS file, JS file, ảnh |
|Gemfile |	Các gem được sử dụng cho app |
|Gemfile.lock |	Danh sách các gem được sử dụng để đảm bảo rằng tất cả các bản sao của ứng dụng sử dụng cùng một phiên bản gem |
|config.ru | Một tập tin cấu hình cho phần mềm trung gian Rack |
# Rails server
Sau khi đã tạo được ứng dụng, chúng ta sử dụng lệnh **rails server** để khởi động ứng dụng. Kết quả sẽ như nà:
```
➜  hello_app git:(master) ✗ rails s
=> Booting Puma
=> Rails 6.0.2.2 application starting in development 
=> Run `rails server --help` for more startup options
Puma starting in single mode...
* Version 3.12.4 (ruby 2.5.1-p57), codename: Llamas in Pajamas
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://localhost:3000
Use Ctrl-C to stop
```

![](https://images.viblo.asia/8b0d4171-95e2-4705-9d23-137355a5d59d.png)

# Model-View-Controller (MVC)
Ngay khi bắt đầu học về Rails chúng ta cũng cần nên biết qua về mô hình MVC để có 1 cách nhìn tổng quan về ứng dụng Rails hoạt động. Như hình minh hoạ:

![](https://images.viblo.asia/0cd16a96-6e84-4272-8269-48854bce6ee0.png)

Bạn có thể thấy rằng cấu trúc ứng dụng Rails có 1 thư mục **app/**, bao gồm ác thư mục con được gọi **models**, **views**, và **controllers**. Đây là một gợi ý rằng Rails luôn tuân thủ theo mô hình **model-view-controller (MVC)**, mô hình này giúp tách biệt giữa dữ liệu ứng dụng và code được sử dụng để hiển thị nó.

Khi tương tác với ứng dụng Rails, trình duyệt sẽ gửi 1 request, máy chủ web sẽ tiếp nhận và chuyển tới **controller** của ứng dụng Rails, nó sẽ chịu trách nhiệm về những việc sẽ làm tiếp theo. Trong 1 vài trường hợp, **controller** sẽ ngay lập tức render giao diện hiển thị thông qua **view**, **view** chứa các template để chuyển đổi sang HTML, **controller** lấy những HTML này gửi trả lại cho trình duyệt. Các trường hợp phổ biến hơn thì **controller** còn có thể lấy thông tin từ **model**, đó là đối tượng của Ruby chịu trách nhiệm giao tiếp với Cơ sở dữ liệu. Sau khi gọi **model**, **controller** sẽ đưa những thông tin này vào HTML thông qua **view** và gửi trả lại cho trình duyệt dưới dạng HTML.
# Hello World
Sau khi đã khởi động được ứng dụng và có cái nhìn tổng quan về cách thực hoạt động của Rails thì chúng ta tiếp tục với mục tiêu ban đầu đã đặt ra. Bạn vào đường dẫn *app/controllers/application_controller.rb* và thêm đoạn code như sau:
```
class ApplicationController < ActionController::Base
  def hello
      render html: "hello, world!"
  end
end
```
Như vậy khi gọi **action hello** bên trong **controller  ApplicationController** thì nó sẽ trả về 1 html có chứa đoạn text "hello, world!". Để cho điều hướng ngay khi vào trang web sẽ vào action này chúng ta config thêm 1 chút trong file **config/routes.rb**:
```
Rails.application.routes.draw do
  root 'application#hello'
end
```

Và đây là sau khi hoàn thành, chúng ta sử dụng Ctrl + C để dừng server và khởi động lại bằng **rails server**. Và đây là kết quả:

![](https://images.viblo.asia/1ffee074-50f2-4d15-98bb-36336c9f9b4f.png)

Mình xin kết thúc bài viết tại đây. Cảm ơn các bạn đã dành thời gian đọc bài viết này.
Link tham khảo:
- https://www.learnenough.com/ruby-on-rails-4th-edition-tutorial/beginning