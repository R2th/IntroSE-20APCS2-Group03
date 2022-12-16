Trong một ứng dụng được viết bằng laravel chắc chúng ta đều quen với việc laravel support ngôn ngữ một cách vô cùng dễ dang, chỉ cần copy nhiều thư mục `/resources/lang` ra và đổi tên mong muốn là laravel có thể hiểu được ngôn ngữ bạn đang muốn sử dụng.

ví dụ trong laralve bạn chỉ cần viết

```
{{ trans('label.user.login') }}
```

là ứng dụng sẽ hiểu được ngôn ngữ của bạn muốn dùng, nhưng với vuejs, các component được việt trong file `.vue` thì nó sẽ không thể hiểu được cú pháp của laravel, hôm nay mình sẽ giới thiệu một cách chi tiết các bạn có thể dùng để kết hợp đa ngôn ngữ trong vuejs và laravel.

### Cài đặt
- đầu tiên ta phải cài đặt những package, module để hỗ trợ việc đã ngôn ngữ:

### Đối với laravel:

- Chúng ta sẽ sữ dụng package `martinlindhe/laravel-vue-i18n-generator` để tạo ra file js của ngôn ngữ

Trong thư mục project của bạn chạy lệnh sau:
```
composer require martinlindhe/laravel-vue-i18n-generator
```

Trong file ```config/app.php``` thêm vào dòng sau ở providers:

```php
MartinLindhe\VueInternationalizationGenerator\GeneratorProvider::class,
```

publish config:

```
php artisan vendor:publish --provider="MartinLindhe\VueInternationalizationGenerator\GeneratorProvider"
```

trong file config này bạn có thể thay đổi một số cấu hình như tên thư mục, tên file, đường đẫn tới file ...

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
    'jsPath' => '/resources/assets/js/admin/languages/',
    'jsFile' => '/resources/assets/js/admin/languages/vue-i18n-locales.generated.js',

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
];

```

để chuyển đổi file trans từ php sang js chạy lệnh sau:

```
php artisan vue-i18n:generate
```

### Với vueJs

- Chúng ta sẽ sử dụng package vue-i18n để trans

Chạy lệnh sau để cài đặt:

```
npm i --save vue-i18n
```
Hoặc

```
yarn add vue-i18n
```


Trong file main js của bạn thêm vào đoạn sau:


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

Đạt vào file main blade trong header của bạn đoạn thẻ meta sau:

```
 <meta name="locale" content="{{ App::getLocale() }}"/>
```

chỗ này sẽ giúp file của bạn lấy language động.

> Chú ý: `import Locale from './vue-i18n-locales.generated.js';` sao cho đúng đường dẫn file được tạo ra.

### Sử dụng

- Sau khi cài đặt xong thì cách sử dụng là vô cùng dễ dàng, nó hoàn toàn tương tự với laravel:

- Đối với block templage:

```
{{ $t('message.go_to_home') }}
// hoặc
{{ $t('messages.hello', {name: 'name'}) }} // name là biến động, tương tự như laravel
```

đối với đoạn cần trans nằm trong thẻ `<script></script>`

```
this.$t('message.hello');
```

### Thay đổi ngông ngữ

- Khi người dùng click thay đổi ngôn ngữ thì chúng ta cần lưu ngôn ngữ đó lại, và mỗi request của người dùng thì cần set lại `Locale` thì hàm  ` App::getLocale()` của laravel mới thay đổi theo ngôn ngữ:

Set ngôn ngữ khi người dùng ấn change: 

```php
public function setLanguage($language)
{
    Session::put('language', $language);

    return $language;
}
```

> Bạn tự định nghĩa `route` vào hàm này nhé.

Tiếp theo tạo một file middware với nội dùng như sau:

```php

<?php

namespace App\Http\Middleware;

use App;
use Closure;
use Session;

class Language
{

    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Session::has('language')) {
            App::setLocale(Session::get('language'));
        } else {
            App::setLocale('vi');
        }

        return $next($request);
    }
}
```

Cuối cùng để `\App\Http\Middleware\Language::class,` vào `$middleware` của file file `app/Http/Kernel.php`.

### Tham khảo
- https://github.com/martinlindhe/laravel-vue-i18n-generator
- https://laravel.com/docs/5.7/localization

Đó là toàn bộ nội dung mình muốn chia sẽ.
Thank you for reading!