Để bắt đầu thì chúng ta cùng tạo ra một app Rails mới.
```
rails new session_practice
cd session_practice
```
Sau đó, chúng ta sẽ cùng tạo ra model User và controller của nó. Sau đó chúng ta cần có 1 controller nữa để xử lý việc custom routes để quản lý session.
## Model

Chúng ta cần tạo ra 1 model với 2 attribute là username và password.

```ruby
rails g model user username password_digest 
```

## Controller
`UsersController` cần có 2 action là `new` và `create`. Và `SessionsController` sẽ cần có 2 action để quản lý login fail và pass là `new` và `create`. Và chúng ta sẽ cần khai báo 4 đường dẫn đến 4 action này trong file routes. 

Chúng ta cần sử dụng lệnh
```
rails g controller users new create 
rails g controller sessions new create login welcome 
```

## Bcrypt

Trong cơ sở dữ liệu, chúng ta sẽ không lưu trữ password thuần mà chúng ta sẽ mã hóa chúng bằng Bcrypt và lưu đoạn đã mã hóa vào trong DB. Vì vậy, chúng ta sẽ thêm gem bcrypt;

```
gem install bcrypt
bundle install
```

Trong model User, chúng ta sẽ thêm một macro để sử dụng method Bcrypt.
```
class User < ApplicationRecord
     has_secure_password
end
```

## Routes

Việc tiếp theo chúng ta cần làm là thêm routes trong file `config/routes.rb` 

```
Rails.application.routes.draw do
   resources :users, only: [:new, :create]
   get 'login', to: 'sessions#new'
   post 'login', to: 'sessions#create'
   get 'welcome', to: 'sessions#welcome'
end
```

Giờ chúng ta cần có View để hiển thị nút Sigup và Login. Nếu user đã login thì hiển thị tên của họ.

## View

Chúng ta cần thêm:
- Nút Signup và Login khi vừa vào trang, vì thế chúng ta sẽ thêm 2 nút này vào `sessions/welcome.index.erb`
```ruby
<h1>Welcome</h1>
<%= button_to "Login", '/login', method: :get%>
<%= button_to "Sign Up", '/users/new', method: :get%>
```
- Nút Signup để chuyển hướng về `new` trong `UsersController` vì thế chúng ta sẽ thêm form signup vào `users/new.html.erb `. 
- Nút Login sẽ chuyển hướng về `new` trong `SessiosController`, vì thế chúng ta sẽ thêm form login vào `sessions/new.html.erb `.

    ### Form Signup
    ```ruby
    <h1>Sign Up</h1>
    <%= form_for @user do |f|%>
      <%= f.label :username%><br>
      <%= f.text_field :username%><br>
      <%= f.label :password%><br>
      <%= f.password_field :password%><br>
      <%= f.submit %>
    <%end%> 
    ```  
    Biến `@user` sẽ được định nghĩa là `@user = User.new` trong action `new` của `UsersController`
    
    Khi người sử dụng click nút "Submit", chúng ta sẽ chuyển hướng tới action `create` trong  `UsersController`.
    
    ```ruby
    def create
       @user = User.create(params.require(:user).permit(:username,:password))
       session[:user_id] = @user.id
       redirect_to '/welcome'
    end
    ```
    
    Đầu tiên, chúng ta tạo biến instance sau đó chuyển hướng về homepage. Sau đó thì chúng ta sẽ cần lưu user_id vào session.
    Chúng ta sẽ cần tạo một method để lưu trữ thông tin của user đang đăng nhập. Vì thế, chúng ta cần thêm 1 method trong  Application Controller để đảm bảo tất cả mọi nơi đều có thể truy cập vào method này
    
    ```ruby
    def current_user    
        User.find_by(id: session[:user_id])  
    end
    ```
   Ngoài ra, chúng ta cần kiểm tra xem user đã login hay chưa 
   
    ```ruby
    def logged_in?
        !current_user.nil?  
    end
    ```
    
    Để view có thể truy cập đc vào phương thức này, chúng ta cần sử dụng macro `helper_method`. Vì thế, ApplicationController của chúng ta sẽ như sau:
    ```ruby
   class ApplicationController < ActionController::Base
        helper_method :current_user
        helper_method :logged_in?
        
        def current_user
           User.find_by(id: session[:user_id])
        end
        def logged_in?
            !current_user.nil?
        end

    end
    ```
    
    khi đó,, nếu user đã login rồi, chúng ta sẽ hiển thị ra tên của user, vì vậy file `sessions/welcome.html.erb`
    ```ruby
    <h1>Welcome</h1>
    <% if logged_in? %>
        <h1>You are Logged In, <%= current_user.username %></h1>
    <% end %>
    <%= button_to "Login", '/login', method: :get%>
    <%= button_to "Sign Up", '/users/new', method: :get%>
    ```
    
    Sau khi chúng ta đã signup thì chúng ta sẽ lưu session cho người đó. CHúng ta sẽ implement một page để login trong `sessions/new.html.erb`
    
    ```ruby
        <h1>Login</h1>
        <%= form_tag '/login' do %>
           <%= label_tag :username%>
           <%= text_field_tag :username %>
           <%= label_tag :password%>
           <%= password_field_tag :password%>
           <%= submit_tag "Login"%>
        <%end%>
    ```
    
    Sau khi submit thì Sessions sẽ chịu trách nhiệm tìm user dựa trên username
    
     ```ruby
     def create
       @user = User.find_by(username: params[:username])
       if @user && @user.authenticate(params[:password])
          sessions[:user_id] = @user.id
          redirect_to '/welcome'
       else
          redirect_to '/login'
       end
    end
    ```
    
    Nếu tìm thấy user, chúng ta sẽ kiểm tra xem có trùng password không. Để làm được điều này, chúng ta sử dụng method `authenticate` của Bcrypt.
    
##     Authorization

Trong 1 vài page, chúng ta cần đăng nhập, nhưng 1 vài page chúng ta không. Nên chúng ta có thể sử dụng filter để kiểm tra việc login.
```ruby
class ApplicationController < ActionController::Base
    before_action :authorized
   .
   .
   .
    def authorized
       redirect_to '/welcome' unless logged_in?
    end
    end
```

Khi thêm vào Application thì tất các các controller kế thừa đều sẽ cần authorized. Vì vậy, nếu controller nào không sử dụng, chúng ta có thể skip nó sử dụng method `skip_before_action`

```ruby
class UsersController < ApplicationController
    skip_before_action :authorized, only: [:new, :create]
    .
    .
    .
end
```

Vậy là chúng ta đã cài đặt xong việc authorization cho trang web của mình rồi. :D
Chúc các bạn thành công.
Học Ruby On Rails ở đâu hiệu quả, chỉ có thể là Awesome Academy. Tham khảo các khóa học lập trình tại Awesome Academy ở link https://awesome-academy.com/lich-khai-giang