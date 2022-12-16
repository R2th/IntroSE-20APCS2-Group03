Chắc hẳn đối với lập trình viên ruby on rails khi nhắc đến phân quyền thì không một ai là không biết đến gem cancancan. Đây là một gem thư viện rất được yêu thích để phân quyền các chức năng cho người dùng. Cancancan hạn chế các quyền, tài nguyên mà một user có thể truy cập. Tất cả các quyền hạn được quy định ở một nơi duy nhất (là class Ability). Gem cancancan có cách cài đặt và sử dụng cũng rất đơn giản, dễ hiểu.
# 1.Cài đặt
Thêm dòng sau vào Gemfile, sau đó chạy lệnh bundle install:
```ruby
gem 'cancancan', '~> 2.0'
```
Quyền của người dùng được định nghĩa trong class Ability. Để tạo file ability.rb bạn cần tạo lệnh sau: "rails g cancan:ability". Hệ thống sẽ tạo ra file ability.rb cho chúng ta khai báo quyền cho user.
```ruby
class Ability
  include CanCan::Ability
  
  def initialize user
     user ||= User.new # nếu chưa login
     if user.is_admin?
         can :manage, :all # cấp tất cả quyền cho admin
     else
         can [:index, :show], Document # cấp quyền cho user không phải là admin
     end
  end
end
```
Phương thức can ở đây được sử dụng để định nghĩa việc phân quyền và yêu cầu 2 tham số truyền vào. Đầu tiên là action mà bạn đang thiết lập phân quyền cho, thứ 2 là calss của đối tượng mà bạn muốn thiết lập action đó cho nó. Hai tham số này bạn có thể nhập theo kiểu mảng.
```ruby
can :update, Article
```
Bạn có thể đặt :manage để đại diện cho bất kỳ hành động nào và :all đại diện cho bất kỳ đối tượng nào
```ruby
can :manage, Article  # user can perform any action on the article
can :read, :all       # user can read any object
can :manage, :all     # user can perform any action on any object
```
Bạn có thể nhập 1 mảng các tham số. Ví dụ, user sẽ có khả năng update và destroy cả articles và comments
```ruby
can [:update, :destroy], [Article, Comment]
```
# 2.Kiểm tra Abilities
Để kiểm tra quyền của user có thể sử dụng phương thức can? và cannot? trong view và controller
```ruby
<% if can? :update, @article %>
  <%= link_to "Edit", edit_article_path(@article) %>
<% end %>
```
Phương thức cannot? thì đối lập với phương thức can?

Dùng "can?" để kiểm tra thẩm quyền của user với @article đó với action là update (đã được khai báo ở file ability trên) rồi trả ra kết quả true hoặc false tương ứng.

Với Controller: chúng ta dùng hàm "authorize!" để kiểm tra quyền và trả về lỗi nếu quyền đó là không được phép/ hoặc chưa được khai báo.
```ruby
def show
  @article = Article.find(params[:id])
  authorize! :read, @article
end
```
# 3.Strong Parameters
Khi sử dụng strong_parameters bạn phải làm sạch đầu vào trước khi lưu bản ghi trong các action như :create và :update

Đối với hành động :update, cancan sẽ thực hiện xác thực và phân quyền tài nguyên nhưng không thay đổi chúng tự động, giống như:
```ruby
def update
  if @article.update_attributes(update_params)
    # hurray
  else
    render :edit
  end
end
...

def update_params
  params.require(:article).permit(:body)
end
```
Đối với hành động :create, Cancan sẽ thử khởi tạo đầu vào bằng cách xem xét nếu controller sẽ phản hồi bằng các lệnh sau:
1.create_params
2.<model_name>_params
3.resource_params
Ngoài ra, load_and_authorize_resource có thể gọi một param_method tùy ý được xác định trong controller:
```ruby
class ArticlesController < ApplicationController
  load_and_authorize_resource param_method: :my_sanitizer

  def create
    if @article.save
      # hurray
    else
      render :new
    end
  end

  private

  def my_sanitizer
    params.require(:article).permit(:name)
  end
end
```
Bạn cũng có thể sử dung một string, nó sẽ được đánh giá trong khuôn khổ controller đang sử dụng instance_eval và cần phải chứa code Ruby phù hợp:
```ruby
   load_and_authorize_resource param_method: 'permitted_params.article'
```
Cuối cùng, load_and_authorize_resource có khả năng liên kết param_method với một object Proc được gọi trong controller như một đối số duy nhất:
```ruby
load_and_authorize_resource param_
hod: Proc.new { |c| c.params.require(:article).permit(:name) }
```
# 4.Xử lí các trường hợp ngoại lệ
Với hành động không hợp lệ của user, một ngoại lệ CanCan::AccessDenied sẽ được sinh ra. Bạn có thể bắt lấy và thay đổi hành vi của nó trong ApplicationController
```ruby
class ApplicationController < ActionController::Base
  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden, content_type: 'text/html' }
      format.html { redirect_to main_app.root_url, notice: exception.message }
      format.js   { head :forbidden, content_type: 'text/html' }
    end
  end
end
```
# 5.Lock It Down
Nếu muốn chắc chắn việc phân quyền được áp dụng trong mọi hành động, ta thêm check_authorization vào ApplicationController:
```ruby
class ApplicationController < ActionController::Base
  check_authorization
end
```
Điều này sẽ sinh ra một ngoại lệ nếu việc ủy quyền không được thực hiện trong một action. Nếu bạn muốn bỏ qua việc này thì thêm skip_authorization_check vào một lớp con controller.
# Kết luận: 
Nhờ có gem Cancan mà việc phân quyền cho các user trở nên đơn giản và dễ dàng hơn rất nhiều, giúp ích rất nhiều cho ứng dụng của bạn.
Tài liệu tham khảo: https://github.com/CanCanCommunity/cancancan