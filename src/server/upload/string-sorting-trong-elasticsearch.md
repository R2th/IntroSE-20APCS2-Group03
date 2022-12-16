> Trong  Elasticsearch, khi sorting chúng ta nên sử dụng not_analyzed text field thay vì analyzed text field
## Để hiểu rõ hơn chúng ta hãy cùng xem ví dụ dưới đây:
Hãy đánh index một số bản ghi với trường "name" là một chuỗi ký tự:
```
POST my_index/_doc/1
{
  "name" : "technocrat sid"
}

POST my_index/_doc/2
{
  "name" : "siddhant01"
}

POST my_index/_doc/3
{
  "name" : "sid 01"
}

POST my_index/_doc/4
{
  "name" : "agnihotry siddhant"
}
```

Sau đó hãy sắp xếp chúng theo thứ tự giảm dần nào:
```
GET my_index/_search
{
  "sort": [
  {
    "name": {
      "order": "asc"
    }
  }
 ]
}
```

Đây là kết quả ta nhận được:
```
sid 01

agnihotry siddhant

technocrat sid

siddhant 01
```

**Khoan đã !!! Tại sao kết quả trả về lại không theo thứ tự alphabet ?? Đáng ra kết quả phải là như này chứ nhỉ:**
```
agnihotry siddhant

sid 01

siddhant 01

technocrat sid
```

## Lý do chúng ta không nhận được kết quả chính xác trong trường hợp trên là vì:
Chúng ra không chỉ rõ mapping cho trường "name" trước khi đánh index, thay vào đó nó sẽ sử dụng mapping mặc định. Vì vậy trong trường hợp này trường "name" sẽ được phân tích bằng Standard Analyzer( Cắt Chuỗi ký tự ra thành các từ riêng biệt và loại bỏ [stop words](https://en.wikipedia.org/wiki/Stop_words))

Ví dụ nếu chúng ta phân tích chuỗi **“agnihotry siddhant”** kết quả nhận được sẽ là 2 từ **"agnihotry"** và **"siddhant"**

Điều đó có nghĩa là chuỗi ký tự được đánh index sẽ được lưu thành các tokens,
```
text --> tokens 
technocrat sid --> technocrat, sid 
siddhant01 --> siddhant01 
sid 01 --> sid, 01 
agnihotry siddhant --> agnihotry, siddhant
```

**Nhưng điều chúng ta muốn là sắp xếp từ đầu tiên theo alphabet, sau đó đến từ thứ 2, sau đó là thứ 3, cứ thế ...** Trong trường hợp này chúng ta nên xem xét toàn bộ chuỗi ký tự thay vì cắt nó ra thành các tokens.

Ví dụ chúng ta nên xem xét toàn bộ những chuỗi ký tự như **“technocrat sid”**, **“sid 01”** và **“agnihotry siddhant”**, có nghĩa là chúng ta không nên analyze chúng.

# Vậy làm thế nào để không analyze text field?
## Trước Elasticsearch 5.x
Trước Elasticsearch 5.x text field được lưu trữ như là string. Để sắp xếp chúng ta không nên analyze chuỗi tuy nhiên điều gì xảy ra nếu như chúng ta muốn sử dụng full-text query trên trường đó?

Điều đó có nghĩa là chúng ta muốn sort và search trên cùng một field!

Để làm được điều đó chúng ta có thể sử dụng multifield mapping:
```
"name": {
  "type": "string",
    "fields": {
      "raw": {
        "type":  "string",
        "index": "not_analyzed"
      }
   }
}
```

Trường **"name"** chính được analyze và trường phụ **"name.raw"** không được analyze.

Điều đó có nghĩa là chúng ta có thể sử dụng **"name"** để search và **"name.raw"** dể sort:
```
GET my_index/_search
{
  "sort": [
  {
    "name.raw": {
      "order": "asc"
    }
  }
 ]
}
```

## Sau Elasticsearh 5.x
Sau Elasticsearh 5.x string type đã được loại bỏ thay vào đó là 2 type mới là **text** được sử dụng cho full-text search và **keyword** được sử dụng cho sort

Ví dụ nếu bạn index một bản ghi như sau:
```
{
  "name": "sid"
}
```

Một dynamic mappings sẽ được tạo ra theo mặc định:
```
{
  "name": {
    "type" "text",
    "fields": {
      "keyword": {
        "type": "keyword",
        "ignore_above": 256
      }
    }
  }
}
```

Bạn không cần phải chỉ định **not_analyzed** cho text field sau ES 5.x

Bạn có thể sử dụng **"name.keyword"** để sorting:
```
GET my_index/_search
{
  "sort": [
  {
    "name.keyword": {
      "order": "asc"
    }
  }
 ]
}
```

## Tham Khảo
http://www.technocratsid.com/string-sorting-in-elasticsearch/