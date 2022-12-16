Mặc dù tìm kiếm là chức năng chính của Elaticsearch, việc tìm kiếm đúng có thể khó khăn và đôi khi thậm chí khó hiểu. Hướng dẫn này mình sẽ đưa bạn qua các truy vấn tìm kiếm và giúp các bạn hiểu hơn về truy vấn và có thể tự mình thiết lập truy vấn khi cần.
## Lucene queries
Elaticsearch là một phần của Elastic Stack và được xây dựng trên Lucene, thư viện tìm kiếm từ Apache và hiển thị cú pháp truy vấn Lucene. Nó có một phần không thể thiếu trong Elaticsearch mà khi bạn truy vấn root của Elaticsearch cluster, nó sẽ cho bạn biết phiên bản Lucene
```
{"name":"node-1","cluster_name":"my-cluster","cluster_uuid":"8AqSmmKdQgmRVPsVxyxKrw","version":{"number":"6.1.2","build_hash":"5b1fea5","build_date":"2018-01-10T02:35:59.208Z","build_snapshot":false,"lucene_version":"7.1.0","minimum_wire_compatibility_version":"5.6.0","minimum_index_compatibility_version":"5.0.0"},"tagline":"You Know, for Search"}
```
Biết cú pháp Lucene và toán tử sẽ  giúp bạn  đi một chặng đường dài trong việc xây dựng các truy vấn. Nó được sử dụng trong cả truy vấn chuỗi truy vấn đơn giản và chuẩn. Dưới đây là một số điều cơ bản
## Boolean Operators
Giống như hầu hết các ngôn ngữ máy tính, Elaticsearch hỗ trợ các toán tử AND, OR và NOT

**jack AND jill** - Sẽ trả về các dữ liệu chứa cả jack và jill.

**ahab NOT moby** - Sẽ trả lại các dữ liệu có chứa ahab nhưng không moby.

**tom OR jerry** - Sẽ trả lại các dữ liệu có chứa tom hoặc jerry hoặc cả hai.
## Fields
Bạn có thể đang tìm kiếm các sự kiện trong đó một lĩnh vực cụ thể có chứa các từ khóa tìm kiếm nhất định. Bạn xác định như sau

**name:”Ned Stark”**

Hãy cẩn thận với các giá trị có khoảng trắng, ví dụ như "Ned Stark". Bạn có thể đặt nó trong dấu ngoặc kép để đảm bảo rằng toàn bộ giá trị được sử dụng.

## Ranges
Bạn có thể tìm kiếm các trường trong một phạm vi cụ thể, sử dụng dấu ngoặc vuông cho tìm kiếm phạm vi bao gồm và dấu ngoặc nhọn cho tìm kiếm phạm vi không bao gồm:

**age:[3 TO 10]** - Sẽ trả lại các sự kiện có độ tuổi từ 3 đến 10

**price:{100 TO 400}** - Sẽ trả lại các sự kiện với giá từ 101 đến 399

**name: [Adam TO Ziggy]**  - Sẽ trả lại tên giữa và bao gồm Adam và Ziggy

Như bạn có thể thấy trong các ví dụ ở trên, bạn cũng có thể sử dụng các phạm vi trong các trường không phải là số như chuỗi và ngày.

## Wildcards, Regexes và Fuzzy Searching

Bạn có thể sử dụng ký tự * cho nhiều ký tự đại diện hoặc ký tự ? cho ký tự đại diện ký tự đơn

**Ma?s** - Sẽ phù hợp với  Mars, Mass, and Maps

**Ma*s** - Sẽ phù hợp với Mars, Matches, and Massachusetts

Regexes cung cấp cho bạn nhiều quyền lực hơn. Chỉ cần đặt regex của bạn giữa các dấu gạch chéo **(/)**:

