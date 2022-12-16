**I. Introduction**

  Có lẽ khi làm việc với elasticsearch chúng ta đều đã ít nhiều từng nghe về `analyzer`, đây có thể được hiểu như là một công cụ của elasticsearch trong việc bẻ từ và cấu trúc dữ liệu giúp cho việc tìm kiếm text, khi chúng ta làm việc với text dưới các ngôn ngữ các khau. Elasticsearch có hỗ trợ sẵn khá nhiều analyzer cho các ngôn ngữ khác nhau, tuy nhiên với tiếng việt thì chúng ta cần phải cài thêm plugin mới sử dụng được (vi_analyzer của anh `duy đỗ`). Hôm nay chúng ta sẽ tìm hiểu xem `analyzer` gồm những gì và cách sử dụng ra sao.

**II. Analyzers**

  Như bạn có thể biết `Elasticsearch` cung cấp cách để tùy chỉnh cách mọi thứ được lập chỉ mục với các trình phân tích của ` index analysis module`. `Analyzers` là cách mà quy trình Lucene và lập chỉ mục dữ liệu. Mỗi analyzer bao gồm: 
- 0 or more CharFilters
- 1 Tokenizer
- 0 or more TokenFilters
`Tokenizers` được sử dụng để tách một chuỗi thành `stream of tokens`. Ví dụ: Một `basic Tokenizer` sẽ thực hiện các thao tác sau:

```
"Our goal at Tryolabs is to help Startups"
-> Tokenizer ->
["Our", "goal", "at", Tryolabs", "is", "to", "help", "Startups"]
```

`Tokenizers` mặt khác chấp nhận `basic Tokenizer` và có thể sửa đổi, xóa chúng hoặc thêm `new tokens`. Ví dụ để đặt tên sao cho có nhiều ý nghĩa nhất có thể, một TokenFilter có thể áp dụng `stemming`, `remove stop words`, `add synonyms`.

Chúng ta sẽ không tập trung vào `CharFilters` vì chúng được sử dụng để xử lý trước các ký tự trước khi được gửi tới `Tokenizers`.

`Elasticsearch` cung cấp rất nhiều `Tokenizers`, `TokenFilters` và chúng ta có thể tạo các tùy chỉnh và cài đặt chúng dưới dạng plugin.

**III. How to use Analyzers**

  Để sử dụng các kết hợp khác nhau của `Tokenizers` và `TokenFilters`, chúng ta cần tạo một `Analyzer` trong `index settings` và sau đó sử dụng nó trong `mapping`.
  
  Ví dụ, giả sử chúng ta muốn một `Analyzer` để `tokenize` dưới dạng tiêu chuẩn, và áp dụng bộ lọc `lowercase filter` và `stemming`.
  
  ```
  {
  "settings": {
    "analysis": {
      "filter": {
        "custom_english_stemmer": {
          "type": "stemmer",
          "name": "english"
        }
      },
      "analyzer": {
        "custom_lowercase_stemmed": {
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "custom_english_stemmer"
          ]
        }
      }
    }
  },
  "mappings": {
    "test": {
      "properties": {
        "text": {
          "type": "string",
          "analyzer": "custom_lowercase_stemmed"
        }
      }
    }
  }
}
  ```
  
  Ở trên, chúng ta có hai `settings` và `mapping` chính. `Settings` là nơi tất cả các cài đặt mà `index` cần và `mappings` là nơi bạn sử dụng các cài đặt cho `index`.
  
  Trước tiên hãy tập trung vào `settings`. Có rất nhiều `index settings` có thể có, `replica settings`, `read settings`, `cache settings` và các cài đặt `analysis settings` mà chúng ta có thể quan tâm.
  Trong `analysis json`, chúng ta có cả `analyzers` và `filter` được xác định. Khi sử dụng `custom analyzer`, một số bộ lọc cần phải được define trước thì mới có thể sử dụng được.
  
  ```
  {
  "custom_english_stemmer": {
      "type": "stemmer",
      "name": "english"
    }
  }
  ```
  ```
  {
  "analyzer": {
    "custom_lowercase_stemmed": {
      "tokenizer": "standard",
      "filter": [
        "lowercase",
        "custom_english_stemmer"
      ]
    }
  }
}
  ```
  
  Ở đây chúng ta đặt tên cho `analyzer` là `custom_lowercase_stemmed` nhưng bạn có thể đặt bất kỳ tên nào bạn muốn. Trong ví dụ này, chúng ta đang sử dụng trình `tokenizer` "standard" và xác định danh sách các bộ lọc được sử dụng.
  
  - `lowercase` là bộ lọc được cung cấp bởi `Elasticsearch` mà không cần cấu hình thêm.
  - `custom_english_stemmer` là cái mà chúng ta đã custom.
 
 Thứ tự của danh sách là quan trọng vì nó sẽ là thứ tự các `tokens` được xử lý trong `index`.
 
 Cuối cùng, chúng ta có thể sử dụng `analyzer ` mới được tạo ra này trong `mappings`.
 
 ```
 {
  "mappings": {
    "test": {
      "properties": {
        "text": {
          "type": "string",
          "analyzer": "custom_lowercase_stemmed"
        }
      }
    }
  }
}
 ```
 
