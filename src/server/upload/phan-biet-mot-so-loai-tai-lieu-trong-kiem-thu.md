# 1. Test strategy

![](https://images.viblo.asia/b221322f-160f-45d3-bccf-69dcf744b9af.jpg)


Test stragtegy thuộc loại high level document thường được tạo bởi project manager. Tài liệu này define  “Software Testing Approach” để đạt được Test objectives
Test strategy thường được dựa trên tài liệu Business Requirement Specification để tạo. 
Khác với test plan, test strategy thuộc loại static document. Nó có nghĩa là tài liệu này không phải update thường xuyên. Nó thiết lập các tiêu chuẩn cho testing process, activity và các loại document. Ví dụ như test plan bao gồm các thành phần được thiết kế trên các tiêu chuẩn định nghĩa trong test strategy
Một vài công ty có thể gộp Test Approach hoặc test Stratery trong Test Plan. Cách làm này thường phổ biến và ok trong các project nhỏ. Tuy nhiên với project lớn sẽ có một tài liệu Test strategy độc lập với các tài liệu Test Plan cho mỗi phase hoặc test level

Một tài liệu test Strategy thường bao gồm những thành phần sau:
Scope and Objectives
Business issues
Roles and responsibilities
Communication and status reporting
Test deliverables
Industry standards to follow
Test automation and tools
Testing measurements and metrices
Risks and mitigation
Defect reporting and tracking
Change and configuration management
Training plan

# 2. Test plan

![](https://images.viblo.asia/581f64bb-01ca-4be4-a93c-93d9d743661d.png)


Test Plan khác với Test strategy, nó được base từ Product Description, Software Requirement Specification SRS, or Use Case Documents.
Test Plan do Test lead hoặc Test Manager. Test Plan tập trung mô tả what to test, how to test, when to test, who will do what test.
Ngoài ra, có một cách thức không phổ biến lắm đó là sẽ tạo một Master Test Plan sau đó tạo Test Plan cho mỗi test phase tương ứng
Đã có rất nhiều tranh cãi xung quanh việc liệu Test Plan có phải là static document như Test strategy đã đề cập phía trên không hay nó cần cập nhật liên tục để phản ánh những thay đổi dựa theo định hướng và hoạt động trong project

Theo ý kiến của riêng cá nhân tôi, khi testing phase bắt đầu, Test Manager sẽ controlling activity, test plan nên được update để phản ánh bất kì những thay đổi so với plan ban đầu. Sao đó, plaing and control tiếp các hoạt động khác trong test process

**Test Strategy bao gồm các thành phần sau:**
* Test Plan id
* Introduction
* Test items
* Features to be tested
* Features not to be tested
* Test techniques
* Testing tasks
* Suspension criteria
* Features pass or fail criteria
* Test environment (Entry criteria, Exit criteria)
* Test deliverables
* Staff and training needs
* Responsibilities
* Schedule

Trên đây là tiêu chuẩn để tạo test plan và test strategy tuy nhiên những điều trên có thể thay đổi giữa các công ty với nhau

# 3. Test Policy

![](https://images.viblo.asia/ee4480dc-cd28-410f-ae20-b1d389f8a63a.jpg)


Test Policy là high level document và nó thường được coi là tài liệu cấp cao nhất trong hệ thống tài liệu của test

Mục tiêu của Test Policy để đại diện cho triết lý của công ty nhằm đưa ra một hướng đi cho bộ phần testing để tuân thủ và follow. Nó thường được đưa vào cho các dự án mới hoặc công việc maintain

Một test policy được thiết lập một cách hợp lý bởi các senior manager, cung cấp một framwork mạnh trong việc thực hành và triển khai hoạt động kiểm thử. Nó sẽ giúp đảm bảo tối đa hóa giá trị đến từ chiến lược vốn có của mỗi dự án

**Nội dung của test policy:**

**1. Definition of Testing: Định nghĩa khái niệm testing**

Mỗi tổ chức cần định nghĩa một cách rõ ràng tại sao họ cần testing. Điều này thực sự ảnh hưởng đển các tài liệu và kĩ thuật test được lựa chọn bởi test manager trong các dự án, ở các level
Từ việc hiểu được tại sao việc kiểm thử lại cần thiết, cũng như mục đích của việc kiểm thử là gì trong tổ chức. Nếu như không định nghĩa rõ được những điều này, những nỗ lực kiểm thử sẽ gần như là thất bại. Ví dụ về một định nghĩa/mục tiêu ngắn gọn có thể như sau: “ensuring the software fulfills its requirements” - "đảm bảo phần mềm đáp ứng đủ các yêu cầu như requirement mô tả"

**2. Đinh nghĩa test process**

Việc xác định test process thực sự quan trọng. Xác định test process sẽ trả lời các câu hỏi: giai đoạn nào, nhiệm vụ nào bao gồm trong quá trình test, vai trò nào sẽ được tham gia, cấu trúc tài liệu liên quan đến từng task, test level nào sẽ được bao gồm?
Ví dụ: “all test plans are written in accordance with company policy” - Các kế hoạch kiểm thử được viết dựa trên test policy của công ty

**3. Test Evaluation:**

Làm thế nào chúng ta sẽ đánh giá kết quả thử nghiệm, chúng ta sẽ sử dụng những biện pháp nào để đảm bảo hiệu quả thử nghiệm trong dự án? Phần test evaluation sẽ trả lời cho mọi người câu hỏi này. Việc xác định evaluation sẽ cho giúp đội kiểm thử có thể dựa vào đó để xác định hoạt động test đã đủ điều kiện để dừng lại chưa

Ví dụ:  “effect on business of finding a fault after its release”

**4. Quality Level to be achieved:**

Phần này trả lời cho câu hỏi: những tiêu chí chất lượng nào sẽ được kiểm tra và mức chất lượng nào là hệ thống cần thiết để đạt được trước khi phát hành liên quan đến các tiêu chí này?

Ví dụ: Không có lỗi nghiêm trọng nào nổi bật trước khi phát hành sản phẩm

**5. Cách tiếp cận để cải tiến quy trình kiểm tra**

Tần suất và thời gian chúng ta sẽ đánh giá tính hữu ích của các quy trình hiện tại và những yếu tố nào cần cải thiện và các kỹ thuật sẽ được sử dụng để cải thiện các quy trình. Ví dụ: Các cuộc họp đánh giá dự án được tổ chức sau khi hoàn thành dự án

Nguồn: https://devqa.io/test-strategy-and-test-plan/