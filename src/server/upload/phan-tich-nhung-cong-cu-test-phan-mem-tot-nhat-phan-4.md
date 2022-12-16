Trong [phần 3](https://viblo.asia/p/phan-tich-nhung-cong-cu-test-phan-mem-tot-nhat-phan-3-RnB5p08w5PG), mình đã giới thiệu thêm về những công cụ quản lý quá trình test và các công cụ test ity. Phần này mình sẽ tiếp tục phân tích vai trò và liệt kê những công cụ hỗ trợ quá trình setup test và hạ tầng test (Test Setup & Infrastructure) theo như đã phân loại trước đó.

![](https://images.viblo.asia/9fddd74f-6086-40f5-b18c-8ef61d0386d7.png)

**7. Những công cụ  hỗ trợ quá trình setup và hạ tầng test (Test Setup & Infrastructure Tools)**

Những công cụ hỗ trợ setup test và hạ tầng test đang thay đổi nhanh chóng do những xu hướng mới trong nền tảng di động, web (cloud - đám mây), noSQL và Container với sự tham gia của nhiều công ty mới.

Chúng ta có thể chia những công cụ hỗ trợ quá trình setup và hạ tầng test thành 4 loại:

+	Những công cụ hỗ trợ kỹ thuật đám mây.
+	Những công cụ hỗ trợ mạng thiết bị di động.
+	Những công cụ quản lý dữ liệu test.
+	Những công cụ quản lý môi trường test.

**7.1. Những công cụ hỗ trợ kỹ thuật đám mây (Test Cloud Tools)**

Những công cụ hỗ trợ kỹ thuật đám mây cung cấp một mạng những máy ảo nơi mà những máy tính và những web được thực hiện test có thể tương tác với nhau tại một mức giá thấp, giúp tiết kiệm tiền của các công ty, tổ chức. Các nhà cung cấp Container và AWS/Cloud đang giảm dần những rào cản để thâm nhập thị trường này. 

Để chi tiết mình sẽ lựa chọn 2 công cụ hỗ trợ kỹ thuật đám mây điển hình để phân tích bên dưới.


**7.1.1. Sauce Labs**

***1. Tóm tắt*** 

Cung cấp những tùy chọn test đa trình duyệt, test di động hoặc test thủ công cũng như việc test tự động trên cả trình duyệt và di động song song. Sauce Labs sử dụng kỹ thuật tunnel (kỹ thuật truyền thông tin qua hệ thống mạng trung gian theo những đường ống riêng) để mã hóa luồng thông tin giữa những những bài test riêng biệt và dữ liệu đám mây của nó và mang đến những phiên truy cập máy tính từ xa trực tuyến trong quá trình test.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/4a7396d8-5d8b-4dd2-9d8e-0aab54135d0f.png)

***3. Đặc điểm chính*** 

-	Giá rẻ.
-	Mang đến khả năng tương thích với mã nguồn mở.
-	Mang đến những chức năng test bổ xung cho việc test thủ công và test đa trình duyệt.
-	Tích hợp Tight CI (Tight Continuous Integration) - Một công cụ hỗ trợ dịch và cấu hình chạy đa nền tảng.

***4. Những điều bạn cần biết***

Sauce Labs mang đến tất cả mọi thứ như một sản phẩm với đầy đủ những khả năng toàn diện và nâng cao. Nó hiện tại chỉ làm việc với một số mã nguồn mở như Selenium, Appium và JS Unit Testing. Những đặc điểm test thủ công và đa trình duyệt nó mang đến là rất tuyệt vời.

***5. Những liên kết review***

https://saucelabs.com/
https://www.g2crowd.com/products/sauce-labs/reviews
https://www.itcentralstation.com/products/sauce-labs

***6. Giá***

Bắt đầu tại 19$ trên tháng với 6 mức giá khác nhau. Tìm hiểu thêm về giá tại đây https://saucelabs.com/pricing

**7.1.2. HP StormRunner Load**

***1. Tóm tắt***

Là một công cụ phân tích tải SaaS (Software as a service) và phân tích thực thi, có khả năng lập kế hoạch, thực thi và căn chỉnh quá trình test web và test di động. HP StormRunner Load hỗ trợ việc dò tìm những bất thường và phân tích thực thi thời gian thực. Nó cũng hỗ trợ sử dụng những thiết bị di động thực sự trong việc kiểm thử thực thi cũng như ghi lại những bài test.

***2. Giao diện phần mềm***
 
 ![](https://images.viblo.asia/249d45c0-64cb-45d3-b28c-c6bc29c3bf0c.png)
 
***3. Đặc điểm chính***

-	Hỗ trợ những quá trình phát triển Agile.
-	Có khả năng căn chỉnh cao.
-	Có khả năng tích hợp với những công cụ khác của HP.

***4. Những điều bạn cần biết***

HP StormRunner Load là giải pháp có tính căn chỉnh cao cho quá trình test Agile Cloud.

***5. Những liên kết review***

http://www8.hp.com/us/en/software-solutions/stormrunner-load-agile-cloud-testing/
https://www.itcentralstation.com/products/stormrunner-load

***6. Giá***

Bắt đầu tại 0.56$ trên một người dùng ảo một ngày nhưng cũng có phiên bản miễn phí. Tìm hiểu thêm về giá tại đây https://software.microfocus.com/en-us/products/stormrunner-load-agile-cloud-testing/pricing

**7.2. Những công cụ hỗ trợ mạng thiết bị di động (Mobile Device Farm Testing Tools)**

Những “trang trại” thiết bị di động cung cấp một mạng những thiết bị di động cho quá trình test thực thi, lưu những hoạt động của thiết bị và quản lý, đảm bảo giá thành. 

Những “trang trại” di động có thể được chia làm 2 loại công cụ: Pure Play (Đơn giản) và Extension (Mở rộng). Mỗi lại có những ưu điểm và nhược điểm riêng. Điểm khác biệt chính của 2 loại công cụ này được liệt kê bên dưới.

*Các công cụ đơn giản (Pure Play):*

Ưu điểm:
* Điển hình có giá rẻ hơn.
* Tạo ra ít vấn đề trong những quá trình chi trả và thực thi.
* Mang đến sự phát triển nhanh hơn với những công cụ tốt nhất.
* Hỗ trợ tích hợp nhiều công cụ mã nguồn mở

Nhược điểm:
* Yêu cầu những ngôn ngữ và script riêng để đào tạo và bảo trì.

*Các công cụ mở rộng (Extension):*

Ưu điểm:
* Cho phép sử dụng lại những script tự động trước đó
* Sử dụng những ngôn ngữ thân thuộc.
* Mang đến một quan hệ đối tác đơn thông qua nhiều công cụ.

Nhược điểm:
* Đi theo sự phát triển chậm hơn và ít tập trung hơn.
* Cung cấp một hệ sinh thái đóng cái mà giới hạn truy cập đến những công cụ tốt nhất.
* Điển hình sẽ đắt đỏ hơn và thường hướng đến các các tổ chức lớn.

Bên dưới mình sẽ lựa chọn để liệt kê một công cụ thuộc loại đơn giản và một công cụ thuộc loại mở rộng điển hình.

**7.2.1. Amazon Web Service Device Farm**

***1. Tóm tắt*** 

Thuộc kiểu công cụ đơn giản (Pure Play). Device Farm cung cấp một phương thức test tự động không cần đến những thiết bị di động thực sự thông qua hệ thống đám mây AWS cũng như việc truy cập từ xa. AWS Device Farm cũng cho phép tái tạo thủ công những vấn đề, những sự tích hợp với những môi trường phát triển khác nhau và hỗ trợ việc sử dụng những bộ testcase đã được tích hợp sẵn hoặc những framework mã nguồn mở hoặc những bài test thủ công.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/89b25936-d64d-42c0-b0eb-f51ccc2f2aa1.png)

***3. Đặc điểm chính***

-	Giá thấp.
-	Hỗ trợ lựa chọn nhiều thiết bị.
-	Hỗ trợ mã nguồn mở.
-	Thân thiện với những người phát triển.
-	Tích hợp với AWS.

***4. Những điều bạn cần biết***

Amazon phát hành Device Farm như một phần mở rộng của Amazon Web Service vào tháng 7 năm 2015. Sau năm 2015, nó cung cấp thêm hỗ trợ với một Framework tự động hóa UI cho những sự tích hợp Calabash, Appium và Espresso đang tồn tại. Framework này vẫn chưa phổ biến, hầu hết người dùng vẫn đang sử dụng những tích hợp mã nguồn mở.

***5. Những liên kết review***

https://aws.amazon.com/device-farm/
https://www.g2crowd.com/products/aws-device-farm/reviews

***6. Giá***

Bắt đầu tại 0.17$ trên phút với 2 mức giá khác nhau. Tìm hiểu thêm về giá tại đây https://aws.amazon.com/device-farm/pricing/

**7.2.2. HP Mobile Center**

***1. Tóm tắt***

Thuộc kiểu công cụ mở rộng (Extension). HP Mobile Center cung cấp cả những thiết bị thật và những mô phỏng để hỗ trợ cho quá trình test ứng dụng, quản lý trực tuyến và mang đến sự thấu hiểu người dùng. HP Mobile Center cũng hỗ trợ quản lý thiết bị và phân quyền người dùng, ghi lại và chạy lại những tương tác, những bài test thủ công hoặc tự động, và những cài đặt bảo mật.

***2. Giao diện phần mềm***
 
 ![](https://images.viblo.asia/a324b50c-fb7c-4f92-a519-a766a30e35ad.png)
 
***3. Đặc điểm chính***

-	Tích hợp với HP UFT và LeanFT cho việc nâng cấp quá trình test tự động.
-	Sử dụng với những thiết bị thật kết hợp với những tùy chọn sử dụng những thiết bị mô phỏng.

***4. Những điều bạn cần biết***

HP Mobile Center tích hợp với những công cụ HP Testing khác cung cấp một trải nghiệm hoàn hảo, từ đầu đến cuối. Nó hỗ trợ cả những thiết bị thật và mô phỏng, kết hợp với nhiều tùy chọn khác nhau.

***5. Những liên kết review***

http://www8.hp.com/us/en/software-solutions/mobile-testing/index.html
https://www.itcentralstation.com/products/mobile-center

***6. Giá***

Bắt đầu tại 12,000 $ một năm với 2 mức giá khác nhau. Tìm hiểu thêm về giá tại đây https://aws.amazon.com/device-farm/pricing/

**7.3. Những công cụ quản lý dữ liệu test (Test Data Management)**

Những công cụ quản lý dữ liệu test giúp tự động quá trình phát triển dữ liệu test cho những cơ sở dữ liệu. Những cơ sở dữ liệu mã nguồn mở đang gây ra sự thất vọng và nó đang đi đến những thay đổi do sự tăng lên của những kho lưu trữ NoSQL/Big Data. 

Bên dưới mình sẽ liệt kê 2 công cụ quản lý dữ liệu test điển hình.

***7.3.1. Informatica Test Data Management (TDM)***

***1. Tóm tắt*** 

Mang đến khả năng khám phá và phân loại những dữ liệu nhạy cảm, đánh dấu dữ liệu, sinh ra dữ liệu test, kết nối dữ liệu, tăng tốc ứng dụng, sinh ra các báo cáo tương thích. Informatica TDM có thể được phát triển trên đám mây hoặc sử dụng một mô hình đám lây lai.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/daecf57e-9122-473d-a988-6167ab19eacb.png)

***3. Đặc điểm chính***

-	Mang đến một bộ công cụ độc lập mạnh mẽ.
-	Cung cấp sự tích hợp với một bộ những công cụ dữ liệu khác.
-	Bao gồm một mạng những đối tác tích hợp lớn.

***4. Những điều bạn cần biết***

Informatica mang đến giải pháp tốt nhất cho việc bảo mật dữ liệu và quản lý dữ liệu. Giải pháp quản lý dữ liệu test của nó mang đến những khả năng toàn diện về việc sinh ra, lưu trữ và bảo mật dữ liệu.

***5. Những liên kết review***

https://www.informatica.com/products/data-security/test-data-management.html#fbid=XRKOzW02Nvz

**7.3.2. CA Technologies Test Data Manager**

***1. Tóm tắt***

Cung cấp một giải pháp được tự động hoàn toàn và hướng vào việc test, và cũng được xây dựng cho khả năng tái sử dụng. CA Technologies Test Data Manager cung cấp khả năng sinh ra dữ liệu test, che giấu dữ liệu, tập hợp dữ liệu, phân tích toàn diện, cấp phát dữ liệu, lưu trữ dữ liệu và ảo hóa. Nó cũng hướng đến mô hình Agile 

***2. Giao diện phần mềm***

![](https://images.viblo.asia/1798a248-9611-47ce-a6db-3b7427d7fd84.png)

***3. Đặc điểm chính***

-	Mang đến một bộ công cụ được tích hợp mạnh mẽ.
-	Cung cấp một bộ những công cụ phát triển ứng dụng và ảo hóa.

***4. Những điều bạn cần biết***

CA Technologies tập trung vào việc quản lý dữ liệu bởi nó liên quan đến các DevOps và tự động hóa. Giải pháp quản lý dữ liệu test của nó đã được phát triển từ năm 2015.

***5. Những liên kết review***

https://www.ca.com/us/products/ca-test-data-manager.html

**7.4. Những công cụ quản lý môi trường test (Environment Management Software Testing Tools)**

Những công cụ quản lý môi trường test giúp tự động hóa quá trình phát triển phần mềm trong một môi trường test. Những công cụ này đang phát triển nhanh chóng trong những lĩnh vực quan trọng, đặc biệt là DevOps bởi nó giúp đẩy nhanh quá trình build và những yêu cầu tự động hóa đối với các lĩnh vực này. Docker, Puppet và Chef đang được phát triển dựa trên những giải pháp quản lý môi trường mới mẻ, rẻ tiền và tốt hơn trước đây.

Bên dưới mình sẽ liệt kê 2 công cụ quản lý môi trường test điển hình.

**7.4.1. Plutora Test Environment Manager (TEMS)**

***1. Tóm tắt***

Là một công cụ dựa trên SaaS cho phép quản lý cả những môi trường đơ và những môi trường tích hợp trong giai đoạn tiền sản xuất. Plutora TEMS bao gồm một máy cấp phát, một bảng điều khiển duy nhất để hiển thị thông tin môi trường, những quá trình quản lý để chỉ ra và cố định các thông tin môi trường và có thêm hỗ trợ tích hợp các công cụ test hàng đầu. Nó cũng hỗ trợ việc cấu hình và kịch bản hóa môi trường.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/53d313e0-cc26-4ae8-881e-8ce9c9d6a66c.png) 
 
***3. Đặc điểm chính*** 

-	Mang đến khả năng sử dụng trong toàn bộ vòng đời test của sản phẩm.
-	Hỗ trợ dò tìm những phiên bản cấu hình và những thay đổi môi trường.
-	Toàn diện.

***4. Những điều bạn cần biết***

Plutora TEMS là một công cụ test toàn diện mang đến những khả năng biến đổi dọc theo toàn bộ vòng đời test phần mềm, bao gồm kiểm tra và quản trị cũng như những quá trình quản lý có khả năng tùy biến.

***5. Những liên kết review***

http://www.plutora.com/products/test-environment-manager/

**7.4.2. TestPlant eggPlant Manager**

***1. Tóm tắt***

Là một công cụ dựa trên Web hỗ trợ việc tích hợp liên tục và test thông thường. TestPlant eggPlant Manager làm việc với eggPlant Functional và eggCloud để hỗ trợ quá trình test tự động. Nó cho phép định nghĩa những bài chạy test, thực thi kịch bản test, quản lý những hệ thống và những thiết bị và phân tích kết quả test. 

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/3f665d61-473b-4af0-ac19-845131cba103.png)
 
***3. Đặc điểm chính***

Có khả năng kết hợp với môi trường TestPlant eggPlant cho việc mở rộng quá trình test.

***4. Những điều bạn cần biết***

TestPlant eggPlant Manager làm việc tốt đối với việc quản lý môi trường sử dụng những giải pháp TestPlant khác nhau.

***5. Những liên kết review***

https://eggplant.io/eggplant/testing-tools/eggplant-manager/
https://eggplant.io/eggplant/testing-tools/licensing-and-pricing/

-----
Bài viết đã dài nên mình xin phép kết thúc ở đây. Trong phần sau mình sẽ giới thiệu tiếp về những công cụ tự động hỗ trợ test di động (Mobile Testing).
Liên kết tham khảo: https://www.qasymphony.com/blog/100-plus-best-software-testing-tools/