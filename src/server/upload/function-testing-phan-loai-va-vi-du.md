## 1. Kiểm thử chức năng (Function testing) là gì? 
:star:Kiểm thử chức năng là một loại kiểm thử phần mềm nhằm kiểm tra, đảm bảo hệ thống phần mềm hiển thị, hoạt động đúng với các yêu cầu / thông số kỹ thuật chức năng được xác định ban đầu, bằng cách cung cấp đầu vào thích hợp, xác minh kết quả đầu ra so sánh với các yêu cầu của chức năng.

:star:Kiểm thử chức năng chủ yếu liên quan đến kiểm thử hộp đen và nó không quan tâm đến mã nguồn (source code) của ứng dụng. Việc kiểm thử bao gồm kiểm tra giao diện người dùng, API, cơ sở dữ liệu, bảo mật, giao tiếp Client/ Server và các chức năng khác của ứng dụng. Việc kiểm tra có thể được thực hiện thủ công hoặc tự động hóa.

## 2. Vậy chúng ta nên tập trung điều gì khi kiểm thử?
:four_leaf_clover:Mục tiêu chính của việc kiểm thử là kiểm tra các chức năng của hệ thống phần mềm. Nó chủ yếu tập trung vào:

* Chức năng dòng chính (Mainline functions): Kiểm tra các luồng hoạt động chính của ứng dụng, trang web.

* Khả năng sử dụng cơ bản (Basic Usability): Liên quan đến việc kiểm tra khả năng sử dụng cơ bản của hệ thống. Kiểm tra xem người dùng có thể thao tác, điều hướng qua lại giữa các màn hình có gặp bất kỳ khó khăn nào hay không.

* Khả năng truy cập (Accessibility): Kiểm tra khả năng truy cập của hệ thống dành cho người dùng

* Điều kiện lỗi (Error Conditions): Sử dụng các kỹ thuật thử nghiệm để kiểm tra các điều kiện lỗi. Kiểm tra xem các thông báo lỗi phù hợp có được hiển thị hay không.
## 3. Quy trình kiểm thử chức năng:
Dưới đây mình sẽ nêu quy trình cơ bản, bao gồm các bước về cách thực hiện việc kiểm thử một chức năng:

1. Xác định, làm rõ và hiểu đúng đắn về các yêu cầu của khách hàng dành cho chức năng cần kiểm thử.
1. Xác định đầu vào để kiểm tra hoặc dữ liệu kiểm tra dựa trên các yêu cầu.
1. Tính toán kết quả mong đợi với các giá trị đầu vào thử nghiệm đã chọn
1. Thực thi các trường hợp thử nghiệm
1. So sánh kết quả dự kiến thực tế và tính toán


![](https://images.viblo.asia/1edfae66-dc70-41c1-b055-a0f951b429a2.png)






## 4. So sánh kiểm thử chức năng và phi chức năng (non-function)


| Kiểm thử Function | Kiểm thử Non-Function |
| -------- | -------- |
| Được thực hiện bằng cách sử dụng đặc tả chức năng do khách hàng cung cấp và xác minh hệ thống so với các yêu cầu chức năng.| Kiểm tra hiệu suất, độ tin cậy, khả năng mở rộng và các khía cạnh phi chức năng khác của hệ thống phần mềm.| 
| Việc kiểm thử được thực hiện đầu tiên.|Nên được thực hiện sau khi thử nghiệm chức năng.|
| Kiểm thử thủ công hoặc tự động hóa có thể được sử dụng để kiểm tra chức năng. | Sử dụng các công cụ sẽ có hiệu quả hơn cho thử nghiệm này.|
| Các yêu cầu nghiệp vụ là đầu vào để kiểm tra chức năng.| Các thông số hiệu suất như tốc độ, khả năng mở rộng là dữ liệu đầu vào.|
| Mô tả hoạt động của phần mềm ra sao.| Mô tả sản phẩm hoạt động tốt như thế nào.|
| Dễ dàng thực hiện kiểm tra thủ công| Khó để làm thử nghiệm thủ công|
| Một số ví dụ về phân loại: Unit Test, Smoke Test, Sanity Test, Integration Testing, White box testing, Black Box testing, User Acceptance testing, Regression Testing| Một số ví dụ về phân loại: Performance Testing, Load Testing, Volume Testing, Stress Testing, Security Testing, Installation Testing, Penetration Testing, Compatibility Testing, Migration Testing|

-----
:question:*Sau đây mình sẽ giới thiệu các bạn một số công cụ dùng để kiểm thử chức năng khá phổ biến, được biết đến nhiều:*

* **Selenium:** Công cụ kiểm tra chức năng với mã nguồn mở phổ biến.

* **QTP:** Công cụ kiểm tra chức năng rất thân thiện với người dùng của HP

* **JUnit:** Được sử dụng chủ yếu cho các ứng dụng Java và có thể được sử dụng trong Kiểm thử hệ thống và Unit Testing

* **soapUI:** Đây là một công cụ kiểm tra chức năng mã nguồn mở, chủ yếu được sử dụng để kiểm tra dịch vụ web. Hỗ trợ nhiều giao thức như HTTP, SOAP và JDBC.

* **Watir:** Đây là một công cụ kiểm tra chức năng cho các ứng dụng web. Hỗ trợ các bài kiểm tra được thực hiện trên trình duyệt web và sử dụng ngôn ngữ viết script là ruby.

### Phần kết luận:
*Trong kiểm thử phần mềm, kiểm thử chức năng là một quá trình kiểm tra các chức năng của hệ thống và đảm bảo rằng hệ thống đang hoạt động ổn định theo các chức năng được chỉ định trong tài liệu nghiệp vụ. Mục tiêu của thử nghiệm này là để kiểm tra xem hệ thống có hoàn hảo về mặt chức năng hay không.*

**Tham khảo:** https://www.guru99.com/functional-testing.html