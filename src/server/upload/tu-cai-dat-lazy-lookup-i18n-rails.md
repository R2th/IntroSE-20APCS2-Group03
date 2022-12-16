#### 1. "Lazy" Lookup
Rails đã cài đặt một cách thuận tiện để tìm kiếm phần dịch theo ngôn ngữ (translate) ở trong views. Khi bạn có 1 từ điển như sau:

```yml
en:
  books:
    index:
      title: "Title"
```

Bạn có thể sử dụng với dạng đầy đủ cơ bản của I18n như sau: `I18n.t('books.index.title')`. 

Tuy nhiên sử dụng như vậy khá là dài dòng và không theo một cấu trúc nhất định. Khi sử dụng trong views ` app/views/books/index.html.erb` Rails cung cấp một một dạng ngắn gọn và đơn giản hơn như sau:

```ruby
<%= t ".title" %>
```
Nhìn qua bạn có thể liên tưởng nó giống với [relative path](https://stackoverflow.com/questions/21306512/difference-between-relative-path-and-absolute-path-in-javascript) khi thao tác với các file.

Như vậy khi gọi `t ".title"` ở trong view `app/views/books/index.html.erb` thì Rails sẽ tìm đến i18n key đầy đủ là `books.index.title`. Một ví dụ khác nếu ở view `app/views/books/book_item.html.erb` ta gọi `t ".name"` thì i18n key trong trường hợp này sẽ là `books.book_item.name`.

Không chỉ áp dụng trong Views bạn có thể sử dụng "Lazy" Lookup ở cả trong controller nữa

```yml
en:
  books:
    create:
      success: Book created!
```
Trong controller sẽ sử dụng như sau
```ruby
class BooksController < ApplicationController
  def create
    # ...
    redirect_to books_url, notice: t('.success')
  end
end
```

#### 2. Tự cài đặt "Lazy" Lookup cho riêng mình

Tuy nhiên nếu bạn muốn sử dụng "Lazy" Lookup trong các service object thì làm thế nào. Ví dụ ta có service như sau
```yml
en:
  module_name1:
    module_name2:
      example_service:
        params_invalid: Params invalid
```
```ruby
module ModuleName1
  module ModuleName2
    class ExampleService
      def call params
        raise ArgumentError.new(
          I18n.t('module_name1.module_name2.example_service.params_invalid')
        )
      end
    end
  end
end
```
Có thể thấy đoạn mã sử dụng i18n đầy đủ key theo đúng cấu trúc khá là dài dòng và nhìn có phần phức tạp. Ta sẽ cài đặt phương thức `t` giống với trong views làm sao khi sử dụng sẽ được như sau

```ruby
module ModuleName1
  module ModuleName2
    class ExampleService
      def call params
        # expect use like this
        raise ArgumentError.new t('.params_invalid')
      end
    end
  end
end
```

Để thực hiện việc đó ta sẽ viết một module `LazyLookupI18n` như sau
```ruby
# frozen_string_literal: true

module LazyLookupI18n
  extend ActiveSupport::Concern

  class_methods do
    def t i18n_key, options = {}
      if superclass != Object
        super_prefix_key = superclass.name.underscore.tr "/", "."
        default = I18n.t("#{super_prefix_key}#{i18n_key}", options)
      end

      prefix_key = name.underscore.tr "/", "."
      I18n.t("#{prefix_key}#{i18n_key}", options.merge(default: default))
    end
  end

  def t i18n_key, options = {}
    self.class.t i18n_key, options
  end
end
```
Khi sử dụng ta chỉ việc include module này vào là OK

```ruby
module ModuleName1
  module ModuleName2
    class ExampleService
      include LazyLookupI18n

      def call params
        raise ArgumentError.new t('.params_invalid')
      end
    end
  end
end
```

Như vậy sử dụng Lazy Lookup sẽ giúp cho cấu trúc i18n của bạn rõ ràng và sử dụng cũng ngắn gọn hơn rất nhiều.

#### Tham khảo 

1. [Lazy Lookup](https://guides.rubyonrails.org/i18n.html#lazy-lookup)