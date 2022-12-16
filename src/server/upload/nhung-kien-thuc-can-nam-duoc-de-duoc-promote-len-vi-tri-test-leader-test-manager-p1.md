![](https://images.viblo.asia/9feecdfb-4442-49cd-b050-f77ff8b4ddbb.jpg)

Đã đi làm tester với thâm niên lên đến vài năm rồi mà bạn vẫn lẹt đẹt ở vị trí middle, senior hoặc thậm chí là dậm chân tại chỗ ở vị trí junior. Vậy bạn đã có khi nào tự hỏi làm nào để lên được vị trí cao hơn như là test leader chưa? Chả lẽ cứ sống lâu là được lên lão làng? :laughing: Tất nhiên là KHÔNG rồi, để lên được vị trí leader hoặc cao hơn thì ngoài việc trang bị cho mình một tâm hồn đẹp thì bạn cần phải có cả kiến thức chuyên môn nữa. Và hôm nay mình sẽ điểm qua một số kiến thức cơ bản mà bạn cần nắm được nếu muốn lên làm Test Leader / Test Manager. Do topic này khá dài nên bài viết sẽ được chia ra làm 2 phần.

**1) Trách nhiệm của một Test Manager:**

Khi đảm nhận vai trò QA Manager thì bạn sẽ phải có trách nhiệm:

* Quản lý dự án từ khi bắt đầu chạy cho đến khi đóng dự án
* Làm test planning
* Review và approve các phần bàn giao, các bản release cho khách hàng
* Estimate và báo cáo effort với độ chính xác cao
* Quản lý các issue
* Quản lý và training cho off-shore team
* Gửi report tuần\report tháng cho PM hoặc Division manager
* Tham gia các buổi meeting, review
* Đánh giá KPI cho tất cả các dự án hàng tháng
* Quản lý \ điều phối test resource cho các dự án

**2) Cách xử lý nếu nhận được một bản release và trong quá trình test thì phát hiện lỗi nặng:**

Với vai trò của test leader thì bạn nên:

* Yêu cầu dừng việc test để tránh làm tốn effort
* Reject bản build và yêu cầu team dev check lại
* Check lại các Acceptance criteria và yêu cầu chặt chẽ hơn
* Check lại Test cases xem thiếu sót ở đâu và thực hiện bổ sung, chú ý đến các invalid case, negative case
* Đánh giá lại các tiêu chí cho show stopper issue và khi nào thì reject bản build

**3) Requirement Traceability Matrix:**

Requirement Traceability Matrix (ma trận truy xuất requirement) là một tài liệu dùng để link các requirement tới từng test case để đảm bảo:

* Đảm bảo tất cả requirement của khách hàng đều được test
* Để check Test Coverage

Dưới đây là một ví dụ về RTM bao gồm:

* Requirement ID
* Requirement Type and Description
* Test Cases with Status

![](https://images.viblo.asia/d6f90af2-71e6-43ae-929e-080028ae6e7c.png)

**4) Cách lựa chọn testing tool cho dự án:**

* Xác định các tính năng cần phải có của testing tool dựa theo nhu cầu của dự án
* Đánh giá các công cụ trả phí và free đáp ứng đủ các tiêu chí
* Ước tính chi phí và lợi ích của công cụ (Chi phí có thể bao gồm cả chi phí để training sử dụng testing tool và các bằng cấp giấy tờ liên quan)
* Tham khảo ý kiến của các thành viên trong team

**5) Những khó khăn, thách thức trong quá trình test:**

Những key challenges của ngành software testing nói chung bao gồm:

* Testing phase thường bị hạn chế về thời gian
* Hiểu được spec\requirement của dự án đôi khi có thể là một thách thức (vì thiếu nghiệp vụ về lĩnh vực đó, vì rào cản ngôn ngữ, vì requirement viết khó hiểu và dàn trải ở nhiều nơi, ...)
* Bản build phải đủ ổn định để test được
* Đặt Priority cho các mục test
* Thiếu tester có kinh nghiệm
* Regression Testing đôi khi có thể phức tạp và tốn nhiều effort
* Spec\requirement thường xuyên thay đổi
* Thiếu tool, nhân lực và thiếu thời gian để training

**6) Test Plan:**

Test plan cần xác định được các yếu tố sau:

* Test scope
* Test method
* Test process
* Test resource
* Các tính năng cần được test và không cần phải test
* Test tool, test environment.

Test plan là cơ sở để test các sản phẩm / phần mềm trong một dự án.

**7) Các loại test plan:**

 Có 3 loại Test Plan chính:

* Master Test Plan
* Testing level specific Test Plan
* Testing type specific test plans

**8) Test Manager cần có những skill gì?**

![](https://images.viblo.asia/2d967f48-ee09-4695-a9a1-e158a8b2f941.jpg)

* Kỹ năng giao tiếp (hiệu quả, rõ ràng)
* Kỹ năng xây dựng mối quan hệ với team member
* Kỹ năng lắng nghe tốt và chỉ số EI (emotional intelligence) cao
* Biết cách để motivate team member
* Kỹ năng xử lý và giải quyết conflicts và các issue

**9) Configuration Management là gì?**

Quản lý cấu hình (Configuration Management) bao gồm các quy trình được sử dụng để điều phối, kiểm soát và theo dõi các test artifacts.

Các test artifacts có thể bao gồm automation Code, requirements, documentation, problems, designs, change requests, designs, ...

**10) Mô hình PDCA:**

PDCA là một phương pháp để cải thiện Test Process. Nó là viết tắt của:

Plan: Xác định được các improvement và đặt target
Do: Thực hiện các improvement
Check: Check kết quả của improvement
Act: Bài học rút ra từ kết quả này

(còn nữa...)

Reference:
https://www.guru99.com/top-20-test-manager-interview-questions.html