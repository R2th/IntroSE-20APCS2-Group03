Khi một yêu cầu được gửi tới hệ thống và chờ phản hồi, sẽ có một khoảng thời gian dành cho việc xử lý trước khi trả về kết quả, khoảng thời gian này được gọi là "Response Time" bao gồm: thời gian đi, thời gian xử lý yêu cầu và thời gian trở về hệ thống yêu cầu. Kiểm thử "Response Time" là một loại kiểm tra đo thời gian dành cho một "node system" để đáp ứng yêu cầu của người khác. Nó là thời gian một hệ thống hoặc một đơn vị hệ thống cần phải phản ứng với một đầu vào cụ thể cho đến khi quá trình kết thúc.
"Response Time" đo được khả năng đáp ứng của máy chủ trong mỗi giao dịch hoặc truy vấn. "Response Time" bắt đầu khi người dùng gửi yêu cầu và kết thúc tại thời điểm ứng dụng nói rằng yêu cầu đã hoàn thành.

# 1. Tiêu chuẩn đánh giá "Response Time"

Đối với cùng một quy trình, Response Time sẽ thay đổi một chút từ công cụ này sang công cụ khác. Đây là lý do tại sao:

* Phương pháp tính toán số liệu được thu thập bởi mỗi công cụ.
* Công cụ mô phỏng tốc độ chịu tải và tốc độ thu nạp có thể tạo ra sự khác biệt trong thời gian đáp ứng.
* Các mục bổ sung được ghi lại khi theo dõi tải người dùng.
* Tính toán số liệu được thu thập bởi mỗi công cụ làm tăng thời gian phản hồi do mức tiêu thụ tài nguyên cao
* Kiến trúc của hai công cụ có thể khác nhau
# 2. Các loại số liệu "Response Time"
## Thời gian đáp ứng trung bình
Thời gian đáp ứng trung bình bao gồm thời gian tải các tệp HTML, CSS, XML, hình ảnh, JavaScript, v.v. Do đó, mức trung bình bị ảnh hưởng khi các thành phần xuất hiện gây chậm trong hệ thống.
## Đỉnh điểm thời gian đáp ứng

Đỉnh của thời gian đáp ứng giúp cho  người kiểm thử tìm thấy các thành phần có khả năng có vấn đề. Nó giúp họ tìm thấy tất cả sự bất thường trong trang web hoặc hệ thống nơi một yêu cầu nhất định không được xử lý chính xác. Ví dụ, có thể có một truy vấn cơ sở dữ liệu lớn được thực thi có thể ảnh hưởng đến thời gian phản hồi. Truy vấn này không cho phép trang tải vào thời điểm mong muốn.
## Tỷ lệ lỗi

Tỷ lệ lỗi là một phép tính toán hiển thị tỷ lệ phần trăm của các sự cố khi thực hiện yêu cầu đối với tất cả các yêu cầu. Tỷ lệ phần trăm này đếm tất cả các mã trạng thái HTTP hiển thị lỗi trên máy chủ. Nó cũng tính các yêu cầu đã hết thời gian thực thi.

# 3.  Các công cụ kiểm tra "Response time"
## JMeter

Apache JMeter là một phần mềm mã nguồn mở. Hơn nữa, nó là một ứng dụng máy tính để bàn thuần túy 100%. Và chức năng chính là đo lường hiệu suất của các trang web. Tuy nhiên, ban đầu nó được thiết kế để tải các ứng dụng web thử nghiệm. Nhưng kể từ đó đã mở rộng sang các chức năng kiểm tra khác.

## Load Runner

Load Runner là một sản phẩm thử nghiệm tải được phát triển bởi Microfocus. Ngoài ra, công cụ kiểm tra này hoạt động theo nguyên tắc mô phỏng Người dùng ảo trên ứng dụng.

## Adobe Experience Manage (AEM)
Quản lý trải nghiệm Adobe được biết đến một thời gian ngắn là AEM là một công cụ hiệu quả khác để kiểm tra thời gian phản hồi. Nó cũng cho phép kiểm tra các truy vấn có vấn đề, yêu cầu và thông báo lỗi tương tự.

# 4. Những sự thật về kiểm thử Response time
*  Thời gian phản hồi đề cập đến thời gian dành cho một yêu cầu của hệ thống đáp ứng yêu cầu của hệ thống khác.
*   Thời gian phản hồi trung bình là thời gian trung bình được thực hiện cho mỗi yêu cầu gửi-nhận.  
* Thời gian đáp ứng đạt ngưỡng cao nhất giúp chúng ta dễ thấy rằng những thành phần khả năng có vấn đề. 
* Tỷ lệ lỗi là một phép tính toán hiển thị tỷ lệ phần trăm của các yêu cầu có vấn đề.
* Ba giá trị thời gian phản hồi quan trọng là: 0,1 giây, 1,0 giây và 10 giây
* Ba công cụ kiểm tra Response time được sử dụng nhiều nhất là Jmeter, LoadRunner và AEM.

# Kết luận
 Response time chính là đo lường hiệu suất của một giao dịch hoặc truy vấn cá nhân. Nói cách khác, đó là khoảng thời gian từ khi người dùng gửi yêu cầu cho đến khi ứng dụng chỉ ra rằng yêu cầu đã hoàn thành
 
 Link tài liệu tham khảo:  https://qa-platforms.com/response-time-testing/