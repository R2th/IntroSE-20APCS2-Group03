![](https://images.viblo.asia/67e9c30c-ed16-42fe-ae8b-72114c918d8e.png)

Vậy là bạn đã bắt đầu hành trình phát triển ứng dụng web. Bạn có ý tưởng, nhưng xây dựng một kiến trúc đúng cũng cực kỳ quan trọng.

Trong bài viết này chúng ta sẽ cùng thảo luận những mục sau:

* Software architecture là gì?
* Tại sao nó lại quan trọng?
* Khác biết giữa software architecture và software design
* Software architecture patterns
* Làm thế nào để quyết định số layer của ứng dụng (n-tiers)
* Horizontal và vertical scaling… Cách nào phù hợp cho ứng dụng?
* Monolith hay Microservice?
* Khi nào nên dùng SQL hay NoSQL
* Chọn đúng công nghệ
* Làm sao để trở thành software architect
* Làm gì tiếp theo?

Mục tiêu của bài viết là trình bày nền tảng của web architecture và các khái niệm đi kèm, và cách chọn đúng kiến trúc cũng như công nghệ khi thiết kế ứng dụng. Sau bài viết này, bạn sẽ không còn mơ hô khi thiết kế ứng dụng từ đầu nữa.


### I. Software architecture là gì?

Software architecture của hệ thống mô tả các component chính, mối quan hệ của chúng,  và cách chúng tương tác với nhau.

Nó được xem như một bản thiết kế chi tiết, cung cấp mô hình để quản lý hệ thống và thiế lập cũng như điều phối giao tiếp giữa các component.

![](https://images.viblo.asia/266baef7-2bb3-4158-a299-22d5292c0005.jpg)

Đây là một vài điểm chính:
* Kiến trúc xác định một giải pháp để đáp ứng các yêu cầu kỹ thuật và vận hành. với mục tiêu chung là performance và bảo mật.
* Thiết kế kiến trúc là kế hợp  giữa nhu cầu của tổ chức cũng như nhu cầu của đội ngũ phát triển. Mỗi quyết định cần được xem xét ảnh hướng đến chất lượng, performance như thế nào.

Một trong những định nghĩa yêu thích của tôi về software architecture là từ Ralph Johnson, tác giả cuốn Design Patterns: Elements of Reusable Object-Oriented Software. Ông nói rằng:

>> Đó là một quyết định mà bạn muốn làm đúng ngay từ khi bắt đầu dự án.


### II. Tại sao software architecture quan trọng?

Nhân tố chính làm nên thành công khi tạo dựng bất cứ thứ gì chính là làm đúng phần cơ sở. Dù là xây nhà hay làm pizza, nếu phần gốc không ổn thì ta phải bắt đầu lại, không còn cách nào khác.

Xây dựng một ứng dụng web cũng vậy. Kiến trúc là nền tảng và phải được suy nghĩ cẩn thận để tránh những thay đổi lớn về thiết kế và refactor code sau này. Nhiều kỹ sư sẽ nói rằng bạn không muốn phải thiết kế lại. Nó sẽ ăn mòn thời gian như lỗ đen, làm chậm ngày realease đến cả tháng, thậm chí lãng phí nhân lực cũng như tài chính.

Tùy thuộc vào giai đoạn nào đó trong quy trình phát triển, chúng ta gặp phải bế tắc do những quyết định trong pha thiết kế ban đầu. Bởi vậy, trước khi bắt tay vào code, tốt nhất là làm đúng phần cơ sở đã.

Mặc dù phát triển phần mềm là quá trình lặp đi lặp lại và cải tiến, không phải lúc nào cũng phải làm mọi thứ hoàn hảo từ khi bắt đầu. Tuy nhiên đó cũng không phải là lý do biện minh cho việc thiết kế kiến trúc có vấn đề được.

### III. Khác biệt giữa software architecture và software design

Mọi người thường nhầm lẫn giữa software design và architecture nên chúng ta sẽ làm rõ.

Software architecture được dùng để xác định phần khung và các component cấp cao của hệ thống, và cách chúng làm việc với nhau. Chẳng hạn, bạn cần một kiến trúc serverless chia nhỏ ứng dụng thành 2 component: BaaS (backend-as-a-service) và FaaS (functions-as-a-service), hoặc bạn cần một kiến trúc microservice mà các chức năng được chia thành các modules riêng biệt.

Lựa chọn một kiến trúc sẽ xác định cách bạn xử lý performance, fault tolerance, tính mở rộng.

Software design chịu trách nhiệm ở mức độ code design, module được code như thế nào, class scope, mục đích function. Khi sử dụng đúng thì lập trình viên sẽ làm việc hiệu quả hơn, tránh sáng tạo lại vòng quay. Chúng cũng cung cấp một ngôn ngữ chung để khái niệm hóa các vấn đề lặp đi lặp lại và giải pháp xử lý khi gặp phải.

### IV. Software architecture patterns

#### Client-server

Kiến trúc làm việc dựa trên mô hình *request-response*. Client gửi request đến server để lấy thông tin và server trả dữ liệu về.

Mọi website bạn truy cập như blog, Facebook, Twitter đều được xây dựng trên kiến trúc client-server.

![](https://images.viblo.asia/298eb1d7-bce3-491d-9711-d8717c23477e.jpg)

#### Peer-to-peer

Mạng P2P là một mạng lưới mà mỗi máy tính được xem như một *node* liên lạc với nhau mà không cần một server tập trung. Sự vắng mặt của server tập trung sẽ loại bỏ được vấn đề *single point of failure*. Tất cả máy tính trong mạng đều có quyền như nhau. Mỗi *node* vừa đóng vai *seeder*, vừa đóng vai *leecher* cùng một lúc, nên dù một số máy tính (*node*) không hoạt động thì hệ thống vẫn chạy tiếp.

P2P chính là nền tảng của công nghệ blockchain.

![](https://images.viblo.asia/fa1097f9-6b65-4fbc-9022-0ca997e031c6.jpg)

#### Model-View-Controller (MVC)

Kiến trúc MVC là *software architectural pattern* mà ở đó logic của ứng dụng được chia thành 3 component dựa theo chức năng. Các component được gọi là: Models - biểu diễn cách dữ liệu được lưu trữ trong database, Views - hiển thị thông tin cho user, Controllers - component hoạt động như một interface giữa model và view.

Kiến trúc MVC được sử dụng ở phần mềm desktop cũng như web và mobile.

![](https://images.viblo.asia/c9bf7248-a385-4345-b380-5a1d703d2a5c.png)

#### Microservices

Trong kiến trúc microservices, những chức năng khác nhau được chia thành cách module riêng biệt, liên kết với nhau để tạo thành một *service* lớn.

Kiến trúc đặc biệt này giúp việc bảo trì, phát triển tính năng, test và deploy dễ dàng hơn kiến trúc nguyên khối. 

![](https://images.viblo.asia/0497dadc-f5b2-426d-9838-4450462ee2ca.jpg)

#### Event driven

Kiến trúc Event-driven (hướng sự kiện) khá phổ biến trong phát triển ứng dụng ngày này.

Chúng có khả năng xử lý một số lượng lớn các kết nối đồng thời với mức tiêu thụ tài nguyên tối thiểu. Các ứng dụng hiện đại cần một mô hình không đồng bộ hoàn toàn để mở rộng quy mô (scaling).

![](https://images.viblo.asia/f7de4af3-f0d6-44de-a019-32d14286bcc1.jpg)

#### Layered
Pattern này được dùng để cấu trúc chương trình mà có thể được phân tách thành các nhóm nhỏ, mỗi nhóm ở một mức độ trừu tượng hóa khác nhau. Mỗi layer cung cấp *service* cho layer ở mức cao hơn.

Dưới đây là một số layer thường gặp:

* Presentation layer
* Application layer
* Business logic layer
* Data access layer

#### Hexagonal
Kiến trúc này gồm 3 component:
* Ports
* Adapters
* Domain

Trọng tâm của kiến trúc này là làm cho các component khác nhau của ứng dụng trở nên độc lập, kết nối lỏng & dễ test.

Pattern này sẽ lấy *domain* làm core, là các logic về business. Các layer bên ngoài là *Ports* và *Adapters*. Ports hoạt động như một API, cũng như một interface. Tất cả input sẽ phải thông qua interface.

![](https://images.viblo.asia/7cc1b665-bfa4-42e5-8a79-0220fe073dd0.jpg)

### V. Làm cách nào để quyết định xem số tier của ứng dụng

#### Ứng dụng một lớp
Ưu:
* Không có độ trễ
* Dữ liệu truyền tải nhanh
* Dữ liệu không cần truyền qua mạng, đảm bảo an toàn

Nhược:
* Khó thiết kế chức năng mới
* Testing phải cực kỳ kỹ lưỡng
* Dễ bị reverse engineered

#### Ứng dụng 2 lớp
Ưu:
* Database server và business logic gần nhau (về mặt vật lý), nên performance sẽ cao

Nhược:
* Vì client giữ hầu hết logic của ứng dụng, vấn đề nảy sinh khi cần kiểm soát version của ứng dụng và phân phối ứng dụng mới.
* Thiếu tính mở rộng vì nó chỉ hỗ trợ một số ít người dùng, performance giảm khi có nhiều người dùng request
* Khó để tái sử dụng

#### Ứng dụng 3 lớp
Ưu:
* Đặt logic business ở server tập trung nên dữ liệu được đảm bảo an toàn
* Khả năng mở rộng hệ thống là có

Nhược:
* Cần nhiều effort hơn khi tạp ứng dụng 3 lớp vì số điểm liên lạc sẽ tăng

#### Ứng dụng N lớp
Ưu:
* Tất cả ưu điểm của mô hình 3 lớp
* Perfomance tăng

Nhược:
* Do sự cấu thành của các lớp, nên càng nhiều lớp thì càng phức tạp khó cài đặt và khó bảo trì

#### Tổng kết
* Nên chọn mô hình 1 lớp nếu không muốn mạng có độ trễ
* Chọn mô hình 2 lớp khi cần tối thiểu hóa *network latency* và cần nhiều quyền kiểm soát ứng dụng
* Chọn mô hình 3 lớp khi cần kiểm soát code/logic ứng dụng và muốn nó bảo mật hơn
* Chọn mô hình N lớp khi cần scale và xử lý nhiều dữ liệu


### VI. Horizontal hay vertical scaling… 

Nếu ứng dụng chỉ là một tiện ích hoặc công cụ với một số lượng traffic dự kiến ổn định thì đây không phải vấn đề, ví dụ như một công cụ nội bộ của tổ chức. Tại sao phải lưu trữ ở môi trường phân tán? Một server là đủ để quản lý lưu lượng truy cập, bạn nên scale *vertical* khi bạn biết traffic sẽ không tăng đột biến.

![](https://images.viblo.asia/47719303-c872-4563-83fc-93d2bfcfabf8.jpg)

Nếu ứng dụng của bạn là một ứng dụng kiểu như mạng xã hội, fitness, ... thì traffic có thể tăng theo cấp số nhân trong tương lai gần. Với trường hợp này thì tính khả dụng cũng như khả năng scale *horizontal* là rất quan trọng.

![](https://images.viblo.asia/7caf9007-e03c-424d-84a5-52cc57be3a9d.jpg)

Tốt nhất là build và deploy lên cloud và luôn có mindset là *horizontal scaling* từ khi bắt đầu.

### VII. Monolith hay Microservice?

![](https://images.viblo.asia/8554ac50-3b63-46d0-82ac-cf4ff3c8280f.png)
#### Khi nào dùng kiến trúc monolithic

Ứng dụng monolithic phù hợp với những yêu cầu đơn giản, ứng dụng chỉ xử lý một lượng traffic hữu hạn Ví dụ như công cụ tính toán thuế nội bộ của tổ chức.

Đây là những trường hợp mà business được xác định lưu lượng truy cập sẽ không có tăng trưởng theo cấp số nhân

Cũng có những trường hợp trong đó các nhóm phát triển quyết định bắt đầu với kiến trúc monolithic và sau đó mở rộng ra kiến trúc microservice phân tán. Điều này giúp họ xử lý được độ phức tạp của ứng dụng từng bước một.

#### Khi nào dùng kiến trúc microservice

Kiến trúc microservice phù hợp với những ứng dụng phức tạp với lưu lượng truy cập lớn.

Những ứng dụng kiểu mạng xã hội có nhiều component khác nhau như messaging, real-time chat, LIVE video streaming, image upload, like, share ...

Trong trường hợp này, tôi đề nghị phát triển mỗi component tách biệt, mỗi component là một codebase riêng.

Chúng ta có 3 hướng tiếp cận:
* Chọn kiến trúc monolithic
* Chọn kiến trúc microservice
* Bắt đầu với monolithic và đổi thành microserver sau này

### Khi nào dùng NoSQL hoặc SQL?

**Khi nào dùng SQL database?**

Nếu bạn viết ứng dụng stock trading, banking hoặc ứng dụng tài chính hoặc cần lưu trữ nhiều mối quan hệ, chẳng hạn các ứng dụng mạng xã hội như Facebook, thì bạn nên chọn cơ sở dữ liệu quan hệ, lý do:

**Transactions và Data Consistency**

Nếu phần mềm cần làm việc với tiền và các con số thì nó cần *transaction*, ACID, data consistency. Và cơ sở dữ liệu quan hệ đáp ứng tốt điều đó.

**Lưu trữ Relationships**
Nếu dữ liệu có nhiều relationship thì không gì tốt hơn cơ sở dữ liệu quan hệ.

**Cơ sở dữ liệu quan hệ phổ biến**

* MySQL
* Microsoft SQL Server
* PostgreSQL
* MariaDB

#### Khi nào chọn NoSQL

Đây là một vài lý do

**Xử lý read/write nhiều**

Khi cần scale nhanh thì nên xài NoSQL, chẳng hạn khi có một lượng lớn hành vi read/write trên website và cần xử lý dữ liệu lớn, NoSQL sẽ đáp ứng hoàn hảo cho những kịch bản như vậy.

**Phân tích dữ liệu**

NoSQL databases cũng phù hợp cho phân tích dữ liệu.

**NoSQL databases phổ biến:**

* MongoDB
* Redis
* Cassandra
* HBASE

### VIII. Chọn đúng công nghệ

#### Tương tác dữ liệu real time

Nếu ứng dụng cần:

* Tương tác real-time với backend, như mesasging, audio-video streamming
* persistent connection giữa client và server, và một công nghệ non-blocking ở back-end.

#### Ứng dụng Peer-to-peer

Nếu bạn có ý định xây dựng ứng dụng web P2P, công cụ tìm kiếm phân tán P2P hoặc dịch vụ radio P2P Live TV, tương tự LiveStation của Microsoft, thì bạn sẽ muốn xem xét JavaScript, các giao thức như DAT, IPFS. Tìm hiểu FreedomJS, một framwork để xây dựng các ứng dụng web P2P mà hoạt động được trên các trình duyệt web hiện đại.

#### Ứng dụng CRUD-based

Nếu chỉ đơn giản là CRUD thì một vài công nghệ sau là đủ:Spring MVC, Python Django, Ruby on Rails, PHP Laravel, ASP .NET MVC.

#### Ứng dụng đơn giản

Nếu bạn có ý định viết một ứng dụng đơn giản như blog, online form, tích hợp với social media nhúng bằng IFrame thì bạn có thể chọn PHP.

Bạn cũng có thể xem xét các framwork khác như Spring boot, Ruby on Rails. Nhưng hosting PHP sẽ có chi phí ít hơn nhiều so với hosting của các công nghệ khác.

#### Ứng dụng sử dụng nhiều CPU và bộ nhớ

Bạn cần chạy các ứng dụng tính toán nặng mà ngốn CPU và bộ nhớ như xử lý dữ liệu lớn, xử lý song song?

Công nghệCông nghệ thường được sử dụng để viết các hệ thống có thể mở rộng, phân tán là C ++. Nó có các tính năng hỗ trợ thao tác bộ nhớ cấp thấp, cung cấp nhiều quyền kiểm soát bộ nhớ hơn cho các developer khi viết các hệ thống phân tán. Phần lớn các loại tiền điện tử được viết bằng ngôn ngữ này.

Rust là một ngôn ngữ lập trình tương tự như C ++.  Java, Scala và Erlang cũng là một lựa chọn tốt. Hầu hết các hệ thống quy mô lớn được viết bằng Java.

Go là ngôn ngữ lập trình của Google để viết ứng dụng cho các máy multi-core và xử lý một lượng lớn dữ liệu.

Julia là một ngôn ngữ lập trình động được xây dựng tính toán và phân tích số với hiệu năng cao.

### IX. Trở thành software architect?

Nếu những điều ở đây trông có vẻ thú vì thì có vẻ bạn muốn trở thành software architect. Nhưng phải bắt đầu từ đâu? Hầu hết kỹ sư phần mềm đều làm việc vài năm trước khi đảm nhận việc thiết kế kiến trúc.

Một trong những cách để làm quen với software architecture là thiết kế ứng dụng web cho riêng bạn, điều này sẽ buộc bạn phải suy nghĩ mọi khía cạnh của ứng dụng, từ load balacing, messge queue, streaming processing, caching ... Khi bạn bắt đầu hiểu được những khái niệm này nằm ở phần nào trong ứng dụng thì bạn đã trên con đường trở thành software architect.

Bạn cũng cần không ngừng học hỏi và tiếp thu những xu hướng công nghệ mới nhất, bắt đầu bằng học thêm vài ngôn ngữ lập trình.

### X. Tổng kết
Mặc dù nói khá nhiều trong bài viết, nhưng chúng ta chưa đi vào chi tiết, vẫn chưa trình bày về REST APIs.t to explore REST APIs, high availability, and CAP theorem.

Bạn có thể tìm hiểu về các phong cách kiến trúc khác nhau như client-server, kiến trúc phi tập trung ngang hàng, microservice, các nguyên tắc cơ bản của luồng dữ liệu trong một ứng dụng web, các lớp khác nhau có liên quan như thế nào, các khái niệm như khả năng mở rộng, tính sẵn sàng cao và nhiều hơn nữa.

Ngoài ra, bạn sẽ phải kinh nghiệm qua các kỹ thuật chọn đúng kiến trúc và technology stack để sử dụng, hiểu được sự đánh đổi công nghệ liên quan đến nhau như thế nào.

Tham khảo: https://hackernoon.com/how-to-design-a-web-application-software-architecture-101-eecy36o5