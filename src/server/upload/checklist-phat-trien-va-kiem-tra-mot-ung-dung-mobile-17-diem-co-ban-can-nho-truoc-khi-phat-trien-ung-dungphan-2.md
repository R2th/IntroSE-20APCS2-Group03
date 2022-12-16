Phần 1 mở đầu về chủ đề đã giới thiệu về 7 yếu tố  xác định quan điểm trước khi thực thi phát triển một ứng dụng mobile, nay chúng ta sẽ đề cập hoàn thiện chủ đề này với 10 yếu tố còn lại trong checklist  kịch bản về các hoạt động thảo luận, tìm hiểu yêu cầu của dự án mình đang phát triển để mọi người có quan điểm rõ ràng, mạch lạc để tiếp cận . 

# 8. Các sự cố kết nối mạng - GPRS, 2G, 3G, WiFi (Kết nối không liên tục hoặc không có kết nối )
Hầu hết các ứng dụng được phát triển với sự hiện diện của WiFi cung cấp kết nối mạng tốt. Tuy nhiên, điều quan trọng là phải thử nghiệm các ứng dụng trong môi trường không thuận lợi nơi người dùng có thể không có quyền truy cập WiFi  thì sẽ tương tác với người dùng như thế nào. Thông thường khi mọi người đang di chuyển vùng dữ liệu thì kết nối mạng bị gián đoạn với kết nối bị ngắt một lần trong một thời gian. Tốc độ mạng cũng thay đổi dựa trên vị trí của người dùng và loại kết nối họ phải trả phí. Các ứng dụng phải có khả năng xử lý các tình huống này một cách mượt mà và thân thiện với người dùng một cách tối ưu nhất.

# 9. Kiểm tra cập nhật ứng dụng di động + website
Ứng dụng di động của bạn có thành phần phía máy chủ hoặc dịch vụ web không? Ứng dụng di động có cần cập nhật khi thành phần phía máy chủ được cập nhật không? Nếu vậy, hãy chắc chắn rằng có một trường hợp thử nghiệm theo dõi điều này để tránh bất kỳ lỗi nghiêm trọng nào xảy ra với người dùng đang sử dụng sản phẩm  
# 10. Kiểm tra gián đoạn ứng dụng di động

Có nhiều sự kiện khác nhau có thể làm gián đoạn ứng dụng của bạn. Ứng dụng của bạn nên được kiểm tra và sẽ có thể cần xử lý những điều  như sau:
* Cuộc gọi đến
* Tin nhắn
* Thông báo ứng dụng khác
* Lưu trữ thấp
* Pin yếu
* Pin chết
* Không lưu trữ
* Chế độ máy bay
* Kết nối không liên tục
* Màn hình chính không hiển thị ổn định
* Chế độ ngủ
# 11. Kiểm tra bảo mật ứng dụng di động
Bảo mật và quyền riêng tư dữ liệu là vô cùng quan trọng trong bất kỳ kịch bản kiểm thử nào ngày nay. Đặc biệt với những dự án có tính sở hữu cá nhân cao thì người dùng lo lắng về dữ liệu và thông tin đăng nhập của họ bị lộ thông qua các ứng dụng dễ bị tấn công. Vì thế các câu hỏi mở để nâng cao tính bảo mật sẽ luôn luôn là cần thiết được liệt kê như sau:
* Ứng dụng của bạn lưu trữ thông tin thanh toán hoặc chi tiết thẻ tín dụng?
* Ứng dụng của bạn có sử dụng các giao thức mạng an toàn không?
* Ứng dụng có yêu cầu nhiều quyền truy cập hơn mức cần thiết không?
* Ứng dụng của bạn có sử dụng chứng chỉ không?
* Ứng dụng của bạn có sử dụng ID thiết bị làm định danh không?
* Ứng dụng của bạn có yêu cầu người dùng được xác thực trước khi họ được phép truy cập dữ liệu của họ không?
* Có  giới hạn số lần đăng nhập tối đa trước khi chúng bị khóa không?
Các ứng dụng nên mã hóa tên người dùng và mật khẩu khi xác thực người dùng qua mạng. Một cách để kiểm tra các kịch bản liên quan đến bảo mật là định tuyến dữ liệu di động của bạn thông qua một máy chủ proxy như Proxy tấn công OWASP Zed và tìm kiếm các lỗ hổng.

