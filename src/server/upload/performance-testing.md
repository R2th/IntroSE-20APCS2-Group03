# I. Tổng quan về kiểm thử hiệu năng
## 1. Kiểm thử hiệu năng là gì?

Có nhiều định nghĩa về kiểm thử hiệu năng, kiểm thử hiệu năng là một loại kiểm thử để đảm bảo các ứng dụng phần mềm sẽ hoạt động tốt dưới khối lượng công việc dự kiến.

Các tính năng và chức năng của một hệ thống phần mềm không phải là mối quan tâm duy nhất. Hiệu năng của một ứng dụng phần mềm như *thời gian phản hồi* (response time), *độ tin cậy* (reliability), *sử dụng tài nguyên* (resource usage) và *khả năng mở rộng* (scalability)  của nó cũng là điều đáng chú ý. 

![](https://images.viblo.asia/063247a5-e390-4bb9-aed7-7eb78eabc1e5.png)

Trong đó trọng tâm của kiểm thử hiệu năng là:  
- Thời gian phản hồi: xác định xem ứng dụng phản hồi nhanh hay chậm 
- Khả năng mở rộng:  Xác định tải người dùng tối đa mà ứng dụng phần mềm có thể xử lý.
- Tính ổn định: Xác định xem ứng dụng có ổn định dưới các tải khác nhau hay không
Mục tiêu của Kiểm thử hiệu năng không phải là để tìm lỗi, nó là hoạt động cần thiết cho việc phát triển những giải pháp tối ưu hóa hiệu năng cho phần mềm. Kiểm thử hiệu năng giúp chúng ta tránh được các tình huống không lường trước khi triển khai ứng dụng trong môi trường thực tế.
## 2. Các loại kiểm thử hiệu năng

![](https://images.viblo.asia/f629869d-929c-4cb4-a04c-5aee50bf2b77.jpg)

*Load testing* : kiểm thử khả năng của ứng dụng để thực hiện theo tải người dùng dự đoán. Mục tiêu là để xác định mức độ tắc nghẽn hiệu suất trước khi ứng dụng phần mềm được phát hành trong môi trường thực tế.

*Stress testing* : Liên quan đến việc thử nghiệm một ứng dụng theo khối lượng công việc quá lớn để xem cách nó xử lý lưu lượng truy cập cao hoặc cách mà nó xử lý dữ liệu. Mục tiêu là để xác định được điểm giới hạn của một ứng dụng.

*Capacity Testing* :  Mục tiêu để xác định có bao nhiêu user  hoặc bao nhiêu giao dịch hoặc số lượt truy cập trên một đơn vị thời gian có thể đáp ứng các SLA (Service Level Agreement- là một thỏa thuận hay hợp đồng được thiết lập giữa khách hàng và nhà cung cấp dịch vụ) hiệu năng của hệ thống

*Endurance testing* : Mục tiêu để đảm bảo phần mềm có thể xử lý tải dự kiến trong một khoảng thời gian dài.

*Spike testing* : Mục tiêu để kiểm tra phản ứng của phần mềm đối với các thay đổi lớn đột ngột trong tải do người dùng tạo.

*Volume testing* :  Mục tiêu là để kiểm tra hiệu suất của ứng dụng phần mềm theo khối lượng cơ sở dữ liệu khác nhau.\

*Scalability testing* : Mục tiêu của thử nghiệm nhằm đến khả năng mở rộng của ứng dụng, để xác định hiệu quả của ứng dụng phần mềm khi "mở rộng" để hỗ trợ tăng tải người dùng, hỗ trợ cho việc lập kế hoạch bổ sung dung lượng cho hệ thống.

*Reliability Testing* : Là một loại kiểm thử để xác minh rằng phần mềm có khả năng thực hiện một hoạt động không có lỗi trong một khoảng thời gian nhất định trong một môi trường được chỉ định. Nó cũng chính là việc kiểm thử độ tin cậy của hệ thống đó.
Ví dụ:  Xác suất mà một máy tính trong một cửa hàng hoạt động và chạy trong tám giờ mà không xảy ra lỗi là 99% => điều này được gọi là độ tin cậy.

## 3. Những vấn đề chung về hiệu năng của một hệ thống
Hầu hết các vấn đề về hiệu năng đều xoay quanh tốc độ, thời gian đáp ứng, thời gian tải và khả năng mở rộng kém. Tốc độ thường là một trong những thuộc tính quan trọng nhất của ứng dụng. Ứng dụng chạy chậm sẽ mất thời gian, giảm đi sự hài lòng của người dùng đối với hệ thống, có thể làm mất đi những người dùng tiềm năng. Kiểm thử hiệu năng được thực hiện để đảm bảo ứng dụng chạy đủ nhanh để thu hút sự chú ý và quan tâm cũng như đem lại sự thỏa mãn, hài lòng của người dùng.

Dưới đây là danh sách một số vấn đề về hiệu năng chung, qua đây ta cũng  nhận thấy tốc độ là một yếu tố phổ biến nhất: 

*Thời gian tải quá dài* : Thời gian tải thường là thời gian ban đầu của một ứng dụng để khởi chạy. Điều này thường nên được giữ ở mức tối thiểu. Mặc dù một số ứng dụng không thể thực hiện tải dưới một phút, nhưng thời gian tải sẽ được giữ trong vài giây nếu là tốt nhất

*Thời gian phản hồi chậm* : Thời gian phản hồi là thời gian cần thiết khi người dùng nhập dữ liệu vào ứng dụng cho đến khi ứng dụng đưa ra phản hồi cho đầu vào đó. Nói chung điều này sẽ rất nhanh. Một lần nữa nếu người dùng phải chờ đợi quá lâu, họ sẽ mất hứng thú.

*Khả năng mở rộng kém* : Một sản phẩm phần mềm có khả năng mở rộng kém thì nó không thể xử lý số lượng người dùng như mong đợi hoặc khi nó không đáp ứng đủ phạm vi người dùng khi đó kiểm tra tải phải được thực hiện để chắc chắn ứng dụng có thể xử lý số lượng người dùng dự kiến.

*Tắc nghẹn cổ chai*: là những vật cản trong hệ thống làm suy giảm hiệu năng toàn bộ hệ thống. Sự tắc nghẽn cổ chai là khi các lỗi mã hóa hoặc các vấn đề phần cứng gây ra sự sụt giảm thông lượng theo tải trọng nhất định. Ngắt cổ chai thường do một phần mã bị lỗi gây ra. Chìa khóa để khắc phục vấn đề tắc nghẽn là tìm phần mã gây ra sự chậm lại và tìm giải pháp khắc phục. Một số tắc nghẽn hiệu suất phổ biến là: CPU,  bộ nhớ, mạng, hệ điều hành, ổ cứng

## 4. Qúa trình kiểm thử hiệu năng
Phương pháp được áp dụng để kiểm tra hiệu năng có thể khác nhau nhưng mục tiêu của những quá trình kiểm thử hiệu năng vẫn giữ nguyên. Nó có thể giúp chứng minh rằng hệ thống đáp ứng một số tiêu chí hiệu năng được xác định trước. Hoặc nó có thể giúp so sánh hiệu năng của hai hay nhiều hệ thống phần mềm. Hoặc nó cũng có thể giúp xác định các thành phần của hệ thống nào đang làm suy giảm hiệu năng của nó.

Quy trình kiểm thử hiệu năng cơ bản:

![](https://images.viblo.asia/bfa99e6f-868a-46fd-ad47-a9a1c5f3eb52.PNG)

*1.Xác định môi trường kiểm thử* :  Chuẩn bị sẵn sàng môi trường thử nghiệm vật lý, môi trường sản xuất và công cụ kiểm tra sẵn có. Nắm rõ về cấu hình phần cứng, phần mềm và mạng được sử dụng trong quá trình kiểm thử trước khi bắt đầu. Nó sẽ giúp tạo ra bộ Testcase kiểm thử hiệu năng hiệu quả hơn đồng thời nó cũng sẽ giúp xác định các khó khăn mà người thử nghiệm có thể gặp phải trong quá trình kiểm thử hiệu năng.

*2.Xác định các tiêu chí chấp nhận hiệu năng chấp nhận được của hệ thống* :  bao gồm các mục tiêu và ràng buộc cho thông lượng, thời gian phản hồi và phân bổ nguồn lực. Nó cũng cần thiết để xác định các tiêu chí thành công của dự án. Tester cần xác định được các tiêu chí và mục tiêu hiệu năng tối thiểu cần đạt của hệ thống bởi vì thông thường các thông số của dự án sẽ không bao gồm nhiều hoặc không có những tiêu chí hiệu năng đủ lớn. Việc sử dụng một ứng dụng tương tự để so sánh là một cách hay để thiết lập tiêu chí hiệu năng.

*3.Lập kế hoạch và thiết kế kiểm thử hiệu năng* : Xác định cách sử dụng có khả năng khác nhau giữa những người dùng cuối và xác định các tình huống chính để kiểm tra tất cả các trường hợp sử dụng có thể. Nó là cần thiết để mô phỏng một loạt các người dùng cuối, kế hoạch dữ liệu thử nghiệm hiệu suất và phác thảo những số liệu sẽ được thu thập.

*4.Cài đặt môi trường kiểm thử*  : Cài đặt môi trường, công cụ, tài nguyên cần thiết trước khi thực hiện test

*5.Triển khai test design* :  Tạo testcases kiểm thử hiệu năng theo test design

*6.Thực hiện test* : Thực thi và theo dõi kết quả thực thi

*7.Phân tích, điều chỉnh và kiểm tra lại* : Hợp nhất, phân tích và chia sẻ kết quả kiểm tra. Sau đó, tinh chỉnh và kiểm tra lại để xem có cải thiện hay giảm hiệu suất hay không. Vì các cải tiến thường tăng lên nhỏ hơn với mỗi lần kiểm tra lại, dừng lại khi bị tắc nghẽn do CPU gây ra. Sau đó, bạn có thể có tùy chọn xem xét tăng tốc độ xử lý của CPU hay không.

## 5. Công cụ kiểm thử hiệu năng
Việc lựa chọn công cụ kiểm thử hiệu năng dựa trên nhiều yếu tố như: chi phí, phương thức hỗ trợ, trình duyệt, ngôn ngữ phát triển phần mềm, phần cứng,...
Dưới đây là một số công cụ phổ biển phục vụ cho việc kiểm thử hiệu năng:
*Jmeter* : Là phần mềm mã nguôn mở sử dụng 100% ngôn ngữ Java, được thiết kế để kiểm thử tải (load testing) web and app của máy chủ. 
- Link download trên windows: http://jmeter.apache.org/download_jmeter.cgi
- Link download trên ubutu: http://jmeter.apache.org/download_jmeter.cgi

*LoadRunner* : là công cụ kiểm thử hiệu năng cho phép tìm ra những lỗi về khả năng thực thi bằng việc phát hiện nguyên nhân, chỗ làm cho phần mềm chạy chậm hoặc không đúng yêu cầu. Đây là công cụ mạnh với giải pháp kiểm tra tải, phát hiện và đưa ra giải pháp cải tiến. Ứng dụng LoadRunner sẽ giúp giảm thời gian viết test script đến 80%, đó là nhờ nó cung cấp chức năng tự động phát sinh script mô tả lại các tình huống muốn kiểm tra.
- Link download: https://software.microfocus.com/en-us/products/loadrunner-load-testing/overview?jumpid=va_uwxy6ce9tr 

*LoadView-Testing* : là công cụ kiểm thử hiệu năng cho phép thiết lập đường cơ sở thời gian phản hồi theo số lượng người dùng tải cụ thể, xác định điểm tắc nghẽn hiệu suất khi số lượng người dùng đồng thời tăng lên, xác định được giới hạn trên của các hệ thống hiện tại để lập kế hoạch cho hiệu năng trong tương lai, tăng hiệu năng lên mức cao trên môi trường test để thấy được cách xử lý dữ liệu và điểm giới hạn hiệu năng của hệ thống.
- Link download: https://www.loadview-testing.com/

*LoadStorm*  : là công cụ có khả năng chịu tải rất tốt, có thể kiểm tra hiệu năng của app thông qua lượng traffic và user. Điểm đặc biệt ở công cụ này là nó có thể thiết lập hàng trăm nghìn, thậm chí hàng triệu user để khai thác lỗ hổng trong ứng dụng. Mặt khác, tester có thể dễ dàng điều chỉnh kịch bản test khi sử dụng công cụ này. Sau khi tiến hành pentest, bạn sẽ nhìn thấy một bản báo cáo chi tiết.
- link download: https://pro.loadstorm.com/

# II. Sử dụng LoadRunner để kiểm thử hiệu năng
## 1. Thành phần của LoadRunner

   LoadRunner chứa các thành phần sau đây:
   
–	Virtual User Generator: Tự động tạo ra VuGen script để lưu lại các thao tác người dùng tương tác lên phần mềm. VuGen script này còn được xem là hoạt động của một người ảo mà LoadRunner giả lập.

–	Controller: Tổ chức, điều chỉnh, quản lý và giám sát hoạt động kiểm tra tải. Thành phần này có chức năng tạo ra những tình huống (scenario) kiểm tra.

–	Load Generator: Cho phép giả lập hàng ngàn người dùng, hoạt động của từng người sẽ được thực hiện theo VuGen script. Kết quả thực hiện sẽ được thông báo cho Controller.

–	Analysis: Cung cấp việc xem, phân tích và so sánh các kết quả kiểm tra hiệu năng phần mềm.

–	Launcher: Nơi tập trung tất cả các thành phần của LoadRunner cho người dùng.
##  2. Thuật ngữ dùng trong LoadRunner
–	Scenario: Là một file định nghĩa các sự kiện xảy ra trong mỗi lần kiểm tra dựa trên hiệu suất yêu cầu.

–	Vuser: Trong Scenario, LoadRunner thay thế người sử dụng bằng người dùng ảo hay còn gọi là Vuser. Vuser mô phỏng hành động của con người làm việc với ứng dụng của chúng ta. Một Scenario có thể chứa hàng chục, hàng trăm và thậm chí hàng ngàn Vuser.

–	Vuser Script: Các hành động mà Vuser thực thi trong Scenario được mô tả trong Vuser Script.

–	Transactions: Chúng ta định nghĩa một transactions để đo lường hiệu quả hoạt động của Server . Một Transaction đại diện cho người sử dụng dưới vai trò End-User thực hiện theo quy trình nghiệp vụ mà chúng ta muốn đo lường.
## 3. Các bước Load Test
B1: Plan Load Test 

Thiết kế test case với các bước thực hiện rõ ràng, và đề ra các thông số cần đo lường cụ thể.

B2: Create Vuser Scripts 

Dùng công cụ LoadRunner chúng ta có thể lưu lại các thao tác người dùng tương tác với hệ thống dưới dạng script.

B3: Define Scenario

Thiết kế scenario, nhằm giả lập môi trường mà phần mềm hoạt động với hiệu năng giống trong thực tế.

B4: Run Screnario

 Chạy, quản lý và giám sát việc thực hiện performance test.
 
B5: Analyzing the Results

Phân tích kết quả dựa trên thống kê mà công cụ LoadRunner cung cấp. Nếu kết quả thực tế chưa đáp ứng được yêu cầu thì phần mềm được kiểm tra cần được điều chỉnh.

## 4. Ví dụ
Tạo một người dùng ảo ghi lại các sự kiện, hoạt động bởi người dùng thật trên trang web: http://facebook.com.vn  

1. Ghi lại sự kiện đăng nhập của một người dùng vào facebook

 ![](https://images.viblo.asia/37ed64ac-b5c5-4bcd-b5a2-14bfb61ce255.png)

2. Khi Vuser Script dừng chạy, chúng ta có thể xem tổng quan việc chạy lại trong Replay Summary.

![](https://images.viblo.asia/b2796456-c3ce-4445-b0f3-e6d38f9d7e73.png)

Thời gian chạy: 11/08/2017 10:34:34 CH

   Thời gian kết thúc: 11/08/2017 10:35:01 CH
   
   4. Kết quả chi tiết:
   
 ![](https://images.viblo.asia/78ac7f77-297a-4f17-a6a5-9c9bb4289971.png)

Hy vọng bài viết sẽ giúp các bạn hiểu hơn về kiểm thử hiệu năng và có thể lựa chọn được công cụ kiểm thử hiển năng phù hợp với hệ thống 

*Tài liệu tham khảo*

https://www.guru99.com/performance-testing.html