Các ứng dụng banking giao dịch trực tiếp với dữ liệu tài chính bí mật. Toàn bộ các hoạt động được thực hiện bởi các phần mềm banking cho nên các phần mềm buộc phải chạy trơn tru mà không có bất cứ lỗi nào. Các phần mềm Banking thực hiện các chức năng khác nhau như chuyển và gửi tiền, kiểm tra số dư, lịch sử giao dịch, rút tiền … Kiểm thử ứng dụng banking phải đảm bảo các hoạt động này không chỉ được thực hiện tốt mà còn phải được bảo vệ khỏi các hacker.

Trong bài này, chúng ta sẽ tìm hiểu những vấn đề dưới đây:

* Domain trong testing là gì?
* Tại sao domain knowledge có ý nghĩa quan trọng?
* Giới thiệu về banking domain
* Các đặc điểm của 1 banking application
* Các giai đoạn test các banking application
* Sample test case cho Net banking login application
* Những thách thức trong việc test banking domain và sự giảm thiểu chúng
* Tổng kết

## Domain trong testing là gì?

Domain không có gì mới cả ngoài nghiệp vụ mà các dự án software testing được tạo ra. Khi chúng ta nói về software project hay software development. Ví dụ, Insurance domain, Banking domain, Retail domain, Telecom domain…

Thông thường, khi phát triển bất cứ domain project cụ thể nào thì cần có sự hỗ trợ từ domain expert. Domain expert là bậc thầy của các subject, và nó có thể hiểu rõ về các sản phẩm hay ứng dụng.

## Tại sao domain knowledge có ý nghĩa quan trọng?

Domain knowledge là tinh túy để test bất kỳ sản phẩm phần mềm nào, và nó có những lợi ích riêng như

