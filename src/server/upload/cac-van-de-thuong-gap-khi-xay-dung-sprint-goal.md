### 1. Sprint Goal là gì?
Sprint Goal là mục tiêu mà Scrum Team cần đạt được khi kết thúc sprint, được Product Owner & Development Team thảo luận & thống nhất trong buổi Sprint Planning. Từ Sprint Goal & velocity, Development Team chọn ra các Backlog Item để thực hiện trong Sprint. 

Một Sprint Goal đầy đủ sẽ trả lời 3 câu hỏi:
* Tại sao chúng ta cần thực hiện sprint này? (ex. để hoàn thành 1 chức năng, để xử lý triệt để 1 rủi ro). 
* Làm thế nào để đội dự án đạt được Sprint Goal?
* Các metrics nào được áp dụng để đánh giá deliverables? (ex. nếu sprint goal là cải thiện performance, thì các metrics nào cần sử dụng để đánh giá mức độ cải thiện đã đạt yêu cầu hay chưa)

Trong các buổi Daily, Development Team sẽ liên tục kiểm tra (inspect) tiến độ so với Sprint Goal, phát hiện & xử lý các khó khăn để tối đa hóa khả năng hoàn thành Sprint Goal. Có thể nói, Sprint Goal là kim chỉ nam cho hoạt động của Development Team & là thước đo đầu tiên để đánh giá kết quả công việc của Team. 

Cần lưu ý, Sprint Goal là 1 statement thể hiện giá trị mà Development Team sẽ đạt được sau khi hoàn thành Sprint. Dựa vào Sprint Goal, Development Team sẽ chọn ra các Product Backlog Item cho Sprint Backlog. Ví dụ:
* Cải thiện giao diện trang sản phẩm chi tiết, mục tiêu tăng X% conversion rate  
* Cải thiện X% thời gian load trang 
* Xây dựng hệ thống báo lỗi tự động để cải thiện chất lượng sản phẩm 

Một số vai trò khác của Sprint Goal đối với Development Team 
* Tạo độ linh hoạt nhất định: Development Team không nhất thiết phải hoàn thành hết tất cả task trong Sprint Backlog mới được coi là hoàn thành Sprint Goal. Trong quá trình phát triển, có thể phát sinh một số tasks mất nhiều thời gian hơn dự kiến, một số tasks khác không còn thích hợp với Sprint Goal; Development Team có thể trao đổi với Product Owner để tập trung vào các tasks đem lại nhiều giá trị nhất, vẫn đảm bảo được việc hoàn thành Sprint Goal dù Team hoàn thành ít chức năng hơn so với dự kiến. Ví dụ nếu Sprint Goal là "Người dùng có thể đăng nhập bằng Email & tài khoản mạng xã hội", Team vẫn có thể hoàn thành Sprint Goal dù không thể hoàn thành chức năng Thiết lập mật khẩu mới - vốn nằm trong Sprint Backlog.  
* Phát huy tinh thần teamwork: với Sprint Goal, Development Team làm việc & hướng tới một mục tiêu duy nhất, thay vì chạy theo nhiều yêu cầu, chức năng & hoạt động phân mảnh. 
* Giúp Team làm việc tập trung: thay đổi trong Sprint Backlog sẽ ảnh hưởng tới khả năng hoàn thành Sprint Goal của Development Team. Vì vậy, khi có yêu cầu thay đổi, Development Team cần điều tra xem thay đổi này có cần thiết để hoàn thành Sprint Goal không. Nếu không, yêu cầu cần được đưa vào Product Backlog & đánh giá sau. Việc này tránh cho Development Team bị xao nhãng vì những tasks không liên quan Sprint Goal.

### 2. Những khó khăn, vấn đề thường gặp khi xây dựng Sprint Goal

**a. Không có Sprint Goal, hoặc Sprint Goal là một danh sách các tasks cần hoàn thành** 

Đây có thể là hai vấn đề mà Scrum Team thường hay gặp phải nhất. Ví dụ về Sprint Goal dưới dạng một danh sách các tasks:
* Hoàn thành chức năng đăng nhập, tìm kiếm, lọc sản phẩm  
* Hoàn thành các ticket #100, #101, #102 
* Hoàn thành chức năng A, & 3 critical bugs 

Như đã giới thiệu ở phần 1, thì Sprint Goal (1) là một statement về giá trị cần đạt được sau khi hoàn thành Sprint, (2) chỉ hướng tới một mục tiêu duy nhất, (3) được xác định trong Sprint Planning, Development Team sẽ dựa vào Sprint Goal để xác định Sprint Backlog. Một Sprint Goal như ví dụ trên sẽ khiến Development Team hoạt động phân mảnh (thực hiện nhiều chức năng trong một Sprint), khó có tiếng nói chung, khó phát huy teamwork, & hướng Development Team hoạt động theo task, kế hoạch (outcome-oriented) thay vì hướng giá trị (value-oriented) như Scrum mong muốn. 

