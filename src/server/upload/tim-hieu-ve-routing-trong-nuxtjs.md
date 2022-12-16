# Giới thiệu 
Nhắc đến ứng dụng web thì routing là 1 thành phần không thể thiếu, Và framework nuxtjs cũng hỗ trợ rất tốt việc này.
cùng tìm hiểu nhé !

Nuxt.js tự động tạo ra cấu hình [vue-router](https://github.com/vuejs/vue-router) dựa theo cây thư mục của bạn trong thư mục Pages.

> Để chuyển hương giữa các trang thay vì dùng thẻ a thì chúng ta dùng < nuxt-link > component

Ví dụ: 

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

# Basic Routes
Ví dụ, nếu cấu trúc thư mục của bạn trong **pages** như này:

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

Thì nuxt sẽ tự động tạo ra file config route như thế này: 
```js
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
Nhìn khá dễ hiểu phải không. Thay vì mình phải tạo ra file config cho route thì ở nuxt chúng ta chỉ cần tạo cây thư mục trong thư mục **pages**
# Dynamic Routes
Để định nghĩa 1 router với tham số. Thì bạn cần đặt tên thư mục hoặc tên file .vue với tiền tố gạch dưới  "_".

Ví dụ, cấu trúc cây thư mục trong Pages của bạn như sau:

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

Thì nó sẽ tự động generate như sau: 
```js
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
**Validate tham số trên router:**

Nuxt.js cho phép bạn validate tham số trong phương thức validate() trong component.

Ví dụ ở file: pages/users/_id.vue : Chúng ta muốn tham số :id phải là số

```js
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
```

> Chú ý : nếu phương thứ validate() trả về false hoặc bị lỗi . Nuxtjs sẽ tự động load ra trang lỗi 404 với trường hợp trả về bằng false và trả về trang lỗi 500 nếu phương thức bị lỗi.
# Nested Routes
Nuxt.js cho phép chúng ta tạo các router lồng nhau. 

Nếu bạn muốn định nghĩa component cha. bạn cần tạo 1 file .vue giống với tên thư mục mà chứa các view con.

Nghe có vẻ lằng nhằng mình vào luôn ví dụ nhé.

Ví dụ cấu trúc cây thư mục của mình như sau: 
```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Nó sẽ tự động generate như này: 
```js
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

> Đừng quên include <nuxt-child/> component trong component cha (.vue file) nhé !
# Middleware
Middleware cho phép bạn định nghĩa một function trước khi hiển thị một trang hay một nhóm trang.

> Tất cả các middleware phải được đặt trong thư mục Middleware và tên file sẽ là tên của middleware. ví dụ (**middleware/auth.js** thì tên middleware sẽ là **auth**)

Một middleware sẽ nhận 1 biến  [the context](https://nuxtjs.org/api/context) làm tham số đầu tiên.

Ví dụ:

```js
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```

> Ở chế độ universal, thì middleware sẽ được gọi server-side một lần (Lần đâu tiên request đến nuxt app hoặc khi page được reload lại). với các lần điều hướng tiếp theo thì middleware được thực hiện ở client-side.

Middleware sẽ được thực hiện theo thứ tự: 
1. nuxt.config.js
2. Matched layouts
3. Matched pages

# Kết luận
> Bài tiếp theo mình sẽ tìm hiểu về Views trong nuxtjs
# Tham khảo
https://nuxtjs.org/guide/routing