**/p[ea]n/** - Sẽ phù hợp với pen và pan

**/<.+>/** - Sẽ phù hợp với văn bản giống như HTML tag

Fuzzy searching sử dụng Damerau-Levenshtein Distance để khớp với các thuật ngữ tương tự về chính tả. Điều này thật tuyệt khi tập dữ liệu của bạn có các từ sai chính tả. Sử dụng dấu ngã (~) cùng với một số để chỉ định khoảng cách giữa các từ có thể lớn đến mức nào:

**john ~ 2** - Sẽ phù hợp, trong số những người khác, jean, johns, jhon và horn

## URI Search
Cách dễ nhất để tìm kiếm cụm Elaticsearch của bạn là thông qua tìm kiếm URI. Bạn có thể chuyển một truy vấn đơn giản cho Elaticsearch bằng tham số truy vấn q. Truy vấn sau đây sẽ tìm kiếm toàn bộ cụm của bạn để tìm tài liệu có trường tên bằng với "travis":
```
curl “localhost:9200/_search?q=name:travis”
```

Với cú pháp Lucene, bạn có thể xây dựng các tìm kiếm khá ấn tượng. Thông thường, bạn sẽ phải mã hóa các ký tự được mã hóa URL như dấu cách (nó bị bỏ qua trong các ví dụ này cho rõ ràng)

```
curl “localhost:9200/_search?q=name:john~1 AND (age:[30 TO 40} OR surname:K*) AND -city”
```

Một số tùy chọn có sẵn cho phép bạn tùy chỉnh tìm kiếm URI, cụ thể về mặt sử dụng analyzer (analyzer).

Mặc dù tìm kiếm URI là một cách đơn giản và hiệu quả để truy vấn cụm của bạn, nhưng bạn sẽ nhanh chóng thấy rằng nó không hỗ trợ tất cả các tính năng được cung cấp cho bạn bởi Elaticsearch. Toàn bộ sức mạnh của Elaticsearch được bộc lộ thông qua Request Body Search. Sử dụng Request Body Search cho phép bạn xây dựng một yêu cầu tìm kiếm phức tạp bằng nhiều yếu tố và mệnh đề truy vấn sẽ khớp, lọc và sắp xếp cũng như thao tác với các tài liệu dựa trên nhiều tiêu chí.
## The Request Body Search
Request Body Search sử dụng một tài liệu JSON có chứa các yếu tố khác nhau để tạo tìm kiếm trên cụm Elaticsearch của bạn. Bạn không chỉ có thể chỉ định tiêu chí tìm kiếm, bạn cũng có thể chỉ định phạm vi và số lượng tài liệu mà bạn mong đợi trở lại, các trường mà bạn muốn và nhiều tùy chọn khác.

Phần đầu tiên của tìm kiếm là phần truy vấn sử dụng Query DSL. Sử dụng Query DSL đôi khi có thể gây nhầm lẫn vì DSL có thể được sử dụng để kết hợp và xây dựng các mệnh đề truy vấn thành một truy vấn có thể được lồng sâu

Để sử dụng Query DSL, bạn cần bao gồm một phần tử  "query" trong phần thân tìm kiếm của bạn và điền nó với một truy vấn được xây dựng bằng DSL:
```
{“query”: { “match”: { “_all”: “meaning” } } }
```
Trong trường hợp này, phần tử truy vấn  "query" có chứa một mệnh đề truy vấn "match", câu query trên tìm kiếm trong tất cả các trường trong tất cả các tài liệu trong cụm của bạn. Phần tử truy vấn được sử dụng cùng với các phần tử khác trong phần tìm kiếm

```
{“query”: {“match”: { “_all”: “meaning” }},“fields”: [“name”, “surname”, “age”],“from”: 100, “size”: 20}
```

Ở đây, chúng ta sử dụng phần tử trên các lĩnh vực  để hạn chế các trường nào sẽ được trả về và các phần tử từ các phần tử và các kích thước để báo cho Elaticsearch chúng tôi tìm kiếm các tài liệu từ 100 đến 119 (bắt đầu từ 100 và đếm 20 tài liệu).
## The Query DSL

Query DSL có thể được gọi bằng hầu hết các API tìm kiếm của Elaticsearch. Để đơn giản, chúng tôi sẽ chỉ nhìn vào API tìm kiếm sử dụng điểm cuối `_search`. Khi gọi API tìm kiếm, bạn có thể chỉ định index mà bạn muốn tìm kiếm, ví dụ:
Tìm kiếm trên tất cả các index Logstash
```
curl localhost:9200/logstash-*/_search
```
## Compound Queries

Mặc dù có nhiều loại mệnh đề truy vấn, nhưng loại bạn sử dụng nhiều nhất là Compound Queries vì nó sử dụng để kết hợp nhiều mệnh đề để xây dựng các truy vấn phức tạp.

Bool Query có lẽ được sử dụng nhiều nhất vì nó có thể kết hợp các tính năng của một số mệnh đề truy vấn ghép khác như các mệnh đề And, Or, Filter, và Not. Ví dụ

```
curl localhost:9200/_search -d ‘{"query":{"bool": {"must": {"fuzzy" : {"name": "john","fuzziness": 2}},"must_not": {"match": {"_all": "city"}},"should": [{"range": {"age": { "from": 30, "to": 40 }}},{"wildcard" : { "surname" : "K*" }}]}}}’
```
Trong phần tử truy vấn, chúng ta đã thêm mệnh đề bool chỉ ra rằng đây sẽ là truy vấn boolean. Có rất nhiều thứ đang diễn ra ở đó, vì vậy hay đi từng mệnh đề, bắt đầu từ đầu
### must

Tất cả các truy vấn trong mệnh đề này phải khớp với một tài liệu để nó được trả về bởi Elaticsearch. Hãy nghĩ về điều này như các truy vấn AND của bạn. Truy vấn chúng tôi sử dụng ở đây là truy vấn fuzzy  và nó sẽ khớp với bất kỳ tài liệu nào có trường tên trùng khớp với “john” theo cách mờ. Tham số phụ của fuzziness khác thông báo cho Elaticsearch rằng nó nên sử dụng Damerau-Levenshtein Distance 2 để xác định độ mờ.

### must_not

Bất kỳ tài liệu nào khớp với truy vấn trong mệnh đề này sẽ bị loại khỏi tập kết quả

### should
Cho đến bây giờ, chúng tôi đã xử lý tuyệt đối: **must** và **must_not**. **should** không tuyệt đối và tương đương với toán tử OR. Elaticsearch sẽ trả về bất kỳ tài liệu nào khớp với một hoặc nhiều truy vấn trong mệnh đề nên. Truy vấn đầu tiên mà chúng tôi cung cấp sẽ tìm các tài liệu có trường tuổi nằm trong khoảng từ 30 đến 40. Truy vấn thứ hai thực hiện tìm kiếm ký tự đại diện trên trường họ, tìm kiếm các giá trị bắt đầu bằng từ K.

Truy vấn chứa ba mệnh đề khác nhau, vì vậy Elaticsearch sẽ chỉ trả về các tài liệu phù hợp với tiêu chí trong tất cả chúng. Các truy vấn này có thể được lồng nhau, vì vậy bạn có thể xây dựng các truy vấn rất phức tạp bằng cách chỉ định truy vấn bool là **must**, **must_not**, **should** hoặc **filter** query

### filter

Một loại mệnh đề chúng ta chưa thảo luận cho compound query là mệnh đề **filter**. Dưới đây là 1 ví dụ
```
curl localhost:9200/_search -d ‘{“query”:{“bool”: {“must”: {{ “match_all”: {} }},“filter”: {“term”: {“email”: “joe@bloggs.com”}}}}}`
```

