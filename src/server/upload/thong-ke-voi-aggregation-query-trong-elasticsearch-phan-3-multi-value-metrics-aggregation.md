Như đã đề cập ở [phần trước](https://viblo.asia/p/thong-ke-voi-aggregation-query-trong-elasticsearch-phan-2-metrics-aggregation-query-924lJxLaKPM), tại phần này chúng ta sẽ tiếp tục tìm hiểu đến các loại query còn lại trong loại metrics aggregation query.

Tóm tắt phần trước, metrics aggregation query tính toán một hoặc một vài chỉ số (metrics) dựa vào một field trong documents, field này có thể là một field trong document hoặc là một field được sinh ra từ việc viết script. Ở phần trước chúng ta đã tìm hiểu được một số loại `single-value numeric metrics aggregation` như `sum`, `avg`, `min`, `max`.

Ở phần tiếp theo này, chúng ta sẽ tìm hiểu về loại tiếp theo trong metrics aggregation query đó là `multi-value metrics aggregation`. Tiếp tục sử dụng [dữ liệu](https://viblo.asia/p/thong-ke-voi-aggregation-query-trong-elasticsearch-phan-1-cong-cu-truy-van-va-tong-quat-ve-aggregation-query-07LKXAdpZV4) chúng ta đã index trước từ phần 1

## 1. Stats aggregation

Đây là một câu thống kê dạng multi value, tức là nó sẽ tính toán ra nhiều chỉ số khác nhau chỉ với một câu thống kê dựa vào một field trong documents (có thể là sinh ra từ script). Giả sử trong dữ liệu ngân hàng đã index từ trước ta muốn thống kê số tuổi của các khách hàng, ta có thể viết câu thống kê như sau:

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "avg_age": {
      "avg": {
        "field": "age"
      }
    },
    "max_age": {
      "max": {
        "field": "age"
      }
    },
    "min_age": {
      "min": {
        "field": "age"
      }
    },"sum_age": {
      "sum": {
        "field": "age"
      }
    }
  }
}
```

Kết quả trả về như sau:

```
{
  ...,
    "aggregations": {
    "max_age": {
      "value": 40
    },
    "avg_age": {
      "value": 30.17982017982018
    },
    "sum_age": {
      "value": 30210
    },
    "min_age": {
      "value": 20
    }
  }
}
```

Mặc dù kết quả của việc thống kê tổng số tuổi có phần hơi vô lý, nhưng ta có thể nhận thấy nếu muốn thống kê nhiều giá trị trên một trường thì phải khai báo nhiều câu thống kê với tên gọi khác nhau: `max_age`, `avg_age`,.... Trong khi chúng ta chỉ thống kê trên một trường duy nhất của dữ liệu. Stats aggregation sinh ra để giải quyết vấn đề này, chúng ta có thể thay thế câu truy vấn với 4 thống kê trên thành một câu thống kê duy nhất: 

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "age_stats": {
      "stats": {
        "field": "age"
      }
    }
  }
}
```

Kết quả trả về như sau:

```
{
...,
  "aggregations": {
    "age_stats": {
      "count": 1001,
      "min": 20,
      "max": 40,
      "avg": 30.17982017982018,
      "sum": 30210
    }
  }
}
```

Như vậy việc truy vấn giá trị thống kê cũng trở nên dễ dàng hơn vì chỉ cần truy cập qua 1 key duy nhất (`age_stats`). Ngoài ra, thống kê này cũng có thể áp dụng được các options đã nêu ở phần trước như (`script`, `missing`). Ví dụ, thống kê trên trường `balance` quy đổi ra tiền Việt như sau:

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "balance_stats": {
      "stats": {
        "script": {
          "source": "doc['balance'].value * params.rate"
          , "params": {
            "rate": 20
          }
        }
      }
    }
  }
}
```

Câu query trên còn sử dụng một options khác đó là params để sử dụng trong field script.

## 2. Extended stats aggregation

Câu thống kê này là phiên bản mở rộng của Stats aggregation, các giá trị được tính toán thêm bao gồm có `sum_of_squares`, `variance`, `std_deviation`, `std_deviation_bounds` (tổng bình phương, phương sai, độ lệch chuẩn, biên lệch chuẩn). Ví dụ với field `balance`:

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "balance_stats": {
      "extended_stats": {
        "field": "balance",
        "missing": 1000
      }
    }
  }
}
```

Ta có kết quả sau:

```
...,
  "aggregations": {
    "balance_stats": {
      "count": 1001,
      "min": 1000,
      "max": 49989,
      "avg": 25690.146853146853,
      "sum": 25715837,
      "sum_of_squares": 858627807735,
      "variance": 197786392.36105156,
      "std_deviation": 14063.655014293105,
      "std_deviation_bounds": {
        "upper": 53817.45688173306,
        "lower": -2437.1631754393566
      }
    }
  }
}
```

