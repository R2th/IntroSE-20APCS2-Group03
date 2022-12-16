# Giới thiệu
Hiện nay việc hổ trợ ngày càng nhiều của các framework cũng như các thư viện hay plugin sẵn có đã trang bị có thể nói đến tận răng cho các lập trình viên. Thay vì phải viết từ đầu, việc sử dụng những phương tiện hỗ trợ có sẵn giúp đẩy nhanh rất nhiều về tốc độ. 

Cũng như những ngôn ngữ lập trình khác, Ruby cũng có rất nhiều thư viện cung cấp các chức năng đặc biệt mà người lập trình có thể sử dụng,  các thư viện này tổ chức theo từng chức năng riêng và được gọi là **Gem**. 

**Note:** Rails cũng là một Ruby Gem.

Trong bài viết này mình sẽ giới thiệu về những gem thông dụng, hữu ích và thường dùng trong quá trình phát triển 1 ứng dụng rails

# 1. Kiểm tra chất lượng code
Một trong những đặc tính cơ bản của code là chất lượng và đơn giản. Nó ảnh hưởng trực tiếp đến tốc độ và hiệu suất của một ứng dụng. Để kiểm tra, phát hiện các đoạn code cồng kềnh và refactor đúng cách, chúng ta sử dụng thư viện sau:

