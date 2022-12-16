Hôm nay mình xin giới thiệu với các bạn làm sao để kết kợp nuxt js và laravel với nhau để xây dựng ứng dụng  Single Page Application (SPA).


## Cài đặt

### Laravel

Giả xử các bạn đã có sẵn các package để chạy với laravel rồi:
init project laravel bằng lệnh sau:

```sh
composer create-project laravel/laravel spa
```

vào thư mục spa để cài đặt package `laravel-nuxt`, package này sẽ cho phép bạn call url mà ko bị laravel trả ra 404
```spa
cd spa
composer require pallares/laravel-nuxt
```

packages này sẽ được tự động load vào server provider của laravel (>=5.5). Nếu bạn sử dựng phiên bản laravel thấp hơn thì cần thêm nó vào config `config/app.php`:

```php
'providers' => [
        // ...
        Pallares\LaravelNuxt\LaravelNuxtServiceProvider::class,
    ],
```


thay đổi file web.php như sau, để tránh việc laravel trả ra 404 pages:

```php
<?php
Route::get(
    '{uri}',
    '\\'.Pallares\LaravelNuxt\Controllers\NuxtController::class
)->where('uri', '.*');
```

### Cài đặt laravel-nuxt (for JS)

Xóa toàn bộ nội dung có trong file `package.json` thêm nội dung sau vào:

```
{
    "private": true,
    "scripts": {
        "start": "laravel-nuxt dev",
        "build": "laravel-nuxt build"
    },
    "dependencies": {
        "laravel-nuxt": "^1.0.0"
    }
}
```

sau đó chạy lệnh sau để lấy dữ liệu về:

```sh
npm install
```

`laravel-nuxt` sẽ cài đặt toàn bộ những packages cần thiếu cho nuxt js bao gồm `Vue`, `vue-router`, `@nuxtjs/axios` ...

Tạo file `nuxt.config.js` trong thư mục gốc với nội dung như sau:

```js
const laravelNuxt = require("laravel-nuxt");

module.exports = laravelNuxt({
  modules: [],
  plugins: [],
});
```

từ bây nuxt sẽ chạy trong thư mục sau: `resources/nuxt`


##  develop

### Tạo một static page

tạo file index.vue trong thư mục sau:  `resources/nuxt/pages/index.vue`

```js
// resources/nuxt/pages/index.vue
<template>
  <h1>Hello {{ name }}!</h1>
</template>

<script>
export default {
  data: () => {
    return { name: 'viblo' };
  },
};
</script>
```

Khởi tạo server nuxt bằng lệnh sau:

```sh
npm start hoặc
laravel-nuxt dev
```

vào `http://localhost:8000` bạn sẽ thấy kết quả


### call api với axios (SPA)

viết 1 api đơn giản như sau trong file `routes/api.php`

```php
Route::get('me', function () {
    return [
        'name' => 'Viblo api',
    ];
});
```

thay đổi nội dung file `resources/nuxt/pages/index.vue`như sau:

```js
<template>
  <h1>Hello {{ user.name }}!</h1>
</template>

<script>
export default {
    // https://github.com/nuxt-community/axios-module
    async asyncData({ app }) {
        const user = await app.$axios.$get('api/me');
        return { user };
    },
};
</script>
```

khởi tạo server laravel với lệnh sau:
```
php artisan serve
```

sau đó vào localhost:8000 sẽ thấy đoạn `Hello John Doe`


## Deploy

để deploy code lên server bạn cần buil nuxt js với lệnh sau:

```
npm run build hoặc 
laravel-nuxt build
```


## Tham khảo

- https://dev.to/skyrpex/create-a-spa-with-laravel-and-nuxt--54k
- https://www.npmjs.com/package/laravel-nuxt
- https://github.com/skyrpex/laravel-nuxt