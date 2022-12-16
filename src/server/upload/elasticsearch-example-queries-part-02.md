Chào các bạn, tiếp nối phần "Elasticsearch Example Queries - Part 01" - https://viblo.asia/p/elasticsearch-example-queries-part-01-gAm5yqVA5db#_1-basic-match-query-2, thì hôm nay chúng ta tiếp tục đi vào các ví dụ nhé.

Ở bài viết trước chúng ta đã tìm hiểu đến phần "Multi-field Search" rồi, giờ tiếp tục nào.

# Bool Query
Chúng ta có thể sử dụng AND/OR/NOT trong câu query, được gọi là `Bool Query` trong search API.

`Bool` query quy định:

- Params `must` được xem như `AND`.
- Params `must_not` được xem như `NOT`.
- Params `should` được xem như `OR`.

Ví dụ, khi ta muốn tìm quyển sách với `title` có từ khoá `Elasticsearch` hoặc `Solr`. Và được viết bởi tác giả `clinton gormley` và không phải của tác giả `radu gheorge` THÌ:

- Câu lệnh:

```
POST /bookdb_index/book/_search
{
  "query": {
    "bool": {
      "should": [
          { "match": { "title": "Elasticsearch" }},
          { "match": { "title": "Solr" }}
        ],
      "must": {"match": {"authors": "clinton gormey"}},
      "must_not": {"match": {"authors": "radu gheorge"}}
    }
  }
}
```
- Ý nghĩa: Lấy ra tất cả kết quả có title là `Elasticsearch` hoặc `Solr` (should) và phải được viết từ tác giả `clinton gormely` (must) và không được viết từ tác giả `radu gheorge` (must_not)
- Kết quả:
![](https://images.viblo.asia/c6760f9f-2a43-4d04-9e2a-a75222aca22b.png)

Lưu ý rằng trong câu lệnh `bool` query này chúng ta chỉ được sử dụng `should`, `must` và `must_not` một lần trong một câu `bool` query thôi nhé.

Nếu sử dụng thì `Kibana` sẽ báo lỗi `Duplicate key "must" Syntax error` như hình dưới:

![](https://images.viblo.asia/50f8898b-82fa-49b3-a61c-fd86b0bbbd9f.png)

# Wildcard Query
`Wildcard queries` cho phép chúng ta định nghĩa các `pattern` trong câu query. `?` sẽ match bất kỳ character nào và `*` sẽ match với 0 hoặc nhiều character.

Ví dụ, muốn tìm tất cả records mà có tác giả với tên bắt đầu bằng kí tự `t`.

- Câu lệnh:

```
POST /bookdb_index/book/_search
{
    "query": {
        "wildcard" : {
            "authors" : "t*"
        }
    },
    "_source": ["title", "authors"],
    "highlight": {
        "fields" : {
            "authors" : {}
        }
    }
}
```
- Ý nghĩa: Lấy tất cả records có tác giả với tên bắt đầu bằng kí tự `t`.
- Kết quả:
![](https://images.viblo.asia/85c00ec9-62f4-4911-ac3b-16246bf7ef84.png)
 
 # Regexp Query
 
Tương tự `wilcard query`, `regexp query` cũng cho phép bạn định nghĩa `pattern` nhưng độ phức tạp cao hơn.

Ví dụ, muốn lấy ra tất cả các records có tác giả với tên bắt đầu bằng ký tự `t`, tiếp theo đó là kí tự nào cũng được và kết thúc bằng ký tự `y`.

- Câu lệnh:

```
POST /bookdb_index/book/_search
{
    "query": {
        "regexp" : {
            "authors" : "t[a-z]*y"
        }
    },
    "_source": ["title", "authors"],
    "highlight": {
        "fields" : {
            "authors" : {}
        }
    }
}
```
- Ý nghĩa: Lấy ra tất cả các records có tác giả với tên bắt đầu bằng ký tự `t`, tiếp theo đó là kí tự nào cũng được và kết thúc bằng ký tự `y`.
- Kết quả:

![](https://images.viblo.asia/a077c979-927a-466f-9d63-302369ea16b8.png)

# Match Phrase Query

`match phrase query` yêu cầu tất cả thành phần trong câu search phải có trong kết quả search được, kể cả vị trí được định nghĩa trong câu query. Mặc định, tất cả điều kiện search được yêu cầu phải đứng cạnh nhau, nhưng bạn có thể sử dụng `slop` để quy định khoảng cách của các phần tử trong kết quả.

Ví dụ, tìm tất cả records có `title`, `summary` có chứa cụm từ `search engine`, và khoảng cách có thể cách nhau 3. (VD có 1 records chứa `search engine` nhưng là như sau: `search the type engine` thì vẫn match)

- Câu lệnh:

```
POST /bookdb_index/book/_search
{
    "query": {
        "multi_match" : {
            "query": "search engine",
            "fields": ["title", "summary"],
            "type": "phrase",
            "slop": 3
        }
    },
    "_source": [ "title", "summary", "publish_date" ]
}
```
- Ý nghĩa: tìm tất cả records có `title`, `summary` có chứa cụm từ `search engine`, và khoảng cách có thể cách nhau 3.
- Kết quả:

![](https://images.viblo.asia/e476ed86-7974-4531-ab55-c37157e9e619.png)

# Match phrase prefix
`match phrase prefix` query cung cấp kiểu search `search-as-you-type`, cũng giống như `match phrase` query ở trên thì nó cũng cho phép `slop` params định nghĩa khoảng cách cho phép của các từ. Ngoài ra nó cũng cho phép `max_expansions` params để giới hạn số ký tự match với câu query với mục đích tăng phần chính xác.

Ví dụ, lấy tất cả records với `title`, hoặc `summary`, `publish_date` có chứa cụm từ `search en` và khoảng cách cho phép của 2 từ `search` và `en` là 3. Giới hạn cho phép của việc match query là 10 từ kể từ từ cuối cùng.

- Câu lệnh:

```
POST /bookdb_index/book/_search
{
    "query": {
        "match_phrase_prefix" : {
            "summary": {
                "query": "search en",
                "slop": 3,
                "max_expansions": 10
            }
        }
    },
    "_source": [ "title", "summary", "publish_date" ]
}
```
- Ý nghĩa: lấy tất cả records với `title`, hoặc `summary`, `publish_date` có chứa cụm từ `search en` và khoảng cách cho phép của 2 từ `search` và `en` là 3. Giới hạn cho phép của việc match query là 10 từ kể từ từ cuối cùng.
- Kết quả:

![](https://images.viblo.asia/7cb0d608-10d9-4fa2-8dd0-a8149a222a96.png)


Như vậy qua các ví dụ trên chúng ta đã hiểu thêm nhiều về `bool` query, `wilcard` query, `match phrase` query, ...
Cảm ơn các bạn đã theo dõi, hẹn gặp lại các bạn ở phần tiếp theo!

Nguồn: https://dzone.com/articles/23-useful-elasticsearch-example-queries
Phần 01: https://viblo.asia/p/elasticsearch-example-queries-part-01-gAm5yqVA5db#_1-basic-match-query-2