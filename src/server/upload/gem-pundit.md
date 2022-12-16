Ứng dụng web liên quan đến quản lý người dùng có hai phần, đó là xác thực và ủy quyền. Khi bạn xây dựng một ứng dụng rails với nhiều vai trò của người dùng, điều quan trọng là phân cấp người dùng của bạn. Có 2 biện pháp hiện đang được sử dụng rộng rãi là: Cancancan và Pundit.  Nhưng  trong bài viết này tôi sẽ giới thiệu cho bạn  gem pundit một gem để quản lý vai trò người dùng.
Khi có nhu cầu hạn chế quyền truy cập vào ứng dụng của bạn đối với một số người dùng nhất định, ủy quyền dựa trên vai trò sẽ có tác dụng. Pundit giúp chúng ta xác định các chính sách là PORC - Plain Old Ruby Classes - có nghĩa là lớp này không kế thừa từ các lớp khác cũng như không bao gồm trong các mô-đun khác từ framework

Pundit cung cấp một bộ helpers hướng dẫn bạn sử dụng các class Ruby thông thường và các mẫu thiết kế hướng đối tượng để xây dụng một hệ thống ủy quyền đơn giản , mạnh mẽ và có thể mở rộng.
# Cách bạn làm việc với Pundit
- Đầu tiên tạo class Policy liên quan đến việc cho phép truy cập vào một bản ghi cụ thể 
- Sau đó gọi hàm ủy quyền tích hợp, chuyển qua những gì bạn đang cố gắng ủy quyền truy cập
-  Pundit sẽ tìm class Policy phù hợp và method Policy khớp với tên của method bạn đang ủy quyền. Nếu nó trả về đúng, bạn có quyền thực hiện action, còn không sẽ raise ra một exception.
# Cài đặt 
Thêm vào gem file sau đó chạy bundle install 
```
gem "pundit"
```
include Pundit vào trong application controller:
```
class ApplicationController < ActionController::Base
  include Pundit
end

```
Sau đó có thể chạy generator, trình tạo sẽ thiết lập chính sách ứng dụng với một số giá trị mặc định hữu ích 
```
rails g pundit:install
```
Sau khi tạo chính sách ứng dụng của bạn, khởi động lại server để Rails có thể chọn bất kỳ class  nào trong thư mục app/policies/ directory .
# Policies
Pundit tập trung vào các khái niệm về policy classes. Nên đưa các class vào app/policies . Đây là một ví dụ đơn giản cho phép cập nhật bài đăng nếu người dùng là quả trị viên hoặc nếu bài đăng chưa được xuất bản :
```
class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def update?
    user.admin? || !post.published?
  end
end
```
Như bạn có thể thấy, đây chỉ là một lớp Ruby đơn giản. Pundit đưa ra các giả định sau về class này :
- Class có cùng tên với một số loại model class, chỉ có hậu tố là 'Policy'
- Đối số đầu tiên là người dùng . Trong controller, Pundit sẽ gọi method current_user để truy xuất những gì cần gửi vào đối số này.
- Đối số thứ 2 là một loại mô hình đối tượng mà bạn muốn kiếm trả ủy quyền. Điều này không cần phải là một ActiveRecord hoặc thậm chí là một đối tượng ActiveModel
- Class thực hiện một số loại phương thức truy vấn trong trường hợp này là update?. Thông thường, điều này sẽ ánh xạ đến tên của một hành động bộ điều khiển cụ thể.
```
 class PostPolicy < ApplicationPolicy
  def update?
    user.admin? or not record.published?
  end
End
```
Trong ApplicationPolicy đã tạo, model object được gọi là  record 
Giả sử rằng bạn có một phiên bản của class Post, Pundit giờ đây cho phép bạn thực hiện việc này trong controller của mình
```
def update
  @post = Post.find(params[:id])
  authorize @post
  if @post.update(post_params)
    redirect_to @post
  else
    render :edit
  end
end
```
Phương thức ủy quyền tự động suy ra rằng  Post sẽ có một class PostPolicy và khởi tạo class này đưa vào người dùng hiện tại và bản ghi đã cho. Sau đó , nó suy ra từ tên action, nó được gọi là update? trong trường hợp này của policy. Trong trường hợp này, bạn có thể tưởng tượng rằng  authorize sẽ thực hiện một cái gì đó như thế này:
```
unless PostPolicy.new(current_user, @post).update?
  raise Pundit::NotAuthorizedError, "not allowed to update? this #{@post.inspect}"
end
```
Bạn có thể chuyển đối số thứ 2 để ủy quyền nếu tên của quyền bạn muốn kiểm tra không khớp mới tên action
```

def publish
  @post = Post.find(params[:id])
  authorize @post, :update?
  @post.publish!
  redirect_to @post
end
```
Bạn có thể chuyển một đối số để ghi đè class Policy nếu cần.
```
def create
  @publication = find_publication # assume this method returns any model that behaves like a publication
  # @publication.class => Post
  authorize @publication, policy_class: PublicationPolicy
  @publication.publish!
  redirect_to @publication
end

```
Nếu bạn không có một thể hiện cho đối số đầu tiên để ủy quyền, thì bạn có thể chuyển lớp :

