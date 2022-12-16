![](https://images.viblo.asia/36298b57-58f3-4dba-bd5a-c531e880de8b.jpg)

***Alpha testing và Beta testing*** là một dạng của acceptance testing, giúp xây dựng sự tin tưởng về chất lượng để khởi chạy sản phẩm và do đó dẫn đến thành công của sản phẩm khi phát hành

Mặc dù cả alpha và beta test đều dựa vào người dùng thực và phản hồi của các nhóm khác nhau, tuy nhiên họ được thúc đẩy bởi các quy trình, chiến lược và mục tiêu riêng biệt. Hai loại kiểm thử này cùng nhau làm tăng sự thành công của một sản phẩm trên thị trường.
## 1. Alpha testing
![](https://images.viblo.asia/657ddb36-2d05-4c52-8e3e-6246173cb2e5.png)

Đây là một dạng kiểm thử chấp nhận nội bộ được thực hiện chủ yếu bởi các QA và testing team. Alpha là thử nghiệm cuối cùng được thực hiện bởi các  test teams  tại development site sau acceptance test và trước khi  releas để kiểm thử beta.

Alpha test cũng có thể được thực hiện bởi người dùng tiềm năng hoặc khách hàng của ứng dụng.

## 2. Beta testing

Đây là giai đoạn kiểm thử cuối cùng, nơi các công ty phát hành phần mềm cho vài nhóm người dùng bên ngoài khác với nhóm kiểm thử của công ty hoặc nhân viên. Phiên bản phần mềm ban đầu này được gọi là phiên bản beta. Hầu hết các công ty thu thập phản hồi của người dùng trong bản phát hành này.

***Tóm lại, thử nghiệm beta có thể được định nghĩa là - thử nghiệm được thực hiện bởi người dùng thực trong môi trường thực.***

Mặc dù ta đảm bảo nghiêm ngặt chất lượng từ các nhóm tester, nhưng thực tế là không thể kiểm thử một ứng dụng cho mọi sự kết hợp của môi trường kiểm thử. Bản phát hành beta sẽ giúp dễ dàng kiểm tra ứng dụng trên hàng nghìn máy test và khắc phục sự cố trước khi phát hành ứng dụng cho công chúng.

Việc lựa chọn các nhóm thử nghiệm beta có thể được thực hiện dựa trên nhu cầu của công ty. Công ty có thể mời một vài người dùng thử nghiệm phiên bản xem trước của ứng dụng hoặc họ có thể phát hành một cách công khai để người dùng bất kỳ test. Việc khắc phục các vấn đề trong bản phát hành beta có thể làm giảm đáng kể chi phí phát triển vì hầu hết các trục trặc nhỏ được sửa chữa trước khi phát hành cuối cùng.

**Quy trình kiểm thử beta**

Có rất nhiều cách để tiến hành và quản lý beta test tuy nhiên quy trình chuẩn gồm 6 giai đoạn sau:

- Lập kế hoạch dự án

- Tuyển dụng người tham gia

- Phân phối sản phẩm

- Thu thập Phản hồi

- Đánh giá Phản hồi

- Kết luận Beta


## 3. So sánh Alpha test và Beta test

![](https://images.viblo.asia/a18d66a5-42c5-48f5-9b9a-9a5a7a3a6b79.png)


| | Alpha testing |Beta testing |
| -------- | -------- | -------- |
|**Cơ bản**   | Giai đoạn kiểm thử đầu tiên trong xác thực khách hàng  | Giai đoạn kiểm thử  thứ hai trong xác thực khách hàng     |
|     | Thực hiện test tại môi trường của nhà phát triển. Do đó, mọi hoạt động đều được control| Thực hiện test trên môi trường thực   |
|     |Chỉ test functionality, usability. Reliability và Security thường không được test ở giai đoạn này    | Functionality, Usability, Reliability, Security testing đều được test quan trọng ngang nhau     |
|      | Sử dụng cả kỹ thuật kiểm thử hộp trắng và hộp đen | Chỉ sử dụng kỹ thuật kiểm thử hộp đen   |
|     |System Testing được thực hiện trước alpha testing   | Alpha testing được thực hiện trước Beta testing   | 
|    |Issues / Bugs sẽ được log trực tiếp và được fix ở mức ưu tiên cao     |Issues / Bugs được thu thập dưới  dạng suggestions/feedback của người dùng và sẽ được cải tiến vào bản phát hành trong tương lai  `
|     | Giúp có view khác nhau về sử dụng sản phẩm vì business khác nhau     | Biết được tỉ lệ thành công của sản phẩm  dựa trên suggestions/feedback của người dùng    |
| **Mục tiêu**    | Đánh giá chất lượng của sản phẩm   | Đánh gía sự hài lòng của người dùng    |
|    |Đảm bảo sự sẵn sàng cho Beta tesing    | Đảm bảo sẵn sàng để phát hành   |
|    | Tập trung vào tìm lỗi   |Tập trung thu thập vào sugestions/feedback và đánh giá sản phẩm    |
 |   | -> Sản phẩm có hoạt động không   | -> Khách hàng có hài lòng với sản phẩm không    |
| **Test khi nào**    | Thông thường sau System Testing hoặc  khi sản phẩm hoàn thành 70-90%| Thông thường sau Alpha test và sản phẩm hoàn thành 90- 95%     |
|     | Các tính năng gần như là sẽ không cải tiến thêm cho phiên bản này     |Các tính năng bị đóng băng và sẽ không có cải tiến nào được chấp nhận     |
|**Thời gian**    | Nhiều chu kỳ test được tiến hành     | Chỉ có 1 hoặc 2 chu kỳ test được tiến hành   |
|    | Mỗi chu kỳ kéo dài từ 1-2 tuần     | Mỗi chu kỳ kéo dài từ 4-6 tuần    |
|    | Thời gian sẽ phụ thuộc vaò số issues được tìm thấy và số lượng tính năng mới được thêm     | Chu kỳ test có thể tăng dựa vào suggestions/ feedback của người dùng   |
| **Người chịu trách nhiệm**    |Engineers (in-house developers), Quality Assurance Team, và Product Management Team     | Product Management, Quality Management, và nhóm trải nghiệm người dùng     |
| **Người tham gia test**     | Chuyên gia kỹ thuật, tester có kiến thức về domain     | Người dùng cuối  được thiết kế sản phẩm    |
| **Tiêu chuẩn đầu vào**    |  Setup và build môi trường để thực thi test   | Xác định người dùng cuối và nhóm khách hàng    |
|     | Team tester có kiến thức về domain và sản phẩm    | Thiết lập môi trường người dùng cuối     |
||Setup tool để đăng  nhập và quản lý lỗi và system test đã được đóng lại   | Setup tool để sẵn sàng nắm bắt các feedback/suggestions   |
|   |    |Alpha testing đã được đóng lại    |
| **Tiêu chuẩn đầu ra**     | Tất cả các chu kỳ phải được hoàn thành    | Tất cả các chu kỳ phải được hoàn thành   |
|      | Critical / Major issues c ần được fix và kiểm tra lại     | Critical / Major issues c ần được fix và kiểm tra lại    |
|     | Feedback do người tham gia cung cấp phải được hoàn thành   | Feedback do người tham gia cung cấp phải được hoàn thành     |
|     | Báo cáo tóm tắt alpha testing    | Báo cáo tóm tắt beta testing    |
|    | Alpha test cần được đóng lại   | Beta test cần được đóng lại    |
| **Ưu điểm**     | Phát hiện các lỗi không được tìm thấy trong các quá trình kiểm thử trước  đó    |Người dùng có thể kiểm tra mọi tính năng theo bất kỳ cách nào     |
|     | Có view tốt hơn về sử dụng và độ tin cậy của sản phẩm  | Giúp phát hiện lỗi không tìm thấy được trong các hoạt động kiểm thử trước đó    |
|     | Phân tích các rủi ro có thể xảy ra trong và sau khi ra mắt sản phẩm    | Phân tích quản điểm và ý kiến thực tế của người dùng về sản phẩm   |
|      | Giúp chuẩn bị hỗ trợ khách hàng trong tương lai    | Feedback/Suggestions của người dùng sẽ giúp phát triển sản phẩm trong tương lai    |
|     | Giúp xây dựng niềm tin của khách hàng với sản phẩm    | Tăng sự hài lòng của khách hàng với sản phẩm     |
|     |Giảm chi phí bảo trì khi lỗi được xác định và sửa lỗi trước khi test Beta và ra mắt sản phẩm     |    |
|      | Quản lý kiểm thử dễ dàng    |      |
| **Nhược điểm**    | Không phải tất cả các chức năng của sản phẩm đều được kiểm thử     | Các feedback không phải lúc  nào cũng hiệu quả. tốn nhiều thời gian xem xét các feedback đó     |
|     | Chỉ test các yêu cầu nghiệp vụ   | Không phải tất cả những người tham gia test đều đáp ứng chất lượng test      |
|     | | Quản lý khó     |



Tài liệu tham khảo: 
https://www.softwaretestinghelp.com/what-is-alpha-testing-beta-testing/
https://www.guru99.com/alpha-beta-testing-demystified.html