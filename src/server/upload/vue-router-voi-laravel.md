Hôm nay mình sẽ giới thiệu cho các bạn cách sử dụng vue Router trong laravel .<br>
 Bạn có thể tạo ra vue router với các **component** hoặc **template** html.<br>
 Bây giờ mình sẽ  tạo ra route trang home và trang users cơ bản và từ đó bạn có thể hiểu và áp dụng thêm nhiều route cho ứng dụng của bạn. <br>
 Bắt đầu nào! 
###  Bước1: Cài đặt Laravel 
Ở đây bạn sẽ cài đặt ứng dụng laravel 5.7 với dòng lệnh bên dưới .Bạn mở terminal hoặc command prompt và run lệnh bên dưới:
```
composer create-project --prefer-dist laravel/laravel blog
```
### Bước 2:Cấu hình NPM
Trong bước này bạn cần thêm thiết lập của vuejs và install npm bằng các câu lệnh dưới đây:<br>
**Install vue:**
```
php artisan preset vue
```
**Install npm:**
```
npm install vue-router
```
**Install npm vue vue-router:**
```
npm install vue-router
```
### Bước 3: Cấu hình file app.js và Components
Ở đây bạn sẽ viết code trong file  app.js
```
require('./bootstrap');
   
window.Vue = require('vue');
import VueRouter from 'vue-router'
  
Vue.use(VueRouter)
   
const routes = [
  { path: '/', component: require('./components/ExampleComponent.vue') },
  { path: '/user', component: require('./components/User.vue') }
]
  
const router = new VueRouter({
  routes 
})
  
const app = new Vue({
  router
}).$mount('#app')
```
Và tạo ra file **ExampleComponent.vue** với nội dung bên dưới theo đường link resources/assets/js/components/ExampleComponent.vue
```
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Home Component</div>
  
                    <div class="card-body">
                        Welcome to Homepage
                        <br/>
                        <router-link to="/user">Go to User</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
   
<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
```
Và tạo ra file **User.vue** với nội dung bên dưới theo đường link resources/assets/js/components/User.vue
```
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Home Component</div>
  
                    <div class="card-body">
                        Welcome to Homepage
                        <br/>
                        <router-link to="/user">Go to User</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
   
<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
```
<br>
Chú ý: router-link là thẻ để link tới các route mà mình định nghĩa ở trên routes(trong file app.js)

### Bước 4: Cập nhật file  welcome.blade.php

Ở bước cuối cùng bạn hãy cập nhật file  welcome.blade.php và trong file này mình sẽ sử dụng file  **app.js**
Vì vậy hãy cập nhật nó nhé. <br>
Bây giờ bạn hãy run câu lệnh dưới đây và xem kết quả:
```
npm run dev
```
<br>
Chúc bạn thành công.
<br>

### Tài liệu tham khảo: https://www.itsolutionstuff.com/post/laravel-vue-router-example-from-scratchexample.html