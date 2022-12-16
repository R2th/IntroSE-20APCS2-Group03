# Scrum in Software Testing
**Scrum in Software Testing** là một phương pháp để xây dựng các ứng dụng phần mềm phức tạp. Nó cung cấp các giải pháp dễ dàng để thực hiện các tác vụ phức tạp. Scrum giúp nhóm phát triển tập trung vào tất cả các khía cạnh của việc phát triển sản phẩm phần mềm như chất lượng, hiệu suất, khả năng sử dụng, v.v. Nó cung cấp sự minh bạch, kiểm tra và thích ứng trong quá trình phát triển phần mềm để tránh phức tạp.
## Scrum Testing
**Scrum Testing** là một kiểm thử được thực hiện trong phương pháp của scrum để xác minh các yêu cầu ứng dụng phần mềm được đáp ứng. Nó liên quan đến việc kiểm tra các thông số phi chức năng như bảo mật, khả năng sử dụng, hiệu suất, v.v. Không có vai trò hoạt động của người kiểm thử trong quy trình nên nó thường được thực hiện bởi các nhà phát triển với Unit Test. Đôi khi cần có các đội kiểm tra chuyên dụng tùy thuộc vào tính chất và độ phức tạp của dự án.

Nội dung bài viết
* What is Scrum?
* Key Features of Scrum Methodology
* Roles in Scrum
* Scrum Artifacts
* Ceremonies (Processes) in Scrum
* Role of Tester in Scrum
* Testing Activities in Scrum
* Test Reporting
## Key Features of Scrum Methodology
Sau đây là các tính năng chính của Scrum

* Scrum có một lịch trình cố định ngắn về các chu kỳ phát hành với phạm vi điều chỉnh được gọi là sprint để giải quyết các nhu cầu phát triển thay đổi nhanh chóng. Mỗi bản phát hành có thể có nhiều sprint. Mỗi Dự án Scrum có thể có nhiều Chu kỳ phát hành.
* Một chuỗi lặp lại các cuộc họp, sự kiện và sự kiện quan trọng
Thực hành kiểm thử và thực hiện các yêu cầu mới, được gọi là story, để đảm bảo một số công việc được sẵn sàng phát hành sau mỗi sprint

Scrum dựa trên 3 Trụ cột sau

