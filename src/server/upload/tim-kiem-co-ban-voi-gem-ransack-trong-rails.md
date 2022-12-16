## Tổng quan
Tìm kiếm là một tính năng rất quan trọng và cần thiết cho hầu hết các ứng dụng. Việc tự viết một method tìm kiếm với nhiều điều kiện sẽ gặp nhiều khó khăn và đôi khi còn làm cho hiệu năng của ứng dụng bị giảm. Gem Ransack ra đời để giúp chúng ta cải thiện điều này.

Ransack là một bản viết lại của [MetaSearch](https://github.com/activerecord-hackery/meta_search) được tạo bởi Ernie Miller và được duy trì bởi Ryan Bigg, Jon Atack và một nhóm những người đóng góp khác. Mặc dù nó hỗ trợ nhiều tính năng tương tự như MetaSearch, nhưng việc triển khai cơ bản của nó khác rất nhiều so với MetaSearch và khả năng tương thích ngược không phải là mục tiêu thiết kế.

Ransack cho phép tạo cả các biểu mẫu tìm kiếm đơn giản và nâng cao cho ứng dụng Ruby on Rails của bạn. Ở phần này mình sẽ chỉ trình bày tìm kiếm đơn giản .

## Cài đặt
Trong Gemfile, bạn thêm dòng sau: 

`gem "ransack"`

Sau đó chạy bundle để cài đặt gem:

`bundle install`

Trước khi bắt đầu thực hiện Search, bạn hãy tạo một App và có sẵn dữ liệu.

## Cách dùng

    Nó khá giống với MetaSearch.

    Ví dụ với bảng User:

| Name | Gender | Age | Description |
| -------- | -------- | -------- | -------- |
| Lien     | Woman     | 22     | Abc |
| Anh     | Woman     | 23     | cde |
| Phuc     | Man     | 26     | abd |
| An     | Woman     | 22     | bce |

1. Trong controller:

Trong file app/controllers/users_controller.rb:
```
class UsersController < ApplicationController
  def index
    @search = User.search(params[:q])
    @users = @search.result
  end
end
```

Trong đó, q là một hash gồm các trường của User và cách tìm kiếm trường đó, hàm result trả về kết quả tìm kiếm.

2. Trong view:

Trong file app/views/users/index.html.erb , thay vì dùng `form_for` , ta thay bằng `search_form_for`:

```
<%= search_form_for @search, class: "form-inline" do |f| %>
	<div class="form-group">
    	<%= f.label :name_cont, 'User Name:' %>
        <%= f.text_field :name_cont, class: "form-control" %><br>
    </div> <!-- Tìm kiếm theo name có chứa ... -->
    <div class="form-group">
        <%= f.label :age_gteq, 'Age >= ' %>
        <%= f.text_field :age_gteq, class: "form-control" %><br>
    </div> <!-- Tìm kiếm theo age lớn hơn bằng ...  -->
    <div class="form-group">
        <%= f.label :gender_eq, 'Gender:' %>
        <%= f.text_field :gender_eq, class: "form-control" %><br>
    </div> <!-- Tìm kiếm theo gender -->
    <div class="form-group">
       <%= f.label :name_or_description_or_content_cont %>
       <%= f.text_field :name_or_description_or_content_cont, class: "form-control" %><br>
     </div> <!-- Tìm kiếm nhiều field -->
    <%= f.submit 'Search', class: "btn btn-default" %>
<% end %>
```

3. Các option thường dùng
* eq (bằng) :  Trả về tất cả các bản ghi có giá trị của trường chính xác bằng một giá trị cho trước.
*  not_eq ( không bằng) : ngược lại của eq
*  matches () : Trả về tất cả các bản ghi có giá trị của trường như giá trị cho trước.
*  does_not_match. Ngược lại matches.
*  lt (ít hơn) : Trả về tất cả các bản ghi có giá trị của trường nhỏ hơn giá trị cho trước.
* gt (lớn hơn) : Ngược lại với lt.
*  gteq (lớn hơn hoặc bằng) : Trả về tất cả các bản ghi có giá trị của trường lớn hơn hoặc bằng giá trị cho trước.
*  lteq (bé hơn hoặc bằng) : Trả về tất cả các bản ghi có giá trị của trường nhỏ hơn hoặc bằng giá trị cho trước.
*  in (nằm trong) : Trả về tất cả các bản ghi có giá trị của trường nằm trong danh sách được cho trước.
*  not_in : Ngược lại của in.
*  cont (chứa) : Trả về tất cả các bản ghi có giá trị của trường chứa giá trị được cho trước.
*  not_cont : Ngược lại của cont.
*  cont_any (bao gồm một trong nhiều giá trị - OR) : Trả về tất cả các bản ghi có giá trị của trường chứa bất kỳ giá trị nào.
*  not_cont_any : Ngược lại của cont_any
*  cont_all (bao gồm tất cả giá trị - AND): Trả về tất cả các bản ghi có giá trị của trường chứa tất cả giá trị cho trước.
*  not_cont_all : Ngược lại của cont_all
*  start (bắt đầu với giá trị nào đó) : Trả về tất cả các bản ghi có giá trị của trường bắt đầu bằng giá trị cho trước.
*  not_start : Ngược lại của start.
*  end (kết thúc với giá trị nào đó) : Trả về tất cả các bản ghi có giá trị của trường kết thúc bằng giá trị cho trước.
*  not_end : Ngược lại với end.

Xem full list tại : https://github.com/activerecordhackery/ransack/blob/master/lib/ransack/locale/en.yml#L15 hoặc wiki)
 
4. Sort với Ransack
*    Ransack cung cấp `sort` kết quả tìm kiếm được  theo `sort_link`:
  
     ```
         <tr>
               <th><%= sort_link(@search, :name, 'User Name') %></th>
               <th><%= sort_link(@search, :age, 'Age') %></th>
         </tr>
      ```
     
*  Ransack hỗ trợ tìm kiếm động : tự chọn trường, cách thức tìm kiếm cũng như giá trị:

Trong file views/users/index.html.erb: sử dụng method `condition_fields`

```
<%= search_form_for @search do |f| %>
  <%= f.condition_fields do |c| %>
  <div class="field">
    <%= c.attribute_fields do |a| %>
      <%= a.attribute_select %>
    <% end %>
    <%= c.predicate_select %>
    <%= c.value_fields do |v| %>
      <%= v.text_field :value %>
    <% end %>
    </div>
  <% end %>
  <div class="actions"><%= f.submit "Search" %></div>
<% end %>
```

Trong file app/controllers/users_controller.rb thêm dòng sau
```
...
@search.build_condition
```
Ngoài ra, cũng có thể tùy chỉnh lại `sort` trong Ransack:

Trong file app/controllers/users_controller.rb thêm dòng sau:
```
...
@search.build_sort
```
Trong view views/users/index.html.erb sử dụng method `sort_fields` : 
```
<%= f.sort_fields do |s| %>
    <%= s.sort_select %>
<% end %>
```
*  Ngoài ra nếu truyền quá nhiều dữ liệu tìm kiếm mà  request bởi method GET bị giới hạn ta có thể thay thế bằng POST request bằng cách chỉnh lại routes:
```
Rails.application.routes.draw do
  root to: "users#index"
  resources :users do
    collection { post :search, to: "users#index" }
  end
end
```
Và form search trong view thêm :
```
<%= search_form_for @search, url: search_users_path, method: :post do |f| %>
	...
<% end %>
```

### Kết luận:
Ransack là một gem rất hữu ích giúp tối giản đi rất nhiều việc tìm kiếm trong ứng dụng Rails. 
### Tài liệu tham khảo:

http://railscasts.com/episodes/370-ransack

-----

https://github.com/activerecord-hackery/ransack