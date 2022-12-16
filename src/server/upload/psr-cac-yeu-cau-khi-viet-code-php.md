# PSR là gì?
`PSR` là viết tắt của `PHP Standards Recommendations`, là những tiêu chuẩn khi code PHP, nó được cộng đồng PHP xây dựng được công bố bởi `PHP Framework Interop Group` và áp dụng theo.
`PHP Framework Interop Group` - PHP-FIG: là nhóm đã được một số nhà phát triển khung tại php | tek khởi động vào năm 2009. Kể từ đó, nhiều thành viên khác đã áp dụng và được bình chọn, tăng quy mô của nhóm từ 5 lên hơn 20.
Trong quá trình làm việc, các hệ thống sử dụng các framework khác nhau có thể phải kết hợp với nhau để thực hiện những bài toán cụ thể. Tuy nhiên đối với mỗi framework của mỗi team lại code theo những chuẩn khác nhau, do đó nảy sinh ra vấn đề là cần có một bộ quy tắc chuẩn để giải quyết việc các code không chuẩn này, và PSR ra đời nhắm chuẩn hóa coding convention cho tất cả các framework, các framework chỉ việc tuân theo các chuẩn này thì các hệ thống framework khác nhau vẫn sẽ dùng chung một quy tắc, do đó sẽ thuận lợi cho việc phát triển sau này.

## Ai chỉ định bạn đưa ra những tiêu chuẩn này?

FIG có thể không phải là một nhóm PHP chính thức, nhưng nếu đó là trường hợp ai sẽ thực hiện việc bổ nhiệm? FIG đại diện cho một phần của cộng đồng và theo thời gian, đó sẽ đại diện cho nhiều lựa chọn dự án hơn. Bất kỳ ai đăng ký vào Google Group đều là một phần của PHP-FIG. Thành viên Cộng đồng PHP-FIG là những người có thể ảnh hưởng đến các tiêu chuẩn, đưa ra đề xuất, đưa ra phản hồi, v.v. Chỉ Thành viên bỏ phiếu PHP-FIG mới có thể bắt đầu hoặc tham gia bỏ phiếu , nhưng các giai đoạn thảo luận và hình thành liên quan đến tất cả mọi người.

## Vậy PSR có bao nhiêu chuẩn?

