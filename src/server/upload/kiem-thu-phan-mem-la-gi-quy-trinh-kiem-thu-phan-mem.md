# 1. Kiểm thử phần mềm là gì ?
Kiểm thử phần mềm (software testing) là hoạt động nhằm tìm kiếm và phát hiện ra các lỗi của phần mềm, đảm bảo phần mềm chính xác, đúng và đầy đủ theo yêu cầu của khách hàng, yêu cầu của sản phẩm đã đặt ra. Software testing cũng cung cấp mục tiêu, cái nhìn độc lập về phần mềm điều này cho phép đánh giá và hiểu rõ các rủi ro khi thực thi phần mềm. Các phương pháp kiểm thử phần mềm:
* Kiểm thử hộp trắng (white box testing): Trong kiểm thử hộp trắng cấu trúc mã, thuật toán được đưa vào xem xét. Người kiểm thử truy cập vào mã nguồn của chương trình để có thể kiểm tra nó.
* Kiểm thử hộp đen (black box testing) : Kiểm tra các chức năng của hệ thống dựa trên bản đặc tả yêu cầu.
*  Kiểm thử hộp xám (gray box testing): Là sự kết hợp giữa black box testing và white box testing

Kiểm thử phần mềm đóng vai trò rất quan trọng :
* Kiểm thử phần mềm là hoạt động đảm bảo chất lượng phần mềm và mang tính sống còn trong các dự án sản xuất phần mềm. Vì vậy nó đã trở thành quy trình bắt buộc trong các dự án phần mềm hiện nay.
* Kiểm thử phần mềm để tránh những rủi ro, lỗi phát sinh trong suốt quá trình tạo ra sản phẩm.
* Lỗi càng phát hiện ra sớm càng giúp tránh được rủi ro và chi phí.

Mục đích của kiểm thử phần mềm:
* Kiểm thử phần mềm để đánh giá phần mềm có đạt yêu cầu mong đợi hay có sai sót nào không?
* Phần mềm có làm việc như mong muốn không?
* Phần mềm có giải quyết được yêu cầu của khách hàng không?Nó làm được gì mà người dùng mong đợi?
* Người dùng có thích nó không?
* Nó có tương thích với các hệ thống khác của chúng ta hay không?
# 2. Quy trình kiểm thử phần mềm
Quy trình kiểm thử phần mềm xác định các giai đoạn, pha trong kiểm thử phần mềm.
![](https://images.viblo.asia/464e843f-a3b5-4855-b763-9ea1ce69e6dd.jpg)







| Quy trình| Đầu vào | Các hoạt động |Đầu ra|
| -------- | -------- | -------- |-------|
|Phân tích yêu cầu     | Tài liệu SRS, tài liệu thiết kế, bản prototype    | Đọc hiểu, nghiên cứu phân tích các yêu cầu có trong các bản tài liệu <br>Đưa ra các câu hỏi còn thắc mắc về yêu cầu phần mềm với BA, team, leader, khách hàng để hiểu rõ hơn về yêu cầu sản phẩm     |File Q & A     |
|Lập kế hoạch     | Các tài liệu đã được cập nhật thông qua file Q & A trong giai đoạn phân tích yêu cầu    | Xác định phạm vi kiểm thử: thời gian, lịch trình cho các công việc. <br>Xác định phương pháp tiếp cận.<br> Xác định nguồn lực: con người và thiết bị. <br>Lên kế hoạch thiết kế công việc test: các chức năng cần kiểm thử, cái nào cần thực hiện trước, sau, ai là người thực hiện...     |Test plan, checklist    |
|Thiết kế kiểm thử     | Test plan, checklist và các tài liệu đặc tả đã được cập nhật    | Review tài liệu: xác định công việc cần làm. <br>Viết test case/checklist. <br>Chuẩn bị dữ liệu kiểm thử: test data, test script. <br>Review test case/checklist: tránh rủi ro trong thiết kế test case     |Test design, test case, check list, test data, test automation script    |
|Chuẩn bị môi trường     | Test plan, smoke test case, test data    | Thực thi các smoke test case để kiểm tra môi trường kiểm thử đã sẵn sàng cho việc test chưa    |Môi trường đã được chuẩn bị sẵn sàng cho việc test và các kết quả của smoke test case    |
|Thực hiện kiểm thử     | Test design, test case, check list, test data, test automation script    | Thực hiện test theo kịch bản kiểm thử. <br>So sánh kết quả thực tế với mong đợi và log bug lên tool quản lý lỗi, theo dõi quá trình xử lý lỗi.   |Test results, defect reports    |
|Kết thúc    | Tất cả các tài liệu được tổng hợp từ giai đoạn đầu tiên    | Tổng kết báo cáo kết quả về việc thực thi test, chức năng nào hoàn thành/ chức năng chưa hoàn thành, lỗi còn nhiều ở chức năng nào, dev nào còn nhiều lỗi, lỗi có nghiêm trọng hay không...  |Test report, test results final    |

# Kết luận
Trên đây là quy trình kiểm thử phần mềm cơ bản mình muốn chia sẻ với mọi người. Tuy nhiên quy trình kiểm thử có thể khác nhau phụ thuộc vào từng công ty, tổ chức khác nhau nhưng mục đích cuối cùng vẫn là đảm bảo hoạt động kiểm thử phần mềm diễn ra xuyên suốt và nhất quán trong quá trình phát triển phần mềm.

Nguồn tham khảo: http://softwaretestingfundamentals.com/software-testing-life-cycle/