![](https://images.viblo.asia/aa0ccc13-ef4c-4566-be63-b3c2b6d18740.jpg)
# 12. Thử nghiệm thanh toán trong ứng dụng, quảng cáo và tích hợp cổng thanh toán

Nếu ứng dụng của bạn sử dụng thanh toán trong ứng dụng, quảng cáo hoặc cổng thanh toán cho các giao dịch thương mại điện tử, bạn sẽ cần kiểm tra chức năng từ đầu đến cuối để đảm bảo rằng không có vấn đề nào trong giao dịch. Thử nghiệm để tích hợp cổng quảng cáo và quảng cáo sẽ cần tạo tài khoản với các máy chủ Cổng thanh toán và Quảng cáo trước khi thử nghiệm có thể bắt đầu.
![](https://images.viblo.asia/b40257f9-d1ee-4cd2-9cfa-a8c142186630.jpg)

# 13. Kiểm tra hiệu năng ứng dụng di động
* Bạn đã kiểm tra xem hiệu suất của ứng dụng di động của bạn có bị suy giảm khi tăng kích thước của hộp thư, album, tin nhắn, nhạc hoặc bất kỳ nội dung nào khác có liên quan đến ứng dụng không?

* Áp dụng yếu tố kiểm tra này sẽ thực hành tốt để kiểm tra ứng dụng của bạn cho các vấn đề về hiệu suất và khả năng mở rộng. Với dung lượng lưu trữ lớn có sẵn với giá cả phải chăng,  không có gì lạ khi người dùng có lượng dữ liệu / nội dung lớn trên điện thoại thông minh của họ. Người dùng thậm chí lưu trữ SMS trong vài năm trên điện thoại thông minh của họ. Nếu ứng dụng của bạn có nội dung / dữ liệu do người dùng tạo liên quan đến nó (Ví dụ: Ảnh, SMS, v.v.) có thể tăng lên tỷ lệ lớn trong suốt vòng đời của ứng dụng thì trong quá trình  thử nghiệm của bạn nên bao gồm các kịch bản này để xem ứng dụng hoạt động như thế nào, có đáp ứng nhu cầu lưu trữ dung lượng lớn không. 
Trong trường hợp ứng dụng có thành phần phía máy chủ, bạn cũng nên kiểm tra ứng dụng với số lượng người dùng ngày càng tăng. Mặc dù thử nghiệm này có thể được thực hiện thủ công, chúng tôi có các công cụ như Little Eye và Neo Load có thể giúp bạn kiểm tra Hiệu suất và Tải của ứng dụng di động.
# 14. Các vấn đề về múi giờ và vùng bản địa của ứng dụng di động
Nếu ứng dụng của bạn là đa ngôn ngữ, nó cần được kiểm tra bằng các ngôn ngữ khác để đảm bảo rằng không có vấn đề mã hóa ký tự, vấn đề cắt dữ liệu hoặc bất kỳ vấn đề UI nào do độ dài ký tự khác nhau. Bạn cũng cần kiểm tra các ứng dụng để đảm bảo rằng chúng xử lý các thay đổi múi giờ. Điều gì xảy ra nếu người dùng di chuyển về phía trước theo múi giờ và quay lại múi giờ trước của họ? Làm thế nào để ứng dụng của bạn xử lý các mục với ngày và thời gian theo thứ tự nhưng không theo thứ tự thời gian?
![](https://images.viblo.asia/270b0502-afd5-4f8a-b199-c6166634f376.jpg)
# 15. Kiểm tra tích hợp mạng xã hội
Theo xu hướng nhiều ứng dụng ngày nay sản xuất với khả năng chia sẻ một bài đăng từ ứng dụng, trên tài khoản mạng xã hội của người dùng. Tuy nhiên, hầu hết người dùng muốn được redmind trước khi bài đăng được công bố trên tài khoản của họ. Ứng dụng của bạn có xử lý việc này không? Họ có được phép chia sẻ thông điệp trạng thái định chia sẻ không?
![](https://images.viblo.asia/2da3555f-b8e7-43b6-8c74-2f60a7821a37.png)

# 16. Kiểm tra kết nối phần cứng - Bluetooth, WiFi, NFC, USB - Nhận dạng thiết bị
Điện thoại thông minh đi kèm với rất nhiều tùy chọn kết nối. Nếu ứng dụng của bạn sử dụng các tùy chọn kết nối như trên (Ví dụ: Trình quản lý tệp hoặc trình chỉnh sửa ảnh cho phép bạn chia sẻ tệp của mình, AirDroid cho phép bạn truyền tệp giữa PC và điện thoại di động của bạn qua wifi) thì bạn nên kiểm tra chúng để đảm bảo chúng hoạt động như kỳ vọng. Bạn cũng nên thiết lập viewpoint  kiểm tra để xem cách họ xử lý lỗi khi mất kết nối trong khi chuyển / giao dịch. Cơ chế thường được sử dụng để chia sẻ dữ liệu hoặc giao dịch là:

* Bluetooth
* Wifi
* USB
* NFC
# 17. Tích hợp / giới hạn / danh sách thiết bị được hỗ trợ của Google Play / Apple App

Các chuyên gia tư vấn và tổ chức cung cấp dịch vụ đầu cuối cũng nên bao gồm các trường hợp thử nghiệm để đảm bảo ứng dụng di động được triển khai thành công vào cửa hàng Ứng dụng / Cửa hàng Play và chỉ khả dụng cho các thiết bị được hỗ trợ. Điều này cũng có thể bao gồm xác nhận tất cả văn bản, ảnh chụp màn hình, số phiên bản, v...v là một phần của danh sách ứng dụng.

#  Kết luận
10 yếu tố còn lại trên đã kép lại chủ đề Checklist phát triển và kiểm tra một ứng dụng Mobile. Những yếu tố này nhìn chung đều xoay quanh các tác nhân bên ngoài dễ gây ảnh hưởng đến ứng dụng Mobile, hy vọng mọi người sẽ có cái nhìn đa chiều, khách quan để kiểm tra phần mềm hiệu quả 
Link tài liệu tham khảo tại: http://tryqa.com/mobile-application-development-and-testing-checklist/