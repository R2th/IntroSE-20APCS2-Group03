Với ba phiên bản beta được phát hành, Rails 6 sắp ra mắt. Nó sẽ mang lại những thay đổi được trích xuất, xây dựng bởi các nhóm phát triển, sau các sản phẩm chủ lực framework's flagship
 như Basecamp hoặc GitHub. Chúng ta hãy xem những tính năng mới mà bản phát hành cuối cùng mang lại và xem xét nó thực sự tốt hơn không?.
### Rails 6: Khi nào sẽ được phát hành?

Thời gian dự kiến cho việc phát hành các phiên bản tiếp theo của Rails 6 sẽ được David Heinemeier Hansson xuất bản vào cuối tháng 12. Ba phiên bản beta đã có sẵn và phiên bản cuối cùng dự kiến sẽ đã mặt tại RailsConf 2019 , diễn ra trong khoảng thời gian từ 30/4 đến 2/5 tại Minneapolis, Hoa Kỳ.

**Tính năng 1: Action Mailbox**

Được trích xuất từ Basecamp 3 , Action Mailbox là framework được định tuyến các email tới các email như controller trong mailboxes Rails. Nó cho phép các ứng dụng Rails tích hợp tốt hơn với các email gửi đến.
Gần đây, Rails đã sử dụng Action Mailer để nhận email từ các ứng dụng, nhưng toàn bộ cách này là thiếu gắn kết trong việc gửi email và trợ giúp trong việc tích hợp với nền tảng xử lý mail thông dụng".

Action Mailbox Đã được tích hợp vào Rails, Action Mailbox cho phép các nội dung từ Amazon SES, Mailgun, Mandrill, Postmark và SendGrid. 
Chú ý: Action Mailbox  yêu cầu cần Active Work và Active Storage .

**Tính năng 2: Action Text**

Một trích xuất khác từ Basecamp’s code, Action Text là tính năng thứ hai trong Rails 6. Theo các tác giả, Action Text sẽ giúp tạo, chỉnh sửa và hiển thị văn bản phong phú trong ứng dụng Rails “siêu dễ dàng” hoặc đưa nó lên cấp độ cao hơn.

Action Text bao gồm các Trix xử lý:
* formatting
* quotes
* Thêm các liên kết, embedded, images và galleries.

Một vài embedded được lưu trữ tự động sử dụng Active Storage và associated với các mô hình RichText: Active Storage, again, require…. để framework này hoạt động đúng cách. Đây sẽ là những gì mà ứng dụng trong tương lai như Action Text sẽ mang lại, nội dung text và editing phong phú. Action Text đã hoạt động với Rails 5.2 apps, vì vậy các nhà phát triển đã tìm kiếm một số giải pháp tốt hơn để kiểm tra chúng.

**Tính năng 3: Hỗ trợ Multiple databases**

Bạn đã bao giờ nghĩ rằng ứng dụng của bạn có thể kết nối và chuyển đổi nhiều cơ sở dữ liệu cùng một lúc chưa? Bạn có thể làm điều này vì lý do khả năng mở rộng hoặc hiệu suất.

Một kịch bản điển hình là cấu hình database bằng cách sử dụng lược đồ master-Slave, trong đó database được sao chép trên nhiều máy chủ, với node chủ nhận tất cả các hoạt động ghi, sau đó được truyền đến các máy chủ lẻ.  Michał Buszkiewicz giải thích, Rails developer tại Prograils. Để đáp ứng mục đích này, Rails 6 cung cấp một API, hỗ trợ nhiều database, sẽ cho phép bạn làm điều đó mà không cần đào sâu Active Record.

**Tính năng 4: Parallel testing**

Rails 6 thêm test song song cho các ứng dụng Rails theo mặc định. Được xây dựng bởi nhóm GitHub giống như hỗ trợ nhiều database, thử nghiệm song song là một chức năng mà có thể hóa cực kỳ hữu ích khi chạy các test khó trong ứng dụng. Tận dụng multiple cores, hỗ trợ test song song tăng tốc độ test. Mỗi tester có database riêng và chạy luồng riêng. Tính năng này là một trong những tính năng phổ biến nhất trong Rails 6.

**Tính năng 5: Webpack như một gói mặc định**

Từ nay trở đi, webpack sẽ trở thành một gói JavaScript bundler mặc định cho Rails thông qua gem webpacker, thay thế Rails Asset Pipeline mặc định trước đó và cung cấp khả năng tương tác tốt hơn với các thư viện JavaScript và các tiêu chuẩn code hiện đại. Nói tóm lại, webpacker là một gem cung cấp tích hợp với webpack và các trình quản lý gói JS như yarn. Vì webpack là một tiêu chuẩn không chính thức trong cộng đồng phát triển front-end hiện nay, nó có thể khiến các nhà phát triển front-end chưa rõ hết về Rails cảm thấy thoải mái hơn.

**Tính năng 6: Zeitwerk, Trình load code mới**

Rails 6 đi kèm với trình load code hoàn toàn mới cho Ruby. Zeitwerk, người sẽ thay thế trình load Rails cổ điển đã có từ năm 2004. Zeitwerk xây dựng với mục đích loại bỏ tất cả các vấn đề cơ bản của trình tải cổ điển, cũng như loại bỏ tất cả các trường hợp sử dụng đã biết require_dependency. 

### kết thúc: Điều gì đến với Rails 6?

Mặc dù ngày phát hành của phiên bản mới của framework vẫn chưa được biết, nhưng hầu hết các tính năng mới của nó đã được hợp nhất với Rails và có thể test.
Tài liệu tham khảo: https://prograils.com/posts/new-features-rails-6-multiple-databases-parallel-tests-action-mailbox-etc