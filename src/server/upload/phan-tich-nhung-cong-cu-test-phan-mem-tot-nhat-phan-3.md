Trong [phần 2](https://viblo.asia/p/phan-tich-nhung-cong-cu-test-phan-mem-tot-nhat-phan-2-RQqKLYEpZ7z), mình đã giới thiệu thêm về những công cụ test tự động và các công cụ test thực thi. Phần này mình sẽ tiếp tục phân tích vai trò và liệt kê những công cụ quản lý quá trình test (Test Management), các công cụ test ity (ity được lấy từ những chữ cuối cùng trong các cụm từ liên quan đến các nhóm chức năng bao gồm security (tính an toàn), usability (tính khả dụng) và compatibility (tính tương thích)) và các công cụ kiểm tra hạ tầng và setup quá trình test (Test Setup & Infrastructure) theo như đã phân loại trước đó.

![](https://images.viblo.asia/9fddd74f-6086-40f5-b18c-8ef61d0386d7.png)

**5. Những công cụ quản lý test (Test Management Tools)**

![](https://images.viblo.asia/a82cd91e-01f0-49fd-802c-b315802c69c8.png)

Quá trình quản lý Test là một quá trình phức tạp và hiện đang biến đổi dần dưới sự phát triển mạnh mẽ của Agile, DevOps và Test bị động (Test Driven). Hầu hết những công cụ quản lý test hoặc gắn với phương thức phát triển Agile, hoặc gắn với phương thức phát triển thác nước (Waterfall).

Để chi tiết mình sẽ lựa chọn 2 công cụ quản lý test điển hình để phân tích bên dưới.

**5.1. qTest Manager (được phát triển bởi QASymphony)**

***1. Tóm tắt***

Cung cấp khả năng tìm kiếm, quản lý, tổ chức, báo cáo cho việc test phần mềm và quản lý. qTest Manager khởi tạo và quản lý những yêu cầu, tổ chức và quản lý các testcase, thực hiện các bài test, dò tìm các lỗi và các báo cáo trong cơ sở dữ liệu test. Nó cũng hỗ trợ khả năng tích hợp với các công cụ tự động hóa như  JIRA, Rally và VersionOne.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/4784f302-76aa-471d-978b-c1c415eaf6b9.png)

***3. Đặc điểm chính***

* Giao diện người dùng thân thiện.
* Cho phép tích hợp nhiều công cụ tự động hóa như JIRA, Jenkins, Rally. 
* Hỗ trợ đồng thời việc test thủ công, test khám phá và test tự động.
* Dẫn đầu thị trường những công cụ test phần mềm xây dựng cho những team Agile.

***4. Những điều bạn cần biết***

qTest Manager dẫn đầu thị trường về những công cụ test quản lý và là công cụ duy nhất mang đến sự kết hợp đồng thời của test thủ công, test khám phá và test tự động. Nó cũng mang đến cái nhìn tổng quan của những nỗ lực test, những báo cáo test và cung cấp việc hỗ trợ tích hợp những công cụ tự động hàng đầu và JIRA.

***5. Những liên kết review***

https://www.qasymphony.com/software-testing-tools/qtest-manager/test-case-management/
https://www.g2crowd.com/products/qtest/reviews

***6. Giá***

Không có giá được liệt kê trên website nhưng có thể yêu cầu tại đây: https://live-qasymphony.pantheon.io/request-qtest-pricing/

**5.2. SmartBear QAComplete**

***1. Tóm tắt***

Mang đến tầm nhìn cho quá trinh test với khả năng quản lý, tổ chức và báo cáo các bài test. SmartBear QAComplete mang đến những mẫu test có sẵn hoặc những tùy chọn tùy biến workflow, ghi lại log lỗi, dò tìm những bài test và tái sử dụng những bài test trong chu kỳ test. Nó cũng tích hợp với những công cụ như Jira, Selenium và SoapUI.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/6007e3c1-0d54-49ea-bd9c-a4146d3f321c.png)

***3. Đặc điểm chính***

Có khả năng tùy biến cao.
Cho phép tích hợp nhiều công cụ khác nhau.

***4. Những điều bạn cần biết***

SmartBear QAComplete cung cấp một vị trí duy nhất để quản lý quá trình test. Thông qua tùy biến, nó có thể làm việc với cả quá trình phát triển Agile và Waterfall.

***5. Những liên kết review***

https://smartbear.com/product/qacomplete/overview/

***6. Giá***

Giá bắt đầu tại $599 với 2 sự lựa chọn. Tham khảo thêm tại đây: https://smartbear.com/product/qacomplete/pricing/

**5.3. Những công cụ quản lý test mã nguồn mở**

Chúng ta có một vài tùy chọn mã nguồn mở cho những công cụ quản lý test. Nếu bạn quyết định đi theo con đường mã nguồn mở, bạn có thể cân nhắc sử dụng những công cụ bên dưới:
* Trantula
* Testopia
* QABook
* TestLink
* XQual
* TestMaster
* Testitool

**6. Những công cụ test ity**

Như đã nói ở trên, tên ity được lấy từ những chữ cái cuối cùng của những từ đại diện cho các nhóm công cụ test gồm security (tính an toàn), usability (tính khả dụng), compatibility (tính tương thích). Nhìn chung những công cụ -ity testing thường đắt đỏ và có mục đích sử dụng riêng biệt. Những công cụ này đang được phát triển và tiến hóa thêm để có thể dễ dàng sử dụng hơn và mang đến những dịch vụ thiết thực hơn. 

Chúng ta có thể chia những công cụ -ity testing thành 3 nhóm:
* Security
* Usability
* Compatibility

**6.1. Những công cụ test tính an toàn (Security Testing Tools)**

Những công cụ test tính an toàn nhìn chung được xây dựng xung quanh một nền tảng hoặc một công nghệ nhất định. Có rất ít mã nguồn mở hỗ trợ cho việc test tính an toàn này, bởi vậy, chúng thường là những công cụ đắt đỏ, chuyên biệt và bao gồm nhiều dịch vụ nặng chạy bên trong.

Bên dưới mình sẽ liệt kê và phân tích 2 công cụ test an toàn điển hình.

**6.1.1. HP Fortify On Demand**

***1. Tóm tắt***

Mang đến sự an toàn cho ứng dụng như một dịch vụ với một nền tảng duy nhất để theo dõi và quản lý những nguy cơ an ninh, phát triển những kịch bản test an ninh và sau đó chạy những dự án để sửa chữa, bổ xung nếu cần. Fortify on Demand chạy những bài test được tự động hóa với một sự kiểm tra đầy đủ của những kết quả test và bao gồm những hỗ trợ cho không gian SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing) và IAST (Interactive Application Security Testing) cũng như những hỗ trợ giới hạn cho MAST (Managed Application Security Testing). 

