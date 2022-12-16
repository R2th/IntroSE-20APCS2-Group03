## 1. Chú ý khi sử dụng analyzer
Có lẽ khi làm việc với elasticsearch chúng ta đều đã ít nhiều từng nghe về analyzer, đây có thể được hiểu như là một công cụ của elasticsearch trong việc bẻ từ và cấu trúc dữ liệu giúp cho việc tìm kiếm text, khi chúng ta làm việc với text dưới các ngôn ngữ các khau. Elasticsearch có hỗ trợ sẵn khá nhiều analyzer cho các ngôn ngữ khác nhau, tuy nhiên với tiếng việt thì chúng ta cần phải cài thêm plugin mới sử dụng được (vi_analyzer của anh duy đỗ). Mỗi analyzer bao gồm:

* 0 or more CharFilters
* 1 Tokenizer
* 0 or more TokenFilters

chi tiết về các loại analyzer các bạn có thể tham khảo thêm [tại đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html). điều cần chú ý ở đây là mặc định elasticsearch sử dụng standard analyzer để phân tích text. Mọi thứ đều sẽ ổn cho đến khi giá trị search của bjan có chứa một và kí tự đặc biệt ví dụ như "C#". standard analyzer sẽ loại bỏ ký tự "#" (và một số ký tự đặc biệt khác) điều đó dẫn đến việc kết quả trà về của bạn sẽ khồng được như momg muốn.  Giải pháp cho vấn đề này là tự tạo một analyzer của riêng mình. ví dụ như:

```
{
   "settings": {
      "analysis": {
         "tokenizer": {
            "custom_tokenizer": {
              "type": "ngram",
              token_chars: ["letter", "digit", "whitespace", "punctuation", "symbol")
            }
         },
         "analyzer": {
            "custom_analyzer": {
               "type": "custom",
               "filter": [
                  "lowercase"
               ],
               "tokenizer": "custom_tokenizer"
            }
         }
      }
   }
}
```

config cần chú ý ở đây là token_chars: Các lớp ký tự nên chứa trong một token, với giá trị "symbol" thì khi phân tích text elasticsearch sẽ không loại bỏ kí tự đặc biệt ( ví dụ  kí tự "#") nữa. hoặc đơn giản hơn hãy sử dụng tokenizer whitespace nếu bạn cầ ntifm kiếm theo từ chứ không phải theo từng chữ  :D 

## 2. Chú ý về maximum result elasticsearch
Trong thực tế sau khi search bằng elasticsearch kết quả trả về thường sẽ được phân trang. để hỗ trợ cho việc phân trang elasticsearch cung cấp cho chúng ta from/size. Tham số from xác định phần bù từ kết quả đầu tiên bạn muốn tìm nạp. Tham số size cho phép bạn định cấu hình số lần truy cập tối đa được trả về. Mặc dù from và size có thể được đặt làm tham số yêu cầu, chúng cũng có thể được đặt trong body search. from có giá trị mặc định là 0 và size mặc định là 10.

Lưu ý rằng from + size không thể lớn hơn index.max_result_window mặc định là 10.000. Điều này có thể hiểu đơn giản là kết qura sau khi search trả về mặc định sẽ nhỏ hơn hoặc bằng 10000. Vấn đề xảy ra khi chúng ta muốn lấy về tất cả kết quả của việc search và số lượng kết quả lại lớn hơn có số 10000.

Để giải quyết vấn đề này có 3 cách:
* cách đơn giản nhất là thay đổi index.max_result_window, nhưng có thể thấy cách này khá là cứng chúng ta có thể set index.max_result_window lên 20000, 30000 nhưng có trời mới biết đc biết đâu có 1 ngày kết quả trả về còn lớn hơn con số chúng ta cấu hình ngoài ra thì khi kết quả trả về quá lớn, quá trình sắp xếp có thể thực sự trở nên rất nặng nề, sử dụng lượng lớn CPU, bộ nhớ và băng thông. vậy nên theo mình nên bỏ qua cách này :D (trừ trường hợp cần fix nhanh). có 2 cách được khuyến nghị nên sử dụng từ trang chủ của elasticsearch đó là Scroll và Search after. 
* cách 2 sử dụng Scroll API: Để truy xuất một lượng dữ liệu lớn 1 cách hiệu quả thì chúng ta nên dùng Scroll Api, nó giống như cách bạn sử dụng con trỏ trên cơ sở dữ liệu truyền thống. Để sử dụng Scroll, bạn sẽ chỉ định tham số scroll trong chuỗi truy vấn để cho Elasticsearch biết nó nên giữ "ngữ cảnh tìm kiếm" trong bao lâu, ví dụ: scroll = 1m( 1 phút).

```
curl -X POST "localhost:9200/twitter/_search?scroll=1m" -H 'Content-Type: application/json' -d'
{
    "size": 10,
    "query": {
        "match" : {
            "title" : "elasticsearch"
        }
    }
}
'
```

Kết quả từ yêu cầu trên bao gồm:

_scroll_id: DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ==, nó được chuyển đến API scroll để truy xuất lô kết quả tiếp theo.

```
POST /_search/scroll 
{
    "scroll" : "1m", 
    "scroll_id" : "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ==" 
}
```

Khi ban sử dụng Scroll Api thì bạn sẽ phải loại bỏ đi tham số FROM , tham số SIZE cho phép bạn định cấu hình số lần truy cập tối đa được trả về với mỗi lô kết quả. Mỗi cuộc gọi đến API scroll sẽ trả về lô kết quả như vậy với 1 _scroll_id mới cho đến khi không còn kết quả nào để trả lại, tức là mảng truy cập trống.

* Cách 3 sử dụng Search After: ý tưởng vẫ nlaf sử dụng 1 con trỏ để lấy ra kết quả ở trang sau từ trang trước. nhưng ở đây là một con trỏ trực tiếp (có thể sử dụng một trường giá trị unique để làm việc này). ví dụ dưới đây mình sử dụng code ruby khi muốn lấy ra hết tất các Product thỏa mãn điều kiện name là samsung 

```ruby
    records = []
    after = 0
    total = 0
    loop do
      results = Product.search body: query_with_search_after(after)
      total ||= results.response["hits"]["total"]
      records += results
      after = records.last&.id

      break if records.count < 10000
    end
    records
    
    def query_with_search_after after
        {
            size: 10,
            query: {
                bool: {
                    must: [
                        {
                           term: {
                                "name": "samsung"
                            }
                        }
                    ]
                }
            },
            search_after: [after],
            sort: [
                id: {
                    order: "asc"
                }
            ]
        }
     end
```

như đoạn code trên khi số lượng kết quả trả về nhỏ hơn 10000 thì sẽ tiếp tục query một lần nữa và bỏ qua những kết quả đã search đc từ lần trc đó cuối cùng ta sẽ đc mảng tất cả nhưng kết quả thỏa mãn điều kiện.
trên đây là một số ngu kiến của mình nhận ra khi sử dụng elasticsearch. có thể còn nhiều chỗ chưa hợp lý mong mọi người đọc qua đóng góp thêm ý kiến. mình xin cảm ơn.
bài viết có tham khảo tài liệu từ trang:

 https://discuss.elastic.co/