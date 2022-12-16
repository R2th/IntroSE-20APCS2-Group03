Giao diện lập trình ứng dụng, còn gọi là API (Application Programming Interface) là chương trình cho phép người dùng sử dụng các phương thức của một ứng dụng từ bên ngoài ứng dụng đó.
Chúng ta sẽ tạo ra một REST API với các thao tác tạo mới, đọc, chỉnh sửa, xóa trên bảng users, các thao tác này có thể được sử dụng từ bên ngoài ứng dụng. Việc cài đặt API cũng giống với việc cài đặt các phương thức CRUD cho user trong ứng dụng, chỉ khác ở các điểm sau:
1. Thông thường, ta có các form new.html.erb và edit.html.erb để giúp người dùng có thể đăng ký và chỉnh sửa thông tin cá nhân. Nhưng với API ta không cần bất kì một view form nào, người dùng không tương tác trực tiếp với ứng dụng trên server, thay vào đó sẽ có ứng dụng bên thứ 3 giúp người dùng các thao tác này.
2. Tương tự, trong Controller cũng sẽ không có bất kì thao tác new hay edit nào.
3. Bình thường, ta thường dùng gem devise để xác nhận người dùng. Với API, ta bỏ qua việc xác nhận người dùng, thay vào đó ta có thao tác xác nhận HTTP.
4. Ta không thực hiện bất kì thao tác nào trực tiếp trên controller mà chỉ trả về một số dữ liệu với status code và message thành công hay thất bại. Dữ liệu trả về được định dạng bằng JSON hoặc XML. Theo quy ước trên, ta sẽ trả về dữ liệu khi được request bởi client thông qua API. JSON request sẽ được trả về JSON data, XML request sẽ được trả về XML data.
5. API không có bất kì một giao diện người dùng nào (như link hay form để điền thông tin người dùng...). Do đó, chúng ta cần tạo ra document để bên thứ 3 có thể dễ dàng sử dụng API.
### Bước 1: viết routes
```
namespace :api do
 resources :users, :defaults => { :format => 'xml' }
end
```
Đặt routes bên trong api namespace, nhờ đó ta tránh được xung đột với users controller (nếu có) của ứng dụng. Nếu không có users controller, chỉ cần viết:
```
resources :users, :defaults => { :format => ‘xml’ }
```
Tuy vậy, tốt hơn vẫn nên sử dụng một namespace và nhóm tất cả các controller liên quan đến API vào trong chỉ một thư mục api.
Ở đây, ta sử dụng định dạng mặc định là XML. Nếu không thiết lập, rails sẽ xem nó như một HTML request nếu user quên truyền định dạng.
### Bước 2: tạo model
```
class User < ActiveRecord::Base
  attr_accessible :first_name, :last_name, :email, :password, :password_confirmation, 
                  :temp_password
  validates :email, :first_name, :last_name, :presence =>true
  validates_uniqueness_of :email
end
```
Trong model ta có validated email và một số thứ khác, người dùng gọi API phải cung cấp những thông tin này. Nghĩa là, để tạo ra một user, người dùng phải truyền vào email, :first_name và :last_name. Còn password sẽ được tạo tự động và để người dùng thay đổi sau.
### Bước 3: tạo users controller
```
class Api::UsersController < ApplicationController
  http_basic_authenticate_with :name => "myfinance", :password => "credit123"

  skip_before_filter :authenticate_user! # we do not need devise authentication here
  before_filter :fetch_user, :except => [:index, :create]

 def fetch_user
    @user = User.find_by_id(params[:id])
  end

  def index
    @users = User.all
    respond_to do |format|
      format.json { render json: @users }
      format.xml { render xml: @users }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @user }
      format.xml { render xml: @user }
    end
  end

  def create
    @user = User.new(params[:user])
    @user.temp_password = Devise.friendly_token
    respond_to do |format|
      if @user.save
        format.json { render json: @user, status: :created }
        format.xml { render xml: @user, status: :created }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
        format.xml { render xml: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.json { head :no_content, status: :ok }
        format.xml { head :no_content, status: :ok }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
        format.xml { render xml: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @user.destroy
        format.json { head :no_content, status: :ok }
        format.xml { head :no_content, status: :ok }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
        format.xml { render xml: @user.errors, status: :unprocessable_entity }
      end
    end
  end
end
```
### Bước 4 : tạo API Documentation
```
API USAGE DOCUMENT
_____________________________________________________
Basic Authentication:
    username: myfinance
    password: credit123

Content Type:
   "application/xml" or "application/json"

Body:
   You can pass xml or json data in Body

   sample json body

    {
     "email" : "test@yopmail.com", 
     "first_name" : "arun", 
     "last_name" : "yadav"
    }

   Sample xml body

    <user>
      <email>"test@yopmail.com"</email<first-name>arun</first-name>
      <last-name>yadav</last-name>
    </user>

NOTE : Content Type should be set to application/xml for xml data in body 
and to application/json for json data in body

API Requests:

=> listing users
   url: http://localhost:3000/api/users
   method: GET
   body : not needed

=> Retrieving User detail
  url: http://localhost:3000/api/users/:id 
  method: GET
  body : not needed

=> creating users
   url: http://localhost:3000/api/users
   method: Post
   Body : It can be xml or json

=> Updating User
  url: http://localhost:3000/api/users/:id 
  method: PUT
  Body : It can be xml or json

=> Deleting User 
  url: http://localhost:3000/api/users/:id 
  method: DELETE
  body : not needed
```
### Bước 5: kiểm tra API
Cần phải có một REST client để sử dụng API. 
Bạn có thể sử dụng addon REST client trên Firefox để tìm method, url, body, header, authentication...