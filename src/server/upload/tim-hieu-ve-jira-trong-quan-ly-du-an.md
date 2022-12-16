### **1. JIRA Core là gì?**
JIRA Core là một hệ thống quản lý công việc cho phép bạn thiết lập các quy trình riêng phù hợp với cách bạn làm việc. Trọng tâm của tất cả các hệ thống này là các luồng công việc, di chuyển các gói công việc từ A đến B. JIRA Core cho phép bạn thực hiện công việc của bạn từ dễ dàng đến phức tạp như bạn cần, cho bạn sự tự do để tập trung vào công việc, không bắt buộc theo một quy trình gò bó nào cả. JIRA Core có thể được sử dụng trong nhiều cách khác nhau. Ví dụ, bạn có thể sử dụng nó để chạy một doanh nghiệp t-shirt, thiết lập quy trình công việc mà có thể quản lý các quy trình nội bộ của bạn chẳng hạn như quá trình thiết kế của bạn, quá trình bán hàng của bạn, quá trình sản xuất của mình, và thậm chí kiểm soát cổ phiếu của bạn.Đặc trưng của JIRA Core là những ràng buộc công việc của bạn và quá trình bạn thực hiện công việc đó! 
![](https://viblo.asia/uploads/eb282783-0015-4db3-9c0b-f10a7787889d.png)
Người dùng JIRA Core trong quản lý kiểm thử phần mềm được chia làm 3 nhóm: Administrators, Project administrators và Users 
Sau đây, tôi xin chia sẻ một số thông tin về việc sử dụng JIRA trong quản lý kiểm thử phần mềm đối với nhóm Users 
Users có trách nhiệm làm việc trong các dự án JIRA Core cụ thể.
Users được phép truy cập đến các issues của dự án và tùy thuộc vào quyền của họ mà khai thác về cácissues này bằng cách bình luận trên đó, chuyển nó qua công việc của mình, và đóng lại khi hoàn tất.
Hướng dẫn này cho bạn thấy làm thế nào để làm việc cơ bản với JIRA Core trong một ngày. Dưới đây là những gì bạn có thể dựa vào:
* Làm thế nào để truy cập vào các dự án của bạn?
* Làm thế nào để làm việc với các issues?
* Làm thế nào để tìm kiếm các issues?
Các dự án kinh doanh có thể được xem như là các thùng chứa các issues. Mỗi dự án có một công việc liên quan, và công việc này được áp dụng cho tất cả các chủ đề tổ chức trong dự án. Bắt đầu làm việc vào nhiệm vụ được giao của bạn bằng cách truy cập và xem các dự án mà họ đang nắm giữ.
### **2. Truy cập vào một dự án**
Khi bạn có quyền truy cập vào một dự án và bạn đăng nhập lần đầu tiên, bạn sẽ thấy các dự án được liệt kê trong **Projects dropdown menu**. Hãy cùng kiểm tra.
1. Chọn  **Projects** > **View All Projects**. Một danh sách của tất cả các dự án bạn có thể truy cập sẽ hiển thị.
2. Chọn **Dragon Design Tees**. Bạn sẽ ở trên trang tóm tắt dự án, trong đó hiển thị hoạt động gần đây và cho phép bạn dễ dàng theo dõi tình trạng của các issues trong dự án này.
3. Nếu bạn đang tham gia vào nhiều dự án, bạn có thể dễ dàng nhìn thấy một trong những dự án bạn đang làm việc, bằng cách lựa chọn **Projects** và tìm kiếm theo dự án hiện tại.
### 3. Xem các issues của dự án
Bạn có thể xem và lọc các issues trong dự án mà bạn được giao cho.
Trong dự án của bạn, chọn **Issues** từ bên dự án. Từ đây, bạn sẽ có thể xem trước các issues và chọn lọc được cấu hình sẵn để thay đổi mà issues được hiển thị.
### 4. Tạo issue đầu tiên của bạn
Hãy tạo ra một issue để theo dõi việc tạo ra một thiết kế áo thun mới.
1. Chọn **Create** trong tiêu đề JIRA Core.
2. Điền vào các trường bằng cách sử dụng dữ liệu mẫu được hiển thị dưới đây. Chỉ có các lĩnh vực có dấu * là bắt buộc.
* **Project**: Dragon Design Tees
* **Issue Type**: Task
* **Summary**: Create a contractor resources spreadsheet
* **Description**: The spreadsheet must contain a breakdown of all contractors and specific skill sets.
* Để trống tất cả các lĩnh vực khác hoặc các giá trị mặc định của chúng.
3. Chọn **Create** để tạo ra issue mới của bạn. Một thông báo xác nhận sẽ hiển thị trong một vài giây. Hãy lưu ý của chính của issue mới của bạn (ví dụ DT-1).
Tạo thêm một hay hai issue nữa để làm quen với quá trình này.
### 5. Chỉnh sửa một issue
Bạn có thể dễ dàng chỉnh sửa vấn đề của bạn để thêm thông tin, đính kèm tập tin mới hoặc ảnh chụp màn hình, và nhiều hơn nữa. Chỉnh sửa nội tuyến là cách nhanh nhất để chỉnh sửa một issue. Để truy cập vào tất cả các lĩnh vực của issue, bao gồm cả lĩnh vực trống không xuất hiện khi chỉnh sửa nội tuyến, bạn có thể sử dụng hộp thoại **Edit Issue**.
1. Trong dự án của bạn, chọn **Issue** từ bên dự án và mở các issues đầu tiên mà bạn đã tạo.
2. Di chuột qua các **Priority** field. Nhấn vào biểu tượng **Pencil** để chỉnh sửa trường.
3. Thay đổi **Priority** thành "**Critical**" và nhấp vào bất cứ nơi nào bên ngoài lĩnh vực này để lưu thay đổi của bạn.
Issue này sẽ được cập nhật ngay lập tức. Bây giờ, chúng ta hãy xem làm thế nào để bắt đầu làm việc vào một issue.
### 6. Biên tập của một issue 
Mọi issue có một vòng đời. Trong JIRA Core, vòng đời của một issue được quản lý bởi một quy trình làm việc. Một quy trình làm việc bao gồm các trạng thái issue (ví dụ **To Do**) và các hiệu ứng chuyển tiếp giữa các trạng thái (ví dụ **Start progress**). Trong bước này, bạn sẽ bắt đầu làm việc về issue của bạn bằng cách chuyển nó từ **To Do** sang trạng thái **In Progress**.
1. Mở issue đầu tiên bạn tạo ra (ví dụ DT-1). Issue này phải ở trong tình trạng **To Do**.
2. Chọn  **Progress Start**. Tình trạng của issue của bạn sẽ được thay đổi thành **In Progress**.
3. Sau đó bạn có thể chọn để ngừng tiến độ của issue, hoặc đóng issue này bằng cách đánh dấu nó như là **Done** và chọn độ phân giải.
Chú ý rằng việc giải quyết issue sẽ nhắc bạn nhập thêm thông tin, trong khi bắt đầu tiến bộ về issue này không. Một số issue chuyển tiếp có màn hình liên kết với chúng trong công việc liên quan đến dự án của bạn. Hãy nhớ rằng, một dự án chỉ có thể có một công việc liên kết với nó.
### 7. Chỉ định issue cho người dùng khác
Bạn có thể quản lý tốt hơn công việc của bạn bằng cách gán cácissue cho các thành viên khác trong nhóm của bạn.
1. Mở một trong những issue mà bạn đã tạo ra (ví dụ DT-2).
2. Chọn **Assign** trên issue này.
3. Nhập **Emma** (tên user khác) trong danh sách **Assignee** và chọn cô là người nhận chuyển nhượng từ danh sách thả xuống.
4. Nhập (không sao chép và dán) các text trong phần **Comment**, sau đó chọn **Assign**.
Hi @emma, I've assigned this issue to you to work on this week.
*(!)Bạn sẽ cần lưu ý một vài điều khi bạn nhập lời nhận xét:*
* Khi bạn bắt đầu gõ sau biểu tượng @, bạn sẽ được nhắc để lựa chọn một người sử dụng: emma, trong ví dụ này. Emma sẽ nhận được một email thông báo rằng liên kết với vấn đề này, khi bạn lưu. Tính năng này được gọi là nhắc đến một người sử dụng.
* Về cách chọn Assign:
Issue này sẽ được giao cho Emma với một bình luận được thêm vào nó.
Một liên kết sẽ được tự động tạo ra để các issue trong các bình luận về issue.
Bạn đã tạo ra một số issues, biên tập một issue và giao cho chúng với một thành viên trong nhóm của bạn. Bạn đang thực sự tiếp xúc với cách làm việc với các issue. Bây giờ, bạn sẽ tìm hiểu làm thế nào để tìm kiếm tốt nhất cho các vấn đề bạn cần phải làm việc trên.
### 8. Tạo ra một số issues khác
Trước khi bạn bắt đầu, bạn sẽ cần thêm một vài issues. Tạo một vài chi tiết trong dự án JIRA Core, bằng cách sử dụng dữ liệu mẫu dưới đây.
**Issue Type** = Task và  **Summary** = Brainstorm new designs
**Issue Type** = Task và **Summary** = Approve new t-shirt design
**Issue Type** = Task, **Summary** = Send mockup to printers và **Assignee** = kate
### 9. Tìm kiếm một issue
Trong ví dụ này, chúng ta sẽ giải quyết một kịch bản chung: tìm kiếm cho tất cả các issue chưa được giải quyết giao cho bạn. Bạn có thể thường xuyên chạy một tìm kiếm như thế này để kiểm tra tồn đọng công việc của bạn.
1. Từ tiêu đề trang web của Cloud JIRA Core, chọn **Issue** > **Search for Issues**. Bạn sẽ thấy các issue từ dự án của bạn được trình diễn và bất kỳ dự án khác mà bạn có thể truy cập.
2. Thiết lập **Assignee** = **Current User** trong các tiêu chí tìm kiếm.
*(!) Chú ý rằng các kết quả tìm kiếm mới khi bạn chọn tiêu chí mới.*
3. Chọn **More**> gõ **Resolution** sau đó chọn nó.
4. Thiết lập **Resolution** = **Unresolved**. Các kết quả tìm kiếm sẽ hiển thị các issue mà chưa được giải quyết và giao cho bạn.
Nếu bạn đang nghĩ rằng nó sẽ có ích để có thể chạy lại tìm kiếm này, chúng tôi đã có bản recovred! Di chuột qua biểu tượng **Search-filterspopout** ở phía trên bên trái và chọn **My Open Issues**. Giữ màn hình này cho các bước tiếp theo.
### 10. Lưu lại các tìm kiếm
Nếu bạn chạy một tìm kiếm với các tiêu chuẩn như nhau thường xuyên, bạn có thể muốn lưu nó như một bộ lọc. Điều này cho phép bạn chạy các tìm kiếm một lần nữa với một nhấp chuột duy nhất, thay vì chọn các tiêu chí giống nhau mỗi lần. Ví dụ, bạn có thể sử dụng một bộ lọc để xem xét backlog của bạn trong ngày.
Trong bước này, bạn sẽ tìm kiếm cho tất cả các nhiệm vụ được giao cho Kate trong Dự án thiết kế Tees Dragon, và sau đó lưu tìm kiếm này như một bộ lọc.
1. Chọn **Issue** > **Search for Issues** để bắt đầu một tìm kiếm mới.
2. Thiết lập  **Project = Dragon Design Tees** và ** Assignee = kate** như các tiêu chí. Bạn sẽ thấy có ít nhất một issue.
3. Chọn **Save As** (trên các tiêu chí tìm kiếm), nhập **Kate Dragon Design**  tại **Filter Name** và lưu nó.
Di chuột qua biểu tượng **Searching for issues and filtering** ở phía trên bên trái. Bạn có thể thấy bộ lọc mới của bạn dưới phần **Favorite Filters**. Chỉ cần nhấp vào nó để chạy nó. Bây giờ hãy xem xét một số cách mà bạn có thể sử dụng bộ lọc issue mới của bạn.
### 11. Chia sẻ kết quả tìm kiếm của bạn
Nhận ra nhóm của bạn trên trang này cũng dễ dàng với các bộ lọc chia sẻ. Bạn có thể chia sẻ một bộ lọc với nhóm của bạn cho thấy những story chưa được giải quyết cho một sự lặp lại, hoặc các vấn đề quan trọng trong một công việc tồn đọng cần được hỗ trợ.
Dưới đây là hai cách mà bạn có thể chia sẻ kết quả tìm kiếm:
a) Email các kết quả tìm kiếm
Chạy bộ lọc bạn muốn, sau đó chọn **Share**. Nhập những người sử dụng mà bạn muốn chia sẻ các bộ lọc với và họ sẽ được gửi qua email một liên kết đến bộ lọc của bạn (nếu bạn có email thông báo thiết lập).
b) Chia sẻ kết quả tìm kiếm thông qua một bảng điều khiển
Các bảng điều khiển là màn hình mà tất cả người dùng JIRA Core thấy khi họ lần đầu tiên đăng nhập. Bạn có thể hiển thị kết quả của một bộ lọc trên một bảng điều khiển và chia sẻ nó với những người dùng khác.
1. Chọn **Dashboards** > **Manage Dashboards**, sau đó chọn **Create new dashboard.**
2. Đặt tên cho bảng điều khiển của bạn Dragon Design Tees và chọn  nút +Add bên cạnh Add Shares để chia sẻ nó với mọi người.
Để lại các lĩnh vực khác và chọn Add.
Chọn **Dragon Design Tees** trong phần **Favorite Dashboard**s để cấu hình nó.
Chọn **Add a new gadge**t để mở **Gadget Directory**.
Nhập lọc kết quả trong hộp tìm kiếm và chọn **Add It Now**.
Nhập **Kate Dragon Design issues** trong **Saved filter** và chọn **Save**.
Những người dùng khác hiện có thể thêm bảng điều khiển này bằng cách chọn nó như là một mục yêu thích.
Bây giờ bạn đã thực hiện một số tìm kiếm và bộ lọc, và học cách để lưu và chia sẻ chúng với nhóm của bạn. Bạn đã sẵn sàng để nhảy ngay vào và trải nghiệm toàn bộ sức mạnh của JIRA Core!


Nguồn: https://confluence.atlassian.com/jiracoreserver073/getting-started-as-a-user-861255667.html