Nếu bạn là một kỹ sư kiểm thử tư động, bạn đã chắc chắn nghe nói về Selenium. Nhưng với những lần thay đổi và tất cả các bạn có lẽ tự hỏi mình nếu bạn có thể sử dụng tốt các kỹ năng Selenium của bạn với thử nghiệm di động. Vâng, tôi có một số tin tuyệt vời cho bạn, chỉ cần tiếp tục đọc!

### Selenium để thử nghiệm di động
Thử nghiệm trên thiết bị di động đã trở thành yêu cầu và người kiểm thử muốn mở rộng kiến thức và hiệu suất thử nghiệm của họ cũng có thể thực hiện thử nghiệm trên điện thoại di động. Hiện có rất nhiều phần mềm truy cập được từ các trình duyệt của bạn và hầu hết các trang web này có một ứng dụng phù hợp.

Nếu bạn đang sử dụng Selenium cho việc kiểm thử, bạn đang thử nghiệm các ứng dụng web, do đó, có khả năng là công ty của bạn cũng có ít nhất một ứng dụng dành cho thiết bị di động.

Vì vậy, "Selenium có thể được sử dụng để thử nghiệm di động? "Câu trả lời ngắn gọn là" Không thực sự ", nhưng bạn đừng thất vọng, có một câu trả lời dài hơn cho câu hỏi đó.

Câu trả lời dài là: "Bạn không thể sử dụng Selenium cho thử nghiệm ứng dụng dành cho thiết bị di động, nhưng có các frameworks dựa trên Selenium được tạo ra đặc biệt cho thử nghiệm tự động trên điện thoại di động. Bạn vẫn có thể sử dụng Selenium cho thử nghiệm trang web di động. "

Những frameworks này là:

* Selendroid
* Appium

##### SELENDROID là gì?
Selendroid, như tên gọi cho thấy, là một frameworks làm việc tự động kiểm tra dựa trên Selenium được thực hiện đặc biệt cho Android. Selendroid cũng có thể được sử dụng trên mô phỏng và các thiết bị thực và có thể được tích hợp vào Selenium Grid để nhân rộng và kiểm tra song song.

##### APPIUM là gì?
Mặt khác, Appium là một frameworks thử nghiệm giao diện người dùng điện thoại di động đa công nghệ chéo dựa trên Selenium cho các ứng dụng gốc, các ứng dụng web di động và lai. Điều này có nghĩa là bạn có thể chạy thử nghiệm trên cả Android và iOS trong khi chỉ viết một kịch bản thử nghiệm (test script).

Mỗi kỹ sư kiểm thử tự động biết làm thế nào để viết tests với Selenium cũng có thể viết tests với Appium.

Điều tốt nhất về Selenium / Selendroid và Appium? Bạn có thể viết các test script trong bất kỳ ngôn ngữ tương thích WebDriver nào như Java, Objective-C, JavaScript với Node.js, PHP, Python, Ruby, C #, Clojure hoặc Perl.

### Selendroid vs. Appium - Lựa chọn nào cho Thử nghiệm ứng dụng trên điện thoại di động của bạn
Thực tế, Selendroid hiện được tích hợp vào gói Appium để cung cấp hỗ trợ cho các phiên bản Android 2.3 đến 4.1. Appium tự động chuyển sang Selendroid khi người dùng muốn chạy thử nghiệm cho các phiên bản Android này.

Hiểu được sự khác biệt giữa Appium và Selendroid là rất quan trọng, bởi vì ngay cả khi bạn đang sử dụng Appium, có khả năng bạn đang ngầm chạy Selendroid. Dưới đây, tôi xem xét kỹ hơn cả hai công cụ kiểm tra này và so sánh các tính năng của chúng.

