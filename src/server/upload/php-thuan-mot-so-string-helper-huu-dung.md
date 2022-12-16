Trong quá trình làm việc với string, ắt hẳn các bạn các bạn sẽ gặp không ít vấn đề khi sử dụng các ký tự unicode. 
Các hàm dưới dây sẽ giúp bạn.

### Đầu tiên, tạo 1 class Str, nơi chứa các helper
Các helper sẽ được gọi thông qua class này. các method sẽ được khai báo là một public static method.
```php
<?php

class Str
{
    public static function __callStatic($name, $arguments)
    {
        if (function_exists("mb_$name")) {
            return call_user_func_array("mb_$name", $arguments);
        }
        if (function_exists($name)) {
            return call_user_func_array($name, $arguments);
        }
    }
}
```

Khi một static method chưa được định nghĩa được gọi, hàm \_\_callStatic sẽ kiểm tra xem có tồn tại hàm mb + method hay không, nếu có có thì return về hàm đó. nếu không thì kiểm tra tồn tại hàm và gọi hàm đó.

### lấy độ dài của chuỗi

```php
public static function length($value, $multibyte = true)
{
    return $multibyte ? mb_strlen($value) : strlen($value);
}
```
VD:

```rust
echo Str::length('abc'); // 3
echo Str::length('気をつけてね。'); // 7
echo Str::length('気をつけてね。', false); // 21
```

### Xoá khoảng trắng phía trước chuỗi

```php
public static function ltrim($value, $fullsize = true)
{
    if ($fullsize) {
        $value = preg_replace('/^[\s]+/u', '', $value);
    }

    return ltrim($value);
}
```

Hàm sẽ loại bỏ các ký tự khoảng trắng fullwidth(　) phía trước chuỗi,
sau đó sử dụng hàm ltrim của php để loại bỏ các ký tự \n\r\t\v\x00 phía trước chuỗi

### Xoá khoảng trắng phía sau chuỗi

Tương tự ltrim, hàm rtrim sẽ xoá các khoảng trắng kể cả fullwidth phía sau chuỗi.

```perl
public static function rtrim($value, $fullsize = true)
{
    if ($fullsize) {
        $value = preg_replace('/[\s]+$/u', '', $value);
    }

    return rtrim($value);
}
```

### Xoá khoảng trắng hai đầu chuỗi

Sử dụng hàm lrtrim và rtrim ở trên để xoá khoảng trắng khỏi hai đầu chuỗi

```php
public static function trim($value, $fullsize = true)
{
    if ($fullsize) {
        $value = self::rtrim(self::ltrim($value));
    }

    return trim($value);
}
```

### Đảo ngược chữ hoa thành chữ thường và ngược lại
Hàm chỉ hoạt động với các ký tự ASCII
```javascript
public static function invertCase($value)
{
    return strtolower($value) ^ strtoupper($value) ^ $value;
}
echo Str::invertCase('aBCd'); // 'AbcD'
```
### Tìm kiếm một chuỗi trong một chuỗi cho trước
Trả về phần còn lại của một chuỗi sau lần xuất hiện đầu tiên của một giá trị nhất định.

```perl
public static function after($subject, $search)
{
    $offset = self::strpos($subject, $search) + self::strlen($search);

    return self::substr($subject, $offset);
}
echo Str::after('Hello. Nice to meet you!', 'meet'); // return ' you!'
echo  Str::after('Hello. Nice to meet you!', 'o'); // return '. Nice to meet you!'
```

Trả về phần còn lại của một chuỗi sau lần xuất hiện cuối cùng của một giá trị nhất định.

```php
public static function afterLast($subject, $search)
{
    $offset = self::strrpos($subject, $search) + self::strlen($search);

    return self::substr($subject, $offset);
}
echo Str::after('Hello. Nice to meet you!', 'meet'); // return ' you!'
echo  Str::after('Hello. Nice to meet you!', 'o'); // return 'u!'

```
Lấy phần của một chuỗi trước lần xuất hiện đầu tiên của một giá trị nhất định.

```html:html
public static function before($subject, $search)
{
    return self::substr($subject, 0, self::strpos($subject, $search));
}
echo Str::before('Hello. Nice to meet you!', 'meet'); // return 'Hello. Nice to '
echo  Str::before('Hello. Nice to meet you!', 'o'); // return 'Hell'
```

Trả về mọi thứ trước lần xuất hiện cuối cùng của giá trị đã cho trong một chuỗi.

```html:html
public static function beforeLast($subject, $search)
{
    return self::substr($subject, 0, self::strrpos($subject, $search));
}
echo Str::before('Hello. Nice to meet you!', 'meet'); // return 'Hello. Nice to '
echo  Str::before('Hello. Nice to meet you!', 'o'); // return 'Hello. Nice to meet y'
```
### Chuyển đổi chuỗi sang dạng StudlyCaps
Còn được gọi là kiểu PascalCase, ngụ ý rằng viết hoa đầu tiên của mỗi từ khóa con.

```perl
public static function studly($value)
{
    $words = explode(' ', str_replace(['-', '_'], ' ', $value));

    $studlyWords = array_map(function ($word) {
        return ucfirst($word);
    }, $words);

    return implode($studlyWords);
}
echo Str::studly('hello_world'); // return 'HelloWorld'
```
### Chuyển đổi chuỗi sang dạng camelCase(kiểu lạc đà)