**Policy:**
```
class PostPolicy < ApplicationPolicy
  def admin_list?
    user.admin?
  end
end
```

**Controller:**
```
def admin_list
  authorize Post # we don't have a particular post to authorize
  # Rest of controller action
end
```
authorize  trả về instance chuyển cho nó vì vậy bạn có thể chain nó như sau:

**Controller:**
```
def show
  @user = authorize User.find(params[:id])
end

# return the record even for namespaced policies
def show
  @user = authorize [:admin, User.find(params[:id])]
End
```
Bạn có thể dễ dàng nắm giữ một phiên bản policy thông qua cá method policy trong cả view và controller. Điều này đặc biệt hữu ích để có thể hiển thị các điều kiện các liên kết hoặc button trong chế độ xem:
```
<% if policy(@post).update? %>
  <%= link_to "Edit post", edit_post_path(@post) %>
<% end %>
```
#  Headless policies
do có một policy không có model/ruby class , bạn có thể truy suất nó bằng cách chuyển 1 symbol
```
# app/policies/dashboard_policy.rb
class DashboardPolicy < Struct.new(:user, :dashboard)
  # ...
end
```
Lưu ý rằng chính sách không đầu vẫn cần chấp nhận hai  đối số. Đối số thứ 2 chỉ là biểu tượng  dashboard trong trường hợp này là những gì được chuyển dưới dạng bản ghi để authorize 
```
# In controllers
authorize :dashboard, :show?
# In views
<% if policy(:dashboard).show? %>
  <%= link_to 'Dashboard', dashboard_path %>
<% end %>
```
# Scopes
Thông thường bạn sẽ mong muốn có một số loại bản ghi danh sách dạng xem mà một người dùng cụ thể có quyền truy cập. Khi sử dụng Pundit, bạn phải xác định một lớp gọi là policy scope. Nó có thể trông giống như sau:
```
class PostPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if user.admin?
        scope.all
      else
        scope.where(published: true)
      end
    end

    private

    attr_reader :user, :scope
  end

  def update?
    user.admin? or not record.published?
  end
end
```
Pundit đưa ra các giả định sau về class này :
- Class có tên là scope và được lồng trong lớp policy
- Đối số đầu tiên là người dùng. Trong controller, Pundit sẽ gọi phương thức current_user để truy xuất những gì cần gửi vào đối số này.
- Đối số thứ hai là một scope của một số loại để thực hiện một số truy vấn. Nó thường sẽ là một class ActiveRecord hoặc một ActiveRecord::Relation.
- Các phiên bản của class này phản hồi với một method resolve, sẽ trả về một số loại kết quả có thể lặp lại. Đối với các lớp ActiveRecord, đây sẽ thường là một ActiveRecord::Relation.
 Bạn có thể muốn kế thừa từ policy scope ứng dụng được tạo bởi trình tạo hoặc tạo lớp cơ sở của riêng bạn để kế thừa :
 
