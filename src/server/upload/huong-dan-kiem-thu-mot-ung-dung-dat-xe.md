Sẽ không có khách hàng nào sẵn sàng sử dụng một ứng dụng không an toàn hoặc chậm chạp. Trong thời đại kỹ thuật số này, sự cạnh tranh là rất cao và rất có thể bạn sẽ không có cơ hội thứ hai. Vì vậy cần lên kế hoạch tỉ mỉ và kỹ lưỡng cho việc thử nghiệm một ứng dụng đặt xe:

1. Bảo mật dữ liệu khách hàng / tài xế: ứng dụng sẽ bao gồm dữ liệu cá nhân của khách hàng và tài xế. Bất kỳ vi phạm bảo mật nào trong lĩnh vực này đều có thể dẫn đến phức tạp pháp lý cho công ty và chủ sở hữu ứng dụng.
2. Thanh toán và Ví tích hợp: Hầu hết các ứng dụng đặt xe sẽ có một cổng thanh toán tích hợp để cho phép thanh toán dễ dàng cho các chuyến đi. Các cổng và tùy chọn thanh toán này cần được kiểm tra từng chi tiết để đảm bảo tiền của khách hàng được an toàn.
3. Giao diện người dùng dễ sử dụng: Ứng dụng phải được thiết kế theo cách mà các loại người dùng khác nhau bao gồm cả người già và những người mới sử dụng Internet có thể sử dụng ứng dụng một cách dễ dàng.
4. Độ chính xác của dữ liệu: Ứng dụng cần được kiểm tra để đảm bảo độ chính xác của dữ liệu ở nhiều điểm. Điều này sẽ bao gồm dữ liệu của khách hàng, tài xế, chi tiết chuyến đi, ưu đãi, giá vé, tính toán khoảng cách, .... Độ chính xác của mọi dữ liệu hiển thị trên ứng dụng cần được xác minh tính đúng đắn của nó.

## Cần kiểm thử những gì?

### Từ góc độ khách hàng