![](https://images.viblo.asia/798c4764-e5fb-4dc7-9a90-d1b3875fa532.jpg)

#### Khi nào nên sử dụng SELENDROID?
Selendroid là một lựa chọn tốt nếu bạn đang nghĩ đến việc chỉ phát triển các ứng dụng Android. Điểm nổi trội của nó là khả năng tương thích ngược; nó hỗ trợ Android API 10 (Android 2.3.3) thông qua API 19 (Android 4.4).

Cũng đáng chú ý là Selendroid có chứa một công cụ kiểm tra có thể kiểm tra các yếu tố UI của ứng dụng đang được thử nghiệm. Mặc dù bạn cũng có thể tìm thấy các thành phần UI trong Appium, nhưng lợi thế mà Selendroid có trên Appium là Selendroid có thể tìm thấy các yếu tố UI cho các phiên bản Android cũ hơn.

Trong quá trình thử nghiệm, các thiết bị có thể được sạc nguồn hoặc ngắt sạc mà không làm gián đoạn quá trình chạy, còn được gọi là "cắm nóng". Điều này sẽ giúp Selendroid có khả năng tương tác với nhiều thiết bị Android cùng một lúc, bao gồm các bộ mô phỏng và các thiết bị phần cứng, tiết kiệm rất nhiều thời gian cho bạn.

##### Lợi ích của Selendroid
* Tương thích hoàn toàn với chuẩn JSON Wire / Selenium 3 Ready.
* Bạn không cần phải sửa đổi ứng dụng cần thử để tự động hoá.
* Kiểm thử web di động bằng ứng dụng webview được tích hợp sẵn trong trình điều khiển Android.
* Cùng một khái niệm cho tự động hoá ứng dụng gốc hoặc ứng dụng lai.
* Các yếu tố UI có thể được tìm thấy bởi các loại định vị khác nhau.
* API tương tác người dùng nâng cao.
* Các Emulators hiện tại được khởi động tự động.
* Selendroid hỗ trợ cắm nóng trên các thiết bị phần cứng.
* Tích hợp đầy đủ như một nút vào Selenium Grid để nhân rộng và thử nghiệm song song.
* Hỗ trợ API trên android (10 đến 19).
* Được xây dựng vào Inspector để đơn giản hóa phát triển test
* Selendroid có thể được mở rộng khi chạy với các phần mở rộng của riêng bạn.
* Selendroid có thể tương tác với nhiều thiết bị Android (giả lập hoặc thiết bị phần cứng) cùng một lúc.

##### Nhược điểm của Selendroid
Hạn chế của công cụ này là nó là khá chậm và trên một số máy có ít hơn 4GB RAM thì không sử dụng được.

##### Làm thế nào để sử dụng Selendroid
**Bước 1 -** Điều kiện tiên quyết để sử dụng Robotium là Java SDK (tối thiểu 1.6). Nếu bạn không có Java được cài đặt trên hệ thống của mình, hãy làm theo các bước dưới đây.

* Tải về JDK và JRE từ Oracle JavaSE
* Chấp nhận thỏa thuận cấp phép.
* Cài đặt JDK và JRE.
* Đặt biến môi trường như thể hiện trong hình bên dưới.
![](https://images.viblo.asia/cc87ff6d-c8e9-4cb0-a7af-ee2d7f49ba70.jpg)

**Bước 2 -** Tải xuống Android Studio từ SDK Android (sẽ mất thời gian do kích thước của tệp tin).

* Nhấp đúp vào exe và chạy trình cài đặt.
* Tiếp tục với tất cả tùy chọn mặc định.
* Đặt ANDROID_HOME.

**Bước 3 -** Tải các tập tin Selenium jar và ứng dụng kiểm tra từ Selendroid (http://selendroid.io/)

* Tải xuống tập tin selenium jar và ứng dụng thử nghiệm.
* Đặt nó vào bất kỳ thư mục nào, ví dụ D: \ SelendroidJars.

**Bước 4 -** Thiết bị vật lý bằng cáp USB.

* Đảm bảo thiết bị được gắn vào máy trạm bằng cáp USB.
* Hãy đảm bảo rằng chế độ gỡ lỗi USB (dưới cài đặt → Các tùy chọn của Nhà phát triển) được bật.

#### Khi nào nên sử dụng APPIUM?
Rất nhiều lợi thế khác biệt mà Appium có trên Selendroid làm cho nó trở thành lựa chọn mạnh mẽ hơn. Không giống như Selendroid, Appium hỗ trợ thử nghiệm các ứng dụng iOS cùng với Android. Nó cũng cung cấp trải nghiệm dễ dàng hơn trên Selendroid bằng cách không phải sử dụng SDK và loại bỏ nhu cầu biên dịch lại các ứng dụng để kiểm tra chúng. Điều này cũng có nghĩa là ứng dụng mà bạn kiểm tra là ứng dụng mà bạn gửi mà không phải sửa đổi bất cứ thứ gì chỉ vì mục đích thử nghiệm. Appium có trình kiểm tra Giao diện người dùng riêng của mình, nhưng công cụ Android studio, người kiểm tra thông tin, cũng có thể được sử dụng.

Mặc dù Appium không thể sử dụng để thử nghiệm các ứng dụng cho các API Android dưới 17, nhưng nó có chế độ Selendroid để trợ giúp cho việc đó. Selendroid đi kèm với Appium v1.2 trở đi và trong chế độ Selendroid của Appium, nó có thể giúp thử nghiệm các ứng dụng trên các phiên bản Android cũ hơn, nhưng với một số hạn chế - chẳng hạn như thiếu khả năng định vị các phần tử UI như Selendroid hoặc khả năng sử dụng cùng một kịch bản trong hai chế độ mà không sửa đổi. Những hạn chế này có thể được khắc phục bằng cách sử dụng Selendroid như một công cụ độc lập, tách biệt với Appium.

Khi xuất bản bài đăng này, Appium ở v1.5.3, có nghĩa là nó đang được phát triển với một tốc độ nhanh hơn Selendroid, là lúc v0.17. Cộng đồng người dùng cho Appium cũng lớn hơn, cho phép hỗ trợ nhiều hơn dưới dạng các bài đăng blog của người dùng, tài liệu và nhiều kho Github với rất nhiều hoạt động. Đây là một yếu tố quan trọng cho các doanh nghiệp có đội ngũ phân phối trên toàn cầu cần được giúp đỡ trong khi sử dụng các công cụ.

Appium có các công việc của một công cụ tuyệt vời dành cho doanh nghiệp. Điều cuối cùng bạn cần là một công cụ kiểm tra bị hỏng trong khi bạn đang thử nghiệm ứng dụng của riêng mình để tìm lỗi. Appium cho phép bạn cung cấp các ứng dụng di động chất lượng cao bằng cách thử nghiệm chúng với tốc độ ổn định.

##### Ưu điểm của Appium

* Đó là miễn phí và (chủ yếu) mã nguồn mở.
* Có một nhóm Google được hỗ trợ và hoạt động rất tốt.
* Đó là thông số kỹ thuật của Selenium 3 nên là minh chứng trong tương lai.
* Nó hỗ trợ cả Android và iOS.
* Nó không đòi hỏi bất cứ điều gì để được cài đặt trên thiết bị - không có yêu cầu thay đổi máy chủ hoặc mã.

##### Những hạn chế của Appium

* Không hỗ trợ chờ đợi thông minh.
* Trên iOS, bạn chỉ có thể thực hiện một lần kiểm tra tại một thời điểm cho mỗi máy Mac.
* Hỗ trợ hạn chế cử chỉ.
* Hỗ trợ Android hạn chế <4.1

##### Cách sử dụng Appium

**Bước 1 -** Các điều kiện tiên quyết để sử dụng Appium là Java SDK (tối thiểu 1.6). Nếu bạn không có Java được cài đặt trên hệ thống của mình, hãy làm theo các bước dưới đây.

* Tải về JDK và JRE từ Oracle JavaSE
* Chấp nhận thỏa thuận cấp phép.
* Cài đặt JDK và JRE.
* Đặt biến môi trường như thể hiện trong hình bên dưới.

![](https://images.viblo.asia/a57a53fd-b8a8-4ee7-ab5a-0f039b0659bf.jpg)

**Bước 2 -** Tải xuống Android Studio từ SDK (sẽ mất thời gian do kích thước của tệp tin).

* Nhấp đúp vào exe và chạy trình cài đặt.
* Tiếp tục với tất cả tùy chọn mặc định.
* Đặt ANDROID_HOME.

**Bước 3 -** Cài đặt hình ảnh và công cụ Android.

* Nhấp vào Trình quản lý SDK -

![](https://images.viblo.asia/36813134-0f93-4e16-99bc-ce6a7388013f.jpg)

* Chọn gói cần thiết. Ví dụ: nếu chúng ta đang xây dựng ứng dụng dành cho Android 4.4.2, hãy đảm bảo các gói sau đây được chọn trong phần Công cụ -

     + Android SDK Tools rev 22.6.3
     + Android Platform-tools rev 19.0.1
     + Android SDK Build-tools rev 19.1
     
**Bước 4 -** Tạo Thiết bị Android ảo -

* Mở Android Studio và nhấp vào Trình quản lý AVD trên thanh công cụ. AVD cho phép chúng ta kiểm tra và chạy ứng dụng Android của chúng ta.

![](https://images.viblo.asia/ce9ff6fa-d637-4081-8e04-6fe97aebeef8.jpg)

* Sử dụng các cài đặt sau đây cho Nexus5 AVD -

     + Thiết bị: Nexus 5 (4,95, 1080 x 1920; xxhdpi)
     + Mục tiêu: API của Google x86 (Google Inc.) - Cấp độ API 19
     + Đảm bảo bạn chọn mục tiêu với Google API bằng tên.
     + CPU: Intel Atom (x86)
     + Chọn Use Host GPU
     + Nhấp OK.

* Bây giờ bạn sẽ thấy AVD mà bạn đã tạo trong AVD Manager, nơi bạn có thể bắt đầu, xóa nó, hoặc tạo một AVD Manager khác!

### PHẦN KẾT LUẬN
Trong hầu hết các trường hợp, Appium là sự lựa chọn đúng trong cả hai. Nó có rất nhiều tính linh hoạt, hỗ trợ rộng rãi và đi kèm với chế độ Selendroid. Mặc dù Selendroid làm một số điều tốt hơn Appium và có một số tính năng tương tự, Appium tương đối đa năng hơn và có một cộng đồng lớn hơn, làm cho nó trở thành một lựa chọn mạnh mẽ hơn cho việc thử nghiệm các ứng dụng di động. Điểm cộng, như đã nói ở trên, Appium bao gồm Selendroid và tự động quay lại khi cần. Điều này có nghĩa là Appium thực sự là công cụ duy nhất bạn phải cài đặt. Mặc dù việc hiểu rõ sự khác biệt giữa Appium và Selendroid rất hữu ích, nhưng trong hầu hết các trường hợp, không có lý do để cài đặt và chạy Selendroid như một công cụ độc lập.

Nguồn:
https://saucelabs.com/blog/can-selenium-be-used-for-mobile-testing
https://saucelabs.com/blog/selendroid-vs-appium-which-to-choose-for-your-mobile-app-testing
https://www.tutorialspoint.com/mobile_testing/mobile_testing_selendroid_framework.htm
https://www.tutorialspoint.com/mobile_testing/mobile_testing_appium_framework.htm