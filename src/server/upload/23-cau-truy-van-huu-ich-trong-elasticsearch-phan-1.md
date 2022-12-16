# Mở đầu
Để minh họa các loại truy vấn khác nhau trong Elasticsearch, trong bài viết này, chúng ta sẽ cùng nhau tìm kiếm tập hợp các book documents với các field sau: title, authors, summary, release date, and number of reviews.
Trước hết ta cần tạo index mới và đánh index cho các document:
```
PUT /bookdb_index
    { "settings": { "number_of_shards": 1 }}
```
Đánh index
```
POST /bookdb_index/book/_bulk
    { "index": { "_id": 1 }}
    { "title": "Elasticsearch: The Definitive Guide", "authors": ["clinton gormley", "zachary tong"], "summary" : "A distibuted real-time search and analytics engine", "publish_date" : "2015-02-07", "num_reviews": 20, "publisher": "oreilly" }
    { "index": { "_id": 2 }}
    { "title": "Taming Text: How to Find, Organize, and Manipulate It", "authors": ["grant ingersoll", "thomas morton", "drew farris"], "summary" : "organize text using approaches such as full-text search, proper name recognition, clustering, tagging, information extraction, and summarization", "publish_date" : "2013-01-24", "num_reviews": 12, "publisher": "manning" }
    { "index": { "_id": 3 }}
    { "title": "Elasticsearch in Action", "authors": ["radu gheorge", "matthew lee hinman", "roy russo"], "summary" : "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms", "publish_date" : "2015-12-03", "num_reviews": 18, "publisher": "manning" }
    { "index": { "_id": 4 }}
    { "title": "Solr in Action", "authors": ["trey grainger", "timothy potter"], "summary" : "Comprehensive guide to implementing a scalable search engine using Apache Solr", "publish_date" : "2014-04-05", "num_reviews": 23, "publisher": "manning" }
```

# Truy vấn
### Basic Match Query
Có hai cách để thực hiện full-text search (matching) cơ bản: sử dụng `Search Lite API`, tất cả các thông số tìm kiếm sẽ trở thành URL params hoặc sử dụng `full JSON request body` cho phép bạn sử dụng đầy đủ Elasticsearch DSL.

Dưới đây là một câu truy vấn match cơ bản nhằm tìm kiếm một string `guide` trong tất cả các fields:
```
GET /bookdb_index/book/_search?q=guide
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.28168046,
        "_source": {
          "title": "Elasticsearch: The Definitive Guide",
          "authors": [
            "clinton gormley",
            "zachary tong"
          ],
          "summary": "A distibuted real-time search and analytics engine",
          "publish_date": "2015-02-07",
          "num_reviews": 20,
          "publisher": "manning"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.24144039,
        "_source": {
          "title": "Solr in Action",
          "authors": [
            "trey grainger",
            "timothy potter"
          ],
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "publish_date": "2014-04-05",
          "num_reviews": 23,
          "publisher": "manning"
        }
      }
    ]
```
Nếu làm theo cách để câu truy vấn vào trong body của request:
```

{
    "query": {
        "multi_match" : {
            "query" : "guide",
            "fields" : ["_all"]
        }
    }
}
```
Từ khoá `multi_match` được sử dụng thay cho từ khóa `match`, là cách viết thuận tiện hơn để chạy cùng một truy vấn đối với nhiều field. Thuộc tính `fields` xác định xem field nào cần truy vấn và trong trường hợp này, ta đang muốn truy vấn tất cả các field trong document.
Cả hai loại API đều cho phép bạn chỉ định field nào bạn muốn tìm kiếm. Ví dụ: để tìm kiếm các sách có từ "In action" trong trường tiêu đề:
```
GET /bookdb_index/book/_search?q=title:in action
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.6259885,
        "_source": {
          "title": "Solr in Action",
          "authors": [
            "trey grainger",
            "timothy potter"
          ],
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "publish_date": "2014-04-05",
          "num_reviews": 23,
          "publisher": "manning"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 0.5975345,
        "_source": {
          "title": "Elasticsearch in Action",
          "authors": [
            "radu gheorge",
            "matthew lee hinman",
            "roy russo"
          ],
          "summary": "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms",
          "publish_date": "2015-12-03",
          "num_reviews": 18,
          "publisher": "manning"
        }
      }
    ]
```
Tuy nhiên, `full body DSL` cung cấp cho bạn cách thức linh hoạt hơn trong việc tạo các câu truy vấn phức tạp và trong việc xác định cách bạn muốn kết quả trở lại. Trong ví dụ dưới đây, chúng ta xác định số lượng kết quả chúng ta muốn quay trả lại:
```
POST /bookdb_index/book/_search
{
    "query": {
        "match" : {
            "title" : "in action"
        }
    },
    "size": 2,
    "from": 0,
    "_source": [ "title", "summary", "publish_date" ],
    "highlight": {
        "fields" : {
            "title" : {}
        }
    }
}
[Results]
"hits": {
    "total": 2,
    "max_score": 0.9105287,
    "hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 0.9105287,
        "_source": {
          "summary": "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms",
          "title": "Elasticsearch in Action",
          "publish_date": "2015-12-03"
        },
        "highlight": {
          "title": [
            "Elasticsearch <em>in</em> <em>Action</em>"
          ]
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.9105287,
        "_source": {
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        },
        "highlight": {
          "title": [
            "Solr <em>in</em> <em>Action</em>"
          ]
        }
      }
    ]
  }
```

