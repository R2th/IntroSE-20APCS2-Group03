# Giới thiệu
Cách đây không lâu, một package có tên là Laravel Tag Helper được **Marcel Pociot**
 tác giả khá nổi tiếng trong cộng đồng Laravel ra mắt. Package này cho phép bạn đăng ký một custom "tag helper" trong project Laravel. Các helpers này có thể tuỳ biến HTML. 
 Ví dụ thay vì đoạn HTML dưới đây
 ```html
<form method="post">
    <input type="hidden" name="_method" value="DELETE">
    <input type="hidden" name="_token" value="csrf-token">    
</form>
```
Bạn có thể sử dụng "tag helper" để chuyển thành đoạn code ngắn gọn hơn
```html
<form csrf method="delete">
</form> 
```
# Cài đặt
Cài đặt package thông qua composer:
```
composer require beyondcode/laravel-tag-helper
```
# Cách sử dụng
Chúng ta có thể tự tạo Tag Helper theo cách của riêng mình bằng cách tạo một class, class này extends từ class ```BeyondCode\TagHelper\Helper```. Bên trong class này, chúng ta có thể tự định nghĩa phần tử và thuộc tính HTML nào sẽ được helper kích hoạt.

Ví dụ:
```php
<?php

namespace BeyondCode\TagHelper\Helpers;

use BeyondCode\TagHelper\Helper;
use BeyondCode\TagHelper\Html\HtmlElement;

class CustomTagHelper extends Helper
{
    protected $targetAttribute = 'custom';
    protected $targetElement = 'div';

    public function process(HtmlElement $element)
    {
        // Manipulate the DOM element
    }
}
```
Để sử dụng được class này, chúng ta phải đăng ký trong ```AppServiceProvider``` bằng cách thêm đoạn code này vào bên trong hàm ```boot()```
```php
TagHelper::helper(CustomTagHelper::class);
```
## Bind helper vào phần tử và thuộc tính HTML
Như class ví dụ ở phía trên, chúng ta có thể sử dụng 2 thuộc tính ```$targetAttribute``` và ```$targetElement``` để xác định xem phần tử HTML nào (```div, form, input,...```) và thuộc tính (```<div custom="value />, <form method="post">```) sẽ được bind helper vào.
Nếu không có thuộc tính ```$targetElement``` thì tất cả các phần tử HTML với thuộc tính là ```custom``` sẽ gọi đến helper.
## Thao tác với DOM
Khi đã xác định được một hay nhiều phần tử HTML, phương thức ```process``` sẽ được kích hoạt. Chúng ta có thể thao tác với các DOM trong phương thức này, một số tính năng có sẵn:
### Thay đổi HTML Tag
Trong ví dụ dưới đây, helper sẽ được bind vào phần tử HTML ```<my-custom-link href="/"></my-custom-link>```. Trong phương thức ```process```, chúng ta có thể thay đổi tag thành ```<a>``` sau đó render thành một link.
```php
<?php

namespace BeyondCode\TagHelper\Helpers;

use BeyondCode\TagHelper\Helper;
use BeyondCode\TagHelper\Html\HtmlElement;

class CustomLink extends Helper
{
    protected $targetElement = 'my-custom-link';

    public function process(HtmlElement $element)
    {
        $element->setTag('a');
    }
}
```
### Thao tác với các thuộc tính của HTML
You can also add, edit or delete HTML element attributes.
Chúng ta có thể thêm, sửa hoặc xoá thuộc tính của phần tử HTML.

Trong ví dụ dưới đây, helper sẽ được bind vào tất cả các thẻ ```<a>```, sau đó các thẻ này sẽ được cập nhật lại thuộc tính ```href```, xoá ```route``` và thêm thuộc tính ```title```.

```php
<?php

namespace BeyondCode\TagHelper\Helpers;

use BeyondCode\TagHelper\Helper;
use BeyondCode\TagHelper\Html\HtmlElement;

class CustomLink extends Helper
{
    protected $targetAttribute = 'route';
    
    protected $targetElement = 'a';

    public function process(HtmlElement $element)
    {
        $element->setAttribute('href', route($element->getAttribute('route')));
        
        $element->removeAttribute('route');
        
        $element->setAttribute('title', 'This is a link.');
    }
}
```
### Thao tác với Outer / Inner Text
Giả sử chúng ta tìm tất cả thẻ ```form``` có thuộc tính là ```add-hidden-field```, sau đó thêm đoạn inner text vào bên trong thẻ.
```php
<?php

namespace BeyondCode\TagHelper\Helpers;

use BeyondCode\TagHelper\Helper;
use BeyondCode\TagHelper\Html\HtmlElement;

class CustomLink extends Helper
{
    protected $targetAttribute = 'add-hidden-field';
    
    protected $targetElement = 'form';

    public function process(HtmlElement $element)
    {
        $element->removeAttribute('add-hidden-field');
        
        $element->appendInnerText('<input type="hidden" name="hidden" />');
        
        // $element->prependInnerText('');
        // $element->setInnerText('');
    }
}
```

