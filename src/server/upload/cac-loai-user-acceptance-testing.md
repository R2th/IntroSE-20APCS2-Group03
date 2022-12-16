User Acceptance Testing là quá trình xác nhận rằng một giải pháp / phần mềm đã tạo ra có hoạt động phù hợp với người dùng cuối hay không.

## Khi nào và tại sao cần User Acceptance Testing

Acceptance test (kiểm thử chấp nhận) có thể được hiểu là một cách để kiểm tra xem "hợp đồng" đã được xác định trước đó giữa các nhà phát triển và khách hàng có đi đúng hướng hay không. 

Chạy các thử nghiệm chấp nhận cũng để đảm bảo rằng không có thay đổi yêu cầu nào xảy ra trong thời gian đó và mọi thứ đều phải đúng để làm hài lòng khách hàng.

Acceptance test khá hữu dụng vì:

* Chúng nắm bắt các yêu cầu của người dùng bằng cách kiểm chứng trực tiếp

* Chúng tìm ra những vấn đề mà ở unit hay integration test có thể đã để lọt

* Và chúng cung cấp 1 cái nhìn tổng quan về kết quả hệ thống đạt được.

Khi nhìn vào quá trình phát triển phần mềm, chúng ta có thể thấy rằng UAT được sử dụng để xác định và xác minh nhu cầu của khách hàng.

