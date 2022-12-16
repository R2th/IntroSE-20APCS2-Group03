# Welcome!
Làm thế nào để sử dụng vue-router là hôm nay chủ đề quan trọng nhất của chúng tôi. 
VueJS là Thư viện lối vào có thể được sử dụng với bất kỳ Ngôn ngữ phụ trợ nào. 
Nếu chúng ta muốn tạo ứng dụng giao diện người dùng đầy đủ chức năng, thì vue-router và vue-resource là hai trụ cột tuyệt vời trong VueJS. Vì vậy, hôm nay chúng tôi sẽ lặn sâu trên vue-router. 
router là cách để quản lý các thành phần trong Ứng dụng một trang. 
Tất cả các Khung giao diện nổi tiếng sử dụng khái niệm router.
# Step 1: Tạo ba components trong thư mục components của bạn.

Trong thư mục đó, tạo ba tập tin components. Các tệp này như được hiển thị trong đoạn trích.
```
// Home.vue

<template>
  <h1>Home</h1>
</template>

<script>
  export default {

  }
</script>
```


Sau đó tạo tập tin About.vue.

```
// About.vue

<template>
  <h1>About us</h1>
</template>

<script>
  export default {

  }
</script>
```


Cuối cùng, tạo tập tin Contact.vue.

```
// Contact.vue

<template>
  <h1>Contact us</h1>
</template>

<script>
  export default {

  }
</script>
```

# Step 2: Chúng tôi cần cập nhật tệp index.html và thêm thuộc tính id.
```
<html>
    <body>
        <link rel = "stylesheet" href = "style.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
        <div id="app"></div>
        <script src = "main.js"></script>
    </body>
</html>
```
# Step 3: Config vue-router module.

Trước tiên, trong tệp main.js, chúng ta cần nhập mô-đun vue-router từ thư mục node_modules vì ​​chúng tôi đã cài đặt tất cả các phụ thuộc của chúng tôi trong dự án này. Sao chép mã sau vào tệp main.js của chúng tôi.

```
// main.js

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
  ]
});

new Vue({
  router,
  template: `
    <div>
      <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
            <li class="nav-item"><router-link to="/about" class="nav-link">About</router-link></li>
            <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
          </ul>
        </div>
      </nav>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app');
```

# Step 4: Bây giờ, chúng ta chạy lại run dev.


Bây giờ, có ba mục trong thanh Điều hướng và nếu bạn nhấp vào một trong số chúng, tuyến đường bên dưới sẽ thay đổi và bạn có thể thấy ứng dụng vue-router của chúng tôi hoạt động. Tôi đã bao gồm tất cả các tệp dự án chính ở đây cũng như, bạn có thể tìm thấy dự án này trên [Github](https://github.com/KrunalLathiya/playground-UjLAnHRe)


Thanks All.
tham khảo: https://www.codingame.com/playgrounds/3808/how-to-use-vue-router