## 1. NoSQL
NoSQL là một DMS không quan hệ, không yêu cầu lược đồ cố định, tránh các ghép nối và dễ dàng mở rộng, được sử dụng cho các kho dữ liệu phân tán, với nhu cầu lưu trữ dl khổng lồ. 
NoSQL được chia thành bốn loại chính:
1. Key-value stores
    * Là một bảng băm hoặc danh sách liên kết chứa cặp khóa key-value.
    * Độ phức tạp trung bình O(1).
    * CSDL tiêu biểu: Amazon DynamoDB, Redis, Riak, …
---
2. Document database
    * Dữ liệu lưu trữ và lấy ra là các tài liệu (định dạng: XML, JSON, BSON...).
    * Miêu tả chính nó, kế thừa cấu trúc DL cây.
    * Document là một phần của key-value.
    * CSDL tiêu biểu: MongoDB, RavenDB,Terastore,...
---
3. Wide column stores
    * Có thể lưu trữ dữ liệu trong nhiều cột trong mỗi dòng, với key cho từng dòng.
    * CSDL phổ biến: Cassandra, Hypertable,và Amazon DynamoDB.
---
4. Graph database
    * Lưu trữ các thực thể và quan hệ giữa các thực thể.
    * Các đối tượng là các nút, trong đó có các thuộc tính.
    * Các tổ chức của đồ thị cho phép dữ liệu được lưu trữ một lần và được giải thích theo nhiều cách khác nhau.
    * CSDL tiêu biểu: Neo4j, Infinite graph,...
 ---
## 2. Elasticsearch
Elasticsearch là công cụ tìm kiếm dựa trên nền tảng apache Lucene:
* Cung cấp API cho việc lưu trữ và tìm kiếm dl 1 cách nhanh chóng.
* Xây dựng & ptrien bằng ng2 java, dựa trên Lucene.
* Được xây dựng để hoạt động như một server cloud theo cơ chế RESTful
* Có thể tương tác và sd bởi nhiều ngôn ngữ => độ bảo mật không cao.
* Phù hợp với mục đích tìm kiếm và tổng hợp dữ liệu.
---
**Ưu điểm của Elasticsearch**

* Tốc độ nhanh, vượt trội trong tìm kiếm toàn văn, nền tảng tìm kiếm gần thời gian thực.
* Được phân tán tự nhiên: cho phép mở rộng ra hàng trăm, nghìn máy chủ và xử lý hàng petabyte dữ liệu.
* Tích hợp một số tính năng mạnh mẽ giúp lưu trữ và tìm kiếm DL hiệu quả hơn.
* Elastic stack đơn giản hóa việc nhập dữ liệu, trực quan hóa và report.
Khả năng mở rộng và tính sẵn sàng cao.
---
**Nhược điểm của Elasticsearch**

* Elasticsearch chỉ mạnh ở phần tìm kiếm, những nhiệm vụ khác thường kém hơn các db khác.
* Không đảm bảo tính toàn vẹn dữ liệu trong các hoạt động write, update, delete…
* Không cung cấp tính năng cho bảo mật và phân quyền, nên về bảo mật kém hơn các csdl khác.
---
**Các khái niệm trong Elasticsearch**
> So sánh với khái niệm trong MySQL
> | Elasticsearch | Mysql  | 
> | -------- | -------- |
> | Index    | Table     |
> | document   | Record     |
* Index: Tập hợp các tài liệu có một số đặc điểm tương tự. Một index chứa nhiều document.
* Document: là đơn vị nhỏ nhất để lưu trữ dữ liệu trong Elasticsearch, có thể được đánh chỉ mục(indexed).
* Node: là một single server là một phần của cluster. Mỗi node bao gồm nhiều shard.
* Cluster: Tập hợp các node hoạt động cùng nhau sẽ cùng thuộc tính 'cluster_name'. Chức năng chính của cluster là quyết định xem shards nào được phân bổ cho node nào.
* shard:là tập con các document của 1 index. Một index có thể chia thành nhiều shard.
    * primary shard: Lưu trữ dữ liệu và đánh replica shard.Mặc định, mỗi index có 5 primary shard và 1 primary shard có 1 replica shard đi kèm.
    * replica shard: Lưu trữ dữ liệu nhân bản của primary shard.
* segment: cho phép Lucene thêm tài liệu(document) vào index một cách dễ dàng.
> Lưu ý: số lượng primary shard cho một index không thể thay đổi được sau khi index đã được tạo.
---
**Ứng dụng của Lucene**
* Một shard thực chất là một Lucene index, đó mới là nơi thực sự lưu trữ dữ liệu.
* Một shard cũng là một search engine.
* Một Lucene index được tạo bởi nhiều segment (mỗi segment là một inverted index).
---