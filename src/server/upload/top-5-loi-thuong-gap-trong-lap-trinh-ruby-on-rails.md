# 1. ActionController::RoutingError
Chúng ta bắt đầu với một lỗi cố điển của bất kỳ ứng dụng nào, phiên bản Rails của lỗi 404. `ActionController::RoutingError` có nghĩa là người dùng đã yêu cầu một URL không tồn tại trong ứng dụng của bạn. Điều này có thể do các link không chính xác trỏ đến hoặc từ trong ứng dụng của bạn. Nó cũng có thể là một malicious user hoặc bot thử nghiệm ứng dụng của bạn cho những điểm yếu phổ biến. Bạn có thể tìm thấy nội dung như thế này trong log của mình:
```
ActionController::RoutingError (No route matches [GET] "/wp-admin"):
```
Nếu bạn không quan tâm đến việc log lỗi 404 do `ActionController::RoutingError` gây ra, bạn có thể tránh chúng bằng cách thiết lập bắt tất cả các lỗi 404. Để làm như vậy, hãy thêm đoạn code sau vào cuối file `config/routes.rb` của bạn:
```
Rails.application.routes.draw do
  # all your other routes
  match '*unmatched', to: 'application#route_not_found', via: :all
end
```
Sau đó, thêm method `route_not_found` vào `ApplicationController` của bạn:
```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def route_not_found
    render file: Rails.public_path.join('404.html'), status: :not_found, layout: false
  end
end
```
# 2. NoMethodError: undefined method '[]' for nil:NilClass
Điều này có nghĩa là bạn đang sử dụng ký hiệu ngoặc vuông để đọc một thuộc tính từ một đối tượng, nhưng đối tượng bị thiếu hoặc `nil`và do đó nó không hỗ trợ phương thức này. Có khả năng chúng ta đang tìm kiếm thông qua các chuỗi hoặc mảng để truy cập các thuộc tính và một số thứ đã bị mất. Điều này có thể xảy ra khi bạn phân tích cú pháp và trích xuất dữ liệu từ JSON API hoặc CSV hoặc chỉ nhận dữ liệu từ các thông số lồng nhau trong controller action.
Giả sử parameters của bạn như thế này:
```
{ user: { address: { street: '123 Fake Street', town: 'Faketon', postcode: '12345' } } }
```
Sau đó, bạn có thể truy cập street bằng cách gọi `params[:user][:address][:street]`. Nếu không có address nào được truyền thì `params[:user][:address]` sẽ là `nil` và khi gọi `[:street]` nó sẽ raise ra lỗi `NoMethodError`.
Bạn có thể thực hiện kiểm tra nil trên mỗi tham số và sử dụng toán tử && như sau:
```
street = params[:user] && params[:user][:address] && params[:user][:address][:street]
```
Tuy nhiên vẫn có cách tốt hơn để truy cập các phần tử lồng nhau trong các hash, array và object như `ActionController::Parameters`. Kể từ Ruby 2.3, hash, array và `ActionController::Parameters` có method `dig` cho phép bạn cung cấp đường dẫn đến đối tượng bạn muốn truy xuất. Nếu ở bất kỳ kết quả `nil` được trả về, `dig` trả về `nil` mà không cần ném một `NoMethodError`. Để có được street từ các thông số trên, bạn có thể gọi: 
```
street = params.dig(:user, :address, :street)
```
Bạn sẽ không nhận được bất kỳ lỗi nào từ điều này, mặc dù bạn cần phải biết răng street vẫn có thể là `nil`.
# 3. NoMethodError: undefined method 'id' for nil:NilClass
Vẫn là `NoMethodError`, tuy nhiên lần này với một thông báo khác. Lỗi này thường xuất hiện xung quanh hành động tạo đối tượng có quan hệ. Chúng ta hãy xem một ví dụ.
Đây là một controller với các hành động để tạo ra một ứng dụng cho khóa học.
```
class CourseApplicationsController < ApplicationController
  def new
    @course_application = CourseApplication.new
    @course = Course.find(params[:course_id])
  end
  def create
    @course_application = CourseApplication.new(course_application_params)
    if @course_application.save
      redirect_to @course_application, notice: 'Application submitted'
    else
      render :new
    end
  end
  private
  def course_application_params
    params.require(:course_application).permit(:name, :email, :course_id)
  end
end
```
Form trong `new` template trong giống như sau:
```
<%= form_for [@course, @course_application] do |ca| %>
  <%# rest of the form %>
<% end %>
```
Vấn đề ở đây là khi bạn gọi `render :new` từ action `create`, biến instance `@course` không được set. Bạn cần đảm bảo rằng tất cả các đối tượng mà `new` template cần cũng được khởi tạo trong action `create`. Để khắc phục lỗi này, chúng ta sẽ cập nhận action `create` như sau:
```
  def create
    @course_application = CourseApplication.new(course_application_params)
    if @course_application.save
      redirect_to @course_application, notice: 'Application submitted'
    else
      @course = Course.find(params[:course_id])
      render :new
    end
  end
```
# 4. ActionController::ParameterMissing
Lỗi này là một phần của việc sử dụng `Strong parameters` của Rails. Nó không hiển thị như là một lỗi 500 mặc dù nó được rescue bởi `ActionController::Base` và trả về như 400 Bad Request.
Lỗi đầy đủ có thể trông giống như sau:
```
ActionController::ParameterMissing: param is missing or the value is empty: user
```
Điều này sẽ được đi kèm với một controller như sau:
```
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
`params.require(:user)` có nghĩa là nếu `user_params` được gọi và `params` không có một `:user` key hoặc params[:user] là empty, `ActionController::ParameterMissing` sẽ được raise.
Nếu bạn đang xây dựng một ứng dụng được sử dụng thông qua giao diện web và bạn đã tạo một form để đăng chính xác param `user` vào hành động này, thì khi param `user` bị thiếu thì có thể ai đó đang gây rối với ứng dụng của bạn. Nếu đúng như vây,  phản hồi 400 Bad Request là tốt nhất cho bạn vì bạn không cần phải phục vụ cho những người dùng như vậy.
Nếu ứng dụng của bạn đang cung cấp API, thì 400 Bad Request cũng là một phản hồi thích hợp cho tham số bị thiếu.
# 5. ActionController::InvalidAuthenticityToken
Lỗi này liên quan đến bảo mật trong app của bạn. `ActionController::InvalidAuthenticityToken` sẽ raise ra khi một request POST, PUT, PATCH, hoặc DELETE bị thiếu hoặc CSRF(Cross Site Request Forgery) token không chính xác. CSRF ( Cross Site Request Forgery) là kỹ thuật tấn công bằng cách sử dụng quyền chứng thực của người dùng đối với một website. 
Rails giảm thiếu các cuộc tấn công CSRF bao gồm một secure token trong tất cả các form được trang web xác định và xác minh, nhưng không thể được một bên thứ ba xác định. Điều này được thực hiện bởi dòng `ApplicationController` quen thuộc:
```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end
```
Vì vậy, nếu ứng dụng PROD của bạn đang raise lỗi `ActionController::InvalidAuthenticityToken` thì điều đó có nghĩa là kẻ tấn công đang nhắm mục tiêu đến người dùng website của bạn, nhưng các biện pháp bảo mật của Rails sẽ giúp bạn an toàn.
# Conclusion
Lỗi Rails có thể đến bất kỳ đâu trong ứng dụng của bạn, trong bài này chúng ta đã liệt kê ra 5 lỗi phổ biến của Rails. Vẫn còn rất nhiều lỗi phổ biến khác. Tham khảo [Top 10 Ruby on rails errors](https://rollbar.com/blog/top-10-ruby-on-rails-errors/).