Ngày nay, các nhà lập trình web có thể sử dụng các thư viện hay plugin sẵn có, thay vì phải viết từ đầu, cách này giúp đẩy nhanh rất nhiều về tốc độ. Ngôn ngữ Ruby cũng vậy, nó có rất nhiều thư viện cung cấp các chức năng đặc biệt mà người lập trình có thể sử dụng luôn gọi là gem. Trong bài viết này, chúng ta sẽ khám phá 40 gem vô cùng phổ biến, tiện ích và tác dụng cụ thể của chúng.
## Ruby gem - ẩn sau nó là gì?
Mỗi gem có một chức năng riêng, bao gồm các file liên quan đến chức năng đó. Bạn có thể tìm thấy giải pháp cho hầu hết các task của mình với Ruby gem, nó giúp tiết kiệm thời gian rất nhiều. Thư viện chứa các Gem là [RubyGems](https://rubygems.org/), và được quản lý bởi [gem bundler](https://bundler.io/), cả 2 đều rất dễ dàng cài đặt. Version đầu tiên của RubyGem được ra mắt vào năm 2004. 

Lợi thế của Ruby là nó có 1 cộng đồng lớn mạnh. Khi gặp một vấn đề mới, họ sẽ chủ động tìm giải pháp, sau đó chia sẻ nó dưới dạng một mã nguồn mở, để người khác cũng có thể sử dụng, đó là cái cách mà Ruby gem ra đời. Tính đếm thời điểm hiện tại, tổng số Ruby gem đã vượt quá con số 148,782 gem.
![](https://images.viblo.asia/dca365b3-0b1f-43a2-b9e3-dd7d2e76c902.jpg)
Một lượng giải pháp lớn như vậy, sẽ hạn chế được việc "phát minh lại bánh xe" mỗi khi gặp một vấn đề nào đó. Được truy cập miễn phí, nhiều chức năng viết sẵn, và bao gồm rất nhiều khía cạnh: từ đảm bảo chất lượng code cho đến deploy.
## Top Ruby gem
### Chất lượng code
Một trong những đặc tính cơ bản của code là chất lượng và tính đơn giản. Nó ảnh hưởng trực tiếp đến tốc độ và hiệu suất của một ứng dụng. Để khám phá, loại bỏ các đoạn code cồng kềnh và refactor đúng cách, chúng ta sử dụng hai thư viện.

* [Rubocop](https://github.com/rubocop-hq/rubocop): Gem này chắc ko còn xa lạ gì, vì mình thấy hầu như dự án nào cũng dùng. Nó là một công cụ để phân tích, phát hiện những đoạn code nào không theo đúng format được quy ước sẵn, hiểu đơn giản như kiểu kiểm tra chính tả vậy. Rule chuẩn thì xem ở [đây](https://github.com/rubocop-hq/ruby-style-guide) . Ngoài ra Rubocop cho phép bạn sửa các rule theo ý mình trong file rubocop.yml. Thông thường để kiểm tra rubocop, ta sẽ chạy lệnh `rubocop (tên file)` trong console, hoặc như trong Atom mình dùng thì có thể cài thêm Package để nó tự hiện thông báo lỗi mỗi khi mình save mà có lỗi rubocop. 

* [Overcommit](https://github.com/brigade/overcommit) dùng để quản lý và cấu hình [Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). Nó là công cụ tuyệt vời để đảm bảo chất lượng code tốt, nó sẽ chạy mỗi khi mình commit.

### Debugging
Dù lúc code chất lượng code có tốt đến đâu, vẫn không thể tránh khỏi có bug. Để tìm và loại bỏ lỗi, có một số gem sau:
* [Better Errors](https://github.com/BetterErrors/better_errors) dùng để hiện thị lỗi. Nó thay cho trang lỗi mặc định của Rails, hiển thị nhiều thông tin và có ích hơn về lỗi.
* [Byebug](https://github.com/deivid-rodriguez/byebug) là gem dùng để debug rất dễ dùng, nó cho phép tạm dừng một luồng đang chạy, thực thi từng dòng code, thay đổi giá trị các biến, chỉ cần thêm `byebug` vào đoạn code muốn kiểm tra, mở trang đó trên browser hoặc app, sau đó vào console đang chạy server, sẽ thấy nó đang dừng lại đúng đoạn code đặt byebug, gõ `next` để chạy dòng tiếp theo, `continue` để chạy đến đoạn byebug sau (nếu có), `break` để thoát khỏi tất cả byebug.

### Testing
Trong quá trình phát triển, không thể thiếu được bước kiểm tra chất lượng, hay ta còn gọi là test. Để chạy và quản lý test một cách trơn tru, có thể sử dụng các gem sau:
* [Rspec](https://github.com/rspec/rspec) là gem không thể thiếu khi viết unit test, nó có giao diện trực quan và dễ viết hơn cách viết test mặc định của Rails, ngoài ra nó có thể kết hợp với các gem khác để test dễ dàng hơn. Cụ thể thì đã có rất nhiều bài nói về Rspec, mọi người có thể tìm đọc để hiểu thêm.
* [Capybara](https://github.com/teamcapybara/capybara) giúp bạn test các ứng dụng web bằng cách mô phỏng kịch bản gồm nhiều bước người dùng tương tác với ứng dụng, như kiểu vào trang chủ, nhập thông tin đăng nhập và mật khẩu, ấn nút đăng nhập. Nó có thể chạy song song với Rspec. 
* [Capybara Screenshot](https://github.com/mattheworiordan/capybara-screenshot) được dùng cùng với Capybara và Cucumber, Rspec hoặc Minitest, nó cho phép bạn xem source code và tự động lưu lại ảnh chụp màn hình khi có lỗi xảy ra. Ảnh chụp màn hình cùng với file HTML bị lỗi được lưu vào `$APPLICATION_ROOT/tmp/capybara`. Điều này rất có lợi khi muốn nhanh chóng tìm ra trang bị lỗi.
* [Parallel_tests](https://github.com/grosser/parallel_tests) giúp cho test được viết bằng TestUnit, Rspec và Cucumber chạy nhanh hơn khi nó chạy song song trên nhiều CPU. Nó chia test thành các nhóm, theo số dòng hoặc thời gian chạy, và chạy từng nhóm một với database test riêng. Gem này hỗ trợ cho Rails và các framework khác của Ruby.
* [Factory Bot](https://github.com/thoughtbot/factory_bot) là thư viện để tạo dữ liệu test cho các đối tượng trong Ruby và có cú pháp định nghĩa đơn giản. 
* [Shoulda Matchers](https://github.com/thoughtbot/shoulda-matchers) dùng để viết test ngắn gọn và nhanh hơn, nó có sẵn test cho ActiveModel, ActiveRecord, ActionController, ta chỉ việc gọi đến,  ví dụ muốn test validate presence thì chỉ cần viết `it { should validate_presence_of(:name) }`.
* [Simplecov](https://github.com/colszowka/simplecov) giống như một công cụ thống kê phần trăm code bạn đã viết unit-tests. Gem này sẽ tự động tổng hợp tất cả các loại test và cho ra một kết quả bao quát, gồm có phần trăm hoàn thiện viết test của từng file, highlight màu khác nhau để phân biệt đoạn code đã viết test, đoạn code chưa viết test.
* [Database Cleaner](https://github.com/DatabaseCleaner/database_cleaner) dùng song song với Rspec, để dọn dẹp database khi test. Có thể điều chỉnh thời gian để dọn dẹp database: trước khi chạy test, trước hoặc sau khi chạy mỗi case test.
* [RSpec::Retry](https://github.com/NoRedInk/rspec-retry): đôi khi, khi ta viết test sẽ có những case mà thi thoảng nó lại bị chết, ví dụ như trong dự án của mình, có 1 case liên quan đến việc upload hình, nó sẽ generate ra 1 chuỗi kí tự, sau một khoảng thời gian ngắn lại generate ra một chuỗi khác, nên khi mạng chậm, đến bước so sánh chuỗi kí tự thì nó đã generate ra một chuỗi khác rồi, làm case này bị false, vậy thì ta có thể dùng gem này, nó có 1 options `:retry` để chạy lại case test nếu bị false. Ta có thể set cho nó số lần muốn chạy lại cho tới khi test thành công, ví dụ là
```
it 'should randomly succeed', :retry => 3 do
  expect(rand(2)).to eq(1)
end
```
* [Faker](https://github.com/stympy/faker) là thư viện để tạo ra ngẫu nhiên các dữ liệu demo như là tên, địa chỉ, số điện thoại,... Khi muốn dùng đến thì chỉ cần gọi kiểu như `Faker::Name.name`
### Deployment
Deployment là một bước rất quan trọng, có một thư viện sẽ giúp quá trình này trở nên trơn tru hơn
* [Mina](https://github.com/mina-deploy/mina) là công cụ tự động deploy, so với Capistrano tương tự thì nó nhanh hơn nhiều. Nó thực hiện kịch bản dưới dạng Bash script và chạy remote trong server. Trong khi Capistrano chạy mỗi lệnh trên các SSH session riêng của nó, Mina tạo một SSH cho cả phiên làm việc. Nó giảm thiểu thời gian kết nối SSH.
### Authentication và Authorization
Dù là trang web về thương mại điện tử hay giáo dục thì việc bảo vệ dữ liệu người dùng luôn được đặt lên hàng đầu. Để đảm bảo điều này, có thể dùng 1 số gem sau:
* [Devise](https://github.com/plataformatec/devise) là giải pháp xác thực linh hoạt dành cho Rails, theo mô hình MVC, cho phép bạn thiết lập nhiều kiểu đăng nhập cùng một lúc, bao gồm 10 module mà bạn có thể chỉ dùng những cái nào bạn cần, ví dụ như:

    [Database Authenticatable](https://www.rubydoc.info/github/plataformatec/devise/master/Devise/Models/DatabaseAuthenticatable): mã hóa và lưu trữ mật khẩu trong database và xác thực khi đăng nhập.

    [Confirmable](https://www.rubydoc.info/github/plataformatec/devise/master/Devise/Models/Confirmable): gửi email cùng thông tin và link confirm sau khi đăng ký tài khoản

    [Recoverable](https://www.rubydoc.info/github/plataformatec/devise/master/Devise/Models/Recoverable): đặt lại mật khẩu (trong trường hợp quên mật khẩu) và gửi email với thông tin và link để đặt lại mật khẩu.

    [Rememberable](http://www.rubydoc.info/github/plataformatec/devise/master/Devise/Models/Rememberable): quản lý việc sinh ra và xóa token từ cookie để tự động đăng nhập.
* [CanCanCan](https://github.com/CanCanCommunity/cancancan) là gem dùng để authorization (phân quyền) vô cùng tiện lợi dùng cho Ruby 2.2 trở lên và Rails 4.2 trở lên. Nó có thể tạo và quản lý quyền của các loại người dùng khác nhau, file ability.rb trong model chứa các thông tin về quyền của từng nhóm người dùng. Có thể gọi các hàm được support sẵn để kiểm tra quyền trong cả controller, view. Trong view, ta có thể dùng `can?` và `cannot?` để kiểm tra xem đối tượng truyền vào có được quyền thực hiện hành động không, ví dụ như `can? :update, @object`. Trong controller, tương tự có hàm `authorize!`, hoặc là `load_and_authorize_resource` để kiểm tra authorization cho từng hàm trong class này.
* [OmniAuth](https://github.com/omniauth/omniauth) dùng để đăng kí, đăng nhập bằng tài khoản ở các mạng xã hội như kiểu Facebook, Google,... Gem này thì đã có sẵn 1 danh sách các bên thứ 3 mà có thể dùng để xác thực tài khoản. Khi muốn đăng nhập bằng bên thứ 3 nào, ta sẽ phải khai báo nó cùng với các loại key trong file `config/initializers/omniauth.rb` kiểu như `provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']`

*Còn tiếp...*

Nguồn tham khảo:  https://medium.com/codica/40-best-ruby-gems-we-cant-live-without-8ccf314fcd38