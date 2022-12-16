Kiểm thử chịu tải - Load Testing là một hình thức kiểm tra phi chức năng được thực hiện để hiểu hành vi của một ứng dụng theo tải người dùng cụ thể. Kiểm tra tải được thực hiện bằng cách mô phỏng tải người dùng thời gian thực trên ứng dụng đang được kiểm tra và điều này xác định cách ứng dụng phản hồi khi nhiều người dùng truy cập máy chủ đồng thời nó cho thấy ứng dụng thời gian phản hồi, sử dụng CPU và bộ nhớ, sử dụng mạng và băng thông.
![](https://images.viblo.asia/a4dfd311-cdec-476c-9f32-6ec3a187275d.png)

## Tại sao phải kiểm thử chịu tải?
Bài toán: Kiểm tra chịu tải rất quan trọng trước khi một cửa hàng trực tuyến bắt đầu thực hiện chiến dịch quảng cáo theo mùa, không gian, thời gian, tiền bạc và tài nguyên sẽ bị lãng phí nếu hệ thống không thể đáp ứng nhu cầu thêm được đặt vào thời điểm cực đoan, sử dụng cao điểm.

Ví dụ: Một trang web mua sắm trực tuyến gần đây đã tìm thấy điều này với chi phí của họ. Họ  sẽ thực hiện một đợt giảm giá trực tuyến lớn trong mùa lễ hội sắp tới và giảm giá rất lớn cho những người dùng đang có kế hoạch mua hàng trong thời gian thỏa thuận này. Họ đã chi rất nhiều tiền để quảng cáo tin tức này và mong đợi cơ sở khách hàng khổng lồ của họ sẽ đến và mua hàng trong cửa hàng này. Khách hàng lưu ý ngày này trên lịch của họ và háo hức chờ đợi trong ngày. Ngày trọng đại đã đến - nhưng trang web đã ngừng hoạt động và thật đáng thất vọng, tất cả những người mua hàng hy vọng nhận được khi cố gắng truy cập trang web là thông báo: **Lỗi  HTTP 503 - Dịch vụ không có sẵn**. Các thương gia đã mất một số tiền lớn và kinh doanh vì lỗi kỹ thuật này và họ tiếp tục phân tích lý do tại sao nó xảy ra. Nó đã được tiết lộ rằng ứng dụng của họ không đủ tốt để chấp nhận số lượng người dùng lớn hơn bình thường đã cố gắng truy cập trang web của họ trong thời gian giao dịch. Các máy chủ không thể chịu được tải và nó đã bị hỏng! Vào ngày đó, họ nhận ra tầm quan trọng của việc kiểm tra tải trọng tiềm năng trên máy chủ. Họ nên chạy thử nghiệm mô phỏng một số người dùng có thể đã truy cập trang web của họ trong thời gian giao dịch. Điều này sẽ cho thấy khả năng tải của máy chủ tốt (hoặc kém) như thế nào. Vâng, tải thử nghiệm là rất quan trọng!

## Kiểm thử chịu tải chi tiết
Kiểm thử chịu tải xác định mức độ đáp ứng của máy chủ đối với các yêu cầu mà nó nhận được. Nó sẽ tiết lộ cách máy chủ hoạt động theo tải người dùng khác nhau. Ví dụ: máy chủ của bạn sẽ phản hồi như thế nào khi tải được 100k người dùng? Còn khoảng 200k, 300k thì sao? Kiểm thử chịu tải về cơ bản là một nghiên cứu hành vi của máy chủ theo các tải khác nhau. Hành vi của máy chủ có thể cải thiện hoặc trở nên kém hiệu quả hơn trong các tình huống khác nhau như sau:

- Thay đổi mã mới
- Thay đổi / nâng cấp phần cứng mới
- Các tính năng mới được thêm vào ứng dụng, v.v.
- Sự thay đổi môi trường


## Các thông số kiểm tra
Các thông số khác nhau cần được theo dõi trong khi kiểm thử chịu tải thử nghiệm một ứng dụng.

### Thời gian đáp ứng
Điều này cho thấy máy chủ phản hồi nhanh như thế nào đối với yêu cầu nhận được. Ví dụ: nếu bạn nhấp vào nút đăng nhập, bạn có được đăng nhập nhanh không? Hoặc bạn đã được yêu cầu đợi một thời gian trước khi thực sự đăng nhập? Thời gian đáp ứng càng ít, hiệu suất càng tốt. Đơn vị được sử dụng để đo thời gian đáp ứng là giây.

### Thông lượng
Điều này xác định có bao nhiêu yêu cầu có thể được xử lý tại một thời điểm. Thông lượng càng nhiều thì hiệu suất càng tốt. Đơn vị đo lường ở đây là byte mỗi giây.

### Sử dụng CPU / Bộ nhớ / Mạng / Đĩa
Giá trị này sẽ được biểu thị dưới dạng giá trị phần trăm cho thấy CPU / Bộ nhớ / Mạng / Đĩa được sử dụng tốt như thế nào cho các tải khác nhau. Giá trị phần trăm càng ít thì việc sử dụng càng tốt.

### Tải người dùng
Đây là số lượng người dùng đồng thời mà ứng dụng có thể chịu được. Số lượng đồng thời càng lớn mà không có bất kỳ lỗi đột ngột nào, ứng dụng càng hiệu quả.

## Các mẫu thử trong kiểm thử chịu tải
Các mẫu tải khác nhau có thể được sử dụng để kiểm tra các kịch bản truy cập người dùng theo thời gian thực. Dưới đây là các mẫu chính:

### Tải ổn định
Trong thiết kế này, tải người dùng sẽ được phân phối đều đặn trong thời gian thử nghiệm nhất định. Ví dụ: nếu thử nghiệm được lên kế hoạch trong 60 phút, tải người dùng sẽ không đổi trong suốt quá trình thử nghiệm.

### Tăng tải lên (Bước tải lên)
Trong thiết kế này, tải người dùng sẽ được tăng cường theo các khoảng thời gian đã đặt. Ví dụ: nếu bạn đang chạy thử nghiệm trong 60 phút với khoảng thời gian tăng thêm 15 phút, tải người dùng sẽ được tăng lên mỗi quý. Vì vậy, nếu tải người dùng là 100, tải có thể được tăng thêm 25 người sau mỗi 15 phút.

### Giảm tải xuống (Bước tải xuống):
Đây là đảo ngược chính xác của thiết kế dốc lên. Tải người dùng sẽ được giảm tại các khoảng thời gian nhất định.

## Quá trình kiểm thử chịu tải
Trong quy trình kiểm thử chịu tải, bước đầu tiên là lập kịch bản các giao dịch. Giao dịch là một tập hợp các hành động trong một khoảng thời gian hoặc kịch bản cụ thể. Các công cụ kiểm tra tải hiện đại cho phép ghi lại các giao dịch bằng cách sử dụng các tùy chọn ghi và phát lại. Khi một kịch bản giao dịch được chuẩn bị, chúng có thể được tùy chỉnh bằng cách thêm các cải tiến nhất định. Một số cải tiến phổ biến là:

### Suy nghĩ thời gian
Nghĩ rằng thời gian là khoảng thời gian người dùng thời gian thực thực hiện giữa các hành động. Thời gian gần đúng này có thể được chỉ định trong kịch bản.

### Tương quan
Đôi khi, bạn sẽ cần tương quan một số dữ liệu với tập lệnh được ghi. Ví dụ: nếu bạn đang cố tải thử nghiệm một số giao dịch cho phiên người dùng, ID phiên được ghi có thể không hoạt động trong khi phát lại vì nó có thể không còn hiệu lực. Vì vậy, bạn sẽ cần phải lấy ID phiên mới từ nhật ký để thực hiện phát lại.

### Lặp lại
Giá trị này đề cập đến số lần bạn cần để chạy một giao dịch. Nếu lặp được đặt là 10 cho 100 người dùng, các giao dịch sẽ được chạy 10 lần cho mỗi 100 người dùng.

### Chạy cài đặt thời gian
Bạn cần đặt trình duyệt đích, loại mạng (Lan, băng thông rộng, v.v.) trước khi bắt đầu kiểm tra tải.
Thông số dữ liệu
Nếu bạn muốn tải thử nghiệm một kịch bản đăng nhập và kiểm tra nó cho 100 người dùng với 100 thông tin đăng nhập khác nhau, thì điều này cần phải được cung cấp dưới dạng tập dữ liệu mà một phần của tập lệnh nâng cao.
## Các giai đoạn thực hiện thử nghiệm
Kiểm tra thực hiện có hai giai đoạn - trước và sau. 

### Giai đoạn thực hiện trước

- Môi trường thử nghiệm phải gần giống với môi trường sản xuất
- Máy phát điện tải sẽ phải sẵn sàng và sẵn sàng
- Làm nóng máy chủ với tải nhỏ trong thời gian ngắn
- Kiểm tra và xác thực cài đặt giả mạo IP / Proxy
- Thiết lập cài đặt tạo báo cáo để đối chiếu và phân tích kết quả
### Giai đoạn thực hiệnsau

- Lưu kết quả kiểm tra
- Xuất kết quả và biểu đồ
- Lưu dữ liệu kiểm tra và nhật ký
- Phân tích hiệu suất quầy
## Kết luận
Như được mô tả trong phần "Tại sao kiểm thử chịu tải?" , kiểm tra tải là quan trọng trong bất kỳ ứng dụng nào thường xuyên xảy ra  khi truy cập trang. Là người thử nghiệm, chúng ta sẽ phải khôn ngoan trong việc phân tích và xác định các tình huống quan trọng có thể làm giảm hiệu suất bằng cách chọn mẫu thử tải, tăng cường tập lệnh thử tải và phân tích kết quả.

Hy vọng với kiến thức ít ỏi của mình, bài chia sẻ sẽ giúp ích cho chủ để mà bạn đang tìm kiếm:smiley:

Bài viết được tham khảo từ nguồn: https://blog.testlodge.com/what-is-load-testing/