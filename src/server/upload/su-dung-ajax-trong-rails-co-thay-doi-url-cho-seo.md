# Introduction
Khi phát triển ứng dụng web bất kỳ ngôn ngữ lập trình nào, chắc ai cũng biết đến về Ajax. Ajax giúp bạn load một phần nào đó trong web mà không cần refresh lại toàn bộ trang web. 
Khi mình sử dụng Ajax, mình thấy rất hay, nhưng một vấn đề là khi sử dụng Ajax thì url không thay đổi khiến cho bạn không bookmark, copy url hoặc back browser được, ....
Trong bài viết này, mình sẽ chia sẻ về cách sử dụng Ajax với Html5 history api để cho url thay đổi như bình thường. 
Bài này mình sẽ viết một demo đơn gián Ajax với chức năng search và paginate.

# Let's start
**Gemfile**

```
gem "ransack"  //để search
gem "kaminari"  //để phân trang
```

Cách install gem trên, bạn có thể vào github của nó để đọc thêm.

**model**
```
rails generate model Product name:string
```
**routes**
```
Rails.application.routes.draw do
  resources :products, only: :index
end
```

**controller**
```
rails generate controller Products index
```
```
// app/controllers/products_controller.rb

class ProductsController < ApplicationController
  def index
    @q = Product.ransack params[:q]
    @products = @q.result.page(params[:page]).per 10
    respond_to do |format|
      format.js
      format.html
    end
  end
end
```

**views**

```
// app/views/products/index/html.erb

<%= search_form_for @q, remote: true do |f| %>
  <%= f.label :name_cont %>
  <%= f.search_field :name_cont %>
  <%= f.submit "Submit", class: "submit" %>
<% end %>

<h3>Product lists</h3>
<ul class="product-list">
  <%= render partial: "product", collection: @products %>
</ul>
<div class="paginate">
  <%= paginate @products, remote: true %>
</div>
```

```
// app/views/products/index.js

$(".product-list").html("<%= j render partial: "product", collection: @products %>");
$(".paginate").html("<%= j paginate @products, remote: true %>");
```

Đến đây, `rails server` => http://localhost:3000/products 

bạn sẽ chạy được chức năng search và paginate với Ajax.

![](https://images.viblo.asia/fd365591-d3cc-4570-bd39-b2fc92988722.png)

**Áp dụng Html5 history api**

`html5 history api` cho phép bạn thao tác với history trong browser rất dể dàng. 
Chi tiết doc của nó: https://developer.mozilla.org/en-US/docs/Web/API/History_API

Ở đây mình sẽ sử dụng method: `pushState()` để push url mới vào history của browser.
pushState(state, title, url) nhận 3 parameters: 
* state: object
* title: string
* url: string

Như vậy, khi click phân trang hoặc search, rails sẽ thực hiện gọi Ajax (remote: true) đồng thời mình sẽ dùng javascript để push history cho browser.

```
$(document).on("turbolinks:load", function() {
  execute();
});

function execute() {
  $(".pagination a").on("click", function() {
    history.pushState(null, null, $(this).attr("href")); // lấy url trong href để push
  });

  $("#product_search .submit").on("click", function() {
  // tạo url = form action + params lấy từ form sử dụng .serialize()
    var url = $("#product_search").attr("action") + "?" + $("#product_search").serialize(); 
    history.pushState(null, null, url);
  });
}
```

Note: sau khi ajax render lại view rồi, bạn cần bind event này lại, gọi thêm  `execute(); ` vào trong `app/views/products/index.js`. 

Refresh lại, bạn sẽ thấy url đã thay đổi khi search hoặc phân trang. Nhưng nếu back lại browser, url back về cũ nhưng view không thay đổi gì cả. 
Ở đây, bạn phải thực hiện gọi Ajax khi người dùng back browser. 

thêm vào js trên.

```
  $(window).on("popstate", function() {
    $.get(location.href);
  });
```

Done! chạy lại bạn sẽ được kết quả như mong muốn.

# References:
http://railscasts.com/episodes/246-ajax-history-state

https://developer.mozilla.org/en-US/docs/Web/API/History_API

http://codebeerstartups.com/2013/02/change-browser-url-in-case-of-ajax-request-using-html5-pushstate/