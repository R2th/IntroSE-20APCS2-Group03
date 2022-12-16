Dưới đây là một số những điểm cần lưu ý khi phát triển và kiểm thử ứng dụng di dộng 

## 1. Nền tảng phát triển ứng dụng di động
iOS và Android là 2 nền tảng ưu tiên hàng đầu cho việc phát triển các ứng dụng di động. Ngoài ra, Blackberry vẫn được sử dụng bởi một số người dùng doanh nghiệp và một số đáng kể trên thế giới vẫn sử dụng nền tảng Symbian. Việc nắm bắt được nền tảng nào được sử dụng phổ biến sẽ giúp bạn đưa ra quyết định quan trọng liên quan đến kiến trúc/ thiết kế và cũng cung cấp thông tin đầu vào cần thiết. 
Một số nền tảng phổ biến:

- Android
- iOS
- Windows Mobile
- Blackberry
- Symbian
## 2. Phiên bản của nền tảng di động 
Trước khi phát triển và kiểm thử ứng dụng di động cần xác định rõ phiên bản của hệ điều hành sẽ phát triển ứng dụng.Và note thông tin phiên bản vào tài liệu phát triển ứng dụng khi người kiểm thử sẽ tiến hành kiểm thử trên đúng phiên bản đó của hệ điều hành tương ứng.
Đồng thời việc xác định và thống nhất được rõ phiên bản mà ứng dụng hỗ trợ sẽ giúp ngăn chặn việc cài đặt ứng dụng trên các phiên bản hệ điều hành không được hỗ trợ. Tránh được sự phản hồi tiêu cực từ phía khách hàng (hay từ phía end-user) Tất nhiên, người kiểm thử cần kiểm tra và đảm bảo rằng ứng dụng của bạn hoạt động trên phiên bản hệ điều hành được nhắm đến.

*Thống kê về khả năng được sử dụng các phiên bản của  hệ điều hành adroid*