### Multi-field Search
Như chúng ta đã thấy, để truy vấn trong nhiều field (ví dụ: tìm kiếm cùng chuỗi truy vấn trong cả tiêu đề và tóm tắt), ta sử dụng truy vấn `multi_match`:
```
POST /bookdb_index/book/_search
{
    "query": {
        "multi_match" : {
            "query" : "elasticsearch guide",
            "fields": ["title", "summary"]
        }
    }
}
[Results]
"hits": {
    "total": 3,
    "max_score": 0.9448582,
    "hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.9448582,
        "_source": {
          "title": "Elasticsearch: The Definitive Guide",
          "authors": [
            "clinton gormley",
            "zachary tong"
          ],
          "summary": "A distibuted real-time search and analytics engine",
          "publish_date": "2015-02-07",
          "num_reviews": 20,
          "publisher": "manning"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 0.17312013,
        "_source": {
          "title": "Elasticsearch in Action",
          "authors": [
            "radu gheorge",
            "matthew lee hinman",
            "roy russo"
          ],
          "summary": "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms",
          "publish_date": "2015-12-03",
          "num_reviews": 18,
          "publisher": "manning"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.14965448,
        "_source": {
          "title": "Solr in Action",
          "authors": [
            "trey grainger",
            "timothy potter"
          ],
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "publish_date": "2014-04-05",
          "num_reviews": 23,
          "publisher": "manning"
        }
      }
    ]
  }
```
Ở đây record thứ 3 matched bởi vì từ `guide` được tìm thấy trong summary

### Boosting
Vì ta đang tìm kiếm trên nhiều field, ta có thể tăng trọng số ở  một số field nhất định. Trong ví dụ được nêu dưới đây, ta tăng trọng số của field summary, điều này sẽ làm document có id 4 là kết quả gần với câu truy vấn nhất
```
POST /bookdb_index/book/_search
{
    "query": {
        "multi_match" : {
            "query" : "elasticsearch guide",
            "fields": ["title", "summary^3"]
        }
    },
    "_source": ["title", "summary", "publish_date"]
}
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.31495273,
        "_source": {
          "summary": "A distibuted real-time search and analytics engine",
          "title": "Elasticsearch: The Definitive Guide",
          "publish_date": "2015-02-07"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.14965448,
        "_source": {
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 0.13094766,
        "_source": {
          "summary": "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms",
          "title": "Elasticsearch in Action",
          "publish_date": "2015-12-03"
        }
      }
    ]
```

### Bool Query
Toán tử AND / OR / NOT có thể được sử dụng để tinh chỉnh các truy vấn tìm kiếm để kết quả có độ liên quan hoặc cụ thể hơn. Điều này được thực hiện dưới dạng truy vấn bool. Truy vấn bool chấp nhận một tham số ```must` (tương đương AND), một tham số must_not (tương đương với NOT) và một tham số `should` (tương đương với OR). Ví dụ: nếu tôi muốn tìm kiếm một cuốn sách có từ "Elasticsearch" HOẶC "Solr" trong tiêu đề, VÀ của tác giả của "clinton gormley" nhưng KHÔNG phải do tác giả  "radu gheorge" viết:
```
POST /bookdb_index/book/_search
{
    "query": {
        "bool": {
            "must": {
                "bool" : { "should": [
                      { "match": { "title": "Elasticsearch" }},
                      { "match": { "title": "Solr" }} ] }
            },
            "must": { "match": { "authors": "clinton gormely" }},
            "must_not": { "match": {"authors": "radu gheorge" }}
        }
    }
}
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.3672021,
        "_source": {
          "title": "Elasticsearch: The Definitive Guide",
          "authors": [
            "clinton gormley",
            "zachary tong"
          ],
          "summary": "A distibuted real-time search and analytics engine",
          "publish_date": "2015-02-07",
          "num_reviews": 20,
          "publisher": "oreilly"
        }
      }
    ]
```

### Fuzzy Queries
Để hiểu được nguyên lý của fuzzy query, trước hết ta phải nắm được về khoảng cách Levenshtein: Khoảng cách Levenshtein thể hiện khoảng cách khác biệt giữa 2 chuỗi ký tự.

Khoảng cách Levenshtein giữa chuỗi S1 và chuỗi S2 là số bước ít nhất biến chuỗi S1 thành chuỗi S2 thông qua 3 phép biến đổi là:

