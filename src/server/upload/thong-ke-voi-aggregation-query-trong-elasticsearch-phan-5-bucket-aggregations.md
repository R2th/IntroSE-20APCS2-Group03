Bucket Aggregation không thực hiện tính toán số liệu dựa trên các trường như Metric Aggregations, thay vào đó, chúng tạo nên những buckets của documents. Mỗi một bucket sẽ dựa vào một tiêu chí (phụ thuộc vào kiểu aggregation - thống kê) để quyết định một document có thuộc về bucket đó hay không. Nói cách khác, mỗi một bucket sẽ định nghĩa một tập các documents, bucket aggregations sẽ tính toán và trả về số lượng documents thuộc về mỗi bucket.

Một điều đặc biệt khác ở phần trước chúng ta đã có nhắc đến đó là bucket aggregations có thể chứa các sub-aggregation (trái ngược với metric aggregations). Các sub-aggregations sẽ tính toán dựa trên các document trong các bucket cha của nó.

Mỗi một request có thể có nhiều bucket được trả về với nhiều tiêu chí thống kê khác nhau. Số lượng tối đa buckets có thể trả về trong một single response được giới hạn bởi settings `search.max_buckets`.

Ở phần này, chúng ta sẽ cùng đi tìm hiểu một số loại bucket aggregations, điển hình với terms aggregation. 

### 1. Terms Aggregation

Đây là thống kê trả về multi-bucket với mỗi bucket được xây dựng trong lúc truy vấn, mỗi một bucket là một giá trị duy nhất của một trường trong document.

Ví dụ: với dữ liệu mẫu đã index từ phần một, chúng ta muốn đếm xem số tài khoản ở mỗi bang là bao nhiêu ta có thế sử dụng truy vấn sau:


```python
GET bank/account/_search
{
  "size": 0, 
  "aggs": {
    "acc_per_city": {
      "terms": {
        "field": "state.keyword"
        , "size": 5
      }
    }
  }
}
```

Kết quả trả về:

```python
{
  "hits": {
    "total": 1001,
    "max_score": 0,
    "hits": []
  },
  "aggregations": {
    "acc_per_city": {
      "doc_count_error_upper_bound": 24,
      "sum_other_doc_count": 884,
      "buckets": [
        {
          "key": "TX",
          "doc_count": 27
        },
        {
          "key": "AL",
          "doc_count": 25
        },
        {
          "key": "MD",
          "doc_count": 25
        },
        {
          "key": "MA",
          "doc_count": 21
        },
        {
          "key": "ID",
          "doc_count": 19
        }
      ]
    }
  }
}
```

Với loại thống kê trên, ta có thể dễ dàng thu được số lượng tài khoản tại mỗi bang. Nhìn vào kết quả trên chắc bạn sẽ thắc mắc "tại sao tổng số lượng document trong mỗi bucket lại ít hơn nhiều so với tổng số lượng document của trường `hits` trả về?". Chúng ta sẽ cùng đi tìm hiểu điều đó ngay bây giờ, vì terms agg là một câu thống kê hữu dụng và thường xuyên được sử dụng nên bài viết sẽ đi sâu vào câu thống kê này một chút:

* Mặc định, terms agg query chỉ trả về tối đa là 10 buckets, được định nghĩa bởi param `size` trong request và được sắp xếp theo thứ tự giảm dần số documents trong một bucket được định nghĩa bởi param `order`. Trong ví dụ trên, chúng ta đã định nghĩa `size = 5` vì vậy kết quả trả về chỉ lấy là 5 bucket có số lượng document lớn nhất (do không định nghĩa lại param `order`).