![](https://images.viblo.asia/f0611c0d-f3c2-48a3-9ef0-57d6c67ead69.png)

*Thống kê về khả năng được sử dụng các phiên bản của  hệ điều hành iOS*

![](https://images.viblo.asia/0ea23e4f-a21b-4e27-82cd-5e6691027c72.png)

## 3. Yêu cầu thiết bị phần cứng 
ứng dụng có yêu cầu phần cứng cụ thể hay không? ví dụ:
- Bộ nhớ
- Máy ảnh
- CPU
-...

Cần xác định rõ trước khi phát triển và kiểm thử
## 4. Độ phân giải màn hình
Những thiết bị đi động hay máy tính bảng có độ phân giải màn hình khác nhau. Dưới dây một số độ phân giải phổ biển thường được sử dụng cần đảm bảo răng ứng dụng sẽ hiển thị tốt trên các độ phân giải khác nhau:
- 320 x 480px
- 640 x 960px
- 480 x 800px
- 720 x 1280px
- 768 x 1280px
- 800 x 1280px
- 1200 x 1920px
- 2048 × 1536px
## 5. Sử dụng phiên bản riêng biệt cho những thiết bị lớn hỗ trợ độ phân giải cao

Thực tiễn đã cho thấy việc sử dụng đồ họa chất lượng cao cho các thiết bị lớn như máy tính bảng là khá tốt, đặc biệt nếu ứng dụng hoặc trò chơi được dự kiến sẽ được sử dụng trên các thiết bị này. Một số nhà phát triển đã phát hành một phiên bản HD riêng biệt của ứng dụng / trò chơi thay vì sử dụng một phiên bản duy nhất. Vì vậy khi kiểm thử cũng cần kiểm tra tất cả phiên bản được phát triển cho những thiết bị hỗ trợ. 
## 6. Hướng dọc hoặc ngang
Một số trò chơi chỉ hoạt động ở chế độ nằm ngang của thiết bị trong khi một số ứng dụng được thiết kế chỉ hoạt động ở chế độ dọc và một số khác hoạt động ở cả hai chế độ. Vì vậy khi kiểm thử cần đảm bảo rằng ứng dụng hoạt động đúng ở chế độ dọc, ngang hoặc cả hai được đưa ra.

## 7. Kiểm tra chức năng GPS, Accelerometer, khóa phần cứng

Nếu ứng dụng của bạn yêu cầu sử dụng các tính năng phần cứng sau, thì người kiểm thử cũng cần kiểm tra ứng dụng khi những tính năng phần cứng không sẵn có: 

Khóa phần cứng
*Ví dụ:*
- Ứng dụng máy ảnh sử dụng nút camera chuyên dụng
- ứng dụng quả lý công việc/sự kiện sử dụng nút phần cứng để báo lại lời nhắc
- trình phát phương tiện sử dụng âm lượng và một số phím khác vv
- Một số ứng dụng cũng sử dụng nút nguồn để cung cấp chức năng / phím tắt bổ sung để sử dụng ứng dụng
Accelerometer
- Các ứng dụng sử dụng cảm biến gia tốc này sẽ yêu cầu việc kiểm thử đảm bảo rằng các số đo được ghi lại chính xác và được sử dụng chính xác trong ứng dụng. Trường hợp này có thể sử dụng trong việc kiểm thử các ứng dụng như đo bước chân, trình theo dõi chuyển động, trò chơi, ứng dụng trực quan hóa 3D,...
GPS
- Kiểm tra xem các ứng dụng điều hướng của bạn phản ứng như thế nào nếu GPS bị tắt hoặc tắt đột ngột trong khi hoạt động
Bất kỳ cảm biến nào khác 
- Nếu ứng dụng phụ thuộc vào các cảm biến bổ sung như nhiệt độ, độ sáng hoặc bất kỳ phụ kiện nào cung cấp chức năng bổ sung thì cần kiểm thử ứng dụng trong các điều kiện thiếu đi những sự phụ thuộc xem chúng hoạt động như thế nào.

## 8. Các vấn đề về kết nối mạng - GPRS, 2G, 3G, WiFi, kết nối liên tục, không có kết nối

Hầu hết các ứng dụng được phát triển trong điều kiện có WiFi với tốc độ kết nối mạng tốt.
Tuy nhiên, điều quan trọng là phải kiểm thử các ứng dụng trong mỗi trường sử dụng thực tế, sẽ có trường hợp người dùng có thể không thể truy cập WiFi. 
Cũng có khi mọi người đang di chuyển, kết nối mạng sẽ không liên tục hoăc bị mất kết nối trong một thời gian. Hoặc tốc độ mạng cũng thay đổi dựa trên vị trí của người dùng và loại kết nối mà họ phải trả phí để sử dụng. Vậy yêu cầu đặt ra là các ứng dụng sẽ cần xử lí một cách mượt mà, thân thiện với người dùng trong trường hợp xảy ra các vấn đề về kết nối mạng.

## 9. Kiểm tra bản cập nhật ứng dụng web dành cho thiết bị di động 

Ứng dụng di động của bạn có thành phần phía máy chủ hay dịch vụ web mà ứng dụng đó sử dụng? Nếu có thì ứng dụng di động có cần cập nhật khi thành phần phía máy chủ được cập nhật không? Cần chắc chắn bộ testcase cần bao gồm cả trường hợp này để tránh xảy ra lỗi, phản hồi tiêu cực từ phía người dùng.

## 10. Kiểm tra gián đoạn đối với ứng dụng dành cho thiết bị di động

Một số sự kiện dễ xảy ra trong quá trình ứng dụng của bạn đang hoạt động. Vì vậy cần kiểm tra xem ứng dụng có xử lí tốt trong trường hợp có sự kiện làm gián đoạn hay không?. Ví dụ

- Cuộc gọi đến
- Tin nhắn văn bản
- Thông báo ứng dụng khác
- Bộ nhớ thấp, hoặc không đủ
- Pin yếu
- Pin chết
- Chế độ máy bay
- Kết nối liên tục
- Nhảy màn hình chính
- Chế độ ngủ
- Điện thoại bị sập nguồn
- ...

## 11. Kiểm tra bảo mật ứng dụng di động

Bảo mật và dữ liệu riêng tư là vô cùng quan trọng đối với người dùng bởi vì sẽ có những dữ liệu quan trọng và thông tin đăng nhập của họ được hiển thị thông qua các ứng dụng có thể bị tấn công. Ví dụ:

* Ứng dụng có lưu trữ thông tin thanh toán hoặc chi tiết thẻ tín dụng không?
* Ứng dụng có sử dụng giao thức mạng an toàn không?
* Người dùng có thể được chuyển thông tin hay dữ liệu sang những người không an toàn không?
* Ứng dụng có yêu cầu nhiều quyền hơn nhu cầu không?
* Ứng dụng có sử dụng chứng chỉ không?
* Ứng dụng có sử dụng ID thiết bị làm định danh không?
* Ứng dụng của bạn có yêu cầu người dùng phải được xác thực trước khi họ được phép truy cập dữ liệu của họ không?
* Có số lần đăng nhập tối đa trước khi chúng bị khóa không?
Để đảm bảo tính bảo mật các ứng dụng nên mã hóa tên người dùng và mật khẩu khi xác thực người dùng qua mạng.
Một cách để kiểm tra các trường hợp bảo mật liên quan là sử dụng định tuyến dữ liệu di động thông qua một máy chủ proxy như OWASP Zed Attack Proxy và tìm lỗ hổng bảo mật.

## 12. Kiểm thử ứng dụng thanh toán, quảng cáo hay tích hợp cổng thanh toán

Nếu ứng dụng có chức năng thanh toán, quảng cáo hoặc tích hợp cổng thanh toán cho giao dịch thương mại điện tử thì người kiểm thử sẽ cần phải kiểm tra chức năng từ đầu đến cuối để đảm bảo rằng không có vấn đề gì xảy ra trong quá trình xư lí giao dịch. Việc kiểm tra tích hợp cổng thanh toán và quảng cáo sẽ cần các tài khoản được tạo bằng các máy chủ Cổng thanh toán và Quảng cáo trước khi quá trình kiểm thử có thể bắt đầu.

## 13. Thử nghiệm hiệu suất ứng dụng di động

-  Kiểm tra xem hiệu suất của ứng dụng di động của bạn có giảm đi với dung lượng hộp thư, album, tin nhắn, nhạc hoặc bất kỳ nội dung nào khác có liên quan đến ứng dụng 
Thực tiễn cho thấy rằng cần kiểm tra các vấn đề hiệu suất và khả năng mở rộng của ứng dụng khi ứng dụng của bạn có nội dung / dữ liệu do người dùng tạo ra (Ví dụ: Ảnh, SMS vv) có thể tăng lên tỷ lệ lớn trong suốt thời gian tồn tại của ứng dụng, vậy các thử nghiệm cần bao gồm các tình huống này để xem ứng dụng hoạt động như thế nào. 
Trong trường hợp ứng dụng có thành phần phía máy chủ, thì nên kiểm tra ứng dụng với số lượng người dùng lớn. Ngoài việc kiểm thử bằng tay thì có thể sử dụng công cụ như Little Eye và Neo Load để kiểm tra hiệu suất và tải ứng dụng dành cho thiết bị di động.

## 14. Các vấn đề về bản địa hóa và múi giờ của ứng dụng dành cho thiết bị di động

Nếu ứng dụng tích hợp đa ngôn ngữ, thì cần kiểm thử ứng dụng trên tất cả những ngôn ngữ được sử dụng để đảm bảo rằng không có vấn đề mã hóa ký tự, vấn đề cắt bớt dữ liệu hoặc bất kỳ những vấn đề về giao diện người dùng nào do độ dài ký tự khác nhau, do việc chuyển giao từ ngôn ngữ này sang ngôn ngữ khác. 
Ngoài ra cũng cần phải kiểm thử các ứng dụng khi có sự thay đổi múi giờ sẽ xử lí ra sao. 

## 15. Kiểm tra tích hợp mạng xã hội

Nhiều ứng dụng có khả năng chia sẻ bài đăng sang ứng dụng khác hoặc từ tài khoản mạng xã hội của người dùng. Tuy nhiên, hầu hết người dùng muốn được xác nhận trước khi bài đăng được chia sẻ trên tài khoản của họ vì vậy cần kiểm tra ứng dụng có xử lý việc này không? Họ có được phép chia sẻ thông báo trạng thái đang được chia sẻ không?

## 16. Kiểm tra kết nối phần cứng - Bluetooth, WiFi, NFC, USB - Nhận dạng thiết bị

Điện thoại thông minh có rất nhiều tùy chọn kết nối.
Ví dụ: Trình quản lý tệp hoặc trình chỉnh sửa ảnh cho phép bạn chia sẻ tệp của mình, AirDroid cho phép bạn chuyển tệp giữa PC và điện thoại di động qua wifi
Nếu ứng dụng sử dụng các tùy chọn kết nối dưới đây thì người kiểm thử cần kiểm tra chúng để đảm bảo ứng dụng hoạt động như kỳ vọng trong điều kiện lí tưởng hoặc không: 

* Bluetooth
* Wifi
* USB
* NFC
## 17. Tích hợp trên Google Play/Apple App và danh sách thiết bị hỗ trợ/hạn chế ứng dụng

Cần kiểm tra để đảm bảo rằng ứng dụng dành cho thiết bị di động được triển khai thành công tới cửa hàng App store / Google Play và chỉ khả dụng cho các thiết bị được hỗ trợ. Điều này cũng có thể bao gồm việc xác thực tất cả văn bản, ảnh chụp màn hình, số phiên bản v.v.

Hy vọng bài viết có thể giúp các bạn có cái nhìn đầy đủ hơn khi tạo testcase cho việc kiểm thử ứng dụng di động

*Nguồn tham khảo:*

http://tryqa.com/mobile-application-development-and-testing-checklist/