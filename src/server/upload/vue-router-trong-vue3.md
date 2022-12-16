# Mở Đầu
Như các bạn đã biết thì Vue 3 core đã chính thức được phát hành vào ngày 18 tháng 9 năm 2020. Vì thế hôm nay mình sẽ cùng tìm hiểu về Vue 3 xem có gì khác biệt không nhé. Cụ thể trong bài viết này mình sẽ tìm hiểu về `Vue Router` trong vue 3.Vue Router là router chính thức của Vuejs . Nó được tích hợp sâu vào Vue.js core để xây dựng các trang SPA (Single Page Applications)  một cách dễ dàng. Cùng tìm hiểu luôn nhé :D
# Thực Hiện 
Để tìm hiểu về `Vue Router` thì đầu tiên chúng ta cần đi cài nodeJS rồi sau đó cài vue cli. rồi sau đó tạo một project vue và cài vue-router.

## Cài NodeJS

Để cài đặtNodejs trên ubuntu rất đơn giản bạn chỉ cần mở terminal lên và chạy command:

```
 sudo apt install nodejs
```
## Cài Vue cli
 * Với npm
  ```
     npm i -g @vue/cli
```
 * Với yarn 

```
yarn global add @vue/cli
```
## Tạo mới project vue
MÌnh sẽ tạo mới một project với tên là vue-router như sau 
```
vue create vue-router
```
Các bạn nhớ chọn `Vue 3` nhé :D rồi đợi một chút để nó cài đặt. Sau khi cài xong chúng ta có thể vào xem package.json để xem Vue đã ở phiên bản 3 chưa :D. 
## Cài vue-router
Chúng ta sẽ cd vào thư mục `vue-router` vừa tạo để cài vue-router cho dự án.
 * Với npm
  ```
     npm i vue-router@next
```
 * Với yarn 

```
yarn add vue-router@next
```

OK vậy là đã cài xong hết những thứ cần thiết. bây giờ chúng ta chạy project lên thôi. Mình đang dùng yarn nên chỉ cần chạy `yarn serve` thôi npm cũng tương tự. Đây là project ban đầu :D 

![Screenshot from 2021-07-16 13-50-49.png](https://images.viblo.asia/41f2eed4-09b1-426c-9906-b751d620b3ad.png)

Như chúng ta thường thấy ở các trang web thường có thanh menu ở trên header khi bấm vào thì sẽ chuyển sang các trang tương ứng như about us, contact... Ở đây mình cũng sẽ dùng ví dụ này đề nói về vue router. Đây là kết quả cuối cùng đạt được :D 

![vue-router.gif](https://images.viblo.asia/f4ccb952-d44d-4b36-95cf-7515ada5efec.gif)


Đầu tiên chúng ta cần tạo ra các component MainHeader, Home, About, Conact như sau :

* MainHeader 

```js
<template>
    <div class="menu">
        <p class="item-menu">
            Home
        </p>
        <p class="item-menu">
            About Us
        </p>
        <p class="item-menu">
            Contact
        </p>
    </div>
</template>

<script>
export default {
    name: 'MainHeader'
}
</script>

<style>
    .menu {
        display: flex;
        justify-content: center;
    }

    .item-menu {
        margin: 10px;
        font-size: large;
        cursor: pointer;
        font-weight: 600;
    }

    .link {
        color: inherit;
        text-decoration: none;
    }
</style>
```
 * Home , About, Contact tương tự nhau nên mình chỉ show ra 1 file 
 ```js
 <template>
    <h1>This is home page </h1>
</template>

<script>
export default {
    name: 'Home'
}
</script>
 ```
Tiếp theo mình sẽ tạo một file `router.js` để định nghĩa các router của dự án  như sau 
```js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/contact',
        component: Contact
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
```

Ở đây mình import `createRouter` và `createWebHistory` từ `vue-router`

* createRouter:  tạo router cho dự án
* createWebHistory: nó là một chế độ của vue-router

Tiếp theo là sẽ import các components vào. Rồi khởi tạo 1 biến chứa tất cả các `routes` nó là một array chứa các object  với `path` là URL , tiếp theo sẽ là component được hiển thị tương ứng với URL trên. Sau đó chúng ta cần có 1 biến router chính  được tạo bằng `createRouter`. Với 2 thuộc tính là history sẽ bằng `createWebHistory` mình khai báo ở trên và `routes` mình cũng vừa tạo ở trên. Cuối cùng là export nó ra thôi.

Muốn  sử dụng router mà chúng ta vừa export ở trên thì chúng ta cần import nó vào trong file `main.js` và use nó như sau 
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```
Cuối cùng chúng ta cần thêm `<router-view />` vào trong app.vue để với url nào thì component tương ứng sẽ được hiển thị. Đây là file App.vue
```js
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from './components/MainHeader.vue'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
Oki vậy là đã hoàn thành rồi đó, à quên chúng ta cũng cần thêm `router-link>`  vào các item tương ứng trên menu header để khi click vào sẽ chuyển đến router tương ứng nhé.

MainHeader.vue
```js
<template>
    <div class="menu">
        <router-link class="link" to="/">
            <p class="item-menu">
                Home
            </p>
        </router-link>
        <router-link class="link" to="/about">
            <p class="item-menu">
                About Us
            </p>
        </router-link>
        <router-link class="link" to="/contact">
            <p class="item-menu">
                Contact
            </p>
        </router-link>
    </div>
</template>
```
À còn một cái nữa đó là để xử lý các routes không được định nghĩa chúng ta cần thêm một routes nữa như sau
```js
    {
        path: '/:catchAll(.*)',
        component: Error
    },
```
Các bạn có thể thay `catchAll` bằng bất cứ từ nào. khi mà người dùng truy cập vào một URL mà chưa được định nghĩa thì nó sẽ chả về trang error. Việc của còn lại của bạn là thêm một component Error thôi :D.

# Kết Luận 
Vậy là mình đã giới thiệu về vue-router trong Vue 3 nó cũng khá là đơn giản nhỉ :D. Hy vọng thông qua bài viết này mọi người có thể hiểu hơn về router trong vue, nếu thấy bài viết hữu ích thì hãy cho mình một upvote nhé . Mọi thắc mắc hoặc góp ý vui lòng comment xuống phía dưới để mình có thể giải đáp hoặc bổ sung. Một lần nữa cảm ơn các bạn.