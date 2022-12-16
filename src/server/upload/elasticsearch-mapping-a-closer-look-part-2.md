Bài viết này sẽ tiếp tục đi sâu vào *mapping* trong Elasticsearch.
## 1. Put Mapping
*PUT mapping API* cho phép add thêm fields vào các *existing index* hoặc thay đổi setting của một **search only** field:
```
PUT my_index
{
  "mappings": {
    "doc": { 
      "properties": { 
        "title":    { "type": "text"  }, 
      }
    }
  }
}

PUT my_index_2
{
  "mappings": {
    "doc": { 
      "properties": { 
        "contact":     { "type": "text"  }, 
      }
    }
  }
}

PUT my_index/_mapping/_doc 
{
  "properties": {
    "email": {
      "type": "keyword"
    }
  }
}

# Update both mappings
PUT /my_index,my_index_2/_mapping/_doc 
{
  "properties": {
    "owner_name": {
      "type": "text"
    }
  }
}

```

* **Note**: Những fields đã được index sẽ không thể thay đổi được mapping. *PUT mapping API* chỉ support việc thêm các fields mới vào index.
## 2. Fields (Multi-fields)
1 fields trong Elasticsearch có thể được index theo nhiều cách nhằm phục vụ nhiều mục đích khác nhau:
1 string field có thể được mapping thành 1 text-field nhằm phục vụ full-text search, đồng thời mapping  như 1 keyword field để phục vụ cho sorting & aggregations

Ví dụ:
```
PUT my_index
{
  "mappings": {
    "_doc": {
      "properties": {
        "city": {
          "type": "text",
          "fields": {
            "raw": { 
              "type":  "keyword"
            }
          }
        }
      }
    }
  }
}

PUT my_index/_doc/1
{
  "city": "New York"
}

PUT my_index/_doc/2
{
  "city": "York"
}

GET my_index/_search
{
  "query": {
    "match": {
      "city": "york" 
    }
  },
  "sort": {
    "city.raw": "asc" 
  },
  "aggs": {
    "Cities": {
      "terms": {
        "field": "city.raw" 
      }
    }
  }
}
```

* **Note**: 
1. *multi-fields* sẽ không làm ảnh hưởng hay thay đổi tới *_source* fields
## 3. Preventing Mapping Explosion
Trong thực tế, khi ta define quá nhiều fields trong 1 index có thể dẫn tới **mapping explosion**, gây ra 1 số lỗi như *out of memory*, và các trường hợp này rất khó để recoverd. Đặc biệt với Dynamic Mapping (sẽ được giải thích ở các mục sau), mỗi khi ta insert 1 *document* vào *index*, mà mỗi *document* lại bao gồm 1 field mới. Và các fields mới này sẽ được auto thêm vào *mapping*. Vì vậy trong các trường hợp số lượng data lớn, chúng ta nên thêm 1 vài các setting sau để hạn chế tối đa các khả năng xảy ra *Mapping Explosion*:

- Giới hạn số lượng các field/prop: `index.mapping.total_fields.limit`. Default: 1000.
- Giới hạn depth của 1 field/prop(inner object): `index.mapping.depth.limit`. Default: 20.

Ví dụ: 1 field được defined ở root level => depth = 1. Field con bên trong nó: depth = 2...

- Giới hạn nested-field: ```index.mapping.nested_fields.limit```. Default: 50.

#### Nested-field limit & Depth limit ???
2 khái niệm này khá giống nhau. Nhưng hãy lưu ý 1 điều: *depth limit* được tính theo số lượng *inner object*. Mình sẽ lấy 1 vài ví dụ để các bạn có thể hiểu được sự khác nhau giữa 2 khái niệm này:

Nested-field limit giới hạn cho các *nested-object*, còn depth limit giới hạn các *inner object*. Vậy 2 object này khác nhau ở điểm j?

Các *inner object* thực tế không phải là các *component* độc lập với nhau, mà chúng sẽ được *flatten* lại với nhau(*[Elastic Doc](https://www.elastic.co/guide/en/elasticsearch/reference/current/object.html#object)*).
Còn nested-object sẽ được giữ nguyên như lúc bạn post lên.

vd:
1. Json inner object:
Giả sử ta có data:
```
{
  "name" : "Zach",
  "car" : [
    {
      "make" : "Saturn",
      "model" : "SL"
    },
    {
      "make" : "Subaru",
      "model" : "Imprezza"
    }
  ]
}
{
  "name" : "Bob",
  "car" : [
    {
      "make" : "Saturn",
      "model" : "Imprezza"
    }
  ]
}
```

Khi insert vào Elasticsearch, chúng sẽ được flatten lại: 

```
{
  "name" : "Zach",
  "car.make" : ["Saturn", "Subaru"]
  "car.model" : ["SL", "Imprezza"]
}
```

Chúng ta có thể thấy, các object được merged lại với nhau.

2. Nested Object:

Với *nested object*, chúng sẽ được giữ nguyên, ko bị flat:
```
{
  "name" : "Zach",
  "car" : [
    {
      "make" : "Saturn",
      "model" : "SL"
    },
    {
      "make" : "Subaru",
      "model" : "Imprezza"
    }
  ]
}
```

Để hiểu rõ hơn, các bạn có thể xem tại [Stackoverflow](https://stackoverflow.com/a/51455007/5938111) hoặc [*elastic-blog*](https://www.elastic.co/blog/managing-relations-inside-elasticsearch). Link này tuy đã outdate, nhưng cũng sẽ cung cấp cho chúng ta cái nhìn đúng về nested-object và json-object.

## Source
- https://stackoverflow.com/a/51455007/5938111
- https://www.elastic.co/blog/managing-relations-inside-elasticsearch
- https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html
- https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html