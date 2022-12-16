Dưới đây mình chia sẽ một vài kiến thức về gem simple-form
# Đầu tiên chúng ta install gem đã nhé:
add vào Gemfile:
```bash
gem 'simple_form'
```
sau đó:
```bash
bundle install
```
Chạy generator:
```bash
rails generate simple_form:install
```
# Add Boostrap:
Simple Form  có thể dễ dàng tích hợp vào Bootstrap. Để làm điều đó bạn phải sử dụng tùy chọn bootstrap trong trình cài đặt, như sau:
```bash
rails generate simple_form:install --bootstrap
```
và hãy nhớ rằng phải add gem boostrap vào gemfile rồi nhé.
# Tạo Zurb Foundation 5:
```bash
rails generate simple_form:install --foundation
```
# Add gem Country Select:
```bash
gem 'country_select'
```
Nếu bạn không muốn sử dụng gem, bạn có thể dễ dàng ghi đè bằng cách thêm một dòng như thế này trong trình khởi tạo simple_form.rb của bạn:
```ruby
config.input_mappings = { /country/ => :string }
```
# Bắt đầu sử dụng nào:
Simple Form được thiết kế để tùy chỉnh theo nhu cầu của bạn. Về cơ bản đó là các thành phần được gọi để tạo ra một đầu vào html hoàn chỉnh cho bạn, theo mặc định có chứa nhãn, gợi ý, lỗi và đầu vào chính nó. Nó không nhằm mục đích tạo ra nhiều logic khác nhau từ các trình trợ giúp biểu mẫu Rails mặc định.
Để bắt đầu sử dụng Simple Form, bạn chỉ cần sử dụng helper nó cung cấp:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :username %>
  <%= f.input :password %>
  <%= f.button :submit %>
<% end %>
```
Điều này sẽ tạo ra toàn bộ form có tên người dùng và mật khẩu, và hiển thị lỗi theo mặc định khi bạn hiển thị form với dữ liệu không hợp lệ (sau khi gửi ví dụ).
Bạn có thể ghi đè nhãn mặc định bằng cách chuyển nó tới phương thức nhập. Bạn cũng có thể thêm gợi ý, lỗi hoặc thậm chí các placeholder. Đối với các đầu vào boolean, bạn cũng có thể thêm một nhãn nội tuyến:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :username, label: 'Your username please', error: 'Username is mandatory, please specify one' %>
  <%= f.input :password, hint: 'No special characters.' %>
  <%= f.input :email, placeholder: 'user@domain.com' %>
  <%= f.input :remember_me, inline_label: 'Yes, remember me' %>
  <%= f.button :submit %>
<% end %>
```
Trong một số trường hợp, bạn có thể muốn disable labels, gợi ý hoặc lỗi. Hoặc bạn có thể muốn định cấu hình html của bất kỳ những gì trong form:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :username, label_html: { class: 'my_class' } %>
  <%= f.input :password, hint: false, error_html: { id: 'password_error'} %>
  <%= f.input :password_confirmation, label: false %>
  <%= f.button :submit %>
<% end %>
```
Cũng có thể chuyển bất kỳ thuộc tính html nào thẳng vào đầu vào, bằng cách sử dụng tùy chọn: input_html, ví dụ:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :username, input_html: { class: 'special' } %>
  <%= f.input :password, input_html: { maxlength: 20 } %>
  <%= f.input :remember_me, input_html: { value: '1' } %>
  <%= f.button :submit %>
<% end %>
```
Nếu bạn muốn chuyển các tùy chọn tương tự cho tất cả các yếu tố đầu vào trong biểu mẫu (ví dụ: default class), bạn có thể sử dụng :defaults option in simple_form_for. Các option cụ thể trong input sẽ gọi default:
```erb
<%= simple_form_for @user, defaults: { input_html: { class: 'default_class' } } do |f| %>
  <%= f.input :username, input_html: { class: 'special' } %>
  <%= f.input :password, input_html: { maxlength: 20 } %>
  <%= f.input :remember_me, input_html: { value: '1' } %>
  <%= f.button :submit %>
<% end %>
```
Từ Simple Form generates một bọc div xung quanh lable và đầu vào của bạn theo default, bạn có thể chuyển bất kỳ thuộc tính html nào trong phần div đó và sử dụng option :wrapper_html
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :username, wrapper_html: { class: 'username' } %>
  <%= f.input :password, wrapper_html: { id: 'password' } %>
  <%= f.input :remember_me, wrapper_html: { class: 'options' } %>
  <%= f.button :submit %>
