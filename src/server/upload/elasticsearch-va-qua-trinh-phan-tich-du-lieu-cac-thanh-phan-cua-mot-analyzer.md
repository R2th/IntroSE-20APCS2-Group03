# 1. Analyzer
Analyzer là thứ sẽ xử lý dữ liệu được gửi lên elasticsearch và xử lý dữ liệu của một số loại query search như [match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html). 
Như mình đã đề cập ở [bài viết](https://viblo.asia/p/elasticsearch-va-qua-trinh-phan-tich-du-lieu-gDVK2zW0KLj) trước, một analyzer bao gồm các thành phần sau: một hoặc nhiều **character filter** để chuẩn hóa dữ liệu trước khi phân tích, một **tokenizer** để phân tích dữ liệu và một hoặc nhiều **token filter** để chuẩn hóa dữ liệu sau khi phân tích.  

# 2 Build in analyzer
Hiện tại elasticsearch cung cấp một số build-in analyzer
## 2.1 Standard

Đây là analyzer mặc định, sử dụng standard, lowercase, và stop token-filter, sẽ đề cập ở phần sau

## 2.2 Simple

Simple analyzer tách đoạn text thành token khi gặp một ký tự không phải là letter. Nó bao gồm lowercase tokenizer

```
POST _analyze
{
  "analyzer": "simple",
  "text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
```

kết quả:
[ the, quick, brown, foxes, jumped, over, the, lazy, dog, s, bone ]

## 2.3 Whitespace

Tách đoạn text thành token dựa vào các whitespace. Nó bao gồm whitespace tokenizer

```
POST _analyze
{
  "analyzer": "whitespace",
  "text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
```

Kết quả:
[ The, 2, QUICK, Brown-Foxes, jumped, over, the, lazy, dog's, bone. ]

## 2.4 Stop

Giống với Simple analyzer, tách đoạn text thành token khi gặp một ký tự không phải là letter nhưng có thêm một tính năng là loại bỏ các token là stopword(a, an, the, sẽ đề cập ở phần sau) nhờ có thêm một token filter là Stop Token Filter

```
POST my_index/_analyze
{
  "analyzer": "my_stop_analyzer",
  "text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
```

[ quick, brown, foxes, jumped, lazy, dog, s, bone ]

## 2.5 Keyword

Lấy tất cả đoạn text thành một token. Khuyến khích set field thành not_analyzed thay vì dùng analyzer keyword

```json
curl -XPOST 'localhost:9200/my_index
{
  "mappings" : {
    "document" : {
      "properties" : {
        "field_name" : {
          "type" : "string",
          "analyzer" : "keyword"
        }
      }
    }
  }
}
'
```

Khuyến khích

```json
curl -XPOST 'localhost:9200/my_index
{
  "mappings" : {
    "document" : {
      "properties" : {
        "field_name" : {
          "type" : "string",
          "index": "not_analyzed"
        }
      }
    }
  }
}
'
```

## 2.6 Pattern

Tách đoạn text thành token dựa vào biểu thức chính quy (RegEx), pattern mặc định là `\W+:` ngoại trừ tất cả non-word characters

```json
POST \_analyze
{
"analyzer": "pattern",
"text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
```

kết quả:
[ the, 2, quick, brown, foxes, jumped, over, the, lazy, dog, s, bone ]

## 2.7 Language analyzer

Tập hợp các analyzer dành cho các ngôn ngữ khác nhau (arabic, armenian, basque, bengali, brazilian, bulgarian, catalan, cjk, czech, danish, dutch, english, finnish, french, galician, german, greek, hindi, hungarian, indonesian, irish, italian, latvian, lithuanian, norwegian, persian, portuguese, romanian, russian, sorani, spanish, swedish, turkish, thai).

# 3. Custom một analyzer
Ngoài các analyzer được cung cấp sẵn,  chúng ta cũng có thể tự tạo các analyzer cho phù hợp với yêu cầu bài toán bằng cách kết hợp các character filter, tokenizer, token filter của elasticsearch.

_Ví dụ: Custom một analyzer sử dụng các charfilter, tokenizer, token filter_

```json
curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_custom_analyzer": {
          "type": "custom",
          "char_filter": [
            "emoticons"
          ],
          "tokenizer": "punctuation",
          "filter": [
            "lowercase",
            "english_stop"
          ]
        }
      },
      "tokenizer": {
        "punctuation": {
          "type": "pattern",
          "pattern": "[ .,!?]"
        }
      },
      "char_filter": {
        "emoticons": {
          "type": "mapping",
          "mappings": [
            ":) => _happy_",
            ":( => _sad_"
          ]
        }
      },
      "filter": {
        "english_stop": {
          "type": "stop",
          "stopwords": "_english_"
        }
      }
    }
  }
}
'
curl -X POST "localhost:9200/my_index/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "my_custom_analyzer",
  "text": "I\u0027m a :) person, and you?"
}
'
```


## 3.1 Tokenizer

Hiện tại các analyzer của elasticsearch được chia thành 3 nhóm nhu sau:

### 3.1.1 Nhóm Các tokenizer hướng về xử lý text hướng từ ngữ (word oriented tokenizers)

Các tokenizer của nhóm này có chức năng tách các đoạn text dài thành các từ riêng lẻ

#### Standard tokenizer

Đây là tokenizer mặc định, sự dụng thuật toán tách từ của UAX 29 nên nó có thể áp dụng được cho hầu hết các ngôn ngữ thuộc châu âu.

```
POST _analyze
{
  "tokenizer": "standard",
  "text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
```

Kết quả
[ The, 2, QUICK, Brown, Foxes, jumped, over, the, lazy, dog's, bone ]

Các options

- max_token_length: độ dài cho phép của 1 token, mặc định là 255

```
PUT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "my_tokenizer"
        }
      },
      "tokenizer": {
        "my_tokenizer": {
          "type": "standard",
          "max_token_length": 5
        }
      }
    }
  }
}
```

#### Letter tokenizer

Tách đoạn text thành token bất cứ khi nào gặp phải một ký tự không phải letter

```
POST \_analyze
{
"tokenizer": "letter",
"text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
```

Kết quả
[ The, QUICK, Brown, Foxes, jumped, over, the, lazy, dog, s, bone ]

#### Lowercase tokenizer

Giống với Letter tokenizer tách đoạn text thành token bất cứ khi nào gặp phải một ký tự không phải letter, nhưng đồng thời cũng lowercase các token tách được

```
POST \_analyze
{
"tokenizer": "lowercase",
"text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
```

Kết quả:
[ the, quick, brown, foxes, jumped, over, the, lazy, dog, s, bone ]

#### Whitespace tokenizer

Giống với Letter tokenizer tách đoạn text thành token bất cứ khi nào gặp phải một ký tự whitespace
Các options

- max_token_length: độ dài cho phép của 1 token, mặc định là 255




### 3.1.2 Nhóm về xứ lý text hướng cấu trúc (structured text tokenizers)

Các tokenizer của nhóm này thiên về tách đoạn text thành các đoạn text nhỏ hơn theo các cấu trúc text khác như email, file path
#### Keyword tokenizer
Cho ra cả đoạn text input thành một term, dùng để kết hợp với tokenizer để chuẩn hóa dữ liệu đầu ra, thường dùng cho search like

ví dụ

POST _analyze
{
  "tokenizer": "keyword",
  "text": "New York"
}

Kết quả
[ New York ]

Các options
- max_token_length: độ dài cho phép của 1 token, mặc định là 255

```
PUT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "my_tokenizer"
        }
      },
      "tokenizer": {
        "my_tokenizer": {
          "type": "keyword",
          "buffer_size": 200
        }
      }
    }
  }
}
```


#### UAX URL email tokenizer

Giống với standard tokenizer ngoại trừ nó có thể nhận ra và lưu url và email thành một token

POST \_analyze
{
"tokenizer": "uax_url_email",
"text": "Email me at john.smith@global-international.com or visit https://john-smith.com"
}

kết quả
[ Email, me, at, john.smith@global-international.com , or , visit, https://john-smith.com]

Các options

- max_token_length: độ dài cho phép của 1 token, mặc định là 255

#### Path hierarchy tokenizer

Dùng để xử lý các đường dẫn thư mục, file. Tách đoạn text thành các đường dẫn thư mục theo hướng từ thư mục cha vào

POST \_analyze
{
"tokenizer": "path_hierarchy",
"text": "/usr/local/var/log/elasticsearch.log"
}

kết quả
[/usr, /usr/local, /usr/local/var, /usr/local/var/log, /usr/local/var/log/elasticsearch.log]

Các options:

- delimiter : định nghĩa path separator, mặc định là '/'
- replacement : thay thế delimiter trong token đầu ra
- buffer_size : mặc định 1024
- reverse : tách từ theo hướng từ con -> cha, mặc định là false

### 3.1.3 Nhóm xử lý text hướng phân mảnh (partial word tokenizers)

Tách từ, các đoạn text thành các fragment nhỏ hơn.

#### N-gram tokenizer

Tách một chuỗi thành các chuỗi con (gram) đều nhau có độ dài là N, hữu dụng cho các ngôn ngũ không nối các từ dài bằng khoảng trắng như tiếng Đức

POST \_analyze
{
"tokenizer": "ngram",
"text": "Quick Fox"
}
kết quả
[ Q, Qu, u, ui, i, ic, c, ck, k, "k ", " ", " F", F, Fo, o, ox, x ]

các options

- min_gram : độ dài nhỏ nhất của 1 gram, mặc định là 1
- max_gram : độ dài lớn nhất của 1 gram, mặc định là 2
- token_chars : các loại ký tự mà được dùng để tách gram gồm : letter (ký tự chữ), digit (chữ số), whitespace (' ' hoặc '\n'), symbol

#### Edge N-gram tokenizer

Giống N-gram nhưng chỉ cho ra các gram là bắt đầu của một từ

## 3.2 Token filter

Dùng để chuẩn hóa các token được sinh ra sau quá trình tokenizing để đưa vào index, dùng để custom một analyzer, có thể có 0 hoặc nhiều token filter trong một analyzer

#### 3.2.1 Standard token filter

Ở các phiên bản cũ thì nó trim chữ s sau các từ, còn ở các phiên bản sau này bây giờ thì nó đơn giản là không làm gì cả.

#### 3.2.2 Lowercase/Upper token filter

Lowercase/uppercase các token

#### 3.3.3 Stopword token filter

Loại bỏ các token là stopword, ví dụ như các từ a, an, the, and ... trong tiếng Anh, hỗ trọ nhiều ngôn ngữ khác nhau https://www.ranks.nl/stopwords

```
PUT /my*index
{
    "settings": {
        "analysis": {
            "filter": {
                "my_stop": {
                    "type": "stop",
                    "stopwords": "\_language*"
                }
            }
        }
    }
}
```

#### 3.3.4 Stemming tokenizers

Các tokenizer dùng để chuyển đổi các token về từ gốc theo ngữ pháp, vd: “walks“, “walking“, “walked” có từ gốc là "walk", trong es có 3 thuật toán stemming tương ứng với 3 tokenizer : porter, snowball, kstem

# 4. Lời kết
Trên đây là bài giói thiệu của mình về các analyzer của elassticsearch cũng như các thành phần cấu tạo nên chúng. Cám ơn các bạn đã quan tâm ^_^

Nguồn tham khảo:

- Tokenizer: https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenizers.html
- Token filter: https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenfilters.html
- Ebook "Elasticsearch in action" Part 1 - Chapter 5: https://github.com/BlackThursdays/https-github.com-TechBookHunter-Free-Elasticsearch-Books/blob/master/book/Elasticsearch in Action.pdf