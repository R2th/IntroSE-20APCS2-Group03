# **1.Giới thiệu**
Elasticsearch có lẽ là thứ không phải xa lạ gì với anh em developer chúng ta nhưng không phải ai cũng hiểu rõ ràng và cụ thể về nó. Hôm nay mình xin phép trình bày một khái niệm về phân trang `(Pagination)` trong Elasticsearch.
Anh em nào mới làm quen với Elasticsearch thì có thể đọc thêm tài liệu của nó tại đây [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/6.3/index.html). Chém gió đủ rồi, vào vấn đề thôi nào (^_^).
# **2.Bài toán gặp phải**
Bây giờ chúng ta nói về `Pagination` trong Elasticsearch, trong Elasticsearch cũng có cơ chế phân trang giống như OFFSET và LIMIT trong SQL đó là FROM và SIZE, cụ thể các bạn có thể xem ở đây [search-request-from-size](https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-request-from-size.html).
Mặc định Elasticsearch sẽ settings:
* FROM = 0
* SIZE = 10

**SQL**
```
SELECT id WHERE user=kimchy LIMIT=10;
```

**Elasticsearch**
```
curl -X GET "localhost:9200/_search" -H 'Content-Type: application/json' -d'
{
    "from" : 0, "size" : 10,
    "query" : {
        "term" : { "user" : "kimchy" }
    }
}
'

```
Nói về mặt cơ chế thì nó hoàn toàn giống với LIMIT VÀ OFFSET trong SQL, nhưng khi dữ liệu của bạn lớn lên thì sẽ phát sinh trường hợp sau đây:
```
Result window is too large, from + size must be less than or equal to: [10000] but was [40000]. See the scroll api for a more efficient way to request large data sets. This limit can be set by changing the [index.max_result_window] index level setting."}]
```
Điều này có nghĩa là để làm việc với dữ liệu nhỏ thì phân trang theo cách trên là hiệu quả nhất vì Elasticsearch mặc định settings cho mục `index.max_result_window` là `10000`. Nhưng khi dữ liệu bạn vượt quá mức giới hạn thì Elasticsearch sẽ cảnh báo bạn và nó cũng không quên đưa ra giải pháp cho bạn:
```
See the scroll api for a more efficient way to request large data sets. This limit can be set by changing the [index.max_result_window] index level setting."}]
```
**Hai giải pháp mà Elasticsearch đưa ra cho bạn là:**
1. Setting lại index.max_result_window này trong phần Mappings của index
2. Sử dụng scroll api để tiến hành phân trang sâu cho dữ liệu lớn.

**Đối với cách 1 ta sẽ dùng câu lện sau:**
`curl -XPUT "http://localhost:9200/my_index/_settings 3" -d '{ "index" : { "max_result_window" : 50000 } }'`
 Cách này chúng ta sẽ update lại `max_result_window` phù hợp với dữ liệu của bạn, nhưng nó không được khuyến thích để dùng, vì khi bạn update lại nó thì đồng nghĩa với việc performance của Query sẽ bị ảnh hưởng khá nhiều.
# **3.Giải pháp** 
Bây giờ chúng ta sẽ đi vào tìm hiểu Scroll Api trong Elasticsearch, cụ thể hơn bạn có thể đọc thêm tài liệu ở đây [Scroll ](https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-request-scroll.html).
Để truy xuất một lượng dữ liệu lớn 1 cách hiệu quả thì chúng ta nên dùng Scroll Api, nó giống như cách bạn sử dụng con trỏ trên cơ sở dữ liệu truyền thống.
Để sử dụng cuộn, bạn sẽ chỉ định tham số  `scroll` trong chuỗi truy vấn để cho Elasticsearch biết nó nên giữ "ngữ cảnh tìm kiếm" trong bao lâu, ví dụ: scroll = 1m( 1 phút).
```
curl -X POST "localhost:9200/twitter/_search?scroll=1m" -H 'Content-Type: application/json' -d'
{
    "size": 10,
    "query": {
        "match" : {
            "title" : "elasticsearch"
        }
    }
}
'
```

![](https://images.viblo.asia/cccb2291-36ce-4305-b173-ac707e2960ea.png)

Kết quả từ yêu cầu trên bao gồm _scroll_id `DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ==`, nó được chuyển đến API scroll để truy xuất lô kết quả tiếp theo.
```
curl -X POST "localhost:9200/_search/scroll" -H 'Content-Type: application/json' -d'
{
    "scroll" : "1m", 
    "scroll_id" : "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ==" 
}
'
```

![](https://images.viblo.asia/66218577-1c96-4e8a-8240-b7520f48b5e8.png)

Khi ban sử dụng Scroll Api thì bạn sẽ phải loại bỏ đi tham số FROM , tham số  SIZE cho phép bạn định cấu hình số lần truy cập tối đa được trả về với mỗi lô kết quả. Mỗi cuộc gọi đến API scroll sẽ trả về lô kết quả như vậy với 1 _scroll_id mới  cho đến khi không còn kết quả nào để trả lại, tức là mảng truy cập trống.
# **4.phát triển**
**Đây là ví dụ về scroll API trong PHP:**
```
$client = ClientBuilder::create()->build();
$params = [
    "scroll" => "30s",          // how long between scroll requests. should be small!
    "size" => 50,               // how many results *per shard* you want back
    "index" => "my_index",
    "body" => [
        "query" => [
            "match_all" => new \stdClass()
        ]
    ]
];

// Execute the search
// The response will contain the first batch of documents
// and a scroll_id
$response = $client->search($params);

// Now we loop until the scroll "cursors" are exhausted
while (isset($response['hits']['hits']) && count($response['hits']['hits']) > 0) {

    // **
    // Do your work here, on the $response['hits']['hits'] array
    // **

    // When done, get the new scroll_id
    // You must always refresh your _scroll_id!  It can change sometimes
    $scroll_id = $response['_scroll_id'];

    // Execute a Scroll request and repeat
    $response = $client->scroll([
            "scroll_id" => $scroll_id,  //...using our previously obtained _scroll_id
            "scroll" => "30s"           // and the same timeout window
        ]
    );
}

```
* Để đi sâu hơn về  Elasticsearch-PHP bạn có thể xem thêm tại đây [Elasticsearch-PHP](https://www.elastic.co/guide/en/elasticsearch/client/php-api/current/_search_operations.html)
* Github: [elasticsearch-php](https://github.com/elastic/elasticsearch-php)
* Ngoài ra còn cả ví dụ cụ thể về Scroll API để bạn có thể tham khảo thêm tại đây [elasticsearch-scroll-pagination](https://grokonez.com/frontend/angular/angular-4-elasticsearch-example-documents-elasticsearch-scroll-pagination)
# **5.Kết luận**
Bài viết trên mình đã đưa ra các khái niệm cần biết và khái quát lại Pagination của ES cho các bạn. Nhìn chung thì đây là vấn đề mình đã gặp trong quá trình làm việc, theo quan điểm cá nhân mình thì mình thấy nó rất phù hợp với việc truy xuất dữ liệu lớn. Ứng với mỗi yêu cầu của bài toán mà bạn sẽ chọn giải pháp cho phù hợp nhé!