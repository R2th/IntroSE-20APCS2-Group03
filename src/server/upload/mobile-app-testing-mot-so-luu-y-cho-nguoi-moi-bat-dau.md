Bài hướng dẫn sau đây sẽ giới thiệu cho mọi người về kiểm thử phần mềm trên ứng dụng di động. Tìm hiểu thử nghiệm di động là gì? Tại sao nó quan trọng? Những thách thức đối với thử nghiệm di động và cách kiểm tra các ứng dụng di động gốc cũng như các ứng dụng web di động là gì?. Để đảm bảo chất lượng, việc áp dụng kiểm thử trên thiết bị di động cũng đã và đang được triển khai rộng rãi. Trong bài viết này sẽ đem lại những kiến thức cơ bản về kiểm thử ứng dụng di động

# 1. Ứng dụng di động là gì?
Ứng dụng di động lbao gồm ba loại phần mềm chính: Ứng dụng gốc, Ứng dụng web di động và Ứng dụng lai.
![](https://images.viblo.asia/3f610c0f-0865-4c98-b090-43e0fbacbeca.png)

**a. Các ứng dụng gốc**

Các ứng dụng gốc là những ứng dụng được viết cho một nền tảng cụ thể, chẳng hạn như các ứng dụng được viết bằng Objective-C hoặc Swift cho thiết bị iOS hoặc bằng Java cho thiết bị Android. Các ứng dụng gốc được phân phối cho người dùng thông qua một cửa hàng ứng dụng, thường cung cấp hiệu suất tốt nhất cho thiết bị di động và có quyền truy cập vào tất cả các tính năng của thiết bị. Thay thế cho việc phát triển phần mềm cho các thiết bị cụ thể, nhiều nhà phát triển thích cách tiếp cận viết một lần ở mọi nơi của các ứng dụng web di động chạy trong trình duyệt web. Các ngôn ngữ phát triển ứng dụng web di động hàng đầu bao gồm HTML5, Javascript và Adobe Flash / Flex. Người dùng có thể truy cập các ứng dụng web mà không cần phải tải xuống trước trong cửa hàng ứng dụng. 

**b. Ứng dụng web di động**

Các ứng dụng web di động phải tương thích với tất cả các trình duyệt web chính được hỗ trợ trên các thiết bị di động, bao gồm Chrome, Safari, Firefox và Opera. Một nhược điểm quan trọng của các ứng dụng web di động là chúng có khả năng hạn chế truy cập các tính năng của thiết bị như GPS, máy ảnh và micrô. 

**c. Ứng dụng lai**

Các ứng dụng lai có giao diện người dùng gốc và phụ trợ dựa trên đám mây. Giao diện người dùng gốc cung cấp quyền truy cập vào các tính năng của thiết bị, trong khi phụ trợ có thể sử dụng các tài nguyên web như cơ sở dữ liệu trực tuyến. Ví dụ: cửa hàng trực tuyến có thể cung cấp ứng dụng lai cho phép người dùng tìm kiếm cửa hàng trực tuyến và mua hàng từ thiết bị di động của họ hoặc ứng dụng chia sẻ ảnh có thể cho phép người dùng chụp ảnh, chỉnh sửa và sau đó lưu trữ chúng trên đám mây để chia sẻ. Giống như các ứng dụng gốc hoàn toàn, các ứng dụng lai được phân phối cho người dùng thông qua một cửa hàng ứng dụng. Các công cụ như Amazon Web Services (AWS), Mobile Hub hoặc Google Firebase hỗ trợ phát triển cả ứng dụng web lai và ứng dụng di động.

# 2. Tại sao phải kiểm thử trên ứng dụng di động?

Một ứng dụng không đáp ứng các tiêu chuẩn của Apple về chất lượng, thậm chí còn vượt qua quá trình xem xét và vào cửa hàng ứng dụng. Người dùng ứng dụng di động nhanh chóng xóa các ứng dụng , sập, tải chậm hoặc có trải nghiệm người dùng kém - và để lại các đánh giá xấu trong cửa hàng ứng dụng. Với hàng chục ngàn ứng dụng có sẵn cho người dùng, thậm chí một vài đánh giá xấu có thể là hồi chuông báo tử cho một ứng dụng. Khi một lỗi trong ứng dụng gốc hoặc lai đã xuất hiện trên thiết bị di động, việc khắc phục nó là một nỗ lực tốn thời gian bao gồm gửi lại ứng dụng tới cửa hàng ứng dụng, chờ Apple xem xét và chờ người dùng tải xuống bản cập nhật. Thử nghiệm hiệu quả là rất quan trọng để giảm thiểu lỗi và cải thiện chất lượng trong các ứng dụng di động, dẫn đến các ứng dụng giúp người dùng tham gia và kiếm được xếp hạng cao từ người dùng. Vì lý do này, các thử nghiệm ứng dụng di động phải được thiết kế tốt để không chỉ bao gồm chức năng của ứng dụng mà còn dễ sử dụng và hiệu suất. Người dùng đã giành chiến thắng với các ứng dụng sử dụng lượng dữ liệu không hợp lý hoặc làm hao pin thiết bị của họ. Ứng dụng cũng phải có khả năng đáp ứng một cách duyên dáng với các sự kiện như tắt thiết bị, đưa thiết bị vào chế độ máy bay hoặc kết nối với thiết bị khác thông qua WiFi, USB hoặc Bluetooth.

**a. Thiết bị đa dạng**

Một trong những thách thức lớn nhất trong thử nghiệm ứng dụng di động là rất nhiều thiết bị di động có sẵn, bao gồm máy tính bảng, đầu đọc điện tử, điện thoại di động và thiết bị đeo. Các thiết bị này có các phương thức nhập khác nhau, chẳng hạn như bàn phím vật lý, bàn phím ảo, màn hình cảm ứng, bàn di chuột, nút và công tắc. Chúng cũng có các tính năng không được tìm thấy trên máy tính để bàn hoặc máy tính xách tay, chẳng hạn như máy thu GPS, con quay hồi chuyển, máy đo nhịp tim và máy quét vân tay hoặc khuôn mặt. Thiết bị di động cung cấp các kích thước và độ phân giải màn hình khác nhau và có thể được sử dụng theo hướng màn hình ngang hoặc dọc.

Các thiết bị di động có các hệ điều hành khác nhau và các phiên bản khác nhau của cùng một hệ điều hành thường được sử dụng tại bất kỳ thời điểm nào. Chỉ trong hệ sinh thái Apple, iPad và iPhone có thể đang sử dụng iOS 10 hoặc 11, trong khi Apple TV sử dụng tvOS và đồng hồ Apple sử dụng watchOS. Các nhà cung cấp cung cấp phương tiện truyền thông trực tuyến có thể phải phát triển các phiên bản ứng dụng của họ cho cả ba hệ điều hành Apple - và điều đó không bao gồm tất cả các phiên bản của hệ điều hành Android có sẵn. Theo Tin tức kiểm thử phần mềm, năm 2018, một phòng thí nghiệm thử nghiệm thủ công mới sẽ cần gần 50 thiết bị chỉ để cung cấp bảo hiểm 80% cho các kết hợp có thể.

**b. Kết nối**

Các cân nhắc khác cho thử nghiệm di động bao gồm nhiều tùy chọn kết nối như Bluetooth, WiFi hoặc mạng di động. Đối với cả WiFi và mạng di động, các ứng dụng phải có khả năng đáp ứng tốt với nhiều tốc độ kết nối khác nhau, chẳng hạn như Edge, 3G hoặc LTE. Ngoài ra, điều quan trọng đối với thử nghiệm là phản ứng của ứng dụng đối với việc mất kết nối - ví dụ: khi người dùng đặt thiết bị ở chế độ máy bay hoặc di chuyển vào khu vực không có vùng phủ sóng.


**c. Kiểm tra liên tục**

Người dùng thiết bị di động mong muốn các ứng dụng cập nhật thường xuyên - cả hai để thêm tính năng và duy trì khả năng tương thích với các bản phát hành O / S thường xuyên. Để đáp ứng kỳ vọng này, nhiều nhóm phát triển di động sử dụng các phương pháp phát triển nhanh, bao gồm tích hợp liên tục và triển khai liên tục. Đổi lại, điều này tạo ra một môi trường thử nghiệm liên tục, trong đó phản hồi nhanh là điều cần thiết.

# 3. Một số vấn đề cần lưu ý

* Trên desktop, ứng dụng được kiểm thử trên một đơn vị xử lý trung tâm. Trên thiết bị di động, ứng dụng được thử nghiệm trên các thiết bị cầm tay như Samsung, Nokia, Apple và HTC.

* Kích thước màn hình thiết bị di động nhỏ hơn máy tính để bàn.

* Thiết bị di động có bộ nhớ ít hơn máy tính để bàn.

* Điện thoại di động sử dụng kết nối mạng như 2G, 3G, 4G hoặc WIFI, nơi máy tính để bàn dùng băng rộng hoặc quay số kết nối.

* Công cụ tự động được sử dụng để kiểm thử ứng dụng trên máy tính để bàn có thể không hoạt động trên các ứng dụng di động.

# 4. Các loại kiểm thử áp dụng cho Mobile App Testing
* Interface Testing - Kiểm thử giao diện: Test màu sắc, căn chỉnh, font chữ,... sự nhất quán giao diện giữa các màn hình, và trên các thiết bị khác nhau,...
* Function Testing - Kiểm thử chức năng: Chức năng của ứng dụng được hoạt động đúng.
* Usability Testing - Kiểm tra tính khả dụng: Đảm bảo ứng dụng dễ sử dụng, thu hút người dùng,...
* Installation tests - Kiểm thử cài đặt: Xác nhận ứng dụng bằng cách cài đặt / gỡ cài đặt trên nhiều thiết bị khác nhau, có xảy ra lỗi trong quá trình cài đặt/ gỡ, hay có hạn chế cài đặt không?...
* Compatibility Testing - Thử nghiệm tương thích: Kiểm tra khả năng tương thích của ứng dụng trên các thiết bị di động, với các trình duyệt, kích cỡ màn hình và phiên bản hệ điều hành, loại smartphone khác nhau,...
* Operational Testing: Kiểm tra khả năng sao lưu và khắc phục nếu sập nguồn điện thoại, hoặc mất dữ liệu khi nâng cấp phiên bản ứng dụng,...
* Security Testing - Kiểm thử bảo mật: Xác nhận ứng dụng không tồn tại lỗ hổng bảo mật, bảo vệ hệ thống tránh tấn công từ những hacker...
* Performance Testing - Kiểm thử hiệu năng: Giả sử thay đổi kết nối từ 3G sang 4G, hay khi nhiều user cùng sử dụng ứng dụng,...
* Stress Testing - Kiểm thử gián đoạn cuộc gọi thoại, SMS, yếu pin, thiếu bộ nhớ, ngắt kết nối mạng... trong khi ứng dụng đang chạy.


# 5. Cân nhắc trong việc lựa chọn công cụ kiểm tra di động

Kiểm thử tự động trên di động là điều cần thiết để cung cấp phản hồi nhanh cần thiết trong môi trường thử nghiệm liên tục. Có cả giải pháp nguồn mở và độc quyền có sẵn. Appium là một công cụ mã nguồn mở hàng đầu để thử nghiệm các ứng dụng gốc, web di động và ứng dụng lai trên iOS, Android và Windows. Appium sử dụng giao thức Selenium WebDriver nguồn mở, phổ biến.

Khi chọn một công cụ, có một số khía cạnh cần xem xét:
* Công cụ tự động hóa có thể thực hiện các thử nghiệm song song trên nhiều thiết bị không?
* Nó có hỗ trợ cả giả lập / giả lập và thiết bị thực không?
* Nó có cung cấp các mô-đun mã có thể tái sử dụng và cung cấp thử nghiệm dựa trên dữ liệu không?
* Nó có hỗ trợ cho các ứng dụng gốc, ứng dụng web di động và ứng dụng lai cho tất cả các nền tảng chính không?
* Công cụ có thiết kế một lần, chạy mọi cách tiếp cận với các cấu hình duy nhất cho mỗi điểm cuối không?
* Công cụ này có hỗ trợ các giải pháp nguồn mở hàng đầu bao gồm các nút / lưới Selenium WebSearch và Appium không?
* Công cụ này có hỗ trợ các khả năng JSON để tạo các ứng dụng lai và ứng dụng di động không?
* Công cụ này có cung cấp nhận dạng đối tượng GUI hay bị giới hạn trong nhận dạng hình ảnh?

Nguồn : https://www.ranorex.com/resources/testing-wiki/mobile-testing/