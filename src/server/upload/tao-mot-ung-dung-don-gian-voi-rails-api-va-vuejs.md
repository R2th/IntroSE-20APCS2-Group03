Gần đây mình có tìm hiểu một chút về Rails API và Vuejs. Nên ở bài viết này mình sẽ chia sẻ các bước đơn giản nhất để tạo 1 ứng dụng cũng đơn giản với Rails API và Vue.js

Yaa, bắt đầu thôi :slightly_smiling_face: 

# Tạo một Rails API 
Để bắt đầu thật tốt cho phần này bạn hãy nhớ update ruby version >=2.2.2 và rails version >= 5.

Còn ở trong bài viết của mình sẽ sử dụng ruby 2.5.1, rails 5.2.1.

Trước tiên để tìm hiểu về API mình nghĩ bạn nên hiểu một chút về HTTP và RESTfull API.

RESTful endpoints của ứng dụng như sau:



| Endpoint | Functionality       |
| -------- | --------------------| 
| POST /signup     | Signup| 
| POST /auth/login | Login 
|GET /auth/logout | Logout|
|GET /todos|List all todos|
|POST /todos|Create a new todo|
|GET /todos/:id|Get a todo|
|PUT /todos/:id|Update a todo|
|DELETE /todos/:id|Delete a todo and its items|
|GET /todos/:id/items|Get a todo item|
|PUT /todos/:id/items|Update a todo item|
|DELETE /todos/:id/items|Delete a todo item|

### Thiết lập project
Để tạo 1 project rails api cũng tương tự tạo một ứng dụng rails bình thường, chúng ta chỉ cần chạy câu lệnh:

```
rails new todos-api --api -T
```
Trong đó thì:

Việc sử dụng "--api" vì ở đây chúng ta muốn một ứng dụng Rails API, tức là tạo ApplicationController kế thừa ActionController::API thay vì ActionController::Base trong các ứng dụng Rails thông thường.

Việc sử dụng "-T" thì đơn giản là để bỏ qua các minitest mặc định mà mình không dùng đến, thay vào đó mình sẽ dùng RSPEC nhưng trong phạm vi bài viết mình sẽ không đề cập đến.

### Tạo model
Tạo một model trong rails api cũng tương tự như trong rails app thông thường thôi. Chúng ta sẽ tạo model Todo:
```
rails g model Todo title:string created_by:string
```
Sau đó thì migration để tạo bảng:
```
rails db:migrate
```
### Định nghĩa controller
Tiếp theo là tạo controller cho model Todo
```
rails g controller Todos
```
Định nghĩa routes, trong routes chúng ta định nghĩa `todo resource`
```
resources :todos
```
Giờ thì bắt đầu định nghĩa các function cho controller Todo. Vì ứng dụng của mình khá đơn giản là hiển thị danh sach Todo và thêm todo nên mình sẽ định nghĩa 2 function index, và create:
```
class TodosController < ApplicationController
  def index
  	@todos = Todo.all
  	json_response(@todos)
  end

  def create
    @todo = Todo.create!(todo_params)
    json_response(@todo, :created)
  end

  private

  def todo_params
    params.permit(:title, :created_by)
  end
end
```
Vì với một API thì dữ liệu trả về không phải dạng html như rails app thông thường mà dữ liệu trả về dạng json. Chúng ta tạo 1 file response.rb `app/controllers/concerns/response.rb`
```
module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end
end
```
Tuy nhiên nếu chỉ như vậy thì controller của chúng ta sẽ ko thể biết được về sự tồn tại của helpers này, vậy nên chúng ta sẽ including nó trong application controller
```
class ApplicationController < ActionController::API
  include Response
end
```
Yaa, xong rồi đấy, vậy là chúng ta đã xong 1 API cực kì đơn giản, giờ chỉ cần `rails s` để xem thành quả nhé.

Mình sẽ dùng postman để test

