Xin chào các bạn. Hôm nay mình sẽ tiếp tục series về Nuxt.js. Cụ thể mình sẽ giới thiệu với các bạn về Views trong Nuxt.js


## App Template

-----

`Bạn có thể tùy chỉnh các app template HTML được sử dụng bởi Nuxt.js để bao gồm các tập lệnh hoặc các lớp CSS có điều kiện`

Để có thể thay đổi template, ta cần tạo một file `app.html` trong thư mục gốc của project.

Template mặc định sử dụng Nuxt.js sẽ là:

 ```php
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

Sẽ có một số trường hợp có thể tùy chỉnh cho template để thêm các lớp CSS cho IE:

 ```php
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## Layouts

-----

Layouts sẽ rấ tối ưu khi mà bạn muốn thay đổi giao diện ứng dụng Nuxt.js của bạn. Bạn có thể tùy chỉnh lại giao diện hoặc phân riêng giao diện chỉnh dành cho mobile hoặc PC một cách khá dễ dàng.


###  Layout Mặc Định

-----

Bạn có thể mở dộng thêm layout bằng cách thêm một file `layouts/default.vue`. Nó sẽ sử dụng cho tất cả các pages được bạn chỉ định đến.

Layout mặc định sẽ chỉ hiển thị thành phần page: 

 ```php
<template>
  <nuxt/>
</template>
```

###  Layout Tùy chỉnh

-----

Mỗi file trong thư mục `layouts`  sẽ tạo ra layout tùy chỉnh mà bạn có thể truy cập bằng thuộc tính `layout` trong các thành phần page.

Để dễ hiểu hơn ví dụ bạn muốn tạo một layout Blog và lưu nó vào `layouts/blog.vue`:

```php
<template>
  <div>
    <div>My blog navigation bar here</div>
    <nuxt/>
  </div>
</template>
```

Sau đó, bạn sẽ cần call nó với các page sử dụng layout tùy chỉnh của mình(ở đây sẽ là ` pages/posts.vue`): 


```php
<template>
<!-- Your template -->
</template>
<script>
export default {
  layout: 'blog'
  // page component definitions
}
</script>
```

Bạn có thể tìm hiểu thêm về các thuộc tính của `layout` ở đây:  [API Pages Layout](https://nuxtjs.org/api/pages-layout)

###  Error Page

-----

Trang error là một thành phần trong page luôn được hiển thị khi xảy ra lỗi (Mặc dù nó được đặt trong thư mục `layout`,nhưng nó có thể được coi là một page )

Như đã nói ở trên, nó sẽ là một layout đặc biệt.Bạn cần xem cách bố trí này như là một thành phần hiển thị khi xảy ra lỗi (404, 500, ...). Tương tự như các thành phần khác của page. Bạn cũng có thể tùy chỉnh được layout cho page error.

Có thể xem code page error mặc định  [tại đây](https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/components/nuxt-error.vue) : 

Bạn cũng có thể tùy chỉnh trang error bằng cách thêm  một file `layouts/error.vue`.

```php
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
```

## Pages

-----

Mỗi thành phần trong  Page sẽ tương đương với thành phần trong Vue.Nhưng Nuxt.js sẽ thêm các thuộc tính và chức năng đặc biệt để giúp phát triển ứng dụng của bạn dễ dàng nhất có thể. 


```php
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return { name: 'World' }
  },
  fetch () {
    // The `fetch` method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```


Bạn có thể tìm hiểu thêm về các thuộc tính trong Page [tại đây](https://nuxtjs.org/guide/views)

## HTML Head

-----
Nuxt.js sử dụng [vue-meta](https://github.com/nuxt/vue-meta) để cập nhật `document head` và `meta attributes` cho ứng dụng của bạn


## Thẻ Meta mặc định

-----

Nuxt.js cho phép bạn xác định tất cả các thẻ `<meta>` mặc định cho ứng dụng của bạn ở bên trong `nuxt.config.js`. Có thể xác định chúng bằng một thuộc tính `head`.

Một ví dụng tủy chỉnh phông chữ Google: 

```php
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```


Dưới đây mình  đã giới thiệu với các bạn về  Views  và một số khái niệm cơ bản của Views trong Nuxt.js. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

### Tham Khảo

https://nuxtjs.org/guide/views