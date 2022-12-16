Xin chào các bạn. Hôm nay mình sẽ tiếp tục series về Nuxt.js. Cụ thể mình sẽ giới thiệu với các bạn về Assets trong Nuxt.js


- [Webpack](#Webpack)
- [Static](#Static)


## Webpack

 [vue-loader](https://vue-loader.vuejs.org) tự động xử lý style của bạn và các tệp mẫu với `css-loader` và trình biên dịch mẫu Vue ra khỏi box. Trong quá trình biên dịch này, tất cả các asset URLs như `<img src="...">`, `background: url(...)` và CSS `@import` được giải quyết như mô-đun phụ thuộc. 
 
 Ví dụ: ta có file tree:
 
 ```php
-| assets/
----| image.png
-| pages/
----| index.vue
```

Nếu bạn sử dụng `url('~assets/image.png')` trong CSS của mình , nó sẽ được dịch sang  `require('~/assets/image.png')`

Hoặc nếu bạn tham chiếu imange đó trong `pages/index.vue`: 

 ```php
<template>
  <img src="~/assets/image.png">
</template>
```
Nó sẽ được tổng hợp thành : 

 ```php
createElement('img', { attrs: { src: require('~/assets/image.png') }})
```

Vì `.png` không phải là một file JavaScript, Nuxt.js cấu hình webpack sử dụng [file-loader](https://github.com/webpack-contrib/file-loader) và [url-loader](https://github.com/webpack-contrib/url-loader) để xử lý vấn đề cho bạn.

Lợi ích của những `loaders` này: 

* `file-loader`  cho phép bạn chỉ định nơi copy và đặt file nội dung, cũng như chỉ ra cách đặt tên file bằng cách sử dụng chia nhỏ các 
version để có thể lưu trữ tốt hơn.

* `url-loader`  cho phép bạn đánh dấu một cách có điều kiện cho 1 file base-64  dưới dạng URL nếu chúng nhỏ hơn một ngưỡng nhất định. Điều này có thể giúp làm giảm 1 số các HTTP requests cho các file khác. Nếu các file lớn hơn ngưỡng, nó sẽ tự động back về file-loader.


Đối với 2 `loaders` đó. Cấu hình mặc định sẽ là: 

 ```php
// https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L297-L316
[
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```


Điều này có nghĩa là tất cả các file dưới 1KB sẽ được đánh dầu là một base-64 dữ liệu URL. Nếu không thì image/font sẽ được copy vào  
một folder tương ứng (trong thư mục `.nuxt`).

Khi khỏi chạy ứng dụng của bạn với `nuxt`,template trong `pages/index.vue`: 

```php
<template>
  <img src="~/assets/image.png">
</template>
```

Sẽ được chuyển thành : 

```php
<img src="/_nuxt/img/image.0c61159.png">
```

Nếu bạn muốn thay đổi cấu hình của `loader`, có thể sử dụng [build.extend.](https://nuxtjs.org/api/configuration-build#extend)


## Static

Nếu bạn không muốn sử dụng Webpack assets từ  thư mục `assets`, bạn có thể tự tạo và sử dụng thư mục `static` (trong thư mục gốc).

Tất cả các file sẽ được Nuxt tự động xử lý và có thể truy cập thông qua URL gốc trong project của bạn/ (`static/favicon.ico` sẽ có sẵn tại `localhost:3000/favicon.ico`)

Tùy chọn này sẽ hữu ích cho các file `robots.txt`, `sitemap.xml` hoặc `CNAME`.

Trong code của mình, bạn có thể tham chiếu các file này liên quan đến thư mục gốc (`/`):

```php
<!-- Static image from static directory -->
<img src="/my-image.png"/>

<!-- webpacked image from assets directory -->
<img src="~/assets/my-image-2.png"/>
```

Dưới đây mình  đã giới thiệu với các bạn về  Assets và một số khái niệm cơ bản của Assets trong Nuxt.js. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

### Tham Khảo

https://nuxtjs.org/guide/assets