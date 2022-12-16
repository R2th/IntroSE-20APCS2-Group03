- Scrum ủng hộ phương pháp **Whole Team Approach**, theo nghĩa là mọi thành viên trong team phải tham gia vào mọi hoạt động của dự án. Scrum team tự tổ chức với trách nhiệm đưa ra được bản phân phối của dự án. Việc ra quyết định được để lại cho team nhằm đưa ra các hành động thích hợp được thực hiện vào đúng thời điểm mà không bị chậm trể thời gian. Cách tiếp cận này cũng khuyến khích sử dụng đúng đắn tài năng của team thay vì hạn chế một hoạt động. Tester cũng tham gia vào tất cả các hoạt động của dự án và phát triển đóng góp chuyên môn của họ trong việc testing.
- Cả team làm việc cùng nhau Test Strategy, Test Planning, Test Specification, Test Execution, Test Evaluation, and Test Results Reporting.
![](https://images.viblo.asia/29b63db5-a109-435c-b441-04f57d1580fc.jpg)

### 1. Collaborative User Story Creation
- Tester tham gia vào tạo User Story. Tester có thể đóng góp ý kiến của họ về hành vi có thể có của hệ thống. Điều này giúp cho khách hàng và / hoặc end user có thể hiểu được hệ thống trong môi trường thực tế và do đó nhận được sự rõ ràng về những gì họ thực sự muốn. Điều này dẫn đến việc quyết định các yêu cầu nhanh hơn và cũng làm giảm xác suất thay đổi trong các yêu cầu sau này.
- Tester cũng nên đưa ra Acceptance Criteria cho mọi trường hợp được khách hàng đồng ý.

### 2. Release Planning
- Release Planning được thực hiện cho toàn bộ dự án. Tuy nhiên, Scrum framework liên quan đến việc ra quyết định lặp đi lặp lại khi có thêm thông tin trong quá trình thực hiện sprints. Vì thế, Release Planning được phát hành vào đầu dự án không cần phải lập kế hoạch phát hành chi tiết cho toàn bộ dự án. Nó có thể được cập nhật liên tục, vì thông tin liên quan có sẵn.
- Mỗi lần chạy sprint không cần phải có bản release. Một bản release có thể sau một nhóm sprints. Tiêu chí chính của bản release là cung cấp giá trị business cho khách hàng. Team sẽ quyết định về độ dài sprint với release planning làm đầu vào.
- Release Planning là cơ sở của phương pháp thử nghiệm và test plan để release. Testers sẽ estimate effort và lên plan Testing cho việc release. Khi kế hoạch relase thay đổi, Tester phải xử lý các thay đổi, để có được một cơ sở kiểm tra thích hợp xem xét bối cảnh lớn hơn để tiện cho việc release. Testers cũng cung cấp effort testing được yêu cầu ở phần cuối của tất cả các sprints.

### 3. Sprint Planning
- Sprint planning được lập vào thời điểm đầu của sprints. Các sprint backlog được tạo ra với những user stories được chọn từ product backlog để thực hiện trong lần sprints cụ thể đó.
- Tester thì nên:
  + Xác định testability của user stories được chọn cho sprints.
  + Tạo acceptance tests
  + Define test levels
  + Identify test automation

- Tester cập nhật test plan với các estimates cho effort testing và thời lượng trong sprint. Điều này đảm bảo cung cấp đủ thời gian cho các thử nghiệm cần thiết trong thời gian chạy sprints

### 4. Test Analysis
Khi sprints bắt đầu, các Developer sẽ phân tích user story để design và thực hiện, còn tester sẽ thực hiện phân tích thử nghiệm cho user story trong sprint backlog. Tester tạo ra bộ testcase để đảm bảo yểu cầu - cả kiểm tra manual và automated tests.

### 5. Testing
Tất cả các thành viên của Team Scrum nên tham gia testing.
- Developer thực hiện các bài kiểm tra đơn vị (Unit tests) khi họ phát triển code cho các user story của người dùng. Unit Tests được tạo ra trong mỗi lần chạy sprints, trước khi code được viết. Các trường hợp Unit Tests có nguồn gốc từ các thông số kỹ thuật low level.
- Tester sẽ thực hiện các functional và non-functional cho các user story của người dùng.
- Những tester có kinh nghiệm sẽ cố vấn cho các thành viên khác trong scrum team với chuyên môn của họ trong thử nghiệm để toàn bộ team sẽ có trách nhiệm đối với chất lượng của sản phẩm.
- Vào cuối sprint, khách hàng hoặc end user sẽ thực hiện Acceptance Testing   và cung cấp phản hồi cho team scrum. Điều này tạo thành đầu vào cho sprint tiếp theo.
- Kết quả kiểm tra được thu thập và maintained.

### 6. Automation Testing
- Automation testing được đưa nhằm cho thấy tầm quan trọng cao trong Scrum teams. Tester dành thời gian trong việc tạo, thực hiện, giám sát và duy trì các thử nghiệm và kết quả tự động. Khi các thay đổi có thể xảy ra bất kỳ lúc nào trong các dự án scrum,  Tester cần phải kiểm tra các tính năng đã thay đổi và cũng có thể thực hiện regression testing. Automated tests ở tất cả các cấp tạo thuận lợi cho việc tích hợp liên tục. Automated tests chạy nhanh hơn nhiều so với các thử nghiệm manual mà không cần tốn thêm effort.
- Manual testing tập trung nhiều hơn vào kiểm tra thăm dò, lỗ hổng sản phẩm, dự đoán lỗi.

### 7. Automation of Testing Activities
Automation testing làm giảm gánh nặng của công việc lặp đi lặp lại và dẫn đến tiết kiệm chi phí.
- Test Data Generation.
- Test Data Loading.
- Build Deployment into Test Environment
- Test Environment Management
- Data Output Comparison

### 8. Regression Testing
Trong sprint, Tester kiểm tra code mới / modify trong lần chạy sprint đó. Tuy nhiên, tester cũng cần đảm bảo rằng code được phát triển và thử nghiệm trong các sprint trước đó cũng đang hoạt động cùng với code mới. Do đó Regression testing (Kiểm tra hồi quy) được đưa ra tầm quan trọng trong scrum. Các bài kiểm tra hồi quy tự động được chạy khi tích hợp liên tục.

### 9. Agile Testing Practices
Tester trong team Scrum có thể làm theo những điều sau:
- **Pairing**: Hai Thành viên team ngồi lại với nhau và làm việc cộng tác. Hai người có thể là hai Testers hoặc một Tester và một Developer.
- **Incremental Test Design**: Test Cases được phát triển khi tiến trình Sprint tăng dần và User Story được thêm vào.

### 10. Agile Metrics
Trong quá trình phát triển phần mềm, việc thu thập và phân tích các chỉ số giúp cải thiện quy trình và do đó đạt được năng suất tốt hơn, phân phối chất lượng và sự hài lòng của khách hàng. Trong phát triển dựa trên Scrum, Tester cần phải chú ý đến các số liệu mà họ cần. Một số chỉ số được đề xuất cho phát triển Scrum. Các số liệu quan trọng là:
- **Ratio of Successful Sprints**: (Number of successful Sprints / Total number of Sprints) * 100. Một Sprint thành công là khi team có thể đáp ứng cam kết của mình.
- **Velocity**: Vận tốc của một team dựa trên số lượng Story Points mà một đội kiếm được trong sprint. Story Points là thước đo của User Stories của người dùng được tính trong quá trình estimation.
- **Focus Factor**: (Velocity / Team’s Work Capacity) / 100. Focus Factor là tỷ lệ phần trăm effort của team để các stories được hoàn thành.
- **Estimation Accuracy**: (Estimated effort / Actual effort) / 100. Độ estimate chính xác là khả năng của team trong việc ước tính effort một cách chính xác.
- **Sprint Burndown**: Làm việc (trong Story Points hoặc trong giờ), công việc cần được giữ đúng theo estimate (theo ước tính). 
  + Nếu nó là nhiều hơn, có nghĩa là team đã thực hiện nhiều công việc hơn so với ước tính.
  + Nếu nó ít hơn, thì điều đó có nghĩa là team đã không estimate chính xác.
- **Defect Count**: Số lỗi trong Sprint.
- **Severity of Defects**: Lỗi có thể được phân loại là minor, major và critical theo mức độ nghiêm trọng của chúng. Tester có thể xác định phân loại.

### 11. Sprint Retrospectives
- Trong Sprint Retrospectives, tất cả các thành viên trong team sẽ tham gia. Họ chia sẻ:
  + Những điều đã diễn ra tốt đẹp trong 1 sprint vừa qua hay dự án.
  + Đưa ra những số liệu về tiến độ.
  + Phạm vi cải tiến.
  + Những cái gì cần cải tiến cho sprint tiếp theo.

Nguồn Tham Khảo:
- https://www.guru99.com/scrum-testing-beginner-guide.html
- https://www.tutorialspoint.com/agile_testing/agile_testing_scrum.htm