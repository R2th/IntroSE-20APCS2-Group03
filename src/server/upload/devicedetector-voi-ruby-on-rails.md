Trong ứng dụng Rails. nếu bạn muốn detect một thiết bị, căn cứ vào đấy để thực hiện những tác vụ cụ thể thì đây là bài viết dành cho bạn.
Tuy nhiên, trước hết chúng ta cần đi qua khái niệm User Agent
## User Agent
User Agent là một chuỗi nhận dạng của trình duyệt web khi gửi yêu cầu đến máy chủ web. Khi trình duyệt của bạn truy cập trang web nào đó, trình duyệt sẽ gửi một HTTP Request bao gồm User Agent đến máy chủ web. Nội dung của User Agent tuỳ thuộc vào trình duyệt mà chúng ta sử dụng. Mỗi trình duyệt đều có riêng cho mình một chuỗi User Agent nhất định. Thực chất, User Agent là cách để trình duyệt nói "Chào, tôi là Firefox trên Windows" hoặc "Chào, tôi là Google Chrome trên Windows".

Dựa vào User Agent thì máy chủ web có thể biết chúng ta dùng trình duyệt web gì. Máy chủ web có thể dùng thông tin này để phục vụ trình duyệt web khác nhau. Chẳng hạn như, website gửi trang dành riêng cho trình duyệt trên điện thoại hoặc là các trang dành riêng cho laptop, desktop, trang hiện đại dành cho trình duyệt mới nhất, và có thể là "Please upgrade your browser."  nếu trình duyệt của bạn quá lỗi thời.

Ví dụ về 1 chuỗi User Agent của Google Chrome: 
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36
```

Đoạn User Agent này báo cho máy chủ web rằng hệ điều hành đang dùng là  **Windows 10 bản 64 bit**  và trình duyệt này là **Chrome**  phiên bản **61.0**

## Gem DeviceDetector
Căn cứ vào User Agent, DeviceDetector là trình phân tích User Agent và trình phát hiện thiết bị chính xác và nhanh chóng được viết bằng Ruby, và được cập nhật các thiết bị mới 1 cách thường xuyên.

DeviceDetector sẽ phân tích bất kỳ  User Agent nào và phát hiện trình duyệt, hệ điều hành, thiết bị được sử dụng (máy tính để bàn, máy tính bảng, điện thoại di động, tv, xe hơi, bảng điều khiển, v.v.), thương hiệu và kiểu máy. DeviceDetector phát hiện hàng ngàn chuỗi  User Agent, thậm chí từ các trình duyệt và thiết bị hiếm.

DeviceDetector được tối ưu hóa cho tốc độ phát hiện, bằng cách tối ưu code và cache dữ liệu

### Cài đặt
Thêm vào Gemfile của bạn:
```
gem 'device_detector'
```
và chạy:
```
$ bundle
```
Hoặc cài đặt với:
```
$ gem install device_detector
```

### Sử dụng

```
user_agent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36'
client = DeviceDetector.new(user_agent)

client.name # => 'Chrome'
client.full_version # => '30.0.1599.69'

client.os_name # => 'Windows'
client.os_full_version # => '8'

# Với nhiều thiết bị, bạn còn có thể truy vấn được tên thiết bị
client.device_name # => 'iPhone 5'

# Device types có thể là: desktop, smartphone, tablet, console, portable media player, tv, car browser, camera
client.device_type # => 'smartphone'
```
DeviceDetector sẽ trả về nil trên tất cả các thuộc tính, nếu user_agent không xác định. Bạn có thể thực hiện kiểm tra để đảm bảo user_agent đã được phát hiện:

```
client.known? # => return false nếu user_agent là unknown
```

### Cache
DeviceDetector sẽ lưu trữ lên tới 5.000 user_agent để tăng hiệu suất phân tích. Con số này hoàn toàn có thể điều chỉnh được:
```
DeviceDetector.configure do |config|
  config.max_cache_keys = 5_000 
end
```

### Benchmarks

So sánh tốc độ phân tích gần 200.000 user_agent  với 2 gem phổ biến trong cộng đồng Ruby, Browser và UserAgent.
```
require 'device_detector'
require 'browser'
require 'user_agent'
require 'benchmark'

user_agent_strings = File.read('./tmp/user_agent_strings.txt').split("\n")

## Benchmarks

Benchmark.bm(15) do |x|
  x.report('device_detector') {
    user_agent_strings.each { |uas| DeviceDetector.new(uas).name }
  }
  x.report('browser') {
    user_agent_strings.each { |uas| Browser.new(ua: uas).name }
  }
  x.report('useragent') {
    user_agent_strings.each { |uas| UserAgent.parse(uas).browser }
  }
end
```

Ta thu được kết quả
```
                     user     system      total        real
device_detector   1.180000   0.010000   1.190000 (  1.198721)
browser           2.240000   0.010000   2.250000 (  2.245493)
useragent         4.490000   0.020000   4.510000 (  4.500673)

                      user     system      total        real
device_detector   1.190000   0.020000   1.210000 (  1.201447)
browser           2.250000   0.010000   2.260000 (  2.261001)
useragent         4.440000   0.010000   4.450000 (  4.451693)

                      user     system      total        real
device_detector   1.210000   0.020000   1.230000 (  1.228617)
browser           2.220000   0.010000   2.230000 (  2.222565)
useragent         4.450000   0.000000   4.450000 (  4.452741)
```

## Tham khảo
https://github.com/podigee/device_detector