Xin chào các bác :triumph:

`ActiveSupport::Logger` là cái class mặc định mà Rails sử dụng để tạo gen ra log. 

Ngoài ra, `ActiveSupport` cũng có thêm nhiều class liên quan đến logging, giúp chúng ta dễ dàng custom log trong Rails app theo ý muốn.

Mặc định, logger cho phép ta set logging level, ví dụ như *WARN*, *INFO*, *ERROR* và tag tương ứng với level đó.

Ví dụ ta gõ:

```Ruby
logger.info "uploading file #{file_name} to S3..."
```

Sẽ log ra:

```
[INFO] uploading get_schwifty.jpg to S3...
```

và nội dung này sẽ xuất hiện trong log file tương ứng: `<development/staging/test/production>.log`

Nhưng trong nhiều trường hợp, ta cần có một file log riêng biệt, clean và có thể hiển thị ra nhiều thông tin chi tiết hơn.

Ví dụ cụ thể, bạn đang phải maintain một con Rails app về thương mại điện tử.

Một trong những chức năng của app là chuyển payment từ user sang cho sellers khi họ mua đồ.

Đây là một quá trình rất quan trọng và flow code phức tạp (cứ dính đến tiền là thế :v )

-> Vậy nên chắc chắn ta sẽ phải log lại toàn bộ progress chi tiết nhất có thể, và tất nhiên phải lưu riêng để khỏi lưu lạc trong đống logs của production.


### Yêu cầu đặt ra

Chúng ta có 2 yêu cầu sau:
- Vendor payment log phải được đưa vào file riêng cho nó - `log/vendor_payment.log`
- Mỗi đoạn log đều có header chưa những thông tin như:
  + ID của vendor được trả tiền và product được mua.
  + Thời gian.
  + Log level.

Kiểu dạng dư lày:
```
[INFO 2017-09-15 12:14:1222] < vendor_id: 77801, product_id: 6701, transaction_id: 15110 >  
[INFO 2017-09-15 12:14:1222] initiating bank transfer...
```

Thêm vào đó hàm logger của ta cần phải dễ sử dụng và đẹp trai. 
Mình không muốn mỗi lần cần log lại phải viết 2 dòng dài loằng ngoằng thế này đâu, lười bm :expressionless:

```
my_logger.info "< vendor_id: #{transaction.vendor_id}, product_id: #{transaction.product_id}, transaction_id: #{transaction.id} >"  
my_logger.info "initiating bank transfer...  
```

Ngoài ra, cái custom logger này cũng có thể gọi những method giống của default logger như `#info`, `#error`, `#warn`, `#debug`.

Ta sẽ tự tạo custom logger có thêm argument nữa là **transaction object**, để lấy thông tin từ đó tạo log header.

Kỳ vọng sẽ như sau:
```
my_logger.info "initiating bank transfer...", transaction

=> 
[INFO 2017-09-15 12:14:1222] < vendor_id: 77801, product_id: 6701, transaction_id: 15110 >
[INFO 2017-09-15 12:14:1222] initiating bank transfer...
```

Để thêm phần tag (hiển thị bên cạnh INFO), ta sẽ sử dụng `ActiveSupport::TaggedLogging` để build ra cái custom log này.

### `ActiveSupport::TaggedLogging` là gì?

`ActiveSupport::TaggedLogging` được sử dụng để add các "tag" cho nội dung log mà nó bọc bên trong.

Cái "tag" ở đây thường dùng hiển thị subdomain, request id, ... trong hệ thống sử dụng multi-instance production app.

```
logger = ActiveSupport::TaggedLogging.new(Logger.new("my_log_file.log")

logger.tagged("IP: #{request.ip}") { logger.info "something important is happening" }

=> [INFO][IP: 97.14.98.11] "something important is happening"
```


### Build custom Logger

Để xài `#tagged` method, custom logger của ta cần kế thừa từ `ActiveSupport::TaggedLogging`

```Ruby
#lib/vendor_payment_logger.rb

class VendorPaymentLogger < ActiveSupport::TaggedLogging  
  def initialize(logger)
    super(logger)
    logger.formatter = formatter
  end

  def formatter
    Proc.new{|severity, time, progname, msg|
      formatted_severity = sprintf("%-5s",severity.to_s)
      formatted_time = time.strftime("%Y-%m-%d %H:%M:%S")
      "[#{formatted_severity} #{formatted_time} #{$$}]\n #{msg}\n"
    }
  end
end  
```

