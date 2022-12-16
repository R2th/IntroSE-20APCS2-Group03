Trong kiểm thử phần mềm, có rất nhiều các tài liệu được tạo ra để phục vụ cho quá trình này. Các loại tài liệu này có thể được tạo ra trước khi quá trình kiểm thử được bắt đầu hoặc thậm chí là trong khi quá trình kiểm thử đã được tiến hành.

Các loại tài liệu này sẽ giúp cho việc ước tính khối lượng công việc cần thiết, độ bao phủ các trường hợp kiểm thử cũng như quá trình theo dõi các yêu cầu đặc tả ... một cách hiệu quả nhất.

Bài viết này chúng ta sẽ cùng tìm hiểu một số tài liệu được sử dụng phổ biến nhất trong quá trình kiểm thử, đó là:

- Test Plan.
- Test Scenario.
- Test Case.
- Traceability Matrix.

**Test Plan.**

Đây là một tài liệu bao gồm: các chiến lược, các nguồn nhân lực sẽ được sử dụng trong quá trình kiểm thử, các môi trường sẽ được tiến hành kiểm thử, giới hạn cho việc kiểm thử và lịch trình cho các hoạt động kiểm thử. Người soạn thảo ra tài liệu này sẽ là QA team leader.

Test Plan sẽ được cấu trúc như sau:

- Lời giới thiệu.
- Các giả định trong quá trình kiểm thử.
- Danh sách các test cases được sử dụng.
- Danh sách các chức năng sẽ được kiểm thử.
- Các chiến lược được sử dụng trong quá trình kiểm thử.
- Danh sách những sản phẩm bàn giao cần phải kiểm thử.
- Nhân sự sẽ được sử dụng cho việc kiểm thử.
- Các rủi ro trong quá trình kiểm thử.
- Lịch trình công việc cũng như các mốc đạt được.

**Test Scenario.**

Đây là một tài liệu sẽ cho chúng ta biết là vùng chức năng nào trong hệ thống sẽ được kiểm thử. Test scenarios được sử dụng nhằm đảm bảo các luồng trong hệ thống ở đầu cuối đều chạy đúng. Một vùng chức năng của hệ thống có ít nhất một cho đến hàng trăm scenarios phụ thuộc vào độ lớn cũng như độ khó của vùng chức năng đó trong hệ thống.

Test scenario và test cases có thể hoán đổi cho nhau. Tuy nhiên, test scenario có nhiều bước tiến hành hơn test case. Theo một vài quan điểm thì test scenarios chính là test cases nhưng chúng bao gồm nhiều test cases và theo một trình tự nhất định mà chúng được thực hiện. Ngoài ra, mỗi một scenario hay test cases sau đều phụ thuộc vào đầu ra của scenario hay test cases trước.

![](https://images.viblo.asia/cd5f724d-4fc0-4a76-aa0b-76d87a1e89e4.png)

**Test case.**

Test cases là một bộ các bước, điều kiện và các dữ liệu đầu vào được sử dụng trọng quá trình kiểm thử. Mục đích chính của hoạt động này là đảm bảo rằng hệ thống chạy đúng với các chức năng của nó cũng như các khía cạnh khác. Có rất nhiều loại test cases như functional, negative, error, logical test cases, physical test cases, UI test cases ...

Hơn nữa, test cases được viết để theo dõi độ bao phủ kiểm thử của hệ thống. Thông thường sẽ không có một mẫu test cases cố định nào, tuy nhiên có một số các yếu tố có thể dùng ở trong các test cases như:

- Test case ID
- Product module
- Product version
- Revision history
- Purpose
- Assumptions
- Pre-conditions
- Steps
- Expected outcome
- Actual outcome
- Post-conditions

Rất nhiều test cases có thể có nguồn gốc từ một test scenario. Thêm vào đó, đôi khi nhiều bộ test cases được viết cho một hệ thống cũng được gọi là test suites.

**Traceability Matrix.**

Traceability Matrix (cũng được gọi là Requirement Traceability Matrix - RTM) là một bảng được sử dụng để hệ thống hóa các đầu mục của yêu cầu đặc tả trong vòng đời phát triển phần mềm. Nó còn được sử dụng để tra cứu xuôi (ví dụ từ Yêu cầu đặc tả đến Thiết kế hay Coding) hoặc được dùng để tra cứu ngược (ví dụ từ Coding đến Yêu cầu đặc tả). Có rất nhiều các mẫu được sử dụng cho RTM này.

Mỗi một yêu cầu đặc tả trong tài liệu RTM sẽ được liên kết đến một test case, test case đó được thực hiện cũng chính là đã xác nhận yêu cầu đặc tả này đã được hoàn thành. Ngoài ra thì Bug ID cũng sẽ được liên kết đến test case và yêu cầu đặc tả tương ứng. Có thể tổng kết lại mục đích chính của Matrix này là:
- Đảm bảo hệ thống được lập trình đúng với yêu cầu đặc tả.
- Giúp tìm được nguyên nhân cốt lõi dẫn đến các lỗi phát sinh.
- Giúp cho việc tra cứu các tài liệu lập trình ở các giai đoạn khác nhau trong vòng đời phát triển phần mềm.

Link tham khảo:
https://www.tutorialspoint.com/software_testing/software_testing_documentation.htm