```
class PostPolicy < ApplicationPolicy
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
Bây giờ bạn có thể sử dụng lớp này từ bộ điều khiển của mình thông qua phương thức policy_scope
```
def index
  @posts = policy_scope(Post)
end

def show
  @post = policy_scope(Post).find(params[:id])
end
```
Giống như một phương thức ủy quyền, bạn cũng có thể ghi đè lớp phạm vi chính sách
```
def index
  # publication_class => Post
  @publications = policy_scope(publication_class, policy_scope_class: PublicationPolicy::Scope)
end
```
Trong trường hợp này, nó là một phím tắt để thực hiện:
```
def index
  @publications = PublicationPolicy::Scope.new(current_user, Post).resolve
end
```
Bạn có thể và được khuyến khích sử dụng phương pháp này trong  view
```
<% policy_scope(@user.posts).each do |post| %>
  <p><%= link_to post.title, post_path(post) %></p>
<% end %>
```
# Đảm bảo Policies và Scope được sử dụng 
Khi bạn đang phát triển một ứng dụng với Pundit, bạn có thể dễ dàng quên cho phép một số hành động. Vì Pundit khuyến khích bạn thêm lệnh gọi ủy quyền theo cách thủ công vào mỗi hành động của bộ điều khiển, nên bạn rất dễ bỏ lỡ một lệnh gọi 
Rất may, Pundit có một tính năng tiện dụng nhắc nhở bạn trong trường hợp bạn quên. Pundit theo dõi xem bạn có quyền ở bất kì đâu trong các action của controller
Pundit cũng thêm một phương pháp vào controller của bạn được gọi là verify_authorized. Phương thức này sẽ đưa ra một ngoại lệ nếu authorize chưa được gọi. Bạn nên chạy phương thức này trong một after_action_hook để đảm bảo rằng bạn không quên ủy quyền cho action. Ví dụ 
```
class ApplicationController < ActionController::Base
  include Pundit
  after_action :verify_authorized
end
```
Tương tự như vậy, Pundit cũng thêm verify_policy_scoped vào controller của bạn. Điều này sẽ đưa ra một ngoại lệ tương tự như verify_authorized. Tuy nhiên, nó sẽ theo dõi nếu policy_scope được sử dụng thay vì authorize. Diều này hữu ích cho các action của controller như là index để tìm  các bộ sưu tập với một scope và không ủy quyền cho các cá thể riêng lẻ.
```
class ApplicationController < ActionController::Base
  include Pundit
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
end
```
Cơ chế xác minh này chỉ tồn tại để hỗ trợ bạn trong khi phát triển ứng dụng của mình, vì vậy bạn đừng quên gọi authorize. Nó không phải là một số loại cơ chế an toàn dự phòng hoặc cơ chế ủy quyền. Bạn có thể xóa bộ lọc này mà không ảnh hưởng đến cách ứng dụng của bạn hoạt động. 

Pundit sẽ hoạt động tốt mà không cần sử dụng đến verify_authorized và verify_policy_scoped.
# Xác minh điều kiện 
Nếu bạn đang sử dụng verify_authorized trong controller của mình nhưng cần bỏ qua xác minh có điều kiện , bạn có thể sử dụng skip_authorization. Để bỏ qua verify_policy_scoped, hãy sử dụng skip_policy_scope. Những điều này hữu ích trong những trường hợp bạn không muốn tắt xác minh cho toàn bộ action, nhưng có một số trường hợp không cho phép 
```
def show
  record = Record.find_by(attribute: "value")
  if record.present?
    authorize record
  else
    skip_authorization
  end
