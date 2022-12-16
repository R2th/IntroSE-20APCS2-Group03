**Trong phát triển phần mềm, bug là không tránh khỏi. Vậy khi nhìn thấy bug thì chúng ta cần log bug, nhưng log bug gồm những thông tin gì. Hôm nay mình sẽ chia sẻ các bạn một bug gồm các thông tin gì nhé!**

- Có rất nhiều công cụ để chúng ta log bug: redmine, backlog, jira,... chúng ta có thể tạo template log bug theo format chung để dễ quản lý, nhưng nhìn chung thì đều bao gồm các thông tin cơ bản sau:
## 1. Tracker/ticket type :  phải được chọn là "Bug"

Như vậy có thể dễ dàng filter tìm kiếm danh sách các bug mà không lẫn với các Feature và Task .

## 2.  Subject : phải mô tả ngắn gọn, dễ hiểu và súc tích

- Nên gắn title name cụ thể, tương ứng môi trường nào, với màn hình nào, nội dung khái quát của bug là gì
 VD: [Android] [Login screen]  "Login" button layout is broken

## 3. Description
### 3.1 Overview của bug
- Overview của bug cần ngắn gọn, dễ hiểu, mô tả tổng quan về bug, nêu lên vấn đề phát sinh và điều kiện phát sinh vấn đề đó (nếu có).
- Overview của bug cần phải bao gồm các từ khóa quan trọng và dễ nhớ.
### 3.2  Các bước tái hiện bug
- Cần mô tả điều kiện xảy ra bug " Precondition "
  + Trước khi bug xảy ra thì bạn đang ở màn hình nào?
  + Khi bug xảy ra thì bạn đã đăng nhập theo roll account nào (member/admin/…)?
  + Bạn đang sử dụng chức năng nào dưới nền thì bug xảy ra (chạy video/music/…)?
  + Bug chỉ xảy ra khi có những điều kiện gì thỏa mãn (một lỗi khác xảy ra trước/chuyển màn hình theo một trình tự cụ thể/sự thay đổi về phần cứng hay config thiết bị/…)?
- Cần mô tả đầy đủ "step by step" cụ thể, để bất cứ dev hay tester khác đọc có thể hiểu được cách tái hiện bug như thế nào.
 - Đối với các value input or account test thì mô tả luôn trong step để dễ tái hiện hơn.
 VD.  Step1. Login successfully with account valid (Tester/ 123456)
   + Hãy đảm bảo rằng các bước thực hiện phải chi tiết, chính xác, ngắn gọn, đầy đủ thông tin (có thể kèm theo loại thiết bị gây lỗi, account xảy ra lỗi, tên của test data,…)
   + Các bước thực hiện nên cover toàn bộ quá trình tái hiện bug, bao gồm cả các bước tái tạo Precondition
   + Cần confirm kết quả của từng bước (OK/NG) kèm theo những biểu hiện khác mà bạn cho là quan trọng (nếu có)

### 3.3 Expected Result  phải chính xác

- Expected Result là kết quả mong đợi, kỳ vọng của một hành động hoặc tổ hợp hành động được thực hiện trên sản phẩm. 
- Kết quả mong đợi chủ yếu dựa trên Requirement của khách hàng. Tuy nhiên khi Requirement không đủ chi tiết hay thiếu rõ ràng, thiếu hợp lý thì QA cần phải dựa trên quan điểm người dùng (common senses) để đánh giá và xác định một mức phản hồi chấp nhận được (compromise) mà khách hàng không phản đối và dev cũng cảm thấy đồng tình.

### 3.4. Actual Result phải  mô tả chi tiết:

- Actual Result  là hiện trạng bug xảy ra trên sản phẩm, không đúng so với Expected Result
- Do vậy, Actual Result nên được viết lại dựa trên  Expected Result để người đọc dễ dàng phân biệt chúng với nhau.

