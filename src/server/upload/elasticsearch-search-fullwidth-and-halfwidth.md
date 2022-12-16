# **1.Lời nói đầu**
Ở bài viết trước mình có giới thiệu qua về việc sao lưu và phục hồi trong Elasticsearch để phục vụ cho việc tìm kiếm cơ bản với Elasticsearch, tuy nhiên dữ liệu dùng để tìm kiếm mới chỉ dừng lại text  halfwidth? Còn đối với dữ kiệu ở dạng fullwith thì tìm kiếm như thế nào ?  Làm sao để Elasticsearch phân tích và tìm kiếm chính xác cho chúng ta với những dữ liệu trên.  Bài viết hôm nay mình xin giới thiệu 1 plugin để xử lý những vấn đề trên.

# **2.Cài đặt**
```
    sudo bin/elasticsearch-plugin install analysis-icu

```

![](https://images.viblo.asia/d3dd6027-99e1-4029-a9c1-0442bf9951d5.png)

Để tìm hiểu thêm về plugin này các bạn có thể đọc thêm tài liệu ở đây [ICU Analysis Plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/6.3/analysis-icu.html)
# **3.Tạo index**
1. Tạo index
    ```
    
   curl -X PUT "localhost:9200/icu_sample" -H 'Content-Type: application/json' -d'
    {
        "settings": {
          "index": {
              "analysis": {
                "normalizer": {
                  "nfkc_cf_normalized": {
                    "filter": [
                      "lowercase",
                      "icu_normalizer" 
                    ]
                  }
                }
              }
            }
      }
    }
    '

    ```
    
    ![](https://images.viblo.asia/eb35f301-6880-4189-9602-95bbe75ee8e5.png)

2. Tạo Mappings
    
```
    curl -X PUT "localhost:9200/icu_sample/_mapping/_doc" -H 'Content-Type: application/json' -d
    ' 
        { 
            "properties": { 
                "name": {
                    "type": "keyword",
                    "normalizer": "nfkc_cf_normalized"
                } 
            }
        } 
    '
```
   
   ![](https://images.viblo.asia/4acf6bee-2f88-4a9a-9b51-5108300657ac.png)
  3. Tạo data
```
curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
	{"index": {"_index": "icu_sample", "_type": "_doc"}}
	{"name": "ｈａｎｇ"}
	{"index": {"_index": "icu_sample", "_type": "_doc"}}
	{"name": "hang"}
	{"index": {"_index": "icu_sample", "_type": "_doc"}}
	{"name": "RC Paris"}
    {"index": {"_index": "icu_sample", "_type": "_doc"}}
	{"name": "HANG"}
'
```

![](https://images.viblo.asia/285abca0-c807-4bbf-80a1-2aad06bfe05e.png)
# **4.Search**
Bây giờ chúng ta thử search fulltext với fullwidth và halfwidth xem kết quả như thế nào nhé! :v: 

1. fullwidth
```
curl -X GET "localhost:9200/icu_sample/_search" -H 'Content-Type: application/json' -d'
{
    "query": {
        "wildcard" : { "name" : "*ｈａｎｇ*" }
    }
}
'
```

![](https://images.viblo.asia/556f6dde-e5b2-41d5-b1d2-94be9f0ef5b1.png)

2. halfwidth

```
curl -X GET "localhost:9200/icu_sample/_search" -H 'Content-Type: application/json' -d'
{
    "query": {
        "wildcard" : { "name" : "*hang*" }
    }
}
'
```

![](https://images.viblo.asia/556f6dde-e5b2-41d5-b1d2-94be9f0ef5b1.png)

3. lowercase
```
curl -X GET "localhost:9200/icu_sample/_search" -H 'Content-Type: application/json' -d'
{
    "query": {
        "wildcard" : { "name" : "*HANG*" }
    }
}
'
```

![](https://images.viblo.asia/556f6dde-e5b2-41d5-b1d2-94be9f0ef5b1.png)

Các bạn thấy đấy, cả 3 query đều cho ra kết quả như nhau do mình đang sử dụng plugin analysis-icu, nó sẽ phân tích, chuẩn hóa cú pháp,  hỗ trợ Unicode, chữ hoa, chữ thường cho câu lệnh query của chúng ta. Hy vọng bài viết sẽ giúp ích cho các bạn trong việc tìm kiếm giải pháp search dữ liệu cả fullwidth và halfwidth đang gặp phải!