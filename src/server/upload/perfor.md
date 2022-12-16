I. TỔNG QUAN VỀ PERFORMANCE TESTING

1. Performane Testing là gì?
Performance Testing là một loại kiểm thử nhằm xác định mức độ đáp ứng, băng thông, độ tin cậy và/hoặc khả năng mở rộng của hệ thống dưới một khối lượng làm việc/truy cập nhất định. Performance Testing thường được sử dụng để:
* •	Đánh giá mức độ sẵn sàng của sản phẩm
* •	Đánh giá dựa vào các tiêu chí hiệu suất
* •	So sánh giữa các đặc tính hiệu suất của đa hệ thống hoặc cấu hình hệ thống
* •	Tìm ra nguồn gốc của các vấn đề về hiệu suất
* •	Hỗ trợ điều chỉnh hệ thống
* •	Tìm các mức độ băng thông
Performance Testing thường được dùng để giúp xác định tắc nghẽn trong một hệ thống, thiết lập một đường cơ sở để kiểm thử trong tương lai, hỗ trợ điều chỉnh hiệu suất hiệu quả, xác định sự phù hợp mục tiêu và yêu cầu hiệu suất, và thu thập dữ liệu hoạt động liên quan khác để giúp các bên liên quan đưa ra quyết định liên quan đến chất lượng chung của các ứng dụng đang được kiểm thử. Ngoài ra, các kết quả từ việc kiểm thử hiệu suất và phân tích có thể giúp bạn ước tính cấu hình phần cứng cần thiết để hỗ trợ các ứng dụng khi bạn đưa sản phẩm đi vào sử dụng rộng rãi.
2. Tại sao lại cần phải thực hiện Performance Testing
Ở cấp độ cao nhất, kiểm thử hiệu năng gần như luôn được tiến hành để giải quyết một hoặc nhiều rủi ro liên quan tới chi phí, cơ hội hoặc danh tiếng của một công ty. Một số lý do cụ thể hơn cho tiến hành kiểm thử hiệu suất bao gồm:
Đánh giá sự sẵn sàng phát hành bởi:
* •	Cho phép bạn dự đoán hoặc ước tính các đặc tính hiệu suất của một ứng dụng trong sản xuất và đánh giá có hay không thực hiện kiểm tra hiệu suất dựa trên những dự đoán đó. Những dự đoán này cũng có giá trị để các bên liên quan đưa ra quyết định về việc liệu một ứng dụng đã sẵn sàng để phát hành hoặc khả năng xử lý tăng trưởng trong tương lai, hoặc nó cần phải cải thiện hiệu suất/phần cứng trước khi phát hành.
* •	Cung cấp dữ liệu cho thấy khả năng của người dùng không hài lòng với hiệu suất của hệ thống.
* •	Cung cấp dữ liệu để hỗ trợ trong việc dự đoán các tổn thất doanh thu hay uy tín thương hiệu do khả năng mở rộng, khả năng ổn định hoặc do người dùng không hài lòng với thời gian phản hồi của ứng dụng.
* Đánh giá cơ sở hạ tầng:
* •	Đanh giá sự phù hợp của hiệu suất hiện tại
* •	Xác định khả năng ổn định
* •	Xác định năng lực của cơ sở hạ tầng của ứng dụng, cũng như xác định các nguồn lực cần thiết trong tương lai để cung cấp hiệu suất chấp nhận được.
* •	So sánh cấu hình của các hệ thống khác nhau để xác định hoạt động tốt nhất cho ứng dụng và doanh nghiệp
* •	Thẩm định việc áp dụng các đặc tính hiệu suất mong muốn trong ràng buộc sử dụng ngân sách nguồn lực.
* Đánh giá đầy đủ về hiệu suất phần mềm bởi:
* •	Xác định đặc tính hiệu suất mong muốn của phần mềm trước và sau khi thay đổi.
* •	Cung cấp các so sánh giữa các đặc tính hiệu suất hiện tại và ứng dụng mong muốn.
* Nâng cao hiệu quả hoạt động bởi:
* •	Phân tích hành vi của ứng dụng tại các mức tải khác nhau.
* •	Xác định các vướng mắt trong việc áp dụng.
* •	Cung cấp các thông tin liên quan đến tốc độ, khả năng mở rộng và sự ổn định của sản phẩm trước khi phát hành, do đó cho phép bạn đưa ra quyết định về việc khi nào sẽ điều chỉnh hệ thống.
* 2. TẠI SAO PHẢI ỨNG DỤNG PT
* 
* Để đảm bảo PM có chất lượng thì người kiểm tra viên (KTV) phải có những cách kiểm tra giả lập gần giống môi trường thực tế nhất. Trong thực tế có rất nhiều PM theo mô hình client-server đáp ứng nhiều người dùng cùng một lúc. Một số yêu cầu thực tế rất hay đặt ra là:
* 
* • Xác định thời gian đáp ứng khi có nhiều người dùng như: số yêu cầu trên giây, số giao dịch thành công trên giây, số thông điệp chuyển giao trên giây, số gói tin trên giây, ...
* 
* • Xác định biểu đồ tài nguyên chiếm giữ của PM khi có nhiều người dùng trong thời gian dài như: CPU, bộ nhớ, I/O của đĩa cứng, I/O của mạng.
* 
* • Xác định khả năng phân tải, khả năng phục hồi dữ liệu khi có sự cố vì quá nhiều người dùng, ...
* 
* • Đề ra cấu hình phần cứng tối thiểu để PM có thể hoạt động.
* 
* • Kiểm tra việc thực hiện giao dịch có bị sai lệch khi có nhiều người cùng làm giống thao tác.

