Xin chào, hôm nay, mình sẽ giới thiệu đến các bạn một "công cụ" tìm kiếm vô cùng mạnh mẽ trong Rails, đó chính là **Elasticsearch(ES)**. Chắc hẳn rằng, nói đến search trong rails các bạn đã nghe rất nhiều về từ khóa này, và nếu google thì sẽ ra rất nhiều tutorial, các blog cũng như bài viết về nó. Nhưng đối với một người mới bắt đầu thì thật không dễ dàng để bắt nhịp với Elasticsearch.

Đầu tiên, để làm quen với Elasticsearch, cần phải hiểu, Elasticsearch là gì? Tại sao phải sử dụng Elasticsearch? Và sử dụng Elasticsearch như thế nào?

### 1. Elasticsearch là gì?

Elasticsearch là một công cụ tìm kiếm và phân tích văn bản rất hữu ích, các dữ liệu dưới dạng như text, string, integer, date.. thì đều được nó hỗ trợ tìm kiếm vô cùng nhanh chóng. Nhiệm vụ chính của Elasticsearch là store và retrieve document. Tuy nhiên, nó không được sử dụng với mục đích lưu trữ dữ liệu để có thể hoàn toàn thay thế một database thông thường vì bản chất của nó là một search engine chạy dưới một cổng riêng (default là 9200).

### 2. Tại sao phải sử dụng Elasticsearch?

Nếu như mục đích chỉ là tìm kiếm, thì việc truy vấn bằng sql cũng có thể mang lại kết quả, vậy tại sao vẫn phải sinh ra Elasticsearch? Đó cũng chính là những ưu điểm của Elasticsearch mang lại:

* Khả năng thực hiện các câu truy vấn phức tạp với tốc độ nhanh chóng.

* Hỗ trợ full text search: Elasticsearch sẽ thực hiện việc phân tách các từ, các câu để map với dữ liệu.  Ví dụ đơn giản, muốn tìm kiếm các sinh viên có tên như hoa, huy, an, bạn chỉ cần search 'hoa huy an' thế là đã có một list danh sách đủ các sinh viên có tên như trên. Elasticsearch sẽ phân tích điều kiện search vừa nhập, tách từng từ một và sau đó mang từ vừa tách để map với tên sinh viên trong cơ sở dữ liệu. Đặc biệt những tên như 'thanh nhan manh' sẽ không có trong kết quả search vừa rồi.

* Elasticsearch hỗ trợ tìm kiếm cho hầu hết mọi loại dữ liệu, chỉ cần nó hiển thị được dưới dạng văn bản. Đặc biệt, nếu như bạn đang gặp phải một bài toán về tìm kiếm địa điểm thì Elasticsearch cung cấp Geo queries để giải quyết vấn đề đó cho bạn rồi.

* Một điểm đặc biệt nữa đó là Elasticsearch cung cấp rất nhiều các query type để hỗ trợ cho việc tìm kiếm, ở bài viết này, mình sẽ chỉ đề cập đến một số query type phổ biến (mình thường xuyên sử dụng thôi :+1:)

Elasticsearch mạnh mẽ dĩ nhiên nó cũng không phải là không có hạn chế, tuy nhiên, tùy theo mục đích sử dụng và bài toán mà bạn đang muốn giải quyết để quyết định có sử dụng Elasticsearch hay không?

* Elasticsearch chỉ thực sự phù hợp và hữu ích khi bạn chỉ sử dụng nó đúng với mục đích search engine. Nếu biến Elasticsearch trở thành một data store và data trong store luôn được cập nhật liên tục thì Elasticsearch có vẻ như sẽ không phải là công cụ phù hợp nữa. Vậy nên, nếu bạn sử dụng Elasticsearch song song với một database thực hiện lưu trữ dữ liệu thì CRUD không còn là vấn đề của Elasticsearch nữa :laughing:

Vậy nên mới nói, tùy vào mục đích mà bạn sử dụng để thấy rằng Elasticsearch có thực sự là công cụ hữu ích.

### 3. Sử dụng Elasticsearch như thế nào?

