Chắc hẳn bạn đã nghe qua về phần mềm tự động hoá quy trình Robotic Process Automation (RPA) như UiPath, IBM RPA,.... Tôi đang nghiên cứu về giải pháp Brity RPA của Samsung SDS để triển khai cho khách hàng. Nếu bạn đang tìm một giải pháp tự động hoá quy trình cho doanh nghiệp, Brity RPA Brity RPA của Samsung SDS là một giải pháp tự động hoá bạn nên tìm hiểu.
![](https://images.viblo.asia/885ccbb0-8405-40ec-bde6-da26c92695f6.png)
## Tổng quan
### Read first
* Tài liệu này được soạn theo một cách hiểu đơn giản, tinh gọn mọi thứ để bạn có cái nhìn cơ bản về Brity RPA và sẵn sàng join dự án ngay sau khi đọc xong tài liệu này.
* Trong tài liệu này có sử dụng lại một số tài liệu được soạn bởi anh Nguyễn Minh Quân.
* Bạn có thể tự tìm hiểu giải pháp Brity RPA tại đây: https://www.samsungsds.com/global/en/solutions/off/brity/brity.html
* Hướng dẫn chi tiết sử dụng Brity Works Designer bằng tiếng anh: https://www.samsungsdsbiz.com/help/RPA_Client_Eng_1_6
* Download Brity Works Designer: https://brityworks.samsungsds.com:8080/basic/download/client/designer?type=saas
* Download Brity Works BOT: https://brityworks.samsungsds.com:8080/basic/download/client/bot?type=saas
* Control Panel của Brity RPA: https://bwrpa.samsungsds.com/user/index#dashboard
### Giải pháp Brity RPA
Giải pháp Brity RPA của Samsung SDS là một giải pháp tự động hoá quy trình giúp tăng năng suất công việc cho doanh nghiệp. Nó sẽ thực hiện công việc lặp đi lặp lại.
### Chức năng
#### Designer
* Là phần mềm thiết kế Workflow/Templates và cơ chế tự động hoá dựa trên yêu cầu của khách hàng về một quy trình công việc cụ thể.
* Tại đây bạn sử dụng thư viện có sẵn và sự tuỳ biến của bạn để có một workflow theo yêu cầu. Bạn có thể dùng code javascript để viết thêm các chức năng cho nó.
* Nó được tích hợp BOT để chạy thử và kiểm tra Workflow/Templates trong khi thiết kế.
#### RPA Server
* Lưu trữ, quản lý Project được tạo từ Designer và push lên RPA Server.
* Quản lý, giám sát BOT.
* Cấu hình các công việc, lên lịch cho BOT thực hiện.
* Tạo và xuất báo cáo công việc của BOT.
#### BOT
* Nhận Process từ RPA và thực hiện Project theo cấu hình của Project và RPA Server.
* Log trạng thái công việc và report về RPA Server.
### Hoạt động
#### Tổng quan sự tương tác giữa các services trong RPA
![](https://images.viblo.asia/54d35a75-5ee9-47ef-a776-9128eaa6e5ab.png)
Một flow làm việc của Brity RPA:
1.	Người thiết kế Workflow sử dụng Desinger tiến hành thiết kế Project theo yêu cầu của khách hàng.
2.	Desginer push Project đã làm lên RPA Server.
3.	Trên RPA Server, User config Project cần thực hiện cho BOT đã được cài đặt trên client. 
4.	BOT tại client sẽ được RPA Server nạp Project xuống và chạy.
#### Ví dụ chi tiết về sự tương tác giữa các services
##### Case 1: Upload một project/ process mới lên RPA server
![](https://images.viblo.asia/16bc084d-1ef8-4ee5-9f50-cd46b894682d.png)
Step 1: Designer sẽ đẩy Project/ Process mới lên RPA Server qua API giữa Designer và RPA Server.
Step 2: RPA Server API đẩy Project/ Process xuống Database.
Step 3: Database trả status đẩy dữ liệu về RPA Server. 
Step 4: RPA Server trả status đẩy Project/ Process về Designer GUI cho User.
##### Case 2: Config một process/ workflow cho một BOT trên RPA server
![](https://images.viblo.asia/18ffc61c-088a-430e-8952-e8b1944f8d2e.png)
Step 1: Trên RPA Server, User vào process/ workflow đã được lưu và chọn/ schedule BOT để thực hiện process/ workflow đó.
Step 2: RPA Server API đẩy thông tin đã config xuống Database.
Step 3: Database trả status lưu thông tin về RPA Server.
Step 4: RPA Server API gửi thông tin process/ workflow và schedule đã config đến BOT.
Step 5: BOT trả status nhận request về RPA Server.
##### Case 3: BOT thao tác trên 1 server/device client
![](https://images.viblo.asia/6de126f0-abdd-46da-960a-53225b2e7d93.png)
Step 1a: BOT thực hiện công việc theo config lịch: tương tác với API và UI của server/device client để thực hiện process/ workflow
Step 1b: BOT trả thông tin status công việc real time về RPA Server
Step 2: RPA Server API lưu thông tin BOT trả về xuống Database
Step 3: Database trả status đẩy dữ liệu về RPA Server.
## Brity Works Designer
Giao diện chính
![](https://images.viblo.asia/c1b70a73-b41e-4ed2-87d6-ddbfe26d1dd1.png)
1. Menu chính.
2. Thanh công cụ để tương tác với vùng thiết kế.
3. Project tab hiển thị Project đang thiết kế.
* Process: là một quy trình để thực hiện một công việc
* Task: là một công việc nhỏ trong một quy trình
* Share Task: là Task để nhiều Project dùng chung. Trong scope này chưa nhắc tới.
* Event: giống như Exception. Khi có lỗi, câu Try không đúng thì Catch sẽ thực hiện Event được chỉ định sẵn. Trong scope này chưa nhắc tới.
* Custom Libraries: bạn có thể thêm thư viện Javascript, C# vào. Trong scope này chưa nhắc tới.
* Resources: nó là những thứ mình cần dùng trong Project, là một file mp3, một bức ảnh hay một file text.
4. Thư viện chứa function để làm việc với vùng thiết kế.
* FlowControl: tập hợp các câu lệnh if else, for, while,..
* App: tập hợp các tương tác với ứng dụng.
* Web: tập hợp làm việc trên web (như một simulator).
* Excel: tập hợp các lệnh làm việc với Excel.
* System: tập hợp các lệnh tương tác với Windows và hệ thống.
* Orchestrator: tập hợp các lệnh tương tác với RPA Server.
* ImageRecognition: muốn dùng những chức năng này bạn cần có OCR.
* SAP: tập hợp các lệnh tương tác với phần mềm SAP ERP.
5. Vùng thiết kế: tại đây bạn có thể kéo thả, di chuyển các function làm sao cho phù hợp.
6. Nơi lưu những share resource và biến chạy trong Project/Process/Task.
7. Properties của một function kéo từ thư viện sang vùng thiết kế.
# Thiết kế một Project về một Process đơn giản
## Mô tả Process
Project này thực hiện một công việc được lặp đi lặp lại là: Đọc file excel -> Sau đó fill các row trong bảng tính sang Google Form (có nhiều cách làm khác đơn giản hơn, nhưng mình demo ở đây để bạn hiểu phải dùng công cụ gì trong Brity Works Designer để thiết kế lên Workflow.
## Thực hiện Project
Tôi đã cố gắng làm video clip để bạn có thể làm theo. Bạn có thể xem qua video này.
{@embed: https://www.youtube.com/watch?v=Pf5qIRW6etw%26cache=false}