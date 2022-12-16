Elasticsearch cung cấp một bộ Query DSL ([Domain Specific Language](https://en.wikipedia.org/wiki/Domain-specific_language)) dựa trên JSON để định nghĩa các truy vấn. Có thể cọi Query DSL là một AST([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) của các truy vấn, bao gồm hai loại mệnh đề:
* **Leaf query clauses**: Những mệnh đề này tìm những giá trị cụ thể của những trường cụ thể. Ví dụ như các truy vấn `match`, `term` và `range`.
* **Compound query clauses**: Những mệnh đề này kết hợp các `leaf query` và các `compound query` khác để thu được kết quả mong muốn.

Các mệnh đề truy vấn hoạt động theo cách khác nhau tùy thuộc vào nó được sử dụng trong `query context` hay `filter context`.

Vậy `query context` và `filter context` là gì?

## Query context và Filter context
### Query context
Một mệnh đề truy vấn được sử dụng trong query context trả lời câu hỏi "document này phù hợp với mệnh đề truy vấn nhiều như thế nào?". Bên cạnh việc xác định xem document có phù hợp với truy vấn hay không thì mệnh đề truy vấn tính thêm `_score` (giá trị của `_score` thể hiện mức độ phù hợp của document).

Query context có hiệu lực khi mệnh đề truy vấn được truyền vào tham số `query` trong search API.
### Filter context
Trong filter context, một mệnh đề truy vấn trả lời câu hỏi "document này có phù hợp với mệnh đề truy vấn không?". Câu trả lời đơn giản chỉ là có hoặc không, và score không được tính. 

Filter context có hiệu lực khi truyền mệnh đề truy vấn vào tham số `filter` hay `must_not`.
## Create sample index
Trước khi đi vào tìm hiểu các query thì ta sẽ tạo một sample index để thực hành các ví dụ.
Tạo index:
```
PUT schools
```
Thêm data:
```
POST schools/_doc/10
{
   "first_name":"Saint Paul", "last_name":"School", "description":"ICSE Afiliation",
   "street":"Dawarka", "city":"Delhi", "state":"Delhi", "zip":"110075",
   "location":[28.5733056, 77.0122136], "fees":5000,
   "tags":["Good Faculty", "Great Sports"], "rating":"4.5"
}
POST schools/_doc/16
{
   "first_name":"Crescent", "last_name": "School", "description":"State Board Affiliation",
   "street":"Tonk Road",
   "city":"Jaipur", "state":"RJ", "zip":"176114","location":[26.8535922,75.7923988],
   "fees":2500, "tags":["Well equipped labs"], "rating":"4.5"
}
```

Sau đây mình sẽ giới thiệu một số loại query thường được sử dụng.
## Match all query
Câu truy vấn chỉ đơn giản trả về tất cả các document, và tất cả có `_score` là `1.0`.

Ví dụ:
```
GET /schools_search
{
    "query": {
        "match_all": {}
    }
}
```
Kết quả:

![](https://images.viblo.asia/269573b8-6306-4a39-abed-edd96f229866.png)

## Match query
Trả về các documents phù hợp với giá trị text, number, date hay boolean mà ta cung cấp. Nếu field cần tìm kiếm là `text` thì sẽ được [analyze](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html) trước khi tìm kiếm.

Ví dụ về match query:
```
GET schools/_search
{
    "query": {
        "match" : {
            "description" : {
                "query" : "state Board"
            }
        }
    }
}
```

Kết quả:

![](https://images.viblo.asia/e9535fe5-01d9-4d37-817d-7b704b6fa36f.png)

Match query hoạt động như thế nào? Đầu tiên, text được analyze, kết quả thu được sẽ sử dụng để xây dựng nên một truy vấn boolean. Tham số `operator` có thể được đặt là `and` hoặc `or` (mặc định là `or`). Nếu là `or` thì sẽ tìm các document mà chỉ cần chứa 1 trong các text thu được sau bước analyze, còn là `and` thì sẽ tìm các document chứa tất cả text thu được.

Ngoài ra còn rất nhiều các tham số khác sử dụng trong các trường hợp phức tạp mình không giới thiệu ở đây, bạn có thể đọc thêm ở [https://www.elastic.co/guide/en/elasticsearch/reference/7.6/query-dsl-match-query.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/query-dsl-match-query.html)

## Multi-match query
Multi-match query được xây dựng dựa trên match query và cho phép truy vấn với nhiều field.

Ví dụ:
```
GET schools/_search
{
  "query": {
    "multi_match" : {
      "query":    "tonk road dawarka", 
      "fields": [ "street", "city" ] 
    }
  }
}
```

Kết quả:

![](https://images.viblo.asia/5b9e95d7-5ab0-4400-8748-489d300e86f9.png)

Các field có thể được chỉ định sử dụng wildcards, ví dụ `*_name` thì các field được tìm kiếm sẽ là `first_name`, `last_name`.

Mỗi field riêng lẻ có thể tăng trọng số sử dụng (`^`):

```
GET /_search
{
  "query": {
    "multi_match" : {
      "query" : "this is a test",
      "fields" : [ "subject^3", "message" ] 
    }
  }
}
```
Ở truy vấn trên, field `subject` có độ quan trọng gấp 3 lần so với field `message`.
## Query string query
Loại query này sẽ phân tích chuỗi truy vấn sử dụng trình phân tích cú pháp. Tức là chuỗi mà ta truyền vào phải viết chuẩn cú pháp, nếu chuỗi truy vấn chứa cú pháp không hợp lệ thì sẽ trả về lỗi.

Ví dụ query string:
```
GET schools/_search
{
  "query": {
      "query_string" : {
        "query" : "(state board) AND (affiliation)",
        "default_field" : "description"
      }
  }
}
```
Kết quả:

![](https://images.viblo.asia/7c20f763-e787-4ca1-b8f9-70e6b200a7c8.png)

Ở đây, `query` là chuỗi truy vấn ta muốn phân tích cú pháp và sử dụng để tìm kiếm. `default_field` là field sẽ được thực hiện tìm kiếm nếu trong chuỗi truy vấn không cung cấp field mà ta muốn tìm kiếm trên đó.

Khi chạy truy vấn trên, `query_string` query tách `(new york
city) OR (big apple)` thành 2 phần: `new york city` và `big apple` và được analyze độc lập với nhau.

Về cú pháp của chuỗi truy vấn có thể đọc thêm [ở đây](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/query-dsl-query-string-query.html#query-string-syntax)
## Term query
Trả về các document mà field được chỉ định có giá trị đúng bằng term truyền vào.

Term query được dùng đề tìm kiếm document dựa trên giá trị chính xác như giá tiền, ID sản phẩm hay username.

Ví dụ:
```
GET schools/_search
{
  "query": {
    "term": {
        "fees": {
          "value": "2500"
        }
    }
  }
}
```
Kết quả:

![](https://images.viblo.asia/7568a1ce-dd9b-49a7-b763-ef42d87ce7b5.png)

**Note**: Tránh sử dụng term query trên `text` field vì mặc định Elasticsearch sẽ thay đổi giá trị của `text` field trong quá trình [analysis](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html) làm cho việc tìm kiếm giá trị chính xác của `text` field sẽ khó.

Ví dụ: [standard analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/analysis-standard-analyzer.html) thay đổi giá trị của `text` field như sau:
* Loại bỏ hầu hết các dấu chấm câu.
* Chia nội dung còn lại thành các phần riêng lẻ gọi là token.
* Chuyển token về dạng chữ thường.

Do term query không thực hiện analyze `search term` nên kết quả tìm kiếm có thể không như mong muốn.

VÍ dụ tìm kiếm một `school` có `first_name` là "Saint Paul". Vì `first_name` là một `text` field, Elasticsearch sẽ thay đổi nó thành ["saint", "paul"] trong quá trình analysis, do đó `first_name` field sẽ không chứa chính xác term "Saint Paul". Term query trong trường hợp này sẽ không trả về kết quả nào:

![](https://images.viblo.asia/a1ed4e45-4d42-4525-909c-d66d4eb0bb54.png)

## Range query
Trả về các document chứa các term nằm trong phạm vi chỉ định.

Ví dụ:
```
GET schools/_search
{
  "query": {
    "range" : {
        "fees" : {
          "gte" : 1000,
          "lte" : 3000
        }
    }
  }
}
```
Query trên trả về các document có field `fees` có giá trị giữa 1000 và 3000.

Tham số của `range` là `<field>` (field mà bạn muốn tìm kiếm trên đó).

Các tham số của `<field>` (mình chỉ liệt kê các tham số cơ bản thường dùng):

`gt`: Lớn hơn.

`gte`: Lớn hơn hoặc bằng.

`lt`: Nhỏ hơn.

`lte`: Nhỏ hơn hoặc bằng.

**Note**: Khi sử dụng range query với `date` field, bạn có thể sử dụng [date math](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/common-options.html#date-math) với 4 tham số ở trên. Ví dụ: truy vấn sau đây trả về các document có `timestamp` có giá trị ngày giữa hôm qua và hôm nay.
```
GET /_search
{
    "query": {
        "range" : {
            "timestamp" : {
                "gte" : "now-1d/d",
                "lt" :  "now/d"
            }
        }
    }
}
```
## Boolean query
Boolean query là một ví dụ của compound query clause. Nó được sử dụng để kết hợp nhiều mệnh đề query khác sử dụng toán tử boolean. Mỗi mệnh đề có kiểu sau:

**must**: tương ứng với toán tử `AND`, document phải phù hợp với tất cả query bên trong `must` và có tính score.

**filter**: document phải phù hợp với tất cả query bên trong `filter`. mệnh đề filter được thực thi trong filter context nên score sẽ được bỏ qua và mệnh đề được xem xét để cache.

**should**: tương ứng với toán tử `OR`, document phù hợp với 1 trong các query bên trong `should`.

**must_not**: tương ứng với toán tử `NOT`, document phải không phù hợp với tất cả các query bên trong `must_not`

Ví dụ:
```
POST _search
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "user" : "kimchy" }
      },
      "filter": {
        "term" : { "tag" : "tech" }
      },
      "must_not" : {
        "range" : {
          "age" : { "gte" : 10, "lte" : 20 }
        }
      },
      "should" : [
        { "term" : { "tag" : "wow" } },
        { "term" : { "tag" : "elasticsearch" } }
      ],
      "minimum_should_match" : 1,
      "boost" : 1.0
    }
  }
}
```
## Tóm tắt
Qua bài viết này mình đã giới thiệu ở mức cơ bản những query thông dụng thường được sử dụng trong Elasticsearch. Ngoài ra còn rất nhiều query khác và cách sử dụng phức tạp hơn của những query mình đã nêu ở trên, các bạn có thể tìm hiểu thêm ở link mình để bên dưới phần tham khảo.
## Tham khảo
[https://www.elastic.co/guide/en/elasticsearch/reference/7.6/query-dsl.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/query-dsl.html)