Trong đó 
- `TaggedLogging` object yêu cầu cần có argument khởi tạo là object từ `Logger`

```Ruby
VendorPaymentLogger.new(Logger.new("log/vendor_payment.log") 
```

- `ActiveSupport::TaggedLogging` sử dụng `#formatter` attribute để định dạng output cho log 
-> Vì vậy ta định nghĩa lại `formatter` để trả về đúng với output mong muốn của mình bằng `Proc`.

Lúc này, log statement của chúng ta sẽ là:
```
logger = ActiveSupport::TaggedLogging.new(Logger.new("log/vendor_payment.log")

logger.info "doing a thing now."  
=> [INFO 2017-09-15 12:14:2345] doing a thing now
```

### Overriding `#tagged` method

Mỗi Log statement output từ VendorPaymentLogger phải có message đính kèm là:
```
<vendor_id: 1234, product_id: 5678, transaction_id: 101112>  
```

Tất nhiên, ta có thể viết một cách thủ công như thế này:

```
logger = ActiveSupport::TaggedLogging.new(Logger.new("log/vendor_payment.log")

logger.tagged("< vendor_id: #{transaction.vendor_id}, product_id: #{transaction.product_id}, transaction_id: #{transaction.id} >") { (logger.info "doing a thing now." }

=> [INFO 2017-09-15 12:14:2345] < vendor_id: 77801, product_id: 6701, transaction_id: 15110 >
=> [INFO 2017-09-15 12:14:2345] doing a thing now
```

*Code dài tốn nhiều calo, thế nên anh gầy trơ xương.*

Ta expect chỉ cần gọi lệnh thế này thì đẹp trai hơn:
```
logger.info("doing a thing now", transaction)

=> [INFO 2017-09-15 12:14:2345] < vendor_id: 77801, product_id: 6701, transaction_id: 15110 >
=> [INFO 2017-09-15 12:14:2345] doing a thing now
```

Để làm được kiểu đó, ta sẽ phải overwrite lại vài method, và tất nhiên cả `#tagged` method nữa.

```Ruby
 #lib/vendor_payment_logger.rb

class VendorPaymentLogger < ActiveSupport::TaggedLogging  
  ...
  def info(msg, transaction)
    tagged(transaction) { super(msg) }
  end

  def warn(msg, transaction)
    tagged(transaction) { super(msg) }
  end

  def debug(msg, transaction)
    tagged(transaction) { super(msg) }
  end

  def error(msg, transaction)
    tagged(transaction) { super(msg) }
  end

  def tagged(transaction)
    super(message_header(transaction))
  end

  def message_header(album)
    "< vendor_id: #{transaction.vendor_id}, product_id: #{transaction.product_id}, transaction_id: #{transaction.id} >"
  end
end  
```

Ở đoạn code trên, ta override để đưa thêm vào object `transaction` làm agrument để tạo phần thông tin header.

Giờ format output của chúng ta ổn ổn rồi, nhưng giờ mỗi lần gọi `VendorPaymentLogger` lại phải create new object mới từ class đó.

Vì vậy ta viết thêm một tý code để giải quyết vấn đề này.

```Ruby
#lib/vendor_payment_logger.rb

class VendorPaymentLogger < ActiveSupport::TaggedLogging  
  class << self
    attr_accessor :logger
    delegate :info, :warn, :debug, :error, :to => :logger
  end
  ...
end  
```

```Ruby
#config/initializers/vendor_payment_logger.rb 

VendorPaymentLogger.logger = VendorPaymentLogger.new(Logger.new("log/vendor_payment.log"))  
```

Giờ ta có thể gọi log ngắn gọn như sau:
```
VendorPaymentLogger.info "initiating bank transfer", transaction

=> 
[INFO 2017-09-08 12:25:2344] < vendor_id: 77801, product_id: 6701, transaction_id: 15110 >
[INFO 2017-09-08 12:25:2344] initiating bank transfer
```

### Nguồn:
- https://www.thegreatcodeadventure.com/building-a-custom-logger-in-rails/