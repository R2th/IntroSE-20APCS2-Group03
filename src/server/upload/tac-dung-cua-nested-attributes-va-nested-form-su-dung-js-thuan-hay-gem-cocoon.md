Chào mọi người, bài viblo của mình hôm nay sẽ nói về nested attributes và nested form sử dụng gem cocoon

# Giới thiệu về Nested Attributes

Trước khi nói về nested attributes và nested form, chúng ta cần xem qua vấn đề sau

Giả sử chúng ta project có chức năng đăng kí người dùng. Trong bảng database sẽ có bảng User có các trường tên, địa chỉ, tuổi

![](https://images.viblo.asia/770c401e-fefc-4829-8c75-3099666f46d0.png)

Khi đăng kí người dùng mới, chúng ta chỉ có thể lưu 1 bản ghi tên, địa chỉ, tuổi với người đấy thôi đúng k?


Nếu người dùng muốn thêm nhiều địa chỉ thì sao? Làm thế nào chúng ta có thể lưu nhiều địa chỉ vào database?

Thì có 1 cách, thêm nhiều address vào trường add user nhưng như thế sẽ rất khó lấy ra vì lưu quá nhiều attributes vào 1 cột

Còn 1 cách khác nữa là thêm nhiều trường address nhưng như thế sẽ hard code, muốn thêm address thì phải thêm 1 trường khác trong database

Cách cuối cùng, cũng là cách ổn và khả thi nhất, đó là tách bảng User ra thành 2 bảng khác nhau

![](https://images.viblo.asia/d14295c9-ef58-4d8e-ad00-4485687fb242.png)

Như hình ở trên, chúng ta đã tách ra và có 2 bảng là User và bảng Profile

Để thêm đc địa chỉ vào bảng profile thì có rất nhiều cách trong đó thì có nested attribute là cách ổn nhất

Với nested attributes, chúng ta có thể lưu đồng thời lưu dữ liệu ở bảng user và bảng profile trong cùng 1 form mà không phải thêm nhiều form khác nhau :D

Mình sẽ demo bên dưới để các bạn có thêm được về ví dụ sử dụng nested attributes

![](https://images.viblo.asia/1e3e6fb2-6249-4959-a219-a7e2cc64c164.png)
Với nested attributes, bạn có thể thêm một hoặc nhiều trường địa chỉ khác nhau

Đồng nghĩa với việc người dùng đó sẽ có nhiều địa chỉ
![](https://images.viblo.asia/3d24e8a0-0c02-4f0c-95f7-f79970c5ffa0.png)

Khi tạo người dùng mới, nó sẽ thực hiện câu lệnh sql để insert user mới vào database
Và nó cũng sẽ insert 2 bản ghi mới vào bảng profile, với address là "Hà Nội" và "Hồ Chí Minh" như chúng ta đã nhập ở trên, và liên kết với user_id là 1 chính là user mới chúng ta vừa insert nhờ vào association
# Cách triển khai Nested Attributes
Việc đầu tiên, chúng ta cần tách thành 2 bảng User và Profile
Sau đó, để 2 bảng này có thể liên kết được với nhau, chúng ta sẽ sử dụng Association
```
class User < ApplicationRecord
  has_many :profiles, dependent: :destroy
 end
```

```
class Profile < ApplicationRecord
  belongs_to :user
end
```

Để bảng user có thể nested attributes bảng profile thì chúng ta cần phải sử dụng câu lệnh này
```
accepts_nested_attributes_for 
```
VD: 
```
class User < ApplicationRecord

  has_many :profiles, dependent: :destroy

  accepts_nested_attributes_for :profiles, allow_destroy: true,
    reject_if: :all_blank
end
```
Trong đó :profiles là tên association, **allow_destroy: true**, **reject_if: :all_blank** là các option của nó

**Allow_destroy: true** nghĩa là cho phép xóa bản ghi con, ở đây là xóa các address khỏi user đó, **reject_if: all_bank**, nếu các trường Address bị trống thì nó sẽ không lưu bản ghi đó vào database

Ngoài ra, chúng ta có thể reject if với chỉ định các tên attribute khác nhau


> reject_if: proc { |attributes| attributes['params'].blank? }


VD: **reject_if: proc { |attributes| attributes['address'].blank? }**

Sau đó qua đền phần controller
```
class UsersController < ApplicationController
  def new
    @user = User.new
    user.profiles.new
  end

  def create
    @user = User.new user_params
    if user.save
      notice_redirect
    else
      user.profiles || user.profiles.new
      render :new
    end
  end

  private
  
  def user_params
    params.require(:user).permit :email, :password, :name,
      :password_confirmation, profiles_attributes: [:address, :_destroy]
  end
end
```

Tiếp theo chúng ta qua phần controller,
action new: Chúng ta khai báo user.profile.new để có thể khởi tạo 1 object user mới nhưng chưa lưu vào database
Khởi tạo càng nhiều object profile mới thì càng có nhiều trường để chúng ta điền vào,  build profiles 2 lần thì có 2 đối tượng profile mới, =>2 trường address

action create: lưu user mới vào database, ở đây cần lưu ý params truyền vào của user

Khi create, update đối tượng user, chúng ta đồng thời có thể create, update luôn đối tượng profile bằng cách truyền attribute của profile vào params của user

Chúng ta có profile_attributes: [:address, :_destroy]

Slide trước có nói về allow_destroy: true,  để có thể xóa đc các nested attribute chúng ta phải có _destroy trong params của profile thì mới hoạt động dc, :address là params để lưu các địa chỉ vào database
```
<%= f.fields_for :profiles do |builder| %>
  <%= builder.label t :address %>
  <%= builder.text_field :address, class: "form-control" %>
  <%= builder.check_box :_destroy %>
<% end %>

```

Sau khi đã cấu hình đầy đủ về nested attributes

Chúng ta phải thiết lập form để có thể lưu nhiều address của 1 user vào database

Ở đây chúng ta dùng fields_for để lưu địa chỉ
fields_for giống như là 1 cái form của profile dùng để nhập nhiều address khác nhau với chúng ta muốn
:profile là tên association

:address là trường có trong bảng profile

# Nhược điểm và khắc phục # 
Tuy nested attributes có rất nhiều lợi ích nhưng nó cũng có các nhược điểm như là nó không động?

Giả sử người dùng muốn thêm nhiều địa chỉ hơn số trường mình đã định sẵn thì sao? Nested attributes không thể trùy biến điều đó ngay trên trang web đó. Người dùng không thể thêm 1 trường địa chỉ khác không cần load lại trang trên trình duyệt mà phải dựa vào người code ra trang web đó.

Để khắc phục điều đó, chúng ta sẽ sử dụng nested form với Cocoon
Nhưng trước khi sử dụng cocoon, tôi muốn bạn xem nguyên lí hoạt động của Cocoon nhờ vào sử dụng nested form dùng Javascript thuần
# Nested form sử dụng Javascript thuần #
Để hiểu rõ được về nested form mời bạn xem ví dụ dưới đây
![](https://images.viblo.asia/37ecb0d0-4e0c-4193-ab5e-ae70bf2d4316.png)

Ở đây có có 1 button là Add Address, bạn có thêm trường address khác ngay trên trình duyệt mà không phải load lại trang
![](https://images.viblo.asia/0e3c1a93-c5ea-4301-82c4-b8ab62197d42.png)
1 trường address khác đã được thêm sau khi ấn Add Address

***Nguyên lí hoạt động của nested form là nó sẽ thêm 1 cái form vào bên trong nút Add Address, khi người dùng click, nó sẽ nối cái form đấy ra trình duyệt nhờ vào sử dụng javascript***
# Triển khai #
```
<div class="sub_address">
  <%= f.fields_for :profiles do |builder| %>
    <%= render "profiles_fields", f: builder %>
  <% end %>
</div>
<%= link_to "Add Address", "#", id: "sub-field",
  class: "btn btn-info prevent-load",
  data: {field: sub_address_field(f)} %>
```

Vẫn sử dụng nested attributes, chúng ta sẽ sửa lại 1 chút như hình trên

Trong đó field sẽ nạp vào data, trong field truyền vào method **sub_address_field**
(data chính là Data attribute trong javascript, nó sẽ giúp bạn lưu thêm thông tin vào thẻ html)
Nó sẽ đc truyền vào data để có thể sử dụng trong javascript

**App/helpers/application_helper.rb**

```
module ApplicationHelper
  def sub_address_field form
    sub_address = form.object.profiles.build
    form.fields_for :profiles, sub_address,
      child_index: "hello" do |builder|
      render "profiles_fields", f: builder
    end
  end
end
```

Trong method  **sub_address_field**:

sub_address, khởi tạo profile của form.object với đối số là form (ở đây chính f của @user chúng ta truyền vào form)

form.fields_for, tạo ra 1 cái form nested attribute như bình thường

child_index: chính là index của các nested form, cần nó để id và name không bị trùng lặp, nếu bị trùng thì sẽ không thể tạo dc các nội dung khác nhau

Tiếp theo, chúng ta sẽ tạo 1 file javascript với nội dung như sau:

**app/assets/javascripts/nested_attributes.js**
```
$(document).on('click', '#sub-field', function(){
  var field = $(this).data('field');
  var new_id = new Date().getTime();
  $('.sub_address').append(field.replace(/hello/g, new_id));
});

$(document).on('click', '.remove-btn', function() {
  $(this).parent().remove();
});
```

Khi click phần tử với id là sub-field

Nó sẽ lấy data của this, this ở đây chính là gọi tới id sub-field

data ở đây là field chúng ta nói ở hình ảnh trước

new_id, lấy thời gian hiện tại

Câu lệnh dưới, sẽ thêm vào field vào trong class sub_address. Nghĩa là nó sẽ nối thêm 1 cái form từ bên trong field và nối vào class sub_address.
```
<div class="sub_address">
```
/hello/g với /g sử dụng biểu thức chính qui, tìm tất cả các chữ là hello, thay thế với new_id

# Nhược điểm và khắc phục # 
Tuy chúng ta đã có thể nested form nhưng cách làm trên vẫn rườm ra và không hiệu quả do dùng javascript thuần. Mình sẽ hướng dẫn các bạn sử dụng **gem Cocoon** để có thể nhanh chóng tạo được nested form  mà lại dễ dùng và ngắn gọn

Cocoon vẫn sẽ cho ra chức nắng tương tự khi nested form với javascript thuần, nhưng nó sẽ đơn giản và dễ sử dụng hơn rất nhiều.

# Triển khai Cocoon # 
Để sử dụng Cocoon, các bạn thêm gem vào trong gemfile
```
gem "cocoon"
```

Sau đó require nó vào trong **application.js**

```
//= require cocoon
```

Vẫn sử dụng nested attributes
```
<%= f.fields_for :profiles do |builder| %>
  <%= render "profile_fields", f: builder %>
<% end %>

<div class="links">
  <%= link_to_add_association 'Add address', f, :profiles %>
</div>
```

Chúng ta chỉ cần render ra 1 partial và truyền vào object cho nó

link_to_association, chính là đường link để hiện ra form khác cần sử dụng, add address là tên link, f chính là object mà form for đang sử dụng với :profile là tên của nested attributes

Và bên trong cái partial này có gì? 

**app/view/users/_profile_fields.html.erb**
```
<div class="nested-fields">
  <%= f.label t :address %>
  <%= f.text_field :address, class: "form-control" %>
  <% end %>
</div>
```


Bên trong là các attributes mà chúng ta muốn sử dụng để nested attributes, ở đây là address

link_to_remove_association, dùng để xóa cái nested form đó đi
Lưu ý là link_to_remove_association chỉ hoạt động với class "nested-fields"

# Tổng kết
Qua bài viết này, mình mong mọi người có thể hiểu được về nested attributes và nested form để có thể áp dụng vào project
Cảm ơn đã dành thời gian cho bài viết của mình! :D