* xoá 1 ký tự.
* thêm 1 ký tự.
* thay ký tự này bằng ký tự khác.
Ví dụ: Khoảng cách Levenshtein giữa 2 chuỗi "kitten" và "sitting" là 3, vì phải dùng ít nhất 3 lần biến đổi.

kitten -> sitten (thay "k" bằng "s")
sitten -> sittin (thay "e" bằng "i")
sittin -> sitting (thêm ký tự "g")

Fuzzy query trong Elasticsearch cũng sử dụng khoảng cách Levenshtein, và cho phép ta config tham số fuzziness để cho kết quả phù hợp nhất với nhu cầu của mình:

0, 1, 2: Là khoảng cách Levenshtein lớn nhất được chấp thuận. 
AUTO: Sẽ tự động điều chỉnh kết quả dựa trên độ dài của term. Cụ thể:
0..2: bắt buộc match chính xác (khoảng cách Levenshtein lớn nhất là 0)
3..5: khoảng cách Levenshtein lớn nhất là 1
5 trở lên: khoảng cách Levenshtein lớn nhất là 2

```
POST /bookdb_index/book/_search
{
    "query": {
        "multi_match" : {
            "query" : "comprihensiv guide",
            "fields": ["title", "summary"],
            "fuzziness": "AUTO"
        }
    },
    "_source": ["title", "summary", "publish_date"],
    "size": 1
}
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.5961596,
        "_source": {
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        }
      }
    ]
```

### Wildcard Query
Truy vấn wildcard cho phép bán truy vấn theo pattern thay vì phải match cả đoạn text. Kí tự `?` có nghĩa là match bất cứ kí tự nào và `*`  match 0 hoặc nhiều kí tự. Ví dụ tìm kiếm các tác giả có tên bắt đầu bằng kí tự `t`
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
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 1,
        "_source": {
          "title": "Elasticsearch: The Definitive Guide",
          "authors": [
            "clinton gormley",
            "zachary tong"
          ]
        },
        "highlight": {
          "authors": [
            "zachary <em>tong</em>"
          ]
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "2",
        "_score": 1,
        "_source": {
          "title": "Taming Text: How to Find, Organize, and Manipulate It",
          "authors": [
            "grant ingersoll",
            "thomas morton",
            "drew farris"
          ]
        },
        "highlight": {
          "authors": [
            "<em>thomas</em> morton"
          ]
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 1,
        "_source": {
          "title": "Solr in Action",
          "authors": [
            "trey grainger",
            "timothy potter"
          ]
        },
        "highlight": {
          "authors": [
            "<em>trey</em> grainger",
            "<em>timothy</em> potter"
          ]
        }
      }
    ]
```

### Regexp Query
Truy vấn Regexp cho phép tìm kiếm theo các pattern phức tạp hơn so với wildcard. Ví dụ: tìm các document có tác giả có tên bắt đầu bằng `t` và kết thúc băng `y`:
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
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 1,
        "_source": {
          "title": "Solr in Action",
          "authors": [
            "trey grainger",
            "timothy potter"
          ]
        },
        "highlight": {
          "authors": [
            "<em>trey</em> grainger",
            "<em>timothy</em> potter"
          ]
        }
      }
    ]
```

### Match Phrase Query
Match phrase query yêu cầu tất cả các term trong query string phải xuất hiện trong document, theo đúng trật tự trong query string và phải nằm gần nhau. Default thì các term phảm nằm chính xác cạnh nhau, tuy nhiên khoảng cách đó có thể thay đổi nếu ta thêm tham số `slop` :
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
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.22327082,
        "_source": {
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.16113183,
        "_source": {
          "summary": "A distibuted real-time search and analytics engine",
          "title": "Elasticsearch: The Definitive Guide",
          "publish_date": "2015-02-07"
        }
      }
    ]
```

### Match Phrase Prefix
Match phrase prefix gần tương tự với match phrase query, chỉ khác là ta không cần type đủ nguyên query string, mà chỉ cần một phần và nó sẽ autocomplete query string vào thời điểm query time. Nó cũng chấp nhận tham số `slop` như match phrase query
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
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.5161346,
        "_source": {
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.37248808,
        "_source": {
          "summary": "A distibuted real-time search and analytics engine",
          "title": "Elasticsearch: The Definitive Guide",
          "publish_date": "2015-02-07"
        }
      }
    ]
```

### To be continued..
# Kết luận
### Tài liệu tham khảo
1. [https://dzone.com/articles/23-useful-elasticsearch-example-queries](https://dzone.com/articles/23-useful-elasticsearch-example-queries)
2. [(https://viblo.asia/p/khoang-cach-levenshtein-va-fuzzy-query-trong-elasticsearch-jvElaOXAKkw](https://viblo.asia/p/khoang-cach-levenshtein-va-fuzzy-query-trong-elasticsearch-jvElaOXAKkw)