Mọi ứng dụng di động đều có mục tiêu chung là mang đến trải niệm tốt nhất cho người dùng.
Để đảm bảo chất lượng, việc kiểm tra ứng dụng dành cho thiết bị di động là điều cần thiết. Chúng ta sẽ thảo luận về từng bước kiểm tra thử nghiệm ứng dụng dành cho thiết bị di động.

### Bước 1: Kiểm tra khả năng tương thích đa nền tảng của ứng dụng

Ứng dụng Android có thể chạy tốt trên Oreo (Android 10) nhưng điều tương tự có thể không xảy ra với Marshmallow (Android 6.0).
Bạn nên đảm bảo kiểm tra ứng dụng của mình trên tất cả các kết hợp có thể có của hệ điều hành, kích thước màn hình và độ phân giải mà người dùng ứng dụng có thể đang sử dụng. Điều này đảm bảo rằng ứng dụng sẽ hoạt động đồng nhất trên tất cả các thiết bị.

### Bước 2: Kiểm tra ứng dụng của bạn dựa trên tất cả các cài đặt và cấu hình có thể có

Ứng dụng dành cho thiết bị di động tương tác với nhiều tính năng - cả trong ứng dụng cũng như dựa trên thiết bị di động. Ứng dụng phải tương thích với tất cả các cài đặt và cấu hình có thể có. Chúng có thể bao gồm độ phân giải màn hình, định hướng, các phiên bản hệ điều hành khác nhau, camera, cảm biến chuyển động, v.v.

### Bước 3: Dựa trên các trường hợp thử nghiệm của bạn dựa trên loại ứng dụng bạn đang thử nghiệm

Ứng dụng dành cho thiết bị di động thường thuộc ba danh mục - native, web, and hybrid

i. Kiểm tra ứng dụng web: Được tối ưu hóa cho duyệt web trên thiết bị di động và theo hướng máy chủ, các ứng dụng web phải được kiểm tra giao diện người dùng để đảm bảo rằng tất cả các yếu tố của ứng dụng được căn chỉnh cho các màn hình và độ phân giải khác nhau. Vì các ứng dụng dành cho thiết bị di động có dung lượng lưu trữ và nguồn điện hạn chế, hãy kiểm tra khả năng sử dụng bộ nhớ cũng như mức sử dụng pin. Tránh sử dụng quá nhiều JavaScript - điều này có thể làm tiêu hao pin của thiết bị di động.

ii. Thử nghiệm ứng dụng Native và Hybrid: Mặc dù được thúc đẩy bởi các công nghệ khác nhau, các ứng dụng Native và Hybrid chia sẻ chức năng tương tự. Kiểm tra chức năng là yếu tố quan trọng ở đây - chạy kiểm tra chức năng để xác nhận các khía cạnh chính như hướng màn hình, cử chỉ, khả năng tương thích, kết nối, hiệu suất và những gián đoạn như cuộc gọi và thông báo.

### Bước 4: Kiểm tra kỹ lưỡng GUI của ứng dụng

Thử nghiệm giao diện người dùng xác thực các tính năng có sẵn trên giao diện người dùng của ứng dụng - người thử nghiệm kiểm tra chức năng của GUI của ứng dụng dành cho thiết bị di động. Điều này bao gồm kiểm tra các menu, danh sách thả xuống, các nút điều hướng và cử chỉ, biểu mẫu và các tính năng khác được người dùng cuối sử dụng.

Thử nghiệm giao diện người dùng sẽ đảm bảo rằng ứng dụng đang được thử nghiệm sẽ hoạt động trên các trình duyệt và thiết bị khác nhau. Thực hiện các bài kiểm tra đơn vị, hồi quy, hiệu suất, tích hợp và chấp nhận trên ứng dụng để kiểm tra giao diện người dùng toàn diện.

### Bước 5: Kiểm tra ứng dụng của bạn để tìm các chức năng liên quan đến back-end / cơ sở dữ liệu

Kiểm tra cơ sở dữ liệu hoặc back-end xử lý phía máy chủ của ứng dụng dành cho thiết bị di động. Ngày nay, hầu hết các ứng dụng dành cho thiết bị di động đều sử dụng API. Dữ liệu được điền thông qua API REST hiển thị trong giao diện người dùng. Sử dụng proxy để theo dõi các yêu cầu và phản hồi của ứng dụng. Thực hiện kiểm tra SQL, hiệu suất và bảo mật để ngăn chặn bế tắc, mất dữ liệu, v.v.

