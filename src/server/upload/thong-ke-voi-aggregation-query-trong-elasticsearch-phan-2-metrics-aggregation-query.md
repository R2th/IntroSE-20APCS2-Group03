## 1. Metrics aggregations

Những thống kê thuộc dạng này tính toán dựa vào giá trị lấy được từ những documents trả về từ phần query trong phần body của request search, có 2 loại giá trị đầu vào đó là:

- Giá trị từ những trường (field) trong document
- Giá trị từ những trường được sinh ra bằng việc viết script trong câu query

Các câu thống kê này thường có kết quả là các giá trị số thực. Trong metrics aggregation có hai loại:

- Câu thống kê trả về một giá trị: `single-value numeric metrics aggregation`
- Câu thống kê trả về nhiều giá trị: `multi-value numeric metrics aggregation`

### 1.1. Câu thống kê `sum`, `avg`, `min`, `max`

- Đây là những câu thống kê dạng trả về một giá trị, nhìn qua tên gọi của chúng cũng có thể đoán ra mục đích của chúng dùng để làm gì

    - `avg`: tính toán giá trị trung bình của các giá trị số được lấy từ các trường trong những documents
    - `sum`: tính toán tổng của các giá trị số
    - `min`: lấy giá trị nhỏ nhất trong các giá trị số
    - `max`: lấy giá trị lớn nhất trong các giá trị số

*Note: các trường từ document có thể là các property của 1 document hoặc là những trường được sinh ra từ script (chúng ta sẽ ví dụ chúng ở phần tiếp theo)*

Đây là một trong những phần dễ nhất của câu thống kê, vì vậy chúng ta sẽ có thể vừa học chúng vừa ôn tập về cấu trúc của một câu thống kê trong elasticsearch. Sử dụng dữ liệu mà chúng ta đã index vào Elastisearch và dev tool của Kibana để viết query:

- Nhìn qua mapping của dữ liệu chúng ta đã index bằng request (query) sau (query lấy mapping của trường `balance`, document type `account`, index `bank`):

```
GET bank/_mapping/account/field/balance
```

nhận được kết quả với field `balance` là một trường số, vậy ta hoàn toàn có thể sử dụng metric aggregate query cho trường này:

```
{
  "bank": {
    "mappings": {
      "account": {
        "balance": {
          "full_name": "balance",
          "mapping": {
            "balance": {
              "type": "long"
            }
          }
        }
      }
    }
  }
}
```

- Sử dụng request sau để thống kê giá trị trung bình của trường này:

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "avg_balance": {
      "avg": {
        "field": "balance"
      }
    }
  }
}
```

Trong đó:

`size: 0` là để giới hạn số lượng document trả về là `0` để chúng ta có thể tập trung vào phần thống kê trả về (thống kê trên toàn bộ document trong document type `account`)

`aggs` để bắt đầu định nghĩa phần thống kê

`avg_balance` là tên gọi của câu thống kê, chúng ta có thể đặt bằng bất cứ tên gọi nào

`avg` định nghĩa chúng ta sẽ sử dụng câu thống kê trung bình trên trường `balance`

nhận được kết quả sau:

```
{
  "took": 23,
  "timed_out": false,
  "_shards": {...},
  "hits": {...},
  "aggregations": {
    "avg_balance": {
      "value": 25714.837
    }
  }
}
```

Trong đó, ngoài phần thông tin trả về thông thường cùng với các bản ghi trả về bởi phần `query` (bằng `[]` vì chúng ta đã khai báo `size: 0`) có phần `aggregations` trả về kết quả của các câu thống kê chúng ta đã khai báo trong request query (`avg_balance` là thống kê chúng ta đã đặt tên, giá trị trả về trong trường `value` vì chúng ta đang sử dụng câu thống kê single-value numeric)

Chúng ta có thể sử dụng nhiều câu thống kê một lúc bằng cách định nghĩa

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "avg_balance": {
      "avg": {
        "field": "balance"
      }
    },
    "min_balance": {
      "min": {
        "field": "balance"
      }
    },
    "max_balance": {
      "max": {
        "field": "balance"
      }
    },
    "sum_balance": {
      "sum": {
        "field": "balance"
      }
    }
  }
}
```

Kết quả trả về tất cả các thống kê như sau:

