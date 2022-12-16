## I. Elasticsearch là gì?

- Elasticsearch là một công cụ tìm kiếm dựa trên nền tảng Apache Lucene. Nó cung cấp một bộ máy tìm kiếm dạng phân tán, có đầy đủ công cụ với một giao diện web HTTP có hỗ trợ dữ liệu JSON. Elasticsearch được phát triển bằng Java và được phát hành dạng nguồn mở theo giấy phép Apache.
Elasticsearch (ES) cơ bản là "công cụ" hỗ trợ tìm kiếm văn bản, bất cứ cái gì có dạng văn bản text, string, file (PDF, word, excel) ...
Elasticsearch là một search engine.
Elasticsearch được kế thừa từ Lucene Apache
Elasticsearch thực chất hoặt động như 1 web server, có khả năng tìm kiếm nhanh chóng (near realtime) thông qua giao thức RESTful
Elasticsearch có khả năng phân tích và thống kê dữ liệu
Elasticsearch chạy trên server riêng và đồng thời giao tiếp thông qua RESTful do vậy nên nó không phụ thuộc vào client viết bằng gì hay hệ thống hiện tại của bạn viết bằng gì. Nên việc tích hợp nó vào hệ thống bạn là dễ dàng, bạn chỉ cần gửi request http lên là nó trả về kết quả.
Elasticsearch là 1 hệ thống phân tán và có khả năng mở rộng tuyệt vời (horizontal scalability). Lắp thêm node cho nó là nó tự động auto mở rộng cho bạn.
Elasticsearch là 1 open source được phát triển bằng Java

## II. Tại sao lại phải sử dụng Elasticsearch?
  - Tại sao phải dùng ES trong khi tìm kiếm văn bản có thể sử dụng câu lệnh like SQL cũng được?”
Nếu search bằng truy vấn LIKE "%one%" thì kết quả sẽ chỉ cần chứa "one" là ra. Ví dụ: "phone", "zone", "money", "alone" ... nói chung sẽ là 1 list kết quả không mong muốn Còn search bằng ES thì gõ "one" sẽ chỉ có "one" được trả về mà thôi
Truy vấn LIKE không thể truy vấn từ có dấu. Ví dụ: từ khoá có dấu là “có”, nếu truy vấn LIKE chỉ gõ “co” thì sẽ không trả về được chính xác kết quả
Về Perfomance thì ES sẽ là tốt hơn, truy vấn LIKE sẽ tìm kiếm đơn thuần toàn văn bản không sử dụng index, nghĩa là tập dữ liệu càng lớn thì tìm kiếm càng lâu, trong khi ES lại "đánh index" cho các trường được chọn để tìm kiếm

## III. Elasticsearch hoạt động như thế nào?
- Elasticsearch là 1 server riêng biệt để "phục vụ" việc tìm kiếm dữ liệu.
ES sẽ chạy 1 cổng (dưới local defaul là 9200). Người ta cũng có thể dùng ES là DB chính nhưng thường không ai làm thế vì cái gì cũng có nhiệm vụ riêng biệt của nó, ES không mạnh trong các thao tác CRUD, nên thường sẽ dùng song song với 1 DB chính (SQL, MySQL, MongoDB ...)

+ Quá trình hoạt động của ES sẽ được mô tả như sau:
Tạo Mapping
Reindex Data & Push Data lên Server ES
Get Data từ server ES về

## IV. Một số khái niệm cơ bản khác
+ Mapping Type
Mỗi một index có một hoặc nhiều mapping type, chúng được sử dụng để chia các documents trong một index thành các logical groups. Ví dụ có index my_index dùng để lưu trữ cả thông tin user và blogpost. User có thể được lưu trong user type nà blog posts trong một blogpost type

+ Cluster
Clustering là một kiến trúc nhằm đảm bảo nâng cao khả năng sẵn sàng cho các hệ thống mạng máy tính. Clustering cho phép sử dụng nhiều máy chủ kết hợp với nhau tạo thành một cụm có khả năng chịu đựng hay chấp nhận sai sót (fault-tolerant) nhằm nâng cao độ sẵn sàng của hệ thống mạng. Cluster là một hệ thống bao gồm nhiều máy chủ được kết nối với nhau theo dạng song song hay phân tán và được sử dụng như một tài nguyên thống nhất.

    Nếu một máy chủ ngừng hoạt động do bị sự cố hoặc để nâng cấp, bảo trì, thì toàn bộ công việc mà máy chủ này đảm nhận sẽ được tự động chuyển sang cho một máy chủ khác (trong cùng một cluster) mà không làm cho hoạt động của hệ thống bị ngắt hay gián đoạn. Quá trình này gọi là “fail-over”; và việc phục hồi tài nguyên của một máy chủ trong hệ thống (cluster) được gọi là “fail-back”.

     Trong ES, mỗi một cluster là một tập các node(server), cluster chứa toàn bộ dữ liệu đồng thời cung cấp khả năng đánh index và tìm kiếm trên toàn bộ các node thuộc cluster đó. Mỗi cluster được định danh bởi một tên duy nhất, nếu không chỉ định cụ thể thì tên mặc định của nó là elasticsearch

+ Node
Một node là một single server, là một phần của cluster, tham gia vào quá trình đánh index và tìm kiếm của cluster. Cũng giống như cluster mỗi node được định danh bởi một tên và được sinh ngẫu nhiên tại thời điểm khởi động hệ thống. Tất nhiên chúng ta có thể chỉ định tên cho các node này cho mục đích quản lý. Mỗi node có thể join với một cluster mặc định là join với elasticsearch cluster nếu không được chỉ định.

    Shards vs Replicas
    Problem: Một index chứa quá nhiều dữ liệu mà hardware không đáp ứng được hoặc việc tìm kiếm trên một index có quá nhiều dữ liệu sẽ làm giảm hiệu năng Solution: ES cung cấp cơ chế cho phép chia index thành nhiều phần nhỏ các phần này được gọi là shards. khi tạo một index có thể configure số lượng shards mà chúng ta muốn lưu trữ index này. Mỗi shards, bản thân nó là một index đầy đủ chức năng và độc lập do đó chúng có thể được host bởi bất kỳ node (server) nào.
