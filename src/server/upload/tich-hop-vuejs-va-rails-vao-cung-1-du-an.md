Là một newbie trong lập trình nói chung là lập trình web nói riêng thì việc cài đặt, config môi trường sao cho chương trình chạy được là việc chiếm khá nhiều thời gian của bản thân trong quá trình học.<br>
Ở bài viết này sẽ nói về cách tích hợp, cài đặt môi trường để kết hợp VueJS và Ruby on Rails vào cùng 1 dự án.

# 1. Khái quát
Một cách khá đơn giản để tích hợp VueJS và Ruby on Rails là chúng ta sẽ chỉ sử dụng Rails như 1 server API dùng để lưu trữ data. Còn ta sẽ dùng client server của VueJS để fetch, thao tác và hiển thị dữ liệu.
* Đầu tiên, chúng ta tạo rails app only API. `rails new vue-rails --api`.

# 2. Khắc phục CORS error
* **CORS là gì ?** <br>
CORS là viết tắt của `Cross-Origin-Resource` . <br>Các code mà chạy trên các domains, protocols hoặc ports khác nhau thì các request giữa chúng nó được gọi là `cross-origin`.<br>
Các browser web hiện đại hiện nay hầu hết đều mặc định chặn các request `cross-origin` từ đầu.<br>
=> Nếu bạn làm việc trên app mà Frontend Server và Backend Server là 2 server riêng biệt thì lúc này chúng ta cần config CORS để cho chúng có thể trao đổi thông tin với nhau. Ở đây cần config CORS sao cho server của vueJS và server của Rails hoạt động được với nhau.<br>

* Bỏ comment `gem 'rack-cors` trong Gemfile
<br>Sau đấy thì chạy `bundle install`

*  Update lên rails 7 <br>
Ngày viết bài này là ngày 14/7/2022. Không hiểu vì lý do gì mà CORS nó không chạy trên rails 6. Update lên rails 7 thì CORS nó lại chạy bình thường. Ai biết cách fix lỗi này thì bảo mình với  =)))<br>
Lưu ý rằng rails 7 chỉ support cho phiên bản ruby 2.7 trở lên. Nên nếu ai đang dùng ruby bản cũ thì nhớ update lên trước nhé.<br>
Sửa lại gem rails trong Gemfile thành `gem 'rails', '~> 7.0', '>= 7.0.3.1'`.<br>
Chạy `bundle install`.<br>
Chạy `rails app:update`.<br>
`rails db:migrate RAILS_ENV=development`

* config/initializes/cors.rb<br>
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:8080/"   # URL này là URL của client server, ở đây port mặc định của vueJS là port 8080

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

# 3. Tạo db 
* `cd vue-rails`
* `rails g scaffold post content:text`
* `rails db:migrate`<br>
Dùng scaffold để tạo model `post` có column `content`. Kiểu dữ liệu của content là `text`. Scaffold đồng thời cũng sẽ tạo sẵn cho chúng ta controller `PostsController` luôn.
* Xóa file controller cũ `app/controller/posts_controller.rb`. Tạo mới folder và file `app/controllers/api/v1/posts_controller.rb`.  Nội dung 2 file giống nhau chỉ khác nhau ở tên Class.
```ruby
class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions. 
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:content)
    end
end

```
Sau khi controller thực hiện các action với model thì sẽ trả db dạng json về cho views. Chúng ta sẽ dùng vueJS để fetch các db này.

* Tạo db bằng rails console<br>
Truy cập vào rails console bằng câu lệnh `rails c`.<br>
`Post.create!(content: "1st post")`<br>
`Post.create!(content: "2nd post")`<br>
Tạo 2 post mới có content lần lượt là `1st post` và `2nd posts`.
<br>Sau khi tạo db xong chúng ta có thể xem db dưới dạng json trong localhost. Khởi động `rails server` rồi truy cập vào `http://localhost:3000/api/v1/posts`, ta có thể xem được thông tin 2 posts chúng ta vừa tạo ở đây.<br><br>
![image.png](https://images.viblo.asia/d0ba6492-9391-4683-af69-bb07ca37714c.png)

# 4. Tạo project vue
* `cd vue-rails`
*  install vue CLI `yarn global add @vue/cli`
*  `vue create frontend`
*  Add vue router `vue add router`. Vue router thích thì add không thì cũng không sao. 
* Sửa lại file `app/frontend/src/main.js`<br>
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(router).mount('#app')
```

# 5. Fetch API và hiển thị dữ liệu
* frontend/src/views/Home.vue
```html
<template>
  <div class="home">
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Content</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id" >
        <th scope="row">{{ item.id }}</th>
        <td>{{item.content}}</td>
      </tr>

    </tbody>
  </table>

  </div>
</template>

<script>
import {ref, reactive} from 'vue'

export default {
  setup() {
    var items = ref(null);

    const fetchURL = 'http://localhost:3000/api/v1/posts';

    fetch(fetchURL)
      .then(response => response.json())    
      .then(data => {
        items.value = data
        console.log(data) 
    })
    .catch(error => console.error(error));

    return {items}
  },
}
</script>
```

* Mở console ta sẽ thấy thông tin data sau khi fetch thành công được in ra.<br>
 ![image.png](https://images.viblo.asia/fb3fdf8e-1c25-4214-b9f6-100830bd5b42.png)

 * Run `yarn serve` và truy cập vào `http://localhost:8080/` ta sẽ thấy db sẽ được hiển thị ra màn hình.<br>
 ![image.png](https://images.viblo.asia/c0434de9-78bb-4a75-97bd-2726db311527.png)

 # Tổng kết
 Vậy chúng ta đã fetch API và hiển thị dữ liệu nhận về ra ngoài màn hình thành công 😊😊.<br>
 Mặc dù app này chỉ có mỗi chức năng hiển thị, nhưng chúng ta cũng có thể làm thêm các chức năng create, update, delete bằng cách tương tự.