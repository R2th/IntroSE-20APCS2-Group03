### Query String
Truy vấn `query_string` cung cấp cách thức thực hiện truy vấn `multi_match`, truy vấn `bool`, `boosting`, `fuzzy matching`, `wildcards`, `regexp` và `range queries` theo cú pháp viết ngắn gọn. Trong ví dụ sau, ta thực hiện tìm kiếm mờ cho thuật ngữ "search algorithm" của một trong các tác giả “grant ingersoll” hay “tom morton”. Ta tìm kiếm tất cả các field nhưng áp dụng boosting 2 lần cho field summary:
```
POST /bookdb_index/book/_search
{
    "query": {
        "query_string" : {
            "query": "(search algorithm) AND (grant ingersoll) OR (tom morton)",
            "fields": ["_all", "summary^2"]
        }
    },
    "_source": [ "title", "summary", "authors" ],
    "highlight": {
        "fields" : {
            "summary" : {}
        }
    }
}
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "2",
        "_score": 0.14558059,
        "_source": {
          "summary": "organize text using approaches such as full-text search, proper name recognition, clustering, tagging, information extraction, and summarization",
          "title": "Taming Text: How to Find, Organize, and Manipulate It",
          "authors": [
            "grant ingersoll",
            "thomas morton",
            "drew farris"
          ]
        },
        "highlight": {
          "summary": [
            "organize text using approaches such as full-text <em>search</em>, proper name recognition, clustering, tagging, information extraction, and summarization"
          ]
        }
      }
    ]
```

### Simple Query String
Truy vấn `simple_query_string` là một dạng truy vấn query_string, phù hợp hơn trong trường hợp người dùng nhập trực tiếp vào ô search box; nó thay thế việc sử dụng AND / OR / NOT bằng + / | / - tương ứng, và nó loại bỏ các phần không hợp lệ của một truy vấn thay vì ném một ngoại lệ nếu người dùng mắc lỗi.
```

POST /bookdb_index/book/_search
{
    "query": {
        "simple_query_string" : {
            "query": "(saerch~1 algorithm~1) + (grant ingersoll)  | (tom morton)",
            "fields": ["_all", "summary^2"]
        }
    },
    "_source": [ "title", "summary", "authors" ],
    "highlight": {
        "fields" : {
            "summary" : {}
        }
    }
}
```

### Term/Terms Query
Các ví dụ trên là ví dụ về full-text search. Đôi khi, ta muốn tìm kiếm chính xác một cụm từ nào đó bằng cách sử dụng  `term` và `terms`. Trong ví dụ dưới đây, ta tìm kiếm tất cả các sách được index xuất bản bởi Manning Publications.
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
Bạn có thể chỉ định nhiều cụm từ bằng cách sử dụng từ khóa `terms`
```
{
    "query": {
        "terms" : {
            "publisher": ["oreilly", "packt"]
        }
    }
}
```

### Term Query - Sorted
Vẫn là `term query`, nhưng kết quả trả về sẽ được sắp xếp nếu ta định nghĩa field nào cần được sắp xếp và sắp theo chiều nào:
```
POST /bookdb_index/book/_search
{
    "query": {
        "term" : {
            "publisher": "manning"
        }
    },
    "_source" : ["title","publish_date","publisher"],
    "sort": [
        { "publish_date": {"order":"desc"}},
        { "title": { "order": "desc" }}
    ]
}
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": null,
        "_source": {
          "publisher": "manning",
          "title": "Elasticsearch in Action",
          "publish_date": "2015-12-03"
        },
        "sort": [
          1449100800000,
          "in"
        ]
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": null,
        "_source": {
          "publisher": "manning",
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        },
        "sort": [
          1396656000000,
          "solr"
        ]
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "2",
        "_score": null,
        "_source": {
          "publisher": "manning",
          "title": "Taming Text: How to Find, Organize, and Manipulate It",
          "publish_date": "2013-01-24"
        },
        "sort": [
          1358985600000,
          "to"
        ]
      }
    ]
```

### Range Query
`Range query`là tìm kiếm trong khoảng. Dưới đây là ví dụ tìm kiếm các sách được xuất bản trong năm 2015:
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

### Filtered Query
`Filtered query` cho phép bạn thêm điều kiện lọc cho danh sách kết quả trả về. Trong ví dụ dưới đây, sau khi truy vấn danh sách các sách có chứa thuật ngữ `Elasticsearch` trong title hoặc summary, ta muốn  lọc bớt những kết quả nào có từ 20 review trở lên:
```
POST /bookdb_index/book/_search
{
    "query": {
        "filtered": {
            "query" : {
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
Nếu không có truy vấn nào được chỉ định thì truy vấn `match_all` sẽ chạy vả trả về tất cả các tài liệu trong index và sau áp dụng bộ lọc trên đó. Trong thực tế, bộ lọc được chạy đầu tiên,thu hẹp phạm vi truy vấn. Ngoài ra, bộ lọc được lưu trong bộ nhớ cache sau lần sử dụng đầu tiên giúp nó hoạt động rất hiệu quả.

### Multiple Filters
Có thẻ áp dụng nhiều bộ lọc thông qua `bool filter`. Trong ví dụ tiếp theo, bộ lọc xác định rằng các kết quả trả về phải có ít nhất 20 đánh giá, không được xuất bản trước năm 2015 và phải được xuất bản bởi oreilly.
```