end
```
# Chỉ định thủ công các Policy Class
Đôi khi bạn có thể muốn khai báo rõ ràng chính sách nào sẽ sử dụng cho một lớp nhất định, thay vì để Pundit suy luận nó. Điều này có thể được thực hiện như vậy :
```

class Post
  def self.policy_class
    PostablePolicy
  end
end
```
Ngoài ra, bạn có thể khai báo một instance method: 
```
class Post
  def policy_class
    PostablePolicy
  end
end
```

# Closed systems
Trong nhiều ứng dụng chỉ những người dùng thực sự đã đăng nhập mới thực sự có thể làm bất cứ điều gì.  Nếu bạn đang xây dựng một hệ thống như vậy , việc kiểm tra một người dùng trong policy có phải là nil không. Ngoài các policy, bạn có thể kiểm tra thêm dựa vào scope.
Nên xác định một bộ lọc chuyển hướng người dùng chưa được xác thực đến trang đăng nhập. Nếu bạn đã xác định ApplicationPolicy, bạn có thể  raise ra một ngoại lệ nếu bằng cách nào đó một người dùng chưa được xác thực vượt qua được .
```
class ApplicationPolicy
  def initialize(user, record)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user   = user
    @record = record
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, "must be logged in" unless user
      @user = user
      @scope = scope
    end
  end
end
```
# NilClassPolicy
Để hỗ trợ một đối tượng null, bạn muốn triển khai một NilClassPolicy.  Điều này có thể hữu ích khi bạn muốn mở rộng ApplicationPolicy của mình để cho phép dung sai. Ví dụ , associations là nil
```
class NilClassPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      raise Pundit::NotDefinedError, "Cannot scope NilClass"
    end
  end

  def show?
    false # Nobody can see nothing
  end
end
```
# Rescuing a denied Authorization in Rails
Pundit raise một Pundit::NotAuthorizedError bạn có thể rescue_from trong ApplicationController. Bạn có thể tùy chỉnh method user_not_authorized trong mọi controller
```
class ApplicationController < ActionController::Base
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end
end
```
Ngoài ra bạn có thể xử lý toàn cục Pundit::NotAuthorizedError's bằng cách xử lý chúng dưới dạng lỗi 403 và cung cấp trang lỗi 403. Thêm phần sau vào application.rb
```
config.action_dispatch.rescue_responses["Pundit::NotAuthorizedError"] = :forbidden
```
# Tùy chỉnh error messages
Creating custom error messages
NotAuthorizedErrors cung cấp thông tin về truy vấn nào (vd: create?). Bản ghi nào (instance of Post) và chính sách nào (instance của PostPolicy) đã gây ra lỗi
Một cách để sử dụng các thuộc tính query, record  và policy là kết nối chúng với I18n để tạo thông báo lỗi. Đây là cách bạn có thể làm điều đó 
```
class ApplicationController < ActionController::Base
 rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

 private

 def user_not_authorized(exception)
   policy_name = exception.policy.class.to_s.underscore

   flash[:error] = t "#{policy_name}.#{exception.query}", scope: "pundit", default: :default
   redirect_to(request.referrer || root_path)
 end
end
```
```
en:
 pundit:
   default: 'You cannot perform this action.'
   post_policy:
     update?: 'You cannot edit this post!'
     create?: 'You cannot create posts!'
```
# Nhiều error messages cho mỗi policy action
Nếu có nhiều lý do khiến ủy quyền bị từ chối, bạn có thể hiển thị các thông báo khác nhau bằng cách raise ra các exception trong policy :

Trong class policy raise Pundit::NotAuthorizedError với thông báo lỗi tùy chỉnh hoặc I18n
```
class ProjectPolicy < ApplicationPolicy
  def create?
    if user.has_paid_subscription?
      if user.project_limit_reached?
        raise Pundit::NotAuthorizedError, reason: 'user.project_limit_reached'
      else
        true
      end
    else
      raise Pundit::NotAuthorizedError, reason: 'user.paid_subscription_required'
    end
  end
