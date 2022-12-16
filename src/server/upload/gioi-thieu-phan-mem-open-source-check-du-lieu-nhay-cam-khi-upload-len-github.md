[Nguồn](https://www.atmarkit.co.jp/ait/articles/2106/02/news113.html)

### Giới thiệu

Cloud communications platform Twilio đã phát triển một công cụ có tên là "Deadshot" để ngăn chặn việc chúng ta vô tình tải dữ liệu nhạy cảm lên GitHub và phát hành nó dưới dạng phần mềm open source vào tháng 5 năm 2021.

Vào ngày 18 tháng 5 năm 2021 (giờ Mỹ), Twilio, một công ty Cloud communications platform, đã phát hành ứng dụng GitHub "Deadshot", có chức năng như một "Pull Request (PR) Scanner". Đây là 1 phần mềm open source nhằm cảnh báo người dùng khi upload dữ liệu nhạy cảm lên GitHub.


![](https://images.viblo.asia/60073f1d-4235-4c13-a751-053c26578c1e.png)

Deadshot được cài đặt và sử dụng trong GitHub Organization. Giám sát GitHub Repository của người dùng và scan các PR khác nhau theo real-time để kiểm tra thông tin nhạy cảm. Người dùng có thể dùng Regular expressions để chỉ định thông tin nào là nhạy cảm.

Khi thông tin nhạy cảm được tìm thấy, tool sẽ tự động add 1 comment vào PR và thông báo đến kênh "Slack" được chỉ định. Nếu các PR vẫn được merge mà không giải quyết thông tin nhạy cảm đã xác định,  tool sẽ tự động tạo 1 issue lên JIRA để chờ team security xử lý.

Tất nhiên,  chúng ta rõ ràng là không nên đưa dữ liệu nhạy cảm vào  code của mình, chẳng hạn như thông tin credentials, confidential, hay là câu lệnh SQL. Nhưng ai cũng có thể mắc sai lầm, và điều quan trọng là phải phát hiện ra những sai lầm mang tính chất con người trước khi vấn đề thực sự xảy ra.

Tuy nhiên, rõ ràng là chúng ta không thể check source code một cách thủ công được.  Với tinh thần đó, Twilio nhận ra Deadshot là một cách tự động để giám sát các Repository GitHub một các real-time, scan dữ liệu nhạy cảm ở giai đoạn tạo PR, sau đó sẽ gắn cờ "có vấn đề về dữ liệu nhảy cảm" cho PR đó, và sẽ được review thủ công lại. 

### Cách hoạt động của Deadshot

Giải pháp mong muốn của Twilio là liên tục theo dõi dữ liệu nhạy cảm khớp với một tập hợp các regular expressions được xác định trước. Để sử dụng rộng rãi trong công ty, giải pháp này phải có những đặc điểm nhất định. Đây phải là một dịch vụ không yêu cầu can thiệp vào  ngoại trừ việc thêm và xóa các cụm từ thông dụng phù hợp với dữ liệu nhạy cảm.

Deadshot là một ứng dụng multi-container kết hợp "Flask", "Celery" và "Redis" dựa trên Python và được cài đặt dưới dạng ứng dụng GitHub. Xử lý tất cả PR được tạo cho main branch của repository đã cài đặt.

Flask container hiển thị API route để nhận PR payload. Khi API route nhận được PR payload, dịch vụ sẽ chuyển tiếp payload đó đến hàng đợi Redis.

Celery container nhận payload từ hàng đợi Redis, scan các điểm khác biệt của PR và tìm kiếm dữ liệu nhạy cảm được chỉ định. Nếu dữ liệu nhạy cảm được tìm thấy, Celery container sẽ thêm comment vào PR và thông báo cho kênh Slack thích hợp hoặc tạo issue JIRA.

Deadshot đã giúp rất nhiều trong nội bộ công ty Twilio để phát hiện dữ liệu nhạy cảm trong các PR trước khi merge vào một repository. Twilio cho biết họ mong đợi phản hồi từ cộng đồng open source về ứng dụng khi Deadshot public bản open source.

### Tội phạm cũng đang tìm kiếm thông tin nhạy cảm bằng các công cụ tương tự

Nhà cung cấp công cụ an ninh mạng Port Swigger đã giới thiệu Deadshot trên blog chính thức của mình vào ngày 31 tháng 5 năm 2021 (giờ Hoa Kỳ). Theo bài đăng trên blog này, chỉ quản trị viên của tổ chức mới có thể cài đặt Deadshot trên tài khoản GitHub của họ. Điều này sẽ làm giảm nguy cơ tội phạm mạng lạm dụng Deadshot, giám đốc điều hành Twilio cho biết.

Theo nhà tư vấn bảo mật James Boa, người đã bình luận về bài đăng trên blog này, tội phạm mạng đang lạm dụng các tập lệnh và bot quét các repository như GitHub, tương tự như Deadshot.

Mặt khác, GitHub đã cung cấp chức năng quét bảo mật và cũng có các công cụ mã nguồn mở như "Gittyleaks" có thể quét dữ liệu bí mật như API key và mật khẩu.