```php
public static function camel($value)
{
    return lcfirst(self::studly($value));
}
echo Str::camel('hello_world'); // return 'helloWorld'
```
### Chuyển chuỗi đã cho thành chữ hoa tiêu đề
```markdown
public static function title($value)
{
    return mb_convert_case($value, MB_CASE_TITLE, 'UTF-8');
}
echo Str::title('hello world'); // return 'Hello World'
echo Str::title('hello_world'); // return 'Hello_World'
```
### Tách một chuỗi thành nhiều phần bằng các ký tự viết hoa
```perl
public static function ucsplit($string)
{
    return preg_split('/(?=\p{Lu})/u', $string, -1, PREG_SPLIT_NO_EMPTY);
}
$string = Str::ucsplit('HelloWorld')); // [0 => 'Hello', 1 => 'World']
```
### Chuyển chuỗi đã cho thành chữ hoa tiêu đề cho mỗi từ
```javascript
public static function headline($value)
{
    $parts = explode(' ', $value);

    $parts = count($parts) > 1
        ? $parts = array_map([static::class, 'title'], $parts)
        : $parts = array_map([static::class, 'title'], static::ucsplit(implode('_', $parts)));

    $collapsed = str_replace(['-', '_', ' '], '_', implode('_', $parts));

    return implode(' ', array_filter(explode('_', $collapsed)));
}
 echo Str::headline('hello_world')); // return 'Hello World'
 echo Str::headline('Hello World')); // return 'Hello World'
```
###  Chuyển đổi chuỗi sang dạng snake_case (dạng con rắn)
```php
public static function snake($value, $delimiter = '_')
{
    if (! ctype_lower($value)) {
        $value = preg_replace('/\s+/u', '', ucwords($value));

        $value = static::lower(preg_replace('/(.)(?=[A-Z])/u', '$1'.$delimiter, $value));
    }

    return $value;
}
echo Str::snake('HelloWorld'); //return 'hello_world'
echo Str::snake('Hello World'); //return 'hello_world'
```
### Chuyển đổi chuỗi sang dạng kebab-case
```php
public static function kebab($value)
{
    return static::snake($value, '-');
}
echo Str::snake('Hello World', '-'); //return 'hello-world'
```
### Tạo một "slug" thân thiện với URL từ một chuỗi đã cho
```php
public static function slug($title, $separator = '-')
{
    $flip = $separator === '-' ? '_' : '-';

    $title = preg_replace('/['.preg_quote($flip).']+/u', $separator, $title);

    $title = str_replace('@', $separator.'at'.$separator, $title);

    $title = preg_replace('/[^'.preg_quote($separator).'\pL\pN\s]+/u', '', strtolower($title));

    $title = preg_replace('!['.preg_quote($separator).'\s]+!u', $separator, $title);

    return self::trim($title, $separator);
}
echo Str::slug('Hello World'); // return 'hello-word'
echo Str::slug('Hello@World');; // return 'hello-at-word'
echo Str::slug('?^!#$%^&*()~`"H?ello@World'); // return 'hello-at-word'
```

### Kiểm tra một chuỗi có phải toàn là ký tự tiếng nhật hay không
```shell
public static function isJapanese($value)
{
    return !!preg_match('/^[\p{Katakana}\p{Hiragana}\p{Han}]+$/u', $value);
}

echo Str::isJapanese('気をつけてね'); // true
echo Str::isJapanese('気をつけてね。'); // false
echo Str::isJapanese('abc'); // false
```

### Kiểm tra một chuỗi có phải toàn là ký tự Furigana hay không
```shell
public static function isFurigana($value)
{
        return !!preg_match('/^[\p{Katakana}\p{Hiragana}]+$/u', $value);
}

echo Str::isFurigana('気をつけてね'); // false
echo Str::isFurigana('つけてね'); // true
echo Str::isFurigana('abc'); // false
```

### Kiểm tra một chuỗi có phải toàn là ký tự Hiragana hay không
```perl
public static function isHiragana($value)
{
        return !!preg_match('/^[\p{Hiragana}]+$/u', $value);
}

echo Str::isHiragana('気'); // false
echo Str::isHiragana('片仮名'); // false
echo Str::isHiragana('つけてね'); // true
echo Str::isHiragana('abc'); // false
```

### Kiểm tra một chuỗi có phải toàn là ký tự Katakana hay không
```perl
public static function isKatakana($value)
{
        return !!preg_match('/^[\p{Katakana}]+$/u', $value);
}

echo Str::isKatakana('気'); // false
echo Str::isKatakana('片仮名'); // false
echo Str::isKatakana('つけてね'); // false
echo Str::isKatakana('カタカナ'); // true
echo Str::isKatakana('abc'); // false
```
### Kiểm tra một chuỗi có phải toàn là ký tự Hankaku(Half-width kana) hay không
```rust
public static function isHankakus($value)
{
        return !!preg_match('/^[\p{Han}]+$/u', $value);
}

echo Str::isHankakus('気'); // 
echo Str::isHankakus('片仮名'); // true
echo Str::isHankakus('つけてね'); // false
echo Str::isHankakus('カタカナ'); // false
echo Str::isHankakus('abc'); // false
```

Uiza, cũng khá dài rồi, để phần 2 viết tiếp vậy. 
Thank for watching 😘

Tham khảo file full [tại đây ](https://github.com/nguyenthemanh2601/pure_php/blob/master/core/Support/Helper/Str.php).