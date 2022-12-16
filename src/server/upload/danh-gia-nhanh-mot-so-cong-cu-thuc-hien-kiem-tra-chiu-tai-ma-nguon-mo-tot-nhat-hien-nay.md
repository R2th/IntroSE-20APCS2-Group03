Kiểm tra chịu tải (load testing) là một loại kiểm thử phần mềm nhằm xác định hiệu suất của hệ thống trong các điều kiện tải thực tế. Nó giúp bạn cải thiện tắc nghẽn hiệu suất, lường trước được các tính huống xảy ra, nhanh chóng khắc phục các lỗi gặp phải trước khi chính thức ra mắt ứng dụng.

Để bắt đầu kiểm tra tải, bạn cần các công cụ chuyên dụng để có thể mô phỏng một lượng lớn lưu lượng truy cập. Hiện này có rất nhiều công cụ được phát triển để giúp thực hiện kiểm thử tải một cách hiệu quả, bao gồm cả những công cụ mã nguồn mở và những phiên bản trả phí. Tùy thuộc vào độ phức tạp của các bài kiểm thử tải, một số công cụ kiểm thử tải được sử dụng có thể khá tốn kém. Tuy nhiên cũng có rất nhiêu công cụ kiểm thử tải miễn phí và vẫn mang lại hiệu quả rất tốt. Trong bài viết này, mình sẽ cùng các bạn thảo luận về một số công cụ kiểm tra tải mã nguồn mở được sử dụng phổ biến nhất hiện nay nhé.

