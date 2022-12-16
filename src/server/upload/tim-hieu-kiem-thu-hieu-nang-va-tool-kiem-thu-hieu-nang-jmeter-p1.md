# Kiểm thử hiệu năng là gì?
![](https://images.viblo.asia/8fd7a492-3a4e-484c-b07f-0e6acd22b6d4.png)

Kiểm thử hiệu năng được thực hiện để xác định tốc độ một hệ thống thực hiện hay xử lý một khối lượng công việc cụ thể. Hiệu năng chủ yếu được xác định bởi sự kết hợp của các yếu tố:
* Số lượng tối đa người dùng truy cập đồng thời mà ứng dụng có thể đáp ứng được (*capacity measure*), thông lượng (*throughput*) hay số lượng giao dịch thành công trong một khoảng thời gian nhất định (*transaction per second*) và thời gian đáp ứng (*response time*)  là thời gian cần để hoàn thành một nhiệm vụ hay chức năng.
* Ngoài ra kiểm thử hiệu năng cũng dùng để đo khả năng chiếm dụng tài nguyên máy tính như RAM usage, CPU usage…
# Các tiêu chí của kiểm thử hiệu năng?
### Response time
Respone time là thời gian phản hồi từ lúc client gửi request tới server cho đến khi client nhận được response từ server trả về.<br>
**Response time = Transfering time + Waiting time + Processing time**<br>
Trong đó:
* *𝑇𝑟𝑎𝑛𝑠𝑓𝑒𝑟𝑖𝑛𝑔 𝑡𝑖𝑚𝑒* là thời gian truyền tải dữ liệu trên đường truyền.
* *𝑊𝑎𝑖𝑡𝑖𝑛𝑔 𝑡𝑖𝑚𝑒* là thời gian request chờ trong queue.
* *𝑃𝑟𝑜𝑐𝑒𝑠𝑠𝑖𝑛𝑔 𝑡𝑖𝑚𝑒* là thời gian request được xử lý thực sự.
Đơn vị của respose time là một đơn vị thời gian như giây(s), phút(m), mili giây(ms)
### Throughput 
Thông lượng hệ thống, tính bằng số giao dịch (transaction) hệ thống đáp ứng được trong một khoảng thời gian. Đơn vị tổng quát là transaction per time_period ( viết tắt là TPS). 
Ví dụ như transactions per second, calls per day…
### Concurrency 
Số giao dịch đồng thời được thực hiện, tính bằng số giao dịch đồng thời hệ thống đáp ứng được.
 Đơn vị là transaction, ví dụ 200 transactions đồng thời, 300 transactions đồng thời…
###  Capacity Measure
* Số lượng tối đa người dùng truy cập mà ứng dụng có thể đáp ứng. Nguyên lí thực hiện như sau: Bắt đầu kiểm thử trong khoảng thời gian T nhất định (response time) và tăng dần số lượng người dùng thực hiện chức năng cho đến khi server chết hay nghẽn.
* Capacity Measure được tính bằng số lượng thời dùng truy cập ngay trường thời điểm server nghẽn chết mà vẫn thỏa mãn chưa vượt quá thời gian T và tỉ lệ lỗi chưa vượt quá 10%.
### Một số thông số khác
* CPU usage: Hiệu suất sử dụng CPU. Đơn vị là %.
* RAM usage: Hiệu suất sử dụng RAM. Đơn vị là %.
* Fail rate: Tỉ lệ lỗi, tính bằng số giao dịch không thực hiện thành công trên tổng tổng số giao dịch đã thực hiện. Giá trị này dùng để làm điều cần cho các mục tiêu trên. Đơn vị là %.
## Quy trình Kiểm thử Hiệu năng?
![](https://images.viblo.asia/62ea40f3-34e7-4c42-9071-42d05dd8e8db.png)

# JMETER PERFORMANCE TESTING
## Jmeter là gì?
* Jmeter là một phần mềm kiểm thử mã nguồn mở, nó là 100% ứng dụng Java cho sự tải và việc kiểm thử hiệu năng. Nó được thiết kế để bao quát các loại kiểm thử như là độ tải, chức năng, hiệu năng, etc... và nó yêu cầu JDK 5 hoặc cao hơn.
* Jmeter có thể sử dụng để kiểm thử hiệu năng của hai nguồn tài nguyên tĩnh như là Javascript và HTML và tài nguyên động như JSP, Servlets, và AJAX.
* Jemeter có thể phát hiện ra một số lượng lớn các users trong cùng một thời điểm mà website có thể xử lý.
* Jmeter có thể cung cấp phần lớn các phân tích đồ họa của báo cáo performance.
JMeter Performance Testing bao gồm:
* *Load testing*: Đo khả năng chịu tải lượng truy cập một website trong cùng thời điểm.
* *Stress testing*: Tất cả các web server có thể tải một dung lượng lớn, khi mà tải trọng vượt ra ngoài giới hạn thì web server bắt đầu phản hồi chậm và gây ra lỗi. Mục đích của stress testing là có thể tìm ra độ tải lớn mà web server có thể xử lý.
Cấu hình dưới đây chỉ ra Jmeter mô phỏng tải trọng lớn như thế nào:
![](https://images.viblo.asia/01163a97-d4f0-4a5e-a57b-dd34d96ca844.png)

## Download Jmeter
Truy cập để download Apache Jmeter: http://jmeter.apache.org/download_jmeter.cgi
![](https://images.viblo.asia/2c2701fa-db8e-4ff9-ab30-ea79e3122440.png)

Máy tính cần phải cài bản Java 8 trở lên để chạy được Jmeter
Để bắt đầu với việc chuẩn bị script đầu tiên của bạn trong Jmeter, bạn sẽ cần phải hiểu chức năng của các tính năng Jmeter được đề cập dưới đây:
* Test Plan
* Thread Group
* HTTP(S) Test Script Recorder
* Recording Controller
* HTTP Request Defaults
* HTTP Cookie Manager
* User Defined Variables
* Listeners