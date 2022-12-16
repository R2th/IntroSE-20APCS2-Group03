# Giới thiệu
Chào các bạn, khi chúng ta việc với chúng ta sẽ gặp các spec yêu cầu như là tạo form đăng ký step by step. Việc phải đáp ứng deadline cũng như yêu cầu về sự clear của code thì việc dùng Gem cũng là một giải pháp mà chúng ta muốn hướng đến. Trong bài viết ngày hôm nay thì mình muốn giới thiệu về gem wicked.
![](https://images.viblo.asia/430c2ff4-c102-443e-a113-4f030323f903.PNG)
# Mô tả bài toán
Khi tìm hiểu 1 cái gì đó, tốt nhất chúng ta nên đặt ra 1 output cho cái đó. Và kết quả bài chia sẻ này mình muốn đó là:
* Xây dựng một form-step có 3 step lưu được dữ liệu vào db.
* Mỗi step đều đảm bảo có validate dữ liệu.
* Phải đảm bảo cấu trúc code được tổ chức clear, dễ sử dụng
![](https://images.viblo.asia/4a8e6c4e-cf30-4be1-9a1c-4ef214e8135f.gif)
# Cài đặt
khởi tạo dự án:
```
rails new myapp
```
Thêm dòng sau vào trong file Gemfile và chạy `bundle install`
```
gem "wicked"
```
Khởi tạo db và chạy `rails db:migrate`
```
rails g model Users email:string password:string first_name:string last_name:string phone:string address:string
```
# Ý tưởng của gem wicked
Khi vào form đăng ký thì bước đầu tiên là sẽ tạo mới 1 bản ghi trống (chỉ có id được tự sinh ra). Rồi ở mỗi step sau đó chỉ đơn giản là việc update cho chính form đó mà thôi. Tất cả các xử lý logic của step sẽ được viết trong duy nhất 1 controller.   
Còn về việc validate dữ liệu mình sẽ dùng context để lưu được trạng thái của từng step để có thể validate được, cái này mình sẽ trình bày ở phần sau.
Trong controller chỉ sử dụng duy nhất 2 function `show` và `update`:
* function `show` có nhiệm vụ hiển thị ra form tương ứng function
* function `update` có nhiệm vụ update bản ghi vào db
- Một số helper của wicked ở controller
```
steps  :first, :second                        # Sets the order of steps
step                                          # Gets current step
next_step                                     # Gets next step
previous_step                                 # Gets previous step
skip_step                                     # Tells render_wizard to skip to the next logical step
jump_to(:specific_step)                       # Jump to :specific_step
render_wizard                                 # Renders the current step
render_wizard(@user)                          # Shows next_step if @user.save, otherwise renders
render_wizard(@user, context: :account_setup) # Shows next_step if @user.save(context: :account_setup), otherwise renders
wizard_steps                                  # Gets ordered list of steps
past_step?(step)                              # does step come before the current request's step in wizard_steps
future_step?(step)                            # does step come after the current request's step in wizard_steps
previous_step?(step)                          # is step immediately before the current request's step
next_step?(step)                              # is step immediately after the current request's step
```
Một số helper của view:
```
wizard_path                  # Grabs the current path in the wizard
wizard_path(:specific_step)  # Url of the :specific_step
next_wizard_path             # Url of the next step
previous_wizard_path         # Url of the previous step
```
# Tiến hành
## Xây dựng controller
Để xây dựng được form hoành chỉnh + code được clear rõ ràng thì mình sẽ xây dựng 2 controller, 1 controller làm nhiệm vụ tạo mới bản ghi, 1 controller xử lý logic của form. Cụ thể là:
UsersController: tạo mới bản ghi sau đó điều hướng tới steps controller .
StepsController: config form-step.

Cấu trúc controller

![](https://images.viblo.asia/b83a67e5-3aa4-4b63-b55b-e0cdac062e94.PNG)
Tiến hành xây dựng UserController.rb
```
class UsersController < Applicationcontroller
  def new
    @user = User.create

    redirect to user step path @user, :stepl
  end
end
```
Tiếp đến là StepController.rb đây là controller xử lý logic của các step:
Đầu tiền chúng ta cần include 
```

class Stepscontroller < Applicationcontroller
  before action :load_user

  #  Thêm thư viện wicked
  include Wicked::Wizard

  #  Khai báo các step
  steps :stepl, :step2, :Step3

  def show
    # render ra step hiện tại
    renderwizard
  end

  def update
    @user.step = step # Lưu trạng thái step vào controller
    @user.update user_params context: step
    render wizard @user # render step tiêp theo
  end

  private
  def user params
  params.require(:user).permit(:email, password, :first name, :last name, :address,:phone)
  end

  def load user
    @user = User.find params[:user id]
  end
end
```
## Cấu trúc thư mục view
Khai báo bao nhiêu step thì sẽ tại bấy nhiêu file view ở trong views/steps
![](https://images.viblo.asia/944ef7da-d8ed-40f9-8ac5-c9f3b14c2da6.PNG)
Chúng ta vẫn xây dựng form view như bình thường, từng form view sẽ có các attri tương ứng với step đó, tuy nhiên sẽ có 1 số chú ý sau:
- Thêm option method: :put (theo RESTful) để trỏ về hàm update.
- Gán url: wizard_path (đây là 1 method của wicked để lấy ra path của step hiện tại).

```
<%= form_with(model: @user, url: wizardpath, method: :put, local: true) do |form| %>
  <div class="field">
    <%= form.label :email %>
    <%= form.text_field :email, id: :user_email %>
  </div>

  <div class="field">
    <%= form.label :password %>
    <%= form.text_field :password, id: :user_password %>
  </div>

  <div class="actions">
    <%= form.submit "Next step", "data-remote": false %>
  </div>
<% end %>
```
## Validate theo từng step
Tạo validate trong form-step:
Ý tưởng là mình sẽ dùng context (bối cảnh) để thực hiện validate theo từng ứng từng step:
Các bạn chú ý ở bước save mình đã truyền tên step vào context để model có thể validate đúng theo từng step được
```
class User < ApplicationRecord
    validates :email, :passsword, presence: true, on: :stepl
    validates :first name, :last_name, presence: true, on: :step2
end
```
## Kết quả bài viết
![](https://images.viblo.asia/76da2419-8f23-4a0b-b980-a97fdb8226ff.gif)
Cảm ơn các bạn theo dõi bài viết của mình.