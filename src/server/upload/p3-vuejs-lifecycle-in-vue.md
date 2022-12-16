Chào các bạn lại là mình đây. Trong các bài viết trước chúng ta đã tìm hiểu tổng quát về một Vue Project. Giờ thì chúng ta sẽ đi sâu hơn một xíu nữa nhé. Trong phần này chúng ta sẽ tìm hiểu về Vue Object và các lifecycle của nó. Mình vẫn sẽ sử dụng lại project tại [bài viết](https://viblo.asia/p/p1-vuejs-framework-den-tu-su-toi-gian-RQqKLqm6Z7z) này nhé.
## 1. Vue Instance
Chúng ta sẽ tập trung vào code của file main.js, project của chúng ta sẽ chạy từ đây.  Cùng xem thử code của file main.js
```
### main.js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
Có thể thấy, Vue app của chúng ta sẽ bắt đầu chạy từ đây. Một ứng dụng Vue sẽ bao gồm một Vue root (khởi tạo bằng lện `new Vue` cùng các thuộc tính của nó) và các Vue component, tạo thành một hệ thống comnponent nhằm mục đích reuse. Có thể thấy, trong main.js, chúng ta tạo một đối tượng vue gốc. Đối tượng này sẽ render component App được import từ file App.vue và mount vào tag có id là `app`. Chúng ta có thể thấy rõ hơn qua file index.html
```
### index.html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
Vue sẽ hỗ trợ chúng ta tạo Vue app theo SPA concept, do vậy chúng ta sẽ chỉ có một trang index.html là một view duy nhất. Content của các view sẽ được render bằng javascript thay vào `<div id="app"></div>`, đó là lý do khi view source chúng ta không thể thấy toàn bộ nội dung html như thông thường (nhưng xem bằng Chorme DevTools thì vẫn được nhé). Một vài properties trong một Vue instance:
* data: chứa các biến toàn cục của một Vue instance
* filter: lọc dữ liệu trước khi được hiển thị
* watch: theo dõi và cập nhật lại một biến khi data thay đổi
* computed: là `một thuộc tính được tính toán`, có nghĩa là method được định nghĩa trong này sẽ coi như là một properties. 
* methods: là danh sách các method trong một Vue instance
## 2. Vue lifecycle
Trong trang chủ của Vue, có một bức hình vô cùng kinh điển và chi tiết về các hook và vòng đời của Vue.
![](https://images.viblo.asia/911ca710-c498-4ce3-9651-b8e3a0845fb5.png)
1. Created
Là quá trình khởi tạo diễn ra đầu tiên trong component. Tại đây, chúng ta có thể thao tác với các dữ liệu trong `data` hoặc các `methods`. Trong quá trình này, các DOM ảo chưa được `mount` và `render` nên không thể tương tác với chúng
2. Mounted
Lúc này, các component đã được khởi tạo thành công, chúng ta có toàn quyền tương tác với các `data`,`methods`, và cả các DOM trong `template`.
3. Updated
Là quá trình khi dữ liệu thay đổi hoặc có các event làm cho component phải re-render lại.
4. Destroyed
Được gọi khi component đã bị hủy.

Chúng ta thử thay thế code trong file HelloWorld.vue thành như sau 
```
### HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Filter Msg : {{msg | removeZero}}</h2>
    <button @click="changeMsg">Change</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello World",
    }
  },
  created() {
    console.log("Created")
  },
  mounted() {
    console.log("Mount")
  },
  updated() {
    console.log("Update")
  },
  destroyed() {
    console.log("Destroy")
  },
  filters: {
    removeZero(value) {
      return value.replaceAll('0', '1')
    }
  },  
  methods: {
    changeMsg() {
      this.msg = `${this.msg}0`
    }
  }
};
</script>
```
Khi click button `change`, event `click` sẽ được kích hoạt và gọi hàm `changeMsg` được khai báo trong methods, hàm này sẽ thay đổi giá trị của biến `msg`. Giá trị này sẽ thay đổi giá trị của tag `<h1>`, cón giá trị của tag `<h2>` sẽ được lọc qua một lần filter, biến đổi tất cả '0' thành '1'. Ngoài ra với các hook của lifecycle, chúng ta còn có thể xử lý trước khi các hook này chạy bằng các hook `before` như `beforeCreate`, `beforeMount`, `beforeUpdate`, `beforeDestroy` (như trong ảnh trên).

Kết quả 
![](https://images.viblo.asia/e6f2df14-2885-4a93-a6a5-6610a6dd7044.png)
Ok, done ! Mình sẽ kết thúc bài viết lần này tại đây. Mong gặp lại các bạn trong những bài viết sau.