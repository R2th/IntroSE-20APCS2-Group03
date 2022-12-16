### Giới thiệu 

Hôm nay mình sẽ giới thiệu gem Pundit dùng để phân quyền người dùng. Để trả lời câu hỏi dùng nó như thế nào thì mình sẽ trả lời câu hỏi tại sao lại dùng nó.

Ngoài gem Pundit thì chúng ta có 1 gem cũng khá phổ biến đó là gem [cancancan](https://github.com/CanCanCommunity/cancancan).  Mình sẽ so sánh chút về 2 gem này.

Thành thực mà nói thì hai gem này cùng không quá khác biệt với nhau là mấy.

 Đầu tiên thứ mà đập mắt vào khi mà chúng ta vào git của 2 gem này thì đó là sao =)). Ở thời điểm hiện tại gem pundit đang có số sao là 7.3k sao, cao hơn so với gem cancancan với 4.9k sao. Có vẻ cộng đồng khá mê em pundit này. 
 
Tất cả các quyền được định nghĩa trong tệp ability.rb nhưng cùng với thời gian thì file này có thể phát triển khá lớn. Ngoài ra còn có các nhược điểm khác như không có khả năng xác định cấp phép mức trường dữ liệu và unit testing từ các mã code riêng lẻ khác. 
Khi ứng dụng của bạn khá phức tạp, các lớp Ability trong Cancancan có thể khó để phát triển được. Ngoài ra, mọi yêu cầu authorization cần được sự đánh giá của các lớp Cancancan Ability.  Điều này thật khó để mainatin sau này. Hơn nữa vì toàn bộ ability file được evaluated  mỗi khi ứng dụng thực hiện cuộc gọi để kiểm tra khả năng của người dùng, một truy vấn chậm trong ability file có thể khiến toàn bộ trang web bị hỏng.
 
 Với Pundit, đối tượng được tập trung nhất không phải là một file Ability đơn lẻ. Thay vào đó, Pundit sử dụng một folder app/policies/ chứa các object để phân quyền truy cập. Thêm authorization cho một action trong controller của một đối tượng cần tới sự cho phép của một helper method trong app/policies. Pundit sử dụng kỹ thuật meta-programing để tạo một policy cho một object phù hợp với quy tắc truy cập vào action trong controller. Đối tượng được policy trong pundit rất chi tiết, thường sẽ không cần trải qua những yêu cầu về logic nhiều như Cancancan. Bạn có thể tạo một object để policy trong Pundit bất kì khi nào bạn muốn để sử dụng với một controller. Thông thường, bạn sẽ tạo ra một object trong policy tương ứng với một model cụ thể(Ví dụ như bạn sẽ tạo ra một UsersPolicy tương ứng với model User) và sẽ sử dụng policy để kiểm soát các hành động trong controller hoặc view cụ thể(ví dụ trong UsersController và view của User). Pundit tách quyền cá nhân vào các lớp điều khoản riêng lẻ mà có thể kế thừa từ những lớp điều khoản khác. Vì vậy, bạn coi chúng như là POROs với của các phương thức.
 
 Vì vậy gem pundit thích hợp với dự án khi phân quyền khá phức tạp, và một object chỉ có quyền với một vài attribute cụ thể(vì dụ: User chỉ được sửa thông tin của chính mình như name, age, ... mà không được set quyền cho mình thành admin)
 
###  Practice
1
Thêm vào gem file .

`gem "pundit"`

Sau đó chạy `bundle install` để install

Include Pundit vào trong application controller:

```ruby
class ApplicationController < ActionController::Base
  include Pundit
end
```

Sau đó chạy `rails g pundit:install` sẽ thiết lập mặc định policy của ứng dụng Policy sẽ được định nghĩa ở đường dẫn app/polices. Và đừng quên chạy lại Rails server để nhận các class mới bạn định nghĩa ở đây.

**Policies**

 Ở đây sẽ chứa toàn bộ các class phân quyền Policy. Còn đây là file app/policies/application_policy.rb được sinh ra

```ruby
class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user = user
    @record = record
  end

  def index?
    false
  end

  def show?
    scope.where(:id => record.id).exists?
  end

  def create?
    false
  end

  def new?
    create?
  end

  # [...]
  # some stuff omitted

  class Scope
    # [...]
  end
end
```

Policy có tên nên bắt đầu với model tương ứng và nên kết thúc bằng hậu tố Policy. Ở ví dụ trên, UserPolicy là policy cho User model.

Tham số đầu tiên là user. Trong controller, Pundit sẽ sử dụng curent_user để truyền vào.

Tham số thứ 2 sẽ là một model object mà chúng ta cần phải check quyền.

Hàm khởi tạo của policy cần biến instance và model được phân quyền. Chú ý, chúng ta có thể vài object khác mà chúng ta muốn phân quyền nếu model đơn giản. Ví dụ như, gọi một service hoặc form object mà chúng ta kiểm tra chúng khi thực hiện ở controller.

Phương thức nên ứng với action trong controller hậu tố là ?. Vì vậy, đối với action như new, create, edit,vv...., các phương thức được định nghĩa trong policy là new?, create?, edit? ...

Lưu ý Trong trường hợp controller không truy cập được vào current_user chúng ta có thể định nghĩa
một pundit_user để sử dụng. 

Ở đây mình dùng gem devise nên mình dùng luôn hàm current_user của devise

```ruby
def pundit_user
 current_manager
end
```


Ví dụ ở đây mình muốn check quyền chỉ có user có role là admin thì mới được thêm, sửa, xóa bài viết.

```ruby
//post_policy.rb

class PostPolicy
  attr_reader :user, :post 

  def initialize user, post
    @user = user
    @post = post
  end

  def created?
    user.admin?
  end
  
  def update?
    user.admin?
  end
  
  def destroy?
    user.admin?
  end
end
```

Ở trong controller mình gọi như sau :

```ruby
//post_controller.rb
    def update
      @post = get_post
       authorize @post, :update?
      //do something
    end
    
    def get_post
    end
```


**Scopes**

Scope cũng giống như trong scope trong model. Nhưng, scope ở đây được thực hiện trong policy theo role của người dùng tương ứng với hành động trong controller. Scope được sử dụng để lấy tập con của bản ghi mà ta có. Ví dụ, trong ứng dụng blog, không phải admin người dùng chỉ xem được các bài viết đã được công bố nhưng không ở trạng nháp. Bạn có hình dung ra controller và model sẽ gọn hơn nhiều.

```ruby
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

Trong controller bạn sử dụng scope trên thông qua `policy_scope` method:

```ruby
def index
  @posts = policy_scope(Post)
end

def show
  @post = policy_scope(Post).find(params[:id])
end
```


Một số lưu ý về scope:

Nó như PORC, được nồng vào trong class policy
Nó cần được khởi tạo với một người dùng và một scope với có thể là lớp ActiveRecord hoặc ActiveRecord::Relation.
Nó cần định nghĩa phương thức giả quyết theo vai trò của người dùng.


Mình xin kết thúc bài viết của mình ở đây. Do mình mới nhận task tìm hiểu về gem pundit nên bài viết vẫn còn sơ sài mong mọi người góp ý nhiều.

Tài liệu tham khảo 

https://github.com/varvet/pundit

http://vaidehijoshi.github.io/blog/2015/09/29/using-pundit-the-cool-kid-of-authorization/

https://viblo.asia/p/so-sanh-cancancan-va-pundit-xQMGJmdqvam