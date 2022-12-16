Bạn đã bao giờ tự hỏi, ứng dụng web của mình có thể mở rộng quy mô bằng cách học được các từ khóa mà người dùng tìm kiếm? Có giải pháp nào cung cấp công cụ tìm kiếm tự động nhanh chóng với chỉ 1 từ khóa bất kì? Thật may khi có Searchkick và Elasticsearch là các công cụ hỗ trợ công việc tìm kiếm trở nên nhanh chóng và đầy đủ dù lượng dữ liệu có lớn đến đâu, chỉ cần bạn có 1 từ khóa, tất cả các thông tin liên quan trong hệ thống sẽ hiện ra trước mắt bạn.

## I. Elasticsearch là gì?
Theo trang [web Elasticsearch](https://www.elastic.co/products/elasticsearch) , "Elasticsearch là một công cụ phân tích và tìm kiếm RESTful phân tán có khả năng giải quyết một số trường hợp sử dụng ngày càng tăng. Là trung tâm của Elastic Stack, nó lưu trữ tập trung dữ liệu của bạn để bạn có thể khám phá những điều mong đợi và khám phá những điều không mong đợi . "

### *Tóm lại, ElasticSearch cung cấp:*
* Phân tích logs cho dữ liệu phi cấu trúc và bán cấu trúc( Ví dụ: NoSQL, SQL,...).
* Trải nghiệm tìm kiếm toàn văn bản trong thời gian thực.
* Giám sát ứng dụng trong thời gian thực.
* Kho tài liệu JSON.
* Đánh index cho tài liệu JSON tự động.
* Hỗ trợ Multi-tenancy.
* Dễ dàng phân phối dữ liệu giữa các node.
* Khả năng mở rộng dễ dàng.
Searchkick sử dụng Elasticsearch làm máy chủ mặc định. Vì vậy, hãy thiết lập một máy chủ Elasticsearch.

## II. Cách thiết lập Elasticsearch theo cách thủ công
### 1. Cài đặt Elasticsearch:
```
brew install elasticsearch
```
Sau khi cài thành công Elasticsearch, chạy lệnh dưới đây để kiểm tra:
```
elasticsearch
```
Note: Đây là cài trên MacOS; Đới với các hệ điều hành khác, bạn có thể tham khảo phần cài đặt trên [Ubuntu](https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-ubuntu-16-04.html), hoặc trên [windows](https://viblo.asia/p/series-elasticsearch-huong-dan-cai-dat-elasticsearch-tren-windows-10-3P0lPmBp5ox)
### 2. Demo
Bây giờ chúng ta đã cài xong Elasticsearch, việc cần làm tiếp theo là xây dựng 1 app Bookstore bằng rails  làm demo để sử dụng Searchkick
1) Tạo 1 Rails application mới:
```
rails new bookstore-demo
```
2) Tạo  Book model:
```
rails generate scaffold Book title:string author:string genre:string price:decimal
```
3) Create Database  và migration:
```
rake db:create db:migrate
```
4) Config file route.rb:
```
Rails.application.routes.draw do
  root 'books#index'
  resources :books: 
end
```
*Giải thích*
Bây giờ chúng ta hãy hiểu Searchkick là gì. 
Searchkick là một công cụ tìm kiếm thông minh giúp thúc đẩy và tạo ra các xử lý tìm kiếm nhanh hơn dựa trên hoạt động tìm kiếm của người dùng. Trong ví dụ của chúng tôi, Searchkick có thể xử lý:

* Lỗi chính tả - Horrorr khớp với Horror.
* Khoảng trắng bổ sung - Tiểu sử tự động khớp với Tiểu sử .
* Stemming - nhật ký khớp với nhật ký.
* Các ký tự đặc biệt.
* Reindexing không mất downtime(thời gian ngưng trệ) .
* Tìm kiếm tự động hoàn thành.
* Hoạt động với Mongoid và ActiveRecord.
* Cá nhân hóa kết quả tìm kiếm của người dùng.

