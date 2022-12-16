Ở phần này mình xin giới thiệu cách cài đặt các gem và các phần mềm hỗ trợ.
## 1. Cài đặt Capybara 
Thêm capybara vào `Gemfile` và chạy `bundle`

```
gem 'capybara'
```

Với Rails app thì cần thêm dòng dưới đây vào test helper:
```
require 'capybara/rails'
```

Và thêm dòng này vào spec_helper.rb:
```
require 'capybara/rspec'
```


## 2. Cài Selenium với ChromeDriver
### Bước 1: Chuẩn bị
Trước tiên chúng ta cài đặt Xvfb (X virtual framebuffer), một máy chủ hiển thị chạy trong bộ nhớ.

```
$ sudo apt-get update
$ sudo apt-get install -y unzip xvfb libxi6 libgconf-2-4
```

### Bước 2: Cài đặt Google Chrome
```
$ sudo curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
$ sudo echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
$ sudo apt-get -y update
$ sudo apt-get -y install google-chrome-stable
```

### Bước 3: Cài đặt ChromeDriver
Bạn bắt buộc phải cài ChromeDriver cho hệ thống. ChromeDriver  là máy chủ độc lập triển khai giao thức WebDriver’s wire protocol cho Chromium. WebDriver là một công cụ mã nguồn mở để thực hiện test tự động trên nhiều trình duyệt khác nhau.
```
$ wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip
$ unzip chromedriver_linux64.zip
```
Sau khi down ChromeDriver về thì cần cấu hình nó trên máy:
```
sudo mv chromedriver /usr/bin/chromedriver
sudo chown root:root /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver
```

### Bước 4: Download Required Jar Files
Selenium server được yêu cầu để chạy Remote Selenium WebDrivers. Bạn cần tải xuống file jar máy chủ độc lập của Selenium bằng cách sử dụng các lệnh dưới đây hoặc truy cập vào đây để tìm phiên bản file Jar mới nhất.
```
$ wget https://selenium-release.storage.googleapis.com/3.13/selenium-server-standalone-3.13.0.jar
```

### Bước 5: Khởi động Chrome qua Selenium Server

```
$ xvfb-run java -Dwebdriver.chrome.driver=/usr/bin/chromedriver -jar selenium-server-standalone.jar
```
Thêm `-debug` vào cuối câu lệnh để bật chế độ debug
Bạn cũng có thể khởi động Headless ChromeDriver bằng câu lệnh sau"
```
chromedriver --url-base=/wd/hub
```

## 3. Config capybara, selenium và chrome-driver
Add thêm gem trong group `test` và chạy bundle
```
group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
end
```

Thêm config trong `spec_helper.rb`:
```
Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :chrome

Capybara.configure do |config|
  config.default_max_wait_time = 10 # seconds
  config.default_driver        = :selenium
end
```

Có thể điều chỉnh độ rộng của cửa sổ trình duyệt được bật lên:
```
RSpec.configure do |config|
  config.before(:each, type: :feature) do
    Capybara.current_session.driver.browser.manage.window.resize_to(2_500, 2_500)
  end
end
```
  
Phần sau mình sẽ viết các kịch bản test cụ thể cho một số trường hợp hay được sử dụng như login, nhập form đơn giản hay phức tạp hơn như gửi mail...

## Nguồn
https://github.com/teamcapybara/capybara
https://www.rubydoc.info/gems/selenium-webdriver/2.53.4
https://mikecoutermarsh.com/rails-capybara-selenium-chrome-driver-setup/
https://tecadmin.net/setup-selenium-chromedriver-on-ubuntu/