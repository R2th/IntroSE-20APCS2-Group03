Test status có thể được truyền đạt bằng cách:
- Trong daily meeting.
- Sử dụng các công cụ quản lý kiểm tra tiêu chuẩn.
- Qua những người quản lý.
- Test status được xác định bởi trạng thái của status, trạng thái của status rất là quan trọng bởi vì cho chúng ta biết được task đó đã được "Done" hay chưa?. "DONE" có nghĩa tất cả các bài kiểm tra đã passed.
-

### 1. Test Progress
Test Progress có thể được theo dõi bằng cách sử dụng :
- Scrum Boards (Agile Task Boards)
- Burndown Charts
- Automated Test Results

Test Progress cũng có tác động trực tiếp đến tiến độ phát triển.  Because khi User story được moved đến cột "Done" sau khi đã passed qua Acceptance Criteria. 
Nếu có sự chậm trễ hoặc blockages trong quá trình thử nghiệm, toàn bộ team sẽ  thảo luận và làm việc hợp tác để giải quyết vấn đề đó.
Trong Agile Projects, thay đổi diễn ra khá thường xuyên. Khi có nhiều thay đổi xảy ra, chúng ta có thể mong đợi rằng Test Status, Test Progress và Product Quality sẽ phát triển liên tục. Agile testers cần phải thu thập thông tin đó cho team để có thể đưa ra các quyết định phù hợp vào đúng thời điểm để theo đúng tiến độ cho mỗi lần lặp. 

Khi những thay đổi xảy ra, chúng có thể ảnh hưởng đến các tính năng hiện có từ lần lặp lại trước đó. Trong những trường hợp như vậy, các bài kiểm tra manual và automated test phải được cập nhật để xử lý có hiệu quả với regression risk. Regression testing cũng là cần thiết.

### 2. Product Quality
Các chỉ số Product Quality bao gồm:
- Tests Pass / Fail
- Defects Found / Fixed
- Test Coverage
- Test Pass/Fail Rates
- Defect Discovery Rates
- Defect Density 

Tự động thu thập và báo cáo số liệu chất lượng sản phẩm giúp trong -
- Duy trì sự minh bạch.
- Thu thập tất cả các số liệu có liên quan và bắt buộc vào đúng thời điểm.
- Báo cáo ngay lập tức mà không có sự chậm trễ thông tin.
- Cho phép tester tập trung vào việc testing.


Để đảm bảo chất lượng sản phẩm tổng thể, nhóm Agile cần nhận được feedback của khách hàng về việc sản phẩm đáp ứng được mong đợi của khách hàng hay không. Điều này cần được thực hiện vào cuối mỗi lần lặp và feedback sẽ là đầu vào cho các lần lặp tiếp theo.

### 3. Key Success Factors
Những điểm sau đây cần được xem xét để thành công của Agile testing:
- Agile testing dựa trên các phương pháp test first và liên tục thử nghiệm. Do đó, các công cụ kiểm tra truyền thống, được xây dựng trên phương pháp tiếp cận test-last, có thể không phù hợp. Do đó, trong khi lựa chọn Testing Tools trong các dự án Agile, sự liên kết đến kiểm thử Agile cần phải được xác minh.
- Giảm tổng thời gian thử nghiệm bằng cách tự động kiểm tra trước đó trong vòng đời phát triển.
- Agile testers cần phải duy trì tốc độ để phù hợp với release schedule. Do đó, lập kế hoạch, theo dõi và lập kế hoạch lại các hoạt động thử nghiệm cần được thực hiện với chất lượng sản phẩm như là mục tiêu.
- Sự tham gia của những người testers có chuyên môn trong suốt vòng đời phát triển làm cho toàn bộ team tập trung vào chất lượng sản phẩm đáp ứng được sự mong đợi của khách hàng
  + Xác định các user stories bằng cách nhấn mạnh đến hành vi sản phẩm mong đợi của end users. 
  + Xác định các Acceptance Criteria ở user story / task level của người dùng theo yêu cầu của khách hàng.
  + Effort và thời gian cho các hoạt động thử nghiệm.
  + Lập kế hoạch hoạt động testing.
  + Phối hợp với nhóm Dev để đảm bảo sản phẩm đáp ứng yêu cầu với design.
  + Test first và liên tục để đảm bảo rằng tình trạng đã hoàn thành đạt được đáp ứng các acceptance criteria vào thời gian dự kiến. 
  + Đảm bảo kiểm tra ở tất cả levels trong sprint.
  + Regression testing vào cuối sprint.
  + Thu thập và phân tích số liệu sản phẩm để đảm bảo cho sự thành công của dự án.
  + Phân tích các defects để xác định những gì cần phải được fix trong Sprint hiện tại và có thể được trì hoãn để Sprints tiếp theo.
  + Tập trung vào những gì quan trọng từ quan điểm của Khách hàng.
  
  
 Lisa Crispin đã xác định bảy yếu tố chính cho thành công Kiểm tra Agile 
 - **Whole Team approach**:  Trong cách tiếp cận này, các nhà phát triển đào tạo các tester và các tester sẽ đào tạo các thành viên khác trong nhóm. Điều này giúp mọi người hiểu được mọi công việc trong dự án, qua đó hợp tác và đóng góp sẽ mang lại lợi ích tối đa. Sự cộng tác của tester với khách hàng cũng là một yếu tố quan trọng để thiết lập những mong đợi của họ ngay từ đầu và đưa các acceptance criteria đến yêu cầu để pass các bài kiểm tra.
 - **Agile Testing Mindset**:  Các tester nên chủ động liên tục để nâng cao chất lượng và cộng tác liên tục với các thành viên còn lại.
 - **Provide and Obtain Feedback**: Vì đây là giá trị cốt lõi của Agile, toàn bộ team nên được open để nhận feedback. Vì những tester là các nhà cung cấp dịch vụ feedback chuyên gia, cần tập trung vào các thông tin cần thiết và thông tin quan trọng. Đổi lại, khi thu thập thông tin feedback nên có sự thay đổi và kiểm tra các trường hợp thử nghiệm.
 - **Collaborate with Customers** : Liệt kê các ví dụ, hiểu và kiểm tra các yêu cầu tương ứng với hành vi của sản phẩm, thiết lập các Acceptance Criteria, thu thập thông tin feedback.
 - **Automate Regression Testing**: Bắt đầu bằng những cái đơn giản, và cho phép nhóm chọn tools. Hãy săn sàng cung cấp lời khuyên cho team.
 - **Build a Foundation of Core Agile Practices**: Tập trung vào việc testing bên cạnh việc coding, integration liên tục, môi trường thử nghiệm, working từng bước, chấp nhận thay đổi.
 - **Look at the Big Picture**: Thúc đẩy phát triển với business-facing tests và  sử dụng dữ liệu thực tế.
 
 Nguồn Tham khảo:
 - https://www.slideshare.net/kmstechnology/introduction-to-agile-software-testing
 - https://www.telerik.com/blogs/6-key-steps-to-successful-agile-testing-projects