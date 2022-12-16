# 1. Giới thiệu
Nếu bạn là một dev chuyên code về client thì bạn thường xuyên tương tác với APIs để gửi nhận dữ liệu về. Và có khi nào bạn muốn làm một server cung cấp APIs cho bên client mình vọc vạch tí cho vui không? Và xem bên server code thế nào, việc cung cấp APIs như thế nào, lấy dữ liệu ra sao? Bài sau mình sẽ tạo một RESTful APIs đơn giản với Rails để dev client có thể hình dung được sơ qua về code server nó như thế nào.

Trước khi vào bài thì chúng ta cần cài đặt một số thứ để bắt đầu việc tạo APIs với Rails:
1. Cài đặt Ruby, Rails. Các bạn có thể tham khảo các bài hướng dẫn cài đặt rất nhiều ở trên mạng.
2. Tools có thể code Rails như Sublime, Visual Code, Ruby Mine...

Nào chúng ta bắt đầu thôi.
# 2. Khởi tạo Project
Chúng ta sẽ tạo một API Project cung cấp các APIs CRUD về việc tạo post comment đơn giản.
Đầu tiên chúng ta chạy dòng lệnh sau ở terminal để tạo một Project mới:
```
rails new demo-api --api
```
Với đối số **--api** ở trên chúng ta sẽ khởi tạo một ứng dụng Rails API. Và ở class application_controller sẽ được kế thừa từ **ActionController::API**. Vậy **ActionController::API** là gì? Theo định nghĩa nó là một lightweight version của **ActionController::Base** và nó chỉ cung cấp các tính năng về APIs thôi. Không cần tất cả các tính năng mà **ActionController::Base** có.
Để có thể build json một cách dễ dàng trong Gemfile chúng ta thêm gem sau:
```
gem 'jbuilder', '~> 2.5'
```
Sau đó chạy lệnh bundle install để cài đặt gem jbuilder này.

## 2.1. Tạo Models
Để tạo post và comment chúng ta cần hai thuộc tính trong model là title và description. Chạy câu lệnh sau để khởi tạo Model mà chúng ta mong muốn.
```
rails g model Post title:string description:string
```
Sau khi khởi tạo xong chúng ta sẽ có model giống như sau:
```
class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
```
Sau khi tạo xong model chúng ta chạy lệnh sau để migrate database:
```
rails db:migrate
```
## 2.2. Tạo Controllers
Sau bước khởi tạo Models bước tiếp theo chúng ta tạo controller để xử lí các công việc liên quan đến thêm sửa xoá dữ liệu, gửi nhận dữ liệu mà chúng ta cần quan tâm trong Project này.
Chạy lệnh sau để generate ra một Controllers:
```
rails g controller Posts
```
Để trả về dữ liệu dạng JSON với HTTP Status code, chúng ta tạo một file mới là response ở trong thư mục app/controllers/concerns/response.rb như sau:
```
module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end
end
```
Với hàm json_response chúng ta sẽ định nghĩa để trả về dạng json với object truyền vào và http status code. Mặc định chúng ta để là ok.
Để module Response có thể sử dụng được chúng ta include module này vào trong ApplicationController như sau:
```
class ApplicationController < ActionController::API
    include Response
end
```
Xong bước tạo controllers chúng ta bắt đầu với bước tạo API.
## 2.3. Tạo API
Sau khi tạo xong posts_controller chúng ta cần quan tâm đến routes cung cấp các địa chỉ APIs để client có thể kết nối vào. Rails cung cấp Resources routes rất thuận tiện việc cung cấp các APIs liên quan đến Model chung ta vừa tạo ở trong. Để cài đặt chúng ta vào file routes ở đường dẫn app/config/routes.rb và thêm resources vào như sau:
```
resources :posts
```
Sau đó chạy lệnh ***rails routes*** chúng ta sẽ thấy các đường dẫn URLs đã được tự generate sẵn cho mình rồi.
```
demo-api $rails routes
Prefix Verb   URI Pattern                             Controller#Action
       posts GET    /posts(.:format)                       posts#index
             POST   /posts(.:format)                       posts#create
       post  GET    /posts/:id(.:format)                   posts#show
             PATCH  /posts/:id(.:format)                   posts#update
             PUT    /posts/:id(.:format)                   posts#update
             DELETE /posts/:id(.:format)                   posts#destroy
```
Nhìn vào mô tả ở bên trên chúng ta sẽ thấy rõ các phương thức (GET, POST, PATCH...), đường dẫn đều được mô tả rõ. Chúng ta chú ý tới cột Controller#Action thì chúng ta sẽ thấy tương ứng với một phương thức chúng ta có Action tương ứng ở controller cụ thể. Ở đây với phương thức GET /posts chúng ta có action index ở posts_controller. Tương tự với các phương thức khác. Sau khi thêm các action vào controller ta được như sau:
```
class PostsController < ApplicationController
    before_action :set_post, only: [:show, :update, :destroy]
    # GET /posts
    def index
        @posts = Post.all
        json_response(@posts)
    end
  
    # POST /posts
    def create
        @post = Post.create!(post_params)
        json_response(@post, :created)
    end
  
    # GET /posts/:id
    def show
        json_response(@post)
    end
  
    # PUT /posts/:id
    def update
        if @post.update(post_params)
            json_response(@post)
        else
            error_response
        end
    end
  
    # DELETE /posts/:id
    def destroy
        if @post.destroy
            json_response(message: 'Deleted', status: :ok)
        else
            error_response
        end
    end
  
    private
  
    def post_params
      # whitelist params
      params.permit(:title, :description)
    end
  
    def set_post
        @post = Post.find_by(id: params[:id])
        json_response(message: 'Could not find Post with id = ' + params[:id], status: :error) if @post.nil?
    end

    def error_response(status = :error)
        json_response(message: :error, status: status)
    end
end
```
Sau khi có đầy đủ các action trên chúng ta bắt đầu test thử API chúng ta vừa tạo xong. Trước khi test thử bằng postman chúng ta khởi động rails server lên bằng câu lệnh ***rails s*** để khởi động server lên.
Kết quả test tạo một post đơn giản.
![](https://images.viblo.asia/b2580dcd-c32f-459f-b8ef-3621805a51a4.png)
# 3. Kết luận
Trên đây là một hướng dẫn đơn giản để tạo một API với Rails. Các bạn có thể dùng postman để test các trường hợp còn lại. Tuy nhiên với các APIs thực tế sẽ không đơn giản thế này, ví dụ như API thật sẽ cần phải authen trước khi chạy các API này. Bài sau mình sẽ hướng dẫn các bạn authen trước khi gọi các APIs này. Cảm ơn các bạn đã đọc bài.

Nguồn tham khảo: https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one