1. Dữ liệu khách hàng: Dữ liệu khách hàng trong ứng dụng cần được kiểm tra để đảm bảo dữ liệu chính xác. Điều này sẽ bao gồm chi tiết cá nhân, chi tiết thanh toán, chi tiết chuyến đi, địa điểm đón và trả khách yêu thích
2. Đăng ký người dùng và tài xế: Đăng ký cho cả khách hàng và tài xế cần phải được kiểm tra để kiểm tra dữ liệu được lưu trong máy chủ. Người dùng có thể chỉnh sửa và xóa thông tin chi tiết của họ.
3. Liên quan đến bản đồ và theo dõi trực tiếp: Kiểm tra các chức năng liên quan đến bản đồ là rất quan trọng đối với bất kỳ ứng dụng đặt xe. Điều này bao gồm mở ứng dụng ở vị trí hiện tại, tìm xe taxi ở khu vực lân cận và theo dõi trực tiếp chuyển động của xe trước và sau khi xác nhận đặt chỗ.
4. Theo dõi thời gian: Chuyển động trực tiếp của xe taxi phải được liên kết với thời gian thực hiện để đến điểm đến hoặc thời gian để tiếp cận khách hàng. Các giá trị này cần được thay đổi liên tục để xác minh chức năng hoạt động tốt. Điều này có thể được kiểm tra bằng cách mô phỏng một chiếc xe đang di chuyển và sau đó tính toán vị trí và thời gian. Một yêu cầu quan trọng ở đây sẽ là refresh data. Việc này cần được quyết định bởi doanh nghiệp, lý tưởng nhất là khoảng thời gian từ 1 giây trở xuống, để khách hàng không thấy có độ trễ. Nhưng dựa trên thiết kế hệ thống và tải, doanh nghiệp cũng có thể quyết định trong 2-5 giây.
5. OTP: Hầu hết các ứng dụng sẽ có hệ thống tạo OTP để xác thực người dùng tại thời điểm đăng ký. OTP cần được xác thực dựa trên dữ liệu khách hàng nhập hợp lệ. Số lần lấy lại OPT cho 1 giao dịch cần được kiểm tra kỹ lưỡng. Nếu OTP được tạo lại, hệ thống sẽ chỉ chấp nhận OTP mới nhất và không chấp nhận OTP trước đó. Bỏ qua điều này nếu không áp dụng cho ứng dụng của bạn.
6. Lịch sử và giao dịch trên Wallet: Hầu hết các ứng dụng sẽ có tùy chọn để nạp tiền vào ví bằng cổng thanh toán được thiết lập trước. Ví cần được kiểm tra để biết số tiền nạp vào, số dư, lịch sử giao dịch, tiền hoàn lại và ưu đãi. Điều này cũng đúng với các tùy chọn thanh toán khác như thẻ ghi nợ, thẻ tín dụng, UPI và các tùy chọn khác theo ứng dụng.
7. Chuyến đi - khoảng cách và thời gian: Các chi tiết liên quan đến chuyến đi cần được kiểm tra. Điều này sẽ bao gồm khoảng cách giữa địa điểm đón và trả khách. Con đường được chọn phải là con đường ngắn nhất tối ưu nhất dựa trên các điểm tắc nghẽn. Thời gian dự kiến ​​của chuyến đi và các chi tiết khác của chuyến đi theo nhu cầu của doanh nghiệp.
8. Sửa đổi chuyến đi: Người dùng phải được phép thực hiện các thay đổi đối với chuyến đi. Điều này sẽ bao gồm việc hủy bỏ và thay đổi điểm đến. Trong trường hợp này, khoảng cách, thời gian, số tiền và tuyến đường của chuyến đi sẽ thay đổi tương ứng. Kiểm tra xem có giới hạn về số lần người dùng có thể thực hiện các thay đổi hay không. Nếu có giới hạn như 2 hoặc 3 thì cần phải kiểm tra xem thay đổi thứ 4 có bị hệ thống từ chối hay không.
9. Chia sẻ xe: Hầu hết các ứng dụng sẽ cho phép chia sẻ xe taxi giữa mọi người. Trong trường hợp này, điều quan trọng là phải kiểm tra khoảng cách giữa các điểm đón được chia sẻ. Giới hạn này phải do doanh nghiệp đặt ra. Kiểm tra các yêu cầu và sau đó kiểm tra để đảm bảo các lượt đón chia sẻ được lên lịch trong phạm vi đó. Nếu ứng dụng của bạn không có chức năng này hãy bỏ qua nó 
10. Thông tin chi tiết về tài xế và xe taxi: Khách hàng sẽ có thể xem tất cả các thông tin chi tiết về tài xế và xếp hạng khách hàng trước đây của họ. Họ cũng có thể thấy số xe và kiểu xe cùng với số liên lạc của tài xế.
11. Push notification và SMS: Mỗi ứng dụng đều có các yêu cầu riêng đối với SMS, email và tin nhắn push. Chúng sẽ bao gồm các thông báo xác nhận đặt chỗ, xe đến, thông tin chi tiết về tài xế, OTP, kết thúc chuyến đi, số tiền phải trả, yêu cầu hủy, yêu cầu phản hồi và những thông báo khác. Mỗi thứ này cần được kiểm tra để đảm bảo rằng chúng có thời hạn theo yêu cầu của doanh nghiệp.
12. Tìm kiếm: Một trong những khía cạnh quan trọng nhất của việc tìm kiếm bản đồ. Điều này sẽ bao gồm việc tìm kiếm xe taxi ở vị trí hiện tại và vị trí bất kỳ theo yêu cầu của người dùng. Các đề xuất về vị trí khi người dùng bắt đầu nhập thông tin địa điểm. Việc tìm kiếm sẽ hiển thị các xe  có sẵn trong khu vực cùng với bản đồ tuyến đường. Nó sẽ thông báo cho khách hàng về khoảng cách và thời gian đến xe taxi gần nhất.
13. Ưu đãi: Thỉnh thoảng, công ty có thể đưa ra các ưu đãi và giảm giá cho tất cả hoặc khách hàng cụ thể. Mã ưu đãi và tính hợp lệ của chúng cần được kiểm tra cùng với bất kỳ yêu cầu cụ thể nào để cung cấp các ưu đãi. Số tiền được giảm sau khi cung cấp ưu đãi cần được kiểm tra kỹ lưỡng.
14. Hệ thống phản hồi và đánh giá: Ứng dụng nên bao gồm hệ thống phản hồi và đánh giá cho cả khách hàng và tài xế. Họ sẽ có thể đưa ra phản hồi và xếp hạng cho nhau. Những xếp hạng này cần được phân tích để cải thiện các dịch vụ được cung cấp.
15. Hỗ trợ khách hàng : Ứng dụng sẽ có hỗ trợ khách hàng 

