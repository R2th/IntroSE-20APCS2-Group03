### Elasticsearch là gì?
* **Full-text** search engine.
* **NoSQL** database.
* **Analytics** engine.
* Được viết bằng **Java**.
* **Lucence** based.
* **Inverted** indices.
* Dễ **scale**
* **RESTful** interface (HTTP/JSON)
* **"*Schemaless*"**.
* **Real-time**.
* **ELK** stack.
<br>

### Download Elasticseach.
Bài viết này sử dụng **Elastichsearch 7.5**
> > https://www.elastic.co/downloads/elasticsearch <br>
> > 
> Sau khi download và cài đặt xong, tiến hành chạy Elasticsearch, <br>các bạn có thể trỏ browser của mình tới *http://localhost:9200* (hoặc dùng curl, mình thích dùng curl hơn) để kiểm tra elasticsearch có chạy thành công hay không, và đây là kết quả nhận được:
```json
{
  "name" : "DESKTOP-IH6ABIE",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "m2jnECTRSkyYi6qFD0rNMA",
  "version" : {
    "number" : "7.5.2",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "8bec50e1e0ad29dad5653712cf3bb580cd1afcdf",
    "build_date" : "2020-01-15T12:11:52.313576Z",
    "build_snapshot" : false,
    "lucene_version" : "8.3.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

### Một số khái niệm.
Nếu so sánh với cơ sở dữ liệu quan hệ (**RDBMS**) thì các thuật ngữ  sau có thể hiểu là tương đương.
    
| RDBMS |Elasticsearch |
| -------- | -------- |
| Database     | Index     |
| Table     | Type     |
| Row     | Document     |

### Index.
Để tạo database (hay trong Elasticseach thì gọi là **Index**) chúng ta sử dụng method **PUT** cái **tên** database lên, ví dụ tạo index ***post***:
```ruby
# REQUEST
PUT /post

# RESPONSE
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "post"
}
```
### Document.
Để tạo document, chỉ cần truyền lên một đoạn **json**, và gán cho nó 1 **id**
```ruby
# REQUEST
PUT /post/_doc/1
{
	"language": "en-US",
	"title": "Learn Elasticsearch",
	"date": "2020-02-04",
	"author": "Me!"
}

