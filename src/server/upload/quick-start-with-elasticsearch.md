Xin chào mọi người, hôm nay trong bài viết này cùng mình tìm hiểu về Elasticsearch. Trước đó mình cũng có sử dụng Elasticsearch rồi nhưng mình chưa thực sự nghiêm túc tìm hiểu và đọc về nó, chỉ là làm đến đâu, cần cái gì thì lên Google search để đọc thôi. Nên là hôm nay cùng mình bắt đầu tìm hiểu về Elasticsearch nha.
Nội dung bài viết được mình dịch từ trang docs của Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html
Nội dung bài viết bao gồm các phần sau:
* Install và run Elasticsearch ở môi trường test
* Add data vào Elasticsearch
* Search và sort
* Trích suất nội dung của các trường trong khi search

# Step 1. Run Elasticsearch
Cách đơn giản nhất để set up Elasticsearch là tạo một `managed deployment` sử dụng Elasticsearch Service trên Elastic Cloud. Nếu bạn muốn quản lý môi trường test của riêng mình thì bạn có thể install và run Elasticsearch sử dụng Docker. Trong khuôn khổ bài viết này mình xin sử dụng cách đơn giản hơn :grinning:
1. [Tạo một tài khoản trial](https://www.elastic.co/cloud/elasticsearch-service/signup)
2. Truy cập vào [Elastic Cloud](https://cloud.elastic.co/home)
3. Tạo mới `Create deployment`
4. Chọn solution và điền tên cho deployment
5. Download thông tin password và user
# Step 2. Send requests to Elasticsearch
Bạn có thể gửi data hoặc là các request khác đến Elasticsearch sử dụng REST APIs. Nó cho phép bạn có thể tương tác với Elasticsearch với bất cứ client nào mà có thể gửi HTTP request như là [curl](https://curl.se/). Hoặc bạn cũng có thể sử dụng Kibana để gửi request đến Elasticsearch.
### 1. Sử dụng curl
1. Để có thể giao tiếp với Elasticsearch sử dụng `curl` bạn cần `cluster's endpoint`. Click `Copy endpoint` ở trang chủ của Elasticsearch.
2. Run command dưới đây để submit một request đơn giản. Trong đó `<password>` là password của elasticsearch của user, `<elasticsearch_endpoint>` là endpoint ở trên.
```
curl -u elastic:<password> <elasticsearch_endpoint>/
```
### 2. Sử dụng Kibana
1. Đến trang Kibana và click `Launch`
2. Mở Kibana menu và đi đến trang `Dev tools > Console`
![image.png](https://images.viblo.asia/f9a3def2-5c59-4dd6-adee-5ddcb5f7a457.png)
3. Run example API request trong console.
```
GET /?pretty
```
![image.png](https://images.viblo.asia/6a3b45b5-cfe9-4c7c-9882-8e24bbdbd32d.png)
# Step 3. Add data
Bạn có thể thêm data vào Elasticsearch dưới dạng các đối tượng JSON và được gọi là các `document`. Elasticsearch lưu các document đó trong các chỉ mục mà có thể tìm kiếm được.
Đối với dữ liệu chuỗi thời gian như là log và metrics (số liệu), bạn thường thêm các document vào một luồng dữ liệu bao gồm các chỉ mục được sao lưu tự động (multiple auto-generated backing indices).
Một luồng dữ liệu phải có một `index template` phù hợp với tên của nó. Elasticsearch sử dụng template này để cấu hình stream's backing indices (mình không biết phải dịch cụm này sao cho phù hợp nữa). Các document được gửi đến luồng dữ liệu bắt buộc phải có trường `@timestamp`.
### 1. Add a single document
Run request sau trong console của Kibana để tạo mới một đối tượng trong `logs-my_app-default` data stream. Nếu `logs-my_app-default` không tồn tại thì request sẽ sử dụng `logs-*-*` index template.
```
POST logs-my_app-default/_doc
{
  "@timestamp": "2099-05-06T16:21:15.000Z",
  "event": {
    "original": "192.0.2.42 - - [06/May/2099:16:21:15 +0000] \"GET /images/bg.jpg HTTP/1.0\" 200 24736"
  }
}
```
![image.png](https://images.viblo.asia/91988396-5ea1-4ceb-a811-523e58279893.png)
Giá trị trả về bao gồm dữ liệu mà Elasticsearch generate ra cho document:
* `_index` chứa document. Elasticsearch tự động generate tên của index.
* Giá trị `_id` là duy nhất đại diện cho document.
### 2. Add multiple documents
Sử dụng `_bulk` endpoint để thêm mới nhiều document cùng lúc trong một request. Dữ liệu phải được xuống dòng theo kiểu JSON. Cuối mỗi dòng mới phải được xuống dòng (chứa ký tự xuống dòng `\n`).
```
PUT logs-my_app-default/_bulk
{ "create": { } }
{ "@timestamp": "2099-05-07T16:24:32.000Z", "event": { "original": "192.0.2.242 - - [07/May/2020:16:24:32 -0500] \"GET /images/hm_nbg.jpg HTTP/1.0\" 304 0" } }
{ "create": { } }
{ "@timestamp": "2099-05-08T16:25:42.000Z", "event": { "original": "192.0.2.255 - - [08/May/2099:16:25:42 +0000] \"GET /favicon.ico HTTP/1.0\" 200 3638" } }
```
![image.png](https://images.viblo.asia/b885a96a-a10c-4814-8249-beaee0e05b73.png)
# Step 4. Search data
Các document đã được đánh index có thể được search gần như là realtime. Request dưới đây sẽ tìm kiếm tất cả các đối tượng trong `logs-my_app-default` và sort `@timestamp` theo desc.
```
GET logs-my_app-default/_search
{
  "query": {
    "match_all": { }
  },
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
```
Theo mặc định thì mỗi `hits` của response sẽ chứa 10 document đầu tiên mà trùng với điều kiện search.
```
{
  "took" : 4,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 5,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : ".ds-logs-my_app-default-2021.07.20-000001",
        "_type" : "_doc",
        "_id" : "7QWQw3oBQzv-69BU-KJI",
        "_score" : null,
        "_source" : {
          "@timestamp" : "2099-05-08T16:25:42.000Z",
          "event" : {
            "original" : """192.0.2.255 - - [08/May/2099:16:25:42 +0000] "GET /favicon.ico HTTP/1.0" 200 3638"""
          }
        },
        "sort" : [
          4081940742000
        ]
      },
      {
        "_index" : ".ds-logs-my_app-default-2021.07.20-000001",
        "_type" : "_doc",
        "_id" : "7AWQw3oBQzv-69BU-KJI",
        "_score" : null,
        "_source" : {
          "@timestamp" : "2099-05-07T16:24:32.000Z",
          "event" : {
            "original" : """192.0.2.242 - - [07/May/2020:16:24:32 -0500] "GET /images/hm_nbg.jpg HTTP/1.0" 304 0"""
          }
        },
        ...
    ]
  }
}

```
### 1. Get specific fields
Bạn nên lấy các trường cần thiết sử dụng chứ không nên lấy hết toàn bộ các trường đặc biệt là khi dữ liệu lớn. Để tránh việc này hãy set `_source` bằng false và sử dụng `fields` params để chỉ định các trường sẽ được lấy trong response trả về
```
GET logs-my_app-default/_search
{
  "query": {
    "match_all": { }
  },
  "fields": [
    "@timestamp"
  ],
  "_source": false,
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
```
Response
```
{
  "took" : 10,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 5,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : ".ds-logs-my_app-default-2021.07.20-000001",
        "_type" : "_doc",
        "_id" : "7QWQw3oBQzv-69BU-KJI",
        "_score" : null,
        "fields" : {
          "@timestamp" : [
            "2099-05-08T16:25:42.000Z"
          ]
        },
        "sort" : [
          4081940742000
        ]
      },
      ...
    ]
  }
}

```
### 2. Search a date range
Sử dụng `range` query để có thể search trong một khoảng thời gian hoặc IP nhất định
```
GET logs-my_app-default/_search
{
  "query": {
    "range": {
      "@timestamp": {
        "gte": "2099-05-05",
        "lt": "2099-05-08"
      }
    }
  },
  "fields": [
    "@timestamp"
  ],
  "_source": false,
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
```
Response:
```
{
  "took" : 9,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : ".ds-logs-my_app-default-2021.07.20-000001",
        "_type" : "_doc",
        "_id" : "7AWQw3oBQzv-69BU-KJI",
        "_score" : null,
        "fields" : {
          "@timestamp" : [
            "2099-05-07T16:24:32.000Z"
          ]
        },
        "sort" : [
          4081854272000
        ]
      },
      ...
    ]
  }
}
```
Ngoài việc chỉ định chính xác thời gian bạn có thể tính toán chúng trong query. Câu query dưới đây sẽ tìm kiếm tất cả documents từ ngày hôm trước.
```
GET logs-my_app-default/_search
{
  "query": {
    "range": {
      "@timestamp": {
        "gte": "now-1d/d",
        "lt": "now/d"
      }
    }
  },
  "fields": [
    "@timestamp"
  ],
  "_source": false,
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
```
Không có đối tượng nào thỏa mãn
```
{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 0,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  }
}
```
### 3. Extract fields from unstructured content
Bạn có thể trích xuất [runtime fields](https://www.elastic.co/guide/en/elasticsearch/reference/current/runtime-search-request.html) từ dữ liệu không cấu trúc như là log message trong quá trình tìm kiếm.
Chạy câu query dưới đây để trích xuất `source.ip` runtime fields từ `event.orifinal`. Thêm trường `source.ip` vào `fields` params để thêm nó vào response.
```
GET logs-my_app-default/_search
{
  "runtime_mappings": {
    "source.ip": {
      "type": "ip",
      "script": """
        String sourceip=grok('%{IPORHOST:sourceip} .*').extract(doc[ "event.original" ].value)?.sourceip;
        if (sourceip != null) emit(sourceip);
      """
    }
  },
  "query": {
    "range": {
      "@timestamp": {
        "gte": "2099-05-05",
        "lt": "2099-05-08"
      }
    }
  },
  "fields": [
    "@timestamp",
    "source.ip"
  ],
  "_source": false,
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
```
Response:
```
{
  "took" : 144,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : ".ds-logs-my_app-default-2021.07.20-000001",
        "_type" : "_doc",
        "_id" : "7AWQw3oBQzv-69BU-KJI",
        "_score" : null,
        "fields" : {
          "source.ip" : [
            "192.0.2.242"
          ],
          "@timestamp" : [
            "2099-05-07T16:24:32.000Z"
          ]
        },
        "sort" : [
          4081854272000
        ]
      },
      ...
    ]
  }
}
```
### 4. Combine queries
Bạn có thể sử dụng câu query `bool` để có thể kết hợp nhiều câu query khác nhau. Câu query dưới đây sẽ kết hợp hai `range` query: một trên `@timestamp` và một trên `source.ip`.
```
GET logs-my_app-default/_search
{
  "runtime_mappings": {
    "source.ip": {
      "type": "ip",
      "script": """
        String sourceip=grok('%{IPORHOST:sourceip} .*').extract(doc[ "event.original" ].value)?.sourceip;
        if (sourceip != null) emit(sourceip);
      """
    }
  },
  "query": {
    "bool": {
      "filter": [
        {
          "range": {
            "@timestamp": {
              "gte": "2099-05-05",
              "lt": "2099-05-08"
            }
          }
        },
        {
          "range": {
            "source.ip": {
              "gte": "192.0.2.0",
              "lte": "192.0.2.240"
            }
          }
        }
      ]
    }
  },
  "fields": [
    "@timestamp",
    "source.ip"
  ],
  "_source": false,
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
```
Response:
```
{
  "took" : 191,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : ".ds-logs-my_app-default-2021.07.20-000001",
        "_type" : "_doc",
        "_id" : "aMCDw3oB6NycP7gtP61c",
        "_score" : null,
        "fields" : {
          "@timestamp" : [
            "2099-05-06T16:21:15.000Z"
          ],
          "source.ip" : [
            "192.0.2.42"
          ]
        },
        "sort" : [
          4081767675000
        ]
      },
      ...
    ]
  }
}
```
### 5. Aggregate data
Bạn có thể tính toán data dưới dạng chỉ số, thống kê hoặc là các phân tích khác.
Câu query dưới đây sẽ tính toán và tổng hợp `average_response_size` sử dụng `http.response.body.types` field. Nó sẽ chỉ tổng hợp các document thỏa mãn query.
```
GET logs-my_app-default/_search
{
  "runtime_mappings": {
    "http.response.body.bytes": {
      "type": "long",
      "script": """
        String bytes=grok('%{COMMONAPACHELOG}').extract(doc[ "event.original" ].value)?.bytes;
        if (bytes != null) emit(Integer.parseInt(bytes));
      """
    }
  },
  "aggs": {
    "average_response_size":{
      "avg": {
        "field": "http.response.body.bytes"
      }
    }
  },
  "query": {
    "bool": {
      "filter": [
        {
          "range": {
            "@timestamp": {
              "gte": "2099-05-05",
              "lt": "2099-05-08"
            }
          }
        }
      ]
    }
  },
  "fields": [
    "@timestamp",
    "http.response.body.bytes"
  ],
  "_source": false,
  "sort": [
    {
      "@timestamp": "desc"
    }
  ]
}
```
Reponse sẽ trả về kết quả sau khi tính toán
```
{
  ...
  "aggregations" : {
    "average_response_size" : {
      "value" : 12368.0
    }
  }
}
```
### 6. Explore more search options
Bạn có thể tham khảo thêm các option search phổ biến ở [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-your-data.html#common-search-options)
# Step 5.Clean up
Sau khi sử dụng xong bạn có thể xóa data stream và backing indices.
```
DELETE _data_stream/logs-my_app-default
```

# Tài liệu tham khảo
https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html