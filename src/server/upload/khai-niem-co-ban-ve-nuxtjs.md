## 1. NuxtJs là gì ?
*  Là một framework của Vuejs được sử dụng để xây dựng những ứng dụng từ Vuejs.
*  Cho phép tạo Universal Vue Apps.
* Có thể chạy trên server lẫn client.
  
## 2. Tính năng nổi bật
-   Cấu trúc thư mục rõ ràng
-   Server-Side Rendering (SSR): toàn bộ dữ liệu xử lý trên server, rồi từ server trả dữ liệu về client hiển thị.
-   Client Side Rendering (CSR): phần lớn chủ yếu xử lý trên client.
-   Viết code trên các file .vue
-   Chia website ra thành nhiều trang, mỗi trang là một file riêng.
-   Chia layouts, components, plugins ... giúp code dễ bảo trì và tái sử dụng.

## 3. Xây dựng ứng dụng Demo
Các bạn có thể cài đặt qua `npx`:
```
npx create-nuxt-app <project-name>
```
Hoặc có thể sử dụng `yarn`:
```
yarn create nuxt-app <project-name>
```
Trong quá trình cài đặt sẽ hiển thị một số thông tin như là: name project, programing language, package manager, ...  sẽ hỗ trợ cho dự án của bạn nhanh và thuận tiện hơn trong quá trình làm.

Tiếp đến muốn chạy được project của bạn thì run :
```
cd name-project
npm run dev hoặc yarn dev
```
Mặc định project sẽ chạy **localhost:3000**

## 4. Cấu trúc thư mục
Sau khi cài đặt xong thì project ta có có sẵn các folder sau : 
![](https://images.viblo.asia/f1bd3f55-9757-4a73-ad98-1717aef31227.png) 

#### *Assets:*
* Đây là nơi mà bạn sẽ chứa các file được build bởi webpack, các file như css, scss, global JS, hoặc các images.

#### *Components:*
* Chứa các components có thể tái sử dụng. 

#### *Layouts:*
* Thư mục Layouts là nơi chứa các layout (giao diện) cho ứng dụng.

#### *Middleware:*
* Chứa Middleware của ứng dụng.
* Middleware được chạy trước khi giao diện được render ra.

#### *Pages:*
* Đây là nơi sẽ chứa các Application Views cũng như route của bạn.
* Mỗi file .vue sẽ tương ứng với 1 route.

#### *Plugins:*
* Thư mục này cho phép bạn đăng ký các plugin Vue trước khi ứng dụng được tạo. Điều này cho phép các plugin được sử dụng trong suốt quá trình tương tác với ứng dụng của bạn trên instance Vue và bạn có thể truy cập bất cứ vào thành phần nào.

#### *Static:*
* Chứa các file tài nguyên được public. Được truy cập qua đường dẫn / .
* VD: muốn lấy file **image.img** trong thư mục **static/image.img** thì chỉ cần vào địa chỉ : **localhost:3000/image.img**

#### *Store:*
* Chứa các file khai báo vuex store

#### *Nuxt.config.js:*
* Chứa các cấu hình được thiết đặt cho ứng dụng của bạn.

![](https://images.viblo.asia/423bfd1c-d109-4b84-b33e-97fd97e2aa22.png)

#### *Package.json:*
* Là nơi chứa các dependencies và scripts.

## 5. Routing
* Nuxt.js tự động cấu hình vue-router  trong thư mục Pages.
* Được điều hướng các trang thông qua nuxt-link
```
<template>
    <nuxt-link to="/">Home page</nuxt-link>
</template>
```

#### *Basic Route*
Ví dụ, cấu trúc thư mục page sẽ là:
```
pages/
--| user/
----| index.vue
----| one.vue
--| index.vue
```
Thì nuxt sẽ tự động tạo ra file config route như thế này:
```
router: {
    routes: [
        {
            name:: 'index',
            path: '/',
            component: 'pages/index.vue'
       },
       {
            name:: 'user',
            path: '/user',
            component: 'pages/user/index.vue'
       },
       {
            name:: 'user-one',
            path: '/user/one',
            component: 'pages/user/one.vue'
       }
    ]
}
```
Thay vì mình phải tạo ra file config cho **route** thì ở nuxt chúng ta chỉ cần tạo cây thư mục trong thư mục **pages**.

#### *Dynamic Routes*
Để xác định tuyến đường động với một tham số, bạn cần xác định tệp .vue HOẶC một thư mục có tiền tố gạch dưới  " _ ".
```
pages/
--| _slug/
----| category.vue
----| index.vue
--| users
----| _id.vue
--| index.vue
```
Thì nó sẽ tự động generate như sau:
```
routers: {
    routes: [
        {
            name: 'index',
            path: '/'
            component: '/'
        },
        {
            name: 'user-id',
            path: '/users/:id'
            component: 'pages/users/_id.vue'
        },
        {
            name: 'slug',
            path: '/:slug',
            component: 'pages/_slug/index.vue'
        },
        {
            name: 'slug-category'
            path: '/:slug/category',
            component: 'pages/_slug/category.vue'
        }
    ]
}
```

#### *Nested Routes*
Nuxt.js cho phép chúng ta tạo các router lồng nhau.

Nếu bạn muốn định nghĩa component cha mà bạn cần tạo 1 file .vue giống với tên thư mục mà chứa các view con.
Ví dụ cấu trúc cây thư mục :
```
pages/
--| users/
----| _id.vue
----| index.vue
--| users.vue
```
 Nó sẽ tự động generate như này:
 
```
routers: {
    routes: [
        {
            path: 'users',
            component: 'pages/users.vue',
            children: [
                {
                    name: 'users',
                    path: '',
                    component: 'pages/users/index.vue'
                },
                {
                    name: 'users-id',
                    path: ':id',
                    component: 'pages/users/_id.vue'
                }
            ]
        }
    ]
}
```

## 6. Kết luận
```
Bài tiếp theo mình sẽ tìm hiểu về Fetch() và asyncData() trong Nuxtjs
```

## 7. Tài liệu tham khảo
* Trang chủ :  https://nuxtjs.org/
* Github: https://github.com/nuxt
* Example: https://github.com/nuxt/nuxt.js/tree/dev/examples