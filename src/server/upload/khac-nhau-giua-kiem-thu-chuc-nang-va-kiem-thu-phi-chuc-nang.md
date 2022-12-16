Đầu tiên cần hiểu khái niệm về kiếm thử chức năng và kiểm thử phi chức năng :
 ## 1. kiểm thử chức năng là gì?
 Kiểm thử chức năng là một loại kiểm thử để xác minh rằng mỗi chức năng của ứng dụng phần mềm hoạt động phù hợp với đặc tả yêu cầu. Kiểm thử này chủ yếu liên quan đến kiểm thử hộp đen, và nó không quan tâm đến mã nguồn của ứng dụng.

Mọi chức năng của hệ thống được kiểm tra bằng cách cung cấp đầu vào thích hợp, xác minh đầu ra và so sánh kết quả thực tế với kết quả mong đợi. Thử nghiệm này bao gồm việc kiểm tra Giao diện người dùng, API, Cơ sở dữ liệu, bảo mật, ứng dụng từ phía người dùng / server và chức năng của Ứng dụng đang thử nghiệm. Việc kiểm tra có thể được thực hiện bằng tay hoặc tự động.
## 2. Kiểm thử phi chức năng là gì?
Kiểm thử phi chức năng là một loại kiểm thử để kiểm tra các khía cạnh phi chức năng (hiệu suất, khả năng sử dụng, độ tin cậy, v.v.) của một ứng dụng phần mềm. Nó được thiết kế rõ ràng để kiểm tra sự sẵn sàng của một hệ thống theo các tham số phi chức năng mà không bao giờ được giải quyết bằng thử nghiệm chức năng.

Một ví dụ điển hình về kiểm thử phi chức năng là kiểm tra xem có bao nhiêu người cùng lúc có thể đăng nhập vào một phần mềm.

Kiểm thử phi chức năng cũng quan trọng không kém như kiểm tra chức năng và ảnh hưởng đến sự hài lòng của khách hàng.
## 3. Sự khác biệt trong thử nghiệm chức năng và phi chức năng
## Khác biệt
*  Kiểm tra chức năng xác minh từng chức năng / tính năng của phần mềm trong khi kiểm tra Không chức năng xác minh các khía cạnh phi chức năng như hiệu suất, khả năng sử dụng, độ tin cậy, v.v.
*  Kiểm tra chức năng có thể được thực hiện thủ công trong khi kiểm tra không chức năng khó thực hiện thủ công.
*  Kiểm tra chức năng dựa trên yêu cầu của khách hàng trong khi kiểm tra không chức năng dựa trên mong đợi của khách hàng.
*  Kiểm thử chức năng có một mục tiêu để xác nhận các hành động phần mềm trong khi kiểm tra phi chức năng có một mục tiêu để xác nhận hiệu suất của phần mềm.
*  Ví dụ về Kiểm tra chức năng là kiểm tra chức năng đăng nhập trong khi phi chức năng là kiểm tra màn dashboard sẽ tải trong 2 giây.
*  Chức năng mô tả những gì sản phẩm làm trong khi phi Chức năng mô tả cách thức sản phẩm hoạt động.
*  Kiểm tra chức năng được thực hiện trước khi kiểm tra phi chức năng.

| Parameters  | Kiển thử chức năng | Kiểm thử phi chức năng |
| -------- | -------- | -------- |
|Execution   | kiểm thử chức năng được thực hiện trước kiểm thử phi chức năng     | kiểm thử phi chức năng được thực hiện sau kiểm thử chức năng  |
| Focus area    | kiểm thử chức năng được thực hiện trên yêu cầu của khách hàng     | kiểm thử phi chức năng dựa trên sự mong đợi của khách hàng     |
| Requirement    | Rất dễ dàng để xác định được các yêu cầu chức năng     | Rất khó để xác định các yêu cầu cho kiểm thử phi chức năng    |
| Usage    | Kiểm thửchức năng xác minh hệ thống hoạt động tốt như thế nào.    | Kiểm thử phi chức năng xác minh hệ thống đáp ứng tốt như thế nào.    |
| Objective    | Kiểm tra chức năng xác minh chức năng của hệ thống hoặc cách hoạt động của hệ thống.     | Kiểm thử phi chức năng xác minh hiệu suất của hệ thống     |
| Requirements    | Yêu cầu chức năng là dựa trên khách hàng.    | Yêu cầu phi chức năng dựa trên các nhà phát triển và kiến ​​thức kỹ thuật của nhóm.     |
| Manual testing    | Kiểm thử chức năng rất dễ thực hiện bằng cách kiểm tra thủ công     | Rất khó để thực hiện kiểm thử phi chức năng một cách thủ công   |
| Functionality   | Mô tả những gì sản phẩm làm     | Mô tẩ cách thức hoạt động của sản phẩm    |
| Example Test Case   | Kiểm tra chức năng đăng nhập     | Trả về màn hình dashboard sau 2s      |
| Testing Types   | 	Unit testing, Smoke testing, Integration Testing, Regression testing, User Acceptance Testing, Localization and Internationalization Testing    |Performance Testing, Usability Testing, Scalability testing, Stress Testing, Portability Testing, Volume Testing, Load Testing, Disaster Recover Testing, Compliance Testing,     |

Nguồn tài liệu : https://www.guru99.com/functional-testing-vs-non-functional-testing.html