```
"took": 23,
"timed_out": false,
"_shards": {...},
"hits": {...},
"aggregations": {
    "sum_balance": {
      "value": 25714837
    },
    "min_balance": {
      "value": 1011
    },
    "max_balance": {
      "value": 49989
    },
    "avg_balance": {
      "value": 25714.837
    }
  }
}
```

### 1.2. Một vài option có thể sử dụng với aggregation query

#### 1.2.1. Script

Như đã trình bày ở trên, một giá trị đem vào thống kê không chỉ là giá trị lấy từ một field trong document, nó cũng có thể là những giá trị sinh ra cho mỗi document bằng script.
Giả sử giá trị `balance` của chúng ta có đơn vị `$`, chúng ta muốn tính thống kê mà kết quả là tiền `VNĐ`, ta có thể viết câu thống kê sau:

```

GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "avg_vnd_balance": {
      "avg": {
        "script": {
          "source": "doc.balance.value * params.rate"
          , "params": {
            "rate": 23.05
          }
        }
      }
    }
  }
}
```

Hãy tự truy vấn và nhìn vào kết quả. Trong câu thống kê trên, ta sử dụng `script` trong thống kê trung bình: đối với mỗi document, ta có thể truy cập các trường của chúng thông qua biến `doc`, `doc.balance.value` trả về giá trị của field `balance`

`params` là nơi khai báo các biến truyền vào, ở đây ta khai báo tỉ giá quy đổi, và script này sẽ sinh ra cho ta một trường mới dựa trên trường `balance` và tính trung bình dựa trên giá trị này.

#### 1.2.2. Missing value:

Đối với những document khi index vào thiếu trường chúng ta định thống kê trên đó, giả sử chúng ta index thêm một document mà ko có field `balance`

```
POST bank/account
{
  "account_number": 25,
  "firstname": "Virginia",
  "lastname": "Ayala",
  "age": 39,
  "gender": "F",
  "address": "171 Putnam Avenue",
  "employer": "Filodyne",
  "email": "virginiaayala@filodyne.com",
  "city": "Nicholson",
  "state": "PA"
}
```

Lúc này, khi chạy thống kê trung bình trên trường `balance`, document trên mặc định nó bằng `0`, ta có thể thay đổi trường mặc định này bằng cách thêm options `missing` vào câu thống kê (giả sử coi tài khoản mới mở chưa được index `balance` có tài khoản mặc định là `1000`):

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "sum_balance": {
      "sum": {
        "field": "balance",
        "missing": 1000
      }
    }
  }
}
```

Chúng ta có thể so sánh kết quả với khi không thêm option `missing` để thấy tác dụng của option này.

### 1.3. `cardinality` aggregation

Đây cũng là một câu thống kê dạng single-value, câu này trả về kết quả gần đúng các giá trị khác nhau của một trường numeric hoặc keyword

Sử dụng truy vấn sau để xác định số lượng state có người lập tài khoản ngân hàng

```
GET bank/account/_search
{
  "size": 0,
  "aggs": {
    "number_of_state": {
      "cardinality": {
        "field": "state.keyword"
      }
    }
  }
}
```

Kết quả trả về:

```
{
  ...,
  "_shards": {...},
  "hits": {...},
  "aggregations": {
    "avg_balance": {
      "value": 51
    }
  }
}
```

Ta có thể sử dụng 2 option là `missing` và `script` như sử dụng với các thống kê bên trên.

Đây là dạng đếm gần đúng nên hãy hạn chế sử dụng loại thống kê này với những trường có số lượng giá trị khác nhau lớn, đây cũng là một dạng thống kê rất tốn tài nguyên (Có thể tham khảo chi tiết hơn tại [đây](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/search-aggregations-metrics-cardinality-aggregation.html#_counts_are_approximate))

### Tổng kết

Vậy là chúng ta đã luyện tập được thêm về cách viết câu thống kê với Elasticsearch, các thống kê metric single-value, các options với mọi câu thống kê. Ở phần tiếp theo chúng ta sẽ đi tiếp phần metric multi-value aggregations, sau đó cùng tìm hiểu một loại metric aggregation không thuộc vào hai kiểu trên đó là `top_hits`.

-----
### Tham khảo
- https://www.elastic.co/guide/en/kibana/current/console-kibana.html
- https://www.elastic.co/guide/en/elasticsearch/reference/6.2/search-aggregations.html
- https://www.elastic.co/guide/en/elasticsearch/guide/current/aggregations.html