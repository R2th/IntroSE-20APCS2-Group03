##  **I. Cách log bug hiệu quả** <br>
Log bug là một công việc cơ bản, thường xuyên và vô cùng quan trọng của một kiểm thử viên (tester/QA) trong quá trình kiểm thử phần mềm. Khi log một bug, người kiểm thử cần đảm bảo người đọc có thể dễ dàng hiểu được vấn đề xảy ra, sau đó có thể xử lý bug nhanh chóng, tránh lãng phí thời gian để trao đổi, xác nhận lại với kiểm thử viên, tuy nhiên hiện nay vấn đề này lại ít được chú ý đến. Hiện nay các trung tâm đào tạo, các trường học chỉ quan tâm đến việc làm sao để tìm ra bug, tần suất xảy ra bug trong hệ thống chứ ít đề cập đến việc làm thế nào để log bug một cách ngắn gọn và dễ hiểu. Hôm nay mình sẽ chia sẻ cách để log một bug hiệu quả trên hệ thống quản lý lỗi (Redmine) <br>
### **1.  Template cơ bản khi log một bug trên Redmine**<br>
**Tracker**  <br>
* <Content>
**Subject** <br>
 * <Content>
**Description** <br>
 * Summary
 * Pre-condition
 * Step to re-produce
 * Actual result
 * Expected result
 * Content
 * Attachment<br>

**Status** <br>
* <Content>
**Priority** <br>
* <Content>
**Assignee** <br>
* <Content>
**Target version** <br>
* <Content>
**Bug Severity** <br>
* <Content>
**Files**<br>
* <Choose files>
###  2. Làm thế nào để log bug hiệu quả?
Để log một bug hiệu quả cần quan tâm đến các thành phần của bug<br>
**Tracker**<br>
    Khi log bug đầu tiên phải chọn lựa tracker là Bug để có thể dễ dàng theo dõi, quản lý, trích xuất ra danh sách các bug hiện có mà không bị lẫn với các loại task khác. <br>
**Subject**<br>
    Subject cần phải được chú trọng. Khi một dự án đã triển khai trong thời gian dài sẽ có rất nhiều bug vì thế một Subject tốt sẽ giúp các thành viên trong dự án tìm kiếm bug một cách dễ dàng và tránh việc bị trùng lặp bug.<br>
 * Subject phải ngắn gọn, dễ hiểu và bao gồm các từ khóa quan trọng và dễ nhớ.
 * Subject nên đính kèm thêm tag để dễ dàng phân biệt bug ở các màn hình khác nhau. Khi log bug cần chú ý xem bug đó là bug về giao diện hay validate data, bug ở web, android hay iOS, ngoài ra cần chú ý bug đó ở màn hình nào. Các tag này sẽ giúp việc tìm kiếm và phân chia công việc dễ dàng hơn. <br>

Ví dụ: Tester log một bug là khi mở màn hình đăng nhập thì giao diện bị vỡ với Subject là: "[Login][GUI] Broken interface when open screen login" sẽ giúp PM dễ dàng hiểu được bug này là bug về giao diện và giao cho dev frontend xử lý. <br>
    
**Description**<br>
Description là phần vô cũng quan trọng khi log bug, nó giúp cho dev tái hiện bug dễ dàng và chính xác<br>
* Summary: Đây là phần mô tả chi tiết của bug nếu Subject chưa rõ ràng: Bug xảy ra ở đâu? Nguyên nhân dẫn đến bug là gì? Hậu quả của bug như thế nào?
* Pre-condition: Đây là phần tiền điều kiện để có thể tái hiện được bug<br>
Ví dụ: Khi test trường hợp đăng nhập thành công vào hệ thống thì tiền điều kiện của case này sẽ là: người dùng đã có account được đăng ký thành công trước đó.
<br>
* Step to re-produce: Các bước chi tiết để tái hiện bug.
* Actual result: Kết quả trả về thực tế sau khi thực hiện các bước ở phần Step to re-produce
* Expected result: Kết quả mong muốn trả về sau khi thực hiện các bước ở phần Step to re-produce.
* Content: Bug xảy ra trên môi trường nào, version bao nhiêu.
* Attachment: Đính kèm link hoặc tên files như hình ảnh, mp3, gif,... tái hiện bug để nếu đọc xong phần Step to re-produce dev vẫn không hiểu thì có thể xem thêm phần tài liệu đính kèm để hiểu về bug.<br>

