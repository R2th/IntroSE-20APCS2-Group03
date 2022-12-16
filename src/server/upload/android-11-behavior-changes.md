# Giới hạn call debugging API của JobScheduler

Android 11 cung cấp hỗ trợ gỡ lỗi cho các ứng dụng để xác định các yêu cầu API của JobScheduler đã vượt quá giới hạn tỷ lệ nhất định. 
Các nhà phát triển có thể sử dụng cơ sở này để xác định các vấn đề hiệu suất tiềm năng. 
Đối với các ứng dụng có thuộc tính **debuggable** trong manifest được đặt thành true, các JobScheduler gọi API vượt quá giới hạn sẽ trả về RESULT_FAILURE . 
Giới hạn được đặt sao cho các trường hợp sử dụng hợp pháp không bị ảnh hưởng.

# Thực hiện mã hóa dựa trên tệp sau khi khởi động lại OTA mà không có thông tin người dùng
Sau khi thiết bị nhận được bản cập nhật OTA và khởi động lại, các khóa được mã hóa thông tin xác thực được đặt trong bộ lưu trữ bảo vệ bằng thông tin có sẵn ngay lập tức cho các hoạt động  File-Based Encryption (FBE) . Do đó, ứng dụng của bạn có thể thực hiện các hành động liên quan đến mã hóa dựa trên tệp trước khi người dùng nhập mã PIN, mẫu hoặc mật khẩu của họ để mở khóa thiết bị sau khi khởi động lại.

Lưu ý: Thay đổi này chỉ ảnh hưởng đến khởi động lại thiết bị xảy ra do cập nhật OTA. Nếu ứng dụng của bạn phải luôn "tiếp tục lại sau khi khởi động lại", hãy tiếp tục hỗ trợ Direct Boot .
# One-time permissions
Trong Android 11, bất cứ khi nào ứng dụng của bạn yêu cầu quyền liên quan đến vị trí, micrô hoặc máy ảnh, ứng dụng của bạn sẽ được cấp quyền một lần tạm thời . Để tìm hiểu thêm về thay đổi này, hãy xem phần quyền một lần trên trang thảo luận về các thay đổi quyền riêng tư liên quan đến quyền trong Android 11.

Lựa chọn của người dùng có thể hạn chế khi hộp thoại cấp phép xuất hiện
Android 11 không khuyến khích các yêu cầu lặp đi lặp lại cho một sự cho phép cụ thể. Nếu người dùng chạm từ chối hai lần cho một quyền cụ thể trong suốt thời gian cài đặt ứng dụng của bạn trên thiết bị, hành động này có nghĩa là "không hỏi lại". Để tìm hiểu thêm về thay đổi này, hãy xem phần hiển thị hộp thoại cấp phép trên trang thảo luận về các thay đổi quyền riêng tư liên quan đến quyền trong Android 11.

# Truy cập vị trí nền

Nếu ứng dụng của bạn có target Android 11, bạn không thể trực tiếp yêu cầu quyền truy cập mọi lúc vào vị trí nền. Ngay cả khi ứng dụng của bạn nhắm mục tiêu Android 10 (API cấp 29) trở xuống, người dùng sẽ thấy hộp thoại hệ thống bao gồm các nút để kiểm soát truy cập vị trí tiền cảnh.

# Storage UI
Android 11 giới thiệu một số thay đổi đối với người dùng liên quan đến quyền lưu trữ, bao gồm tên của quyền Lưu trữ thời gian chạy và nội dung của hộp thoại giải thích yêu cầu của ứng dụng của bạn về quyền lưu trữ. Để tìm hiểu thêm về những thay đổi này, hãy xem phần quyền trên trang thảo luận về các thay đổi quyền riêng tư liên quan đến lưu trữ trong Android 11.

# Thống kê sử dụng ứng dụng riêng tư
Để bảo vệ người dùng tốt hơn, Android 11 lưu trữ số liệu thống kê sử dụng ứng dụng của mỗi người dùng trong bộ nhớ được mã hóa thông tin xác thực . Do đó, cả hệ thống và bất kỳ ứng dụng nào cũng không thể truy cập dữ liệu đó trừ khi isUserUnlocked() trả về true , xảy ra sau khi một trong những điều sau đây xảy ra:

Người dùng mở khóa thiết bị của họ lần đầu tiên sau khi khởi động hệ thống.
Người dùng chuyển sang tài khoản của họ trên thiết bị.
Nếu ứng dụng của bạn đã liên kết với một phiên bản của UsageStatsManager , hãy kiểm tra xem bạn có gọi các phương thức trên đối tượng này không sau khi người dùng mở khóa thiết bị của họ. Mặt khác, API bây giờ trả về giá trị null hoặc rỗng.

Ý định MANAGE_OVERLAY_PERMISSION luôn đưa người dùng đến màn hình cấp phép hệ thống
Bắt đầu với Android 11, các ý định ACTION_MANAGE_OVERLAY_PERMISSION luôn đưa người dùng đến màn hình Cài đặt cấp cao nhất nơi họ có thể cấp hoặc thu hồi các quyền của SYSTEM_ALERT_WINDOW cho các ứng dụng. Bất kỳ package: dữ liệu trong ý định được bỏ qua.

Trong các phiên bản trước của Android, mục đích ACTION_MANAGE_OVERLAY_PERMISSION có thể chỉ định gói, sẽ đưa người dùng đến màn hình dành riêng cho ứng dụng để quản lý quyền. Chức năng này không còn được hỗ trợ trong Android 11. Thay vào đó, trước tiên, người dùng phải chọn ứng dụng họ muốn cấp hoặc thu hồi quyền. Thay đổi này nhằm bảo vệ người dùng bằng cách cấp phép có chủ ý hơn.

