# Tạo một ứng dụng Rails API backend và VueJs frontend
Bài viết này sẽ hướng dẫn bạn tạo 1 ứng dụng Rails API backend và VueJs frontend. Nếu bạn chưa tìm hiểu về API bạn có thể đọc thêm tại [đây](https://github.com/rails-api/rails-api)
## Your Rails App
Rails sẽ chịu trách nhiệm cho tất cả các phần liên quan đến xử lý dữ liệu, phần mà người dùng sẽ không thấy được khi thực hiện bất kỳ thao tác nào trên giao diện người dùng. Điều này có nghĩa là nó bao gồm quản lý Postgres Database, các Models, các Controllers và cả dữ liệu JSON trả về. Ứng dụng VueJs được viết riêng biệt sẽ xử lý phần giao diện người dùng, bài viết này sẽ tạo 1 ứng dụng Rails riêng biệt chỉ xử lý phần server bằng cách sử dụng --api khi tạo mới 1 Rails app. Thêm nữa bài viết sẽ sử dụng cơ sở dữ liệu Postgresql thay cho việc sử dụng SQlite mặc định, để sử dụng được ta sẽ thêm -d postgresql khi tạo app. Bạn có thể sử dụng mysql cho cơ sở dữ liệu. Dưới đây là trường hợp sử dụng Postgresql cho cơ sở dữ liệu.
```
rails new sandbox --api -d postgresql
```

Bởi vì Rails app và VueJs app được lưu trữ trên 2 server riêng biệt nên điều đầu tiên chúng ta cần xử lý là [CORS](https://codeaholicguy.com/2018/05/07/cors-la-gi/) (Cross-Origin Resource Sharing). Rất may mắn với Rails chúng ta sẽ không phải quá bận tâm đến vấn đề này. Tìm file theo đường dẫn sau *config/initialzers/cors.rb* và sửa file như sau:
```

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
"* " biểu thị cho cả Origins và Resource. Trong môi trường phát triển bạn có thể sẽ muốn điền tên miền cụ thể cho ứng dụng của mình.

Tiếp đến, bạn cần thêm vào Gemfile gem sau: gem "rack-cors". Sau khi thêm gem vào ta chạy lệnh trên terminal:
```
bundle install
```
Tiếp theo chúng ta sẽ tạo Model đầu tiên cho ứng dụng. Tuy nhiên trước khi tạo chúng ta cần setup database
```
rails db:create
```
Sau đó chúng ta tạo 1 scaffold cho model
```
rails generate scaffold Contacts name:string relationship:string
```
Sau khi chạy lệnh trên xong sẽ tự động generate ra 1 file contact.rb có nội dung như sau:
```
class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :relationship

      t.timestamps
    end
  end
end
```
Chúng ta chạy lệnh "rails db:migrate" để tạo bảng.

Chúng ta sẽ tạo resource đầu tiên cho backend. Bạn cũng có thể thấy trong file routes.rb đã tự tạo sẽ resourse :smiley:, nội dung trong file sẽ hiển thị như sau:
```
Rails.application.routes.draw do
  resources :contacts
end
```

Vì đây là 1 ứng dụng chỉ dùng API nên chúng ta sẽ không thấy được bất kỳ view nào. Vào controller ta cũng sẽ thấy được dữ liệu trả ra là json, ví dụ như:
```
def index
  @contacts = Contact.all

  render json: @contacts
end
```
Chúng ta sẽ thêm thử 1 bản ghi để xem hoạt động của json như thế nào :thinking: 
Mở terminal và chạy lệnh sau *rails c*, trong giao diện dòng lệnh thêm lệnh sau:
```
Contact.create!(name: 'Simon', relationship: 'me')
```
Ok, khi thực hiện xong lệnh này chúng ta đã có 1 bản ghi trong cơ sở dữ liệu.
Để xem giá trị của json trả về như nào, chúng ta chạy lệnh *rails s* và truy cập địa chỉ *localhost:3000/contacts*
![](https://images.viblo.asia/9db535d9-76d8-4dc0-8138-e18fcd8ba762.png)

Đây là định dạng dữ liệu khi chúng ta trả về json :smiley: 
Ok, vậy là chúng ta đã tạo xong phần backend cơ bản. Tiếp theo chúng ta sẽ tạo frontend :smile: 
## Your VueJS App
Sau khi tạo xong backend chúng ta tiếp tục tạo frontend app sử dụng VueJS, các bạn có thể tìm hiểu thêm VueJS tại [đây](http://vuejs.org).
Nếu bạn chưa cài đặt Vue-CLI thì chạy dòng lệnh sau:
```
$ npm install -g vue-cli
```
Bạn có thể đọc thêm về phần cài đặt này tại: https://vuejs.org/v2/guide/installation.html.
Sau khi cài đặt xong vue-cli, chúng ta sẽ tạo mới 1 VueJS app. Di chuyển đến thư mục bạn muốn tạo app và chạy lệnh, ở đây chúng ta sử dụng Webpack Template để tạo:
```
vue init webpack sandboxfront
```
Khi chạy lệnh này, trên console sẽ hiển thị ra 1 vài câu hỏi để config bạn có thể đọc và nhập câu trả lời theo nhu cầu của bản thân :smile:.

Sau khi init xong app chúng ta cd đến app và chạy lệnh:
```
npm run dev
```
Khi chạy lệnh trên xong truy cập là địa chỉ `localhost:8080` sẽ thấy giao diện chuẩn của Vue như sau
![](https://images.viblo.asia/3945fe56-2e03-43fd-a422-366d5289cf00.png)

Trong Vue có 1 khái niệm quan trọng đó là các `components`. Trong cách suy nghĩ ta có thể coi nó là V trong mô hình MVC. Trong Rails App sẽ xử lý phần M, C trong mô hình MVC. Nếu bạn vào trong project và truy cập vào `src/components` bạn sẽ thấy có 1 file `HelloWorld.vue` file này chịu trách nhiệm hiển thị ra giao diện chuẩn của Vue như trên. 

Ngoài trang giao diện mặc định của Vue bạn có thể tạo thêm các màn hình giao diện khác dưới đây là 1 ví dụ:

Trước tiên để có thể chỉ dẫn đến đúng trang giao diện mà bạn vừa tạo bạn cần phải định tuyến cho nó. Cách đơn giản là bạn chạy lệnh `npm install vue-router`.

Khi chạy xong bạn sẽ thấy file `sandboxfront/src/router/index.js` được tạo ra, file này cũng có ý nghĩa tương tự như file `route.rb` trong Rails.

Mở file đó và thêm như sau:
```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Contacts from '@/components/Contacts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
   }
  ]
})
```
Với việc tạo file như trên chúng ta sẽ list ra toàn bộ contacts.

Tiếp đến tạo file Contacts.vue trong Components, trong file này cần phải có 3 phần chính:

* template
* script
* style(style có thể rỗng)
Đầu tiên là <template></template>
```
<template>
 <div class="contacts">
  <div v-for="contact in contacts" :key="contact.id">
   <p>{{contact.name}} is my {{contact.relationship}}</p>
  </div>
 </div>
