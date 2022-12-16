Gần đây mình thường hay phải chạy mấy cái rake task siêu to khổng lồ, ngồi nhìn cái màn hình log ra mấy dòng chữ nhạt nhẽo cũng chán. Nhẩm nghĩ liệu có cái thư viện nào giúp mình hiển thị trạng thái của tiến trình đang chạy lên màn hình không, ấy thế là mình khám phá ra cái thư viện hay ho này. [Ruby-progressbar](https://github.com/jfelchner/ruby-progressbar) là một lựa chọn khá tuyệt vời cho việc hiển thị progress chạy của một hàm, một job hay một task bất kỳ trong Ruby. Nó có một số ưu điểm như sau:
- là gem lâu đời và vẫn dùng tốt từ 2008 đến nay
- có test suite đầy đủ
- không có dependencies
- được sử dụng bởi rất nhiều dự án mã nguồn mở
- trải nghiệm tốt
-  có nhiều contributors và được maintain thường xuyên

Hãy bắt đầu tìm hiểu và cùng trải nghiệm nó thôi!
## Cài đặt
Bạn có thể cài luôn vào gem 
```ruby 
gem install ruby-progressbar
```
sau đó trong script đặt thêm `require 'ruby-progressbar'`

hoặc đặt vào Gemfile
```ruby 
gem 'ruby-progressbar'
```
## Sử dụng như nào?
Cách khởi tạo đơn giản thôi.
```ruby
progressbar = ProgressBar.create
```
Dòng lệnh này tạo một cái progress bar đơn giản bắt đầu từ `0` với độ đo lớn nhất là `100`, sẽ hiển thị trên màn hình như thế này:
```ruby
Progress: |                                                                       |
```
Ngoài ra bạn có thể có nhiều option để tạo một progress bar, ví dụ:
```ruby 
ProgressBar.create(:title => "Items", :starting_at => 20, :total => 200)
```
Cái này sẽ output ra như sau:
```ruby 
Items: |=======                                                                |
```
Dưới đây là mô tả chi tiết về các options bạn có thể sử dụng:

|-------Tùy chọn --------------------| Mặc định | Mô tả |
| -------- | -------- | -------- |
|` :title`    | Progress     | Tiêu đề của progress bar     |
| `:total` | 100 | Tổng khối lượng công việc cần hoàn thành |
|` :starting_at` | 0 | Điểm khởi đầu của progress bar. Khi gọi `#reset` thì sẽ trở về giá trị này |
| `:progress_mark` | = | Kí hiệu đánh dấu lượng progress đã hoàn thành |
| `:remainder_mark` | khoảng trắng | Kí hiệu đánh dấu phần progress còn lại phải hoàn thành |
|`:format` | `%t: |%B|` | Format string dùng để format cách hiển thị của progress bar|
|`:length` | chiếm full độ rộng có thể nếu không thì bằng 80 | Độ rộng của progress bar hiển thị trên màn hình |
|`:output` | `$stdout` | Tất cả output sẽ được truyền tới object này (standard output). Có thể là bất cứ object nào có 4 phương thức `.print` `.flush` `.tty?` `.puts` |
| ... | ... | ... |
## Cập nhật progress
Biết cách tạo ra nó rồi, vậy làm thế nào để cập nhật progress của bar? Dưới đây là một vài phương thức mà thư viện cung cấp:
| -------Phương thức ------| Mô tả |
| ------ | ----------- |
| `#increment` |Tăng progress lên 1 đơn vị. Đây là cách thường dùng nhất |
| `#decrement` | Giảm progress xuống 1 đơn vị |
| `#progress+=` | Cho phép tăng progress một khối lượng nhất định |
| `#progress-=` | Cho phép giảm progress một khối lượng nhất định |
| `#progress=` | Đặt progress ở một giá trị chỉ định. Thường ta chỉ dùng cái này để test thôi.|
| `#total=` | Thay đổi tổng khối lượng cần hoàn thành của progress bar <br><br>Cái này có thể là giá trị gì cũng được (kể cả `nil`) nhưng không được bé hơn progress hiện tại |
Có thể minh họa bằng hình ảnh như sau:

![Changing Progress Animation](https://images.viblo.asia/de69f479-383a-41bc-934f-5d825b55c530.gif)
## Stopping
Bạn có thể dừng progress bar bằng một trong bốn cách sau:
| -------Phương thức--------| Description |
| ---------- | ----------- |
| `#finish` | Dừng progress bar ngay lập tức.  Vị trí của progress sẽ bằng với vị trí kết thúc  |
| `#stop` | Dừng progress bar ngay lập tức .  Vị trí của progress giữ nguyên |
| `#pause` | Sẽ dừng progress bar giống như `stop` nhưng cho phép quay lại chạy bằng cách gọi  `#resume`.<br><br>_Lưu ý: Elapsed Time và Estimated Time sẽ dừng khi progress bar ở trạng thái `paused`._ |
| `#reset` | Sẽ dừng progress bar bằng cách reset lại tất cả các thông tin của nó về thời điểm ban đầu |
 Quan sát minh họa:
 ![](https://images.viblo.asia/704764fd-2f79-4846-9edc-afed711c3fb0.gif)
##  Finishing
Mặc định, bạn sẽ thấy thanh hiển thị kết thúc khi progress đạt giá trị bằng với `total`. Nếu không muốn progress bar tự động kết thúc, hãy truyền option `autofinish: false` khi khởi tạo.
```ruby 
progressbar = ProgressBar.create(:starting_at => 9, :total => 10)
progressbar.increment

# Sử dụng .finished? để kiểm tra trạng thái kết thúc
progressbar.finished? # => true
```
```ruby
progressbar = ProgressBar.create(:starting_at => 9, :total => 10, :autofinish => false)
progressbar.increment

progressbar.finished? # => false
```
## Refreshing
Nếu bạn cần hiển thị lại progress bar để cho người dùng trải nghiệm real-time hơn, hãy dùng `#refresh`. `#refresh` không tác động đến vị trí hiện tại của progress mà sẽ cập nhật log thời gian Elapsed time và Estimated time.
## Tiến trình không rõ điểm kết thúc
![](https://images.viblo.asia/d151b315-ee7c-424c-8438-bb4e746a11d3.gif)
Đôi khi bạn sẽ gặp trường hợp phải thực hiện một công việc mà không biết rõ tổng khối lượng của nó là bao nhiêu. Điều này có thể xảy ra khi bạn đang download một đống files hoặc khi bạn đang xử lý một tập các jobs chưa được load hoàn toàn.

Những lúc như thế bạn có thể set giá trị của `total` là `nil` và tiếp tục tăng progress của bar nhưu bình thường. Lúc này thanh hiển thị sẽ cho bạn thấy progress đang chạy nhưng không rõ là bao nhiêu và bao giờ sẽ hoàn thành. Ví dụ 
```ruby
progressbar = ProgressBar.create(:starting_at => 20, :total => nil)
```
sẽ output ra giống giống như hình phía trên.

Tại bất cứ thời điểm nào khi bạn biết được giá trị `total` là bao nhiêu, có thể set cho nó bằng phương thức
```ruby
progressbar.total = 100
```
Lúc này progress bar sẽ chuyển thành trạng thái như này:
```ruby
Progress: |========                                                            |
```
## Logging
Khi sử dụng progress bar, bạn có thể sẽ muốn log một cái output nào đó cho người dùng. Nếu bạn thử sử dụng một câu lệnh `puts`, bạn sẽ thấy rằng nó viết đè lên thanh hiển thị. Ví dụ khi bạn `puts "hello"` sau khi một progress được chạy, màn hình có thể trông như này:
```ruby
helloess: |=======                                                             |
Progress: |========                                                            |
```
Điều này xảy ra bởi progressbar phải luôn vẽ lại nó mỗi lần progress thay đổi. Đây là giới hạn của việc output trên terminal. Để có thể tránh điều này, hãy sử dụng phương thức `#log` .
```ruby
progressbar = ProgressBar.create
progressbar.progress = 20
progressbar.log 'hello'
```
```ruby
hello
Progress: |=============                                                       |
```
Phương thức `#Log` sẽ tự động clear progress bar, in text rồi vẽ lại bar ở dòng tiếp theo. Vì vậy nếu sử dụng phương thức này, bạn sẽ luôn chỉ nhìn thấy một thanh hiển thị duy nhất trên màn hình mà thôi.
# Kết luận 
Trên đây là kha khá những gì mà mọi người có thể sử dụng để ứng dụng gem Ruby-progressbar tạo một script cool ngầu trong lập trình với Ruby. Thông tin chi tiết hơn hãy tham khảo [Ruby-progressbar Wiki](https://github.com/jfelchner/ruby-progressbar/wiki) . Happy coding!