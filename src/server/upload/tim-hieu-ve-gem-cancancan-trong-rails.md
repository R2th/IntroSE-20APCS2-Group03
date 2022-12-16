# 1. Gem cancancan là gì?
* Gem cancancan là một thư viện phân quyền trong ruby và ruby on rails, nó hạn chế những tài nguyên mà một người dùng nhất định được phép truy cập.
* Tất cả các quyền được xác định trong một hoặc nhiều file ability và không bị trùng lặp trên controllers, views, và truy vấn database. 
* Giúp dễ bảo trì và kiểm tra việc phân quyền logic.
# 2. Các chức năng chính
Bao gồm 2 chức năng chính:
* Thư viện authorizations cho phép định nghĩa các quy tắc để truy cập các đối tượng khác nhau và cung cấp helpers để kiểm tra các quyền đó.
* Rails helpers để đơn giản hóa code trong controllers bằng cách thực hiện việc tải và kiểm tra quyền của các models một cách tự động và giảm mã trùng lặp.
# 3. Cài đặt
Thêm vào Gemfile:
```
gem "cancancan"
```
Sau đó chạy lệnh sau:
```
bundle install
```
# 4. Định nghĩa Abilities
User permissions được xác định trong class Ability.

Tạo class Ability trong app/models/ability.rb bằng lệnh sau:
```
rails g cancan:ability
```
### Ví dụ về các quy tắc để đọc một model Post:
```ruby
class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, Post, public: true

    if user.present?  # additional permissions for logged in users (they can read their own posts)
      can :read, Post, user_id: user.id

      if user.admin?  # additional permissions for administrators
        can :read, Post
      end
    end
  end
end
```
> TÌm hiểu thêm về [Defining Abilities](https://github.com/CanCanCommunity/cancancan/wiki/defining-abilities).
# 5. Can? và cannot?
* Hai method can? và cannot? dùng để kiểm tra quyền của người dùng hiện tại.
Ta sử dụng 2 method này trong views hoặc controllers.
Ví dụ:
```ruby
<% if can? :read, @post %>
  <%= link_to "View", @post %>
<% end %>
```
> Tìm hiểu thêm về [checking abilities](https://github.com/CanCanCommunity/cancancan/wiki/checking-abilities).
# 6. Fetching records - tìm nạp bản ghi
* Cancancan có khả năng truy xuất tất cả các đối tượng mà người dùng được phép truy cập
```ruby
Post.accessible_by(current_ability)
```
-> Sẽ sử dụng các quy tắc của bạn để đảm bảo rằng người dùng chỉ truy xuất danh sách các bài Post có thể đọc được.
> Tìm hiểu thêm về [Fetching records](https://github.com/CanCanCommunity/cancancan/wiki/Fetching-Records).

# 7. Controller helpers
## 7.1 Authorizations
* Cancancan cung cấp cho rails phương thức `authorize!` trong controller sẽ đưa ra một ngoại lệ nếu user không thể thực hiện được action đã cho.
* Ví dụ:
```ruby
def show
  @post = Post.find(params[:id])
  authorize! :read, @post
end
```
## 7.2 Loaders
* Method **load_and_authorize_resource** được cung cấp để tự động cho phép tất cả các actions trong resource controllers kiểu **RESTful** (thiết lập nó cho các action lẻ tẻ).
* Ví dụ:
```ruby
class PostsController < ApplicationController
  load_and_authorize_resource

  def show
    # @post is already loaded and authorized
  end

  def index
    # @posts is already loaded with all posts the user is authorized to read
  end
end
```
> Tìm hiểu thêm về [Authorizing Controllers Action](https://github.com/CanCanCommunity/cancancan/wiki/authorizing-controller-actions).
## 7.3 Strong parameters
* Bạn phải làm sạch đầu vào trước khi lưu bản ghi, trong các actions như **:create** và **:update**
* Đối với action **:update**, cancancan sẽ tải và cấp quyền cho resource nhưng không tự động thay đổi nó, vì vậy cách sử dụng thông thường như sau:
```ruby
def update
  if @post.update post_params
    # hurray
  else
    render :edit
  end
end
...

def post_params
  params.require(:post).permit(:body)
end
```
* Với action **:create**, cancancan sẽ cố gắng khởi tạo một instance mới với đầu vào được làm sạch bằng cách tìm xem controller của bạn có các phương thức sau hay không (theo thứ tự):
1.  `create_params`
2.  `<model name>_params` (quy ước mặc định trong rails để đặt tên cho method params của bạn).
3.  `resource_params` (phương pháp đặt tên chung trong mỗi controller).
> Ngoài ra, nếu bạn muốn sử dụng một method tùy chỉnh khác để làm sạch đầu vào, bạn có thể sử dụng `load_and_authorize_resource` với tùy chọn `param_method` để chỉ định.
```ruby
class PostsController < ApplicationController
  load_and_authorize_resource param_method: :my_sanitizer

  def create
    if @post.save
      # hurray
    else
      render :new
    end
  end

  private

  def my_sanitizer
    params.require(:post).permit(:name)
  end
end
```
* Bạn cũng có thể sử dụng chuỗi sẽ được đánh giá trong ngữ cảnh của controller bằng cách sử dụng `instance_eval` và phải chứa code ruby hợp lệ.
```ruby
load_and_authorize_resource param_method: 'permitted_params.post'
```
* Cuối cùng, bạn cũng có thể liên kết `param_method` với đối tượng Proc sẽ được gọi với controller như một đối số duy nhất.
```ruby
load_and_authorize_resource param_method: Proc.new { |c| c.params.require(:post).permit(:name) }
```
> Tìm hiểu thêm về [strong parameters](https://github.com/CanCanCommunity/cancancan/wiki/Strong-Parameters).
# 8. Xử lý truy cập trái phép
* Nếu cấp quyền cho người dùng không thành công, ngoại lệ CanCan::AccessDenied sẽ được bắn ra. Bạn có thể nắm bắt và sửa đổi hành vi của nó trong controller như ví dụ sau:
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
# 9. Lock it down
* Nếu bạn muốn đảm bảo phân quyền xảy ra trên mọi action trong ứng dụng của mình, hãy thêm check_authorization vào ApplicationController.
```ruby
class ApplicationController < ActionController::Base
  check_authorization
end
```
Nó sẽ đưa ra một ngoại lê nếu phân quyền không xảy ra trong một action, để bỏ qua phân quyền trong một controller cụ thể, hãy thêm method `skip_authorization_check` vào trong controller đó.
> TÌm hiểu thêm về [Ensure Authorizations](https://github.com/CanCanCommunity/cancancan/wiki/Ensure-Authorization).

Cảm ơn các bạn đã theo dõi. Nguồn bài viết: [wiki cancancan in rails](https://github.com/CanCanCommunity/cancancan).