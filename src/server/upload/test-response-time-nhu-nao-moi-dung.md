Là *KIỂM TRA THỜI GIAN PHẢN HỒI* dành cho một click/nút trong hệ thống khi nó đáp ứng yêu cầu của end user. Đây là thời gian một hệ thống cần để thực hiện xong một đầu vào cụ thể cho đến khi quá trình này kết thúc. 
Ví dụ: bạn có API và bạn muốn biết chính xác cần bao nhiêu thời gian để thực hiện nó và trả về dữ liệu trong JSON. Thời gian đáp ứng của máy chủ trong mỗi giao dịch hoặc truy vấn.

![](https://images.viblo.asia/9e6fbe84-d18b-4a75-b3bb-a2dffb1afd3c.png)

## Làm thế nào để đo thời gian phản hồi?
Thời gian phản hồi sẽ được đo bằng sự trợ giúp của các công cụ kiểm tra, bằng cách theo sát  một quy trình hoặc các giao dịch từ Bắt đầu đến Kết thúc. Một quy trình có thể là một hành động hoặc tập hợp các hành động mà người dùng thực hiện trong một ứng dụng để hoàn thành một nhiệm vụ. 
Một số ví dụ như đăng nhập vào ứng dụng hoặc quá trình mua sách trên Amazon.com.

Nhưng đối với cùng một quy trình, kết quả time phản hồi có thể sẽ khác nhau một chút giữa công cụ này với công cụ khác. 

Lý do có thể xuất phát từ :

1. Phương pháp tính toán số liệu được thu thập bởi mỗi công cụ

2. Công cụ Mô phỏng tốc độ tải và tốc độ chụp có thể tạo ra sự khác biệt trong thời gian đáp ứng

3. Các mục bổ sung được ghi lại khi theo dõi quá trình tải của người dùng

4. Tính toán số liệu được thu thập bởi mỗi công cụ làm tăng thời gian phản hồi do mức tiêu thụ tài nguyên cao.

5. Kiến trúc của hai công cụ có thể khác nhau


## Các loại phản hồi :

| Thời gian phản hồi | Giải thích |
| -------- | ------ |
|Thời gian đáp ứng trung bình |Thời gian phản hồi trung bình là thời gian trung bình được thực hiện cho mỗi chức năng. Thời gian phản hồi trung bình bao gồm thời gian tải các tệp HTML, CSS, XML, hình ảnh, JavaScript, v.v. Trong đó, mức trung bình là mức bị ảnh hưởng bởi các thành phần gây chậm xuất hiện trong hệ thống.|
| Thời gian đáp ứng cao điểm | Thời gian đáp ứng cao điểm giúp chúng tôi tìm thấy các thành phần có khả năng có vấn đề. Nó giúp chúng tôi tìm thấy tất cả các bất thường trong trang web hoặc hệ thống nơi một yêu cầu nhất định không được xử lý chính xác. Ví dụ, việc một truy vấn cơ sở dữ liệu lớn được thực thi cũng có thể sẽ ảnh hưởng đến thời gian phản hồi. Truy vấn này không cho phép trang tải vào thời điểm mong muốn. |
| Tỷ lệ lỗi | Tỷ lệ lỗi là một phép tính toán tính tỷ lệ phần trăm hiển thị của các sự cố đối với tất cả các yêu cầu. Tỷ lệ phần trăm này đếm tất cả các mã trạng thái HTTP hiển thị lỗi trên máy chủ. Nó cũng tính cả các yêu cầu đã hết thời gian. | 

## Ba giá trị thời gian phản hồi quan trọng:
Kiểm tra thời gian đáp ứng có hai đặc tính cần thiết nhất:

1. Thời gian phản hồi trung bình
2. Thời gian đáp ứng tối đa.

Nó cho ta biết người dùng cần bao lâu để chờ máy chủ phản hồi yêu cầu của nó.

Sau đây là các giá trị thời gian phản hồi chính:



| Thời gian phản hồi | Ý nghĩa | 
| -------- | -------- | -------- |
| 0.1 giây   | Đó là thời gian đáp ứng chuẩn nhất. Nếu thời gian phản hồi là 0,1, người dùng luôn cảm thấy rằng ứng dụng hoặc hệ thống đang phản hồi ngay lập tức và không cảm thấy bất kỳ sự gián đoạn nào.   
| 1 giây    |Nó được định nghĩa là giới hạn tối đa của thời gian đáp ứng chấp nhận được. Người dùng không có khả năng cảm thấy bất kỳ sự gián đoạn nào, mặc dù họ có thể gặp một số chậm trễ. Thời gian phản hồi hơn 1 giây có thể làm gián đoạn trải nghiệm người dùng.
| 10 giây |Đó là giới hạn tối đa thời gian đáp ứng vượt quá giới hạn chấp nhận được. Tuy nhiên, trong thời đại ngày nay, nếu thời gian phản hồi vượt quá 6 giây, người dùng sẽ rời khỏi trang web đó hoặc thoát khỏi ứng dụng.| 
    
<br>
Nói chung, thời gian phản hồi phải nhanh nhất có thể trong khoảng 0,1 - 1 giây. Tuy nhiên, mọi người có thể điều chỉnh thời gian phản hồi chậm hơn, nhưng họ sẽ không bao giờ hài lòng với thời gian phản hồi lớn hơn 2 giây. Thời gian đáp ứng ít hơn, tốt hơn là sự hài lòng của khách hàng, chi phí thấp hơn, sự hài lòng của khách hàng cao hơn.

## Công cụ kiểm tra thời gian đáp ứng:

Có rất nhiều công cụ kiểm tra Thời gian đáp ứng có sẵn trên thị trường. Ba cái tên nổi bật nhất là:

1) JMeter:

Jmeter có thể được sử dụng để kiểm tra tải và hiệu suất trên ứng dụng đích.
Download link: http://jmeter.apache.org/download_jmeter.cgi

2) Load Runner:

Load Runner là một sản phẩm thử nghiệm tải được phát triển bởi Microf Focus. Công cụ kiểm tra phản hồi LoadRunner hoạt động theo nguyên tắc mô phỏng Người dùng ảo trên ứng dụng chủ đề.
Download link: https://software.microfocus.com/de-de/products/loadrunner-load-testing/free-trial

3) AEM:
Quản lý trải nghiệm Adobe được biết AEM là một công cụ hiệu quả khác để kiểm tra thời gian phản hồi. Nó cho phép kiểm tra các truy vấn có vấn đề, yêu cầu và thông báo lỗi.
Download link: https://helpx.adobe.com/in/experience-manager/6-3/sites/developing/using/aem-eclipse.html

## Kết luận:

1. Thời gian đáp ứng đề cập đến thời gian để một nút hệ thống đáp ứng yêu cầu của nút khác

2. Thời gian phản hồi trung bình là thời gian trung bình được thực hiện cho mỗi yêu cầu chuyến đi khứ hồi

3. Thời gian đáp ứng cao nhất giúp chúng ta thấy rằng những thành phần nào có khả năng có vấn đề.

4. Tỷ lệ lỗi là một phép tính toán hiển thị tỷ lệ phần trăm của các yêu cầu vấn đề.

5. Ba giá trị thời gian phản hồi quan trọng là: 0,1 giây, 1,0 giây và 10 giây

6. Ba công cụ kiểm tra thời gian phản hồi được sử dụng nhiều nhất là Jmeter, LoadRunner và AEM.

Link nguồn: https://www.guru99.com/response-time-testing.html