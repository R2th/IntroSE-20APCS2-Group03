# Authentication từ Scratch
Đã bao giờ bạn thấy gem Devise quá lớn và nhiều khi khó để customize để tạo 1 authentication đơn giản chưa?

Thường thì mọi người sử dụng devise để thực hiện việc xác thực người dùng, hỗ trợ hầu hết trong việc quản lý và xác thực người dùng trong hệ thống của bạn. Nhưng có vẻ như mất khá nhiều thời gian khi cần phải custom theo các nhu cầu cụ thể của ứng dụng đó.
 Vì vậy chúng ta thử mã hóa session (session encryption) với 1 ứng dụng của rails xem sao nhé ^^
 
#  Cài đặt môi trường
1. rails new shop
2. cd shop
3. Tạo controller và add routes
    
    `rails g controller home index`
    
    ```
    Rails.application.routes.draw do
      root ‘home#index’
    end
    ```
  4. Thêm html cho home
     
     ```
     <h1>Shop</h1>
     <p>This is home page</p>
     ```
 5. Thêm `gem 'bcrypt'` vào Gemfile
    
    Gem bcrybt sẽ giúp chúng ta mã hóa mật khẩu dựa trên các thuật toán mã hóa Blowfish và đây là mã hóa 1 chiều bạn không thể lấy lại mật khẩu khi đã biết chuỗi mật khẩu trong database. Nghĩa là dù có bị đánh cắp dữ liệu cũng không thể biết được mật khẩu của bạn. (Quá an toàn phải không nào, và Devise cũng đang sử dụng bcrypt) vì bcrypt sẽ sử dụng salt là 1 chuối hash được sinh ra ngẫu nhiên
    
    Nhớ `bundle install`  và chạy lại server nhé ^^
    
  6. scaffold User model
  
      Bạn có thể thêm các trường trong bảng user tùy chỉnh nhé. ở đây mình chỉ cần địa chỉ email và password:digest để tạo password_digest filed trong bảng user
      
      Tạo sao lại là password_digest chứ không phải password, vì do gem bcrypt cần có sắn trường password_digest để lưu password đã được mã hóa.
      
      `rails g scaffold User email:uniq password:digest`
      
      Nhớ rake lại db: `rails db:migrate`
      
 7.  Add has_secure_password và valid email trong user.rb
        ```
        class User < ApplicationRecord
          has_secure_password

          validates :email, presence: true, uniqueness: true
        end
        ```
        
        `has_secure_password` sẽ tạo ra 2 fields là pass và password_confirmmation
        
        validate email là duy nhât và required
  8. start server 
      
      `rails s`
      
      
      
# Tạo User và kiểm tra
1. Tạo User
![](https://images.viblo.asia/ce99f7b5-e9b0-4597-9a04-082ed334bbb1.png)

2. Kiểm tra
![](https://images.viblo.asia/4a9138f8-2764-465c-bc49-fce4243dc6a3.png)


# Session

**Session là gì?**

Session hay còn gọi là 1 "phiên" làm việc. Nó là cách giao tiếp giữa client và server. 1 Session được tạo khi client gửi request tới server và nó được lưu trên server. Nó tồn tại xuyên suốt từ trang này tới trnag khác trong ứng dụng và chỉ kết thúc khi timeout và khi close ứng dụng.

**Hoạt động của session?**

1. Client gửi request lên server
2. Server tạo session ID 
3. Server sau đó sẽ trả về view và cookies có chứa session ID.
4. Khi client gửi request lên server sẽ gửi session ID được lưu ở cookie lên server
5. Trên server sẽ so sánh session ID ở client có giống vs session ID ở server hay không? 

**Áp dụng vào login**

Khi 1 user login thì sẽ tạo ra 1 session. Và khi user logout thì sẽ xóa session đó.

1. Tạo Session 

Do đó chúng ta tạo session controller với  3 actions `new, create, destroy`

`rails g controller sessions new create destroy`

2. Thêm code vào session controller
    ```
    class SessionsController < ApplicationController
      def new
      end

      def create
        user = User.find_by_email(params[:email])
        if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          redirect_to root_url, notice: "Logged in!"
        else
          flash.now[:alert] = "Email or password is invalid"
          render "new"
        end
      end

      def destroy
        session[:user_id] = nil
        redirect_to root_url, notice: "Logged out!"
      end
    end
    ```

  3. Tạo form đăng nhập
       ```
        <h1>Login</h1>
        <%= form_tag sessions_path do |form| %>
          <div class="field">
            <%= label_tag :email %>
            <%= text_field_tag :email %>
          </div>
          <div class="field">
            <%= label_tag :password %>
            <%= password_field_tag :password %>
          </div>
          <div class="actions">
            <%= submit_tag “Login” %>
          </div>
        <% end %>
       ```
      
      4. Setting Routes
        ```
        Rails.application.routes.draw do
          root "home#index"

          resources :users
          resources :sessions, only: [:new, :create, :destroy]
          get "signup", to: "users#new", as: "signup"
          get "login", to: "sessions#new", as: "login"
          get "logout", to: "sessions#destroy", as: "logout"
        end
        ```
      
      OK vậy là đã xong. Mọi người có thể đăng nhập và đăng xuất user ra khỏi hệ thống
      
       http://localhost:3000/login và http://localhost:3000/logout
       
       OK Như vậy là chúng ta đã hoàn thành đăng nhập rồi
      ![](https://images.viblo.asia/89efa89a-9c16-4cf5-adac-76a4f06964ce.png)
       
# Current User
   Khi chúng ta đăng nhập, chúng ta có thể tạo current user để có thể phần quyền với từng user đăng nhập như gem cancancan, pudpit,..
   1. Thêm code vào application_controller
       ```
       helper_method :current_user
       
       def current_user
        if session[:user_id]
          @current_user ||= User.find(session[:user_id])
        else
          @current_user = nil
        end
      end
       ```
  2. Sửa view khi chúng ta đã đăng nhập thành công
       ```
       <% if current_user %>
          Logged in as <%= current_user.email %>.
          <%= link_to "Log Out", logout_path %>
        <% else %>
          <%= link_to "Sign Up", signup_path %> or
          <%= link_to "Log In", login_path %>
        <% end %>
        <h1>Shop</h1>
        <p>This is home page</p>
       ```
       
       
# Kết luận
Nếu bạn muốn 1 thứ j đó đơn giản trong việc authentication mà không muốn sử dụng devise gem thay vào đó có thể sử dụng bcrypt gem và tạo 1 session đơn giản hơn rất nhiều phải ko nào? ^^