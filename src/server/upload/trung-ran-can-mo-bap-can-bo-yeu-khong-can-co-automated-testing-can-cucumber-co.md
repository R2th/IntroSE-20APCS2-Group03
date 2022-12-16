Nay Hà Nội gió mùa đông về, mình thì chùm chăn tránh rét sáng dậy lên Facebook thì toàn bọn khoe người yêu "Anh ơi gió đông cận kề, mau mau thu xếp mà về với em" đọc mà tức. Định đi ra ngoài đường lại sợ bọn nó lại phát "cơm tró" thôi lại chùm chăn tiếp, chợt nghĩ ra nay sắp deadline nên phải viết bài report không lại bay hai ngày lương thì thấy có lỗi với gia đình, tổ quốc lắm. Gần đây mình được tìm hiểu thằng Cucumber để viết testing automation cho dự án thế là mình pick luôn em này để viết luôn.

## BDD (Behavior Driven Development)

- BDD - Behavior Driven Development: là một quá trình phát triển phần mềm dựa trên Agile
- BDD là sự mở rộng của TDD - Test driven development: thay vì phát triển phần mềm theo hướng kiểm thử, BDD tập trung vào phát triển phần mềm theo hướng hành vi.
- Tức là dựa vào yêu cầu các kịch bản sẽ được viết trước dưới dạng ngôn ngữ tự nhiên và dễ hiểu nhất sau đó mới được thực hiện cài đặt source code để pass qua tất cả các kịch bản đó.
- Những kịch bản này được gọi là Scenario và được viết dưới dạng các feature file.

BDD cần phải có một ngôn ngữ có thể định nghĩa, trong một định dạng dễ hiểu để chúng ta có thể áp dụng BDD một cách hiệu quả nhất . Và Gherkin là ngôn ngữ sẽ làm việc này.
## Gherkin 

Gherkin là một loại cú pháp thường được sử dụng để mô tả các ví dụ, kịch bản trong BDD. Nó là một tập hợp các từ khóa đặc biệt để đưa ra cấu trúc, các hành vi thực hiện dựa trên ngôn ngữ tự nhiên. 

Các từ khóa của Gherkin có hỗ trợ nhiều loại ngôn ngữ khác nhau. 

  **Kịch bản này phục vụ hai mục đích chính:**

   1. Làm tài liệu kịch bản người dùng
   
   2. Viết một kiểm thử tự động (BDD)


Gherkin sử dụng một tập hợp các keywords đặc biệt để cung cấp cấu trúc và ý nghĩa cho các đặc tả thực thi. 

Các dòng trong tài liệu Gherkin đều bắt đầu bằng một trong các keywords.

Một số keywords được hay được sử dụng :
      
  * Feature: Là từ khóa chính đầu tiên trong tài liệu Gherkin để mô tả ngắn gọn tính năng phần mềm, nội dung mô tả sẽ được bỏ qua trong thời gian chạy nhưng vẫn được hiển thị trên báo cáo.
        
  * Rule: Rule là một từ khóa tùy chọn được dùng khi muốn bổ sung một số các luật cần tuân thủ trong một tính năng, nó là một phần mở rộng giúp cho tệp văn bản Gherkin trở nên chặt chẽ hơn.
        
  * Scenario: Một Scenario là một kịch bản chứa nhiều bước (steps) mô tả các bước hoạt động một phần chức năng của phần mềm.
 
     - Một scenario bao gồm nhiều step
     
     - Để tối ưu nhất thì mỗi scenario chỉ nên có từ 3-5 steps
     
     - Mỗi scenario là một đặc tả thực thi của hệ thống
     
     - Một scenario sẽ có các đặc tả sau:
        + Mô tả bối cảnh ban đầu (Given steps)
        + Mô tả sự kiện (When steps)
        + Mô tả kết quả mong đợi (Then steps)

        
   * Given, When, Then, And, But: Mỗi step được bắt đầu bởi các từ khóa: Given, When, Then, And, But. Nội dung theo sau mỗi từ khóa Given, When, Then, And, But không được giống nhau
     - Trong đó :
       + Given: Được sử dụng để mô tả một trạng thái đã biết trước khi người dùng bắt đầu tương tác với hệ thống.
       + When: Để mô tả hành động của người dùng tương tác với hệ thống
       + Then: Thể hiện sự mong đợi thu được sau khi thực hiện hành động.
       + And: Tương đương bạn sử dụng given When hoặc Then.