# Quyền truy cập tất cả tập tin
Một số ứng dụng có trường hợp sử dụng cốt lõi yêu cầu truy cập tệp rộng, chẳng hạn như quản lý tệp hoặc các hoạt động sao lưu & khôi phục. Họ có thể nhận được tất cả quyền truy cập tệp bằng cách khai MANAGE_EXTERNAL_STORAGE quyền MANAGE_EXTERNAL_STORAGE đặc biệt.

Thận trọng: Quyền MANAGE_EXTERNAL_STORAGE cho phép các ứng dụng truy cập dữ liệu có khả năng nhạy cảm trên bộ nhớ chia sẻ. Trong các phiên bản sắp tới của Bản xem trước dành cho nhà phát triển, hãy tìm Google Play để cung cấp các nguyên tắc cho các ứng dụng cần sự cho phép này.

# Khai báo sử dụng nút trợ năng trong tệp siêu dữ liệu
Bắt đầu từ Android 11, dịch vụ trợ năng của bạn không thể khai báo liên kết với nút trợ năng của hệ thống khi chạy. Nếu bạn nối thêm AccessServiceInfo.FLAG_REQUEST_ACCESSITALITY_BUTTON vào thuộc tính flags của đối tượng AccessServiceInfo, khung sẽ không chuyển các sự kiện gọi lại nút trợ năng cho dịch vụ của bạn.

Thay vào đó, hãy khai báo liên kết của dịch vụ trợ năng của bạn với nút trợ năng bằng cách sử dụng cờ flagRequestAccessibilityButton trong tệp siêu dữ liệu dịch vụ trợ năng của bạn, thường là res/raw/accessibilityservice.xml flagRequestAccessibilityButton .

# Hạn chế Non-SDK interface
Android 11 bao gồm các danh sách cập nhật các Non-SDK interface bị hạn chế dựa trên sự cộng tác với các nhà phát triển Android và thử nghiệm nội bộ mới nhất. Bất cứ khi nào có thể, chúng tôi đảm bảo rằng các lựa chọn thay thế công khai có sẵn trước khi chúng tôi hạn chế các Non-SDK interface.

Nếu ứng dụng của bạn không nhắm mục tiêu Android 11, một số thay đổi này có thể không ảnh hưởng đến bạn ngay lập tức. Tuy nhiên, mặc dù hiện tại bạn có thể sử dụng các Non-SDK interface là một phần của greylist (tùy thuộc vào cấp API mục tiêu của ứng dụng của bạn), sử dụng bất kỳ phương pháp hoặc trường Non-SDK nào cũng có nguy cơ phá vỡ ứng dụng của bạn.

Nếu bạn không chắc chắn ứng dụng của mình có sử dụng Non-SDK interface hay không, bạn có thể kiểm tra ứng dụng của mình để tìm hiểu. Nếu ứng dụng của bạn dựa trên các Non-SDK interface, bạn nên bắt đầu lập kế hoạch di chuyển sang các lựa chọn thay thế SDK. Tuy nhiên, chúng tôi hiểu rằng một số ứng dụng có các trường hợp sử dụng hợp lệ để sử dụng Non-SDK interface. Nếu bạn không thể tìm thấy giải pháp thay thế cho việc sử dụng Non-SDK interface cho một tính năng trong ứng dụng của mình, bạn nên yêu cầu API công khai mới .

# File descriptor sanitizer (fdsan)
fdsan phát hiện việc xử lý sai quyền sở hữu mô tả tệp, chẳng hạn như sử dụng sau khi đóng và đóng hai lần. Chế độ mặc định cho fdsan đang thay đổi trong Android 11. fdsan hiện hủy bỏ khi phát hiện lỗi; hành vi trước đó là đăng nhập một cảnh báo và tiếp tục.

# Scudo Hardened Allocator
Android 11 sử dụng Scudo Hardened Allocator trong nội bộ để phân bổ heap dịch vụ. Scudo có khả năng phát hiện và giảm thiểu một số loại vi phạm an toàn bộ nhớ. Nếu bạn đang thấy các sự cố liên quan đến Scudo (ví dụ: Scudo ERROR: :) trong các báo cáo sự cố gốc, hãy tham khảo tài liệu khắc phục sự cố Scudo .

# SSL sockets sử dụng công cụ SSL Conscrypt theo mặc định
Trong Android 11, triển khai SSLSocket mặc định sử dụng Conscrypt SSLEngine .

# Thay đổi API di động mở
Bắt đầu với Android 11, API di động mở (OMAPI) có chức năng bổ sung:

* Phân tích quy tắc cho các đặc quyền nhà cung cấp.

* Tùy chỉnh quyền truy cập Phần tử bảo mật (eSE) được nhúng hoặc cung cấp eSE bằng một hoặc nhiều cách sau:

* Hệ thống cho phép đặc quyền
* Mã định danh ứng dụng (ARA-M) (AID)
* API hệ thống để đặt lại trình đọc OMAPI
* Cung cấp cho độc giả một chỉ báo rõ ràng cho các ứng dụng để lọc khả năng của thiết bị.

# Hỗ trợ sử dụng đồng thời nhiều hơn một camera
Android 11 bổ sung API để truy vấn hỗ trợ cho việc sử dụng nhiều camera cùng một lúc, bao gồm cả camera phía trước và phía sau.

Nguồn : https://developer.android.com/preview/behavior-changes-all