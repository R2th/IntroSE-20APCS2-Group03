**1. Giới thiệu chung**

Ngày nay, chúng ta đang đối mặt với số lượng ngày càng tăng của những cách thức test phần mềm mới và cả những công cụ để tiến hành các bài test đó. Bởi vậy sẽ là rất khó khăn trong việc có được thông tin đầy đủ và chính xác về số lượng hàng trăm công cụ test phần mềm (và vẫn đang tiếp tục tăng lên). 

Bài viết với mục đích liệt kê các công cụ test phần mềm tốt nhất dựa trên việc chia chúng thành các nhóm cụ thể và chỉ ra các điểm tóm tắt chức năng, đặc điểm chính của từng công cụ phần mềm, những điều bạn cần biết về chúng, những liên kết đến các bài phân tích, review chúng đã được thực hiện trước đó và giá của từng phần mềm được đề cập.

Tuy nhiên, trước khi đi sâu hơn vào nội dung bài viết có thể sẽ rất dài để tìm ra đâu là những công cụ phần mềm bạn thực sự đang cần cũng như xem các phân tích chi tiết bên dưới về từng phần mềm cụ thể, bạn có thể tham khảo trước một danh sách phần mềm cụ thể đã được phát triển bởi những chuyên gia QASymphony. Đây là bộ công cụ phần mềm điển hình được tạo ra với mục đích nâng cao tốc độ, hiệu quả và sự tương tác trong vòng đời kiểm tra của phần mềm. Việc này có thể giúp bạn có cái nhìn thực tế hơn và tiết kiệm thời gian hơn.

**2. Phân loại những công cụ test phần mềm**

Bài viết sẽ chia chững công cụ test phần mềm thành 8 loại cộng thêm một mục bao gồm những công cụ phần mềm được dự đoán sẽ đến trong tương lai.

Chi tiết danh mục phân loại các công cụ test phần mềm như bảng bên dưới:

