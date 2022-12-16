# 1. Mở đầu
Chào tất cả mọi người, cũng đã được một thời gian rồi mình mới có dịp quay lại Ruby on Rails, và thử sức với một dự án sử dụng Rails 6, cũng có có khá nhiều điểm khác nhau giữa rails 5 và rails 6. Hôm nay mình xin nói một tính năng mới mà mình vừa tìm hiểu đó là Webpacker.
Bắt đầu với Rails 6, Webpacker là một compiler mặc định trong javascript. Nghĩa là tất cả code JavaScript sẽ được xử lý bởi Webpacker thay vì Asset Pipeline như trong rails 5. Về asset pipeline mình xin phép được trình bày trong một bài viết khác . Trong phạm vi bài viết này, chúng ta sẽ cùng tìm hiểu về cách tổ chức và hoạt động của Webpacker trong Ruby on Rails 6.

# 2. Webpacker là gì?
Nói cho đơn giản thì nó là một ruby gem được sử dụng để quản lý và đóng gói các đoạn code javascript. Khi tạo một application trên rails 6 thì mình sẽ nhìn thấy như bên dưới:
```
RAILS_ENV=development environment is not defined in config/webpacker.yml, falling back to production environment
      create  config/webpacker.yml
Copying webpack core config
      create  config/webpack
      create  config/webpack/development.js
      create  config/webpack/environment.js
      create  config/webpack/production.js
      create  config/webpack/test.js
```
Bạn cũng sẽ nhìn thấy gem webpacker trong Gemfile. Đối với trường hợp sử dụng Rails 5 để update lên rails 6, Gem webpaker sẽ không tự động có sẵn trong Gemfile. Trong trường hợp này bạn sẽ tự đưa nó vào trong Gemfile và chạy câu lệnh: rails webpacker:install