***2. Giao diện phần mềm***

![](https://images.viblo.asia/0b2e755d-9e51-45b1-bfe0-2f20fb7e69de.png)

***3. Đặc điểm chính***

* Hỗ trợ mạnh mẽ và đẩy đủ với nhiều ngôn ngữ khác nhau.
* Bao gồm hỗ trợ RASP (Runtime Application Self-Protection Security).

***4. Những điều bạn cần biết***

HP có thể coi như người chơi lớn nhất trong không gian kiểm thử an toàn, với những công cụ cho SAST, DAST, IAST và MAST.

***5. Những liên kết review***

https://software.microfocus.com/en-us/products/application-security-testing/overview
https://www.itcentralstation.com/products/fortify-on-demand

***6. Giá***

Giá bắt đầu tại $2000 trên một ứng dụng với 4 mức giá khác nhau. Có thể tham khảo thêm tại đây: https://software.microfocus.com/en-us/products/application-security-testing/overview

**6.1.2. Veracode**

***1. Tóm tắt***

Veracode mang đến những công cụ cho SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing), IAST (Interactive Application Security Testing) và MAST  (Managed Application Security Testing). Những phân tích nhị phân tĩnh của nó hướng đến Agile trong khi những công cụ DAST và IAST của nó hỗ trợ thực sự cho việc quản lý máy chủ đám mây (cloud hosting) và vành đai web (web perimeter).

***2. Giao diện phần mềm***

![](https://images.viblo.asia/110af9ae-cb0b-4f14-bedd-8f986f0afbe1.png)

***3. Đặc điểm chính***

* Có thể coi như một người chơi mạnh mẽ nhất cho những kỹ thuật đám mây và di động.
* Tích hợp với những công cụ hỗ trợ dò tìm bug và QA, như TFS (Team Foundation Server). 
* Bao gồm việc hỗ trợ RASP (Runtime Application Self-Protection Security). 

***4. Những điều bạn cần biết***

Varacode có thể coi là người chơi lớn trong không gian test an toàn với những công cụ test nó sở hữu và những công cụ SDLC (Software Development Life Cycle).

***5. Những liên kết review***

https://www.veracode.com/

**6.2. Những công cụ test tính khả dụng (Usability Testing Tools)**

Những công cụ test tính khả dụng hướng đến sự phát triển dễ dàng bên trong những ứng dụng. Giá trị của những công cụ test tính khả dụng nhìn chung nằm ở sự tinh thông hoặc tính cộng đồng mà chúng mang lại.

Bên dưới mình sẽ liệt kê 2 công cụ test tính khả dụng điển hình.

**6.2.1. UserTesting**

***1. Tóm tắt***

Sáng tạo những video sử dụng một website hoặc ứng dụng và mở một báo cáo cái mà sẽ chỉ ra những vấn đề và trả lời bất kỳ cuộc khảo sát người dùng nào. UserTesting cũng sẽ giúp phân loại những đối tượng đích phù hợp với công ty của bạn.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/9b1cc1b2-30fd-463b-8e8f-a303bb01fcdb.png)

***3. Đặc điểm chính***

* Giá rẻ.
* Dễ dàng sử dụng.
* Bản quyền mềm dẻo (trên giá video)
* Có mạng lưới lớn của những tester.

***4. Những điều bạn cần biết***

