Ở phần này, mình sẽ giới thiệu với các bạn Các loại Migration testing: với test scenario cho mỗi loại.

![](https://images.viblo.asia/f0bfaa52-79eb-44df-a8ce-3f99b4d06a5f.jpg)

## Các loại Migration

Có các loại Migration xảy ra khá thường xuyên như sau:

1. Application Migration
2. Database Migration
3. Server Migration
4. OS Migration

Sau đây, chúng ta cùng đi vào chi tiết  từng loại Migration testing:

### #1 ) Application Migration

Application Migration là toàn bộ ứng dụng sẽ được migration từ một môi trường hay platform này sang một môi trường hay platform khác.

**Một số lợi ích của Application Migration:**

- Giảm chi phí vận hành và bảo trì
- Giảm sự phụ thuộc vào các hệ thống khác
- Loại bỏ hoặc giảm thiểu rủi ro trong kinh doanh
- Tăng cường hiệu năng của hệ thống
- Tăng cường khả năng hỗ trợ kỹ thuật và quản trị
- Hỗ trợ các tính năng bổ sung và fix bug (nếu có)
- Thay đổi công nghệ

**Mô tả đơn giản về Application Migration như sau:**

![](https://images.viblo.asia/b7fdf8ac-7f1a-43a1-b57c-415857ed2677.jpg)

**Một vài ví dụ về Application Migration:**

- Migration ứng dụng sang Cloud platform
- Migration một ứng dụng từ công nghệ ASP sang ASP.net, từ ASP.net sang Windows Azure, ....

**Các hoạt động test ở đây sẽ là:**

- Phân tích yêu cầu và xác định yêu cầu ổn định
- Phân tích phạm vi test
- Phân tích và thực hiện test tất cả các luồng của ứng dụng cũ so với ứng dụng mới
- Test tất cả các luồng mới trong ứng dụng migration nếu có

**Thông thường, Test scenario sẽ như sau:**

***I) nếu ứng dụng được nâng cấp,***

- Xác nhận tất cả các chức năng trước đó cùng với các tính năng được nâng cấp đều hoạt động đúng.
- Test ứng dụng với các dữ liệu hiện có cũng như các dữ liệu mới - đảm bảo tất cả đều hoạt động đúng.
- ***Ví dụ***: 
+ Với dữ liệu hiện có: Update dữ liệu hiện có, xóa dữ liệu hiện có, tìm kiếm với dữ liệu hiện có, tạo báo cáo với dữ liệu hiện có,... 
+ Với dữ liệu mới, thực hiện: xác nhận tạo account hoặc dữ liệu mới, update dữ liệu mới được thêm vào, xóa dữ liệu mới được thêm vào, tìm kiếm với dữ liệu mới được thêm vào, tạo báo cáo với dữ liệu mới được thêm vào,...

***II) Nếu ứng dụng được migration sang công nghệ mới:***

- Thẩm định xem toàn bộ ứng dụng hoạt động đúng không
- Thẩm định xem công nghệ mới có support tất cả các thành phần của ứng dụng không. Ví dụ: plug-in, add-on, môi trường, đường dẫn path không thay đổi và vẫn hoạt động đúng không có lỗi nào.
- Thẩm định xem nó có tương thích với tất cả các phiên bản hệ điều hành, trình duyệt có thể không.
- Thẩm định xem dữ liệu cũ được giữ lại và dữ liệu mới có hoạt động tốt trên công nghệ mới không.

### #2) Database Migration

Database migration là một loại migration mà tất cả dữ liệu trong database của ứng dụng được migration sang một database khác.

Với loại migration này, ứng dụng phải ổn định và dữ liệu trong database phải chính xác và hợp lệ. Vì vậy, format, kiểu, giá trị,... phải không có vấn đề khi thực hiện migration.

**Lợi ích của Database Migration:**

- Ứng dụng có thể có nhiều database, do đó có thể support một lượng dữ liệu khách hàng khổng lồ
- Tăng cường dữ liệu có thể đạt được
- Phân tích dữ liệu hợp lý sẽ giúp cải thiện chất lượng dữ liệu
- Lấy mẫu dữ liệu và làm sạch dữ liệu sẽ giúp giữ database sạch và hiệu quả
- Thực hiện phân tích dữ liệu

![](https://images.viblo.asia/00ccd3ff-52c4-46b6-9c01-9982a43babe1.jpg)

**Ví dụ về Database Migration:**

- Migration từ một RDBMS sang RDBMS khác
- Migration từ RDBMS sang MongoDB
- Migration từ Informix HC4 sang HC6 hoặc HC7

**Các hoạt động test ở đây là:**

- Đảm bảo rằng database cũ sẽ không bị cập nhật trong suốt quá trình test sau khi thực hiện migration
- Đảm bảo rẳng ánh xạ ở field và tabe không bị thay đổi
- Đảm bảo rằng dữ liệu được migration chính xác và hoàn toàn
- Thực hiện các hoạt động test trước migration và sau migration

**Test scenario sẽ là:**

***I) Nếu migration sang Database cùng loại,***