5) Thêm gem Searchkick vào gemfile của ứng dụng demo-Bookstore:
```
gem 'searchkick'
```

6) Bundle app
```
bundle install
```

7) Thêm Searchkick vào các model sử dụng search
```
class Book &lt; ApplicationRecord
  searchkick
end
```

8) Re-index để thêm data vào search index, Với mỗi lần model thay đổi hãy chạy lại lệnh này:
```
Book.reindex
```

9) Tùy chỉnh Book model để triển khai tiêu chí đối sánh từng phần bằng cách sử dụng từ khóa `word_start`:
```
class Book &lt; ApplicationRecord
  searchkick word_start: [:title, :author, :genre]
  
  def search_data
    {
      title: title,
      author: author,
      genre: genre
    }
  end
end
```

Sử dụng các tùy chọn thay thế tùy thuộc vào tiêu chí và nhu cầu của bạn:
```
:word # default
:word_start
:word_middle
:word_end
:text_start
:text_middle
:text_end
```
Tất cả những gì bạn cần là 1 ô search đuợc triển khai bằng view của rails(erb or slim,..)

### 2. Hiệu suất
Trên đây là những đặc điểm tuơng đối của Searchkick, Giờ ta hãy xem hiệu suất của nó xem sao nhé:

1) Querying và fetch mọi thứ:
```
Book.search "*"
```

2) Match theo từng phần:
```
Book.search "science fiction" # science AND fiction
```
Nếu muốn tìm kiếm cả sách khoa học và viễn tưởng:
```
Book.search "science fiction", operator: "or" # science AND fiction
```

3) Kết quả chính xác:
```
Book.search params[:q], fields:[{genre: :exact}, :title]
```

4) Match với cụm từ:
```
Book.search "Religion, Spirituality &amp; New Age", match: :phrase
```

5) Ngôn ngữ:
```
searchkick word_start: [:title, :author, :genre], language: "spanish"
```
Kiểm tra ngôn ngữ đựợc hỗ trợ [ở đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stemmer-tokenfilter.html).

6) Các model quan hệ cũng sẽ được gọi reindex:
Search theo tracking:

```
Book.search "Great expectations", track: {user_id: current_user.id}
```
Tìm kiếm tức thì và tự động hoàn thành:

```
class Book &lt; ApplicationRecord
  searchkick match: :word_start, searchable: [:title, :author]
end
```

Thêm action search trong controller:
```
class BooksController &lt; ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  
  def searchcriteria
    render json: Book.search(params[:query], {
      fields: ["title^5", "author", "genre"],
      limit: 10,
      load: false,
      misspellings: {below: 5}
    }).map(&amp;:title)
  end
end
```
Ô input search sử dung Javascrips:

```
&lt;input type="text" id="query" name="query" /&gt;
  $("#query").typeahead({
    name: "book",
    remote: "/books/search_criteria?query=%QUERY"
  });
```

9) rình tạo đề xuất:
```
class Book &lt; ApplicationRecord
  searchkick suggest: [:author, :title, :genre] # fields to generate suggestions
end
```

10) Đánh dấu các trường kết quả tìm kiếm:
```
class Book &lt; ApplicationRecord
  searchkick highlight: [:author]
end
```

11) Tạo ánh xạ tùy chỉnh và nâng cao:
```
class Book &lt; ApplicationRecord
  searchkick mappings: {
    book: {
      properties: {
        title: {type: "string", analyzer: "keyword"},
        author: {type: "string", analyzer: "keyword"}
      }
    }
  }
end
```

### III. Kết luận
Trên đây là 1 demo nho nhỏ để bạn thấy sự ưu việt và thông minh của Searchkick, Muốn hiể thêm hơn về nó bạn có thể  xem tại [Searchkick](https://github.com/ankane/searchkick#getting-started).
Hi vọng bài này có ích trong phần tìm kiếm của các bạn.

Nguồn Tham khảo:
1,  https://iridakos.com/programming/2017/12/03/elasticsearch-and-rails-tutorial
2, https://www.elastic.co/products/elasticsearch