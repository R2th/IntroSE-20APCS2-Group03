Kiểm thử hiệu suất cần thiết như một phần trong quy trình kiểm thử liên tục được thực hiện đều đặn trong phần test hồi quy bằng cách chạy các app trong các điều kiện mạng khác nhau được giả lập nên. 
Kiểm thử hiệu suất là việc chúng ta chạy thử app của mình trong bất kỳ các điều kiện mạng nào : 2G, 3G, LTE.. mô phỏng các tình huống băng thông, thời gian trễ mạng, mất mạng. Kiểm tra cách xử lý của ứng dụng khi người dùng đi vào đường hầm, thang máy, các khu vực gây nhiễu và yếu mạng, kiểm tra các trường hợp khi người dùng di chuyển nhanh hoặc thay đổi môi trường một cách nhanh chóng. 

Kiểm thử hiệu suất là vô cùng quan trọng bởi nếu app của bạn thường bị chập chờn khi sử dụng, người dùng sẽ gỡ ngay app đó và sẽ tìm kiếm 1 app khác có hiệu suất tốt hơn. 

Kiểm thử hiệu suất cần được thực hiện trước khi sản phẩm được release ra cho khách hàng.
## Chiến lược kiểm thử ứng dụng mobile
 Hiệu suất ứng dụng trên điện thoại di động hoặc trên bất kì thiết bị thông minh nào thường được đo bằng ba loại sau:
