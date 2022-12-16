**Selenium là gì?** 
* Selenium là công cụ kiểm thử tự động miễn phí ( trên mã nguồn mở) Dành cho các ứng dụng web trên các trình duyệt và các nền tảng khác nhau. 
* Selenium chỉ tập chung vào việc tự động hóa các ứng dụng dựa trên Web. 
* Selenium không chỉ là công cụ duy nhất mà là một bộ phận phần mềm , mỗi bộ phận phục vụ cho các nhu cầu kiểm thử khác nhau của tổ chức. Nó gồm 4 phần

* Môi trường phát triển tích hợp Selenium (IDE)
* Selenium Remote Control
* WebDriver (Phần ví dụ phía dưới mình sẽ dùng cái này)
* Selenium Grid

![](https://images.viblo.asia/000fb708-b0dd-4924-9350-8f088ce40520.jpg)

Trong phạm vi bài viết này mình chỉ tìm hiểu về `Selenium WebDriver` thôi nhé.

**Selenium webdriver là gì?**

Selenium WebDriver( gọi tắt là WebDriver)  là 1 automation framework của web , cho phép thực thi các test của bạn đối với các trình duyệt khác nhau, không chỉ Firefox, Chrome (nó không giống như Selenium IDE).

WebDriver cũng cho phép bạn sử dụng các ngôn ngữ lập trình trong việc tạo test script của bạn.

Bạn có thể sử dụng conditional operations như if- else hay là switch-case hoặc vòng lặp do-while.

WebDriver hỗ trợ nhiều ngôn ngữ lập trình khác nhau như Java, .Net, PHP, Python, Perl, Ruby. 
Không nhất thiết bạn phải am hiểu tất cả các ngôn ngữ trên nhưng để sử dụng WebDriver 1 cách hiệu quả hơn, bạn nên biết ít nhất một trong số những ngôn ngữ trên.

Trên đây là khái niệm sơ qua về selenium. Nếu bạn muốn tìm hiểu kỹ có thể vào [trang chủ](https://www.selenium.dev/projects/) của nó để đọc kỹ hơn nhé.

**Cucumber là gì?**

* Cucumber dịch từ tiếng anh sang là quả dưa chuột mà mấy chị em phụ nữ rất thích (:troll)
* Cucumber là công cụ test tự động, chính xác hơn là công cụ để viết BDD
* Cucumber được viết dưới dạng plain text language gọi là Gherkin.
* Phần mở rộng của Gherkin là *.feature

**Tìm hiểu về cú pháp Gherkin**

Cú pháp gherkin chia thành 3 thành phần chính là Feature, Scenario và step

* Mỗi file gồm một Feature
* Mỗi Feature gồm nhiều Scenario, bắt đầu bằng từ khóa “Feature:”. Mỗi Feature là 1 chức năng
* Mỗi Scenario gồm nhiều step, bắt đầu bằng từ khóa “Scenario:”. Mỗi Scenario là một testcase.
* Mỗi step sẽ bắt đầu bằng các keyword như Given, When, Then, But hoặc And

Cucumber không phân biệt các step. Tuy nhiên nên viết theo đúng mặt ngữ nghĩa để dễ dàng đọc hiểu.

* “Given”: Mô tả ngữ cảnh ban đầu của hệ thống
* “When”: Mô tả hành vi
* “Then”: Mô tả kết quả
* “And”, “But”: Kết hợp nhiều step giống nhau.

OK lý thuyết như vậy đủ rồi. Tiếp theo mình sẽ làm một demo nhỏ nhé.

**Chuẩn bị**
1. Tải và cài đặt

| Items | URL |
| -------- | -------- |
| VS Code  |https://code.visualstudio.com/download 
| Web Driver  |[Chrome]https://chromedriver.chromium.org/ 
| Ruby  |[Linux/MacOS] Install GPG
|   |Linux: sudo apt install gnupg
|   |MacOS: Install RVM: https://rvm.io/rvm/install

2. Cài đặt Web Driver(for Linux)

Copy `chromedriver` vào thư mục  /usr/local/bin/.
```
sudo mv chromedriver /usr/local/bin/
```

3. Cài đặt gem

gem install cucumber

gem install gherkin

gem install selenium-webdriver

gem install rspec

**Bắt đầu thôi nào**
Mình sẽ làm 1 demo đơn giản như sau: 

Mở trình duyệt lên -> vào google.com -> nhập sun * enter -> click vào link dẫn đến trang https://sun-asterisk.vn/

1. Tạo mới 1 Project

* Tạo thư mục cho project (tên gì tùy bạn nhé). Sau đó chạy lệnh
```
cucumber --init
```
![](https://images.viblo.asia/8da984c2-5ce6-4cc1-b7a0-3141f9c2c4ba.png)


* Ok sau khi init project thành công gõ lệnh code . để mở VScode lên nhé.
Lúc này cấu trúc cây thư mục sẽ như hình dưới:
![](https://images.viblo.asia/409bc2a9-db6e-4b90-9f4b-79c5900b029e.png)

2. Viết kịch bản test bằng Gherkin

* Tạo một file tên là searching.feature trong thư mục features
![](https://images.viblo.asia/5b71d811-0a54-4070-b21c-d484b5e423eb.png)

```
@SearchingGoogle
Feature: Searching Google

@sun @smoke
Scenario:  User want to search a sun-asterisk
Given User open google.com
Then User type the keyword "sun *"
Then User want to check result search
Then User want to open sun-asterisk.vn
```

3. Cài đặt automation
**support/env.rb**
```
require "selenium-webdriver"
require "rspec/expectations"
require "test/unit/assertions"
```

**Note:*

require sử dụng để gọi gến thư viện của các gem mà mình đã cài đặt. Giúp cho ta có thể sử dụng đc cái automation methods trong code của mình.

**support/hook.rb**
```
Before do
  $browser = Selenium::WebDriver.for:chrome
end

After do
 $browser.quit
end
```

**Note:**
* Tất cả câu lệnh trong Before block sẽ được thực thi trước khi automation step được thực thi.
* Tất cả câu lệnh trong After block sẽ được thực thi sau khi automation step được thực thi.
* `Selenium::WebDriver.for:chrome` sẽ chạy Google Chrome browser thông qua chromedriver. Lưu ý version của trình duyệt và driver phải giống nhau nhé.

**support/screen_action.rb**

```
def scroll_up
  $browser.execute_script("window.scrollTo(0, 0)")
end

def scroll_down
  $browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
end

def maximize_browser
  $browser.manage.window.maximize
end

def minimize_browser
  $browser.manage.window.minimize
end

def open_url(url)
  $browser.navigate.to url
end
```

4. Tạo pages

Tạo thư mục pages trong thư mục features với 2 file là home_page.rb và search_page.rb

**home_page.rb**

```
$search_field = "q"
$google_search_btn = "btnK"
$im_feeling_lucky_btn = "btnI"
$sun_link = ".//h3[contains(text(),'Trang chủ - Sun* Inc. Tuyển Dụng')]"

def input_home_search_field(keyword)
  $browser.find_element(:name, $search_field).send_keys(keyword)
end

def clear_home_search_field
  $browser.find_element(:name, $search_field).clear
end

def submit_home_search_field
  $browser.find_element(:name, $search_field).submit
end

def tap_google_search_btn
  $browser.find_element(:name, $google_search_btn).click
end

def tap_im_feeling_lucky_btn
  $browser.find_element(:name, $im_feeling_lucky_btn).click
end

def check_search_result
  url = $browser.current_url
  expect(url).to include("sun+*")
end

def open_sun_asterisk
  $browser.find_element(:xpath, $sun_link).click
end
```

**search_page.rb**

```
$search_field = "q"

def input_search_field(keyword)
  $browser.find_element(:name, $search_field).send_keys(keyword)
end

def clear_search_field
  $browser.find_element(:name, $search_field).clear
end
```

5. Định nghĩa các bước sẽ chạy test case

Tạo file searching_step.rb trong thư mục step_definitions

**searching_step.rb**

```
require_relative "../support/screen_action.rb"

Given("User open google.com") do
    maximize_browser()
    open_url("https://google.com")
    sleep(2)
  end

  Then("User type the keyword {string}") do |keyword|
    input_home_search_field(keyword)
    sleep(2)
    submit_home_search_field
  end

  Then("User want to check result search") do
    check_search_result
    sleep(2)
  end

  Then("User want to open sun-asterisk.vn") do
    sleep(2)
    open_sun_asterisk
    sleep(2)
  end
```

Ok như vậy đã xong bây giờ muốn chạy test case chúng ta chỉ cần gõ lệnh
```
cucumber
```

Kết quả chạy sẽ như hình phía dưới

![](https://images.viblo.asia/a9ca7408-d313-453d-b5e9-26cf1c2db346.gif)

![](https://images.viblo.asia/bedd23a0-9fb4-43db-ab6d-80cd6c319473.png)

Ok ! cám ơn bạn đã học hết bài viết của mình nhé.

Tài liệu tham khảo: 
https://cucumber.io/

https://seleniumcucumber.info/selenium-cucumber/

https://github.com/selenium-cucumber/selenium-cucumber-ruby