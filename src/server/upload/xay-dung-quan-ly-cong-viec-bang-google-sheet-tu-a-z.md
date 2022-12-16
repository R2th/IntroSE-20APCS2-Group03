Chào anh chị và các bạn, 
Mình là Tô Thuật chuyên hệ thống sử dụng ứng dụng google sheet cho các ứng dụng CRM Google sheet (Quản lý khách hàng bằng Google Sheet) và ứng dụng quản lý công việc bằng Google Sheet. Ngày hôm nay Thuật xin gửi tới mọi người cách quản lý công việc bằng Google Sheet. 

## Bài toán  lý công việc bằng google sheet
Làm sao để quản lý công việc các nhân viên trong công ty, phòng ban bằng ứng dụng Google sheet ? Đáp ứng được các vấn đề sau: 
- Giao việc cho nhân viên 
- Giao việc một cách tự động công việc lặp lại theo ngày/ tháng/ tuần/ quý 
- Thông báo khi có có công việc được giao từ Admin 
- Thông báo khi có công việc cần duyệt cho Admin, để Admin duyệt công việc đó 
- Báo cáo truy xuất tỷ lệ công việc hoàn thành, đang làm, chưa làm, quá hạn. Để từ đó đưa ra những quyết định và hướng đi cho cá nhân, team đội, phòng ban.
-

## Phương pháp quản lý công việc bằng Google Sheet
- Ứng dụng nền tảng: Google Sheet để lưu trữ dữ liệu 
- Ứng dụng Telegram để thông báo 
- Ứng dụng báo cáo: Google Data Studio để chạy báo cáo 

**Luồng đi của hệ thống sẽ hình thành như sau:** 
1. Admin giao việc -> Nhân viện nhận việc -> xử lý công việc -> Báo hoàn thành -> Admin Duyệt -> hệ thống sẽ lưu trữ 
2. Nhân viên tự giao việc cho chính mình -> Xử lý công việc -> Báo hoàn thành -> Admin Duyệt -> Hệ thống sẽ lưu trữ 

**Hệ thống báo cáo ở các điểm sau: **
1. NV Nhận được công việc từ admin giao 
2. NV hoàn thành công việc 
3. Admin duyệt công việc của Nhân Viên 

## Demo quản lý công việc bằng Google Sheet
- Giao việc cho nhân viên 
- Xét duyệt tình trạng công việc 
- Thông báo khi nhận được công việc mới được giao và khi hoàn thiện công việc.
- Hệ thống báo cáo trực quan 


![](https://images.viblo.asia/830bf74e-37b0-4e22-899d-393327a287dc.png)

Bước 1: Xây dựng hệ thống file cho nhân viên 
- Xác định các dữ liệu cần có trong hệ thống 
* Ngày Tạo CV	
* Tên CV	
* Mô Tả CV	
* Ngày Bắt Đầu	
* Ngày Kết Thúc	
* Loại Công Việc	
* Trạng Thái Công Việc	
* Mức Độ Ưu Tiên

![](https://images.viblo.asia/6223a303-4c3f-4c2f-970b-0664dfd2025f.png)
Bước 2: Xây dựng báo cáo cho nhân viên 
Các chỉ số báo cáo theo từng phong ban, chẳng hạn như các chỉ số sau: 
- Báo cáo theo số lượng trạng thái công việc 
- báo cáo theo tần suất công việc xử lý / 1 ngày/ 1 tuần của nhân viên 

![](https://images.viblo.asia/0f5a8d1c-7127-4a90-abc4-484d3e1cae07.png)

Bước 3: Xây dựng biểu đồ theo thời gian thực đối với các hạng mục công việc 
Xây dựng biểu đồ theo thời gian thực để đánh giá công việc nào cần thiết phải xử lý trước và ưu tiên.




## Tài liệu tham khảo

File mẫu dự án: https://docs.google.com/spreadsheets/d/1ibTf2UYbEWDuHS9-3sLJW2g3AGMV5EXnj8AP85cXvKU/edit?usp=sharing

Anh chị tải về và sử dụng

Demo dự án ở video: https://www.youtube.com/watch?v=5xNCPkgIv6s


Cám ơn mọi người, hy vọng với bài chia sẻ của mình đối với việc ứng dụng Google Sheet vào việc phân công công việc cho nhân viên, đội nhóm đạt hiệu quả cáo trong công việc. 
Tô Thuật xin cám ơn !