## V. Cài đặt ElasticSearch và sử dụng câu lệnh để truy xuất dữ liệu trên ElasticSearch
+ Ở đây mình sử dụng ubuntu 16.04 và thao tác với Elasticsearch bằng comand line
+ Lệnh để chạy server elasticsearch$ sudo systemctl start elasticsearch.service:

    ```
    $ sudo systemctl start elasticsearch.service
    ```
 + Lệnh khởi tạo 1 index, mapping trong index đó và 1 document:
 
    ```
    $ curl -X PUT http://localhost:9200/team/_mapping/member
    ```
    
  + Khởi tạo thành công , màn hình sẽ trả về dòng 
    ```
    "acknowledged":true,"shards_acknowledged":true,"index":"team"}
    ```
     Là khởi tạo thành công index "team"
+ Lệnh liệt kê các index có trong ES:
    ```
    $ curl -X GET "localhost:9200/_cat/indices?v"
    ```
+  Lệnh tạo document của index: ở đây là thêm member với các trường thuộc tính
    ```
    $ curl -X PUT http://localhost:9200/team/_mapping/member?{&"properties"= {&"id"= { "type": "text" },&"name"= { "type": "text" },&"email"= { "type": "text" },&"age"= { "type": "integer" },&"phone"= { "type": "text" },&"image"= { "type": "text" },&"technologies"= {"type" : "text" }&}&}
    ```
  + Lệnh kiểm tra tất cả index đã khởi tạo:
    ```
    $ curl -X GET http://localhost:9200/team?pretty
    ```
+ Lệnh thêm, sửa dữ liệu vào index trên(team), ở đây là dữ liệu do mình fake ra theo cấu trúc của doc đã tạo ở trên và insert vào 
    ```
    $ curl -X PUT http://localhost:9200/team/member/_bulk?{"create"= { "_id": 1, "_type": "member"}&{"id"= "5510ce4ee174054836ef3c5a","name": "Vargas Rosa","email": "vargasrosa@zizzle.com","age": 25,"phone": "+1 (807) 530–3567","image": "http://api.randomuser.me/portraits/men/78.jpg","description": "enim Lorem upidatat et nostrud ut irure qui qui nulla qui deserunt fugiat laborum elit","technologies": "ios javascript python"}&{"create"= { "_id": 2, "_type": "member"}&{"id"= "5510ce4e24ecdab88fe18d06","name": "Navarro Thornton","email": "navarrothornton@zizzle.com","age": 34,"phone": "+1 (896) 579–3364","image": "http://api.randomuser.me/portraits/men/59.jpg","description": "sit enim velit cillum magna commodo tempor","technologies": "swift erlang java"}&{"create"= { "_id": 3, "_type": "member"}&{"id"= "5510ce4e6e7bbdbc120c9a89","name": "Francine Aguirre","email": "francineaguirre@zizzle.com","age": 30,"phone": "+1 (963) 492–3402","image": "http://api.randomuser.me/portraits/men/82.jpg","description": "cu et sit ullamco tempor Lorem excepteur magna pariatur","technologies": "javascript ionic ruby"}&{"create"= { "_id": 4, "_type": "member"}&{"id"= "5510ce4ebd2a509edd8c6b50","name": "Krystal Simmons","email": "krystalsimmons@zizzle.com","age": 40,"phone": "+1 (857) 418–2040","image": "http://api.randomuser.me/portraits/women/10.jpg","description": "ea dolor ex proident eiusmod et ut irure esse","technologies": "ruby c c"} 
    ```
 + Lệnh hiển thị thông tin các dữ liệu trong document và của từng doccument sau khi đã thêm
    ```
    $ curl -X GET http://localhost:9200/team/member/4?pretty
    ```
 + Lệnh tìm kiếm tất cả dữ liệu các document trong index sử dụng API Search
    ```
    $ curl -X GET http://localhost:9200/_search?pretty=true
    ```
 + Lệnh tìm kiếm theo text nhập ở tất cả các trường trong document , ở đây key search của mình là ruby, đây cũng chính là điểm mạnh của Elasticsearch, nó không giống với query like như thao tác với DB vì nó cần phải nhập đầy đủ text đó ví dụ như ruby ở trên sẽ trả về các document member có text là ruby trong tất cả các field
    ```
    $ curl -X GET http://localhost:9200/_search?q=ruby
    ``` 
    
 + Lệnh xóa 1 index 
    ```
     $ curl -X DELETE "localhost:9200/cuongquach-company"
    ```
##     VI. Tổng kết
+ Vẫn còn một số các hoạt động, các API để xử lý vào thao tác với Index trong Elasticsearch, nhưng với phần tìm hiểu của mình ở trên về một công cụ mạnh mẽ như elasticsearch là đủ để có thể thao tác, sử dụng và làm quen với elasticsearch. Các bạn có thể tham khảo ở các trang dưới đây.

    [https://www.tutorialspoint.com/elasticsearch/elasticsearch_search_apis.htm](https://www.tutorialspoint.com/elasticsearch/elasticsearch_search_apis.htm)
    [http://www.elasticsearchtutorial.com/elasticsearch-in-5-minutes.html](http://www.elasticsearchtutorial.com/elasticsearch-in-5-minutes.html)