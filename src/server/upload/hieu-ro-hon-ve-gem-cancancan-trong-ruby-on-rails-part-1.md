# 1. Giới thiệu chung
* CanCanCan là một thư viện phân quyền cho Ruby và Ruby on Rails, nó hạn chế những tài nguyên mà một người dùng nhất định được phép truy cập.
* Tất cả các quyền có thể được xác định trong một hoặc nhiều tệp khả năng và không bị trùng lặp trên controller, view và query DB, giữ logic phân quyền ở một nơi để dễ dàng bảo trì và kiểm tra. <br>
![](https://images.viblo.asia/e817972d-4787-4197-adee-1194a5704c3c.png)

# 2. Abilities in Database
Điều gì sẽ sảy nếu bạn hoặc khách hàng muốn thay đổi quyền mà không phải triển khai lại Ứng dụng? Trong trường hợp đó, tốt nhất có thể lưu trữ logic quyền trong cơ sở dữ liệu: rất dễ sử dụng các bản ghi cơ sở dữ liệu khi xác định các khả năng. <br>
```
    class Ability
      include CanCan::Ability

      def initialize user
        if user.admin?
          can :manage, :all
          cannot :create, Borrowing, user_id: user.id
          cannot :read, Borrowing
        else
          can :create, Borrowing
          can :read, Borrowing, user_id: user.id
          can :read, Borrowing, ["user_id = ?", user.id] do |borrowing|
            borrowing.created_at.year >= 2021
          end
        end
      end
   end
```
Trong CanCanCan các action được thể hiện như sau: 
```
def eval_cancan_action(action)
  case action.to_s
  when "index", "show", "search"
    cancan_action = "read"
    action_desc = I18n.t :read
  when "create", "new"
    cancan_action = "create"
    action_desc = I18n.t :create
  when "edit", "update"
    cancan_action = "update"
    action_desc = I18n.t :edit
  when "delete", "destroy"
    cancan_action = "delete"
    action_desc = I18n.t :delete
  else
    cancan_action = action.to_s
    action_desc = "Other: " << cancan_action
  end

  return action_desc, cancan_action
end
```
# 3. Ability for Other User
Điều gì xảy ra nếu bạn muốn xác định quyền của Người dùng không phải là `current_user` ? Giả sử mình muốn xem liệu một user khác có quyền xem được phiếu mượn hay không <br>
**`some_user.ability.can? :update, @borrowing`** <br>
<br>
Thêm phương thức `ability` vào model `User`: <br>
```
def ability
  @ability ||= Ability.new(self)
end
```

Sử sụng delegate để có thể gọi trực tiếp từ `User`: <br>
```
class User < ActiveRecord::Base
  delegate :can?, :cannot?, to: :ability
end
```
Kết quả sẽ được như sau: 

```
User.last.can? :read, Borrowing.first
   (0.7ms) 
  User Load (0.7ms)  SELECT `users`.* FROM `users` WHERE `users`.`deleted_at` IS NULL ORDER BY `users`.`id` DESC LIMIT 1
  Borrowing Load (1.3ms)  SELECT `borrowings`.* FROM `borrowings` WHERE `borrowings`.`deleted_at` IS NULL ORDER BY `borrowings`.`id` ASC LIMIT 1
=> false
```

Cuối cùng, nếu bạn muốn xem current_user có quyền truy cập vào object nào không thì tốt nhất bạn nên ghi đè mothod current_ability trong ApplicationController.

```
def current_ability
  @current_ability ||= current_user.ability
end
```
Kết quả sẽ được test như sau: 

```
current_ability.can? :create, Borrowing
=> false
```
# 4. Ability Precedence
Một ability rule sẽ ghi đè một ability rule trước đó. Giả sử Admin có toàn quyền với Borrowing, nhưng không được xoá chúng.

   ```
     can :manage, Borrowing
     cannot :destroy, Borrowing
```
 Điều quan trọng là `cannot :destroy, Borrowing` sau dòng `can :manage, Borrowing` . Như vậy,` cannot :destroy` sẽ bị overridden bởi `can :manage`.
 
 Việc thêm `can` không ghi đè rule trước đó. 
 <br>
```
   can :read, Borrowing, user_id: user.id
   can :read, Borrowing do |borrowing|
     borrowing.created_at.year > 2021
   end
```
`can? :read` sẽ luôn trả về true nếu user_id = user.id kể cả nếu Borrowing có thời gian tạo nhỏ hơn 2021
# 5. Accessing request data
   Điều gì sẽ xảy ra nếu bạn cần sửa đổi các quyền dựa trên thứ gì đó bên ngoài đối tượng User? Giả sử bạn muốn đưa các địa chỉ IP nhất định vào danh sách đen khỏi việc tạo comment. Địa chỉ IP có thể truy cập thông qua request.remote_ip nhưng class Ability không có quyền truy cập vào địa chỉ này.  Cách đơn giản đề sửa đổi những gì mà bạn truyền vào cho đối tượng Ability bằng việc ghi đè phương thức current_ability trong ApplicationController.
 
  ```
 class ApplicationController < ActionController::Base
    private

    def current_ability
      @current_ability ||= Ability.new(current_user, request.remote_ip)
    end
  end
```
```
class Ability
  include CanCan::Ability

  def initialize(user, ip_address=nil)
    can :create, Comment unless BLACKLIST_IPS.include? ip_address
  end
end
```
Concept này cũng có thể áp dụng cho Session hay Cookie.

# 6. Authorization for Namespaced Controllers
Mặc định trong gem CanCanCan là  quyền dựa trên user và object được xác định trong load_resource. Nhưng nếu bạn có 1 SearchController và Admin::SearchController, bạn có thể sử dụng một số  tiếp cận khác.<br>
Trong trường hợp này, chỉ cần ghi đè lại method `current_ability` trong ApplicationController để include  controller namespace,  và tạo một `class Ability ` biết phải làm gì với nó

```
class ApplicationController < ActionController::Base

  private
  
  def current_ability
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
```
```
class Ability
  include CanCan::Ability

  def initialize(user, controller_namespace)
    case controller_namespace
      when "Admin"
        can :manage, :all if user.admin?
      else
        # rules for non-admin controllers here
    end
  end
end
```
Còn một cách khác là sử dụng một  Ability class khác trong controller này: 
```
class Admin::BaseController < ActionController::Base
  #...

  private

  def current_ability
    @current_ability ||= AdminAbility.new(current_user)
  end
end
```
## Kết luận
Thông qua bài viết này, mình mong giúp các bạn hiểu hơn về gem CanCanCan.
<br>
Tài liệu tham khảo [(https://github.com/CanCanCommunity/cancancan/wiki)]