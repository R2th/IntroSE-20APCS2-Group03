## Kiểm tra thời gian đáp ứng là gì?

Kiểm tra Response time được định nghĩa là một loại thử nghiệm đo thời gian thực hiện cho một nút hệ thống để đáp ứng yêu cầu của người khác. Đã đến lúc một hệ thống hoặc một đơn vị hệ thống cần phải phản ứng một đầu vào cụ thể cho đến khi quá trình kết thúc. <br>
Ví dụ: bạn có API và bạn muốn biết chính xác cần bao nhiêu thời gian để thực hiện nó và trả về dữ liệu trong JSON

Thời gian đáp ứng đo lường hiệu suất của mỗi giao dịch hoặc truy vấn. Thời gian phản hồi bắt đầu khi người dùng gửi yêu cầu và kết thúc khi thời gian ứng dụng nói rằng yêu cầu đã hoàn thành.

![](https://images.viblo.asia/ce4ec4de-4792-4955-bf8c-c51637342ef2.png)

## Làm thế nào để đo thời gian đáp ứng?

Response time được đo bằng sự trợ giúp của công cụ kiểm tra bằng cách bao quanh một quy trình nghiệp vụ quan trọng với các giao dịch Bắt đầu và Kết thúc. Một quy trình nghiệp vụ có thể là một hành động hoặc tập hợp các hành động mà người dùng thực hiện trong một ứng dụng để hoàn thành một nhiệm vụ kinh doanh. Một số ví dụ sẽ được đăng nhập vào ứng dụng hoặc mua sách trên Amazon.com.
<br>
Đối với cùng một quy trình, response sẽ thay đổi một chút từ công cụ này sang công cụ khác. Đây là lý do tại sao

- Phương pháp tính toán số liệu được thu thập bởi mỗi công cụ
- Mô phỏng và chụp tải có thể tạo ra sự khác biệt trong thời gian đáp ứng
- Các mục bổ sung được ghi lại khi tạo tải người dùng
- Tính toán số liệu được thu thập bởi mỗi công cụ làm tăng thời gian phản hồi
- Kiến trúc của hai công cụ có thể khác nhau


### Các loại số liệu của response



| Số liệu thời gian đáp ứng | Giải trình | 
| -------- | -------- |
|Thời gian đáp ứng trung bình   | Thời gian phản hồi trung bình là thời gian trung bình được thực hiện cho mỗi yêu cầu khi đi được 1 vòng và trả về. Thời gian phản hồi trung bình bao gồm thời gian tải các tệp HTML, CSS, XML, hình ảnh, JavaScript, v.v. Do đó, mức trung bình bị ảnh hưởng khi các thành phần chậm xuất hiện trong hệ thống.     | 
| Thời gian đáp ứng cao điểm    | Thời gian đáp ứng cao điểm giúp chúng tôi tìm thấy các thành phần có khả năng có vấn đề. Nó giúp chúng tôi tìm thấy tất cả sự bất thường trong trang web hoặc hệ thống nơi một yêu cầu nhất định không được xử lý chính xác. Ví dụ, có thể có một truy vấn cơ sở dữ liệu lớn được thực thi có thể ảnh hưởng đến thời gian phản hồi. Truy vấn này không cho phép trang tải vào thời điểm mong muốn.  | 
| Tỷ lệ lỗi    |Tỷ lệ lỗi là một phép tính toán hiển thị tỷ lệ phần trăm của các yêu cầu sự cố đối với tất cả các yêu cầu. Tỷ lệ phần trăm này đếm tất cả các mã trạng thái HTTP hiển thị lỗi trên máy chủ. Nó cũng tính các yêu cầu đã hết thời gian.  | 

### Ba giá trị thời gian đáp ứng quan trọng:

Kiểm tra thời gian đáp ứng có hai đặc tính cần thiết nhất:

- Thời gian phản hồi trung bình
- Thời gian đáp ứng tối đa.
Nó cho thấy người dùng cần bao lâu để chờ máy chủ phản hồi yêu cầu của nó.

Sau đây là các giá trị thời gian phản hồi chính


| Response Time | Ý nghĩa |
| -------- | -------- | 
| 0.1 Second    | Đó là thời gian đáp ứng ưa thích nhất. Nếu thời gian phản hồi là 0,1, người dùng luôn cảm thấy rằng ứng dụng hoặc hệ thống đang phản hồi ngay lập tức và không cảm thấy bất kỳ sự gián đoạn nào.     | 
| 1.0 Second     | Nó được định nghĩa là giới hạn tối đa của thời gian đáp ứng chấp nhận được. Người dùng không có khả năng cảm thấy bất kỳ sự gián đoạn nào, mặc dù họ có thể gặp một số chậm trễ. Thời gian phản hồi hơn 1 giây có thể làm gián đoạn trải nghiệm người dùng.   | 
| 10 Seconds     | Đó là giới hạn tối đa sau đó thời gian đáp ứng vượt quá giới hạn chấp nhận được. Tuy nhiên, trong thời đại ngày nay, nếu thời gian phản hồi vượt quá 6 giây, người dùng sẽ rời khỏi trang web đó hoặc thoát khỏi ứng dụng.|

<br>
Nói chung, thời gian phản hồi phải nhanh nhất có thể trong khoảng 0,1 - 1 giây. Tuy nhiên, mọi người có thể thích nghi với thời gian phản hồi chậm hơn, nhưng họ sẽ không bao giờ hài lòng với thời gian phản hồi lớn hơn 2 giây.

## Công cụ kiểm tra response time:

Có rất nhiều công cụ kiểm tra response time có sẵn trên thị trường. Ba tools nổi bật nhất là:
1) JMeter: 
<br> Jmeter có thể được sử dụng để kiểm tra tải và hiệu suất.
<br> Download link: http://jmeter.apache.org/download_jmeter.cgi

2) Load Runner:
<br> Load Runner là một sản phẩm thử nghiệm tải được phát triển bởi Microf Focus. Công cụ kiểm tra phản hồi LoadRunner hoạt động theo nguyên tắc mô phỏng Người dùng ảo trên ứng dụng chủ đề.
<br>Download link: https://software.microfocus.com/de-de/products/loadrunner-load-testing/free-trial

3) AEM:
<br>Quản lý trải nghiệm Adobe được biết đến một thời gian ngắn là AEM là một công cụ hiệu quả khác để kiểm tra thời gian phản hồi. Nó cho phép kiểm tra các truy vấn có vấn đề, yêu cầu và thông báo lỗi.
<br>Download link: https://helpx.adobe.com/in/experience-manager/6-3/sites/developing/using/aem-eclipse.html

## Kết luận

- Thời gian đáp ứng đề cập đến thời gian dành cho một nút hệ thống để đáp ứng yêu cầu của nút khác
- Thời gian phản hồi trung bình là thời gian trung bình được thực hiện cho mỗi yêu cầu chuyến đi khứ hồi
- Thời gian đáp ứng cao nhất giúp chúng ta thấy rằng những thành phần nào có khả năng có vấn đề.
- Tỷ lệ lỗi là một phép tính toán học hiển thị tỷ lệ phần trăm của các yêu cầu vấn đề.
- Ba giá trị thời gian phản hồi quan trọng là: 0,1 giây, 1,0 giây và 10 giây
- Ba công cụ kiểm tra thời gian phản hồi được sử dụng nhiều nhất là Jmeter, LoadRunner và AEM.


*Nguồn dịch:* https://www.guru99.com/response-time-testing.html