**IV. Testing the analyzer**

  Chúng ta có ví dụ như sau:
  
  ```
  curl http://192.168.59.103:9200/tryoindex/_analyze?analyzer=custom_lowercase_stemmed \
-d 'Tryolabs running monkeys KANGAROOS and jumping elephants'
{
  "tokens": [
    {
      "token": "tryolab",
      "start_offset": 0,
      "end_offset": 9,
      "type": "",
      "position": 1
    },
    {
      "token": "run",
      "start_offset": 10,
      "end_offset": 17,
      "type": "",
      "position": 2
    },
    {
      "token": "monkei",
      "start_offset": 18,
      "end_offset": 25,
      "type": "",
      "position": 3
    },
    {
      "token": "kangaroo",
      "start_offset": 26,
      "end_offset": 35,
      "type": "",
      "position": 4
    },
    {
      "token": "and",
      "start_offset": 36,
      "end_offset": 39,
      "type": "",
      "position": 5
    },
    {
      "token": "jump",
      "start_offset": 40,
      "end_offset": 47,
      "type": "",
      "position": 6
    },
    {
      "token": "eleph",
      "start_offset": 48,
      "end_offset": 57,
      "type": "",
      "position": 7
    }
  ]
}
  ```
 

| Original | Lowercase & stemming |
| -------- | -------- |
| Tryolabs     | tryolab     |
| running     | run     |
| monkeys     | monkei     |
| KANGAROOS     | kangaroo     |
| and     | and     |
| jumping     | jump     |
| elephants     | eleph     |

**V. Querying using the analyzer**

  Ví dụ, chúng ta có index:
  
  ```
  {
    "text": "JOHN LIKES RUNNING IN THE RAIN"
  }
  ```
  
  Truy vấn như sau:
  ```
  curl -XGET ‘http://127.0.0.1:9200/tryoindex/test/_search’ -d '
  {
    "query": {
      "match": {
        "text": "run"
      }
    }
  }
  ```
  Kết quả chúng ta nhận được:
  ```
  {
  "took": 25,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 0.5,
    "hits": [
      {
        "_index": "tryoindex",
        "_type": "test",
        "_id": "AUtgVQpqJh3uf--po6Ij",
        "_score": 0.5,
        "_source": {
          "text": "john likes running"
        }
      }
    ]
  }
}
  ```

**VI. Conclusion**
  
  Trên đây là một vài khái niệm và cách sử dụng analyzers, hi vọng sẽ có ích với mọi người.

**VII. References**

https://tryolabs.com/blog/2015/02/25/elasticsearch-analyzers-or-how-i-learned-to-stop-worrying-and-love-custom-filters/