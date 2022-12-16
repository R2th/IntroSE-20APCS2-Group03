Scrum Methodology là khái niệm khá quen thuộc trong ngành CNTT, & được áp dụng rất nhiều trong các dự án phát triển phần mềm. Tuy nhiên, việc đánh giá hiệu quả áp dụng Scrum & chất lượng của Scrum Team vẫn còn hạn chế trong các metrics quen thuộc như sprint goal deliverables, burn-down/burn-up chart, velocity. Trong bài viết này mình sẽ chia sẻ thêm một số metrics giúp mọi người đánh giá Scrum Team & việc áp dụng Scrum toàn diện hơn. 

### 1. Metrics đánh giá chất lượng deliverables
**Sprint Goal Success**

Một sprint goal đầy đủ sẽ trả lời 3 câu hỏi:
- Tại sao chúng ta cần thực hiện sprint này? (ex. để hoàn thành 1 chức năng, để xử lý triệt để 1 rủi ro)
- Làm thế nào để đội dự án đạt được sprint goal?
- Các metrics nào được áp dụng để đánh giá deliverables? (ex. nếu sprint goal là cải thiện performance, thì các metrics nào cần sử dụng để đánh giá mức độ cải thiện đã đạt yêu cầu hay chưa)

Việc hoàn thành sprint goal là một trong các metrics cơ bản để đánh giá Scrum Team 

**b. Rolled over / Carryover user stories (các user story bị delay/không thể deliver trong sprint)**
- Đôi lúc việc delay/cancel một user story là cần thiết, nếu PO & đội dự án cảm thấy cần dồn nguồn lực vào các user story quan trọng hơn, hoặc loại bỏ các user story đem lại ít giá trị (value) cho sản phẩm. Tuy nhiên, nếu đội dự án thường xuyên có user story bị delay/cancel trong sprint, thì đây là dấu hiệu không tốt chút nào. Cần nhìn nhận lại việc cam kết của team đối với sprint goal (sprint goal commitment), quá trình planning, & việc các khó khăn mà Scrum Team gặp phải có được giải quyết sau mỗi buổi retro, etc

**Escaped Defects and Defect Density**
- Escaped Defects (hay Leakage bugs) là các lỗi xảy ra trên production & ảnh hưởng người dùng. Đây là metrics được sử dụng thường xuyên để đánh giá chất lượng công việc của  team QA & đội dự án nói chung 
- Defect Density: số lượng bug/khối lượng công việc, ví dụ như số lượng bug/tổng số dòng code. 

**Defect Removal Efficiency (DRE)**
> DRE = (Tổng số bug trên môi trường development / (Tổng số bug trên môi trường development + Tổng số bug trên production)) x 100
- DRE giúp đánh giá khả năng "bắt bug" của Scrum Team trước khi deliver cho khách hàng. Bug trên môi trường development bao gồm các bug phát hiện qua quá trình unit test, code review & QA

**Removal of Technical Debt**
- Technical debt phản ánh chi phí phát sinh trong quá trình phát triển do chất lượng deliverables không ổn (cần effort để vá lỗi), hay lựa chọn các giải pháp ngắn hạn khiến về lâu dài hệ thống không ổn định & khó mở rộng. 
- Theo dõi tỷ lệ effort xử lý technical debt/tổng effort mỗi sprint là một cách đánh giá mức độ ảnh hưởng của technical debt & hiệu quả của Scrum Team khi xử lý technical debt

**Team Velocity**
- Team velocity được tính bằng số lượng user story point mà Scrum Team có thể hoàn thành trong mỗi sprint. Qua thời gian, nếu Scrum Team có thể deliver sprint goal một cách ổn định & velocity tăng, điều đó phần nào cho thấy Scrum Team đã có mức độ trưởng thành nhất định 

**Sprint Burn-down/Burn-up chart**
- Thể hiện tiến độ hoàn thành công việc của Scrum Team. Sprint burn-down chart gồm (1) đường lý tưởng: thể hiện tiến độ dự kiến dựa trên story point estimation & sprint goal, (2) đường thực tế: tiến độ mà team đang đạt được. Nếu tiến độ thực tế đang chậm hơn so với dự kiến, Scrum Team cần sớm tìm ra nguyên nhân & tìm cách xử lý.
- Nếu sprint goal & estimation không thay đổi, thì sprint burn-down/burn-up chart có giá trị như nhau. Trường hợp tổng story point trong sprint thay đổi (có thể do sprint goal thay đổi, hoặc Scrum Team estimate lại các user story), burn-up chart giúp người quản lý hiểu được nguyên nhân chậm tiến độ có phải đến từ việc thay đổi sprint goal/estimation hay không. 

