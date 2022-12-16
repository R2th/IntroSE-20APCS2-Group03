Đây là bài 3 thuộc seri "Elastic là gì? Tôi có nên áp dụng vào dự án?" bạn có thể tham khảo chuỗi bài viết tại:

https://viblo.asia/s/elastic-la-gi-toi-co-nen-ap-dung-vao-du-an-QqKLvpm4l7z

### Chức năng chính của ElasticSearch

ElasticSearch cho phép bạn truy cập các chức năng đánh chỉ mục và tìm kiếm dữ liệu của Lucene. Về chức năng lập chỉ mục bạn có nhiều tuỳ chọn về xử lý văn bản và cách lưu trữ các văn bản đã được xử lý.

Khi tìm kiếm, bạn có nhiều câu truy vấn và bộ lọc để chọn. ElasticSearch hiển thị chức năng này thông qua REST API, cho phép bạn cấu hình câu truy vấn trong JSON và điều chỉnh hầu hết cấu hình, cho dù chúng cùng API.

Ngoài những chức năng Lucence cung cấp, ElasticSearch còn bổ xung chức năng cấp cao (high level), từ bộ nhớ đệm đến phân tích thời gian thực.

Ở mức độ trừu tượng khác là cách bạn có thể sắp xếp tài liệu: nhiều chỉ mục có thể tìm kiếm riêng hoặc cùng nhau, và bạn có thể đặt các loại tài liệu khác nhau trong mỗi chỉ mục.

ElasticSearch đúng như tên gọi của nó co giãn (elastic). Nó được phân cụm theo mặc định - bạn có thể gọi nó là một cụm (cluter) thậm chí khi bạn chỉ có một server duy nhất - và bạn luôn luôn có thể thêm nhiều server để tăng dụng lượng hoặc khả năng chịu lỗi.

### Mở rộng chức năng Lucene

Trong nhiều trường hợp, người dùng tìm kiếm dựa trên nhiều tiêu chí.

Ví dụ: ban có tiêu chí tìm kiếm trong nhiều field, một vài tiêu chí sẽ là bặc buộc và một số sẽ là tuỳ chọn.

Một trong những tính năng được đánh giá cao của ElasticSearch là REST API có cấu trúc tốt: bạn có thể cấu trúc (construct) câu truy vấn trong JSON để kết hợp nhiều loại truy vấn khác nhau bằng nhiều cách.

Trong cùng một REST API bạn có thể đọc và thay đổi các cài đặt, cũng như là các tài liệu đánh chỉ mục.

**Apeche Solr thì như thế nào?**

Nếu bạn đã từng nghe về Lucence, thì có lẽ bạn cũng nghe về Solr, một công cụ tìm kiếm phân tán và mã nguồn mở dựa trên Lucence. 

Trên thực tế, Lucence và Solr đã hợp nhất thành một dự án Apache duy nhất vào năm 2010, vì vậy bạn có thể tự hỏi làm thế nào để so sánh ElasticSearch với Solr.

Cả hai công cụ tìm kiếm này điều cung cấp chức năng giống nhau, và các tính năng được phát triển nhanh chóng trong mỗi phiên bản mới. 

Bạn có thể tìm kiếm những trang web so sánh, nhưng tôi khuyên là bạn nên cẩn trọng với những tin tức đó. Bên cạnh việc bị ràng buộc bởi các phiên bản, khiến cho những so sánh trở nên lỗi thời trong vài tháng, và nhiều lí do khác khiến chúng sai lệch.

Điều đó nói rằng, một vài sự thật lịch sử giúp giải thích nguồn gốc của 2 sản phẩm. Solr được tạo ra năm 2004 và ElasticSearch năm 2010. 

Khi ElasticSearch xuất hiện, mô hình phân tán của nó (được thảo luận trong phần dưới) sẽ giúp cho việc mở rộng (scale out) dễ dàng hơn các đối thủ cạnh tranh, điều này được thể hiện trong tên của chúng elastic (đàn hồi). Tuy nhiên trong thời gian đó, Solr cũng đã thêm sharding(phân đoạn) vào phiên bản 4.0, điều này khiến cho Solr cạnh tranh với ElasticSearch về mô hình phân tán và cũng như những khía cạnh khác.

Khi nói đến cách tài liệu được lập chỉ mục, một khía cạnh quan trọng là phân tích. Thông qua phân tích, những từ trong văn bản mà bạn lập chỉ mục trở thành thuật ngữ(term) trong ElasticSearch.

