Trong quá trình làm việc, tìm hiểu các tài liệu từ tài liệu chính thống của Jmeter tới tài liệu từ các bạn đồng nghiệp đi trước. Tôi có viết lại bài này nhằm mục đích lưu lại toàn bộ sự hiểu biết của mình, đồng thời cũng là tài liệu giúp các bạn mới tìm hiểu về Jmeter có cách nhìn khái quát hơn. Làm sao hiểu được cần sử dụng những function gì trong quá trình sử dụng jmeter áp dụng vào từng dự án cho linh hoạt, phù hợp.

# 1. Test Plan là làm gì trong Jmeter ?
> Mục đích: Hiểu đơn giản mỗi khi cần làm một việc gì đó, dù lớn hay nhỏ, bạn nên có kế hoạch cụ thể. Test Plan đúng theo ý nghĩa của nó là tập hợp tất cả các đầu mục công việc chính, đảm bảo đi đúng theo mục đích mà bạn đề ra. Trong Jmeter các đầu mục công việc này chính là các bước sẽ thực hiện khi chạy

**Một test plan đầy đủ bao gồm:**


| STT | Tên chức năng |Mục đích| Số lượng trong 1 test plan|
| -------- | -------- | -------- |-------- |
| 1 | Thread Group    | Quản lý những Thread được tạo ra bởi Jmeter để giả lập nhiều người dùng cùng lúc    | Một hoặc nhiều và Bắt buộc phải có   |
| 2 | Logic Controler | Nếu trong request có liên quan tới logic. Ví dụ có cấu trúc if - then - else hoặc loop .... Giúp định nghĩa |Một hoặc nhiều phụ thuộc, Không bắt buộc  |
| 3 |Samplers         |Yêu cầu Jmeter gửi các request tới server    | Một hoặc nhiều và không bắt buộc|
| 4 | Listeners       | Sử dụng để xử lý sau khi request dữ liệu. Cho phép người dùng xem kết quả của các Sampler| Một hoặc nhiều và không bắt buộc   |
|  5| Timer           |Được sử dụng để chèn độ trễ giữa những reuqest |  Một hoặc nhiều và không bắt buộc     |
| 6 |  Assertion      |Cho phép người dùng kiểm tra thông tin trả về từ đối tượng kiểm tra có đúng với mong đợi không |   Một hoặc nhiều và không bắt buộc    |
|  7|Configuration elements|Sử dụng để thêm vào những thay đổi/ cấu hình cần thiết cho các sampler |   Một hoặc nhiều và không bắt buộc    |

# 2. Chi tiết từng chức năng trong Jmeter
## 2.1. Thread Group

