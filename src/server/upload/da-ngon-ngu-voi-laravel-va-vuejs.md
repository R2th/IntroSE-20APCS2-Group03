### **1. Mở đầu** <br>
Mặc định Laravel đã hỗ trợ ta viết ứng dụng đa ngôn ngữ hết sức thuận tiện và dễ dàng. Tuy nhiên, Laravel chỉ hỗ trợ đa ngôn ngữ với file .blade.php. Khi ta xây dựng front end bằng vuejs thì các component của nó sẽ không thể hiểu được cú pháp của Laravel.
<br>
Hôm nay mình sẽ giới thiệu một cách chi tiết các bạn có thể dùng để kết hợp đa ngôn ngữ trong vuejs và laravel.
### **2. Cài đặt**
### 2.1 Về phần Laravel
Chúng ta sẽ sữ dụng package `martinlindhe/laravel-vue-i18n-generator` để tạo ra file js của ngôn ngữ.
<br><br>
Chạy lệnh sau trong thư mục project của bạn
> composer require martinlindhe/laravel-vue-i18n-generator
-----
trong file `config/app.php` ta thêm dòng sau vào phần `providers`
<br>
>MartinLindhe\VueInternationalizationGenerator\GeneratorProvider::class,

<br>
Sau đó ta chạy lệnh sau để publish config: <br>

```
php artisan vendor:publish --provider="MartinLindhe\VueInternationalizationGenerator\GeneratorProvider"
```
Sẽ có 1 file `vue-i18n-generator.php` được tạo ra trong thư mục config. <br>
Trong file này, ta có thể config 1 số trường như đường dẫn file ngôn ngữ, file js.
```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Laravel translations path
    |--------------------------------------------------------------------------
    |
    | The default path where the translations are stored by Laravel.
    | Note: the path will be prepended to point to the App directory.
    |
    */

    'langPath' => '/resources/lang',

    /*
    |--------------------------------------------------------------------------
    | Laravel translation files
    |--------------------------------------------------------------------------
    |
    | You can choose which translation files to be generated.
    | Note: leave this empty for all the translation files to be generated.
    |
    */

    'langFiles' => [
        /*
        'pagination',
        'passwords'
        */
    ],

    /*
    |--------------------------------------------------------------------------
    | Output file
    |--------------------------------------------------------------------------
    |
    | The javascript path where I will place the generated file.
    | Note: the path will be prepended to point to the App directory.
    |
    */
    'jsPath' => '/resources/lang/',
    'jsFile' => '/resources/js/vue-i18n-locales.generated.js',

    /*
    |--------------------------------------------------------------------------
    | i18n library
    |--------------------------------------------------------------------------
    |
    | Specify the library you use for localization.
    | Options are vue-i18n or vuex-i18n.
    |
    */
    'i18nLib' => 'vue-i18n',

    /*
    |--------------------------------------------------------------------------
    | Output messages
    |--------------------------------------------------------------------------
    |
    | Specify if the library should show "written to" messages
    | after generating json files.
    |
    */
    'showOutputMessages' => false,
];

```
<br>
để chuyển đổi các file ngôn ngữ trong Laravel sang file js ta chạy lệnh sau: <br>

```
php artisan vue-i18n:generate
```

<br>

một file vue-i18n-locales.generated.js được tạo ra theo đường dẫn mà bạn đã config. <br>
<br>
Sau này khi muốn định nghĩa 1 key mới, bạn có thể thêm thẳng trực tiếp vào file này, hoặc viết vào các file ngôn ngữ trong Laravel rồi chạy lại lệnh vừa rồi. <br>
### 2.2 Về phần Vuejs
<br>

chúng ta sẽ sử dụng package `vue-i18n` <br><br>
Chạy lệnh sau:
```
npm i --save vue-i18n
```
Hoặc
```
yarn add vue-i18n
```
Thêm vào đoạn code sau trong file `app.js`
```js
import Vue from 'vue';
import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated.js';

Vue.use(VueInternationalization);
const i18n = new VueInternationalization({
    locale: document.head.querySelector('meta[name="locale"]').content,
    messages: Locale
});

const app = new Vue({
    el: '#app',
    i18n,
    components: {
       ...
    }
}
```
Ta thêm thẻ sau vào phần header trong file main blade
```html
 <meta name="locale" content="{{ App::getLocale() }}"/>
```
### 3. Sử dụng
Cách sử dụng tương tự như cách bạn làm với file` blade` <br>
* Đối với block template
```js
{{ $t('message.go_to_home') }}
// hoặc
{{ $t('messages.hello', {name: 'name'}) }} // name là biến động, tương tự như laravel
```
* Đối với code trong thẻ script
```js
this.$t('message.hello');
```
### 4. Thay Đổi Ngôn Ngữ
### 4.1 Về phần Laravel
Ta sẽ tạo 1 api thay đổi ngôn ngữ.
```
php artisan make:controller LangController
```
trong `LangControler` ta thêm đoạn code sau <br>
```php
public function setLanguage($language)
{
    Session::put('language', $language);

    return $language;
}
```
Tiếp theo ta sẽ tạo 1 `middleware`
```
php artisan make:middleware LangMiddleware
```
ta chèn đoạn code sau:
```php
    public function handle($request, Closure $next)
    {
        if (Session::has('language')) {
            App::setLocale(Session::get('language'));
        } else {
            App::setLocale('en');
        }

        return $next($request);
    }
```
định nghĩa `route` trong `route/api.php`
```php
    Route::get('/language/{language}', 'LangController@setLanguage');
```
### 4.2 Về phần Vuejs
Ta tạo 1 component với nội dung như sau
```html
<template>
    <div class="lang">
        <select name="language" class="form-select" @change="changeLanguage" v-model="language">
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
        </select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            language: this.$i18n.locale
        };
    },
    methods: {
        changeLanguage() {
            localStorage.setItem('language', this.language);
            this.$i18n.locale = this.language;
            fetch(`api/language/${this.language}`);
        }
    }
};
</script>
```
### 5. Tham Khảo
* [https://github.com/martinlindhe/laravel-vue-i18n-generator](https://github.com/martinlindhe/laravel-vue-i18n-generator)
* [https://laravel.com/docs/5.7/localization](https://laravel.com/docs/5.7/localization)