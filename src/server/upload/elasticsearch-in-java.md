# 1. Overview
Trong bài viết này, chúng ta sẽ đi sâu vào một số khái niệm chính liên quan đến các công cụ tìm kiếm toàn văn bản, với trọng tâm đặc biệt là Elaticsearch.

Vì đây là một bài viết hướng Java, chúng ta sẽ không cung cấp hướng dẫn chi tiết từng bước về cách thiết lập Elaticsearch và hiển thị cách thức hoạt động của chương trình này, thay vào đó, chúng ta sẽ nhắm mục tiêu tới client Java, và cách sử dụng các tính năng chính như tạo index, delete, get và search.
# 2. Setup
Để cài đặt Elaticsearch, vui lòng tham khảo [official setup guide.](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)

Quá trình cài đặt khá đơn giản, chỉ cần tải xuống gói zip / tar và chạy tệp tập lệnh elaticsearch (elSTERearch.bat cho người dùng Windows).

Mặc định, Elaticsearch nghe cổng 9200 cho các truy vấn HTTP. Chúng ta có thể xác minh rằng nó được khởi chạy thành công bằng cách mở http: // localhost: 9200 / URL trong trình duyệt yêu thích của bạn:
```
{
  "name" : "GEpcsab",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "z3FfAe6gRMmSmeWBIOihJg",
  "version" : {
    "number" : "5.6.10",
    "build_hash" : "b727a60",
    "build_date" : "2018-06-06T15:48:34.860Z",
    "build_snapshot" : false,
    "lucene_version" : "6.6.1"
  },
  "tagline" : "You Know, for Search"
}
```
# 3. Maven Configuration
Bây giờ chúng ta đã có và chạy cụm Elaticsearch cơ bản, hãy chuyển thẳng sang máy client Java. Trước hết, chúng ta cần phải có Maven dependency được khai báo trong tệp pom.xml:
```
<dependency>
    <groupId>org.elasticsearch</groupId>
    <artifactId>elasticsearch</artifactId>
    <version>5.6.0</version>
</dependency>
```

Bạn luôn có thể kiểm tra các phiên bản mới nhất được lưu trữ bởi Maven Central với liên kết được cung cấp trước đó.
# 4. Java API
Trước khi chuyển thẳng sang cách sử dụng các tính năng API Java chính, chúng ta cần khởi tạo ứng dụng client:

```
Client client = new PreBuiltTransportClient(
  Settings.builder().put("client.transport.sniff", true)
                    .put("cluster.name","elasticsearch").build()) 
  .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));
```

## a. Indexing Documents
Hàm prepareIndex() cho phép lưu trữ một tài liệu JSON tùy ý và làm cho nó có thể searchable:
```
@Test
public void givenJsonString_whenJavaObject_thenIndexDocument() {
    String jsonObject = "{\"age\":10,\"dateOfBirth\":1471466076564,"
      +"\"fullName\":\"John Doe\"}";
    IndexResponse response = client.prepareIndex("people", "Doe")
      .setSource(jsonObject, XContentType.JSON).get();
       
    String id = response.getId();
    String index = response.getIndex();
    String type = response.getType();
    long version = response.getVersion();
        
    assertEquals(Result.CREATED, response.getResult());
    assertEquals(0, version);
    assertEquals("people", index);
    assertEquals("Doe", type);
}
```

Khi chạy test, hãy đảm bảo khai báo biến path.home, nếu không, sẽ có ngoại lệ sau:
```
java.lang.IllegalStateException: path.home is not configured
```

Sau khi chạy lệnh Maven:mvn clean install -Des.path.home=C:\elastic, tài liệu JSON sẽ được lưu trữ với mọi người dưới dạng index.

