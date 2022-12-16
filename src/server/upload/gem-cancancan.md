## Giới thiệu
CanCanCan là một thư viện phân quyên trong Rails nó cho phép bạn hạn chế các tài nguyên mà một user được phép truy cập, cung cấp những phương thức helper để kiểm tra các quyền đó. Gem cancancan dễ sử dụng, cài đặt đơn giản nên việc ủy quyền sẽ trở nên đơn giản hơn trong ứng dụng Rails của bạn.
## Cài đặt
Thêm vào Gemfile:
```
gem 'cancancan'
```
chạy bundle install
### Định nghĩa Abilities
Quyền của một user được định nghĩa trong Ability class.
```
rails g cancan:ability
```
 Ở đây ví dụ: Ứng dụng rails mình có 2 model:
 -  Là Article model và User model <br>
 - User model gồm sẽ có 3 quyền cơ bản là manage, admin và normal <br>
 -- normal thì user có thể xem bài viết <br>
 -- admin thì user có thêm quyền edit bài viết <br>
 -- manage thì user có thêm quyền xóa bài viết
 
### Thực hành
Tạo model User:
```
rails generate model User name:string, role:integer
```

 Ở model `app/models/user.rb` <br>
 
 `  enum role: %i(normal manager admin)`<br>
 
Thêm `gem 'devise'` với model User tạo chức năng đăng nhập. <br>
app/controllers/application_controller.rb
```
before_action :authenticate_user!
```

Tiếp theo đến model Article
```
rails generate scaffold Article title:string content:text
```

Sau khi đã có những model cần thiết, thì giờ tiếp theo sẽ định nghĩa Abilities
  trong ` app/models/ability.rb`<br>
```
class Ability
  include CanCan::Ability

  def initialize current_user
    can :read, Article #có thể đọc bài báo mà k cần đăng nhập
    
    case current_user.role
    when "admin"
    can %i(create update), Article #có thể new, create, edit, update article
    when "manager"
    can :manage, Article # được cấp toàn quyền đối với Article
    end
  end
end
```
### Sau khi định nghĩa các tài nguyên User được phép truy cập thì kế đến là Authorizations (ủy quyền)<br>
Phương thức `authorize!` trong controller sẽ xuất ra một ngoại lệ nếu user không có quyền sử dụng tài nguyên
```
def show
  @article = Article.find(params[:id])
  authorize! :read, @article
end
```
hoặc có thể dùng phương thức `load_and_authorize_resource` tự động cung cấp ủy quyền tự động.

Trong app/controllers/articles_controller.rb
```
  skip_before_action :authenticate_user!, only: %i(index show)
  load_and_authorize_resource except: %i(index show)
```
![](https://images.viblo.asia/f78aefca-04b4-4844-be22-4e0ed2dbfa7a.png)<br><br>
Ở đây mình có 1 user với role là admin: thì sẽ k có quyền xóa Article. Như vậy thì đẩy ra ngoại lệ như thế này:<br>
<br>![](https://images.viblo.asia/293d8f40-03b0-401f-aa2f-2b1594a4fb87.png)

### Để xử lý những ngoại lệ trên <br>
thì trong app/controllers/application_controller.rb
```
rescue_from CanCan::AccessDenied do |exception|
  # do something
  # hoặc chỉ đơn giản 
  flash[:danger] = "Access Denied"
  redirect_to root_path
end
```

### Kiểm tra quyền của User
Các quyền đối với User hiện tại có thể kiểm tra bằng phương `can?` và `cannot?` trong view và controller.
```
<% if can? :destroy, article %>
<%= link_to 'Destroy', article, method: :delete, data: { confirm: 'Are you sure?' } %>
<% end %>
```

### Lock It Down
Nếu muốn chắc chắn việc ủy quyền xảy ra trên mọi action trong ứng dụng của mình, hãy thêm `check_authorization` vào `ApplicationController`.

```
class ApplicationController < ActionController::Base
  check_authorization
end
```

Điều này sẽ đưa ra một ngoại lệ nếu ủy quyền không được thực hiện trong 1 action. Để bỏ qua điều này, hãy thêm `skip_authorization_check`
```
 skip_authorization_check only: %i(index show)
```

## Kết luận
Gem CanCanCan là một gem phân quyền đơn giản và nhanh gọn, nó sẽ giúp cho ứng dụng rails của bạn rất nhiều.
Trên chỉ là bài giới thiệu sơ về gem CanCanCan của mình, các bạn có thể tham khảo thêm:<br>
https://github.com/CanCanCommunity/cancancan