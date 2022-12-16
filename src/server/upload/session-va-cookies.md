#### Trong chủ đề về “Session và Cookies” mình sẽ đi từ khái quát đến chi tiết.

#### Với phạm vi của bài viết này mình sẽ giới thiệu tổng quát về khái niệm, cách hoạt động, ứng dụng và nên sử dụng session hay cookies trong ứng dụng của bạn. Ở bài viết sau mình sẽ trình bày Session và Cookies trong Ruby on Rails. Sau đây mình sẽ đi vào chi tiết.

# 1. Session
## a. Khái niệm

Session là phiên làm việc. Nó là cách đơn giản để lưu trữ 1 biến và khiến biến đó có thể tồn tại từ trang này sang trang khác.
Nếu như với các biến thông thường, khi trang web bất kỳ bắt đầu thực thi, biến đó sẽ được cấp phát bộ nhớ, lưu giá trị và thu hồi vùng nhớ sau khi trang kết thúc. Session sẽ khác, nó có thể được tạo ra, tồn tại trên server , có thể xuyên từ trang này sang trang khác, chỉ mất đi khi ta xóa nó hoặc hết tuổi thọ (quá thời gian load dữ liệu hoặc thoát khỏi địa chỉ trang-đóng ứng dụng). Để biết thêm nhiều thông tin về session, các bạn tham khảo wikipedia :https://en.wikipedia.org/wiki/Session_(computer_science) :)
## b. Vậy Session hoạt động như thế nào?

Session khi sinh ra được lưu trên 1 file có tên dài dòng, khó đoán và được tạo ngẫu nhiên là session id trên máy chủ, và đồng thời ở máy client cũng có 1 cookie sinh ra có nội dung (hay giá trị) đúng như session id (để có thể so khớp session nào là của client nào).
Đối với mỗi ngôn ngữ lập trình web sẽ có tên cookie quy định như php là PHPSESSID, jsp là JSESSIONID, … Các giá trị của biến session sẽ được lưu trong file đó (khác so với các biến thông thường là được lưu trong bộ nhớ server – trong php file nội dung được lưu trong thư mục thiết lập trong file php.ini (tham số session.save_path)).
(Ở bài viết sau mình sẽ đi vào chi tiết Session trong Rails)


## c. Ứng dụng
Một trong các ứng dụng điển hình là việc quản lý Đăng nhập, Đăng xuất của thành viên mà hầu hết các trang Web nào cũng phải có.
 Với những tác vụ cần xác nhận là thành viên mới sử dụng được, chúng ta cần yêu cầu thành viên đăng nhập vào hệ thống. Nhưng nếu chỉ dùng biến thông thường thì mỗi lần cần thực hiện lại phải đăng nhập vào. Trong khi ấy, nều dùng session thì sau khi đăng nhập, 1 biến session được tạo ra (ví dụ là user_id), thì biến này sẽ tồn tại từ trang này sang trang khác, như thế khi cần thực hiện tác vụ khác cũng cần đăng nhập, ta chỉ cần kiểm tra xem có tồn tại biến user_id này hay chưa là đủ. Nếu tồn tại rồi thì thôi, chưa tồn tại thì đăng nhập.
    Ở phần trên có nhắc tới khái niệm Cookies. Vậy Cookie là gì và các hoạt động của nó trên trang Web ra sao?

# 2. Cookies

## a. Khái niệm

Cookie là một phần dữ liệu được lưu trên máy khách. Mỗi khi máy khách gửi một yêu cầu tới máy chủ nào đó, thì nó sẽ gửi phần dữ liệu được lưu trong cookie tương ứng với máy chủ đó.

Trong Cookie có một số thông số sau:

Địa chỉ URL mà trình duyệt sẽ gửi cookie tới
Thời gian hết hạn của cookie
Các cặp biến: giá trị được lưu trữ liên tục

Để biết thêm nhiều thông tin về cookie, các bạn tham khảo wikipedia : https://en.wikipedia.org/wiki/HTTP_cookie

## b. Cách hoạt động

Khác với dữ liệu gửi từ form (POST hay GET) thì cookies sẽ được trình duyệt tự động gửi đi theo mỗi lần truy cập lên máy chủ.
Trong quá trình làm việc, cookie có thể bị thay đổi giá trị. Cookie sẽ bị vô hiệu hoá nếu cửa sổ trình duyệt điều khiển cookie đóng lại và cookie hết thời gian có hiệu lực. Theo mặc định, thời gian “sống” của cookies là tồn tại cho đến khi cửa sổ trình duyệt sử dụng cookies bị đóng. Tuy nhiên người ta có thể thiết lập tham số thời gian để cookie có thể sống lâu hơn (6 tháng chẳng hạn). Ví dụ như chế độ Remember ID & Password của 1 số trang web.


## c. Ứng dụng

Người ta thường dùng cookies để lưu trữ các thông tin có liên quan đến nhiều phiên làm việc khác nhau (qua nhiều lần đóng và mở session). Vì giao thức HTTP là giao thức không lưu trạng thái (Mỗi khi xử lý xong một yêu cầu từ máy khách là nó sẽ ngắt kết nối và có thể kết thúc phiên), nên cookie sinh ra để làm nhiệm vụ lưu trữ một số biến trạng thái để khắc phục nhược điểm này.

Vậy vấn đề đặt ra ở đây là “Nên sử dụng Cookies hay Session“?

# 3. Sử dụng Session hay Cookies?

Sử dụng Session hoặc Cookie là tuỳ vào lựa chọn của Lập trình viên, tuy nhiên Session thường được ưa chuộng hơn Cookie vì một số lý do sau:

Trong một số trường hợp Cookie không sử dụng được. Có thể browser đã được thiết lập để không chấp nhận cookie, lúc đó session vẫn sử dụng được bằng cách truyền session ID giữa các trang web qua URL.
Lượng data truyền tải giữa browser và server: chỉ mỗi session ID được truyền giữa browser và server, data thực sự được website lưu trữ trên server.
Bảo mật: càng ít thông tin được truyền tải qua lại giữa browser và client càng tốt, và càng ít thông tin được lưu trữ tại client càng tốt.


Trên đây mình đã giới thiệu cơ bản về Khái niệm cũng như cách hoạt động và ứng dụng của Session và Cookies trong ứng dụng Web của bạn. Mong các bạn có cái nhìn tổng quát và nắm bắt sơ lược về nó.

Cảm ơn các bạn đã theo dõi bài viết.