1. Hiệu suất thiết bị
2. Hiệu suất máy chủ/ API
3. Hiệu suất mạng
![](https://images.viblo.asia/97240148-5e99-4d80-9d0e-96ddef9a8cc2.png)

# A - Hiệu suất thiết bị
Khi khách hàng trải nghiệm ứng dụng và thấy tốc độ/ hiệu suất app chậm, họ sẽ cảm thấy khó chịu.
Đối với hiệu suất thiết bị, bạn sẽ kiểm tra như sau:
1. **Khởi động ứng dụng**
Theo quy tắc ngón tay cái, sau khi người dùng chạm vào biểu tượng ứng dụng, hình hình đầu tiên sẽ được hiển thị 1-2s
2. **Độ bền của pin khi sử dụng ứng dụng**
 Khi sử dụng liên tục, một số ứng dụng trên các thiết bị di động tiêu thụ một lượng pin cao và làm điện thoại nóng lên. Yếu tố này làm giảm đi hiệu suất của ứng dụng dành cho thiết bị và việc này thường xảy ra khi ứng dụng của bạn sử dụng nhiều tài nguyên hơn mức cho phép.
Sử dụng quá nhiều tài nguyên sẽ tạo ra gánh nặng cho bộ vi xử lý và điện thoại dễ bị nóng lên.
3. **Tiêu thụ bộ nhớ**
Khi kiểm tra một ứng dụng, nên kiểm tra mức độ tiêu thụ bộ nhớ của ứng dụng đó.
Bằng cách thực hiện một số chức năng nhất định trong ứng dụng, mức tiêu thụ bộ nhớ cũng tăng lên. Ví dụ trong các ứng dụng Android khi thông báo được push lên thì mức tiêu thụ bộ nhớ cũng tăng lên.
Trong một số trường hợp đã được nghiên cứu thì thậm chí toàn bộ OS đang sử dụng 14% bộ nhớ trong khi một ứng dụng đã sử dụng đến 11% .
Vì vậy, các yếu tố về bộ nhớ cần được xử lý trước khi triển khai ứng dụng ra thị trường hoặc release cho khách hàng.
4. **Biến thể phần cứng/ phần mềm**
Khi kiểm thử ứng dụng dành cho thiết bị di động, bắt buộc phải kiểm tra ứng dụng trên các thiết bị khác nhau. Có thể có trường hợp ứng dụng của ta chạy trơn tru trên một thiết bị nhưng không chạy tốt trên các thiết bị khác. Đối với cùng một hệ điều hành Android, chúng ta cũng cần kiểm tra ứng dụng trên các thiết bị điến từ nhiều nhà cung cấp (Samsung, LG, Lenovo…), các version của hệ điều hành khác nhau ( iOS 9, 10, 11 .. Android 4, 5, 6, 7, 8 ..) Tương tự, cũng cần kiểm tra với các thông số RAM và bộ xử lý khác nhau: 1GB, 2GB
5. **Sử dụng đồng thời với các ứng dụng khác**
Khi sử dụng ứng dụng đang test song song với các ứng dụng khác, sẽ không có vấn đề gì xảy ra. Các tốt nhất để kiểm tra là dùng thay phiên liên tục giữa ứng dụng đang kiểm thử và các ứng dụng khác.
6. **Khi ứng dụng được ẩn xuống background**
Khi một ứng dụng bị ẩn xuống dưới background ( task tray) thì ứng dụng đó nên được giữ nguyên trạng thái khi đang chạy, nếu việc này không được xử lý tốt thì data trong ứng dụng có thể bị mất và khi bạn gọi lại app lên, bạn lại phải lấy lại hoặc nhập lại dữ liệu cho app.
# B - Hiệu suất máy chủ/ API
Khi ứng dụng tương tác với máy chủ qua API, thời gian phản hồi là một yếu tố quan trọng đối với hiệu suất làm việc của app. 
**Đối với việc kiểm tra hiệu suất Server, QA cần kiểm tra:**
1. Dữ liệu đến và đi từ server:
Dữ liệu không được xử lý hiệu quả khi được gửi từ máy chủ thì sẽ mất rất nhiều thời gian để load data. Trong một số ứng dụng nhất định, dữ liệu được gửi theo định dạng được định sẵn. Vì vậy, trước khi hiển thị nó trong ứng dụng thì dữ liệu được chuyển đổi sang 1 định dạng có liên quan, trong quá trình này, các ứng dụng đôi khi trở nên chậm hơn và thời gian phản hồi lâu hơn
2. Việc gọi API từ ứng dụng
Số lần gọi API từ app đến server nên ít nhất có thể. Vì trong một số trường hợp, sẽ có những lệnh gọi API được thực hiện cùng 1 lúc cho cùng 1 chức năng. Vì vậy để có hiệu suất tốt hơn chúng ta nên tối ưu hóa số lần gọi API.
3. Khi server bị hỏng
![](https://images.viblo.asia/441f544c-9489-493e-ac44-81a26b8a1420.png)

Đôi khi vì bất kỳ lí do nào mà server bị hỏng hoặc không thể truy cập được, chúng ta có thể lưu dữ liệu vào cơ sở dữ liệu gốc. Vì vậy, bất cứ khi nào máy chủ bị hỏng, chúng ta có thể hiển thị dữ liệu được lưu trữ trong cơ sở dữ liệu gốc.
Một giải pháp khác là cần có sẵn các máy chủ cơ sở dữ liệu dự phòng để một khi các máy chủ bị hỏng hoặc đang bảo trì thì máy chủ sao lưu sẽ luôn có sẵn để chuyển đổi. Máy chủ dự phòng sao lưu cần được sao chép liên tục và đồng bộ hóa với máy chủ chính.
# C - Hiệu suất mạng
Hiệu suất của ứng dụng trên các mạng và thuộc tính mạng khác nhau cần phải được đo lường.
### 1 -  Jitters
Khi có sự chậm trễ trong việc nhận thông tin trên mạng, thì nó được gọi là jitters. Đó là một vấn đề với mạng không dây hoặc gói chuyển mạch mạng. Khi thông tin được phân phối thành các gói, các gói tin có thể di chuyển theo nhiều đường khác nhau từ người gửi đến người nhận. Khi dữ liệu đến vị trí dự định, dữ liệu sẽ bị xáo trộn so với dữ liệu ban đầu được gửi. Trong trường hợp của Jitters, ứng dụng di động phải đủ khả năng để xử lý nó.
Chúng ta cần hiển thị thông báo thích hợp cho người dùng cuối, hoặc gửi lại yêu cầu hoặc đợi cho đến khi hệ thống phản hồi lại.

### 2- Mất gói tin
Trong trường hợp mất gói tin hoàn toàn, ứng dụng sẽ có thể gửi lại yêu cầu cho thông tin hoặc sẽ tạo cảnh báo tương ứng. Nếu dữ liệu chưa hoàn thành, thì người dùng sẽ không thể hiểu thông tin được hiển thị trong Ứng dụng. Điều này có thể gây căng thẳng cho người dùng. Vì vậy, tốt hơn là hiển thị thông báo phù hợp hoặc nhắc người dùng thử lại.

### 3 - Tốc độ mạng
Ứng dụng cần được kiểm tra trên nhiều mạng có tốc độ thay đổi bất chợt. Ứng dụng sẽ được kiểm tra trên các mạng 2.5G, 3G và 4G. Cả Wi-Fi và mạng di động khác nữa. Ngoài ra, biểu hiện của ứng dụng sẽ được theo dõi. Đặc biệt, khi cả hai mạng có sẵn, và chuyển đổi xảy ra từ mạng này sang mạng khác.

Ví dụ, một vấn đề có thể phát sinh trong một ứng dụng cho người dùng trong khi chuyển đổi mạng điện thoại từ 4G sang WIFI và ngược lại. Trong trường hợp này, ứng dụng sẽ không phản hồi và có thể yêu cầu khởi động lại ứng dụng để sử dụng.
# D - Khắc phục sự cố về hiệu suất

Sau khi điều tra các vấn đề trong khi kiểm tra hiệu suất thì tiếp theo đó là thời gian để theo dõi và sửa lỗi.

### Vấn đề 1) Trễ hoặc phản ứng chậm chạp của Ứng dụng dành cho thiết bị di động.

Nguyên nhân của sự chậm trễ này có thể là RAM, Cache, v.v.

Bạn cần phải hủy bỏ các quá trình không cần thiết hoặc xóa bộ nhớ cache. Khắc phục sự cố sự cố kết nối có thể giải quyết một số sự cố đang tạo ra những sự cố khác

### Vấn đề 2) Ứng dụng Khởi động lại, khóa, đóng băng hoặc không phản hồi.

Nó có thể được cố định bởi một số bước sau

1. Tối ưu hóa mã ứng dụng
2. Phần mềm cần được vá và cập nhật.
3. Tự động khôi phục
4. Quản lý RAM hoặc trong một số trường hợp ROM khi sử dụng thẻ bên ngoài
5. Xóa phân vùng bộ nhớ cache
6. Xác minh ứng dụng hoạt động với các ứng dụng và API của bên thứ ba khác
7. Lập bản đồ ứng dụng di động theo thiết bị

# E - Những tool hỗ trợ kiểm thử trên mobile
## I- ANDROID
### 1. Robotium
Nó giống như Selenium cho Mobile Apps. Người thử nghiệm có thể ghi và thực hiện một số bước cần thiết để thực hiện kiểm tra.
### 2. Monkey Runner
MonkeyRunner có thể chạy thử nghiệm trên các thiết bị thực được kết nối với PC hoặc trình giả lập. Công cụ này có API, cho phép điều khiển điện thoại thông minh, máy tính bảng hoặc trình giả lập từ bên ngoài mã Android.

## II - Apple
### Automator (Mac)
Automator là một ứng dụng được phát triển bởi Apple cho OS X. Nó thực hiện việc tạo và nhấp (hoặc kéo và thả) tạo luồng công việc để tự động hóa các tác vụ lặp đi lặp lại thành các lô để thay đổi nhanh hơn. Điều này tiết kiệm thời gian và công sức đối với sự can thiệp của con người để tự thay đổi từng tệp một cách thủ công.

# F - Thách thức
**Các thách thức chính gặp phải khi Kiểm tra hiệu suất bao gồm**

1. Tổ chức các nền tảng di động khác nhau và hệ điều hành của họ
2. Mô phỏng các kết nối như Edge, 3G, 4G hoặc WiFi, v.v.
3. Các ràng buộc về thiết bị di động như mức tiêu thụ pin và tài nguyên
4. Khả năng sử dụng điện thoại di động
5. Các loại kích thước bộ nhớ của thiết bị di động để chạy cùng một ứng dụng

# G - Thiết lập môi trường kiểm thử hiệu suất ứng dụng dành cho thiết bị di động
**Để cấu hình Test Environment, bạn cần phải-**
1. Hiểu về ứng dụng dành cho thiết bị di động cần được kiểm tra
2. Xác định hệ điều hành khác nhau mà ứng dụng cần chạy
3. Xây dựng test setup:
  *  Xây dựng Emulator/ Simulator
  * Tạo mẫu cài đặt thực tế
4. Chọn công cụ thích hợp để thử nghiệm

# H - Tóm lại
* Kiểm tra hiệu suất yêu cầu sự hiểu biết về Ứng dụng dành cho thiết bị di động, trình sử dụng tài nguyên, người dùng ảo, trình mô phỏng và nhiều chiến lược thử nghiệm.
* Hiệu suất ứng dụng trên điện thoại di động được đo bằng ba loại sau.
* Hiệu suất thiết bị
* Hiệu suất máy chủ
* Hiệu suất mạng
* Thử thách hiệu suất thử nghiệm bao gồm kích thước nhỏ gọn của thiết bị di động, nguồn lực sẵn có, chi phí và ngân sách.

Reference link: 
https://www.guru99.com/mobile-app-performance-testing-strategy-tools.html