Lưu ý rằng có thể sử dụng bất kỳ thư viện Java JSON nào để tạo và xử lý tài liệu. Nếu không quen thuộc với bất kỳ điều nào trong số này, có thể sử dụng các trình trợ giúp Elaticsearch để tạo các tài liệu JSON của riêng mình.
```
XContentBuilder builder = XContentFactory.jsonBuilder()
  .startObject()
  .field("fullName", "Test")
  .field("dateOfBirth", new Date())
  .field("age", "10")
  .endObject();
IndexResponse response = client.prepareIndex("people", "Doe")
  .setSource(builder).get();
   
assertEquals(Result.CREATED, response.getResult());
```
## b. Querying Indexed Documents
Bây giờ chúng ta đã có một tài liệu JSON có thể tìm kiếm được index, chúng ta có thể tiến hành và tìm kiếm bằng phương thức prepareSearch():

```
SearchResponse response = client.prepareSearch().execute().actionGet();
List<SearchHit> searchHits = Arrays.asList(response.getHits().getHits());
List<Person> results = new ArrayList<Person>();
searchHits.forEach(
  hit -> results.add(JSON.parseObject(hit.getSourceAsString(), Person.class)));
```

Các kết quả được trả về bởi phương thức actionGet() được gọi là Số lần truy cập, mỗi lần truy cập đến một tài liệu JSON phù hợp với một request search.

Trong trường hợp này, danh sách kết quả chứa tất cả dữ liệu được lưu trữ trong cụm. Lưu ý rằng trong ví dụ này, chúng ta đang sử dụng thư viện FastJson để convert Chuỗi JSON thành các đối tượng Java.
```
SearchResponse response = client.prepareSearch()
  .setTypes()
  .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
  .setPostFilter(QueryBuilders.rangeQuery("age").from(5).to(15))
  .execute()
  .actionGet();
```

## c. Retrieving and Deleting Documents
Các phương thức prepareGet()  và prepareDelete () cho phép nhận hoặc xóa một tài liệu JSON khỏi cụm bằng cách sử dụng id của nó:
```
GetResponse response = client.prepareGet("people","Doe","1").get();
String age = (String) response.getField("age").getValue();
// Process other fields
DeleteResponse response = client.prepareDelete("people", "Doe", "5")
  .get();
```

Cú pháp khá đơn giản, bạn chỉ cần xác định index và giá trị loại cùng với id của object.
# 5. QueryBuilders Examples
Class QueryBuilders cung cấp nhiều phương thức static được sử dụng làm đối sánh động để tìm các mục cụ thể trong cluster. Trong khi sử dụng phương thức prepareSearch() để tìm kiếm các tài liệu JSON cụ thể trong cluster, chúng ta có thể sử dụng các trình tạo truy vấn để tùy chỉnh kết quả tìm kiếm.

Đây là danh sách các cách sử dụng API QueryBuilders phổ biến nhất.
Phương thức matchAllQuery() trả về một đối tượng QueryBuilder khớp với tất cả các tài liệu trong cluster:

```
QueryBuilder matchAllQuery = QueryBuilders.matchAllQuery();
```

RangeQuery() khớp với các tài liệu có giá trị của một field nằm trong một phạm vi nhất định:
```
QueryBuilder matchDocumentsWithinRange = QueryBuilders
  .rangeQuery("price").from(15).to(100)
```

Cung cấp tên field - ví dụ: FullName và giá trị tương ứng - ví dụ: John Doe, Phương thức matchQuery () khớp với tất cả tài liệu với giá trị của field chính xác:
```
QueryBuilder matchSpecificFieldQuery= QueryBuilders
  .matchQuery("fullName", "John Doe");
```

Chúng ta cũng có thể sử dụng phương thức multiMatchQuery () để xây dựng một phiên bản đa trường của truy vấn khớp:
```
QueryBuilder matchSpecificFieldQuery= QueryBuilders.matchQuery(
  "Text I am looking for", "field_1", "field_2^3", "*_field_wildcard");
```
# 6. Conclusion
Trong bài viết nhanh này, chúng ta đã xem cách sử dụng API Java của ElasticSearch để thực hiện một số tính năng phổ biến liên quan đến các công cụ tìm kiếm toàn văn bản.

Nguồn: Baeldung.