Xin chào các bạn! 

Hôm nay chúng ta cùng tìm hiểu dần về 23 ví dụ cơ bản để có thể hiểu được cách sử dụng Elasticsearch nhé.

Link tham khảo: https://dzone.com/articles/23-useful-elasticsearch-example-queries


> **Tóm tắt bài viết**
> 
> Bài viết chỉ gồm 2 phần cơ bản, easy dễ hiểu dễ sử dụng.
> 
> A. Cài đặt Elasticsearch và Kibana.
> 
> B. Đi vào 23 ví dụ.
> 

# A. Cài đặt elasticsearch và Kibana.

**I. Cài đặt Elasticsearch.**

 Đầu tiên để cài đặt Elasticsearch thì cần phải cài đặt JAVA trước.
 
** 1. Cài đặt JAVA:**

- Đối với máy Ubuntu: Bạn follow link sau để cài nhé: https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04
- Đối với máy Mac: Bạn vào link sau (http://www.oracle.com/technetwork/java/javase/downloads/index.html) và tải bản JRE về và tiến hành cài đặt như các phần mềm khác.

** 2. Cài đặt Elasticsearch**

- Đối với máy Ubuntu: Follow link sau: (https://www.elastic.co/guide/en/elasticsearch/reference/5.5/deb.html#deb). Mình thì hay cài đặt ở mục này, các bạn tham khảo nhé (https://www.elastic.co/guide/en/elasticsearch/reference/5.5/deb.html#install-deb)
- Đối với máy Mac: Follow link sau: (https://chartio.com/resources/tutorials/how-to-install-elasticsearch-on-mac-os-x/)


**II. Cài đặt Kibana:**

Ở bài viết này mình sử dụng Kibana để DEMO cho các ví dụ, các bạn có thể tham khảo ở link sau nếu muốn biết thêm về Kibana (https://www.elastic.co/products/kibana)
- Đối với máy Ubuntu: Follow link sau: (https://www.elastic.co/guide/en/kibana/current/deb.html)
- Đối với máy Mac: Chỉ cẩn chạy câu sau:
```
brew install kibana
```

Sau khi đã cài đặt xong Kibana, bạn có thể vào http://localhost:5601/ để xem thử kết quả:

![](https://images.viblo.asia/9ec91742-bd66-42f7-8254-5f6f2493126b.png)

**III. Tạo một index để DEMO cho các ví dụ**

1. Sau khi vào được http://localhost:5601/ thì vào mục `Discover` để thêm mới index nhé, mình đặt tên index của mình là `bookdb_index` cho nó giống với ví dụ ở link tham khảo. (Hình ảnh ở phần dưới)
2. Sau khi tạo xong index `bookdb_index` thì vào mục `Dev Tools` và tạo dữ liệu cho nó bằng câu lệnh sau:
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

**Hình ảnh tham khảo mục 1:**

![](https://images.viblo.asia/ab5382f6-80d2-4c56-9755-99ab7ef30547.png)

**Hình ảnh tham khảo mục 2:**

![](https://images.viblo.asia/b7723a3d-8d4f-44f5-885b-8de2e76cc47b.png)

Xong phần chuẩn bị dữ liệu rồi, giờ chúng ta đi vào phần chính của bài viết là tìm hiểu về 23 ví dụ nhé.

# B. Đi vào 23 ví dụ.

## 1. Basic match query

Chúng ta sẽ tìm hiểu về kiểu search cơ bản nhất khi sử dụng Elasticsearch. Về cơ bản có 2 kiểu search map full-text (full-text match query) là:

`Sử dụng Search Lite API` - truyền tất cả những gì cần search vào URL hoặc `Sử dụng full JSON request body` để sử dụng full Elasticsearch DSL.

### a. Sử dụng Search Lite API
Bắt đầu từ phần này, mục `Câu lệnh` các bạn tự hiểu là mục `Dev Tools` trong `Kibana` nhé.

Phần `Ý nghĩa` sẽ giải thích cho phần `Câu lệnh`

Phần `Kết quả` là hình ảnh cho 2 phần trên.
- Câu lệnh:

```
GET /bookdb_index/book/_search?q=guide
```
- Ý nghĩa: Lấy ra tất cả records mà field của nó có dính đến từ `guide`.
- Kết quả:
```
{
  "took": 3,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 2,
    "max_score": 1.3278645,
    "hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 1.3278645,
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
        "_id": "1",
        "_score": 1.2871116,
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
  }
}
```
![](https://images.viblo.asia/34f7b840-a825-4472-b541-613cbc1c7f54.png)

Theo kết quả trên thì ta đã search được 2 records trong index `bookdb_index` có field chứa từ `guide`:

- Là phần `summary` của records với id = 4.
- Là phần `title` của records với id = 1.

### b. Sử dụng full JSON request body

Tương tự với phần trên thì phần này sử dụng cú pháp của Elasticsearch như sau:

- Câu lệnh:
```
GET /bookdb_index/book/_search

{
    "query": {
        "multi_match" : {
            "query" : "guide",
            "fields" : ["_all"]
        }
    }
}
```
- Ý nghĩa: Lấy ra tất cả records mà field của nó có dính đến từ `guide`.
- Kết quả: 

![](https://images.viblo.asia/1089eae5-20df-4c8b-b86c-28d79d33dfbe.png)

Có thể thấy chúng ta sử dụng `multi_match` thay thế cho `match` như là một cách gọi tắt của việc sử dụng `match` cho nhiều field khác nhau. 

`fields` được định nghĩa là `"_all"` cũng dễ hiểu vì chúng ta đang search theo tất cả các field.

### c. Ví dụ tương tự

Ta thử thêm ví dụ tìm kiếm tất cả các sách có title chứa "In Action" xem sao nhé:

**Đối với Search Lite API**
- Câu lệnh:
```
GET /bookdb_index/book/_search?q=title:in action
```
- Ý nghĩa: Lấy ra các records có field `title` chứa từ khoá `in action`
- Kết quả:
```
{
  "took": 14,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 2,
    "max_score": 1.6323128,
    "hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 1.6323128,
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
        "_score": 1.6323128,
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
}
```

![](https://images.viblo.asia/4e7bb82f-b901-444e-950f-565989c675b7.png)
**Đối với full JSON request body**

Vẫn như vậy, với cách `full body DSL` bạn có thể tuỳ biến nhiều option khi search hơn. Chúng ta có thể định nghĩa số lượng result trả lại (`size`), offset bắt đầu search, thuận tiện để phân trang (`start`), quy định những fields muốn trả về (`_source`) hay thậm chí là muốn highlight một field nào đó (`highlight`)

- Câu lệnh:
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

```
- Ý nghĩa: Lấy ra các records có field `title` = `in action`, kết quả trả về chỉ lấy 2 record tối đa, offset lấy từ 0 (thường được sử dụng cho phân trang), kết quả trả về chỉ lấy các fields sau: `title`, `summary`, `published_date`.
- Kết quả:
```
{
  "took": 11,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 2,
    "max_score": 1.6323128,
    "hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "3",
        "_score": 1.6323128,
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
        "_score": 1.6323128,
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
}
```

![](https://images.viblo.asia/b7465a81-5f58-4115-bccf-ba25d5b7fcc1.png)

## 2. Multi-field Search

Để có thể search nhiều hơn 1 field thì chúng ta chỉ cần thêm field đó vào trong phần `fields`

Giả sử bạn cần lấy ra tất cả records trong DB sao cho cụm từ `eleasticsearch guide` xuất hiện ở trong `title` và `summary`

- Câu lệnh:
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
- Ý nghĩa: Lấy ra tất cả records trong DB sao cho cụm từ `eleasticsearch guide` xuất hiện ở trong `title` và `summary`
- Kết quả:
```
{
  "took": 12,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 3,
    "max_score": 2.0281231,
    "hits": [
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "1",
        "_score": 2.0281231,
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
      },
      {
        "_index": "bookdb_index",
        "_type": "book",
        "_id": "4",
        "_score": 1.3278645,
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
        "_score": 1.0333893,
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
  }
}
```

![](https://images.viblo.asia/8864a64f-83c0-4d2f-b39a-700986f99417.png)

# C. Tổng kết

Như vậy qua 2 ví dụ trên chúng ta đã nắm được những ý sau:

- Cài đặt xong Elasticsearch.
- Cài đặt xong Kibana - Một tool rất hữu ích trong việc tự DEMO search bằng Elasticsearch mà không cần tốn quá nhiều thời gian setup.
- Hiểu cách search bằng Elasticsearch với 2 cách: `Search Lite API` và `full JSON request body`. Thông thường khi làm dự án sẽ search bằng cách thứ 2 nhiều hơn.
- Làm được 2 ví dụ cơ bản về Elasticsearch.

Cảm ơn các bạn đã theo dõi, hẹn gặp lại các bạn ở phần tiếp theo!