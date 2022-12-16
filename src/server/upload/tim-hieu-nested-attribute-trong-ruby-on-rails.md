# 1. Đặt vấn đề
Giả sử, ta có chức năng đăng ký người dùng với bản ghi users của ta gồm các thuộc tính: name,  email, phone, password. Khi đăng kí người dùng mới, chúng ta chỉ có thể lưu 1 bản ghi gồm các thuộc tính trên.

Giờ ta sẽ phát triển cho phép người dùng có thể đăng ký với 2 số điện thoại. Ta sẽ tách bản ghi trên thành 2 bản ghi như sau:

    users: name, email, password và phones: user_id, phone. Với quan hệ, 1 user có thể có nhiều phone và 1 phone có 1 user.
    
Như thế khi ta tạo một người dùng mới, ta sẽ phải lưu đồng thời 2 bản ghi users và phones.

Để làm được việc này, trong Rails có kỹ thuật hỗ trợ ta làm việc này. Đó là kĩ thuật nested attributes.
Vậy kỹ thuật này là gì? Dùng nó như thế nào? Ưu điểm của nó là gì mà ta lại dùng? Liệu nó có nhược điểm không?
Ta sẽ tiếp tục đi tìm hiểu ở các phần tiếp theo nào.
# 2. Giới thiệu về nested attributes
Nested attributes là kỹ thuật cho pháp ta lưu thuộc tính của một bản ghi thông qua một bản ghi khác có liên kết với bản ghi này. Hiểu đơn giản là nếu ta có một đối tượng A có liên kết với đối tượng B, thì ta có thể khởi tạo, cập nhật đối tượng B thông qua đối tượng A. 

Mặc định trong rails thì nested atrributes updating bị tắt và ta có thể kích hoạt nó bằng cách sử dụng phương thức accepts_nested_attributes_for trong model tương ứng với thuộc tính là tên model tương ứng.

Áp dụng vào vấn đề đã đặt ra, ta sẽ cần thêm lệnh sau vào class User:


    accepts_nested_attributes_for :phones
    
# 3. Một số tùy chọn khi sử dụng accepes_nested_attributes_for
:allow_destroy : Nếu true, nó hủy mọi thành viên khỏi attributes hash bằng khóa *_destroy*. Tùy chọn này được tắt theo mặc định.

:reject_if : Ta có thể dùng với Proc hoặc Symbol để chỉ đến phương thức để kiểm tra thỏa mã điều kiện hay không. Nó âm thầm bỏ qua bất kỳ bản ghi mới, không lưu vào cớ sỏ dữ liệu nếu nó không vượt qua được tiêu chí của phương thức trên.

:limit : chỉ áp dụng đối với liên hệ một-nhiều. Cho phép ta chỉ định số lượng bản ghi liên quan tối đa có thể được xử lý với các nested attributes. Nếu kích thước của mảng nested attributes vượt quá giới hạn đã chỉ định, ngoại lệ NestedAttribut :: TooManyRecords được đưa ra. 

:update_only : Đối với mối liên hệ một-một, tùy chọn này cho phép ta chỉ định cách nested attributes sẽ được sử dụng khi một bản ghi liên quan đã tồn tại. Nói chung, một bản ghi hiện có có thể được cập nhật với tập các giá trị thuộc tính mới hoặc được thay thế bằng một bản ghi hoàn toàn mới có chứa các giá trị đó. Mặc định tùy chọn update_only là false và các nested attributes được sử dụng để cập nhật bản ghi hiện có chỉ khi chúng bao gồm giá trị id của bản ghi. Nếu không một bản ghi mới sẽ được instantiated và được sử dụng để thay thế một hiện có. Tuy nhiên nếu tùy chọn update_only là true, các nested attributes được sử dụng để cập nhật các thuộc tính của bản ghi luôn luôn, bất kể id là có. Tùy chọn này bị bỏ qua cho tập hợp các liên kết.

# 4. Triển khai nested attributes vào project sử dụng fields_for
Fields_for về cơ bản cũng gần giống form_for là tạo ra một scope xung quanh một đối tượng cụ thể nhưng không tạo ra form_tags chính nó.
Như đã nêu ở muc 2, đầu tiên ta cần khai báo method accept_nested_attributes_for trong model user
app/models/user.rb

```
class User < ActiveRecord::Base
  has_many :phones
  accepts_nested_attributes_for :phones
end
```

Tiếp theo, ta cần thêm thuộc tính  vào controller để tạo đối tượng phone thông qua đối tượng user
app/controllers/users_controller.rb

```
class UsersController < ApplicationController
  def new
    @user = User.new
    user.phones.new
  end

  def create
    @user = User.new user_params

    if user.save
      flash[:success] = "Signup Success"
      redirect_to @user
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit :email, :password, :name,
      :password_confirmation, phones_attributes: :phone
  end
end
```

Trong controller này, 

* Action new: Chúng ta khai báo user.new và user.phones.new để có thể khởi tạo 1 object user mới nhưng chưa lưu vào database và khởi tạo object phone mới, khởi tao object phone càng nhiều thì ta càng có nhiều trường để chúng ta điền vào, build phones 3 lần thì ta sẽ có 3 đối tượng phone mới =>3 trường phone
* Action create: lưu user mới vào database, ở đây cần lưu ý params truyền vào của user
*  Khi create, update đối tượng user, chúng ta đồng thời có thể create, update luôn đối tượng phone bằng cách truyền attribute của phone vào params của user với phones_attributes:  :phone

Tiếp đến, ta qua phần view

app/views/user/new.html.erb

