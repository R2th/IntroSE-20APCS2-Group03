# Giới thiệu 
Hiện nay chúng ta đã nghe nhiều về chính phủ điện tử, với việc các dữ liệu của các địa phương cũng như các dịch vụ của các địa phương sử dụng phải được tập trung và quản lý một cách thống nhất. 
Một trong những công nghệ cốt lõi được áp dụng để tập trung các services và dữ liệu của các bộ và các địa phương khác nhau để quản lý và sử dụng như một thể thống nhất chính là ESB. 
# Khái niệm
ESB là một công cụ phần mềm trung gian (middleware) phức tạp giúp tích hợp các thành phần, dịch vụ riêng rẽ thành một hệ thống và phân phối công việc giữa các thành phần, dịch vụ đó. 
ESB còn có thể đảm nhận nhiều vai trò khác nhau như chuyển đổi giao thức, định tuyến, chuyển đổi thông điệp, logging…
# Mô hình hoạt động
![](https://images.viblo.asia/362b96fe-6013-43b2-a95a-6340dc892e26.jpg)
Cách hoạt động cơ bản của việc dùng ESB để tích hợp các ứng dụng là chúng ta sẽ đặt một trục tích hợp ở giữa các ứng dụng và cho phép các ứng dụng này có thể liên kết và giao tiếp với trục tích hợp đó. 
Điều này sẽ giúp cho các thành phần con của hệ thống không bị ràng buộc với nhau và cho phép các thành phần này liên lạc với nhau thông qua trục tích hợp thay vì nối trực tiếp theo kiểu điểm-điểm (point-to-point).

# Cấu tạo
ESB là một công cụ phức tạp, hơn nữa do không có một tiêu chuẩn bắt buộc nào cho ESB cho nên trong thực tế có nhiều ESB được phát triển dựa trên nhiều kiến trúc khác nhau, gồm những thành phần khác nhau và cung cấp những giải pháp khác nhau. Tuy nhiên, hầu hết chúng đều có cấu tạo gồm các mô-đun chính như sau:  
![](https://images.viblo.asia/64e19773-153d-4b5f-9b21-c5d40d6a11c1.png)
###  Mô-đun vận hành và quản lý (Operations and Management)
Mô-đun này bao gồm những chức năng hỗ trợ việc vận hành và quản lý trục tích hợp. Những chức năng chính của mô-đun này là:
- Thống kê và trạng trái (Statistic & status): Thành phần này cung cấp những thống kê về về những dịch vụ được tích hợp của ESB như số lượng lỗi, độ trễ khi xử lý thông điệp, số lượng lỗi…
- Cảnh báo (Alert): Cung cấp cơ chế gửi cảnh báo thông qua các kênh khác nhau để thuận tiện cho việc giám sát hoạt động của trục tích hợp.
- Cân bằng tải (Load balancing): Một endpoint (điểm cuối) có thể có trên nhiều hệ thống vật lý khác nhau, thành phần cân bằng tải này có thể giúp cho việc gọi tới endpoint này được san đều ra giữa các endpoint vật lý. Thành phần cân bằng tải này thường được triển khai theo thuật toán Round Robin có trọng số.
- Giới hạn thông điệp (Message Throttling): Việc giới hạn số lượng thông điệp gửi tới server trong một khoảng thời gian là một điều cần làm để việc hệ thống bị quá tải. 
- Quản lý cấu hình: Cho phép điều chỉnh cấu hình của ESB một cách an toàn trên hệ điều hành, ngoài ra nó còn có thể lưu lại lịch sử chỉnh sửa để có thể khôi phục ESB về trạng thái trước đó đề phòng trường hợp cấu hình không phù hợp gây ra lỗi hệ thống.
### Mô-đun phân giải (Mediation)
Chúng ta có thể coi đây là mô-đun cốt lõi của ESB, mô-đun này bao gồm những chức năng cần thiết để thiết lập luồng thông điệp của ESB sao cho phù hợp với bài toán nghiệp vụ của doanh nghiệp.
- Định tuyến thông điệp (Message Routing): Định tuyến thông điệp tới đúng dịch vụ mà chúng cần tới dựa vào tiêu đề (header), nội dung và giao thức của thông điệp.
- Chuyển đổi thông điệp (Message tranformation): Cho phép chuyển đổi định dạng thông điệp từ dạng này sang dạng khác, ví dụ như từ kiểu XML sang JSON, từ dạng text sang nhị phân và ngược lại. 
- Chuyển dịch giao thức (Protocol Translation): Khả năng chuyển đổi từ một giao thức truyền thông này này sang một giao thức truyền thông khác, ví dụ như từ FTP sang HTTP.
- Xác nhận thông điệp (Message Validation): Có khả năng đảm bảo thông điệp là hợp lệ, ví dụ như trong trường hợp định dạng là JSON, chúng ta cần đảm bảo rằng nội dung của thông điệp đúng với cú pháp của định dạng này. 
- Giao dịch (Transaction): Tương tự như khái niệm về Transaction của hệ quản trị cơ sở dữ liệu quan hệ, ESB cung cấp cho chúng ta sự toàn vẹn trong việc xử lý thông điệp. Nếu như trong luồng xử lý thông điệp, một tiến trình xử lý bị lỗi thì toàn bộ quá trình sẽ được huỷ bỏ và khôi phục về như ban đầu.
### Mô-đun bảo mật (Security)
Mô-đun này hỗ trợ bảo mật ở cả tầng thông điệp và tầng vận chuyển với các thành phần:
- Xác thực (Authentication): Xác thực người dùng khi truy cập tới dịch vụ được tích hợp vào ESB.
- Uỷ quyền (Authorization): Cung cấp chức năng uỷ quyền thiết lập ESB cho người quản trị hoặc phân theo vai trò của người quản trị. 
- Mã hoá và giải mã (Encryption): Cung cấp chức năng mã hoá và giải mã thông điệp.
### Mô-đun điều hợp, vận chuyển (Adapters/Transport)
Mô-đun này bao gồm các bộ điều hợp (adapters) giúp kết nối tới các dịch vụ được ESB cung cấp thông qua mô-đun Services Hosting. 
Tất cả yêu cầu đi vào và đi ra đều phải thông qua adapter. Adapter cho phép ESB tương tác với nhiều cơ chế đầu ra. Thường thì ESB sẽ cung cấp sẵn các bộ điều hợp để thuận tiện cho việc kết nối các dịch vụ, các adapter này có thể được sử dụng để dành cho việc giao tiếp với các ứng dụng phổ biến như là Enterprise Resource Planning (ERP), Supply Chain Management (SCM) và Customer Relationship Management (CRM) [2], ngoài ra người sử dụng hoặc bên thứ ba có thể tự phát triển những bộ điều hợp để phù hợp với nghiệp vụ của tổ chức.
# Một vài ESB phổ biến hiện nay

## Mule ESB
Là một Java-based ESB được phát triển bởi Mulesoft. So với các ESBs khác thì Mule rất nhẹ nhưng nó đem lại khả năng mở rộng cao, cho phép người dùng có thể bắt đầu với những tích hợp nhỏ và tăng dần số lượng lên theo thời gian một cách dễ dàng. 
Các công nghệ chính được sử dụng trong Mule ESB: 
- AMQP (Advanced Message Queuing Protocol): Giao thức hàng đợi thông điệp được Mulesoft tuỳ biến từ RabbitMQ Java Client.
- Routers: Mule ESB sử dụng các bộ định tuyến để chỉnh sửa, sắp xếp, đánh giá và chuyển phát thông điệp.
- Anypoint Connectors: Các bộ kết nối có sẵn của Mule giúp kết nối tới các giao thức, databases, các public API của bên thứ ba phổ biến như Salesforces, Google...Ta có thể tự tạo các connectors nếu cần thiết.
- Mule Runtime Engine: là thành phần chính của Mule ESB, nó giúp tích hợp các ứng dụng, hệ thống và các APIs
- Mule Runtime Manager: Cho phép quản lý việc triển khai, theo dõi ESB.
 	 
## Oracle ESB
Là một ESB được phát triển bởi Oracle, là phiên bản dựa trên sản phẩm trước đó của hãng này là Retail Integration Bus Essentials. Oracle ESB được tối ưu để tích hợp các dịch vụ được cung cấp bởi Oracle, ngoài ra nó cũng vẫn có thể tích hợp được các ứng dụng của bên thứ ba khác.
Các công nghệ chính được sử dụng trong Oracle ESB:
- Oracle Message Broker: là một hệ thống quản lý thông điệp viết bằng Java giúp dễ dàng làm việc với các hệ thống hàng đợi thông điệp như AQ, IBM MQSeries và TIBCo Redezvous.
- Routing Service: các dịch vụ định tuyến kiểu SOA cho phép các quy tắc định tuyến được định nghĩa và publish với một ngôn ngữ đặc tả dịch vụ web – WSDL (Web Sevice Description Language).
- Integration Adapter: các bộ điều hợp có sẵn giúp giao tiếp với các databases, hàng đợi thông điệp và các giao thức khác nhau.
- ESB server: máy chủ để chạy ESB, nó có thể lắng nghe các thay đổi của ESB để cập nhật theo thời gian thực.
- ESB control: cho phép thay đổi và quản lý ESB, nó sẽ tương tác với ESB server để các thay đổi này có hiệu lực ngay trong thời gian thực.

## Red Hat Jboss Fuse
Về Red Hat Jboss Fuse (nay là Red Hat Fuse) thì nó không hẳn là một ESB mà là một nền tảng tích hợp dựa trên ESB mã nguồn mở Apache ServiceMix. Fuse cho phép việc tích hợp phân tán dựa trên quy trình Agile và cung cấp khả năng triển khai rất mạnh mẽ trên cloud hoặc on-premise dựa trên công nghệ Containers.