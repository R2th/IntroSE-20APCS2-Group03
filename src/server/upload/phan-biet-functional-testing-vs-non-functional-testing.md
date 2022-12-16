# Functional Testing là gì?
Kiểm tra chức năng là một kiểu kiểm tra mà xác minh rằng mỗi chức năng của phần mềm hoạt động phù hợp với yêu cầu nêu ra.Việc kiểm tra này chủ yếu bao gồm kiểm tra hộp đen và nó không liên quan đến code của ứng dụng

Mỗi chức năng của hệ thống được kiểm tra bằng cách cung cấp đầu vào thích hợp, xác minh đầu ra và so sánh kết quả thực tế với kết quả mong đợi.Việc kiểm tra này bao gồm kiểm tra dữ liệu người dùng, APIs, database, bảo mật, ứng dụng client/ server  , và chức năng của ứng dụng  sau kiểm tra.Việc kiểm tra này có thể được làm bằng tay hoặc tự động.

# Non-Functional Testing là gì
kiểm tra phi chức năng là một kiểu kiểm tra để kiểm tra những mặt phi chức năng( sự trình bày, khả năng sử dụng, sự tin cậy,etc) của một ứng dụng phần mềm. Nó được thiết kế một cách rõ ràng  để kiểm tra sự sẵn sàng của hệ thống theo các thông số phi chức năng khi mà mà không  giải quyết được bằng kiểm tra chức năng
Một ví dụ của kiểm tra phi chức năng sẽ kiểm tra có bao nhiêu nguời có thể đăng nhập đồng thời vào một phần mềm.
kiểm tra phi chức năng cũng quan trọng như kiểm tra chức năng và ảnh hưởng đến sự hài lòng của khách.

# Functional Testing Vs Non-Functional Testing


| Thông số | Functional Testing | Non-Functional Testing |
| -------- | -------- | -------- |
| Thực hiện      | Nó được thực hiện trước kiểm tra phi chức năng    | Nó được thực hiện sau kiểm tra phi chức năng     |
| Vùng tập trung    | Nó đươc dựa trên yêu cầu của khách hàng      | Nó dựa trên sự mong chờ của khách hàng   |
| Yêu cầu      | Dễ định nghĩa được chức năng yêu cầu      | Khó định nghĩa được yêu cầu cho kiểm tra phi chức năng    |
| Sử dụng      | Giúp xác nhận cách ứng xử của ứng dụng   | Giúp xác nhận sự thể hiện của ứng dụng     |
| Mục tiêu     | Thực hiện xác nhận hành động của phần mềm     | xác nhận ( performance)  của phần mềm   |
| Những yêu cầu    | Kiểm tra chức năng được xác nhận sử dụng chức năng      | Loại kiểm tra này xác nhận  các thông số kĩ thuật      |
| manual    | rất dễ dàng    |khó khăn    |
| Ví dụ   | Kiểm tra chức năng đăng nhập  | Bảng điều khiển( dashboard) nên tải trong 2 giây     |
#  Kiểu kiểm tra  
##  Functional Testing
*  Unit testing
* Smoke testing
* User Acceptance
* Integration Testing
* Regression testing
* Localization
* Globalization
* Interoperability    
##  Non-Functional Testing
* Performance Testing
* Volume Testing
* Scalability
* Usability Testing
* Load Testing
* Stress Testing
* Compliance Testing
* Portability Testing
* Disaster Recover Testing

*Nguồn:* https://www.guru99.com/functional-testing-vs-non-functional-testing.html