```
<%= form_for @user do |f| %>
  <%= render "shared/error_messages"%>

  <%= f.label :name %>
  <%= f.text_field :name, class: "form-control" %>

  <%= f.label :email %>
  <%= f.email_field :email, class: "form-control" %>

  <%= f.fields_for :phones do |ff| %>
    <%= ff.label :phone %>
    <%= ff.text_field :phone, class: "form-control" %>
  <% end %>

  <%= f.label :password %>
  <%= f.password_field :password, class: "form-control" %>

  <%= f.label :password_confirmation %>
  <%= f.password_field :password_confirmation, class: "form-control" %>

  <%= f.submit "Create", class: "btn btn-primary" %>
<% end %>
```

Ở đây chúng ta dùng fields_for để lưu phone, fields_for giống như là 1 cái form của phones dùng để nhập nhiều phone khác nhau.

Với 

* :phones là tên association 
* :phone là trường có trong bản ghi phones


# 5. Nhược điểm
Tuy nested attributes có rất nhiều lợi ích nhưng nó cũng có các nhược điểm như là nó không động, chỉ với số lượng cố định.
Nested attributes không thể trùy biến điều đó ngay trên trang web đó. Người dùng không thể thêm 1 trường phone khác ngay trên trang web đó mà phải dựa vào code cứng  của trang web đó. Như thế thật là không tốt, thật bất tiện.

# 6. Giải pháp
Cách 1: Sử dụng for hoặc each . Đơn giản là ta sử dụng vòng lặp, muốn thêm bao nhiêu đối tượng phones phía trên thì sẽ lặp bấy nhiêu lần, cách này có một nhược điểm là ta phải gán cố định số vòng lặp tất nhiên nó sẽ làm cho tính tùy biến trong ứng dụng của chúng ta giảm xuống và cũng sẽ không đề cập đến cách này ở đây.

Cách 2: Nested form sử dụng Javascript thuần
 
 Cách 3: Sử dụng nested form với Cocoon
 
# 7. Triển khai nested form sử dụng Javascript thuần
Ở đây có có 1 button là Add Phone giúp ta có thêm trường phone khác ngay trên trình duyệt mà không phải load lại trang.

Nguyên lí hoạt động của nested form là nó sẽ thêm 1 cái form vào bên trong nút Add Address, khi người dùng click, nó sẽ nối cái form đấy ra trình duyệt nhờ vào sử dụng javascript.

Ta vẫn sử dụng nested attributes, chúng ta sẽ sửa lại 1 chút trong file app/views/user/new.html.erb như sau:

```
<div class="sub_phones">
  <%= f.fields_for :phones do |builder| %>
    <%= render "phones_fields", f: builder %>
  <% end %>
</div>
<%= link_to "Add Phone", "#", id: "sub-field",
  class: "btn btn-info prevent-load",
  data: {field: sub_phone_field(f)} %>
```

Trong đó field sẽ nạp vào data, trong field truyền vào method sub_phone_field (data chính là data attribute trong javascript, nó sẽ giúp bạn lưu thêm thông tin vào thẻ html) và nó sẽ đc truyền vào data để có thể sử dụng trong javascript

Ta thêm code sau vào file App/helpers/application_helper.rb

```
module ApplicationHelper
  def sub_phones_field form
    sub_phones = form.object.phones.build
    form.fields_for :phones, sub_phones,
      child_index: "hello" do |builder|
      render "phones_fields", f: builder
    end
  end
end
```

Trong đó:

* sub_phones, khởi tạo phone của form.object với đối số là form (ở đây chính f của @user chúng ta truyền vào form)
* form.fields_for, tạo ra 1 cái form nested attribute như bình thường
* child_index: chính là index của các nested form, cần nó để id và name không bị trùng lặp, nếu bị trùng thì sẽ không thể tạo được các nội dung khác nhau

Ta tạo file js  như sau: 
app/javascripts/packs/nested_attributes.js

```
$(document).on('click', '#sub-field', function(){
  var field = $(this).data('field');
  var new_id = new Date().getTime();
  $('.sub_phones').append(field.replace(/hello/g, new_id));
});

$(document).on('click', '.remove-btn', function() {
  $(this).parent().remove();
});
```

Khi click phần tử với id là sub-field, nó sẽ lấy data của this (this ở đây chính là gọi tới id sub-fielddata ở đây là field chúng ta nói ở phần trước); new_id, lấy thời gian hiện tại
Câu lệnh cuối, sẽ thêm vào field vào trong class sub_phones. Nghĩa là nó sẽ nối thêm 1 cái form từ bên trong field và nối vào class sub_phones. Đoạn /hello/g với /g sử dụng biểu thức chính qui, tìm tất cả các chữ là hello, thay thế với new_id

Còn khi click vào class remove-btn, thì sẽ thực hiện remove form hiện tại bên trong field đó.

Như vậy là ta đã xong. Nhưng cách này vẫn hơi dài và chưa thực sự hiệu quả lắm do dùng javascript thuần.  Sử dụng gem Cocoon để có thể nhanh chóng tạo được nested form cũng với chức năng tương tự, mà nó đơn giản, ngắn gọn và dễ dử dụng hơn nhiều. Và cách này mình sẽ trình bày trong bài sau.

# Tài liệu tham khảo
https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html

https://viblo.asia/p/tim-hieu-ve-nested-attributes-trong-rails-MgNeWoaAeYx

Bài viết đầu tiên của mình còn nhiều thiếu sót rất mong các bạn thông cảm. Xin cảm ơn các bạn đã thời gian cho bài viết của mình!