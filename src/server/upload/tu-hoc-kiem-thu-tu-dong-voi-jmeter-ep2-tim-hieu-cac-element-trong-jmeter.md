Một kịch bản kiểm thử của JMeter bao gồm các thành phần phân cấp và có trật tự được tổ chức theo dạng cây: 
![](https://images.viblo.asia/ad9bc60a-9ee6-47f5-b760-1ff3502b6764.png)<br>
*Element in JMeter*
## 1. Test Plan
Test Plan là là thành phần quan trọng nhất như là rễ của cây. Đối với một test plan, tên, mô tả và
biến người dùng có thể được cấu hình.<br>

![](https://images.viblo.asia/ccd723a0-4b96-4339-ad9c-317b023b72cd.JPG)<br>
*Test plan*<br>


## 2. Thread Group

Thread group elements là điểm bắt đầu của một test plan bất kỳ. Tất cả các Controllers và Samplers phải được đặt dưới một thread group.
Những elements còn lại ( ví dụ Listeners ) có thể đặt trực tiếp dưới test plan. Trong trường hợp đó chúng sẽ áp dụng đến tất cả thread group.
Thread group element điều khiển số lượng threads mà JMeter sẽ sử dụng để thực thi kịch bản test.<br>
Các điều khiển cho mộtThread Group cho phép bạn đặt số lượng thread cho mỗi nhóm.

Ví dụ: nếu bạn đặt số lượng thread là 100; JMeter sẽ tạo và mô phỏng 100 yêu cầu của người dùng đến máy chủ đang được kiểm thử<br>

![](https://images.viblo.asia/2695f2bf-2067-497a-9bd6-d96cd3868aed.png)
<br>
*Thread Group*
## 3. Samplers
Ở bài chia sẻ trước, mình có đề cập rằng JMeter hỗ trợ kiểm tra HTTP, FTP, JDBC và nhiều giao thức khác.

Chúng ta cũng đã biết rằng Thread Groups mô phỏng yêu cầu người dùng đến máy chủ.

Nhưng làm thế nào để một Thread Groups biết loại yêu cầu nào (HTTP, FTP, v.v.) cần thực hiện?

Câu trả lời là Samplers

Yêu cầu người dùng có thể là FTP Request, HTTP Request, JDBC Request ... Vv.<br>

![](https://images.viblo.asia/7d8cce7f-2a61-4a71-b617-267a9f69a819.png)<br>
*Samplers*

* **FTP Request**:
Hãy tưởng tượng bạn muốn kiểm tra hiệu suất máy chủ FTP. Bạn có thể sử dụng FTP request sampler trong JMeter để thực hiện nhiệm vụ này. Bộ điều khiển này cho phép bạn gửi yêu cầu "download file" hoặc "upload file" FTP đến máy chủ FTP.
![](https://images.viblo.asia/0ba0caa4-d1de-4b9d-ad5c-3a83c4f5d8bb.png)<br>
*FTP Request*<br>

Ví dụ: nếu bạn muốn tải xuống tệp "Test.txt" từ máy chủ FTP đang thử nghiệm, bạn cần định cấu hình một số tham số trong JMeter như hình dưới đây<br>

![](https://images.viblo.asia/ccf3d6a6-38cd-4066-94cc-02c0742de898.png)<br>
*FTP Request*<br>

JMeter sẽ gửi lệnh FTP đến máy chủ FTP ftp.example.com , sau đó tải xuống tệp Test.txt từ máy chủ đó.

* **HTTP request**:
Sampler  này cho phép bạn gửi yêu cầu HTTP / HTTPS đến máy chủ web.
Hãy xem xét ví dụ dưới đây. JMeter gửi yêu cầu HTTP đến trang web của Google và truy xuất các tệp hoặc hình ảnh HTML từ trang web này.

![](https://images.viblo.asia/a6328ca1-7dd8-4465-92cc-2f0e8be25142.png)
<br>
*HTTP Request*<br>

* **JDBC request**:
Sampler này cho phép bạn thực hiện Kiểm tra hiệu suất cơ sở dữ liệu . Nó gửi một Yêu cầu JDBC (một truy vấn SQL) đến cơ sở dữ liệu.<br>

![](https://images.viblo.asia/60246058-546e-446d-9c3b-e7d9de2c3ec8.png)<br>
*JDBC Request*<br>

Ví dụ: máy chủ cơ sở dữ liệu có trường test_result được lưu trữ trong tên bảng test_tbl. Bạn muốn truy vấn dữ liệu này từ máy chủ cơ sở dữ liệu; bạn có thể định cấu hình JMeter để gửi truy vấn SQL đến máy chủ này để truy xuất dữ liệu.

![](https://images.viblo.asia/df72ae0d-aac3-4abd-8071-726c2dc386b8.png)<br>

*JDBC Request Format*

* **BSF request**: Sampler  này cho phép bạn viết một sampler bằng ngôn ngữ kịch bản BSF .
Dưới đây là một ví dụ về BSF Sampler trong JMeter<br>

![](https://images.viblo.asia/124ad536-206b-4b6e-a1cd-bc531c35579a.png)<br>
*BFS Sampler*

* **Access Log Sampler**: Sampler này cho phép bạn đọc nhật ký truy cập và tạo các HTTP request. Nhật ký có thể là hình ảnh, Html, CSS ...
<br>

![](https://images.viblo.asia/4f14604a-47b5-4436-b2cc-25a28d29b292.png)
<br>
*Access Log Sampler*

* **SMTP Sampler**: Nếu bạn muốn kiểm thử một mail server, bạn có thể sử dụng SMTP sampler. Sampler này được sử dụng để gửi email bằng giao thức SMTP.
<br>
![](https://images.viblo.asia/eb42f24e-48b3-472d-8f57-9c5875ae0c7a.png)
<br>
*SMTP Sampler*

### 4. Listener
Listener hiển thị kết quả thực hiện test. Nó có thể hiển thị kết quả ở định dạng khác nhau như cây, bảng, biểu đồ hoặc file log. <br>

![](https://images.viblo.asia/29c6d79f-937b-44a1-bfb1-e747f8fea1db.png)<br>
*Listeners*

* Kết quả dạng biểu đồ hiển thị thời gian phản hồi của máy chủ ở dạng biểu đồ như sau:<br>

![](https://images.viblo.asia/3dee12d6-ba4f-4367-abf8-be24d6c2561a.png)<br>
*Graph*

* Xem kết quả dạng cây hiển thị kết quả của yêu cầu người dùng ở định dạng HTML cơ bản: <br>
![](https://images.viblo.asia/69c233fb-f54a-4651-af72-fc5e994ceff6.png)<br>
*Tree*

* Bảng kết quả hiển thị tóm tắt kết quả kiểm tra ở định dạng bảng: <br>

![](https://images.viblo.asia/86e88713-2194-47b1-a5e8-d3f95ebbef1e.png)<br>
*View table*

* File log hiển thị tóm tắt kết quả kiểm tra trong tệp văn bản: <br>

![](https://images.viblo.asia/43d6eb1e-5274-42cc-b848-c245622d975a.png)<br>
*Log Summary*

### 5. Config Element 
Một số yếu tố cấu hình thường được sử dụng trong JMeter:<br>

![](https://images.viblo.asia/05bea482-f9e3-4b2f-ba44-22a9de08d7f8.png)<br>
*Configuration Elements*

* **CSV Data Set Config:**
Giả sử bạn muốn kiểm tra một trang web cho 100 người dùng đăng nhập bằng các thông tin đăng nhập khác nhau. Bạn không cần phải ghi lại kịch bản 100 lần! Bạn có thể tham số hóa tập lệnh để nhập thông tin đăng nhập khác nhau. Thông tin đăng nhập này (ví dụ: Tên người dùng, mật khẩu) có thể được lưu trữ trong một tệp văn bản. JMeter có một yếu tố cho phép bạn đọc các tham số khác nhau từ tệp văn bản đó. Đó là "CSV Data Set Config", được sử dụng để đọc các dòng từ tệp và chia chúng thành các biến.

![](https://images.viblo.asia/f06af7f3-136d-481e-8468-04ce65385050.png)<br>
*CSV Data Set Config*

Đây là một ví dụ về CSV Data. Đó là một tệp văn bản chứa thông tin người dùng và mật khẩu để đăng nhập trang web mục tiêu của bạn<br>

![](https://images.viblo.asia/1766066a-fe75-4a26-9c2a-d28a432c7841.png)<br>
*CSV Data*

* **HTTP Cookie Manager**<br>

Có một ví dụ n hư sau:

Bạn đã sử dụng trình duyệt của mình (Firefox, IE, Chrome... Vv) để duyệt [www.google.com](https://www.google.com/)

Bạn đăng nhập bằng username và password của bạn.
username và password của bạn sẽ được lưu trữ trong máy tính của bạn dưới dạng cookie.
Lần tới, khi bạn truy cập www.google.com , bạn không cần phải đăng nhập lại vì trình duyệt của bạn sẽ sử dụng cookie làm dữ liệu người dùng để đăng nhập.

Trình quản lý cookie HTTP cũng có tính năng tương tự như trình duyệt web. Nếu bạn có HTTP request và phản hồi có chứa cookie, trình quản lý cookie sẽ tự động lưu trữ cookie đó và sẽ sử dụng nó cho tất cả các yêu cầu trong tương lai tới trang web cụ thể đó.

* **HTTP request default**

Phần tử này cho phép bạn đặt các giá trị mặc định mà HTTP Request controllers của bạn sử dụng.<br>
Ví dụ:<br>
Bạn đang gửi 100 HTTP requests đến máy chủ google.com . 
Bạn sẽ phải nhập thủ công tên máy chủ = google.com cho tất cả 100 yêu cầu này. 
Thay vào đó, bạn có thể thêm một HTTP request defaults với trường "Server Name or IP" = google.com.
Không cần gõ 100 lần!

![](https://images.viblo.asia/56ab8430-1c65-4f26-93c0-90708d799806.png)<br>
*HTTP Request Default*

* **Login Config Element**

Login Config Element cho phép bạn thêm hoặc ghi đè cài đặt tên người dùng và mật khẩu trong bộ lấy mẫu.

Ví dụ: bạn muốn mô phỏng một người dùng đăng nhập vào trang web www.facebook.com bằng username và password. Bạn có thể sử dụng Login Config Element để thêm cài đặt username và password này trong yêu cầu người dùng:

![](https://images.viblo.asia/1eee9889-e7fc-4ca1-bbe4-077d90d82336.png)<br>
*Login Config Element*

***So sánh Login Config Element với CSV data Config***

| Login Config Element | CSV Data Config 
| -------- | -------- |
| Được sử dụng để mô phỏng một người dùng đăng nhập     | Được sử dụng để mô phỏng đăng nhập nhiều người dùng     | 
| Chỉ thích hợp cho tham số đăng nhập (người dùng và mật khẩu)     | Thích hợp cho số lượng lớn các tham số     | 
<br>

<br>

**Tham khảo:** https://www.guru99.com/jmeter-element-reference.html