# Nơi lưu trữ mới cho javascrip code
Đối với các phiên bản Rails trước Rails 6, tất cả các đoạn code javascript được lưu trữ trong app/assets/javascripts. Nhưng trong rails 6 đã không còn tồn tại đường dẫn này. Thay vào đó, một nơi lưu trữ mới được tạo ra tại: app/javascripts. thư mục này để lưu trữ tất cả các mã JavaScript. Ok chúng ta sẽ xem về cấu trúc của thư mục này: 
![](https://images.viblo.asia/f8103cf6-4ede-4391-a1a3-bc9b305b4131.png)
Trong thư mục này chia làm hai thư mục con: Thư mục chanels và packs, thư mục channels được sử dụng để lưu trữ code javascript cho Action Cable. Tạm thời mình sẽ bỏ ra phần này. Mình đi vào phần vào trọng nhất đó là thư mục packs. Khi mở file application.js ra trong thư mục packs, chúng ta sẽ nhìn thấy:
![](https://images.viblo.asia/8da6bfec-fae3-4f53-8f82-d5a919c70166.png)
File application.js này nó sẽ tương đương với file application.js ở trong thư mục app/assets/javascripts ở trong các phiên bản rails trước. Khi bắt đầu biên dịch javascript, nó sẽ tìm các file javascript ở trong folder packs này và tiến hành biên dịch. Mặc định file application này chứa code liên quan đến các thành phần Rails như turbolinks, Active Storage và Action Cable. Bạn sẽ thấy tất cả các tính năng của Ruby on Rails có liên quan tới javascript đều được hỗ trợ trong Webpacker. Kể cả một tính năng mới trong rails 6 như là Action Text cũng được hỗ trỡ trong Webpacker. Tóm lại bạn có thể tạo các file javascript và đặt trong thư mục "app/javascript/packs" để Webpaker có thể tìm và biên dịch.

#   Config Webpacker.yml
  Theo mặc định, webpacker cung cấp các quy ước đơn giản cho nơi các tệp ứng dụng javascript và các gói webpack được biên dịch sẽ đi trong ứng dụng rails của bạn, nhưng tất cả các tùy chọn này đều có thể định cấu hình từ file config/webpacker.yml.
   Cấu hình cho những gì Webpack được cho là biên dịch theo mặc định dựa trên quy ước rằng mọi tệp trong **app/javascript/packs/**  hoặc bất kỳ đường dẫn nào bạn đặt source_entry_path trong webpacker.yml.
   
   Giả sử bạn muốn thay đổi thư mục nguồn từ app/javascript đến frontend và đầu ra thành assets/packs. Mình có thể làm như sau:
    ![](https://images.viblo.asia/95105864-d0ad-4a85-90b7-d37ddb17d731.png)
  Tương tự, bạn cũng có thể kiểm soát và config lại môi trường  webpack-dev-server ở trong webpacker.ym :
  ![](https://images.viblo.asia/f765961f-25e0-49af-949a-98953614c190.png)

# Including the JavaScript code in the app
Vậy làm thế nào để sử dụng các file javascript khi bạn đã đặt chúng vào app/javascript/packs. Rất đơn giản, Webpacker đã cung cấp cho chúng ta method là javascript_pack_tag, method cũng giống như method javascript_link_tag ở trong rails 5, method này sẽ đảm bảo ứng dụng sẽ gọi đến đúng file javascript mà bạn đã cung cấp. 
![](https://images.viblo.asia/24ccffb5-6967-4e53-8538-c05b362ac2a9.png)

# Tích hợp Webpacker với React, Angular và Vue
Webpacker cung cấp khả năng tích hợp với các framwork khác của js như   React, Angular, Vue,... Bạn có thể xem danh sách các lệnh / tác vụ khả dụng bằng cách chạy **bundle exec rails webpacker**
Trước khi tích mình cần chắc chắn rằng đã cài đặt Yarn 0.25.2+.
## React
 Để sử dụng Webpacker với  React, khi tạo ứng dụng rails các bạn thêm một option như sau: 
    `rails new myapp --webpack=react`

Trong trường hợp mình đã có một rails application và muốn tích hợp React, thì các bạn sẽ chạy câu lệnh:
 `bundle exec rails webpacker:install:react`
Rails sẽ cài đặt tất cả các thành phần phụ thuộc thông qua Yarn, các React Component cho dự án cộng thêm một ví dụ nhỏ về React được cập nhật tại** app/javascript/packs**  và bạn có thể sử dụng React ngay bây giờ.
## Angular with TypeScript
     Tương tự như React, để sử dụng Webpacker với  Angular khi tạo ứng dụng rails các bạn thêm một option như bên dưới: 
    `rails new myapp --webpack=angular`

Trong trường hợp mình đã có một rails application và muốn tích hợp React, thì mình sẽ chạy câu lệnh:
 `bundle exec rails webpacker:install:angular`
 
Lúc này, rrình cài đặt sẽ thêm các thư viện của TypeScript và Angular thông qua Yarn với các sự thay đổi trong phần config. Một ví dụ được viết bằng TypeScript cũng sẽ được thêm vào dự án của bạn app/javascript để bạn có thể test và sử dụng Angular.
## VueJS
 Đối với VueJS thì mình cũng làm tương tự
    `rails new myapp --webpack=vue`
  Tích hợp VueJS với ứng dụng Rails đã có sẵn
     `bundle exec rails webpacker:install:vue`
        
# Tổng kết
Tóm lại, bài viết này đã giới thiệu tổng quan về Webpacker, Rails 6 đã tích hợp nó như thế nào và cách sử dụng javascript trong Ruby on Rails 6. Bài viết dựa trên những hiểu biết của cá nhân mình về Webpacker. Nếu còn thiếu xót mong mọi người góp ý để bài viết được hoàn thiện! Cảm ơn mọi người đã đọc.

Bài viết được tham khảo từ: https://prathamesh.tech/2019/08/26/understanding-webpacker-in-rails-6/