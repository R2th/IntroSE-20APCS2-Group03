# I. Workproducts
![](https://images.viblo.asia/89fdbbd1-78e2-4a9a-a938-965fd23f3b44.jpg)

Test Plan được chuẩn bị lúc làm kế hoạch release và được duyệt lại ở mỗi Sprint. Test Plan hoạt động như một hướng dẫn cho quá trình test để hoàn thành test coverage.
Nội dung cơ bản của một Test Plan là

- Test Strategy
- Test Environment
- Test Coverage
- Scope of Testing
- Test Effort và Schedule
- Testing Tools

Trong các dự án Agile, tất cả các thành viên chịu trách nhiệm về chất lượng của sản phẩm. Do đó, tất cả mọi người tham gia vào lập Test Plan.
Trách nhiệm của tester là cung cấp hướng đi cần thiết và hướng dẫn cho các thành viên còn lại của team với chuyên môn của họ.

## 1. User Stories

![](https://images.viblo.asia/f4146ca8-291b-4c41-9ead-8dd4e4af120e.png)

Theo nguyên tắc user story không phải là phần của công việc test. Tuy nhiên, trong các dự án Agile, các tester tham gia vào tạo user story. Tester viết user story đem lại giá trị cho khách hàng và bao quát các hành vi khác nhau của hệ thống.
Tester cũng đảm bảo rằng tất cả các user story đều có thể test và đảm bảo Acceptance Criteria.

## 2. Manual và Automated Tests

Trong khi chạy test lần đầu tiên, các manual test được sử dụng. Chúng bao gồm:

- Unit Tests
- Integration Tests
- Functional Tests
- Non-Functional Tests
- Acceptance Tests

Các test sau đó được chạy tự động ở các lần chạy tiếp theo.

Trong Test Driven Development, Unit Test được viết đầu tiên fail, code được phát triển và test để đảm bảo các test pass.

Trong Acceptance Test Driven Development, Acceptance Test được viết đầu tiên fail, Code được phát triển và kiểm tra để đảm bảo các test pass.

Trong các phương pháp phát triển khác, các tester cộng tác với các thành viên khác của team để đảm bảo test coverage.

Trong tất cả các phương thức, việc tích hợp liên tục được thực hiện, bao gồm continuous integration testing.

Team có thể quyết định khi nào và những test nào sẽ được tự động hóa. Ngay cả khi tự động hóa các test đòi hỏi công sức và thời gian, kết quả kiểm tra tự động làm giảm đáng kể công sức test lặp đi lặp lại và thời gian trong các lần lặp của dự án Agile. Điều này lần lượt tạo điều kiện cho team chú ý hơn đến các hoạt động cần thiết khác, chẳng hạn như user story mới, những thay đổi, v.v.

Trong Scrum, các lần lặp lại trong khung thời gian. Do đó, nếu không thể hoàn thành việc test các User story trong Sprint, tester có thể báo cáo trong daily meeting mà user story không thể đạt được trạng thái đã done trong sprint đó và do đó cần được giữ cho sprint tiếp theo.

## 3. Test Results

Vì hầu hết các test trong các dự án Agile được tự động hóa, cần thiết phải có các công cụ tạo ra các test result. Tester xem lại test results logs. Test result cần phải được duy trì cho mỗi sprint/release.
Test Summary cũng có thể được chuẩn bị bao gồm:

- Testing Scope
- Defect Analysis
- Regression Testing Status
- Issues và  Corresponding Resolution
- Pending Issues
- Test Strategy
- Test Metrics

## 4. Test Metrics Reports

Trong các dự án Agile, các Test Metrics cho mỗi Sprint bao gồm:

- Test Effort
- Test Estimation Accuracy
- Test Coverage
- Automated Test Coverage
- Số Defects
- Defect Rate (Số bug trên User story point)
- Defect Severity
- Thời gian để fix bug
- Số Defects đã fix
- Acceptance Testing đã hoàn thành

## 5. Sprint Review và Retrospective Reports

Testers cũng đóng góp cho Sprint Review Report và Retrospective. Bao gồm:

- Test Metrics
- Test Result Logs
- Những điểm cần phải improve trong Testing Point of View
- Best Practices
- Lessons Learned
- Issues
- Customer Feedback

# II. Kanban

![](https://images.viblo.asia/cd33e4fd-e404-4ae4-8a90-5823c5a49427.png)

Các hoạt động trong Agile testing có thể được quản lý hiệu quả bằng khái niệm Kanban. Theo đó để việc test chắc chắn được hoàn thành trong thời gian trong vòng lặp / sprint và tập trung vào việc phân phối một sản phẩm chất lượng.

- User story có thể test và hiệu quả trong quá trình phát triển và test trong giới hạn thời gian đã chỉ định.
- WIP (Work-In-Progress) cho phép tập trung vào một lượng giới hạn các user story tại một thời điểm.
- Bảng Kanban thể hiện cho quy trình làm việc một cách trực quan, giúp theo dõi các hoạt động test và các tắc nghẽn, nếu có.
- Hợp tác team trong Kanban cho phép giải quyết các tắc nghẽn khi chúng được xác định mà không cần thời gian chờ.
- Chuẩn bị các test case trước, duy trì bộ test suite trong tiến trình phát triển và nhận lại phản hồi của khách hàng giúp loại bỏ các lỗi trong vòng lặp / sprint.
- Definition of Done (DoD) chỉ ra rằng thế nào là Done một Story, chỉ khi mà test được hoàn thành.

## 1. Testing Activities Trong Phát Triển Sản Phẩm

Trong khi phát triển sản phẩm, các bản release có thể được theo dõi với tính năng bảng Kanban. Các tính năng cho một release cụ thể được dán cho bảng chức năng Kanban để theo dõi trạng thái phát triển một tính năng một cách trực quan.
Các tính năng trong bản release được chia thành các story và được phát triển trong bản release bằng cách tiếp cận hướng agile.
Các hoạt động Agile Testing đảm bảo chất lượng trong mọi bản release và vào cuối tất cả các bản release.


- Những tester tham gia vào tạo User story và do đó đảm bảo:
  +  Tất cả các hành vi có thể có của hệ thống đều được ghi lại bằng các user story và các yêu cầu Non-functional là một phần của user story.
  +  User story có thể test được.
  +  Độ lớn của các user story cho phép phát triển và test được hoàn thành trong vòng lặp.
- Thể hiện task bảng Kanba
  +  Mô tả trạng thái và tiến trình của task
  + Các nút thắt được xác định ngay lập tức khi chúng xảy ra
  + Tạo điều kiện để đo chu kì thời gian mà có thể được tối ưu việc đó

- Cộng tác team giúp
  + Trách nhiệm của toàn bộ team cho chất lượng sản phẩm
  +  Khái quát của nút thắt và khi chúng xảy ra, tiết kiệm thời gian chờ
  +   Sự đóng góp của mọi chuyên môn trong mọi hoạt động

-  Tích hợp liên tục để tập trung vào Continuous Integration Testing
-  Test tự động hóa để tiết kiệm công sức và thời gian test
-  Phòng ngừa khiếm khuyết với các test case được viết trước đó để phát triển và tư vấn cho các developer về những gì được dự đoán bởi các hành vi khác nhau của hệ thống
-  Giới hạn WIP để tập trung vào một số lượng giới hạn các user story tại một thời điểm
-  Continuous Testing trong quá trình phát triển diễn ra, để đảm bảo sửa lỗi trong vòng lặp
-  Đảm bảo phạm vi test
-  Giữ số bug open thấp

## 2. Tìm hiểu story

Tìm hiểu story là thông tin liên lạc trong một team Agile để tìm hiểu về story khi product owner chuyển một story để chấp nhận phát triển.
Product owner sẽ đưa ra story dựa trên chức năng mà hệ thống mong đợi.
Các developer sẽ tìm hiểu nhiều hơn về từng story trước khi họ đánh dấu nó sẵn sàng để thực hiện. Những tester cũng tham gia vào việc giao tiếp từ góc nhìn test để làm cho nó khả thi nhất có thể.
Việc hoàn thiện story dựa trên giao tiếp liên tục giữa product owner, develop và tester.

## 3. Estimation

Việc ước tính diễn ra trong Release planning và mỗi Iteration planning.
Trong release planning, các tester phải đưa ra:

- Thông tin về hoạt động test nào là bắt buộc
- Ước tính công sức như nhau

Trong Iteration planning, những tester đóng góp vào việc quyết định bao nhiêu và story nào có thể đưa vào trong mỗi vòng lặp. Quyết định này phụ thuộc vào Test Effort và Test Schedule Estimation. Story Estimation cũng phản ánh test estimation.
Trong Kanban, Done-Done chỉ được thực hiện khi một story được phát triển, test và đánh dấu là hoàn thành không có lỗi.
Do đó, Test Estimation đóng vai trò chính trong story estimation.

## 4. Story Planning

Lập kế hoạch story bắt đầu sau khi một story đã được estimate và đưa vào vòng lặp hiện tại.

Lập kế hoạch story bao gồm các nhiệm vụ kiểm tra sau:

- Chuẩn bị dữ liệu test
- Mở rộng Acceptance Tests
- Thực hiện test thủ công
- Tiến hành các buổi test exploratory
- Tự động test tích hợp liên tục

Ngoài các task test này, các test khác cũng có thể yêu cầu, chẳng hạn như:

- Performance Testing
- Regression Testing
- Continuous Integration Tests

## 5. Tiến trình story

Story Progression phát hiện các bài test bổ sung được yêu cầu do liên lạc liên tục giữa các developer và tester. Trong các tình huống mà các developer cần rõ ràng hơn về việc triển khai, tester thực hiện test exploratory.

Continuous Testing được thực hiện trong quá trình Story Progression và bao gồm Continuous Integration Testing. Toàn bộ team tham gia vào các hoạt động test.

## 6. Story Acceptance

Story Acceptance xảy ra khi story đạt đến trạng thái Done-Done. Tức là, story được phát triển, test và thông báo là hoàn thành.
Story testing được cho là hoàn thành khi tất cả các test liên quan đến story hoặc mức độ tự động hóa test được đáp ứng.

*Nguồn Tham khảo*
- http://tryqa.com/what-are-project-work-products-in-agile-testing/
- https://abstracta.us/blog/agile-testing/kanban-for-software-testing-teams/
 - https://www.tutorialspoint.com/agile_testing/agile_testing_workproducts.htm