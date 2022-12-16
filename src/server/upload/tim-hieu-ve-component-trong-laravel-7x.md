Chào tất cả mọi người, như vậy là chúng ta lại gặp nhau sau chu kỳ một tháng nữa rồi. <br>
Các bạn biết đấy, laravel là một framework có thể nói là rất mạnh cho các lập trình viên PHP.<br>
Riêng mình thì cũng đang bon chen với PHP và cũng có lấn sân sang laravel nên cũng hay cập nhật tình hình của framework này. Và mới đây thì các nhà phát triển đã cho ra một version mới của anh em nhà laravel là 7.x, mình cũng lướt tạm qua xem em nó thế nào thì thấy có một thứ rất là nổi bật trong version này nên quyết định chia sẻ với mọi người về nó - Component trong laravel ở thế hệ 7.x.<br>
# Component là gì?
Component theo như mình hiểu là chúng ta sẽ tạo ra những đoạn html chung để có thể tái sử dụng được chúng mà không cần phải thực hiện combo thần thánh Ctrl + C and Ctrl + V :)<br>
Và có 2 loại component mà chúng ta có thể gặp phải: class based components và anonymous components (mình để theo nguyên văn english luôn chớ dịch ra tiếng việt cái tên này nó kỳ kỳ sao á)<br>
## Class based components
### Tạo mới
Để tạo một class based component thì chúng ta sẽ sử dụng `make:component` command.<br>
Cụ thể sẽ là: `php artisan make:component ComponentName`<br>
Lệnh trên sẽ tạo ra một file có tên là `ComponentName.php` trong thư mục `App\View\Components`. Lệnh này cũng tạo thêm một blade template tên là `component-name.blade.php` trong thư mục `resources/views/components`.<br>
Ở đây mình tạo một component có tên là Profile bằng câu command `php artisan make:component Profile`<br>
Và mình có được một file `Profile.php` với nội dung như sau:
```php
<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Profile extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.profile');
    }
}
```
Và mình cũng có một blade template tương ứng `profile.blade.php` như sau:
```php
<div>
    <!-- I begin to speak only when I am certain what I will say is not better left unsaid - Cato the Younger -->
</div>
```
### Sử dụng
Sau khi đã tạo component thì các bạn có thể sử dụng nó bằng cách dùng thẻ `<x-component-name/>` ở bất kỳ đâu trong file blade của bạn.<br>
Trong ví dụ của mình sẽ là `<x-profile/>` như sau:
```php
<div class="flex-center position-ref full-height">
    <div class="content">
        <x-profile/>
    </div>
</div>
```
### Truyền dữ liệu vào component
Các bạn có thể truyền dữ liệu vào các component tương tự như các thuộc tính HTML. Trong đó, với các dữ liệu đã có giá trị xác định thì được truyền như các thuộc tính HTML đơn giản. Còn đối với dữ liệu là các biểu thức hoặc là biến thì các bạn cần phải thêm tiền tố `:` ở trước tên thuộc tính.<br>
Ví dụ: với component Profile mình đã tạo ở trên thì mình sẽ truyền cho nó 1 biến url để lưu đường dẫn đến hình ảnh và 1 biến type để xem đó là loại profile nào.<br>
```php
// welcome.blade.php
@php
$type = 'cat';
@endphp
<x-profile url="http://lorempixel.com/800/400/cats/Faker/" :type="$type"/>
```
Tiếp đó, các bạn vào trong class Component và thêm các thuộc tính vừa tạo vào trong hàm khởi tạo `__contruct`. Với mình sẽ là:<br>
```php
    // Profile.php
    /**
    * @var string
    */
    public $url;

    /**
    * @var string
    */
    public $type;

    /**
     * Create a new component instance.
     *
     * @param  string  $url
     * @param  string  $type
     *
     * @return void
     */
    public function __construct($url, $type)
    {
        $this->url = $url;
        $this->type = $type;
    }
```
Sau khi đã khởi tạo xong thì các bạn vào trong view blade của component để sử dụng các thuộc tính đó.<br>
```php
// profile.blade.php
<div class="card" style="width: 18rem;">
    <img src="{{ $url }}" class="card-img-top" alt="...">
  	<div class="card-body">
	    <h5 class="card-title">{{ $type }}</h5>
	    <p class="card-text">This is cat</p>
	    <a href="#" class="btn btn-primary">Go somewhere</a>
  	</div>
</div>
```
Và đây là kết quả mình thu được sau các bước trên.<br>
![](https://images.viblo.asia/48f11266-da51-4b10-b20d-60d75f65e4c4.png)
<br>
### Phương thức trong component
Tương tự như với các thuộc tính thì component cũng có các phương thức của riêng nó. Và để gọi các phương thức ở blade của component thì các bạn có thể gọi nó như một biến bằng cách thêm ký tự `$` vào đầu tên biến. <br>
Cú pháp cụ thể sẽ là: `$methodName('Các tham số được đưa vào ở đây')`.<br>
Với các phương thức không có bất kỳ tham số nào thì các bạn có thể gọi nó như là một biến bình thường mà thôi, không cần phải có dấu đóng, mở ngoặc làm gì cho mất công nhấn Shitft :). Thật là quá thông minh đi phải không nào.<br>
Như trong ví dụ trên thì component Profile của mình sẽ có 2 phương thức: 1 phương thức là `getOwner` với tham số là tên của chủ sở hữu và 1 phương thức là `getWeight` để lấy cân nặng. Như vậy thì trước tiên mình cần phải khai báo 2 phương thức trên trong class component Profile.<br>
```php
    // Profile.php
    /**
    * Get owner.
    *
    * @param  string  $name
    *
    * @return string
    */
    public function getOwner(string $name)
    {
        return 'This is ' . $name . "'s " . $this->type;
    }

    /**
    * Get weight.
    *
    * @return float
    */
    public function getWeight()
    {
        switch ($this->type) {
            case 'cat':
                return 3.6;
            case 'dog':
                return 12;
            default:
                return 65;
        }
    }
```
Tiếp đó các bạn move sang view blade profile.blade.php để sử dụng nó.<br>
```php
// profile.blade.php
...
<p class="card-text">{{ $getOwner('Tan') }}</p>
<p class="card-text">Weight: {{ $getWeight }}</p>
...
```
And this is my result  - chém tý english không quên mất :) :)<br>
![](https://images.viblo.asia/f75272c5-b8d9-4053-a260-eff5978d5ffe.png)
<br>
### Quản lý attributes
Đôi khi bạn có thể cần chỉ định các thuộc tính HTML bổ sung, chẳng hạn như  thuộc tính `class`, nó không phải là một phần của dữ liệu cần thiết để khởi tạo một component. Trong trường hợp này bạn sẽ cần sử dụng biến `$attributes` để có thể truy cập đến các thuộc tính này. Nói thì có vẻ mơ hồ nên mình sẽ lấy ví dụ minh họa để các bạn dễ hiểu:<br>
Ví dụ với thẻ `<x-profile />` của mình. Bây giờ mình sẽ thêm cho nó 2 thuộc tính là name và class.<br>
```php
// welcome.blade.php
<x-profile url="http://lorempixel.com/800/400/cats/Faker/" :type="$type" name="image_url" class="bg-warning"/>
```
Các bạn thấy đấy, ở đây class component Profile của mình không khởi tạo 2 thuộc tính name và class. Nên giờ mình sẽ dùng biến `$attributes` để nhận 2 thuộc tính này từ thẻ component. Cụ thể nó sẽ như sau:<br>
```php
// profile.blade.php
...
<img src="{{ $url }}" class="card-img-top" alt="..." name="{{ $attributes['name'] }}">
<div class="card-body {{ $attributes['class'] }}">
...
```
And
<br>
![](https://images.viblo.asia/cbf614ef-a532-4d79-bf3d-b3c06c9063b0.png)
<br>
Như các bạn đã thấy thì ở component đã nhận được class bg-warning ở trển truyền xuống :)<br>
hoặc là các bạn cũng có thể truyền thêm class vào cho nó bằng cách dùng hàm merge với biến `$attributes`.<br>
`<div {{ $attributes->merge(['class' => 'card-body text-white']) }}></div>`<br>
Với dữ liệu mà mình làm nãy giờ thì mình sẽ được thẻ div với các thuộc tính như sau:<br>
`<div class="card-body text-white bg-warning" name="image_url"></div>`<br>
### Slots
Khi bạn muốn bổ sung thêm một số nội dung vào trong component thì các bạn có thể gửi nó thông qua việc sử dụng `slot` trong component.<br>
Giả sử mình muốn bổ sung thêm nội dung vào trong profile component như sau:
```php
// profile.blade.php
<div class="card" style="width: 18rem;">
    <img src="{{ $url }}" class="card-img-top" alt="..." name="{{ $attributes['name'] }}">
  	<div class="card-body {{ $attributes['class'] }}">
	    <h5 class="card-title">{{ $type }}</h5>
	    <p class="card-text">{{ $getOwner('Tan') }}</p>
	    <p class="card-text">Weight: {{ $getWeight }}</p>
	    <a href="#" class="btn btn-primary">Go somewhere</a>
  	</div>
  	<span>{{ $slot }}</span>
</div>
<span>{{ $description ?? '' }}</span>
```
Thì bây giờ nếu muốn sử dụng slot mình sẽ sử dụng thẻ `x-slot` kèm theo slot name trong file `welcome.blade.php` như sau:<br>
```php
// welcome.blade.php
<x-profile url="http://lorempixel.com/800/400/cats/Faker/" :type="$type" name="image_url" class="bg-warning">
    <x-slot name="description">
        Cats are small and carnivorous mammals, living with humans, bred to hunt for pests or pets.
    </x-slot>
    Cat model: 1
</x-profile>
```
Có một lưu ý nhỏ ở đây là: **Bất kỳ nội dung nào không nằm trong thẻ sẽ được chuyển đến component trong biến `$slot`**.<br>
## Anonymous Components
Khác với `Class based components` thì `Anonymous Components` chỉ có một file view blade để quản lý nội dung và không có class liên quan. Chính vì vậy, khi bạn muốn truyền thuộc tính sang `Anonymous Components` thì cần phải sử dụng thêm directive `@props` ở trên cùng của file để khai báo các thuộc tính sẽ được sử dụng.<br>
Ví dụ mình có một anonymous component để hiển thị thông tin của owner, thì mình sẽ tạo một file blade trong thư mục `resources/views/components` có tên là `owner.blade.php` với nội dung như sau:<br>
```php
// owner.blade.php
@props(['name', 'age'])
<div {{ $attributes }}>
	<p>Owner information</p>
    <span>Name: {{ $name }}</span>
    <br>
    <span>Age: {{ $age }}</span>
</div>
```
Và bên file `welcome.blade.php` mình sẽ sử dụng nó như thế này:
```php
<x-owner name='Tan' age=25 class="text-danger text-left"/>
```
Và đây là kết quả:<br>
![](https://images.viblo.asia/06431316-0fb4-46ae-b7a8-f66f9cf800ae.png)
<br>
Very i zì phải không nào, còn chần chờ gì mà không lướt vào thử lửa với component thôi :)
# Tổng kết
Trên đây là tất cả những gì mình biết về component ở version laravel 7.x. Nếu có chỗ nào chưa được đúng các bạn có thể góp ý lại bằng cách comment ở dưới giúp mình nhé.<br>
Bài viết dựa trên trình english none google của mình từ trang chủ [Laravel](https://laravel.com/docs/7.x/blade#components) nên có gì mọi người bỏ qua cho ạ :)<br>
Thank you very much.