File log hoạt động như bản nhật ký của chương trình, nó ghi lại lịch sử hoạt động,  những thay đổi của program qua thời gian hay thông tin các lỗi đã xảy ra...vv...<br>
Chính vì vậy file log này đóng vai trò rất quan trọng khi vận hành system hay debug khi gặp lỗi.
<br>Giả sử ta đã có sẵn một app rails có `model` tên là `post`. Bài viết này sẽ tóm tắt một số điều cần chú ý khi sử dụng file log trong Ruby on Rails. 

# Cách sử dụng log

<h2>1. Nơi xuất file log</h2>


Khi ta dùng `terminal` khởi động server rails thì log của app được xuất ra tự động ngay tại `terminal`. Ngoài ra log cũng được ghi lại trong file `log/development.log`. <br>
Vì chúng ta dùng môi trường development để khởi động server nên log được xuất ra file `development.log`. Nếu chạy trên môi trường product thì là file `log/production.log` , nếu trên môi trường test thì là file `log/test.log`.

<h2>2. Tự xuất log theo ý thích</h2>

Trong rails, log sẽ được tự động xuất ra nhưng chúng ta cũng có thể tự xuất log theo ý thích bằng cách config lại `controller` và `model`. Dùng object `logger` mặc định của rails để xuất log.
<br>
<br>
Ví dụ,  khi ta muốn xuất thông tin của post vừa tạo ra để sử dụng cho debug thì ta sẽ thêm vào  hàm `create` của file `posts_controller.rb` như sau:
```ruby
...
def create
...
    if @post.save
        logger.debug "post: #{@post.attributes.inspect}"
        redirect_to @post, notice: "Post created"
    end
end
...
```

Ở `logger.debug "post: #{@post.attributes.inspect}"` ta đã sử dụng method `debug` của object `logger`. Method `debug` đồng nghĩa với level `debug`.<br>
Sau khi tạo post thành công, ở terminal cũng như trong file `log/development.log` sẽ có dòng như sau:<br>

![image.png](https://images.viblo.asia/7434f187-7924-478e-8b69-6a9abebe3dc2.png)
<br>

<h2>3. Level của log</h2>

Log có 6 loại level (độ quan trọng) như sau: debug, info, warn, error, fatal, unknown. Chúng ta có thể chỉ định file log xuất ra đến level nào. Vì mặc định trong log là `debug` level nên có thể xuất ra bất kỳ level nào.<br>


| Log level (số) | Log level (chữ) |Cách dùng method| Ý nghĩa |
| -------- | -------- | -------- | --------|
| 5     | unknown|logger.unknown "..."| Error không rõ nguyên nhân     |
| 4     | fatal         |logger.fatal "..."|   Error nghiêm trọng không thể handling được    |
| 3     | error        |logger.error "..."| Error có thể handling được     |
| 2     | warn        |logger.warn "..."| Cảnh báo     |
| 1     | info          |logger.info "..."|  Thông báo     |
| 0     | debug      |logger.debug "..."| Thông tin chi tiết dùng cho debug     |

*Ta hoàn toàn có thể xem level của log hiện tại là gì bằng rails console với câu lệnh "logger.level"*.

# Cài đặt log (logger)

<h2>1. Cài đặt level của log</h2>

Giả sử ta thêm `config.log_level = :warn` vào file `config/environments.rb`. Lúc này,  file log chỉ có thể xuất ra được log có level `warn` trở lên mà thôi.

<h2>2. Lọc parameter trong log</h2>
Những parameter được truyền vào controller cũng sẽ được log xuất ra file. Điều này khá nguy hiểm nếu như những parameter được truyền vào có chứa những thông tin cần tính bảo mật như mật khẩu, số hiệu,....<br>

Chính vì vậy ta cần phải config sao cho những thông tin cần bảo mật sẽ không bị xuất ra file log. Trong file `config/initializers/filter_parameter_logging.rb`, ta có thể cài đặt bằng `Rails.application.config.filter_paramters` để giấu đi những thông tin cần thiết. Mặc định trong rails sẽ là `password`:
```ruby
Rails.application.config.filter_paramters += [:password]
```
Trong file log, các parameter được chỉ định sẽ xuất ra dưới dạng `[FILTERED]`, ví dụ: ![image.png](https://images.viblo.asia/66e00c17-2243-4dcb-834b-6d85384fbd44.png)
<br>

<h2>3. Cài đặt logger chung cho ứng dụng</h2>

Lấy log của mỗi ngày bằng `daily`. Các log trong quá khứ sẽ được xuất ra dưới file dạng `log/development.log/yyyymmdd`
<br>config/environments/development.rb
```ruby
config.logger = Logger.new('log/development.log', 'daily')
```
Ta cũng hoàn toàn có thể thay `daily` bằng `weekly` hay `monthly`. <br>
Nếu muốn chia file log tùy theo ý muốn.
<br>config/environments/development.rb
```ruby
config.logger = Logger.new('log/development.log', 'daily')
config.custom_logger = Logger.new('log/custom.log', 'weekly')
```

Gọi log đã được cài đặt bằng:
```ruby
logger.debug 'Output logger`
Rails.application.config.custom_logger.debug 'Output custom_logger'
```

<h2>4. Tạo original logger</h2>
Ta cũng có thể tạo file log chỉ liên quan đến model `post` bằng cách thêm method `post_logger` vào controller như sau:<br>
app/controller/posts_controller.rb

```ruby
def post_logger
    @post_logger ||= Logger.new('log/post.log', 'daily')
end

post_logger.debug "Output post_loggger"
```
Bằng cách làm trên, log của post sẽ được ghi lại trong file `log/post.log`

<h2>5. Cài đặt format cho logger</h2>

Format của logger được config bằng `config.logger.format` trong file `config/environments/development.rb`.<br>
Có 4 biến có thể sử dụng là: `severity` (log level), `timestamp` (thời gian), `progname` (tên program khi tạo file log) và `msg` (message của chương trình).<br>
config/environments/development.rb
```ruby
config.logger.format = proc {|severity, timestamp, progname, message |
    "#{timestamp} :#{severity}: #{message}\n"
}
```


Bài viết đến đây là kết thúc, mọi người cùng đọc và góp ý nhé ! 🤗🤗

# Nguồn tham khảo
1. Sách 現場で使える Ruby on Rails 5 速習実線ガイド 5.2対応, tái bản lần thứ 6 ngày 27/12/2019, trang 250-253.