[Rubocop](https://github.com/rubocop-hq/rubocop) Nó là một công cụ để phân tích, phát hiện những đoạn code nào không theo đúng convention, hiểu đơn giản như kiểu kiểm tra chính tả vậy. Convention tham khảo thì xem ở [đây](https://github.com/CQBinh/ruby-style-guide/blob/master/README-viVN.md) . Ngoài ra `Rubocop` cho phép bạn `sửa các rule theo ý mình` trong file `rubocop.yml`. 

[Overcommit](https://github.com/sds/overcommit) dùng để quản lý và cấu hình Git hooks. Nó là công cụ tuyệt vời để đảm bảo chất lượng code tốt, nó sẽ chạy mỗi khi mình commit.

[Bundle audit](https://github.com/rubysec/bundler-audit) Kiểm tra các gem trong dự án sử dụng có bị lỗ hổng bảo mật nào không. 

[brakeman](https://github.com/presidentbeef/brakeman) Kiểm tra độ bảo mật của ứng dụng Ruby on Rails. Tránh bị những lỗi bảo mật như injection ...
# 2. Debug
[Pry](https://github.com/pry/pry) chắc hẵn bạn đã sử dụng `binding.pry` tuy nhiền, nó là 1 chức năng nhỏ của Gem pry mà thôi. Mình thấy chức năng này của nó rất là thuận tiện cho việc debug.

[Better Errors](https://github.com/BetterErrors/better_errors) dùng để hiện thị lỗi. Nó thay cho trang lỗi mặc định của Rails, hiển thị nhiều thông tin có ích hơn về lỗi.

[Byebug](https://github.com/deivid-rodriguez/byebug) dùng để debug cũng rất dễ dàng, nó cho phép tạm dừng một luồng đang chạy, thực thi từng dòng code, thay đổi giá trị các biến, `chỉ cần thêm byebug vào đoạn code muốn kiểm tra`, mở trang đó trên browser hoặc app, sau đó vào console đang chạy server, sẽ thấy nó đang dừng lại đúng đoạn code đặt byebug, gõ `next` để chạy dòng tiếp theo, `continue` để chạy đến đoạn byebug sau (nếu có), `break` để thoát khỏi tất cả byebug.

# 3. Testing
Sau quá trình phát triển sản phẩm, không thể thiếu được bước kiểm tra chất lượng sản phẩm từ phía dev, trước khi có sự tham gia của Tester, QA thì dev sẽ tiến hành viết Unit Test. Dưới đây là 1 số game hổ trợ cho việc viết test.


[Rspec](https://github.com/rspec/rspec) 
là gem không thể thiếu khi viết unit test, nó có giao diện trực quan và dễ viết hơn cách viết test mặc định của Rails, ngoài ra nó có thể kết hợp với các gem khác để test dễ dàng hơn. Cụ thể thì đã có rất nhiều bài nói về Rspec, mọi người có thể tìm đọc để hiểu thêm.

[Factory Bot](https://github.com/thoughtbot/factory_bot) 
dùng để tạo dữ liệu test cho các đối tượng trong Ruby và có cú pháp định nghĩa đơn giản.

[Faker](https://github.com/faker-ruby/faker) dùng để tạo ra dữ liệu ngẫu nhiên, các dữ liệu demo như là tên, địa chỉ, số điện thoại,... Khi muốn dùng đến thì chỉ cần gọi kiểu như Faker::Name.name

[Simplecov](https://github.com/colszowka/simplecov) là một công cụ hỗ trợ việc thống kê phần trăm coverage code của các Unit Test đã viết. Với giao giện dễ nhìn, nó sẽ show ra một kết quả bao quát, gồm có phần trăm hoàn thiện viết test của từng file, highlight màu khác nhau để phân biệt đoạn code đã viết test, đoạn code chưa viết test.

Về cơ bản dựa vào những 4 Gem này bạn đã thoả sức viết Unit test cho sản phầm của mình.

Ngoài ra còn một số Gem bạn có thể tham khảo thêm để sử dụng khi cần

[Database Cleaner](https://github.com/DatabaseCleaner/database_cleaner) Dọn dẹp DB test, tránh trường hợp bị fail do chồng chéo dữ liều

[Capybara](https://github.com/teamcapybara/capybara) giúp bạn test các ứng dụng web bằng cách mô phỏng kịch bản gồm nhiều bước người dùng tương tác với ứng dụng, như kiểu vào trang chủ, nhập thông tin đăng nhập và mật khẩu, ấn nút đăng nhập. Nó có thể chạy song song với Rspec.

[Capybara Screenshot](https://github.com/mattheworiordan/capybara-screenshot) được dùng cùng với `Capybara` và `Cucumber`, `Rspec` hoặc `Minitest` lưu lại ảnh chụp màn hình khi có lỗi xảy ra. 

[Parallel Tests](https://github.com/grosser/parallel_tests) giúp cho test được viết bằng `TestUnit`, `Rspec` và `Cucumber` chạy nhanh hơn khi nó chạy song song trên nhiều CPU. Nó chia test thành các nhóm, theo số dòng hoặc thời gian chạy, và chạy từng nhóm một với database test riêng. Gem này hỗ trợ cho Rails và các framework khác của Ruby.

[Shoulda Matchers ](https://github.com/thoughtbot/shoulda-matchers) dùng để viết test ngắn gọn và nhanh hơn, nó có sẵn test cho ActiveModel, ActiveRecord, ActionController.

[RSpec::Retry](https://github.com/NoRedInk/rspec-retry) đôi khi, khi ta viết test sẽ có những case mà thi thoảng nó lại bị tèo, và bạn muốn retry lại chính test case đó. có thể config số lần chạy lại test case

# 4. Deployment
[Capistrano](https://github.com/capistrano/capistrano)

[Mina](https://github.com/mina-deploy/mina)

Là 2 gem sử dụng phổ biến hỗ trợ đến tận răng cho Dev trong quá trình deploy. Sau khi config xong thì việc deploy chỉ là 1 nốt nhạc mà thôi 

Thông thường mình hay sử dụng Capistrano. Dưới đây có bài hướng dẫn deploy rails app lên EC2. Bạn có thể tham khảo tại [Deploy Rails app lên EC2](https://viblo.asia/p/huong-dan-deploy-ung-dung-ruby-on-rails-len-server-aws-ec2-su-dung-gem-capistrano-puma-va-nginx-Eb85oXDWK2G)

# 5. Authentication và Authorization
Ứng dụng nào đi nữa thì người dùng hệ thống luôn quan tâm đến vấn đề bảo mật. Để đảm bảo điều này, có thể dùng 1 số gem sau:

[Devise](https://github.com/plataformatec/devise) Authentication trong vài ba nốt nhạc. hỗ trợ tới tận răng mà hầu như ứng dụng rails nào cũng dùng đến.

[Ruby-JWT](https://github.com/jwt/ruby-jwt)  là thư viện triển khai theo tiêu chuẩn  [RFC 7519 OAuth JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519). Là một công cụ để kiểm tra xác thực người dùng, nó được coi là một trong những hệ thống truyền thông tin an toàn nhất giữa hai bên.

[CanCanCan](https://github.com/CanCanCommunity/cancancan) và [Pundit](https://github.com/varvet/pundit) là 2 gem dùng để authorization (phân quyền) vô cùng tiện lợi. cấu hình dễ dàng, sử dụng đơn giản.

Tobe continue...