![](https://images.viblo.asia/36f0f1a2-42be-48c2-a3c3-d5095059bd7d.png)

### 1. Roles in Scrum 
Có ba vai trò chính trong Scrum Testing - Product Owner, Scrum Master và Development Team. Hãy nghiên cứu chúng một cách chi tiết



| Product Owner  | Scrum Master | The Team |
| -------- | -------- | -------- |
| Người xác định các tính năng của sản phẩm. |Người quản lý nhóm và chăm sóc năng suất của nhóm     | Đội thường có khoảng 5-9 thành viên     |
| Chủ sở hữu sản phẩm quyết định ngày phát hành và các tính năng tương ứng| Người duy trì danh sách khối và loại bỏ các rào cản trong quá trình phát triển| Nó bao gồm các nhà phát triển, nhà thiết kế và đôi khi là người kiểm tra, v.v.|
| Họ ưu tiên các tính năng theo giá trị thị trường và lợi nhuận của sản phẩm| Người phối hợp với tất cả các vai trò và chức năng| Nhóm tự tổ chức và sắp xếp công việc của họ |
| Người chịu trách nhiệm về lợi nhuận của sản phẩm| Người bảo vệ nhóm khỏi sự can thiệp từ bên ngoài| Có quyền làm mọi thứ trong ranh giới của dự án để đạt được mục tiêu sprint
| Người có thể chấp nhận hoặc từ chối kết quả hạng mục công việc| Lời mời tham gia các cuộc họp scrum, sprint review và lập kế hoạch hàng ngày| Tích cực tham gia các nghi lễ hàng ngày|
### 2. Scrum Artifacts

![](https://images.viblo.asia/e9617305-76b6-4ec4-8e04-ebafcd17912a.png)

* User stories: Là một lời giải thích ngắn gọn về các chức năng của hệ thống đang được thử nghiệm. Ví dụ cho Nhà cung cấp Bảo hiểm là - "Phí bảo hiểm có thể được thanh toán bằng hệ thống trực tuyến."
* Product Backlog: Là một tập hợp các câu chuyện của người dùng được thu thập cho một sản phẩm scrum. Chủ sở hữu sản phẩm chuẩn bị và duy trì sản phẩm tồn đọng. Nó được chủ sở hữu sản phẩm ưu tiên và bất kỳ ai cũng có thể thêm vào nó với sự chấp thuận của chủ sở hữu sản phẩm.
* Release Backlog: Một bản phát hành là một khung thời gian trong đó số lần lặp được hoàn thành. Chủ sở hữu sản phẩm phối hợp với scrum master để quyết định câu chuyện nào nên được nhắm mục tiêu để phát hành. Các câu chuyện trong bản phát hành tồn đọng được nhắm mục tiêu để hoàn thành trong một bản phát hành.
* Sprints: Đó là khoảng thời gian ấn định để hoàn thành các câu chuyện của người dùng, do chủ sở hữu sản phẩm và nhóm nhà phát triển quyết định, thường là 2-4 tuần.
Sprint Backlog: Đó là một tập hợp các câu chuyện của người dùng sẽ được hoàn thành trong một sprint. Trong thời gian tồn đọng sprint, công việc không bao giờ được giao và nhóm tự đăng ký làm việc. Nó do nhóm sở hữu và quản lý trong khi công việc ước tính còn lại được cập nhật hàng ngày. Đây là danh sách nhiệm vụ phải được thực hiện trong Sprint
* Block List: Danh sách khối: Đó là danh sách các khối và các quyết định chưa được thực hiện thuộc sở hữu của scrum master và được cập nhật hàng ngày
* Burndown chart: Biểu đồ Burndown: Biểu đồ ghi giảm thể hiện tiến độ tổng thể của công việc đang thực hiện và công việc đã hoàn thành trong suốt quá trình. Nó thể hiện ở định dạng đồ thị các câu chuyện và tính năng chưa hoàn thành
* 
### 3. Ceremonies (Processes) in Scrum
* Sprint Planning: Một sprint bắt đầu bằng việc nhóm nhập các câu chuyện từ bản phát hành tồn đọng vào sprint backlog; nó được lưu trữ bởi scrum master. Người kiểm tra ước tính effort để kiểm tra các câu chuyện khác nhau trong Sprint Backlog.
* Daily Scrum: Nó được tổ chức bởi scrum master, kéo dài khoảng 15 phút. Trong Daily Scrum, các thành viên sẽ thảo luận về công việc đã hoàn thành vào ngày hôm trước, công việc đã lên kế hoạch cho ngày hôm sau và các vấn đề phải đối mặt trong thời gian chạy nước rút. Trong cuộc họp hàng ngày, tiến trình của nhóm được theo dõi.
* Sprint Review/ Retrospective: Được tổ chức bởi scrum master, kéo dài khoảng 2-4 giờ và thảo luận về những gì nhóm đã hoàn thành trong sprint vừa qua và những bài học kinh nghiệm.

**Role of Tester in Scrum**

Không có vai trò hoạt động của Tester trong Quy trình Scrum. Thông thường, thử nghiệm được thực hiện bởi một nhà phát triển với Unit Test. Trong khi chủ sở hữu sản phẩm cũng thường xuyên tham gia vào quá trình thử nghiệm trong mỗi sprint. Một số dự án Scrum có đội kiểm thử chuyên dụng tùy thuộc vào tính chất và độ phức tạp của dự án.

Câu hỏi tiếp theo là, tester làm gì trong một scrum? 

**Testing Activities in Scrum**

Người kiểm thử thực hiện các hoạt động sau trong các giai đoạn khác nhau của Scrum

**Sprint Planning**

* Trong lập kế hoạch chạy nước rút, người kiểm tra nên chọn một câu chuyện người dùng từ sản phẩm tồn đọng cần được kiểm tra.
* Với tư cách là người thử nghiệm, nên quyết định mất bao nhiêu giờ (Ước tính nỗ lực) để hoàn thành thử nghiệm cho mỗi câu chuyện người dùng đã chọn.
Là một tester, phải biết mục tiêu sprint là gì.
Với tư cách là người thử nghiệm, hãy đóng góp vào quy trình ưu tiên
 
**Sprint**

* Hỗ trợ các nhà phát triển trong unit testing
* Kiểm tra câu chuyện người dùng khi hoàn thành. Việc thực thi kiểm tra được thực hiện trong phòng thí nghiệm nơi cả người kiểm tra và nhà phát triển đều làm việc cùng nhau. Các khiếm khuyết được đăng nhập vào công cụ Quản lý khiếm khuyết được theo dõi hàng ngày. Những khiếm khuyết có thể được trao đổi và phân tích trong cuộc họp scrum. Các khiếm khuyết được kiểm tra lại ngay sau khi nó được giải quyết và triển khai để kiểm tra
* Với tư cách là người thử nghiệm, anh / cô ấy tham dự tất cả các cuộc họp standup hàng ngày để lên tiếng
* Với tư cách là người thử nghiệm, anh ta / cô ta có thể mang bất kỳ hạng mục tồn đọng nào không thể hoàn thành trong nước rút hiện tại và chuyển sang nước rút tiếp theo
* Tester chịu trách nhiệm phát triển các tập lệnh tự động hóa. Lên lịch thử nghiệm tự động hóa với hệ thống Tích hợp liên tục (CI). Tự động hóa nhận được tầm quan trọng do thời gian giao hàng ngắn. Tự động hóa kiểm tra có thể được thực hiện bằng cách sử dụng các công cụ mã nguồn mở hoặc trả phí khác nhau có sẵn trên thị trường. Điều này chứng tỏ hiệu quả trong việc đảm bảo rằng mọi thứ cần được kiểm tra đều được bảo hiểm. Có thể đạt được phạm vi kiểm tra đầy đủ với sự liên lạc chặt chẽ với nhóm.
* Xem xét kết quả tự động hóa CI và gửi Báo cáo cho các bên liên quan
* Thực hiện kiểm tra phi chức năng cho các câu chuyện của người dùng đã được phê duyệt
* Phối hợp với khách hàng và chủ sở hữu sản phẩm để xác định các tiêu chí chấp nhận cho Kiểm tra chấp nhận
* Vào cuối sprint, người kiểm tra cũng thực hiện kiểm tra chấp nhận (UAT) trong một số trường hợp và xác nhận tính hoàn chỉnh của kiểm tra cho sprint hiện tại

**Sprint Retrospective**

* Là một người thử nghiệm, anh ta sẽ tìm ra những gì đã xảy ra và những gì đã đi đúng trong nước rút hiện tại
* Với tư cách là người thử nghiệm, anh ấy xác định bài học kinh nghiệm và các phương pháp hay nhất
### Test Reporting
Báo cáo số liệu Scrum Test cung cấp tính minh bạch và khả năng hiển thị cho các bên liên quan về dự án. Các chỉ số được báo cáo cho phép một nhóm phân tích tiến trình của họ và lập kế hoạch chiến lược trong tương lai để cải thiện sản phẩm. Có hai số liệu thường được sử dụng để báo cáo.

**Burn down chart:** Mỗi ngày, Scrum Master ghi lại công việc ước tính còn lại cho sprint. Nó được cập nhật hàng ngày.

Biểu đồ tổng thể cung cấp một cái nhìn tổng quan nhanh chóng về tiến độ dự án, biểu đồ này chứa thông tin như tổng khối lượng công việc trong dự án phải hoàn thành, khối lượng công việc hoàn thành trong mỗi sprint, v.v.

![](https://images.viblo.asia/f760bcdf-81c0-47c8-9c27-82216566cdb4.png)

**Velocity history graph:** Biểu đồ lịch sử vận tốc dự đoán vận tốc của đội đạt được trong mỗi lần chạy nước rút. Đây là một biểu đồ cột và thể hiện sản lượng của các nhóm đã thay đổi như thế nào theo thời gian.

Nguồn tham khảo: https://www.guru99.com/scrum-testing-beginner-guide.html