* *Note*: Nếu bạn đã tìm hiểu về kiến trúc của Elasticsearch, chắc hẳn bạn cũng biết rằng Elasticsearch là một distribution documents storage, và tốc độ search của elasticsearch là near-realtime bởi mỗi một request search được gửi đến các shard (đơn vị lưu trữ documents nhỏ nhất) để thực hiện search và trả về cho người dùng. (nếu bạn chưa có dịp đọc về nó có thể tìm hiểu tại [đây](https://www.elastic.co/guide/en/elasticsearch/guide/current/distributed-docs.html))
* Document counts are approximate: Từ ý trên, ta có thể nhận thấy việc đếm số document trong terms agg không phải lúc nào cũng chính xác. Bởi vì mỗi shard lại trả về top result dựa trên kết quả lưu trữ của shard đó, và tất cả kết quả này được tổng hợp thành kết quả cuối cùng. Chúng ta có thể xem ví dụ sau để có cái nhìn rõ hơn:

Thực hiện 1 request để lấy ra top 5 terms của field `product`, sắp xếp theo thứ tự giảm dần số document trong một index với 3 shards. Trong trường hợp này mỗi shard sẽ trả về top 5 terms của shard đó

```python
{
    "aggs" : {
        "products" : {
            "terms" : {
                "field" : "product",
                "size" : 5
            }
        }
    }
}
```

Terms của mỗi shard trong 3 shards trên được trả về như bên dưới với số document tương ứng trong ngoặc:



|          | Shard A | Shard B | Shard C |
| -------- | -------- | -------- | -------- |
| 1  | Product A (25)  | Product A (30)  | Product A (45) |
| 2  | Product B (18)  | Product B (25)  | Product C (44) |
| 3  | Product C (6)  | Product F (17)  | Product Z (36) |
| 4  | Product D (3)  | Product Z (16)  | Product G (30) |
| 5  | Product E (2)  | Product G (15)  | Product E (29) |
| 6  | Product F (2)  | Product H (14)  | Product H (28) |
| 7  | Product G (2)  | Product I (10)  | Product Q (2) |
| 8  | Product H (2)  | Product Q (6)  | Product D (1) |
| 9  | Product I (1)  | Product J (8) |
| 10  | Product J (1)  | Product C (4) |

3 shards trên sẽ trả về top 5 terms của nó như sau:

|          | Shard A | Shard B | Shard C |
| -------- | -------- | -------- | -------- |
| 1 | Product A (25) | Product A (30) | Product A (45) |
| 2 | Product B (18) | Product B (25) | Product C (44) |
| 3 | Product C (6) | Product F (17) | Product Z (36) |
| 4 | Product D (3) | Product Z (16) | Product G (30) |
| 5 | Product E (2) | Product G (15) | Product E (29) |

Kết hợp chúng thành một list cuối cùng:

|||
| -------- | -------- |
| 1 | Product A (100) |
| 2 | Product Z (52) |
| 3 | Product C (50) |
| 4 | Product G (45) |
| 5 | Product B (43) |

Bởi vì `Product A` được trả về bởi tất cả các shard nên chúng ta có thể thấy được giá trị document count là chính xác. `Product C` được trả về duy nhất bởi shard A và C vì vậy giá trị doc count của nó được trả về là 50 nhưng đây không phải là con số chính xác. Product C tồn tại ở shard B, nhưng số doc count của nó tại shard B là 4 nên nó không lọt vào top 5 term của shard B. Product Z cũng được trả về bởi 2 shard nhưng nó lại không tồn tại ở shard còn lại. Product H có số doc count là 44 trên toàn bộ 3 shards nhưng lại không được trả về vì nó không lọt top 5 terms của từng shard. 

* Tính toán số lượng doc count sai: Trong response trả về ở ví dụ đầu tiên, giá trị `doc_count_error_upper_bound` là giá trị lớn nhất có thể của doc count cho một term không thể lọt vào top n terms cuối cùng, giá trị này được tính bằng tổng doc count của term cuối cùng trong số term được được trả về trong mỗi shard. Với ví dụ về trường `product` ta có response sau:

```python
{
    ...

    "aggregations" : {
        "products" : {
            "doc_count_error_upper_bound" : 46,
            "buckets" : [
                {
                    "key" : "Product A",
                    "doc_count" : 100
                },
                {
                    "key" : "Product Z",
                    "doc_count" : 52
                },
                ...
            ]
        }
    }
}
```

trong đó `doc_count_error_upper_bound` là 46 là tổng của (2 + 15 + 29). Điều này có nghĩa là trường hợp xấu nhất một term không được trả về có thể có doc count nhiều thứ tư trong các term của field `product`.

* Các cách khắc phục: Để tăng độ chính xác cho terms agg, ta có thể tăng `size` mặc định, điều này làm tăng số term trả về mỗi shard, khiến cho kết quả cuối cùng trở nên chính xác hơn nhiều, nhưng nó lại làm cho performance tính toán trở nên kém hiệu quả hơn (vì mỗi shard sẽ có hàng đợi phục vụ đếm doc count cho tất cả các terms lớn hơn đồng thời việc truyền dữ liệu trả về giữa node và client sẽ lớn hơn).
* parram `shard_size` được sử dụng để giảm thiểu công việc cho shard khi request với `size` lớn. Nó định nghĩa số terms trả về của mỗi shard sau đó kết quả được tổng hợp dựa trên `size`. `shard_size` thường được configure lớn hơn `size`, nếu `shard_size` được config nhỏ hơn size, nó sẽ được elasticsearch từ động đưa về giá trị bằng `size`.
* Ngoài ra trong response trả về còn một giá trị nữa `sum_other_doc_count` đó là giá trị của tất cả các document còn lại không thuộc về các bucket được trả về. 

### 2. Order


Thứ tự của buckets có thể tùy biến dựa vào settings `order`, có 3 kiểu tùy biến:

* Sắp xếp theo chiều tăng dần, hoặc giảm dần của `_key` (term) hoặc `_count` (doc count)

```python
GET /_search
{
    "aggs" : {
        "genres" : {
            "terms" : {
                "field" : "genre",
                "order" : { "_count" : "asc" }
            }
        }
    }
}
```

hoặc 

```python
{
    "aggs" : {
        "genres" : {
            "terms" : {
                "field" : "genre",
                "order" : { "_key" : "asc" }
            }
        }
    }
}
```

* Sắp xếp bucket dựa trên single value metric sub-aggregation (dựa vào trên của aggregation):

```python
GET /_search
{
    "aggs" : {
        "genres" : {
            "terms" : {
                "field" : "genre",
                "order" : { "max_play_count" : "desc" }
            },
            "aggs" : {
                "max_play_count" : { "max" : { "field" : "play_count" } }
            }
        }
    }
}
```

trong câu thống kê trên, các bucket được sắp xếp dựa trên giá trị max của trường `play_count` trong từng bucket.

* Sắp xếp dựa trên multi value metric sub-aggregation:

```python
GET /_search
{
    "aggs" : {
        "genres" : {
            "terms" : {
                "field" : "genre",
                "order" : { "playback_stats.max" : "desc" }
            },
            "aggs" : {
                "playback_stats" : { "stats" : { "field" : "play_count" } }
            }
        }
    }
}
```

trong câu thống kê trên, các bucket được sắp xếp dựa trên giá trị `max` của thống kê `stats` trên trường `play_count`

### 3. Minimum document count

Ta có thể config terms aggregation chỉ trả về những bucket có số doc count lớn hơn một giá trị nhất định nào đó. Ví dụ, ta có thể bỏ qua những trường hợp tổng hợp trên trường mà một số documents không chứa giá trị bằng cách config aggregation như sau:

```python
GET /_search
{
    "aggs" : {
        "genres" : {
            "terms" : {
                "field" : "genre",
                "min_doc_count": 1
            }
        }
    }
}
```

Note: Mỗi shard khi thống kê số lượng doc count đều không biết về số lượng doc count của toàn bộ index nên sẽ không sử dụng giá trị `min_doc_count` để filter kết quả mà giá trị này được dùng để filter buckets sau khi nó đã tổng hợp kết quả từ tất cả các shards. Điều này dẫn đến mỗi việc loại bỏ những terms mà có tần suất xuất hiện cao trên toàn bộ shard nhưng lại bị filter ở kết quả cuối cùng. Để tránh điều này, ta có thể tăng số lượng `shard_size`, ngoài ra có một cách hiệu quả hơn đó là `shard_min_doc_count` để loại bỏ những term có số lần xuất hiện ít tại shard level. Giá trị này mặc định là `0`.
 
### 4. Missing value

Param `missing` trong request cũng có thể được dùng để trả về doc count cho các document thiếu giá trị của trường cần thống kê. Mặc định những trường này sẽ bị ignore nhưng với config này chúng ta có thể coi như chúng có giá trị và được tổng hợp vào 1 bucket.

```python
{
    "aggs" : {
        "tags" : {
             "terms" : {
                 "field" : "tags",
                 "missing": "N/A" 
             }
         }
    }
}
```

câu trên sẽ tổng hợp tất cả các document không có giá trị trường `tags` vào một bucket là `N/A`.


### 5. Filter values

Chúng ta cũng có thể loại bỏ những một vài key trong kết quả trả về bởi terms agg nếu nó không phải là giá trị chúng ta mong muốn tổng hợp trong trường hợp ta thống kê trên nhiều doc_type của một index.

#### Filter values với regular expression

```python
{
    "aggs" : {
        "tags" : {
            "terms" : {
                "field" : "tags",
                "include" : ".*sport.*",
                "exclude" : "water_.*"
            }
        }
    }
}
```

*Thống kê các loại môn thể thao trừ những một thể thao bắt đầu với tiền tốt `water` *

#### Filter values với giá trị chính xác

```python
{
    "aggs" : {
        "JapaneseCars" : {
             "terms" : {
                 "field" : "make",
                 "include" : ["mazda", "honda"]
             }
         },
        "ActiveCarManufacturers" : {
             "terms" : {
                 "field" : "make",
                 "exclude" : ["rover", "jensen"]
             }
         }
    }
}
```

### Tổng kết

Như vậy, ta có thể thấy `terms` là một aggregation rất hữu dụng nhưng việc sử dụng nó để cho ra kết quả chính xác nhất lại không phải dễ dàng, nhất là đối với những trường dữ liệu có nhiều giá trị, bởi lẽ aggregation này xây dựng bucket một cách dynamics ngay khi nó được request bơỉ client. Đối với những dữ liệu nhỏ, ít giá trị unique, việc request `terms` aggregation là không thành vấn đề, nhưng đối với index có rất nhiều document (> 1m documents), việc sử dụng truy vấn này một cách mặc định sẽ gây tiêu tốn tài nguyên và thậm chí cho kết quả không chính xác. Vì vậy, đừng chủ quan khi sử dụng câu thống kê này mà hãy verify thật kỹ dữ liệu với các params trên nhé.