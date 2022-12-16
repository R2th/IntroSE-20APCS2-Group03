# Cài đặt
Cách cài đặt gem CanCanCan rất đơn giản như mọi gem khác
* *gem 'cancancan'*
* *bundle install*

# Cách sử dụng cơ bản
Giả sử trong project đã có các thành phần cơ bản. Mối user có đều role của họ.
* Các quyền của user được định nghĩa trong file Ability.rb
* Để tạo file này, chạy lệnh: rails g cancan:ability
* Trong file này, để cho phép user truy cập vào tài nguyên, ta dùng hàm can để cho phép hoặc cannot để không cho phép.

```ruby
class Ability
  include CanCan::Ability

  def initialize user
    can :read, [Product, Table]
    #user chưa đăng nhập có thể xem Product, Table
    return unless user
    # Nếu đăng nhập thì tiếp tục

    can [:show, :update], User, id: user.id
    # user nào thì xem và sửa profile của user đó
    case user.role
    when "admin"
      can :manage, :all
      # Admin có toàn quyền
    when "staff"
      can :manage, [Admin, OrderDetail, OrderTable, Order]
      # Staff có toàn quyền đối với trang admin dashboard, Order, OrderDetail, OrderTable
    when "guest"
      can :create, Order
      # Guest có thể tạo Order
    end
  end
end

```
* Trong view hay trong controller, để kiểm tra quyền, ta dùng can? hoặc cannot?.
```ruby
<% if can? :read, @order %>
  <%= link_to "View", @order %>
<% end %>
```
* Để lấy về danh sách các bản ghi mà user có thể truy cập, ta có thể sử dụng hàm:
```ruby
accessible_by(current_ability)
```
* Tuy nhiên, để CanCanCan có thể hoạt động một cách chính xác, chúng ta cần phải kiểm tra quyền của user với các action trong controller. Để làm được như vậy, ta cần thêm `authorize!` vào mỗi action trong mỗi controller. Ví dụ trong orders_controller.rb:
``` ruby
def show
  @order = Order.find_by(id: params[:id]))
  authorize! :read, @order
end
```
Nhưng làm như vậy rất tốn công, vì thế CanCanCan có `load_and_authorize_resource` để hỗ trợ chúng ta authorize tất cả action theo chuẩn RESTful.

```ruby
class UsersController < ApplicationController
  load_and_authorize_resource

  def show; end
end
```
* Vậy, nếu user không có quyền truy cập vào tài nguyên thì chuyện gì sẽ xảy ra?
* Khi đó exception CanCan::AccessDenied sẽ được tạo và ta sẽ xử lý nó trong ApplicationController.
```ruby
rescue_from CanCan::AccessDenied do |exception|
    flash[:warning] = exception.message
    redirect_to root_url
  end
```
Vậy là ta đã phân quyền người dùng xong xuôi rồi, tiếp là một số cách để phân quyền trong một số trường hợp đặc biệt.

# Một số options
## 1. Một số cách định nghĩa quyền của user.
* Ngoài cách dùng các action theo RESTful để định nghĩa quyền cho user, chúng ta còn có thể định nghĩa các action khác.Ví dụ:

    Trong Ability.rb có:
```ruby
can :asign_roles, User if user.admin?
```
Update role trong user_controller:
```ruby
def update
  authorize! :assign_roles, @user if params[:user][:assign_roles]
  #..update roles
end
```
* Ngoài ra, ta có thể tạo action alias để gộp nhiều action thành 1
```ruby
alias_action :show, :index :to => :read
```
* Ta có thể gán thêm điều kiện khi phân quyền:
```ruby
can :read, Order, active: true, user_id: user.id
# chỉ user nào sở hữu order mới có thể đọc được order đó
can :read, Product, Category: { status: "enable" }
# chỉ có thể đọc được product nào mà category nó thuộc về còn "enable"
```
## 2. Tách Ability
* Bên cạnh việc sử dụng class Ability để phân quyền, ta có thể tách các quyền có trong đó ra theo từng class khác nhau, có thể là tách theo model, tách theo controller.
* Để tách được Ability thì ta cần ghi đè phương thức current_ability trong application_controller
```ruby
def current_ability
  @current_ability ||= AccountAbility.new(current_account)
end
```
## 3. Bỏ qua phân quyền
- Để có thể kiểm tra quyền mà không phải thêm hàm load_and_authorize_resource
vào tất cả các controller thì thay vào đó, hãy thêm nó vào application_controller.
- Nếu không cần kiểm tra quyền ở controller nào thì thêm skip_authorize_resource
vào controller đó.
## 4. Kiểm tra việc phân quyền.
- Nếu có một controller nào đó bị bỏ qua khi phân quyền, thì có thể thêm check_authorization vào application_controller.
- Và nếu muốn bỏ qua việc check ở một controller nào đó thì thêm skip_authorization_check vào controller đó.
## 5. Lọc params
- Nếu trong action như create, update chỉ có đơn thuần các lệnh tạo dữ liệu mà không có lệnh nào để lọc params, tránh các rủi ro khi params có dữ liệu xấu thì CanCanCan sẽ giúp ta lo việc đó.
```ruby
class UsersController < ApplicationController
    def create
        if @user.save
          # hurray
        else
          render :new
        end
    end
end
```
 CanCanCan có 4 cách để lọc params và ưu tiên theo thứ tự như sau:
 + Gọi hàm xử lý params theo tên action:
```ruby
def create_params
  params.require(:user).permit(:name, :email)
end

def update_params
  params.require(:user).permit(:name)
end
```

+ Gọi hàm xử lý params theo tên model:
    
```ruby
def user_params
  params.require(:user).permit(:name)
end
```
+ Gọi hàm resource_params:
```ruby
def resource_params
    params.require(:user).permit(:name)
end
```
+ Gọi hàm xử lý params bất kì:
```ruby
load_and_authorize_resource param_method: :my_params

def my_params
    params.require(:user).permit(:name)
end
```
# Kết luận
Trên đây là một số cách để custom phân quyền với CanCanCan. Có rất nhiều options, nhưng không phải option nào cũng có hiệu quả với project của bản thân chúng ta. Vì vậy, chúng ta cần suy nghĩ kỹ, lựa chọn các options phù hợp với project của mình để áp dụng. Nếu không, việc phân quyền sẽ trở nên nặng nề, khiến project của chúng ta trở nên chậm chạp và có thể dẫn tới các sai sót không đáng có khác.

Nguồn: https://github.com/CanCanCommunity/cancancan/wiki