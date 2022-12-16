Hiện nay, “Microservices” là một trong những thuật ngữ hay từ khóa phổ biến nhất (buzz-words) trong lĩnh vực kiến trúc phần mềm. Bạn có thể tìm thấy khá nhiều tài liệu giới thiệu và nói về những nguyên tắt cũng như lợi ích của microservices, tuy nhiên khá ít tài liệu hướng dẫn cách áp dụng microservices trong những hoàn cảnh thực tế.

Bài này chúng ta sẽ tìm hiểu về các khái niệm chính về kiến trúc microservices (MSA) và cách mà bạn sử dụng những nguyên lý này trong thực tiễn.

![](https://images.viblo.asia/e78bb4ab-2f85-4a61-af08-f669786e6110.jpg)

### Kiến trúc nguyên khối (Monolithic Architecture)

Ứng dụng phần mềm doanh nghiệp được thiết kế để đáp ứng nhiều yêu cầu kinh doanh của doanh nghiệp. Do đó, các phần mềm cung cấp hàng trăm các tính năng và tất cả những tính năng này đều được gói trong một ứng dụng monolithic. Ví dụ: ERPs, CRMs hay nhiều phần mềm khác chứa hàng trăm tính năng. Việc triển khai, sửa lỗi, mở rộng và nâng cấp những phần mềm khổng lồ này trở thành một cơn ác mộng.

Kiến trúc hướng dịch vụ (Service Oriented Architecture – **SOA**) được thiết kể để giải quyết một phần của vấn đề bằng cách giới thiệu khái niệm “service”. Một dịch vụ (service) là một nhóm tổng hợp các tính năng tương tự trong một ứng dụng. Do đó trong SOA, ứng dụng phần mềm được thiết kế như một tổ hợp của các dịch vụ. Tuy nhiên, với **SOA**, giới hạn hay phạm vi của một dịch vụ khá là rộng và được định nghĩa khá “thô” (coarse-grained). Việc này khiến các services cũng có thể trở nên quá to và phức tạp.

![](https://images.viblo.asia/0c2451c2-423a-4780-bab7-3730f4e4162d.png)
Hình 1: Monolithic Architecture

Trong phần lớn trường hợp, dịch vụ trong SOA là độc lập nhưng chúng lại được triển khai chung. Tương tự như ứng dụng monolithic, những dịch vụ này to và phức tạp lên theo thời gian vì thường xuyên thêm các tính năng. Và thế là những ứng dụng này lại trở thành một mớ các dịch vụ monolithic, cũng không còn khác mấy so với kiến trúc nguyên khối thông thường.

Hình 1 thể hiện một ứng dụng gồm nhiều services. Những services này được triển khai cùng một lúc vào 1 ứng dụng lớn. Dù bên trong có gồm các services thì đây là một ứng dụng monolithic. Một số tính chất của kiến trúc nguyên khối (Monolithic Architecture):
* Được thiết kế, phát triển và triển khai theo một khối duy nhất.
* Ứng dụng monolithic phức tạp và to gây khó khăn cho việc bảo trì, nâng cấp và thêm tính năng mới.
* Khó áp dụng phát triển kiểu Agile.
* Phải triển khai lại toàn bộ hệ thống dù chỉ cập nhật hay nâng cấp một phần.
* Mở rộng: phải mở rộng cả khối ứng dụng, gặp khó khăn nếu có các yêu cầu về tài nguyên khác nhau (ví dụ một service yêu cầu thêm CPU, service khác lại yêu cầu nhiều memory).
* Độ tin cậy: một service không ổn định có thể sập cả hệ thống.
* Khó đổi mới: ứng dụng monolithic phải sử dụng chung công nghệ nên khó thay đổi hay áp dụng công nghệ mới.

Những tính chất giới hạn trên của kiến trúc nguyên khối dẫn tới sự phát triển của kiến trúc dịch vụ nhỏ (Microservices Architecture).

### Kiến trúc dịch vụ nhỏ (Microservices Architecture)

*Mục tiêu nền tảng của kiến trúc microservices là xây dựng một ứng dụng mà ứng dụng này là tổng hợp của nhiều services nhỏ và* ***độc lập có thể chạy riêng biệt, phát triển và triển khai độc lập***.

Một số khái niệm về microservices nói về quá trình chia tách ứng dụng monolithic thành nhóm các services độc lập. Tuy nhiên, theo quan điểm của tôi, microservices không chỉ về chia tách các servcies sẵn có trong monolithic.

Ý tưởng quan trọng chính là nhìn vào các tính năng trong một ứng dụng monolithic, ta có thể nhận biết, xác định các yêu cầu và khả năng cần thiết để đáp ứng một nghiệp vụ. Sau đó từng năng lực nghiệp vụ này sẽ được xây dựng thành những service nhỏ, độc lập. Những services này có thể sử dụng các nền tảng công nghệ khác nhau và phục vụ một mục đích cụ thể và có giới hạn.

Theo đó, ví dụ về hệ thống trong hình 1 có thể được chia theo microservices như trong hình 2. Đây có thể là một ứng dụng phần mềm bán hàng, với kiến trúc microservices, mỗi chức năng kinh doanh hay trong doanh nghiệp được tách thành một microservices. Trong kiến trúc microservices, một service mới được tạo ra từ những services gốc trong kiến trúc monolithic.

![](https://images.viblo.asia/2c26b080-6c71-43f7-9e28-353881589145.png)

Tiếp theo, chúng ta sẽ nói về các nguyên tắc chính của kiến trúc microservices và quan trọng hơn chính là cách chúng được sử dụng trong thực tế.

### Thiết kế Microservices: kích cỡ, phạm vi và tính năng

Bạn có thể xây dựng ứng dụng mới với microservices hoặc chuyển đổi ứng dụng sẵn có sang microservices. Với cách nào thì việc quyết định kích cỡ, phạm vi và tính năng của microservices rất quan trọng. Có thể đây chính là phần khó nhất bạn gặp phải khi phát triển hệ thống microservices trong thực tế.

Dưới đây chúng ta sẽ xem xét một số vấn đề thực tế và những hiểu sai về kích cỡ, phạm vi và chức năng của microservices.

* Số dòng code/ kích cỡ của một đội lập trình là chỉ số không chính xác: có vài cuộc bàn luận về kích thước của một service dựa vào số lượng dòng code hay kích thước của đội phát triển service đó (ví dụ two-pizza team). Tuy nhiên, những cách đo đếm này không thực tiễn và không chính xác, vì ta có thể phát triển services với ít dòng code hoặc với một đội nhỏ nhưng hoàn toàn đảm bảo được các nguyên lý trong kiến trúc microservices.
* “Micro” là một từ khóa dễ gây nhầm lẫn. Một số lập trình viên nghĩ rằng họ nên tạo ra services nhỏ hết mức. Điều này là một cách hiểu sai.
* Trong SOA, services thường trở thành các cục monolithic với nhiều hàm, chức năng khác hỗ trợ. Vì vậy, chỉ phát triển services kiểu SOA rồi dán nhãn microservices hoàn toàn lạc hướng và không mang lại bất kì lợi ích nào của kiến trúc microservices.

Do đó, câu hỏi là chúng ta nên thiết kế services trong kiến trúc microservices như thế nào thì phù hợp và đúng mực?

### Một Số Chỉ Dẫn Khi Thiết Kế Microservices

* Single Responsibility Principle (SRP): một service với phạm vi và chức năng giới hạn, tập trung vào một nhiệm vụ giúp quá trình phát triển và triển khai dịch vụ trở nên nhanh chóng hơn.
* Trong quá trình thiết kế, ta nên xác định và giới hạn các services theo chức năng nghiệp vụ thực tế (theo Domain-Driven-Design).
* Đảm bảo microservices có thể phát triển và triển khai độc lập.
* Mục tiêu của thiết kế là phạm vi của microservices phục vụ một nghiệp vụ chứ không chỉ đơn giản làm các dịch vụ nhỏ hơn. Kích thước hợp lý của một service là kích thước đủ để đáp ứng yêu cầu của một chức năng trong hệ thống.
* Khác với services trong SOA, một microservice không nên có quá nhiều hàm hay chức năng hỗ trợ xung quanh và định dạng thông báo/ gửi tin (messaging) phải đơn giản.
* Một cách tốt là có thể bắt đầu với services to có phạm vi rộng rồi chia nhỏ dần (dựa theo nghiệp vụ thực tế của hệ thống).

Trong ví dụ về hệ thống bán hàng, bạn có thể thấy ứng dụng monolithic được tách thành bốn microservices là “inventory”, “accounting”, “shipping” và “store”. Chúng giải quyết một yêu cầu giới hạn nhất định nhưng tập trung vào chức năng đó. Theo đó, mỗi service tách biệt hoàn toàn khỏi nhau và đảm bảo tính linh hoạt và độc lập.

*Ồ, nếu tách các services ra độc lập, vậy làm sao liên lạc và trao đổi thông tin/dữ liệu giữa các services với nhau?*

### Liên lạc giữa Microservices

Trong ứng dụng monolithic, các chức năng khác nhau nằm trong các component khác nhau được kết nối bằng cách gọi hàm hay phương thức. Trong SOA, việc này được chuyển sang một chế độ tách rời hơn với kiểu nhắn tin qua các dịch vụ web (web service messaging), phần lớn dùng SOAP trên nền giao thức HTTP, JMS. Những webservices này khá phức tạp. Như đã nói ở trên, microservices yêu cầu là phải có một cơ chế truyền tin đơn giản và nhẹ.

*Vậy đó là những cơ chế nào?*

### Gửi Tin Đồng Bộ – REST, Thrift

Với truyền tin đồng bộ (người gửi – client sẽ chờ một khoảng thời gian để nhận kết quả từ service), REST là sự lựa chọn hàng đầu vì nó cung cấp hệ thống truyền tin đơn giản qua giao thức HTTP dạng request – response. Do đó, nhiều microservices sử dụng HTTP với API. Mỗi chức năng sẽ xuất ra (expose) API.

![](https://images.viblo.asia/8fcf3797-24be-4706-b80e-993580121b78.png)

Ngoài REST, Thrift cũng được sử dụng để truyền tin đồng bộ.

### Gửi Tin Bất Đồng Bộ – AMQP, STOMP, MQTT

Trong một số kịch bản, truyền tin bất đồng bộ là cần thiết (client không mong đợi response ngay lập tức, hoặc không cần response). Các giao thức truyền tin bất đồng bộ như AMQP, STOMP hay MQTT được sử dụng rộng rãi.

Như vậy là chúng ta có gửi tin nhắn đồng bộ hoặc bất đồng bộ. Nhưng nên định dạng cho tin nhắn thế nào đây?

### Các Định Dạng Tin Nhắn – JSON, XML, Thrift, ProtoBuf, Avro

Quyết định định dạng tin nhắn phù hợp cho microservices cũng là một yếu tố quan trọng. Với phần lớn các ứng dụng microservices, họ sử dụng những kiểu tin nhắn dạng chữ như JSON và XML trên nền giao thức HTTP với API. Trong trường hợp cần truyền tin dạng nhị phân, microservices có thể dùng dạng Thrift, Proto hay Avro.

### Service Contracts – Định Nghĩa Service Interfaces – Swagger, RAML

Khi bạn có một nghiệp vụ được xây dựng như một dịch vụ, bạn cần định nghĩa và thông báo hợp đồng dịch vụ (service contract thể hiện giao kèo của service).

Bởi vì chúng ta xây dựng microservices trên kiểu kiến trúc REST, ta có thể sử dụng cùng kiểu REST API để định nghĩa hợp đồng của microservices. Do đó, microservices sử dụng các ngôn ngữ định nghĩa REST API tiêu chuẩn như Swagger, RAML để định nghĩa hợp đồng dịch vụ.

Đối với trường hợp microservices không được triển khai dựa trên HTTP/REST (cụ thể là dùng Thrift), chúng ta có thể dùng mức độ giao thức ‘Interface Definition Languages’ (ví dụ: Thrift IDL)

### Kết Nối Microservices (Giao Tiếp Giữa Các Services)

Trong kiến trúc microservices, ứng dụng phần mềm được cấu thành từ các dịch vụ độc lập. Để hoàn thành một tác vụ của người dùng trên phần mềm, kết nối và giao tiếp giữa các microservices là cần thiết vì tác vụ gồm nhiều tác động khác nhau lên các services. Vì vậy, giao tiếp giữa các microservices là một vấn đề cực kì quan trọng.

Khi áp dụng SOA, giao tiếp giữa các services được tiến hành bởi một Enterprise Service Bus (ESB) và phần lớn logic nằm trong tầng trung gian này (định tuyến cho tin nhắn, chuyển đổi và điều phối tin nhắn). Tuy nhiên, kiến trúc microservices thúc đẩy việc loại trừ một tầng giao tiếp trung gian tập trung/ ESB và chuyển phần ‘smart-ness’ hay business logic sang các services (nó được gọi là ‘Smart Endpoints’).

Bởi vì microservices sử dụng giao thức tiêu chuẩn như HTTP/REST, JSON, …, Cho nên các giao tiếp giữa các microservices được cố gắng thống nhất về giao thức và hạn chế tối đa việc tích hợp với một giao thức khác. Một lựa chọn khác cho giao tiếp giữa microservices là sử dụng một message bus nhẹ hay gateway với khả năng định tuyến tối thiểu hoạt động như những đường truyền đơn thuần không xử lý business logic gì hết (dump pipe). Dựa vào những phong cách này, có một số kiểu mẫu giao tiếp trong microservices như dưới đây.

### Point-to-point – Kết Nối Trực Tiếp Giữa Các Services

Với kiểu kết nối trực tiếp điểm nối điểm, toàn bộ logic của việc định tuyến truyền tin nhắn nằm trong mỗi điểm cuối (endpoint) hay chính là các services. Và services nói chuyện trực tiếp với nhau. Mỗi service mở ra một REST APIs và bất kì service hay khách hàng bên ngoài nào cũng có thể gọi service qua REST API của nó.

![](https://images.viblo.asia/561b9734-9395-41a6-a817-67437310f005.png)

Rõ ràng là mô hình này đơn giản và hoạt động ổn với ứng dụng microservices tương đối nhỏ nhưng khi số lượng services tăng lên, việc giao tiếp trở nên cực phức tạp. Đây là lý do trong mô hình SOA truyền thống người ta sử dụng Enterprise Service Bus (ESB), chính là để loại bỏ kết nối trực tiếp phức tạp và rối rắm. Sau đây là một số nhược điểm của kiểu giao tiếp trực tiếp (point to point).

* Những yêu cầu như xác thực người dùng, điều tiết, giám sát,…phải được thực hiện (implement) ở mọi microservices.
* Việc trên dẫn đến các tính năng phổ biến bị trùng lặp, việc thực hiện mỗi microservices có thể trở nên phức tạp.
* Không có cách quản lý, kiểm soát giao tiếp giữa các services (chẳng hạn như muốn theo dõi, truy tìm hay lọc các giao hành động giữa các services).
* Thường việc kết nối trực tiếp trong microservices được coi là anti-pattern cho việc triển khai các ứng dụng microservice có quy mô lớn.

Vì vậy, với những trường hợp phức tạp hơn, thay vì kết nối trực tiếp hay dùng một ESB trung tâm, chúng ta có thể sử dụng 1 messaging bus trung tâm gọn nhẹ. Nó cung cấp một lớp trừu tượng hóa các microservices (an abstraction layer). Cách này được gọi là API Gateway.

### API-Gateway

Ý tưởng chính của API Gateway là sử dụng một cổng truyền tin gọn nhẹ như một điểm vào chính cho tất cả khách hàng/ người dùng và triển khai những chức năng chung mà không liên quan đến nghiệp vụ đặc thù ở cấp Gateway này.

Nhìn chung, một API Gateway cho phép bạn sử dụng một API được quản lý qua HTTP/REST. Vì thế, chúng ta có thể cung cấp tất cả các chức năng nghiệp vụ được phát triển thành microservices qua API Gateway như một APIs tập trung được quản lý.

![](https://images.viblo.asia/93bfd301-5591-4087-baa8-de54944a7f2e.png)

Trong ví dụ bán hàng của chúng ta, theo Hình 5 tất cả microservices đều được xuất ra thông qua API Gateway và đây là một chốt đầu vào duy nhất cho người dùng. Nếu một microservice muốn giao tiếp với một microservice khác thì cần đi qua API Gateway.

API Gateway cung cấp các lợi thế dưới đây:
* Cung cấp một lớp trừu tượng hóa các microservices. Ví dụ thay vì cung cấp một API cho tất cả khách hàng, API gateway có thể xuất ra hay hiển thị API khác nhau cho mỗi khách hàng.
* Định tuyến và chuyển đổi tin nhắn gọn nhẹ ở cấp gateway.
* Một điểm tập trung cho các chức năng chung không mang tính nghiệp vụ kinh doanh như bảo mật, giám sát và điều tiết.
* Với API Gateway, microservices trở nên càng gọn nhẹ vì các chức năng chung không mang tính nghiệp vụ đều chuyển sang Gateway.

API Gateway có thể là kiểu mẫu được sử dụng rộng rãi nhất trong triển khai microservices.

### Message Broker – Người truyền tin trung gian

Microservices có thể được kết nối qua truyền tin bất đồng bộ như yêu cầu một chiều (requests) hay thông báo/ đăng kí nhận thông báo (publish/ subscribe) qua queues hay topics. Với publish/ subscribe, một service có thể tạo tin nhắn và gửi bất đồng bộ đến một hàng chờ (queue hay topic). Sau đó service khác có thể nhận tin này từ queue hay topic. Phong cách này tách biệt người gửi và người nhận, và người truyền tin trung gian sẽ lưu tin nhắn đến khi người nhận có thể xử lý. Người gửi hoàn toàn không biết gì về người nhận.

![](https://images.viblo.asia/6067c8e8-0ba2-427b-a3f8-cfd0bce18452.png)

Giao tiếp giữa người gửi/ người nhận được tạo ra bởi message broker qua các tiêu chuẩn truyền tin bất đồng bộ như AMQP, MQTT,…

### Quản Lý Cơ Sở Dữ Liệu Phân Tán

Trong cấu trúc monolithic, ứng dụng lưu dữ liệu vào một cơ sở dữ liệu (CSDL) tập trung duy nhất.

![](https://images.viblo.asia/2baf2b29-b561-4970-abf7-3db6ffd70c29.png)

Trong microservices, các chức năng được tách thành nhiều microservices và nếu sử dụng cùng một CSDL trung tâm thì microservices không còn độc lập. Thay đổi dữ liệu của một service có thể làm hỏng các services khác. Do đó, mỗi microservice phải có CSDL riêng.

![](https://images.viblo.asia/1b06d269-1d0b-4ba3-ab19-cc694c389c1f.png)

Dưới đây là vài đặc điểm chính khi phát triển việc quản lý dữ liệu phân tán trong kiến trúc microservices.
* Mỗi service có thể có một CSDL riêng biệt để lưu trữ thông tin cần thiết cho nghiệp vụ của service đó.
* Một microservice chỉ có thể truy xuất vào CSDL riêng của nó mà không có quyền truy xuất vào CSDL của microservices khác.
* Trong một số hoàn cảnh, để hoàn thành một tác vụ bạn cần phải cập nhật nhiều CSDL. Khi đó CSDL của microservices khác chỉ nên được cập nhật qua API của những dịch vụ này (không trực tiếp thay đổi CSDL).

Việc phân tách quản lý dữ liệu cho phép bạn hoàn toàn phân tách các microservices và có thể chọn các công nghệ quản lý dữ liệu khác nhau (SQL hay NoSQL,…nhiều CSDL khác nhau cho các microservices). Tuy nhiên, với các giao dịch phức tạp liên quan đến nhiều microservices, giao dịch phải được thực hiện qua API.

### Quản Trị Phân Tán

Kiến trúc microservices ủng hộ quản trị phân tán.

Nhìn chung, quản trị nghĩa là thiết lập và thực thi phương thức mà con người và các giải pháp làm việc cùng nhau để đạt được mục tiêu. Trong ngữ cảnh SOA, quản trị SOA (SOA governance) hướng dẫn việc phát triển các services có thể tái sử dụng, thiết lập cách services được thiết kế, phát triển và cách chúng thay đổi theo thời gian. Nó thiết lập một giao kèo giữa người cung cấp services và người sử dụng services, thông báo cho người sử dụng những thứ họ có thể nhận được và người sử dụng những thứ họ phải cung cấp. Trong quản trị SOA, có hai kiểu quản trị phổ biến:
* Quản trị khi thiết kế – định nghĩa và kiểm soát việc tạo services, thiết kế và thực thi các chính sách của services.
* Quản trị khi triển khai/ chạy – khả năng đảm bảo các chính sách của services trong quá trình hoạt động.

*Vậy trong microservices thì quản trị là gì?*

Microservices được xây dựng động lập và phân tán với nền tảng công nghệ khác nhau. Do đó, việc thiết lập một tiêu chuẩn thiết kế và phát triển chung là không cần thiết. Chúng ta có thể kết luận về khả năng quản trị phân tán trong kiến trúc microservices như sau:
* Không cần phải có một hệ quản trị tập trung khi thiết kế.
* Microservices có thể tự quyết định thiết kế và phát triển của nó.
* Kiến trúc ủng hộ và hỗ trợ việc chia sẻ các services chung hay có thể tái sử dụng.
* Một số mặt của quản trị trong quá trình hoạt động như SLAs, điều phối, giám sát, bảo mật hay tìm kiếm dịch vụ (service discovery) có thể được phát triển ở cấp API Gateway.

### Service Registry & Service Discorvery (Truy Tìm Dịch Vụ).

Trong microservices, số lượng services mà bạn cần xử lý khá lớn. Và địa điểm của chúng có thể thay đổi nhanh và thường xuyên vì tính chất của việc phát triển microservices là nhanh. Nên bạn cần phải xác định được vị trí của một service trong quá trình chạy. Giải pháp cho vấn đề này là Service Registry.

**Service Registry**

Service Registry giữ các thực thể microservices và địa chỉ của chúng. Thực thể microservices được đăng kí với service registery khi bắt đầu chạy và hủy đăng kí khi tắt. Người dùng có thể tìm các services đang tồn tại và địa chỉ của chúng qua service registry.

**Service Discovery**

Để tìm các microservices đang tồn tại và địa điểm của chúng, chúng ta cần một quy trình truy tìm dịch vụ. Có hai mô hình là Client-side Discovery và Server-side Discovery. Hãy cùng xem xét hai mô hình này.

***Client-side Discovery*** – Với mô hình này, client hay API Gateway lấy thông tin địa điểm của một thực thể service bằng cách truy vấn Service Registry.

![](https://images.viblo.asia/8c252ffb-6a19-47f6-bfeb-fb64367148ba.png)

Client hay API Gateway phải thực hiện logic tìm kiếm service bằng cách gọi vào Service Registry.

***Server-side Discovery*** – Với cách này, client hay API Gateway gửi yêu cầu lên một component (có thể là một Load Balancer). Component này sẽ gọi Service Registry và quyết định địa điểm của các microservices.

![](https://images.viblo.asia/4fe67d88-7196-4a6d-88bb-ae4daf487ad6.png)

Một số giải pháp triển khai microservices như Kubernetes cung cấp mô hình server-side discovery.

### Deployment – Triển Khai

Việc triển khai các dịch vụ có một trò trọng yếu và gồm các yêu cầu sau:

* Khả năng triển khai/ gỡ xuống độc lập mà không ảnh hưởng đến dịch vụ khác.
* Có thể mở rộng theo cấp microservices, chỉ mở rộng microservices cần thiết.
* Phát triển và triển khai microservices nhanh chóng.
* Một microservice ngắt kết nối hay sập thì không ảnh hưởng các dịch vụ khác.

***Docker*** (một công cụ mã nguồn mở cho phép lập trình viên và quản trị viên hệ thống triển khai các ứng dụng thành các containers trên môi trường Linux) cung cấp một công cụ tuyệt vời để triển khai microservices đáp ứng đủ các yêu cầu trên. Các bước chính gồm:
* Đóng gói mỗi microservice thành một ảnh Docker (docker image).
* Triển khai mỗi thực thể của service là một Docker container.
* Mở rộng dựa vào số lượng thực thể.
* Phát triển, triển khai và khởi động microservices trở nên nhanh hơn với Docker (nhanh hơn nhiều các máy ảo thông thường – VM).

***Kubernetes*** mở rộng khả năng của Docker bằng cách quản lý một cụm các Linux container như một hệ thống duy nhất, quản lý và chạy các Docker containers trên nhiều hosts, cung cấp service discovery và kiểm soát việc nhân rộng. Như bạn có thể thấy, những tính năng này cần thiết cho kiến trúc microservices. Vì vậy sử dụng Kurbernetes (trên nền Docker) để triển khai microservices đang trở thành một phương pháp cực kì hữu dụng, đặc biệt với ứng dụng lớn.

![](https://images.viblo.asia/371ba699-290d-4dd8-a5ca-27830c1f90a9.png)

Hình 11 thể hiện tổng quát việc triển khai các microservices. Mỗi thực thể của microservices được triển khai thành một container và có hai containers trên mỗi host. Bạn có thể thay đổi số lượng containers chạy trên một host theo ý mình.

### Security – Bảo Mật

Bảo mật microservcies là một yêu cầu phổ biến trong thực tế. Trước khi nói đến bảo mật microservices, hãy nhìn lại cách chúng ta thường thực hiện bảo mật của ứng dụng monolithic.
* Bảo mật của một ứng dụng monolithic thường là về xác định xem “Ai là người gọi đến”, “Người này có quyền hạn gì” và “Ứng dụng thông báo về những thông tin này thế nào”.
* Một component phụ trách bảo mật chung thường nằm ở đầu chuỗi xử lý yêu cầu và component sẽ trả về thông tin cần thiết.

*Vậy chúng ta có thể chuyển đổi trực tiếp mô hình này sang kiến trúc microservices không?*

Có nhưng điều này yêu cầu phát triển bảo mật ở từng microservices và kết nối với một cơ sở trung tâm về người dùng để lấy thông tin cần thiết. Đây là một cách khá rối rắm. Thay vào đó, chúng ta có thể tận dụng các API bảo mật tiêu chuẩn như OAuth2 và OpenID Connect để tìm một giải pháp tốt hơn cho vấn đề bảo mật. Trước khi nói sâu hơn, chúng ta sẽ tóm tắt mục tiêu của mỗi tiêu chuẩn và cách sử dụng chúng.
* ***OAuth2*** – một phương thức chứng thực kiểu ủy quyền. Client xác thực với server cấp quyền (authorization server) và nhận một token gọi là “Access token”. Access token không chứa bất kì thông tin gì về client. Nó chỉ là một tấm vé tham chiếu đến thông tin người dùng mà server cấp quyền có thể truy xuất đến. Do đó, đây cũng được gọi là token kiểu tham chiếu “by-reference token” và an toàn để sử dụng trên mạng lưới mở và internet.
* ***OpenID Connect hoạt*** động tương tự OAuth nhưng ngoài Access Token, server cấp quyền còn phát một ID token chứa thông tin người dùng. Token này thường dạng JWT (JSON Web Token) và được kí bởi server cấp quyền. JWT token do đó được coi là token kiểu tham trị “by-value token” bởi vì nó chứa thông tin về người dùng và có thể trở nên không an toàn.

Bây giờ, hãy xem xét những tiêu chuẩn này có thể bảo mật microservices trong ví dụ bán hàng của chúng ta như thế nào.

![](https://images.viblo.asia/a8133ac2-43cb-41cf-8f4d-13f788f7d27f.png)

Như hình trên, các bước chính để thực hiện bảo mật microservices gồm:
* Chuyển việc xác thực cho server dạng OAuth và OpenID Connect (Authorization server).
* Sử dụng API Gateway để có một điểm đầu vào duy nhất cho yêu cầu từ clients.
* Client kết nối với server cấp quyền và nhận Access token. Sau đó gửi token này đến API Gateway cùng với yêu cầu.
* Dịch token tại Gateway – API Gateway lấy ra access token và gửi đến server cấp quyền để lấy JWT.
* Gateway truyền JWT cùng với yêu cầu đến microservices.
* JWT chứa thông tin người dùng cần thiết để lưu user sessions,….
* Ở mỗi lớp microservice, bạn có thể có một component xử lý JWT, việc này khác đơn giản.

### Transactions – Các giao dịch

Các transactions (giao dịch) trong microservices được hỗ trợ thế nào?

Trên thực tế, hỗ trợ các giao dịch phân tán trên nhiều microservices là một nhiệm vụ đặc biệt phức tạp. Kiến trúc microservice tự khuyến khích sự phối hợp không có giao dịch giữa các dịch vụ.

Ý tưởng là một dịch vụ nhất định hoàn toàn khép kín và dựa trên nguyên lý Single Responsibility Principle.

Việc cần phải có các giao dịch phân tán trên nhiều microservice thường là một triệu chứng của lỗ hổng thiết kế trong kiến ​​trúc microservice và thường có thể được sắp xếp bằng cách tái cấu trúc phạm vi của microservice.

Tuy nhiên, nếu có một yêu cầu bắt buộc là phải có các giao dịch phân tán trên nhiều dịch vụ, thì các kịch bản như vậy có thể được thực hiện với ‘compensating operations’ (các hoạt động bù ) ở cấp độ mỗi dịch vụ.

Ý tưởng chính là, một microservice cụ thể dựa trên nguyên lý Single Responsibility Principle và nếu một microservice nào đó không thực hiện được nhiệm vụ đã giao, chúng ta có thể coi đó là một thất bại của toàn bộ microservice đó. Sau đó, tất cả các hoạt động khác 
(các hoạt động ở cấp trên) phải được hoàn tác bằng cách gọi hoạt động bù tương ứng của các dịch vụ siêu nhỏ đó.

### Design for Failures – Thiết Kế Cho Các Thất Bại

Kiến trúc microservices tăng khả năng xảy ra thất bại tại microservices. Một microservice có thể sập do một vấn đề mạng, nguồn tài nguyên bị thiếu hụt hoặc không sẵn sàng,… Một microservice không đáp ứng lại thì không nên dẫn đến toàn bộ ứng dụng microservices sập. Do đó, mỗi microservices nên có khả năng chịu lỗi và hồi phục khi có thể. Người dùng phải có trải nghiệm tốt, nhẹ nhàng và không nhận ra lỗi bên trong hệ thống.

Thêm nữa, vì các dịch vụ có thể gặp lỗi bất cứ lúc nào, việc phát hiện (giám sát thời gian thực) lỗi nhanh chóng và nếu có thể tự động phục hồi dịch vụ là cực kì quan trọng.

Có một vài kiểu mẫu xử lý lỗi trong microservices phổ biến.

**Circuit Breaker**

Khi có lời gọi từ bên ngoài đến một microservice, bạn có thể cấu hình một component giám sát lỗi với mỗi lời gọi. Component này đếm số yêu cầu thành công và thất bại, khi lỗi đạt một giới hạn nhất định thì component này sẽ dừng hoạt động của service (ngắt giao mạch).

Cách này hữu dụng để tránh tiêu tốn tài nguyên không cần thiết, yêu cầu bị chậm vì timeouts, cách này cũng giúp giám sát hệ thống.

**Bulkhead**

Vì một ứng dụng kiến trúc microservices bao gồm nhiều microservices, một service dừng hoạt động không nên ảnh hưởng đến phần còn lại. Kiểu mẫu bulkhead tách biệt các phần của ứng dụng để khi có lỗi tại một nơi nào đó thì không ảnh hưởng hệ thống.

**Timeout**

Kiểu mẫu timeout là một quy trình cho phép dừng một yêu cầu khi thời gian chờ đợi vượt quá hạn mức. Bạn có thể cấu hình khung thời gian tùy ý.

Vậy khi nào chúng ta sử dụng những kiểu mẫu này?

Trong phần lớn trường hợp, những kiểu mẫu này được áp dụng ở lớp Gateway. Khi microservices không đáp lại hay không sẵn sàng, ở cấp Gateway chúng ta có thể quyết định có nên gửi yêu cầu đến microservices sử dụng circuit breakers hay timeout. Hơn nữa, sử dụng bulkhead ở Gateway khá quan trọng vì đây là một điểm đầu vào cho tất cả yêu cầu từ clients, nên nếu lỗi một service cũng không ảnh hưởng đến việc gửi yêu cầu đến các services khác.

Thêm vào đó, Gateway có thể được sử dụng như một điểm trung tâm ta có thể lấy thông tin về trạng thái và theo dõi các microservices hoạt động.

### Microservices, Tích Hợp Cho Doanh Nghiệp, Quản Lý API và hơn thế nữa

Chúng ta đã trao đổi các đặc tính của kiến trúc Microservices và cách bạn có thể thực hiện chúng. Tuy nhiên, bạn nên lưu ý rằng Microservices không phải toa thuốc chữa bách bệnh. Việc áp dụng mù quáng những khái niệm đang nổi sẽ không xử lý vấn đề thực tế của bạn. Nếu bạn đã đọc toàn bộ bài này thì bạn sẽ thấy Microservices có nhiều lợi ích và chúng ta nên tận dụng. Tuy nhiên, bạn cần hiểu rằng mong chờ microservices giải quyết tất cả các vấn đề là không thực tiễn.

### Chốt Bài

Qua bài này chúng ta có thể hiểu được Microservices là gì, microservices giúp bạn được những gì, cách để chia nhỏ các microservices, cách để tích hợp và tương tác giữa các microservices với nhau, cách để bảo mật khi triển khai ứng dụng với microservices, những công cụ hỗ trợ để giúp bạn triển khai ứng dụng microservices dễ hơn.

Mong rằng các bạn đã có một cái nhìn rõ hơn về Microservices.

[XEM THÊM BÀI VIẾT TẠI ĐÂY](https://thangphampt.wordpress.com/2018/12/23/microservices-cuoi-ngua-xem-hoa/)