Ở phần trước chúng ta đã tìm hiểu thế nào là multi-values aggregations, sử dụng một số loại query như `stats`, `extended_stats`, và một loại thống kê rất hưũ ích trong phân tích log đó là `percentiles`, ở bài này chúng ta sẽ tìm hiểu thêm một aggregation query tương tự như `percentiles` đó là `percentile_rank`.

## Percentile Ranks

Đây là một câu thống kê dạng multi-values metric sẽ tính toán một hoặc nhiều percentile ranks dựa trên số liệu đầu vào của câu thống kê đó so với tất cả các giá trị của một trường trong index, hoặc so với giá trị sinh ra từ script được định nghĩa trong câu thống kê.


Percentile rank biểu diễn phần trăm của của những giá trị trong index mà thấp hơn một giá trị đầu vào nào đó. Ví dụ đơn giản đó là, nếu một giá trị đầu vào lớn hơn hoặc bằng 95% giá trị của những giá trị thuộc về  một trường trong index, thì giá trị đầu vào đó được gọi là có percentile rank là 95th.

Giả sử dữ liệu log của một website ghi lại thời gian load trang web của mọi truy cập tới nó. Bạn có thể có một cam kết dịch vụ với khách hàng rằng, 95% thời gian load hoàn thành trong vòng 15ms và 99% thời gian load hoàn thành trong 30ms.

Để đảm bảo rằng website của bạn hoạt động đúng như mong đợi, ta có thể kiểm tra dữ liệu log hằng ngày với câu thống kê sau:

```python
{...,
    "aggs" : {
        "load_time_outlier" : {
            "percentile_ranks" : {
                "field" : "load_time", 
                "values" : [15, 30]
            }
        }
    }
}
```

Với trường `load_time` là trường numeric.

Ví dụ, response có thể trả về như sau:

```python
{
    ...,
    
   "aggregations": {
      "load_time_outlier": {
         "values" : {
            "15": 92,
            "30": 100
         }
      }
   }
}
```

Từ kết quả trên, ta có thể kết luận, 92% thời gian load là dưới hoặc bằng 15ms, và 100% là dưới 30ms, như vậy ta đã không đảm bảo một điều kiện trong cam kết dịch vụ. Như vậy, có thể thấy đây cũng là một câu thống kê rất hữu ích với việc phân tích log, để điều tra bất thường với các trường số liệu.

Trở lại với sample data của chúng ta từ phần đầu tiên, ta có thể sử  dụng thống kê trên dựa trên độ tuổi của chủ thẻ tại ngân hàng, ta sẽ xem các khách hàng độ tuổi 25 và 30 chiếm bao nhiêu phần trăm.

Ta có câu thống kê sau:

```python
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "age_per_rank": {
      "percentile_ranks": {
        "field": "age",
        "values": [
          25,
          40
        ]
      }
    }
  }
}
```

Kết quả trả về:

```python
{
  "took": 14,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 1001,
    "max_score": 0,
    "hits": []
  },
  "aggregations": {
    "age_per_rank": {
      "values": {
        "25.0": 26.073926073926074,
        "40.0": 100
      }
    }
  }
}
```

Như vậy ta có thể thấy khách hàng chỉ nằm ở độ tuổi dưới 40, và phần lớn là dưới 35 tuổi.

Loại thống kê này ngược so với thống kê percentiles, trong khi percentiles tính toán giá trị cho chúng ta, thì percentile_ranks cho chúng ta biết rank của một giá trị đối với một trường trong dữ liệu.

Ngoài ra với hai loại thống kê percentile_ranks, percentiles có thể có thêm option custom dữ liệu trả về đó là `keyed` (true/false), giá trị này mặc định là `true`

Ví dụ:

*Request*

```python
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "age_per_rank": {
      "percentile_ranks": {
        "field": "age",
        "values": [
          25,
          30,
          35,
          40
        ], 
        "keyed": false
      }
    }
  }
}
```

*Response*

```python
{
  ...,
  "aggregations": {
    "age_per_rank": {
      "values": [
        {
          "key": 25,
          "value": 25.97402597402597
        },
        {
          "key": 30,
          "value": 49.35064935064935
        },
        {
          "key": 35,
          "value": 75.72427572427573
        },
        {
          "key": 40,
          "value": 100
        }
      ]
    }
  }
}
```

Giá trị trả về sẽ theo dạng bucket chứ không phải dạng key/value như ở request trước

## Top hits

top_hits là câu thống kê trả về những giá trị thích hợp nhất trong các giá trị đang được thống kê. Câu thống kê này thường được sử dụng làm sub-aggregator chứ không có tác dụng nhiều khi đứng một mình, vì nó đơn giản chỉ là trả về chính các bản ghi đang được thống kê.

Ta có thể dùng một ví dụ vô nghĩa sau để hiểu được hoạt động của top_hits

Request:

```python
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "top_hits_age": {
      "top_hits": {
        "size": 2
        , "_source": {
          "include": "firstname"
        }
      }

    }
  }
}
```

Response:

