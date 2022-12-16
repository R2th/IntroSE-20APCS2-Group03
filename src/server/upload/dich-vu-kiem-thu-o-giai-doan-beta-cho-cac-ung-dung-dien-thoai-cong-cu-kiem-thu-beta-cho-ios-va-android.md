**Kiểm thử beta** có lẽ là một trong những bước quan trọng nhất trong phát triển ứng dụng di động.<br>
Không giống như hệ điều hành iOS được tiêu chuẩn hóa, các thiết bị di động chạy trên Android khác biệt đáng kể với nhau, không chỉ bởi phiên bản cài đặt của hệ điều hành, mà bởi loại ngôn ngữ lập trình, độ phân giải màn hình, phần cứng, v.v.<br>
Đó là lý do tại sao bạn phải giữ không chỉ một nhóm tester trong dự án mà còn phải có nhiều loại thiết bị khác nhau để test ứng dụng. Thông thường, quá trình này được tiến hành bằng tay.<br>

![](https://images.viblo.asia/50b939c2-1f9b-4d45-ba4d-0ffad26c4601.jpg)<br>

# Tổng quan

Đầu tiên, bạn cần cài đặt ứng dụng, sau đó cẩn thận kiểm tra tính năng và khả năng sử dụng để tìm bugs. Và quá trình này được sẽ lặp đi lặp lại nhiều lần trên mọi thiết bị được cài đặt ứng dụng. Đó là lý do tại sao việc quản lý thiết bị trở nên cực kỳ quan trọng.<br>

Nhược điểm đáng kể, trong trường hợp này là công việc rất tốn thời gian cho người kiểm thử và đặc biệt là thiếu thiết bị chạy hệ điều hành Android.
# Tìm hiểu thêm
Ở bài viết này tôi thử so sánh 4 dịch vụ phổ biến nhất mà cung cấp dịch vụ kiểm thử ở giai đoạn Beta cho các ứng dụng điện thoại. <br>
Tôi đã thử nghiệm các dịch vụ kiểm thử bên thứ 3 ở giai đoạn Beta cho các ứng dụng điện thoại, như sau <br>
- Crashlytics<br>
- HockeyApp<br>
- Ubertesters<br>
- TestFlight<br>

Hình dưới đây mô tả tính năng quan trọng nhất đối với cá nhân tôi và tính khả dụng của nó tại các nền tảng kiểm thử beta di động khác nhau.<br>

![](https://images.viblo.asia/374943c7-e862-47e1-8507-7dfc403ff677.jpg)<br>

Có hai loại testing services chính: dịch vụ báo cáo sự cố crash app và dịch vụ outsourcing testing beta. Về cơ bản, cái sau bao gồm các chức năng tương tự của cái trước.<br>

## TestFlight
TestFlight là một ứng dụng nhằm đơn giản hóa việc kiểm thử ứng dụng cho các thiết bị iOS bằng cách đơn giản hóa các bộ sưu tập code cho thiết bị. Một trong những lợi thế chính là khả năng biết được ứng dụng đã khởi chạy được bao nhiêu lần, bao nhiêu lần thất bại và nhận được một số thông tin để debugging.<br>
Nói chung, sử dụng công cụ này là một trải nghiệm rất thú vị, cho phép bạn thu thập UDID-s một cách hiệu quả và góp phần phát triển ứng dụng.<br>

**Ưu điểm của TestFlight:**<br>
* Tải lên các tệp đơn giản và nhanh chóng thông qua tiện ích máy tính Mac OS (thực sự đây là việc đơn giản nhất trong số những dịch vụ khác);<br>
* Đăng nhập từ xa;<br>
* Miễn phí.<br>

**Nhược điểm chính của TestFlight:**<br>
* Nó không hỗ trợ Android.<br>

Để bắt đầu với TestFlight, bạn chỉ cần điền vào mẫu đăng ký của họ. Đảm bảo rằng nếu bạn là nhà lập trình thì bạn sẽ phải ghi rõ ra như thế - điều này sẽ cung cấp cho bạn quyền truy cập để tải lên các bản build và mời người kiểm thử của bạn để test. Quá trình tiếp theo khá đơn giản - bạn sẽ cần tạo một team, tải lên bản build của mình và mời những người kiểm thử của bạn để test.<br>

## HockeyApp
Do TestFlight gần đây bị giới hạn bởi Apple, nhiều người lập trình phần mềm gần đây đã chuyển sang HockeyApp. Các báo cáo chi tiết về sự cố crash (ví dụ: hoàn thành stack trace với server symbolization và mặc dù không tốt như TestFlight, nhưng ứng dụng máy tính để bàn của họ cung cấp một cách rất tốt để tải lên ứng dụng và file dSYM (dùng để symbolication). Tuy nhiên, công cụ HockeyApp không miễn phí, bạn chỉ có thể dùng thử miễn phí.<br>

**Ưu điểm của HockeyApp:**<br>
* Thư viện mã nguồn mở;<br>
* Quản lý bản build, quản lý thiết bị, theo dõi hoạt động của người kiểm thử;<br>
* Báo cáo chi tiết về sự cố crash.<br>

**Nhược điểm chính của HockeyApp:**<br>
Nó không hỗ trợ Test Cases. Mặc dù không phải mọi team đều có nhu cầu về tính năng này, nhưng với cá nhân tôi, điều này đóng một vai trò cực kỳ quan trọng.<br>
Để bắt đầu với Hockey, bạn sẽ phải trả tiền - gói tối thiểu cho 5 ứng dụng sẽ tiêu tốn của bạn 10 USD mỗi tháng. Tuy nhiên, họ có cung cấp bản dùng thử (Gợi ý: để được dùng bản dùng thử miễn phí thì lúc đăng ký nhớ ghi rõ là developer ). Khi quá trình đăng ký hoàn tất - hãy đăng ký thiết bị của bạn trên Hockey, tải ứng dụng của bạn lên đó và để tester của bạn cài đặt nó.<br>

## Crashlytics
Trên thực tế, nếu bạn không quan tâm lắm đến việc kiểm thử ở giai đoạn beta cho ứng dụng của mình, thì bạn nên xem xét công cụ Crashlytics. Công cụ này cung cấp nhiều tính năng hơn giống như một diễn đàn phản hồi ý kiến. Dịch vụ này hiện tại đang miễn phí và có vẻ như nó sẽ giữ nguyên miễn phí trong tương lai.<br>

**Ưu điểm của Crashlitics:**<br>
* Đây là một công cụ chủ yếu để báo cáo sự cố crash. Nếu bạn đang tìm kiếm báo cáo sự cố - cái này sẽ cung cấp cho bạn tất cả các chức năng cần thiết;<br>
* Nó miễn phí.<br>

**Nhược điểm chính của Crashlitics:**<br>
Nó không cho phép tải lên các bản build hoặc quản lý thiết bị, nó chỉ là một công cụ báo cáo sự cố đơn giản.<br>
Để bắt đầu sử dụng với Crashlitics, bạn sẽ cần phải đăng nhập bằng tài khoản Twitter của mình. Vâng, có vẻ như bạn thấy rằng có ai đó đang có kế hoạch thu thập càng nhiều địa chỉ mạng xã hội càng tốt. Tuy nhiên, đừng hy vọng rằng bạn sẽ đăng ký và có quyền truy cập vào tất cả các chức năng ngay lập tức - bạn hiện đang ở trong danh sách chờ của họ. Xin vui lòng chờ lời mời thêm. Chờ đợi và chờ đợi.<br>

## Ubertesters
Cũng như Crashlytics, nền tảng Ubertesters là miễn phí. Nó được dành cho tất cả các loại ứng dụng di động. Nhưng không giống như Crashlytics, nó cung cấp những dịch vụ rộng hơn so với HockeyApp, bao gồm ghi nhận lịch sử sự cố crash, chỉnh sửa ảnh chụp màn hình, hỗ trợ test cases, v.v.<br>
Trong một nền tảng, nó kết hợp một công cụ kiểm tra thông minh và khả năng thuê một team kiểm thử từ xa. Tính năng push notification theo thời gian thực cho phép người kiểm thử biết về bản build mới, cho phép anh ta cài đặt nó trên thiết bị của mình. Ngoài ra, họ có khả năng gửi các lỗi và các vấn đề khác từ bên trong ứng dụng và chỉnh sửa ảnh chụp màn hình về nơi xảy ra lỗi. Đây dường như cũng là một giải pháp tốt cho các PM muốn có toàn quyền kiểm soát quá trình kiểm thử.<br>

**Ưu điểm của Ubertesters:**:<br>
* Chỉnh sửa ảnh chụp màn hình - Bạn có thể chỉ cần đánh dấu khu vực lỗi bằng chức năng vẽ khoanh vùng. Không phải là một trò đùa - tính năng cực nhỏ này đã tiết kiệm hơn 50% thời gian testing;<br>
* Khi thiếu người thử nghiệm, bạn có thể thuê người kiểm thử beta của riêng họ ngay lập tức. Mặc dù tôi chưa bao giờ sử dụng;<br>
* Hỗ trợ Test Cases - Như tôi đã đề cập ở trên, tính năng này rất quan trọng đối với tôi;<br>
* Nó đã thực sự hoàn thành toàn bộ tính năng cho phép tôi chỉ sử dụng nền tảng này cho tất cả các nhu cầu kiểm thử beta của tôi ngày hiện nay.<br>

**Nhược điểm chính của Ubertesters:**<br>
Giao diện người dùng quá phức tạp. Tôi phải mất một thời gian để điều chỉnh nó.<br>
Để bắt đầu với Ubertesters, hãy truy cập trang web của họ và điền vào mẫu đăng ký. Bạn có thể chọn nếu bạn muốn sử dụng nền tảng miễn phí hoặc muốn trả tiền (tùy thuộc vào nhu cầu thử nghiệm của bạn).<br>

**Quick tip:** hiện tại họ cung cấp gói Pro (bao gồm tất cả các tính năng) miễn phí (dưới dạng dùng thử), vì vậy tôi sẽ khuyên bạn nên chọn Pro thay vì Free khi chọn gói của bạn. Khi đăng ký, bạn sẽ cần phải tạo organization profile (hoặc tham gia một profile có sẵn), tích hợp SDK của họ vào ứng dụng của bạn, tải lên bản buiild đầu tiền và bắt đầu test.<br>
Vì vậy, có một vài khác biệt đáng kể giữa các dịch vụ được liệt kê ở trên. Mỗi một trong số chúng có thể được sử dụng cho các giải pháp thử nghiệm beta ứng dụng di động khác nhau. Để có kết quả tốt nhất cho các dịch vụ kiểm thử này, bạn phải cài đặt SDK của họ và triển khai các phần khác nhau code của bạn cho các ứng dụng đang phát triển.<br>
Đọc thêm: Hướng dẫn kiểm thử di động<br>
Trong bài viết tiếp theo, chúng tôi sẽ thảo luận thêm về Công ty phát triển ứng dụng di động<br>
Nguồn dịch: https://www.softwaretestinghelp.com/mobile-app-beta-testing-services/