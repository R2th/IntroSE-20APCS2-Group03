## I. Giới thiệu
###  Thư viện datatable.js
[Jquery DataTables plugin](https://datatables.net). là một plugin rất mạnh cho jquery, khi cần phải list dữ liệu hiển thị ra table html mà không phải render lại toàn bộ trang. Để sử dụng bạn cần download về và cho vào assets pipeline:

assets/javascripts/application.js
```ruby
# assets/javascripts/jquery-datatable.js
//= require dataTables/jquery.dataTables
```
```ruby
# assets/stylesheets/application.css
*= require dataTables/jquery.dataTables
```

**Bạn cũng có thể sử dụng gem** [jquery-datatables-rails](https://github.com/rweng/jquery-datatables-rails) 
1 - Thêm vào Gemfile:
```ruby
gem 'jquery-datatables-rails', '~> 3.4.0'
```
2 - Cài gem:
```ruby
bundle install
```
3 - Generate assets:
```ruby
$ rails generate jquery:datatables:install
```
Hoặc thêm vào asset file tương ứng
```ruby
 #app/assets/javascripts/application.js
//= require dataTables/jquery.dataTables
```
```ruby
#app/assets/stylesheets/application.css
*= require dataTables/jquery.dataTables
```
###  Gem ajax-datatables-rails
**[ajax-datatables-rails](https://github.com/jbox-web/ajax-datatables-rails)**
Để sử dụng Gem này bạn cần thêm gem 'ajax-datatables-rails' vào trong Gemfile và chạy bundle install để cập nhật các gói thư viện cho Rails.

Thêm dòng dưới này vào gemfile của bạn:
```ruby
gem 'ajax-datatables-rails'
```
Chạy dòng dưới:
```ruby
$ bundle install
```

###  Gem ransack
Đây là gem hỗ sợ query data rất mạnh của rails. Hãy thêm vào Gemfile và bundle:
```ruby
gem 'ransack'
```
```ruby
$ bundle install
```
## II. Sử dụng
###  1. Gọi ajax với datatable js
Bước này trở nên rất dễ chịu khi bạn chỉ cần vẽ 1 cái table html với cái thẻ tbody trống không.

> app/views/posts/index.html.erb
```html
...
<table id="datatable" data-source="<%= posts_path(format: :json) %>">
  <thead>
      <tr>
        <th><%= t ".post_id" %></th>
        <th><%= t ".post_name" %></th>
      </tr>
  </thead>
  <tbody>
  </tbody>
</table>
<script>
  <%= render "datatable.js" %>
</script>
```
file datatable.js sẽ xử lý request đến server lấy dữ liệu dạng json và hiển thị trong thẻ tbody.
```js
$(document).ready(function() {
  function call_datatable() {
      $("#datatable").dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": $("#datatable").data("source"),
        "pagingType": "simple_numbers",
        "columns": [
          {"data": "id"},
          {"data": "name"}
        ],
        "searching": false,
        "stateSave": false,
        "destroy": true
        }
      });
  };

  call_datatable();
});
```
fuction *call_datatable();* sẽ gọi đến controller qua url: *$("#datatable").data("source")*
```ruby
class PostsController < ApplicationController
  def index
    respond_to do |format|
      format.html{@q = Company.ransack}
      format.json{render json: post_datatable}
    end
  end

  def post_datatable
    PostDatatable.new params, view_context: view_context
  end
end
```
###  2. Trả về data
Trọng tâm của bài viết là cách kết hợp AjaxDatatable với jquery-datatable.
**với class kê thừa AjaxDatatablesRails::ActiveRecord ta cần query đúng data và trả về đúng kiểu dữ liệu cho jquery-datatable**:

```ruby
# app/datatables/post_datatable.rb
class PostDatatable < AjaxDatatablesRails::ActiveRecord
  extend Forwardable
  include Admin::PostHelper
  def_delegators :@view, :link_to, :link_to_if, :edit_post_path, :content_tag

  def initialize params, opts = {}
    @view = opts[:view_context]
    super
  end

  def view_columns
    @view_columns ||= {
      id: { source: "Post.id", searchable: false },
      name: { source: "Post.name", searchable: false },
      user_name: { source: "User.name", searchable: false}
    }
  end

  private
  def data
    records.map do |record|
      {
        id: record.id,
        name: record.name
      }
    end
  end

  def get_raw_records
    Post.all
  end
end
```
Giải thích:
- Tối thiểu cần có 3 method trong class PostDatatable đó là **view_columns**, **data**, **get_raw_records**
    - *viewcolumns* định nghĩa cấu trúc data được trả về cho jquery-datatable
    - *data* map dữ liệu lấy được bởi method *get_raw_records* với *viewcolumns*
    - *get_raw_records* lấy dữ liệu
- Để sử dụng helper và các ActionViewHelper method cần khai báo như sau:
    - Để include được helper cần *extend Forwardable*
    - def_delegators cần sử dụng view helper method nào phải delegate từ view_context được truyền vào từ controller.
```ruby
  extend Forwardable
  include Admin::PostHelper
  def_delegators :@view, :link_to, :link_to_if, :edit_post_path, :content_tag

  def initialize params, opts = {}
    @view = opts[:view_context]
    super
  end
- params được truyền từ controller để dùng ransack query
```
- để custom các thông tin như: tổng số bản ghi bạn có thể thêm:
```ruby
   def as_json(options = {})
    {
      draw: params[:draw].to_i,
      recordsTotal: total_count,
      recordsFiltered: total_count,
      data: data
    }
  end
  
  def total_count
    get_raw_records.count(:all)
  end
```
###  3. query bằng ransack
Model Post:
> app/models/post.rb
```ruby
class Post < ActiveRecord::Base
  belongs_to :author
  belongs_to :topic
  has_many: :comments
  
  ransacker :id do
    Arel.sql "CONVERT(#{table_name}.id, CHAR(8))"
  end
  ransacker :name do
    arel_table[:name].lower
  end

  ransack_alias :author, :author_first_name_or_author_last_name
end
```
Form Search:
> app/views/posts/index.html.erb
```html
<%= search_form_for Post.ransack, remote: true, id: :form_search_datatable do |f| %>
  <div class="row">
    <div class="col-md-4">
      <%= f.label :id_or_name_cont, "id or name") %>
      <%= f.search_field :id_or_name_cont, placeholder: "id or name" %>
    </div>
    <div class="col-md-4">
      <%= f.label :comments_content_cont, "has comments content" %>
      <%= f.search_field :comments_content_cont, placeholder: "has comments content" %>
    </div>
    <div class="col-md-4">
      <%= f.label :author_cont, "author" %>
      <%= f.search_field :author_cont %>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4">
      <%= f.label :topic_id_eq, "has topic" %>
      <%= f.select :topic_id_eq, (Topic.pluck :name, :id), {include_blank: true}, placeholder: "has topic" %>
    </div>
    <div class="col-md-4">
      <%= f.label :content_cont, "content cont" %>
      <%= f.search_field :content_cont, placeholder: "contentcont" %>
    </div>
  </div>
<% end %>

<table id="datatable" data-source="<%= posts_path(format: :json) %>">
 ...
```
> app/views/posts/_datatable.js
```js
$(document).ready(function() {
  var params = $("#form_search_datatable :input").serialize();
  function call_datatable() {
     ...
     ajax: $("#datatable").data("source").concat("?" + params),
     ...
  };

  call_datatable();
  
  $("body").on("change keyup", "#form_search_datatable :input", function(){
    call_datatable();
  });
});
```
> app/datatables/post_datatable.rb
```ruby
# app/datatables/post_datatable.rb
class PostDatatable < AjaxDatatablesRails::ActiveRecord
  ...
  
  def get_raw_records
    Post.joins(:user).ransack(params[:q]).result distinct: true
  end
end
```
## III. Vài tip sử dụng jquery datatable js có thể hữu ích
-  Datatable.js

custom [cấu trúc](https://stackoverflow.com/questions/39639587/datatables-numbers-length-3-change-pagination-buttons) thanh phân trang:
```
"pagingType": "simple_numbers_no_ellipses",
```
> simple_numbers_no_ellipses.js
```js
$.fn.DataTable.ext.pager.numbers_no_ellipses = function(page, pages){
   var numbers = [];
   var buttons = $.fn.DataTable.ext.pager.numbers_length;
   var half = Math.floor( buttons / 2 );

   var _range = function ( len, start ){
      var end;

      if ( typeof start === "undefined" ){
         start = 0;
         end = len;

      } else {
         end = start;
         start = len;
      }

      var out = [];
      for ( var i = start ; i < end; i++ ){ out.push(i); }

      return out;
   };


   if ( pages <= buttons ) {
      numbers = _range( 0, pages );

   } else if ( page <= half ) {
      numbers = _range( 0, buttons);

   } else if ( page >= pages - 1 - half ) {
      numbers = _range( pages - buttons, pages );

   } else {
      numbers = _range( page - half, page + half + 1);
   }

   numbers.DT_el = 'span';

   return [ numbers ];
};
```
bạn hãy thử để thấy kết quả:
> app/views/posts/index.html.erb
```html
    ...
    <%= render "datatable.js" %>
    <%= render "simple_numbers_no_ellipses.js" %>
```

[Custom language](https://datatables.net/examples/basic_init/language.html) thêm tùy chỉnh ngôn ngữ vào file datatable.js.erb:
```js
language: {
    "decimal":        "",
    "emptyTable":     "No data available in table",
    "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
    "infoEmpty":      "Showing 0 to 0 of 0 entries",
    "infoFiltered":   "(filtered from _MAX_ total entries)",
    "infoPostFix":    "",
    "thousands":      ",",
    "lengthMenu":     "Show _MENU_ entries",
    "loadingRecords": "Loading...",
    "processing":     "Processing...",
    "search":         "Search:",
    "zeroRecords":    "No matching records found",
    "paginate": {
        "first":      "First",
        "last":       "Last",
        "next":       "Next",
        "previous":   "Previous"
    },
    "aria": {
        "sortAscending":  ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
    }
}
```
[disable sorting](https://datatables.net/forums/discussion/21164/disable-sorting-of-one-column) add class *'no-sort'* vào các cột thead của table mà không cần sort:
```
columnDefs: [
  { targets: 'no-sort', orderable: false }
]
```
- AjaxDataTable

Có thể bạn cần mở rộng query và sorting (đặc biệt là với elasticsearch). 
Cần custom lại các method như:  where, order, limit, offset ...

## IV. Tham khảo
- https://datatables.net
- https://github.com/jbox-web/ajax-datatables-rails
- https://github.com/rweng/jquery-datatables-rails
- https://viblo.asia/p/datatables-rails-AQrMJVVNM40E