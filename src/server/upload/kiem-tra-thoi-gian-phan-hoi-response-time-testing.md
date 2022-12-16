# 1. Response Time Testing là gì?
RESPONSE TIME TESTING là đo lường thời gian phản hổi của một request. Đây là thời gian để hệ thống xử lý cho một input đầu vào cho đến khi xử lý kết thúc. 

Ví dụ: bạn có API và muốn biết chính xác cần bao nhiêu thời gian để thực hiện và trả về dữ liệu trong JSON. Response time được đo lường chính là thời gian phản hồi của server cho mỗi transaction hoặc query

Response time được tính bắt đầu khi người dùng gửi yêu cầu và kết thúc tại thời điểm trạng thái ứng dụng là đã hoàn thành.
![](https://images.viblo.asia/4405fdb1-75ce-4686-a604-2c9d410d1b34.png)
# 2. Làm thế nào để đo lường Response Time?
Sử dụng các test tool để đo lường Response time, bằng cách đo lường thời điềm bắt đầu và kết thúc các transaction của các nghiệp vụ quan trọng. Một quy trình nghiệp vụ có thể là một hành động hoặc tập hợp các hành động mà người dùng thực hiện trong một ứng dụng. Ví dụ:  đăng nhập vào ứng dụng hoặc mua sách trên Amazon.com.

Đối với cùng một quy trình, phản hồi sẽ thay đổi một chút từ công cụ này sang công cụ khác. Đây là lý do tại sao:
* Phương pháp tính toán số liệu được thu thập bởi mỗi công cụ.
* Công cụ Mô phỏng tốc độ tải và tốc độ chụp có thể tạo ra sự khác biệt trong response time.
* Các mục bổ sung được ghi lại khi theo dõi tải người dùng.
* Tính toán số liệu được thu thập bởi mỗi công cụ làm tăng response do mức tiêu thụ tài nguyên cao.
* Kiến trúc của hai công cụ có thể khác nhau.
# 3. Các loại số liệu phản hồi:


| Các loại số liệu phản hồi | Mô tả chi tiết | 
| -------- | -------- | -------- |
| Thời gian đáp ứng trung bình (The Average Response Time)     | Thời gian đáp ứng trung bìnhlà thời gian phản hồi trung bình (Response Time) của request. The Average Response Time bao gồm thời gian tải các tệp HTML, CSS, XML, hình ảnh, JavaScript, v.v. Do đó, mức ảnh hưởng trung bình khi các thành phần chậm xuất hiện trong hệ thống.    |
| Thời gian đáp ứng cao điểm (Peak Response Time)     | Thời gian đáp ứng cao điểm giúp tìm thấy các thành phần có khả năng có vấn đề. Nó giúp tìm thấy tất cả các bất thường trong trang web hoặc hệ thống nơi một yêu cầu nhất định không được xử lý chính xác. Ví dụ, có thể có một truy vấn cơ sở dữ liệu lớn được thực thi có thể ảnh hưởng đến thời gian phản hồi. Truy vấn này không cho phép load page vào thời điểm mong muốn.     |
| Tỷ lệ lỗi (Error Rate)     | Tỷ lệ lỗi là tính toán và hiển thị tỷ lệ phần trăm của các yêu cầu sự cố đối với tất cả các yêu cầu. Tỷ lệ phần trăm này đếm tất cả các mã trạng thái HTTP hiển thị lỗi trên máy chủ. Nó cũng tính các yêu cầu đã hết thời gian.     |
# 4. Ba giá trị response time quan trọng:
2 đặc tính quan trọng của Response time testing: 
* Thời gian phản hồi trung bình
* Thời gian đáp ứng tối đa.

Nó cho thấy người dùng cần bao lâu để chờ máy chủ phản hồi yêu cầu.

Sau đây là các giá trị thời gian phản hồi chính:

| Response Time  | Ý nghĩa | 
| -------- | -------- | -------- |
| 0.1 Second     | Đó là thời gian đáp ứng tốt nhất. Nếu thời gian phản hồi là 0,1, người dùng luôn cảm thấy rằng ứng dụng hoặc hệ thống đang phản hồi ngay lập tức và không cảm thấy bất kỳ sự gián đoạn nào.    | 
| 1.0 Second     | Nó được định nghĩa là giới hạn tối đa của response time chấp nhận được. Người dùng không có khả năng cảm thấy bất kỳ sự gián đoạn nào, mặc dù họ có thể gặp một số chậm trễ. Thời gian phản hồi hơn 1 giây có thể làm gián đoạn trải nghiệm người dùng.    | 
| 10 Second     | Đó là giới hạn tối đa sau đó response time vượt quá giới hạn chấp nhận được. Tuy nhiên ngày nay, nếu response time vượt quá 6 giây, người dùng sẽ rời khỏi trang web đó hoặc thoát khỏi ứng dụng.    | 
Nói chung, response time phải nhanh nhất có thể trong khoảng 0,1 - 1 giây. Tuy nhiên, có thể điều chỉnh response time chậm hơn, nhưng sẽ không bao giờ hài lòng với response time lớn hơn 2 giây. Response time ít hơn, tốt hơn là sự hài lòng của khách hàng, chi phí thấp hơn, sự hài lòng của khách hàng cao hơn.

# 5. Response Time testing Tools:
Có rất nhiều công cụ kiểm tra Response Time có sẵn trên thị trường. Ba cái tên nổi bật nhất là:
## 5.1. JMeter:
Jmeter có thể được sử dụng để kiểm tra tải và hiệu suất trên ứng dụng đích.

Download link: http://jmeter.apache.org/download_jmeter.cgi 
## 5.2. Load Runner:
Load Runner là một sản phẩm kiểm thử tải được phát triển bởi Microf Focus. Công cụ kiểm tra phản hồi LoadRunner hoạt động theo nguyên tắc mô phỏng Người dùng ảo trên ứng dụng.

Download link: https://software.microfocus.com/de-de/products/loadrunner-load-testing/free-trial 

## 5.3. AEM:
AEM là viết tắt của Adobe Experience manage, đây là một công cụ hiệu quả khác để kiểm tra response time. Nó cho phép kiểm tra các truy vấn, yêu cầu có vấn đề và thông báo lỗi.

Download link: https://helpx.adobe.com/in/experience-manager/6-3/sites/developing/using/aem-eclipse.html 

# Kết luận:
* Response time đề cập đến thời gian để hệ thống đáp ứng các yêu cầu khác nhau
* Thời gian phản hồi trung bình là thời gian trung bình được thực hiện cho mỗi yêu cầu.
* Thời gian đáp ứng cao nhất giúp thấy những thành phần nào có khả năng có vấn đề.
* Tỷ lệ lỗi là một phép tính toán và hiển thị tỷ lệ phần trăm của các yêu cầu vấn đề.
* Ba giá trị response time quan trọng là: 0,1 giây, 1,0 giây và 10 giây
* Ba công cụ kiểm tra response time được sử dụng nhiều nhất là Jmeter, LoadRunner và AEM.

Link reference: https://www.guru99.com/response-time-testing.html