Rails là một framework tuyệt vời cho phát triển ứng dụng web. Nó có một cộng đồng lớn, các tính năng tích hợp tuyệt vời và tiếp tục cải thiện để cung cấp các tính năng mới nhất và tuyệt vời nhất cho các nhà phát triển web. Bài viết này sẽ giới thiệu một số công cụ hữu ích trong lập trình Ruby on Rails.
# Xử lý dữ liệu trên Rails
Let's go! Phần đầu tiên mình  muốn nói đến chính là cốt lõi của tất cả các ứng dụng: data.
## Authentication 
```Devise``` cung cấp các tính năng cho phép xác thực người dùng (user authentication) như  xác nhận email, khôi phục mật khẩu, lưu nhiều phiên người dùng đồng thời, lock và unlock tài khoản,...Tuyệt vời hơn nữa là các tính năng trên có thể config được tuỳ theo nhu cầu sử dụng của bạn.
```Clearance``` cũng là một lựa chọn tốt thay thế Devise nếu bạn không cần dùng hết tất cả các tính năng có sẵn như Devise. Nếu bạn muốn giữ mọi thứ đơn giản để thiết lập xác thực email / mật khẩu cơ bản, bạn nên dùng thử Clearance.
Còn nếu bạn cần tích hợp xác thực dịch vụ bên ngoài vào ứng dụng của mình thì ```Omniauth``` chính là một giải pháp. Bạn sẽ tìm thấy hàng tá (thậm chí hàng trăm) nhà cung cấp được xây dựng sẵn cho hầu hết các ứng dụng web nổi tiếng trên mạng. 
## Resources authorization 
```CanCanCan``` cho phép bạn dễ dàng thiết lập các quy tắc truy cập cho dữ liệu. Và bạn đã có một sự trợ giúp đắc lực cho phần controllers/views để có thể cung cấp một số quyền nhất định truy cập vào một số tính năng của app.
```Pundit``` hoạt động giống với CanCanCan, mặc dù theo mặc định, Pundit khuyến khích bạn tổ chức hơn một chút với các file quy tắc riêng biệt. 
## Location 
```Geocoder``` cho phép bạn xử lý bất cứ điều gì liên quan đến location.  Nó tích hợp dễ dàng với một số API mã hóa địa lý, cho phép bạn thực hiện truy vấn vị trí trên các model, thậm chí bạn có thể sử dụng nhiều dịch vụ API cùng một lúc. Nếu bạn cần xử lý liên quan đến vị trí thì việc sử dụng Geocoder là rất cần thiết.
## Internationalization 
Nếu bạn muốn là một ứng dụng đa ngôn ngữ thì bạn nên tìm hiểu```Globalize```, ```Ruby I18n```.
## Files 
```Paperclip``` cung cấp tích hợp đơn giản để tải lên và lưu file. Đây là một kết hợp hoàn hảo cho các app đơn giản, vì nó dễ cấu hình và sử dụng.
```CarrierWave``` là một giải pháp linh hoạt hơn nhiều cho việc tải lên tệp. Nếu bạn muốn kiểm soát mọi thứ theo sở thích của mình thì bạn nên dùng thử.
```Shrine``` hỗ trợ tải lên S3 đã đăng ký trực tiếp và nếu bạn đang xử lý các tệp lớn thì có vẻ như việc sử dụng bộ nhớ máy chủ của bạn dễ dàng hơn CarrierWave. 
Cuối cùng bạn chỉ cần nhớ: sự lựa chọn thông minh nhất là sự lựa chọn phù hợp với yêu cầu của bạn một cách tốt nhất.
# Kết luận
Đây chỉ là một số công cụ hữu ích cho phát triển ứng dụng web với Ruby on Rails. Ngoài ra còn rất nhiều công cụ hỗ trợ khác mình sẽ tiếp tục update.

Tham khảo

[https://medium.com/deemaze-software/ruby-on-rails-tools-and-tips-part-1-f740c0627bac](https://medium.com/deemaze-software/ruby-on-rails-tools-and-tips-part-1-f740c0627bac)