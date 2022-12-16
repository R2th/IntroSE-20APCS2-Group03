Trong Ruby on Rails, cách dễ dàng nhất để cho phép user download file từ ứng dụng của bạn là lưu file đó trong thư mục public (thư mục mặc định cho các tài nguyên tĩnh, file trong thư mục này có thể truy cập trực tiếp bằng url) . Sau đó điều hướng user tới đường dẫn lưu trữ file.

Ví dụ như bạn có file `monthly-report.doc`, đặt nó vào thư mục `public/reports/monthly-report.doc`, rồi trong view thêm  `link_to "Download Report", "/reports/monthly-report.doc"`. Vậy là hoàn thành yêu cầu mà không cần phải cấu hình routes hay controller gì cả. 

Tuy nhiên nếu file cần kiếm soát quyền truy cập thì chúng ta phải cần tới cách khác, và Rails cũng đã xây dựng sẵn hai phương thức là `send_data` và `send_file` thuộc module `ActionController::DataStreaming`. Hãy cùng xem qua cách áp dụng trước.

Lần này chúng ta lưu file trong thư mục `downloads`. Nghĩa là người dùng sẽ không thể tự ý truy cập file trực tiếp mà phải thông qua routes và controller:
```ruby
# routes.rb
resources :downloads, only: [:show]

# downloads_controller.rb
class DownloadsController < ApplicationController
  # Logic cho phần hạn chế quyền truy cập

  # GET /downloads/:id
  # ví dụ
  #  GET /downloads/monthly-report.doc sẽ download file lưu trữ tại /downloads/monthly-report.doc
  def show
    file = Rails.root.join('downloads', params[:id])
    raise ActiveRecord::RecordNotFound and return unless File.exists?(file) 
    send_file(file)
  end
end
```
Chúng ta có thể áp dụng bất cứ cách thức kiểm soát truy cập nào mà ta muốn, hơn nữa còn có thể xử lý các ngoại lệ khi download file. Cùng tìm hiểu kỹ hơn về hai phương thức này.
# send_data(data, options = {})
Truyền các dữ liệu dạng binary tới trình duyệt. Phương thức này tương tự `render plain: data`, nhưng cho phép bạn xác định cách trình duyệt hiển thị kết quả dưới dạng file đính kèm (ví dụ như download dialog) hoặc dưới dạng inline data (hiển thị thẳng trên trình duyệt nếu trình duyệt hỗ trợ). Ngoài ra còn có các option khác:
* `:filename` - chỉ định tên file hiển thị trên trình duyệt 
* `:type` - chỉ định HTTP content type. Mặc định là 'application/octet-stream' hoặc các type đã được đăng ký trong app (có thể kiểm tra bằng cách chạy Mime::LOOKUP.keys trong Rails console)
* `:disposition` - chỉ định file sẽ hiển thị dạng inline hay download. Các giá trị hợp lệ là 'inline' và 'attachment'. Mặc định là 'attachment'
* `:status` - chỉ định status code cho response. Mặc định là '200 OK'

![](https://images.viblo.asia/30e1e170-ced8-4ba9-8406-42674aafd0b0.png)
*download dialog của google chrome trên ubuntu*
# send_file(path, options = {})
Gửi file tới trình duyệt, mặc định stream 4096 byte mỗi lần. Bằng cách này, server sẽ không phải đọc cả file vào bộ nhớ, làm cho việc truyền dữ liệu dễ dàng hơn kể cả với file lớn. Tuy nhiên bạn cũng có thể tắt chế độ streaming và truyền cả file trong một lần. 

Một lưu ý là `send_file(params[:path])` cho phép download bất kỳ file nào nên cần tránh trường hợp này. Các option của **send_file**
* `:file_name` - chỉ định trên file hiển thị trên trình duyệt
* `:type` - chỉ định HTTP content type. Mặc định là 'application/octet-stream' hoặc các type đã được đăng ký trong app (có thể kiểm tra bằng cách chạy Mime::LOOKUP.keys trong Rails console)
* `:length` - sử dụng để ghi đè độ dài byte của content được gửi tới trình duyệt. Mặc định là `File.size(path)`
* `:disposition` - chỉ định file hiển thị dạng inline hay download. Các giá trị hợp lệ là 'inline' và 'attachment'. Mặc định là 'attachment'
* `:buffer_size` - chỉ định size của buffer sử dụng để stream file. Mặc định là 4096.
* `:status` - chỉ định status code cho response. Mặc định là '200 OK'
* `:stream` - true nếu muốn gửi file tới user trong lúc đọc hoặc false nếu muốn đọc cả file vào bộ nhớ rồi mới thực hiện gửi. Mặc định là true

Sự khác biệt của hai phương thức là bạn cần phải truyền dữ liệu (binary) với **send_data** còn với **send_file** là đường dẫn của file. Cũng có thể coi **send_file** là trường hợp đặc biệt của **send_data**, vì bạn cần phải có file trong file system và có thể thay thế bằng cách đọc file vào bộ nhớ và sử dụng **send_data**.

Vậy khi nào nên sử dụng phương thức nào? Với trường hợp muốn truyền file dữ liệu không có sẵn, được sinh ra tại thời điểm code thực thi thì **send_data** là lựa chọn hợp lý và sử dụng **send_file** cho các trường hợp file đã tồn tại, sẵn sàng để truyền đi. Ngoài ra cũng có thể xét tới trường hợp nếu muốn gửi file nhiều lần thì nên sử dụng **send_file** sẽ có hiệu năng tốt hơn thay vì phải đọc lại file mỗi lần vào bộ nhớ.

Một ví dụ khác:
```ruby
# Trong action của controller
# Hai đoạn code chức năng tương đương nhau

data = "Hello World!"
send_data( data, :filename => "my_file.txt" )

Or

data = "Hello World!"
file = "my_file.txt"
File.open(file, "w"){ |f| f << data }
send_file( file )
```

Không chỉ cho phép tùy chỉnh việc gửi file mà hai phương thức này được cho là tăng tốc độ truyền tải bởi chúng được xây dựng tự động sử dụng cách thức gửi file tiện lợi nhất dựa trên web server  (ví dụ như sử dụng `X-Sendfile` header để ủy thác công việc trao đổi file cho Apache, Nginx).

Hi vọng bài viết giúp ích được cho các bạn.
# Tham khảo
https://stackoverflow.com/questions/5535981/what-is-the-difference-between-send-data-and-send-file-in-ruby-on-rails

https://api.rubyonrails.org/v5.2.2/classes/ActionController/DataStreaming.html