UserTesting tập trung vào test tính hữu dụng cho website hoặc ứng dụng điện thoại. Nó có mạng lưới lớn của người dùng và các chuyên gia, bao gồm cả những chuyên gia UX. Mặc dù sản phẩm nhìn chung còn yếu, nó đang được nâng cấp dần.

***5. Những liên kết review***

https://www.usertesting.com/

***6. Giá***

Giá bắt đầu tại $99 cho một video với 2 mức giá khác nhau. Có thể tham khảo thêm giá tại đây: https://www.usertesting.com/plans

**6.2.2. Validately**

***1. Tóm tắt***

Cho phép bạn test các trang web trực tuyến, HTML mô phỏng, ảnh hoặc những prototype và phân tích kết quả theo những báo cáo và những video cụ thể đánh dấu tại những vị trí có vấn đề. Validately hỗ trợ việc dễ dàng test trên những khách hàng của bạn hoặc tìm những tester từ mạng lưới của nó và cho phép bạn nói chuyện với những tester này trực tiếp.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/901184a3-9978-4b3b-a3f3-c0b4cb1b6053.png)

***3. Đặc điểm chính***

* Giá rẻ.
* Dễ dàng sử dụng.
* Mang đến khả năng lấy phản hồi trước khi tiến hành code, giúp tiết kiệm công sức và giảm giá thành sản phẩm.

***4. Những điều bạn cần biết***

Validately tập trung vào việc lấy phản hồi người dùng trước khi quá trình code được thực hiện. Nó được thiết kế cho những người dùng tương tác và lấy phản hồi người dùng đối với những ứng dụng desktop, di động, website.

***5. Những liên kết review***

https://validately.com/

***6. Giá***

Giá bắt đầu tại $79 trên tháng với 3 mức giá khác nhau. Có thể tham khảo thêm giá tại đây: https://validately.com/pricing

**6.3. Những công cụ test tính tương thích (Compatible Testing Tools)**

Quá trình test tương thích mang đến giá trị cho việc test di động và test web. Việc test tương thích có thể dễ dàng được thực hiện thủ công, tuy nhiên sẽ tốn nhiều thời gian và đắt đỏ, do đó việc tự động hóa quá trình này được đặt ra và đã mang đến hiệu quả rất cao. 

Bên dưới mình sẽ liệt kê 2 công cụ test tương thích điển hình.

**6.3.1. Browsera**

***1. Tóm tắt***

Cung cấp báo cáo chi tiết cho những vấn đề layout thông qua những ảnh chụp màn hình, chỉ ra những lỗi javascript và việc test động những trang web. Browsera cũng có thể test những trang web có yêu cầu đăng nhập và test toàn bộ website một lần, do đó không cần đi test từng trang bên trong website.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/7eaa71b7-e5e7-46ed-b4bc-c2707abf7303.png)

***3. Đặc điểm chính***

* Chỉ ra những khác biệt về layout của trang web.
* Loại bỏ yêu cầu cần test từng trang trong một website.
* Hỗ trợ việc test những trang web động và test javascript.

***4. Những điều bạn cần biết***

Browsera có cả phiên bản free và phiên bản tính phí. Nó có một đặc điểm độc nhất là có khả năng chỉ ra những khác biệt layout trên những trình duyệt khác nhau và chỉ ra những lỗi javascript.

***5. Những liên kết review***

http://www.browsera.com/

***6. Giá***

Có phiên bản free nhưng giá bắt đầu tại $39 trên tháng với 3 mức giá khác nhau. Có thể tham khảo thêm giá tại đây: https://www.browsera.com/plans

**6.3.2. Browserling**

***1. Tóm tắt***

Cung cấp những mục tương tác trực tuyến cho quá trình test trên các trình duyệt khác nhau với việc test tính đáp ứng và những kênh SSH cho quá trình test local. Browserling cũng mang đến những ảnh chụp màn hình, hỗ trợ chia sẻ màn hình, hỗ trợ truy tìm bug và những video. Nó chỉ phục vụ cho việc test web.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/ed7ede5b-94ff-4627-aa62-a32bae1d9add.png)

***3. Đặc điểm chính***

* Giá thấp.
* Hỗ trợ dò tìm các lỗi javascript.
* Hỗ trợ việc test những trang web động.

***4. Những điều bạn cần biết***

Browserling được thành lập năm 2011, tập trung vào việc test website và không hỗ trợ test tự động.

***5. Những liên kết review***

https://www.browserling.com/

***6. Giá***

Có phiên bản free nhưng giá bắt đầu tại $19 trên tháng với 2 mức giá khác nhau. Có thể tham khảo thêm giá tại đây: https://www.browserling.com/#pricing

-----
Mình xin phép kết thúc phần 3 ở đây, trong phần sau mình sẽ tiếp tục với 2 công cụ test tiếp theo đã phân loại là những công cụ test quá trình setup test và hạ tầng test (Test Setup & Infrastructure Testing Tools) và những công cụ test cho ứng dụng di động (Mobile Testing)

Bài viết dựa trên link tham khảo: https://www.qasymphony.com/blog/100-plus-best-software-testing-tools/ và có sự chắt lọc và tìm hiểu thêm về các chi tiết cụ thể được đề cập bên trong bài viết.