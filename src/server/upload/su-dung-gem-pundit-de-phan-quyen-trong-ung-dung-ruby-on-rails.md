Trong ứng dụng web liên quan đến quản lý người dùng có 2 phần là xác thực và phân quyền. Và bạn không thể phân quyền mà bỏ 
qua xác thực người dùng, chúng ta không biết bạn có thể làm gì trừ khi biết rõ bạn là ai.

Xác thực người dùng bằng tay là một task nhàm chán và đa số cộng đồng Rails sử dụng gem tuyệt vờiđó là Devise.

Trong bài viết này chúng ta sẽ nói về một gem mà chúng ta có thể sử dụng để phân quyền đó là gem Pundit
## Pundit là gì
Khi bạn có nhu cầu hạn chế truy cập một số người dùng nhất định, phân quyền theo role sẽ xuất hiện. Ở đây bạn có thể sử dụng Pundit. Pundit giúp định nghĩa policy là PORC - Plain Old Ruby Classes nghĩa là lớp này không kế thừa từ class khác hay bao gồm từ modules từ framework. Do đó làm cho nó dễ hiểu hơn.

Chúng ta vẫn sẽ cần xác định vai trò của người dùng của mình. Nhưng bây giờ lợi thế của chúng ta là giảm nhẹ cho controller và model. Policy sẽ xử lý phần phức tạp nhất cho model/controller là cho phép truy cập vào một trang cụ thể. Làm cho cuộc sống dễ thở hơn, bạn nghĩ sao?
## Cài đặt Pundit
Rất dễ dàng để thiết lập nó vào ứng dụng của bạn. [Trong tài liệu](https://github.com/varvet/pundit#installation) của gem được giả thích rõ ràng.
Tuy nhiên tôi vẫn để nó ở dưới đây:
* Thêm `gem 'pundit'` vào `Gemfle`
* Include Pundit vào application controller
* Chạy lện `bundle install`
* Tùy chọn `rails g pundit:install` sẽ thiết lập mặc định policy của ứng dụng 
Policy sẽ được định nghĩa ơ đường dẫn `app/polices`. Và đừng quên chạy lại Rails server để nhận các class mới bạn định nghĩa ở đây.
## Hiểu rõ về Policies
Giống như đã nói ở trước đó, policy là PORC, chứa phân quyền của các trang cụ thể.

Cùng xem một ví dụ về policy được lấy ở trong document của họ.
```
  class PostPolicy
    attr_reader :user, :post

    def initialize(user, post)
      @user = user
      @post = post
    end

    # CRUD actions
    def update?
      user.admin? or not post.published?
    end
  end
```
Đây là policy để xác định quyền hạn cập nhật bài viết nếu người admin hoặc nếu bài viết đã được công bố.
## Đặc điểm của lớp Policies
* Policy có tên nên bắt đầu với model tương ứng và nên kết thúc bằng hậu tố `Policy`. Ở ví dụ trên, PostPolicy là policy cho Post model.
* Hàm khởi tạo của policy cần biến instance và model được phân quyền. Chú ý, chúng ta có thể vài object khác mà chúng ta muốn phân quyền nếu model đơn giản. Ví dụ như, gọi một service hoặc form object mà chúng ta kiểm tra chúng khi thực hiện ở controller.
* Phương thức nên ứng với action trong controller hậu tố là `?`. Vì vậy, đối với action như new, create, edit,vv...., các phương thức được định nghĩa trong policy là new?, create?, edit? ...
Lưu ý Trong trường hợp controller không truy cập được vào current_user chúng ta có thể định nghĩa một pundit_user để sử dụng
```
def pundit_user
  User.find_by_other_means
end
```
Chúng ta cũng có thể trừu tượng hơn nưa Policy, nếu bạn chạy `rails g pundit:install` nó tạo một Application policy mặc định theo controller. Nó có thể kế thừa bởi policy khác
```
class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    false
  end

  def show?
    false
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    false
  end

  def edit?
    update?
  end

  def destroy?
    false
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope
    end
  end
end
```
Đợi chút sao class `Scope` được định nghĩa trong `ApplicationPolicy`. Và đó điều khiến Pundit tuyệt vời, chúng ta sẽ tìm hiểu nó sớm thôi.

Khi tạo base policy, thì PostPolicy của chúng ta trông đơn giản như sau:
```
class PostPolicy < ApplicationPolicy
    # Here we are overriding :update? inherited from ApplicationPolicy
    def update?
      user.admin? or not record.published?
    end
  end
```
Khi cấu hình xong, hãy cùng xem thay đổi trong controller.
```
class PostController < ApplicationController
  def update
    post = current_user.posts.find(params[:id])
    authorize post
    if post.update(post_params)
      redirect_to post
    else
      render :edit
    end
  end

  # other controller actions
end
```
Trong mã code này, hành động cập nhập trong controller khi gọi vào phân quyền và phương thức phân quyền thì nó gọi đến policy đã có, khởi tạo bản ghi và người dùng cuối  cùng quăng ra lỗi nếu người dùng không được cấp quyền thực hiện hành đông.
## Hiểu rõ về Scopes
`Scope` cũng giống như trong scope trong model. Nhưng, scope ở đây được thực hiện trong policy theo role của người dùng tương ứng với hành động trong controller. Scope được sử dụng để lấy tập con của bản ghi mà ta có. Ví dụ, trong ứng dụng blog, không phải admin người dùng chỉ xem được các bài viết đã được công bố nhưng không ở trạng nháp. Bạn có hình dung ra controller và model sẽ gọn hơn nhiều.

Post policy viết lại:
```
class PostPolicy < ApplicationPolicy
  # Inheriting from the application policy scope generated by the generator
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(published: true)
      end
    end
  end

  def update?
    user.admin? or not record.published?
  end
end
```
Ở đây chúng ta tạo một class Scope lấy bài viết dựa trên quyền của người dùng. Và để sử dụng nó trong controller của chúng ta, chúng ta cần dùng phương thức policy_scope.
## Đặc điểm của lớp Scope
* Nó như PORC, được nồng vào trong class policy
* Nó cần được khởi tạo với một người dùng và một scope với có thể là lớp ActiveRecord hoặc ActiveRecord::Relation.
* Nó cần định nghĩa phương thức giả quyết theo vai trò của người dùng.

Bây giờ cùng viết lại index trong Post controller của chúng ta: 
```
class PostController < ApplicationController
  def new
    # code to render new view
  end

  def create
    # code to create
  end

  def edit
    # code to render edit
  end

  def update
    post = current_user.posts.find(params[:id])
    authorize post
    if post.update(post_params)
      redirect_to post
    else
      render :edit
    end
  end

  def show
    # code to render show
  end

  def index
    policies = policy_scope(Post)
    # code to render index
  end
end
```
Trong index sẽ chỉ hiển thị nhưng bài viết được công bố nếu user không phải là admin
## Các thực hành tốt nhất có thể sử dụng Pundit
### Giữ phân quyền rõ ràng
Thay vì phân quyền và sopce ngầm ta có thể thêm các bước kiểm tra ở ApplicationController để ngoại lệ được đưa ra nêu chúng ta quyên thêm phân quyền hoặc policy_scope trong controller của chúng ta.
```
class ApplicationController < ActionController::Base
  include Pundit
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
end
```
Tuy nhiên chúng ta có thể sử dụng skip_authorization hoặc skip_policy_scope  trong trường hợp bạn muốn vô hiệu hóa hành đông.
### Giữ một hệ thống đóng
Nếu như bạn sử dụng một base Policy như ApplicationPolicy. Chúng ta có thể gây lỗi nếu người dùng không được xác thực.
```
class ApplicationPolicy
  def initialize(user, record)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user = user
    @record = record
  end
end
```
### Xử lí lỗi trong phân quyền
Pundit::NotAuthorizedError sẽ gây lỗi nếu chưa xác thực, chúng cần xử lý lỗi đẹp hơn. Điều này thực hiện bằng cách sử dụng rescue_from cho Pundit::NotAuthorizedError và chuyển qua một phương thức xử lý ngoại lệ.
Chúng ta có thể thêm một bước xử lý ngoại lệ và tùy chỉnh thông báo dự trên policy không được phân quyền.
```
class ApplicationController < ActionController::Base
  protect_from_forgery
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    policy_name = exception.policy.class.to_s.underscore

    flash[:error] = t "#{policy_name}.#{exception.query}", scope: "pundit", default: :default
    redirect_to root_path
  end
end
```
Bạn có thể thêm file thông báo như thế này:
```
en:
 pundit:
   default: 'You cannot perform this action.'
   post_policy:
     update?: 'You cannot edit this post!'
     create?: 'You cannot create posts!'
```
Đây là một cách thiết lập thông báo lỗi cho phân quyền, chúng ta cung cấp thông tin cho NotAuthorizedError , truy vấn nào( ví dụ :create?), bản ghi nào (ví dụ: một bài đăng), và policy nào (ví dụ: PostPolicy) khiến lỗi được nêu ra. Cuối cùng, nó phụ thuộc vào cách bạn tổ chức file ngôn ngữ. Ngoài ra chúng ta có thể trả về trang 403 bằng tùy chỉnh trong application.rb
```
config.action_dispatch.rescue_responses["Pundit::NotAuthorizedError"] = :forbidden
```
### Mở rộng policy với nhiều role
Thường có nhiều yêu cầu CRUD khác nhau trong các giá trị phân quyền của các role. Trong ví dụ, có thêm quyền 'premium'. Và có những bài đăng chỉ có thể xem bởi admin và người dùng premium. Đừng lo lắng bạn chỉ cần tạo vai trò premium trong policy và cập nhập lại PostPolicy như sau. 
```
class PostPolicy < ApplicationPolicy
  # Inheriting from the application policy scope generated by the generator
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      elsif user.premium?
        scope.where(published: true)
      else
        scope.where(published: true, premium: false)
      end
    end
  end

  def update?
    user.admin? || !record.published?
  end

  def show?
    return user.premium? || user.admin? if record.premium?
    true
  end
end
```
Với những thay đổi, một người dùng không thể xem các bài đăng premium trong index và không hiển thị các trang mà chỉ người dùng premium được xem. Trông rất gọn. Chúng ta không phải phân quyền cho model và controller mà do Pundit thực hiện công việc nặng.
Điều này cho chúng ta kiểm soát role dễ hơn và giờ hiểu rõ cấu trúc của Pundit hoạt động ra sao và nhưng quy chuẩn nào cần phải tuân theo, việc viết mã phân quyền trở lên trực quan hơn. Controller và model nhẹ hơn.

## Tham khảo
Bài viết được dịch từ nguồn: https://crypt.codemancers.com/posts/2018-07-29-leveraging-pundit/?fbclid=IwAR1BEDa3rJvY8QB9CDksIj5hbTRcRpcKOZ-OnLvwSipUzDyUQWMXh5_bZCs