Nhắc đến công cụ sử dụng để kiểm thử hiệu suất hệ thống phần mềm một lượng lớn dân trong nghề sử dụng jmter để thực thi. Tại sao nó lại được sử dụng động như vậy chắc hẳn các bạn đã biết lí do. Apache JMeter là phần mềm mã nguồn mở được viết bằng Java thuần túy, được phát triển lần đầu tiên bởi Stefano Mazzocchi. Jmeter được thiết kế nhằm kiểm thử chức năng (functional testing), kiểm thử tải (load testing) và kiểm thử hiệu năng (performance testing). Bạn có thể sử dụng JMeter để phân tích và đo lường hiệu năng của ứng dụng web. Kiểm thử hiệu năng là kiểm thử một ứng dụng web chống lại mức tải nặng (heavy load), lượng truy cập người dùng nhiều và đồng thời. Nhưng sử dụng nó là một phần, nhưng quan trọng hơn hết là người dùng phải biết cách đọc báo cáo của nó sao cho đưa ra một kết quả đánh giá đúng nhất.

## Thực hiện Performance testing nhằm mục đích gì ? 


Có 4 vấn đề bạn cần biết khi bạn muốn trả lời câu hỏi trên.

1. Khi hệ thống bạn làm được lên "sóng" bạn có biết bao nhiêu user có thể cùng sử dụng tính năng hay ứng dụng của bạn 1 lúc và khả năng server hệ thống của bạn chịu tải được bao nhiêu user thì die?

2. Lượng lớn user sử dụng hệ thống của bạn thì đến mức nào thì server chịu tải và hoạt động mượt mà, đến mức nào thì server ấy bắt đầu hiện tượng hoạt động không tốt?

3. Bạn có biết hacker "mũ đen" có thể lợi dụng việc khả năng chịu tải kém của server để phá hoại server. Ứng dụng ,hệ thống có thể đối phó với tấn công từ chối dịch vụ hay không?

4. Hệ thống có thể đảm bảo hoạt động trong thời gian dài hay không?

  Việc kiểm tra hiệu suất có thể được sử dụng để trả lời những câu hỏi trên, nhưng hầu hết các tổ chức với việc thực hiện kiểm tra hiệu suất là một nhiệm vụ khó khăn và phức tạp.  Rào cản lớn nhất cho việc đó chính là chi phí sử dụng các công cụ kiểm tra hiệu suất và tải.
 
  Mục tiêu kiểm tra hiệu suất có thể điểu chính để đáp ứng theo từng nhu cầu. Do đó, Jmeter chính là công cụ tuyệt vời để thực hiện kiểm tra hiệu suất một các hiệu quả và phù hợp. Tuy nhiên việc sử dụng được nó sẽ không đơn giản nếu như chúng ta không hiểu được các báo cáo trả về của tools để phân tích tình hình của hệ thống.
  
