## Lời mở đầu
Selenium được biết đến như một framework automation test mạnh mẽ và thông dụng nhất hiện nay. Sức mạnh của Selenium lớn đến nỗi từ một công cụ dành cho tester, nó đã thâm nhập vào thế giới của các developer, kẻ thù không đội trời chung của tester :rofl: Đúng vậy, với sự trợ giúp của Capybara, Cucumer, việc viết system test không còn quá khó khăn nữa. Nhờ khả năng điều khiển một brower như người thật, các developer còn sử dụng Selenium cho một số tác vụ automated khác, mà tiêu biểu là web crawling. Điều này đặt Selenium vào một vị trí khá thú vị, mỗi bên Developer và Tester nhìn nhận và sử dụng nó theo những cách khác nhau, và những sản phẩm phụ tạo ra hoàn toàn khác nhau.

Bài viết này hy vọng cung cấp một góc nhìn khác về việc sử dụng Selenium để mang lại sự thoải mái và tiện lợi nhất cho cả hai phía: Developer và Tester.

## 1. The starter kit
Để có thể so sánh cách làm, chúng ta bắt đầu với một ví dụ cơ bản nhất: Test màn hình chức năng đăng nhập. Ở đây tôi xin được lấy demo màn login page của CoreUI ([https://coreui.io/demo/3.2.0/login.html](https://coreui.io/demo/3.2.0/login.html))
![](https://images.viblo.asia/6e7fddca-db80-4f10-994a-67b8db96a9a4.png)

### Selenium và Ruby developer
Vì sức khỏe tinh thần của cả người đọc và người viết, mình xin phép được trình bày đoạn code sử dụng Capybara (tất nhiên selenium driver vẫn được sử dụng). Các công đoạn cài đặt và setting cũng xin được bỏ qua luôn, vì tại thời điểm viết bài Google vẫn chưa thu phí :wink: Và sau khi lược bỏ phần lớn công việc, chúng ta sẽ có một đoạn code kiểu như này:
```
require "capybara/rails"
require "capybara/dsl"

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.current_driver = :selenium_chrome
Capybara.app_host = "https://coreui.io"

class TestLogin
  include Capybara::DSL

  def perform
    visit "/demo/3.2.0/login.html"
    fill_in "Username", with: "example"
    fill_in "Password", with: "password"
    click_on "Login"
  end
end
```


### Selenium và Tester
Xin được lưu ý là người viết không phải là tester, nên các kiến thức ở phần này chỉ thuộc dạng ngây thơ và có thể đã outdated :monkey: Monkey see, Monkey do :monkey: Ta có thể cài Chrome extension Selenium IDE và dễ dàng giải quyết bài toán.
![](https://images.viblo.asia/32f2a7c5-0159-4dc9-8126-ebf3bee10c83.png)


## 2. The crossroad
Ta có thể thấy một bài toán đơn giản nhưng mỗi bên đều đã đưa ra một lời giải khác nhau, và thậm chỉ trông còn chẳng có vẻ gì liên quan đến nhau về mặt cấu trúc kĩ thuật, mặc dù cùng được xây dựng trên một nền tảng. Câu hỏi ở đây là liệu ta có thể kết hợp cả hai lời giải để tận dụng lợi thế của cả hai. Giải pháp thường thấy là xây dựng một hệ thống riêng cho các Tester chạy Selenium, nhưng hệ thống này thường khó tiếp cận đối với các Developer, hoặc ngược lại, các Developer sẽ đọc các file script trên IDE, rồi dịch lại theo ngôn ngữ lập trình của riêng họ, cách này khá tốn thời gian và thường chỉ khả thi với các test case không quá phức tạp hoặc đồ sộ.

Thật may là các nhà phát triển của Selenium đã nhìn ra được điều này và giới thiệu đến chúng ta công cụ `selenium-side-runner`. Tất cả những gì ta phải làm là export test case ra thành một file .side, chạy file đó và kiểm tra kết quả trả về.
![](https://images.viblo.asia/31602fe5-e4b2-4913-b685-92f732e33df0.png)

Cài đặt [selenium-side-runner](https://www.selenium.dev/selenium-ide/docs/en/introduction/command-line-runner) và chạy script và đọc kết quả:
```
`selenium-side-runner TestLogin.side --output-directory .`
logs = JSON.parse File.read("TestLogin.json")
```

Easy life!
![](https://images.viblo.asia/a240190b-e699-4db0-8714-ba223ed475bc.jpg)


## 3. Let's mix it up together, and crank it up to eleven!
Bởi vì phương pháp trên có vẻ quá dễ, và vì là một Developer, bạn phải làm cho mọi việc trông có vẻ phức tạp hơn, để tương xứng với công sức của các Tester đã bỏ ra viết test script, hoặc vì một lý do trên trời nào đó khiến cho việc cài đặt `selenium-side-runner` trên máy được, chưa kể đến việc chạy shell script trong code còn đưa đến nhiều side effect khó lường, không sao, bài viết sẽ cung cấp cho bạn giải pháp theo từng bước một:
1. Tải file extension Selenium IDE và cài đặt lên Chromedriver
Ta có thể làm tương tự như hướng dẫn ở [đây](https://dev.to/doctolib/loading-chrome-extensions-in-capybara-integration-tests-3880)
```
Capybara.register_driver :selenium_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_extension("selenium-ide.crx")
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end
```

2. Mở Selenium IDE và chạy file test script
```
    visit "chrome-extension://mooikfkahbdckldjjndioackbalphokd/index.html"
    find(".file-open input[type=file]", visible: false).set("TestLogin.side")
    find("button[aria-label='Run all tests']").click
```

3. Kiểm tra kết quả trên log in ra của Selenium IDE
```
    page.all(".logs li.log").map(&:text)
```

Ý tưởng ở đây là thay vì dùng Capybara để mô phỏng các hành động của con người, ta sử dụng nó để mô phỏng hành động của tester, đó là mở file test script lên và chạy, trong khi đó các tester sẽ chịu trách nhiệm trong việc xử lý mô phỏng hành động của con người trong các test case :dizzy_face:

## Lời kết
Với các mô hình lập trình Agile ngày càng phát triển, việc một Tester biết code hay một Developer nắm được các kĩ thuật tesing không còn là một điều quá lạ lẫm. Việc tìm kiếm và phát triển các công cụ trung hòa được quan điểm của hai vị trí này không còn là quá sớm hoặc quá viển vông nữa. Bản thân người viết cũng không có ý định khai phá hay mở đường gì hết, tất cả chỉ bắt đầu bằng việc khám phá và thử nghiệm các khả năng. Và cuối cùng, theo như tiêu đề của bài viết, just have some fun :wine_glass: