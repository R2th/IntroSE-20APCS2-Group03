Trước khi đi sâu vào tìm hiểu về API Testing thì chúng ta hãy cùng nhau tìm hiểu về khái niệm API.

### API là gì?
API là viết tắt của Application Programming Interface (giao diện lập trình ứng dụng), là phần mềm trung gian cho phép 2 ứng dụng giao tiếp với nhau. Mỗi khi sử dụng các ứng dụng, chẳng hạn như Facebook, các ứng dụng gửi tin nhắn tức thì hoặc kiểm tra thời tiết trên điện thoại... đồng nghĩa với việc bạn đang sử dụng API.

**Ví Dụ Về API**

Khi sử dụng ứng dụng trên thiết bị di động, ứng dụng sẽ kết nối Internet và gửi dữ liệu tới máy chủ. Sau đó máy chủ lấy dữ liệu, diễn giải dữ liệu, thực hiện các hành động cần thiết và gửi dữ liệu trở lại thiết bị của bạn. Ứng dụng giải thích dữ liệu và hiển thị các thông tin đọc được cho bạn. Và nó được gọi là API.

Để giải thích rõ hơn, tham khảo ví dụ dưới đây:

Thử tưởng tượng bạn đang ở trong một nhà hàng, và menu có 1 loạt các món ăn để bạn lựa chọn. Nhà bếp là một phần của hệ thống, thực hiện nhiệm vụ chuẩn bị các món mà bạn đặt. Cái còn thiếu ở đây là người để truyền đạt món ăn mà bạn yêu cầu tới nhà bếp và mang đồ ăn ra cho bạn. Đó chính là người phục vụ hoặc có thể nói là API. Người phục vụ sẽ truyền đạt các yêu cầu của bạn tới nhà bếp và mang đồ ăn ra cho bạn.

**Trong mô hình kiến trúc ba tầng cổ điển:**

- Tầng dữ liệu (Data Tier) : Bao gồm cơ sở dữ liệu và các file hệ thống, là nơi truy xuất/lưu trữ dữ liệu.

- Tầng Logic : được coi là bộ não của ứng dụng, xử lý dữ liệu giữa các lớp, điều phối ứng dụng, xử lý các lệnh và đưa ra các quyết định logic.

- Tầng hiển thị (Presentation Tier) : Giao diện người dùng, dịch các tác vụ thành thứ mà người dùng có thể hiểu.

