Từ version 7.0, elasticsearch quyết định bỏ type đi, vì sao lại thế?

## TL; DR
* Vì thấy concept không đúng
* Vì nhiều người nhầm dẫn tới chi phí (thời gian, nhân lực) cho việc sửa lại cao

## Chi tiết
### Mapping type là gì?
* Elasticsearch tổ chức thành các **index**, bên trong index là các **type** (hay còn được gọi là **mapping type**)
* Các **index** thường được ví tương đương với **database** trong MySQL, **type** được ví như **table**

### Tại sao bỏ type?
* Bình thường table trong **mysql**, 2 bảng khác nhau, tên trường giống nhau thì kiểu dữ liệu vẫn có thể khác nhau. Ví dụ:
    * Bảng `shop` và bảng `session` đều có trường `id`
    * Bảng `shop` thì trường `id` có kiểu `int`
    * Bảng `session` thì trường `id` có kiểu `string`
    * => Ok, ko vấn đề gì. Vì 2 bảng chả liên quan đến nhau
* **Elasticsearch** thì không thế. Kiểu dữ liệu đi theo index => kể cả các type khác nhau thì kiểu dữ liệu của trường đó cũng sẽ không được thay đổi. VD:
    * Cùng trong index: **ecommerce**
    * Type  `shop` có field `id` là kiểu số (long)
    * Type `session` có field `id` là kiểu string
    * => Khi session insert vào lỗi sml, do kiểu dữ liệu không tương thích. Vì kiểu dữ liệu được đánh theo index, không phải theo từng type.

=> Chính vì lí do nhiều người hiểu nhầm => dùng sai => ES quyết định bỏ
### Bỏ type, vậy tổ chức thế nào?
* **Cách 1**: Coi `index` là bảng đi, cho tiện. Cần thiết thì điều chỉnh số `primary_shard` của từng index đi cho phù hợp với bài toán lưu trữ, tránh dư thừa.
* **Cách 2**: Sử dụng 1 field để lưu kiểu dữ liệu. VD:
    * Bình thường lưu 2 type: `shop`, `session`
    * Bây giờ trong index, thêm 1 field là type, kiểu keyword
    * Khi search thì kèm thêm cái type này vào query là xong

```
PUT ecommerce
{
  "mappings": {
    "_doc": {
      "properties": {
        "type": { "type": "keyword" }, // Field đấy đây nài
        "name": { "type": "text" },
        "user_name": { "type": "keyword" },
        "email": { "type": "keyword" },
        "content": { "type": "text" },
      }
    }
  }
}

GET ecommerce/_search
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "user_name": "Son Tung M-TP"
        }
      },
      "filter": {
        "match": {
          "type": "session"  // Muốn search type gì thì điền vào đây
        }
      }
    }
  }
}
```

Kể ra thì cách 2 trông cũng lôm côm nhỉ. Document cứ loạn hết cả lên :))

### Ảnh hưởng tới parent/child mapping type
Bình thường có type thì có kiểu mapping parent/child để biểu thị quan hệ giữa 2 type. Bây giờ chuyển qua dùng join ở [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/parent-join.html). Thật ra ES làm mấy tính năng này bổ sung thôi. Performance không cao lắm đâu. Anh em hạn chế dùng.

### Migrate từ kiểu cũ sang kiểu mới
ES support sẵn API reindex rồi. Anh em đọc ở[ đây ](https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html)nhé. Bài này cũng tham khảo ở đây mà ra.

Cảm ơn anh chị em đã đọc bài. Nếu có gì sai sót, mong nhận được góp ý.
Bài viết từ blog của mình: https://minhphong306.wordpress.com/2021/04/13/elasticsearch-tai-sao-bo-mapping-type