* Lấy về danh sách todo: 
![](https://images.viblo.asia/b98ce9b3-c525-4b7a-bdb1-47bc044eff59.png)

* Thêm một todo mới:
![](https://images.viblo.asia/07b21191-4c86-4bbb-ae39-a15d759563b2.png)

# Tạo một Vue project dùng Vue cli
Vừa rồi chúng ta đã tạm viết xong API giờ thì sẽ bắt tay vào việc viết view cho nó vì chúng ta không thể hiển thị dữ liệu kiểu json thế kia phải không.

Vue.js là một framework linh động (nguyên bản tiếng Anh: progressive – tiệm tiến) dùng để xây dựng giao diện người dùng (user interfaces). Khác với các framework nguyên khối (monolithic), Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước. Khi phát triển lớp giao diện (view layer), người dùng chỉ cần dùng thư viện lõi (core library) của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn. Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) và các thư viện hỗ trợ, Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao hơn nhiều.

### Cài đặt Vue-CLI
Giới thiệu qua một chút về Vue-CLi, thì Vue-CLI là một công cụ giúp xây dựng một ứng dụng mẫu rất nhanh chóng với chỉ vài dòng lệnh

Trước tiên, bạn cần cài đặt Node.js và npm(hoặc yarm trong bài mình sử dụng npm). 

Và sau đó là cài Vue-CLI:

`npm install -g vue-cli`

### Xây dựng phần view cho todos app bằng Vue-CLI
Tạo ứng dụng bằng lệnh:

`vue init webpack vue-todos`

Sau đó thực hiện chạy ứng dụng ở chế độ dev

`cd vue-todos`

`npm run dev`

Ứng dụng Vue vừa tạo đã được build và chạy ở cổng 8080:

![](https://images.viblo.asia/215a1756-0ccb-44f6-9858-17c9088adb1a.png)

### Viết code
Như vậy chúng ta đã tạo ra một ứng dụng mẫu Vue.js và có cài đặt sẵn vue-router.

Trong thư mục src có các thành phần như sau:

* File main.js: đây chính là nơi ứng dụng Vue bắt đầu chạy.
* File App.vue: là component được dùng để render cho trang index.html.
* Thư mục assets: chứa các tài nguyên được chèn vào trang như ảnh, file nhạc…
* components: chứa các component được thiết kế để module hóa ứng dụng Vue, giúp tái sử dụng và bảo trì mã nguồn tốt hơn.
* router: thư mục chứa các router thực hiện trong ứng dụng.

Chức năng đầu tiên của ứng dụng chúng ta đang tạo đó là hiển thị danh sách Todos

Trong file router/index.js thêm:
```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Todos from '@/components/Todos'
import AddTodo from '@/components/AddTodo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/todos',
    	name: 'Todos',
    	component: Todos
    }
  ]
})
```
Sau đó tạo components Todo trong thư mục components tạo file `Todos.vue`

```
<template>
  <div class ="container" style="text-align: left">
    <h2>Todos List:</h2>
    <ul>
	    <li v-for="todo of todos">
	      <p>{{todo.id}} : <strong>{{todo.title}}</strong></p>
	    </li>
  	</ul>
    <h2>Add new todo: </h2>
    <add-todo></add-todo>
  </div>
</template>
<script>
import axios from 'axios';
import AddTodo from './AddTodo';
export default {
 data() {
  return {
   todos: [],
  }
 },
 created() {
  console.log("hihi");
  axios.get('http://127.0.0.1:3000/todos') 
  .then(response => {
   this.todos = response.data
  })
 },
 components: {
    AddTodo
 }
}
</script>
```

Tạo component AddTodo, trong thư mục components tạo file `AddTodo.vue`

```
<template>
  <div id='todo'>
  <div class="container">
    <div class="content-container">
      <form v-on:submit.prevent='createTodo'>
        <label for='title'>Title</label>
        <input v-model='title' type='text'>
        <input v-model='created_by' type='text'>
        <button type="submit" class='login'>submit</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddTodo',
  data () {
    return {
      title: '',
      created_by: ''
    }
  },
  methods: {
    createTodo: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/todos',
        data: {
          title: this.title,
          created_by: this.created_by
        }
      }).then(response => {
        this.$router.push('/todos')
      })
    }
  },
}
</script>
```

Đến đây có thể bạn chưa cài đặt axios nên cần chạy câu lệnh sau để cài đặt axios:

`npm install --save axios`

Giờ thì thêm một đường dẫn todos vào component HelloWord.vue mà được tạo sẵn lúc chúng ta tạo ứng dụng Vue

`<router-link to="/todos">Todos</router-link>`

Tạm thời xong code bên ứng dụng Vue. Giờ chúng ta sẽ qua phần API để config một chút để có thể gọi được API từ ứng dụng Vue

# Dùng CORS để kết hợp Rails API và Vue.js
CORS (hay nói một cách giông dài là Cross-Origin Resource Sharing) là một kĩ thuật được sinh ra để làm cho việc tương tác giữa client và server được dễ dàng hơn, nó cho phép JavaScript ở một trang web có thể tạo request lên một REST API được host ở một domain khác.

Rails hỗ trợ 1 gem giúp làm điều này đó là gem rack-cors.

Trong app Todos API thêm gem rack-cors vào gem file:
`gem 'rack-cors', require: 'rack/cors'`

Sau đó thì `bundle`

Bundle xong chúng ta sẽ thấy trong thư mục config/initializers có file cors.rb, giờ thì vào file cors.rb này để config:
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
 allow do
  origins 'localhost:8080'
   
  resource '*',
   headers: :any,
   methods:  %i(get post put patch delete options head)
  end
end
```

Vậy là mình đã xây dựng xong một ứng dụng đơn giản để mình họa cho sự kết hợp giữa rails api và vue.js với 2 chức năng show danh sách todo va thêm todo:
`http://localhost:8080/#/todos`
![](https://images.viblo.asia/998b798e-47f9-4621-b6c8-d54e5972b6ee.png)


Ở phạm vi bài viết này mình chỉ nêu ra các bước cơ bản nhất để tạo 1 ứng dụng đơn giản, để hiểu hết và để làm được những thứ hay ho hơn xịn xò hơn thì mình cần tìm hiểu kĩ và nhiều hơn ví dụ tại vài trang mà mình đọc:

https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one

https://vuejs.org/

https://cli.vuejs.org/

https://codeaholicguy.com/2018/05/07/cors-la-gi/
...

Cảm ơn bạn đã đọc đến đây ạ :D