![](https://images.viblo.asia/16c0f5e1-c293-404b-a776-56001079dc22.png)

Tầng logic là API. Đây là nơi bao gồm tất cả các logic nghiệp vụ. Nó có trách nhiệm lấy thông tin từ các giao diện người dùng khác nhau (UIs), thực hiện các phép tính và các giao dịch trên lớp cơ sở dữ liệu và sau đó hiển thị các kết quả trở lại giao diện người dùng. Trong một số trường hợp, tầng logic của ứng dụng có độ phức tạp hơn thế nhiều và sử dụng đa công nghệ không phải là hiếm (như máy chủ web, hàng đợi thông báo, ...)
Ví dụ về thế giới thực: Bạn đặt một dịch vụ của Uber hoặc Grab với một địa chỉ đích. Những ứng dụng này sau đó cần phải giao tiếp với dịch vụ bản đồ, các dịch vụ giao thông và thời tiết và các ứng dụng chuyên biệt khác để hướng dẫn đặt chỗ và để cho bạn có 1 chuyến đi hoàn hảo. Trong thế giới hiện đại, liên kết với nhau, chúng ta coi như là tất cả những hệ thống khác nhau này có thể nói chuyện với nhau một cách liền mạch, trong thực tế điều đó sẽ không thể có nếu không có API.

Trong API định nghĩa tập các phương thức, định dạng dữ liệu và các giao thức mà nó mong đợi, và bên tiêu dùng API (được gọi là máy khách) sẽ sử dụng các quy tắc này để làm việc với API, miễn là nó tuân thủ các quy tắc thì sẽ luôn có thể sử dụng API mà không phải lo lắng về bất cứ điều gì. Có những tình huống mà API là sản phẩm cuối cùng - API công khai.
Ví dụ : Một trình tìm kiếm Internet đơn giản sẽ tiết lộ hàng ngàn API công khai cho bất kỳ thứ gì từ GPS hoặc các giải pháp lập bản đồ để định vị một đài phát thanh.

Ví dụ về 1 số ông lớn API:
* Google Maps API : Chúng được thiết kế chủ yếu cho việc sử dụng điện thoại di động và máy tính để bàn với sự trợ giúp của giao diện flash và JavaScript.
* Amazon Advertising API: API quảng cáo giúp truy cập vào sản phẩm để khám phá các tính năng, hỗ trợ đưa ra các quảng cáo phù hợp với từng đối tượng người dùng.
* Twitter: API dành cho Twitter thường có hai loại, một để truy cập dữ liệu và một cho tương tác và tìm kiếm trên Twitter.
* YouTube: API này được sử dụng cho YouTube bao gồm nhiều chức năng khác nhau : video, phát trực tuyến, trình phát, v.v.

### API Testing là gì?

![](https://images.viblo.asia/8d029c2e-bc2b-48ec-9cec-e6f190033832.png)

Kiểm thử API hoàn toàn khác với Kiểm thử GUI, kiểm thử API chủ yếu tập trung vào lớp logic nghiệp vụ của kiến trúc phần mềm chứ không tập trung vào giao diện của ứng dụng.

Thay vì sử dụng đầu vào (bàn phím) và đầu ra người dùng chuẩn, thì trong kiểm thử API, bạn sử dụng phần mềm để gửi các cuộc gọi đến API, nhận đầu ra và ghi lại phản hồi của hệ thống.

API Testing được sử dụng để kiểm thử:

* **Functional** (Chức năng) : API trả về phản hồi chính xác (theo định dạng mong muốn) cho một loạt các yêu cầu khả thi, tức là đầu ra từ ứng dụng / cơ sở dữ liệu đầu tiên là chính xác, được cấu trúc tốt và hữu ích cho một ứng dụng khác. Phản hồi có thể là : trạng thái Pass/Fail, dữ liệu, thông tin hoặc cuộc gọi đến một API khác.
* **Load** (Tải) : kiểm tra khả năng xử lý một lượng lớn cuộc gọi và khả năng phản ứng chính xác với các trường hợp biên : giới hạn xảy ra lỗi và các đầu vào cực đoan không mong muốn.
* **Performance** (Hiệu năng) : Phản hồi trong một khoảng thời gian có thể chấp nhận được.
* **Security** (Bảo mật) : Kiểm tra : xác thực bắt buộc, quyền, kiểm soát truy cập, dữ liệu nhạy cảm được truyền qua mạng an toàn không và phản hồi (để đảm bảo an toàn cho hệ thống) tới các cuộc tấn công bảo mật tiềm ẩn.

Kiểm thử API liên quan đến việc kiểm tra trực tiếp các API (trong sự cô lập), và một phần trong các giao dịch đầu cuối của quá trình kiểm thử tích hợp. Ngoài các API RESTful, các giao dịch này bao gồm nhiều loại thiết bị đầu cuối như dịch vụ web, ESB, cơ sở dữ liệu, mainframe, giao diện người dùng web và ERP. Kiểm thử API được thực hiện trên các API được sử dụng trong ứng dụng (có thể bao gồm cả các API của bên thứ ba). Ảo hóa dịch vụ được sử dụng kết hợp với kiểm thử API để tách biệt các dịch vụ đang thử nghiệm cũng như mở rộng truy cập môi trường thử nghiệm bằng cách mô phỏng các API / dịch vụ không thể truy cập để thử nghiệm.

### Why API Testing?

Các API bây giờ là giao diện chính cho logic ứng dụng. Các nhóm Agile và DevOps làm việc với các vòng lặp ngắn và các vòng phản hồi nhanh nhận thấy rằng các kiểm tra GUI đòi hỏi phải làm lại một số bước đáng kể để bắt kịp với sự thay đổi thường xuyên. Các thử nghiệm ở lớp API thì ít "giòn" và dễ bảo trì hơn. Đó là lý do tại sao kiểm thử API ngày một phổ biến và được ưa chuộng đễn vậy.

### Các loại API

Qua nhiều năm, các API đã phát triển từ các thư viện mã đơn giản mà các ứng dụng có thể sử dụng để chạy mã trên cùng một máy tính, đến các API từ xa có thể được sử dụng để cho phép mã trên một máy tính gọi mã được lưu trữ ở một nơi khác. Dưới đây là danh sách nhanh các công nghệ API phổ biến:

* Cổng TCP / IP
* Cuộc gọi thủ tục từ xa (RPC)
* Kiến trúc môi giới yêu cầu đối tượng chung (CORBA)
* Java Remote Method Invocation (RMI) và Enterprise Java Beans (EJBs)
* Mô hình đối tượng thành phần phân tán của Microsoft (DCOM) - còn được gọi là ActiveX
* Dịch vụ web (SOAP rồi REST)

Các dịch vụ web SOAP sử dụng ngôn ngữ định nghĩa dịch vụ Web (WSDL) và giao tiếp bằng cách sử dụng các yêu cầu HTTP POST. Về cơ bản, chúng là một sự tuần tự hóa các cuộc gọi đối tượng RPC thành XML mà sau đó có thể được chuyển tới dịch vụ web. XML được chuyển tới các dịch vụ web SOAP cần phải khớp với định dạng được chỉ định trong WSDL.

RESTful API (còn được gọi là một dịch vụ web RESTful) là một API web được thực hiện bằng cách sử dụng các nguyên tắc HTTP và REST. Không giống như các dịch vụ web dựa trên SOAP, không có chuẩn "chính thức" cho các API web RESTful. Điều này là do REST là một kiểu kiến trúc, không giống như SOAP, là một giao thức. Thông thường các dịch vụ web REST trưng ra các hoạt động của chúng như là một loạt các “tài nguyên” duy nhất tương ứng với một URL cụ thể. Mỗi phương thức HTTP chuẩn (POST, GET, PUT và DELETE) sau đó ánh xạ vào bốn hoạt động CRUD (Tạo, Đọc, Cập nhật và Xóa) cơ bản trên mỗi tài nguyên. Các dịch vụ web REST có thể sử dụng các phương thức tuần tự hóa dữ liệu khác nhau (XML, JSON, RSS, v.v.).

### Cách thực hiện Kiểm thử API?

Vì các API thiếu GUI nên việc kiểm tra API được thực hiện ở lớp thông báo. Kiểm tra API thường bao gồm thử nghiệm các API REST hoặc các dịch vụ web SOAP với các tải trọng tin nhắn JSON hoặc XML được gửi qua HTTP, HTTPS, JMS và MQ. Nó cũng có thể bao gồm các định dạng tin nhắn như : SWIFT, FIX, EDI và các định dạng có độ dài cố định tương tự, CSV, ISO 8583, Protocol Buffers; được gửi qua các giao thức như TCP / IP, ISO 8583, MQTT, FIX, RMI, SMTP, TIBCO Rendezvous.

Kiểm thử API khác với các loại kiểm thử khác vì GUI không khả dụng và cần phải thiết lập môi trường ban đầu (để gọi API) với tập các tham số bắt buộc và sau đó kiểm tra kết quả test. Thay vì sử dụng đầu vào (bàn phím) và đầu ra người dùng chuẩn, trong Kiểm thử API chúng ta sử dụng phần mềm để gửi cuộc gọi đến API, nhận đầu ra và ghi lại phản hồi của hệ thống. Kiểm thử API yêu cầu ứng dụng tương tác với API. Để kiểm tra API, chúng ta cần sử dụng Tool để thao tác điều hướng API.

![](https://images.viblo.asia/05ea0cce-814b-410a-92d8-3be53e21b751.png)

* ```Tài liệu mô tả các yêu cầu khi kiểm thử API``` : Mục đích của API là gì? Quy trình làm việc của ứng dụng? Tích hợp (Intergrations) hỗ trợ cho API những gì? Các tính năng và chức năng của API là gì? Ghi lại tất cả các yêu cầu kiểm thử API này là điều đầu tiên chúng ta cần thực hiện. Điều này sẽ giúp chúng ta trong việc lập kế hoạch kiểm tra API trong suốt quá trình thử nghiệm.
* ```Môi trường kiểm thử``` : Thiết lập môi trường kiểm thử liên quan đến việc cấu hình cơ sở dữ liệu và máy chủ cho các yêu cầu của ứng dụng. Sau khi thiết lập, bạn nên thực hiện cuộc gọi API ngay lập tức để đảm bảo không có sự cố gì trước khi tiếp tục bắt đầu kiểm tra kỹ lưỡng hơn.
* ```Chức năng``` : Mục tiêu chính của kiểm thử API là đảm bảo tính logic và chức năng của các thành phần API liên quan đến gói phần mềm nói chung. Với mục tiêu đó, cần có một lượng effort thử nghiệm đáng kể để gắn cờ cho các khiếm khuyết chức năng có khả năng gây ra các vấn đề trong sản phẩm, và cũng sẽ cung cấp cho cả nhóm cách đo lường cơ bản các hàm API trong các điều kiện thông thường.
* ```Thử nghiệm tiêu cực``` : Kiểm thử API kỹ lưỡng cũng nên bao gồm kiểm tra biên và thử nghiệm stress cao hơn để xem cách API phản ứng với các điều kiện không lý tưởng (bất lợi). Bộ TestCase lý tưởng nên bao gồm ít nhất một vài trường hợp bất thường, chẳng hạn như ký tự không phải ASCII, loại dữ liệu không đúng hoặc số lượng rất lớn... Một lĩnh vực khác không nên bỏ qua là kiểm tra lỗi (các API trả về lỗi), vì đảm bảo API trong thử nghiệm không phá vỡ hoặc hỏng khi đáp ứng với dữ liệu đầu vào được hình thành kém là việc rất quan trọng.
* ```Che dấu dữ liệu``` : Kết hợp dữ liệu ứng dụng với các API thử nghiệm để đảm bảo rằng API hoạt động như mong đợi đối với các cấu hình đầu vào có thể biết.

### API Testing Tools

![](https://images.viblo.asia/3dbaf673-c59d-4e53-817d-fd963a426874.png)

Vì API Testing đang trở nên phổ biến, nên có rất nhiều tool có sẵn phục vụ việc kiểm thử API. Selenium chỉ dành cho thử nghiệm dựa trên trình duyệt, chúng ta có các công cụ khác nhau để sử dụng cho kiểm thử API dịch vụ web dựa trên Rest và Soap. Dưới đây là một số công cụ kiểm thử API hàng đầu có thể được sử dụng cho Kiểm tra dịch vụ web Rest và Soap.
* ```SOAPUI``` - Công cụ mã nguồn mở phổ biến nhất để thử nghiệm API trên thế giới, SoapUI cho phép bạn kiểm tra các API REST và SOAP một cách dễ dàng - vì nó đã được xây dựng đặc biệt để thử nghiệm API. Nó có thể tự động : kiểm thử chức năng, kiểm thử hồi quy, kiểm thử tuân thủ và kiểm thử tải của cả hai dịch vụ web SOAP và REST. Nó đi kèm với một giao diện đồ họa dễ sử dụng, hỗ trợ các công nghệ và tiêu chuẩn hàng đầu để giả lập và kích thích hành vi của các dịch vụ web.
* ```Postman``` : Gửi yêu cầu post lên máy chủ web và nhận phản hồi. Chạy trên Mac, Windows, Linux và các ứng dụng Chrome; ứng dụng này cho phép bạn thiết lập tất cả các tiêu đề (header) và cookie mà API của bạn mong đợi và sau đó kiểm tra phản hồi. Có thể sử dụng cho cả kiểm thử tự động và kiểm thử khám phá (chạy bằng tay). Tích hợp sẵn có như hỗ trợ cho các định dạng Swagger & RAML, hỗ trợ Run, Test, Document và Monitoring.
* ```Tricentis Tosca``` : Hỗ trợ một loạt các giao thức bao gồm cả HTTP (s) JMS, AMQP, Rabbit MQ, TIBCO EMS, SOAP, REST, IBM MQ, NET TCP. Nó sử dụng kiểm thử tự động dựa trên mô hình giúp bảo trì tập lệnh dễ dàng. Cho phép thử nghiệm đầu cuối để kiểm tra API; có thể được sử dụng trên các ứng dụng đóng gói, trên thiết bị di động, trình duyệt chéo, v.v.
* ```HttpMaster``` : Công cụ kiểm tra và phát triển web để tự động kiểm tra các trang web và dịch vụ - Các dịch vụ web RESTful và các ứng dụng API. HttpMaster cũng cho phép bạn theo dõi các phản hồi API.
* ```Rest-Assured``` : Java Domain mã nguồn mở - ngôn ngữ đặc tả (DSL) giúp cho kiểm thử dịch vụ REST trở nên đơn giản. Nó đơn giản hóa mọi thứ bằng cách loại bỏ sự cần thiết phải sử dụng mã code để kiểm tra và  validate các phản hồi phức tạp. Nó cũng hỗ trợ các Request/Response XML và JSON.
* ```Parasoft``` : Công cụ trả phí, kiểm thử tự động API với Parasoft bằng cách sử dụng nó hỗ trợ cho nhiều nền tảng như Java, C, C ++, .NET. Nó hỗ trợ kiểm tra end-to-end và có một giao diện rất thân thiện.
* ```vRest``` : Cung cấp giải pháp trực tuyến để kiểm thử tự động, mô phỏng, ghi tự động và đặc tả các API REST / HTTP / RESTful .. Công cụ này có thể được sử dụng để kiểm tra các ứng dụng được lưu trữ cục bộ, mạng nội bộ hoặc Internet. Một số tính năng tốt của nó bao gồm hỗ trợ tích hợp Jira và Jenkins, cho phép import từ Swagger và Postman. Có thể tạo API mocks trong vREST với sự trợ giúp của Mock Server Functionality. Người dùng có thể trực tiếp bắt đầu phát triển giao diện người dùng bằng cách sử dụng các yêu cầu HTTP giả.
* ```Apache JMeter``` : hỗ trợ kiểm thử hiệu năng cho các dịch vụ Web (SOAP / REST).
* ```HP QTP / UFT``` : Cung cấp một khung mở rộng có ích trong việc thực thi và xây dựng chức năng của hệ thống headless - hệ thống không có giao diện người dùng. Nó giúp kiểm tra các công nghệ headless như Cơ sở dữ liệu, dịch vụ Web, JMS, v.v.
* ```Rapise``` : Một công cụ tự động hóa mạnh mẽ với các tính năng mạnh mẽ và có thể mở rộng. Nó dựa trên một kiến trúc mở và linh hoạt để kiểm thử chức năng nhanh chóng các dịch vụ web REST / SOAP. Nó sử dụng các phương thức HTTP chuẩn như POST, GET, PUT và DELETE. Rapise cũng cung cấp hỗ trợ để thử nghiệm các ứng dụng web được xây dựng bằng Java, .NET, Ajax, Silverlight và Flash.
* ```WebInject``` : Công cụ miễn phí cho kiểm thử tự động : chức năng, chấp nhận, hồi quy của các dịch vụ web và web. Nó là một tool dòng lệnh dựa trên Perl, điều này giúp đơn giản hóa việc thực hiện các kiểm tra vì nó không yêu cầu người dùng tốn thời gian tại dấu nhắc lệnh. Hơn nữa, nó không có IDE như giao diện người dùng có nghĩa là, các thử nghiệm được viết bên ngoài giao diện người dùng WebInject. Nó có thể chạy trên các nền tảng có trình thông dịch Perl.
* ```Eclipse SDK``` : tool cho Kiểm thử tự động API 
* ...

Có rất nhiều công cụ kiểm tra API khác nhau có sẵn trên thị trường. Khi xem xét công cụ kiểm tra API, điều quan trọng là phải hiểu công nghệ API nào bạn sẽ sử dụng và cách tốt nhất để kiểm tra chúng. Ngày nay hầu hết các API bạn gặp phải sẽ là của dịch vụ Web đa dạng (hoặc REST hoặc SOAP), cũng có thể gặp các công nghệ khác như Java EJBs hoặc Microsoft DCOM / ActiveX DLLs.

### Thách thức khi test API

* Không có sẵn GUI gây khó khăn cho việc đưa ra các giá trị đầu vào - kết hợp tham số, lựa chọn tham số, phân loại và sắp xếp cuộc gọi.
* Kiến thức chuyên sâu về ứng dụng là cần thiết để có thể kiểm tra đầy đủ API. Một số API có thể tương tác với : hạt nhân hệ điều hành, các API khác, hoặc các phần mềm khác để cung cấp chức năng của chúng.
* Kỹ năng lập trình đầy đủ : Kiểm tra API thường ở dạng chuỗi các cuộc gọi, cụ thể là các chương trình. Mỗi người thử nghiệm phải có chuyên môn về (các) ngôn ngữ lập trình theo API.
* Không có tài liệu hướng dẫn: Các API được phát triển sẽ khó có tài liệu phù hợp nào có sẵn. Nếu không có tài liệu, rất khó cho nhà thiết kế thử nghiệm hiểu mục đích của các cuộc gọi, các kiểu tham số và các giá trị hợp lệ / không hợp lệ, giá trị trả về của chúng, các cuộc gọi đến các hàm khác và các tình huống sử dụng.
* Thông thường, người quản lý dự án không quan tâm đến việc chỉ định thời gian cụ thể để phát triển API cho phong phú và chi tiết, hãy để một mình thử nghiệm nó.
* Các ràng buộc về thời gian: Việc kiểm tra kỹ lưỡng các API tốn thời gian, đòi hỏi chi phí tìm hiểu và nguồn lực để phát triển tool và thiết kế các thử nghiệm.
* Xử lý ngoại lệ cần được kiểm tra kỹ lưỡng.

### Một số phương pháp hay để kiểm tra API

* Đầu tiên và quan trọng nhất là kiểm tra chức năng - các request-response cơ bản phải làm việc nhất quán.
* Nhóm các trường hợp thử nghiệm theo loại kiểm tra.
* Đối với phạm vi kiểm tra hoàn chỉnh, hãy tạo các trường hợp thử nghiệm cho tất cả các kết hợp đầu vào API có thể có.
* Kiểm tra lỗi và các tham số không hợp lệ để xử lý các vấn đề không lường trước được và tải như thế nào để đảm bảo rằng API không thành công.
* Thêm stress cho hệ thống thông qua một loạt các bài kiểm tra tải API.
* Lựa chọn tham số phải được đề cập một cách rõ ràng trong chính trường hợp kiểm tra.
* Ưu tiên các cuộc gọi hàm API để người kiểm thử có thể dễ dàng kiểm tra một cách kịp thời.
* Tự động hóa việc tạo tài liệu API với một tiêu chuẩn như Swagger, sau đó chạy qua các thử nghiệm để đảm bảo tài liệu có ý nghĩa đối với tất cả các cấp trải nghiệm người dùng.
* Tự động hóa bất cứ điều gì có thể.

API nào hoạt động không hiệu quả thì sẽ không bao giờ được chấp nhận, bất kể đó là API miễn phí và mở. Nếu một API bị phá vỡ, nó có thể không chỉ phá vỡ một ứng dụng duy nhất mà là một chuỗi các quy trình nghiệp vụ bản lề cho nó. Kiểm thử API tốt dẫn đến một sản phẩm cuối cùng "khỏe mạnh" hơn nhiều. Đảm bảo rằng tất cả truy cập dữ liệu (đọc và ghi) chỉ đi qua API kiểm tra bảo mật, tuân thủ và được chứng nhận. Đảm bảo rằng API cung cấp chức năng hoàn chỉnh, cho phép dễ dàng mở rộng ứng dụng trong tương lai khi nhu cầu nghiệp vụ mới phát sinh.

Kiểm tra API khá quan trọng và rất cần thiết. Đây là một trong những lĩnh vực mà kiểm thử tự động được khuyến khích cao, đặc biệt là trong thế giới của DevOps, phát triển nhanh và chu kỳ phân phối liên tục. Cách mà thế hệ chúng ta đang hướng tới : Trí tuệ nhân tạo, Điện toán đám mây và IoT, sẽ sớm có nhu cầu cao hơn về kiểm tra API nghiêm ngặt. Nhiều dịch vụ mà chúng ta sử dụng hàng ngày dựa vào hàng trăm API kết nối khác nhau, nếu bất kỳ dịch vụ nào trong số đó không thành công thì dịch vụ sẽ không hoạt động. Kiểm tra API là điều cần thiết. Nếu bạn là người kiểm thử phần mềm, kiểm tra API là kỹ năng cần phải có trong kho vũ khí của bạn.

Bài viết được dịch từ nguồn : http://www.softwaretestingstudio.com/api-testing-tools/