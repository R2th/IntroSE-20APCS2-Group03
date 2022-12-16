![](https://images.viblo.asia/abfa6790-8523-4980-82cb-21602e70cbd6.png)
## I. Giới thiệu
PHP là một ngôn ngữ lập trình rất phổ biến và vẫn là một lựa chọn khá phổ biến để xây dựng các ứng dụng web. Chúng ta đã sẽ tìm hiểu về I18N trong demo hôm nay. Sơ qua về  Zend Framework là framework PHP hướng đối tượng, mã nguồn mở bao gồm hơn 60 package hỗ trợ, mỗi package phục vụ một mục đích cụ thể. Hôm nay chúng ta sẽ tìm hiểm về zend-mvc-i18n là 1 package đươc tích hợp zend-i18n trong mô hình MVC. Vì hầu hết các ứng dụng web mà chúng ta tạo theo mô hình MVC, chúng ta sẽ sử dụng zend-mvc-i18n trong hướng dẫn này.
## II. Hướng dẫn
### 1. Cài đặt:
 Mở  cửa sổ `console`, bạn có thể cài đặt Zend package bằng câu lệnh 
```
composer require zendframework/zendframework
```
 Tiếp theo, chúng ta sẽ cài đặt `I18N` trên `zendframework` phần chính của chúng ta tìm hiểu.
```
composer require zendframework/zend-mvc-i18n
```
 `Composer` là một công cụ quản lý sử dụng để cài đặt tất cả các package cần thiết của Zend Framework. Nếu bạn chưa cài đặt composer trên máy của mình, bạn có thể tải xuống [tại đây](https://getcomposer.org/).
Trong hướng dẫn này. Chúng ta sẽ tạo 1 project demo theo cấu trúc cơ bản của zend như sau: 

![](https://images.viblo.asia/4befdc90-31b9-47d7-a16d-3ca989832a9d.png)

 Có ba phần rất quan trọng đối chúng ta cần tập trung vào là: `languages`,` public` và `src`. <br>
### 2.Translator object
`Zend-i18n` là bộ dịch hoàn chỉnh hỗ trợ tất cả các định dạng chính. Nó cũng bao gồm các tính năng cơ bản của một translator object. Nhiệm vụ tiếp theo của chúng ta là xác định đối tượng `Translator`. Tiếp theo, chúng ta cần cấu hình các phần như sau:<br>
* Translation format.<br>
* Translation resource location.<br>
* Translation resource file.<br>

Có khoảng 4 loại format thường được sử dụng là: <br>
* PHP arrays (store translated texts in PHP arrays) <br>
* gettext (translated texts as normal texts in a file) <br>
* Tmx (an XML standard called Translation Memory Exchange) <br>
* Xliff (XML-based file format) <br>

Sử dụng `array` trong PHP không phải là cách thực hành tối ưu nhất. Chúng ta buộc phải  xử lý các cần chuỗi dịch ở source. `Gettext` là phương pháp dễ nhất và có lẽ là phổ biến nhất - do đó chúng ta sẽ sử dụng nó trong ứng dụng này. Tuy nhiên, mình sẽ chỉ cho bạn cách lưu các văn bản dịch theo định dạng `xliff` và `Tmx`.<br>
Khi bạn đã tạo các tệp với các `translate text`, bạn cần đặt chúng ở nơi dễ tìm. Một số nơi thường dùng để lưu nó là:<br>
* `Application/language.`<br>
* `data/language.`<br>

 Mình thường sử dụng `Application/language` để lưu các tệp translate.<br>
 Bây giờ chúng ta sẽ tạo `Translator object`:<br>
 ```
 <?php
use Zend\I18n\Translator\Translator;

return Translator::factory([
    'translation_file_patterns' => [
        [
            'type'     => 'gettext',
            'base_dir' => __DIR__ . '/../languages',
            'pattern'  => '%s.mo',
        ],
    ],
]);
```
### 3. Translating messages
Sau khi tạo đối tượng `Translator`, bây giờ chúng ta có thể chuyển sang dịch tin nhắn. Điều này có thể được thực hiện bằng cách sử dụng phương thức dịch của `Translator`. Dịch văn bản được thực hiện trong view. Trong demo của chúng ta, view là tệp `index.php` trong thư mục `public`. Trước khi sử dụng `Translato`r thì ta cần đính kèm theo `translator.php` trong file `index.php`.

Định dạng của phương thức dịch là:
```
$translator->translate($message, $textDomain, $locale);
```
Các tham số của nó thể hiện như sau:

* `$ message` - tin nhắn sẽ được dịch. <br>
* `$ textDomain` - nơi dịch text. Đây là một tham số tùy chọn. Giá trị mặc định là “default”<br>
* `$ locale` -  Đây là một tham số tùy chọn. Nếu không được đặt, ngôn ngữ mặc định sẽ được sử dụng<br>
Một ví dụ:
```
$translator->translate("Translated text from a custom text domain.", "customDomain",”de_DE“);
```
Dù sao, trong demo của chúng ta, chúng ta sẽ sử dụng phương thức dịch khác đi một chút. Không  sử dụng nhiều location trong cùng 1 view. Và chúng ta có thể đặt language bằng cách sử dụng phương thức setLocale ().<br>
Cuối cùng, fie index.php của chúng ta sẽ như thế này:
```
<?php
include __DIR__ . '/../vendor/autoload.php';

$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
/** @var Zend\I18n\Translator\Translator $translator */
$translator = include __DIR__ . '/../src/translator.php';
$translator->setLocale($lang);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <p><?php echo $translator->translate('Hello my friend'); ?></p>
        <p><?php echo $translator->translate('How are you?'); ?></p>
        <p><?php echo $translator->translate('My name is Adam Crik'); ?></p>
    </body>
</html>
```
File `fr.po` của chúng ta sẽ như thế này:
```
#: ../public/index.php:1
msgid "Hello my friend"
msgstr "Bonjour, mon ami"


#: ../public/index.php:2
msgid "How are you?"
msgstr "Comment allez-vous?"

#: ../public/index.php:3
msgid "My name is Adam Crik"
msgstr "Je m'appelle Adam Crik"
```
Nếu chúng ta sử dụng `XLIFF`. Thì nó sẽ dài hơn:
```
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0"
 srcLang="en-US" trgLang="fr">
 <file id="f1">
  <unit id="1">
   <segment>
    <source>Hello my friend</source>
    <target>Bonjour, mon ami</target>
   </segment>
  </unit>
  <unit id="2">
   <segment>
    <source>How are you?</source>
    <target>Comment allez-vous?</target>
   </segment>
  </unit>
  <unit id="3">
   <segment>
    <source>My name is Adam Crik</source>
    <target>Je m'appelle Adam Crik</target>
   </segment>
  </unit>
 </file>
</xliff>
```
Nếu chúng ta sử dụng định dạng `TMX`, thì cấu hinh sẽ như sau:
```
<tmx version="1.4">
  <body>
    <tu>
      <tuv xml:lang="en">
        <seg>Hello my friend</seg>
      </tuv>
      <tuv xml:lang="fr">
        <seg>Bonjour, mon ami</seg>
      </tuv>
  <tuv xml:lang="en">
        <seg>How are you?</seg>
      </tuv>
      <tuv xml:lang="fr">
        <seg>Comment allez-vous?</seg>
      </tuv>
  <tuv xml:lang="en">
        <seg>My name is John Doe</seg>
      </tuv>
      <tuv xml:lang="fr">
        <seg>Je m'appelle John Doe</seg>
      </tuv>
    </tu>
  </body>
</tmx>
```
Như vậy là chúng ta đã cấu hình xong 1 `translate object` rồi :). Cám ơn các bạn đã bài viết. <br>
Mọi chia sẽ hoặc thắc mắc hãy để ở phần comment góp ý nhằm năng cao chất lượng bài viết.<br>
## III. Tài liệu tham khảo
* `Trang chủ`: https://framework.zend.com/<br>
* `Tiki github`: https://github.com/zendframework/zend-mvc-i18n<br>
* `Cộng đồng medium`: https://medium.com/