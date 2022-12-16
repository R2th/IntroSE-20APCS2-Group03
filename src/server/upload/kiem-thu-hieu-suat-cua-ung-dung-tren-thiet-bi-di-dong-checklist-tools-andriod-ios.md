Đối với mỗi ứng dụng di động nào thì hiệu suất cũng rất quan trọng. Nếu Ứng dụng dành cho thiết bị di động của bạn hoạt động không tốt, người dùng cuối sẽ gỡ cài đặt ứng dụng của bạn và tìm một ứng dụng khác hoạt động tốt hơn.

Ứng dụng di động của bạn cần được test kỹ lưỡng trước khi phát hành cho người dùng cuối.

# Chiến lược kiểm thử ứng dụng di động
Hiệu suất ứng dụng trên điện thoại di động hoặc bất kỳ thiết bị thông minh nào thường được đo lường theo ba loại sau.

* Hiệu suất thiết bị
* Hiệu suất Server / API
* Hiệu suất mạng
![](https://images.viblo.asia/75d603d8-f728-4e04-b9be-c485cc3d5ad0.png)

## Hiệu suất thiết bị
Khi khách hàng trải nghiệm ứng dụng chậm, họ cảm thấy khó chịu.

Đối với hiệu suất thiết bị, bạn sẽ kiểm thử những mục sau:

* **Khởi động ứng dụng**

Ứng dụng của bạn mất bao nhiêu thời gian để khởi động? Đây là tham số hiệu suất đầu tiên được đánh giá bởi người dùng. Theo thumb rule, sau khi người dùng chạm vào biểu tượng ứng dụng, màn hình đầu tiên sẽ hiển thị sau 1-2 giây.


* **Thời gian pin khi sử dụng ứng dụng**

Khi sử dụng liên tục, một số ứng dụng di động, tiêu thụ một lượng pin lớn và làm nóng điện thoại. Yếu tố này ảnh hưởng rất nhiều đến hiệu suất của bất kỳ ứng dụng di động nào và thông thường có thể xảy ra khi ứng dụng của bạn sử dụng nhiều tài nguyên hơn mức yêu cầu. Việc sử dụng tài nguyên quá mức sẽ tạo ra gánh nặng cho bộ xử lý và điện thoại bị nóng lên.


* **Tiêu thụ bộ nhớ**

Khi test một ứng dụng, cần kiểm tra mức tiêu thụ bộ nhớ của ứng dụng đó. Bằng cách thực hiện các chức năng nhất định trong ứng dụng, mức tiêu thụ bộ nhớ cũng tăng lên. Ví dụ: trong các ứng dụng Android khi thông báo đẩy được triển khai thì mức tiêu thụ bộ nhớ sẽ tăng.

Trong một số trường hợp, người ta đã nhận thấy rằng việc sử dụng bộ nhớ của toàn bộ hệ điều hành chỉ là 14%, nhưng một ứng dụng mới đang tiêu tốn 11%. Vì vậy, các yếu tố này phải được xử lý trước khi triển khai ứng dụng vào thế giới thực hoặc đưa cho khách hàng.

* **Tương thích phần cứng / phần mềm**

Khi kiểm tra một ứng dụng di động, bắt buộc phải kiểm tra các ứng dụng trên các thiết bị khác nhau. Có thể là trường hợp ứng dụng chạy trơn tru trên thiết bị này nhưng không chạy trên thiết bị khác. Giống như đối với các nhà cung cấp thiết bị Android khác nhau, chúng tôi có thể kiểm tra ứng dụng trên điện thoại Samsung, HTC và Lenovo. Tương tự, ứng dụng cần được kiểm tra với các thông số kỹ thuật RAM và bộ xử lý khác nhau như 1 GB hoặc 2 GB.

**Tương thích với các ứng dụng khác**

Khi ứng dụng được test đang chạy song song với các ứng dụng khác, sẽ không có nhiễu. Cách tốt nhất để kiểm tra nó là  chuyển đổi qua lại giữa ứng dụng đang được test và các ứng dụng khác.

* **Ứng dụng trong nền**

Một ứng dụng đang chạy trong nền được mở lại, nó sẽ vẫn ở trạng thái như trước. Nếu kịch bản này không được xử lý đúng cách, thì dữ liệu sẽ bị mất. Một lần nữa, bạn phải nhập dữ liệu từ đầu khi truy xuất ứng dụng.

## Hiệu suất Server / API
Khi ứng dụng tương tác với Server thông qua API, thời gian phản hồi trở nên quan trọng. Đối với hiệu suất Server, bạn sẽ kiểm thử những mục sau:

* **Dữ liệu đến và từ máy chủ**

Ứng dụng sẽ xử lý dữ liệu hiệu quả được gửi từ Server. Nó không phải mất quá nhiều thời gian trong khi tải dữ liệu. Trong một số ứng dụng nhất định, dữ liệu được gửi theo định dạng cụ thể. Vì vậy, trước khi hiển thị nó trong ứng dụng, nó nên được chuyển đổi sang định dạng phù hợp. Trong quá trình này, các ứng dụng đôi khi trở nên chậm hơn và thời gian phản hồi trở nên dài hơn.

* **Các lệnh gọi API được tạo từ ứng dụng**

Số lượng cuộc gọi đến Server được tạo từ ứng dụng đang test sẽ ít hơn. Trong một số trường hợp, nhiều lệnh gọi API được thực hiện cho cùng một chức năng. Để có hiệu suất tốt hơn, điều này nên được xử lý với số lượng cuộc gọi ít hơn.

* **Thời gian ngừng hoạt động của Server**

Do bất kỳ lý do nào nếu Server ngừng hoạt động hoặc không thể truy cập, chúng ta có thể lưu dữ liệu trong cơ sở dữ liệu gốc. Vì vậy, bất cứ khi nào Server ngừng hoạt động, chúng ta có thể hiển thị dữ liệu được lưu trữ trong cơ sở dữ liệu gốc. Một giải pháp khác có thể sử dụng các Server cơ sở dữ liệu chuyển đổi dự phòng, tức là nếu một trong các Server bị lỗi hoặc đang trong giai đoạn bảo trì, Server dự phòng sẽ có sẵn để chuyển đổi. Server dự phòng / sao lưu phải được sao chép và đồng bộ hóa liên tục với Server chính.

## Hiệu suất mạng
Hiệu suất của ứng dụng trên các mạng và thuộc tính mạng khác nhau cần được đo lường.

Đối với hiệu suất Mạng, bạn sẽ kiểm thử những điều sau:

* **Jitters**

Khi có sự chậm trễ trong việc nhận thông tin trên mạng, thì nó được gọi là jitter. Đó là một vấn đề với các mạng không kết nối hoặc mạng packet switch. Khi thông tin được phân phối thành các gói, các gói có thể di chuyển theo những con đường khác nhau từ người gửi đến người nhận. Khi dữ liệu đến vị trí dự kiến, dữ liệu sẽ bị xáo trộn so với lúc được gửi ban đầu. Trong trường hợp của Jitters, ứng dụng di động phải đủ khả năng để xử lý nó.

Bạn cần hiển thị các thông báo phù hợp cho người dùng cuối, để gửi lại yêu cầu hoặc đợi cho đến khi hệ thống phản hồi lại.

* **Mất Packet**

Trong trường hợp mất Packet hoàn toàn, ứng dụng sẽ có thể gửi lại thông tin yêu cầu hoặc phải tạo cảnh báo tương ứng. Nếu dữ liệu không đầy đủ, thì người dùng sẽ không thể hiểu được thông tin được hiển thị trong Ứng dụng. Điều này có thể gây căng thẳng cho người dùng. Vì vậy, tốt hơn là hiển thị một thông báo phù hợp hoặc nhắc người dùng thử lại.

* **Tốc độ mạng**

Ứng dụng cần được kiểm tra trên nhiều mạng với tốc độ thay đổi. Ứng dụng nên được thử nghiệm trên các mạng 2.5G, 3G và 4G, cả mạng Wi-Fi và di động . Đặc biệt, khi cả hai mạng đều khả dụng và việc chuyển đổi xảy ra từ mạng này sang mạng khác thì hành vi của ứng dụng cần được theo dõi. 

Ví dụ: một vấn đề có thể phát sinh trong một ứng dụng cho người dùng trong khi chuyển đổi mạng điện thoại từ 4G sang WIFI và ngược lại. Trong trường hợp này, ứng dụng trở nên không phản hồi và có thể yêu cầu khởi động lại ứng dụng để sử dụng.

# Khắc phục sự cố Hiệu suất Ứng dụng Di động
Sau khi khám phá các vấn đề trong khi test hiệu suất . Đó là thời gian để theo dõi và sửa chữa các lỗi.

## Vấn đề 1) Phản ứng chậm của Ứng dụng di động.

Nguyên nhân của sự chậm trễ này có thể là RAM, Cache, v.v.

Bạn cần phải xóa các tiến trình không cần thiết hoặc xóa bộ nhớ cache. Khắc phục sự cố kết nối có thể giải quyết một số sự cố đang tạo ra độ trễ

## Vấn đề 2) Khởi động lại ứng dụng, khóa, đóng băng hoặc không phản hồi.

Nó có thể được sửa chữa bằng một số bước sau

* Tối ưu hóa code của ứng dụng
* Phần mềm nên được vá và cập nhật.
* Phục hồi tự động
* Quản lý RAM hoặc trong một số trường hợp là ROM khi sử dụng thẻ ngoài
* Xóa phân vùng bộ nhớ cache
* Xác minh ứng dụng hoạt động với các ứng dụng của bên thứ ba khác và API
* Lập bản đồ ứng dụng di động theo thiết bị

# Công cụ kiểm tra ứng dụng di động hữu ích
Các công cụ kiểm tra ứng dụng dành cho thiết bị di động khác nhau tùy theo thiết bị hoặc hệ điều hành di động. Một số ứng dụng di động phổ biến Các công cụ kiểm thử hiệu suất là

## ANDROID
* ### Robotium
Nó giống như Selenium cho Ứng dụng di động. Tester có thể record và play một số bước cần thiết để thực hiện test.
* ### Monkey Runner
MonkeyRunner có thể chạy thử nghiệm trên các thiết bị thực được kết nối với PC hoặc trình giả lập. Công cụ này có API, cho phép điều khiển điện thoại thông minh, máy tính bảng hoặc trình giả lập từ bên ngoài Android code.

## APPLE

* ### Automator (Mac)
Automator là một ứng dụng được Apple phát triển cho OS X. Nó thực hiện point-and-click  (hoặc kéo và thả) để tự động hóa các tác vụ lặp đi lặp lại thành các đợt để thay đổi nhanh hơn. Điều này giúp tiết kiệm thời gian và công sức cho sự can thiệp của con người để thay đổi thủ công từng tệp riêng biệt.

# Thách thức
Những thách thức chính phải đối mặt trong khi Kiểm thử hiệu suất bao gồm

* Tổ chức các nền tảng di động khác nhau và hệ điều hành của chúng
* Mô phỏng các hoạt động như Edge, 3G, 4G hoặc WiFi, v.v.
* Các hạn chế của thiết bị di động như tiêu thụ pin và tài nguyên
* Khả năng sử dụng điện thoại di động
* Các loại kích thước thiết bị di động để chạy cùng một ứng dụng

# Thiết lập môi trường kiểm tra hiệu suất ứng dụng di động
Để cấu hình Môi trường kiểm thử, bạn cần-

* Hiểu biết về ứng dụng di động cần được test
* Xác định hệ điều hành khác nhau mà ứng dụng cần chạy
* Xây dựng Test setup
  * Xây dựng emulators hoặc simulators
  * Thiết lập thực tế nguyên mẫu
* Chọn công cụ thích hợp cho thử nghiệm

# Danh sách kiểm tra hiệu suất ứng dụng dành cho thiết bị di động
Kiểm thử hiệu suất của ứng dụng dành cho thiết bị di động là một biện pháp quan trọng trước khi phát hành. Kiểm thử hiệu suất được thực hiện để test

* Cần bao nhiêu RAM để sử dụng ứng dụng này?
* Để xác minh tốc độ và thời gian phản hồi của ứng dụng trong các mạng và hoàn cảnh khác nhau.
* Đảm bảo trải nghiệm người dùng thực tế trong một số điều kiện mạng
* Đảm bảo đạt được các kết quả cần thiết trong trường hợp có nhiều kết nối
* Đảm bảo ứng dụng không bị crash.
* Đảm bảo các ứng dụng di động hoạt động tốt khi sử dụng dữ liệu, Wi-Fi hoặc kết nối khác
* Giám sát thời gian hoạt động và tắc nghẽn sử dụng API di động
* Để đảm bảo số lượng người dùng đồng thời tối đa
* Cuối cùng, để kiểm tra các giới hạn của ứng dụng dành cho thiết bị di động

# Tóm lược

* Kiểm thử hiệu suất yêu cầu hiểu biết về ứng dụng dành cho thiết bị di động, trình sử dụng tài nguyên, người dùng ảo, trình giả lập và nhiều chiến lược kiểm tra.
* Hiệu suất ứng dụng trên điện thoại di động được đo lường theo ba loại sau.
  * Hiệu suất thiết bị
  * Hiệu suất Server
  * Hiệu suất mạng
* Các thách thức Kiểm tra hiệu suất bao gồm kích thước nhỏ gọn của thiết bị di động, khả năng cung cấp tài nguyên, chi phí và ngân sách.


*Bài viết được dịch lại từ nguồn: https://www.guru99.com/*