![](https://images.viblo.asia/9fddd74f-6086-40f5-b18c-8ef61d0386d7.png)

Mỗi phần mềm sẽ được liệt kê với những thông tin bao gồm:

* Mô tả tóm tắt về công cụ test.
* Những ảnh chụp màn hình tiêu biểu.
* Những đặc điểm chính.
* Những điều bạn cần biết.
* Những liên kết đến những bài viết khách hàng đã review về phần mềm.
* Giá (nếu có).

**3. Những công cụ test tự động (TEST AUTOMATION TOOLS)**

Sự tự động test là một trong những phần đang phát triển nhất của kỹ thuật test, đặc biệt với sự phát triển của những tùy chọn mã nguồn mở, sự phát triển của DevOps và những mô hình đa kênh như hiện nay.

Chúng ta có thể chia những công cụ test tự động làm 2 loại:

* Test chức năng (Functional Testing)
* Test sự tích hợp hoặc Test API (Integration/API Testing)

**3.1.  Những công cụ test chức năng phần mềm**

![](https://images.viblo.asia/1436bd4d-3801-4b22-a462-507b55224205.png)
 
 Những công cụ test chức năng phần mềm điều khiển những bài test tự động thông qua một lớp giao diện người dùng của ứng dụng. Những công cụ này cũng cung cấp các chức năng record và playback để hỗ trợ những tester không chuyên để hỗ trợ những đánh giá và thực thi tự động. Tuy nhiên, những bài test này đôi khi chậm chạp và không ổn định

Một số công cụ test chức năng có thể kể đến bao gồm: Katalon Studio, HP Unified Functional Testing (UFT),  IBM Rational Functional Tester, Tricentis Tosca Testsuite, Worksoft Certify, TestPlant eggPlant Functional, Ranorex. Bên dưới mình xin phép chỉ liệt kê 3 công cụ đầu tiên của phân mục test chức năng.

**3.1.1. Katalon Studio**

***1. Tóm tắt***

Là một framework tự động được phát triển cho web và di động, được xây dựng trên nền Selenium và Appium. Katalon Studio được đóng gói với hai phiên bản tự do (không mất phí) với các chức năng cơ bản đủ để sử dụng và phiên bản thương mại.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/6284c20d-37cb-4a3a-a77e-5d2366c1bba4.png)

***3. Đặc điểm chính***

Hỗ trợ giao tiếp kịch bản kép dành cho người dùng mới và người dùng đã có kinh nghiệm.
Hỗ trợ tích hợp không giới hạn với qTest và JIRA.
Hỗ trợ Agile team với CI Workflow.

***4. Những điều bạn cần biết***

Katalon Studio là công cụ đa nền tảng (cross-platform) hỗ trợ chuyển những bài test thủ công sang test tự động với yêu cầu tối thiểu về nền tảng chương trình.

***5. Những liên kết review***

https://www.capterra.com/p/157828/Katalon-Studio/#reviews

http://www.softwaretestinghelp.com/katalon-studio-tutorial/

***6. Giá***

Miễn phí

**3.1.2.  HP Unified Functional Testing (UFT)**

***1. Tóm tắt***

Được biết đến trước đây như một công cụ chuyên hỗ trợ test nhanh (QTP - QuickTest Professional), HP UFT hỗ trợ test giao diện người dùng và những dịch vụ back-end tự động. Nó cũng mang đến những thành phần test có khả năng tái sử dụng, giúp chuyển những bài test thủ công sang một bài test được tự động hóa, dựa trên việc dịch trái để thực hiện những phần của chu kỳ phát triển Agile và cho phép test cùng lúc nhiều máy và nhiều thiết bị.

***2. Giao diện phần mềm***

![](https://images.viblo.asia/3b0d0257-7090-44d8-955c-f2ec2b420c5c.png)

***3. Đặc điểm chính***
 
Mạng lưới đối tác hỗ trợ mạnh.
Hỗ trợ đang tăng lên cho những trình duyệt mới và điện thoại mới.
Hỗ trợ tích hợp các công cụ test khác.

***4. Những điều bạn cần biết***

Mặc dù HP vẫn đang dẫn đầu về thị trường các công cụ test tự động được trả tiền, hiện tại nó đang gặp nhiều vấn đề khi tập trung vào những nền tảng mới hơn và đang thụt lùi dẫn so với các đối thủ.

***5. Những liên kết review***

https://www.itcentralstation.com/products/uft-qtp

***6. Giá***

Khởi điểm tại 600 $  trên tháng với 3 mức giá khác nhau. Các bạn có thể tham khảo thêm	tại	liên	kết:

https://software.microfocus.com/en-us/products/unified-functional-automated-testing/pricing

**3.1.3.  IBM Rational Functional Tester**

***1. Tóm tắt***

Là một phần của nền tảng test lớn hơn được gọi là IBM Rational, Rational Functional Tester sử dụng việc test dựa trên điều chỉnh dữ liệu (data-driven testing) để thực hiện việc tự động hóa việc test chức năng và test hồi quy (Regression Testing). Nó hỗ trợ nhiều loại ứng dụng và cho phép thực hiện cả storyboard testing và test kịch bản (script testing).

***2. Giao diện phần mềm***

![](https://images.viblo.asia/624a266f-fd52-479c-96dd-b4c19b2cbf7c.png)

***3. Đặc điểm chính***

Cho phép tích hợp nhiều công cụ test khác.
Hỗ trợ tất cả những nền tảng và framework cơ bản.
Mang đến những công cụ toàn diện, tuy nhiên bị phụ thuộc.

***4. Những điều bạn cần biết***

Như một công ty đi đầu thực sự trên thị trường phần mềm kiểm thử, IBM đang gia tăng sự cạnh tranh với HP và đang tăng số người dùng trong những năm gần đây.

***5. Những liên kết review***

https://www.trustradius.com/reviews/ibm-rational-functional-tester-2015-12-18-08-23-26

https://www.itcentralstation.com/products/ibm-rational-functional-tester

***6. Giá***

Khởi đầu tại 3,400 $ trên tháng với 6 mức giá khác nhau. Các bạn có thể tham khảo thêm tại đây.

https://www-112.ibm.com/software/howtobuy/buyingtools/paexpress/Express?P0=E1&part_number=D53NFLL,D530BLL,D54SHLL,D0BGLLL,D0BGMLL,D0BGNLL&catalogLocale=en_US&Locale=en_US&country=USA&PT=jsp&CC=USA&VP=&TACTICS=&S_TACT=&S_CMP=&brand=SB03

-----
Mình xin kết thúc phần 1 của bài viết tại đây. Bài viết sau mình sẽ giới thiệu và phân tích tiếp những loại công cụ test tiếp theo !