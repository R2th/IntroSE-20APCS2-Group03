# Giới thiệu
Elasticsearch là một công cụ tìm kiếm rất mạnh mẽ và quá nổi tiếng rồi, nếu bạn chưa biết về Elasticsearch hoặc chưa biết khi nào thì nên dùng Elasticsearch thì hãy google ngay trước khi đọc bài viết này nhé! Còn ở bài viết này mình sẽ chỉ liệt kê ra các truy vấn cơ bản thường được dùng trong Elasticsearch thôi.

Để minh họa cho các loại truy vấn khác nhau trong Elasticsearch, chúng ta sẽ tìm kiếm trên một bộ dữ liệu về sách với các trường sau: tên sách, tác giả, tóm tắt, ngày phát hành và số lượng bài đánh giá.

Nhưng trước tiên, hãy tạo một index mới và đánh index bằng [bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html)
```
PUT /bookdb_index
    { "settings": { "number_of_shards": 1 }}
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
# Các ví dụ
## match query
Đây là cách truy vấn toàn văn bản cơ bản
```
POST /bookdb_index/book/_search
{
    "query": {
        "match" : {
            "title" : "guide"
        }
    }
}
```
```
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
      }
   ]
```
## multi_match query
Từ khóa multi_match được sử dụng thay thế cho từ khóa match để chạy cùng một truy vấn dựa trên nhiều trường. Thuộc tính filed chỉ định những trường nào cần truy vấn.
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
```
```
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
Lưu ý rằng hit 3 phù hợp vì từ "guide" được tìm thấy trong summary.
## Boosting
Đôi khi trong truy vấn trên nhiều trường, chúng ta muốn tăng trọng số cho một trường nào đó. Ví dụ chúng ta sẽ tăng trọng số của trường summary lên 3 để tăng tầm quan trọng của trường summary, do đó sẽ làm tăng mức độ liên quan của document có _id_ 4.
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
```
```
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
Lưu ý: Tăng trọng số không có nghĩa là điểm được tính được nhân với hệ số tăng. Giá trị tăng thực tế được áp dụng trải qua quá trình chuẩn hóa và một số tối ưu hóa nội bộ. Bạn có thể tìm thêm thông tin về cách hoạt động của boosting trong [hướng dẫn của Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/guide/current/query-time-boosting.html).
## Bool Query
Trong truy vấn chúng ta thường dùng các toán tử AND / OR / NOT để tăng cường tính cụ thể và chính xác của kết quả. Điều này được triển khai trong API truy vấn dưới dạng bool query. Bool query chấp nhận tham số must (tương đương với AND), must_not (tương đương với NOT) và should (tương đương với OR). Ví dụ, chúng ta muốn tìm kiếm một cuốn sách có từ “Elasticsearch” HOẶC “Solr” trong tiêu đề VÀ được viết bởi tác giả “clinton gormley” nhưng KHÔNG phải là tác giả “radu gheorge”.
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
```
```
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
Như bạn thấy, một truy vấn bool có thể bao bọc bất kỳ loại truy vấn nào khác bao gồm các truy vấn bool khác để tạo các truy vấn phức tạp hoặc lồng nhau tùy ý.
## Fuzzy Queries
Tìm kiếm fuzzy có thể được sử dụng trong truy vấn match hoặc multi_match để bắt lỗi chính tả. Mức độ tìm kiếm mập mờ được xác định dựa trên khoảng cách Levenshtein từ từ gốc.
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
```
```
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
Giá trị độ mờ  "AUTO" tương đương với việc chỉ định giá trị là 2 khi độ dài cụm từ lớn hơn 5. Tuy nhiên, việc cài đặt 80% lỗi chính tả của con người có khoảng cách chỉnh sửa là 1 và đặt độ mờ thành 1 có thể cải thiện tổng thể hiệu suất tìm kiếm của bạn.
## Wildcard Query
Truy vấn wildcard cho phép bạn chỉ định một mẫu để tìm kiếm thay vì toàn bộ cụm từ. Kí tự ? khớp với bất kỳ ký tự nào và * khớp với không hoặc nhiều ký tự. Ví dụ: để tìm tất cả các bản ghi có tác giả có tên bắt đầu bằng chữ cái ‘t’.
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
```
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
## Term/Terms Query
Ngoài việc tìm kiếm toàn văn bản thì đôi khi chúng ta muốn tìm kiếm một cách có cấu trúc, tìm kiếm và trả về các kết quả chính xác. Các truy vấn term và terms sẽ giúp chúng ta làm điều đó. Ví dụ chúng ta muốn tìm kiếm tất cả các sách do Manning Publications xuất bản.
```
POST /bookdb_index/book/_search
{
    "query": {
        "term" : {
            "publisher": "manning"
        }
    },
    "_source" : ["title","publish_date","publisher"]
}
```
```
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "2",
        "_score": 1.2231436,
        "_source": {
          "publisher": "manning",
          "title": "Taming Text: How to Find, Organize, and Manipulate It",
          "publish_date": "2013-01-24"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 1.2231436,
        "_source": {
          "publisher": "manning",
          "title": "Elasticsearch in Action",
          "publish_date": "2015-12-03"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 1.2231436,
        "_source": {
          "publisher": "manning",
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        }
      }
    ]
```
Khi muốn tìm kiếm với nhiều cụm từ khác, ta dùng từ khóa terms thay thế và truyền vào một mảng từ khóa cần tìm kiếm.
```
{
    "query": {
        "terms" : {
            "publisher": ["oreilly", "packt"]
        }
    }
} 
```
## Range Query
Một ví dụ truy vấn có cấu trúc khác là truy vấn phạm vi. Trong ví dụ này, chúng tôi tìm kiếm sách được xuất bản vào năm 2015
```
POST /bookdb_index/book/_search
{
    "query": {
        "range" : {
            "publish_date": {
                "gte": "2015-01-01",
                "lte": "2015-12-31"
            }
        }
    },
    "_source" : ["title","publish_date","publisher"]
}
```
```
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 1,
        "_source": {
          "publisher": "oreilly",
          "title": "Elasticsearch: The Definitive Guide",
          "publish_date": "2015-02-07"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 1,
        "_source": {
          "publisher": "manning",
          "title": "Elasticsearch in Action",
          "publish_date": "2015-12-03"
        }
      }
    ]
```
Lưu ý: Range query hoạt động trên các trường có kiểu dữ liệu date, number, string.
## Filtered Query
Filter query cho phép bạn lọc các kết quả của một truy vấn. Ví dụ chúng ta muốn truy vấn những cuốn sách có cụm từ “Elasticsearch” trong tiêu đề hoặc tóm tắt nhưng chúng ta muốn lọc kết quả của mình để chỉ những cuốn sách có từ 20 bài đánh giá trở lên.
```
POST /bookdb_index/book/_search
{
    "query": {
        "bool": {
            "must" : {
                "multi_match": {
                    "query": "elasticsearch",
                    "fields": ["title","summary"]
                }
            },
            "filter": {
                "range" : {
                    "num_reviews": {
                        "gte": 20
                    }
                }
            }
        }
    },
    "_source" : ["title","summary","publisher", "num_reviews"]
}
```
```
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.5955761,
        "_source": {
          "summary": "A distibuted real-time search and analytics engine",
          "publisher": "oreilly",
          "num_reviews": 20,
          "title": "Elasticsearch: The Definitive Guide"
        }
      }
    ]
```
# Tổng kết
Như vậy là chúng ta đã tìm hiểu các truy vấn thường được dùng trong elasticsearch và cách sử dụng chúng. Hi vọng các bạn sẽ áp dụng thành công!