Biên lệch chuẩn `std_deviation_bounds` là khoảng cộng / trừ 2 lần giá trị độ lệch chuẩn từ giá trị trung bình của trường đó. Để điều chỉnh khoảng biên này ta có thể config trong câu thống kê thông qua `sigma`:

```
GET bank/account/_search
{
    "size": 0,
    "aggs" : {
        "balance_stats" : {
            "extended_stats" : {
                "field" : "balance",
                "sigma" : 1
            }
        }
    }
}
```

Kết quả của `std_deviation_bounds`:

```
...
      "std_deviation_bounds": {
        "upper": 39753.80186743996,
        "lower": 11626.491838853748
      }
...
```

## 3. Percentiles aggregation

Đây là một câu thống kê rất hữu dụng cho chúng ta thấy được sự phân phối của dữ liệu trên một field trong document.

Giả sử, dữ liệu log monitor hoạt động của website của chúng ta có ghi lại thời gian load times. Chúng ta cần đánh giá performance của website dựa trên thông số này để có thể rút ra biện pháp cải thiện hiệu quả. 

Đôi khi, giá trị trung bình hay giá trị min, max không phản ánh đúng những gì dữ liệu của chúng ta có, và nó cũng không hoàn toàn hữu dụng với quản trị viên. 

Ví dụ, một vài giá trị max của load times có thể làm lệch giá trị trung bình dẫn đến đánh giá sai.

Percentiles aggregation thường được sử dụng trong những trường hợp này, **một percentile hiển thị một điểm mà tại đó lượng phần trăm đó giá trị quan sát được xuất hiên**. *Có thể lấy ví dụ cụ thể để có thể dễ hiểu hơn như sau, percentile thứ 95 là giá trị lớn hơn 95% giá trị quan sát được.*

Percentiles aggregation thường được sử dụng để phát hiện những bất thường, thích hợp cho việc phân tích log. Trong các phân phối chuẩn, percentiles 0.13th và 99.87th biểu diễn 3 độ lệch chuẩn từ giá trị trung bình. Những dữ liệu nằm ngoài vùng trên được đánh giá là bất thường. 

Khi thu được thống kê về percentiles, chúng có thể được sử dụng để ước tính sự phân bố dữ liệu và xác định xem dữ liệu có bị lệch, ...

Quay trở lại với dữ liệu mẫu về ngân hàng, ta cũng có thể xác định được sự phân phối của tài khoản trong ngân hàng thông qua percentiles aggregation.

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "balance_percentiles": {
      "percentiles": {
        "field": "balance"
      }
    }
  }
}
```

Ta thu được kết quả trả về như sau

```
{
   ...,
  "aggregations": {
    "balance_percentiles": {
      "values": {
        "1.0": 1462.8400000000001,
        "5.0": 3591.85,
        "25.0": 13712.904761904761,
        "50.0": 26020.11666666667,
        "75.0": 38167.58333333333,
        "95.0": 47551.549999999996,
        "99.0": 49339.16
      }
    }
  }
}
```

Từ kết quả trên ta có thể kết luận được, số tiền trong tài khoản của khách hàng đa phần ở mức dưới `38167`, và số dư trong tài khoản phân bố khá đều, giá trị ở phần trăm thứ 99th cũng không cách biệt giá trị trung bình quá lớn.

Đối với thống kê này, ta có thể cấu hình phần trăm trả về với tham số `percent` định nghĩa các percentiles trả về mà chúng ta quan tâm, chẳng hạn như `85th`, `95th`, `99th`

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "balance_percentiles": {
      "percentiles": {
        "field": "balance"
        , "percents": [
          85,
          95,
          99
        ]
      }
    }
  }
}
```

Kết quả trả về:

```
{
  ...,
  "aggregations": {
    "balance_percentiles": {
      "values": {
        "85.0": 42778.25357142858,
        "95.0": 47551.549999999996,
        "99.0": 49339.16
      }
    }
  }
}
```


-----

Vậy là chúng ta đã đi tiếp được đến phần Multi-value metrics aggregation, các bạn có thể tham khảo để hiểu kỹ hơn ứng dụng của percentiles aggregation trong bài viết sau: [Understanding social media engagement with Elasticsearch](https://tech.scrunch.com/blog/understanding-social-media-engagement-using-elasticsearchs-percentiles-aggregation/).

Ở phần tiếp theo chúng ta sẽ đi tiếp ví dụ về một loại Multi-value metrics aggregation nữa đó là Percentiles Rank để ôn tập lại những điều đã đề trong bài viết này, đồng thời tìm hiểu về loại metric aggregation query `top_hits`

Sau đó chúng ta sẽ luyện tập một số cách sử dụng metric aggregations dưới dạng sub aggregation, cũng là bước đà để chúng ta đi vào tìm hiểu Bucket aggregations query.

-----

### Tham khảo
- https://www.elastic.co/guide/en/kibana/current/console-kibana.html
- https://www.elastic.co/guide/en/elasticsearch/reference/6.2/search-aggregations.html
- https://www.elastic.co/guide/en/elasticsearch/guide/current/aggregations.html