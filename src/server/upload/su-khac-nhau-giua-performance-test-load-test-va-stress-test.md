## Performance Test là gì?
Performance Test là một loaị kiểm thử để xác định tốc độ của máy tính, tốc độ mạng hoặc thiết bị. Nó kiểm thử hiệu suất của các thành phần của một hệ thống bằng cách truyền các tham số khác nhau trong những kịch bản test khác nhau.

## Load Test là gì?
Load Test là quá trình mô phỏng độ chịu tải thực tế của bất kỳ ứng dụng hoặc trang web nào. Nó kiểm thử cách ứng dụng hoạt động trong điều kiện hoạt động bình thường và hoạt động hiệu suất cao. Loại kiểm thử này được áp dụng cho những dự án gần đi đến giai đoạn hoàn thành.

## Stress Test là gì?
Stress Test là một loại kiểm thử xác định sự ổn định và tính mạnh mẽ của hệ thống. Đây là một kỹ thuật kiểm thử không chức năng. Kỹ thuật kiểm thử này sử dụng mô hình mô phỏng tự động để kiểm thử tất cả các giả thuyết.
Bảng so sánh Performance Test, Load Test và Stress Test.

Bảng so sánh Performance Test, Load Test và Stress Test

| Performance Test | Load Test | Stress Test |
| -------- | -------- | -------- |
| Bao gồm cả Load Test và Stress Test     | Là một loại của Performance Test     | Là một loại của Performance Test     |
| Giúp tạo ra thiết lập chuẩn và tiêu chuẩn cho ứng dụng | Giúp nhận ra giới hạn của hệ thống, thiết lập SLA của ứng dụng và kiểm tra hệ thống có khả năng chịu tải như thế nào | Kiểm tra xem hệ thống hoạt động như thế nào khi quá tải và cách hệ thống phục hồi khi xảy ra lỗi |
| Mục đích của Performance Test là tạo ra hướng dẫn về cách hệ thống hoạt động khi ở điều kiện bình thường | Tạo ra những kịch bản khi hệ thống hoạt động quá tải | Stress Test nhằm đảm bảo rằng khi hoạt động trong điều kiện tải cao trong một khoảng thời gian cố định sẽ  không bị crash |
| Việc sử dụng tài nguyên, khả năng đáp ứng và độ tin cậy của sản phẩm được kiểm tra ở phương pháp kiểm thử này | Các thuộc tính được kiểm tra trong một bài kiểm tra tải là hiệu suất hoạt động lúc cao điểm, số lượng máy chủ và thời gian phản hồi. | Loại kiểm thử này kiểm tra thời gian phản hồi ổn định, v.v. |
| Trong Performance Test, giới hạn tải bao gồm cả dưới và trên ngưỡng nghỉ. | Trong Load Test giới hạn tải là ngưỡng ngắt. | Trong Stress Test giới hạn tải là trên ngưỡng nghỉ. |
| Ví dụ:  Kiểm tra nhiều người dùng cùng một thời điểm, kết nối HTTP hoặc kiểm tra thời gian phản hồi thích hợp. | Ví dụ : Kiểm tra trình xử lý từ bằng cách thay đổi một phần lớn data, kiểm tra máy in bằng cách truyền dữ liệu nặng. Kiểm tra máy chủ mail với hàng ngàn người dùng đồng thời. | Ví dụ : Đột nhiên tắt và khởi động lại các port của một mạng lưới lớn. |
| **Tại sao thực hiện Performance Test?** | **Tại sao thực hiện Load Test?**| **Tại sao thực hiện Stress Test?** |
| Để kiểm tra xem ứng dụng đang hoạt động chính xác hay không| Tìm ra lỗi mà không thể tìm ra với bất kỳ phương pháp thử nghiệm khác. Chẳng hạn như rò rỉ bộ nhớ, lỗi quản lý bộ nhớ, tràn bộ đệm, v.v ...| Nó giúp các đơn vị kiểm tra hệ thống khi xảy ra lỗi.|
| Để phù hợp với nhu cầu hoạt động của doanh nghiệp | Để phù hợp với nhu cầu hoạt động của doanh nghiệp | Để đảm bảo rằng hệ thống có sao lưu dữ liệu trước khi xảy ra lỗi hay không |
| Tìm, phân tích và khắc phục các vấn đề về hiệu suất | Để xác định độ ổn định của một ứng dụng| Để kiểm tra xem bất kì trục trắc nào làm ảnh hưởng xấu đến an ninh hệ thống hay không |
| Xác định tất cả phần cứng để đưa ra dự kiến tải phù hợp. | Để kiểm tra xem cơ sở hạ tầng hiện tại có đủ để chạy ứng dụng hay không. |  |
| Thực hiện kế hoạch về nhu cầu đáp ứng năng lực trong tương lai của ứng dụng | Số lượng người dùng đồng thời mà một ứng dụng có thể hỗ trợ và khả năng mở rộng để cho phép nhiều người dùng truy cập vào nó |  |


## Khi nào sử dụng Performance Test?
Performance Test được thực hiện để kiểm tra hiệu suất của máy chủ trang web, cơ sở dữ liệu và mạng. Nếu bạn đang áp dụng phương pháp thác nước, thì điều quan trọng là bạn phải kiểm tra từng lần phát hành phiên bản mới. Tuy nhiên, nếu bạn đang sử dụng cách tiếp cận phát triển phần mềm nhanh, thì bạn cần kiểm thử ứng dụng liên tục.

## Khi nào sử dụng Load Test?
Load Test được thực hiện để xác định hệ thống có thể quản lý, xử lý lệnh của bao nhiêu người dùng. Bạn cũng có thể kiểm tra các tình huống khác nhau cho phép bạn tập trung vào các phần khác nhau của hệ thống. Giống như trang chủ hoặc trang web thanh toán của bạn để thử nghiệm mức tải của web. Nó cũng giúp bạn xác định cách xây dựng và duy trì trong hệ thống.

## Khi nào sử dụng Stress Test?
Stress Test trên web hay ứng dụng là điều rất quan trọng  với những trang web hay ứng dụng về những sự kiện lớn như bán vé cho một buổi hòa nhạc nổi tiếng với nhu cầu cao của người dân. Vì vậy, điều quan trọng là kiểm tra thường xuyên với khả năng chịu tải của hệ thống. Điều này cũng giúp bạn chuẩn bị cho các tình huống bất ngờ, dành nhiều thời gian hơn và nguồn lực để khắc phục bất kỳ sự cố nào.

## Kết luận
Performance Test là một phương pháp kiểm thử được sử dụng để xác định tốc độ của máy tính, mạng hoặc thiết bị.
Load Test kiểm tra sức chịu tải của bất kỳ ứng dụng hoặc trang web nào.
Stress Test xác định sự ổn định và sự mạnh mẽ của hệ thống
Performance Test giúp kiểm tra hiệu suất của máy chủ trang web, cơ sở dữ liệu, mạng.
Load Test được sử dụng cho Client / Server, các ứng dụng trên nền Web.
Stress Test kiểm tra độ ổn định website của bạn khi gặp trường hợp lưu lượng truy cập quá lớn.


*Nguồn : https://www.guru99.com/performance-vs-load-vs-stress-testing.html*