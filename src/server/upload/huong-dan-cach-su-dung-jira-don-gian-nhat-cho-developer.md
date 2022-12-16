*Trong quá trình sản xuất ở các Doanh nghiệp công nghệ nói chung, và công ty phần mềm nói riêng cần kiểm soát về: Tiến độ dự án, tiến độ của từng chức năng, quản lý các nhiệm vụ (task), hay lỗi phát sinh (Bug), quản lý tài liệu yêu cầu…*

*Để quản lý được việc này, mỗi doanh nghiệp chọn lựa công cụ khác nhau. Ví dụ Slack, Redmine, Jira,.... Trong các công cụ này mình đều đã từng sử dụng, nhưng thực sự thì thấy dùng Jira vẫn là tiện và dễ nhìn nhất. Tuy nhiên không phải là ai làm tại các công ty phần mềm cũng đều biết dùng Jira, nếu như họ chưa từng dùng lần nào (hoặc chưa nhìn thấy giao diện của nó). Mình đã từng làm việc với 1 số developer, họ nói rằng ko biết dùng sao (chắc là bệnh hay quên), mặc dù đã hướng dẫn khá chi tiết.*

Do vậy ở bài viết này, mình sẽ tóm tắt những chức năng chính, đơn giản nhất của Jira để một người chưa từng dùng bao giờ, cũng có thể sử dụng dễ dàng, thuận tiện nhất trong công việc của mình (Đối với member thường, không dùng cho Manager nha)

## A. TÌM HIỂU VỀ JIRA
### 1. Jira là gì ?
Jira là một ứng dụng theo dõi và quản lý lỗi / vấn đề trong dự án, được phát triển bởi công ty phần mềm Atlassian của Australia. Cách thức hoạt động của JIRA dựa vào trọng tâm là kết quả công việc, có thể sử dụng ngay và linh hoạt.

### 2. Tính năng cơ bản của Jira
- Quản lý, theo dõi tiến độ của dự án
- Quản lý các tasks, bugs, cải tiến, tính năng mới hoặc bất kỳ vấn đề gì xảy ra
- Tạo ra và lưu lại những bộ lọc có cấu hình cao (dynamic queries) xuyên suốt mọi vấn đề trong hệ thống; chia sẻ bộ lọc với người sử dụng khác, hoặc đăng ký và nhận được các kết quả qua hệ thống thư điện tử định kỳ
- Xây dựng quy trình làm việc tương thích với yêu cầu của từng dự án
- Bảng dashboard cung cấp cho mỗi người dùng một không gian riêng để xem mọi thông tin liên quan đến cá nhân
- Cung cấp nhiều loại báo cáo thống kê với nhiều loại biểu đồ khác nhau phù hợp với nhiều loại hình dự án và đối tượng người dùng

