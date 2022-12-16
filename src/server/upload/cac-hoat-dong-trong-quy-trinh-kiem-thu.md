![](https://images.viblo.asia/5763a65e-16be-453e-839c-bf378f64207a.png)

Một quy trình kiểm thử bao gồm các nhóm hoạt động chính sau đâu:
## 1. Test planning
**Mục đích:**
* Xác định mục tiêu kiểm thử (test objective) và cách tiếp cận (approach) để đạt được mục tiêu
* Có thể được xem xét lại dựa trên phản hồi từ hoạt động monitoring và control

**Sản phẩm đầu ra:**
* Thông tin về test basis
* Tiêu chí đầu ra (được sử dụng trong suốt quá trình monitoring và control)
## 2. Test monitoring and control
**Mục đích:**
* Bao gồm việc so sánh liên tục giữa quy trình thực tế (actual progress) so với kế hoạch (test plan) bằng cách sử dụng các số liệu giám sát kiểm thử (test monitoring metrics) đã được xác định trong test plan
* Bao gồm việc thực hiện các hoạt động cần thiết để đạt được mục tiêu của test plan
* Được hỗ trợ bởi việc đánh giá của tiêu chí đầu ra (exit criteria) có thể bao gồm:
    + Kiểm tra test result và log lại tiêu chí bao phủ
    + Đánh giá mức độ chất lượng của các thành phần hoặc cả hệ thống dựa trên kết quả kiểm thử và logs
    + Xác định liệu có cần thiết kiểm thử nhiều hơn không
* Cung cấp báo cáo quy trình kiểm thử (test progress reports), bao gồm các sai lệch so với kế hoạch và thông tin để hỗ trợ bất kỳ quyết định dừng kiểm thử.

**Sản phẩm đầu ra:**
* Test progress reports
* Test summary reports
## 3. Test analysis
**Mục đích:**
* Phân tích test basis phù hợp với test level đang được xét:
    - Đặc tả yêu cầu (Requirement specifications)
    - Thông tin thiết kế và triển khai
    - Việc triển khai của cho các thành phần hoặc cả hệ thống
    - Các báo cáo phân tích rủi ro 

* Đánh giá test basis và test item để xác định các lỗi, ví dụ:
    - Không rõ ràng
    - Thiếu thông tin
    - Không nhất quán
    - Không chính xác
    - Mâu thuẫn
    - Xác định các tính năng thừa và các tính năng cần được test
    - Xác định và đánh độ ưu tiên cho test condition
    - Nắm bắt khả năng truy xuất 2 chiều giữa mỗi phần của test basis và các test condition thích hợp

**Sản phẩm đầu ra:**
* Thông tin về test condition
* Thông tin truy xuất 2 chiều (bi-directionally traceable)
* Test charter
* Báo cáo lỗi trong test basis
## 4. Test design
**Mục đích:**
* Thiết kế và đánh độ ưu tiên cho các test case và các bộ test case
* Xác định dữ liệu test cần thiết để hỗ trợ test condition và test case
* Thiết kế môi trường test và xác định các cơ sở hạ tầng (infrastructure) và các tool cần thiết
* Nắm bắt khả năng truy xuất 2 chiều giữa các test basis, test condition, test case và test procedure

**Sản phẩm đầu ra:**
* High-level test cases, không có giá trị cụ thể cho dữ liệu đầu vào (input data) và kết quả mong đợi (expected results)
* Bộ truy xuất xuất 2 chiều đối với các test condition được bao phủ
* Dữ liệu test, bản thiết kế của môi trường test và bản xác định kiến trúc (infrastructure) và tool, mặc dù các kết quả này được ghi lại khác nhau đáng kể.
* Các Test Condition được xác định trong test analysis có thể được chắt lọc lại trong test design
## 5. Test implementation
**Mục đích:**
* Phát triển và đánh độ ưu tiên cho các test procedure, và có thể tạo các automated test script
* Tạo các test suite từ test procedure và các automated test script (nếu có)
* Sắp xếp các test suite trong một lịch trình thực thi kiểm thử (test execution schedule) theo cách kết quả đó mang hiệu quả cho việc thực thi kiểm thử
* Xây dựng môi trường kiểm thử (test environment) và xác minh rằng mọi thứ cần thiết đã được cài đặt đúng
* Chuẩn bị dữ liệu kiểm thử và đảm bảo là chúng sẽ được tải đúng trong môi trường kiểm thử
* Xác minh và cập nhật truy xuất 2 chiều giữa các test basis, test conditions, test cases, test procedures và test suites

**Sản phẩm đầu ra:**
* Các Test procedure và trình tự của các test procedure đó 
* Các Test suite
* Lịch trình thực thi test (test execution schedule)
* Dữ liệu test để gán các giá trị cụ thể cho các giá trị đầu vào và các kết quả mong đợi của các test case
* Kết quả mong đợi cụ thể mà được liên kết với dữ kiệu test cụ thể, được xác định bằng cách sử dụng một test oracle
## 6. Test execution
**Mục đích:**
* Ghi lại các ID và các phiên bản của các test item hoặc test object, test tool, và các công cụ kiểm tra Executing test theo cách thủ công hoặc bằng cách sử dụng các công cụ thực thi test (test execution tool)
* So sánh kết quả thực tế với kết quả mong đợi
* Phân tích các khác thường để xác định nguyên nhân có thể có
* Báo cáo lỗi (defect) dự trên các biểu hiện của lỗi (failure) được quan sát
* Ghi lại kết quả của việc thực thi test (ví dụ: pass, fail, blocked)
* Lặp lại các hoạt động test khi có kết quả bất thường
* Xác minh và cập nhật truy xuất 2 chiều giữa các test basis, test conditions, test cases, test procedures và test results

**Sản phẩm đầu ra:**
* Tài liệu về trạng thái của các test case hoặc các test procedure riêng biệt
* Báo cáo lỗi (Defect reports) 
* Tài liệu về test item(s), test object(s), test tools, and testware được bao gồm trong quá trình test
## 7. Test completion
**Mục đích:**
* Kiểm tra xem tất cả báo cáo lỗi có được đóng lại hay không, nhập các yêu cầu thay đổi (change request) hoặc các mục còn tồn đọng (product backlog item) để xem lỗi nào vẫn chưa được giải quyết khi kết thức quá trình kiểm thử
* Tạo một test summary report để báo cáo cho các bên liên quan
* Hoàn thiện và lưu trữ test environment, the test data, test infrastructure và testware để sử dụng lại sau này
* Bàn giao phần mềm thử nghiệm cho nhóm bảo trì, các nhóm dự án khác hoặc các bên liên quan khác, những người được sử dụng chúng
* Phân tích bài học kinh nghiệm từ các hoạt động kiểm thử đã hoàn thành để xác định các thay đổi cần thiết cho các chu kỳ tới, các lần release tới và khác project khác
* Sử dụng thông tin thu thập được để cải thiện quy trình kiểm thử

**Sản phẩm đầu ra:**
* Báo cáo tóm tắt quá trình kiểm thử (Test summary reports) 
* Các hoạt động để cải thiện dự án về sau
* Các yêu cầu thay đổi (Change requests) hoặc các mục product backlog
* Phần mền kiểm thử (Finalized testware)

**Tài liệu tham khảo: *"Foundation Level Syllabus"* Version 2018 V3.1**