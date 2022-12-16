Scrum & Extreme Programming (XP) đều là các Agile framework, đều hướng tới việc xây dựng sản phẩm với release cycle ngắn hơn, chất lượng sản phẩm tốt hơn, & tăng khả năng tự quản lý (self-managed) của development team dựa trên các nguyên tắc cơ bản của Agile. 

![](https://images.viblo.asia/38fe71cf-2f5f-4d07-96a8-cc56268dcac5.png)

Cả 2 framework đều phát triển dựa trên các sprint, mỗi sprint có độ dài cố định, có sprint backlog, sprint goal & bao gồm các hoạt động Agile như daily meeting, sprint planning, sprint retro, sprint review.
Tuy nhiên, XP củng cố chất lượng sản phẩm bằng việc áp dụng nhiều development practices trong quy trình phát triển, như TDD, pair programming, refactoring. 

### 1. Các khác biệt cơ bản
Sự khác biệt cơ bản giữa Scrum & XP có thể được tổng hợp như sau 

| Yếu tố so sánh | Scrum | XP |
| -------- | -------- | -------- |
| Độ dài Sprint | Một sprint có thể kéo dài 1-4 tuần|Một sprint chỉ kéo dài 1-2 tuần. XP chú trọng việc release nhanh & liên tục|
| Khả năng thay đổi sprint backlog |Hạn chế tối đa các thay đổi xảy ra sau khi đã kết thúc Sprint Planning & Sprint Goal đã được đề ra |Sprint backlog item có thể thay đổi, thêm/bớt, miễn sao development team chưa làm tới; backlog item được thêm mới phải có độ lớn tương đương với backlog item cũ|
| Độ ưu tiên của User Story ảnh hưởng tới thứ tự thực hiện | PO đưa ra độ ưu tiên cho từng User Story, nhưng development team sẽ tự quyết định thứ tự thực hiện trong Sprint, miễn đạt được Sprint Goal|Thứ tự phát triển phải theo đúng thứ tự ưu tiên của User Story do PO/Khách hàng đề ra|
| Áp dụng programming practices| Không yêu cầu bắt buộc development team phải tuân theo bất cứ programming practices nào cụ thể|Yêu cầu chặt chẽ về việc tuân thủ programming practices để đảm bảo chất lượng sản phẩm & khả năng deliver liên tục (Continuous Delivery)|. 


### 2. Vị trí (roles) trong từng framework

**Scrum** bao gồm 3 vị trí: Product Owner, Scrum Master & Development Team. Trong đó:

- Product Owner: vị trí bắt buộc, là người có tiếng nói quyết định đối với product backlog & release plan. Product Owner có nhiệm vụ xây dựng, hoàn thiện product backlog, xây dựng release plan, đảm bảo sản phẩm phát triển theo hướng đem lại giá trị tối ưu cho người dùng. 
- Scrum Master: vị trí không bắt buộc, đóng vai trò coach/mentor để xây dựng văn hóa Agile, duy trình, tối ưu quy trình Agile nói chung trong tổ chức cũng như trong từng development team. 
- Development Team: vị trí bắt buộc, bao gồm toàn bộ các thành viên làm việc full-time để phát triển sản phẩm, không phân biệt các vị trí developer, tester, designer, etc. 

**XP** bao gồm 6 vị trí: Tracker, Customer, Developer, Coach, Tester, "Doomsayer"
- Tracker: đóng vai trò theo dõi tiến độ dự án & phát hiện các vấn đề mà developer gặp phải. Tracker trò chuyện với từng developer 1-2 lần/tuần, trao đổi với họ về tiến độ & lắng nghe khó khăn developer chia sẻ. Khi phát hiện có vấn đề ảnh hưởng tiến độ, Tracker có thể tiếp cận Customer, Coach, hay các developer khác để tìm giải pháp xử lý.
- Customer: tương tự Product Owner trong Scrum, Customer là người quản lý product backlog, viết User Story, đặt thứ tự ưu tiên cho backlog item. 
- Developer: là người tiếp nhận backlog item từ Customer & triển khai các backlog item   
- Tester: là người phụ trách công việc kiểm thử, đảm bảo chất lượng sản phẩm 
- Coach: là người theo dõi quá trình làm việc của development team, quản lý về con người & chất lượng, hướng dẫn thành viên làm theo các programming practices của XP.
- "Doomsayer": đây có thể là 1 thành viên của XP, hoặc một đặc điểm; bất cứ thành viên ở vị trí nào trong XP nếu có khả năng phát hiện, theo dõi, cảnh báo rủi ro đều có thể gọi là "Doomsayer"

### 3. Một số programming practices cơ bản trong XP 
* 10-minute build: ở điều kiện lý tưởng, mỗi build mới ở dự án áp dụng XP có thể chạy automation test & hoàn thành bản build trong vòng 10 phút. 
* Tích hợp liên tục (Continuous integration): XP đòi hỏi việc áp dụng CI/CD tốt để có thể deliver liên tục hàng ngày & hàng tuần mà vẫn đảm bảo chất lượng & sự ổn định của sản phẩm  
* Kiểm thử người dùng/khách hàng (Customer tests): XP đòi hỏi vị trí Customer luôn luôn sẵn sàng để kiểm thử các bản update hàng ngày, đem lại feedback sớm nhất cho development team, đảm bảo việc đạt Sprint Goal & triển khai tính năng đúng với mong đợi của Customer 
* Pair programming: mặc dù có phần tốn kém khi có 2 developer cùng tham gia thực hiện 1 công việc, XP vẫn khuyến khích việc sử dụng pair programming; lợi ích của pair programming là phát hiện sớm các đoạn code không tốt (live code review) trước khi đưa tới tester/người dùng, đồng thời đảm bảo tốt hơn việc đạt Definition of Done khi có 2 developer cùng tham gia tương tác, làm việc
* Team tập trung (Sit together): Nếu Scrum hoạt động tốt ngay cả với team remote, thì XP lại khuyến khích development team ngồi cùng nhau trong cùng một không gian để tăng tương tác & giảm rủi ro từ hạn chế trong giao tiếp
* Slack: luôn dành một phần effort nhất định trong mỗi sprint để thực hiện việc cải thiện chất lượng như refactoring, viết unit test cho code cũ, xử lý các technical debt tồn đọng, vv  
* Release ít một (Small release): Việc áp dụng tốt CI/CD cho phép các development team theo XP có thể release liên tục các bản update nhỏ lên môi trường prod & nhận feedback sớm từ người dùng
* Sử dụng User Story (Practicing of stories): tương tự Scrum, backlog item trong XP được quản lý dưới dạng các user story. Việc lên kế hoạch, chia nhỏ, ước lượng, nghiệm thu cũng dựa trên các User Story 
* Tốc độ bền vững (Sustainable pace): thay vì kiểm soát công việc của thành viên theo lối truyền thống "8 tiếng một ngày", XP khuyến khích việc giữ được tốc độ ổn định, bền vững trong thời gian dài, bằng cách chia nhỏ giờ làm việc trong ngày thành các khoảng (interval), giữa mỗi khoảng có một quãng nghỉ ngắn, sau nhiều khoảng có một quãng nghỉ dài. Việc này tương tự như nguyên tắc chạy marathon, giúp development team không bị kiệt sức
* Sprint một tuần (Weekly cycle): practices cơ bản của XP. Mỗi tuần development team & Customer cùng ngồi lại để lên kế hoạch phát triển cho tuần tới & review công việc của sprint trước  

https://www.visual-paradigm.com/scrum/extreme-programming-vs-scrum/
https://explainagile.com/agile/xp-extreme-programming/roles/
https://explainagile.com/agile/xp-extreme-programming/practices/