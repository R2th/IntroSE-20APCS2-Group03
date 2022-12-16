Chắc bạn đã từng biết hoặc đã từng sử dụng cancancan trong Rails để quản lý role của user. Mình sẽ chỉ cho bạn cách dùng cancancan để tạo role dynamic.

*  Trước hết để tạo được dynamic role dùng cancancan cần phải dùng gem
```
gem 'cancancan'
```
và sau đó chạy câu lệnh dưới để tạo model ability dùng để quản lý role
```
rails g cancan:ability
```
Bạn có thể dọc thêm tài liệu cách dùng gem cancancan tạo [đây](https://github.com/CanCanCommunity/cancancan)

Giả sử model một user có một role và một role có nhiều user. Trong role có quyền cho phép hoặc ko cho phép các thao tác `:read, :create, :update, :destroy`

Mình sẽ cần chuẩn bị code như sau: 

* User model : user thuộc một role
```
class User < ActiveRecord::Base
  belongs_to :role
end
```

* Role model : một role gồm có nhiều user và các giá trị phần quyền sẽ được lưu dưới dạng Hash
```
class Role < ActiveRecord::Base
   has_many :users
   serialize :permissions, Hash
end
```

* Giả sử giao diện quản lý role của bạn như ảnh dưới thì bạn có thể thao tác chỉnh sử role tùy ý.
```
<div class="col-md-6">
  <%= form_for [:admin, @role] do |f| %>
    <p>
      <%= f.label :name %>
      <%= f.text_field :name, class: "form-control" %>
    </p>

    <div class="row" style="justify-content: space-between; font-weight: bold;">
      <div>Function</div>
      <div>Read</div>
      <div>Create</div>
      <div>Update</div>
      <div>Destroy</div>
    </div>
    <div class="row" style="justify-content: space-between;">
      <div>Function 1</div>
      <div><%= check_box_tag "role[permissions][function1][read]" %></div>
      <div><%= check_box_tag "role[permissions][function1][create]" %></div>
      <div><%= check_box_tag "role[permissions][function1][update]]" %></div>
      <div><%= check_box_tag "role[permissions][function1][destroy]" %></div>
    </div>

    <div class="row" style="justify-content: space-between;">
      <div>Function 2</div>
      <div><%= check_box_tag "role[permissions][function2][read]" %></div>
      <div><%= check_box_tag "role[permissions][function2][create]" %></div>
      <div><%= check_box_tag "role[permissions][function2][update]" %></div>
      <div><%= check_box_tag "role[permissions][function2][destroy]" %></div>
    </div>

  <div class="row"><%= f.submit "Save", class: "btn btn-primary" %></div>
  <% end %>
</div>

```
![](https://images.viblo.asia/ac2c2dbc-11c1-47fc-ba0a-ba6c21bed991.png)

* Lúc save role vào db mình có thể thực hiện xử ly params để lưu vào dưới dạnh như 
```
{'function1' => [:read, :create, :update], 'function2': [:read, :create, :update]}
```

*  Phân quyền trong model ability

```
class Ability
  include CanCan::Ability

  def initialize(user)
    if user.admin?
      can :manage, :all
    elsif
      user.role.permissions.each do |subject, action|
        can action,
          (klass = subject.to_s.classify.safe_constantize) ? klass : subject.to_sym
      end
    end
  end
end

```
Code trên sẽ tạo được role của user vd như:

```
can :read, Function1
can :create, Function1
can :update, Function1
can :destroy, Function1
```
...

* Bước cuối cùng để dùng được dynamic role là trong những controller mình cần sét role phải `authorize_resource` của user.

Đến đây là mình có thể tạo được dynamic role dùng gem cancancan. Nó cũng không có gì quá là khó khăn. Mong giải pháp trên có thể giải quyết được vấn đề của bạn.

### Tài liệu tham khảo
* https://github.com/CanCanCommunity/cancancan
* https://blog.joshsoftware.com/2012/10/23/dynamic-roles-and-permissions-using-cancan/?fbclid=IwAR09CWd37O-rPZpGRwiKMZCFgvr0itwwk9GHyA7DnNy_mlpeIaTf25hD_zI