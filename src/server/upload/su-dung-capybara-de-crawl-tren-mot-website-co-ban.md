#### 1. Add Gem
- Ta cần thêm 2 gem vào trong Gemfile:<br>
```ruby
gem "capybara"
gem "capybara-webkit"
gem "headless" (nó cho phép tạo ra một màn hình trực tiếp từ mã Ruby với nhiều mục đích khác nhau như bạn có thể ghi lại các ảnh chụp màn hình hoặc video khi bạn cần)
```
- Trước khi chạy bundle ta cần chạy lệnh:
<br>
```ruby
sudo apt-get install qt5-default libqt5webkit5-dev gstreamer1.0-plugins-base gstreamer1.0-tools gstreamer1.0-x
```
và<br>
```ruby
sudo apt-get install xvfb
```
để 2 gem capybara-webkit và headless có thể hoạt động được.
<br>( bạn có thể tham khảo thêm tại đây: [Gem Headless](https://github.com/leonid-shevtsov/headless) và [Capybara-webkit](https://github.com/thoughtbot/capybara-webkit) )
#### 2. Tiến hành crawl từ một website về
- Ta cần config cho capybara-webkit hoạt động được bằng cách tạo 1 file trong thư mục initializers của mục config `/config/initializers/capybara_webkit_config.rb` :
```ruby
Capybara::Webkit.configure do |config|
  config.debug = false
  config.block_unknown_urls
  config.allow_unknown_urls
  config.timeout = 30
  config.ignore_ssl_errors
  config.skip_image_loading
end
```
- Bây giờ, ta tiến hành tạo 1 services cho việc crawl từ một website về<br>
Ở đây, mình ví dụ với trang https://viblo.asia/<br>
- Đầu tiên, ta cần `require "capybara/dsl"` và include DSL của capybara vào để có thể sử dụng được các method như `visit`, `all`, `within`,... của capybara ( bạn có thể tham khảo về công dụng của các method đó tại đây [Capybara](https://github.com/teamcapybara/capybara) )<br>
- Tiếp theo, đối với `current_driver` (trả về tên trình điều khiển đang được sử dụng) là chọn `webkit`(vì chúng ta đang sử dụng gem capybara-webkit mà :D), ngoài ra chúng ta còn có thể sử dụng cái khác như `selenium` (bạn có thể tìm hiểu thêm vể gem selenium tại đây [gem selenium](https://github.com/SeleniumHQ/selenium/tree/master/rb))

```ruby
require "capybara/dsl"

class CrawlPost
  include Capybara::DSL

  Capybara.current_driver = :webkit
end
```
- Tiếp đến, ta sẽ tiến hành truy cập vào viblo trên terminal bằng cách sau:
```ruby
def crawl_post_trending
  headless = Headless.new
  headless.start
  Capybara.app_host = "https://viblo.asia/"
  visit "https://viblo.asia/trending"
end
```
- Trong method `crawl_post_trending` bên trên, đầu tiên ta cần khởi động Headless lên bằng cách tạo một biến `headless = Headless.new` r bật nó lên bằng cách headless.start để có thể truy cập vào một website trên terminal (nó sẽ hiển thị website dưới dạng html trên terminal).<br>
- Tiếp đến app_host sẽ là https://viblo.asia/ (vì mình đang muốn crawl một bài viết của trang).<br>
- Sử dụng method `visit` để có thể đi đến bất kì đâu trong website viblo, ở đây mình sẽ đi đến trang trending của viblo.
- Ví dụ mình muốn crawl bài viết đầu tiên trong trang trending, ta sẽ thêm một dòng lệnh sau:
<br>`first('.post-title--inline > h3 > a').click` vào method `crawl_post_trending` trên
```ruby
def crawl_post_trending
  headless = Headless.new
  headless.start
  Capybara.app_host = "https://viblo.asia/"
  visit "https://viblo.asia/trending"
  first('.post-title--inline > h3 > a').click
end
```
- Tiếp tục, để lấy title của bài viết ta sẽ thêm vào dòng code sau vào method:
`page.find(".article-content__title").text`
- Lấy content của bài viết ta cần chỉ cần thêm: `page.find(".article-content__body").text` vào nữa là xong.
```ruby
def crawl_post_trending
  headless = Headless.new
  headless.start
  Capybara.app_host = "https://viblo.asia/"
  visit "https://viblo.asia/trending"
  first('.post-title--inline > h3 > a').click
  title = page.find(".article-content__title").text
  content = page.find(".article-content__body").text
  Post.create title: title, content: content #nếu muốn lưu lại bài viết vào trong DB
end
```
Mỗi lần sử dụng service này chúng ta nên tiến hành stop Headless và reset lại session của Capybara đi để tránh tình trạng lỗi bằng cách sau:
```ruby
def crawl_post_trending
  headless = Headless.new
  headless.start
  Capybara.app_host = "https://viblo.asia/"
  visit "https://viblo.asia/trending"
  first('.post-title--inline > h3 > a').click
  title = page.find(".article-content__title").text
  content = page.find(".article-content__body").text
  Post.create title: title, content: content #nếu muốn lưu lại bài viết vào trong DB
ensure
  Capybara.reset!
  headless.stop
end
```
- Rất dễ đúng không nào! Tuy nhiên, việc crawl này rất dễ xảy ra lỗi nếu trên website này thay đổi class hay id của element hoặc thay đổi đường dẫn của website đi. Chính vì vậy, chúng ta cần log lại những trường hợp failed mà chúng ta có thể check được bằng cách thêm rescue vào method. Việc log lại này giúp chúng ta có thể sửa lại code một cách dễ dàng hơn mỗi khi service này không hoạt động do một số nguyên nhân nào đó. 
```ruby
def crawl_post_trending
  headless = Headless.new
  headless.start
  Capybara.app_host = "https://viblo.asia/"
  visit "https://viblo.asia/trending"
  first('.post-title--inline > h3 > a').click
  title = page.find(".article-content__title").text
  content = page.find(".article-content__body").text
  return false unless page.has_css? ".post-title--inline" #ví dụ nếu không tìm thấy class này sẽ return false
  Post.create title: title, content: content #nếu muốn lưu lại bài viết vào trong DB
rescue Capybara::Webkit::TimeoutError, Capybara::ElementNotFound => exception
  Rails.logger.info "\n #{self.class.name} Timeout error----------------\n"
  Rails.logger.info exception.message
  false
ensure
  Capybara.reset!
  headless.stop
end
```
#### 3. Hoàn thiện
- Bây giờ ta sẽ có 1 service basic như sau:
```ruby
require "capybara/dsl"

class CrawlPost
  include Capybara::DSL

  Capybara.current_driver = :webkit

  def perform
    crawl_post_trending
  end

  private
  def crawl_post_trending
    headless = Headless.new
    headless.start
    Capybara.app_host = "https://viblo.asia/"
    visit "https://viblo.asia/trending"
    first('.post-title--inline > h3 > a').click
    title = page.find(".article-content__title").text
    content = page.find(".article-content__body").text
    return false unless page.has_css? ".post-title--inline" #ví dụ nếu không tìm thấy class này sẽ return false
    Post.create title: title, content: content #nếu muốn lưu lại bài viết vào trong DB
  rescue Capybara::Webkit::TimeoutError, Capybara::ElementNotFound => exception
    Rails.logger.info "\n #{self.class.name} Timeout error----------------\n"
    Rails.logger.info exception.message
    false
  ensure
    Capybara.reset!
    headless.stop
  end
end
```
- Giờ thì chỉ cần chạy service bằng cách: `CrawlPost.new.perform` là xong :D
- Tài liệu tham khảo: [Gem Headless](https://github.com/leonid-shevtsov/headless), [Capybara-webkit](https://github.com/thoughtbot/capybara-webkit) và [Capybara](https://github.com/teamcapybara/capybara) <br><br>