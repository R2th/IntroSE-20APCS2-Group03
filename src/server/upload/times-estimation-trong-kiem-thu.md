## 1. Tìm hiểu về Time Estimation 
![](https://images.viblo.asia/6d5c8006-6801-4920-b2e8-1b831fe22270.png)

Nhắc đến Estimate thì chúng ta có rất nhiều công việc liên quan đến Estimate như nguồn lực, thời gian, chi phí... tuy nhiên bài viết hôm nay mình muốn nhấn mạnh và tìm hiểu về Times Estimation trong kiểm thử. Times Estimation là việc ước tính thời gian một task sẽ hoàn thành. Đây là một trong những hoạt động quan trọng trong việc quản lý hoạt động test.

Chúng ta đã quá quen thuộc với cụm từ Deadline và làm sao để xóa bỏ nỗi sợ về cụm từ này? Deadline không hẳn được khách hàng, các sếp ấn định cho chúng ta mà có thể được chính chúng ta đưa ra nhưng tại sao việc chậm Deadline vẫn cứ diễn ra. Tất nhiên không nói về những rủi ro phát sinh thì nguyên nhân chính đó là do chúng ta Estimate chưa hợp lý.
Đối với một QA/ Tester thì chúng ta phải Estimate cái gì:
- Xác định thời gian hoàn thành việc  viết testcases cho một chức năng/ task
- Xác định thời gian hoàn thành việc test (bao gồm việc execute testcases và log bug) cho một chức năng/ task
- Xác định thời gian hoàn thành báo cáo test....


## 2. Hướng dẫn cách Estimate
Bước 1: Xác định phạm vi, độ khó của task

Thời điểm estimate hợp lý nhất nên là vào đầu mỗi sprint(đối với các dự án base theo mô hình Scrum) hay trong cuộc họp Plan meeting để cả đội Test và Dev cùng estimate thời gian hoàn thành task của họ. Từ đó đưa ra con số estimate cho cả dự án hay nói cách khác xác định thời gian release/ kết thúc sprint.

Cần đánh giá được độ khó của task để biết cách estimate cho hợp lý.

Bước 2: Chia task thành các subtask để có thể estimate dễ hơn và chính xác hơn. Cũng như để các member có thể chia task cho nhau
![](https://images.viblo.asia/48d127a8-0905-4095-aaa1-c12b1e49f1cd.png)

Bước 3: Chia task cho các thành viên hoặc để các thành viên tự nhận task. Sau đó estimate.

Bước 4: Tính tổng con số estimate của mỗi task con và đánh giá lại lần nữa để đưa ra con số estimate hợp lý 

**Chú ý:** 
- Người nào làm người đó chủ động estimate vì kỹ năng của mỗi người khác nhau nên thời gian cần để hoàn thành task cũng khác nhau. Ví dụ một QA senior sẽ test nhanh hơn một QA junior 
- Sau khi estimate xong nên xem lại toàn bộ con số estimate để cân đối cho hợp lý
- Nên xem xét một số rủi ro có thể sảy ra trong dự án ảnh hưởng đến hoạt động test : những ngày nghỉ của công ty trong sprint, một số member nghỉ đột xuất do ốm/ công việc cá nhân, có vấn đề gấp cần  chờ khách hàng confirm, sự delay từ dev

## 3. Một số tip để Estimate hiệu quả
**Tip 1:** Thông thường trong hoạt động phát triển phần mềm không phải function nào chúng ta cũng cần estimate cụ thể/ chi tiết. Chúng ta có thể estimate một vài function và đưa ra tỷ lệ cho các hoạt động từ đó estimate cho các function khác.

**Tip 2:** Dựa vào những task tương tự mà bạn đã làm để đưa ra con số estimate hợp lý. Hoặc bạn có thể base theo công thức trung bình một Tester có thể viết được 60-70 TCs/ 8hours và chỉ execute được 30-40 TCs. Còn tùy thuộc vào hệ thống hay chức năng đơn giản/ phức tạp hơn mà chúng ta đưa ra con số hợp lý. Để estimate được con số TCs có thể sử dụng các kỹ thuật test design technique để có cái nhìn tổng quát về số TCs có thể có.

 **Tip 3:**  Có thể nhờ các chuyên gia có kinh nghiệm hơn trong việc estimate để đưa con số esitmate hợp lý và độ chính xác cao.
 
 ## 4. Các kỹ thuật để Estimate
* Cấu trúc Work Break Down
* Kỹ thuật 3-Point
* Kỹ thuật Wideband Delphi
* Phân tích Function Point/Testing Point
* Phương pháp Use – Case Point
* Phân chia theo tỷ lệ phần trăm
* Phương pháp Ad-hoc

***Tài liệu tham khảo:*** https://www.guru99.com/an-expert-view-on-test-estimation.html