Tiếp theo bài viết về Cài đặt và sử dụng ElasticSearch trong Ruby On Rails ở [bài viết trước của mình](https://viblo.asia/p/cai-dat-va-su-dung-elasticsearch-trong-ruby-on-rails-ByEZk0p4lQ0), thì hôm nay mình giới thiệu tiếp về các loại query trong ElasticSearch mà mình biết.
## 1.Bool query 
Loại query này cho phép kết hợp khác câu truy vấn khác nhau tùy trường hợp mà bạn muốn dùng cho hợp lý:
* must: phải phù hợp với tất cả các điều kiện và đóng góp vào điểm số.
* filter: giống với must nhưng bỏ qua điểm số.
* should: Chỉ cần phù hợp vs một trong các điều kiện.( theo mình thấy thì loại này rất hay ).
* must_not: Người lại với must, phải không phù hợp với tất cả các điều kiện.
```
POST _search
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "user" : "doankun" }
      },
      "filter": {
        "term" : { "tag" : "dep" }
      },
      "must_not" : {
        "range" : {
          "age" : { "gte" : 20, "lte" : 30 }
        }
      },
      "should" : [
        { "term" : { "tag" : "hi" } },
        { "term" : { "tag" : "elasticsearch" } }
      ],
      "minimum_should_match" : 1,
      "boost" : 1.0
    }
  }
}
```
khi chạy nếu nó hiện như này trên server của elasticsearch thì đúng rồi nhé :D.
## 2.Match All Query
Đây là câu truy vấn đơn giản nhất, được sử dụng thường xuyên và hầu như là trong các dự án đều có.
```
GET staff/_search
{
    "query": {
        "match_all": {}
    }
}
```
Response của nó trả về như này khi mở server của elasticsearch là đúng nhé :D
```
{
  "took": 5,
  "timed_out": false,
  "_shards": {
    "total": 6,
    "successful": 6,
    "failed": 0
  },
  "hits": {
    "total": 1012,
    "max_score": 1,
    "hits": [
       ...   
    ]
  }
}
```
## 3. Term level queries
Loại truy vấn này thường được dùng trong các kiểu dữ liệu enum, số hoặc ngày tháng.
* Tern query
    Truy vấn term tìm những record có chứa cụm từ chính xác trong query.
ví dụ trong trường hợp này:
```

GET staff/_search
{
  "query": {
    "term" : { "name" : "hello world" } 
  }
}
```
thì khi bạn search chính xác cụm từ hello hay world thì nó mới trả về kết quả đúng nhé.
* Range Query
    Loại truy vấn này trả về các record với trường khớp với phạm vi nhất định.
ví dụ trong trường hợp này:
```
GET staff/_search
{
    "query": {
        "range" : {
            "gpa" : {
                "gte" : 20,
                "lte" : 30
            }
        }
    }
}
```
thì phạm vi sẽ nằm từ 30 <= đk search đúng <= 20.
4 loại như sau:
    ```
    * lte: Nhỏ hơn hoặc bằng
    * lt: Nhỏ hơn
    * gte: Lớn hơn hoặc bằng
    * gt: Lớn hơn
    ```
* Kết hợp Date format in range queries nhé:
```
GET staff/_search
{
    "query": {
        "range" : {
            "apply_date" : {
                "gte": "01/01/1994",
                "lte": "2018",
                "format": "dd/MM/yyyy||yyyy"
            }
        }
    }
}
```
* Wildcard Query:
Trả về các record khớp với các ký tự đại diện được đưa ra.
GET staff/_search
{
    "query": {
        "wildcard" : { "name" : "*oa*" }
    }
}
Với query thế này thì record có name là "doan" cũng đúng mà có name là "Loan" cũng đúng.
## 4. Full text queries
Loại truy vấn này thường được sử dụng cho các trường full text như nội dung email... Các trường này thường được phân tích từ trước, và có các loại phân tích (analyzer) cho mỗi loại field.
* Match query
Loại truy vấn này để thực hiện full text query. Bao gồm truy vấn kết hợp và truy vấn cụm từ hoặc gần đúng. Match query chấp nhận văn bản, số, ngày tháng.
```
GET staff/_search
{
    "query": {
        "match" : {
            "name" : "Doan Kun",
            "email" : "le.dinh.doan@framgia.com"
        }
    }
}
```
```
"hits": {
    "total": 1,
    "max_score": 2.6868117,
    ...
}
```
Kết quả trả về là tất cả các record mà trong tên có Doan hoặc Kun hoặc email.
Chúng ta có thể thêm điều kiện and hoặc or cho tùy trường hợp nhé (mặc định là or rùi nha):
```
GET staff/_search
{
    "query": {
        "match" : {
            "name" : {
                "query" : "Doan Kun",
                "operator" : "and"
            }
        }
    }
}
```

```
"hits": {
    "total": 1,
    "max_score": 2.6868117,
    ...
}
```
ở đây, kết quả trả về phải có Doan hoặc Kun.

* Multi Match Query (theo mình thấy thì thường được dùng phổ biến):
Sử dụng từ truy vấn match và cho phép search nhiều trường:
```
GET staff/_search
{
  "query": {
    "multi_match" : {
      "query":    "Name", 
      "fields": [ "name", "address" ] 
    }
  }
}
```
ý nghĩa là chúng ta đang muốn query: "Name" cho cả 2 field là name hoặc address.
* Field có thể chỉ định bằng ký tự đại diện:
```
GET staff/_search
{
  "query": {
    "multi_match" : {
      "query":    "Name", 
      "fields": [ "*_name", "address" ] 
    }
  }
}
```
Khi này ta có thể search cả field full_name và first_name, last_name.
* Match Phrase Prefix Query
Cũng giống match_phrase, nhưng thêm điều kiện khớp với tiền tố của từ trong văn bản.

```
GET staff/_search
{
    "query": {
        "match_phrase_prefix" : {
            "name" : "Doan Din"
        }
    }
}
```
Với truy vấn này thì "Doan Dinh" cũng match mà "Doan Dinhhh" cũng đúng.

Các bán có thể tìm hiểu thêm về Controlling Analysis tại [link](https://www.elastic.co/guide/en/elasticsearch/guide/current/_controlling_analysis.html) này nhé.
Bài viết này mình muốn giới thiệu về các query mà mình đã dùng, nếu có gì các bạn đóng góp nhé :)