POST /bookdb_index/book/_search
{
    "query": {
        "filtered": {
            "query" : {
                "multi_match": {
                    "query": "elasticsearch",
                    "fields": ["title","summary"]
                }
            },
            "filter": {
                "bool": {
                    "must": {
                        "range" : { "num_reviews": { "gte": 20 } }
                    },
                    "must_not": {
                        "range" : { "publish_date": { "lte": "2014-12-31" } }
                    },
                    "should": {
                        "term": { "publisher": "oreilly" }
                    }
                }
            }
        }
    },
    "_source" : ["title","summary","publisher", "num_reviews", "publish_date"]
}
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
          "title": "Elasticsearch: The Definitive Guide",
          "publish_date": "2015-02-07"
        }
      }
    ]
```


### Function Score: Field Value Factor
Sẽ có trường hợp bạn muốn tính độ phù hợp (revelence score) dựa trên 1 field cụ thể nào đó, ví dụ như ta muốn tìm kiếm những sách có độ phổ biến cao (dựa trên số lượng review nhiều hay ít), có thể sử dụng `field_value_factor`
```

POST /bookdb_index/book/_search
{
    "query": {
        "function_score": {
            "query": {
                "multi_match" : {
                    "query" : "search engine",
                    "fields": ["title", "summary"]
                }
            },
            "field_value_factor": {
                "field" : "num_reviews",
                "modifier": "log1p",
                "factor" : 2
            }
        }
    },
    "_source": ["title", "summary", "publish_date", "num_reviews"]
}
[Results]
"hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.44831306,
        "_source": {
          "summary": "A distibuted real-time search and analytics engine",
          "num_reviews": 20,
          "title": "Elasticsearch: The Definitive Guide",
          "publish_date": "2015-02-07"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.3718407,
        "_source": {
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "num_reviews": 23,
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 0.046479136,
        "_source": {
          "summary": "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms",
          "num_reviews": 18,
          "title": "Elasticsearch in Action",
          "publish_date": "2015-12-03"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "2",
        "_score": 0.041432835,
        "_source": {
          "summary": "organize text using approaches such as full-text search, proper name recognition, clustering, tagging, information extraction, and summarization",
          "num_reviews": 12,
          "title": "Taming Text: How to Find, Organize, and Manipulate It",
          "publish_date": "2013-01-24"
        }
      }
    ]
```
Để thu được kết quả trên, có thể sử dụng cách: chạy truy vấn multi_match thông thường và được sắp xếp theo trường num_reviews nhưng khi đó lại ko tính được độ phù hợp

### Function Score: Script scoring
Trong trường hợp các hàm built-in không đáp ứng yêu cầu, ta có thể tự viết các hàm custom đáp ứng nhu cầu của mình:
```
publish_date = doc['publish_date'].value
num_reviews = doc['num_reviews'].value
if (publish_date > Date.parse('yyyy-MM-dd', threshold).getTime()) {
  my_score = Math.log(2.5 + num_reviews)
} else {
  my_score = Math.log(1 + num_reviews)
}
return my_score
```

```

POST /bookdb_index/book/_search
{
    "query": {
        "function_score": {
            "query": {
                "multi_match" : {
                    "query" : "search engine",
                    "fields": ["title", "summary"]
                }
            },
            "functions": [
                {
                    "script_score": {
                        "params" : {
                            "threshold": "2015-07-30"
                        },
                        "script": "publish_date = doc['publish_date'].value; num_reviews = doc['num_reviews'].value; if (publish_date > Date.parse('yyyy-MM-dd', threshold).getTime()) { return log(2.5 + num_reviews) }; return log(1 + num_reviews);"
                    }
                }
            ]
        }
    },
    "_source": ["title", "summary", "publish_date", "num_reviews"]
}
[Results]
"hits": {
    "total": 4,
    "max_score": 0.8463001,
    "hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 0.8463001,
        "_source": {
          "summary": "A distibuted real-time search and analytics engine",
          "num_reviews": 20,
          "title": "Elasticsearch: The Definitive Guide",
          "publish_date": "2015-02-07"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 0.7067348,
        "_source": {
          "summary": "Comprehensive guide to implementing a scalable search engine using Apache Solr",
          "num_reviews": 23,
          "title": "Solr in Action",
          "publish_date": "2014-04-05"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 0.08952084,
        "_source": {
          "summary": "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms",
          "num_reviews": 18,
          "title": "Elasticsearch in Action",
          "publish_date": "2015-12-03"
        }
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "2",
        "_score": 0.07602123,
        "_source": {
          "summary": "organize text using approaches such as full-text search, proper name recognition, clustering, tagging, information extraction, and summarization",
          "num_reviews": 12,
          "title": "Taming Text: How to Find, Organize, and Manipulate It",
          "publish_date": "2013-01-24"
        }
      }
    ]
  }
```

# Kết luận
### Tham khảo
[https://dzone.com/articles/23-useful-elasticsearch-example-queries](https://dzone.com/articles/23-useful-elasticsearch-example-queries)