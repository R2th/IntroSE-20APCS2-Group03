## I. Lời mở đầu
![](https://images.viblo.asia/4e033450-11f8-478f-9098-d0f3583d7490.jpg)

Trong bài trước [Hacker đã tấn công trang web của tôi như thế nào](https://viblo.asia/p/su-dung-html-purifier-de-ngan-chan-tan-cong-xss-trong-php-Qpmlerzr5rd) mình có đề cập đến lỗi **XSS** mà trang web của mình đã bị hacker tấn công. Cụ thể là mình đã bị hacker tấn công bởi lỗi **Stored XSS**. Mình xin giải thích cụ thể hơn về lỗi **XSS** này.

**Stored XSS:** là dạng tấn công mà hacker chèn trực tiếp các mã độc vào cơ sở dữ liệu của website. Dạng tấn công này xảy ra khi các dữ liệu được gửi lên server không được kiểm tra kỹ lưỡng mà lưu trực tiếp vào cơ sở dữ liệu. Khi người dùng truy cập vào trang web này thì những đoạn script độc hại sẽ được thực thi chung với quá trình load trang web.

Trong PHP có một hàm là ```strip_tags```, hàm này có tác dụng loại bỏ đi các ký tự html trong một string.

Ví dụ bạn có một đoạn string có chứa các thẻ html, bây giờ bạn cần loại bỏ nó khỏi string này. Bạn có thể làm như sau:
```php
    <?php
        $text = '<p>Test paragraph.</p><!-- Comment --> <a href="#fragment">Other text</a>';
        echo strip_tags($text);
        echo "\n";

        // Allow <p> and <a>
        echo strip_tags($text, '<p><a>');

        // as of PHP 7.4.0 the line above can be written as:
        // echo strip_tags($text, ['p', 'a']);
    ?>
```

Và ta thu được kết quả như mong muốn:

```html
Test paragraph. Other text
```
~~`<p>Test paragraph.</p> <a href="#fragment">Other text</a>`~~

Mặc dù ```strip_tags``` có thể loại bỏ các ký tự html cho data của chúng ta tuy nhiên nó chỉ xóa một số thẻ nhất định. Mỗi lần gọi hàm bạn đều phải điền rõ thẻ mà bạn muốn xóa. Chính vì vậy giải pháp ở đây là dùng HTML Purifier.
## II. Nội dung chính
### Cài đặt package HTML Purifier
HTML Purifier đã có sẵn trong [packagist.org](https://packagist.org/packages/ezyang/htmlpurifier).
Nếu bạn đang sử dụng composer để quản lý các dependencies. Để thực hiện cài đặt package bạn thực hiện theo command sau:
```bash
$ composer require ezyang/htmlpurifier
```
Sau khi cài đặt thành công package sẽ được add trong composer.json.
```json
 "require": {
        "php": "^7.2",
        "doctrine/dbal": "^2.10",
        "ezyang/htmlpurifier": "^4.12",
        "facade/ignition": "^1.4",
        "fideloper/proxy": "^4.0",
        "intervention/image": "^2.5",
        "laravel/framework": "^6.8",
        "laravel/tinker": "^1.0",
        "nunomaduro/collision": "^3.0",
        "predis/predis": "^1.1",
        "rap2hpoutre/laravel-log-viewer": "^1.3",
        "sentry/sentry-laravel": "^1.5",
        "spatie/laravel-analytics": "^3.9",
        "sun-asterisk/laravel-chatwork": "^0.2.0"
    },
```
### Sử dụng package HTML Purifier
Tạo File App\Support\HTMLPurifier.php để setup config cho HTMLPurifier
```php
<?php

namespace App\Support;

class HTMLPurifier
{
    private static $purifier;

    /**
     * @param $value
     * @return mixed
     */
    public static function clean($value)
    {
        return self::getPurifier()->purify($value);
    }

    /**
     * @return \HTMLPurifier
     */
    private static function getPurifier()
    {
        if (is_null(self::$purifier)) {
            //Find full HTML5 config : https://github.com/kennberg/php-htmlpurfier-html5
            $config = \HTMLPurifier_Config::createDefault();
            $config->set('HTML.Doctype', 'HTML 4.01 Transitional');
            $config->set('HTML.SafeIframe', true);
            $config->set('Cache.SerializerPath', storage_path() . '/app/purifier');
            $config->set('Cache.SerializerPermissions', 777);
            $def = $config->getHTMLDefinition(true);
            $def->addElement('figure', 'Block', 'Flow', 'Common', ['class']);
            $def->addElement('oembed', 'Block', 'Flow', 'Common', ['url']);
            $def->addAttribute('oembed', 'url', 'Text');

            self::$purifier = new \HTMLPurifier($config);
        }

        return self::$purifier;
    }
}
```
Với HTMLPurifier bạn không cần phải điền list thẻ html nữa, thay vào đó là ta whitelist các attribute thôi ví dụ như class, url, ... rất là tiện đúng không nào.

Và tại phần store data mà chúng ta muốn sử dụng chỉ cần gọi nó ra
```php
<?php

use App\Models\Comment;
use App\Support\HTMLPurifier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extend
    public function store(Request $request)
    {
        $data = HTMLPurifier::clean($request->data);
        $comment->create($data);
        
        return response->json(['message' => 'Save a new comment successfully]);
    }
}
```
Với HTMLPurifier các thẻ html không cần thiết đã bị xóa đi và việc tấn công XSS phần nào được ngăn chặn.
### Demo
![](https://images.viblo.asia/7725459f-ab21-4428-baf1-60ca8abd4f64.gif)


## III. Tạm kết
HTML Purifier là một packge hiệu quả cho các giải pháp phòng tránh XSS. Hãy bảo vệ trang web của bạn đươc tốt nhất, mang đến trải nghiệm người dùng hiệu quả nhất. Đây chỉ là 1 trong những package trong vô vàn giải pháp ngăn ngừa và phòng tránh XSS. Rất mong được sự góp ý từ mọi người.
![](https://images.viblo.asia/c9a98922-9b9c-4ceb-9516-6c6b67a3cb01.gif)