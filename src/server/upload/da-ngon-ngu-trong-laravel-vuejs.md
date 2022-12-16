# Giới thiệu
Đa ngôn ngữ cho website cho phép website của bạn tiếp cận với nhiều khác hàng trên nhiều quốc gia khác nhau. Với những website sử dụng framework Laravel cho việc đa ngôn ngữ thì vấn đề i18n được hỗ trợ và xử lý rất đơn giản. Trong một số ứng dụng được viết bằng Laravel chắc chúng ta đều quen với việc Laravel Support ngôn ngữ một cách vô cùng dễ dàng , chỉ cần coppy thư mục /resource/lang ra và đổi tên mong muốn là laravel có thể hiểu đcược ngôn ngữ bạn đang sử dụng 
ví dụn trong laravel bạn chỉ cần viết **{{ trans('user.name')}}** . Là ứng dụng sẽ hiểu đc ngôn ngữ của bạn muốn dùng , tuy nhiên với VueJs các component được viết trong file .env thì nó sẽ không thể hiểu đc cú pháp của Laravel . Bài viết này mình sẽ giới thiệu đến các bạn một số cách để xử lý i18n để làm đa ngôn ngữ trong Laravel + VueJs . Vậy làm thế nào để thay đổi ngôn ngữ cho website trong laravel?
## 1. Setting Laravel
Chúng ta sẽ cài đặt tất cả những **package** , **module** để hộ trợ việc đa ngôn ngữ . Đối với Laravel thì chúng ta sử dụng package **martinlindhe/laravel-vue-i18n-generator** để tạo ra file js của ngôn ngữ trong thư mục project : 

`composer require martinlindhe/laravel–vue–i18n–generator`

- Trong file config/app.php thêm vào dòng sau ở providers:

```html
    "MartinLindhe\VueInternationalizationGenerator\GeneratorProvider::class",
```
- Publish config: 
```php
    php artisan vendor:publish —provider="MartinLindhe\VueInternationalizationGenerator\GeneratorProvider"
```

Sẽ có 1 file vue-i18n-generator.php được tạo ra trong thư mục config. Ở đây chúng ta có thể config  1 số trường như đường dẫn file ngôn ngữ hoặc file js: 

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


tiếp theo chúng ta sẽ chuyển đổi file từ Php -> Js chạy lệnh sau : 
```php 
    php artisan vue-i18n:generate
```

Sau khi muốn định nghĩa 1 key mới . Bạn có thể thêm thẳng trực tiếp vào file này vue-i18n-locales.generated.js, Nó được tạo ra theo đường dẫn mà bạn đã config ở trên ` 'jsFile' => '/resources/js/vue-i18n-locales.generated.js',` , hoặc viết vào file ngôn ngữ trong laravel rồi chạy lệnh vừa rồi nhé . 

## 2. Setting Vuejs
- Trong bài viết này mình sẽ sử dụng package : vue-i18n, để cài đặt thì ta chạy lệnh sau 
 ```
     npm i —save vue–i18n hoặc yarn add vue–i18n
 ```

Sau khi cài đặt thành công , bạn có thể xem version của nó trong package trong package.json :

**"vue-i18n": "^8.18.2"**

sau đó ta thêm vào trong file main của blade : 
 ```
     <meta name="locale" content="{{ App::getLocale() }}"/>
 ```
- Công việc tiếp theo chúng ta sẽ đi tạo plugins và đăng kí vue-i18n : 
    - Tạo folder app: 
         Tạo 1 folder localers và lần lượt các file : en.json, vi.json, jp.json các file nàu chính là nơi viết bản dịch cho ngôn ngữ. Website hỗ trợ  bao nhiêu ngôn ngữ thì mình tạo bấy nhiêu file Json :v . 
 Ở đây mình dùng 3 ngôn ngữ để trans là : Tiếng Việt, Tiếng Anh, Tiếng Nhật và ví dụ của mình là từ đăng nhập nhé :

**EN**:

```
    {
        "login": "Login Gmail",
    }
```

**VI**
```
     {
        "login": "Đăng nhập",
    }
```

**JP**
```
     {
        "login": "ログイン",
    }
```

- Tạo store để xử lý thay đổi ngôn ngữ dễ dàng 
 
 ```js 
     import _find from 'lodash/find';

    export const state = () => ({
        locales: [
            { value: 'vi', label: 'VI' },
            { value: 'en', label: 'EN' },
            { value: 'jp', label: 'JP' },
        ],
        locale: 'vi',
    });

    export const mutations = {
        set(state, locale) {
            const isLocale = _find(state.locales, { value: locale });
            if (isLocale) {
                state.locale = locale;
            }
        },
    };
 ```
 
- Trên đây mình sử dụng hàm find của lodash các bạn sử dụng lodash thì chạy lệnh này nhé :
 `yarn add lodash`

- Trong state mình có để default là tiếng việt có value là 'vi', và tạo hàm set mutation để thay đổi ngôn ngữ .
- Tạo 1 file tên i18n.js trong folder plugins chúng ta đã tạo lúc trc r  . 
```js
    import Vue from 'vue';
    import VueI18n from 'vue-i18n';
    import _get from 'lodash/get';

    Vue.use(VueI18n);

    /* eslint-disable */
    export default ({ app, store }) => {
        app.i18n = new VueI18n({
            locale: _get(store, 'state.i18n.locale', 'vi'),
            silentTranslationWarn: true,
            fallbackLocale: 'vi',
            messages: {
                en: require('@/locales/en.json'),
                vi: require('@/locales/vi.json'),
                js: require('@locales/jp.json'),
            },
        });
    };
    /* eslint-enable */
```

- locale : là ngôn ngữ đăng lý trong package.
- fallbackLocale: là ngôn ngữ dự phòng được chọn nếu locale không tồn tại 
- message : require để đọc nội dung dùng các file json .


- Cuối cùng chúng ta sẽ  xử lý nút thay đổi ngôn ngữ ở ngoài màn hình  nhé :
```js
    <template>
        <select :value="locale" @change="onChangeLanguage">
           <option v-for="(item, index) in locales"
                 :key="index"
                 :label="item.label"
                 :value="item.value"
             />
        </select>
    </template>
    <script>
        import { mapState } from 'vuex';

            computed: {
                ...mapState('i18n', ['locale', 'locales']),
            },
            methods: {
                onChangeLanguage(locale) {
                        this.$store.commit('i18n/set', locale);
                },
            },
```

Giờ thì chúng ta chỉ cần từ sử dụnng $t để sử dụng cho việc đa ngôn ngữ ở Vuejs :

```
    <button> {{ $t('login') }} 
```

Khá đơn giản phải không , bên trong $t chính là key nằm trong file Json của các bạn .

# 3. Kết Thúc 
-  Hy vọng bài viết này sẽ giúp ích cho bạn , Thanks for read .