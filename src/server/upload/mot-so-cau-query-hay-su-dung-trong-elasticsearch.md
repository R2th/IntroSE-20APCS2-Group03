Xin chào mọi người, hôm trước mình có giới thiệu đến các bạn 1 package **[Scout Elasticsearch Driver In Larave](https://viblo.asia/p/scout-elasticsearch-driver-in-laravel-Qbq5QN4LKD8)** nên hôm nay mình xin giới thiệu đến mọi người một số câu query hay dùng khi mình thực hiện tính năng search trong các dự án nha.
# Một số câu query
Trước khi bắt đầu các bạn nhớ cài elasticsearch, import data và đánh index cho nó nha :blush::blush::blush:

Giả sử mình có 1 VD minh họa sau nha. Trong Model Customer mình có khai báo mapping như sau:
```
/**
     * Mapping array
     *
     * @var array
     */
    protected $mapping = [
        'properties' => [
            'name' => [
                'type' => 'text',
            ],
            'depscription' => [
                'type' => 'text',
            ],
        ],
    ];
```

## 1. Match query 
Match query là một query cơ bản và nổi bật của elasticsearch, nó trả về kết quả nếu bất kỳ documment nào chứa query truyền lên.
VD: Mình có query sau:
```
GET customers/_search
{
  "query": {
    "match": {
      "name": "Ngoc Nguyen"
    }
  }
}
```
=> Kết quả tìm thấy sẽ chứa tất cả các documment có chứa từ `Ngoc` hoặc `Nguyễn` đều được trả về.
## 2. Match-phrase query
Cũng giống như match query nhưng match_phrase query là search chính xác. Nó chỉ trả về các documment nào chứa chính xác giống query truyền lên.
VD:
```
GET customers/_search
{
  "query": {
    "match_phrase": {
      "name": "Nguyen Thi Bich Ngoc"
    }
  }
}
```
=> Kết quả sẽ chỉ trả về những documment nào có text `Nguyen Thi Bich Ngoc` thôi ạ. Đúng theo thứ tự và text truyền lên.
## 3. Multi-match query
Về bản chất multi-match query nó giống như search theo match query và match-phrase query, nhưng nó search đc trên nhiều field khác nhau. 
VD:
```
GET customers/_search
{
  "query": {
    "multi_match": {
      "query": "Bich Ngoc",
      "fields": ["name", "depscription"],
      "type": "phrase"
    }
  }
}
```

Trong đó:
* query: là query bạn truyền lên
* fields: là các field mà bạn muốn search trong đó. Ở đây mình muốn tìm kiếm các documment có text `Bich Ngoc` trong field name và depscription Customer
* type: là kiểu mà bạn muốn search. Mặc định khi không truyền lên trường này thì sẽ hiểu đang search theo kiểu match. Có rất nhiều kiểu type chúng ta có thể sử dụng, mn xem thêm ở [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#multi-match-types) nha.

Trong ví dụ trên mình dùng search chính xác (match-phrase query). Nó sẽ tìm kiếm xem trong  2 field name và depscription xem có documment nào có text `Bich Ngoc` sẽ trả ra kêt quả. À ở đây search theo kiểu OR, 1 trogn các field có query text đều trả ra kết quả ạ.
## 4. Term query
Loại truy vấn này thường được dùng cho việc search các field có kiểu dữ liệu dạng số, ngày tháng. Nếu muốn search text chúng ta nên sử dụng match query.

> WARNING:
> 
> Avoid using the term query for text fields.
> 
> By default, Elasticsearch changes the values of text fields as part of analysis. This can make finding exact matches for text field values difficult.
> 
>  To search text field values, use the match query instead.

Term query là kiểu search chính xác. VD dưới đây sẽ query lấy ra customer có id =1.
```
GET customers/_search
{
  "query": {
    "term": {
      "customer_id": 1
    }
  }
}
```
## 5. Terms query
Dùng để search với nhiều query một lúc. Kết quả truy vẫn lấy theo kiểu OR
VD:
```
GET customers/_search
{
  "query": {
    "terms": {
      "customer_id": [1,2]
    }
  }
}
```
=> Kết quả sẽ trả về customer có id =1 hoặc id =2.
## 6. Range query
Là loại query trả về các documment trong 1 khoảng diều kiện query. Range query thường đươc sử dụng search khoảng time, khoảng tuổi,.....
VD:
```
GET customers/_search
{
  "query": {
    "range": {
      "birthday": {
        "gte": "1997/01/01",
        "lte": "1997/12/31"
      }
    }
  }
}
```
Một số thông số:
* gt: Tùy chọn lớn hơn
* gte: Tùy chọn lớn hớn hoặc bằng
* lt: Tùy chọn nhỏ hơn
* lte: Tùy chọn nhỏ hơn hoặc bằng
Như trong ví dụ trên, kết quả lấy ra các record có ngày sinh nhật từ 1997/01/01 đến ngày 1997/12/31.
## 7. Bool query
Là loại query cho phép kết hợp nhiều query khác nhau cùng một lúc.
VD: 
```
GET customers/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "name": "Nguyen Ngoc"
          },
          "term": {
            "customer_id": 1
          }
        }
      ]
    }
  }
}
```

Mình hay sử dụng must và should:
* must: giống như điều kiện AND. Tức là kết quả được lấy ra phải thỏa mãn tất cả các query truyền lên.
* should: search theo điều kiện OR. Chỉ cần thỏa mãn một trong các điều kiện query truyền lên là đc.
# Kết luận
Trên đây là một sổ loại query phỏ biến mình hay sử dụng trong elasticsearch. Ngoài ra mn có thể xem thêm các query khác ở [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) nha