end
```
Sau đó, bạn có thể nhận được thông báo lỗi này trong  exception handler:
```
rescue_from Pundit::NotAuthorizedError do |e|
  message = e.reason ? I18n.t("pundit.errors.#{e.reason}") : e.message
  flash[:error] = message, scope: "pundit", default: :default
  redirect_to(request.referrer || root_path)
end
```
```
en:
  pundit:
    errors:
      user:
        paid_subscription_required: 'Paid subscription is required'
        project_limit_reached: 'Project limit is reached'
```
# Tùy chỉnh Pundit user
Trong một số trường hợp controller của bạn có thể không có quyền truy cập vào current_user, hoặc current_user của bạn không phải là phương thức mà Pundit nện gọi. Đơn giản chỉ cần xác định một method trong controller được gọi là pundit_user
```
def pundit_user
  User.find_by_other_means
end
```
# Policy Namespacing
Trong một số trường hợp nếu có nhiều policy phục vụ các ngữ cảnh khác nhau cho một resource. Một ví dụ điển hình về điều này là trường hợp User policy khác với Admin policy . Để ủy quyền với  namespaced policy , chuyển namespace vào một helper authorize trong một mảng :
```
authorize(post)                   # => sẽ tìm kiếm một PostPolicy
authorize([:admin, post])         # =>sẽ tìm kiếm một Admin::PostPolicy
authorize([:foo, :bar, post])     # => sẽ tìm kiếm một  Foo::Bar::PostPolicy

policy_scope(Post)                # => sẽ tìm kiếm một  PostPolicy::Scope
policy_scope([:admin, Post])      # => sẽ tìm kiếm một Admin::PostPolicy::Scope
policy_scope([:foo, :bar, Post])  # => sẽ tìm kiếm một  Foo::Bar::PostPolicy::Scope
```
Nếu bạn đang sử dụng namespace policy cho một số view như Admin view. Có thể hữu ích khi ghi đè policy_scope và cho phép những authorized helper trong AdminController của bạn để tự động áp dụng namespacing :
```
class AdminController < ApplicationController
  def policy_scope(scope)
    super([:admin, scope])
  end

  def authorize(record, query = nil)
    super([:admin, record], query)
  end
end

class Admin::PostController < AdminController
  def index
    policy_scope(Post)
  end

  def show
    post = authorize Post.find(params[:id])
  end
end
```
# Rspec
##  Policy Specs
Pundit bao gồm một DSL nhỏ để viết các bài kiểm tra diễn đạt cho các chính sách của bạn trong RSpec. Require  pundit / rspec trong spec_helper.rb của bạn:
```
require "pundit/rspec"
```
Sau đó đưa policy spec vào spec/policies, và làm như sau :
```
describe PostPolicy do
  subject { described_class }

  permissions :update?, :edit? do
    it "denies access if post is published" do
      expect(subject).not_to permit(User.new(admin: false), Post.new(published: true))
    end

    it "grants access if post is published and user is an admin" do
      expect(subject).to permit(User.new(admin: true), Post.new(published: true))
    end

    it "grants access if post is unpublished" do
      expect(subject).to permit(User.new(admin: false), Post.new(published: false))
    end
  end
end
```
## Scope Specs
Pundit không cung cấp DSL để  test scope .  Chỉ cần kiểm tra nó như một class Ruby thông thường
# Kết luận 
Mong rằng vói bài viết này bạn có thể hiểu những điều cơ bản và cách sử dụng đợn giản nhất về gem Pundit
## Tham khảo
https://crypt.codemancers.com/posts/2018-07-29-leveraging-pundit/
https://itzone.com.vn/vi/article/management-role-in-rails-app-with-gem-pundit/
https://github.com/varvet/pundit#creating-custom-error-messages