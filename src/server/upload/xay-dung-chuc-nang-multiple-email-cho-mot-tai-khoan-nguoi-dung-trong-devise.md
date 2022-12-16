Hi mọi người, dạo gần đây công ty đâng nâng cao bảo mật, nên tài khoản git cá nhân cũng như 1 số site khác đều bắt buộc phải thêm email của công ty vào. Ngồi vọc vọc thì thấy có chức năng vốn dĩ nó đã tồn tại từ bao đời nay mà mình k biết, hay là không quan tâm lắm, đó là chức năng setting nhiều email cho một tài khoản ở một site nào đó. Ngồi cum cum một hồi thì cũng ra, nên mình viết bài hướng dẫn làm cái chức năng xíu xíu đó cho bạn nào cần :v:
Như các bạn đã biết, devise là một gem cực kì phổ biến trong framework Rails cho vấn đề authenticate và authorization. Tuy nhiên, hiện tại devise không hỗ trợ cho phép người dùng log in bằng nhiều email khác nhau. Cho nên mình sẽ biến đổi một chút để có thể thực hiện điều đó với gem devise trong framework Rails.
### Khởi tạo Email model
Về ý tưởng thì cực kì đơn giản, mình khởi tạo một model Email có quan hệ với model User để có thể lưu lại các email mà người dùng muốn thêm vào. Cụ thể , đầu tiên chúng ta sẽ khởi tạo một model tên là Email.
```
rails g model email email:string user_id:integer
```
Sau đó chúng ta sẽ thiết lập mối quan hệ giữa user và email.
```
class Email < ActiveRecord::Base
  belongs_to :user
  validates :email, email: true, presence: true, uniqueness: true
end
```
Format email mà mình sử dụng được lấy từ gem [email_validator](https://github.com/balexand/email_validator) hoặc các bạn có thể build một regex email theo chuẩn RFC 5322.
```
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :emails
end
```
Sau khi đã thiết lập quan hệ cho các model, bước tiếp theo mình sẽ xóa bỏ trường **email** mặc định của devise ở bảng users vì hiện tại ta đã có bảng email để lưu lại các email đăng nhập của user đó. Tuy nhiên, thay vào đó chúng ta cần phải thêm vào trường **default_email_id** để có thể xác định email nào là email chính của tài khoản để thực hiện việc trao đổi thông tin, tìm kiếm, etc... (trong github hay facebook hoặc các site khác đều có chức năng tương tự mà thôi). Mình sẽ tạo một file migration:
```
rails g migration add_default_email_to_users default_email_id:integer
```
Trong file migration mình sẽ có nội dung như sau:
```
class AddDefaultEmailToUsers < ActiveRecord::Migration
  def change
    remove_column :users, :email
    add_column :users, :default_email_id, :integer
  end
end
```
Trong model User mình khởi tạo thêm một relation về default email.
```
belongs_to :default_email, class_name: Email.name
```
### Chỉnh sửa lại chức năng đăng kí tài khoản
Sau khi tiến hành chỉnh sửa lại model và các quan hệ như trên, lúc này nếu chúng ta tiến hành truy cập vào trang đăng kí tài khoản thì sẽ bị màn hình lỗi như sau, bởi vì chúng ta đã remove trường email khỏi model User cho nên trong devise view sẽ không hiểu giá trị email là gì.
![](https://images.viblo.asia/7fe4cb20-090c-4713-a2ee-55b4496ba6ec.png)
Để giải quyết vấn đề trên, chúng ta sẽ rewrite lại một chút ở model User, để ở devise view có thể hiểu được trường email là gì thì chúng ta sẽ khai báo một attribue email accessors tương tự như là một trường email mặc định đã được devise sinh ra trước đó thông qua relation default email như dưới đây:
```
class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :emails, dependent: :destroy

  belongs_to :default_email, class_name: Email.name
  validates :default_email, presence: true
  default_scope { includes :default_email }

  after_commit :save_default_email, on: :create

  def email
    default_email.email rescue nil
  end

  def email= email
    self.default_email = Email.where(email: email).first_or_initialize
    errors.add(:base, :taken) if default_email.persisted? && default_email.user != self
  end

  def will_save_change_to_email?
    false
  end

  private

  def save_default_email
    if default_email.user.blank?
      default_email.user = self
    end
    default_email.save!
  end
end
```

Chú ý rằng ở đây mình đã override lại hàm **will_save_change_to_email?**, nguyên nhân la do hiện tại mình đã tiến hành xóa đi trường email, cho nên mình viết lại hàm đó để nó trả về giá trị false, lúc này devise sẽ bỏ qua và không validate trường email lúc khởi tạo nữa.
Chi tiết hơn các bạn có thể tham khảo ở link [devise validatable](https://github.com/plataformatec/devise/blob/master/lib/devise/models/validatable.rb) (đối với rails bé hơn 5.1 thì hàm cần validate sẽ là email_changed?).
Còn đối với after commit hook, thì nó là bắt buộc, khi khởi tạo một user, thì do nó chỉ có 1 email duy nhất nên mặc định giá trị email đó là giá trị email mặc định của nó luôn.

### Chỉnh sửa lại chức năng đăng nhập.
Sau khi đã đăng kí tài khoản thành công rồi thì nếu chúng ta sử dụng tài khoản đó để đăng nhập thì sẽ gặp lỗi như sau:
![](https://images.viblo.asia/3a61088e-bbd7-46a4-8408-dd207c93bbef.png)
Lỗi là điều hiển nhiên, vì hiện tại chúng ta đã remove trường email, khi devise tiến hành tìm kiếm tài khoản theo email thì đương nhiên nó sẽ không tồn tại. Vì vậy chúng ta cần tiếp tục config devise lại một chút để nó tìm kiếm email ở trên bảng emails mà chúng ta đã tạo. Mình thực hiện việc đó bằng cách override lại class method là **find_first_by_auth_conditions**
```
class User < ActiveRecord::Base
  ...

  def self.having_email email
    User.joins(:emails).where(emails: { email: email }).first
  end

  def self.find_first_by_auth_conditions warden_conditions
    conditions = warden_conditions.dup
    if email = conditions.delete(:email)
      having_email email
    else
      super(warden_conditions)
    end
  end

  private

  ...
end
```
Well done, như vậy là luồng login đã thành công :D
### Chức năng quản lí email
Hiện tại chúng ta đã cài đặt được việc đăng nhập và đăng ký tài khoản. Tuy nhiên người dùng làm thế nào để có thể quản lý các email của họ. Lúc này devise đã sinh ra view mặc định của nó như bên dưới.
![](https://images.viblo.asia/8ae520d7-a449-4c40-98b1-05353f99f1e2.png)

Form này tất nhiên là hoạt động bình thường, vì chúng ta đã cài đặt biến email accessor nên ở form này không có bị crash như ở form đăng nhập và đăng ký tài khoản. Tuy nhiên cái chúng ta đang muốn xây dựng là người dùng có thể cài đặt sử dụng nhiều email trên một tài khoản lại chưa có. Để thực hiện chức năng này, mình sẽ sử dụng nested attribute để người dùng có thể thêm vào hoặc xóa các email cho một tài khoản. Có nhiều giải pháp để thực hiện tuy nhiên nhanh gọn nhất là sử dụng [gem cocoon](https://github.com/nathanvda/cocoon).
Đầu tiên chúng ta cần thêm vào accept nested attribute ở file model User, chỉ 1 dòng thôi.
```
class User < ActiveRecord::Base
  ...
  accepts_nested_attributes_for :emails, reject_if: :all_blank, allow_destroy: true
  ...
end
```
Tiếp đến chúng ta cần tạo ra các file devise view để có thể chỉnh sửa lại giao diện theo ý muốn. Sử dụng câu lệnh **rails g devise:views** để sinh ra các file view mặc định của devise, rồi chỉnh sửa ở file **app/views/devise/registrations/edit.html.erb**
Chúng ta chỉnh sửa template để thêm nested form vào cho email như sau:
```
<h2>Edit <%= resource_name.to_s.humanize %></h2>

<%= form_for(resource, as: resource_name, url: registration_path(resource_name), html: { method: :put }) do |f| %>
  <%= devise_error_messages! %>

  <div><%= f.label :email, "Default Email" %><br />
  <%= f.email_field :email, autofocus: true %></div>

  <div>
    <%= f.fields_for :emails do |email_f| %>
      <%= render 'email_fields', f: email_f %>
    <% end %>
    <div class="links">
      <%= link_to_add_association 'Add Email', f, :emails %>
    </div>
  </div>

  <% if devise_mapping.confirmable? && resource.pending_reconfirmation? %>
    <div>Currently waiting confirmation for: <%= resource.unconfirmed_email %></div>
  <% end %>

  <div><%= f.label :password %> <i>(leave blank if you don't want to change it)</i><br />
    <%= f.password_field :password, autocomplete: "off" %></div>

  <div><%= f.label :password_confirmation %><br />
    <%= f.password_field :password_confirmation, autocomplete: "off" %></div>

  <div><%= f.label :current_password %> <i>(we need your current password to confirm your changes)</i><br />
    <%= f.password_field :current_password, autocomplete: "off" %></div>

  <div><%= f.submit "Update" %></div>
<% end %>

<h3>Cancel my account</h3>

<p>Unhappy? <%= button_to "Cancel my account", registration_path(resource_name), data: { confirm: "Are you sure?" }, method: :delete %></p>

<%= link_to "Back", :back %>
```
Để gem cocoon có thể render ra các nested field, chúng ta cần một email field partial như sau:
```
<div class="nested-fields">
  <div>
      <%= f.label :email %>
      <%= f.email_field :email %>
      <%= link_to_remove_association "remove email", f %>
  </div>
</div>
```
Đến thời điểm này, nếu chúng ta thử submit form, thì giá trị email trong nested field sẽ không được lưu, nguyên nhân là do strong parameter được chỉ định bởi devise không chứa trường email trong nested, vì vậy để có thể lưu được, chúng ta cần chỉnh sửa lại ở file appilcation_controller.rb  như sau:
```
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit :email, :password, :password_confirmation, :current_password, emails_attributes: [:email, :id, :_destroy]
    end
  end
end
```
Bây giờ, nếu bạn tiến hành thêm, xóa hoặc chỉnh sửa email thì nó đã hoạt động 1 cách thông suốt.
### Kết luận
Như vậy ở bài viết này mình đã giới thiệu một cách cơ bản để làm thế nào xây dựng chức năng multiple email cho một tài khoản user. Tuy nhiên nếu các bạn chú ý thì có thể thấy nó vẫn còn mắc một số vấn đề chưa giải quyết như sau:
1) Làm thế nào để thay đổi default email giữa các email đã nhập thay vì phải nhập bằng tay vào trường default_email
2) Trong trường hợp confirm một email thì như thế nào ? Vì ở các hệ thống, muốn thêm một email vào một tài khoản thì đều phải thông qua bước xác nhận của email được thêm vào đó.
3) Trong trường hợp login sử dụng Omniauth thì sao ?

Những vấn đề trên thì mình sẽ giải quyết nó trong bài viết tới, vì hiện tại mình vẫn đang tìm solution =)) . Hẹn gặp lại các bạn.