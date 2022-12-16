## 1. User Acceptance Testing (UAT) là gì?

User Acceptance Testing là quá trình xác nhận rằng phần mềm đã tạo ra có hoạt động phù hợp với người dùng cuối hay không.

## 2. Ai là người thực hiện UAT?

- Người dùng cuối
- Khách hàng 

![](https://images.viblo.asia/08d056b2-7508-46a1-918d-fb40488d8fe1.png)

## 3. Tại sao cần User Acceptance Testing? 

- Các nhà phát triển phần mềm dựa trên tài liệu yêu cầu và sự hiểu biết của họ để xây dựng các yêu cầu và có thể không thực sự là những gì khách hàng cần từ phần mềm.
- Các yêu cầu thay đổi trong quá trình làm dự án có thể không được truyền đạt hiệu quả và chính xác đến các nhà phát triển.

## 4. Các bước thực hiện UAT
![](https://images.viblo.asia/74fd9ed0-3827-4d9b-8fa0-bdbb3fe10cce.png)


- Phân tích các yêu cầu nghiệp vụ của phần mềm
- Tạo kế hoạch kiểm tra UAT
- Xác định các kịch bản kiểm thử
- Tạo các trường hợp kiểm tra UAT
- Chuẩn bị data test (giống với data thật nhất)
- Thực hiện kiểm thử
- Ghi nhận kết quả
- Xác nhận các chức năng của sản phẩm

## 5. User Acceptance Testing (UAT) khác gì với Functional Testing?

User Accecptance Tests bao gồm 1 bộ các test steps dùng để xác nhận xem các yêu cầu đặc tả đã đúng với nhu cầu của user không. Nếu khách hàng và nhà cung cấp đồng ý với sản phẩm thì phát triển phầm mềm được bắt đầu. 

Functional testing – kiểm tra các yêu cầu cụ thể và thông số kỹ thuật của phần mềm. Nó thiếu thành phần người dùng. Functional testing có thể đưa ra kết luận rằng phần mềm đáp ứng các thông số kỹ thuật của nó không. Tuy nhiên, không xác minh liệu phần mềm đó có thực sự phù hợp với nhu cầu người dùng không.

Ví dụ: Facebook ra mắt một tính năng mới, cho phép người dùng Facebook gửi bưu thiếp cho gia đình và bạn bè. Về mặt, kỹ thuật giải pháp làm việc. Tester có thể sử dụng nó, tuy nhiên do thiếu sự quan tâm và nhu cầu sẽ không ai muốn gửi bưu thiếp in. Kiểm tra chức năng sẽ diễn ra tốt, kiểm tra khả năng sử dụng cũng sẽ tốt, nhưng kiểm tra chấp nhận người dùng có thể sẽ thất bại vì người dùng Facebook không có nhu cầu gửi bưu thiếp trong Facebook.

## 6. Các kiểu của User Acceptance Testing

### 6.1. Alpha & Beta Testing

Alpha testing thường diễn ra trong môi trường phát triển và thường được thực hiện bởi nhân viên nội bộ. Ngoài ra các nhóm người dùng tiềm năng cũng có thể tiến hành Alpha Tests. Dựa trên những phản hồi – được thu thập từ những người thử nghiệm alpha – nhóm phát triển sẽ khắc phục một số vấn đề cần thiết và cải thiện khả năng sử dụng của sản phẩm.

Beta Testing còn được gọi là “thử nghiệm lĩnh vực” của Wap, diễn ra trong môi trường của khách hàng và liên quan đến một số thử nghiệm rộng rãi của một nhóm khách hàng sử dụng hệ thống trong môi trường của họ. Những người thử nghiệm beta sau đó cung cấp thông tin phản hồi, từ đó dẫn đến những cải tiến của sản phẩm.

### 6.2. Usersnap

Usersnap Classic là một giải pháp tuyệt vời để yêu cầu người kiểm tra alpha và beta phản hồi. Với Usersnap Classic, các nhóm UAT có thể dễ dàng thu thập và phân tích phản hồi định tính từ những người thử nghiệm. Và đối với những người thử nghiệm, nó cực kỳ dễ dàng để làm việc thông qua thử nghiệm alpha hoặc beta đầu tiên, vì họ có thể chỉ cần vẽ trên màn hình để cung cấp phản hồi.

### 6.3. Contract Acceptance Testing

Contract Acceptance Testing (Kiểm tra chấp nhận hợp đồng) có nghĩa là một phần mềm phát triển được kiểm tra theo các tiêu chí và thông số kỹ thuật nhất định được xác định và thỏa thuận trong hợp đồng. Nhóm dự án xác định các tiêu chí và thông số kỹ thuật có liên quan để chấp nhận đồng thời khi nhóm đồng ý với hợp đồng.

### 6.4. Regulation Acceptance Testing

Regulation Acceptance Testing (Kiểm tra chấp nhận quy định), còn được gọi là Compliance Acceptance Testing(Kiểm tra chấp nhận tuân thủ), kiểm tra xem phần mềm có tuân thủ các quy định hay không. Điều này bao gồm các quy định của chính phủ và pháp lý.

### 6.5. Operational acceptance testing

Còn được gọi là Operational Readiness Testing (Thử nghiệm sẵn sàng hoạt động) hoặc Production Acceptance Testing (Thử nghiệm chấp nhận sản xuất). Các trường hợp thử nghiệm này đảm bảo các quy trình công việc để cho phép phần mềm hoặc hệ thống được sử dụng. Nó bao gồm các quy trình công việc cho các kế hoạch dự phòng, đào tạo người dùng, bảo trì và kiểm tra bảo mật khác nhau.

### 6.6. Black Box Testing

Black Box Testing (Kiểm thử hộp đen) thường được phân loại là kiểm tra chức năng, nhưng trong một chừng mực nào đó có thể được xem là một loại Kiểm tra chấp nhận người dùng. Nó là một phương pháp kiểm thử phần mềm để phân tích các chức năng nhất định mà không cho phép người kiểm tra thấy cấu trúc code bên trong. Trong quá trình kiểm tra Hộp đen, người dùng không biết về bất kỳ cơ sở code nào, nhưng phải biết về các yêu cầu mà phần mềm phải đáp ứng.

Tài liệu tham khảo:
https://www.guru99.com/user-acceptance-testing.html
https://usersnap.com/blog/types-user-acceptance-tests-frameworks/