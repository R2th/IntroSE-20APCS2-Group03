*Xem link bài viết gốc tại: https://viblo.asia/p/bpm-tutorial-quy-trinh-xin-nghi-phep-phan-4-nhung-phan-phat-trien-them-GrLZDDXOZk0*
# Phần IV: Những phần phát triển thêm
Như vậy qua ba bài viết, mình đã trình bày qua cho những người mới bắt đầu những thành phần hết sức cơ bản của BPM, nhưng nhiêu đó kiến thức chỉ là những phần trăm rất nhỏ (nhưng khá quan trọng) trong quá trình làm một phần mềm dựa trên IBM BPM, để có thể phát triển quy trình xin nghỉ phép chi tiết hơn, các bạn hãy tiếp tục phát triển chức năng chi tiết theo những mile stone của mình đưa ra sau đây, dưới sự giúp đỡ của menter, team lead của các bạn, các giải pháp có thể linh hoạt miễn là đạt được mục đích.

## 1. Phần luồng process
- Thông báo quá hạn khi trễ thời gian phê duyệt, service **Thông báo quá hạn** sẽ được tích hợp với email service, để gửi mail cho quản lý khi quá hạn thời gian
- Tương tự Intermediate Event **Send mail từ chối** cũng vậy
- Service **Update HR Info** sẽ thực hiện lưu DB các thông tin về ngày nghỉ của nhân sự, các bạn sẽ cần người hướng dẫn tích hợp Database, hoặc đọc các bài viết sau của mình để xem hướng dẫn
## 2. Phần User Interface
- Có thể tích hợp thêm service và event On change của trường mã nhân viên, để khi nhập mã nhân viên vào ta sẽ hiển thị thêm thông tin (lấy từ Database) về ngày nghỉ còn lại của nhân viên, từ đó giúp nhân viên nghỉ phép phù hợp, và hơn nữa giúp tính toán nếu nhân viên nghỉ quá ngày phép thì ta sẽ tính ngày trừ vào lương.
- Process hiện tại chưa validate thông tin điền vào, nghĩa là nội dung bạn điền vào chưa được kiểm duyệt, trong một ứng dụng thực tế, các thông tin phải qua validation mới được chuyển đến bước tiếp theo (ví dụ mã nhân viên không được có chữ, họ và tên dưới 50 kí tự, không được chọn ngày nghỉ trong quá khứ,....) bạn sẽ phải viết thêm Script validation
## 3. User và Instance
- Trong tutorial hiện tại mới chỉ run instance ngay trên Designer, thực tế khi chạy test, bạn sẽ phải khởi tạo trên một thứ gọi là Process Portal. Lúc này mới là những thao tác chuẩn của những người dùng, và như vậy ta thấy user hiện tại là hết sức vô lý : ))) Nghĩa là phần việc bạn sẽ phải làm thêm là config thêm user để test, config các thuộc tính phòng ban cho user, và viết script để quản lý phòng ban nào sẽ chỉ có thể phê duyệt cho nhân viên của phòng ban đó màn thôi.
## 4. Sửa lỗi
- Fix tất cả các lỗi bạn thắc mắc bằng cách google search kèm keyword "IBM BPM", hoặc comment và bài viết luôn cho mình. chúc các bạn thành công!