Một số nguyên nhân dẫn đến việc Scrum Team không có Sprint Goal, hoặc Sprint Goal dưới dạng danh sách công việc
* **Product Owner ít kinh nghiệm** làm việc với Scrum, hoặc **không có product vision**, không thực sự có **quyền quyết định đối với Product Backlog**; có thể Product Owner chỉ nhận yêu cầu chức năng từ các stakeholder khác & đẩy cho Development Team theo thứ tự ưu tiên 
* **Scrum Team quá lớn** để có thể cùng triển khai một mục tiêu trong một sprint, nên Product Owner phải đưa nhiều mục tiêu vào mỗi Sprint để không bị dư thừa nguồn lực nhàn rỗi
* Cùng một **Scrum Team làm việc cho nhiều sản phẩm**, nhiều dự án cùng một lúc, khiến việc xác định Sprint Goal trở nên khó khăn 
* **Độ dài Sprint không hợp lý**. Sprint quá ngắn để Development Team hoàn thành một Sprint Goal; hoặc Sprint quá dài khiến việc Product Owner phải đưa nhiều mục tiêu vào mỗi Sprint  
* **Scrum Team được chia theo Component Team** (ví dụ. Team Backend, Front-end, QA là 3 Scrum Team). Lúc này, việc hoàn thành được một mục tiêu cần sự góp sức của nhiều Scrum Team. Do đó, rất khó xác định Sprint Goal đầy đủ, có ý nghĩa riêng cho từng Scrum Team 
* Trong buổi Sprint Planning, thay vì xác định Sprint Goal để từ đó xây dựng Sprint Backlog, **Scrum Team chọn ra Sprint Backlog Item vừa đủ velocity, & coi đó là Sprint Goal.** Đây là cách làm ngược. 
* **Đặc thù công việc, dự án** của một số Scrum Team không hoạt động theo hướng xây dựng giá trị để có thể áp dụng Sprint Goal. Ví dụ, IT Support Team làm công việc vận hành (daily operation), hoặc Development Team trong giai đoạn maintain sản phẩm, Product Backlog lúc này chỉ có Bugs & yêu cầu vận hành từ khách hàng, không có yêu cầu phát triển hệ thống mới.  

Lời khuyên để cải thiện tình huống này
* Scrum Master cần giúp đỡ Product Owner xây dựng product vision & hướng dẫn Product Owner xây dựng Sprint Goal hướng giá trị
* Scrum Master dùng 9 Whys để giúp Product Owner hiểu rõ hơn các yêu cầu, mục tiêu mình định đưa cho Development Team 
* Scrum Master giúp Product Owner xây dựng một template để định nghĩa Sprint Goal 
* Bắt đầu mỗi Scrum event bằng việc nhắc lại Sprint Goal 
* Nháp Sprint Goal cho Sprint tiếp theo sau khi thu thập các feedback từ buổi Sprint Review

**b. Sprint Goal quá lớn**

Đôi lúc, để đạt được Sprint Goal, Development Team cần dành toàn bộ effort để thực hiện Sprint Backlog & không còn dư thừa nguồn lực cho bất cứ một phát sinh mới nào trong Sprint. Ví dụ:
* Trong quá trình phát triển, một vài tasks phức tạp hơn so với dự kiến
* Một số bugs trên production cần xử lý ngay lập tức
* Một vài thành viên trong Team nghỉ ốm đột xuất 
* Product Owner yêu cầu deliver gấp một chức năng "nho nhỏ" nào đó vì đã hứa với stakeholder 

Lúc này, khả năng rất lớn là Development Team sẽ thất bại trong việc hoàn thành Sprint Goal. 
Lời khuyên để cải thiện tình huống này
* Thường xuyên thực hiện Backlog Refinement để Development Team có nhiều thời gian tìm hiểu Backlog Item trước khi bước vào Sprint Planning, bởi rất nhiều Backlog Item cần thời gian nghiên cứu, không thể đưa ra estimation chính xác trong timebox của một buổi Sprint Planning.
* Bẻ nhỏ các Backlog Item, giúp việc planning & estimate chính xác hơn 
* Trong lúc Planning, luôn luôn dành một phần thời gian trong Sprint để xử lý những phát sinh đột xuất 

**c. Qúa trình phát triển không tập trung vào Sprint Goal**

Nếu chỉ thảo luận về Sprint Goal trong buổi Sprint Planning, Development Team sẽ dễ dàng quên mất mục tiêu, bị xao nhãng, & dành effort vào những công việc phát sinh không giúp họ đạt được Sprint Goal như đã đề ra. Sau buổi Sprint Planning, cần đảm bảo tất cả thành viên của Development Team đã nắm rõ Sprint Goal; Product Owner có thể gắn lên bảng, hoặc tài liệu hóa để đảm bảo tính minh bạch của Sprint Goal. Trong các buổi Daily, thường xuyên nhắc lại Sprint Goal, kiểm tra tiến độ công việc hướng tới Sprint Goal, tối ưu hóa khả năng hoàn thành mục tiêu của Development Team.

**d. Sprint Goal không có ý nghĩa, hoặc không rõ ràng**

Ví dụ
* Refactor front-end code (không thể hiện giá trị đem lại cho người dùng)
* Cải thiện performance (không có metrics đánh giá, không có scope)
* Triển khai flow mua hàng B2B (không có scope)

Một Sprint Goal không rõ ràng sẽ khiến Development Team khó xác định được khi nào thì hoàn thành được mục tiêu, dễ bị mất tập trung, & gây rủi ro phát sinh các tasks mới. Một Sprint Goal không có ý nghĩa khiến Development Team mơ hồ về công việc của mình, khó engage được với sản phẩm, và khó tìm được động lực để tạo ra giá trị cho người dùng cuối. 

Lời khuyên để cải thiện tình huống này
* Cần xây dựng Sprint Goal hướng giá trị, tập trung vào user hơn. Sprint Goal cần trả lời câu hỏi WHAT, thay vì câu hỏi HOW 
* Áp dụng các tiêu chí SMART khi xây dựng Sprint Goal (Specific, Measurable, Attainable, Relevant, Time-based)


-----


* https://www.scrum.org/resources/blog/scrum-trenches-sprint-goal
* https://www.scrum.org/resources/blog/getting-done-creating-good-sprint-goals
* https://www.scrum.org/resources/blog/myth-having-sprint-goal-optional-scrum
* https://www.scrum.org/resources/blog/six-reasons-why-you-need-pay-more-attention-sprint-goal