### Từ góc độ người lái xe

1. Dữ liệu tài xế: Giống như dữ liệu khách hàng, ứng dụng cũng sẽ chứa dữ liệu tài xế, ưu đãi của anh ta, số chuyến đi đã thực hiện, xếp hạng sao (nếu có), lịch thanh toán của anh ta và các chi tiết khác. Điều này một lần nữa cần được kiểm tra để đảm bảo ánh xạ trong cơ sở dữ liệu hoặc máy chủ là chính xác và các truy vấn được sử dụng để tìm nạp dữ liệu đáp ứng các mong đợi.
2. Khả năng hiển thị chuyến đi và các tùy chọn: Người lái xe sẽ có thể nhìn thấy tìm kiếm của khách hàng trong một khoảng cách cụ thể theo vị trí hiện tại của anh ta do doanh nghiệp ấn định. Anh ta cũng nên có lựa chọn chấp nhận hoặc từ chối chuyến đi. Sau khi chấp nhận chuyến đi nên được ẩn cho các trình điều khiển khác.
3. Quyền lợi và Lịch sử chuyến đi: Hầu hết tài xế sẽ được trả tiền dựa trên số chuyến đi mà họ đã thực hiện và lợi ích sẽ tăng lên khi số chuyến đi đã hoàn thành hàng ngày hoặc hàng tuần. Tất cả những chi tiết này cùng với các tùy chọn và lịch sử thanh toán sẽ có sẵn để người lái xe xác minh.
4. Ẩn dữ liệu cá nhân của khách hàng: Dữ liệu khách hàng rất quan trọng, đặc biệt là số điện thoại. Để liên hệ với khách hàng, cần có một số điện thoại đường dây nóng và thông tin chi tiết về khách hàng nên được giấu với tài xế. 

### Thêm một số quan điểm kiểm tra ứng dụng đặt xe?

Các ứng dụng nhất định phải được cài đặt trên nhiều thiết bị với các phiên bản hệ điều hành khác nhau. Kiểm tra hiệu suất phải được thực hiện định kỳ để đảm bảo rằng ứng dụng đang hoạt động tốt và nó có những gì cần thiết để đáp ứng kỳ vọng của khách hàng.

Ngoài quy trình làm việc bình thường của mô-đun đăng ký, bạn cũng phải đảm bảo rằng việc đăng nhập và tích hợp mạng xã hội được truyền qua hệ thống một cách dễ dàng.
Kiểm tra quy trình xác thực email để đảm bảo khi thực hiện xác thực thành công
Đảm bảo rằng có các liên kết không cần thiết đính kèm vào thư do hệ thống gửi
Đảm bảo rằng người dùng có thể phân biệt các tin nhắn được tạo tự động
Đảm bảo rằng hệ thống thông tin địa lý (GIS) đồng bộ với hệ thống và các chức năng
Kiểm tra khả năng tương thích hệ điều hành của ứng dụng với các phiên bản khác nhau
Đảm bảo rằng thông tin được cung cấp cho người dùng chính xác
Cổng thanh toán không thể thiếu đối với các ứng dụng đặt taxi. đảm bảo rằng nó không có bất kỳ kẽ hở nào và đang hoạt động tốt
Kiểm tra ứng dụng ở nhiều với độ tải khác nhau và các loại mạng khác nhau (3G,4G, Wifi...)


tài liệu tham khảo: https://www.testbytes.net/blog/how-to-test-a-taxi-booking-app-like-uber/