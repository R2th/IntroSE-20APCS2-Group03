![](https://images.viblo.asia/ff8beb2d-8f40-45a0-a997-90a28c3768df.png)

# 1. Giới thiệu
Pagy là gem dùng để phân trang, tuy nhiên tốc độ tìm kiếm thì tối ưu hơn hẳn so với kaminari và will_paginate.

Pagy hỗ trợ các template như pagy_nav, pagy_bootstrap_nav, pagy_bulma_nav để cho việc hiển thị dễ dàng hơn, tuy nhiên với việc phải đồng bộ với design về việc hiển thị phân trang thì phải custom lại một chút về HTML của pagination. Vậy làm sao để thực hiện việc đó? cùng tìm hiểu nha!
# 2. Các bước cài đặt gem Pagy
* B1: Thêm pagy gem vào file Gemfile:
`gem “pagy”`
* B2: Chạy `bundle install`
* > B3: Include trong app/controllers/application_controller.rb
```
class ApplicationController < ActionController::Base
  include Pagy::Backend
end
```
* B4: Include trong `app/helpers/application_helper.rb`
```
module ApplicationHelper
  include Pagy::Frontend
end
```
# 3. Custom HTML pagination
* **B1: Custom HTML**

Sau khi cài đặt xong, chúng ta bước vào phần quan trọng nhất nào:

Pagy hỗ trợ template HTML để chỉnh sửa. 
Copy [template content](https://github.com/ddnexus/pagy/blob/master/lib/templates/nav.html.erb) và tạo file trong app/view/shared/ _pagination.html.erb
```
<% link = pagy_link_proc(pagy) %>
<nav aria-label="pager" class="table-pagination" role="navigation">
  <ul class="pagination">
    <% if pagy.prev %>
      <li class="page-item">
        <%== link.call(pagy.prev, '<span class="icon-ic-arrow-left page-link__previous" aria-hidden="true"></span>', 'aria-label="previous" class="page-link"') %>
      </li>
    <% else %>
      <li class="page-item disabled">
        <%==link.call(1, '<span class="icon-ic-arrow-left page-link__previous" aria-hidden="true"></span>', 'class="page-link"') %>
      </li>
    <% end %>
    <% pagy.series.each do |item| %>
      <% if item.is_a?(Integer) %>
        <li class="page-item">
          <%== link.call(item, item, 'class=page-link') %>
        </li>
      <% elsif item.is_a?(String) %>
        <li class="page-item active">
          <%= link_to(item, "javascript:void(0)", class: "page-link") %>
        </li>
      <% elsif item == :gap %>
      <li class="page-item disabled">
          <%== link_to("...", "javascript:void(0)", class: "page-link") %>
        </li>
      <% end %>
    <% end %>
    <% if pagy.next %>
      <li class="page-item">
        <%== link.call(pagy.next, '<span class="icon-ic-arrow-right page-link__next" aria-hidden="true"></span>', 'aria-label="next" class="page-link"') %>
      </li>
    <% else %>
      <li class="page-item disabled">
        <%== link.call(pagy.last, '<span class="icon-ic-arrow-right page-link__next" aria-hidden="true"></span>', 'class="page-link"') %>
      </li>
    <% end %>
  </ul>
</nav>
```

Sau đó bạn có thể chỉnh sửa HTML theo design của bạn. Pagy cũng hỗ trợ markup cho [slim](https://github.com/ddnexus/pagy/blob/master/lib/templates/nav.html.slim) và [HAML](https://github.com/ddnexus/pagy/blob/master/lib/templates/nav.html.haml) chọn một trong số đó copy và sửa trong project của bạn nhé.

Thêm một chút CSS:
```
.table-pagination {
  display: flex;
  justify-content: flex-end;

  @include respond-to('tablet-and-down') {
    justify-content: center;
  }

  .pagination {
    margin: 23px 15px;
  }

  .page-link {
    align-items: center;
    border: 0;
    border-radius: $border-radius-small;
    color: $grey-color-2;
    display: inline-flex;
    height: 32px;
    justify-content: center;
    margin: 0 5px;
    min-width: 32px;
    padding: 0 10px;

    &:focus {
      box-shadow: none;
    }

    &__previous,
    &__next {
      font-size: $font-size-xsmall;
    }
  }

  .page-item.active .page-link {
    background: $blue-color-3;
  }
}
```


* **B2: Trong Controller**
```
class UsersController < ApplicationController
  def index
    @pagy, @users = pagy(User.all.order(created_at: :desc))
  end
end
```

Nếu bạn viết như này thì pagy để giá trị mặc định bản ghi là tất cả User.

Vậy để lấy ra bản ghi theo ý mình thì sao đây? 

Có 2 cách là:

Ex: Mình muốn lấy ra 10 bản ghi cho mỗi trang

**Cách 1:** Tạo file `app/config/initializers/pagy.rb`

`Pagy::VARS[:items] = 10`

**Cách 2**: Viết trực tiếp vào trong controller

`@pagy, @users = pagy(User.all.order(created_at: :desc), items: 10)`

* **B3: Trong View**

`<%== render partial: 'pagy/pagination', locals: {pagy: @pagy} %>`

Và đây là kết quả: ![](https://images.viblo.asia/b8c7c888-711b-4a3e-9f2c-56fbdc6c61c6.png)


Link tham khảo: https://github.com/ddnexus/pagy