# 9. Robotium
***Robotium*** là một công cụ kiểm tra giao diện người dùng miễn phí trên Android, Robotium không cần thêm thông tin về cấu trúc hoặc các lớp được triển khai của ứng dụng Android. Tất cả những gì họ yêu cầu là tên của lớp chính và đường dẫn liên kết đến nó. Nó hỗ trợ phiên bản Android 1.6 trở lên. Các test case trong Robotium được viết bằng Java. Trong thực tế, Robotium là một thư viện cho các case test unit.

Nhưng người dùng phải mất rất nhiều nỗ lực và thời gian để chuẩn bị các bài kiểm tra bằng Robotium, vì người ta phải làm việc với mã nguồn chương trình để tự động hóa các bài kiểm tra. Công cụ này ít phù hợp để tương tác với phần mềm hệ thống; nó không thể khóa và mở khóa điện thoại thông minh hoặc máy tính bảng. Không có chức năng phát hoặc ghi trong Robotium và nó không cung cấp ảnh chụp màn hình.

![](https://images.viblo.asia/a452f155-00a3-485a-b5b5-5a141a41be46.png)
Lợi ích:
* Robotium có thể tạo ra các trường hợp kiểm thử mạnh mẽ cho dự án.
* Robotium tự động xử lý nhiều hoạt động trên nền tảng Android.
* Robotium cần thời gian tối thiểu để tạo ra các trường hợp kiểm thử vững chắc.
* Đồng bộ hóa dễ dàng với Ant hoặc Maven để chạy thử nghiệm như là một phần của tích hợp.
* Có thể chạy các trường hợp kiểm thử trên các ứng dụng được cài đặt sẵn.
# 10. Selendroid
***Selendroid*** là một trình kiểm thử tự động giúp loại bỏ giao diện người dùng của ứng dụng native và ứng dụng Android có kết hợp mobile web.

![](https://images.viblo.asia/ab519e08-5241-4ff3-8528-279fb7242cbc.png)
Lợi ích:
* Nó hoàn toàn tương thích với giao thức JSON.
* Không cần thay đổi ứng dụng hiện tại để áp dụng kiểm thử tự động.
* Bằng các loại định vị khác nhau, các lỗi UI có thể được tìm thấy.
* Nó có thể tương tác với nhiều thiết bị Android cùng một lúc.
* Selendroid hỗ trợ cắm nóng các thiết bị cứng.
# 11. MonkeyRunner
***Monkeyrunner*** cung cấp API để viết các chương trình điều khiển thiết bị hoặc trình giả lập Android. Công cụ này đứng sau Robotium về hiệu suất. Các test case được viết bằng Python, để tạo ra các bài kiểm tra, người dùng có thể sử dụng một công cụ ghi âm.
Các thiết lập duy nhất của MonkeyRunner cần là phải viết tập lệnh cho từng thiết bị và các test case yêu cầu phải điều chỉnh mỗi lần khi giao diện bị thay đổi.

![](https://images.viblo.asia/e2d9e0bf-2765-4d11-aabb-8c06fee16824.png)
Lợi ích:
* Monkeyrunner có thể điều khiển nhiều thiết bị cùng lúc.
* Để tự động hóa các test case, người ta không phải chỉnh sửa source code (trừ khi giao diện bị thay đổi).
* Nó có thể được sử dụng để thử nghiệm những chức năng tự động.
* Monkeyrunner cũng có thể được sử dụng để kiểm thử hồi quy.
* Jython cho phép API MonkeyRunner tương tác với ứng dụng Android.

# 12. Calabash
***Calabash*** bao gồm các thư viện cho phép test-code tương tác theo chương trình với các ứng dụng native và ứng dụng hybrid.

![](https://images.viblo.asia/fefb2a75-7a94-4020-9ff6-2c467b5c55f0.png)
Lợi ích:
* Nó cung cấp các API chuyên dùng cho các ứng dụng native với màn hình cảm ứng
* Nó bao gồm các thư viện cho phép test-code tương tác theo chương trình với các ứng dụng native và ứng dụng hybrid.
* Nó hỗ trợ cucumber framework, giúp các doanh nghiệp khách hàng và QA dễ hiểu phiên kiểm thử hơn.
# 13. Frank 
***Frank*** là một công cụ tự động hóa dựa trên UI. Nó là một công cụ sử dụng kết hợp các lệnh Cucumber và JSON. Nó được mô tả là Selenium cho ứng dụng iOS Native.

![](https://images.viblo.asia/38808d86-3c9e-472e-9074-5dff0d05f932.png)
Lợi ích:
* Frank có cú pháp tương tự như CSS , cho phép kiểm tra khá dễ dàng.
* Frank đi kèm với các bước pre-defined từ đó người dùng có thể sử dụng ngay cho các phiên kiểm thử của mình.
* Frank được điều khiển bởi Cucumber framework
* Frank chứa Symbiote - một công cụ hướng nội trực tiếp.
* Frank có thể tích hợp với CI.
* Frank có thể chạy test case trên cả trình giả lập và thiết bị thật.
* Frank ghi lại video thực thi test case để hiển thị ứng dụng hoạt động như thế nào.

# 14. KIF
***KIF*** là một Objective-C framework và hoàn toàn dành cho thử nghiệm tự động iOS. KIF là một framework tự động hóa tích hợp trực tiếp với XCTests. Nó có thể được sử dụng khi doanh nghiệp khách hàng không tham gia viết hoặc đọc thông số kiểm thử.

![](https://images.viblo.asia/49c9df8d-ce5a-4747-af34-928d9ab71540.jpg)
Lợi ích:
* KIF có cộng đồng tích cực và hỗ trợ tốt.
* Tích hợp hoàn hảo với XCTests và KIF đi kèm với "KIFtestCase" mà bạn có thể sử dụng thay cho "XCTTestCase".
* KIF truy cập các phần tử UI bằng những label có khả năng truy cập.
* Mọi thứ đều nằm trong một ngôn ngữ Objective - C, do đó, việc phát triển iOS chuẩn sẽ dễ dàng.
* KIF có hỗ trợ commandline và CI ấn tượng
* KIF có hỗ trợ khá hợp lý cho các thao tác người dùng.

# 15. MonkeyTalk
Tất cả mọi thứ từ bộ kiểm tra hướng dữ liệu đến "Smoke Tests" đều đơn giản hơn, với ***Moneytalk*** tự động hóa các trường hợp kiểm thử có tương tác thực tế, hỗ trợ tốt với các chức năng trên ứng dụng iOS và Android.

![](https://images.viblo.asia/403bc8c4-d7ab-485d-85a9-4a460f700034.png)
Lợi ích:
* Scripts đơn giản và dễ hiểu.
* MonkeyTalk IDE có thể ghi / phát lại các test scripts.
* MonkeyTalk không đòi hỏi bất kỳ kiến thức lập trình hay scripts mạnh mẽ nào.
* MonkeyTalk hỗ trợ tethered, thiết bị mạng và các trình giả lập.
* Đối với cả Android và iOS, đều có thể sử dụng cùng một tập lệnh.
* MonkeyTalk hỗ trợ khái niệm looping.
* Cả hai báo cáo XML và HTML đều có thể được tạo bằng công cụ này, MonkeyTalk cũng chụp ảnh màn hình khi xảy ra lỗi.
* Để tích hợp liên tục, Monkey Talk hỗ trợ Jenkins và Hudson. Nó cũng có hỗ trợ báo cáo JUnit.

# 16. Testdroid
Testdroid là một công cụ kiểm thử ứng dụng di động dựa trên đám mây giúp các developer tiết kiệm chi phí phát triển, tăng tốc thời gian tiếp thị sản phẩm và giảm chi phí phát sinh. Đây là cách nhanh nhất để kiểm tra ứng dụng của bạn với các thiết bị Android và iOS thực tế khác nhau với các nền tảng CT, độ phân giải màn hình và phiên bản hệ điều hành khác nhau. Phạm vi giá dao động từ  499$ - 4999$ / tháng theo tùy yêu cầu. Đây còn là một trong những nền tảng thử nghiệm trò chơi di động vững chắc cho các trò chơi Android và iOS. Nó cho phép truy cập thủ công từ xa tới hơn 300 thiết bị thực chạy Android trước khi ứng dụng được khởi chạy. 

![](https://images.viblo.asia/e7e1aaa2-a797-4723-9d1b-abea6eaa3bdc.png)
Lợi ích:
* Nó tiết kiệm chi phí phát triển ứng dụng.
* Giảm thiểu rủi ro với các thiết bị thực và kiểm thử nhanh.
* Giảm chi phí phát sinh.
* Cải thiện xếp hạng ứng dụng và công việc mỗi ngày của tester.

# Tổng kết
* Có thể thấy, với 16 loại công cụ trên, loại nào cũng có những điểm mạnh riêng, tuy nhiên đối với từng trường hợp, chúng ta nên sáng suốt khi lựa chọn công cụ phù hợp với mục đích kiểm thử của mình. 
* Ví dụ như với những case bạn cảm thấy cần check về performence, bạn có thể tìm đến Kobiton, Appium, MonkeyTalk, HeadSpin .... 
* Với những case bạn cần check trên nhiều loại thiết bị giả lập khác nhau, thì TestingBot, Experitest sẽ không làm bạn thất vọng!
* Bên cạnh đó, với sự phát triển của hệ điều hành android, nếu bạn cần những công cụ đặc trị đối với hệ điều hành này, hãy xem qua Testdroid, Selendroid, Robotium nhé!
* Ngoài ra, khi cần sử dụng 1 công cụ cho nhiều ngôn ngữ khác nhau, Appium có thể vẫn đáp ứng đảm bảo yêu cầu của bạn.
* Chúc bạn có thể tìm được công cụ phù hợp hoàn hảo nhất với mục đích của mình!


Nguồn tham khảo: https://www.guru99.com/mobile-testing-tools.html
<br/>Ngoài ra, các bạn có thể dễ dàng tham khảo phần 1 của bài viết ở đây: https://viblo.asia/p/16-cong-cu-kiem-thu-ung-dung-di-dong-tot-nhat-danh-cho-android-va-ios-2019-p1-07LKXpJrKV4