Truy vấn **match_all** trong mệnh đề must nói với Elaticsearch rằng nó sẽ trả về tất cả các tài liệu. Đây có vẻ không phải là một tìm kiếm rất hữu ích, nhưng nó rất hữu ích khi bạn sử dụng nó cùng với bộ lọc như chúng ta đã thực hiện ở đây. Bộ lọc chúng ta đã chỉ định là một term query, yêu cầu tất cả các tài liệu có chứa trường email có giá trị là joe@bloggs.com. Chúng ta đã sử dụng bộ lọc để chỉ định tài liệu nào chúng ta muốn, vì vậy tất cả chúng sẽ được trả về điểm số 1. Bộ lọc không được sử dụng để tính điểm, do đó, truy vấn **match_all** cung cấp cho tất cả các tài liệu điểm 1.
### Filters Versus Queries
Những người đã sử dụng Elaticsearch trước phiên bản 2 sẽ quen thuộc với các filters và queries. Bạn đã sử dụng để xây dựng phần thân truy vấn bằng cả filters và queries. Sự khác biệt giữa hai loại này là các filters thường nhanh hơn vì chúng chỉ kiểm tra nếu một tài liệu phù hợp với tất cả và không xem nó có phù hợp hay không. Nói cách khác, các filters đưa ra câu trả lời boolean trong khi các truy vấn trả về điểm được tính toán về mức độ tài liệu phù hợp với truy vấn. Các cải tiến hiệu suất khác nhau được liên kết với các filters do tính chất đơn giản hóa của chúng.

Kể từ phiên bản 2 của Elaticsearch, các filters và queries đã được hợp nhất và bất kỳ mệnh đề truy vấn nào cũng có thể được sử dụng làm filters hoặc queries (tùy thuộc vào ngữ cảnh). Cũng như phiên bản 1, các filters được lưu trong bộ nhớ cache và nên được sử dụng nếu việc ghi điểm không thành vấn đề.

## Scoring
Chúng ta đã đề cập đến thực tế là Elaticsearch trả về điểm số cùng với tất cả các tài liệu phù hợp từ một truy vấn

```
> curl “localhost:9200/_search?q=application”{"_shards":{"total" : 5,"successful" : 5,"failed" : 0},"hits":{"total" : 1,"max_score": 2.3,"hits" : [{"_index" : "logstash-2016.04.04","_type" : "logs","_id" : "1","_score": 2.3,"_source" : {"message" : "Log message from my application"}}]}}
```


Score này được tính dựa trên các tài liệu trong Elaticsearch dựa trên các truy vấn được cung cấp. Các yếu tố như độ dài của một trường, tần suất xuất hiện của thuật ngữ được chỉ định trong trường đó và (trong trường hợp tìm kiếm wildcard và fuzzy) mức độ phù hợp với giá trị được chỉ định đều ảnh hưởng đến điểm số. Điểm được tính toán sau đó được sử dụng để order các tài liệu, thường là từ điểm cao nhất đến thấp nhất và các tài liệu có điểm cao nhất sau đó được trả lại cho client. Có nhiều cách khác nhau để tác động đến điểm số của các truy vấn khác nhau, chẳng hạn như tham số boost. Điều này đặc biệt hữu ích nếu bạn muốn một số truy vấn nhất định trong một truy vấn phức tạp có trọng lượng lớn hơn các truy vấn khác và bạn đang tìm kiếm các tài liệu quan trọng nhất.

Khi sử dụng filters (như đã giải thích trước đó), không có điểm nào được tính. Điều này cung cấp hiệu suất nâng cao thường được kết hợp với việc sử dụng các filters nhưng không cung cấp các tính năng quan trọng và thứ tự đi kèm với tính điểm.
## Tài liệu tham khảo
[Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)

[Filters](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/query-dsl-filters.html)

[Elasticsearch Queries: A Thorough Guide](https://logz.io/blog/elasticsearch-queries/)