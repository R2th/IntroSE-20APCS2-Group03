Trong bài viết [Tìm hiểu về Elasticsearch](https://viblo.asia/p/tim-hieu-ve-elasticsearch-4dbZNwWalYM) lần trước, chúng ta đã biết được Elasticsearch là một Search Engine rất mạnh mẽ, có thể tìm kiếm trên hệ thống phân tán và đạt được performance cao khi tìm kiếm. Bài viết hôm nay, mình sẽ chia sẻ về cách cài đặt và các query trên Elasticsearch từ cơ bản đến nâng cao

# 1. Cài đặt môi trường cho Elasticsearch
## a. Yêu cầu về môi trường
Về môi trường cài đặt, Elasticsearch có thể cài đặt vào hoạt động được trên những thiết bị hoặc hệ thống cài đặt môi trường JVM (Java Virtual Machine). Để cài môi trường Java, vui lòng tham khảo [hướng dẫn](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04) này.

## b. Cài đặt Elasticsearch (Ubuntu)
### Cách 1: Sử dụng bản debian
- `wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.5.4.deb`
- `sudo dpkg -i elasticsearch-6.5.4.deb`
- Để khởi động Elasticsearch: `sudo systemctl start elasticsearch`
- Để dừng service của Elasticsearch: `sudo systemctl stop elasticsearch`
### Cách 2: Sử dụng bản nén (.tar.gz):
- `wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.5.4.tar.gz`
- `tar -xvf elasticsearch-6.5.4.tar.gz`
- `cd elasticsearch-6.5.4`
- `bin/elasticsearch`

Sau khi cài đặt thành công, có thể vào đường dẫn *localhost:9200* để kiểm tra.
# 2. Query trên Elasticsearch
## 1.1. Index API
- Tạo `mappings` cho index:
```
curl -X PUT 'localhost:9200/posts' -H 'Content-Type: application/json' -d'
{
    "mappings": {
        "post": {
            "properties": {
                "id": {"type": "keyword"},
                "title": {"type": "text"},
                "content": {"type": "text"},
                "published_at": {"type": "date"}
            }
        }
    }
}'
```
- Thêm mới hoặc update 1 `document`:
```
curl -X PUT 'localhost:9200/posts/post/1' -H 'Content-Type: application/json' -d'
{
    "id": "1",
    "title": "The first post",
    "content": "Welcome to ES",
    "published_at": "2019-05-11T10:00:00"
}'
```
Mỗi `index` chỉ có thể tạo `mappings` một lần duy nhất, vì vậy chúng ta không thể thay đổi lại tên trường cũng như kiểu của trường đó. Nhưng có thể thêm những trường khác tùy ý, chỉ cần lúc insert hoặc update dữ liệu, hãy thêm vào chuỗi JSON body là được. Ví dụ, request sau vẫn sẽ thỏa mãn:
```
curl -X PUT 'localhost:9200/posts/post/1' -H 'Content-Type: application/json' -d'
{
    "id": "1",
    "title": "The first post",
    "content": "Welcome to ES",
    "published_at": "2019-05-11T10:00:00",
    "updated_at": "2019-05-11T12:00:00"
}'
```
- Thêm mới hoặc update nhiều `document`:
```
curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "posts", "_type" : "post", "_id" : "2" } }
{"id":"2","title":"The second post","content":"Welcome to ES","published_at":"2019-05-11T11:00:00"}
{ "index" : { "_index" : "posts", "_type" : "post", "_id" : "3" } }
{"id":"3","title":"The third post","content":"Welcome to ES","published_at":"2019-05-11T12:00:00"}
'
```
- Xem thông tin các `index`:<br>
`curl -X GET 'localhost:9200/_cat/indices?v'`
## 1.2. Search API
- `match` query:
`match` query thuộc kiểu full-text query, kết quả trả về là những `document` match với một trong những từ trong điều kiện query. Ví dụ:
```
curl -X POST "localhost:9200/posts/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "match": {
            "title": "the post"
        }
    }
}'
```
=> Kết quả phù hợp có thể là: *The first*, *The post*, *the first post*
- `term` query:
Trả về `document` chứa từ trong điều kiện query. Không nên dùng `term` query đối với những trường dữ liệu `text`. Chỉ nên dùng cho những trường hợp cần tìm kiếm một cách chính xác, ví dụ với những trường như: price, id, username,...
```
curl -X POST "localhost:9200/posts/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "term": {
            "id": "1"
        }
    }
}'
```
- `wildcard` query:
Trả về những `document` match với chuỗi wildcard expression. Hỗ trợ với `*` khớp với chuỗi kí tự bất kì (có thể rỗng), `?` khớp với một kí tự đơn.
```
curl -X POST "localhost:9200/posts/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "wildcard": {
            "title": "fi*"
        }
    }
}'
```
=> Những `title` match có thể là: *the first*, *the film*,...
- `range` query:
Dùng trong trường hợp so sánh các dữ liệu kiểu numeric, datetime. Ví dụ như: thực hiện tìm kiếm những bài `post` có ngày `published_at` trong ngày `2019-05-10`:
```
curl -X POST "localhost:9200/posts/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "range": {
            "published_at": {
                "lte": "2019-05-10T23:59:59",
                "gte": "2019-05-10T00:00:00"
            }
        }
    }
}'
```
- `bool` query:
Dùng để kết hợp nhiều câu query lại với nhau bằng những mệnh đề: `should` (or), `must` (and):
```
curl -X POST "localhost:9200/posts/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "bool": {
            "must": [{
                "match": {
                    "title": "first post"
                }
            },
            {
                "range": {
                    "published_at": {
                        "lte": "2019-05-10T23:59:59",
                        "gte": "2019-05-10T00:00:00"
                    }
                }
            }]
        }
    }
}'
```
- `sort`:
Thực hiện sắp xếp kết quả trả về:
```
curl -X POST "localhost:9200/posts/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "sort": [
        {"publish_at": "desc"},
        "_score"
    ],
    "query": {
        "term": {
            "title": "post"
        }
    }
}'
```
- `from` và `size`:
Cho phép giới hạn số lượng kết quả trả về và vị trí bắt đầu lấy kết quả:
```
curl -X POST "localhost:9200/posts/_search?pretty&from=10&size=10" -H 'Content-Type: application/json' -d'
{
    "query": { "match_all": {} }
}'
```
Kết quả của query trên sẽ lấy những `document` từ vị trí thứ 10-20 được lưu trong `index`.
## 1.3. Aggregation API
Được thiết kế phục vụ cho việc tính toán, phân tích dữ liệu tập hợp trên Elasticsearch. Elasticsearch hỗ trợ rất nhiều hàm liên quan đến tập hợp, thống kê điển hình như: `avg`, `min`, `max`, `sum`, `count`,...
Ví dụ: Tính trung bình giá của tất cả các sản phẩm:
```
curl -X POST "localhost:9200/posts/_search?size=0" -H 'Content-Type: application/json' -d'
{
    "aggs": {
        "avg_price": { "avg": { "field": "price" } }
    }
}'
```
# Kết luận
Trên đây là những API thường hay được sử dụng trong Elasticsearch. Nếu muốn tìm hiểu thêm, xin vui lòng truy cập tài liệu tham khảo phía dưới. Cảm ơn vì đã đọc bài viết này.
# Tham khảo
[Elasticsearch - Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/query-dsl.html)
[Elasticsearch - Aggregation API](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/search-aggregations.html)
https://viblo.asia/p/23-cau-truy-van-huu-ich-trong-elasticsearch-phan-1-Ljy5VoMbKra