<% end %>
```
Và tất nhiên bạn có thể thêm required để validation:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :name, required: false %>
  <%= f.input :username %>
  <%= f.input :password %>
  <%= f.button :submit %>
<% end %>
```
Simple Form cũng cho phép bạn ghi đè loại đầu vào mặc định mà nó tạo:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :username %>
  <%= f.input :password %>
  <%= f.input :description, as: :text %>
  <%= f.input :accepts,     as: :radio_buttons %>
  <%= f.button :submit %>
<% end %>
```
cung cấp tùy chọn: disabled cho Simple Form và nó sẽ tự động đánh dấu trình bao bọc là bị vô hiệu hóa với một lớp CSS:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :username, disabled: true, hint: 'You cannot change your username.' %>
  <%= f.button :submit %>
<% end %>
```
Simple Form chấp nhận các input tùy chọn tương tự như helper giúp loại đầu vào tương ứng của chúng trong Rails:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :date_of_birth, as: :date, start_year: Date.today.year - 90,
                              end_year: Date.today.year - 12, discard_day: true,
                              order: [:month, :year] %>
  <%= f.input :accepts, as: :boolean, checked_value: true, unchecked_value: false %>
  <%= f.button :submit %>
<% end %>
```
Simple Form cũng cho phép bạn sử dụng nhãn, gợi ý, input_field, error và full_error:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.label :username %>
  <%= f.input_field :username %>
  <%= f.hint 'No special characters, please!' %>
  <%= f.error :username, id: 'user_name_error' %>
  <%= f.full_error :token %>
  <%= f.submit 'Save' %>
<% end %>
```
# Collections:
Muốn tạo ra một lựa chọn chứa độ tuổi từ 18 đến 50, bạn có thể dễ dàng tạo được với option :collection
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :user %>
  <%= f.input :age, collection: 18..50 %>
  <%= f.button :submit %>
<% end %>
```
Collections có thể là Array hoặc Range
Collection chấp nhận 2 option khác là:
- label_method
- value_method 

Thông thường Simple Form dùng item thứ nhất làm Array và item thứ hai làm value, nếu muốn thay đổi chúng bạn phải làm rõ ràng chúng như sau:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :gender, as: :radio_buttons, collection: [['0', 'female'], ['1', 'male']], label_method: :second, value_method: :first %>
<% end %>
```
# Priority
Simple Form hỗ trợ :time_zone và :country. Khi sử dụng helpers giúp như vậy, bạn có thể cho: ưu tiên là một tùy chọn để chọn múi giờ và / hoặc quốc gia nào cần được ưu tiên cao hơn:
```ruby
f.input :residence_country, priority: [ "Brazil" ]
f.input :time_zone, priority: /US/
```
Những giá trị này cũng có thể được cấu hình với một giá trị mặc định được sử dụng trên trang web thông qua các SimpleForm.country_priority và SimpleForm.time_zone_priority helpers
# Associations
Simple Form có thể tạo ra các select inputs, một loạt radios buttons hoặc checkboxes, hãy tưởng tượng bạn có một mô hình người dùng thuộc về một công ty và has_and_belongs_to_many roles. Cấu trúc sẽ giống như này:
```ruby
class User < ActiveRecord::Base
  belongs_to :company
  has_and_belongs_to_many :roles
end

class Company < ActiveRecord::Base
  has_many :users
end

class Role < ActiveRecord::Base
  has_and_belongs_to_many :users
end
```
và bây giờ có form user:
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :name %>
  <%= f.association :company %>
  <%= f.association :roles %>
  <%= f.button :submit %>
<% end %>
```
 Điều này sẽ hiển thị :select đầu vào cho sự lựa chọn :company, và cái khác :select input với :multiple option cho :roles. Bạn có thể thay đổi nó để sử dụng các nút radio và checkbox:
 ```ruby
f.association :company, as: :radio_buttons
f.association :roles,   as: :check_boxes
```
# Buttons
```erb
<%= simple_form_for @user do |f| %>
  <%= f.input :name %>
  <%= f.button :submit %>
<% end %>
```
 Ở trên sẽ chỉ cần gọi submit. Bạn chọn sử dụng nó hay không.

Phương thức button cũng chấp nhận các optional parameters, được ủy quyền cho submit call cơ bản:
    ```erb
    <%= f.button :submit, "Custom Button Text", class: "my-button" %>
    ```
 để tạo một button hãy sử dụng:
 ```erb
 <%= f.button :button, "Custom Button Text" %>

<%= f.button :button do %>
  Custom Button Text
<% end %>
```

Tóm lại: Việc sử dụng gem Simple Form giúp chúng ta tạo form một cách dễ dàng hơn rất nhiều, trên đây là một số kiến thức mình biết, các bạn có thể tham khảo ở [link này](https://github.com/plataformatec/simple_form) để tìm hiểu rõ hơn nhé :)