Trước tiên để sử dụng, chỉ cần thực hiện step by step như thế này là đã có thể sử dụng được nó rồi.
[Hướng dẫn cài đặt Elasticsearch](https://www.tutorialspoint.com/elasticsearch/elasticsearch_installation.htm)

Sau khi thực hiện các bước trên, chạy server trên local của máy với cổng mặc định của ES là 9200 [http://localhost:9200/](http://localhost:9200/) và kết quả nhận được như thế này thì là có nghĩa là việc cài đặt Elasticsearch đã thành công
```
{
  "name" : "hN3fNet",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "r3h7om2uQtinV_Lv-1KY-w",
  "version" : {
    "number" : "5.5.3",
    "build_hash" : "9305a5e",
    "build_date" : "2017-09-07T15:56:59.599Z",
    "build_snapshot" : false,
    "lucene_version" : "6.6.0"
  },
  "tagline" : "You Know, for Search"
}
```
### **Query DSL**
### a. Các query type trong Full text queries
### Match query
Đây gần như là một query nổi bật nhất trong Elasticsearch, thực hiện truy vấn của văn bản đầy đủ với các dữ liệu dạng text, number, date...Elasticsearch sẽ xây dựng một cấu trúc search có dạng
```
GET /_search
{
    "query": {
        "match" : {
            "name" : "an hoa huy"
        }
    }
}
```
name ở đây là một field mà bạn đã đánh index cho nó. Khi đó, ta sẽ nhận được kết quả có tên trùng với các tên được tách ở key trên dựa vào dấu cách. Match query cũng cung cấp 2 toán tử là and và or cho câu truy vấn. Ví dụ, bạn muốn tìm kiếm tên có cả 'an' và 'huy'
```
GET /_search
{
    "query": {
        "match" : {
            "name" : {
                "query" : "an huy",
                "operator" : "and"
            }
        }
    }
}
```
Và nếu thay operator or thì kết quả truy vấn sẽ là những sinh viên có tên là 'an' hoặc 'huy'.

### Multi match query
Cũng giống như match query nhưng nó cho phép search được trên nhiều trường dữ liệu
```
GET /_search
{
  "query": {
    "multi_match" : {
      "query":    "huyen cherry", 
      "fields": [ "name", "message", "description" ] 
    }
  }
}
```
query: nội dung câu query, đây chính là từ khóa mà bạn muốn tìm kiếm.

fields: là các trường sẽ bị ảnh hưởng, câu query sẽ tìm kiếm trong các trường trong fields để trả về kết quả.

**Ví dụ**: document1 {name: "cherry", messages:"", description:"this is description"}
           document2 {name: "test", messages:"To Huyen", description:""}

Trong document1 tìm thấy name và document2 tìm thấy messages phù hợp với key query 'huyen cherry' và kết quả nhận được là document1 và document2.  Và Multi match query cũng có hỗ trợ toán tử and để thiết lập điều kiện, key query phải có mặt ở tất cả các fields được xác định.

### Match Phrase Querry
Nó cũng khá tuơng tự match query, tuy nhiên, kết quả trả về sẽ đảm bảo được thứ tự mà bạn mong muốn. Ví dụ nếu bạn nhập key word là 'huyen cherry' và sử dụng type là match query thì kết quả trả về sẽ bao gồm cả những document có chứa 'cherry huyen'. Nhưng nếu sử dụng match phrase thì kết quả sẽ chỉ trả những document mà có đúng thứ tự là 'huyen cherry'
```
GET /_search
{
    "query": {
        "match_phrase" : {
            "name" : "huyen cherry"
        }
    }
}
```

### b. Range query trong Term level queries
Match các document với field trong phạm vi query, nó thường sử dụng với các loại dữ liệu như number, date, datetime
```
GET _search
{
    "query": {
        "range" : {
            "age" : {
                "gte" : 10,
                "lte" : 20,
                "boost" : 2.0
            }
        }
    }
}
```
Các params sử dụng để xây dựng cấu trúc câu query:

* gte: lớn hơn hoặc bằng
* gt: lớn hơn
* lte: nhỏ hơn hoặc bằng
* lt: nhỏ hơn
* boost: giá trị tăng của truy vấn, mặc định là 1.0

Khi sử dụng range query cho các loại dữ liệu như time hay date thì cần phải format lại định dạng dữ liệu

**Ví dụ** với date
```
def date_config
      {
        type: "date",
        format: "yyyy/MM/dd",
        index: "not_analyzed"
      }
    end
```
hay time
```
def time_config
      {
        type: "date",
        format: "HH:mm",
        index: "not_analyzed"
      }
    end
```

### c. Bool query trong Compound queries

Khi thực hiện truy vấn, có thể bạn sẽ cần phải kết hợp nhiều điều kiện hay nhiều mệnh đề đối với nhưng câu truy vấn phức tạp đi kèm với các điều kiện and, or, not. Và bool query sẽ hỗ trợ các params để thực hiện các vấn đề đó.

* must: phải phù hợp với tất cả các điều kiện, tuơng đuơng với câu lệnh and.
* must_not: ngược lại với must, phải không phù hợp với tất cả các điều kiện, tuơng đuơng với câu lệnh not.
* should: phù hợp với một trong số tất cả các điều kiện, tuơng đuơng với câu lệnh or.

```
GET _search
{
  "query": {
    "bool" : {
      "must" : {
        "multi_match" : {
          "query":    "an thanh nhan", 
          "fields": ["name", "description" ] 
        }
      },
      "must_not" : {
        "range" : {
          "age" : { "lt" : 18, "gte" : 25 }
        }
      },
      "should" : {
        "match_phrase" : {
            "name" : "huyen cherry"
        }
      }
    }
  }
}
```
Với cấu trúc trên, ta có thể xây dựng được một câu query với nội dụng: Tìm tất cả các sinh viên có name hoặc description là 'an thanh nhan' trong độ tuổi 18 <= age < 25 hoặc sinh viên có tên là 'huyen cherry'.

### Tổng kết
Vậy là mình đã giới thiệu cho các bạn về khái niệm Elasticsearch, lý do sử dụng và các câu query phổ biến (ở bài tiếp theo, mình sẽ đề cập đến các loại query nâng cao hơn :laughing:, tham khảo thêm [ở đây](https://viblo.asia/p/elasticsearch-va-query-dsl-p2-4dbZN4ky5YM)). Hy vọng sẽ giúp bạn dễ dàng hiểu hơn về Elasticsearch cũng như sử dụng nó đúng với mục đích của mình.

**Tài liệu tham khảo**
[https://www.elastic.co/guide/index.html](https://www.elastic.co/guide/index.html)