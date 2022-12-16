Bạn đang tìm cách để chuyển WordPress từ HTTP sang HTTPS và cài đặt chứng chỉ SSL trên trang web của mình? Google đã thông báo rằng trình duyệt Chrome sẽ bắt đầu đánh dấu tất cả các trang web không có SSL là không an toàn bắt đầu từ tháng 7 năm 2018. Trong bài viết này, tôi sẽ hướng dẫn bạn cách di chuyển WordPress từ HTTP sang HTTP bằng cách thêm Chứng chỉ SSL.
![](https://images.viblo.asia/a05ebda0-843d-442f-b3f8-0751295a8cef.png)
Nếu bạn chưa có ý tưởng, khái niệm gì về SSL hoặc HTTPS là gì thì hãy theo dõi ngay dưới đây.
## HPPTS là gì?
HTTPS hoặc HTTP bảo mật là phương pháp mã hóa bảo mật kết nối giữa trình duyệt của người dùng và máy chủ của bạn. Điều này làm cho nó khó khăn hơn cho tin tặc nghe trộm trên kết nối.
Mỗi ngày, chúng ta chia sẻ thông tin cá nhân của mình với các trang web khác nhau cho dù đó là mua hàng hay chỉ cần đăng nhập.
Để bảo vệ việc truyền dữ liệu, cần tạo một kết nối an toàn.
Đó là khi SSL và HTTPS sẽ được sử dụng.
Mỗi trang web được cấp chứng chỉ SSL duy nhất cho mục đích nhận dạng. Nếu máy chủ mạo danh là trên HTTPS và chứng chỉ của máy chủ không khớp, thì hầu hết các trình duyệt hiện đại sẽ cảnh báo người dùng kết nối với trang web là không an toàn.
![](https://images.viblo.asia/54a8aa7f-aea1-41b7-bc57-de1dbd1bf2f0.png)
Bây giờ bạn có thể tự hỏi, tại sao cần phải chuyển trang web WordPress của mình từ HTTP sang HTTPS đặc biệt nếu đó là một blog đơn giản hoặc trang web doanh nghiệp nhỏ không thu bất kỳ khoản thanh toán nào.
## Tại sao cần sử dụng HTTPS và SSL?
Năm ngoái, Google đã công bố một kế hoạch để cải thiện an ninh web tổng thể bằng cách khuyến khích chủ sở hữu trang web thực hiện chuyển đổi từ HTTP sang HTTPS. Là một phần của kế hoạch này, trình duyệt web Chrome phổ biến của họ sẽ đánh dấu tất cả các trang web không có chứng chỉ SSL là "Không an toàn" bắt đầu từ tháng 7 năm 2018.
![](https://images.viblo.asia/84cf87a5-17e3-42c2-ad26-dffa304f4a98.png)
Là một phần của thông báo, Google cũng cho rằng các trang web có SSL cũng sẽ thấy lợi ích SEO và thứ hạng cao hơn. Kể từ năm ngoái, một số lượng lớn các trang web đã chuyển từ HTTP sang HTTPS.
Google đã từ từ tung ra cảnh báo "Không an toàn" trong Chrome. Ví dụ: nếu ai đó truy cập trang web HTTP bằng cửa sổ ẩn danh, trang web đó sẽ được đánh dấu là Không an toàn. Nếu ai đó truy cập trang web HTTP ở chế độ thông thường và cố gắng điền vào biểu mẫu liên hệ hoặc biểu mẫu khác thì trang web sẽ được đánh dấu là không an toàn.
Khi độc giả và khách hàng của bạn nhìn thấy thông báo này, nó mang lại cho họ một ấn tượng xấu cho doanh nghiệp của bạn.
Đây là lý do tại sao tất cả các trang web cần phải di chuyển biểu mẫu HTTP sang HTTPS và cài đặt SSL ngay lập tức.
## Các yêu cầu để sử dụng HTTPS/SSL cho WordPress site
Các yêu cầu để sử dụng SSL trong WordPress không phải là rất cao. Tất cả những gì bạn cần làm là mua chứng chỉ SSL và bạn có thể đã có nó miễn phí.
Các nhà cung cấp hosting WordPress tốt nhất đang cung cấp chứng chỉ SSL miễn phí cho tất cả người dùng của họ:
* Bluehost
* SiteGround
* WPEngine
* Liquid Web
* Dreamhost
* InMotion Hosting
* GreenGeeks
* ...
Nếu nhà cung cấp hosting của bạn không cung cấp chứng chỉ SSL miễn phí thì bạn sẽ cần phải mua chứng chỉ SSL.
## Cài đặt WordPress sử dụng SSL và HTTPS
Phương pháp 1: Cài đặt SSL / HTTPS trong WordPress bằng cách sử dụng một Plugin
Phương pháp này dễ dàng hơn và được khuyến khích cho người mới bắt đầu.
Trước tiên, bạn cần phải cài đặt và kích hoạt plugin Really Simple SSL. 
Khi kích hoạt, bạn cần truy cập trang Settings » SSL. Plugin sẽ tự động phát hiện chứng chỉ SSL của bạn và nó sẽ thiết lập trang web WordPress của bạn để sử dụng HTTPS.
![](https://images.viblo.asia/ee5e14f6-8853-44ba-93a0-bed52672bcf8.png)
Plugin sẽ xử lý mọi thứ bao gồm cả lỗi Mixed Content.
Phương pháp 2: Cài đặt SSL / HTTPS trong WordPress bằng cách thủ công
Phương pháp này cần nhiều hiểu biết và kĩ năng hơn về WordPress và Hosting nên sẽ được hướng dẫn vào bài viết sau.
## Kết luận
Như vậy qua bài viết đã giúp các bạn hiểu hơn về sự cần thiết sử dụng SSL và HTTPS cho website sử dụng WordPress và cũng đã biết cách cài đặt SSL/HTTPS cho website của mình bằng phương pháp tự động! Nó sẽ giúp website của bạn bảo mật tốt hơn và có thứ tự tốt hơn về SEO và mang lại nhiều lợi ích cho website của bạn!