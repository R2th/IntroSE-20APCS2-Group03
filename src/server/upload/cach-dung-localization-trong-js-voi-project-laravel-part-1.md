Nếu các bạn đã làm việc với Laravel, chắc hẳn các bạn đã nghe khái niệm Localization, hay cũng có nghe đến `i18n` nhỉ. Laravel đã cung cấp cách thức rất đơn giản để ta có thể làm một website localization. Nhưng trong quá trình là project, mình còn có dùng đến JS, có rất nhiều đoạn text (ví dụ như thông báo) được tạo ra từ JS thì làm thế nào để có thể làm chúng đa ngôn ngữ nhỉ? Bài viết này mình sẽ gợi ý cách làm đơn giản để làm localization trong JS. Ngoài ra, trong quá trình tìm hiểu, mình thấy một vài package ở phần cuối bài, các bạn tìm hiểu thêm nhé. 

## 1. Localization là gì?
Nói một cách đơn giản, website localization là một trang web có thể chuyển đổi từ ngôn ngữ này sang ngôn ngữ khác, tùy thuộc vào lựa chọn của người dùng web. 

Để có thể chuyển đổi linh hoạt giữa các ngôn ngữ, trang web của bạn phải có đầy đủ bản dịch của các ngôn ngữ mà bạn muốn chuyển đổi. Khi đó, trang web của bạn sẽ có đa ngôn ngữ.

## 2. Localization trong Laravel
Vì bài viết này mình tập chung vào i18n trong JS nên sẽ chỉ nói qua về i18n trong back-end với Laravel nhé.

Laravel cung cấp cách làm đa ngôn ngữ rất đơn giản, dễ thực hiện. Ngôn ngữ mặc định ban đầu của Laravel là `en`. Nó được xác định trong file `config/app.php`, với key là `locale`. Vì vậy, khi cần thay đổi ngôn ngữ, chúng ta chỉ cần thay đổi config này mà thôi. Laravel cũng cung cấp đầy đủ cách để chúng ta lấy ra hoặc thay đổi config này. Để lấy ra ngôn ngữ đang dùng, có thể dùng `config(‘app.locale’)` hoặc `App::getLocale()`. Để thay đổi ngôn ngữ đang dùng, ta dùng `App::setLocale($lang)` với `$lang` là ngôn ngữ muốn cài đặt.

Như vậy, việc chúng ta cần làm gần như chỉ là tạo ra các bản dịch của các nội dung bạn muốn hiển thị ra màn hình theo các ngôn ngữ mà ta cần. Các bản dịch được lưu trong thư mục `resources/langs`.

Khi mới tạo project, ta sẽ thấy trong thư mục này có thư mục `en`. Đây là bản dịch mặc định bằng tiếng anh, trong đó có phần dịch cho các thông báo xác thực, kiểm tra.
Trong mỗi file ngôn ngữ này, các đoạn text được định nghĩa thông qua 1 mảng kiểu `key => value`.

Ví dụ: file `password.php`
```
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Password Reset Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are the default lines which match reasons
    | that are given by the password broker for a password update attempt
    | has failed, such as for an invalid token or invalid new password.
    |
    */

    'reset' => 'Your password has been reset!',
    'sent' => 'We have emailed your password reset link!',
    'throttled' => 'Please wait before retrying.',
    'token' => 'This password reset token is invalid.',
    'user' => "We can't find a user with that email address.",

];
```
Khi cần hiển thị 1 đoạn text, thay vì viết hẳn đoạn text đó ra thì ta sẽ gọi thông qua key của nó được xác định trong file này. Ta có thể dùng hàm `trans()` hoặc `@lang()` để xác định đoạn text cần in ra màn hình.

Ví dụ: 
`trans('auth.failed');` hoặc `@lang('auth.failed');`

Để tạo bản dịch cho ngôn ngữ khác, ta chỉ cần thêm 1 thư mục ngang hàng với thư mục `en`, sau đó dịch lại các đoạn text tương ứng với các key trong thư mục `en` là được. Ví dụ, để thêm tiếng việt, ta thêm 1 thư mục `vi`, bên trong cũng có 4 file ngôn ngữ như trong `en`. Sau đó thay đổi `locale = ‘vi'` thì web sẽ chuyển sang tiếng việt rồi.

Ngắn gọn ý chính như vậy thôi, ta sẽ xem cách làm i18n trong JS nhé.

## 3. Cách làm localization trong JS trong project Laravel
Ý tưởng ban đầu sẽ là tạo ra 1 biến lưu lại toàn bộ nội dung các bản dịch và có thể truy cập ở tất cả các view. Cách đơn giản nhất có thể nghĩ đến là dùng `View::share` đúng không các bạn? :)). Ngoài ra các bạn có thể viết riêng thành ViewComposer hoặc dùng Cache để lưu nhé. 

Như vậy, ta có:

Bước 1: Tạo 1 biến được chia sẻ cho tất cả các view

Bước 2: Ta sẽ gán biến này cho `window` object để bên JS có thể đọc được dễ dàng. 

Bước 3: Viết JS function để xử lý đa ngôn ngữ. 

⇒ Cùng xem ví dụ nhé :))

Vì mình làm ví dụ đơn giản nên mình chỉ có 1 view với 1 button hiển thị thông báo (alert) bằng JS như thế này:

Test.blade.php
```
<body>
	<div class="container">
		<button class="btn">{{ trans('i18n.alert') }}</button>
	</div>
	<script type="text/javascript" src="js/i18n.js"></script>
</body>
```
js/i18n.js
```
$(document).ready(function () {
	$('.btn').click(function(){
		alert(‘Hello');
	})
})
```

File đa ngôn ngữ bằng tiếng anh và tiếng việt:

en/i18n.php
```
<?php

return [
    'alert' => 'Alert',
    'message' => [
    	'hello' => 'Hello!',
    ],
];
```
vi/i18n.php
```
<?php

return [
    'alert' => 'Thông báo',
    'message' => [
    	'hello' => 'Xin chào!',
    ],
];
```
Như vậy, khi nhấn button `Alert`, ta sẽ có 1 thông báo hiển thị chữ “Hello" phải không? Dù khi bạn đổi ngôn ngữ thì nó vẫn chỉ là “Hello" mà thôi. Ta cùng làm nó đổi ngôn ngữ nhé.



**Bước 1:** Tạo 1 ServiceProvider để chia sẻ biến ra toàn bộ các view. 

Trong hàm construct(), ta xác định file ngôn ngữ tương ứng với ngôn ngữ hiện tại.
Trong hàm boot(), ta chia sẻ nội dung file ngôn ngữ ở dạng json cho các view, với tên là `$translation`.
```
<?php 

namespace App\Providers; 

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File; 
use Illuminate\Support\ServiceProvider; 
use Illuminate\Support\Facades\View;

class TranslationServiceProvider extends ServiceProvider 
{ 
    /** 
     * The path to the current lang files. 
     * 
     * @var string 
     */ 
    protected $langPath; 

    /** 
     * Create a new service provider instance. 
     * 
     * @return void 
     */ 
    public function __construct() 
    { 
        $this->langPath = resource_path('lang/' . App::getLocale());
    }

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        View::share('translation', collect(File::allFiles($this->langPath))->flatMap(function ($file) {
                return [
                    ($translation = $file->getBasename('.php')) => trans($translation),
                ];
            })->toJson());
    }
}
```
**Bước 2:** Gán biến này cho `window` object

Trong file blade:
```
<script>
	    window.translations = {!! $translation !!};
</script>
```

**Bước 3:** Viết JS function để xử lý đa ngôn ngữ. 

Trong file JS, ta khai báo function `trans(key)` để sử dụng giống như hàm `trans()` ở back-end. Tất nhiên, các bạn có thể chọn tên function khác.
```
function trans(key, replace = {}) {
    let translation = key.split('.').reduce((t, i) => t[i] || null, window.translations);

    for (var placeholder in replace) {
        translation = translation.replace(`:${placeholder}`, replace[placeholder]);
    }

    return translation;
}
```
Đọc kỹ function này, bạn sẽ thấy nó chỉ là thao tác tách chuỗi từ `key` để tìm ra đoạn text tương ứng trong biến `window.translations` thôi. Khi đó, ta truyền key vào giống hệt như cách dùng với hàm `trans()` của blade nhé.

Sau khi khai báo xong hàm này, ta sẽ thay đổi phần code thông báo ban đầu một chút. Thay vì chữ “Hello" thì mình sẽ dùng function `trans()` này nhé.

```
$('.btn').click(function(){
	alert(trans(‘i18n.message.hello’));
})
```
Bạn sẽ thấy thông báo này thay đổi theo ngôn ngữ mà bạn chọn rồi đấy. 

## 4. Tổng kết
Ở bài viết này, mình đã đưa ra cách làm đơn giản để có thể đa ngôn ngữ trong JS với project Laravel. Các bạn có thể áp dụng cho các đoạn text xử lý bên JS như các thông báo chẳng hạn. Bài viết tiếp theo mình sẽ đưa ra cách làm nâng cao hơn, ví dụ như viết hàm trans_choice() như ở blade :))

Package về Localization trong JS để các bạn tham khảo nhé

https://github.com/conedevelopment/i18n

https://github.com/rmariuzzo/Laravel-JS-Localization

https://github.com/martinlindhe/laravel-vue-i18n-generator

# Tài liệu tham khảo
https://laravel.com/docs/8.x/localization

https://pineco.de/using-laravels-localization-js/

https://stackoverflow.com/questions/55262493/laravels-localization-on-javascript-variables