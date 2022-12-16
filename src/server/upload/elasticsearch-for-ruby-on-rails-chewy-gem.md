Elasticsearch là một công cụ tìm kiếm dựa trên phần mềm Lucene. Nó cung cấp một bộ máy tìm kiếm dạng phân tán, có đầy đủ công cụ với một giao diện web HTTP có hỗ trợ dữ liệu JSON.

Việc giao tiếp với thư viện Elasticsearch hoàn toàn có thể thực hiện qua giao thức HTTP, để tiện hơn, các framework thường có những plugin riêng để hỗ trợ việc giao tiếp với server Elasticsearch, chuyển các câu lệnh của ngôn ngữ lập trình trở thành các truy vấn HTTP. Với Rails chúng ta có các gem elasticsearch-ruby, elasticsearch-rails và chewy. Bài viết này sẽ hướng dẫn cách cài đặt và sử dụng cơ bản của chewy.

## Chewy
-Chewy được phát triển dựa trên nền tảng của elasticsearch-ruby, giúp cho việc sử dụng elasticsearch trở nên dễ dàng hơn cho các lập trình viên Ruby On Rails.
-Những tính năng nổi bật của Chewy:

1. **Multi-model indexes:** Cho phép index ở nhiều model có liên hệ với nhau
2. **Every index is observable by all the related models:** Hầu hết các model được tạo ra đều có quan hệ với nhau. Đôi khi, ta cần phải giữ nguyên sự liên kết các dữ liệu trong khi đánh index.

3. **Import dữ liệu lớn:** Có thể đánh index cho lượng lớn dữ liệu hay đánh index lại toàn bộ db và cả update việc đánh index.

4. **Powerful querying DSL:** Hỗ trợ tối đa các query chainable, mergable and lazy.

5. **ORM:** Support for ActiveRecord, Mongoid and Sequel.
## Installation
Thêm dòng sau vào Gemfile:

`gem 'chewy'`

và chạy lệnh:

`$ bundle`

hoặc chạy lệnh sau trong thư mục ứng dụng:

`$ gem install chewy`

## Settings
chạy lệnh `rails g chewy:install` để sinh ra file setting.
```
# config/initializers/chewy.rb
Chewy.settings = {host: 'localhost:9250'} # không sử dụng môi trường
```

```
# config/chewy.yml
# khi có sử dụng các môi trường
test:
  host: 'localhost:9250'
  prefix: 'test'
development:
  host: 'localhost:9200'
```
Vậy là việc settings đã xong, bây giờ chúng ta có thể dễ dàng sử dụng nó

## Đánh index và query data
Để giới thiệu về cách đánh index và query data, mình đưa ra 3 model như sau:
```
class User < ApplicationRecord
  has_many :documents
end
```
```
class Document < ApplicationRecord
  belongs_to :user
  
  has_many :comments
end
```
```
class Comment < ApplicationRecord
  belongs_to :document
end
``` 
-Bây giờ chúng ta sẽ đánh index để có thể query các document theo từng thuộc tính của nó, hoặc thông qua content của comments hoặc tên của user nhé.
-Để sử dụng ES chúng ta làm các bước như sau:

1. Tạo file `/app/chewy/documents_index.rb`
```
class DocumentsIndex < Chewy::Index

end
```
2. Settings cách query data
```
settings analysis: {
   tokenizer: {
      custom_tokenizer: {
        type: :nGram,
        min_gram: 1,
        max_gram: 5,
        token_chars: %w(letter digit whitespace punctuation symbol)
      }
    },
    analyzer: {
      custom_analyzer: {
        type: :custom,
        tokenizer: :custom_tokenizer,
        filter: :lowercase
      }
    }
 }
```
**type nGram**: như search `LIKE` trong sql.

**min_gram**: số ký tự tối thiểu mà nó sẽ cắt trong các kết quả để search.

**max_gram**: số ký tự tối đa mà nó sẽ cắt trong kết quả để search.

**token_chars**: các loại thành phần cho phép để search.
* letter —  for example a, b, ï or 京
* digit —  for example 3 or 7
* whitespace —  for example " " or "\n"
* punctuation — for example ! or "
* symbol —  for example $ or √

**filter**: cho phép search theo cả chữ hoa và chữ thường.

-Để hiểu rõ hơn về các option settings các bạn có thể xem thêm ở [đây](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-tokenizers.html).

-Chúng ta có thể bỏ thẳng đoạn code trên vào class DocumentsIndex hoặc bỏ vào class Setting riêng để sau đó include vào DocumentsIndex để có thể sử dụng lại.

3. Khai báo các kiểu đánh index
```
define_type Document.includes(:user, :comments) do
    field :name_document, analyzer: :custom_analyzer # đánh index cho trường thuộc document
    field :comments, type: :nested do
      field :content, analyzer: :custom_analyzer # đánh index cho trường hợp nested
    end
    field :user_name, value: ->{user.name}, analyzer: :custom_analyzer # đánh index cho trường nằm trong belongs_to
end
```
- `analyzer: :custom_analyzer` option thêm vào để search theo settings chúng ta đã include ở tren vào

4. Tự động cập nhật index khi có thay đổi trong bảng document
```
class Document < ApplicationRecord
  update_index("documents#document") { self }
  
  belongs_to :user
  
  has_many :comments
end
```
- index sẽ tự động import sau khi chúng ta thêm mới, hoặc uodate 1 record trong table document.
5. Thực hiện đánh index.
```
DocumentsIndex.create!
DocumentsIndex.import
```
Hoặc sử dụng
```
DocumentsIndex.reset!
```
Vậy là các bước đánh index đã hoàn thành. Bây giờ chúng ta sẽ sử dụng câu lệnh để query data ra nhé :D
- query theo tên của document
```
DocumentsIndex.query(term: {name_document: 'have'}).to_a
```
- query theo têm của user(belongs_to)
```
DocumentsIndex.query(user_name: {user: 'phan'}).to_a
```
**note**: Nếu data query là "phan d" thì sẽ không cho ra kết quả, vì ở trên chúng ta settings max_gram là 5 ký tự 
- query theo nội dung comment(nested)
```
DocumentsIndex.query({ nested: { path: "comments", query: { term: { "comments.content": "lam" } } } }).to_a
```
## KẾT LUẬN
Trên đây mình chỉ giới thiệu những cài đặt cơ bản và dễ sử dụng của Chewy nhưng sức mạnh của Chewy không chỉ dừng lại ở đó. Để tìm hiểu sâu hơn về nó các bạn có thể tìm hiểu ở [đây](https://github.com/toptal/chewy) Thanks you for reading !!!