### Bước 6: Kiểm tra ứng dụng của bạn cho tất cả các trường hợp kiểm tra tích cực và tiêu cực xung quanh bộ nhớ đang được sử dụng

Người dùng di động muốn có tất cả các ứng dụng quan trọng của họ khi di chuyển. Tuy nhiên, các thiết bị không có đủ dung lượng để đáp ứng nhu cầu cài đặt các ứng dụng có độ phân giải cao.

Theo dõi kích thước ứng dụng với mỗi bản phát hành. Bạn không nên rơi vào trường hợp người dùng cuối có thể không tải xuống ứng dụng chỉ vì kích thước lớn của nó.

### Bước 7: Kiểm tra ứng dụng của bạn trên tất cả các loại mạng mà người dùng có thể sử dụng ứng dụng đó

Chạy ứng dụng trên các điều kiện mạng khác nhau để đo hiệu suất của ứng dụng trong điều kiện chuyển đổi dữ liệu và tín hiệu yếu. Để kiểm tra hiệu suất mạng, hãy xem xét các khía cạnh sau:

i. Jitters
Xảy ra trong quá trình thu thập dữ liệu chậm trễ. Khi dữ liệu di chuyển dưới dạng các gói, các gói này có thể phân tán trong khi di chuyển từ người gửi đến người nhận. Do đó, dữ liệu trở nên xáo trộn và điều này được gọi là jitters. Trong những trường hợp như vậy, ứng dụng sẽ thông báo cho người dùng gửi lại dữ liệu hoặc đợi hệ thống phản hồi.

ii. Packet Loss
Trong thời gian mất gói hoàn toàn, hãy đảm bảo rằng ứng dụng gửi lại yêu cầu dữ liệu hoặc thông báo cho người dùng cuối. Thay vì để người dùng đợi, ứng dụng sẽ nhắc người dùng thử lại.

iii. Network Speed and Type
Tốc độ mạng thay đổi theo thời gian - lý tưởng là điều này không cản trở trải nghiệm người dùng. Kiểm tra ứng dụng trên các mạng và tốc độ khác nhau. Xác thực cách ứng dụng hoạt động khi ứng dụng di động chuyển từ dữ liệu di động sang WiFi và ngược lại.

### Bước 8: Kiểm tra ứng dụng dành cho thiết bị di động của bạn để tìm hành trình của người dùng - con đường mà người dùng thực có thể đi khi sử dụng ứng dụng của bạn

Một dòng chảy ứng dụng di động tốt là một trong đó cần có lời giải thích và có thể được hiểu ở đường đi đầu tiên. Luồng người dùng có thể khác nhau dựa trên cách ứng dụng phản hồi với các thiết bị và hệ điều hành khác nhau.

Ví dụ: để chỉ cần đăng nhập vào một ứng dụng, người dùng có thể chọn từ nhận dạng vân tay, khuôn mặt hoặc đăng nhập bằng tên người dùng và mật khẩu. Xác nhận tất cả các khả năng có thể để đảm bảo kinh nghiệm kỹ thuật số tốt nhất có thể cho người sử dụng.

### Bước 9: Tự động hóa ứng dụng dành cho thiết bị di động

Tự động hóa có thể tăng năng suất của quá trình thử nghiệm của bạn. Các công cụ như Testsigma cho phép bạn tạo IDE tùy chỉnh, tập lệnh nội bộ và khuôn khổ kiểm tra đám mây để phát hiện lỗi và lỗi.

### Bước 10: Đảm bảo ứng dụng của bạn an toàn và bảo mật cho người dùng

Do các thành phần hệ điều hành đa dạng, bảo mật ứng dụng dành cho thiết bị di động có thể trông khá đáng sợ. Tuy nhiên, bạn có thể làm theo các bước phổ biến sau để bảo mật ứng dụng dành cho thiết bị di động.

i. Secure the source code and database

ii. Perform Input Validation

iii. Perform Penetration Testing

iv. Use Cryptography

v. Prevent Client Side Injection

vi. Implement HTTPS – SSL/TLS Security Layer

vii. Protect Local Storage Data

nguồn: https://testsigma.com/blog/checklist-for-mobile-app-testing/