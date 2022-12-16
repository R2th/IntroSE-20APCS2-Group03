Trong bài trước chúng ta đã có cái nhìn tổng quan về mapping. Trong bài viết này mình sẽ đi sâu hơn về Mapping. 

## 1. Mapping Type
> Each index has one mapping type which determines how the document will be indexed.

Mỗi index có duy nhất 1 kiểu mapping, và mapping type này sẽ quyết định cách các *document* sẽ được index.

Mapping type gồm ***[Meta-fields](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-fields.html)*** và ***[Properties](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)*** .
- Meta-fields: cho phép chúng ta customize các *behavior* của các *document*.
- Fields/Properties: danh sách các properties tương ứng với các *document*.
 
Mỗi property bao gồm 1 data-type *type*, là kiểu dữ liệu của prop đó. *[type](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html#_field_datatypes)* có thể là *text, keyword, date, double, boolean ...*

Thông thường, 1 field(prop) có thể được index theo nhiều cách khác nhau, phục vụ cho mục đích khác nhau.
Chẳng hạn, 1 string filed có thể được index thành 1 text-field phục vụ cho full-text search, và index như 1 keyword phục vụ cho *sorting* & *aggregations*. Tương tự, 1 string field có thể được index với *standard analyzer*, *english analyzer* và *whitespace analyzer*. Đây chính là ứng dụng của *multi-fields* (Sẽ được giải thích ở mục sau). Đa số các datatypes đều support multi-fields thông qua parameter ***fields***.

Ví dụ:
```
PUT test
{
  "mappings": {
    "doc": { 
      "properties": { 
        "title":    { "type": "text"  }, 
        "name":     { "type": "text"  }, 
        "age":      { "type": "integer" },  
        "created":  {
          "type":   "date", 
          "format": "strict_date_optional_time||epoch_millis"
        }
      }
    }
  }
}
```

Result:
```
{
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "test-3"
}
```

Chúng ta có thể thấy: khi put mapping ta chỉ định cho các field datatype của nó:
'title': 'text', 'age': 'integer' ...

## 2. Dynamic Mapping
Các fields trong index ko cần phải khai báo trước  khi được sử dụng. Với Dynamic Mapping, các field mới sẽ được auto thêm vào mapping, ngay khi document được index. Các trường mới được thêm vào cũng được thêm vào các top-level mapping type: inner json object & nested fields.

Thông qua 1 số rules, ta có thể *[customize dynamic mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-mapping.html)*.

#### 1 điều khá thú vị của *dynamic mapping* là *dynamic template*: 

*Dynamic template* cho phép *custom mapping* & apply cho các field dựa trên:
- datatype
- field name
- field full-dotted path

```
  "dynamic_templates": [
    {
      "template_name": { 
        ...  match conditions ... 
        "mapping": { ... } 
      }
    },
    ...
  ]
```
Template sẽ được process theo thứ tự: template match đầu tiên sẽ được sử dụng. Template mới có thể được append vào danh sách thông qua *[PUT Mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html)*. Và nếu *template* mới có tên trùng với template cũ, template cũ sẽ được thay thế.

Mình sẽ điểm qua 1 số kiểu match của *dynamic template*

1. [match_mapping_type](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-templates.html#match-mapping-type)
*match_mapping_type* sẽ match dựa trên datatype(datatype sẽ được detect bằng [dynamic_field_mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-field-mapping.html)). Và tất nhiên, khi sử dụng bộ detect của ES, sẽ có 1 vài giới hạn nhất định: chỉ 1 vài datatype có thể được detect: *boolean, date, double, long, object, string*.
Ví dụ:
```
PUT my_index
{
  "mappings": {
    "_doc": {
      "dynamic_templates": [
        {
          "integers": {
            "match_mapping_type": "long",
            "mapping": {
              "type": "integer"
            }
          }
        },
        {
          "strings": {
            "match_mapping_type": "string",
            "mapping": {
              "type": "text",
              "fields": {
                "raw": {
                  "type":  "keyword",
                  "ignore_above": 256
                }
              }
            }
          }
        }
      ]
    }
  }
}

PUT my_index/_doc/1
{
  "cpu_num": 4, 
  "computer_name": "Some string" 
}

GET my_index/_doc/1
```

Result:
```
{
  "_index": "my_index",
  "_type": "_doc",
  "_id": "1",
  "_version": 1,
  "found": true,
  "_source": {
    "cpu_num": 4,
    "computer_name": "Some string"
  }
}
```

2. [match/unmatch](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-templates.html#match-unmatch)

*match* sẽ sử dụng pattern để match dựa vào field name, còn *unmatch* sẽ sử dụng pattern để loại bỏ các field match được theo pattern đó.

Ví dụ:

```
PUT my_index
{
  "mappings": {
    "_doc": {
      "dynamic_templates": [
        {
          "longs_as_strings": {
            "match_mapping_type": "string",
            "match":   "long_*",
            "unmatch": "*_text",
            "mapping": {
              "type": "long"
            }
          }
        }
      ]
    }
  }
}

PUT my_index/_doc/1
{
  "long_num": "5", 
  "long_text": "foo" 
}

GET my_index-2/_doc/1
```

Result:
```
{
  "_index": "my_index-2",
  "_type": "_doc",
  "_id": "1",
  "_version": 1,
  "found": true,
  "_source": {
    "long_num": "5",
    "long_text": "foo"
  }
}
```

Để hiểu rõ hơn về *dynamic template*, các bạn có thể tham khảo [Elastic doc](https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-templates.html#template-variables).

## 3, Explicit
Với *explicit mapping*, ta có thể định nghĩa mapping cho các fields ngay khi *index* được tạo, hoặc thêm field vào các index đã tồn tại thông qua *PUT Mapping*(sẽ được giải thích ở bài tiếp theo).

Ví dụ:
```
PUT my_index 
{
  "mappings": {
    "doc": { 
      "properties": { 
        "title":    { "type": "text"  }, 
        "name":     { "type": "text"  }, 
        "age":      { "type": "integer" },  
        "created":  {
          "type":   "date", 
          "format": "strict_date_optional_time||epoch_millis"
        }
      }
    }
  }
}
```
## 4. Updating Existing Fields Mapping
Các field mapping đã tổn tại sẽ **không thể update**. Thay đổi mapping đồng nghĩa với việc invalidate 100% các *document* trong *index*. Trong trường hợp muốn update mapping, chỉ có 1 cách duy nhất: **[reindex](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html)** toàn bộ data trong index.

## Sources:
- https://www.elastic.co/blog/managing-relations-inside-elasticsearch
- https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html#mapping-limit-settings
- https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-templates.html#template-variables