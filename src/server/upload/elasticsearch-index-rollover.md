Nếu bạn đang sử dụng ElasticSearch để lưu trữ log của ứng dụng, thì cụm ES của bạn có thể trở nên khổng lồ rất nhanh.

May mắn thay, ElasticSearch cung cấp chức năng automatic rollover(tự động luân chuyển) có thể xóa các index cũ để giải quyết vấn đề trên.

Chúng ta sẽ thực hiện một demo nhỏ.

Lưu ý: tất cả các cấu hình và ví dụ ở đây đều dựa trên ELK 7.x. Một số chức năng sẽ không có trong các phiên bản trước. Nếu bạn đang sử dụng phiên bản cũ hơn, hãy cân nhắc nâng cấp.

Có 3 bước cần thực hiện:
- Tạo lifecycle policy chứa các giai đoạn và hành động cho từng giai đoạn.
- Tạo index template và thêm vào lifecycle policy.
- Kiểm ra các index đang đi qua các lifecycle phases như mong muốn.


### Tạo lifecycle policy
ElasticSearch cung cấp chức năng lifecycle policy (ilp), có thể luân chuyển các index.  Dùng chức năng này ta có thể xác định được các giai đoạn của một index (hot, warm, cold, delete).

Khi xử lý log, chúng ta có thể lưu trữ chúng trong các index khác nhau, được luân chuyển một cách tự động theo các điều kiện nhất định (kích thước hoặc thời gian). Ngoài ra, các index có chứa log cũ có thể bị xóa để giải phóng dung lượng.

Trong ví dụ bên dưới, chúng ta đang tạo một lifecycle policy có tên "test". Giai đoạn "hot", khi mà index đang được sử dụng, kết thúc khi index lớn hơn 500MB hoặc có thời gian sống trên 1 phút. Giai đoạn "delete" (khi index bị xóa hoàn toàn) bắt đầu 1 phút sau khi luân chuyển (hoặc 2 phút sau khi tạo).
```json
PUT _ilm/policy/test
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_size": "500mb",
            "max_age": "1m"
          },
          "set_priority": {
            "priority": 100
          }
        }
      },
      "delete": {
        "min_age": "1m",
        "actions": {
          "delete": {
            "delete_searchable_snapshot": true
          }
        }
      }
    }
  }
}
```
### Tạo index template
Index template sẽ đảm bảo rằng các index mới được tạo mới có áp dụng các lifecycle policy mong muốn.

Template bên dưới sẽ được áp dụng cho bất kỳ index nào sẽ được tạo mới có tên bắt đầu với từ "test".

```json
PUT _index_template/test
{
  "index_patterns": ["test-*"],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "index": {
        "lifecycle": {
          "name": "test",
          "rollover_alias": "test"
        }
      }
    }
  }
}
```
### Tạo index có alias
Alias là tên thay thế cho một hoặc nhiều index.
Có 2 cách để sử dụng alias - có hoặc không có thuộc tính "is_write_index".

 - Nếu sử dụng thuộc tính "is_write_index" (được khuyên dùng và sử dụng trong ví dụ bên dưới), alias index sẽ trỏ tới tất cả các index. Index mới nhất sẽ là index được "write". Cấu hình này cho phép bạn lấy dữ liệu từ tất cả các index (kể cả index cũ) khi tìm kiếm, trong khi các tài liệu mới sẽ được ghi vào index mới nhất.

 - Nếu không sử dụng thuộc tính "is_write_index", alias sẽ luôn trỏ đến index mới nhất. Ngay cả khi những cái khác vẫn còn, chúng ta sẽ không lấy được dữ liệu cũ thông qua alias (bạn sẽ phải tìm kiếm trực tiếp trong chúng).

Yêu cầu duy nhất đối với index là tên của nó kết thúc bằng một số. Tuy nhiên, trong ví dụ này, tôi cũng thêm dấu thời gian của quá trình luân chuyển.

Trong ví dụ bên dưới, chúng ta đang tạo một index "test-2021.02.05-000001" với alias là "test".
```json
PUT /%3Ctest-%7Bnow%2Fd%7BYYYY.MM.dd%7D%7D-000001%3E
{
  "aliases": {
    "test": {
      "is_write_index" : true
    }
  }
}
```
### Kiểm tra thử alias
Giờ đây, alias "test" trỏ đến index duy nhất có sẵn - "test-2021.02.05-000001".

