# Giới thiệu
Khi mình mới bắt đầu tìm hiểu về Elasticsearch mình không nghĩ rằng giữa kiểu dữ liệu `Text` và `Keyword` có sự khác nhau nhưng khi vào dự án thực tế mình mới nhận ra được sự khác biệt giữa 2 kiểu dữ liệu này. Sự khác biệt giữa 2 kiểu dữ liệu này cũng rất đơn giản nhưng cũng rất quan trọng. Trong bài viết này, mình sẽ nói về sự khác biệt, cách sử dụng 2 kiểu dữ liệu này, cách 2 kiểu dữ liệu này xử lý và nên sử dụng cái nào giữa hai cái.

# Sự khác biệt
* `Text` : Elasticsearch sẽ phân tích dữ liệu trước khi nó được lưu vào Index. 
VD: chúng ta có 1 đoạn văn bản `Laravel is a web application framework` nếu search với từ khóa `web` thì tất cả các bản ghi chứa từ khóa là `web` sẽ được trả về
* `Keyword`: Ngược lại với `Text` kiểu dữ liệu  `Keyword` sẽ không đi phân tích dữ liệu trước khi được lưu vào Index.
VD: chúng ta có 1 đoạn văn bản `Laravel is a web application framework` nếu search với từ khóa `web` thì không có kết quả nào được trả về mà chúng ta bắt buộc phải nhập đúng là `Laravel is a web application framework`
# Cách sử dụng
Dưới đây mình sẽ thiết lập mapping với `Text` và `Keyword` như sau:
## Keyword mapping
```
PUT articles
{
  "mappings": {
    "_doc": {
      "properties": {
        "name": {
          "type": "keyword"
        }
      }
    }
  }
}
```
## Text mapping
```
PUT articles
{
  "mappings": {
    "_doc": {
      "properties": {
        "name": {
          "type": "text"
        }
      }
    }
  }
}
```

# Cách Keyword và Text hoạt động
Cả 2 kiểu dữ liệu này được lập chỉ mục khác nhau trong Index, sự khác biệt trong lúc đánh index sẽ ảnh hưởng đến kết quả trả về lúc chúng ta thực hiện query.
## Keyword mapping
Như mình đã nói ở trên nếu thiết lập với kiểu `Keyword` thì Elasticsearch sẽ không thực hiện phân tích tức là chuỗi mà bạn nhập vào sẽ được dữ y chang như vậy, như ví dụ ở trên bạn phải nhập đúng là `Laravel is a web application framework` thì mới có kết quả trả về. Trường hợp chúng ta chỉ nhập 1 từ có chứa trong đoạn văn bản này thì Elasticsearch cũng sẽ không tả về kết quả mặc dù đoạn văn bản trong ví dụ có chứa nó.
## Text mapping
Không giống như `Keyword` kiểu dữ liệu này sẽ được Elasticsearch phân tích trước khi đánh Index. Mặc định trình phân tích `analyzer` của Elasticsearch sẽ tách `split` chia nhỏ và lowercase các kí tự là chuỗi. Với ví dụ ở trên là `Laravel is a web application framework` thì với kiểu dữ liệu này  Elasticsearch sẽ như sau:

| Term | Count |
| -------- | -------- |
| laravel     | 1     |
| is     | 1     |
| a     | 1     |
| web     | 1     |
| application     | 1     |
| framework     | 1     |

Bây giờ nếu bạn nhập từ khóa tìm kiếm là `web`  thì tất cả các bản ghi có chứa từ khóa này sẽ được trả về.

# Sử dụng trong trường hợp nào
## Keyword
* Kết quả trả về phải match hoàn toàn với từ khóa tìm kiếm
* Query giống như database 
* Sử dụng với wildcard query
## Text
* Khi bạn muốn tạo một chức năng tìm kiếm lớn
* Chức năng tìm kiếm có các gợi ý với từ khóa gần giống với từ khóa đã nhập
# Tham khảo
https://kb.objectrocket.com/elasticsearch/when-to-use-the-keyword-type-vs-text-datatype-in-elasticsearch
https://betterprogramming.pub/elasticsearch-text-vs-keyword-2ccb99ec72ae