- Xác nhận rằng các truy vấn thực hiện trong database mới có kết quả giống với database cũ
- Xác nhận rằng số lượng bản ghi trong database cũ giống với database mới. Ở đây chúng ta có thể sử dụng tool tự động.
- Xác nhận rằng không có dữ liệu dư thừa và database mới hoạt động chính xác như database cũ
- Xác nhận rằng lược đồ, quan hệ, cấu trúc bảng không bị thay đổi hoặc được thiết lập lại khớp với database cũ
- Xác nhận việc sau khi cung cấp kết nối đến database mới cho tất cả các thành phần trong ứng dụng. Ví dụ: ứng dụng, server, giao tiếp interface, tường lửa firewall, kết nối network,...
- Xác nhận rằng hiệu suất truy vấn (thời gian cần thiết để thực hiện các truy vấn phức tạp) của database mới không nhiều hơn hiệu suất trước đó.

***II) Nếu migration sang Database khác loại, sau khi thực hiện những điểm scenario bên trên, chúng ta cần quan tâm đến:***

- Xác nhận việc xử lý dữ liệu cho tất cả các trường. Thách thức ở đây là: xử lý dữ liệu cho trường calendar, số float, số hexa,...

### #3) Server Migration

Server migration là một loại migration mà dữ liệu từ server này sẽ được move sang server khác. Ở đây, cấu hình server cũng được migrate sang server mới cùng với dữ liệu server.

**Lợi ích của Server Migration:**

- Tăng cường cấu hình
- Tăng cường độ tin cậy
- Logs rõ ràng hơn giúp cho việc phân tích đáp ứng yêu cầu giữa các thành phần
- Tăng cường hiệu suất

**Mô tả đơn giản:**

![](https://images.viblo.asia/466895e9-51a6-4c16-b42d-c70af15afd6d.jpg)

**Ví dụ về Server Migration:**

- Migrate từ Windows sang Mainframe server
- Migrate từ HP Box sang IBM Box

**Hoạt động test:**

- Kiểm tra sự tuân thủ với server mới
- Kiểm tra việc xử lý dữ liệu trong server mới
- Đảm bảo các tên thư mục, các file share, ... không bị thay đổi hoặc thay đổi bằng tay theo cấu hình
- Đảm bảo không có dữ liệu bị lỗi hoặc thay đổi trong server mới

**Test Scenario:**

- Xác nhận kết quả phản hồi giữa ứng dụng và server thông qua APIs
- Xác nhận log client-server cho mỗi hành động được thực hiện trên ứng dụng
- Xác nhận nếu toàn bộ hệ thống đã pass thử nghiệm
- Xác nhận nếu test Interface là hoạt động tốt với tất cả các điều kiện test
- Xác nhận nếu môi trường ổn định và server được lưu trữ không có bất kỳ vấn đề gì về kết nối. Điều này có nghĩa là: không có bất kỳ vấn đề gì về môi trường sau khi thực hiện migration.

### #4) OS Migration

OS Migration là một loại migration mà một ứng dụng được migrate từ hệ điều hành này sang một hệ điều hành khác. Việc migrate này có rất nhiều thách thức và có nguy cơ rất lớn về tính tương thích khi hệ thống nền tảng bị thay đổi. Thậm chí network, cấu hình, interface, và một lượng lớn thành phần phải thiết kế lại.

**Lợi ích của OS Migration (phụ thuộc vào OS mới):**

- Tăng sự ảo hóa khi migare sang nền tảng Cloud-based
- Giảm chi phí trong vận hành và bảo trì
- Tăng tốc độ, hỗ trợ, năng suất, bảo mật

**Mô tả đơn giản về OS Migration:**

![](https://images.viblo.asia/29f3d0a3-db36-49d7-9889-ff05ddc61eba.jpg)

**Ví dụ về OS Migration:**

- Migration từ Windows sang Linux
- Migration từ Windows sang Mac
- Migrate sang Cloud-based Software as a Server (SaaS)
- Migrate sang Cloud-base VMs

**Hoạt động test:**

- Phân tích sự phụ thuộc vào OS mới
- Hiểu và test ứng dụng khi có sự thay đổi trong cấu hình gây ảnh hưởng đến ứng dụng tùy thuộc vào loại ứng dụng
-  Luồng của ứng dụng có thể khác khi so sánh với OS lagacy. Vì vậy, Extensive testing là cần thiết.
-  Kiểm tra tính tương thích mở rộng với tất cả các kết hợp có thể trong OS mới

**Test Scenario:**

- Xác nhận tính tương thích của phần cứng và phần mềm khi ứng dụng độc lập
- Xác nhận giá trị OS không gây ảnh hưởng đến behavior của ứng dụng. Toàn bộ hệ thống pass việc kiểm tra.
- Xác nhận hiệu suất của ứng dụng không bị cản trở trong OS mới

Link tham khảo: https://www.softwaretestinghelp.com/migration-testing-types/