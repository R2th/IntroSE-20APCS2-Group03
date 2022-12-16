## 1. Performance Testing là gì?
![](https://images.viblo.asia/74db4efb-0e45-4936-922a-3b0c56477ac5.jpg)<br>
*Performance Testing*


Performance Testing- Kiểm thử hiệu năng là kiểm tra về tốc độ, thời gian phản hồi, độ tin cậy, sử dụng tài nguyên, khả năng mở rộng của một chương trình phần mềm. Mục đích của Kiểm tra hiệu năng không phải là tìm ra các lỗi chức năng mà là để loại bỏ các tắc nghẽn về hiệu suất trong phần mềm hoặc thiết bị.

Trọng tâm của Kiểm thử hiệu năng là kiểm tra các vấn đề của chương trình phần mềm như:
* Tốc độ - Xác định xem ứng dụng có phản hồi nhanh không.
* Khả năng mở rộng - Xác định tải người dùng tối đa mà ứng dụng phần mềm có thể xử lý.
* Tính ổn định - Xác định xem ứng dụng có ổn định dưới các mức tải khác nhau không.
## 2. Tại sao cần sử dụng Performance Testing?
![](https://images.viblo.asia/24e79258-5a47-4e7b-a1a4-b5c397f6eafc.jpg)<br>
*Why do Performance Testing?*

* Các tính năng và chức năng được hỗ trợ bởi một hệ thống phần mềm không phải là mối quan tâm duy nhất. Hiệu năng của một ứng dụng phần mềm như thời gian phản hồi, độ tin cậy, sử dụng tài nguyên và khả năng mở rộng của nó rất quan trọng. Mục tiêu của kiểm thử hiệu năng không phải là tìm lỗi mà là loại bỏ các tắc nghẽn về hiệu suất hoạt động.

* Kiểm thử hiệu năng được thực hiện để cung cấp cho các bên liên quan thông tin ứng dụng về tốc độ, tính ổn định và khả năng mở rộng. Quan trọng hơn, kiểm thử hiệu năng phát hiện ra những gì cần được cải thiện trước khi sản phẩm được tung ra thị trường. Nếu không có kiểm thử hiệu năng, phần mềm có thể gặp phải các vấn đề như: chạy chậm trong khi một số lượng người dùng nhất định sử dụng đồng thời, sự không nhất quán trên các hệ điều hành khác nhau và khả năng sử dụng kém.

* Kiểm thử hiệu năng sẽ xác định xem phần mềm của họ có đáp ứng các yêu cầu về tốc độ, khả năng mở rộng và độ ổn định theo dự kiến hay không. Các ứng dụng được đưa ra thị trường với số liệu hiệu suất kém có khả năng bị mang tiếng xấu và không đạt được mục tiêu doanh số dự kiến.

* Ngoài ra, các ứng dụng quan trọng như chương trình chạy không gian hoặc thiết bị y tế cứu sinh phải được kiểm tra hiệu năng để đảm bảo chúng chạy trong một thời gian dài mà không bị sai lệch.

Theo Dunn & Bradstreet, 59% các công ty trong danh sách Fortune 500 trải qua khoảng 1,6 giờ ngừng hoạt động mỗi tuần. Xem xét công ty Fortune 500 trung bình có tối thiểu 10.000 nhân viên đang trả 56 đô la mỗi giờ, phần lao động của chi phí thời gian chết cho một tổ chức như vậy sẽ là 896.000 đô la mỗi tuần, chuyển thành hơn 46 triệu đô la mỗi năm.

Chỉ có thời gian ngừng hoạt động 5 phút của Google.com (19-ngày 13 tháng 8) được ước tính sẽ tiêu tốn của người khổng lồ tìm kiếm lên tới 545.000 đô la.

Người ta ước tính rằng các công ty bị mất doanh số trị giá 1100 đô la mỗi giây do sự cố ngừng dịch vụ web gần đây của Amazon.

Do đó, kiểm thử hiệu năng là quan trọng.
## 3. Các loại Performance Testing
![](https://images.viblo.asia/7cfd14ae-9288-4256-afa3-a6b16df7f4a9.png)
<br>
*Types of Performance Testing*

* **Load testing:** tìm ngưỡng capacity của server để xác định ngưỡng có thể chịu tải được của hệ thống.
* **Stress testing**: liên quan đến việc kiểm tra một ứng dụng trong một khối lượng công việc cực lớn để xem cách nó xử lý lưu lượng truy cập cao hoặc xử lý dữ liệu như thế nào. Mục tiêu là xác định "breaking point" của một ứng dụng ( làm cho hệ thống chết không phản hồi được nữa)
* **Endurance testing**: được thực hiện để đảm bảo phần mềm có thể xử lý tải dự kiến trong một khoảng thời gian dài.
* **Spike testing**: kiểm tra phản ứng của phần mềm đối với các đột biến do có 1 lượng tải lờn từ người dùng trong một khiangr thời gian ngắn.
* **Volume testing**: Kiểm tra khả năng chịu tải của phần mềm với một lượng dữ liệu nhất định( thường là ngưỡng do spec mong muốn từ đầu).
* **Scalability testing**: Mục tiêu của kiểm tra khả năng mở rộng là xác định tính hiệu quả của ứng dụng phần mềm trong việc "nhân rộng" để hỗ trợ tăng tải người dùng. Nó giúp lập kế hoạch bổ sung khả năng đáp ứng của hệ thông với nhu cầu tăng dần.
## 4. Các tiêu chí thực hiện Performance Testing
* Trả lời câu hỏi hệ thống có thể xử lý các mức chịu tải trong khi vẫn giữ được thời gian hồi đáp ở mức chấp nhận được hay không?
* Chỉ ra được vào thời điểm nào thì hệ thống bắt đầu hư hỏng và những thành phần nào là nguyên nhân của sự suy thoái đó.
* Hệ thống hiện tại có thể nâng cấp được k? để phù hợp với sự phát triển trong tương lai?
* Khi mà hệ thống gặp lỗi thì nó sẽ gây ra những ảnh hưởng gì lên mục đích kinh doanh của doanh nghiệp?
* Đưa ra tiêu chí cho rằng hiệu năng của hệ thống là tốt.
## 5. Các vấn đề về hiệu năng thường gặp
Hầu hết các vấn đề về hiệu năng đều xoay quanh tốc độ, thời gian phản hồi, thời gian tải và khả năng mở rộng kém. Tốc độ thường là một trong những thuộc tính quan trọng nhất của ứng dụng. Một ứng dụng chạy chậm sẽ mất đi người dùng tiềm năng. Kiểm thử hiệu năng được thực hiện để đảm bảo ứng dụng chạy đủ nhanh để thu hút sự chú ý và quan tâm của người dùng. Vì vậy, tốc độ là yếu tố phổ biến trong nhiều vấn đề sau:

* **Thời gian tải lâu**: Thời gian tải thường là thời gian ban đầu để ứng dụng khởi động. Điều này thường nên được giữ ở mức tối thiểu. Mặc dù một số ứng dụng không thể tải xuống dưới một phút, thời gian tải nên được giữ dưới một vài giây nếu có thể.
* **Thời gian phản hồi kém**: Thời gian phản hồi là thời gian cần thiết khi người dùng nhập dữ liệu vào ứng dụng cho đến khi ứng dụng đưa ra phản hồi cho đầu vào đó. Nói chung, điều này sẽ rất nhanh chóng. Một lần nữa nếu người dùng phải chờ quá lâu, họ sẽ mất hứng thú.
* **Khả năng mở rộng kém**: Một sản phẩm phần mềm có khả năng mở rộng kém khi không thể xử lý số lượng người dùng dự kiến hoặc khi không phù hợp với phạm vi người dùng đủ rộng. Kiểm thử hiệu năng phải được thực hiện để chắc chắn ứng dụng có thể xử lý số lượng người dùng dự kiến.
* **Tắc nghẽn**: Tắc nghẽn là chướng ngại vật trong một hệ thống làm giảm hiệu suất toàn bộ hệ thống. Tắc nghẽn là khi lỗi mã hóa hoặc sự cố phần cứng gây ra giảm thông lượng dưới một số tải nhất định. Tắc nghẽn thường được gây ra bởi một phần mã bị lỗi. Chìa khóa để khắc phục sự cố tắc nghẽn là tìm phần mã đang gây ra sự chậm chạp và cố gắng khắc phục nó ở đó. Việc tắc nghẽn thường được khắc phục bằng cách sửa các quy trình chạy kém hoặc thêm phần cứng bổ sung. Một số tắc nghẽn hiệu suất phổ biến là:
    * Sử dụng CPU
    * Sử dụng bộ nhớ
    * Sử dụng mạng
    * Hạn chế của hệ điều hành
    * Sử dụng ổ cứng
## 6. Quy trình  kiểm thử Performance 
Phương pháp được áp dụng để kiểm thử hiệu năng có thể rất khác nhau nhưng mục tiêu cho kiểm thử hiệu năng vẫn giống nhau. Nó có thể giúp chứng minh rằng hệ thống phần mềm của bạn đáp ứng một số tiêu chí hiệu suất được xác định trước. Hoặc nó có thể giúp so sánh hiệu suất của hai hệ thống phần mềm. Nó cũng có thể giúp xác định các phần của hệ thống phần mềm của bạn làm giảm hiệu suất của nó.

Dưới đây là một quy trình chung về cách thực hiện kiểm thử hiệu năng:

![](https://images.viblo.asia/08117093-b938-4f86-bd95-5945259cdb15.jpg)
*Performance Testing Process*

* **Identify the testing environment**- Xác định môi trường kiểm thử:<br>
 Biết môi trường thử nghiệm vật lý, môi trường trên app sản phẩm đang chạy  thật và những công cụ kiểm thử nào có sẵn. Hiểu chi tiết về cấu hình phần cứng, phần mềm và mạng được sử dụng trong quá trình kiểm thử  trước khi bắt đầu quá trình kiểm thử. Nó sẽ giúp người kiểm thử kiểm thử được hiệu quả hơn. Nó cũng sẽ giúp xác định những thách thức có thể có mà người kiểm thử có thể gặp phải trong quá trình kiểm thử hiệu năng.
* **Identify the performance acceptance criteria**- Xác định các tiêu chí chấp nhận hiệu suất:<br>
Điều này bao gồm các mục tiêu và ràng buộc cho thông lượng, thời gian phản hồi và phân bổ tài nguyên. Cũng cần xác định các tiêu chí thành công của dự án bên ngoài các mục tiêu và ràng buộc này. Người kiểm thử nên được trao quyền để thiết lập các tiêu chí và mục tiêu hiệu suất vì thường các thông số kỹ thuật của dự án sẽ không bao gồm nhiều tiêu chuẩn hiệu suất đủ rộng. Đôi khi có thể không có gì cả. Khi có thể tìm thấy một ứng dụng tương tự để so sánh là một cách tốt để đặt mục tiêu hiệu suất.
* **Plan and Design Tests**: <br>
Xác định cách sử dụng có thể thay đổi giữa những người dùng cuối và xác định các kịch bản chính để kiểm tra cho tất cả các trường hợp sử dụng có thể. Cần phải mô phỏng nhiều người dùng cuối, lập kế hoạch và dữ liệu kiểm thử hiệu năng và phác thảo những số liệu nào sẽ được thu thập.
* **Configure the Test Environment**- Thiết lập cấu hình môi trường kiểm tra:<br>Chuẩn bị môi trường kiểm tra trước khi thực hiện. Ngoài ra, sắp xếp các công cụ và các tài nguyên khác theo một logic nhất định để thuận tiện trong quá trình kiểm thử.
* **Implement the Test Design**- Thực hiện thiết kế kiểm thử:<br> Tạo các thử nghiệm hiệu năng theo plan và design được tạo trước đó. 
* **Execute the Test**- Chạy thử nghiệm - Thực hiện và giám sát các thử nghiệm.
* **Analyze Tune and Retetest**- Phân tích, điều chỉnh và kiểm tra lại:<br> Hợp nhất, phân tích và chia sẻ kết quả kiểm tra. Sau đó tinh chỉnh và kiểm tra lại để xem liệu có sự cải thiện hay giảm hiệu suất. Vì các cải tiến thường phát triển nhỏ hơn với mỗi lần kiểm tra lại, nên dừng khi tắc nghẽn do CPU gây ra. Sau đó, bạn có thể có tùy chọn xem xét tăng hiệu năng của CPU.
## 7. Công cụ kiểm thử Performance 
Có rất nhiều công cụ kiểm thử hiệu năng có sẵn trên thị trường. Công cụ bạn chọn để kiểm tra sẽ phụ thuộc vào nhiều yếu tố, chẳng hạn như các loại giao thức được hỗ trợ, chi phí giấy phép, yêu cầu phần cứng, hỗ trợ nền tảng, v.v ... Dưới đây là danh sách các công cụ kiểm tra được sử dụng phổ biến.<br>

![](https://images.viblo.asia/e76779e8-d90a-43d8-a7d9-64ef755849f3.jpg)<br>
*Performance testing tool*


* **LoadNinja**: Công cụ kiểm thử load testing dựa trên đám mây này trao quyền cho các nhóm ghi lại và phát lại ngay lập tức các kiểm tra tải toàn diện, không có tương quan động phức tạp và chạy các kiểm tra tải này trong các trình duyệt thực theo tỷ lệ. Các đội có thể tăng phạm vi kiểm tra và cắt giảm thời gian thử nghiệm tải đến hơn 60%.
* **NeoLoad**: là nền tảng kiểm thử hiệu năng được thiết kế cho DevOps tích hợp hoàn toàn vào đường phân phối liên tục hiện có của bạn. Với NeoLoad, các nhóm kiểm tra nhanh hơn 10 lần so với các công cụ truyền thống để đáp ứng mức yêu cầu mới trong toàn bộ vòng đời phát triển phần mềm Agile - từ kiểm tra thành phần đến toàn bộ hệ thống.
* **HP LoadRunner** - là công cụ kiểm thử hiệu năng phổ biến nhất trên thị trường hiện nay. Công cụ này có khả năng mô phỏng hàng trăm ngàn người dùng, đặt các ứng dụng dưới tải thực tế để xác định hành vi của họ dưới tải dự kiến. Loadrunner có tính năng tạo trình tạo người dùng ảo mô phỏng hành động của người dùng trực tiếp.
* **Jmeter** : một trong những công cụ hàng đầu được sử dụng để kiểm tra tải của máy chủ ứng dụng và web.


**Tham khảo:**
- https://www.guru99.com/performance-testing.html#5
- https://www.tutorialspoint.com/software_testing_dictionary/performance_testing.htm