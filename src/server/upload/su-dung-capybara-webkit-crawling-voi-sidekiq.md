Dự án mà tôi tham gia sử dụng `capybara webkit` để craw dữ liệu từ một trang khác về. Khi chạy test chức năng trên server local thì rất ổn không thấy có bất thường gì xảy ra. Kết hợp với sidekiq cũng không thấy vấn đề gì cả mọi thứ đều `ổn`. Mọi chuyện không như là mơ, khi đến tay tester thì cái quái gì thế này, sao chức năng này lại ko chạy được. Trong khi dev thì vẫn khẳng định code của mình chả sao local chả thấy vấn đề gì cả, thế là cả team lại tìm hiểu xem nguyên nhân từ đâu? Phải chăng lỗi chỉ xảy ra trên server staging, như thế thì khá đau đầu bởi vì không tái hiện được ở máy local thì việc sửa sao cho đúng cũng trở nên khó hơn rất nhiều. Hơn nữa, lại cứ phải vào server để đọc log xem lỗi như thế nào nguồn gốc từ đâu cũng khá mệt. Sau một hồi tìm tòi nghiên cứu thì team cũng đã tái hiện được chính lỗi đó trên local!

Để tái hiện được lỗi đó trên local thì cần cho nhiều job chạy một lúc, vậy là bạn dev khi làm chức năng chỉ test trường hợp có duy nhất 1 job chạy tại một thời điểm mà thôi. Như vậy khi làm với sidekiq các bạn cũng cần test thêm trường hợp cho nhiều job chạy để tránh bỏ qua những lỗi như thế này nhé!

Tái hiện được lỗi ở trên máy local thì mọi việc đã trở nên dễ dàng hơn rất nhiều rồi. Lỗi được xác định là khi chạy nhiều job để craw dữ liệu, mà phần craw dữ liệu dùng chung một `Capybara::Session`. Mỗi  lần chạy job thì Capybara::Session lại thay đổi `connection port` của `webkit_server làm`cho job chạy trước đó không thể kết nối đến `webkit_server` với port cũ được. Thật không hiểu tại sao `webkit server` lại thay đổi port liên tục như vậy. Một giải pháp được đưa ra là team cố gắng để config sao cho `connection port của webkit server` được giữ cố định nhưng cũng không khả thi.

Cuối cùng sau một thời gian tìm hiểu thì team cũng tìm được giải pháp là làm sao cho mỗi job chạy một session độc lập dùng một `webkit_server` độc lập như vậy sẽ không bị ảnh hưởng tới nhau.

```ruby
session = Capybara::Session.new(:webkit)
```

Như vậy giả sử ta có code ban đầu như sau
```
require "capybara/dsl"
class SideKiqJob
  include Capybara::DSL

  Capybara.run_server = false
  Capybara.default_driver = :webkit
  Capybara.javascript_driver = :webkit
  Capybara.app_host = "http://my_host.dev"

  def perform
    visit "/"
    fill_in "q", with: "hello world\n"
    ...
  end
end
```

Theo ý tưởng trên ta sẽ phải sửa lại code như sau
```
require "capybara/dsl"
class SideKiqJob
  include Capybara::DSL

  Capybara.run_server = false
  Capybara.default_driver = :webkit
  Capybara.javascript_driver = :webkit

  def perform
    session = Capybara::Session.new(:driver, MyRackApp) do |config|
      config.app_host = "http://my_host.dev"
    end

    session.visit "/"
    session.fill_in "q", with: "hello world\n"
    ...
  end
end
```
Bạn cần thay đổi tất cả những phương thức như `visit, fill_in ...` theo mặc định sẽ gọi từ `Capybara.page` thông qua việc `include Capybara::DSL` thì sẽ phải được gọi từ `session` (session.visit) để sử dụng session bạn vừa tạo ra.

Sau một hồi loay hoay sửa lại theo cách trên cuối cùng cũng chạy ngon test đi test lại không thấy lỗi lầm gì. Tuy nhiên có một vấn để nhỏ xảy ra là mỗi lần khởi tạo session như vậy đồng nghĩa với tạo ra một `webkit server` riêng, tuy nhiên đến khi chạy xong thì `webkit server` kia vẫn cứ hoạt động không bị dừng lại. Cũng may lỗi này cũng nhiều người bị tìm ra luôn. Một giải pháp đưa ra là bạn sẽ dừng `webkit server` đó một cách thủ công như sau

```
# Kill session's webkit-server after done
pid = session.driver.inspect.scan(/@pid=(\d+)/).flatten.first
`kill -9 #{pid}`
```

#### Tham khảo
1. [Capybara::Session](https://www.rubydoc.info/github/jnicklas/capybara/Capybara/Session)
2. [kill capybara session webkit server](https://stackoverflow.com/questions/24187912/how-to-close-webkit-server-in-capybara-webkit-when-running-inside-sidekiq/33110795)
3. [Use Capybara session with sidekiq](https://github.com/thoughtbot/capybara-webkit/issues/659#issuecomment-52270133)