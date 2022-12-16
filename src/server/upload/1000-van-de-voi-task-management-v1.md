# Là một QA/Tester đã bao giờ bạn đã từng băn khoăn?
1. Khi nào quản lý working time bằng task?
2. Nội dung ticket phải viết như nào cho hiệu quả nhất?
3. Làm gì với bug tái phát và bug bị trùng lặp?
4. Quản lý status và relate giữa các ticket?
5. Phải quản lý checklist như thế  nào khi có bugs và change request?

# Vậy khi nào quản lý working time bằng task?
Khi làm dự án, việc dev chia chức năng ra để làm và quản lý bằng task chắc hẳn rất quen thuộc. Nhưng các bạn đã bao giờ thấy QA/Tester quản lý working time bằng task chưa?
câu trả lời là có, Khi được khách hàng yêu cầu. 
![](https://images.viblo.asia/46042151-bc5c-4193-8cb6-5ee0cd80f10e.jpg)

### Vậy tại sao chúng ta những QA/Tester lại không quản lý working time bằng task?
1. Thứ nhất phải kể đến rất mất thời gian report/update tiến độ ở rất nhiều chỗ (ví dụ như: redmine, file quản lý, daily report ...)
2. Status ticket kể cả đã được closed nhưng cũng chưa được xác thực, rất khó control do pending Q&A, change request liên tục, đóng bugs để tạo bugs mới cho dễ folow...
### Để Quản lý working time, chúng ta nên làm gì?
1. Quản lý tiến độ bằng file tiến độ riêng
2. Actual thực tế chính là bugs gắn kèm ticket cha bên dev team
=> vừa tương tác với dev team, vừa quản lý tiến độ với team QA 

# Việc tạo Ticket hiệu quả
### Hiện trạng
1. Nội dung bug quá ngắn gọn, chỉ gồm 1- 2 câu
2. title bug chưa phản ánh rõ nội dung của bug
3. Description chưa được mô tả rõ ràng từng step 
4. không có link màn hình mà chỉ có tên màn hình 
5. Prefix trên title không được thống nhất 
6. Data sử dụng tái hiện ko được attach vào bug  Hoặc chụp ảnh EVD nhưng không note forcus vào vị trí sẩy ra bugs
7. Sử dụng open link để store evidences
8. Không note rõ môi trường tái hiện bug, Evidence đơn giản nhưng quay video với các định dạng khác nhau
### Khó khăn
1. Không nhận biết được đang miêu tả actual hay là expect cho nên mất thời gian trao đổi giữa các bên
2. Gây khó khăn cho dev hoặc support vào closed
3.4.6. Dễ gây nhầm lẫn hoặc không tái hiện được bug
5. Khó khăn trong việc quản lý khối lượng bugs cho từng đơn vị function/screen
7. Lộ thông tin của dự án
8. số máy ko cùng chủng loại ko support file video ko open được
### Cách khắc phục 
1. Viết đơn giản ngắn gọn nhưng vẫn phải đủ những thông tin để có thể tái hiện/ re-test closed bug 1 cách dễ dàng ko phải cho bản thân mà cho cả những người khác nữa
Môi trường test
Account test
Link test
Step tái hiện 
Actual/expect 
Data test : data lớn, import/export file, upload file...
2. Prefix phải được thống nhất định nghĩa trên title hoặc sử dụng category là screen name để dễ dàng phân biệt 
3. Tuyệt đối ko sử dụng những Public link để store evidence
4. Những bugs thực sự khó tái hiện step phức tạp cực kì thì mới quay video (ưu tiên định dạng gif)

# Làm gì với bug tái phát và bug bị trùng lặp?
### Hiện trạng
- Cứ có bug dù trùng lặp nhiều lần -> open bug mới
- Re-open liên tục bug mà đã có thể closed cả tỉ lần 
- Bug  tương tự trên các ID màn hình khác nhau cùng tại thời điểm check bug cho cùng hiện tượng-->Mỗi màn lại log 1 bug 
### Khó khăn
- Bug closed từ tám đời cứ lôi lên như là để chỉ trích mặc dù QA ko cố ý
- Không nắm được nguyên nhân mặc dù nó xảy ra nhiều hơn 1 lần
- Bên DEV có 1 số dự án đánh giá chất lượng = số lượng bug nên đôi khi làm dev khó chịu
### cách khách phục 
- Bug cùng 1 sprint hoặc đợt release → reopen ko create new 
- >Tránh lack bug do nhiều ng test những màn hình khác nhau và ko rõ có cùng nguyên nhân 
- Vẫn log bug và gắn related tới bug đã log
- Gắn thêm ID hoặc note vào bug đã có 
- Có thể thêm Duplicate = Yes đối với những bug có hiện tượng giống nhau 
-> Càng tách nhỏ, càng dễ quản lý



-----------