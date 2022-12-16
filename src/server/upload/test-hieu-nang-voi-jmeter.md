## 1. Định nghĩa kiểm thử hiệu năng
![](https://images.viblo.asia/892a24aa-c68f-4f5e-9d90-9082a23169bf.png)

Có nhiều định nghĩa về kiểm thử hiệu năng, kiểm thử hiệu năng hay performance test được định nghĩa là một loại phần mềm kiểm thử sử dụng để đảm bảo các ứng dụng phần mềm hoạt động hiệu quả trong khoảng công việc dự kiến của ứng dụng.

Các tính năng và chức năng của một hệ thống phần mềm không phải là mối quan tâm duy nhất. Hiệu năng của một ứng dụng phần mềm như thời gian phản hồi (response time), độ tin cậy (reliability), sử dụng tài nguyên (resource usage) và khả năng mở rộng (scalability) của nó cũng là điều đáng chú ý.

Trong đó trọng tâm của kiểm thử hiệu năng là:

- Thời gian phản hồi: xác định xem ứng dụng phản hồi nhanh hay chậm 

- Khả năng mở rộng: Xác định tải người dùng tối đa mà ứng dụng phần mềm có thể xử lý. 

- Tính ổn định: Xác định xem ứng dụng có ổn định dưới các tải khác nhau hay không. 

Mục tiêu của Kiểm thử hiệu năng không phải là để tìm lỗi, nó là hoạt động cần thiết cho việc phát triển những giải pháp tối ưu hóa hiệu năng cho phần mềm. Kiểm thử hiệu năng giúp chúng ta tránh được các tình huống không lường trước khi triển khai ứng dụng trong môi trường thực tế. 

## 2. Công cụ kiểm thử hiệu năng Jmeter
Ngày nay có rất nhiều công cụ hỗ trợ việc kiểm thử hiệu năng. Các tool này hầu như đảm bảo hiệu suất ứng dụng của bạn trong thời gian cao điểm nhiều users sử dụng và trong điều kiện căng thẳng cực độ. Một số công cụ kiểm thử hiệu năng như: WebLOAD, LoadUI NG Pro,SmartMeter.io, Tricentis Flood, LoadView, Apache JMeter, LoadRunner, Appvance, NeoLoad, LoadComplete

Nhưng hôm nay mình muốn giới thiệu đến các bạn tool test hiệu năng Jmeter. Một công cụ test hiệu năng khá hiệu quả và dễ sử dụng.

**Jmeter là gì ?**

JMeter là một phần mềm được dùng để test function, khả năng chịu tải và hiệu suất của một trang web hay là API.

Apache JMter được tạo nên từ ngôn ngữ lập trình Java nên rất dễ ràng trong việc tích hợp các lib, script trong Jmeter.

## 3. Kiểm thử hiệu năng với Jmeter
### 3.1 Đối tượng kiểm thử

 Đối tượng kiểm thử: Trang web http://www.adempiere.net/demo

Môi trường kiểm thử:

* Hệ điều hành: Microsoft Windows 10
* Công cụ: Jmeter 3.0 Apache

### 3.2 Các thao tác thực hiện

**1.Tạo kịch bản test:**

**a.Load test**:

Cùng thời gian tạo các yêu cầu trong 1s

Kịch bản 1: Có 200 yêu cầu đồng thời đến trang web http://www.adempiere.net/demo

Kịch bản 2: Có 500 yêu cầu đồng thời đến trang web http://www.adempiere.net/demo

Kịch bản 3: Có 700 yêu cầu đồng thời đến trang web http://www.adempiere.net/demo

Kịch bản 4: Có 1000 yêu cầu đồng thời đến trang web http://www.adempiere.net/demo

**b.Stress test:**

1000 yêu cầu vào trang web http://www.adempiere.net/demo với

Kịch bản 1: thời gian tạo 1000 yêu cầu trên là 2s

Kịch bản 2: thời gian tạo 1000 yêu cầu trên là 5s

Kịch bản 3: thời gian tạo 1000 yêu cầu trên là 10s

**2.Tiến hành kiểm thử**

**a.Load test**

**Mục đích**

Mô hình hóa dự kiến sử dụng bởi nhiều người dùng truy cập một dịch vụ website trong cùng thời điểm.

 **Thêm 1 Thread Group mới**
 
* Add -> Threads (Users) -> Thread Group

* Nhập Thread properties:

   + Number of Threads: Số lượng người sử dụng truy cập vào website

  +  Loop Count: Số thời gian thực hiện kiểm tra

    + Ramp-Up Period: Thời gian trì hoãn trước khi bắt đầu một người sử dụng tiếp theo

**Thêm phần tử Jmeter**

* Add -> Config Element -> HTTP Request Defaults.
* Add -> Sampler -> HTTP Request.
* HTTP Request Control, trường Path sẽ chỉ ra URL request nào bạn muốn gửi tới máy chủ

**Thêm Grap Result, Summary Report và View Results in Table:**

* Add -> Listener -> Graph Results
* Add -> Listener -> Summary Report
* Add -> Listener -> View Results in Table

**Chạy test với kịch bản 1**
![](https://images.viblo.asia/86bffb53-b221-4e96-930e-a166fcf5eecc.png)

Nhấn đồng thời phím (CTRL+R) trên toolbar để bắt đầu quá trình test. Bạn sẽ nhìn thấy kết quả test được hiển thị trên View Results in Table và bảng Report với thời gian thực

**Kết quả**

|  Kịch bản |Tổng số truy cập| Số truy cập thành công |Số truy cập không thành công|Thời gian truy cập trung bình (ms)|
| -------- | -------- | -------- |-------- |-------- |
|1|200|200|0|10025|
| 2|500     | 500    |  0| 15419 |
|3| 700     | 691    | 9|26416 |
|4| 1000    | 970     | 30 |34352|

Với 1000 yêu cầu thực hiện trong 1s thì thời gian xử lý trung bình hết 34352 ms.

=> Thời gian xử lý nhanh với số lượng yêu cầu cao nên Server đang chạy tốt.

**b. Stress test:**

**Mục đích:**

Stress testing: Tất cả các web server có thể tải một dung lượng lớn, khi mà tải trọng vượt ra ngoài giới hạn thì web server bắt đầu phản hồi chậm và gây ra lỗi. 

**Thêm 1 Thread Group mới**

* Add -> Threads (Users) -> Thread Group
* Nhập Thread properties:

    + Number of Threads: Số lượng người sử dụng truy cập vào website
    + Loop Count: Số thời gian thực hiện kiểm tra
    + Ramp-Up Period: Thời gian trì hoãn trước khi bắt đầu một người sử dụng tiếp theo

 **Thêm phần tử Jmeter**
 
* Add -> Config Element -> HTTP Request Defaults.
* Add -> Sampler -> HTTP Request.
* HTTP Request Control, trường Path sẽ chỉ ra URL request nào bạn muốn gửi tới máy chủ

 **Thêm Grap Result, Summary Report và View Results in Table**:
 
* Add -> Listener -> Graph Results
* Add -> Listener -> Summary Report
* Add -> Listener -> View Results in Table

**Chạy test với kịch bản 1**

![](https://images.viblo.asia/d6a0c893-1f17-440b-b160-2811f937ecf5.png)

Nhấn đồng thời phím (CTRL+R) trên toolbar để bắt đầu quá trình test. Bạn sẽ nhìn thấy kết quả test được hiển thị trên Summary Report với thời gian thực

**Kết quả:**


| Column 1 | Column 2 | Column 3 | Column 3 | Column 3 | Column 3 | Column 3 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
|   1  |   1000 |8501    | 4416|34731 |26.8% |28.4 |
|     2|    1000|  10873  | 2931| 29272|3,1% |32,2 |
|     3|    1000|4933   | 1110|16024 |0% | 44,3|

Với 1000 yêu cầu và trong thời gian thực hiện lần lượt là 1s, 5s, 10 thì thời gian xử lý trung bình thấp.

=> Thời gian đáp ứng yêu cầu nhanh với lượng yêu cầu cao nên Server đang chạy tốt.

***Tài liệu tham khảo:***

https://en.wikipedia.org/wiki/Software_performance_testing
https://www.guru99.com/jmeter-performance-testing.html