Ví dụ: Nếu bạn lập chỉ mục "bicycle race", phân tích có thể cung cấp thuật ngữ "bicycle", "race", "cycling" và "racing", khi bạn tìm kiếm một trong những thuật ngữ này, những tài liệu(document) tương ứng sẽ thêm vào kết quả. 

Quá trình xử lí phân tích cũng áp dụng tương tự khi bạn tìm kiếm, (được mô tả như hình bên dưới). Nếu bạn tìm kiếm "bicycle race" bạn sẽ không muốn tìm kiếm chính xác. Có lẽ bạn cần một tài liệu chứa 2 từ riêng lẽ.

Trước tiên bộ phân tích mặc định chia văn bản thành các từ riêng lẽ được phân cách bằng dầu phấy hoặc space(khoảng trống).  Sau đó chuyển thành chữ thường, "Bicycle Race" sẽ thành "bicycle" và "race". Có nhiều bộ phân tích khác nhau, và bạn có thể tự xây dựng riêng cho mình.

Tại thời điểm này, bạn có thể muốn biết hơn về "chỉ mục dữ liệu" được mô tả như hình dưới.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ufzredtag2_image.png)


Dữ liệu được sắp xếp trong tài liệu. Theo mặc định ElasticSearch lưu trữ dữ liệu hiện tại của bạn, và nó cũng lưu các thuật ngữ đã được phân tích vào chỉ mục đảo ngược(reverted index) để cho phép tìm kiếm dữ liệu nhanh và có liên quan.

Và bây giờ chúng ta sẽ tìm hiểu tại sao Elasticsearch lưu trữ dữ liệu theo hướng tài liệu và làm cách nào để nhóm các tài liệu theo loại và chỉ mục.

### Cấu trúc dữ liệu trong ElasticSearch

Không giống  như cơ sở dữ liệu quan hệ, lưu trữ dữ liệu vào hàng, ElasticSearch lưu trữ dữ liệu trong tài liệu. 

Tuy nhiên, ở một mức độ nào đó, 2 khái niệm này giống nhau. Với các hàng trong một bảng, bạn có các cột, với mỗi cột, mỗi hàng thì có 1 giá trị. Với tài liệu thì có key và value, cũng tương tự như vậy.

Sự khác biệt là một tài liệu thì linh hoạt hơn một hàng, lí do chính là trong ElasticSearch tài liệu được phân nhiều cấp. 

Ví dụ: Giống như cách bạn liên kết khoá với giá trị chuỗi "author" : "Joe". Một tài liệu có thể lưu mảng chuỗi "tag" : ["cycling", "bicycles"], hoặc thậm chí là cặp giá trị "author" : {"first_name": "Joe", "last_name": "Smith"}.

Tính linh hoạt này rất quan trọng bởi vì nó khuyến khích bạn lưu trữ những thực thế có cùng logic trong một tài liệu, trái ngược với việc lưu trữ ở các hàng và các bảng khác nhau.

Ví dụ: cách dễ nhất (và có thể là nhanh nhất) là lưu trữ tất cả dữ liệu một bài viết trong cùng một tài liệu. Bằng cách này, việc tìm kiếm sẽ nhanh bởi vì bạn không cần phải liên kết với các bảng khác.

Nếu bạn có nền tảng về SQL, bạn phải bỏ qua các chức năng join, ít nhất là trong phiên bản 1.76. Khi tất cả mọi thứ đã sẵn sàng, bạn có thể tải cài đặt ElasticSearch và bắt đầu.

### Cài đặt Java

Nếu bạn không có sẵn JRE (Java Runtime Environment), bạn sẽ phải cài đặt nó trước. Bất kỳ JRE nào cũng hoạt động được, miễn là phiên bản 1.7 trở lên.

Thông thường bạn cài đặt từ Oracle (www.java.com/en/download/index.jsp).

**Khắc phục sự cố "Không tìm thấy Java"**

Với ElasticSearch, cũng như những ứng dụng Java khác, điều này có thể xảy ra khi bạn tải và cài đặt Java, nhưng ứng dụng không thể khởi động được và thông báo rằng "không tìm thấy Java".

Đoạn mã của ElasticSearch tìm kiếm Java ở 2 nơi: biến môi trường JAVA_HOME và biến hệ thống.

Để kiểm tra xem biến JAVA_HOME đã được thiết lập hay chưa bạn sử dụng lệnh `env` trong hệ thống UNIX và lệnh `set` trong Windows. Để kiểm tra phiên bản của Java bạn sử dụng lệnh `java -version`.