**Status** <br>
    Trạng thái của bug. Khi log bug mới, trạng thái mặc định của bug sẽ là New.<br>
**Priority** <br>
   Khi bug xảy ra, bạn có thể đánh giá độ ưu tiên xử lý của lỗi để gán cho nó trạng thái tương ứng. Với hệ thống quản lý Redmine có 5 mức độ ưu tiên xử lý là: Low, Normal, Hight, Urgent, Immediate.<br>
**Assignee** <br>
Khi biết chắc lỗi này do dev nào xử lý bạn có thể trực tiếp assign cho dev đó để dev nhận bug và xử lý nhanh chóng hoặc bạn có thể assign cho leader, sau đó leader sẽ assign lại cho dev, ngoài ra bạn cũng có thể để trắng phần này, sau khi bạn log bug lên hệ thống, dev sẽ vào xem task nào mình phụ trách và tự assign cho mình. <br>
**Target version** <br>
Phiên bản mà bug sẽ được xử lý. <br>
Ví dụ: Hiện tại dự án đang ở sprint 23, có bug liên quan đến chức năng A. Nếu chức năng này được làm và release trong sprint này thì Target version sẽ để ở Sprint 23, nếu chức năng này sẽ được phát triển ở sprint sau thì Target version sẽ để ở Product backlog.
<br>**Bug Severity** <br>
Mức độ nghiêm trọng của bug, đánh giá độ ảnh hưởng của bug lên hệ thống để gán cho nó trạng thái tương ứng. Đối với hệ thống quản lý Redmine có 5 mức độ ưu tiên là: Blocker, Critical, High, Medium, Low.<br>
## II. Một vài lưu ý khi log bug
### 1. Yếu tố tâm lý<br>
   Khi tester tìm ra bug vui bao nhiêu thì dev sẽ buồn bấy nhiêu, vì vậy khi tìm ra bug không nên ra lệnh cho dev phải thừa nhận và fix bug, thay vào đó hãy luôn mang tinh thần và mục tiêu cùng đóng góp cho dự án ngày càng hoàn thiện khi đến với tay người dùng, như vậy sẽ tạo ra cảm giác thấu hiểu giữa dev và tester.<br>
### 2. Tránh log trùng bug<br>
   Một dự án có thể có rất nhiều tester, vì vậy với một bộ testcase có những lỗi trước đó đã log và được fix nhưng đến giai đoạn này bug lại xảy ra, hoặc bug đã được log nhưng tester quên note lại vào file testcase, vậy nên hãy đảm bảo bug bạn log không trùng với bất kỳ bug nào trước đó. Do đó dù với bất kỳ lý do nào thì bạn cũng nên hạn chế thấp nhất vấn đề này, một vài lần xảy ra sẽ khiến dev, leader mất niềm tin ở bạn.<br>
    Ngoài ra để xem bug đã đc log hay chưa ta có thể lên tool quản lý lỗi (Redmine) để search các key liên quan đến bug cần log. Nếu phát hiện bug bị log trùng thì comment vào bug là bug bị duplicate, duplicate vs bug nào thì sẽ gắn kèm theo link của bug đó sau đó sẽ chuyển bug về trạng thái close.
### 3. Tập trung vào một vấn đề<br>
   Với mỗi bug được log lên hệ thống quản lý lỗi hãy cố gắng chỉ tập chung vào một vấn đề cụ thể mà bạn gặp phải khi test hệ thống. Không nên gộp chung nhiều vấn đề vào một bug, như thế sẽ khiến vấn đề trở nên rắc rối và dev khó khăn trong việc xử .
### 4. Quản lý bug<br>
 Trước và sau khi log bug lên hệ thống bạn nên trao đổi với dev để đảm bảo đó là bug và dev nắm được bug đó, tránh bị sót khi xử lý. Ngoài ra, sau khi log bug bạn nên note lại ID bug vào file test case/ test checklist để có thể kiểm soát bug dễ dàng. <br>
    Sau khi bug được xử lý, chuyển sang trạng thái Resolved (hoặc Desploy tùy vào từng dự án) và assign cho tester, tester cần test lại case đó và chuyển sang trạng thái Close nếu bug được xử lý xong hoặc Reopen nếu bug vẫn tồn tại, bên cạnh đó cần phải note kết quả test vào file test case/ test checklist để kiểm soát chất lượng sản phẩm.
### Tài liệu tham khảo
    https://techblog.vn/log-bug-gioi-nhu-mot-ky-su