Với những bài toán trên việc dùng công cụ PT là không thể tránh khỏi. Đây đồng thời cũng là đặc điểm để KTV xác định xem những trường hợp nào thì phải áp dụng KTTĐ, và tiêu biểu là dùng công cụ để thực hiện PT.

PT giúp chúng ta đoán trước được những lỗi có thể xảy ra khi triển khai PM vào thực tế trong môi trường có nhiều người dùng. Bên cạnh đó còn giúp tìm ra hiệu năng thực thi tối đa của PM và tìm ra nơi cần cải tiến cho PM. PT mang các đặc tính ưu việt của KTTĐ như giảm thời gian kiểm tra hồi qui, thực hiện đo lường các thông số chính xác, giúp giảm thiểu chi phí cho dự án...
II. MỘT SỐ CÔNG CỤ KIỂM THỬ PERFORMANCE
1. TOOL AUTOMATION TESTING - JMETER
1.1 Giới thiệu về Jmeter Jmeter là công cụ để đo độ tải và performance của đối tượng, có thể sử dụng để test performance trên cả nguồn tĩnh và nguồn động, có thể kiểm tra độ tải và hiệu năng trên nhiều loại server khác nhau như: Web – HTTP, HTTPS, SOAP, Database via JDBC, LDAP, JMS, Mail – SMTP(S), POP3(S) và IMAP(S)…
Jmeter là một phần mềm mã nguồn mở được viết bằng java. Cha đẻ của JMeter là Stefano Mazzocchi. Sau đó Apache đã thiết kế lại để cải tiến hơn giao diện đồ họa cho người dùng và khả năng kiểm thử hướng chức năng.
1.2 Đặc trưng
* •	Jmeter có 1 số đặc trưng như sau:
* •	Nguồn mở, miễn phí
* •	Giao diện đơn giản, trực quan dễ sử dụng
* •	Có thể kiểm thử nhiều kiểu server: Web - HTTP, HTTPS, SOAP, Database - JDBC, LDAP, JMS, Mail - POP3, …
* •	Một công cụ độc lập có thể chạy trên nhiều nền tảng hệ điều hành khác nhau, trên Linux chỉ cần chạy bằng một shell script, trên Windows thì chỉ cần chạy một file .bat
* •	Đa luồng, giúp xử lý tạo nhiều request cùng một khoảng thời gian, xử lý các dữ liệu thu được một cách hiệu quả.
* •	Jmeter Performance Testing gồm 2 phần:
o	Load Testing: Mô hình hóa dự kiến sử dụng bởi nhiều người dùng truy cập một dịch vụ website trong cùng thời điểm.
o	Stress Testing: Tất cả các web server có thể tải một dung lượng lớn, khi mà tải trọng vượt ra ngoài giới hạn thì web server bắt đầu phản hồi chậm và gây ra lỗi. Mục đích của stress testing là có thể tìm ra độ tải lớn mà web server có thể xử lý.
1.3 Cách hoạt động Cách Jmeter làm việc như sau: sẽ đc giới thiệu ở một tài liệu khác
2. TOOL AUTOMATION TESTING - LOADCOMPLETE
2.1 Giới thiệu LoadComplete là một công cụ kiểm tra lượng tải, cho phép tạo và chạy tự động cho web servers và services. Giúp người dùng kiểm tra được hiệu năng của web server dưới một lượng tải lớn. 
2.2 Các Tính Năng:
* •	Load testing: Kiểm tra hành vi của web server dưới tải trọng lớn
* •	Stress testing: Kiểm tra hành vi của web server dưới một lượng tải cực kỳ lớn
* •	Scalability testing: Xác định năng suất của web server bằng cách tăng thêm phần cứng hoặc phần mềm
2.3. Hỗ trợ
* •	Web Servers and Platforms: LoadComplete hỗ trợ tất cả các loại web server (IIS, Apache) và nền tảng (Windows, Linux/UNIX)
* •	We Client Applications: LoadComplete hỗ trợ tất cả các trình duyệt web phổ biến (Internet Explorer, Edge, Firefox, Chrome or custom web application)
* •	Hỗ trợ Rich Internet Applications: LoadComplete có thể ghi và chạy lại các thử nghiệm cho bất kỳ loại nào của Rich Internet Applications, bao gồm Adobe Flash and Flex, Microsoft Silverlight and Ajax.
* •	Hỗ trợ JSP/Servlet Applications: LoadComplete có thể ghi và chạy lại luồng dữ liệu cho ứng dụng JSP/Servlet
* •	Hỗ trợ HTML5 Applications: LoadComplete có thể ghi lại và chạy lại luồng dữ liệu cho web app mà được phát triển bởi HTML5 và APIs, bao gồm giao thức WebSocket.
2.4. Ưu điểm
* •	Cài đặt dễ dàng
* •	Dễ sử dụng bằng cách ghi lại hành động của người dùng
* •	Có thể thiết lập các quy tắc để kiểm tra tùy thuộc vào hành vi của máy chủ
* •	Có thể xem được quá trình chạy kiểm tra
* •	Report dễ đọc
2.5. Nhược điểm
•	Là một ứng dụng tính phí
3. TOOL AUTOMATION TESTING - GRINDER
3.1 Giới thiệu
The Grinder là một tool kiểm thử hiệu năng dựa trên nền tảng JavaTM. Và quan trọng nó hoàn toàn miễn phí. Grinder bao gồm:
•	The Grinder Console: Ứng dụng GUI dùng để điều khiển các Agents và hiển thị kết quả. Grinder Console cũng dùng được sử dụng như một IDE chỉnh sửa và phát triển Test suites. Để khởi động màn hình Console dùng lệnh “java net.grinder.Console”  
•	Grinder Agents: Để khởi động Agent dùng lệnh “java net.grinder.Grinder”  
3.2 Key Future
* •	Generic Approach: Kiểm tra tất cả các ứng dụng mà có Java API, bao gồm HTTP web servers, SOAP và REST web services, và application servers (CORBA, RMI, JMS, EJBs)
* •	Flexible Scripting : Script được viết bằng ngôn ngữ Python và Clojure
* •	Distributed Framework : Có hỗ trợ UI cho phép giám sát và kiểm soát các nhiều injectors và cung cấp việc chỉnh sửa Script và phân phối.
* •	TCP proxy để lưu lại các hành vi tương tác trên browser vào Grinder test script
•	Hỗ trợ nhiều giao thức khác nhau
3.3 Ưu điểm:
* •	Miễn phí
* •	Có thể tùy chỉnh script một cách dễ dàng
* •	Script dùng ngôn ngữ Python
* •	Cung cấp chức năng record action
* •	Có thể sử dung Browser Proxy
* •	Linh hoạt, có thể dễ dàng start up trên một hệ thống khác
3.4 Nhược điểm:
•	Không có nhiều sự lựa chọn hiển thị kết quả Report
•	GUI không thân thiện với người dùng
3. GiIỚI THIỆU CÔNG CỤ LOADRUNNER