# RESPONSE
{
    "_index": "post",
    "_type": "_doc",
    "_id": "1",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

Ở request trên, `post` là tên index, `doc` là type, `1` là id. <br>
Nói thêm một chút về `type`, trong `Elasticsearch` mỗi khi `document` được lưu thì sẽ có 1 `index` và một `mapping type` tương ứng, Ví dụ `index` twitter có type `user` và `tweet`, mỗi type này có thể có các trường riêng, `user` có **user_name**, email, còn `tweet` có content, tweeted_at và cũng có **user_name**. <br>
*(Để tạo document chúng ta cũng làm tương tự: `PUT /twitter/user/1`, `PUT /twitter/tweet/1`*
<br>
<br>
Trong Elasticsearch, mọi người thường coi `index` như `database` trong SQL database, còn `type` thì giống với `table`, đây là một sự tương đương không tốt và dẫn đến nhiều hệ lụy xấu. Trong  `SQL database` các `table` là độc lập nhau, 2 trường cùng tên ở 2 `table` khacs nhau thì không liên quan gì đến nhau. Nhưng trong `Elasticsearch` thì không giống vậy, chúng cùng được hỗ trợ bởi một trường Lucence bên trong. Điều này dẫn tới một số hệ quả xấu. Có 2 giải pháp thay thế đó là:
* Mỗi type thì ta cho 1 index riêng.
* Hoặc custome type.

Chính vì vậy cho nên từ Elasticsearch 7.x thì chỉ định type trong API tạo index là không cần thiết nữa.
Từ Elasticsearch 8 thì khai báo type trong API sẽ không được hỗ trợ.
Chi tiết xem ở:
https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html
<br><br>
Trở lại ví dụ, sau khi tạo xong `post`, chúng ta có thể lấy thông tin nó bằng method **GET**
```ruby
# REQUEST
GET /post/_doc/1

# RESPONSE
{
	"_index": "post",
	"_type": "_doc",
	"_id": "1",
	"_version": 1,
	"_seq_no": 0,
	"_primary_term": 1,
	"found": true,
	"_source": {
		"language": "en-US",
		"title": "Learn Elasticsearch",
		"date":"Fri, 09 Dec 2019 09:30:27 +0000"
		"author": "Me!"
	}
}

```

### Mapping.
Đầu bài mình có nói là Elasticsearch ***schemaless***, thực ra không hẳn như vậy. Kiểm tra mapping của index `post` trong ví dụ trước:
```ruby
# REQUEST
GET post/_mapping

# RESPONSE
{
    "post": {
        "mappings": {
            "properties": {
                "author": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "date": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "language": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "title": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                }
            }
        }
    }
}
```
(*text: analyzed, keyword: nonanalyzed*)<br>

Ta thấy tất cả đều là text, nếu không chỉ rõ thì `Elasticsearch` sẽ tự đoán kiểu dữ liệu cho chúng ta.<br>
Như vậy là không ổn lắm, ví dụ các trường cần kiểu ngày/giờ hay số sẽ bị cho là text hết.<br>
Chúng ta tự mapping tại thời điểm khởi tạo `Index` như sau, chỉ cần truyền json lên:
```ruby
# REQUEST
PUT /post
{
    "mappings": {
        "properties": {
            "author": {
                "type": "keyword"
			},
            "date": {
            	"type": "date",
                "format": "E, dd MMM yyyy HH:mm:ss Z"
            },
            "language": {
                "type": "keyword"
            },
            "title": {
                "type": "text"
            }
        }
    }
}
```
### Analyzers.
Trước tiên hãy xem request mapping sau (tương tự bên trên), khi khai báo analyzer cho trường title.
```ruby
# REQUEST
PUT /post
{
    "mappings": {
        "properties": {
            "author": {
                "type": "keyword"
            },
            "date": {
                "type": "date",
                "format": "yyyy-MM-dd"
            },
            "language": {
                "type": "keyword"
            },
            "title": {
                "type": "text",
                "fields": {
                    "english": { 
                        "type": "text",
                        "analyzer": "english"
                    },
                    "raw": {
                        "type": "keyword"
                    }
                }
            }
        }
    }
}
```
**Analyzer** là gì?<br>
Analyzer vs non-analyzer <=> Full-text vs giá_trị_chính_xác<br>
`Analyzer` thường có các bước: <br>
* Character filter. (thay thế character)
* Tokenizer. (Bẻ text thành từng term)
* Token filters. (Thêm/xóa/sửa token)

Xem các built-in analyzer của Elasticsearch ở đây https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html<br>
Ví dụ anlyzer:
> Hey man, how are you doing?
> 
*  *Whitespace* analyzer: Hey | man, | how | are | you | doing? |
*  *English* analyzer: hei | man | how | you | do |

Test mấy cái analyzer vừa tạo như sau
```ruby
GET post/_analyze 
{
  "field": "title.english",
  "text": "Hey man, how are you doing?"
}
 # trả về hei man how you do
GET post/_analyze 
{
  "field": "text.raw",
  "text": "Hey man, how are you doing?"
}
# trả về như cũ
```
Thực hiện search, giả sử  có rất nhiều document, bạn tìm kiếm từ **working**
```ruby
POST /post/_search
{
    "query": {
        "multi_match": {
            "query": "working",
            "fields": ["title.raw"]
        }
    }
}
# trả về đúng những title chứa working

POST /post/_search
{
    "query": {
        "multi_match": {
            "query": "working",
            "fields": ["title.english"]
        }
    }
}
# trả về cả nhưng title chứa work, working, working?, .....
```
### Search
Trước tiên hãy import tập data này vào https://gist.githubusercontent.com/lumosnysm/664e4b76c81eacefaa515c7c1133823c/raw/ebbd60808a868bc3626497d77e3f984747dfd9bb/post.json
```ruby
curl -H "Content-Type: application/json" -XPOST "localhost:9200/post/_bulk?pretty&refresh" --data-binary "@post.json"
```
<br>
Để lấy ra toàn bộ document ta sử dụng method GET:<br>
Kết quả trả về được phân trang như sau

```ruby
GET /post/_search?pretty

# RESPONSE
{
  "took": 13,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 963,
      "relation": "eq"
    },
    "max_score": 1.0,
    "hits": [
      {
        "_index": "post",
        "_type": "_doc",
        "_id": "6581",
        "_score": 1.0,
        "_source": {
          "language": "en",
          "title": "Combell won the Twinkle Award in the “Hosting & Domain” category!",
          "date": "Fri, 09 Dec 2016 09:30:27 +0000",
          "author": "Combell",
          "category": [
            "Combell news",
            "award",
            "awards",
            "Combell",
            "twinkle"
          ],
          "guid": "6581"
        }
      },
      ......
      ......
```
hoặc có thể dùng POST và truyền lên đoạn json, kết quả cũng cho giống hệt
```ruby
POST /bank/_search?pretty
{
	"query": {
		"match_all": {}
	}
}
```
tương tự 2 cách dưới là tương đương nhau
```ruby
# lấy tất cả post có author "Combell"
GET bank/_search?pretty&q=author:Combell

POST bank/_search?pretty
{
	"query": {
		"match": {
			"author": "Combell"
		}
	}
}
```
Để đếm document, ta sử dụng `count`
```ruby
POST /post/_count
{
	"query": {
		"bool": {
			"filter": {
				"term": {
					"title.raw": "Combell won the Twinkle Award in the “Hosting & Domain” category!"
				}
			}
		}
	}
}
# trả về 1 do search raw sẽ tìm theo chính xác cả câu

POST /post/_count
{
	"query": {
		"match": {
			"title": "Combell won the Twinkle Award in the “Hosting & Domain” category!"
		}
	}
}
# trả về 546 do search full-text nên tìm theo từng từ
```
### Filter và Query
**Filter**: <br>
* Document có match với không? (có hoặc không).
* Không quan tâm đến sự tương quan (relevance).
* Nhanh và cache được.
* Dùng cho trường **non-analyzed** (như trên thì mình đã để là raw ấy).

**Query**:<br>
* Document được match có tốt không?
* Full-text search.
* Dùng cho trường được analyzed.

Ví dụ sử dụng `filter`:
```ruby
# tìm theo nhiều id
POST /post/_search
{
  "query": {
    "bool": {
      "filter": {
        "ids": {
          "values": [6515, 6581, 6690]
        }
      }
    }
  }
}
```

```ruby
POST /post/_search
{
  "query": {
    "bool": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "language": "en"
              }
            },
            {
              "range": {
                "date": {
                  "gte": "2016-01-01",
                  "format": "yyyy-MM-dd"
                }
              }
            }
          ],
          "must_not": [
            {
              "term": {
                "category": "joomla"
              }
            }
          ],
          "should": [
            {
              "term": {
                "category": "Hosting"
              }
            },
            {
              "term": {
                "category": "evangelist"
              }
            }
          ]
        }
      }
    }
  }
}
```
Ở trên mình dùng `must`, `must_not`, `should`.<br>
Có thể hiểu đơn giản: `must` là **AND**, `must_not` là **NOT**, còn `should` là **OR**.
### Relevance
Xem ví dụ sau sử dụng `query`
```ruby
# tìm các post có title 'good news' và language là english
POST /post/_search?pretty
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "good news"
          }
        },
        {
          "bool": {
            "filter": {
              "term": {
                "language": "en"
              }
            }
          }
        }
      ]
    }
  }
}

# RESPONSE
{
    "took": 9,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 8,
            "relation": "eq"
        },
        "max_score": 9.71229,
        "hits": [
            {
                "_index": "post",
                "_type": "_doc",
                "_id": "3707",
                "_score": 9.71229,
                "_source": {
                    "language": "en",
                    "title": "Good news for you and your Exchange mailbox with Combell",
                    "date": "Mon, 16 Dec 2013 13:30:55 +0000",
                    "author": "Romy",
                    "category": [
                        "News"
                    ],
                    "guid": "3707"
                }
            },
            {
                "_index": "post",
                "_type": "_doc",
                "_id": "5895",
                "_score": 4.979878,
                "_source": {
                    "language": "en",
                    "title": "Apple.news: where iOS 9’s News app is to be found",
                    "date": "Fri, 25 Sep 2015 09:56:41 +0000",
                    "author": "Romy",
                    "category": [
                        "Combell news",
                        "Domain names",
                        "News",
                        "Sector news",
                        ".movie",
                        ".news",
                        ".xyz",
                        "Apple",
                        "apps",
                        "new domain names",
                        "new tld"
                    ],
                    "guid": "5895"
                }
            },
            ......
            ......
```
> Để ý các phần **max_score, _score**. Ở doc đầu tiên có chứa cả 'good' và 'news' nên score là 9.7 cao hơn doc thứ hai là 4.9 khi chỉ chứa từ news. Và kết quả trả về được sắp xếp theo thứ tự điểm từ cao-> thấp
> 

> Ngoài ra chúng ta cũng có thể sử dụng như bên dưới để tất cả chung score là 1.0, như vậy ta sẽ thoải mái sắp xếp kết quả từ trường bất kỳ theo ý muốn. Cách này biến Elasticsearch giống như một NoSQL database hơn là một Full-text search engine
```ruby
POST /post/_search
{
  "query": {
    "constant_score" : {
      "filter" : {
        "term" : { "category" : "tools"}
      }
    }
  }
}

```

Xem một ví dụ khác:
```ruby
POST /post/_search?pretty
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "good news"
          }
        }
      ],
      "should": [
        {
          "match": {
            "category": "apps"
          }
        }
      ]
    }
  }
}
```
Ở trên có sử dụng `should`. Điều đặc biệt là `should` khi dùng ở trong `query` khác với trong `filter`. Trong `filter` thì should đơn giản như là phép OR, kết quả sẽ được trả về bất kể việc `should` có match hay không. Còn trong `query` thì `should` có nếu match sẽ boost relevance score của document đó lên.<br>
Như request trên, vẫn giống như cũ, ta tìm kiếm các post mà title chứa 'good news', ngoài ra score sẽ được boost thêm nếu document đó có category là 'apps'. Chạy thử kiểm tra để thấy được doc có id **5895** có category chứa 'apps' sau khi chạy request trên có score là 7.7 cao hơn 4.9 khi không tìm với `should`.<br><br>
Ngoài ra, ta có thể tự khai báo boost query theo ý muốn như sau:
```ruby
# query time boosting
POST /post/_search?pretty
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "good news"
          }
        }
      ],
      "should": [
        {
          "match": {
            "category": {
            	"query": "apps",
            	"boost": 3 # nếu category chứa apps thì boost 3 điểm
            }
          }
        },
        {
          "match": {
            "category": {
            	"query": "Tools",
            	"boost": 2 # nếu category chứa tools thì boost 2 điểm
            }
          }
        }
      ]
    }
  }
}
```
### Aggregation
Aggregation cơ bản là group by trong SQL database, nhưng khỏe hơn.<br>
```ruby
SELECT author
FROM post
GROUP BY author

# tương tự với
POST /post/_search?pretty
{
  "aggs": {
    "popular_blogers": {
      "terms": {
        "field": "author"
      }
    }
  }
}

# RESPONSE
"aggregations": {
        "popular_blogers": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 1,
            "buckets": [
                {
                    "key": "Romy",
                    "doc_count": 458
                },
                {
                    "key": "Jimmy Cappaert",
                    "doc_count": 160
                },
                {
                    "key": "Tom",
                    "doc_count": 145
                },
                .......
                .......
```
Thậm chí chúng ta có thể query nested để phân tích dữ liệu sâu hơn nữa:
```ruby
# group theo author, sau đó đếm xem có bao nhiêu bài post ở mỗi ngôn ngữ.
POST /post/_search?pretty
{
  "aggs": {
    "popular_blogers": {
      "terms": {
        "field": "author"
      },
      "aggs": {
        "used_languages": {
          "terms": {
            "field": "language",
            "size": 10
          }
        }
      }
    }
  }
}

# RESPONSE
"aggregations": {
        "popular_blogers": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 1,
            "buckets": [
                {
                    "key": "Romy",
                    "doc_count": 458,
                    "used_languages": {
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0,
                        "buckets": [
                            {
                                "key": "en",
                                "doc_count": 284
                            },
                            {
                                "key": "nl",
                                "doc_count": 174
                            }
                        ]
                    }
                },
                ......
                ......
```
Như vậy là mình đã điểm qua một số thứ cơ bản trong Elasticsearch, hy vọng nó sẽ giúp ích cho các bạn.

**Tham khảo**<br>
https://www.elastic.co/ <br>
https://github.com/ThijsFeryn/elasticsearch_tutorial