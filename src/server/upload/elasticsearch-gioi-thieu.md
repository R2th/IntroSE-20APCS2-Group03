> Bài viết gốc: https://manhhomienbienthuy.github.io/2019/05/20/elasticsearch-gioi-thieu.html

Elasticsearch là một search engine mã nguồn mở, RESTful.  Tôi biết đến Elasticsearch theo một cách (tôi nghĩ là) không thể đơn giản hơn: được người khác gợi ý sử dụng.

Chuyện là tôi tham gia phát triển một website thương mại điện tử.  Mà tính năng tìm kiếm hàng hoá gần như là yêu cầu bắt buộc với bất cứ một trang thương mại điện tử nào.

Thế là hành trình tìm kiếm công cụ nào phù hợp để phát triển tính năng này dẫn tôi đến với Elasticsearch.  Lúc đó thực ra tôi cũng không tìm hiểu được nhiều, mà chủ yếu tin tưởng vào lời khuyên từ những người đi trước, họ đã có nhiều kinh nghiệm cũng như kiến thức.  Đặc biệt, lúc đó tôi rất ấn tượng với cái tên "XXX Search" cho thấy đây là một cụ chuyên về "search", mà chuyên thì lúc nào cũng tốt hơn là dùng SQL.

Thế nhưng, sau một thời gian sử dụng, thì tôi cũng có chút ít thời gian tìm hiểu sâu hơn về Elasticsearch, và bài viết này sẽ trình bày những gì tôi đã tìm hiểu được.

# Elasticsearch là gì?

Mình sử dụng Elasticsearch như một công cụ giúp tìm kiếm. Elasticsearch có thể hỗ trợ tìm kiếm rất nhiều kiểu dữ liệu khác nhau.  Ngoài ra thì nó còn có thể làm được rất nhiều việc khác như đánh giá kết quả tìm kiếm, thu thập dữ liệu.  Có rất nhiều điều mà Elasticsearch có thể làm được, nhưng tất nhiên, tuỳ bài toán cụ thể mà chúng ta sẽ quyết định dùng đến tính năng nào của nó.

Vậy tại sao lại sử dụng Elasticsearch trong khi dự án đang sử dụng SQL cũng có thể tìm kiếm được？

Sau khi sử dụng thực tế, đúng là riêng về tính năng tìm kiếm Elasticsearch vượt trội hơn rất nhiều so với SQL thông thường, nhất là khi cần full text search.  Với SQL chúng ta có thể sử dụng câu lệnh `LIKE` để tìm kiếm text.  Thế nhưng cách làm này lép vế hoàn toàn so với khả năng search của Elasticsearch.

Ví dụ, với tiếng Việt chẳng hạn, nếu muốn tìm kiếm "Việt Nam" bằng từ khoá "Viet Nam" thì SQL sẽ không thể làm được, nhưng Elasticsearch lại có thể làm được.  Ngoài ra, perfomance cũng là một lợi thế của Elasticsearch.  SQL với `LIKE` sẽ thực hiện tìm kiếm tất cả text để tìm ra từ phù hợp, với dữ liệu lớn thì sẽ rất mất thời gian.  Nhưng Elasticsearch với khả năng đánh chỉ mục sẽ cho ra kết quả nhanh hơn rất nhiều.

Elasticsearch là một máy chủ riêng biệt (thường chạy ở cổng 9200 là cổng mặc định), mọi việc đọc, ghi thông tin sẽ được thực hiện thông qua các truy vấn tương tự như truy vấn HTTP thông thường.