</template>
```
Phần này các bạn có thể sửa theo ý thích :smiley: 

Tiếp đến thêm <script> để đọc dữ liệu từ Rails API app của bạn.
```
<script>
import axios from 'axios'
export default {
  name: 'Contacts',
  data () {
    return {
      contacts: [],
      name: [],
      relationship: [],
      errors: []
    }
  },
  created () {
    axios.get('http://localhost:3000/contacts')
      .then(response => {
        this.contacts = response.data
        console.log(response.data)
      })
      .catch(e => {
        this.error.push(e)
      })
  }
}
</script>
```
Trong phần này chúng ta sẽ sử dụng axios để đọc dữ liệu từ API, đây cũng là 1 cách phổ biến nhất khi làm việc với API và Vue. Các bạn có thể đọc thêm tại đây: https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html 
    
Ten tèn, vậy là đã xong giờ bạn truy cập vào địa chỉ: `localhost:8080/contacts/` để xem kết quả và đây là kết quả thu được :wink: 
![](https://images.viblo.asia/3fc091c1-094d-4bad-83aa-b27992a93c81.png)

Trên đây là bài viết của mình về tạo ứng dụng đơn giản với Rails backend và VueJs frontend, cảm ơn các bạn đã đọc.

*Nguồn tham khảo:*

https://medium.com/@sfcooper/creating-an-app-with-rails-api-backend-vuejs-frontend-403d2df61dab

https://guides.rubyonrails.org/api_app.html