Các bạn có thể tham khảo thêm các từ khóa và các cú pháp Gherkin chi tiết hơn tại đây Gherkin [keywords](https://cucumber.io/docs/gherkin/reference/#keywords)

Đây là ví dụ mình dùng Gherkin để viết cho chức năng Login.


```
Feature: Login Action
  Scenario: Login with an user account
    Given the user navigates to the Login page
    When the user click on the Login button
    Then the require message is displayed for user
```

Dưới đây là một số notes để chúng ta tạo nên style và structure tốt

 1. Feature nên tập trung vào những gì khách hàng cần
        
 2. Một feature file chỉ nên chứa duy nhất một feature. Nó sẽ làm cho chúng ta dễ tìm kiếm feature hơn khi số lượng feature ngày một lớn lên
        
 3. Giới hạn số lượng scenarios cho mỗi feature, không ai muốn thấy cả nghìn line text cho một feature cả. Một con số tốt ở đây là 12 scenarios cho mỗi feature 
        
 4. Một scenario tốt nhất nên có số lượng step nhỏ hơn hoặc bằng 10.
        
 5. Để đảm bảo tính ngắn gọn dễ hiểu thì nên giới hạn số lượng kí tự cho mỗi step tầm từ 80-120 kí tự cho mỗi step.
        
 6. Sử dụng đúng chính tả.
        
 7. Đúng ngữ pháp rất quan trọng khi chúng ta viết scenario.
        
 8. Gherkin keywords phải được viết hoa.
        
 9. Chữ cái đầu tiên của title cũng phải được viết hoa.
        
 10. Không viết hoa những từ trong phần steps trừ khi chúng là danh từ riêng.
        
 11. Không sử dụng dấu ở cuối câu trong bất kỳ trường hợp nào.
        
 12. Chỉ sử dụng một space character giữa mỗi từ.
        
 13. Thụt lề khi chuyển sang những phần khác nhau trong cùng một feature file.
        
 14. Phân cách features và scenarios bằng 2 dòng trống.
        
 15. Phần cách data table example bằng 1 dòng trống.
        
 16. Các step trong một scenario không phân cách nhau bằng dòng trống.
        
 17. Phân cách những data trong bảng một cách rõ ràng bằng dấu  (“|”).
        
 18. Áp dụng một bộ tag được thống nhất và define trước cùng với team. Tránh sự trùng lặp và gây khó hiểu.
        
 19. Viết tag names bằng chữ in thường.
        
  20. Giới hạn độ dài của tag names.

## Cumcuber là gì ?

Cucumber, testing framework hỗ trợ BDD, cho phép người dùng định nghĩa hành vi hệ thống với ngữ nghĩa tiếng anh thông qua cú pháp Gherkin.

Cucumber hướng tới việc viết test “as cool as cucumber” mà bất kỳ ai cũng có thể hiểu cho dù họ không có chuyên môn kỹ thuật

**Ưu điểm:**

* Giúp cho các bên liên quan đến dự án (stakeholders,..) có thể theo dõi hoạt động test mà không cần kiến thức kĩ thuật chuyên môn.
* Tập trung vào trải nghiệm của người dùng cuối.
* Cho phép tester dễ dàng tái sử dụng lại code trong các trường hợp kiểm thử.
* Hỗ trợ hầu hết tất cả các ngôn ngữ phổ biến khác nhau như Java.net, JavaScript Ruby, PHP, v.v.
* Dễ cài đặt và sử dụng.

Các thành phần  của cucumber: 
 + Projects
 + Features
 + Scenarios
 + Steps
 + Steps Definitons
 + Automation code support
 + System

Các project Cucumber luôn có một thư mục con tại thư mục gốc (root) project tên "features"
=> Đây là nơi lưu trữ tất cả các features của projects.


 Để thực hiện Cucumber cần hai file để chạy :
1.  Feature(chứa các kịch bản được viết bằng ngôn ngữ tự nhiên), ngôn ngữ được sử dụng trong file feature là ngôn ngữ Gherkin.
2.  Step Definition:  ánh xạ các bước test case trong các file feature thành mã. Nó thực hiện các bước trên ung dụng đang thử nghiệm và kiểm tra kết quả so với kết quả dự kiến. Để thực hiện step definition, nó phải khớp với thành phần đã cho trong một file feature có thể viết bằng nhiều ngôn ngữ lập trình vd: Ruby, Java, Js.

**Luồng hoạt động :**

Cucumber hoạt động dựa trên cơ chế Example Mapping. Các tệp văn bản Gherkin được viết và lưu dưới định dạng file .feature và lưu trong thư mục features/ Khi thực hiện test với Cucumber, Cucumber sẽ được các file .feature trong thư mục features/ và tìm kiếm, thực hiện test lần lượt các steps đã được định nghĩa trong các tệp văn bản Gherkin.

Mỗi step được định nghĩa sẽ được match với một step definition thông qua các biểu thức (expressions) trong các file steps.* . Việc quản lý các step definitions hoàn toàn có thể được tạo trong cùng một file tuy nhiên nó sẽ làm khó khăn trong việc quản lý vì vậy ta thường chia step definations ra nhiều file dựa trên các chức năng hay các tác nhân khác nhau để thuận tiện hơn trong việc quản lý. Trong step definition ta sẽ định nghĩa cách thức hoạt động và assert các kết quả thu được để kiểm tra các step có hoạt động một cách chính xác hay không.

## Demo 

Dưới đây là demo với chức năng search một từ trên google ở đây mình dùng Ruby :

Mình sẽ tìm một từ nào đó trên google và mình cần test có thể nhìn thấy từ đồng nghĩa được hiển thị .

Mình sẽ định nghĩa file `google.feature` để viết gherkin trong đó:

```
Feature: Search for things on Google and see results.

Scenario: See related words when searching.
  When I search for "puppies"
  Then I should see "dog"


Scenario: Don't see unrelated words when searching.
  When I search for "dachshund"
  Then I should NOT see "fish"
```

Trong file  .`google_steps.rb`

```
When("I search for {string}") do |search_string|
    visit "/"
    fill_in "q", with: search_string
    find('.gNO89b').click
end

Then("I should see {string}") do |search_string|
  page.should have_content(string)
end

Then("I should NOT see {string}") do |search_string|
  page.should_not have_content(string)
end
```

Mình sẽ giải thích ở file này :

 **visit**, **fill_in**, **find** là các hàm của Capybara dùng để tương tác với trình duyệt, các bạn có thể tham khảo thêm các hàm tại [đây](https://github.com/teamcapybara/capybara#the-dsl).
 
 -`visit`:  với tham số truyền là url_path dùng dể redirect tới.
 
 -`fill_in`: tham số truyền nào có thể là name, ID của một element để fill vào.
 
 -`find`: tham số truyền vào là selector dùng để tìm phần tử đó.
 
 -`click`: thực hiện click vào một phần tử
 
 Mình cần một file config để có thể nhìn thấy tương tác trên trình duyệt.
 File `env.rb` mình đặt trong folder `support`
 
```
require "allure-cucumber"
require 'rspec' #for page.shoud etc
require 'capybara/cucumber'
require 'selenium-webdriver'
require 'pry'

#if you're accessing an internal app behind a firewall, you may not need the proxy. You can unset it like so:
#ENV['HTTP_PROXY'] = ENV['http_proxy'] = nil

#get IP of host which has 4444 mapped from other container
docker_ip = %x(/sbin/ip route|awk '/default/ { print $3 }').strip

Capybara.register_driver :remote_chrome do |app|
  Capybara::Selenium::Driver.new(app,
  :browser => :remote,
  :desired_capabilities => :chrome,
  :url => "http://#{docker_ip}:4444/wd/hub")
end

Capybara.configure do |config|
  config.run_server = false
  config.default_driver = :remote_chrome
  config.app_host = "https://google.com" # change this to point to your application
end

AllureCucumber.configure do |config|
  config.results_directory = "report/allure-results"
  config.clean_results_directory = true
end
```

Do mình chạy trên docker nên mình phải dùng tool VNC Viewer để có thể thấy tương tác trên brower.

Các bạn có thể cài ở link này : https://www.realvnc.com/en/connect/download/viewer/
Các bạn cần install docker để chạy nha.
Các bạn follow theo readme này để chạy [source code](https://github.com/phongvv-1613/cucumber-ruby)

Kết qủa :
![](https://images.viblo.asia/0471b2a1-76e4-443d-aec1-d29b0b23587d.gif)

## Kết luận : 

Trên đây là bài viết hướng dẫn cơ bản về Cucumber do mình mới tìm hiểu nên còn nhiều thiếu sót. Chúc mọi người có một ngày làm việc thật vui vẻ nha !!!