### 2. Metrics đánh giá hiệu quả phát triển sản phẩm 
**Time to Market**
- Time to market có thể hiểu là (1) thời gian cần thiết để Scrum Team đem lại 1 giá trị mới cho người dùng (ex. có thể là tính năng mới, tăng performance cho sản phẩm, vv), hoặc (2) thời gian từ lúc dự án bắt đầu tới khi sản phẩm bắt đầu đem lại lợi nhuận cho tổ chức 
- Với cách hiểu thứ nhất, người quản lý có thể tính time to market = số lượng sprint mà đội dự án cần để hoàn thành công việc, từ bước phát triển tới khi release trên production
- Với cách hiểu thứ hai, time to market có thể dài hơn rất nhiều, tùy thuộc  vào chiến lược xây dựng sản phẩm của tổ chức 

**ROI**
- ROI: so sánh giữa (1) tổng doanh thu mà 1 deliverable có thể tạo ra với (2) chi phí phát triển cho deliverables này
- Scrum Team có thể thực hiện tính ROI sau mỗi sprint 
 
**Capital Redeployment**
- Capital Redeployment: được tính bằng cách so sánh giá trị của các item còn lại trong backlog (V), chi phí để thực hiện các item còn lại (AC), & chi phí cơ hội nếu Scrum Team thực hiện các dự án, công việc khác thay vì hoàn thành các items này 
- Nếu V < AC + OC, nghĩa là giá trị mà team đem lại nhỏ hơn so với chi phí, người quản lý có thể xem xét dừng dự án & chuyển nguồn lực sang các dự án khác

**Customer Satisfaction**

Một số KPI để đánh giá mực độ hài lòng của khách hàng
- CSAT = ( Phản hồi tích cực/Tổng số phản hồi ) x 100
- Net Promoter Score (NPS): đánh giá khả năng khách hàng/người dùng sẵn sàng giới thiệu sản phẩm cho người quen. Đây là metrics được sử dụng trong marketing để đánh giá mức độ trung thành (loyalty) của người dùng với sản phẩm, & khả năng "viral" của sản phẩm.
- First Response Time: khoảng thời gian từ lúc người dùng tạo 1 support request cho đến khi nhận được phản hồi từ đội vận hành. FRT càng ngắn, càng giúp tổ chức giữ được sự hài lòng của người dùng.

### 3. Metrics đánh giá hiệu quả sử dụng Scrum  
**Daily Scrum and Sprint Retrospective**
- Nếu Scrum Team thực hiện daily scrum & retrospectives đều đặn, & kết quả mỗi buổi họp đều được tài liệu hóa, thì đây có thể là một metrics định tính để đánh giá Scrum Team có đang làm theo đúng quy trình Scrum không, & các Scrum events có giúp team giải quyết vấn đề, truyền đạt các thông tin cần thiết hay không. 

**Team Satisfaction**
- Định kỳ đánh giá mức độ hài lòng của Scrum Team đối với quy trình dự án, với văn hóa team, & tìm hiểu các mâu thuẫn trong team.

### 4. Metrics sử dụng khi làm báo cáo cho stakeholder
- Sprint and release burndown - giúp stakeholder có cái nhìn tổng quan về tiến độ của team 
- Sprint velocity - dữ liệu lịch sử để đánh giá khối lượng công việc & giá trị mà team đã đem lại cho người dùng 
- Scope change - khối lượng công việc thay đổi trong quá trình chạy sprint, thường là nguyên nhân gây ra chậm trễ, thất bại trong việc deliver sprint goal  
- Team capacity - số lượng nhân sự trong team, số giờ họ có thể dành cho dự án. Nếu có nhân sự xin nghỉ dài ngày, hoặc phải dành effort cho dự án khác thì đây có thể là yếu tố ảnh hưởng đến sprint goal commitment 
- Escaped defects -  đánh giá chất lượng sản phẩm sau khi release trên môi trường production

*Nguồn tham khảo*
* https://www.sealights.io/software-development-metrics/11-scrum-metrics-and-their-value-to-scrum-teams/
* https://medium.com/swlh/agile-development-kpis-for-scrum-teams-a84a0381d469