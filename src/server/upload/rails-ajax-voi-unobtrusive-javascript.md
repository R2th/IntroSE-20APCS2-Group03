# Introduction
Bạn vẫn có thể dùng jQuery để tạo Ajax requests. Nhưng ở đây mình sẽ giới thiệu cho các bạn tạo Ajax requests với những tính năng mà Rails đã tích hợp sẵn. Kỹ thuật này được gọi là Unobtrusive JavaScript. Với những form và link có chưa `data-remote=true` thì Rails sẽ tìm kiếm những phần tử được đánh dấu là `remote` và thực hiện Ajax khi form được submit hoặc link được truy cập.
# Create a new Rails app
Tạo project mới:
````
rails new tutorialapp --skip-turbolinks
````
Thêm `gem "jquery-rails"` vào Gemfile và chạy `bundle`.

Trong file `app/assets/javascripts/application.js` 
```
//= require jquery3
//= require jquery_ujs
//= require_tree .
```

Sau đó chạy lệnh:
````
rails g scaffold Tutorial title:string url:string
```` 
Lệnh trên tạo ra một scaffold hoàn hảo cho việc thêm sửa xóa Tutorial với 2 trường là title và url. Sau đó chúng ta chạy lệnh tạo cơ sở dữ liệu và tạo file migrate
````
rails db:create
rails db:migrate
````

Chạy ứng dụng:
````
rails s
````
# Ajax in rails
Đến đây thì chúng ta đã có một ứng dụng thêm sửa xóa Tutorial trong Rails. gõ trên trình duyệt http://localhost:3000/tutorials để vào trang index.

### Add a remote form
Bài toán đặt ra ở đây là chúng ra sẽ thêm mới Tutorial ngay trên trang index và sau khi tạo thì sẽ thêm luôn vào list Tutorial ở trên mà không cần phải load lại trang.
Đầu tiên, chúng ta cần thêm vào `app/views/tutorials/index.html.erb` một form để tạo mới:
```
<h1>Tutorials</h1>

<ul id=tutorials>
  <% @tutorials.each do |tutorial| %>
    <li><%= tutorial.title %></li>
  <% end %>
</ul>

<%= form_with model: Tutorial.new, id: "ajax-tutorial" do |form| %>
  Title <%= form.text_field :title %><br>
  URL <%= form.text_field :url %><br>
  <%= form.submit %>
<% end %>
```
Bạn cần phải thêm `remote: true` vào form. nếu bạn dùng form_with thì không cần thêm vì tất cả các form được tạo bởi form_with sẽ được submit mặc định bởi Ajax. Nếu bạn không muốn sử dụng remote cho form, bạn phải thêm `local: true`. Ở đây chúng ta dùng form_with rồi nên không cần thêm nữa. HTML sinh ra sẽ là:
````
<form id="ajax-tutorial" action="/tutorials" accept-charset="UTF-8" data-remote="true" method="post">
````
### Tutorial#create action
Thông thường thì chúng ta sẽ vào trang new, sau khi create thì redirect đến trang show hoặc index. Ở đây chúng ta sẽ tạo tutorial ở trang index và sẽ thêm luôn vào list Tutorial ở trên. Trong action create chúng ta thêm `render @tutorial`. 
```
def create
    @tutorial = Tutorial.new tutorial_params

    if @tutorial.save
      render @tutorial
    else
      ......
    end
  end
```

Tạo partial `app/views/tutorials/_tutorial.html.erb` và thêm vào đoạn code sau:
```
<li><%= tutorial.title %></li>
```

Trong file `app/views/tutorials/index.html.erb`
```
<ul id="tutorials">
  <%= render @tutorials %>
</ul>
```
### Bind on ajax:success
Khi tạo xong thì tutorial vẫn chưa hiển thị trên trang. Chúng ta phải sử dụng JavaScript để hiển thị.
Trong file `app/assets/javascripts/application.js` thêm đoạn code này vào:
````
$(document).ready(function() {
  $('#ajax-tutorial').on("ajax:success", function (event, data, status, xhr) {
    var tutorial = $(xhr.responseText).hide();
    $('#tutorials').append(tutorial);
    tutorial.fadeIn(2000);
  });
});
$(document).ready(function() {
  $('#ajax-tutorial').on("ajax:success", function(event, data, status, xhr){
    $('#tutorials').append(xhr.responseText);
  });
});
````
### Delete using Ajax
Trong file `app/views/tutorials/_tutorial.html.erb`, thêm link delete cho từng bảng ghi.
```
<li data-js-tutorial-id=<%= tutorial.id %>>
  <%= tutorial.title %> <%= link_to "Delete", tutorial, remote: true, method: :delete, data: { confirm: "Are you sure you want to delete '#{tutorial.title}'?" } %>
</li>
```

Ở action destroy trong `app/controllers/tutorials_controllers.rb` 
```
def destroy
    @tutorial = Tutorial.find(params[:id])
    @tutorial.destroy
    render json: @tutorial
  end
```
Trong file `app/assets/javascripts/application.js`
```
$(document).ready(function () {
  $('#ajax-tutorial').on("ajax:success", function (event, data, status, xhr) {
    var tutorial = $(xhr.responseText).hide();
    $('#tutorials').append(tutorial);
    tutorial.fadeIn(2000);
  });
  $('[data-js-tutorial-id]').on("ajax:success", function (event, data, status, xhr) {
    var tutorial_id = xhr.responseJSON.id;
    $('[data-js-tutorial-id=' + tutorial_id + ']').hide();
  });
});
```

# Conclusion
Trên đó là cách sử dụng ajax đơn giản để tạo ra một tutorial. Ngoài ra các bạn có thể sử dụng ajax ở link_to các bạn thêm thuộc tính remote: true vào trong thẻ điển hình như edit tương tự như trên delete mình đã làm.

Nguồn: https://www.engineyard.com/blog/ajax-on-rails-with-unobtrusive-javascript?utm_source=rubyweekly&utm_medium=email