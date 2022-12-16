Đối với bất kỳ ứng dụng di động, hiệu suất là rất quan trọng. Nếu Ứng dụng di động của bạn không hoạt động tốt, người dùng cuối sẽ gỡ cài đặt ứng dụng của bạn, tìm một ứng dụng khác hoạt động tốt hơn.

Ứng dụng di động của bạn cần được kiểm tra kỹ lưỡng trước khi phát hành cho người dùng cuối.

Trong hướng dẫn này, bạn sẽ học:
- Chiến lược thử nghiệm ứng dụng di động
- Hiệu suất thiết bị
- Hiệu suất máy chủ / API
- Hiệu suất mạng
- Khắc phục sự cố hiệu suất ứng dụng di động
- Công cụ kiểm tra ứng dụng di động hữu ích
- Thử thách
- Thiết lập môi trường kiểm tra hiệu suất ứng dụng di động
- Danh sách kiểm tra hiệu suất ứng dụng di động
- Tổng kết

### Chiến lược thử nghiệm ứng dụng di động
Hiệu suất ứng dụng trên điện thoại di động hoặc bất kỳ thiết bị thông minh nào thường được đo lường theo ba loại sau.
- Hiệu suất thiết bị
- Hiệu suất máy chủ / API
- Hiệu suất mạng
![](https://images.viblo.asia/46b82bed-ebb7-4e6b-afa1-a76c2366b510.PNG)
### Hiệu suất thiết bị
Khi khách hàng trải nghiệm ứng dụng chậm, họ cảm thấy khó chịu. Đối với hiệu suất thiết bị, bạn sẽ kiểm tra:
- **Khởi động ứng dụng** <br/>
Ứng dụng của bạn mất bao nhiêu thời gian để khởi động? Đây là tham số hiệu suất đầu tiên được đánh giá bởi người dùng. Theo quy tắc ngón tay cái, sau khi người dùng chạm vào biểu tượng ứng dụng, màn hình đầu tiên sẽ hiển thị sau 1-2 giây. <br/>
- **Thời gian sử dụng pin trong khi sử dụng ứng dụng** <br/>
Khi sử dụng liên tục, một số ứng dụng di động, tiêu thụ một lượng pin lớn và làm nóng điện thoại. Yếu tố này bổ sung rất nhiều vào hiệu suất của bất kỳ ứng dụng di động nào và thông thường có thể xảy ra khi ứng dụng của bạn sử dụng nhiều tài nguyên hơn mức yêu cầu. Việc sử dụng tài nguyên quá mức tạo ra gánh nặng cho bộ xử lý và điện thoại bị nóng lên. <br/>
- **Tiêu thụ bộ nhớ** <br/>
Khi kiểm tra một ứng dụng, cần kiểm tra mức tiêu thụ bộ nhớ của một ứng dụng. Bằng cách thực hiện các chức năng nhất định trong ứng dụng, mức tiêu thụ bộ nhớ cũng tăng lên. Ví dụ: trong các ứng dụng Android khi thông báo đẩy được triển khai thì mức tiêu thụ bộ nhớ sẽ tăng.

   Trong một số trường hợp, người ta đã nhận thấy rằng việc sử dụng bộ nhớ của toàn bộ hệ điều hành chỉ là 14%, nhưng một ứng dụng mới đang tiêu tốn 11%. Vì vậy, các yếu tố này phải được xử lý trước khi triển khai ứng dụng vào thế giới thực hoặc đưa cho khách hàng.
- **Sự thay đổi phần cứng / phần mềm** <br/>
Khi kiểm tra một ứng dụng di động, bắt buộc phải kiểm tra các ứng dụng trên các thiết bị khác nhau. Nó có thể là trường hợp ứng dụng đang chạy trơn tru trên một thiết bị nhưng không phải trên thiết bị khác. Giống như đối với các nhà cung cấp thiết bị Android khác nhau, chúng tôi có thể kiểm tra ứng dụng trên điện thoại Samsung, HTC và Lenovo. Tương tự, ứng dụng cần được kiểm tra với các thông số bộ nhớ RAM và bộ xử lý khác nhau như 1 GB hoặc 2 GB.
- **Sử dụng với các ứng dụng khác** <br/>
Khi ứng dụng đang thử nghiệm đang chạy song song với các ứng dụng khác, sẽ không có nhiễu. Cách tốt nhất để kiểm tra nó là bằng cách chuyển đổi ứng dụng đang được thử nghiệm và các ứng dụng khác.
- **Ứng dụng trong nền** <br/>
Một ứng dụng đang chạy trong nền được lấy ra, nó sẽ vẫn ở trạng thái như trước. Nếu kịch bản này không được xử lý đúng cách, thì dữ liệu sẽ bị mất. Một lần nữa, bạn phải nhập dữ liệu từ đầu khi lấy ứng dụng.
###  Hiệu suất máy chủ / API
Khi ứng dụng tương tác với máy chủ thông qua API, thời gian phản hồi trở nên quan trọng đối với hiệu suất. Đối với hiệu suất Máy chủ, bạn sẽ kiểm tra:
- **Dữ liệu đến từ máy chủ**<br/>
Ứng dụng sẽ xử lý dữ liệu hiệu quả được gửi từ máy chủ. Nó không phải mất quá nhiều thời gian trong khi tải dữ liệu. Trong một số ứng dụng nhất định, dữ liệu được gửi theo định dạng cụ thể. Vì vậy, trước khi hiển thị nó trong ứng dụng, nó nên được chuyển đổi sang một định dạng có liên quan. Trong quá trình này, các ứng dụng đôi khi trở nên chậm hơn và thời gian phản hồi trở nên dài hơn.
- **Các lệnh gọi API được tạo từ ứng dụng**<br/>
Số lượng cuộc gọi từ Ứng dụng được kiểm tra đến máy chủ được tạo từ ứng dụng sẽ ít hơn. Trong một số trường hợp, nhiều lệnh gọi API được thực hiện cho cùng một chức năng. Để có hiệu suất tốt hơn, điều này nên được xử lý với số lượng cuộc gọi ít hơn.
- **Thời gian ngừng hoạt động của máy chủ**<br/>
Do bất kỳ lý do nào nếu máy chủ ngừng hoạt động hoặc không thể truy cập, chúng ta có thể lưu dữ liệu trong cơ sở dữ liệu gốc. Vì vậy, bất cứ khi nào máy chủ ngừng hoạt động, chúng ta có thể hiển thị dữ liệu được lưu trữ trong cơ sở dữ liệu gốc. Một giải pháp khác có thể là các máy chủ cơ sở dữ liệu chuyển đổi dự phòng, tức là nếu một trong các máy chủ ngừng hoạt động hoặc đang trong giai đoạn bảo trì thì máy chủ dự phòng sẽ sẵn sàng để chuyển đổi. Máy chủ dự phòng / sao lưu phải được sao chép và đồng bộ hóa liên tục với máy chủ chính.
 ### Hiệu suất mạng
 Hiệu suất của ứng dụng trên các mạng và thuộc tính mạng khác nhau cần được đo lường. Đối với hiệu suất mạng, bạn sẽ kiểm tra những điều sau đây:<br/>
* **Jitters** <br/>
Khi có sự chậm trễ trong việc nhận thông tin trên mạng, thì nó được gọi là jitter. Đó là một vấn đề với các mạng không kết nối hoặc mạng chuyển mạch gói. Khi thông tin được phân phối thành các gói, các gói có thể di chuyển theo một đường dẫn khác nhau từ người gửi đến người nhận. Khi dữ liệu đến vị trí dự định, nó sẽ bị xáo trộn so với lúc ban đầu. Trong trường hợp của Jitters, ứng dụng di động phải đủ khả năng để xử lý nó.<br/>
 Bạn cần hiển thị các thông báo phù hợp cho người dùng cuối, để gửi lại yêu cầu hoặc đợi cho đến khi hệ thống phản hồi lại.<br/>
*  **Mất gói**<br/>
  Trong trường hợp mất gói hoàn toàn, ứng dụng sẽ có thể gửi lại yêu cầu cung cấp thông tin hoặc sẽ tạo cảnh báo tương ứng. Nếu dữ liệu không đầy đủ, thì người dùng sẽ không thể hiểu được thông tin được hiển thị trong Ứng dụng. Điều này có thể gây căng thẳng cho người dùng. Vì vậy, tốt hơn là hiển thị một thông báo phù hợp hoặc nhắc người dùng thử lại.<br/>
*  **Tốc độ mạng**<br/>
  Ứng dụng cần được kiểm tra trên nhiều mạng với tốc độ thay đổi. Ứng dụng nên được thử nghiệm trên các mạng 2.5G, 3G và 4G. Cả mạng Wi-Fi và di động đều được bao gồm trong này. Ngoài ra, hành vi của ứng dụng nên được theo dõi. Đặc biệt, khi cả hai mạng đều khả dụng và việc chuyển đổi xảy ra từ mạng này sang mạng khác.

    Ví dụ: một vấn đề có thể phát sinh trong một ứng dụng cho người dùng trong khi chuyển đổi mạng điện thoại từ 4G sang WIFI và ngược lại. Trong trường hợp này, ứng dụng trở nên không phản hồi và có thể yêu cầu khởi động lại ứng dụng để sử dụng.
###  Khắc phục sự cố hiệu suất ứng dụng di động
Sau khi khám phá các vấn đề / vấn đề trong khi kiểm tra hiệu suất . Đây là thời gian để theo dõi và sửa lỗi.<br/>
**Vấn đề 1: Phản ứng chậm hoặc chậm chạp của Ứng dụng di động.**<br/>
Nguyên nhân của sự chậm trễ này có thể là RAM, Cache, v.v.<br/>
Bạn cần phải giết các tiến trình không cần thiết hoặc xóa bộ nhớ cache. Khắc phục sự cố kết nối có thể giải quyết một số vấn đề đang tạo ra độ trễ<br/>

**Vấn đề 2: Khởi động lại ứng dụng, khóa, đóng băng hoặc không phản hồi.**<br/>
Nó có thể được sửa chữa bằng một số bước sau:<br/>
- Tối ưu hóa mã ứng dụng
- Phần mềm nên được vá và cập nhật.
- Phục hồi tự động
- Quản lý RAM hoặc trong một số trường hợp ROM trong khi sử dụng thẻ ngoài
- Xóa phân vùng bộ đệm
- Xác minh ứng dụng hoạt động với các ứng dụng và API của bên thứ ba khác
- Ánh xạ ứng dụng di động theo thiết bị
### Công cụ kiểm tra ứng dụng di động hữu ích
Các công cụ kiểm tra ứng dụng di động khác nhau tùy theo thiết bị hoặc hệ điều hành của di động. Một số ứng dụng di động phổ biến, các công cụ kiểm tra hiệu suất là:<br/>
**Android**
- Robotium: Nó giống như Selenium cho ứng dụng di động. Người kiểm tra có thể ghi lại và thực hiện một số bước cần thiết để thực hiện kiểm tra.
- Monkey Runner: MonkeyRunner có thể chạy thử nghiệm trên các thiết bị thực được kết nối với PC hoặc trình giả lập. Công cụ này có API, cho phép điều khiển điện thoại thông minh, máy tính bảng hoặc trình giả lập từ bên ngoài mã Android.<br/>

**iOS**<br/>
- Automator (Mac): Automator là một ứng dụng được Apple phát triển cho OS X. Nó thực hiện việc tạo các điểm công việc theo điểm và nhấp (hoặc kéo và thả) để tự động hóa các tác vụ lặp đi lặp lại thành các đợt để thay đổi nhanh hơn. Điều này giúp tiết kiệm thời gian và công sức cho sự can thiệp của con người để thay đổi thủ công từng tệp riêng biệt.
### Thử thách
Những thách thức chính phải đối mặt trong khi kiểm tra hiệu suất bao gồm:
- Tổ chức các nền tảng di động khác nhau và hệ điều hành của họ
- Mô phỏng các kết nối như Edge, 3G, 4G hoặc WiFi, v.v.
- Các hạn chế của thiết bị di động như tiêu thụ pin và tài nguyên
- Khả năng sử dụng điện thoại di động
- Các loại kích thước của thiết bị di động để chạy cùng một ứng dụng
### Thiết lập môi trường kiểm tra hiệu suất ứng dụng di động
Để cấu hình Môi trường kiểm tra, bạn cần phải:

- Hiểu biết về ứng dụng di động cần được thử nghiệm
- Xác định hệ điều hành khác nhau mà ứng dụng cần chạy
- Xây dựng thiết lập thử nghiệm
  -   Xây dựng trình giả lập hoặc giả lập
    - Tạo mẫu của thiết lập thực tế
- Chọn công cụ thích hợp để thử nghiệm
### Danh sách kiểm tra hiệu suất ứng dụng di động
Kiểm tra hiệu suất của các ứng dụng di động là một biện pháp quan trọng trước khi phát hành. Kiểm tra hiệu suất được thực hiện để kiểm tra

- Cần bao nhiêu RAM để sử dụng ứng dụng này?
- Để xác minh tốc độ và thời gian phản hồi của APP trong các mạng và hoàn cảnh khác nhau.
- Đảm bảo trải nghiệm người dùng thực tế trong một số điều kiện mạng
- Đảm bảo đạt được kết quả cần thiết trong trường hợp có nhiều kết nối
- Đảm bảo ứng dụng không bị sập.
- Đảm bảo các ứng dụng di động hoạt động tốt trong khi sử dụng dữ liệu, Wi-Fi hoặc kết nối khác
- Theo dõi thời gian hoạt động và các tắc nghẽn sử dụng API trên thiết bị di động
- Để đảm bảo số lượng người dùng đồng thời tối đa
- Cuối cùng, để kiểm tra ứng dụng di động đến giới hạn của nó
### Tổng kết
- Kiểm tra hiệu suất đòi hỏi sự hiểu biết về Ứng dụng di động, người sử dụng tài nguyên, người dùng ảo, trình giả lập và nhiều chiến lược kiểm tra.
- Hiệu suất ứng dụng trên điện thoại di động được đo lường theo ba loại sau.
    - Hiệu suất thiết bị
   -  Hiệu suất máy chủ
    - Hiệu suất mạng
-Thử thách kiểm tra hiệu năng bao gồm kích thước nhỏ gọn của thiết bị di động, tính sẵn có của tài nguyên, chi phí và ngân sách.


### Nguồn tham khảo:<br/>
Dịch từ: https://www.guru99.com/mobile-app-performance-testing-strategy-tools.html#3