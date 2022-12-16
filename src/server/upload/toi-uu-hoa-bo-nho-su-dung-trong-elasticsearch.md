## Tắt các tính năng không cần thiết
Mặc định, Elasticsearch lập chỉ mục và thêm giá trị doc vào hầu hết các trường để chúng có thể được tìm kiếm và sử dụng aggregated. Ví dụ: nếu có một trường số được gọi là **"foo"** mà bạn chỉ sử dụng nó để vẽ biểu đồ (histogram) mà không có ý định search hay filter, bạn có thể vô hiệu hóa việc lập chỉ mục trên trường này trong mapping:
```
PUT index
{
  "mappings": {
    "properties": {
      "foo": {
        "type": "integer",
        "index": false
      }
    }
  }
}
```

Nếu không quan tâm đến việc scoring, bạn có thể định cấu hình Elasticsearch để chỉ lập chỉ mục các tài liệu match với mọi term. Bạn vẫn có thể tìm kiếm trên trường này, nhưng phrase queries sẽ phát sinh lỗi và scoring sẽ giả định rằng các cụm từ chỉ xuất hiện một lần trong mọi tài liệu.
```
PUT index
{
  "mappings": {
    "properties": {
      "foo": {
        "type": "text",
        "norms": false,
        "index_options": "freqs"
      }
    }
  }
}
```

## Không sử dụng dynamic string mappings mặc định
Mặc định khi không định nghĩa trước trong mapping, string data sẽ được lập chỉ mục cho cả 2 kiểu là text và keyword. Điều này có nghĩa là với cùng một lượng data chúng ta phải tốn gấp đôi lượng tài nguyên để lưu chỉ mục. Việc này có thể được sửa đổi bằng cách định nghĩa trước kiểu cho trường muốn index hoặc thiết lập dynamic string mappings templates  mapping string data với chỉ một kiểu dữ liệu là text hoặc keyword:
```
PUT index
{
  "mappings": {
    "dynamic_templates": [
      {
        "strings": {
          "match_mapping_type": "string",
          "mapping": {
            "type": "keyword"
          }
        }
      }
    ]
  }
}
```

## Theo dõi shard size
Các shard có kích thước lớn hơn sẽ lưu trữ dữ liệu hiệu quả hơn. Để tăng kích thước shard của mình, bạn có thể tạo các index có ít primary shards hơn, tạo ít index hơn (ví dụ: bằng cách tận dụng API Rollover) hoặc sửa đổi index hiện có bằng cách sử dụng API Shrink. Hãy nhớ rằng kích thước shard lớn đi kèm với những hạn chế, chẳng hạn như thời gian khôi phục lâu.

## Disable source field
Trường  source  lưu trữ phần thân JSON ban đầu của tài liệu. Nếu bạn không cần quyền truy cập vào nó, bạn có thể tắt nó. Tuy nhiên, các API cần quyền truy cập vào source như update  và reindex sẽ không hoạt động.

## Force Merge
Các index trong Elasticsearch được lưu trữ trong một hoặc nhiều shard. Mỗi shard là một index Lucene và được tạo thành từ một hoặc nhiều segments  - các tập inverted index được lưu trên đĩa. Các segments lớn hơn sẽ hiệu quả hơn để lưu trữ dữ liệu.

API forcemerge có thể được sử dụng để giảm số lượng segments trên mỗi shard. Trong nhiều trường hợp, số lượng segments có thể được giảm xuống còn segments đoạn trên mỗi shard bằng cách đặt max_num_searies = 1.

## Shrink Index
API Shrink cho phép bạn giảm số lượng shard trong một index. Cùng với API Force Merge ở trên, điều này có thể giảm đáng kể số lượng các segments và shard của một index.

## Sử dụng kiểu numeric nhỏ nhất có thể
Type mà bạn chọn cho dữ liệu số có thể có tác động đáng kể đến việc sử dụng dung lượng đĩa. Cụ thể, các số nguyên phải được lưu trữ bằng integer type (byte, short, integer hoặc float) và các dấu chấm động phải được lưu trữ trong scaled_float nếu thích hợp hoặc ở kiểu nhỏ nhất phù có thể hợp với từng use-case. Ví dụ như sử dụng float thay vì double, hoặc Half_float thay vì float sẽ giúp tiết kiệm dung lượng.

## Put dữ liệu với các trường đã được sắp xếp theo cùng một thứ tự
Do thực tế là nhiều tài liệu được nén lại với nhau thành các khối, nhiều khả năng bạn sẽ tìm thấy các chuỗi trùng lặp dài hơn trong source của các tài liệu đó nếu các trường được sắp xếp theo cùng một thứ tự.

## Tổng hợp historical data
Giữ dữ liệu cũ hơn có thể hữu ích cho việc phân tích sau này nhưng thường bị tránh do chi phí lưu trữ. Bạn có thể sử dụng  [Rolling up data plugin](https://www.elastic.co/guide/en/elasticsearch/reference/current/xpack-rollup.html) để thu gọn và lưu trữ dữ historical data với việc sử dụng ít dung lượng ổ cứng hơn.

## Tham khảo:
https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-disk-usage.html#_use_the_smallest_numeric_type_that_is_sufficient