![](https://images.viblo.asia/695b7a89-9950-4627-9696-09f6e0e0e4a4.png)

# Tổng quan
Cụ thể ở đây, mình sẽ giới thiệu đến các bạn top 6 công cụ là Apachebench, Artillery, Locust, Jmeter, K6 và Gatling. Đây là những công cụ được sử dụng phổ biến, thường được đề xuất khi bạn muốn muốn thực hiện các bài kiểm tra chịu tải. Trước hết, chúng ta hãy cùng xem xét phần tổng hợp những thông tin cơ bản về những công cụ này trong bảng dưới đây:

|  | Apachebench | Artillery | Locust | Jmeter | K6 | Gatling |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| **Created by**     | Apache foundation     | Shoreditch Ops LTD     | Jonathan Heyman     | Apache foundation     | Load Impact     | Gatling Corp     |
|  **Written in**    | C    | NodeJS     | Python     | Java     | Go     | Scala     |
|  **Scriptable ("Test as code")**    | No    | Yes: JS     | Yes: Python     | Limited (XML)     | Yes: Javascript     | Yes: Scala     |
|  **Multithreaded**    | No     | No     | No     | Yes     | Yes     | Yes     |
|  **Distributed load generation**    | No     | No (premium version - Yes)     | Yes     | Yes     |  No (premium version - Yes)     | No (premium version - Yes)     |
|  **In-built Protocols Support**    | HTTP     | HTTP, Socket.io, WebSocket     | HTTP     | HTTP, FTP, JDBC, SOAP, LDAP, TCP, JMS, SMTP, POP3, IMAP     | HTTP 1.1, HTTP 2, WebSockets     | HTTP, WebSockets, JMS     |
|  **Test Results Analyzing**    | Yes    | Yes     | Yes     | Yes     | Yes     | Yes     |
|  **Website**    | [link](http://httpd.apache.org/)     | [link](https://www.artillery.io)     | [link](https://locust.io)     | [link](https://jmeter.apache.org)     | [link](https://k6.io)     | [link](https://gatling.io)     |
|  **Source code**    | [link](https://svn.apache.org/viewvc/httpd/httpd/branches/2.4.x/support/)     | [link](https://github.com/artilleryio/artillery)     | [link](https://github.com/locustio/locust)     | [link](https://github.com/apache/jmeter)     | [link](https://github.com/grafana/k6)     | [link](https://github.com/gatling/gatling)     |

Tiếp sau đây, chúng ta sẽ đến với những đánh giá chi tiết hơn về từng công cụ trên sau quá trình sử dụng, thử nghiệm chúng của mình nhé.

# Apachebench
- Apachebench xuất hiện từ khá sớm. Hiện nay, Apachebench là 1 phần của Apache httpd, vẫn dang được phát triển, nhưng không còn được tích cực nữa và không có quá nhiều sự thay đổi. 
- Do có sẵn khi cài đặt bộ công cụ Apache httpd nên nó vẫn có thể được nhiều người sử dụng để quick-and-dirty performance tests (test nhanh). 
- Apachebench không hỗ trợ HTTP/2 và không có khả năng viết script test.

**=> Bởi vậy, Apachebench sẽ là một lựa chọn tốt và dễ dàng cho việc chỉ cần xử lý một URL đơn giản.**
# Artillery
- Artillery có phiên bản free không được chú trọng và tích cực phát triển so với phiên bản premium.
- Phiên bản free cũng không hỗ trợ tải phân tán
- Chỉ chạy trên một luồng và sử dụng một lõi CPU duy nhất.
- Hiệu suất ở phiên bản free rất chậm, rất ngốn tài nguyên. Mức sử dụng CPU quá cao sẽ dẫn đến các sai số đo lường khá lớn.
- Có giao diện dòng lệnh dễ sử dụng, có định dạng cấu hình dựa trên YAML đơn giản và ngắn gọn nên dễ dàng tích hợp với CI/CD.
- Có thể sử dụng các thư viện NodeJS thông thường và cung cấp một lượng lớn chức năng.

**=> Từ những nhược điểm của phiên bản free, đặc biệt là về hiệu suất thì có lẽ chúng ta chỉ nên lựa chọn Artillery khi bắt buộc phải sử dụng thư viện NodeJS để thực hiện một số chức năng đặc thù.**

# Locust
- Locust gần như là lựa chọn duy nhất hiện nay khi bạn muốn viết script với Python, tuy nhiên script API được đánh giá là khá tốt.
- Có giao diện web UI điều khiển và chạy kịch bản test đẹp mắt.
- Tích hợp tạo tải phân tán dễ sử dụng.
- Locust cũng là một luồng, vì vậy nếu không chạy nhiều process Locust, Locust chỉ có thể sử dụng một lõi CPU và sẽ không thể tạo ra nhiều lưu lượng truy cập nếu không chạy nó ở chế độ tạo tải phân tán.
- Được viết bằng Python nên chậm, ảnh hưởng đến khả năng tạo lưu lượng truy cập và cung cấp các phép đo đáng tin cậy.
- Hiệu suất tổng thể được đánh giá là thấp đối với các thử nghiệm quy mô lớn.

**=> Tuy là một luồng và cũng tốn nhiều tài nguyên, nhưng Locust lại được tích hợp sẵn với khả năng tạo tải phân tán nên nó sẽ đem lại sai số đo lường tốt hơn nhiều so với Artillery. Thế nhưng, mình nghĩ lý do hàng đầu cho việc bạn lựa chọn Locust có lẽ đến từ việc nó được viết bằng Python, vì thế hay lựa chọn Locust nếu bạn chỉ yêu Python nhé :)))**
# Apache JMeter
- Nó là một ứng dụng Java lớn, phổ biến hơn cả, lâu đời và vẫn đang được tích cực phát triển. 
- Có rất nhiều chức năng, hỗ trợ nhiều giao thức (gần như là nhiều nhất). 
- Có rất nhiều tích hợp, tiện ích bổ sung, v.v. cho Jmeter và toàn bộ các dịch vụ SaaS được xây dựng trên nó (như Blazemeter,... )  
- Nó là một công cụ cho những người tester chuyên nghiệp. 
- Các bài kiểm tra yêu cầu nhiều thao tác thủ công và kiến thức về load testting rất cụ thể. 
- Ngay từ đầu Jmeter đã không được xây dựng để thử nghiệm tự động và sử dụng cho developer. 
- Nó không phải là lựa chọn tốt cho kiểm thử tự động vì việc sử dụng dòng lệnh của nó rất khó sử dụng, các tùy chọn đầu ra kết quả mặc định bị hạn chế, nó sử dụng nhiều tài nguyên và nó không thực sự có khả năng viết kịch bản test, chỉ hỗ trợ một số việc chèn logic bên trong cấu hình XML. 
- Dùng GUI là chủ yếu.