##  Các số liệu trong report:
### 1. Biểu đồ Aggregate Graph
![](https://images.viblo.asia/ad426b8d-9026-40bb-b5f2-d0342cebf733.png)
   Biểu đồ báo cáo demo Jmeter
   
Biểu đồ "Aggregate graph" là một bộ kiểm tra hữu ích về từng yêu cầu và giao dịch điều khiển. Nó cũng bao gồm thanh có thể điều chỉnh được đển phù hợp với nhu cầu khác nhau của người dùng. Nó rất hay trong việc có thể xuất ra báo cáo dưới dạng png và bảng CSV cho việc sử dụng tương lai  trong báo cáo thiết kế điều chỉnh.

Các số liệu là toàn bộ bài kiểm tra, có nghĩa là bạn nhận được ví dụ như thời gian phản hồi trung bình của một yêu cầu cho toàn bộ bài kiểm tra. các số liệu có sẵn là:

- Lable: Tên của yêu cầu,

- #Samples: Tổng số thực hiện

- Average: Trung bình xử lí yêu cầu được tình bằng mili giây 

- Median: Nó gần giống với trung bình, nhưng ý nghĩa khác hoàn toàn. Median + Một giá trị A sẽ chia các giá trị của bạn thành 2 phần bằng nhau, một phần sẽ chứa các giá trị <A, phần còn lại sẽ chứa các giá trị >A. Median cũng được hiểu như là 50th Percentile. Quay lại Performnce, thì median sẽ chỉ ra, sẽ có 60% yêu cầu phản hồi có thời gian nhỏ hơn giá trị, và 50% có số request còn lại có thời gian phản hồi lớn hơn giá trị này.

- 90% Line: Nghĩa là 90% số yêu cầu sẽ có thời gian nhỏ hơn giá trị hiển thị trong bảng, 10% số yêu cầu còn lại có phản hồi lớn hơn giá trị hiển thị trong bảng

- 95% Line: Nghĩa là 95% số yêu cầu sẽ có thời gian nhỏ hơn giá trị hiển thị trong bảng, 10% số yêu cầu còn lại có phản hồi lớn hơn giá trị hiển thị trong bảng.


- 99%Line: Nghĩa là 99% số yêu cầu sẽ có thời gian nhỏ hơn giá trị hiển thị trong bảng, 10% số yêu cầu còn lại có phản hồi lớn hơn giá trị hiển thị trong bảng.

- Min: Thời gian xử lý yêu cầu thấp nhất.

- Max: Thời gian xử lý yêu cầu cao nhất.

- Erros %: Tính bằng công thức ( Errors/ Errors _Pass*100) 

- Throughput : Số lượng mẫu thử trên giây KB/giây, Thông lượng mạng trên KB/giây

### 2. Simple Data Writer

*Đây là trình nghe hữu ích nhất trong Jmeter. Nó lưu các số liệu hiệu suất theo cấu hình bên trong một tệp, bên ngoài một tệp. Tệp JTL của JMeter là cách tốt nhất để phân tích kết quả nhưng đi kèm một nhược điểm bạn cần một công cụ khác để thực hiện khai thác dữ liệu.*

![](https://images.viblo.asia/96a8f30a-23f3-4f08-aa7a-c868d6fc4dea.png)

JTL là cách mạnh mẽ nhất để phân tích kết quả Jmeter.

**Ưu điểm:**

JTL là các tệp CSV đơn giản dễ đọc, 
Một số công cụ dựa trên web có khả năng phân tích tệp JTL và hiển thị báo cáo trực tuyến, Tất cả các kết quả thô được lưu với tập JTL

**Nhược điểm:**

JTL được ghi bởi mỗi trình tạo tải trên đĩa của họ. Thử nghiệm phân tán yêu cầu đưa chúng trở lại bộ điều khiển khi kết thúc thử nghiệm, JTL có thể phát triển lớn (vài GB) và làm lộn xộn đĩa, Các JTL phải được khai thác dữ liệu bằng các công cụ như Excel để có được các số liệu hữu ích trong số chúng. Hãy để chúng tôi xem thế nào chúng ta có thể diễn giải các tệp JTL đó.

**Cách để có Báo cáo JTL file với Excel**

* Simple Data Write Listener: Chọn mục [ Save As XML] trong bảng Sample Result Save Configuration 
* Run the load test: From APACHE_JMETER_HOME, chay command ./bin/jmeter -n -t jpetstore.jmx -l jmeter.jtl
* Edit the JTL: add <?xml-stylesheet type="text/xsl" href="PATH_TO_jmeter-results-report_21.xsl"?> after <?xml version="1.0" encoding="UTF-8"?>,
* Save JTL,

* Open Microsoft Excel: Sau đó thả tập tin vào bên trong nó.
![](https://images.viblo.asia/2bbf4b06-1114-42e4-b081-d1f1d6c54928.png)

 Chức nay này không hoatj động với Open Office mà chỉ Microsoft Office được hỗ trợ
 Bản báo cáo này sẽ có giá trị hoạt độngt ừ phiên bản Jmeter 3.0 trở đi.
 
 *Nguồn: https://octoperf.com/blog/2017/10/19/how-to-analyze-jmeter-results/*