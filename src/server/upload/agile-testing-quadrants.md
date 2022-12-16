Như trong trường hợp thử nghiệm truyền thống, Agile Testing cũng cần phải bao gồm tất cả các Test Levels.
- Unit Testing.
- Integration Testing.
- System Testing.
- User Acceptance Testing.

### 1. Unit Testing.
- Hoàn thành với Coding, bởi DEV.
- Được support bởi Tester, người viết Test Cases để đảm bảo tất cả các trường hợp được cover.
- Kết quả của Unit Test Cases và Unit Testing cần được review.
- Các defects cần được giải quyết (theo từng mức độ ưu tiên và mức độ nghiêm trọng).
- Tất cả Unit Tests được kiểm tra tự động.

### 2. Integration Testing.
- Thực hiện Integration liên tục như tiến độ của Sprints.
- Tất cả các yêu cầu Functional được kiểm tra.
- Tất cả các Interfaces giữa các Units được kiểm tra.
- Các thử nghiệm được tự động hóa nếu có thể.

### 3. System Testing.
- Các Users Stories, Features và Functions được kiểm tra.
- Thử nghiệm được thực hiện trên môi trường Production.
- Quality Tests được thực thi (Performance, Reliability, etc...).
- Lỗi được báo cáo.
- Các thử nghiệm được tự động hóa nếu có thể.

### 4. User Acceptance Testing.
- Hoàn thành vào cuối mỗi Sprint và ở cuối dự án.
- Thực hiện bởi khách hàng. Phản hồi được thực hiện bởi Team.
- Feedback sẽ là đầu vào cho Sprint tiếp theo.
- User Stories trong Sprint được xác minh trước để có thể kiểm tra và tuân theo Acceptance Criteria.

### 5. Test Types.
- Component Tests (Unit Tests)
- Functional Tests (User Stories Tests)
- Non-functional Tests (Performance, Load, Stress, etc.)
- Acceptance Tests

Các bài kiểm tra có thể hoàn toàn Manual, hoàn toàn Automated, Kết hợp Manual and Automated hoặc Manual được support bởi Tools.

### 6. Support Programming and Critique Product Tests.
- Supporting Development (Support Programming): Support Programming Tests được thực hiển bởi lập trình viên.
  + Để quyết định code nào họ cần viết để hoàn thành một hành vi nhất định của một Hệ thống.
  + Những thử nghiệm nào cần được chạy sau khi coding để đảm bảo code mới không cản trở phần còn lại của các hành vi của hệ thống.
- Verification only (Critique Product): Critique Product Tests được sử dụng để phát hiện những bất cập trong Sản phẩm đã hoàn thành.

### 7. Business Facing and Technology Facing Tests.
Để quyết định thử nghiệm nào sẽ được thực hiện khi nào, bạn cần xác định xem thử nghiệm có phải là :
- Business Facing Tests (Kiểm thử dựa trên quan điểm khách hàng)
  + Một loại kiểm thử được gọi là kiểm thử trên qua điểm khách hàng nếu nó trả lời các câu hỏi về mặt business. Đây là những hiểu biết của các business experts và họ sẽ quan tâm để hành vi của hệ thống có thể được giải thích trong scenario thời gian thực.
- Technology Facing Tests
  + Còn lập trình viên hiểu những gì cần phải làm dựa trên quan điểm công nghệ.
- Hai kía cạnh của loại kiểm thử có thể dựa trên bài Agile Testing Quadrants của Brian Marick.

### 8. Agile Testing Quadrants
- Là một Matrix để tester đảm bảo đã xem xét các loại test cần thiết để bản giao sản phẩm có giá trị. Q1, Q2 hướng đến test để hỗ trợ nhóm. Q3, Q4 để đánh giá sản phẩm.
- Kết hợp hai khía cạnh của Testing Types, loại kiểm thử có thể dựa trên bài Agile Testing Quadrants của Brian Marick.

![](https://images.viblo.asia/76600e77-7841-416b-bb55-f9e5ceebc044.png)

- Agile Testing Quadrants giúp team xác định, lập kế hoạch và execute testing cần thiết.
  + **Quadrant Q1**: Unit Level, Technology Facing, suport dev. Unit tests  thuộc về Quadrant này, các bài kiểm tra có thể là Automated tests.
  + **Quadrant Q2**: System level, business facing, và conform product behavior. Functional tests thuộc về Quadrant này, các bài testing này có thể là manual or automated.
  + **Quadrant Q3**: System, User Acceptance Level, Business Facing hoặc focus vào thời gian thực khi senarios. User Acceptance Tests  thuộc về Quadrant này, các bài testing này thì Munual test.
  + **Quadrant Q4**: System, Operational Acceptance Level, Technology Facing và Performance, Load, Stress, Maintainability, Scalability Tests. Các công cụ đặc biệt này có thể được sử dụng với automation testing.
- Kết hợp những điều này, Agile Testing Quadrants phản ánh **What-Testing-When** có thể được hình dung như sau:

 ![](https://images.viblo.asia/2cd2a291-a82b-4708-9133-64f4e78fb723.png)
 
###  9. Test Automation & Agile Test Quadrants
- Test Automation được định nghĩa là "Sử dụng một phần mềm đặc biệt (chuyên dùng cho kiểm thử) để điều khiển việc thực thi các testcase và so sánh kết quả thực tế nhận được với kết quả đã dự đoán.
- Agile Test Quadrants (được giới thiệu bởi Brian Marick và được tiếp tục Lisa Crispin phát triển) để hiểu mối quan hệ giữa các hình thức kiểm tra khác nhau bằng cách sử dụng 4 quadrants khác nhau:
- ![](https://images.viblo.asia/551fe3b2-543a-4f56-9f9b-7fafea422012.png)
- Quadrant 1: Kiểm thử hướng công nghệ được hỗ trợ bởi team
- Quadrant 2: Kiểm thử hướng nghiệp vụ được hỗ trợ bởi team
- Quadrant 3: Kiểm thử hướng nghiệp vụ để đánh giá sản phẩm
- Quadrant 4: Kiểm thử hướng công nghệ để đánh giá sản phẩm.
- Sử dụng 4 phần này sẽ giúp bạn hoàn thành mục tiêu liên quan đến việc hỗ trợ nhóm, đánh giá sản phẩm và đáp ứng nhu cầu kinh doanh và công nghệ.


 
 Nguồn Tham Khảo:
 - http://istqbexamcertification.com/what-are-test-pyramid-and-testing-quadrants-in-agile-testing-methodology/
 - https://www.cigniti.com/blog/agile-test-automation-and-agile-quadrants/