```json
GET /test

(Response)
{
  "test-2021.02.05-000001" : {
    "aliases" : {
      "test" : {
        "is_write_index" : true
      }
    },
    "mappings" : { },
    "settings" : {
      "index" : {
        "lifecycle" : {
          "name" : "test",
          "rollover_alias" : "test"
        },
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",
        "provided_name" : "<test-{now/d{YYYY.MM.dd}}-000001>",
        "creation_date" : "1612536374323",
        "priority" : "100",
        "number_of_replicas" : "1",
        "uuid" : "XpsCXK7gRcyoFZf71FfIag",
        "version" : {
          "created" : "7100099"
        }
      }
    }
  }
}
```
### Insert data
Giờ ta hãy thử insert 3 documents vào trong index test

```json
PUT test/_doc/1
{
  "message": "a dummy log 1"
}
PUT test/_doc/2
{
  "message": "a dummy log 2"
}
PUT test/_doc/3
{
  "message": "a dummy log 3"
}
```

### Kiểm tra số lượng documents trong index bằng alias
Số lượng documents giờ đã là 3.

```json
GET /test/_count

(Response)
{
  "count" : 3,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  }
}
```
### Rollover manually
Chúng ta có thể thực hiện cấu hình rollover bằng tay bằng lệnh
```json
POST /test/_rollover 
{
  "conditions": {
    "max_age":   "1m"
  }
}
```
### Kiểm tra index bằng alias (một lần nữa)
Giờ đây, alias "test" trỏ đến cả hai index "test-2021.02.05-000001" và "test-2021.02.05-000002". Index mới (000002) có thuộc tính "is_write_index" được đặt thành true, index cũ (000001) - thành false. Tất cả các bản ghi mới, được chuyển đến alias, được lưu trong index mới, nhưng tìm kiếm bằng alias sẽ tìm thấy tài liệu từ cả hai index.

```json
GET /test

(Response)
{
  "test-2021.02.05-000001" : {
    "aliases" : {
      "test" : {
        "is_write_index" : false
      }
    },
    "mappings" : {
      "properties" : {
        "message" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        }
      }
    },
    "settings" : {
      "index" : {
        "lifecycle" : {
          "name" : "test",
          "rollover_alias" : "test"
        },
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",
        "provided_name" : "<test-{now/d{YYYY.MM.dd}}-000001>",
        "creation_date" : "1612536374323",
        "priority" : "100",
        "number_of_replicas" : "1",
        "uuid" : "XpsCXK7gRcyoFZf71FfIag",
        "version" : {
          "created" : "7100099"
        }
      }
    }
  },
  "test-2021.02.05-000002" : {
    "aliases" : {
      "test" : {
        "is_write_index" : true
      }
    },
    "mappings" : { },
    "settings" : {
      "index" : {
        "lifecycle" : {
          "name" : "test",
          "rollover_alias" : "test"
        },
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",
        "provided_name" : "<test-{now/d{YYYY.MM.dd}}-000002>",
        "creation_date" : "1612536718290",
        "priority" : "100",
        "number_of_replicas" : "1",
        "uuid" : "TEAHJYsNTAWZzF8p5DpfRA",
        "version" : {
          "created" : "7100099"
        }
      }
    }
  }
}
```

### Cho thêm một document và kiểm tra lại số lượng
Nếu ta thêm một document, sô lượng sẽ là 4: 3 doc từ index đầu và 1 doc từ index mới

```json
PUT test/_doc/4
{
  "message": "a dummy log 4"
}

GET /test/_count

(Response)
{
  "count" : 4,
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "skipped" : 0,
    "failed" : 0
  }
}
```

Lưu ý: lifecycle policy được áp dụng ở trên sẽ chỉ áp dụng sau một khoảng thời gian được tính theo giờ hoặc ngày không phải phút, vì vậy mặc dù đặt thời gian xóa là 1 phút, bạn có thể sẽ phải chờ 30p - 1 tiếng để thấy sự thay đổi. Chi tiết thêm ở [đây](https://stackoverflow.com/a/68728522/6052512)

Link tham khảo:
https://www.elastic.co/guide/en/elasticsearch/reference/master/getting-started-index-lifecycle-management.html
https://blog.nikolovi.de/2021/02/elasticsearch-index-rollover-with.html