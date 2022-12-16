## Elasticsearch là gì ?
Elaticsearch là một công cụ phân tích và tìm kiếm nguồn mở phân tán cho tất cả các loại dữ liệu, bao gồm văn bản, số, không gian địa lý, có cấu trúc và không cấu trúc. Elaticsearch được xây dựng trên Apache Lucene và được phát hành lần đầu tiên vào năm 2010 bởi Elaticsearch N.V. (bây giờ được gọi là Elastic). Được biết đến với các API REST đơn giản, tính chất phân tán, tốc độ và khả năng mở rộng, Elaticsearch là thành phần trung tâm của Elastic Stack, một bộ công cụ nguồn mở để nhập dữ liệu, làm giàu, lưu trữ, phân tích và trực quan hóa dữ liệu.
## Những công ty sử dụng elaticsearch ?
Dưới đây là một số công ty lớn đang sử dụng Elasticsearch
![](https://images.viblo.asia/2b218031-f161-4da5-aa49-daf3184ac0e2.jpg)
## Tại sao nên sử dụng Elaticsearch?
### Elaticsearch nhanh. 
Bởi vì Elaticsearch được xây dựng trên Lucene, nó vượt trội trong tìm kiếm toàn văn. Elaticsearch cũng là một nền tảng tìm kiếm gần thời gian thực, có nghĩa là độ trễ từ khi tài liệu được lập chỉ mục cho đến khi nó có thể tìm kiếm được rất ngắn - thường là một giây. Do đó, Elaticsearch rất phù hợp cho các trường hợp sử dụng nhạy cảm với thời gian như phân tích bảo mật và giám sát cơ sở hạ tầng.
### Elaticsearch được phân tán tự nhiên. 
Các tài liệu được lưu trữ trong Elaticsearch được phân tán trên các containers khác nhau được gọi là shards**, được sao chép để cung cấp các bản sao dự phòng của dữ liệu trong trường hợp lỗi phần cứng. Bản chất phân tán của Elaticsearch cho phép nó mở rộng ra hàng trăm (thậm chí hàng nghìn) máy chủ và xử lý hàng petabyte dữ liệu.
### Elaticsearch đi kèm với một loạt các tính năng. 
Ngoài tốc độ, khả năng mở rộng và khả năng phục hồi, Elasticsearch còn có một số tính năng tích hợp mạnh mẽ giúp lưu trữ và tìm kiếm dữ liệu hiệu quả hơn, chẳng hạn như data rollups và quản lý vòng đời index.
### Elastic Stack đơn giản hóa việc nhập dữ liệu, trực quan hóa và report. 
Tích hợp với Beats và Logstash giúp dễ dàng xử lý dữ liệu trước khi lập index vào Elaticsearch. Và Kibana cung cấp trực quan hóa thời gian thực dữ liệu Elaticsearch cũng như UI để truy cập nhanh vào giám sát hiệu suất ứng dụng (APM), logs và dữ liệu số liệu cơ sở hạ tầng.
## Các khái niệm cơ bản
### Cluster.
Như tên của nó, Elasticsearch cluster là một nhóm gồm một hoặc nhiều **nodes**(servers) được kết nối với nhau. Sức mạnh của Elasticsearch cluster nằm ở việc phân phối các tác vụ, tìm kiếm và lập chỉ mục, trên tất cả các **node** trong cluster. Một cluster được xác định bởi một tên duy nhất mà theo mặc định là "elaticsearch". Tên này rất quan trọng vì một node chỉ có thể là một phần của cluster nếu node được thiết lập để tham gia cluster theo tên của nó.
### Node.
là một single server là một phần của **cluster**, lưu trữ dữ liệu của bạn và tham gia vào các khả năng tìm kiếm và lập chỉ mục. Giống như một cluster, một nút được xác định bởi một tên mà theo mặc định là một IDentifier duy nhất(UUID) được gán cho node khi khởi động. Bạn có thể xác định bất kỳ tên node nào bạn muốn nếu bạn không muốn mặc định. Tên này rất quan trọng cho mục đích quản trị, nơi bạn muốn xác định máy chủ nào trong mạng của mình tương ứng với các node trong cụm Elaticsearch của bạn.

Một node có thể được cấu hình để tham gia một cluster cụ thể theo tên cluster. Theo mặc định, mỗi node được thiết lập để tham gia một cluster có tên là elaticsearch.

Theo mặc định, một node là tất cả các loại sau: master-eligible, data, ingest, and machine learning (nếu có).
### Index.
Một index là một tập hợp các tài liệu có một số đặc điểm tương tự. Ví dụ: bạn có thể có một index cho dữ liệu khách hàng, một index khác cho danh mục sản phẩm và một index khác cho dữ liệu đơn hàng. Một index được xác định bằng một tên (phải là chữ thường) và tên này được sử dụng để chỉ indẽ khi thực hiện lập index, tìm kiếm, cập nhật và xóa các hoạt động đối với các tài liệu trong đó.
### Shard & replicas.
Một index có khả năng lưu trữ một lượng lớn dữ liệu có thể vượt quá giới hạn phần cứng của một node. Ví dụ: một index của một tỷ documents chiếm 1TB không gian đĩa có thể không vừa với đĩa của một node hoặc có thể quá chậm để phục vụ các yêu cầu tìm kiếm từ một node duy nhất. Để giải quyết vấn đề này, Elaticsearch cung cấp khả năng chia nhỏ chỉ mục của bạn thành nhiều phần được gọi là shard.

Trong môi trường mạng hoặc đám mây nơi có thể xảy ra lỗi bất kỳ lúc nào, rất hữu ích và rất khuyến khích nên có cơ chế chuyển đổi dự phòng trong trường hợp shard / node bằng cách nào đó không hoạt động hoặc biến mất vì bất kỳ lý do gì. Để kết thúc này, Elaticsearch cho phép bạn tạo một hoặc nhiều bản sao chỉ muc của bạn được gọi là replica shards hoặc viết tắt là replicas.
### Document.
là một đơn vị thông tin cơ bản có thể được lập index. Ví dụ: bạn có thể có một document cho một khách hàng, một document khác cho một sản phẩm và một document khác cho một đơn hàng. Document này được thể hiện bằng JSON.

## Kết luận
Bài viết trên mình đã đưa ra các khái niệm cần biết, hi vọng sẽ giúp mọi người có một cái nhìn tổng quan về Elasticsearch.