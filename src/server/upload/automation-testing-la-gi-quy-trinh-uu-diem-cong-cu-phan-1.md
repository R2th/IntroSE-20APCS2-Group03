## Automation Testing - Part1

### Automation Testing là gì?
Manual Testing được thực hiện bởi người kiểm thử, lặp đi lặp lại công việc bằng việc test tay.
Automation Testing được thực hiển bởi công cụ kiểm thử để thực hiện các bộ testcase.
Phần mềm tự động có thể nhập dữ liệu test vào hệ thống được thử nghiệm, so sánh kết quả mong muốn và kết quả thực tế, đưa ra báo cáo chi tiết. Kiểm thử tự động cũng đòi hỏi đầu tư đáng kể vào chi phí và nguồn lực.
Chu kỳ phát triển nối tiếp sẽ yêu cầu thực hiện các bộ test lặp lại nhiều lần. Việc sử dụng công cụ kiểm thử tự động, nó có thể ghi lại bộ test này và chạy lại khi được yêu cầu. Khi bộ test được chạy tự động, sự can thiệp của con người là không cần thiết. Mục đích của tự động là làm giảm số lượng testcase được chạy thủ công và không hẳn sẽ loại bỏ kiểm thử thủ công.

### Tại sao lại là Automation Testing?
Kiểm thử phần mềm tự động là quan trọng vì những lí do sau:
* Việc kiểm thử thủ công tất cả các quy trình, các lĩnh vực, các kịch bản dường như rất tốn thời gian và chi phí
* Thật khó để kiểm thử thủ công các trang web đa ngôn ngữ
* Kiểm thử tự động không yêu cầu có sự can thiệp từ người kiểm thử. Bạn có thể chạy qua đêm mà không cần giám sát
* Kiểm thử tự động giúp tăng tốc độ thực thi kiểm thử
* Kiểm thử tự động giúp tăng độ bao phủ
* Kiểm thử thủ công có thể trở nên nhàm chán và dễ bị lỗi

### Những trường hợp để kiểm thử tự động?
Các trường hợp kiểm thử tự động được lựa chọn sử dụng theo các tiêu chí sau để tăng tự động hóa:
* Rủi ro cao - Các trường hợp kiểm tra quan trọng
* Các trường hợp được thực thi lại nhiều lần
* Các trường hợp rất tẻ nhạt hoặc khó để kiểm tra thủ công
* Các trường hợp tiêu tốn nhiều thời gian

### Phân loại các trường hợp không phù hợp cho kiểm thử tự động:
* Các trường hợp được thiết kế mới và chưa được thực hiện thủ công ít nhất một lần
* Các trường hợp luôn có sự thường xuyên thay đổi về yêu cầu 
* Các trường hợp được thực hiện dựa trên các trường hợp đặc biệt

### Quy trình kiểm thử tự động

![](https://images.viblo.asia/bee21602-2886-476e-af1d-cc9926d06bf3.png)

### Lựa chọn công cụ kiểm thử tự động
Công cụ kiểm thử tự động được lựa chọn phụ thuộc vào ứng dụng đang được xây dựng. Ví dụ, [QTP](https://www.guru99.com/quick-test-professional-qtp-tutorial.html) không hỗ trợ tin học, vì vậy nên QTP không thể được sử dụng cho ứng dụng tin học. 

### Xác định phạm vi 
Phạm vi tự động là phạm vi mà ứng dụng của bạn đang tiến hành thử nghiệm. Các điểm sau giúp bạn xác định phạm vi:
* Mang tính chất đặc thù kinh doanh
* Kịch bản với lượng dữ liệu lớn
* Các chức năng chung trên các ứng dụng
* Tính khả thi về kĩ thuật
* Sự mở rộng các thành phần kinh doanh được tái sử dụng
* Sự phức tạp  của các trường hợp kiểm thử
* Khả năng sử dụng các trường hợp kiểm thử tương tự để kiểm thẻ trên nhiều trình duyệt

### Kế hoạch, thiết kế và phát triển
Trong giai đoạn này, bạn cần tạo ra các kế hoạch và chiến lược tự động, bao gồm:
* Lựa chọn công cụ tự độg
* Thiết kế framework và các đặc điểm của nó
* Những điều trong phạm vi và ngoài phạm vi tự động
* Chuẩn bị thử nghiệm tự động
* Lên lịch, thời gian của kịch bản và thực thi
* Bàn giao sản phẩm kiểm thử tự động

### Thực thi kiểm thử
Kịch bản tự động được thực thi trong giai đoạn này. Kịch bản này cần dữ liệu đầu vào trước khi chúng được thiết lập để chạy. Khi chạy, chúng sẽ cung cấp chi tiết báo cáo thực thi
Sự thực thi có thể được thực hiện bởi các công cụ tự động trực tiếp hoặc thông qua công cụ quản lí thực thi - công cụ tự động

### Bảo trì
Khi các chức năng mới được thêm vào hệ thống, kịch bản tự động cũng cần được thêm vào, xem xét và bảo trì cho từng giai đoạn phát triển

### Framework 
Framework được hướng dẫn cài đặt trong:
* Duy trì tính nhất quán trong kiểm thử
* Cải thiện cấu trúc kiểm thử
* Sử dụng mã tối thiểu
*  Ít bảo trì mã
*  Cải thiện khả năng sử dụng lại
*  Người kiểm thử không có kĩ thuật có thể tham gia vào mã
*  Giảm thiểu thời gian đào tạo sử dụng công cụ
*  Liên quan đến dữ liệu bất cứ khi nào

**Dưới đây là 4 framework được sử dụng trong kiểm thử phần mềm tự động**
1. Data Driven Automation Framework
2. Keyword Driven Automation Framework
3. Modular Automation Framework
4. Hybrid Automation Framework

Xem tiếp: [Automation Testing - Part2](https://viblo.asia/p/automation-testing-la-gi-quy-trinh-uu-diem-cong-cu-phan-2-ByEZkGqyZQ0)

Tham khảo tài liệu: https://www.guru99.com/automation-testing.html