Đến thời điểm này (1/7/2019) có 20 tiêu chuẩn từ PSR-0 đến PSR-19, trong đó có  13 tiêu chuẩn đã được phê duyệt, ngoài ra có các tiêu chuẩn Đang soạn thảo và có tiêu chuẩn đã lỗi thời(ví dụ PSR-0 đã lỗi thời, bị thay bởi PSR-4). Chúng được công bố trên trang web của PHP-FIG: [https://www.php-fig.org](https://www.php-fig.org/psr/).

| Mã | Tên | Miêu tả | Trạng thái |
| -------- | -------- | -------- |-------- |
| PSR-0 | Tiêu chuẩn tự động tải | Nó mô tả các yêu cầu bắt buộc phải được tuân thủ để có khả năng tương tác của trình tải tự động. | Từ 30-12-2014 PSR-0 được thay thế bởi PSR-4|
| PSR-1 | Tiêu chuẩn code cơ bản | Nó bao gồm những gì nên được coi là các yếu tố code tiêu chuẩn được yêu cầu để đảm bảo mức độ tương tác kỹ thuật cao giữa code PHP được chia sẻ | Được chấp nhận|
| PSR-2 | Phong cách code | Nó xem xét PSR-1 và nó nhằm giảm ma sát nhận thức khi quét mã code từ các tác giả khác nhau. Nó làm như vậy bằng cách liệt kê một bộ quy tắc và kỳ vọng được chia sẻ về cách định dạng mã code PHP. | Được chấp nhận|
| PSR-3 | Giao diện logger | Nó mô tả một giao diện chung cho các thư viện đăng nhập. | Được chấp nhận|
| PSR-4 | Tiêu chuẩn tự động tải | Nó mô tả một đặc tả cho các lớp tự động tải từ các đường dẫn tệp. Nó hoàn toàn có thể tương tác và có thể được sử dụng cùng với bất kỳ thông số kỹ thuật tự động tải nào khác, bao gồm PSR-0. PSR này cũng mô tả nơi đặt các tệp sẽ được tải tự động theo đặc điểm kỹ thuật. | Được chấp nhận|
| PSR-5 | Tiêu chuẩn PHPDoc | Mục đích chính của PSR này là cung cấp một định nghĩa đầy đủ và chính thức về tiêu chuẩn PHPDoc. PSR này khác với tiền thân của nó, Tiêu chuẩn PHPDoc thực tế liên quan đến phpDocumentor 1.x, để cung cấp hỗ trợ cho các tính năng mới hơn trong ngôn ngữ PHP và để giải quyết một số thiếu sót của người tiền nhiệm. | Dự thảo|
| PSR-6 | Giao diện bộ nhớ đệm | Mục tiêu của PSR này là cho phép các nhà phát triển tạo các thư viện nhận biết bộ đệm có thể được tích hợp vào các khung và hệ thống hiện có mà không cần phát triển tùy chỉnh. | Được chấp nhận|
| PSR-7 | Giao diện tin nhắn HTTP | Nó mô tả các giao diện phổ biến để biểu diễn các thông điệp HTTP như được mô tả trong RFC 7230 và RFC 7231 và URI để sử dụng với các thông điệp HTTP như được mô tả trong RFC 3986. | Được chấp nhận|
| PSR-8 | Giao diện có thể chạy được | Nó thiết lập một cách chung cho các đối tượng thể hiện sự đánh giá và hỗ trợ lẫn nhau bằng cách siết chặt. Điều này cho phép các đối tượng hỗ trợ lẫn nhau theo cách xây dựng, tăng cường hợp tác giữa các dự án PHP khác nhau. | Bị bỏ rơi|
| PSR-9 | Công khai an ninh | Nó mang lại cho dự án một cách tiếp cận được xác định rõ ràng để cho phép người dùng cuối khám phá các tiết lộ bảo mật bằng cách sử dụng định dạng có cấu trúc được xác định rõ ràng cho các tiết lộ này. | Bị bỏ rơi|
| PSR-10 | Tư vấn bảo mật | Nó cung cấp cho các nhà nghiên cứu, lãnh đạo dự án, lãnh đạo dự án thượng nguồn và người dùng cuối một quy trình được xác định và có cấu trúc để tiết lộ các lỗ hổng bảo mật | Bị bỏ rơi|
| PSR-11 | Giao diện container | Nó mô tả một giao diện chung cho các container phụ thuộc. Mục tiêu là để chuẩn hóa cách các khung và thư viện sử dụng một container để thu được các đối tượng và tham số (được gọi là các mục trong phần còn lại của tài liệu này). | Được chấp nhận|
| PSR-12 | Hướng dẫn kiểu mã hóa mở rộng | Nó mở rộng, mở rộng và thay thế PSR-2, hướng dẫn kiểu mã hóa và yêu cầu tuân thủ PSR-1, tiêu chuẩn mã hóa cơ bản. | Dự thảo|
| PSR-13 | Liên kết Hypermedia | Nó mô tả các giao diện phổ biến để đại diện cho một liên kết hypermedia. | Được chấp nhận|
| PSR-14 | Quản lý sự kiện | Nó mô tả các giao diện phổ biến để gửi và xử lý các sự kiện. | Được chấp nhận|
| PSR-15 | Trình xử lý yêu cầu máy chủ HTTP | Nó mô tả các giao diện phổ biến cho các trình xử lý yêu cầu máy chủ HTTP và các thành phần phần mềm trung gian của máy chủ HTTP sử dụng các thông điệp HTTP. | Được chấp nhận|
| PSR-16 | Bộ nhớ cache đơn giản | Nó mô tả một giao diện đơn giản nhưng có thể mở rộng cho một mục bộ đệm và trình điều khiển bộ đệm. | Được chấp nhận|
| PSR-17 | HTTP Factories | Nó mô tả một tiêu chuẩn chung cho các nhà máy tạo ra các đối tượng HTTP tuân thủ PSR-7. | Được chấp nhận|
| PSR-18 | Máy khách HTTP | Nó mô tả một giao diện chung để gửi các yêu cầu HTTP và nhận phản hồi HTTP.  | Được chấp nhận|
| PSR-19 | Thẻ PHPDoc | Nó cung cấp một danh mục đầy đủ các thẻ trong tiêu chuẩn PHPDoc . | Dự thảo|
# Kết luận
PSR chỉ là một chuẩn viết code chung cho mọi người, nó không bắt buộc mọi người phải tuân theo. Nhưng nếu muốn có sự thống nhất trong mọi người mọi dự án thì đây là một cách làm rất tuyệt vời, nó đem lại khả năng tương tác của các thành phần và cung cấp một cơ sở kỹ thuật chung để thực hiện các khái niệm đã được chứng minh => lập trình tối ưu.

Bài viết tham khảo nguồn [wiki](https://en.wikipedia.org/wiki/PHP_Standard_Recommendation)!