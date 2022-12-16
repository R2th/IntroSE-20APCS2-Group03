# 1. Test script là gì?

Có thể nói, test script là bản hướng dẫn chi tiết, viết bằng code (mã) để thực hiện automation testing (kiểm thử tự động). Ngoài ra, bạn cũng cần dùng phần mềm automation testing để thực thi test script. Một số phần mềm được sử dụng phổ biến hiện nay gồm có Selenium, UTF One (Micro Focus Unified Functional Testing), TestComplete, Cucumber,…

![](https://images.viblo.asia/222ae511-e72b-4794-852f-6ec5720a223d.PNG)

Thông thường, trong test script, bạn sẽ viết code để thực hiện ít nhất một lần những tác vụ sau:

* Xác định trường tham chiếu của input hay test data (dữ liệu đầu vào)
* Kiểm tra sự tồn tại của trường tham chiếu input
* Điều hướng đến nó và nhập input
* Định vị trường tham chiếu của output (dữ liệu đầu ra)
* Xác minh sự tồn tại của trường tham chiếu output
* Điều hướng đến nó để đọc output
* So sánh output với expected value (kết quả dự kiến)
* Lưu trữ kết quả kiểm thử vào log (bản nhật ký) hoặc report (bản báo cáo)

# 2. Làm thế nào để thiết kể một bộ test case tự động hay là tạo một kịch bản?

Tự động hóa luôn luôn tuân thủ theo hoạt động test thủ công. Thông thường, một hoặc nhiều vòng thử nghiệm thủ công đã được thực hiện trên AUT. Điều này ngụ ý rằng các trường hợp thử nghiệm thủ công đã tồn tại và đã được thực hiện ít nhất một lần.

# 3. Các bước chuyển test case thành test script

![](https://images.viblo.asia/6e3b525b-fbbc-4ba1-b533-67a86443dc37.PNG)

## 1. Phân tích, thiết kế precondition bằng code

Precondition (điều kiện tiên quyết) là phần miêu tả về trạng thái của test item (hạng mục kiểm thử). Chúng là những điều kiện phải đáp ứng trước khi thực hiện một test step (bước thực hiện kiểm thử) trong test case (trường hợp kiểm thử). Do đó, thiết lập precondition là việc rất quan trọng với kiểm thử nói chung và automation testing nói riêng.

Thử lấy ví dụ về test tính năng đăng nhập của Gmail để xem chúng quan trọng ra sao nhé.

Để bắt đầu kiểm thử, ta cần đảm bảo trình duyệt Chrome đã được khởi chạy. Vậy bây giờ phải làm thế nào để áp dụng điều này vào trong automation testing? Bạn có hai cách để làm điều đó. Hoặc là bạn viết code để khởi chạy trình duyệt. Hoặc là bạn dùng chức năng “Record” của các automation testing tool. Chức năng này giúp bạn ghi, chạy lại những thao tác khởi chạy trình duyệt mà bạn thực hiện.

Giả sử test step tiếp theo là nhập email vào khung “Email”, precondition là website đã load (tải) thành công. Để nó được thực thi, bạn phải đáp ứng được precondition của nó. Khi thực hiện manual testing (kiểm thử thủ công), bạn chỉ cần đợi website load thành công là xong. Với test script, bạn phải viết code để automation testing tool kiểm tra xem website đã được load hay chưa.

Giờ thì chắc bạn đã hiểu được tầm quan trọng của việc thiết lập precondition cho test script rồi nhỉ. Cũng vì lý do này mà nhiều test script thường chỉ hoạt động trên một thiết bị nhất định.

## 2.“Code hóa” test step của test case

Dù là test case hay test script, các test step phải được viết rõ ràng, đơn giản và dễ đọc. Với manual testing, chúng ta có thể chia các test step thành 3 nhóm chính như sau:

* Nhập dữ liệu: gồm những test step nạp dữ liệu vào test item.
* Thay đổi trạng thái: gồm những test step gây ra thay đổi về trạng thái của test item.
* Hoạt động kết hợp: gồm những test step nạp dữ liệu và thay đổi trạng thái của test item.

***Dựa vào 3 nhóm hoạt động trên, test script sẽ được xây dựng bằng 5 nhóm code chính sau:***

* Nhóm code nhập dữ liệu: nạp dữ liệu vào test item dựa theo trường tham chiếu của dữ liệu đó.
* Nhóm code thay đổi trạng thái, nhóm code kết hợp: thay đổi trạng thái của test item. Với mỗi trạng thái mới, bạn phải viết code để xác minh sự tồn tại của trạng thái đó.
* Nhóm dòng nhận xét: để ghi chú, mô tả code,… giúp tăng tính dễ đọc, dễ hiểu cho test script.
* Nhóm code (debug) gỡ lỗi: giúp bạn hiểu và debug được code đang viết. Chúng cho bạn biết điều gì đang diễn ra sau khi thực hiện một đoạn code.
* Nhóm code xuất output: để ghi lại kết quả vào report, trang tính excel, các loại tệp văn bản,…

## 3. Thực hiện verification và validation thường xuyên

Verification (kiểm định) và validation (thẩm định) là phần cốt lõi của kiểm thử. Để thực hiện chúng trong automation testing, bạn cần xác định và dùng các checkpoint (điểm kiểm tra). Vì vậy, test script thường chứa rất nhiều conditional statement (câu lệnh điều kiện) và loop statement (vòng lặp). Khi chọn checkpoint, bạn cần lưu ý phải chọn một thứ ít hoặc không thay đổi của test item.

Ví dụ: để test trạng thái đăng nhập vào Gmail, bạn không nên dùng “Số lượng thư đến” làm checkpoint. Lý do là vì nó không cố định và sẽ luôn thay đổi theo thời gian. Thay vào đó, bạn nên chọn logo của Gmail làm checkpoint.

## 4. Thiết lập test data cho test script

Ngoài verification và validation, test data cũng là phần quan trọng của kiểm thử. Nó cung cấp những thông tin cần thiết để thực hiện thành công các test step của test case. Bạn có thể lưu trữ test data trong trang tính excel để nạp trực tiếp vào test script.

Trong quá trình thiết lập test data, bạn cần xem xét những vấn đề sau:

* Nên lưu trữ dữ liệu ở đâu?
* Có nên hard-code (nhúng dữ liệu vào code) hay không?
* Liệu dữ liệu có được bảo mật không?
* Có thể tái sử dụng dữ liệu được không?

## 5. Điều chỉnh report của test script

Với test case, bạn phải tự mình nhập lại kết quả mỗi test step vào mục “Kết quả thực tế”. Trong khi đó, nhờ tính năng báo cáo, các automation testing tool sẽ thực hiện điều này. Trong lúc hoạt động, nó sẽ tự động ghi lại kết quả mỗi thao tác test vào report. Tuy nhiên, bạn vẫn nên điều chỉnh report để nó chỉ bao gồm những thông tin quan trọng nhất.

## 6. Dọn dẹp hậu thực thi test script

Khi viết test case cho manual testing, bạn không cần đề cập đến việc đóng, ngắt kết nối test item. Đã là một tester thì bạn sẽ phải chủ động làm việc đó sau khi kết thúc quá trình test. Ngược lại, bạn phải viết code trong test script để automation testing tool thực hiện giúp bạn. Việc này giúp hủy những kết nối được tạo ra, giải phóng bộ nhớ và đóng các tác vụ thừa.

***Bài viết được tham khảo từ nhiều bài viết trên softwaretestinghelp***