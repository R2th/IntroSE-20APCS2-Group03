Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về  một framework mới đó là Nuxtjs. Cụ thể mình sẽ giới thiệu với các bạn 
về Routing của NuxtJs.


Giới thiệu qua 1 chút về `Nuxt.js`. Nó là một framework sử dụng để xây dựng các ứng dụ từ `Vue.js`.`Nuxt.js` được ra đời vào 25/10/2016 bởi zeit.co. Nếu ai đã tưng làm việc với `Reactjs` rồi chắc sẽ biết đến `Next.js` thì thằng `Nuxt.js` này cũng gần tương tự như thế.

Giờ mình bắt đầu vào vào phần giới thiệu chính về Routing nhé.

- [Các Routes cơ bản](#class)
- [Các Routes lồng nhau](#phan-chia-module)
- [Named Views](#list-module)
- [Dự phòng SPA](#use-module)
    - [Thực hiện cho Surge](#package-module)
    - [Triển khai cho các trang GitHub và Netlify](#package-module)
    - [Triển khai cho Firebase Hosting](#package-module) 
 - [Chuyển tiếp](#use-module)
    - [Thiết lập chung](#package-module)
    - [Cài đặt trang](#package-module)
- [Middleware](#use-module)
    
## Các Routes cơ bản

Đường dẫn  file:

```text
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

Nó sẽ tự động tạo ra Router:

```php
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

## Các Routes lồng nhau


Nuxt.js cho phép bạn tạo các route lồng nhau bằng cách sử dụng các route  con của vue-router.

Để xác định thành phần cha  của các route lồng nhau, bạn cần tạo file  Vue có cùng tên với thư mục chứa các contain con.

Đường dẫn  file:


```text
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

Nó sẽ tự động tạo ra Router:

```php
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

## Named Views

Để hiển thị các chế độ xem được đặt tên, bạn có thể sử dụng các thành phần `<nuxt name="top"/>` hoặc `<nuxt-child name="top"/>` trong bố cục / trang của bạn. Để chỉ định chế độ xem được đặt tên của trang,  cần mở rộng cấu hình bộ định tuyến trong file  `nuxt.config.js` :

```php
export default {
  router: {
    extendRoutes(routes, resolve) {
      let index = routes.findIndex(route => route.name === 'main')
      routes[index] = {
        ...routes[index],
        components: {
          default: routes[index].component,
          top: resolve(__dirname, 'components/mainTop.vue')
        },
        chunkNames: {
          top: 'components/mainTop'
        }
      }
    }
  }
}
```

Nó đòi hỏi  cần phải mở rộng router  với 2 thuộc tính `components`  và `chunkNames`.

Để có thể hiểu cụ thể hơn, [hãy xem ví dụ về named-view](https://nuxtjs.org/examples/named-views).

## Dự phòng SPA

Các bạn cũng có thể bật dự phòng SPA cho các route. Nuxt.js sẽ xuất ra một file bổ sung giống như `index.html` sẽ được sử dụng trong `mode: 'spa'` . Hầu hết các dịch vụ lưu trữ  có thể được cấu hình để sử dụng  SPA nếu không có tệp nào khớp. Nó sẽ không bao gồm `head` thông tin hoặc bất kỳ HTML nào, nhưng nó vẫn sẽ giải quyết và tải dữ liệu từ API.

Có thể  kích hoạt tính năng này trong file `nuxt.config.js` :

```php
export default {
  generate: {
    fallback: true, // if you want to use '404.html' instead of the default '200.html'
    fallback: 'my-fallback/file.html' // if your hosting needs a custom location
  }
}
```

### Thực hiện cho Surge

Surge [có thể xử lý ](https://surge.sh/help/adding-a-custom-404-not-found-page). cả `200.html` và `404.html. generate.fallback` thành ``200.html` mặc định, vì vậy sẽ không cần phải thay đổi nó.

### Triển khai cho các trang GitHub và Netlify

Trang GitHub và Netlify tự động nhận ra file `404.html`, do đó   những gì chúng ta phải làm là chỉ cần thiết lập `generate.fallback` thành `true`.

### Triển khai cho Firebase Hosting.

Để sử dụng dự phòng trên Firebase Hosting, cần  cấu hình `generate.fallback` thành `true` và sử dụng cấu hình sau ([để biết thêm chi tiết  ](https://firebase.google.com/docs/hosting/full-config#section-rewrites)):

```php
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/404.html"
      }
    ]
  }
}
```

## Chuyển tiếp

Nuxt.js sử dụng thành phần [<transition> ](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) để cho phép  tạo các hiệu ứng chuyển tiếp / hình ảnh động giữa các route của mình.
    
### Thiết lập chung
    
Để thêm chuyển tiếp mờ dần cho mỗi trang trong ứng dụng của bạn, cần một file CSS được chia sẻ trên tất cả các route , vì vậy cần  bắt đầu bằng cách tạo một file trong thư mục assets .
    
 css được viết trong  `assets/main.css`:
    
  ```php
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
```  
    
Sau đó, chúng ta  thêm đường dẫn của nó vào  `css` trong file  nuxt.config.js:
    
  ```php
export default {
  css: [
    '~/assets/main.css'
  ]
}
```  
    
### Cài đặt trang
    
 Bạn cũng có thể xác định chuyển đổi tùy chỉnh cho một trang cụ thể với thuộc tính `transition` .
    
Chúng ta thêm một class mới  và viết css trong  `assets/main.css`:
    
    
```php
.test-enter-active, .test-leave-active {
  transition: opacity .5s;
}
.test-enter, .test-leave-active {
  opacity: 0;
}
``` 
    
  Sau đó, chúng ta sẽ  sử dụng thuộc tính chuyển đổi để xác định tên class  sẽ sử dụng cho quá trình chuyển đổi trang này:
    
 ```php
export default {
  transition: 'test'
}
```    
    
 ## Middleware
    
  Mỗi Middleware nên được đặt trong thư mục `middleware/` . Tên file sẽ là tên của Middleware ( `middleware/auth.js` ).
    
   ```php
export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}
```   
Middleware sẽ được thực hiện theo  thứ tự:
    
1.    `nuxt.config.js` (theo thứ tự trong file)
2.  Layouts phù hợp
3.  Trang phù hợp
    
Một middleware có thể không đồng bộ. Để thực hiện việc này, chỉ cần trả về một `Promise` hoặc sử dụng `callback` gọi lại lần 2:
    
 `middleware/stats.js`
    
```php
import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}
```    

Sau đó, trong `nuxt.config.js`, sử dụng khóa `router.middleware`:

 `nuxt.config.js`
    
```php
export default {
  router: {
    middleware: 'stats'
  }
}
```    
    
Bây giờ `status` của middleware sẽ được gọi cho mỗi thay đổi của route.
    
 
 Bạn cũng có thể thêm middleware của mình vào một layout hoặc trang cụ thể :
  
 `pages/index.vue` hoặc  `layouts/default.vue`
    
 ```php
export default {
  middleware: 'stats'
}
```  
    
    
Dưới đây mình  đã giới thiệu với các bạn về  Nuxt.js cũng như  các khái niệm cơ bản và ví dụ về Routing trong Nuxt.js n. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.
    
    
    
### Tham Khảo

https://nuxtjs.org/guide/routing