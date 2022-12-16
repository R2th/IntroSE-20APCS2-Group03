Xin chào, tiếp nối chủ đề hôm trước, mình đang giới thiệu cho các bạn về một công cụ search đó là Elasticsearch cũng như một số truy vấn phổ biến và đơn giản trong Elasticsearch, bạn có thể tham khảm tại đây: [(phần 1: Giới thiệu căn bản về Elasticsearch)](https://viblo.asia/p/elasticsearch-va-query-dsl-OeVKBdY0lkW).

Và hôm nay, mình sẽ giới thiệu đến các bạn một số truy vấn nâng cao và khá hữu hiệu khi sử dụng Elasticsearch.
### 1. Elasticsearch là gì?
 [(phần 1: Giới thiệu căn bản về Elasticsearch)](https://viblo.asia/p/elasticsearch-va-query-dsl-OeVKBdY0lkW)
### 2. Tại sao phải sử dụng Elasticsearch?
 [(phần 1: Giới thiệu căn bản về Elasticsearch)](https://viblo.asia/p/elasticsearch-va-query-dsl-OeVKBdY0lkW)
### 3. Sử dụng Elasticsearch như thế nào?
### **Query DSL**
### Nested query

Nested query cho phép thực hiện truy vấn lồng nhau với các đối tượng.

Cấu trúc câu Nested query đơn giản

```
GET /_search
{
    "query": {
        "nested" : {
            "path" : "obj1",
            "score_mode" : "avg",
            "query" : {
                "bool" : {
                    "must" : [
                    { "match" : {"obj1.name" : "blue"} },
                    { "range" : {"obj1.count" : {"gt" : 5}} }
                    ]
                }
            }
        }
    }
}
```
path: là đường dẫn trỏ đến đối tượng nested, và bất kỳ trường nào được tham chiếu đến bên trong truy vấn bắt buộc phải sử dụng đường dẫn đầy đủ.

score_mode: thể hiện mức độ phù hợp của đối tượng nested đối với đối tượng mà nó phụ thuộc. Mặc định sẽ là avg, ngoài ra, ta cũng có thể sử dụng: sum, min, max hoặc none.

### Exists query
Exists query được sử dụng để trả về các document có chứa giá trị khác null hoặc [] trong trường truy vấn của câu query

Cấu trúc câu Exists query:
```
GET /_search
{
    "query": {
        "exists": {
            "field": "user"
        }
    }
}
```
fields: là các trường sẽ bị ảnh hưởng, câu query sẽ tìm kiếm trong các trường trong fields để trả về kết quả.

Các document kết quả phải thoả mãn, các field này phải tồn tại và có giá trị khác null hoặc []. Ví dụ như:

* Chuỗi rỗng: " ", "-"
 
* Mảng chứa giá trị null: [null, 'foo']

* Các trường chứa các giá trị null

Với Exists query, ta có thể sử dụng 'must_not' để thay đổi câu truy vấn ngược với điều kiện trên.

Ta có thể thực hiện tìm kiếm các document chỉ chứa các giá trị null hoặc [] với câu truy vấn tồn tại boolean must_not

ví dụ
```
GET /_search
{
    "query": {
        "bool": {
            "must_not": {
                "exists": {
                    "field": "user"
                }
            }
        }
    }
}
```

Với cấu trúc câu truy vấn trên, ta sẽ có câu truy vấn dạng: tìm tất cả các document đảm bảo trường trong câu truy vấn là user sẽ chứa các giá trị null hoặc [].

### Simple query string query
Tương tự với Match query, Simple query string sẽ match các document với field theo điều kiện query tuy nhiên nó có khả năng bỏ qua exception và loại bỏ các phần không hợp lệ của câu truy vấn.

Cấu trúc của elasticsearch query có dạng
```
GET /_search
{
    "query": {
        "simple_query_string" : {
            "fields" : ["content"],
            "query" : "foo bar -baz",
            "default_operator": "or"
        }
    }
}
```
fields: là các trường sẽ bị ảnh hưởng và có giới hạn về số lượng trường có thể được thực hiện truy vấn cùng một lúc (mặc định sẽ là 1024).

default_operator: toán tử xác định điều kiện truy vấn trong câu query, mặc định sẽ là 'or', ngoài ra có thể sử dụng 'and' để thực hiện truy vấn với điều kiện kết hợp.

query: từ khóa mà bạn muốn match với document. Trong câu query sẽ có những cú pháp để loại bỏ hoặc thêm kết quả cho câu truy vấn. Khi không chỉ rõ trường cần tìm trong cú pháp câu truy vấn thì mặc định sẽ là ' * ' và nó sẽ tự xác định các trường hiện có trong index để thực hiện tìm kiếm trên các trường đó.

Những cú pháp đơn giản trong query:

* '+': biểu thị cho toán tử AND
* '|': biểu thị cho toán tử OR
* '-': loại bỏ kết quả match với điều kiện sau nó
* '( and )': thể hiện mức độ ưu tiên
* ' " ': kết thúc một cụm từ tìm kiếm

Hỗ trợ multi field, chẳng hạn như:

```
GET /_search
{
    "query": {
        "simple_query_string" : {
            "fields" : ["content", "name.*^5"],
            "query" : "foo bar -baz"
        }
    }
}
```

Hỗ trợ nhiều cờ để chỉ định tính năng phân tích cú pháp nào được sử dụng ở thời điểm nào trong câu query
```
GET /_search
{
    "query": {
        "simple_query_string" : {
            "query" : "foo | bar + baz*",
            "flags" : "OR|AND|PREFIX"
        }
    }
}
```

Các flags có sẵn hỗ trợ truy vấn:
* 'ALL': cho phép thực hiện toàn bộ flags, đây cũng là giá trị mặc định
* 'NONE': tắt toàn bộ flags trong câu truy vấn
* 'AND': cho phép toán tử '+' được sử dụng
* 'OR': cho phép toán tử '|' được sử dụng
* 'NOT': cho phép toán tử '-' được sử dụng

Và với cấu trúc trên, ta sẽ có thể thực hiện việc tìm kiếm với nội dung: Tìm kiếm tất cả các document có content chứa foo hoặc bar và tất cả kết quả trả về đảm bảo không chứa baz trong content.


### Tổng kết
Trong bài này, mình đã giới thiệu đến các bạn một số loại query tuy không phổ biến nhưng cũng khá là hữu ích trong việc search engine. Hy vọng nó sẽ bổ ích đối với bạn.

**Tài liệu tham khảo**
[https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html)
[https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-mlt-query.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-mlt-query.html)