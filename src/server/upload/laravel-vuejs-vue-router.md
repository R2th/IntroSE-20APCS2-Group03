### Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Xin chào các bạn tiếp tục với series về vuejs hôm nay mình xin giới thiệu với các bạn về Vue router. <br>
Hiện nay ứng dụng một trang SPA (Single Page Application) ngày đang một phổ biến.  Là một trang web chỉ trên một trang, tức là thay vì load cả trang web để lấy tất cả những nội dung đã load trước đó rồi thì SPA sẽ làm nhiệm vụ chỉ load những phần cần thay đổi, những phần nào không thay đổi sẽ không cần load để giảm tải cho server và làm cho trang web của chúng ta nhanh hơn, chuyên nghiệp hơn. Đặc biệt làm cho trải nghiệm của người dùng được tốt hơn.

<br>

### Vue Router là gì?
Vue Router là bộ định tuyến chính thức cho Vue.js. Nó tích hợp sâu với lõi Vue.js để làm cho việc xây dựng các Single Page Applications với Vue.js trở nên dễ dàng.

### Hướng dẫn sử dụng

Ở bài này mình xin demo luôn với laravel 5.8 nhé.
Đầu tiên các bạn cần install laravel :

```js
composer create-project --prefer-dist laravel/laravel vue_router 5.8.*
```

tiếp đó mình install vue router nhé

```js
npm install --save vue vue-router
```

Vì laravel đã tích hợp sẵn vuejs vào project rồi nên chúng ta cũng không cần làm gì nhiều cả. Chỉ cần nhúng file script chúng ta build vào là được.

Chúng ta sẽ điều hướng cho laravel mặc định vào 1 file view duy nhất như sau:

```php
Route::view('/{any}', 'home')
    ->where('any', '.*');
```

Ở đây tại file `web.php` mình để router của laravel điều hướng vào 1 file view duy nhất. Trong file view này sẽ nhúng file js chúng ta đã build và từ đó file js này sẽ điều hướng đến các view cần thiết.

tại file view home.blade.php

```php
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Home</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div id="app"></div>
    <script src="/js/app.js"></script>
</body>
</html>

```
Như các bạn thấy thì mình chỉ nhúng file app.js đc build từ các component vuejs và các file js cần thiết khác.
Laravel cấu hình để build các file này tại file webpack.mix.js bằng Laravel mix. Các bạn có thể xem thêm về [Laravel mix](https://viblo.asia/p/laravel-mix-la-gi-tai-sao-nen-dung-dung-nhu-the-nao-4dbZN8Ba5YM) tại bài viết này của mình.
Và sau khi build xong ta có đc file tại `public/app.js` và từ đó ta chỉ cần import vào file view home của chúng ta.
Để build các bạn thực hiện lệnh 
```js
npm run dev
hoặc 
npm run watch // lệnh này sẽ theo dõi luôn khi nào có file thay đổi sẽ build lại cho chúng ta luôn.
```

Tiếp theo mình sẽ tạo 3 component như sau:
mình sẽ tạo 3 component tại thư mục resource/js/components
```
App - component chính
Home - component cho trang home
User - component cho trang user
```


Nội dung của 3 file này sẽ như sau:
```js
//App.vue
<template>
    <div class="container">
        <div class="header">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a href="" class="nav-link">
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a href="" class="nav-link">
                        User
                    </a>
                </li>
            </ul>
        </div>

        <div class="main mt-4">
            <div class="row">
                <div class="col-md-8 offset-2 text-center">
                    <p>This is App component</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    .container {
        border: 1px solid #eee;
    }
    .active {
        color: red
    }
</style>


```

Tại file User như sau:

```js
// User.vue
<template>
    <div>
        <h4>Hello, This is user page</h4>
        <p>We are Sun*</p>
    </div>
</template>

<script>
    export default {
        name: 'User'
    }
</script>

```

Tiếp theo ta tạo 1 file routes.js tại thư mục js/ với nội dung như sau:

```js
import Home from './components/Home'
import User from './components/User'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'index',
    },
    {
        path: '/users',
        component: User,
        name: 'user',
    }
];

export default routes;

```
<br>
Ở đây:
<br>

`path`: là đường dẫn hiển thị trên thanh địa chỉ, <br>
`component`:  là component sẽ được render vào layout<br>
`name`: dùng để sử dụng để định danh route, giúp cho chúng ta có thể sử dụng một cách thuận tiện hơn. <br>
Ngoài ra còn có rất nhiều thuộc tính khác, các bạn có thể tham khảo ở link tài liệu https://router.vuejs.org/guide/essentials/named-routes.html


Tiếp theo tại file js/app.js sẽ chỉnh sửa lại như sau để import vue-router và khai báo sử dụng:
```js
//app.js

// khai báo các component
Vue.component('home', require('./components/Home'));
Vue.component('user', require('./components/User'));
Vue.component('app', require('./components/App'));

// import vue router, component và routes
import App from './components/App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

// use router
Vue.use(VueRouter);

// khai báo dùng router này
const router = new VueRouter({
    routes,
    mode: 'history'
});

// và cuối cùng là tạo 1 instance Vue và render tại phần tử có id là app,
// render tại component App và dùng router đã khai báo ở trên
const app = new Vue({
    el: '#app',
    render: h => h(App),
    router
});
```

Ở trên có đoạn như sau:
```js
const router = new VueRouter({
    routes,
    mode: 'history'
});
```
ở đây có đoạn mode: 'history' có tác dụng như sau:
Khi ko có đoạn mode này mặc định khi vào các đường dẫn sẽ chúng ta sẽ có thêm dấu `#` trên trình duyệt

<br>Ví dụ: localhost/#/user
Ok, xem npm đã build xong chưa, rồi ra ngoài load trình duyệt xem đã vào đc view home và load đc nội dung trong component  App.vue ra chưa:

![](https://images.viblo.asia/c33aaa56-7d64-480c-8354-63712b556770.png)

Và bước cuối cùng tại file App.vue ta sửa lại như sau:

```js
<template>
    <div class="container">
        <div class="header">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        :class="[{active: $route.name === 'index'}]"
                        :to="{name: 'index'}"
                    >
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        :class="[{active: $route.name === 'user'}]"
                        :to="{name: 'user'}"
                    >
                        User
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="main mt-4">
            <div class="row">
                <div class="col-md-8 offset-2 text-center">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>
```
Chúng ta cần để ý 2 chỗ sau:

```js
<router-link
    class="nav-link"
    :class="[{active: $route.name === 'index'}]"
    :to="{name: 'index'}"
>
    Home
</router-link>
// Đây là 1 route điều hướng chúng ta đến route có name là index
// và sẽ thêm class là active nếu route name là index
```

Tiếp nữa là:
```js
<router-view></router-view>
// Chỗ này được hiểu là với mỗi route sẽ được load các component đã được khai báo trong file routes.js
```
Ra ngoài test lại:
![](https://images.viblo.asia/be5d62e7-632f-436b-88ac-259d7343cf21.gif)
Rất đơn giản phải không nào. :D