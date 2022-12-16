Ở bài viết trước mình đã giới thiệu sơ lược về Elasticsearch mọi người có thể tham khảo [tại đây](https://viblo.asia/p/gioi-thieu-ve-elasticsearch-4P856kGBKY3). Bài viết này mình sẽ trình bày về việc đưa dữ liệu vào và ra khỏi Elasticsearch và duy trì nó: indexing, updating và deleting **documents**
## Sử dụng mapping để xác định các loại tài liệu
### Mapping
Mapping là quá trình xác định cách một tài liệu và các trường chứa nó, được lưu trữ và lập chỉ mục. Ví dụ: sử dụng mapping để xác định:
* Trường chuỗi nào nên được coi là trường full text.
* Trường nào chứa numbers, dates hoặc geolocations.
* Định dạng của các giá trị ngày.
* Quy tắc tùy chỉnh để kiểm soát mapping cho các trường được thêm động.
### Field data type
Mỗi trường có một kiểu dữ liệu có thể là:
* Các loại đơn giản như **text**, **keyword**, **date**, **long**, **double**, **boolean** or **ip**.
* Một kiểu hỗ trợ hierarchical nature của JSON như là **object** hoặc **nested**.
* Hoặc các kiểu như là: **geo_point**, **geo_shape**, hoặc **completion**.
Thường hữu ích để lập chỉ mục cùng một field theo các cách khác nhau cho các mục đích khác nhau. Chẳng hạn, một trường string có thể được lập chỉ mục là trường **text** cho tìm kiếm toàn văn bản và dưới dạng trường **keyword** để sắp xếp hoặc tổng hợp.

Đây là mục đích của *multi-fields*. Hầu hết datatypes hỗ trợ *multi-fields* thông qua **fields** parameter
### Dynamic mapping
Các field và mapping không cần phải được xác định trước khi sử dụng. Nhờ *dynamic mapping*, tên trường mới sẽ được thêm tự động, chỉ bằng cách lập chỉ mục một tài liệu.
### Explicit mappings
Bạn biết nhiều về dữ liệu của mình hơn Elaticsearch có thể đoán, do đó, trong khi ánh xạ động có thể hữu ích để bắt đầu, đến một lúc nào đó bạn sẽ muốn chỉ định ánh xạ rõ ràng của riêng mình.
### Tạo một index với explicit mappings
Bạn có thể sử dụng API tạo chỉ mục để tạo chỉ mục mới với ánh xạ rõ ràng.
```
curl -X PUT "localhost:9200/my-index?pretty" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "age":    { "type": "integer" },  
      "email":  { "type": "keyword"  }, 
      "name":   { "type": "text"  }     
    }
  }
}
'
```
### Thêm một field với mapping đã tồn tại
Bạn có thể sử dụng *put mapping* API để thêm một hoặc nhiều field mới vào mapping đã tồn tại.

Ví dụ bên dưới sẽ thêm `employee-id`, với type là `keyword`  với một tham số `index` với giá trị là `false`. Điều này có nghĩa là các giá trị cho trường `employee-id` được lưu trữ nhưng không được lập chỉ mục hoặc có sẵn để tìm kiếm.

```
curl -X PUT "localhost:9200/my-index/_mapping?pretty" -H 'Content-Type: application/json' -d'
{
  "properties": {
    "employee-id": {
      "type": "keyword",
      "index": false
    }
  }
}
'
```
###  Xem mapping của một index
Bạn có thể sử dụng *get mapping* API để xem mapping của một chỉ mục hiện có.
```
curl -X GET "localhost:9200/my-index/_mapping?pretty"
```
API trả về phản hồi như sau:
```
{
  "my-index" : {
    "mappings" : {
      "properties" : {
        "age" : {
          "type" : "integer"
        },
        "email" : {
          "type" : "keyword"
        },
        "employee-id" : {
          "type" : "keyword",
          "index" : false
        },
        "name" : {
          "type" : "text"
        }
      }
    }
  }
}
```
### Xem mapping của trường cụ thể
Nếu bạn chỉ muốn xem mapping của một hoặc nhiều trường cxem mapping bạn có thể sử dụng *get field mapping* API. Điều này rất hữu ích nếu bạn không cần xem mapping hoàn chỉnh của một chỉ mục hoặc chỉ mục của bạn chứa một số lượng lớn các trường. Yêu cầu sau lấy ra mapping cho trường `employee-id`
```
curl -X GET "localhost:9200/my-index/_mapping/field/employee-id?pretty"
```
API trả về phản hồi sau:
```
{
  "my-index" : {
    "mappings" : {
      "employee-id" : {
        "full_name" : "employee-id",
        "mapping" : {
          "employee-id" : {
            "type" : "keyword",
            "index" : false
          }
        }
      }
    }
  }
}
```
## Cập nhật các documents hiện có
Cập nhật một document bằng cách sử dụng tập lệnh được chỉ định.
### Request
`POST /<index>/_update/<_id>`
### Mô tả
Cho phép bạn cập nhật tài liệu tập lệnh. Tập lệnh có thể cập nhật, xóa hoặc bỏ qua sửa đổi tài liệu. API cập nhật cũng hỗ trợ chuyển một tài liệu một phần, được hợp nhất vào tài liệu hiện có. Để thay thế hoàn toàn một tài liệu hiện có, hãy sử dụng *index* API.

Hoạt động này:
* Lấy tài liệu từ phân đoạn chỉ mục.
* Chạy tập lệnh được chỉ định.
* Lập chỉ mục kết quả.
###  Path parameters
**index** (Bắt buộc, string) Tên của chỉ mục. Theo mặc định, chỉ mục được tạo tự động nếu nó không tồn tại.
**id** (Bắt buộc, string) Mã định danh duy nhất cho tài liệu sẽ được cập nhật.
###  Query parameters
Các query parameters như: `if_seq_no`, `if_primary_term`, `lang`, `refresh`, `retry_on_conflict`, `routing`, `_source`, `_source_excludes`, `_source_includes`, `timeout`, `master_timeout`, `wait_for_active_shards`
### Ví dụ
Đầu tiên, hãy lập chỉ mục một tài liệu đơn giản:
```
curl -X PUT "localhost:9200/test/_doc/1?pretty" -H 'Content-Type: application/json' -d'
{
    "counter" : 1,
    "tags" : ["red"]
}
'
```
Để tăng count, bạn có thể gửi yêu cầu cập nhật với tập lệnh sau:
```
curl -X POST "localhost:9200/test/_update/1?pretty" -H 'Content-Type: application/json' -d'
{
    "script" : {
        "source": "ctx._source.counter += params.count",
        "lang": "painless",
        "params" : {
            "count" : 4
        }
    }
}
'
```
## Xóa document
### Request
`DELETE /<index>/_doc/<_id>`
### Mô tả
Bạn sử dụng DELETE để xóa tài liệu khỏi chỉ mục. Bạn phải chỉ định tên chỉ mục và ID tài liệu.
### Ví dụ
Xóa tài liệu JSON 1 khỏi chỉ mục *twitter*:
```
curl -X DELETE "localhost:9200/twitter/_doc/1?pretty"
```
API trả về kết quả sau:
```
{
    "_shards" : {
        "total" : 2,
        "failed" : 0,
        "successful" : 2
    },
    "_index" : "twitter",
    "_type" : "_doc",
    "_id" : "1",
    "_version" : 2,
    "_primary_term": 1,
    "_seq_no": 5,
    "result": "deleted"
}
```
## Tài liệu tham khảo
[Elasticsearch Reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)