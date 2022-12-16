# Giới thiệu 
Vuejs là một framework của javascript dùng để xây dựng giao diện người dùng. Vuejs dễ dàng đáp ứng nhu cầu xây dựng một Single Page Applications với độ phức tạp cao. Vuejs được sử dụng rộng rãi với cộng đồng php cụ thể là framework laravel, nhưng trong bài viết lần này tôi sẽ giới thiệu với các bạn một sự kết hợp mới đó là Vuejs với Ruby On Rails.

Vậy làm sao để kết hợp vuejs và rails, ở đây tôi xin giới thiệu một gem hộ trợ cho việc tích hợp hai framework này lại đó là gem [Webpacker](https://github.com/rails/webpacker).

### Webpacker là gì?
Webpacker là một ruby gem dùng để tích hợp Webpack vào Rails sử dụng chung với Asset Pipeline. `Webpack`  đơn giản chỉ là một công cụ gói gọn toàn bộ các file js, css(scss, sass..). Việc gói gọn của webpack là được gói theo cấu trúc của project, từ module này qua module khác. Với việc pre-complie được code Js trong Rails, gem này như một thiên thần cứu cánh trong việc tích hợp các front-end framework như ReacJS, VueJS hay AngularJS vào Rails.

# Sử dụng
## Cài đặt
Để khởi tạo một dự án với Rails kết hợp với Vuejs đơn giản bạn chỉ cần dùng lệnh
```ruby
rails new myapp --webpack=vue
```

Tuy nhiên, nếu bạn muốn tích hợp VueJS với một project có sẵn thì bạn cũng có thể làm như sau:
<br>Cài đặt gem:
```
gem 'webpacker', '~> 4.x'
```
và chạy
```ruby
bundle
rails webpacker:install
rails webpacker:install:vue
```

Nếu cài đặt thành công, bạn sẽ thấy một message nho nhỏ nài
```ruby
Webpacker now supports Vue.js 🎉
```
Có một chút sự khác biệt giữa project Rails thông thường và project Rails + VueJS. Các bạn để ý trong `app/javascript` sẽ xuất hiện cấu trúc thư mục như sau
```ruby
app/javascript
├── app.vue
└── packs
    ├── application.js
    └── hello_vue.js
```

Giờ là tạm cài đặt xong, bạn thử rails s xem có điều gì xảy ra không nhé
![](https://images.viblo.asia/8180f3ef-b688-4006-81ed-3005c07acc07.png)

Không có gì thay đổi đúng không, các bạn đừng vội, phần hay bắt đầu ngay bây giờ đây.
<br>
Trước tiên ta tạo ngay một view
```ruby
rails g controller static_pages index
```
sau đó vào `config/routes.rb`

```ruby
Rails.application.routes.draw do
  root to: 'static_pages#index'
end
```
OK vậy là trang mặc định đã được thiết lập
![](https://images.viblo.asia/f75bd5d4-4996-41ef-8361-0611266e9cdd.png)

Giờ bạn vào` app/views/static_pages.erb` vào xóa tất cả đi thay bằng đoạn code sau
```ruby
<%= javascript_pack_tag 'hello_vue' %>
```
Load lại server 1 lần nữa nhé!
![](https://images.viblo.asia/ec8f34ac-d2dd-4e22-84b5-272c3d9fa419.png)

Ok vậy là chúng ta đã load thành công VueJS, nếu bạn muốn thay đổi đoạn chữ in ra mặc định của VueJS khi khởi tạo project, bạn chỉ cần vào `app/javascript/app.vue` thay đổi
```javascript
<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "Xin chào tất cả mọi người"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>

```
Kết quả:
![](https://images.viblo.asia/27ac40bc-5265-4ef8-879d-611c53f3f199.png)

## Demo tính tổng hai số đơn giản sử dụng VueJS
Các bạn vào` javascript/app.vue` và thay nội dung code cũ bằng đoạn code mới như sau
```ruby
<template>
  <div id="app">
    Number 1: <input type="number" name="numA" v-on:input="getNumA">
    Number 2: <input type="number" name="numB" v-on:input="getNumB">
    <button @click="cal">Tính tổng</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    numA: 0;
    numB: 0;
    return {
      message: 0
    }
  },
  methods: {
    getNumA: function(event) {
      this.numA = event.target.value;
    },
    getNumB: function(event) {
      this.numB = event.target.value;
    },
    cal: function() {
      this.message = Number(this.numA) + Number(this.numB);
    }
  }
}
</script>

<style scoped>
#app {
  font-size: 2em;
  text-align: center;
}
</style>

```
Refresh lại trang và tận hưởng nhé các bạn. Kết quả:
![](https://images.viblo.asia/4e792920-2543-40d5-847c-1c6dc7e8a53c.gif)

## Tài liệu tham khảo:
https://vuejs.org/v2/guide/
<br>
https://github.com/rails/webpacker