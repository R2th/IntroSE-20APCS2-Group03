# Khái niệm kiểm thử tích hợp hệ thống (SIT)
Kiểm thử tích hợp hệ thống (`System Integration Testing` - **SIT**) là một loại kiểm thử phần mềm được thực hiện trong môi trường phần cứng và phần mềm tích hợp để xác định hoạt động của hệ thống. Nó là quá trình kiểm thử được tiến hành trên một hệ thống tích hợp, hoàn chỉnh để đánh giá sự tuân thủ của hệ thống với các yêu cầu đặc tả cụ thể của nó.

Kiểm thử tích hợp hệ thống được thực hiện để xác định sự tương tác giữa các module của hệ thống phần mềm. Nó đề cập đến việc xác định các yêu cầu cấp cao, cấp thấp được chỉ định trong đặc tả yêu cầu phần mềm (`SRS`) và tài liệu thiết kế phần mềm.

Nó cũng xác định sự tồn tại của một hệ thống phần mềm với những hệ thống khác và kiểm tra giao diện giữa các module của ứng dụng phần mềm. Trong loại thử nghiệm này, đầu tiên các module sẽ được kiểm thử riêng lẻ và sau đó được kết hợp để tạo thành một hệ thống.

![](https://images.viblo.asia/a86725e7-8697-4e08-8fa7-f120de5de26c.png)

# Lý do cần tiến hành SIT
Chúng ta cần phải tiến hành kiểm thử phần mềm vì: 
* Giúp chúng ta phát hiện sớm các vấn đề hoặc các lỗi có thể gặp phải.
* Phản hồi sớm hơn về khả năng chấp nhận của từng module có sẵn.
* Lên plan cho các bản sửa lỗi rất linh hoạt, dễ tùy biến.
* Đảm bảo luồng dữ liệu chính xác.
* Đảm bảo luồng điều khiển chính xác
* Đảm bảo về mặt thời gian
* Đảm bảo sử dụng bộ nhớ chính xác
* Đảm bảo hệ thống được phát triển đúng với yêu cầu đặc tả phần mềm.

# Làm thế nào để tiến hành SIT
**SIT** là một kỹ thuật có hệ thống giúp chúng ta xây dựng cấu trúc chương trình trong khi tiến hành kiểm thử để phát hiện ra các lỗi liên quan đến giao diện.

Tất cả các module đều được tích hợp sẵn và toàn bộ chương trình được kiểm tra tổng thể. Nhưng trong quá trình này, một số lỗi vẫn có khả năng xảy ra.

Việc sửa các lỗi như trên rất khó khăn do sự mở rộng liên tục của toàn bộ chương trình. Sau khi những lỗi này được fix thì một lỗi mới có sẽ xuất hiện và quá trình tiếp tục liền mạch trong một vòng lặp vô tận. Để tránh tình trạng này, một cách tiếp cận khác được sử dụng là Tích hợp gia tăng (`Incremental Integration`).

Có một số phương pháp gia tăng như các bài kiểm thử tích hợp được thực hiện trên một hệ thống dựa trên bộ xử lý mục tiêu. Phương pháp hay được sử dụng ở đây thường là kiểm thử hộp đen. Có thể sử dụng tích hợp từ dưới lên (`Bottom Up`) hoặc từ trên xuống (`Top Down`).

Các `Test cases` chỉ được xác định bằng cách sử dụng các yêu cầu phần mềm cấp cao.

Tích hợp phần mềm cũng có thể đạt được phần lớn trong môi trường máy chủ, với các unit cụ thể cho môi trường mục tiêu tiếp tục được mô phỏng trong máy chủ. Cần phải lặp lại các bước kiểm thử trong môi trường mục tiêu để xác nhận kết quả một lần nữa.

Kiểm thử xác nhận ở cấp độ này sẽ xác định các vấn đề về môi trường cụ thể, chẳng hạn như lỗi trong cấp phát bộ nhớ và hủy cấp phát. Tính thực tế của việc tiến hành tích hợp phần mềm trong môi trường máy chủ sẽ phụ thuộc vào mức độ chức năng cụ thể của mục tiêu. Đối với một số hệ thống nhúng, việc kết hợp với môi trường mục tiêu sẽ rất mạnh, khiến việc tiến hành tích hợp phần mềm trong môi trường chủ là không thực tế.

Sự phát triển phần mềm lớn sẽ phân chia tích hợp phần mềm thành một số cấp độ. Các mức độ tích hợp phần mềm thấp hơn có thể chủ yếu dựa vào môi trường máy chủ, với các mức độ tích hợp phần mềm sau này trở nên phụ thuộc nhiều hơn vào môi trường mục tiêu.

> Lưu ý: Nếu chỉ phần mềm đang được kiểm thử thì nó được gọi là `Kiểm thử tích hợp phần mềm với phần mềm` (`Software Software Integration Testing` - **SSIT**) và nếu cả phần cứng và phần mềm đang được kiểm thử, thì nó được gọi là `Kiểm thử tích hợp phần mềm với phần cứng` (`Hardware Software Integration Testing` - **HSIT**).

# Các tiêu chuẩn vào và ra của quá trình SIT
Thông thường khi tiến hành kiểm thử tích hợp, chiến lược **ETVX** sẽ được sử dụng.
* **E** - `Entry Criteria`: Tiêu chí đầu vào
* **T** - `Task`: Các nhiệm vụ cần thực hiện
* **V** - `Validation`: Tiến hành kiểm định kết quá
* **X** - `Exit Criteria`: Tiêu chí đầu ra

Kiểm thử tích hợp hệ thống (**SIT**) thường sẽ tiến hành ngay sau bước kiểm thử đơn vị (`Unit Testing` - **UT**), đây cũng được coi là tiêu chuẩn đầu vào của **SIT**.

Các tài liệu yêu cầu của đầu vào bao gồm:
* `Software Requirements Data`: Dữ liệu yêu cầu của phần mềm
* `Software Design Document`: Tài liệu thiết kế phần mềm
* `Software Verification Plan`: Kế hoạch xác minh tính đúng đắn của phần mềm
* `Software Integration Documents`: Tài liệu tích hợp phần mềm

Các hoạt động sẽ diễn ra:
* Dựa trên các yêu cầu Cấp cao và Cấp thấp, tiến hành tạo ra các `Test cases` và `Test procedures`.
* Kết hợp các bản `build` module cấp thấp đã được triển khai một tính năng chung.
* Phát triển một khai thác kiểm thử
* Kiểm tra bản `build`
* Sau khi quá trình kiểm thử được thông qua, bản `build` hiện tại sẽ được kết hợp với các bản `build` khác và được kiểm thử cho đến khi hệ thống được tích hợp toàn bộ.
* Thực hiện lại tất cả các kiểm thử trên nền tảng hệ thống dựa trên bộ xử lý mục tiêu và tổng hợp kết quả.

Tiêu chuẩn đầu ra:
* Hoàn thành việc kiểm thử tích hợp các module phần mềm trên phần cứng mục tiêu.
* Đảm bảo hiệu suất theo yêu cầu đặc tả phần mềm.

Sau quá trình **SIT**, chúng ta sẽ cần tổng hợp:
* Báo cáo kiểm thử tích hợp
* Các `Test cases` và `Test procedures` của phần mềm (`Software Verification Cases and Procedures` - **SVCP**)

# So sánh Kiểm thử chấp nhận người dùng (UAT) và Kiểm thử tích hợp hệ thống (SIT)
Bảng dưới đây mô tả sự khác biệt cơ bản giữa **UAT** (Kiểm thử chấp nhận người dùng) và **SIT** (Kiểm thử tích hợp hệ thống)

| Tham số so sánh | UAT | SIT |
| -------- | -------- | -------- |
| Mục tiêu hướng tới | Tập trung vào yêu cầu và quan điểm của người dùng | Đề cập sự tương quan giữa các mô-đun |
| Người thực hiện | Được thực hiện bởi khách hàng và người dùng cuối | Được thực hiện bởi các lập trình viên và kiểm thử viên |
| Thời điểm thực hiện | Ngay sau khi kết thúc `System Testing`, là bước kiểm thử cuối cùng trước khi phần mềm được chính thức sử dụng | Bắt đầu sau quá trình `Unit Testing` nhưng trước quá trình `System Testing` |
| Các vấn đề thường gặp | Các vấn đề về tính năng không hoạt động theo yêu cầu người dùng | Các vấn đề liên quan đến luồng dữ liệu, luồng điều khiển .... |

# Kết luận
Trên đây là một số tìm hiểu của mình về kiểm thử tích hợp hệ thống (**SIT**) và các vấn đề liên quan đến **SIT**. Cảm ơn mọi người đã đọc bài viết ^^.

# Tài liệu tham khảo
* https://www.guru99.com/system-integration-testing.html
* https://en.wikipedia.org/wiki/System_integration_testing
* https://www.geeksforgeeks.org/difference-between-system-integration-testing-sit-and-user-acceptance-testing-uat/