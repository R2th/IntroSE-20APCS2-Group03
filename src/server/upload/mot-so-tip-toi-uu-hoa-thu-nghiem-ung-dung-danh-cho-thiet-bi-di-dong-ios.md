Thử nghiệm ứng dụng dành cho thiết bị di động cho iOS là một phần thiết yếu của bất kỳ quá trình phát triển nào do cạnh tranh cao trên thị trường hiện nay. Trong bài viết này, chúng tôi sẽ cung cấp các mẹo thiết thực để tối ưu hóa quy trình thử nghiệm để làm cho nó hiệu quả hơn.

{@youtube: https://youtu.be/meU4TzI3KNM}

## 1. Bắt đầu từ đâu: Kiểm thử hiệu năng ứng dụng di động iOS
Kiểm thử hiệu năng là một thử nghiệm tự động cho iOS, mô phỏng hoạt động của một số lượng người dùng cụ thể cùng chia sẻ tài nguyên.

Mục tiêu chính:

* Xác định số lượng người dùng có thể đồng thời làm việc với ứng dụng.
* Kiểm tra hành vi của ứng dụng với cường độ ngày càng tăng trong khi thực hiện * bất kỳ thao tác nào.
* Kiểm tra hành vi của ứng dụng khi sử dụng ứng dụng trong nhiều giờ trên mức tải trung bình.
* Kiểm tra hành vi của ứng dụng trong điều kiện stress.
* Kiểm tra hoạt động trong cơ sở dữ liệu, các truy vấn được thực thi nhanh như thế nào?
* Mục đích chính của loại thử nghiệm này là đảm bảo rằng ứng dụng hoạt động được chấp nhận theo các yêu cầu hiệu suất nhất định.

![](https://images.viblo.asia/457624d0-f4e4-4d40-b960-c4ee84f990bd.jpg)

## 2. Sử dụng Kịch bản thử nghiệm hiệu suất này cho các ứng dụng di động
* Xác định xem ứng dụng có hoạt động theo cùng một cách trong các điều kiện tải mạng khác nhau hay không.

* Xác định xem network hiện tại có thể đáp ứng được ứng dụng hoạt động ở các mức tải khác nhau của người dùng hay không.

* Tìm hiểu xem cấu hình client-server hiện tại có có cung cấp hiệu suất tối ưu hay không.

* Tìm các điểm làm giảm hiệu suất của ứng dụng và hệ thống.

* Kiểm tra xem response time có đáp ứng các yêu cầu của ứng dụng hay không.

* Xếp hạng sản phẩm và / hoặc khả năng phần cứng để đối phó với khối lượng tải ước tính.

* Ước tính thời gian mà pin có thể duy trì ứng dụng hoạt động trong điều kiện của khối lượng tải ước tính.

* Kiểm tra gián đoạn khi chuyển từ mạng Wi-Fi sang mạng di động 2G / 3G/ 4G và ngược lại.

* Kiểm tra xem mỗi mức bộ nhớ của bộ xử lý có hoạt động không.

* Đảm bảo rằng mức tiêu thụ pin và memory leak không vượt quá tiêu chuẩn và hoạt động của nhiều tài nguyên và ứng dụng khác nhau, chẳng hạn như điều hướng GPS hoặc máy ảnh đáp ứng các yêu cầu.

* Kiểm tra độ ổn định của ứng dụng với mức tải người dùng cao.

* Kiểm tra khả năng của mạng trong các điều kiện khi thiết bị đang di chuyển.

* Kiểm tra hiệu suất của ứng dụng, nếu nó hoạt động trong một kết nối không liên tục với Internet.

![](https://images.viblo.asia/bb74a1b6-d085-44d2-a2c2-c4a9c49ba78e.jpg)

## 3. Kiểm thử ứng dụng di động: Cải thiện bảo mật
Chiến lược thử nghiệm này được sử dụng để kiểm tra sự an toàn của hệ thống, cũng như phân tích các rủi ro liên quan đến việc cung cấp một cách tiếp cận toàn diện để bảo vệ các ứng dụng khỏi tin tặc, vi-rút, truy cập trái phép vào dữ liệu bí mật. Mục đích chính của loại thử nghiệm này là đảm bảo an ninh mạng và dữ liệu phần mềm.

Dưới đây là các bước chính để kiểm tra tính bảo mật của các ứng dụng di động.

* Đảm bảo rằng dữ liệu người dùng như tên người dùng, mật khẩu, số thẻ tín dụng được bảo vệ khỏi các cuộc tấn công mạng bằng hệ thống tự động.
* Đảm bảo rằng ứng dụng không cung cấp quyền truy cập vào nội dung hoặc chức năng riêng tư mà không có xác thực phù hợp.
* Đảm bảo rằng bảo mật ứng dụng hệ thống yêu cầu mật khẩu mạnh và không cho phép kẻ tấn công chiếm đoạt mật khẩu người dùng khác.
* Đảm bảo rằng session timeout là đủ cho ứng dụng.
* Bảo vệ ứng dụng khỏi các kiểu tấn công SQL injection.
* Bảo vệ ứng dụng và mạng khỏi các cuộc tấn công DoS.
* Phân tích các yêu cầu lưu trữ và xác minh dữ liệu.
* Cung cấp quản lý phiên để bảo vệ thông tin từ người dùng không xác thực.
* Kiểm tra tất cả các mã mật mã và, nếu cần, sửa lỗi.
* Đảm bảo rằng logic nghiệp vụ được bảo vệ và không tiếp xúc với các cuộc tấn công từ bên ngoài.
* Phân tích sự tương tác của các tệp hệ thống, xác định và sửa các lỗ hổng bảo mật.
* Kiểm tra trình xử lý giao thức - protocol handlers (ví dụ: Không cố định cấu hình trang đích mặc định bằng cách sử dụng iframe độc hại).
* Bảo vệ ứng dụng khỏi các cuộc tấn công nguy hiểm của khách hàng.
* Cung cấp kiểm soát bảo mật dữ liệu thông thường.
* Kiểm tra các tập tin người dùng và ngăn chặn các hiệu ứng có hại của chúng.
* Bảo mật hệ thống chống lại các trường hợp tràn bộ đệm hoặc vi phạm tính toàn vẹn thông tin trong bộ nhớ.
* Phân tích các luồng dữ liệu khác nhau và chống lại các tác hại có thể có của chúng.

![](https://images.viblo.asia/44797962-2e7e-49fb-a969-a78d17e992c1.jpg)

## 4. Cải thiện ứng dụng di động: Thử nghiệm khả năng sử dụng iOS

Kiểm tra khả năng sử dụng được thực hiện để tạo ra một ứng dụng iOS nhanh chóng và dễ dàng. Mục đích chính là làm cho ứng dụng dễ sử dụng, giao diện trực quan tương ứng với các tiêu chuẩn được chấp nhận.

Vì vậy, hãy thực hiện các bước sau để thử nghiệm trên thiết bị di động trên ứng dụng iOS:

* Đảm bảo rằng các button có kích thước bình thường và phù hợp với các ngón tay lớn.
* Đặt các button ở một khu vực của màn hình để không gây nhầm lẫn giữa người dùng.
* Đảm bảo rằng các biểu tượng và hình ảnh trông tự nhiên trong môi trường ứng dụng.
* Đảm bảo rằng màu của các button thực hiện cùng một chức năng như nhau.
* Đảm bảo đầu vào bàn phím tối thiểu.
* Đảm bảo bạn có khả năng back lại hoặc hủy thao tác nếu bạn nhấn nút sai.
* Đảm bảo rằng menu ngữ cảnh không bị quá tải.
* Đảm bảo rằng text đơn giản, rõ ràng và hiển thị cho người dùng.
* Hãy chắc chắn rằng các câu từ ngắn và đoạn văn có thể đọc được.
* Kích thước phông chữ tối ưu.
* Hãy chắc chắn rằng bạn có thể đóng ứng dụng từ bất kỳ trạng thái nào và nó sẽ tiếp tục trong cùng một trạng thái.
* Kiểm tra xem tất cả các dòng có được hiển thị bằng ngôn ngữ mong muốn hay không, nếu ứng dụng có tùy chọn ngôn ngữ.
* Đảm bảo rằng các thành phần của một ứng dụng được đồng bộ hóa với các hành động của người dùng.
* Cung cấp hướng dẫn sử dụng, điều này sẽ giúp người dùng hiểu hiệu biết cách sử dụng ứng dụng.

![](https://images.viblo.asia/40d801e3-6c0f-471a-acf6-8474c1233d6b.jpg)
## 5. Chọn công cụ tốt nhất để thử nghiệm
Công cụ tốt nhất để thử nghiệm các ứng dụng iOS là gì? Miễn phí hay trả phí? Nó sẽ cung cấp cho bạn những gì? Đâu là công cụ để làm cho ứng dụng của bạn trở nên tốt nhất. Dưới đây là 1 số tool:

* iOS 6-11. Bạn sẽ cần phải có một thiết bị với các phiên bản iOS bắt đầu từ 6 và phiên bản mới nhất của iOS. 
    * xCode: Đó là một công cụ được cung cấp bởi Apple. Nó cung cấp cho bạn rất nhiều tính năng bao gồm tất cả các loại thử nghiệm được đề cập ở trên.
    * Fiddler 4: Cho phép bạn tạo các yêu cầu HTTP và xem phản hồi bằng cách sử dụng tìm kiếm REST API Azure mà không cần phải viết bất kỳ mã nào.
    * iPhone Configuration Utility: Sử dụng để cấu hình, cài đặt và duy trì cấu hình.
    * Testflight: Đây là một công cụ tuyệt vời để thử nghiệm beta ứng dụng của bạn.
    * Crashlytics: Công cụ này cũng được sử dụng để thử nghiệm beta các ứng dụng của bạn.
    * Calabash: Công cụ kiểm tra giao diện người dùng chức năng tự động hóa.
    * Appium: Công cụ kiểm thử tự động giao diện người dùng.


Note: Bài viết tham khảo và dịch từ nguồn: *https://www.deviqa.com/blog/tips-for-optimizing-your-ios-mobile-app-testing*