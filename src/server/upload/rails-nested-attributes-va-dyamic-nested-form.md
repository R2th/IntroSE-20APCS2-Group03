Chào mọi người,
Ở bài viết này, mình sẽ giới thiệu đến một tính năng rất gì và này nọ của Ruby on Rails là Nested Attributes. Kỹ thuật này cho phép các bạn có quyền chỉnh sửa các bản ghi thông qua bản ghi cha được liên kết với nó (associated records). Ví dụ, bạn có 2 đối tượng A và B có liên kết với nhau, thì bạn vẫn hoàn toàn có thể khởi tạo, chỉnh sửa đối tượng A thông qua đối tượng B. Và đây cũng là một kỷ thuật rất phổ biến và thường được dùng trong Ruby on Rails

### 1. Nested Attributes

Mình lấy ví dụ về quan hệ giữa công ty (company) và các chi nhánh (branches) như sau
*app/model/branch.rb*
```
class Branch < ActiveRecord::Base
belongs_to :company
```

*app/model/company.rb*
```
class Company < ActiveRecord::Base
has_many :branches
accept_nested_attributes_for :branches, reject_if: :all_blank, allow_destroy: true
```

Ở đây, khi mình sử dụng `allow_destroy: true` thì mình sẽ có thể xóa các record của branch thông qua company

Khi sử dụng `accept_nested_attributes_for :branches`, bạn có thể truyển các thuộc tính của branches vào company_params

*app/controllers/companies_controller.rb*
```
class MoviesController < ApplicationController
     def index
         @companies = Company.all
     end
    def end
        @company = Company.new
    end
    def create
        @company = Company.new company_params
        if @company.save
            flash[:success] = "Create company successfully"
            redirect_to companies_path
        else
            flash[:danger] = "Can not create company"
            render :new
        end
    end
    
    private
    def company_params
        params.permit(:company).require :name, :email, branches_attributes: [:id, :name, :phone]
    end
end
```

Ở View, chúng ta có thể sử dụng `form_field` để truyền các attributes của branch và gửi lên, sau đó được tạo đồng thời với company:

```
<h3>New Company</h3>
<%= form_for @company, url: companies_path, method: :post do |f| %>
  <div >
    <%= f.label :name %>
    <%= f.text_field :name %>
  </div>
  <div >
    <%= f.label :email %>
    <%= f.text_field :email %>
  </div>

  <p>Companies' Branches</p>

  <%= f.fields_for :branches do |b| %>
    <div >
      <%= b.label :name %>
      <%= b.text_field :name %>
    </div>
    <div >
      <%= b.label :phone %>
      <%= b.text_field :phone %>
    </div>
  <% end %>
  <%= f.button :submit %>
<% end %>
```




Tuy nhiên, trong thực tế, thì mỗi công ty không thể có 1 chi nhánh mà là có rất nhiều, có thể là mở chi nhánh mới hoặc đóng chi nhánh cũ, vậy thì phải làm sao???
 Mọi việc sẽ trở nên easy với `gem cocoon` => dyamic nested form
 
 ### 2. Dyamic nested form với gem cocoon
 
 Với gem cocoon, bạn có thể set đươc một form "động" với số lượng cụm records (fields) tùy ý muốn. Tức là, ví dụ bạn có những object loại A liên kết với object B, và bạn muốn tạo các object A với số lượng chưa biết trước thông qua object A, thì bạn có thể tùy chỉnh thêm bớt số lượng form mong muốn tương ứng với số record sẽ lưu vào dữ liệu
Đầu tiện, các bạn add gem này vào Gemfile
```
gem "cocoon"
```
 chạy lệnh `bundle install`
 Thêm thư viện js của cocoon vào file `application.js`
```
//= require cocoon
```

Vì cocoon sử dụng jquery nên đừng quên add gem jquery và require vào file javascript nhé ;)

Phần controller mình vẫn sẽ giữa nguyên và chỉ thay đổi phần view

app/views/companies/new.html.erb
```

<h3>New Company</h3>
<%= form_for @company, url: companies_path, method: :post do |f| %>
  <div>
    <%= f.label :name %>
    <%= f.text_field :name %>
  </div>
  <div>
    <%= f.label :email %>
    <%= f.text_field :email %>
  </div>

  <p>Companies' Branches</p>

  <%= f.fields_for :branches do |branch| %>
    <% if f.object.branches %>
      <%= render 'branch_fields', f: branch %>
    <% end %>
    <div class="">
      <%= link_to_add_association 'add bracnh', f, :branches, partial: "branch_fields" %>
    </div>
  <% end %>
  <%= f.button :submit %>
<% end %>
```

app/views/companies/_branch_fields.html.erb

```
<div>
  <div>
    <%= f.label :name %>
    <%= f.text_field :name %>
  </div>
  <div>
    <%= f.label :phone %>
    <%= f.text_field :phone %>
  </div>
  <%= link_to_remove_association "remove branch", f %>
</div>
```

Sự khác biệt ở đây ở 2 điểm:
- **link_to_add_association**: Add thêm một object cho branch, mỗi lần click sẽ add thêm một fields từ "branch_fields.html.erb"
- **link_to_remove_association**: Xóa object chi nhánh đang trỏ vàa


Như vậy, giờ đây bạn hoàn toàn có thể lồng ghép các form với nhau dựa vào các bản ghi có liên kết, giúp cho việc lập trình trở nên gọn và dễ hiểu hơn

Hi vọng bài viết này sẽ hữu ích đối với các bạn