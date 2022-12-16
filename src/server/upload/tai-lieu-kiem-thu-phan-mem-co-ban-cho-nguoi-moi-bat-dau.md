# Loại tài liệu nào là cần thiết trong kiểm thử phần mềm?
##### Requirements: 
![](https://images.viblo.asia/36499fa3-82c7-4053-9f57-fc5dd38e9871.jpg)

Yêu cầu giải thích về nhu cầu của khách hàng để phát triển ứng dụng phần mềm. Không tạo ra các yêu cầu hoặc hiểu các yêu cầu, thì khó có thể lập kế hoạch kiểm thử phần mềm hoặc chiến lược kiểm thử hoặc các trường hợp kiểm thử hoặc kịch bản kiểm thử hoặc ma trận truy nguyên yêu cầu. Thông thường đội ngũ phát triển và đội kiểm thử hiểu được các yêu cầu từ các tài liệu như: Yêu cầu Hệ thống (SRS), Yêu cầu Chức năng (FRS), các trường hợp thảo luận với Chuyên viên Phân tích Kinh doanh và Chuyên gia Quản lý Thông minh (SME Management Experts)

* SRS: Đây là tài liệu có thông tin về hành vi hoàn chỉnh của hệ thống phần mềm. Nó cung cấp thông tin về phần cứng, phần mềm, thiết bị trung gian, yêu cầu chức năng (tổng quan), và các yêu cầu không phải chức năng (tổng quan) vv
* FRS: Đây là tài liệu có thông tin về các yêu cầu. Yêu cầu chức năng được giải thích một cách chi tiết. Trong một số dự án, FRS sẽ bao gồm chính SRS.
* Use cases: Các chức năng của phần mềm được giải thích với mục tiêu, các tác nhân, điều kiện tiên quyết, khóa học bình thường, khóa học bổ sung và khóa học đặc biệt

Lưu ý: Đôi khi, hiểu được yêu cầu là một điều khó khăn bởi vì thông tin chưa đầy đủ trong SRS, FRS, Use cases hoặc không có sẵn các tài liệu đó. Để có thêm kiến thức về miền (thế chấp, bảo hiểm, viễn thông, bán lẻ, kinh doanh dụng cụ tài chính) mà bạn đang làm việc, bạn có thể đọc sách và tìm kiếm trên internet.

### Software Test Plan là gì?

Đây là một tài liệu cung cấp thông tin về kiểm thử và một cách tiếp cận có hệ thống để hoàn thành kiểm thử phần mềm và bàn giao cho việc bảo trì. Kế hoạch kiểm thử tương tự như kế hoạch dự án. Kế hoạch kiểm thử đơn vị, kế hoạch kiểm thử kết hợp, kế hoạch kiểm thử chấp nhận, kế hoạch hệ thống là là một loại khác của kế hoạch kiểm thử được tạo bởi nhóm kiểm thử.

### Software Test Plan bao gồm:

* Những tính năng của dự án phải được kiểm thử.
* Các tính năng của dự án không được kiểm thử (Các tính năng của dự án nằm ngoài phạm vi).
* Các sản phẩm kiểm thử là gì (Test cases, Test Reports, vv ...)
* Các giai đoạn và nhiệm vụ là gì?
* Làm thế nào để lên lịch các giai đoạn và nhiệm vụ? Lập kế hoạch có ý nghĩa khi nó bắt đầu và kết thúc.
* Chiến lược kiểm thử (cách tiếp cận là gì?)

### Test Strategy là gì?
![](https://images.viblo.asia/3806ee09-7367-4f87-b472-e3f3ec723efa.jpg)
Nó mô tả cách tiếp cận kiểm thử để hoàn thành chu kỳ kiểm thử phần mềm. Nó giải thích về các mức kiểm thử (kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử hệ thống và kiểm thử chấp nhận) và ai làm bài kiểm thử cho các cấp độ kiểm thử. Nó cũng giải thích vai trò và trách nhiệm của cả đội.

### Test Cases là gì?
Trường hợp kiểm thử là một tài liệu có chứa 1 hoặc nhiều điều kiện kiểm thử (Test Scenario). Một trường hợp kiểm thử tốt sẽ nắm bắt được sẽ thu được nhiều lỗi hơn để phần mềm hoặc ứng dụng không có lỗi. Kiểm thử các trường hợp được thiết kế dựa trên các điều kiện kiểm thử và chúng được thực hiện bằng tay hoặc tự động. Mỗi yêu cầu sẽ có ít nhất một trường hợp kiểm thử. Thủ tục kiểm thử có thể chạy các trường hợp kiểm thử theo thứ tự tuần tự.

### Test Data:
Bảng tìm hiểu thực tế, bảng tra cứu, bảng lịch sử, bảng XRef, bảng an toàn, các bảng biểu liên quan đến hiệu suất ... có rất ít bảng có trong cơ sở dữ liệu. Để thực hiện kiểm thử, bạn cần một số dữ liệu mẫu được gọi là TEST DATA. Đối với kiểm thử hiệu suất cũng vậy, bạn cần dữ liệu kiểm thử.

### Test Scripts:
Một bộ hướng dẫn được viết bởi ngôn ngữ chương trình (java, .net) hoặc ngôn ngữ kịch bản (FavaScript, Unix Shell Script, VBScript) để thực hiện một số hành động. Các kịch bản kiểm thử được viết bằng tay bởi nhà phát triển hoặc bằng các công cụ tự động.

### Requirement Traceability Matrix:
![](https://images.viblo.asia/4479f294-36b3-4140-b266-0b6382d5cff6.png)
Trong chu kỳ phát triển phần mềm, có những yêu cầu liên quan đến việc phát hành, thiết kế, phát triển và thử nghiệm. Các yêu cầu mới được tạo và cập nhật theo yêu cầu. Yêu cầu Ma trận Truy nguyên là một tài liệu theo dõi các yêu cầu.

### Test Execution Reports là gì?
Đây là một báo cáo chạy về việc thực hiện các trường hợp kiểm thử.
* Có bao nhiêu trường hợp kiểm thử đã được thực hiện?
* Có bao nhiêu trường hợp kiểm thử đã được thông qua?
* Có bao nhiêu trường hợp kiểm thử đã thất bại?
* Bao nhiêu trường hợp kiểm thử đã bị chặn?
* Có bao nhiêu trường hợp kiểm thử đã lỗi?

Nguồn: http://learndatamodeling.com/blog/software-testing-documentation/