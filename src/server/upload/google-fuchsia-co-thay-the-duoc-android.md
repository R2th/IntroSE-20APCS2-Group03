## Giới thiệu về Fuchsia
Google đang phát triển một hệ điều hành thứ ba sau Android và Chrome OS. Đây là một hệ điều hành mã nguồn mở, thời gian thực có tên "Fuchsia". Hệ điều hành này được giới thiệu tháng 8 năm 2016, nhưng khi đó chỉ có hỗ trợ dòng lệnh. Nhưng đến thời điểm hiện tại, dự án bí ẩn này được khoác lên một giao diện hoàn toàn mới.

Không giống như Android hay Chrome OS, Fuchsia không dựa trên nền tảng Linux, nó sử dụng microkernel "Magenta" do Google phát triển. Tài liệu của Google mô tả Magenta được phát triển để hướng đến các thiết bị di động và máy tính cá nhân hiện đại với vi xử lý nhanh và dung lượng RAM nhỏ. Hệ điều hành mới và kernel do Google tự phát triển dường như sẽ đối đầu trực tiếp với Android, nhưng còn quá sớm để có thể đưa ra bất cứ kết luận nào.

*Logo của Fushsia*![](https://images.viblo.asia/a10e595a-7798-45b0-b802-3869051a9934.png)

Fushsia có liên quan đến hàng trăm project liên quan khác. Giao diện và ứng dụng của nó được viết sử dụng Google's Flutter SDK, một dự án phát triển code đa nền tảng có thể chạy trên cả Android và IOS. Các ứng dụng Flutter được viết bằng Dart, ngôn ngữ sinh ra để viết các ứng dụng hiệu năng cao, 120fps.
## Armadillo - Hê thống giao diện người dùng của Fushsia


*Logo chính thức của Armadillo*![](https://images.viblo.asia/38de2395-d7e1-4ab0-a94b-dc2dd1d72e9f.png)

Giao diện của Fushsia được viết bằng Flutter SDK. Điều này có nghĩa là bạn có thể lấy một vài phần của Fushsia và chạy trên một thiết bị Android. Khi được công bố năm 2016 nó chỉ hỗ trợ dòng lệnh. Nhưng hiện tại, Fushsia được trang bị một hệ thống giao diện người dùng được gọi là Armadillo.

Có thể tải source và compile hệ thống giao diện người dùng của Fuchsia vào một file APK và cài đặt nó trên thiết bị Android. Nó bao hồm một màn hình chính và keyboard, nút home và window manager. Đó chỉ là một gói giao diện và chưa thực sự làm gì cả. Màn hình home là một danh sách cuộn dọc rất dài, ở giữa bạn có thể thấy một ảnh đại diện, ngày tháng, tên một thành phố và icon nguồn pin. Bên trên là các thẻ "Story" - cơ bản là các app vừa dùng - và bên dưới là một danh sách cuộn các gợi ý. Rời khỏi màn chính bạn có thể thấy một nút home ở dưới màn hình, đợn giản chỉ là một vòng tròn màu trắng.

Ảnh đại diện ở giữa có thể chọn được vào và dẫn đến một màn hình kiểu như màn cài đặt nhanh của Android. Trên cùng là một dòng các icon hiển thị nguồn pin và các kết nối. Bên dưới có các thanh trượt chỉnh volume và độ sáng, ngoài ra còn có các icon để bật chế độ máy bay, không làm phiền hay tự động xoay màn hình. Bạn có thể tương tác với các nút bấm và thanh trượt nhưng chúng không thực sự có chức năng gì giống như Android. Bên dưới có các nút bấm có nhãn đăng xuất và thêm cũng không hoạt động được.

*Giao diện của Fushsia tháng 7/2017*![](https://images.viblo.asia/5e6b5158-aa2e-47d5-8899-149b0468d3c5.png)

Bên trên thông tin cá nhân là một nhóm các thẻ được gán nhãn "Story [gì đó]". Stories là một danh sách các ứng dụng hoặc modules hoạt động cùng nhau để giúp người dùng đạt được mục đích. Nó có vẻ giớn với danh sách các ứng dụng vừa dùng, hoặc có thể là một nhóm các tính năng. Chọn một trong số các thẻ đó sẽ chuyển sang một giao diện toàn màn hình có nhãn như "email" có vẻ như là các ứng dụng.

Thanh panel Google Now bên dưới cùng bắt đầu với một thành search giả. Chọn vào đó sẽ hiển thị ra một bàn phím, nhưng không giống với bàn phím hệ thống của Android mà thay vào đó là giao diện của Fuchsia. Bên dưới của Google Now có một loạt các thẻ gợi ý, chúng có một chút khác biệt với phần tin tức, thời tiết và lịch của Google Now. Phần giao diện này nhìn giống với một ứng dụng launcher của Android.
## Một chặng đường dài phía trước
Với các dự án mới ở Google, rất khó để nói về độ lớn và khả năng bao phủ của chúng. Đó là 20 phần trăm dự án bị quên lãng sau một năm hay một thứ gì đó quan trọng. Thật may là chúng ta có các tuyên bố trực tiếp và nghiêm túc từ những nhà phát triển Fuchsia. Nhà phát triển Travis Geiselbrecht nói rằng hệ điều hành Fushsia không phải là một thứ đồ chơi hay là dự án 20%, nó không phải như những thứ đã chết không được ai quan tâm.

Android được phát triển trước cả điện thoại iPhone, nó bắt đầu với một hệ điều hành dành cho camera và sau đó trở thành bản sao chép của BlackBerry, trước khi được phát triển nhanh chóng sau khi iPhone ra mắt. Android có hai vấn đề lớn nhất là cập nhật hệ điều hành trên các thiết bị của bên thứ ba và sự không nhất quán về hiệu năng giao diện người dùng, Trong khi chưa có cách gì để khắc phục sự phân mảnh về hệ thống phần cứng thì hệ điều hành này đặt niềm tin vào ngôn ngữ lập trình Dart để tập trung cải thiện hiệu năng.

Fushsia được xem là dự án trả lời các câu hỏi "làm sao để thiết kế Android trong thời đại ngày nay, làm sao có thế làm lại từ đầu?". Nó là một hệ điều hành mới, chạy trên kernel mới, với một bộ SDK mới, viết bằng ngôn ngữ mới để chạy giao diện mới, tất cả đều của Google phát triển. Google sẽ không phụ thuộc vào nhân Linux và Java, họ sẽ tự mình xây dựng và phát triển, làm một việc như vậy với qui mô của Android ngày nay là một dự án khổng lồ.

Phần khó nhất có thể không phải là phát triển một hệ điều hành, mà là kế hoạch chuyển đổi từ Android, thứ đã phát triển thành hệ điều hành phổ biết nhất thế giới. Tính năng đa nền tảng của Flutter SDK có vẻ là phần quan trọng nhất trong kế hoạch chuyển đổi đó. Nếu Google khuyến khích được các nhà phát triển viết ứng dụng bằng Flutter, nó có thể tạo ra một hệ sinh thái vừa chạy trên iOS vừa chạy trên Android và cuối cùng là Fuchsia. Google đã cho thấy họ có thể và đã làm cho Android Runtime chạy trên nền tảng không phải là Android với Chrome OS, vậy nếu Google đã chọn đi theo kế hoạch chuyển đổi, có thể nó sẽ chuyển toàn bộ ứng dụng của Android sang Fushsia và thu hẹp khoảng cách với Android. 

Khi Fuchsia được công bố hồi tháng 8 năm 2016, Geiselbrecht đã nói rằng, dự án Magenta đã bắt đầu được 6 tháng nghĩa là vào khoảng tháng 2 năm 2016. Android về tay Google và 5 năm sau được chạy trên sản phẩm thật. Nếu Fuchsia theo kế hoạch đó và mọi thứ tiến triển tốt thì chúng ta có thể mong đợi một sản phẩm tiêu dùng trong năm 2020. Nhưng với Google, thì mọi thứ đều có thể bị hủy bỏ trước khi nhìn thấy ánh sáng. Fuchsia vẫn còn một chặng đường rất dài phía trước.