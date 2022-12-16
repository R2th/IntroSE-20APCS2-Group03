**Painless** sử dụng cú pháp kiểu tương tự như java giống như Groovy. Về cơ bản là một tập hợp con của Java với một số tính năng ngôn ngữ kịch bản lệnh bổ sung giúp viết các tập lệnh dễ dàng hơn. Chúng ta có thể sử dụng ở bất kỳ nơi nào có thể sử dụng script trong elasticsearch, với scripting bạn có thể đánh giá các biểu thức tùy chỉnh trong Elaticsearch, ví dụ bạn có thể sử dụng script để trả về "script fields" như một phần của yêu cầu tìm kiếm hoặc đánh giá một điểm tùy chỉnh cho một query.

Để mô tả painless scripting ta tạo một số document cho student index

```
curl -XPOST "http://localhost:9300/student/_bulk?pretty" -H 'Content-Type: application/json' -d'
{"index":{"_id":1}}
{"first":"Agatha","last":"Christie","base_score":[9,27,1],"target_score":[17,46,0],"grade_point_index":[26,82,1],"born":"1978/08/13"}
{"index":{"_id":2}}
{"first":"Alan","last":"Moore","base_score":[7,54,26],"target_score":[11,26,13],"grade_point_index":[26,82,82],"born":"1976/10/12"}
{"index":{"_id":3}}
{"first":"jiri","last":"Ibsen","base_score":[5,34,36],"target_score":[11,62,42],"grade_point_index":[24,80,79],"born":"1983/01/04"}
{"index":{"_id":4}}
{"first":"William","last":"Blake","base_score":[4,6,15],"target_score":[8,23,15],"grade_point_index":[26,82,82],"born":"1990/02/17"}
{"index":{"_id":5}}
{"first":"Shaun","last":"Tan","base_score":[5,0,0],"target_score":[8,1,0],"grade_point_index":[26,1,0],"born":"1993/06/20"}
{"index":{"_id":6}}
{"first":"Peter","last":"Hitchens","base_score":[0,26,15],"target_score":[11,30,24],"grade_point_index":[26,81,82],"born":"1969/03/20"}
{"index":{"_id":7}}
{"first":"Raymond","last":"Carver","base_score":[7,19,5],"target_score":[3,17,4],"grade_point_index":[26,45,34],"born":"1963/08/10"}
{"index":{"_id":8}}
{"first":"Lee","last":"Child","base_score":[2,14,7],"target_score":[8,42,30],"grade_point_index":[26,82,82],"born":"1992/06/07"}
{"index":{"_id":39}}
{"first":"Joseph","last":"Heller","base_score":[6,30,15],"target_score":[3,30,24],"grade_point_index":[26,60,63],"born":"1984/10/03"}
{"index":{"_id":10}}
{"first":"Harper","last":"Lee","base_score":[3,15,13],"target_score":[6,24,18],"grade_point_index":[26,82,82],"born":"1976/03/17"}
{"index":{"_id":11}}
{"first":"Ian","last":"Fleming","base_score":[3,18,13],"target_score":[6,20,24],"grade_point_index":[26,67,82],"born":"1972/01/30"}
'
```
## Truy cập giá trị Doc từ Painless

Giá trị của document có thể được truy cập từ Map có tên là `doc`. Ví dụ script sau sẽ tính tổng goals của students

```
curl -XGET "http://localhost:9300/student/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "function_score": {
      "script_score": {
        "script": {
          "lang": "painless",
          "source": "int total = 0; for (int i = 0; i < doc['\''base_score'\''].length; ++i) { total += doc['\''base_score'\''][i]; } return total;"
        }
      }
    }
  }
}
'
```

Ngoài ra, chúng ta có thể làm tương tự bằng cách sử dụng script field thay thế function score

```
curl -XGET "http://localhost:9300/student/_search?pretty" -H 'Content-Type: application/json' -d'
{
 "query": {
   "match_all": {}
 },
 "script_fields": {
   "total_goals": {
     "script": {
       "lang": "painless",
       "source": "int total = 0; for (int i = 0; i < doc['\''base_score'\''].length; ++i) { total += doc['\''base_score'\''][i]; } return total;"
     }
   }
 }
}
'
```

Ví dụ sau đây sẽ dùng Painless script để sắp xếp students theo đầy đủ họ tên, tên được truy cập bằng `doc['first'].value` và `doc['last'].value`

