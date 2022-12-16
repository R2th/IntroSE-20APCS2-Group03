![](https://images.viblo.asia/0a8fb0a8-5e43-4d4e-ae79-3ef40e02a9cd.jpg)

### 1. Sự khác nhau giữa Kế hoạch kiểm thử (Test Plan) và Chiến lược kiểm thử (Test Strategy)

* Test Plan là một tài liệu liệt kê tất cả các hoạt động của QA trong dự án, lên lịch cho các hoạt động, xác định phạm vi của dự án, vai trò và trách nhiệm, rủi ro, các tiêu chí đầu vào và đầu ra, mục tiêu kiểm tra và bất cứ điều gì khác mà bạn có thể nghĩ tới.

* Test Strategy là một bộ hướng dẫn để giải thích thiết kế thử nghiệm và xác định cách thử nghiệm cần được thực hiện.



| Test Plan | Test Strategy | 
| -------- | -------- | 
| Test Plan có nguồn gốc từ đặc tả yêu cầu phần mềm (SRS)    | Test Strategy được lấy từ tài liệu Business Requirement (BRS)    |
| Test Plan được chuẩn bị bởi trưởng nhóm thử nghiệm hoặc người quản lý     | Test Strategy được phát triển bởi người quản lý dự án hoặc nhà phân tích kinh doanh  |
| Các thành phần của Test Plan: Các tính năng cần kiểm tra, kỹ thuật kiểm tra, nhiệm vụ kiểm tra, chức năng đạt hoặc không đạt, thời gian hoàn thành, trách nhiệm và lịch biểu...  |  Các thành phần của Test Strategy: Mục tiêu và phạm vi, định dạng tài liệu, quy trình kiểm tra, cấu trúc báo cáo nhóm, chiến lược giao tiếp khách... |
| Nếu có một tính năng mới hoặc thay đổi yêu cầu xảy ra thì tài liệu sẽ được cập nhật.     | Test Strategy là tài liệu tĩnh.     |
| Test Plan là tài liệu cần có bắt buộc    | Trong các dự án nhỏ hơn, Test Strategy thường được xây dựng như là một phần của  Test Plan   |
| Tài liệu dùng cho một dự án     | Tài liệu có thể dùng cho nhiều dự án     |
| Mô tả cách kiểm tra, khi nào kiểm tra, ai sẽ kiểm tra và những gì cần kiểm tra    | Mô tả loại kỹ thuật để kiểm tra.     |

###  2. Sự khác nhau giữa Trường hợp thử nghiệm (Test case) và Tập lệnh kiểm thử (Test script)

Hai thuật ngữ này đều dùng để mô tả kịch bản kiểm thử. Test Case là một chuỗi các bước giúp chúng tôi thực hiện một thử nghiệm nhất định trên ứng dụng. Test Script cũng làm điều tương tự.
Tuy nhiên mỗi trường hợp lại được dùng tùy thuộc vào dự án.


| Test case | Test script | 
| -------- | -------- | 
| Mô tả từng bước của một quy trình được sử dụng để kiểm tra một ứng dụng     | Đây là một bộ hướng dẫn để tự động kiểm tra một ứng dụng     |
| Thuật ngữ Test Case được sử dụng trong môi trường kiểm tra thủ công.     | Thuật ngữ Test Script được sử dụng trong môi trường thử nghiệm tự động hóa.     |
| Test case được thực hiện bằng tay.     | Test script được thực hiện bằng định dạng kịch bản     |
| Test case được phát triển dưới dạng mẫu  | Test script được phát triển dưới dạng kịch bản     |
|  Test case bao gồm ID, dữ liệu thử nghiệm, các bước thử nghiệm, kết quả thực tế, kết quả dự kiến...     | Trong Test Scrip, sử dụng các lệnh khác nhau để phát triển tập lệnh.     |
| Đây là hình thức cơ bản để kiểm tra một ứng dụng theo trình tự.     | Tập lệnh sẽ chạy nó nhiều lần cho đến khi yêu cầu được thay đổi     |



### 3. Sự khác nhau giữa kịch bản thử nghiệm (Test Scenario) và điều kiện thử nghiệm (Test Condition)

* Test Scenario: Đó là một cách để xác định tất cả các cách có thể để kiểm tra một ứng dụng

* Test Condition : Điều kiện kiểm tra là thông số kỹ thuật mà người kiểm tra phải tuân theo để kiểm tra ứng dụng



| Test Scenario | Test Condition | 
| -------- | -------- | 
| Đây là một quá trình để kiểm tra một ứng dụng với tất cả các cách có thể   | Test Condition  là các quy tắc tĩnh cần được tuân theo để kiểm tra một ứng dụng     | 
| Test Scenario là một đầu vào để tạo ra các trường hợp thử nghiệm   | Test Condition đưa ra mục tiêu chính để kiểm tra một ứng dụng     | 
|Test Scenario có thể là một hoặc một nhóm các trường hợp thử nghiệm     | Đó là mục tiêu của các trường hợp thử nghiệm.     | 
| Bằng cách viết các kịch bản, sẽ dễ dàng hiểu được chức năng của một ứng dụng    | Điều kiện kiểm tra rất cụ thể   | 
|Giải thích những gì chúng ta sẽ kiểm tra.     |  Mô tả mục tiêu chính để kiểm tra một ứng dụng.| 

![](https://images.viblo.asia/1329f957-55b1-498a-ab6b-0634b0983beb.png)

Sự hiểu biết rõ ràng về các khái niệm được thảo luận ở trên cùng với sự so sánh của chúng là rất quan trọng đối với mọi Người kiểm thử phần mềm để thực hiện quy trình kiểm thử một cách hiệu quả.