Tìm hiểu kỹ hơn, Elasticsearch là một search engine được xây dựng trên nền tảng [Lucene](https://lucene.apache.org/) của Apache.  Nó chạy trên nền Java và có thể search được rất nhiều định dạng dữ liệu khác nhau.

# Tại sao chúng ta nên dùng Elasticsearch?

Elasticsearch so sánh với một công cụ khác cũng của Apache là [Solr](https://lucene.apache.org/solr/) thì nó có nhiều tính năng hơn hẳn:

- Có thể cung cấp giải pháp search dễ dàng mở rộng.
- Perfomance tốt, thao tác search gần như theo thời gian thực.
- Index có thể dễ dàng khôi phục trong trường hợp server gặp sự cố.
- Sử dụng dữ liệu dạng JSON và API nên dễ dàng trong việc tương tác.
- Tự động index tài liệu dạng JSON.
- Mỗi index có thể tuỳ chỉnh riêng cho phù hợp với yêu cầu.

Còn nếu so sánh với các hệ quản trị cơ sở dữ liệu thông thường (kể cả SQL hay noSQL) thì chúng ta càng có nhiều lý do để sử dụng, một vài lý do tôi đã đề cập ở trên.  Đó cũng là lý do chính khiến tôi áp dụng Elasticsearch vào dự án của mình, dù dữ liệu chính của dự án đã được lưu trữ ở PostgreSQL.

Thế nhưng, chúng ta có thể sử dụng Elasticsearch để lưu trữ toàn bộ dữ liệu được hay không?  Thực ra câu trả lời là được, nhưng đó thực sự không phải là việc nên làm.  Vì dù trong việc tìm kiếm, Elasticsearch tỏ ra rất hiệu quả, nhưng trong phần lớn các bài toán của hệ thống, chúng ta vẫn cần một hệ quản trị cơ sở dữ liệu quan hệ.

# Các khái niệm cơ bản: index và type

Mỗi khi lưu trữ dữ liệu vào Elasticsearch, chúng ta lưu nó vào trong một **index** và mỗi index này sẽ có một **type**.  So sánh với các hệ quản trị cơ sử dữ liệu quan hệ, index giống như một database còn type giống như một bảng, để truy cập đến những dữ liệu này, chúng ta truy cập thông qua:

```css
localhost:9200/{index}/{type}/
```

Lưu ý rằng, trong cùng một index, các type khác nhau không thể có cùng tên trường mà lại khác cấu hình hoặc field.  Ví dụ, hai dữ liệu dưới đây không thể cùng tồn tại, bởi trong cùng index `test`, các type khác nhau có cùng trường `city` nhưng lại khác kiểu dữ liệu: string và object:

```shell
localhost:9200/test/users/1
{
    "city": "cityID123"
}

localhost:9200/test/city/1
{
    "city": {
        "name": "Toronto"
    }
}
```

# Làm việc với Elasticsearch

Khi làm việc với Elasticsearch, có 3 bước chính mà chúng ta bắt buộc phải trải qua, đó à **mapping**, **indexing** và **searching**

## Mapping

Mapping là công việc chúng ta cần làm để định nghĩa cách mà Elasticsearch lưu trữ cũng như index các tài liệu cùng các trường của nó.

Tuy nhiên, nếu không thực hiện mapping cho một trường nào đó, Elasticsearch sẽ thêm vào kiểu dữ liệu [tổng quát](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-mapping.html) cho trường đó.

Để dễ hiểu hơn, chúng ta sẽ đi vào một ví dụ cụ thể với dữ liệu như sau:

```go
{
    "first_name": "bam",
    "last_name": "margera",
    "gender": "male",
    "age": 36
}
```

Chúng ta sẽ tạo index, type và mapping cho những dữ liệu này.  Những việc đó sẽ được thực hiện như sau:

```
PUT localhost:9200/test/
{
    "mappings": {
        "users": {
            "properties": {
                "age": {
                    "type": "long"
                },
                "first_name": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                },
                "level": {
		            "type": "string"
		        },
                "last_name": {
                    "type": "string"
                }
            }
        }
    }
}
```

Trong đoạn trên, chúng ta sẽ tạo một index tên `test`, một type là `users` với 5 trường tương ứng với dữ liệu ở trên.

Lưu ý rằng, mỗi trường có thể có kiểu dữ liệu là: `string`, `date`, `long`, `double`, `boolean`, `ip`, `object`, `nested`, `geo_point`, `geo_shape`.

Nếu mọi việc diễn ra suôn sẻ, chúng ta sẽ nhận được phản hồi:

```scala:scala
{
  "acknowledged": true
}
```

Với kết quả trên, chúng ta hiểu rằng Elasticsearch đã biết thông tin về những dữ liệu chúng ta sắp thêm vào, và đó sẽ là bước tiếp theo.

## Indexing

Indexing là công việc chúng ta thêm dữ liệu vào cho Elasticsearch và sau đó những dữ liệu này có thể tìm kiếm được.  Việc indexing này thực hiện thông qua Index API:

Chúng ta hãy xem 3 ví dụ đơn giản dưới đây:

```go
POST localhost:9200/test/users/
{
    "first_name": "Bam",
    "last_name": "Margera",
    "gender": "male",
    "level": "super awesome",
    "age": 36
}

POST localhost:9200/test/users/
{
    "first_name": "Stephanie",
    "last_name": "Hodge",
    "gender": "female",
    "level": "awesome",
    "age": 34
}

POST localhost:9200/test/users/
{
    "first_name": "Johnny",
    "last_name": "Knoxville",
    "gender": "male",
    "level": "awesome",
    "age": 45
}

```

Với mỗi thao tác indexing thành công, chúng ta sẽ nhận được phản hồi như sau:

```go
{
  "_index": "test",
  "_type": "users",
  "_id": "AVRQDOka0YBBUjDwpzQQ",
  "_version": 1,
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "created": true
}
```

Giá trị `id` ở đây được Elasticsearch sinh ra, nó lá giá trị encode base64 của GUID dài 20 ký tự.  Chúng ta có thể chỉ định ID theo ý của mình như sau:

```go
POST localhost:9200/test/users/MyID123
{
    "first_name": "Bam",
    "last_name": "Margera",
    "gender": "male",
    "level": "super awesome",
    "age": 36
}
```

Sau khi indexing, thì chúng ta đã hoàn thành việc ghi dữ liệu vào Elasticsearch và bây giờ chúng ta có thể tìm kiếm những dữ liệu này:

## Searching

Trong phần này chúng ta sẽ tìm hiểu về cách tìm kiếm những dữ liệu đã được thêm vào Elasticsearch.  Như đã nói ở trên, Elasticsearch có thể giúp chúng ta tìm kiếm cực kỳ hiệu quả, thế nhưng, công cụ chỉ thể hiện khả năng của nó khi chúng ta biết cách sử dụng mà thôi.

Để tìm kiếm trong Elasticsearch, chúng ta sẽ phải làm nhiều thao tác khác nhau, tuỳ thuộc vào bài toán cụ thể.  Trong phần này, chúng ta sẽ tìm hiểu điều đó.

Để tìm kiếm trong một index và type, chúng ta cần gửi một request kiểu như dưới đây:

```shell
POST localhost:9200/test/users/_search
```

Sau khi request, Elasticsearch sẽ trả về kết quả:

```go
{
  "took": 4,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 3,
    "max_score": 1,
    "hits": [
      {
        "_index": "test",
        "_type": "users",
        "_id": "AVRQQlCE0YBBUjDwpzQZ",
        "_score": 1,
        "_source": {
          "first_name": "Bam",
          "last_name": "Margera",
          "gender": "male",
          "level": "super awesome",
          "age": 36
        }
      },
      ...
    ]
  }
}
```

Nhìn vào kết quả ở trên, chúng ta có thể nhìn thấy những dữ liệu mình đã thêm vào Elasticsearch từ trước.  Giá trị trong `hits` sẽ bảo gồm cả những dữ liệu chúng ta thêm vào (trong `source`).  Vì chúng ta chưa có bất cứ yêu cầu tìm kiếm nào nên score sẽ luôn là `1`.

Ở phía trên, `hits.total` là số lượng các tài liệu chúng ta đã dùng để truy vấn, `hits.max_score` là số điểm tối đa mà một tài liệu có thể nhận được trong truy vấn đó (Trong trường hợp này giá trị sẽ là `1`).

Giá trị `shards.total` là số lượng Lucense Index mà Elasticsearch đã tạo ra cho index này.  Giá trị này mặc định là bằng 5, và có thể thay đổi được khi chúng ta tạo index (trong bước indexing).  Các thông tin cụ thể hơn về shard, mời các bạn đọc thêm [ở đây](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/_basic_concepts.html#getting-started-shards-and-replicas).

### Query

Query chính là thứ chúng ta sẽ dùng để tìm kiếm, và kết quả tìm kiếm sẽ được đánh giá độ tương quan thông qua "score".

Ví dụ chúng ta cần tìm kiếm theo kiểu full text search các user có `level` tương đương với `super awesome`, chúng ta sẽ cần một query như sau:

```rust
POST localhost:9200/test/users/_search
{
    "query": {
        "match": {
            "level": "super awesome"
        }
    }
}
```

Và kết quả của truy vấn này:

```go
{
  "took": 19,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 3,
    "max_score": 0.2712221,
    "hits": [
      {
        "_index": "test",
        "_type": "users",
        "_id": "AVRQQlCE0YBBUjDwpzQZ",
        "_score": 0.2712221,
        "_source": {
          "first_name": "Bam",
          "level": "super awesome",
          ...
        }
      },
      {
        "_index": "test",
        "_type": "users",
        "_id": "AVRQRtYW0YBBUjDwpzQa",
        "_score": 0.09848769,
        "_source": {
          "first_name": "Stephanie",
          "level": "awesome",
          ...
        }
      },
      {
        "_index": "test",
        "_type": "users",
        "_id": "AVRQRx-E0YBBUjDwpzQf",
        "_score": 0.09848769,
        "_source": {
          "first_name": "Johnny",
          "level": "awesome",
          ...
        }
      }
    ]
  }
}
```

Như kết quả ở trên, user `Bam` có điểm tương quan cao nhất `0.2712221` (bởi user này có level chính là `super awesome`, trong khi 2 user khác, `Stephanie`, `Johnny` có điểm tương quan thấp hơn một chút `0.09848769` bởi họ chỉ có level là `awesome` mà thôi.

Với những dữ liệu yêu cầu tìm kiếm **chính xác**, ví dụ các trường số, ngày tháng, v.v... thì chúng ta cần sử dụng term query:

```rust
POST localhost:9200/test/users/_search
{
     "query": {
        "term": {
            "age": 36
        }
    }
}
```

Query này tìm kiếm chính xác nên nó sẽ chỉ trả về user `Bam` mà thôi.

Nếu muốn sử dụng một query phức tạp hơn, chúng ta có thể kết hợp như sau (tìm kiếm các user level tương đương với `super awesome` và tuối dưới 40):

```rust
POST localhost:9200/test/users/_search
{
     "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "level": "super awesome"
                    }
                },
                {
                    "range": {
                        "age": {
                            "lt": 40
                        }
                    }
                }
            ]
        }
    }
}
```

Trong query ở trên, `must` là một array là nó tương đương với câu điều kiện **AND**, còn nếu muốn sử dụng điều kiện **OR**, thì Elasticsearch cũng hỗ trợ thông qua `should`.  Ngoài ra còn `must_not` giúp chúng ta truy vấn điều kiện **NOT**.

Ngoài ra, `range` là một query cho chúng ta khả năng tìm kiếm trong một khoảng nào đó (như ví dụ ở trên là tuổi dưới 40).  Query range hỗ trợ rất nhiều truy vấn khác nhau như `lt` (nhỏ hơn), `lte` (nhỏ hơn hoặc bằng), `gt` (lớn hơn), `gte` (lớn hơn hoặc bằng).

### Filter

Filter là những query là không được đánh giá tương quan, thường được sử dụng nếu score không quá quan trọng.  Kết quả trả về của filter bắt buộc phải khớp hoàn toàn.

Với filter như dưới đây, score không được đánh giá nhưng chúng ta có thể nhận được kết quả chính xác với 2 user được trả về:

```rust
POST localhost:9200/test/users/_search
{
    "filter": {
       "match": {
            "gender": "male"
        }
    }
}
```

Nếu kết hợp filter là query, chúng ta có thể dùng cách sau (tìm kiếm các user có level tương đương với `super awesome` và bắt buộc giới tính là `male`):

```rust
POST localhost:9200/test/users/_search

{
     "query": {
        "match": {
            "level": "super awesome"
        }
    },
     "filter": {
        "match": {
            "gender": "male"
        }
    }
}
```

Với truy vấn như thế này, chúng ta sẽ chỉ nhận được kết quả là 2 user `Bam` và `Johnny` với score tương ứng là `0.2712221`, `0.09848769`.

Tuy kết quả của truy vấn này sẽ chính xác, thế nhưng perfomance của nó lại là điều đáng bàn.  Với cách làm như trên, query luôn được xử lý trước, sau đó filter mới được áp dụng filter để lọc lại kết quả.

Nếu muốn Elasticsearch thực hiện filter trước rồi mới tới query, chúng ta cần làm như sau (chuyển `filter` ra cạnh `must`):

```rust
POST localhost:9200/test/users/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "level": "super awesome"
                    }
                }
            ],
            "filter": {
                "match": {
                    "gender": "male"
                }
            }
        }
    }
}
```

Thêm một ví dụ nữa: Tìm kiếm các user có level tương đương `super awesome`, tuối dưới 40 và bắt buộc giới tính là `male`:

```rust
POST localhost:9200/test/users/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "level": "super awesome"
                    }
                },
                {
                    "range": {
                        "age": {
                            "lt": 40
                        }
                    }
                }
            ],
            "filter": {
                "match": {
                    "gender": "male"
                }
            }
        }
    }
}
```

Truy vấn này sẽ chỉ ra một kết quả là user `Bam` với score 1.0253175. Lưu ý rằng, chúng ta cũng có thể kết hợp nhiều filter bằng việc sử dụng `bool` tương tự như query.

Query và filter nên được sử dụng kết hợp một cách khéo léo, giống như những gì chính [Elasticsearch đã nói](https://www.elastic.co/guide/en/elasticsearch/guide/master/_queries_and_filters.html#_when_to_use_which): Query nên được sử dụng cho những tìm kiếm full text search hoặc các điều kiện mà cần tới điểm tương quan, filter nên được sử dụng cho các tìm kiếm khác.

### Aggregations

[Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html) là một phần quan trọng của Elasticsearch, nó được sử dụng để thực hiện các thông kê liên quan đến dữ liệu.  Trong bài viết này, tôi sẽ chỉ mô tả một phần rất nhỏ trong nội dung đó: term aggregations.

Ví dụ, chúng ta cần thực hiện thông kê như sau: có bao nhiêu nam và nữ trong index/type của chúng ta.  Để thực hiện điều này, chúng ta cần tới aggregations như dưới đây:

```cpp
POST localhost:9200/test/users/_search
{
    "size": 0,
    "aggs" : {
        "genders" : {
            "terms" : { "field" : "gender" }
        }
    }
}
```

Trong truy vấn trên, `size = 0` là bởi vì chúng ta không cần kết quả tìm kiếm, chúng ta chỉ quan tâm tới kết quả thống kê mà thôi.  Từ khoá `terms` trong truy vấn trên nghĩa là chúng ta thực hiện aggregation theo truy vấn term, tức là tìm kiếm chính xác.

Và dưới dây là kết quả cho truy vấn đó:

```go
{
  "took": 7,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 3,
    "max_score": 0,
    "hits": []
  },
  "aggregations": {
    "genders": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "male",
          "doc_count": 2
        },
        {
          "key": "female",
          "doc_count": 1
        }
      ]
    }
  }
}
```

Tất cả những gì chúng ta cần đều được thể hiện ở kết quả trên, trong phần `buckets`: có 2 nam và 1 nữ.  Sự lợi hại của aggregation còn ở chỗ, nó có thể kết hợp với query và filter tuỳ ý.

Nếu trong truy vấn ở phần trước, cần thêm các kết quả thông kê, chúng ta có thể thêm aggregations vào như dưới đây:

```rust
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "level": "super awesome"
                    }
                },
                {
                    "range": {
                        "age": {
                            "lt": 40
                        }
                    }
                }
            ],
            "filter": {
                "match": {
                    "gender": "male"
                }
            }
        }
    },
    "aggs" : {
        "genders" : {
            "terms" : { "field" : "gender" }
        }
    }
}
```

Giờ đây, không chỉ nhận được kết quả là user `Bam` thoả mãn yêu cầu, chúng ta còn biết được có tổng số 1 user nam trong kết quả đó.

# Kết luận

Elasticsearch thực sự là một công cụ giúp công việc tìm kiếm của chúng ta dễ dàng hơn rất nhiều.  Thử tượng tượng nếu phải viết SQL query cho những truy vấn ở trên, bạn sẽ đau đầu tới mức nào.

Tất nhiên, như đã nói, muốn Elasticsearch phục vụ mình, trước hết, chúng ta phải biết cách sử dụng đã.  Hy vọng bài viết cung cấp được thông tin hữu ích, dù nó rất sơ khai.  Các nội dung chi tiết hơn xin hẹn vào các bài viết tiếp theo.