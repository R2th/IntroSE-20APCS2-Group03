Chào các bạn, hôm nay mình xin phép được trình bày một khái niệm về kiến trúc website.

# Mô hình kiến trúc website:
![](https://images.viblo.asia/318a7b89-b08d-473f-b16f-9a31fc44d891.png)

Đây là hình ảnh miêu tả luồng xử lý của một website hiện nay. Cũng khá dễ nhận thấy các thành phần của nó bao gồm:
* DNS
* Load Balancer
* Web Application Servers
* Database
* Catching Service
* Job Queue and Servers
* Full-text Search Service
* Services
* Data firehose and Data warehouse
* Cloud storage
* CDN
Và mình sẽ đi vào chi tiết từng bộ phận để giúp các bạn có cái nhìn chi tiết hơn về mô hình này nhé.

# DNS
* DNS được viết tắt bởi Domain Name Server, là một hệ thống cho phép thiết lập tương ứng giữa địa chỉ tên miền và IP trên Internet. Đây là xương sống của World Wide Web - một không gian thông tin toàn cầu mà mọi người có thể truy cập, đọc, viết thông qua các thiết bị kết nối với Internet. DNS chuyển đổi từ tên miền (vd: google.com) sang địa chỉ IP tương ứng của tên miền đó (cd: 123.456.789), việc này giúp cho máy tính của bạn có thể kết nối đến server thích hợp. Hệ thống tên miền cũng giống như danh bạ điện thoại của internet vậy, giúp mọi người dễ dàng ghi nhớ, tra cứu hơn vì tên miền là đoạn chữ có nghĩa thay vì phải tìm đến một server nào đó qua dãy số vô nghĩa.

# Load Balancer
* Load Balancer(Cân Bằng Tải) là việc phân bố đồng đều lưu lượng truy cập giữa hai hay nhiều các máy chủ có cùng chức năng trong cùng một hệ thống. Bằng cách đó, sẽ giúp cho hệ thống giảm thiểu tối đa tình trạng một máy chủ bị quá tải và ngưng hoạt động. Hoặc khi một máy chủ gặp sự cố, Cân Bằng Tải sẽ chỉ đạo phân phối công việc của máy chủ đó cho các máy chủ còn lại, đẩy thời gian uptime của hệ thống lên cao nhất và cải thiện năng suất hoạt động tổng thể.

* Giới thiệu về Horizontal Scaling và Vertical Scaling:
![](https://images.viblo.asia/9a5cb149-a4e2-4c1b-8bbf-121e5372362b.png)

Đây là hai cách cân bằng tải thường được sử dụng. Trong khi Horizontal Scaling nghĩa là phải thêm máy móc cho nguồn lực, thì Vertical Scaling là phải nâng cấp nguồn lực hiện tại (nâng cấp về RAM, CPU, ...).

Để hiểu rõ hơn về hai cách này, mình xin đưa ra ví dụ: trong khi phát triển web, bạn ít nhiều cũng sẽ gặp phải vấn đề về việc server thỉnh thoảng bị crash, mạng server không ổn định, dữ liệu ngoại tuyến. Đưa ra lựa chọn Horizontal Scaling sẽ giúp mọi việc đơn giản hơn do nếu bạn có nhiều server, khi một server gặp vấn đề thì bạn vẫn còn các server khác giúp cho web của bạn vẫn chạy. Một ưu điểm nữa là nhiều server có thể giúp bạn chia nhỏ công việc cho phần backend của web - database, web server, service,... bằng cách cho mỗi thứ chạy trên một server riêng. Khi các request được chuyển đến, chúng sẽ được phân phối đều tới các server dẫn đến việc không có một server nào bị quá tải. Còn việc lựa chọn Vertical Scaling là không khả thi vì khả năng nâng cấp máy tính cũng có giới hạn và việc để server phải xử lý quá nhiều việc dẫn đến quá tải.

# Web Application Servers
Đây đơn giản là nơi xử lý công việc logic, nghĩa là xử lý request từ phía user và trả lại code HTML cho trình duyệt. Để làm được việc này thì Web server phải được kết nối với cơ sở hạ tầng như database, caching layers, job queues, data queues, services, ... và nên dùng load balancer để xử lý khi lượng request từ user lớn. Bạn có thể dùng ngôn ngữ như Node.js, Ruby, PHP, Scala, Java, C# .NET và MVC framework cho ngôn ngữ đó: Express, Ruby on Rails, Play, Laravel để xây dựng web app servers.

# Database Servers
Hầu hết các ứng dụng web hiện tại đều sử dụng một hay nhiều database để lưu trữ dữ liệu. Database cung cấp nhiều cách để định nghĩa cấu trúc dữ liệu, thêm mới dữ liệu, tìm dữ liệu, sửa hay xóa dữ liệu đã có, tính toán dữ liệu, ... Trong một số  trường hợp, web app server sẽ nhận dữ liệu từ job servers thay vì lấy trực tiếp trong database. SQL và NoSQL là ngôn ngữ truy vấn mang tính cấu trúc, dùng để truy vấn, thao tác với Database.

# Caching Service
Caching service cung cấp kho dữ liệu key/value đơn giản để lưu trữ và tra cứu thông tin trong thời gian gần. Các ứng dụng thường tận dụng caching service để lưu trữ kết quả của các xử lý phức tạp để có thể lấy lại kết quả từ bộ nhớ đệm mà không phải thực hiện xử lý lần nữa. Cache có thể dùng để lưu kết quả truy vấn database, services, HTML từ url, ... Ví dụ như Google hay lưu kết quả search của những từ thông thường thay vì query lại mọi lần, Facebook lưu lại phần lớn những bài viết bạn thấy khi đăng nhập. Hiện tại có 2 hệ thống lưu trữ phổ biến là Redis và Memcache.

# Job Queues and Servers
Phần lớn các ứng dụng web có một số hoạt động bất đồng bộ không trực tiếp liên quan với kết quả trả về từ request từ user. Ví dụ như Google cần phải tìm trên toàn bộ dữ liệu trên Internet để trả về kết quả tìm kiếm cho người dùng. Việc này không xảy ra mỗi khi bạn tìm kiếm thứ gì đó mà nó sẽ được diễn ra bất đồng bộ trong một khoảng thời gian.

Job Queues là một danh sách các job đang cần được xử lý một cách bất đồng bộ. Phần lớn các job sẽ được hoạt động theo thời gian đã được lên kế hoạch từ trước hoặc job sẽ được chạy theo hoạt động của người dùng. Và Job Server là một server riêng nơi job sẽ được chạy.

# Full-text Search Service
Full-text search là cách tự nhiên nhất để tìm kiếm thông tin, hệt như Google, ta chỉ cần gõ từ khóa và nhấn enter thế là có kết quả trả về. Full-text search tận dụng inverted index để nhanh chóng tìm kiếm văn bảng có từ khóa cần tìm. Inverted index là kỹ thuật thay vì index theo từng đơn vị row(document) giống như mysql thì chúng ta sẽ biến thành index theo đơn vị term. Cụ thể hơn, Inverted index là một cấu trúc dữ liệu, nhằm mục đích map giữa term và các document chứa term đó.

![](https://images.viblo.asia/7cbc0b44-1bc7-4118-b82d-ec4b0fe91613.png)
Bức ảnh chỉ ra cách 3 tiêu đề được biến đổi thành inverted index

Ngoài cách full-text search trực tiếp từ database, thì cũng có thể có một search service riêng để phục vụ cho việc lưu trữ inverted index và cung cấp query interface. Hiện tại có một số platform phổ biến được sử dụng cho việc này là <a href="https://www.elastic.co/products/elasticsearch">Elasticsearch</a>, <a href="http://sphinxsearch.com/">Sphinx</a> hay là <a href="http://lucene.apache.org/solr/features.html">Apache Solr</a>.

# Services
Có một số service sẽ được chia nhỏ ra để chạy như một ứng dụng riêng, Web app và các Service khác có thể tương tác đến chúng. 
Ví dụ:
* Account service dùng để lưu trữ dữ liệu của tất cả các user qua các site.
* Content service dùng để lưu trữ lượng dữ liệu lớn về video, ảnh, file audio. Nó cũng cung cấp giao diện để tải nội dung và xem lịch sử tải.
* Payment service cung cấp giáo diện để trả phí qua thẻ tín dụng.

# Data
Ngày nay, các công ty tồn tại hay phá sản dựa trên việc họ khai thác dữ liệu như thế nào. Khi các app đạt đến trạng thái hoạt động ổn định, nó sử dụng quy trình xử lý dữ liệu để chắc chắn rằng dữ liệu được thu thập, lưu trữ, phân tích. Một quy trình xử lý dữ liệu điện hình có ba giai đoạn:
1. App gửi dữ liệu, thông qua tương tác user, đến data firehose để lưu trữ và xử lý dữ liệu. Thường thì dữ liệu gốc được biến đổi hoặc tăng thêm và chuyển đến cho firehose khác. <a href="https://aws.amazon.com/kinesis/">AWS Kinesis</a> và <a href="https://kafka.apache.org/">Kafka</a> là hai công nghệ thường sử dụng cho mục đích này.
2. Dữ liệu gốc sau khi được biến đổi sẽ được lưu trữ trong cloud storage. <a href="https://aws.amazon.com/kinesis/">AWS Kinesis</a> cung cấp thiết lập được gọi là firehose để lưu trữ dữ liệu gốc vào cloud storage (S3).
3. Dữ liệu đã biến đổi được đưa vào trong kho dữ liệu để phân tích. Sử dụng <a href="https://aws.amazon.com/redshift/">AWS Redshift</a> sẽ giải quyết được việc này.

# Cloud storage
<a href="https://aws.amazon.com/what-is-cloud-storage/">Cloud storage</a> là cách đơn giản để lưu trữ, truy cập và chia sẻ dữ liệu trên Internet thông qua AWS. Bạn có thể dùng nó để lưu trữ và truy cập đến mọi thứ bạn đã lưu trữ trên hệ thống thông tin cục bộ và có thể tương tác đến chúng qua Restful API. <a href="https://aws.amazon.com/s3/">Amazon S3</a> hiện nay là cloud storage phổ biến nhất để lưu trữ video, ảnh, audio, file css, js, ...

# CDN
CDN viết tắt bởi Content Delivery Network là mạng lưới gồm nhiều máy chủ lưu trữ đặt tại nhiều vị trí địa lý khác nhau, cùng làm việc chung để phân phối nội dung, truyền tải hình ảnh, CSS, Javascript, Video clip, Real-time media streaming, File download đến user. Cơ chế hoạt động của CDN giúp cho khách hàng truy cập nhanh vào dữ liệu máy chủ web gần họ nhất thay vì phải truy cập vào dữ liệu máy chủ web tại trung tâm dữ liệu.

![](https://images.viblo.asia/1cb29b8f-3ba7-4ff0-a618-7a29beb2a3de.png)

# Tổng kết
Bên trên là cái nhìn tổng quan về mô hình kiến trúc website. Mong rằng bài viết này có ích cho mọi người.

## Tham Khảo
* https://engineering.videoblocks.com/web-architecture-101-a3224e126947?ref=abhimanyu