Các tạo thread group trên Jmeter như sau:
Nhấp chuột phải vào Test Plan -> Chọn [Add] --> Chọn Threads(Users) -> Chọn [Thread Group]. Sẽ hiển thị như hình bên dưới:
![](https://images.viblo.asia/c65845e7-5259-485e-b976-9be9c6708176.png)
ThreadGroup cho phép thiết lập:

- Số lượng các threads (tương đương số lượng users)
    
 - Thiết lập khoảng Ramp-up: Khoảng thời gian 1 user thực hiện giữa 2 lần
    
 - Thiết lập số lần thực hiện test (của mỗi thread).
    
Scheduler Configuration: Có từ sau phiên bản 1.9, cho phép thiết lập start và end time của một lần chạy test. 

Khi bắt đầu thực hiện test, không có phần tử nào được thực hiện cho đến khi đến điểm start time. Sau mỗi chu trình thực hiện, trừ khi đến điểm end time, quá trình test mới được dừng lại, nếu không, tiếp tục thực hiện cho đến khi đủ số lượng các chu trình.
## 2.2. Controllers
***Controllers có 2 loại: Samplers and Logic Controller - đều có tác dụng điều khiển quá trình thực hiện test***
### 2.2.1. Samplers
 Sampler có thể giả lập các request của người dùng tới server. Mỗi Sampler sinh ra các mẫu kết quả (sample result), với rất nhiều các thuộc tính như hiệu năng, elapsed time, throughput, … Mặc định, Jmeter gửi các request theo thứ tự mà các Samplers xuất hiện trên cây. Tuy nhiên, trật tự xử lý các Sampler có thể được cấu hình mở rộng thêm với các Logic Controller. Các controllers có thể được sử dụng để chỉnh sửa số lần lặp của một sampler
 
Các JMeter samplers thì rất nhiều, tùy nhiên phụ thuộc vào dự án, vào ngôn ngữ mà có những samplers phổ biến như sau: 
- HTTP Request
- FTP Request
- JDBC Request
- Java Request
- TCP Sampler
- JUnit Request
- Test Action
- SOAP/XML-RPC Request
- WebService (SOAP) Request
- Access Log Sampler
- BeanShell Sampler
Có thể customize mỗi sampler bằng cách thiết lập các thuộc tính của nó, hoặc thêm các Configuration Element.
### 2.2.2. Logic controllers
Logic Controller cho phép định nghĩa thứ tự xử lý các Samplers trong 1 Thread, ví dụ customize logic mà Jmeter sử dụng để gửi các request (logic: for, if, switch, ….) Một Logic Controller thay đổi trật tự các request của các phần tử con của nó. Các phần tử con của 1 Logic Controller có thể bao gồm các Samplers, các Configuration Elements, và nhiều loại Logic controllers khác. Với những request này, Jmeter có thể select một cách ngẫu nhiên (Sử dụng Random Controller), repeat (Sử dụng Loop Controller).

Các Logic Controller có thể được kết hợp để thu được các kết quả đa dạng. Dưới đây là danh sách các Logic Controller phổ biến:

 - Simple Controller
 - Loop Controller
 - Random Controller
 - Random Order Controller
 - Throughput Controller
 - Runtime Controller
 - ForEach Controller
 - Transaction Controller
 - Recording Controller
## 2.3. Listener
Listeners cho phép người dùng view kết quả của các Samplers. Kết quả có thể được biểu diễn dưới dạng các tables, các graphs, các trees hay text thông thường trong các log files.

 Mỗi Listener hiển thị kết quả trả về. Ví dụ, để view dạng đồ thị kết quả trả về, có thể sử dụng một “Aggregate Graph” Listener. Tương tự, để view các báo cáo thống kê của cùng response data đó theo dạng thức table, có thể tạo một Summary Report hay Aggregate Report Listener.

**Note:**

 - Jmeter Listener cho phép view, save và read các test result. Tất cả các Listener đều lưu dữ liệu vào cùng 1 file (*.jtl), Điểm khác nhau duy nhất nằm ở cách biểu diễn kết quả được ghi lại
  - Một Listener có thể sử dụng rất nhiều bộ nhớ nếu nó đảm nhận ghi dữ liệu cho nhiều Sample.
 - Jmeter có thể chạy chậm, nếu sử dụng quá nhiều. Vì vậy, cần chú ý sử dụng một lượng nhỏ hợp lý các listeners.

*Một số đặc tính chung của tất cả các Listener bao gồm:*

- Configure button: Sử dụng Configure button để chọn các thông tin sẽ được lưu ra file hoặc được sử dụng về sau (các file *.jtl), theo định dạng XML hoặc CSV. Đây chính là cấu hình cho phép tùy chỉnh các kết quả ra.
- Browser button: Cho phép read, sau đó display 1 kết quả bất kỳ được lưu từ trước.
- Throughput: Số request xử lý thành công trong một đơn vị thời gian tính từ Sample đầu -> Sample cuối ***(Throughput = (number of requests) / (total time))***

## 2.4. Timer
![](https://images.viblo.asia/210aefe9-6143-4617-9b55-488ad4009527.png)
Mặc định, Jmeter sẽ gửi các request liên tiếp, như thế có thể làm server quá tải. Do vậy, thêm Timer giảm khả năng chịu tải của server. Phù hợp để test các chức năng
## 2.5. Configuration Elements
Thông thường, chức năng này nên được thực hiện đầu tiên, trước tất cả các Sampler trong cùng 1 plan. Mỗi một configuration element chỉ được truy cập trong nội bộ nhánh mà nó được đặt

Ví dụ: Trong ảnh bên dưới

![](https://images.viblo.asia/66f86bbe-c050-494e-a093-426f725502d0.png)
 Như hình bên trên, Có 2 HTTP Request Defaults elements, là "Web Defaults 1" và "Web Defaults 2". Vì "Web Defaults 1" nằm trong Loop Controller, nên chỉ có "Web Page 2" có thể access tới nó. 
 
 Các HTTP requests khác sẽ sử dụng "Web Defaults 2", vì nó được đặt trong Thread Group.
 
 Như vậy, trong phần 1 tôi đã nói tới mục đích của từng những chức năng cần thiết làm. Ở phần 2, tôi sẽ làm video để thực hiện demo cách tạo request test tải trên mobile.
 
``` 

P/s: Bài viết theo sự xuất phát cá nhân với những gì đã tìm hiểu được. Chắc chắn sẽ còn sai sót. Mong được mọi ng giúp đỡ
```

***Tài liệu tham khảo:***
1. Tài liệu support của Jmeter http://jmeter.apache.org/
2. Sách Apache Jmeter của Emily H.Halili