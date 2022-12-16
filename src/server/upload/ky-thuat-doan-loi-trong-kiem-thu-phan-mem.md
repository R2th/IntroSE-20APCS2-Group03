Đoán lỗi (Error Guessing) là một kỹ thuật kiểm thử phần mềm, về cơ bản, đây là một kỹ thuật kiểm thử dựa trên kinh nghiệm để đưa ra một phỏng đoán có chứng cứ về các lỗi có thể xảy ra của phần mềm. Kỹ thuật này nhất thiết đòi hỏi tester có năng khiếu và kinh nghiệm.

![](https://images.viblo.asia/02d1fb40-87cb-4a55-9a60-ed42dbfc8655.jpg)

### Kỹ thuật đoán lỗi
Các test case sử dụng để tìm lỗi được tạo ra dựa trên trải nghiệm kiểm thử trước đó với các ứng dụng tương tự, có kiến thức liên quan, dựa vào trực giác để xác định những tình huống thường gây ra lỗi trong phần mềm. 

Vì thế, kỹ thuật đoán lỗi không tuân theo bất kỳ quy tắc cụ thể nào, test case có thể được thiết kế tùy thuộc vào đặc trưng, luồng hoạt động của phần mềm theo các tài liệu mô tả chức năng hoặc khi một lỗi không mong muốn mà không được mô tả trong tài liệu được tìm thấy trước đó, hoặc làm việc với một dev đã để xảy ra lỗi nào đó nhiều lần,...

Ví dụ: 
- Sau khi upload ảnh và submit thành công, ảnh hiển thị đúng rồi, nhưng thử reload lại trang xem ảnh đó có hiển thị đúng nữa không?
- Trên màn hình search thường xảy ra lỗi search cả những record đã bị xóa (delete_flg = 1) vì vậy nên thêm vào test case gán delete_flg = 1 cho một số record rồi thực hiện search, nếu những record này được hiển thị trên màn hình thì là lỗi.
- Chia cho số 0.
- Nhập khoảng trắng vào trường văn bản.
- Nhấn nút gửi mà không nhập giá trị.
- Nhập số kí tự quá dài.
- Nhập các dữ liệu đặc biệt vào các textbox như kí tự html, script,...và submit.

### Các yếu tố được sử dụng để đoán lỗi
Kỹ thuật này chủ yếu dựa trên trực giác và kinh nghiệm. Các yếu tố sau có thể được sử dụng để đoán lỗi:
* Bài học rút ra từ các lần kiểm thử phần mềm trước, các lỗi thường gặp,...
* Trực giác kiểm thử
* Có kiến thức liên quan, hiểu rõ về hệ thống
* Tập trung test theo từng phần, từng chức năng sẽ giúp tester chú trọng và lý giải những vấn đề xảy ra ở vùng nào. 
* Production tickets
* Review checklist
* Giao diện người dùng
* Dựa vào báo cáo rủi ro của phần mềm
* Nhiều loại dữ liệu được sử dụng để kiểm thử
* Quy tắc kiểm thử chung
* Kiến thức về Application under Test - AUT (thay đổi điều kiện đầu vào trong kỹ thuật State Transition)

![](https://images.viblo.asia/aa03a1dc-e842-4cb3-9ab6-11e040690811.jpg)

### Khi nào thực hiện đoán lỗi
Kỹ thuật này có thể được sử dụng ở bất kỳ cấp độ kiểm thử nào, được vận dụng khi thiết kế test case, trong suốt quá trình thực hiện kiểm thử khi hầu hết kỹ thuật kiểm thử chính thức đã được áp dụng.

### Nguyên tắc trong quá trình đoán lỗi
* Ghi nhớ các lỗi rắc rối trước đây: bất cứ khi nào bạn gặp phải một lỗi thú vị, hãy ghi lại để tham khảo trong tương lai. Nhìn chung có một số lỗi phổ biến xảy ra trong một loại ứng dụng cụ thể. Tham khảo danh sách các lỗi đã được báo cáo.
* Nâng cao hiểu biết của bạn. Tham khảo cách viết code và cách các khái niệm như con trỏ null, mảng, chỉ mục, ranh giới, vòng lặp, v.v. được triển khai trong các dòng code.
* Có được kiến thức về môi trường kỹ thuật (máy chủ, hệ điều hành, cơ sở dữ liệu) trong đó ứng dụng được lưu trữ.
* Chỉ ra được những điểm chưa hợp lý trong các yêu cầu, tài liệu thiết kế, thử nghiệm và sử dụng.
* Hiểu hệ thống mà mình đang kiểm thử.
* Đánh giá dữ liệu lịch sử và kết quả kiểm thử.
* Giữ nhận thức về các lỗi điển hình.

### Ưu điểm của kỹ thuật đoán lỗi
* Error Guessing đã chứng minh được hiệu quả khi sử dụng kết hợp với các kỹ thuật kiểm thử phần mềm chính thức khác.
* Kỹ thuật này giúp phát hiện ra những lỗi không mô tả trong tài liệu spec, hay các kỹ thuật kiểm thử chính thức sẽ không thấy được. Do đó, tester có kinh nghiệm tiết kiệm rất nhiều thời gian và công sức.
* Rất hữu ích để đoán các vùng có vấn đề của phần mềm.

### Hạn chế của kỹ thuật đoán lỗi
* Những tester có kinh nghiệm mới có thể thực hiện kỹ thuật kiểm thử này. Bạn có thể làm được điều đó bằng cách làm mới.
* Đôi khi quá lan man trong đoán lỗi dẫn tới mất nhiều thời gian thiết kết testcase và thực hiện test nhưng không thấy bug, chưa đạt hiệu quả cao.

Tham khảo: https://www.devpro.edu.vn/ky-thuat-error-guessing-trong-kiem-thu-phan-mem