## Truyền biến vào bên trong helper
Chúng ta có thể truyền thuộc tính vào bên trong helper tương tự như truyền thuộc tính vào phần tử HTML. Tuy nhiên, ở thời điểm hiện tại chúng ta chưa thể truy cập trực tiếp vào các biến bên trong helper mà chỉ có thể lấy thông qua dạng ```string```.
Ví dụ, để lấy giá trị của thuộc tính ```method``` 
```html
<form method="post"></form>
```
Chúng ta có thể sử dụng phương thức ```getAttribute()``` bên trong class.
```php
<?php

namespace BeyondCode\TagHelper\Helpers;

use BeyondCode\TagHelper\Helper;
use BeyondCode\TagHelper\Html\HtmlElement;

class CustomForm extends Helper
{
    protected $targetElement = 'form';

    public function process(HtmlElement $element)
    {
        $formMethod = $element->getAttribute('method');
    }
}
```
### Với Blade Template
Chúng ta có thể sử dụng phương thức ```getAttributeForBlade``` helper sẽ tự sinh ra HTML theo dạng output của Blade Template.
Ví dụ:
```html 
<a route="home">Home</a>
```
```php
<?php

namespace BeyondCode\TagHelper\Helpers;

use BeyondCode\TagHelper\Helper;
use BeyondCode\TagHelper\Html\HtmlElement;

class CustomForm extends Helper
{
    protected $targetElement = 'a';

    protected $targetAttribute = 'route';

    public function process(HtmlElement $element)
    {
        $element->setAttribute('href', "{{ route(" . $element->getAttributeForBlade('route') . ") }}");
        
        $element->removeAttribute('route');
    }
}
```
Output theo Blade Template:
```html
<a href="{{ route('home') }}">Home</a>
```
Với trường hợp truyền biến vào bên trong thuộc tính ```route```, chúng ta chỉ cần thêm ```:``` vào phía trước thuộc tính.
```html
<a :route="$routeVariable">Home</a>
```
Sẽ được output
```html
<a href="{{ route($routeVariable) }}">Home</a>
```


## Một số helper có sẵn trong package
Trong package này, tác giả đã xây dựng sẵn một số package được sử dụng nhiều như ```csrf, form,...```
### CSRF Helper
Thêm thuộc tính ```csrf``` vào bên trong bất kỳ form nào
```html
<form csrf method="post">

</form>
```
đoạn code trên sẽ trở thành:
```html
<form method="post">
    <input type="hidden" name="_token" value="csrf-token">    
</form>
```
Chú ý: ```csrf``` phải được để cùng trên một dòng với các thuộc tính khác của thẻ HTML
### Form
```html
<form method="delete">

</form>
```
Khi trong form chứa phương thức khác với ```GET``` hoặc ```POST```, helper này sẽ tự động thêm một trường ẩn vào bên trong form.
```html
<form method="post">
    <input type="hidden" name="_method" value="DELETE">    
</form>
```
### Link
```html
<a route="home">Home</a>

<a route="profile" :route-parameters="[$user->id()]">Home</a>
```
Khi bên trong thẻ ```<a>``` chứa thuộc tính ```route```, helper sẽ tự động gán ```route``` phù hợp vào thuộc tính ```href``` của thẻ.
Sẽ được output:
```html
<a href="{{ route('profile', [$user->id])}}">Home</a>

```

# Kết luận
Trên đây là những gì mình tìm hiểu được về package này. Hiện nay package vẫn đang ở giai đoạn khá sơ khai vì vậy một số tính năng vẫn khá khó dùng như truyền biến vào bên trong các helper. Hy vọng package sẽ được tác giả và cộng đồng ủng hộ nhiều hơn nữa trong thời gian tới.
Xem chi tiết tại repo: [](https://github.com/beyondcode/laravel-tag-helper/blob/master/README.md)