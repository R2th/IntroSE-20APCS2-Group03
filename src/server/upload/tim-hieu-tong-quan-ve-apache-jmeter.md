**1. Ứng dụng Apache Jmeter là gì ?**

Ứng dụng **Apache JMeter** là phần mềm mã nguồn mở, một ứng dụng Java thuần túy 100% được thiết kế để kiểm tra hành vi chức năng và kiểm tra hiệu năng(đo lường hiệu suất). Ban đầu nó được thiết kế để kiểm tra ứng dụng web nhưng sau đó đã mở rộng sang các chức năng kiểm tra khác.
        
**2. Apache Jmeter có các tính năng như nào ?**

**Apache JMeter** có thể được sử dụng để kiểm tra hiệu suất trên cả tài nguyên tĩnh và động, các ứng dụng động Web.
Nó có thể được sử dụng để mô phỏng hiệu năng trên một máy chủ, nhóm máy chủ, mạng hoặc đối tượng để kiểm tra sức mạnh của nó hoặc để phân tích hiệu suất tổng thể dưới các loại tải khác nhau.

Các tính năng của Apache JMeter bao gồm:
- Có khả năng chịu tải và kiểm tra hiệu suất nhiều ứng dụng(application)/server/protocol types:
    + Web - HTTP, HTTPS (Java, NodeJS, PHP, ASP.NET, …)
    + SOAP / REST Webservices
    + FTP
    + Database via JDBC
    + LDAP
    + Message-oriented middleware (MOM) via JMS
    + Mail - SMTP(S), POP3(S) and IMAP(S)
    + Native commands or shell scripts
    + TCP
    +Java Objects
- Test IDE có đẩy đủ tính năng cho phép lên Test Plan nhanh hơn: **recording (from Browsers or native applications), building and debugging**.
- **CLI mode (Command-line mode (previously called Non GUI) / headless mode)** có thể chịu tải(Load test) từ bất kỳ hệ điều hành Java khác nhau (Linux, Windows, Mac OSX, …)
- **Dynamic HTML report** : JMeter hỗ trợ tạo báo cáo bảng điều khiển để lấy biểu đồ và thống kê từ Test Plan
- Tương quan dễ dàng thông qua khả năng trích xuất dữ liệu từ hầu hết các response formats, HTML, JSON, XML or bất kỳ định dạng văn bản nào
- 100% Java thuần túy
-   Multi-threading framework cho phép lấy mẫu theo nhiều luồng(threads) và đồng thời lấy mẫu của các chức năng khác bằng các nhóm luồng riêng biệt.
-  Lưu vào bộ nhớ đệm và phân tích ngoại tuyến/phát lại kết quả test.
-  Highly Extensible core:
    + Bộ lấy mẫu có thể cài đặt cho phép kiểm tra không giới hạn
    + Scriptable Samplers (Các ngôn ngữ tương thích với JSR223 như Groovy và BeanShell)
    + Một số thống kê tải có thể được chọn với bộ hẹn giờ**(pluggable timers)**
    + Phân tích dữ liệu và visualization plugins cho phép khả năng mở  rộng cũng như cá nhân hóa tuyện vời.
    + Các hàm có thể được sử dụng để cung cấp đầu vào động(dynamic) cho test hoặc cung cấp thao tác dữ liệu.
    +  Tích hợp dễ dàng thông qua các thư viện mã nguông mở của bên thứ 3 như Maven, Gradle và Jenkin.
    +  
**3. JMeter có phải là một trình duyệt không ?**

Câu trả lời là **KHÔNG**. JMeter không phải là một trình duyệt, nó làm việc ở cấp độ giao thức(protocol). Về các dịch vụ web(web-services) và dịch vụ từ xa, JMeter trông giống như một trình duyệt (hay đúng hơn là nhiều trình duyệt). Tuy nhiên, JMeter không thực hiện tất cả các hành động được hỗ trợ bởi các trình duyệt. Đặc biệt, JMeter không thực thi Javascript được tìm thấy trong các trang HTML. Nó cũng không hiển thị các trang HTML như một trình duyệt ( có thể xem phản hồi dưới dạng HTML,v..v.., nhưng thời gian không được bao gồm trong bất kỳ mẫu nào và chỉ một mẫu trong một chuỗi được hiển thị tại một thời điểm).