**Jmeter sẽ là lựa chọn của bạn nếu:**
- **Chạy các bài kiểm tra tải tích hợp quy mô lớn, phức tạp, mất nhiều thời gian để lập kế hoạch, thời gian thực hiện lâu hơn và thời gian phân tích kết quả lâu hơn.**
- **Có nhu cấu kiểm tra nhiều giao thức hoặc kiểm tra giao thức mà chỉ chó jmeter support.**
- **Bạn tập trung vào Java và muốn sử dụng một công cụ kiểm tra tải dựa trên Java.**
- **Muốn sử dụng một công cụ GUI có thể làm mọi thứ.**

# Gatling
- Gatling được viết bằng [Scala](https://www.scala-lang.org/), nghe hơi không được phổ biến lắm nhỉ :D Tuy nhiên, theo mình tìm hiểu thì Scala chạy trên nền máy ảo Java và nó tương thích hoàn toàn với Java, có thể sử dụng các thư viện của Java. Bởi vậy nếu bạn yêu Java thì cũng đừng ngần ngại với Scala.
- Là một dự án được duy trì và phát triển khá tích cực.
- Các script test được viết dựa trên Scala hoạt động khá tốt. Hiệu suất của nó đem lại không lớn, nhưng phù hợp với hầu hết mọi yêu cầu.
- Một điểm hay nữa ở Gatling là nó hỗ trợ tuỳ chọn đầu ra với Graphite/InfluxDB và hiển thị trực quan trên Grafana.

**=> Không có quá nhiều điều để nói về Gatling, nó là một ứng dụng Java, hoạt động khá tốt và bớt "đồ sộ" hơn so với Jmeter. Nếu bạn thích các ứng dụng Java, bạn lại đang sử dụng Jmeter, vậy thì đừng ngại thử qua Gatling một chút, có lẽ bạn sẽ thích nó, nhất là ở khả năng tạo các kịch bản test với Scala (như mình đã nói ở trên thì Jmeter không thực sự có khả năng viết kịch bản test)."**
# K6
- Khá mới, được phát hành vào năm 2017
- Đang được tích cực phát triển.
- Giao diện dòng lệnh k6 đơn giản, trực quan và nhất quán.
- Không có web UI, không chạy trong NodeJS
- Hỗ trợ tất cả các giao thức cơ bản (HTTP 1/2 / Websocket)
- Hiểu suất ổn.
- Có nhiều tùy chọn đầu ra (text, JSON, InfluxDB, StatsD, Datadog, Kafka), InfluxDB có thể kết hợp với grafana để hiển thị kết quả trực quan.
- Dễ dàng viết kịch bản test với Javascript thuần.
- Thư viện NodeJS không thể được sử dụng trong các tập lệnh k6. Nếu bắt buộc phải sử dụng thư viện NodeJS, Artillery có thể là lựa chọn thay thế.

**=> Trong mọi hạng mục, k6 đều ở mức trung bình trở lên. Trong một số tiêu chí (docs, script API, UX dòng lệnh), nó rất nổi bật.**
- **Có những công cụ nhanh hơn, nhưng không có công cụ nào nhanh hơn cũng hỗ trợ script phức tạp.**
- **Có những công cụ hỗ trợ nhiều giao thức hơn, nhưng k6 hỗ trợ những giao thức quan trọng nhất.**
- **Có nhiều công cụ với nhiều tùy chọn đầu ra hơn, nhưng k6 có nhiều hơn hầu hết.**

**Và bởi những lí do trên thì K6 là một công cụ trẻ tuổi nhất trong số các công cụ ở đây nhưng hiện tại lại làm mình vừa ý nhất. Chỉ có một điểm duy nhất hơi buồn là K6 phiên bản open source lại chưa có hỗ trỡ kiểm tra tải phân tán mà thôi ^^.**

# Lời kết
Trên đây là những tìm hiểu và đánh giá của mình về một số công cụ kiểm tra chịu tải mã nguồn mở tốt và được sử dụng rộng rãi hiện nay mà mình biết. Hi vọng nó sẽ giúp các bạn có thêm một số gợi ý để lựa chọn được công cụ phù hợp nhất với nhu cầu sử dụng của mình. Cảm ơn các bạn đã theo dõi bài viết của mình!