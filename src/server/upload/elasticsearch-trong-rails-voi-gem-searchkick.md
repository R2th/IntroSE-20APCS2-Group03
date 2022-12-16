## Giới thiệu về Elasticsearch
* ES được gọi là "search & analyze in real time" là vì nó có khả năng trả về kết quả tìm kiếm một cách nhanh hóng và chính xác trong một nguồn dữ liệu lớn (big data source)
* ES là một công cụ tìm kiếm dựa trên phần mềm Lucene.
* ES có thể tích hợp vào các ứng dụng được xây dựng trên các ngôn ngữ như: Ruby, Java, PHP, .Net, Perl, Python, JavaScript, Groovy.
* ES được phát triển bằng Java và được phát hành dạng nguồn mở theo giấy phép Apache.

## Khi nào nên dùng Elasticsearch
* Tìm kiếm text thông thường - Searching for pure text (textual search)
* Tìm kiếm text và dữ liệu có cấu trúc - Searching text and structured data (product search by name + properties)
* Tổng hợp dữ liệu - Data aggregation
* Tìm kiếm theo tọa độ - Geo Search
* Lưu trữ dữ liệu theo dạng JSON - JSON document storage

## Gem Searchkick
Trong bài viết này, mình muốn đề cập đén searchkick - gem hỗ trợ tìm kiếm rất tốt, dễ sử dụng và còn quen thuộc hơn với Ruby dev.
Các ưu điểm của gem searchkick:
* Truy vấn giống như SQL- mà bạn không cần phải học 1 ngôn ngữ truy vấn mới
* Reindex không có thời gian chết
* Dễ dàng sử dụng
* Làm việc với ActiveRecord, Mongoid, and NoBrainer

## Cài đặt
Trước hết các bạn cần cài đặt Elasticsearch, vào https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-ubuntu-16-04.html để tham khảo cách cài đặt.

Cài đặt gem searchkick thì chỉ cần thêm khai báo vào Gemfile và tiến hành bundle
```
# Gemfile
gem 'searchkick'
```

Thêm module `searchkick` vào model nào cần dùng để tìm kiếm.

Để index dữ liệu của model lên server ES ta dùng lệnh trong console:
```
Model.reindex
```

## Cách dùng
Gọi hàm search từ controller. Ví dụ:

```
class ProductsController < ApplicationController
  def index
    if params[:query].present?
      @products = Product.search params[:query]
    else
      @products = Product.all
    end
  end
end
```

Thêm form search trong view

```
<div>
  <%= form_tag "/products", method: :get, class: "form-inline" do %>
    <%= text_field_tag "query", params[:query], class: "form-control" %>
    <%= submit_tag "Search" %>
  <% end %>
</div>
```

### Phân trang
Kết quả tìm kiếm có thể dễ dàng được phân trang với param `page` và `per_page`

```
@models = Model.search params[:query], page: params[:page], per_page: 15
```

### Tìm kiếm từng phần
Mặc định, kết quả tìm kiếm phải khớp với tất cả các từ trong đầu vào (mặc định sử dụng phép toán `AND`). ví dụ:

```
Product.search 'fresh honey' # fresh AND honey
```

Để tìm kiếm được từng phần của đầu vào thì bạn hãy thêm key `operator: 'or'` vào phương thức `search`.

```
@models = Model.search params[:query], operator: "or"
```

### Thêm chức năng Highlight
Thêm vào module searchkick trong model

```
class Model < ActiveRecord::Base
  searchkick  highlight: [:content]
end
```

Sau đó reindex lại `Model.reindex`

Sửa hàm search trong controller

```
@models = Model.search params[:query], fields: [:content], highlight: true
```

Hiển thị trong view:

```
models.with_highlights.each do |model, highlights|
  highlights[:content] 
end
```

Chúng ta có thể chỉ định trường muốn search:

```
Model.search "cinema", fields: [:content], highlight: {fields: [:content]}
```

### search_data
Để kiểm soát những dữ liệu nào sẽ được đánh index thì ta dùng hàm `search_data` trong model, ví dụ:

```
def search_data
    {
      content: content,
      category_id: category_id,
      created_at: created_at
    }
 end
```

## Khi nào cần reindex lại
Trong một số trường hợp thì bạn cần phải tiến hành đánh lại index cho model của mình bằng method `.reindex`:

* Khi bạn cài đặt hoặc nâng cấp phiên bản `searchkick`.
* Khi thay đổi method `search_data`
* Khi bạn thay đổi method khai báo `searchkick`.

Cảm ơn bạn đã đọc bài viết.

## Tài liệu tham khảo

https://github.com/ankane/searchkick

http://searchkick.org/

https://www.elastic.co/guide/index.html