## B. HƯỚNG DẪN THAO TÁC TRÊN JIRA
### 1. Đăng nhập vào Jira (Đối với Web)
![](https://images.viblo.asia/98767b96-a673-4868-b652-3b8576856f88.png)
Ở đây có thể sử dụng 2 cách đăng nhập: 

**a. Login bằng Tài khoản Google** 

Bạn sẽ được yêu cầu login bằng tài khoản Gmail
- Nếu tài khoản đang được login trên trình duyệt thì sẽ được yêu cầu nhập mật khẩu…. (phần này tương tự như các ứng dụng khác - thông thường mọi người khá quen rồi)
- Nếu tài khoản chưa được login trên trình duyệt, thì sẽ được yêu cầu nhập thông tin Gmail để đăng nhập.

**b. Login bằng Email** 

Với lựa chọn này ,thì bạn có thể sử dụng bất kỳ địa chỉ Email nào đã đăng ký với JIRA, (chú ý là bạn được mời vào dự án rồi)
- Bạn cần nhập vào địa chỉ email, và Click vào nút [Continue]
- Tiếp theo điền mật khẩu của tài khoản, Click vào [Log in] để đăng nhập
![](https://images.viblo.asia/2dac9015-526b-49d2-818f-4cbebb8f4eaa.png) *(Sau khi đăng nhập thành công)*

### 2. Một số thao tác cơ bản
**a. Mở rộng, thu hẹp Menu trái**  
Nhìn có vẻ đơn giản, nhưng khi mới dùng, chính bản thân mình cũng không biết làm sao để co nó lại, hoặc bật nó lên. Vì bình thường là nó ẩn nên không nhìn thấy, mà dùng màn hình nhỏ thì nhìn rất bất tiện.
Cách thực hiện như sau:
- Đưa con chuột vào quãng giữa, sát mép lề  của vùng menu trái, sẽ thấy mũi tên (< hoặc >)
- Click để đóng hoặc mở
![](https://images.viblo.asia/4769f49f-828a-4b87-8539-dea6eae6d6eb.jpg)

**b. Xem Danh sách các dự án hiện tại**  
Từ Menu bên trái, click chọn [Projects] để mở màn hình Danh sách các dự án
![](https://images.viblo.asia/9460c33d-7d43-48c8-9d23-74d248e47853.png)

**c. Xem Danh sách các Issue, lọc tìm kiếm**

Từ Menu bên trái, click chọn [Issues and filters] để mở Submenu cho các lựa chọn khác nhau
![](https://images.viblo.asia/204233c7-9551-431c-85d5-7ca4b390b3e5.png)
- Search issues: Cho phép tìm kiếm các issue
- My open issues: Các issue đang được assign cho tài khoản đang login, chưa hoàn thành (To do, Inprogress)
- Reported by me: Các issue được tài khoản đang login tạo ra
- All issues: Tất cả các issue của tất cả các Tài khoản
- Open issues: Tất cả các issue đang ở trạng thái Open (Inreview/ Resolve, Inprogress, To do)
- Done issues: Tất cả các issue đã hoàn thành (trạng thái là Done/Close)
- Viewed recently: Tất cả các issue được xem gần đây 
- Created recently: Tất cả các issue mới tạo gần đây
- Resolved recently: Tất cả các issue mới hoàn thành gần đây
- Update recently: Tất cả các issue mới có update gần đây

### 3. Tạo mới 1 issue
- Click vào icon dấ (+) [Create Issue] để tạo mới 1 issue
(hoặc có thể nhân phím tắt là chữ C)

![](https://images.viblo.asia/5feec17c-fc28-43ed-a38f-778d116706f5.png)

*Note:* 
*Các mục có dấu* (*) *là bắt buộc phải nhập*
*Các mục này có thể cho hiển thị hoặc tát ở [Configure fields]*
Chi tiết các mục mình mô tả dưới đây:

**1. Project***: Chọn tên dự án (Issue tạo ra cho dự án nào). Với trường hợp bạn được add vào nhiều dự án, thì việc chọn dự án này rất quan trọng, nếu ko chú ý, có thể tạo nhầm dự án

**2. Issue Type***: Chọn loại issue 
Có thể là: Bug, Task, Epic….. (Loại issue này còn phụ thuộc vào việc Customize Jira của công ty đang sử dụng để phù hợp tình hình quản lý)
Việc chọn loại issue sẽ thay đổi 1 vài item trên form, nên cần chú ý

**3. Summary***: Nội dung tóm tắt ngắn gọn mô tả cho Issue cần tạo

**4. Reporter***: Mặc định hệ thống sẽ nhận diện là User đang login

**5. Description**: Nhập mô tả cho issue, ví dụ: 

- Môi trường
- Browser
- Device
- Steps thực hiện 
- Kết quả mong muốn…

Ở đây có thể định dạng Font, mầu chữ, chèn file, ảnh, …. để dễ quan sát
Phần mô tả này thì sẽ phụ thuộc vào loại issue, mà sẽ có mô tả như nào. Thông thường mình thấy description mô tả chi tiết thì việc giải quyết issue sẽ nhanh hơn

**6. Priority**: Mức độ ưu tiên. Tuy là mục option, nhưng nên đánh độ ưu tiên, để chú trọng giải quyết những issue quan trọng trước (Nếu không chọn thì mặc định đang để là Medium)

**7. Labels**: Chọn nhãn, hoặc đặt nhãn mới để có thể thống kê, tìm kiếm dễ dàng hơn. Ví dụ tên nhãn là tên các chức năng, nghiệp vụ

**8. Original Estimate**: Thời gian dự kiến hoành thành

**9. Remaining Estimate**: Thời gian còn lại để hoàn thành

**10. Environment**: Môi trường sử dụng là gì, hãy điền vào đây

**11. Attachment**: Gắn file đính kèm

**12. Due date**: Dự kiến ngày phải hoàn thành

**13. Linked Issues, Issue**: Liên kết tới issue nào đó đã có

**14. Assignee**: Người sẽ giải quyết issue

**15. Epic link**: Liên kết tới Epic tài liệu nào

Ở cuối form nếu tick chọn vào checkbox [Create another], thì sau khi create xong issue, sẽ giữ lại form trên màn hình, cho phép tạo issue tiếp theo

### 4. Thao tác với 1 issue
Với developer, thì việc thao tác với 1 issue sẽ nhiều không kém 1 Tester (hay QA)
- Mở Bug/Task thực hiện những
- Chọn các mục sau

![](https://images.viblo.asia/f5a8ed2e-1e19-4361-a916-ee0d43e8ba72.png)

**1. Edit**: Sửa lại issue. Cho phép sửa lại hầu hết các mục như khi tạo mới issue

**2. Comment**: Add thêm comment

- Thường dùng khi thực hiện 1 task/bug, sẽ comment qua lại để trao đổi, hoặc chỉ đơn giản là comment fix bug, hoặc thực hiện task xong chưa, thực hiện được deploy vòa bản nào
- Có thể gắn thêm user khác vào (sẽ bắn mail. push notify báo cho user đó) bằng cách viết: @[+tên user]

**3.  Assign**: Đổi lại Assignee

Đôi khi trong dự án, có 1 task, bug... assgin cho 1 ai đó (hoặc cho mình) nhưng là do assign nhầm, hoặc muốn đổi lại sang cho member khác làm, thì ta có thể sửa lại mục này

**4. In Progress**: Chuyển trạng thái sang [In Progess] cho bug/ task khi bug/task đang trong giai đoạn thực hiện, nhưng chưa hoàn thành

**5. Workflow**: có 2 lựa chọn [In review] và [Done]

[In review] thường dùng để đánh dấu là task/ bug đã hoàn thành giai đoạn thực hiện, còn chờ kiểm tra lại

[Done] thường dùng để đánh dấu task/bug đã hoàn tất kiểm tra
note: mục này còn tùy thuộc vào từng phiên bản Jira, hoặc tùy thuộc vào việc customize Jira, nên có thể sẽ khác

**6. Share**: Chia sẻ với user khác

**7. Export**: Xuất file ra format khác  (thường là Excel, hoặc CSV)

**8. Option**: Thêm rất nhiều lựa chọn thao tác với issue

- Log work: Log từng mốc thời gian thực hiện của Task/Bug
- Attach files: Đính kèm thêm file
- Create sub-task: Tạo SubTask cho Issue hiện tại
- Convert to sub-task: Chuyển issue hiện tại thành subtask của 1 issue nào đó...

### 5. Tìm kiếm, lọc issue
Mục này đôi khi hay bị bỏ qua, nhưng nó rất hữu ích. Nhất là khi bạn cần tìm issue nào đó, hay là list những issue nào đó mà danh sách thì quá dài,...
- Vào Menu / Issues and filter / All issues
- Nếu danh sách issues đang hiển thị dạng 1 cột List, 1 cột Detail thì nên chuyển sang chế độ chỉ có List Issue cho dễ quan sát, bằng cách: Click vào [Advanced search] góc trên bên phải màn hình 

![](https://images.viblo.asia/18474b1e-ccd3-4e00-ad77-623040aed7d9.png)
![](https://images.viblo.asia/83bc98e3-f837-40b9-a83c-23028d04d99e.png)

Các mục hay sử dụng

**1. Project**: Chọn tên dự án 

**2. Type**: Chọn kiểu issue (Bug, Task, Epic, SubTask ….)

**3. Status**: Trạng thái của Issue (To do, In Progress, In review / Resolve, Done / Close, Cancel…)

**4. Assignee**: Tên user được phân giải quyết issue

**5. Textbox** (Contains text): Nhập từ khóa có chứa trong issue cần tìm

**6. More**: Thêm nhiều tiện ích hay được dùng để tìm kiếm hơn như:

- Updated Date
- Created Date
- Reporter
- Label
- Description
- Priority...

Ngoài ra chúng ta có thể customize việc hiển thị các cột trên list danh sách, bằng cách vào [Columns] để lựa chọn

***Ví dụ:*** Lọc theo điều kiện sau:
Các bug, đã hoàn thành, được assign giải quyết là user hiện tại, và thuộc các chức năng...

Sẽ thực hiện:
- Chọn dự án
- Type: Bug
- Status: Done
- Assignee: Current User
- More, chọn Label, sau đó chọn các Label theo chức năng tương ứng
kết quả sẽ thu được dưới hình
![](https://images.viblo.asia/7a99fe00-630f-46f8-9843-c468fa9183d5.png)


***Tóm tắt**: Trên đây chỉ là những phần cơ bản hay dùng tới của member trong dự án. Với cách thao tác với Issue, Hay lọc, tìm kiếm rất hữu ích với Developer. Tuy nó không phức tạp, nhưng đôi khi ít dùng sẽ quên. Những phần cao cấp hơn, thì mình xin phép chia sẽ sau khi có thời gian.*

*Mong rằng bài viết có ích cho những bạn chưa quen, hay chưa có kinh nghiệm dùng Jira sẽ bớt bỡ ngỡ hơn*