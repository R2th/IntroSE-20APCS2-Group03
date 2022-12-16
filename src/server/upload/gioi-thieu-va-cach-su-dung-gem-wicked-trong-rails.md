## Giới thiệu và cách sử dụng gem Wicked trong Rails
### 1. Đặt vấn đề
Khi chúng ta muốn thiết lập [RESTful](https://viblo.asia/p/restful-rails-V3m5WzM8lO7) để hiển thị từng bước từng bước của một quá trình, nó có thể hoặc không được liên kết với một tài nguyên. Gem Wicked cho phép sự link hoạt để làm những gì mà bạn muốn trong khi ẩn tất cả những gì thực sự phức tạp hoặc có thể gây cho bạn sự khó chụi. Khi sử dụng gem wicked bạn không cần quá quan tâm đến cốt lõi của nó mà, chỉ cần sử dụng nó. Nhưng nếu bạn có thể nắm được và hiểu sâu về nó thì quá tuyệt vời.
### 2. Cài đặt
Thêm dòng sau vào trong file Gemfile

```
gem "wicked"
```
### 
Then run bundle install and you're ready to start
Sau đó bạn chạy lệnh sau **bundle install** và bây giờ mọi thứ đã sẵn sàng để bắt đầu.

### 3. Ví dụ
Để có thể hiểu rõ về Gem wicked thì chúng ta sẽ bắt đầu với một ví dụ đơn giản như sau:

**3.1. Mô tả bài toán**

Ở đây chúng ta sẽ tạo một bảng User trong database:

```
class DeviseCreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      add_column :users, :reset_password_sent_at, :datetime
      add_column :users, :remember_created_at, :datetime
      add_column :users, :sign_in_count, :integer
      add_column :users, :curent_sign_in_at, :datetime
      add_column :users, :last_sign_in_at, :datetime
      add_column :users, :curent_sign_in_ip, :string
      add_column :users, :last_sign_in_ip, :string
      t.string :name
      t.datetime :birthday
      t.string :address
      t.string :facebook
      t.string :youtube
      t.string :skype

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
  end
end
```
Ở trong phần trên mình dùng [gem devise](https://github.com/plataformatec/devise) để hỗ trợ cho việc đăng nhập và đăng kí tài khoản. Trường hợp nếu dùng người đăng kí tài khoản mới thì sẽ thực hiện theo ba bước dưới đây:

1. Người dùng sẽ nhập vào email và mật khẩu. (Trang này sẽ được tạo ra bởi việc sử dung gem devise, bạn cũng có thể tự tạo một cách thủ công nếu không muốn dùng gem devise).
2. Sau khi người dùng nhập email và mật khẩu hợp lệ thì người dùng sẽ được chuyển đến trang "Nhập thông tin người dùng". Trang này bao gồm các thông tin: HỌ và tên, Ngày sinh, Địa chỉ. (Trang này được ứng dụng bởi việc dùng gem wicked)
3. Trang cuối cùng đó là Nhập các thông tin dùng để liên hệ với người dùng như: facebook, youtube, skype. (Trang này được ứng dụng bởi việc dùng gem wicked)

Để thực hiện các bước ở trên, ta tạo controller với cú pháp:
```
rails g controller user_steps
```

Thêm routes vào trong file routes.rb:
```
resources :user_settings
```

Tiếp đó chúng ta sẽ thêm `include Wicked::Winzard` vào trong file controller của chúng ta. Ở trong bài toán này thì chính là file **UserStepsController**
```
class UserStepsController < ApplicationController
  include Wicked::Wizard
  steps :personal, :social
  ...
```

Bạn cũng có thể sử dụng cách cũ của việc kế thừa từ Wicked::WinzardController

```
class UserStepsController < Wicked::WinzardController
  steps :personal, :social
  ...
```
Mình xin nhắc lại quy trình như sau:
1. Đăng kí email và mật khẩu bằng việc tạo ra một trang đăng kí (Trong demo của mình thì mình sử dụng trang đăng kí tạo ra bởi gem devise /views/devise/registrations/new.html.erb).
2. Sau đó chuyển đến trang nhập thông tin cá nhân (/views/user_settings/personal.html.erb).
3. Chuyển đến trang nhập các thông tin có thể liên hệ với người dùng (/views/user_settings/social.html.erb).

Note: Wicked uses the :id parameter to control the flow of steps, if you need to have an id parameter, please use nested routes. See building objects with wicked for an example. It will need to be prefixed, for example a Product's :id would be :product_id

**Chú ý:**
Wicked sử dụng tham số :id để điều khiển luồng của các bước, nếu bạn cần có một tham số id, khi đó bạn sẽ phải sử dụng routes lồng nhau.
Bạn có thể xem [link](https://github.com/schneems/wicked/wiki/Building-Partial-Objects-Step-by-Step) sau để hiểu rõ hơn. (Bạn nên đọc xong bài viết sau thì hãy quay lại đọc bài viết này như thế sẽ dễ hiểu hơn.)

Then in your view you can use the helpers to get to the next step.
Ở trong file view của bạn, khi bạn muốn chuyển sang bước tiếp theo, bạn có thể sử dụng gợi ý sau:
```
<%= link_to 'skip', next_wizard_path %>
```

Bạn cũng có thể sử dụng cách sau nếu bạn muốn chuyển đến một bước mà bạn chỉ định:
```
<%= link_to 'skip', wizard_path(:social) %>
```

Trong controller, khi bạn muốn redirect đến trang đầu của một chuỗi các bước:
```
redirect_to user_steps_path
```
Ngoài việc hiển thị các chế độ xem tuần tự, chúng ta có thể cập nhật các phần tử trong controller:
```
class UserStepsController < ApplicationController
  include Wicked::Wizard
  steps :personal, :social

  def show
    @user = current_user
    render_wizard
  end
  
  def update
    @user = current_user
    @user.update_attributes user_params
    render_wizard @user
  end
end
```
We're passing render_wizard our @user object here. If you pass an object into render_wizard it will show the next step if the object saves or re-render the previous view if it does not save.

Chúng ta sử dụng render_winzard cho đối tượng @user. Nếu bạn truyền một đối tượng vào render_winzard, nó sẽ chuyển đến bước tiếp theo nếu đối tượng đó được lưu vào trong databse thành công hoặc chuyển lại trang hiển thị trước nếu nó không được lưu thành công.
**Chú ý:**
render_winzard @user sẽ vừa lưu đối tượng @user vào trong databse và đồng thời chuyển đến bước tiếp theo nếu lưu thành công. Cho nên trong ví ở trên thì đối tượng đó sẽ lưu 2 lần. Đồng thời nó cũng gọi các callbacks 2 lần. Trong trường hợp này, cách khắc phục chính là bạn nên sử dụng assign_attributes thay cho update_attributes.
To get to this update action, you simply need to submit a form that PUT's to the same url

Để chuyển đến hành động update trên, thì ở form hiển thị bạn cần phải submit form như đoạn code sau:
```
<%= form_for @user, url: wizard_path do |f| %>
  <% if f.object.errors.any? %>
    <div id="error_explanation">
      <div class="alert alert-danger">
        <%= t "shared.error_messages", count: f.object.errors.size %>.
      </div>
      <ul>
      <% f.object.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
      </ul>
    </div>
  <% end %>
  <div class="field">
    <%= f.label :name %><br />
    <%= f.text_field :name %>
  </div>

  <div class="field">
    <%= f.label :birthday %><br />
    <%= f.date_field :birthday %>
  </div>

  <div class="field">
    <%= f.label :address %><br />
    <%= f.text_field :address %>
  </div>

  <div class="actions">
    <%= f.submit "Continue", class: "btn btn-primary" %>
    <%= link_to "Skip", next_wizard_path, class: "btn btn-primary" %>
  </div>
<% end %>
```

Ở trong file controller nếu bạn muốn bỏ qua bước hiện tại thì bạn có thể gọi **skip_step**.
Còn ở trong view nếu bạn muốn chuyển sang trang tiếp theo thì sử dụng **<%= link_to "Skip", next_wizard_path %>**

Sau khi thực hiện xong các bước, nếu bạn không ghi đè phương thức thì nó mặc định trả về root_path.
Cách ghi đè phương thức để chuyển về trang mà mình mong muốn:
```
def finish_wizard_path
   user_show_path
end
```

### 4. Danh sách các tham chiếu
**View/URL Helpers:**

```
wizard_path                  # lấy path hiện thời
wizard_path(:specific_step)  # path tới :specific_step
next_wizard_path             # path tới step kế tiếp
previous_wizard_path         # path tới step trước đó
# Tất cả những đường dẫn lấy được không phải là đường dẫn tuyệt đối
```
**Controller**
```
steps  :first, :second   # thiết lập thứ tự của các step
step                     # gọi các bước hiện tại
next_step                # gọi các bước kế tiếp
previous_step            # gọi các bước trước đó
skip_step                # bỏ qua step
jump_to(:specific_step)  # gọi :specific_step
render_wizard            # Renders bước hiện tại
render_wizard(@user)     # render bước kế tiếp nếu @user lưu thành công
wizard_steps             # danh sách các step
```
### 5. Link tham khảo
https://github.com/schneems/wicked/pulls
https://viblo.asia/p/tim-hiem-gem-wicked-trong-rails-NbmebBgleYO
### 6. Source code
https://github.com/MaiHoaTran/demo_wicked
### 7. Lời kết
Trên đây là những kiển thức cơ bản về gem Wicked mà mình tìm hiểu được. Bài viết của mình còn nhiều thiếu sót. Mong các bạn góp ý thêm cho mình. Cảm ơn sự quan tâm, theo dõi của các bạn.