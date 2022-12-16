Như đã hứa hẹn, tháng này mình xin chia sẻ về làm thế nào để chúng ta có thể tự tạo Blade directives để tiện đường sử dụng trong Laravel project. Nếu bạn là beginner với Laravel, bạn có thể tìm hiểu Blade directives là gì và một vài điều cơ bản ở [đây](https://laravel.com/docs/5.6/blade) hoặc ngó qua [bài viết trước của mình](https://viblo.asia/p/mot-vai-blade-directives-tien-ich-trong-laravel-co-the-ban-it-dung-jvEla4AYZkw) về những Blade directives hữu ích mà chúng ta ít sử dụng.
Bây giờ thì chúng ta thử tự tạo Blade directive cho riêng mình nhé! 

![](https://images.viblo.asia/cdca00b0-c8cc-4e2f-b853-66aa12500892.jpg)

## Vấn đề
Giả sử nếu bạn muốn xuất ra một đoạn HTML bên trong 1 trang HTML như sau:
```html
<p>Some custom HTML</p>
```
Thì thông thường chúng ta sẽ viết riêng đoạn HTML đó ra một file rồi sử dụng *@include* nó vào trang HTML mà bạn cần, tuy nhiên nếu bạn có thể định nghĩa một directive blade kiểu *@customHtml* rồi dùng đi dùng lại nó nhiều lần thì sao?

## Giải pháp
Để làm được việc này bạn cần định nghĩa chsung bên dưới AppServiceProvider ở method boot như sau:
```php
Blade::directive(‘customHtml’, function($expression)
{
    return "<p>Some custom HTML</p>";
});
```
> Chú ý: Nhớ hãy import class Balde vào provider nhé

Trên chỉ là một ví dụ sơ khởi để bạn có thể làm quen với việc tự tạo ra một directive cho riêng mình. Xong thực tế trong dự án của bạn có rất nhiều những thứ phức tạp, ví dụ như bạn thường xuyên phải dùng đi dùng lại những textarea, những ô input, những select box với nhiều điều kiện phức tạp, loằng ngoằng khó nhớ, và bạn sẽ nghĩ còn gì tốt hơn là cách sử dụng kiểu viết riêng nó ra một file xong include như truyền thống, xong thay vì thế bạn chỉ cần viết đúng một cú pháp như sau
```
@input
``` 
thay vì 
```
@include(‘cms.content.forms.fields.input’)
```
thì mình nghĩ, lúc này bạn sẽ suy nghĩ lại đấy!
Và tất nhiên rồi, bạn phải định nghĩa derective của bạn trong AppServiceProvider như sau:
```php
Blade::directive('input', function($expression)
{
    $view = ‘cms.content.forms.fields.input’; // Path to your view

    if (!$expression)
    {
        $expression = '([])';
    }

    return "<?php echo \$__env->make('{$view}', array_except(get_defined_vars(), ['__data', '__path']))->with{$expression}->render(); ?>";
});
```
Thực ra là ví dụ trên chúng ta đang làm theo kiểu include như truyền thống, có đôi chút phức tạp hơn để chúng ta có thể thêm những điều kiện khác vào ô input, ví dụ như:
```php
@input([‘name’ => ‘slug’])
```
Giờ chúng ta có thể thêm nhiều những điều kiện khác vào input của chúng ta, ví dụ như định nghĩa id, class data cho input đó.
## Tóm lại
- Chúng ta có thể mở rộng blade bằng cách tự định nghĩa drective như trên.
- Những chỉ thị được dùng bằng cách gọi tên nó ra với dấu @ ở phía trước.
- Directive của bạn có thể viết được mã PHP, đó chính là một trong những tiện ích vô cùng lớn khi tự định nghĩa directive cho riêng mình.
- Một điều nữa cần nhớ là Laravel sẽ cache lại view, do đó hãy cẩn thận với việc định nghĩa cho directive của bạn.
## Reference:
https://engageinteractive.co.uk/blog/custom-blade-directives-in-laravel-5