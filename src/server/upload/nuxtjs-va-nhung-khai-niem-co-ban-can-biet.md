## 1. NuxtJs là gì ?
* Nuxt.js là một framework cấp cao hơn được được phát triển trên nền Vue.
* Nó đơn giản hóa việc phát triển các ứng dụng  Universal or Single Page Vue Apps.
## 2. Khởi tạo project Nuxtjs
Để khởi tạo dự án Nuxtjs chúng ta sử dụng `create-nuxt-app`
```
#Sử dụng npm
npm init nuxt-app <project-name>

#hoặc yarn
yarn create nuxt-app <project-name>
```

Khi khởi tạo project chúng ta gõ lệnh như trên và đợi trong giây lát, Nuxtjs sẽ hỏi chúng ta về thiết lập cơ bản của dự án 
như  name project, programing language, package manager...
![image.png](https://images.viblo.asia/e500df45-1598-4cc9-a654-464e5e932360.png)
Sau khi khởi tạo xong, muốn chạy project của bạn thì sử dụng lệnh
```
cd project-name
npm run dev hoặc yarn dev
```
Mặc định project của bạn sẽ được chạy ở http://localhost:3000/ 
## 3. Cấu trúc thư mục 
Lưu ý ở version hiện tại` "nuxt": "^2.15.8"`, sau khởi tạo Nuxtjs đã không có các thư mục như  layout, middleware, assets... Nếu muốn sử dụng, bạn phải tự tạo thủ công

![image.png](https://images.viblo.asia/74c4e4e3-628d-42f4-ac02-0d4f3d076b71.png)

`components` : 
+ Thư mục chứa các Components Vuejs của bạn. 
+ Các Components tạo nên các phần khác nhau của trang của bạn và có thể được sử dụng lại.


`pages` : 
+ Đây là nơi sẽ chứa các Application Views cũng như route của bạn.
+ Mỗi file .vue sẽ tương ứng với 1 route.

`static`: 
+Chứa tài nguyên được public có thể truy cập qua đường dẫn
+ VD: muốn lấy file robots.txt trong thư mục /static/robots.txt thì chỉ cần vào địa chỉ : localhost:3000/robots.txt

`store`: 
+ Chứa các file Vuex Store của bạn. 
+ Mặc định chúng sẽ bị tắt, để sử dụng store bạn cần tạo file `index.js` trong thư mục này.

`File nuxt.config.js`: Chứa các cấu hình được thiết đặt cho ứng dụng của bạn

Ngoài ra còn một số thư mục khác mà Nuxtjs đã ẩn đi. Nếu muốn sử dụng ta phải tự tạo thủ công

`assets`: Chứa các file không được biên dịch của bạn như css hoặc sass, image hoặc fonts chữ của bạn.

`middleware`:  Middleware cho phép bạn định nghĩa các function được chạy trước khi render 1 page hoặc nhóm page. (vd: kiểm tra người dùng đã đang nhập hay chưa, nếu chưa thì chuyển hướng về trang đăng nhập). Nếu bạn đã từng làm quen với ngôn ngữ phía back-end chắc không còn lạ lẫm với middleware nữa phải không? 

`layouts`: chứa các layout cho ứng dụng của bạn, có thể có nhiều layout không nhất phải giống nhau (vd: layout đăng nhập sẽ khác layout trang chủ). 

Nếu không thiết lập gì, mặc định Nuxtjs sẽ lấy layout ở `default.vue` . 
Nên để dựng layout cho ứng dụng của mình bạn cần tạo file `default.vue` trong thư mục `layouts`
```html
<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>
```
Bạn có thể thêm components như TheHeader, TheFooter để dễ dàng dựng layout
`<Nuxt />` đóng vai trò như slot, giúp các Pages có thể truyền qua. 

Ngoài ra, nếu bạn muốn tạo một layout khác cho việc đăng nhập thì có thể thêm file ở `layouts/login.vue` 
```html
<template>
  <div>
    <div>Trang login nè</div>
    <Nuxt />
  </div>
</template>
```
Chú ý: để sử dụng được layout này bạn cần thêm dòng sau ở Pages muốn sử dụng
```js
<script>
export default {
  layout: 'login',
  // OR
  layout (context) {
    return 'login'
  }
}
</script>
```
<br>
Bạn ở thể tìm hiểu thêm về các thư mục này ở link sau https://nuxtjs.org/docs/directory-structure

## 3. Routing
Nếu như trong Vue muốn tạo routing chúng ta phải tự định nghĩa đường dẫn, import các components. Thì với Nuxt js việc tạo routing vô cùng đơn giản, chúng ra chỉ việc tạo thư mục, file trong thư mục `Pages` sau đó Nuxt sẽ tự động generate cho chúng ta. 
 Ví dụ có cấu trúc file như sau:
```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

Route tương ứng sẽ là:

```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```
### 3. 1 Dynamic Routes
Đôi khi bạn muốn thêm tham số cho route của mình nên chúng ta có thể sử dụng dynamic route. Các tạo cũng rất đơn giản, chỉ cần thêm  dấu " _ " trước file .vue, có thể là thư mục hoặc tên file.
ví dụ cấu trúc thư mục như sau 
```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Route tương ứng: 
```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```
Bạn có thể thấy route name 'users-id' có đường dẫn `:id?` tức là đây là optional (có thể có hoặc không). 

Để lấy được tham số đó trên url, Nuxtjs cũng hỗ trợ chúng ta luôn bằng cách sử dụng $route.params.id với id là tên file dưới dạng _id. 

Bài viết này mình chỉ giới thiệu sơ qua về Nuxtjs. Ở các bài viết sau mình sẽ chia sẻ nhiều hơn về các khái niệm trong Nuxtjs