![](https://images.viblo.asia/9134f651-f44a-4d11-a6ba-b6b19e2156be.png)

## Giới thiệu Banking domain knowledge

Banking domaincơ bản nó chia thành 2 phần

1. Traditional banking sector
2. Service based banking sector

Dưới đây là bảng các dịch vụ 2 phần này của banking bao gồm:

Traditional banking sector

* Core banking
* Corporate banking
* Retail banking
    
Service based banking sector

Core
* Corporate
* Retail
* Loan
* Trade finance
* Private banking
* Consumer finance
* Islamic banking
* Customer delivery channels/Front end delivery

Dựa trên phạm vi của dự án của bạn, bạn có thể chỉ cần test 1 hoặc tất cả các dịch vụ cung cấp bên trên. Trước khi bạn bắt đầu test, phải đảm bảo bạn có đủ background về các dịch vụ được test.

## Các đặc điểm của 1 banking application

Trước khi bạn bắt đầu test, quan trọng là phải lưu ý các yêu cầu được kỳ vọng của bất kỳ ứng dụng banking nào. Từ đó, bạn có thể hướng công việc test của bạn và cố gắng để đạt được các đặc điểm này.

1 banking application chuẩn cần đáp ứng tất cả các đặc điểm như được đề cập dưới đây:

* Nó cần hỗ trợ hàng nghìn user session đồng thời.
* 1 ứng dụng ngân hàng cần tích hợp với nhiều ứng dụng khác như các tài khoản giao dịch, thanh toán hóa đơn, các thẻ tín dụng …
* Nó cần xử lý nhanh chóng và giao dịch an toàn.
* Nó cần bao gồm cả hệ thống lưu trữ lớn.
* Để khắc phục các vấn đề của khách hàng nó cần có khả năng audit cao.
* Nó cần xử lý các business workflow phức tạp.
* Cần hỗ trợ các user trên nhiều nền tảng (Mac, Unix, Windows)
* Nó cần hỗ trợ user từ nhiều địa điểm
* Nó cần hỗ trợ các user với đa ngôn ngữ
* Nó cần hỗ trợ các user trên nhiều hệ thống thanh toán khác nhau (VISA, AMEX, MasterCard)
* Nó cần hỗ trợ nhiều phần dịch vụ (Loans, Retail banking…)
* Cơ chế quản lý foolproof disaster

## Các giai đoạn test các banking application

Đối với việc test các ứng dụng banking, các giai đoạn test bao gồm:

**Phân tích yêu cầu**: Nó được thực hiện bởi BA; các yêu cầu cho 1 ứng dụng banking được thu thập và viết tài liệu.

**Review yêu cầu**: Các QA, BA, và dev lead tham gia vào task này. Tài liệu của sự thu thập các yêu cầu được review ở giai đoạn này, và được kiểm tra chéo để đảm bảo nó không ảnh hưởng các workflow

**Tài liệu yêu cầu về nghiệp vụ**: Các tài liệu của các yêu cầu về nghiệp vũ được chuẩn bị bởi các QA trong đó toàn bộ các yêu cầu nghiệp vụ đã được review là được cover.

**Database testing**: Nó là phần quan trọng nhất của việc test ứng dụng bank. Việc này được thực hiện để đảm bảo toàn vẹn dữ liệu, data loading, data migration, các Phương thức được lưu trữ, và các chức năng xác thực, rule testing…

**Integration testing**: Trong Integration testing tất cả các thành phần mà được phát triển sẽ được tích hợp và xác thực

**Functional testing**: Các hoạt động test phần mềm thông thường như chuẩn bị test case, review test case và thực hiện test case được thực hiện trong suốt giai đoạn này

**Security testing**: Nó đảm rằng phần mềm không có bất cứ lỗi bảo mật nào. Trong quá trình chuẩn bị test, QA team cần bao gồm cả các kịch bản test rủi ro cũng như tích cực để đột nhập vào hệ thống và báo cáo nó trước khi có bất kỳ cá nhân không được phép nào truy cập nó. Trong khi để ngăn chặn tấn công, các bank cũng cần thực hiện 1 xác thực truy cập nhiều lớp như 1 one-time password. Đối với security testing, các công cụ tự động như IBM AppScan và HPWebInspeed được sử dụng trong khi với các công cụ Manual testing như proxy sniffer, Paros proxy, HTTP watch .. được sử dụng

**Usability testing**: Nó đảm bảo rằng những người có khả năng khác biệt có thể sử dụng hệ thống như người bình thường. Ví dụ, ATM với thiết bị trợ thính và chữ nổi cho người khuyết tật.

**User acceptance testing**: Nó là giai đoạn cuối cùng của việc test được thực hiện bởi các end user để đảm bảo tương thích của ứng dụng với các kịch bản mang tính thực tế

## Ví dụ về testcase cho Ứng Dụng Login của Net banking 

Bảo mật là quan trọng đối với bất cứ ứng dụng bank nào. Do đó, trong quá trình chuẩn bị test, QA team cần bao gồm cả các kịch bản test tích cực và tiêu cực để đột nhập vào hệ thống và báo cáo mọi lỗ hổng trước khi 1 cá nhân không cho phép nào đó có thể truy cập tới nó. Nó không chỉ liên quan đến việc viết các testcase tiêu cực mà còn bao gồm cả việc test phá hoại.

Sau đây là các testcase để check các ứng dụng banking

**Các test case mẫu **

Đối với Admin

* Kiểm tra Admin login với dữ liệu hợp lệ và không hợp lệ
* Kiểm tra admin login mà không có dữ liệu
* Kiểm tra toàn bộ các đường dẫn admin home 
* Kiểm tra admin change password với dữ liệu hợp lệ và không hợp lệ
* Kiểm tra admin change password mà không có dữ liệu
* Kiểm tra admin change password với dữ liệu hiện tại
* Kiểm tra admin logout

Đối với new branch

* Tạo 1 branch mới với dữ liệu hợp lệ và không hợp lệ
* Tạo 1 branch mới mà không có dữ liệu
* Tạo 1 branch mới với dữ liệu hiện tại của branch
* Kiểm tra reset và cancel option
* Cập nhập branch với dữ liệu hợp lệ và không hợp lệ
* Cập nhập branch mà không có dữ liệu
* Cập nhập branch với dữ liệu hiện tại của branch
* Kiểm tra cancel option
* Kiểm tra xóa branch có và không có phụ thuộc
* Kiểm tra branch search option

Đối với New Role

* Tạo 1 role mới với dữ liệu hợp lệ và không hợp lệ
* Tạo 1 role mới mà không có dữ liệu
* Kiểm tra role mới với dữ liệu hiện tại
* Kiểm tra role description và các loại role 
* Kiểm tra cancel và reset option
* Kiểm tra xóa role có và không có phụ thuộc
* Kiểm tra các đường dẫn trong trang các role chi tiết

Đối với customer & các Visitor

* Kiểm tra tất cả các đường dẫn của visitor hay customer 
* Kiểm tra các customer login với dữ liệu hợp lệ và không hợp lệ
* Kiểm tra các customer login mà không có dữ liệu
* Kiểm tra các banker login mà không có dữ liệu
* Kiểm tra các banker login với dữ liệu hợp lệ và không hợp lệ

Đối với các user mới

* Tạo 1 user mới với dữ liệu hợp lệ và không hợp lệ
* Tạo 1 user mới mà không có dữ liệu
* Tạo 1 user mới với dữ liệu hiện tại của branch
* Kiểm tra cancel và reset option
* Cập nhập user với dữ liệu hợp lệ và không hợp lệ
* Cập nhập user với dữ liệu hiện tại
* Kiểm tra cancel option
* Kiểm tra xóa các user

## Những thách thức trong việc test banking domain và sự giảm thiểu chúng

Các thách thức tester có thể đối mặt trong suốt quá trình test banking domain là



| **Thách Thức** | **Việc Giảm thiểu** |
| -------- | -------- | -------- |
| • Cấp quyền truy cập tới dữ liệu production và tái tạo nó dưới dạng dữ liệu test, là 1 thách thức với việc test     | • Đảm bảo dữ liệu test đáp ứng tuân thủ các yêu cầu và nguyên tắc thích hợp • Duy trì tính bảo mật của dữ liệu bằng các kỹ thuật như data masking, synthetic test data, testing system integration,…|
| • Thách thức lớn nhất trong việc test hệ thống banking là trong quá trình chuyển đổi của hệ thống từ hệ thống cũ sang hệ thống mới chẳng hạn như việc test tất cả các routine, procedure và các plan. Cũng như làm thế nào dữ liệu sẽ được fetch, upload, và transfer tới hệ thống mới sau chuyển đổi      |  • Đảm bảo việc test dữ liệu chuyển đổi là hoàn thành • Đảm bảo các test case hồi quy được thực hiện trên cả hệ thống cũ và mới, và các kết quả trùng khớp.     |
|  • Có thể có các case mà các yêu cầu không được ghi nhận rõ ràng và có thể dẫn đến các thiếu sót của function trong test plan • Nhiều yêu cầu non-functional không được ghi nhận đầy đủ, và các tester không biết liệu test nó hay không|   • Việc test nên chia xẻ trong dự án ngay từ các giai đoạn requirement analyst và cần tích cực review các business requirement     |
| • Điểm quan trọng nhất là kiểm tra xem liệu hệ thống đã đề cập có tuân thủ các yêu cầu và thủ tục mong muốn không     |  • Việc test tuân thủ hay phù hợp của các yêu cầu buộc phải được thực hiện     |
| • Phạm vi và timeline tăng khi ứng dụng banking được tích hợp với các ứng dụng khác như internet hay mobile banking     |  • Quỹ thời gian đảm bảo cho integration testing được tính đến nếu ứng dụng banking của bạn có nhiều external interface     |   
   
## Tổng kết

Banking domain là khu vực dễ bị tấn công nhất bởi trộm cắp mạng, và việc bảo vệ các phần mềm yêu cầu việc test chính xác. Bài này đưa ra 1 ý tưởng rõ ràng về những gì cần thiết đối với việc test banking domain và tầm quan trọng của nó. Phải hiểu rằng:

* Phần lớn các phần mềm banking được phát triển trên Mainframe và Unix 
* Việc test giúp giảm thiểu các trục trặc có thể gặp phải trong quá trình phát triển phần mềm
* Việc test và tuân thủ các tiêu chuẩn ngành, tránh cho các công ty không bị phạt
* Thực hiện tốt giúp đạt được các kết quả tốt, uy tín và nhiểu business cho các công ty
* Cả manual và automated testing đều có khả năng sử dụng riêng




Tham khảo: [https://www.guru99.com/banking-application-testing.html](https://www.guru99.com/banking-application-testing.html)