Nếu nó hoạt động, thì Java đã được thiết lập trong đường dẫn (PATH). Nếu không hoạt động, thì bạn phải thêm JAVA_HOME vào biến môi trường, hoặc comment bên dưới, mình sẽ hỗ trợ bạn.

### Tải xuống và khởi động ElasticSearch

Với Java đã được cài đặt, bạn cần tải ElasticSearch và khởi động nó.

Tải về gói phù hợp với môi trường của bạn nhất. Những gói náy có thể được tải từ www.elastic.co/downloads/elasticsearch: Tar, ZIP, RPM, and DEB.

**Cho hệ điều hành UNIX**

Nếu bạn chạy trên Linux, Mac hoặc UNIX hệ điều hành UNIX, bạn có thể tải gói tar.gz. Sau đó bạn giải nén và khởi chạy ElasticSearch bằng lệnh sau:

`tar zxf elasticsearch-*.tar.gz`

`cd elasticsearch-*`

`bin/elasticsearch`

**Quản lý gói bằng HOMEBREW cho OS X**

Nếu bạn cần một cách cài đặt đơn giản hơn cho máy Mac, bạn có thể cài đặt Homebrew. Hướng dẫn cài đặt có thể tìm thấy tại http://brew.sh.

Với Homebrew, bạn có thể cài đặt ElasticSearch bằng câu lệnh sau:

`brew install elasticsearch`

Sau đó khởi động ElasticSearch bằng cách:

`elasticsearch`

**Gói ZIP**

Nếu chạy trên hệ điều hành Windows, bạn nên tải gói ZIP về, giản nén nó và sao đó chạy file `elasticsearch.bat` trong thư mục `bin`.

**Gói RPM hoặc DEB**

Nếu chạy trên Red Hat Linux, CentOS, SUSE, hoặc bất kỳ hệ điều hành nào làm việc với RPMs, hoặc Debian, Ubuntu, hoặc bất kỳ hệ thống nào làm việc với DEBs, thì bạn có thể sử dụng RPM và DEB được cung cấp bởi Elastic.

Bạn có xem cách cài đặt tại  www.elastic.co/guide/en/elasticsearch/reference/current/setup-repositories.html.

Một khi bạn đã cài đặt ElasticSearch, bạn cần phải thêm repository vào danh sách và chạy ElasticSearch bằng câu lệnh sau:

`systemctl start elasticsearch.service`

Nếu hệ thống bạn không có `systemctl` thì có thể chạy lệnh sau:

`% /etc/init.d/elasticsearch start`

Nếu bạn muốn nhìn thấy ElasticSearch đang làm gì, thì hãy quan sát log tại thư mục `/var/log/elastic- search/`. Nếu bạn cài đặt bằng TAR hoặc ZIP, bạn có thể tìm thấy chúng tại thư mục `logs/`.

### Kiểm tra hoạt động của ElasticSearch

Bây giờ ElasticSearch đã được cài đặt và khởi chạy. Chúng ta sẽ kiểm tra log được tạo ra trong suốt quá trình khởi động và kết nối REST API.

**Kiểm tra file log**

Khi lần đâu tiên bạn chạy ElasticSearch, sẽ thấy hàng loạt log hiện ra, cho biết những gì đang xảy ra. Chúng ta sẽ xem xét những dòng này có ý nghĩa là gì.

Những dòng đầu cung cấp thông tin về node: Tên mặc định của node là `kJhkPLX`, bạn có thể cấu hình lại theo tên bạn muốn. 

Ngoài ra còn có các thông tin về:  dung lượng có thể sử dụng, dung lượng hiện có, kích thước của heap, id của node, PID, phiên bản, hệ điều hành, và biến môi trường.