```
curl -XGET "http://localhost:9300/student/_search?pretty" -H 'Content-Type: application/json' -d'
{
 "query": {
   "match_all": {}
 },
 "sort": {
   "_script": {
     "type": "string",
     "order": "asc",
     "script": {
       "lang": "painless",
       "source": "doc['\''first.keyword'\''] + '\'' '\'' + doc['\''last.keyword'\'']"
     }
   }
 }
}
'
```
## Updating Fields với Painless
Chúng ta cũng có thể dễ dàng cập nhật các trường bằng cách truy cập source ban đầu cho một trường như `ctx._source.<field-name>`.

Đầu tiên, hãy tìm một source data cho một student bằng cách gởi request sau

```
curl -XGET "http://localhost:9300/student/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "stored_fields": [
    "_id",
    "_source"
  ],
  "query": {
    "term": {
      "_id": 1
    }
  }
}
'
```

Để thay đổi last name của student trên thành ‘Frost’ đơn giản ta chỉ cần đặt `ctx._source.last` cho giá trị mới

```
curl -XPOST "http://localhost:9300/student/_update/1?pretty" -H 'Content-Type: application/json' -d'
{
  "script": {
    "lang": "painless",
    "source": "ctx._source.last = params.last",
    "params": {
      "last": "Frost"
    }
  }
}
'
```
Chúng ta cũng có thể add thêm fields vào một document. Ví dụ script này sẽ add một trường mới chứa nickname của student là 'JS'

```
curl -XPOST "http://localhost:9300/student/_update/1?pretty" -H 'Content-Type: application/json' -d'
{
  "script": {
    "lang": "painless",
    "source": "ctx._source.last = params.last; ctx._source.nick = params.nick",
    "params": {
      "last": "Smith",
      "nick": "JS"
    }
  }
}
'
```

Các trường date được hiển thị dưới dạng `ReadableDateTime` nên chúng có hỗ trợ các phương thức như `getYear`, `getDayOfWeek`, `getMillis`. Ví dụ request sau sẽ trả về năm sinh của các student

```
curl -XGET "http://localhost:9300/student/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "script_fields": {
    "birth_year": {
      "script": {
        "source": "doc.born.value.year"
      }
    }
  }
}
'
```
## Regular Expressions
**Regexes** được disable theo mặc định bởi vì ảnh hưởng tới bộ nhớ tuy nhiên nó là một công cụ mạnh mẽ và tuyệt vời, để enable trong `elasticsearch.yml` ta set `script.painless.regex.enabled: true`

Painless hỗ trợ riêng cho các biểu thức chính quy có cấu trúc cú pháp:
`/pattern/` Đây là cách duy nhất để tạo ra một pattern trong painless. Pattern bên trong cặp dấu '/' chỉ là Java regular expressions

* `=~`: Toán tử find trả về một Boolean, true nếu một phần của text khớp, ngược lại false.
* `==~`: Toán tử match trả về một Boolean, true nếu khớp với text, ngược lại false.

Dùng toán tử `(=~)` ta có thể update students có từ 'b' trong last name

```
curl -XPOST "http://localhost:9300/student/_update_by_query?pretty" -H 'Content-Type: application/json' -d'
{
 "script": {
   "lang": "painless",
   "source": "if (ctx._source.last =~ /b/) {ctx._source.last += \"matched\"} else {ctx.op = '\''noop'\''}"
 }
}
'
```

Dùng toán tử `(==~)` chúng ta có thể update students mà có last bắt đầu bằng một phụ âm và kết thúc bằng một nguyên âm
```
curl -XPOST "http://localhost:9300/student/_update_by_query?pretty" -H 'Content-Type: application/json' -d'
{
 "script": {
   "lang": "painless",
   "source": "if (ctx._source.last ==~ /[^aeiou].*[aeiou]/) {ctx._source.last += \"matched\"} else {ctx.op = '\''noop'\''}"
 }
}
'
```

Chúng ta có thể dùng `Pattern.matcher`, ví dụ này sẽ remove tất cả các nguyên âm trong last name

```
curl -XPOST "http://localhost:9300/student/_update_by_query?pretty" -H 'Content-Type: application/json' -d'
{
 "script": {
   "lang": "painless",
  "source": "ctx._source.last = /[aeiou]/.matcher(ctx._source.last).replaceAll('\'''\'')"
 }
}
'
```

## Tổng kết
Trên đây chúng ta đã tìm hiểu những điều cơ bản về  Painless scripting của Elaticsearch và đã đưa ra một số ví dụ về cách thức hoạt động của nó. Để tìm hiểu kỹ hơn ta vào [trang chủ](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html) của elasticsearch.