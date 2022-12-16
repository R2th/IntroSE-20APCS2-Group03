## Continuous Testing trong DevOps là gì?

Continuous Testing là quá trình test sớm, test thường xuyên, test ở khắp mọi nơi và tự động hóa. Đây là một quá trình đánh giá chất lượng ở mọi bước của Continuous Delivery Process - Quy trình phân phối liên tục. Mục tiêu của Continuous Testing là test sớm và test thường xuyên. Quá trình này bao gồm các bên liên quan như Developer, DevOps, QA và hệ điều hành.

## Continuous Testing có gì khác?

![](https://images.viblo.asia/937974f3-2ff3-4cfe-8738-8b4aff914524.png)

Một dự án sẽ có các giai đoạn xác định Development và QA. Đội ngũ QA luôn muốn có thêm thời gian để đảm bảo chất lượng. Mục tiêu của họ là chất lượng nên đối với họ điều đó quan trọng hơn so với tiến độ dự án.
 
Tuy nhiên, doanh nghiệp muốn cho ra mắt phần mềm nhanh hơn để người dùng cuối được trải nghiệm sớm nhất có thể. Với phiên bản mới hơn của phần mềm, càng có tiềm năng được quảng bá và tăng tiềm năng doanh thu của công ty. Do đó, một cách test mới đã được phát triển.

Continuous - Liên tục có nghĩa là test được thực hiện liên tục, không bị gián đoạn. Trong một quá trình Continuous DevOps, một sự thay đổi nào đó của phần mềm được chuyển từ Development sang Testing để triển khai một cách liên tục.

![](https://images.viblo.asia/65138a02-06a3-4e95-a382-53558e5a24f6.png)

*Code được chuyển từ phát triển, phân phối, kiểm thử và triển khai*

Trong quá trình liên tục, bất cứ khi nào developer kiểm tra code trong mã nguồn server giống như việc Jenkins tự động thực hiện unit tests. Nếu test thất bại, bản build bị reject và developer cũng sẽ được thông báo. Nếu bản build vượt qua bài test, nó sẽ được deploy, QA servers sẽ thực hiện đầy đủ các loại test, từ functional cho đến load tests. Các loại test này đều được chạy song song. Nếu phần mềm vượt qua tất cả các loại test trên, phần mềm được deploy bản production.
 
 ![](https://images.viblo.asia/8a42ea9d-24fa-45ca-8421-901b897a6581.png)
 
Continuous Testing là một bước nhỏ trong Chu kỳ phát triển, tích hợp và vòng đời Deploy.

## Sự khác nhau giữa Continuous Testing và Test Automation?

Test automation và Continuous Testing

![](https://images.viblo.asia/3ab88387-4b17-4a9f-8b04-189aea8e0a0a.PNG)

## Điều gì xảy ra trong quá trình thực hiện Continuous Testing?

* Sử dụng các công cụ để tạo test automation suite từ các user stories / yêu cầu của người dùng
 
* Tạo môi trường test
 
* Sao chép và ẩn danh dữ liệu production để tạo test data
 
* Sử dụng service virtualization để test API
 
* Thực hiện performance testing song song

## Công cụ được sử dụng để thực hiện Continuous Testing

### 1) Tricentis

Tricentis là Continuous Testing platform  số 1 của ngành và được công nhận để tái sử dụng cho công việc software testing thông qua DevOps. Tricentis sử dụng thử risk-based testing, tự động hóa kiểm thử đầu cuối không cần code, và nhiều hơn nữa để vượt qua các rào cản kiểm thử phần mềm thông thường.
**Tải xuống: https://www.tricentis.com**

### 2) Jenkins

Jenkins là một công cụ tích hợp liên tục được viết bằng ngôn ngữ Java. Công cụ này có thể được cấu hình thông qua GUI interface hoặc console commands.
**Tải xuống : https://jenkins.io/**

### 3) Travis

Travis là công cụ continuous testing được lưu trữ trên GitHub. Nó cung cấp và  lưu trữ các biến thể on-premises. Nó cung cấp nhiều ngôn ngữ khác nhau và tài liệu tham khảo rất tốt.

**Tải xuống: https://travis-ci.org/**

### 4) Selenium:

Selenium là công cụ continuous testing nguồn mở. Nó hỗ trợ tất cả các trình duyệt hàng đầu như Firefox, Chrome, IE và Safari. Selenium WebDriver được sử dụng để tự động kiểm thử ứng dụng web.
**Tải xuống: https://www.seleniumhq.org/**

## Lợi ích của thử nghiệm liên tục

* Đẩy nhanh quá trình phân phối phần mềm

* Continuous testing cải thiện chất lượng code

* Nó giúp đánh giá chính xác rủi ro kinh doanh.

* Nó tích hợp liền mạch vào quá trình DevOps

* Giúp tạo ra một quy trình nhanh và đáng tin cậy chỉ trong vài giờ thay vì hàng tháng.

* Tăng tốc thời gian tiếp cận thị trường với cơ chế phản hồi liên tục.

* Hợp nhất các đội ngũ truyền thống để đáp ứng nhu cầu của doanh nghiệp hiện đại. Ngắt kết nối giữa các nhóm phát triển, kiểm thử và vận hành.

* Test Automation giúp đạt được tính nhất quán bằng cách duy trì cùng một cấu hình cho tất cả các thử nghiệm có liên quan.

* Nhấn mạnh các kỳ vọng kinh doanh để giảm thiểu rủi ro kinh doanh

* Cung cấp môi trường truy cập kiểm thử phổ biến với Service Virtualization

## Những thách thức của Continuous Testing

* Cách làm truyền thống đang hạn chế sự thay đổi văn hóa giữa các chuyên gia Phát triển & QA.

* Thiếu kỹ năng DevOps và các công cụ thích hợp để test trong môi trường Agile & DevOps.

* Môi trường test không đồng nhất sẽ không bao giờ phản ánh đúng môi trường production .

* Khó quản lý quy trình test và dữ liệu test.

* Chu trình tích hợp code dài hơn tạo ra các vấn đề tích hợp và sửa lỗi chậm

* Tài nguyên không đủ và không hiệu quả và môi trường test

* Kiến trúc ứng dụng phức tạp và logic nghiệp vụ hạn chế trong việc sử dụng DevOps.

### Phần kết luận:

* Continuous testing là một quá trình test sớm, test thường xuyên, test ở khắp mọi nơi và tự động hóa.

* Cách test cũ là một dạng trao tay. Phần mềm được chuyển từ một nhóm này sang nhóm khác

* Jenkins, Travis và Selenium là các công cụ kiểm tra và tích hợp liên tục phổ biến.

* Continuous testing cung cấp phản hồi có thể thực hiện theo từng giai đoạn của quá trình phân phối.

* Continuous testing giúp cải thiện chất lượng code

* Cách làm truyền thống đang hạn chế sự thay đổi văn hóa giữa các chuyên gia Phát triển & QA.

* Chu trình tích hợp code dài hơn tạo ra các vấn đề tích hợp và sửa lỗi chậm



*Bài Viết được dịch lại từ nguồn:* https://www.guru99.com/continuous-testing.html