`
[2020-01-17T15:49:46,058][INFO ][o.e.e.NodeEnvironment    ] [kJhkPLX] using [1] data paths, mounts [[/ (/dev/disk1s1)]], net usable_space [24.7gb], net total_space [233.5gb], types [apfs]
[2020-01-17T15:49:46,061][INFO ][o.e.e.NodeEnvironment    ] [kJhkPLX] heap size [989.8mb], compressed ordinary object pointers [true]
[2020-01-17T15:49:46,063][INFO ][o.e.n.Node               ] [kJhkPLX] node name derived from node ID [kJhkPLXXQBq8pnV3lhX28w]; set [node.name] to override
[2020-01-17T15:49:46,063][INFO ][o.e.n.Node               ] [kJhkPLX] version[6.8.5], pid[83413], build[oss/tar/78990e9/2019-11-13T20:04:24.100411Z], OS[Mac OS X/10.14.5/x86_64], JVM[Oracle Corporation/Java HotSpot(TM) 64-Bit Server VM/1.8.0_202/25.202-b08]
[2020-01-17T15:49:46,064][INFO ][o.e.n.Node               ] [kJhkPLX] JVM arguments [-Xms1g, -Xmx1g, -XX:+UseConcMarkSweepGC, -XX:CMSInitiatingOccupancyFraction=75, -XX:+UseCMSInitiatingOccupancyOnly, -Des.networkaddress.cache.ttl=60, -Des.networkaddress.cache.negative.ttl=10, -XX:+AlwaysPreTouch, -Xss1m, -Djava.awt.headless=true, -Dfile.encoding=UTF-8, -Djna.nosys=true, -XX:-OmitStackTraceInFastThrow, -Dio.netty.noUnsafe=true, -Dio.netty.noKeySetOptimization=true, -Dio.netty.recycler.maxCapacityPerThread=0, -Dlog4j.shutdownHookEnabled=false, -Dlog4j2.disable.jmx=true, -Djava.io.tmpdir=/var/folders/c8/8nmz64pn7fs0x8yp50xldv300000gn/T/elasticsearch-7046467428247345908, -XX:+HeapDumpOnOutOfMemoryError, -XX:HeapDumpPath=data, -XX:ErrorFile=logs/hs_err_pid%p.log, -XX:+PrintGCDetails, -XX:+PrintGCDateStamps, -XX:+PrintTenuringDistribution, -XX:+PrintGCApplicationStoppedTime, -Xloggc:logs/gc.log, -XX:+UseGCLogFileRotation, -XX:NumberOfGCLogFiles=32, -XX:GCLogFileSize=64m, -Des.path.home=/usr/local/Cellar/elasticsearch/6.8.5/libexec, -Des.path.conf=/usr/local/etc/elasticsearch, -Des.distribution.flavor=oss, -Des.distribution.type=tar]`

Các Plugin được tải lên khi khởi chạy:

`[2020-01-17T15:49:46,968][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [aggs-matrix-stats]
[2020-01-17T15:49:46,968][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [analysis-common]
[2020-01-17T15:49:46,968][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [ingest-common]
[2020-01-17T15:49:46,968][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [ingest-geoip]
[2020-01-17T15:49:46,968][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [ingest-user-agent]
[2020-01-17T15:49:46,969][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [lang-expression]
[2020-01-17T15:49:46,969][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [lang-mustache]
[2020-01-17T15:49:46,969][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [lang-painless]
[2020-01-17T15:49:46,969][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [mapper-extras]
[2020-01-17T15:49:46,969][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [parent-join]
[2020-01-17T15:49:46,969][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [percolator]
[2020-01-17T15:49:46,969][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [rank-eval]
[2020-01-17T15:49:46,970][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [reindex]
[2020-01-17T15:49:46,970][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [repository-url]
[2020-01-17T15:49:46,970][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [transport-netty4]
[2020-01-17T15:49:46,970][INFO ][o.e.p.PluginsService     ] [kJhkPLX] loaded module [tribe]`

Cổng 9300 được sử dụng mặc định. Nếu bạn sử dụng Java API thay vì REST API thì đây là nơi bạn cần kết nối.

`[2020-01-17T15:49:50,473][INFO ][o.e.t.TransportService   ] [kJhkPLX] publish_address {127.0.0.1:9300}, bound_addresses {[::1]:9300}, {127.0.0.1:9300}`

Dòng tiếp theo: Master node đã được thiết lập và tên của nó là `kJhkPLX`. Mỗi cụm sẽ có một master node, chịu trách nhiệm cho biết nút nào trong cụm và nơi đặt tất cả phân đoạn (shards). Khi master node không có sẵn thì nút mới sẽ được chọn. Trong trường hợp bạn khởi tạo nút đầu tiên thì nút đó là master node của bạn.

`[2020-01-17T15:49:53,578][INFO ][o.e.c.s.MasterService    ] [kJhkPLX] zen-disco-elected-as-master ([0] nodes joined), reason: new_master {kJhkPLX}{kJhkPLXXQBq8pnV3lhX28w}{auKqCeD6Q5OKnODTFkpgKw}{127.0.0.1}{127.0.0.1:9300}`