```python
{
  ...,
  "aggregations": {
    "top_hits_age": {
      "hits": {
        "total": 1001,
        "max_score": 1,
        "hits": [
          {
            "_index": "bank",
            "_type": "account",
            "_id": "25",
            "_score": 1,
            "_source": {
              "firstname": "Virginia"
            }
          },
          {
            "_index": "bank",
            "_type": "account",
            "_id": "44",
            "_score": 1,
            "_source": {
              "firstname": "Aurelia"
            }
          }
        ]
      }
    }
  }
}
```

*`top_hits` đơn giản chỉ trả về chính các bản ghi*

Ứng dụng chủ yếu của `top_hits` là sử dụng cùng với các câu thống kê dạng bucket. Thường thì các thống kê dạng bucket sẽ chỉ trả về số lượng của các bucket. Ví dụ, câu thống kê số lượng tài khoản dựa trên từng quận là một dạng bucket aggregation với mỗi bucket là một quận (các giá trị unique từ trường `state` trong index), lúc này bucket query chỉ có tác dụng đếm số lượng tài khoản trên từng quận, nhưng ta muốn biết cụ thể thông tin tài khoản trong từng bucket đó, ta lại phải filter từ giá trị trả về phần `hits`:

```python
"hits": {
    "total": 1001,
    "max_score": 0,
    "hits": [...]
},
"aggregations": {...}
```

`top_hits` được sinh ra để giải quyết vấn đề này, với việc sử dụng `top_hits` làm sub-aggregation, ta có thể lấy được các document thuộc về từng bucket, tức là như trong ví dụ là thông tin từng tài khoản thuộc từng quận mà không cần phải đi từ phần `hits` rồi filter theo từng tên từng quận để tìm thông tin.

`top_hits` có các options `from`, `size`, `sort`, `_source` như một câu query thông thường.

## Ví dụ về ứng dụng của metric aggregations

Trong những database lớn, việc thống kê trên toàn bộ thường mang lại ít ý nghĩa hơn là việc thống kê metric trên từng cụm nhỏ của dữ liệu. Vì vậy, metric aggregations, thường được sử dụng để làm sub-aggregation của bucket aggregations. Ví dụ, với dữ liệu bank account, ta có thể thống kê số lượng tài khoản của từng quận, sau đó trong mỗi quận ta tính tài khoản có số dư lớn nhất và trả về chính tài khoản đó. Ta có truy vấn như sau:

Request 

```python
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "state-aggs": {
      "terms": {
        "field": "state.keyword",
        "size": 100
      },
      "aggs": {
        "max-balance": {
          "max": {
            "field": "balance"
          }
        },
        "top-acc": {
          "top_hits": {
            "size": 1,
            "sort": [
              {
                "balance": {
                  "order": "desc"
                }
              }
            ],
            "_source": {
              "include": ["firstname", "lastname", "account_number"]
            }
          }
        }
      }
    }
  }
}
```

Response:

```python
{
  ...,
  "aggregations": {
    "state-aggs": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "TX",
          "doc_count": 30,
          "top-acc": {
            "hits": {
              "total": 30,
              "max_score": null,
              "hits": [
                {
                  "_index": "bank",
                  "_type": "account",
                  "_id": "842",
                  "_score": null,
                  "_source": {
                    "account_number": 842,
                    "firstname": "Meagan",
                    "lastname": "Buckner"
                  },
                  "sort": [
                    49587
                  ]
                }
              ]
            }
          },
          "max-balance": {
            "value": 49587
          }
        },
        {
          "key": "MD",
          "doc_count": 28,
          "top-acc": {
            "hits": {
              "total": 28,
              "max_score": null,
              "hits": [
                {
                  "_index": "bank",
                  "_type": "account",
                  "_id": "954",
                  "_score": null,
                  "_source": {
                    "account_number": 954,
                    "firstname": "Jenna",
                    "lastname": "Martin"
                  },
                  "sort": [
                    49404
                  ]
                }
              ]
            }
          },
          "max-balance": {
            "value": 49404
          }
        },
        {
          "key": "ID",
          "doc_count": 27,
          "top-acc": {
            "hits": {
              "total": 27,
              "max_score": null,
              "hits": [
                {
                  "_index": "bank",
                  "_type": "account",
                  "_id": "876",
                  "_score": null,
                  "_source": {
                    "account_number": 876,
                    "firstname": "Brady",
                    "lastname": "Glover"
                  },
                  "sort": [
                    48568
                  ]
                }
              ]
            }
          },
          "max-balance": {
            "value": 48568
          }
        },
        ...
    ]
}
```

Như vậy, ta có thể dễ dàng biết được số dư của tài khoản nào có số dư cao nhất của từng vùng chỉ với một câu thống kê sử dụng metric-aggregation làm sub-aggregator. Ở phần tiếp theo chúng ta sẽ đi sâu tìm hiểu hơn về bucket aggregations mà chúng ta vừa mới sử dụng ở bên trên.

-----

### Tham khảo
- https://www.elastic.co/guide/en/kibana/current/console-kibana.html
- https://www.elastic.co/guide/en/elasticsearch/reference/6.2/search-aggregations.html
- https://www.elastic.co/guide/en/elasticsearch/guide/current/aggregations.html