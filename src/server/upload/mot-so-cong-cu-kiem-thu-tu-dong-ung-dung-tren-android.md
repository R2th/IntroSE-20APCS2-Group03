Ngày nay các bài kiểm tra tự động được sử dụng trong hầu hết mọi quá trình kiểm tra. Điều này không có gì đáng ngạc nhiên, vì thử nghiệm tự động được tổ chức hợp lý giúp giảm đáng kể thời gian cần thiết cho quá trình thử nghiệm, loại trừ các lỗi và thiếu sót trong thực hiện thử nghiệm do yếu tố con người gây ra. 

Nhiều lựa chọn công cụ tự động hóa có sẵn khiến cho việc lựa chọn những công cụ phù hợp nhất cho một dự án trở nên khó khăn. Vấn đề là hầu như không có bất kỳ công cụ hiện có nào hoàn toàn tương ứng với các yêu cầu của dự án. Đặc biệt đối với các thiết bị di động, các yêu cầu ứng dụng và công cụ phù hợp thì khác nhau ở những hệ điều hành khác nhau như: Android, Apple iOS, Blackberry OS, Windows Phone, Symbian và các hệ điều hành khác.

Sau đây tôi sẽ giới thiệu một số công cụ kiểm thử tự động nỗi bật trên thiết bị di động - hệ điều hành Android:

    1. Robotium
    2. MonkeyRunner
    3. Ranorex
    4. Appium
    5. UI Automator
    6. Kobiton
    7. Calabash

**1. Robotium Android Testing Tool**