Cổng 9200 được sử dụng để giao tiếp với HTTP. Đây là nơi bạn kết nối với REST API

`[2020-01-17T15:49:53,627][INFO ][o.e.h.n.Netty4HttpServerTransport] [kJhkPLX] publish_address {127.0.0.1:9200}, bound_addresses {[::1]:9200}, {127.0.0.1:9200}`

Dòng tiếp theo thông báo rằng node của bạn đã chạy. Vào thời điểm này bạn có thể kết nối và gửi các yêu cầu.

`[2020-01-17T15:49:53,627][INFO ][o.e.n.Node               ] [kJhkPLX] started`

GatewayService là thành phần của ElasticSearch chịu chức năng duy trì dữ liệu ổ đĩa, để bạn không bị mất dữ liệu nếu node bị hư:

`[2020-01-17T15:49:53,633][INFO ][o.e.g.GatewayService     ] [kJhkPLX] recovered [0] indices into cluster_state`

Khi bạn khởi tạo node, Gateway tìm trên ổ đĩa xem nếu có dữ liệu nào được lưu để Gateway có thể khôi phục. Trong trường hợp này, không có chỉ mục nào được khôi phục.

Phần lớn thông tin chúng ta xem xét trong log - từ tên node cho đến cài đặt gateway - điều có thể cấu hình được. Chúng ta sẽ xem xét cách cấu hình,và ý nghĩa trong một bài khác. Bây giờ bạn không cần phải chỉnh sửa gì thêm bởi vì các giá trị mặc định là cấu hình chuẩn cho các nhà phát triển.

**Chú ý:** Nếu bạn muốn khởi tạo ElasticSearch trên một máy tính khác nhưng cùng mạng, thì nó kết nối cùng 1 cụm (cluster), điều này dẫn đến những kết quả không mong đợi, như là những mảnh (shards) sẽ kết nối với nhau. Để ngăn chặn điều này bạn nên thay đổi tên của cụm (cluster) trong file cấu hình `elasticsearch.yml`.

### Sử dụng REST API

Cách kết nối với REST API đơn giản nhất là trỏ trình duyệt đến địa chỉ http://localhost:9200/.

Nếu bạn không cài đặt ElasticSearch trên máy local, bạn có thể thay đổi `localhost` bằng địa chỉ của máy kết nối. 

Theo mặc định ElasticSearch lắng nghe các yêu cầu của HTTP từ cổng 9200.

Nếu yêu cầu của bạn được tiếp nhận thì chuỗi JSON sẽ được trả về như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/m0gbth1rpw_image.png)

### Tổng kết

1. ElasticSearch là mã nguồn mở,  bộ máy tìm kiếm phân tán được xây dựng trên Apache Lucene.
2. Trường hợp sử dụng cho ElasticSearch là đánh chỉ mục với số lượng dữ liệu cực lớn, để bạn có thể sử dụng chức năng tìm kiếm full-text và thống kê trong thời gian thực.
3. Ngoài tính năng tìm kiếm full-text, bạn có thể điều chỉnh tìm kiếm liên quan để đưa ra đề xuất tìm kiếm.
4. Để bắt đầu, bạn tải gói tương ứng về, giải nén ra, và chạy ElasticSearch.
5. Để chỉ mục và tìm kiếm dữ liệu, cũng như là cài đặt cụm (cluster), sử dụng JSON thông qua HTTP API để lấy dữ liệu trả về bằng JSON.
6. Bạn có thể xem ElasticSearch như là NoSQL với chức năng tìm kiếm trong thời gian thực và khả năng phân tích. ElasticSearch theo hướng tài liệu và có thể được mở rộng theo mặc định.
7. ElasticSearch tự động chia dữ liệu ra các mảnh (shards), giúp cân bằng những server trong cụm (cluster). Điều này giúp dễ dàng thêm và xoá server. Mảnh(shards) có thể nhân bản để giúp bạn giải quyết vấn đề server bị lỗi.

### Tham khảo
Elasticsearch In Action (Matthew Lee Hinman and Radu Gheorghe)

### Góp ý
Các bạn bỏ ra 1 phút giúp mình nhé. Vui lòng để lại ý kiến của bạn để giúp người sau dễ đọc và dễ hiểu hơn.

Cảm ơn các bạn đã quan tâm bài viết này. Chúc các bạn 1 ngày tốt lành! 😃

Phúc Vưu.