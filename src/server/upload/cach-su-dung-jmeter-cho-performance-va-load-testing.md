*Performance testing là một loại test quan trọng để xác định ứng dụng web đang được kiểm tra có đáp ứng các yêu cầu tải cao . Loại test này được dùng để phân tích hiệu năng máy chủ một cách tổng thể khi chịu tải nặng.*

![](https://images.viblo.asia/ec05af0d-2517-4f52-b340-4dd13ba15477.PNG)


**Apache JMeter testing tool cung cấp các lợi ích sau**:

- JMeter có thể sử dụng các tài nguyên tĩnh như JavaScript và HTML, các tài nguyên động như JSP, Servlets và AJAX
- JMeter có thể phát hiện số lượng người dùng tối đa cùng lúc mà web có thể xử lý
- JMeter cung cấp phân tích đồ họa về báo cáo hiệu suất.

**Test performance trên JMeter bao gồm**: 

![](https://images.viblo.asia/a111fc59-4783-40b9-a1fc-70aa07bb4c53.png)

- **Load testing**: Mô phỏng nhiều người dùng truy cập dịch vụ Web cùng lúc
- **Stress testing**: Mỗi máy chủ web có giá hạn tải tối đa. Khi vượt quá giới hạn, máy chủ sẽ phản hồi chậm và tạo ra bug. Mục đích của Stress test là tìm mức tải tối đa mà máy chủ web có thể xử lý.


![](https://images.viblo.asia/2e409410-f6cb-4970-9a75-32f25140a225.png)

## Lên kế hoạch về performance test trong JMeter

Trong bài hướng dẫn này, chúng ta sẽ thực hiện phân tích hiệu năng của web Google.com cho 1000 users
Trước khi test, chúng ta nên xác định
- **Normal Load**: số lượng user trung bình lướt web
- **Heavy Load**: Số lượng user tối dsdaa lướt web
- **Mục tiêu** của lần thử nghiệm này.

 Cụ thể gồm các bước sau: 

![](https://images.viblo.asia/9516572b-68c5-4e3f-ad37-617260862fa4.png)

### Bước 1: Add Thread Group
1. Chạy JMeter
2. Chọn mục Test Plan
3. Tạo  Thread Group

![](https://images.viblo.asia/6adfaffc-8935-4122-9870-57580b4cb969.png)

Trong phần Thread Group, mở Thread properties:

![](https://images.viblo.asia/a76c4a13-073a-4fe5-94f8-6278aed48244.png)

- **Number of Threads**: 100 (sô lượng users kết nối: 100)
- **Loop Count**: 10 (số lần thực hiện test)
- **Ramp-Up Period**: 100

Thread Count và  Loop Counts là khác nhau:

![](https://images.viblo.asia/c836763b-f0a9-48ac-b1e2-0e8fffe88a5a.png)

Ramp-Up Period cho biết thời gian trì hoãn trước khi bắt đầu tới người dùng tiếp theo. 
Ví dụ: nếu chúng tôi có 100 users và thời gian Ramp-Up 100 giây thì thời gian trễ giữa các user bắt đầu sẽ là 1 giây (100 giây / 100 user)

![](https://images.viblo.asia/2e9a4d22-0dee-49c0-abd0-f1447029b277.png)


### Bước 2: Add JMeter elements
1. **HTTP Request Defaults**
Thêm phần từ này bằng cách: Nhấn chuột phải vào Thread Group và chọn: Add  -> Config Element  -> HTTP Request Defaults

![](https://images.viblo.asia/ae124bdb-297d-4963-a2d5-04b58916e94d.png)

Trong bảng HTTP Request Defaults, hãy nhập tên trang web cần được kiểm tra ( http://www.google.com )
![](https://images.viblo.asia/a7f65d61-3e06-4964-a21f-31145333c6a2.png)

2. **HTTP Request**
Thêm phần từ này bằng cách: 

Nhấn chuột phải vào Thread Group và chọn: Add  -> Sampler  -> HTTP Request . 

![](https://images.viblo.asia/179bccab-a7d1-4b12-8af0-2ecea1d2fbc9.png)

Trong Bảng HTTP Request, trường Path cho biết **yêu cầu URL** nào bạn muốn gửi tới máy chủ Google.

![](https://images.viblo.asia/0071ce5b-1490-4738-9258-b728224d9f86.png)


Nếu bạn giữ trường Path trống,   JMeter sẽ tạo yêu cầu URL http://www.google.com tới máy chủ Google.

### Bước 3: Add Graph results

JMeter có thể hiển thị test result  ở định dạng Đồ thị.

Nhấp chuột phải vào Test Plan, Add -> Listener -> Graph Results

![](https://images.viblo.asia/2443ce0c-b333-4005-9337-d7a1c65084eb.png)

### Bước 4: Run Test & Get Result

Nhấn nút Run ( Ctrl + R) trên toolbar để bắt đầu tiến trình test.  Bạn sẽ thấy kết quả ở dạng đồ thị.


![](https://images.viblo.asia/988b48c8-28bf-4d06-bc00-616623545458.gif)

Ở dưới cùng của hình ảnh, có các số liệu thống kê sau đây, được biểu thị bằng màu sắc:

- Đen: Tổng số mẫu hiện tại được gửi.
- Màu xanh dương : Mức trung bình hiện tại của tất cả các mẫu được gửi.
- Màu đỏ : Độ lệch chuẩn hiện tại.
- Màu xanh lá cây : Tỷ lệ thông lượng biểu thị số lượng yêu cầu mỗi phút mà máy chủ xử lý

Hãy phân tích hiệu suất của máy chủ Google trong hình bên dưới.

![](https://images.viblo.asia/74dcf191-4756-4270-bd60-0ad8cc5927d8.png)

Để phân tích hiệu suất của máy chủ web đang được kiểm tra, bạn nên tập trung vào 2 tham số:

- **Throughput**
- **Deviation**

Tham số quan trọng nhất là Throughput. Nó biểu hiện cho khả năng máy chủ xử lý tải nặng. Throughput càng cao thì hiệu suất máy chủ càng tốt.

Tham số Deviation được hiện màu đỏ, nó chỉ ra sai lệch so với mức trung bình. Giá trị Deviation càng nhỏ thì càng tốt.



Tài liệu tham khảo: https://www.guru99.com/jmeter-performance-testing.html