Mercury LoadRunner là công cụ KTTĐ thực hiện việc kiểm tra hiệu năng của PM. Nó cho phép chúng ta tìm ra những lỗi về khả năng thực thi bằng việc phát hiện nguyên nhân, chỗ làm cho PM chạy chậm hoặc không đúng yêu cầu. Đây là công cụ mạnh với giải pháp kiểm tra tải, phát hiện và đưa ra giải pháp cải tiến.

Ứng dụng LoadRunner sẽ giúp giảm thời gian viết test script đến 80%, đó là nhờ nó cung cấp chức năng tự động phát sinh script mô tả lại các tình huống muốn kiểm tra.

3.1 Đặc điểm

Theo một số quan niệm thì một công cụ PT phải có khả năng thực hiện kiểm tra chức năng. Điều này mang nghĩa tương đối vì thực tế công cụ PT không thể thay thế công cụ kiểm tra chức năng và ngược lại. Ví dụ: trong môi trường web, công cụ kiểm tra chức năng kiểm tra hoạt động của phần mềm ở cả phía client và server. Còn công cụ PT chỉ kiểm tra ở phía server mà thôi.

LoadRunner có khả năng tạo ra hàng ngàn người dùng ảo thực hiện các giao dịch cùng một lúc. Sau đó LoadRunner giám sát các thông số xử lý của PM được kiểm tra. Kết quả thống kê sẽ được lưu lại và cho phép KTV thực hiện phân tích.