### 3.5. Môi trường test
- Bug được tái hiện trên những hệ máy nào (laptop/mobile)? Bug xảy ra  trên kích cỡ màn hình độ phân giải bao nhiêu?
- Bug đã được tái hiện trên hệ điều hành nào? (Windows/Ubuntu/Mac/OSX/Android/iOS)? Bug xảy ra trên trình duyệt cụ thể nào không (Chrome/Firefox/Safari/IE)? Bug xảy ra trên version bao nhiêu?
- Bug được tái hiện trên ipa/ apk nào? server test gì?
- VD 
  - Device:  iPhone 6s
  - OS version:  iOS 9.0
  - Server version: 
  - iPA/Apk:
### 3.6. Tỷ lệ % tái hiện bug
- Nhất là đối với app iOS/Android, nhiều bug phát sinh mà tester tái hiện nhiều lần mới xảy ra bug. Vì vậy cần điền % tái hiện bug là bao nhiêu? Nếu tỷ lệ tái hiện thấp, thì có thể set độ ưu tiên thấp để dev fix giai đoạn sau
## 4. Status 
- Khi tạo bug mới sẽ để status là "New"
- Tùy vào các dự án khác nhau, quy trình khác nhau để thay đổi thành các status tương ứng cho hợp lý : In Progress, Resolved, Testing, Tested, Feedback, Staging Closed, Closed, Approved, Pending
## 5. Priority
- Khi log bug cần đánh giá độ ưu tiên của bug để dev dựa vào list bug, có thể fix bug có độ ưu tiên cao trước
- Độ ưu tiên của bug bao gồm các trạng thái, sắp xếp theo thứ tự: Immediate > Urgent > High > Normal > Low

## 6. Assignee
- Khi log bug cần assign bug cho dev phụ trách fix bug hoặc leader dev để phía dev tự chia bug cho nhau fix.
## 7. Target version
- Cần set target version chính xác, tương ứng với mốc milistone của dự án, gắn theo ticket Feature/Task cha.
## 8. Parent task
- Cần gắn id ticket cha vào bug để dễ focus quản lý, thống kê các bug của Task nào, số lượng bao nhiêu, đã fix bao nhiêu bug, còn bao nhiêu bug
## 9. Start date
- Chọn start date chính là ngày tester log bug, tránh copy bug và quên chưa thay đổi ngày nhé. Vì sẽ ảnh hưởng đến due date của các bạn dev fix bug
## 10. Bug Severity 
- Một số công ty thêm cả phần Bug Severity  để đánh giá mức độ ảnh hưởng của bug đối với toàn hệ thống? khả năng degrade khi fix bug sẽ như thế nào.
## 11. Evidence
-  Log bug thì cần kèm theo hình ảnh, video để có thể nhìn bug trực quan và dễ hiểu hơn.
-  Có thể chọn Files -> Chọn tệp tin và dính kèm vào bug
-  Trường hợp dung lượng lớn hơn (Maximum size), thì có thể đẩy video lên thư mục dự án và get link video vào ticket log bug
## Tổng kết
- Đây là Template lý tưởng mà một Bug Ticket nên được viết. Với dự án nhỏ, số lượng team member nhỏ thì có thể đơn giản hóa hoặc thu gọn teamplate.
- Tester nên có sự trao đổi, confirm với dev để tìm hiểu thêm về bug và thống nhất ý kiến về giải pháp trước khi log bug.
- Bug Ticket cần được assigned cho Dev khi được tạo ra. QA sẽ quyết định xem bug được add  vào Sprint nào tùy vào độ ưu tiên và tính nghiêm trọng.
- Dev cần chuyển status của Bug Ticket từ  "New" sang " In progess" sau khi bắt đầu fix bug, và sẽ assign lại cho QA khi bản fix đã được approved/merged/deployed.
- Tester khi verify bug sẽ phải note lại  viewpoint các case đã test gồm các case nào? version test? môi trường test mà Bug được fixed 100% và chuyển "Closed". Nếu bản fix chưa xử lí triệt để và vẫn còn bug,  tester assign lại Bug Ticket cho Dev và để status là "Feedback".
-  Quy trình mỗi dự án, mỗi công ty khác nhau, chúng ta cần xem xét thống nhất một flow để hoạt động dự án hiệu quả và tốt nhất có thể nhé.