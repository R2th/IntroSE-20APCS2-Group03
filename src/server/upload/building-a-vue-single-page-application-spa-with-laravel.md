Trong bài viết này, Chúng ta sẽ tìm hiểu cách sử dụng Vue router kết hợp Laravel để xây dựng một Vue single-page application (SPA). 

#### Flow hoạt động của Vue SPA & Laravel như sau:

* Đầu tiên là request truy cập được gửi đến router của Laravel
* Laravel sẽ render bố cục SPA
* Tiếp theo là sử dụng `history.pushState` API để điều hướng URL mà không cần tải lại trang

### I. Installation 
```
$composer create-project --prefer-dist laravel/laravel LaravelVuejs
$cd LaravelVuejs
$cp .env.example .env
$php artisan key:generate
$npm install
$npm install vue-router
```
### II. Configuring Vue Router


Sau khi đã cài đặt xong, ta cần import lib vào để sử dụng được chúng.
Truy cập file theo path: `resources/assets/js/app.js`
chỉnh sửa nội dung như sau:

```js

// * Import thư viện VueRouter với Vue.use()

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// * Import các component (App, home, about, service, contact)

import App from './views/App'
import Home from './views/Home'
import About from './views/About'
import Service from './views/Service'
import Contact from './views/Contact'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '/service',
            name: 'service',
            component: Service,
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
    ],
});

// * Truyền route constant router vào ứng dụng Vue mới để có thể access đến this.$router và this.$route

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
```
Nhìn đoạn code trên chắc bạn cũng đã hiểu nó làm gì rồi phải không.

### III. Create view

Tiếp theo tạo 1 số  view component:
```shell
mkdir resources/assets/js/views
touch resources/assets/js/views/App.vue
touch resources/assets/js/views/Home.vue
touch resources/assets/js/views/About.vue
touch resources/assets/js/views/Service.vue
touch resources/assets/js/views/Contact.vue
```

`App.vue`  là element container ngoài cùng của ứng dụng. Ở trong component này, chúng ta sẽ định nghĩa một nhóm ứng dụng và một số điều hướng sử dụng tag `<router-link/>` của Vue Router:

```
<template>
    <div>
        <h1>Vue Router Demo App</h1>
 
        <p>
            <router-link :to="{ name: 'home' }">Home</router-link> |
            <router-link :to="{ name: 'about' }">About</router-link> |
            <router-link :to="{ name: 'service' }">Service</router-link> |
            <router-link :to="{ name: 'contact' }">Contact</router-link> |
        </p>
 
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
```
Thành phần quan trọng nhất trong Component App là tag `<router-view></router-view>` , đây là nơi router sẽ render thành phần đã cho mà nó phù hợp với route (VD: Home hoặc About, Service).

Tiếp theo Bạn cần tạo nôị dung cho các page (Home, About, Contact) `resources/assets/js/views/Home.vue`
```
<template>
  <p>This is the homepage</p>
</template>
```
`resources/assets/js/views/About.vue`
```
<template>
  <p>This is the Aboutpage</p>
</template>
```
`resources/assets/js/views/Service.vue`
```
<template>
  <p>This is the Servicepage</p>
</template>
```
`resources/assets/js/views/Contact.vue`
```
<template>
  <p>This is the Contactpage</p>
</template>
```

### VI. Server-Side

Mở tệp `routes/web.php` và thay thế welcome route bằng:

```
Route::get('/{any}', 'SpaController@index')->where('any', '.*');
```

Tạo SpaController

```php
$php artisan make:controller SpaController
```

Nội dung SpaController

```php
<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
 
class SpaController extends Controller
{
    public function index()
    {
        return view('spa');
    }
}
```
Nội dung view page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vue SPA Demo</title>
</head>
<body>
    <div id="app">
        <app></app>
    </div>
 
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
 
```

Chúng ta đã khai báo required #app element mà nó chứa App component để cho Vue render, cùng với việc hiển thị thành phần thích hợp dựa trên URL.

### V. Running the Application

Chúng ta cần build trước khi chạy ứng dụng.

```shell
npm run watch
```

![](https://images.viblo.asia/73628a36-2e68-4f50-9e51-60958a41ceda.png)

Chúng ta đã có layout cho Vue SPA & sử dụng Laravel để làm API. Bài tới mình sẽ đi sâu hơn, như cách Sử dụng các route parameters, Child route
Thực hiện một API request từ một component đến Laravel. Thank you !!!

[Nguồn tham khảo: https://laravel-news.com]