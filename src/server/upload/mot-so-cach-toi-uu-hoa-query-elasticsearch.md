# Một số cách tối ưu hóa query Elasticsearch
## Tìm kiếm với ít field nhất có thể
Càng nhiều trường truy vấn trong **query_string** hoặc **multi_match** sẽ càng làm cho tốc độ query chậm hơn. Một kỹ thuật phổ biến để cải thiện tốc độ tìm kiếm trên nhiều trường là sao chép giá trị của chúng vào một trường duy nhất tại thời điểm index và sau đó sử dụng trường này để tìm kiếm. Điều này có thể được tự động hóa với **copy-to** directive. Dưới đây là một ví dụ:
```
PUT movies
{
  "mappings": {
    "properties": {
      "name_and_plot": {
        "type": "text"
      },
      "name": {
        "type": "text",
        "copy_to": "name_and_plot"
      },
      "plot": {
        "type": "text",
        "copy_to": "name_and_plot"
      }
    }
  }
}
```

## Pre-index data
Bạn nên tận dụng các patterns trong truy vấn của mình để tối ưu hóa cách dữ liệu được index. Ví dụ: nếu tất cả các tài liệu của bạn có trường **price** và hầu hết các truy vấn đều chạy các aggregations **range** trong một danh sách cố định (Ví dụ như 0 - 10, 10 - 100, 100 -1000, ...), bạn có thể thực hiện aggregations này nhanh hơn bằng cách đánh index trước các **range** và sử dụng **terms** aggregations để query:
```
PUT index/_doc/1
{
  "designation": "spoon",
  "price": 13
}
```

Ta sẽ tìm kiếm như này:
```
GET index/_search
{
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "to": 10 },
          { "from": 10, "to": 100 },
          { "from": 100 }
        ]
      }
    }
  }
}
```

Hoặc ta có thể thêm một **keyword** field để lưu mảng những range cần index:
```
PUT index
{
  "mappings": {
    "properties": {
      "price_range": {
        "type": "keyword"
      }
    }
  }
}

PUT index/_doc/1
{
  "designation": "spoon",
  "price": 13,
  "price_range": "10-100"
}
```

Và sau đó ta sẽ search trên field **price_range** thay vì **price**:
```
GET index/_search
{
  "aggs": {
    "price_ranges": {
      "terms": {
        "field": "price_range"
      }
    }
  }
}
```

## Ưu tiên sử dụng type keyword khi mapping
Không phải tất cả dữ liệu số đều phải được mapping dưới dạng numeric. Elaticsearch tối ưu hóa các trường số, chẳng hạn như **integer** hoặc **long** cho các truy vấn phạm vi (range query). Tuy nhiên, **keyword** type tốt hơn cho **term** query và một số **term-lever** query khác.

Mã định danh, chẳng hạn như một mã số hoặc ID sản phẩm, hiếm khi được sử dụng trong các truy vấn phạm vi, chúng thường được truy xuất bằng các term-level queries.

Hãy xem xét mapping những trường numeric với type keyword nếu như:
* Bạn không định sử dụng trường này để truy vấn phạm vi
* Bạn cần lấy dữ liệu nhanh nhất có thể. **term** query trên keyword field nhanh hơn nhiều so với **term** query trên numeric field

Nếu như bạn không chắc rằng sẽ sử dụng trường đó như nào, bạn có thể dùng **multi-field** để mapping với cả 2 kiểu là keyword và numeric:
```
PUT my_index
{
  "mappings": {
    "properties": {
      "tier": {
        "type": "integer",
        "fields": {
          "keyword": { 
            "type":  "keyword"
          }
        }
      }
    }
  }
}
```

## Tránh việc sử dụng script
Nếu có thể, tránh sử dụng các script các tìm kiếm. Bởi vì các script không sử dụng index dẫn đến tốc độ tìm kiếm chậm hơn.

Nếu bạn thường sử dụng script để chuyển đổi dữ liệu đã được, bạn có thể tăng tốc tìm kiếm bằng cách tranform dữ liệu trước khi index. Tuy nhiên, điều này có nghĩa là bạn sẽ tốn nhiều thời gian để index hơn.

Một index, my_test_scores, chứa hai long field:
* math_score
* verbal_score

Khi chạy tìm kiếm, người dùng thường sử dụng script để sắp xếp kết quả theo tổng của hai giá trị trường này:
```
GET /my_test_scores/_search
{
  "query": {
    "term": {
      "grad_year": "2020"
    }
  },
  "sort": [
    {
      "_script": {
        "type": "number",
        "script": {
          "source": "doc['math_score'].value + doc['verbal_score'].value"
        },
        "order": "desc"
      }
    }
  ]
}
```

Để tăng tốc tìm kiếm, bạn có thể thực hiện phép tính này trong khi index và thêm một trường khác dùng để sắp xếp.

Đầu tiên, thêm một trường mới, Total_score vào index. Trường Total_score sẽ chứa tổng các giá trị trường math_score và verbal_score.
```
PUT /my_test_scores/_mapping
{
  "properties": {
    "total_score": {
      "type": "long"
    }
  }
}
```

Tiếp theo, sử dụng một pipeline có chứa script để tính tổng math_score và verbal_score và và index giá trị vào trường Total_score.
```
PUT _ingest/pipeline/my_test_scores_pipeline
{
  "description": "Calculates the total test score",
  "processors": [
    {
      "script": {
        "source": "ctx.total_score = (ctx.math_score + ctx.verbal_score)"
      }
    }
  ]
}
```

Để cập nhật dữ liệu hiện có, sử dụng pipeline này reindex lại bất kỳ tài liệu nào từ my_test_scores sang một chỉ index, ví dụ my_test_scores_2.
```
POST /_reindex
{
  "source": {
    "index": "my_test_scores"
  },
  "dest": {
    "index": "my_test_scores_2",
    "pipeline": "my_test_scores_pipeline"
  }
}
```

Tiếp tục sử dụng pipeline để index bất kỳ tài liệu mới nào tới my_test_scores_2.
```
POST /my_test_scores_2/_doc/?pipeline=my_test_scores_pipeline
{
  "student": "kimchy",
  "grad_year": "2020",
  "math_score": 800,
  "verbal_score": 800
}
```

Cuối cùng người dùng có thể sắp xếp bằng trường Total_score thay vì sử dụng script:
```
GET /my_test_scores_2/_search
{
  "query": {
    "term": {
      "grad_year": "2020"
    }
  },
  "sort": [
    {
      "total_score": {
        "order": "desc"
      }
    }
  ]
}
```

## Tài liệu tham khảo
https://www.elastic.co/guide/en/elasticsearch/reference/master/tune-for-search-speed.htm