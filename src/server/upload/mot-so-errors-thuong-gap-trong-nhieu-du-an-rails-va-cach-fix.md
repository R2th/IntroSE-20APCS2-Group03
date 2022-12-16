Những errors sau đây là errors khá phổ biến và thường gặp nhất trong dự án Rails.
Trong bài này thì mình sẽ giải thích từng cái và nói về giải pháp để fix nó.
![](https://images.viblo.asia/ef1d0069-480d-41b4-9fa0-523be3f51e1e.png)

### ActionController::RoutingError
Error này xảy ra khi user gõ sai url link mà không tồn tại trong hệ thống.
```
ActionController::RoutingError (No route matches [GET] "/wp-admin"):
```
**cách fix**

Khi gặp trường hợp này, thì sẽ redirect tới trang Not Found. 
```
Rails.application.routes.draw do
  # all your other routes
  match '*unmatched', to: 'application#route_not_found', via: :all
end
```
```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def route_not_found
    render file: Rails.public_path.join('404.html'), status: :not_found, layout: false
  end
end
```
### NoMethodError: undefined method '[]' for nil:NilClass
Vd: Ta có giá trị hash
```
params = { user: { address: { street: '123 Fake Street', town: 'Faketon', postcode: '12345' } } }
```
Sau đo mình gọi `params[:user][:abc][:streen]` sẽ return error vì `params[:user][:abc]` có giá trị là nil.

**Cách fix error này:**

Check trước điều kiện như dưới
```
street = params[:user] && params[:user][:abc] && params[:user][:abc][:street]
```
Hoặc có thể viết một cách ngắn gọn hơn là
```
street = params.dig(:user, :abc, :street)
```
### ActionController::InvalidAuthenticityToken
Error `ActionController::InvalidAuthenticityToken` xảy ra khi các method như POST, PUT, PATCH, hoặc DELETE được gọi nhưng sai CSRF (Cross Site Request Forgery) token.

Nó liên quan đến security , Rails nó sẽ lo cho mình về việc này, vậy khi có attacker hoặc sai token thì sẽ có error này xảy ra.

Trong ApplicationController thì chúng ta sẽ thấy đoạn này:

```ruby
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end
```

**Ajax**
Khi request từ frontEnd tới server sử dụng Ajax, bạn cần phải thêm `CSRF token` trong header. Nếu không thì bạn sẽ gặp lỗi `ActionController::InvalidAuthenticityToken`.

Trong <head>
```ruby
<%= csrf_meta_tags %>
```
Khi request Ajax:
    
```js
const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
fetch('/posts', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
    'X-CSRF-Token': csrfToken
  }
).then(function(response) {
  // handle response
});
```

### NoMethodError: undefined method 'id' for nil:NilClass
 Error này rất hay xảy ra. Lý do là do có variable hoặc hàm nào đó bị nil. 
  Ví dụ
```ruby
   user = User.find_by id: 100 // => nil
   user.id // => NoMethodError: undefined method 'id' for nil:NilClass
```
 Để avoid bug như thế này, bạn phải cẩn thật và check trước để đảm bảo là không bị nil.
    
###  ActionController::ParameterMissing
Đây là loại error của strong parameters.  Khi gặp errors này, Rails đã rescued bởi ActionController::Base, do vậy nó sẽ không trả về lỗi  500 mà lại trả về 400 Bad Request.
    
 Ví du:
```ruby
 class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user
    else
      render :new
    end
  end
  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
```
 params.require(:user) có nghĩa là params cần có :user key, nhưng nếu không có :user key hoặc params[:user], `ActionController::ParameterMissing` sẽ xảy ra.
 
Vậy bạn phải check là đã truyền params lên đúng hay chưa. 
    
### ActionController::UnknownFormat
Error này xảy ra khi user truyền sai format mà hệ thông không có. Giả sư, hệ thống respond về với format Html,hoặc json, nhưng user lại truyển format khác lên, error này sẽ raise.
    
 Ví dụ bạn có code như sau:
```ruby
class BlogPostsController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :index }
    end
  end
end
```
 Sau đó user request với format JSON, error này sẽ xảy ra:
```
ActionController::UnknownFormat (ActionController::UnknownFormat):             
```                              
  
 Ở trên là những error xảy ra khá nhiều, ngoài cái trên cũng còn nhiều cái khác. Bạn xem chi tiết ở đây https://rollbar.com/blog/top-10-ruby-on-rails-errors/