Nói về mạng và kết nối giữa các máy tính chúng ta thường nghe đến [localhost](https://nxthemes.com/localhost-la-gi-127-0-0-1-va-localhost/) hoặc local host, nhưng chính xác thì nó là gì? Chúng ta hãy thử làm sáng tỏ chủ đề và hiểu rõ hơn về localhost, từ ý nghĩa đến tầm quan trọng của nó khi làm việc trên WordPress.

Vì vậy, trong bài viết này tôi sẽ giải thích localhost là gì và cách bạn có thể sử dụng nó để dễ dàng phát triển các dự án web của mình. Ngoài ra, tôi cũng sẽ cho bạn thấy tổng quan về các nền tảng phát triển chính có sẵn cho các hệ điều hành khác nhau.

## Localhost là gì

Một cách tốt để nghĩ về localhost , trong mạng máy tính, là xem nó như là “máy tính này”. Đây là tên mặc định được sử dụng để thiết lập kết nối với máy tính của bạn bằng mạng địa chỉ vòng lặp.

Địa chỉ loopback có IP mặc định ([127.0.0.1](https://nxthemes.com/localhost-la-gi-127-0-0-1-va-localhost/)) hữu ích để kiểm tra các chương trình trên máy tính của bạn mà không cần gửi thông tin qua internet. Điều này hữu ích khi bạn đang thử nghiệm các ứng dụng chưa sẵn sàng cho thế giới xem.

Khi bạn gọi một địa chỉ IP từ máy tính của mình, bạn thường cố gắng kết nối với một máy tính khác qua internet. Tuy nhiên, với địa chỉ loopback, bạn đang gọi localhost, hay còn gọi là máy tính của bạn.

Nếu bạn muốn tìm hiểu về mạng máy tính, điều quan trọng là phải hiểu ngôn ngữ mà bạn sẽ sử dụng. Không có nơi nào tốt hơn để bắt đầu, hơn là tìm hiểu về localhost.

## 127.0.0.1 and a loopback address là gì

Giống như địa chỉ IP, khi nhập google.com trong trình duyệt web, nó sẽ đưa bạn đến trang web lưu trữ cục bộ, trang chính của Google. Vậy localhost sẽ đưa bạn đến đâu? Nó sẽ đưa bạn đến máy tính của bạn. Tình huống này còn được gọi là địa chỉ lặp lại.

Giống như bất kỳ tên miền nào khác, localhost cũng có địa chỉ IP (Giao thức Internet). Các địa chỉ nằm trong khoảng từ 127.0.0.0 đến 127.255.255.255 , nhưng thường là 127.0.0.1 . Cố gắng mở địa chỉ 127.0.0.1 trong kết nối IPv4 sẽ kích hoạt lặp lại, đưa bạn trở lại máy chủ web của riêng mình. Bạn cũng có thể bắt đầu lặp lại máy chủ của mình bằng kết nối IPv6 bằng cách nhập: 1.

Sự thật thú vị: phần đầu tiên của địa chỉ - 127 - chỉ dành riêng cho các vòng lặp. Vì lý do đó, Giao thức Điều khiển Truyền và Giao thức Internet (TCP / IP) ngay lập tức nhận ra rằng bạn muốn liên hệ với máy tính của mình sau khi nhập bất kỳ địa chỉ nào bắt đầu bằng những số này. Đó là lý do tại sao không có trang web nào có thể có địa chỉ IP bắt đầu bằng 127 . Nếu được bắt đầu, hành động này sẽ tạo ra một thiết bị lặp lại; là một giao diện ảo bên trong hệ điều hành ( OS ) của máy tính .

## Localhost được sử dụng để làm gì?

Mặc dù ý nghĩa đơn giản của nó, localhost rất hữu ích nếu bạn là nhà phát triển, quản trị viên mạng và để thử nghiệm. Nói chung, có ba lợi thế mà loopback mang lại:


### Kiểm tra chương trình hoặc ứng dụng web

Sử dụng localhost là một trong những cách sử dụng chính của các nhà phát triển; đặc biệt nếu họ đang tạo ứng dụng web hoặc chương trình yêu cầu kết nối internet. Trong quá trình phát triển, các bài kiểm tra được chạy để xem liệu các ứng dụng có thực sự hoạt động hay không. Bằng cách sử dụng một vòng lặp để kiểm tra chúng, các nhà phát triển có thể tạo một kết nối đến máy chủ cục bộ, để được kiểm tra bên trong máy tính và hệ thống mà họ hiện đang sử dụng.

Vì hệ điều hành của bạn trở thành một máy chủ web mô phỏng sau khi một vòng lặp được kích hoạt. Bạn có thể tải các tệp cần thiết của một chương trình vào máy chủ web và kiểm tra chức năng của nó.

### Chặn trang web

Một thủ thuật thú vị khác là chặn các trang web mà bạn không muốn truy cập. Vòng lặp lại rất hữu ích để ngăn trình duyệt của bạn xâm nhập vào các trang web có hại, chẳng hạn như những trang chứa vi rút.

Tuy nhiên, trước khi tìm hiểu cách thức hoạt động của tệp này, bạn cần biết “ tệp máy chủ lưu trữ ” là gì và vai trò của nó trong ngữ cảnh này. Như bạn đã biết, tất cả các miền đều có địa chỉ IP. Bạn có thể nhập một trang web vì DNS hoặc Hệ thống tên miền tìm kiếm địa chỉ IP thích hợp mà trang đó được đăng ký.

Máy tính của bạn giúp cải thiện quy trình này bằng cách lưu trữ tệp máy chủ lưu trữ cho mọi trang web bạn đã truy cập. Tệp này chứa địa chỉ IP và tên miền của các trang web. Bạn có thể thay đổi địa chỉ IP thành 127.0.0.1 và trang web lưu trữ tệp bạn đã sửa đổi sẽ chuyển hướng bạn đến máy chủ cục bộ.

Một ví dụ có thể là quản trị viên máy tính của công ty chặn quyền truy cập vào một trang web.

### Kiểm tra tốc độ

Với tư cách là quản trị viên mạng, bạn sẽ muốn đảm bảo rằng tất cả thiết bị và TCP / IP đều ở tình trạng tốt nhất. Bạn có thể thực hiện việc này bằng kiểm tra kết nối và bằng cách gửi yêu cầu ping đến máy chủ cục bộ.

Ví dụ: bạn có thể dễ dàng mở dấu nhắc lệnh hoặc thiết bị đầu cuối và nhập “ ping localhost ” hoặc “ ping 127.0.0.1 ”. Kiểm tra localhost sẽ cho thấy mọi thứ hoạt động tốt như thế nào, từ số lượng gói dữ liệu được nhận, gửi đi hoặc bị mất, cho đến thời gian truyền dữ liệu. Nếu có bất kỳ sự cố nào, bạn có thể ngay lập tức khắc phục bất kỳ sự cố nào xảy ra.

## Phần kết luận

Bây giờ bạn hiểu rằng localhost không chỉ đơn thuần là một thuật ngữ kỹ thuật cho máy tính của bạn. Đây là tên mặc định cho phép bạn kiểm tra các chương trình và thậm chí đóng quyền truy cập vào các trang web. Nếu bạn muốn trở thành một kỹ thuật viên CNTT, điều cần thiết là phải biết localhost là gì và cách sử dụng loopback theo nhu cầu của bạn.

Cảm ơn bạn đã xem, bài viết này được dịch từ https://www.hostinger.com/tutorials/what-is-localhost nên văn phong chưa chuẩn lắm.

Mong bạn đọc thông cảm ạ