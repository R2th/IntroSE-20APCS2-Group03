# 1. Mục tiêu
Phân tích requirements là quá trình xác định mong muốn của người dùng đối với ứng dụng, liên quan đến tất cả các nhiệm vụ được thực hiện để xác định nhu cầu của các bên liên quan. Các công việc chính của phân tích requirements bao gồm phân tích, lập tài liệu, xác định và quản lý các requirements của phần mềm hoặc hệ thống.  Do đó, mục tiêu của phân tích yêu cầu bao gồm:
- Hiểu về các loại tài liệu yêu cầu phần mềm
- Biết cách phân tích tài liệu yêu cầu phần mềm dành cho QA
- Biết cách tạo tệp Q&A và quản lý thay đổi yêu cầu
# 2. Yêu cầu phần mềm
## 2.1 Mục đích của tài liệu yêu cầu phần mềm
Mô tả hành vi đối tượng trong sản phần phần mềm
Yêu cầu mà sản phẩm cần đạt được, bao gồm yêu cầu chức năng và yêu cầu phi chức năng.
## 2.2 Một số loại tài liệu yêu cầu phần mềm
Data dictionary and glossary: giải thích các thuật ngữ, từ điển riêng biệt
UI/UX: Tài liệu về giao diện của hệ thống
Prototype
Use case diagrams
SRS
Guideline
Business rule diagram
Data flow diagram
Functional requirement
Non-functional requirement
User stories
# 3. Tầm quan trọng của phân tích yêu cầu trong kiểm thử phần mềm
![](https://images.viblo.asia/1027e3c6-636f-492b-b692-f2344875775d.png)
Hình ảnh minh họa trên minh họa sự khác nhau của yêu cầu phần mềm khi khách hàng giải thích, quản lý dự án hiểu, người thiết kế phân tích, nhà lập trình phát triển, bên nhân viên quảng cáo tiếp thị, tài liệu dự án ghi lại, khi cài đặt, khách hàng phải trả số tiền, tính năng sản phẩm được support thực tế, khách hàng cần. Ở đây, dự án này đã bị hỏng do requirement không thống nhất, chưa được hiểu rõ.

![](https://images.viblo.asia/93d63645-8387-4da6-a28d-cd13372c1c06.png)
Ở hình ảnh trên, minh họa rằng lỗi phần mềm được phát hiện càng sớm thì chi phí và thời gian sửa càng thấp.
Lợi ích của phân tích yêu cầu đối với QA:
* Tránh lỗi trong yêu cầu
* Đưa ra gợi ý để thay đổi chất lượng sản phẩm
* Giúp QA đưa ra danh sách tất cả trường hợp kiểm thử có thể dựa trên yêu cầu
* Ngăn chặn lỗi từ giai đoạn sớm
* Tiết kiệm thời gian và ngân sách trong phát triển phần mềm
# 4. Cách phân tích tài liệu yêu cầu với QA
## 4.1 Tiếp cận tổng quan hệ thống
Tham gia họp trao đổi hiểu biết về dự án, hiểu về khách hàng và dự án, hiểu tổng quan về ngữ cảnh và doanh nghiệp.
## 4.2 Nghiên cứu đặc tả chức năng/ use case
Tự nghiên cứu và nghiên cứu theo logic kinh doanh, đảm bảo hiểu, tập trung vào luồng hoạt động, ngữ cảnh trên biểu đồ, tập trung vào màn hình và các thuộc tính, nghiên cứu đặc tả usecase.
## 4.3 Nghiên cứu đặc tả GUI
Doanh nghiệp, quy tắc doanh nghiệp, thuộc tính màn hình (format, mandatory, validation rules, default, ...), source, luồng màn hình: biểu đồ và text, business rules.
## 4.4 Yêu cầu kỹ thuật
Interface, database fields/tables, yêu cầu phi chức năng, …
# 5. Q&A file
## 5.1 Q&A file là gì?
Q&A là viết tắt của Question and Answer, tệp này bao gồm tất cả các câu hỏi và câu trả lời về dự án như yêu cầu, coding, thiết kế, …
Khi nghiên cứu yêu cầu khách hàng, nếu có bất kì câu hỏi nào chúng ta cần ghi chú lại vào file Q&A, file Q&A là nhật kí quan trọng.
## 5.2 Cách tạo file Q&A
* Một vài trường quan trọng cần có trong file Q&A bao gồm: Reference, ScreenID, Title, Question, Answer, Priority, Create date, Create by, Assign to, Status, …
* Mẫu câu hỏi trong file Q&A: Loại câu hỏi thường là multiple choice question, yes/no question
Ví dụ:
Should we …?
I have a question below regarding function A, … Could you please confirm?
From my point of view, … Do you agree?
# 6 Thay đổi yêu cầu (CR)
## 6.1 Khái niệm
Một thay đổi yêu cầu là sự thay đổi trong requirement, có thể là cải tiến giao diện người dùng, thay đổi logic nghiệp vụ hay thay đổi cấu trúc cơ sở dữ liệu, …
Tất cả mọi người (QA, Lập trình viên, PM, BA, Khách hàng, ...) có thể tạo một thay đổi.
## 6.2 Quy trình thay đổi yêu cầu
* Đưa lên một thay đổi yêu cầu => Đánh giá thay đổi yêu cầu => Đưa quyết định => Thực thi sự thay đổi
* Đưa lên một yêu cầu thay đổi: ai gửi yêu cầu và gửi như thế nào, khi nào thay đổi yêu cầu được cho phép, ai có thể đưa ra thay đổi yêu cầu, phương pháp giao tiếp
* Đánh giá yêu cầu thay đổi: ai liên quan tới đánh giá ảnh hưởng, tác động gì, đưa ra những ảnh hưởng và mức độ ưu tiên
* Đưa ra quyết định: ai là người đưa ra quyết định, thông tin gì được review, những quyết định được tạo và giao tiếp như thế nào
* Thực thi thay đổi: khi nào thay đổi được kết hợp, tài liệu nào cần được sửa lại, ai cần được liên quan.
# 7. Kết luận
Như vậy, một dự án có thành công hay không phụ thuộc vào nhiều yếu tố, trong đó yếu tố cực kỳ quan trọng đó là phân tích các yêu cầu của dự án khi chúng bắt đầu được thực hiện cũng như trong suốt vòng đời của dự án. Phân tích yêu cầu giúp giữ các yêu cầu phù hợp với nhu cầu của doanh nghiệp. Một quy trình phân tích yêu cầu tốt sẽ đưa ra một ứng dụng phần mềm phục vụ cho các mục tiêu mà doanh nghiệp đặt ra.

Link tham khảo:
https://www.guru99.com/learn-software-requirements-analysis-with-case-study.html
https://viblo.asia/p/nhung-dieu-co-ban-ve-phan-tich-requirements-ByEZkvvEKQ0