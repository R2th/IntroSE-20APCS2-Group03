### Introduction 
Livewire được mô tả trên https://laravel-livewire.com/. Là một full-stack framework  cho ứng dụng laravel. 
Điều đó làm cho việc xây dựng frontend trở nên đơn giản hơn.
Trong bài viết này chúng ta sẽ cùng tìm hiểu về livewire và xây dựng một livewire Laravel đơn giản. xây dựng component để 
chúng t xem tất cả hoạt động như thế nào và thảo luận khi nào nên sử dụng và khi nào thì không.
### Setting Up
Cài  laravel run cmd:
```
composer global require laravel/installer
```
Khi việc cài đặt trên hoàn tất chúng ta sẽ tạo ứng dụng `learn-livewire` bằng cmd sau:
```
laravel new learn-livewire
```
Sau khi việc cài đăt trên hoàn tất chúng ta sẽ di chuyển vào ứng dụng.
```
cd learn-livewire
```
Bây giờ chúng ta sẽ cài đặt livewire vào ứng dụng.
```
composer require livewire/livewire
```
### Creating a Livewire Component
Livewire là một component-driven framework. Nó lấy ý tưởng từ `javascript` và đưa vào `PHP`.
Component của Livewire có thể được tạo như sau:
```
php artisan make:livewire 

```
Để tạo một `counter` component chúng ta sẽ dùng như sau:
```
php artisan make:livewire counter

```
Livewire sẽ tạo 2 file: `Counter.php` and `counter.blade.php`.
Counter.php là một component class. Tại đây chúng ta xác định các thuộc tính bên trong trạng thái. Chế độ xem để tạo ra và các sự kiện khác 
sẽ diễn ra dựa trên sự tương tác của người dùng. File `counter.blade.php` là một view file  cho Counter component và chúng được tìm thấy tại: `resources/views/livewire/`
### The Component Class
Nội dung của `Counter.php` sẽ giống như sau:
```
<?php
namespace App\Http\Livewire;
use Livewire\Component;
class Counter extends Component
{
    public function render()
    {
        return view('livewire.counter');
    }
}
```
`render` method là bắt buộc phải có trong component livewire. Ở đây chúng ta trả ra chế độ xem của view `livewire.counter`.
### The Component View
Livewire sử dụng laravel blade để tạo khuôn mẫu cho nó. File view cần có chính xác root HTML element.
view file có quyền truy cập vào tất cả thuộc tính public được định nghĩa trong class.
Trong laravel chúng ta sẽ cần chính xác send thuộc tính tới view. Nhưng với Livewire điều đó được thực hiện bên ngoài với các thuộc tính public.
Do đó các thuộc tính nào không xử dựng cần được xác định thuộc tính là `protected` hoặc `private`.
Hãy sửa đổi tệp chế độ xem để hiển thị một số nội dung đơn giản. Cập nhật file ` counter.blade.php`
```
<div>
    <p>Counting ... 0</p>
    <button>+</button>
    <button>-</button>
</div>
```  
Sau khi tạo component sau khi hoàn thành nó chúng ta sẽ hiển thi nó trên trang bằng cách thêm vào như sau:
```
@livewire('componentName')
```
Laravel sẽ có một trang mặc định. `welcome.blade.php`. Được tìm thấy tại `resources/views/`.
Mở nó nên và include the livewire component.
Thêm phần sau vào phần nội dung của `welcome.blade.php`
```
@livewire('counter')
```
Run sever laravel 
```
php artisan serve
```
counter component sẽ được hiển thị trên trình duyệt như sau:
![](https://images.viblo.asia/9dacc67c-387c-4e01-97e9-a8c7fc72c9bc.png)


Bạn đã viết thành công Livewire component đầu tiên của mình.
### Making the Component Interactive
Livewire cung cấp một kỹ thuật để lắng nghe các sự kiện của trình duyệt.
Sự kiện có thể được lắng nghe bằng cách thêm `wire:<eventName>` cho yếu tố chúng ta muốn nắng nghe.
```
<button wire:click="performAction">Click Me</button>
```
Ví dụ chúng ta muốn lắng nghe cho một sự kiệc click vào `button`.
Hành động được thực hiện là một hàm đã được định nghĩa trong class component.
Cập nhật file `Counter.php`
```

<?php
namespace App\Http\Livewire;
use Livewire\Component;
class Counter extends Component
{
    public $count = 0;
    public function increment() {
        $this->count += 1;
    }
    public function render()
    {
        return view('livewire.counter');
    }
}
````
Chúng ta cần cập nhật view để sử dụng `$count` variable được tạo để call `increment()`.
```
<div>
    <p>Counting ... {{$count}}</p>
    <button wire:click='increment'>+</button>
    <button>-</button>
</div>
```
Trở lại trình duyệt xem gì đã xảy ra. Vì điều đó hoạt động chúng có thể thêm chức năng giảm dần. Cũng giống như chức năng gia tăng đã được thêm vào
tạo một hàm giảm dần xử lý hành động giảm dần. 
Cập nhật file `counter.php`
```
<?php
namespace App\Http\Livewire;
use Livewire\Component;
class Counter extends Component
{
    public $count = 0;
    public function increment() {
        $this->count += 1;
    }
    public function decrement() {
        $this->count -= 1;
    }
    public function render()
    {
        return view('livewire.counter');
    }
}

```
Cập nhật file `counter.blade.php`
```
<div>
    <p>Counting ... {{$count}}</p>
    <button wire:click='increment'>+</button>
    <button wire:click='decrement'>-</button>
</div>
```
### How It Works
Nếu bạn mở các công cụ dành cho nhà phát triển của mình và chuyển đến tab network. bạn sẽ nhận thấy rằng livewire sẽ gửi một yêu cầu khi một hành động nhấp chuột được thực hiện.
Trên các hành động livewire gửi một yêu cầu ajax đến phần phụ trợ với một số dữ liệu.
Điều này giúp nó cập nhật trạng thái và thực hiện bất kỳ chức năng nào khác cần được thực hiện trong hành động.
Nó cũng trả về một JSON chứa trạng thái DOM mới và một số thông tin khác cần thiết để hiển thị trạng thái mới cho DOM.

### When to Use Livewire
Khi xây dựng các ứng dụng tương tác, một cú nhấp chuột từ người dùng sẽ kích hoạt thay đổi trạng thái trên giao diện người dùng, gửi ajax
yêu cầu tới máy chủ và giữ lại trạng thái trên giao diện người dùng nếu yêu cầu thành công hoặc trả lại trạng thái trước đó nếu không thành công.
### Conclusion
Chúng ta tìm hiểu được về Laravel Livewire. Hẹn gặp lại tại các bài viết sau.
### References
https://laravel-livewire.com/docs/2.x/quickstart

https://codesource.io/laravel-livewire-an-introduction/