![](https://images.viblo.asia/abcee699-86e7-4818-9de3-9e1282695cd6.jpg)

Robotium là một trong những công cụ kiểm tra tự động đầu tiên và thường xuyên được sử dụng cho phần mềm được hỗ trợ trên Android.

Robotium được ví như là Selenium cho Android, là một công cụ kiểm tra giao diện người dùng Android miễn phí. Các thử nghiệm được tạo bởi Robotium được viết bằng Java.

Với Robotium, người kiểm thử phải làm việc trực tiếp với mã nguồn để tự động hóa các thử nghiệm, do vậy cần có nhiều thời gian để thực hiện. Công cụ này cũng không phù hợp để tương tác với phần mềm hệ thống; nó không thể khóa và mở khóa điện thoại thông minh hoặc máy tính bảng. Không có chức năng Ghi và Phát trong Robotium và nó không cung cấp ảnh chụp màn hình


Tìm hiểu hướng dẫn về **Robotium** tại đây: https://www.softwaretestinghelp.com/robotium-tutorial-android-application-ui-testing-tool/


**2. MonkeyRunner Android App Testing**

![](https://images.viblo.asia/f6d993b2-e51f-43d2-ab60-88ea3ad0fce7.jpg)

MonkeyRunner là một trong những công cụ Kiểm tra Android phổ biến được sử dụng để tự động hóa các kiểm tra chức năng cho phần mềm Android.

Công cụ này ở cấp độ thấp hơn Robotium. Người kiểm thử không trực tiếp sử dụng mã nguồn để tự động hóa các bài kiểm tra. Các bài kiểm tra được viết bằng Python.

MonkeyRunner có thể chạy thử nghiệm trên các thiết bị thực được kết nối với PC hoặc trình giả lập. Công cụ này có API cho phép nó điều khiển điện thoại thông minh, máy tính bảng hoặc trình giả lập từ bên ngoài mã Android.

Nhược điểm của MonkeyRunner là  phải điều chỉnh các trường hợp kiểm tra mỗi lần khi giao diện người dùng mỗi của chương trình được kiểm tra bị thay đổi.

Tìm hiểu hướng dẫn về  **MonkeyRunner** tại đây: https://developer.android.com/studio/test/monkeyrunner


**3. Ranorex Android Application Testing Tool**

![](https://images.viblo.asia/fcc2f294-6440-42a7-b177-591d8fc890e3.jpg)

Ranorex là một công cụ tốt để kiểm tra tự động hóa không chỉ cho phiên bản mới nhất mà còn cho các phiên bản đầu tiên và phiên bản phụ của Android, bắt đầu từ Android 2.2.

Một trong những lợi thế của Ranorex là các báo cáo chi tiết với ảnh chụp màn hình. Nó có thể kết nối điện thoại thông minh hoặc máy tính bảng với Internet thông qua WiFi.

Bằng Ranorex, người kiểm tra tự động có thể xây dựng các thử nghiệm dựa trên dữ liệu, ngoại trừ định dạng dữ liệu XML. Nó cho phép xây dựng các module chương trình bổ sung. Các module có thể được sử dụng trong các chu kỳ phát triển muộn cho các kịch bản thử nghiệm phức tạp hơn.

Nhược điểm của Ranorex là chỉ ứng dụng được với các bản ghi APK, mỗi thao tác thực hiện trên Ranorex khá chậm, mất khoảng 30 giây.

Có thể tham khảo thêm về **Ranorex** tại đây: https://www.ranorex.com/


**4. Appium Android Automation Framework**

![](https://images.viblo.asia/14fe8ca8-d9b9-4927-b295-672b1116c012.jpg)

Appium hỗ trợ các phiên bản Android từ 2.3 trở lên, sử dụng giao diện WebDriver để chạy thử.

Appium hỗ trợ nhiều ngôn ngữ lập trình, như Java, C #, Ruby và các ngôn ngữ khác có trong thư viện WebDriver.

Nhược điểm của Appium là cung cấp báo cáo không đầy đủ và không hỗ trợ  XPath trên thiết bị di động.

Có thể trải ngiệm **Appium** tại đây:  http://appium.io/


**5. UI Automator for Android Test Automation**

![](https://images.viblo.asia/46e37a8e-e263-42d8-9a5c-f0fc98fc51de.jpg)

UI Automator là sản phẩm của Google được xây dựng đặc biệt riêng cho hệ điều hành Android, hỗ trợ các phiên bản Android bắt đầu từ 4.1.

UI Automator có thể tương tác với tất cả các loại sản phẩm phần mềm cho Android, bao gồm cả các ứng dụng hệ thống. Điều này cho phép UI Automator khóa và mở khóa điện thoại thông minh hoặc máy tính bảng.

Các tập lệnh được tạo bằng phương tiện của công cụ này có thể được thực thi trên nhiều nền tảng Android khác nhau. Nó cho phép tái tạo các chuỗi phức tạp của hành động người dùng.

UI Automator cũng có thể sử dụng các nút bên ngoài của thiết bị, chẳng hạn như các nút để quay lại, điều chỉnh âm lượng, bật và tắt thiết bị.

Nó có thể được tích hợp với khung thử nghiệm TestNG. Trong trường hợp này, UI Automator có thể tạo các báo cáo thông tin và chi tiết, tương tự như các báo cáo được tạo bởi Ranorex. Công cụ này cũng tìm kiếm các yếu tố rất nhanh.

Có thể tham khảo hướng dẫn **UI Automator** tại đây: https://developer.android.com/training/testing/#UIAutomator


**6. Kobiton**

![](https://images.viblo.asia/4c0e58e3-2a33-47ad-9992-3eee96d8fc56.jpg)

Kobiton là hệ thống dựa trên đám mây được xây dựng thông qua nguồn mở, có thể thực hiện kiểm tra thủ công và tự động.

Kobiton cho phép thực hiện kiểm tra trên thiết bị thực, bạn có thể thực hiện cả chạy thử nghiệm ứng dụng di động và chạy thử web trên thiết bị di động, và chuyển giữa các tùy chọn thủ công và tự động.

Nhược điểm của Kobiton là bạn có thể gặp lỗi hết thời gian (Timeout) với một số lệnh nhất định và truyền phát video không được hỗ trợ nếu bạn đang sử dụng trình duyệt IE 11 và Edge. Ngoài ra, một số cài đặt màn hình nhất định không thể thay đổi vì chúng có khả năng ảnh hưởng đến các thiết bị của Kobiton.

Có thể tham khảo **Kobiton** tại đây: https://kobiton.com/


**7. Calabash**

![](https://images.viblo.asia/661b0e48-8dd3-4476-9ecf-218a1b612fc6.jpg)

Công cụ kiểm tra Android tự động Calabash, một sản phẩm nguồn mở được phát triển và duy trì bởi Xamarin.

Điểm nỗi bật của Calabash là hỗ trợ cho Cucumber, một nhánh của Ruby cho phép bạn viết các bài kiểm tra tự động bằng tiếng Anh đơn giản thay vì mã phức tạp.

Nhược điểm của Calabash là chỉ hỗ trợ Ruby, các bài kiểm tra cũng có thể tốn thời gian và nó có thể hơi khó sử dụng

Có thể tham khảo **Calabash** tại đây: https://calaba.sh/



Thông tin trong bài viết được tham khảo từ các nguồn: 
https://www.softwaretestinghelp.com/5-best-automation-tools-for-testing-android-applications/

https://bugfender.com/blog/best-automated-testing-tools-android/