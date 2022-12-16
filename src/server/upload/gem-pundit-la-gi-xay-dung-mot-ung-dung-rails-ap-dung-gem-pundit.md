# I.  Mở đầu
Bài viết hôm nay sẽ nói về việc sử dụng gem Pundit , là một thư viện được sử dụng trong các project của Rails, ta sẽ cùng nhau phân tích về gem này và áp dụng thực tế nó vào một project của Rails nhé.

# II. Gem Pundit
## 1. Gem Pundit là gì ?

Nói đơn giản, pundit là một thư viện để phân quyền cho ứng dụng của bạn. Nếu bạn đang có ý định xây ứng một ứng dụng với nhiều loại User, thì gem pundit là một thư viện cực kì phù hợp để có thể hạn chế những tài nguyên mà User có thể truy cập được.

## 2 . Tại sao nên sử dụng 
Hãy tưởng tượng rằng bạn đang xây dựng một với hàng loạt các loại User và cơ chế quyền khác nhau, và cách bạn thường làm là sẽ xử lí các logic này ở controller, dần dần nó sẽ khiến cho controller của bạn trở nên phình to ra, càng ngày nó sẽ càng phức tạp và khó kiểm soát để bảo trì code. 
Vậy lợi thế của gem pundit là gì, nó sẽ xử lí giúp cho controller ứng dụng của bạn trở nên nhẹ nhàng, thanh mảnh, loại bỏ độ phức tạp của code. Thay vào đó sẽ bằng những Policy khiến bạn có cái nhìn trực quan hơn, và dễ dàng nắm bắt được quyền hạn của từng loại User.


# III. Xây dựng ứng dụng Rails áp dụng gem pundit
## 1. Cài đặt
Việc cài đặt vô cùng đơn giản như bao loại gem khác : 
Thêm`gem "pundit"` vào Gemfile của bạn và chạy lệnh `bundle install`

## 2. Xây dựng project
Ở đây mình sẽ xậy dụng ra một app nho nhỏ với 2 role Admin, User và có nhiều Post , chức năng chính sẽ là phân quyền cho User không thể create post, chỉ có admin mới có quyền create
* Mình sẽ bỏ qua các bước tạo model cho User, Post và chỉ tập trung vào phần Pundit

Đầu tiên để sử dụng gem pundit chúng ta phải thêm Pundit vào application controller
```
class ApplicationController < ActionController::API
  include Pundit
end
```

- Sau đó ta sẽ chạy lệnh: 
```
rails g pundit:install
```
Lệnh này sẽ tạo ra 1 file application policy nằm ở **app/policies/application_policy.rb**, nó sẽ có những giá trị default như này :
```
class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def create?
    false
  end
  
   def create?
    false
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end
```

Giải thích sơ qua một chút về những thành phần trong Application Policy: 
* Ta thấy rằng tham số đầu tiền trong hàm initializer luôn là user, Pundit sẽ sử dụng phương thức current_user để lấy nó ra
* Ở trên là file application, ngoài ra nếu muốn xây dựng từng Policy riêng ứng với từng model, tên class nên là tên của model sau đó đến từ Policy. Ví dụ: PostPolicy sẽ là policy ứng với model Post.
* Policy sẽ có các phương thức như create? hoặc new? để kiểm tra quyền truy cập

Vào phần chính, mình sẽ tạo một policy là PostPolicy nằm ở thư mục, **app/policies/post_policy.rb**
```
class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def create?
    user.admin?
  end
end
```

Và ở trong posts_controller, nó kế thừa từ  ApplicationController , ta sẽ viết như sau
```
class PostsController < ApplicationController
  def create
    @post = Post.new
    authorize @post
    render json: {success: "true"}
  end
end
```
Ở controller, ta chỉ việc thêm phương thức authorize , phương thức này sẽ có khi ta include pundit vào trong application controller ở trên.
Ở hàm initializer của PostPolicy ta đã khởi tạo tham số là @post, cho nên khi authorize @post ở controller , pundit sẽ tự động tìm kiếm PostPolicy dựa trên @post ta đã khai báo
Và nó sẽ dựa vào action name của controller để chạy vào hàm action tương ứng ở PostPolicy và chạy phần code ta đã viết trong đó

Vậy thì @user ở đâu, ở controller ta đâu có truyền vào, như ở trên mình nói ở phần application policy, thì pundit sẽ sử dụng hàm current_user để lấy dữ liệu về user, điều này có nghĩa là mình phải tạo một hàm current_user ở trong ApplicationController
```
class ApplicationController < ActionController::API
  include Pundit

//Ví dụ mình sẽ tạo user có quyền admin 
  def current_user
   User.create email:"example@gamil.com", role: :admin
  end
end
```
Ở trong User model, mình sẽ tạo role, khai báo theo kiểu enum nhé
```
class User < ApplicationRecord
  has_many :post

  enum role: {admin:0 , user: 1}
end
```

Ok, như vậy là ta đã có current_user với quyền admin , ở hàm create? của PostPolicy ta sẽ kiểm trả user có phải admin hay không, nếu không nó sẽ raise ra lỗi 
```
Pundit::NotAuthorizedError
```

# III. Kết luận
Trên đây là bài viết tìm hiểu về gem Pundit, mình chỉ áp dụng một phần nhỏ để áp dụng vào project, tập trung vào việc pundit xử lý flow phân quyền như thế nào. Ngoài ra, còn có nhiều kiểu phân quyền khác nữa, ở trên chỉ là kiểu phân quyền cơ bản nhất. Bạn có thể tìm hiểu
thêm [tại đây](https://github.com/varvet/pundit). 

Bài viết còn nhiều thiếu sót, hy vọng nhận được nhiều đóng góp ý kiến của mọi người.

Xin chân thành cảm ơn