**4. Thiết lập và cài đặt Jmeter**

Để bắt đầu với JMeter, điều đầu tiên chúng ta cần làm là thiết lập và cài đặt JMeter. Tôi sẽ giúp bạn làm thế nào để làm điều đó. Ứng dụng **Apache JMeter** là phần mềm mã nguồn mở, một ứng dụng Java thuần túy 100%. Vì vậy, bạn có thể chạy JMeter từ bất kỳ hệ điều hành tương thích với Java nào, miễn là Java đã được cài đặt trên hệ điều hành đó (Linux, Windows, MacOS,…)

**4.1. Thiết lập**

Kiểm tra Java đã được cài đặt trên máy tính chưa
- Mở Terminal trên MacOS hoặc cmd trên windows, gõ lệnh: java -version
- Nếu thấy thông tin dưới đây:
    java version "1.8.0_121"
    Java(TM) SE Runtime Environment (build 1.8.0_121-b13)
    Java HotSpot(TM) 64-Bit Server VM (build 25.121-b13, mixed mode)
 -> Bỏ qua và chuyển sang bước 2 Download và cài đặt JMeter ngay bây giờ
 - Ngược lại, bạn thấy điều này trên windows: 'java' is not recognized as an internal or external command, operable program or batch file
 - hoặc tương tự trên MacOS: -bash: java: command not found
-> Vui lòng tiếp tục đọc dưới bước này:
Truy cập trang web (https://jmeter.apache.org/download_jmeter.cgi), tải xuống và cài đặt phiên bản Java mới nhất (bây giờ là Java 9, hỗ trợ JMeter 4.0 trở lên).
Đối với người dùng Windows thì bạn cần làm thêm một việc nữa đó là config Môi trường biến cho cài đặt Java, theo dõi bài viết này sẽ giúp bạn cách thực hiện điều này.
Bây giờ quay lại lệnh trên, hãy kiểm tra lại -version java, để đảm bảo rằng nó hiển thị thông tin về phiên bản Java, cho bạn biết bạn đã cài đặt Java đúng cách.

**4.2. Download and Install JMeter**

Bước 1: Truy cập trang này: http://jmeter.apache.org/download_jmeter.cgi
Bước 2: Tải xuống apache-jmeter-x.x.zip trong phần Binaries.
Bước 3: Giải nén tệp đã tải xuống của bạn. Bạn sẽ có thư mục như bên dưới
![](https://images.viblo.asia/3a39fcd0-5152-4eea-a5b0-3046bf05a737.png)

**Windows:**

- Vào thư mục / bin
- Tìm tệp jmeter.bat (nếu bạn không thấy phần mở rộng .bat, bạn có thể quan sát cột Loại của tệp, nó phải là Tệp hàng loạt của Windows)
![](https://images.viblo.asia/3668ffb0-d539-4bc9-914a-782872d24a75.png)
- Nhấn đúp vào tệp này
- Giao diện người dùng JMeter sẽ xuất hiện
![](https://images.viblo.asia/9f1cc7fb-4312-4390-92d5-55c785fca9e0.png)
Xin chúc mừng! Bạn đã sẵn sàng. Bây giờ bạn có thể bắt đầu sử dụng JMeter, hãy thử tạo Kế hoạch kiểm tra web cơ bản với JMeter.

**MacOS/Linux:**

Trên MacOS, nó có một chút khác biệt so với Window. Bạn cần chạy JMeter qua dòng lệnh
- Mở ứng dụng Terminal, sử dụng lệnh cd để chuyển đến thư mục / bin của JMeter: cd /Users/user/Desktop/apache-jmeter-5.3/bin
- Sau đó, nhập: sh ./jmeter.sh
- Giao diện người dùng JMeter sẽ xuất hiện
![](https://images.viblo.asia/72716238-4b06-4f89-9092-dae0dbd93a75.png)
Xin chúc mừng! Bạn đã sẵn sàng. Bây giờ bạn có thể bắt đầu sử dụng JMeter, hãy thử tạo Kế hoạch kiểm tra web cơ bản với JMeter.

Link tham khảo: https://jmeter.apache.org/index.html