![](https://images.viblo.asia/196dd797-fa22-4f31-91a0-c86c309e9edc.png)

## User Acceptance Testing (UAT) khác gì với functional testing?

Có thể bạn đang phán đoán sự khác nhau giữa User Acceptance Testing và function  testing.

User Accecptance Tests bao gồm 1 bộ các test steps dùng để xác nhận xem các yêu cầu đặc tả có làm việc phục vụ nhu cầu của user không. Nếu khách hàng và nhà cung cấp đồng ý với sản phẩm thì phát triển phầm mềm được bắt đầu. Hợp pháp và thực tế.

Functional testing -  kiểm tra các yêu cầu cụ thể và thông số kỹ thuật của phần mềm. Nó thiếu thành phần người dùng. Functional testing có thể đưa ra kết luận rằng phần mềm đáp ứng các thông số kỹ thuật của nó không. Tuy nhiên, không xác minh liệu phần mềm đó có thực sự phù hợp với nhu cầu người dùng không.

Tôi đưa ra ví dụ thế này nhé:  Facebook ra mắt một tính năng mới, cho phép người dùng Facebook gửi bưu thiếp cho gia đình và bạn bè. Về mặt, kỹ thuật giải pháp làm việc. Tester có thể sử dụng nó - tuy nhiên do thiếu sự quan tâm và nhu cầu, sẽ không ai muốn gửi bưu thiếp in. Kiểm tra chức năng sẽ diễn ra tốt, kiểm tra khả năng sử dụng cũng sẽ tốt, nhưng kiểm tra chấp nhận người dùng có thể sẽ thất bại vì người dùng Facebook không có nhu cầu gửi bưu thiếp trong Facebook.

## Các kiểu của User Acceptance Testing

Chúng ta đã phân tách rõ hơn về functional testing từ User Acceptance Testing rồi, giờ ta có thể thấy các loại khác nhau của User Acceptance Testing. User Acceptance Testing Types bao gồm:

* Alpha & Beta Testing

* Contract Acceptance Testing

* Regulation Acceptance Testing

* Operational Acceptance Testing

* Black Box Testing

### Alpha & Beta Testing

**Alpha testing** thường diễn ra trong môi trường phát triển và thường được thực hiện bởi nhân viên nội bộ. Ngoài ra các nhóm người dùng tiềm năng có thể tiến hành Alpha Tests, nhưng điều quan trọng ở đây là nó diễn ra trong môi trường phát triển.
Dựa trên những phản hồi - được thu thập từ những người thử nghiệm alpha - nhóm phát triển sẽ khắc phục một số vấn đề cần thiết và cải thiện khả năng sử dụng của sản phẩm.

**Beta Testing,** còn được gọi là "thử nghiệm lĩnh vực" của Wap, diễn ra trong môi trường của khách hàng và liên quan đến một số thử nghiệm rộng rãi của một nhóm khách hàng sử dụng hệ thống trong môi trường của họ. Những người thử nghiệm beta sau đó cung cấp thông tin phản hồi, từ đó dẫn đến những cải tiến của sản phẩm.
Thử nghiệm Alpha và Beta được thực hiện trước khi phần mềm được phát hành cho tất cả khách hàng.
Yêu cầu tester qua email để cung cấp kết quả kiểm tra của họ vẫn là một cách phổ biến để tiến hành và chạy thử nghiệm alpha / beta. Vậy mà bạn có thể tự hỏi, liệu có giải pháp nào tốt hơn cho điều đó không? Thật may là có.

### Usersnap 

Usersnap Classic là một giải pháp tuyệt vời để yêu cầu người kiểm tra alpha và beta phản hồi.
Nó có một giải pháp UAT dễ sử dụng giúp các nhóm QA xác minh xem một giải pháp nào đó có hiệu quả với người dùng hay không. Bằng cách có một tiện ích phản hồi đơn giản, người kiểm tra alpha và beta có thể cung cấp phản hồi toàn diện về nguyên mẫu phần mềm.
Với Usersnap Classic, các nhóm UAT có thể dễ dàng thu thập và phân tích phản hồi định tính từ những người thử nghiệm. Và đối với những người thử nghiệm, nó cực kỳ dễ dàng để làm việc thông qua thử nghiệm alpha hoặc beta đầu tiên, vì họ có thể chỉ cần vẽ trên màn hình để cung cấp phản hồi.

### Contract Acceptance Testing

Contract Acceptance Testing (Kiểm tra chấp nhận hợp đồng) có nghĩa là một phần mềm phát triển được kiểm tra theo các tiêu chí và thông số kỹ thuật nhất định được xác định và thỏa thuận trong hợp đồng. Nhóm dự án xác định các tiêu chí và thông số kỹ thuật có liên quan để chấp nhận đồng thời khi nhóm đồng ý với chính hợp đồng.

### Regulation Acceptance Testing

Regulation Acceptance Testing (Kiểm tra chấp nhận quy định), còn được gọi là Compliance Acceptance Testing(Kiểm tra chấp nhận tuân thủ), kiểm tra xem phần mềm có tuân thủ các quy định hay không. Điều này bao gồm các quy định của chính phủ và pháp lý.

### Operational acceptance testing

Còn được gọi là Operational Readiness Testing (Thử nghiệm sẵn sàng hoạt động) hoặc Production Acceptance Testing (Thử nghiệm chấp nhận sản xuất). Các trường hợp thử nghiệm này đảm bảo các quy trình công việc để cho phép phần mềm hoặc hệ thống được sử dụng. 
Nó nên bao gồm các quy trình công việc cho các kế hoạch dự phòng, đào tạo người dùng và các quy trình bảo trì và kiểm tra bảo mật khác nhau.

### Black Box Testing

Black Box Testing (Kiểm thử hộp đen) thường được phân loại là kiểm tra chức năng, nhưng trong một chừng mực nào đó, có thể được xem là một loại Kiểm tra chấp nhận người dùng.
Nó có một phương pháp kiểm thử phần mềm để phân tích các chức năng nhất định mà không cho phép người kiểm tra thấy cấu trúc code bên trong. Kiểm thử hộp đen là một phần của Kiểm tra chấp nhận người dùng, vì Kiểm thử hộp đen có chung các nguyên tắc như UAT.Trong quá trình kiểm tra Hộp đen, người dùng không biết về bất kỳ cơ sở code nào, nhưng phải biết về các yêu cầu mà phần mềm phải đáp ứng.

![](https://images.viblo.asia/3aac52da-5dfb-45be-bb21-ef274c3d4896.png)

Trong kiểu test này, không yêu cầu Người kiểm thử phải có bất kỳ kiến thức cụ thể nào về ứng dụng hoặc hiểu biết về bất kỳ tính năng nào của ứng dụng. Người kiểm thử tiến hành Kiểm tra Hộp đen chỉ cần biết phần mềm làm được gì. Họ không cần biết cách phần mềm đó đã làm như thế nào.


Nguồn: https://usersnap.com/blog/types-user-acceptance-tests-frameworks/?utm_source=checklist&utm_medium=googlesheet&utm_campaign=UAT