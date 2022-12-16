Đối với bất kỳ ứng dụng mobile nào, hiệu suất là rất quan trọng. Nếu ứng dụng mobile của bạn không hoạt động tốt, người dùng cuối sẽ gỡ cài đặt ứng dụng của bạn tìm ứng dụng khác hoạt động tốt hơn. Do đó ứng dụng mobile cần được kiểm tra kỹ lưỡng trước khi phát hành đến người dùng cuối.

## 1. Kiểm thử hiệu năng ứng dụng mobile bao gồm những gì?
Hiệu suất ứng dụng mobile hoặc ứng dụng trên bất kỳ thiết bị thông minh nào thường được đo bằng ba loại:

* Hiệu suất device
* Hiệu suất máy chủ / API
* Hiệu suất mạng

![](https://images.viblo.asia/bdb89091-5dd9-432f-8300-66d5ed4f131a.png)

## 1.1 Hiệu suất device
Đối với hiệu suất device, bạn sẽ kiểm tra:

**Thời gian khởi động ứng dụng :**
Mất bao nhiêu thời gian để ứng dụng của bạn khởi động? Đây là thông số hiệu suất đầu tiên được người dùng quyết định. Theo quy tắc ngón tay cái, sau khi người dùng chạm vào biểu tượng ứng dụng, màn hình đầu tiên sẽ được hiển thị sau 1-2 giây.

**Thời gian pin trong khi sử dụng ứng dụng :**
Khi sử dụng liên tục, một số ứng dụng mobile tiêu thụ lượng pin cao và làm nóng điện thoại. Yếu tố này làm giảm hiệu suất của khi sử dụng các ứng dụng mobile và thường xảy ra khi ứng dụng của bạn đang sử dụng nhiều tài nguyên hơn so với yêu cầu. Sử dụng quá nhiều tài nguyên tạo ra gánh nặng cho bộ vi xử lý và điện thoại bị nóng lên.

**Bộ nhớ tiêu thụ :**
Khi kiểm tra một ứng dụng, nên kiểm tra mức tiêu thụ bộ nhớ của một ứng dụng. Bạn có thể kiểm tra bộ nhớ tiêu thụ bằng cách  thực hiện thực hiện các chức năng hệ thống và đo lường mức tiêu thụ bộ nhớ. Ví dụ: Với chức năng push notification, bạn thực hiện kiểm thử trong trường hợp có nhiều notification và check xem bộ nhớ tiêu thụ đã được tăng lên bao nhiêu

Quan sát thấy rằng trên hệ điều hành IOS, việc sử dụng bộ nhớ của toàn bộ hệ điều hành chỉ là 14%, nhưng một ứng dụng mới có thể dùng đến 11% do đó các vấn đề về bộ nhớ cần được xử lý trước khi đưa ứng dụng ra thị trường.

**Các loại phần cứng / phần mềm khác nhau:**
Hiện nay, với mỗi hệ điều hành có rất nhiều loại device khác nhau. Với Android có Samsung, LG, HTC, Lenovo... còn trên IOS có các dòng Iphone, Ipad. Với mỗi hệ điều hành thì lại có các version khác nhau. Khi thử nghiệm ứng dụng dành cho thiết bị di động, bắt buộc phải kiểm tra ứng dụng trên các thiết bị khác nhau trên nhiều version khác nhau của hệ điều hành. Ứng dụng của bạn có thể chạy trơn tru trên thiết bị này nhưng hoàn toàn có thể không chạy được trên một thiết bị khác. Ngoài ra, với các thiết bị khác nhau cũng cần phải quan tâm đến các thông số RAM và bộ xử lý như 1 GB hoặc 2 GB.

**Sử dụng cùng lúc với các ứng dụng khác :**
Khi ứng dụng chạy chạy cùng với các ứng dụng khác rất có thể bị nhiễu hoặc crash. Cách tốt nhất để kiểm tra đó là sử dụng ứng dụng song song với nhiều ứng dụng khác để tìm ra vấn đề.

**Ứng dụng chạy nền :**
Ngoài những trường hợp trên, bạn còn phải kiểm tra việc chạy nền của ứng dụng. Khi một ứng dụng chạy nền được gọi lại, ứng dụng cần được khôi phục lại trạng thái giống như thời điểm trước khi chạy nền. Nếu như không khôi phục lại được trạng thái ban đầu đồng nghĩa với việc dữ liệu của app bị mất, khi đó người dùng phải nhập lại dự liệu gây ảnh hưởng không ít đến trải nghiệm người dùng.

## 1.2. Hiệu suất máy chủ / API 

![](https://images.viblo.asia/dd325059-ee67-4eeb-aa0f-79acb26d1289.jpg)

Khi ứng dụng gửi nhận request với máy chủ qua API, response time là yếu tố ảnh hưởng rất nhiều đến hiệu suất. Đối với hiệu suất máy chủ, bạn sẽ kiểm tra:

**Dữ liệu đến và đi từ máy chủ :**
Ứng dụng sẽ xử lý dữ liệu hiệu nhận được từ máy chủ. Thời gian tải dữ liệu từ máy chủ cần được xử lý sao cho càng ngắn càng tốt. Trong một số trường hợp do ứng dụng nhận về dữ liệu có định dạng khác với định dạng mà nó sẽ xử lý nên cần có bước chuyển đổi định dạng, trường hợp này khiến ứng dụng hoạt động chậm hơn, response time lớn hơn.

**API Calls Generate từ App :**
Số lượng request từ ứng dụng gọi đến máy chủ nên được hạn chế. Trong một số trường hợp, nhiều request gọi API cho cùng một chức năng sẽ làm giảm hiệu suất ứng dụng. 

**Server Down Time :**
Do bất kỳ lý do nào nếu máy chủ bị lỗi hoặc không thể truy cập, rất cần phải lưu dữ liệu trong native database. Vì vậy, bất cứ khi nào máy chủ bị down, ứng dụng có thể hiển thị dữ liệu được lưu trữ trong native database. Một giải pháp khác là cần có máy chủ backup, nghĩa là nếu một trong các máy chủ bị hỏng hoặc trong giai đoạn bảo trì thì máy chủ backup sẽ có sẵn để chuyển đổi. Máy chủ dự backup cần được sao chép và đồng bộ liên tục với máy chủ chính.

## 1.3. Hiệu suất mạng
Hiệu suất của ứng dụng trên các mạng và thuộc tính mạng khác nhau cần phải được đo lường. Đối với hiệu suất mạng, bạn sẽ kiểm tra những điều sau đây:

**Jitters :**
Khi có sự chậm trễ trong việc nhận thông tin trên mạng, thì nó được gọi là **jitters**. Jitters là một vấn đề với mạng không dây hoặc mạng chuyển mạch gói. Khi thông tin được phân phối thành các gói, các gói tin có thể di chuyển theo một đường khác nhau từ người gửi đến người nhận. Khi dữ liệu đến vị trí dự định, dữ liệu sẽ bị xáo trộn so với dữ liệu ban đầu được gửi. Trong trường hợp xảy ra Jitters, ứng dụng di động phải đủ khả năng để xử lý nó hoặc phải hiển thị thông báo thích hợp cho người dùng cuối để yêu cầu gửi lại yêu cầu hoặc đợi cho đến khi hệ thống phản hồi lại.

![](https://images.viblo.asia/5daf8878-71e2-494c-b76b-db7539306197.gif)

**Mất gói :**
Trong trường hợp mất gói hoàn toàn, ứng dụng sẽ có thể gửi lại request hoặc bắn ra alert tương ứng. Nếu dữ liệu chưa hoàn thành không nên thực hiện xử lý hay hiển thị dữ liệu bởi khi đó người dùng hoặc ứng dụng không thể hiểu được. Tốt hơn là hiển thị thông báo phù hợp hoặc nhắc người dùng thử lại.

**Tốc độ mạng :**
Ứng dụng cần được kiểm tra trên nhiều mạng có tốc độ thay đổi. Ứng dụng sẽ được kiểm tra trên các mạng 2.5G, 3G và 4G, Wi-Fi. Ngoài ra, hành vi của ứng dụng sẽ được theo dõi khi sử dụng trên các mạng. Đặc biệt, trong trường hợp thiết bị đang có sẵn cả hai mạng (3G, Wifi), cần phải kiểm tra việc ứng dụng khi thực hiện huyển đổi từ mạng này sang mạng khác. Có nhiều vấn đề có thể phát sinh trong ứng dụng khi chuyển đổi mạng điện thoại từ 4G sang WIFI và ngược lại như ứng dụng không phản hồi hoặc yêu cầu khởi động lại.

# 2. Các sự cố về hiệu năng trên thiết bị di động
* Response lag hoặc chậm
* Ứng dụng Khởi động lại
* Look
* Freeze
* Không phản hồi
 
**Một số giải pháp:**

* Tối ưu code
* Phần mềm cần được vá và cập nhật.
* Restore
* Quản lý RAM hoặc trong một số trường hợp ROM khi sử dụng thẻ bên ngoài
* Xóa phân vùng bộ nhớ cache
* Xác minh ứng dụng hoạt động với các ứng dụng và API của bên thứ ba khác
* Mapping ứng dụng với device

# 3. Các tool test hiệu năng trên mobile:
Một số công cụ kiểm tra hiệu suất ứng dụng dành cho thiết bị di động phổ biến:

**[Robotium](https://github.com/RobotiumTech/robotium):** Nó giống như Selenium cho Mobile Apps. Người thử nghiệm có thể ghi và thực hiện một số bước cần thiết để thực hiện kiểm tra.

**[Monkey Runner](https://developer.android.com/studio/test/monkeyrunner/):** MonkeyRunner có thể chạy thử nghiệm trên các thiết bị thực được kết nối với PC hoặc trình giả lập. Công cụ này có API, cho phép điều khiển điện thoại thông minh, máy tính bảng hoặc trình giả lập từ bên ngoài mã Android.

**[Automator (Mac)](http://macosxautomation.com/automator/):** Automator là một ứng dụng được phát triển bởi Apple cho OS X. Nó thực hiện việc tạo và nhấp (hoặc kéo và thả) tạo luồng công việc để tự động hóa các tác vụ lặp đi lặp lại thành các lô để thay đổi nhanh hơn. Điều này tiết kiệm thời gian và công sức đối với sự can thiệp của con người để tự thay đổi từng tệp một cách thủ công.

# 4. Thách thức
Các thách thức chính gặp phải khi kiểm tra hiệu năng bao gồm:
* Nhiều thiết bị mobile ứng với các hệ điều hành khác nhau với nhiều kích thước khác nhau
* Simulating Connectivitie như Edge, 3G, 4G hoặc WiFi, v.v.
* Các ràng buộc về thiết bị di động như mức tiêu thụ pin và resource...
* Khả năng sử dụng điện thoại di động

# 5. Cấu hình test environment
Để cấu hình Test Environment, bạn cần phải:

* Hiểu về ứng dụng dành cho thiết bị di động cần được kiểm tra
* Xác định hệ điều hành khác nhau mà ứng dụng cần chạy
* Xây dựng thiết lập thử nghiệm
* Xây dựng trình mô phỏng hoặc trình mô phỏng
* Tạo mẫu thiết lập thực tế
* Chọn công cụ thích hợp để thử nghiệm

# 6. Checklist dành cho việc test hiệu năng
![](https://images.viblo.asia/8e4bc087-58eb-4d90-b2b5-fb533f946161.jpg)

Một số quan điểm test quan trọng cần lưu ý: 

* Cần bao nhiêu RAM để sử dụng ứng dụng này?
* Để xác minh tốc độ và thời gian phản hồi của APP trong các mạng và hoàn cảnh khác nhau.
* Đảm bảo trải nghiệm người dùng thực tế trong một số điều kiện mạng
* Đảm bảo các kết quả cần thiết đạt được trong trường hợp có nhiều kết nối
* Đảm bảo ứng dụng không bị crash.
* Đảm bảo các ứng dụng di động hoạt động tốt trong khi sử dụng dữ liệu, Wi-Fi hoặc kết nối khác
* Theo dõi thời gian hoạt động và tắc nghẽn khi tương tác với API
* Để đảm bảo số lượng người dùng đồng thời tối đa
* Cuối cùng, để kiểm tra ứng dụng dành cho thiết bị di động với giới hạn của ứng dụng

Nguồn: https://www.guru99.com/mobile-app-performance-testing-strategy-tools.html#1