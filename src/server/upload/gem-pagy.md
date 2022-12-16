# 1. Introduction:
- Gem `pagy` được sử dụng để paging trong Ruby on Rails
- Gem `pagy` thể hiện nhiều ưu điểm hơn so với các gem khác như `will_paginate` hoặc `kaminari`
# 2. Install:
- Thêm gem `pagy`vào `Gemfile` 
    ```ruby
    # Gemfile
    gem "pagy"
    ```
- Chạy command để install gem
    ```sh
    bundle install
    ```

- Thêm `pagy.rb` vào file `config/initializer/pagy.rb`
- Bạn có thể tham khảo file mẫu tại [đây](https://github.com/ddnexus/pagy/blob/master/lib/config/pagy.rb)

- Thêm `include Pagy::Frontend` vào `application_controller.rb`
    ```ruby
    # app/controllers/application_controller.rb
    class ApplicationController < ActionController::Base
      include Pagy::Backend
    end
    ```

- Thêm `include Pagy::Frontend` vào `application_helper.rb`
    ```ruby
    # app/helpers/application_helper.rb
    module ApplicationHelper
      include Pagy::Frontend
    end
    ```

# 3. Basic Usage:
- Sử dụng `pagy` method trong controller
    ```ruby
    # app/controller/books_controller.rb
     @pagy, @books = pagy(Book.all)
    ```

- Thêm `require "pagy/extras/bootstrap"` vào pagy.rb
- Sử dụng `pagy_bootstrap_nav` helper trong view
    ```ruby
    # app/views/books/index.html.erb
    <%== pagy_bootstrap_nav(@pagy) %>
    ```

- Kết quả thu được
![](https://images.viblo.asia/00b09353-71a7-4817-828b-5ac853341928.png)

# 4. Advance Usage:
## a. Backend Extras:
- Theo ví dụ trên, gem `pagy` đang thực hiện pagination với `ActiveRecord_Relation` được trả về bởi `Book.all`.
- Tuy nhiên `pagy` cũng có thể thực hiện pagination với các kiểu dữ liệu khác có cấu trúc tương tự (dạng array).
- Để sử dụng chức năng này cần thêm các extra của gem `pagy` vào file `pagy.rb`
- Ví dụ với cấu trúc kiểu [Array](https://ddnexus.github.io/pagy/extras/array)
    ```ruby
     # config/initializer/pagy.rb
     require "pagy/extras/array"

     # app/controller/books_controller.rb
     @pagy, @books = pagy_array(Book.all)
     @pagy, @books = pagy_array(Book.all.to_a)
    ```
- Ta có thể thực hiện tương tự với [Elasticsearch Rails](https://ddnexus.github.io/pagy/extras/elasticsearch_rails), [Searchkick](https://ddnexus.github.io/pagy/extras/searchkick)

- Tham khảo các backend extras khác tại [đây](https://github.com/ddnexus/pagy#backend-extras)

## b. Frontend Extras:
- Gem `pagy` cung cấp các helper method để render pagination trên Front-end
- Ví dụ
    ```ruby
    # app/views/books/index.html.erb
    <%== pagy_nav(@pagy) %>
    ```
- Gem `pagy` cung cấp các front extra và các helper method tương ứng tùy theo thư viện để render pagination trên Front-end
- Ví dụ sử dụng [bootstrap](https://ddnexus.github.io/pagy/extras/bootstrap)
    ```ruby
     # config/initializer/pagy.rb
     require "pagy/extras/bootstrap"

     # app/views/books/index.html.erb
     <%== pagy_bootstrap_nav(@pagy) %>
    ```
- Bạn có thể tham khảo template gốc của gen `pagy` và custom lại theo nhu cầu
- Tham khảo template gốc của `pagy` cho bootstrap [tại đây](https://github.com/ddnexus/pagy/blob/master/lib/templates/bootstrap_nav.html.erb)  
- Ví dụ
    ```ruby
    # app/views/books/index.html.erb
     <%== render partial: 'pagy/bootstrap_nav', locals: {pagy: @pagy} %>
    ```
- Một số method của Pagy Object được sử dụng trong template
    ```ruby
    count: tổng số record
    page: page hiện tại 
    items: số lượng record của mỗi page
    pages: tổng số page
    last: page cuối cùng
    offset:
    from: index của record đầu tiên trong page (tính từ 1)
    to: index của record cuối cùng trong page (thường trùng với page.items)
    prev: page trước
    next: page sau
    ```
- Tham khảo các front extras khác tại [đây](https://github.com/ddnexus/pagy#frontend-extras)

## c. Feature Extras:
### i. I18n:
- Tham khảo các file i18n có sẵn tại [đây](https://github.com/ddnexus/pagy/tree/master/lib/locales)
- `Pagy` cung cấp method `pagy_t` tương tự như method `I18n.t`
- Method `pagy_t` nhanh hơn so với method `I18n.t`
    ```ruby
    # config/initializer/pagy.rb
    require "pagy/extras/i18n"

    # app/views/books/index.html.erb
    <%= pagy_t("pagy.nav.prev") %>
    ```
- Tham khảo thêm tại [đây](https://ddnexus.github.io/pagy/extras/i18n)
### ii. items:
- Sử dụng method `pagy` với option `items` để quy định số record trả về mỗi page
- Ví dụ
    ```ruby
    # config/initializer/pagy.rb
    require "pagy/extras/items"

    # app/controller/books_controller.rb
    @pagy, @books = pagy(Book.all, items: 30)
    ```
- Bạn có thể quy định số items mặc định trong `pagy.rb`
    ```ruby
    # config/initializer/pagy.rb

    Pagy::VARS[:items] = 20
    ```
### iii. overflow:
- Sử dụng method `pagy` với option `overflow` để quy định số behaviour trả về khi truy cập quá số page cho phép
- Ví dụ
    ```ruby
    # config/initializer/pagy.rb
    require "pagy/extras/overflow"

    # app/controller/books_controller.rb
    @pagy, @books = pagy(Book.all, overflow: exception)
    ```
- Bạn có thể quy định số items mặc định trong `pagy.rb`
    ```ruby
    # config/initializer/pagy.rb

    Pagy::VARS[:overflow] = :exception
    ```
- Các options có thể là
    ```ruby
    empty_page: trả về mảng rỗng cho paging
    last_page: trả về record của page cuối cùng cho paging
    exception: raise Pagy::OverflowError
    ```
    
- Tham khảo các feature extra khác tại [đây](https://github.com/ddnexus/pagy#feature-extras)

# 5. Link demo
- Github: https://github.com/thanhlt-1007/demo_pagy