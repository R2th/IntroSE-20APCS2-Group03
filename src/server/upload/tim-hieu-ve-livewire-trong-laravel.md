## 1. Giới Thiệu
Livewire là một full-stack framework cho Laravel giúp việc xây dựng các giao diện động trở nên đơn giản hơn. Đây là một stack tuyệt vời để lựa chọn nếu bạn muốn xây dựng một SPA nhưng cảm thấy khó khăn khi tìm hiểu về các framework như React.js và Vue.js.

Để hiểu rõ hơn về Livewire và cách hoạt động của nó thì chúng ta cùng xây một ứng dụng live search user. Chúng ta cùng bắt đầu ngay nào.
## 2. Install project và tạo database
Phiên bản Livewire 2.x hiện tại yêu cầu laravel 7.0 nên chúng ta sẽ tạo một project laravel 7
```
composer create-project --prefer-dist laravel/laravel:^7.0 livewire
```
Sử dụng seeder và factory để tạo ra dữ liệu cho bảng user
```
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        factory(App\User::class, 20)->create();
    }
}
```
Tiến hành chạy migrate và seeder để tạo dữ liệu
```
php artisan migrate
php artisan db:seed
```
## 3. Install Livewire
Install package livewire thông qua câu lệnh
```
composer require livewire/livewire
```
Tạo file config của livewire
```
php artisan livewire:publish --config
```
Tạo tệp assets của livewire trong public
```
php artisan livewire:publish --assets
```
## 4. Tạo component và triển khai ứng dụng
### 4.1 Tạo component search
Chúng ta sẽ tạo một component Search để phục vụ cho việc search và hiển thị danh sách các user
```
php artisan make:livewire Search
```
Khi tạo component Search thì Livewire sẽ tạo ra hai file:
``` app/Http/Livewire/Search.php
namespace App\Http\Livewire;

use Livewire\Component;

class Search extends Component
{
    public function render()
    {
        return view('livewire.search');
    }
}
```
```resources/views/livewire/search.blade.php
<div>
    ...
</div>
```
Nhìn vào code của hai file chúng ta có thể thấy hàm render của class Search dùng để hiển thị view của component search. 
###  4.2 Viết xử lý logic và giải thích luồng hoạt động
Chúng ta cần chỉnh sửa hai file trên để thực hiện chức năng live search
``` app/Http/Livewire/Search.php
namespace App\Http\Livewire;

use Livewire\Component;
use App\User;

class Search extends Component
{
    public $search = '';

    public function render()
    {
        return view('livewire.search', [
            'users' => User::where('name', 'like','%'.$this->search.'%')->get(),
        ]);
    }
}
```
```resources/views/livewire/search.blade.php
<div>
    <input wire:model="search" type="text" placeholder="Search users..."/>

    <ul>
        @foreach($users as $user)
            <li>{{ $user->name }}</li>
        @endforeach
    </ul>
</div>
```

Chúng ta có thể thấy được từ khóa quan trọng là `wire:model="search"`, đây là một directive của Livewire. Nó hoạt động mỗi khi giá trị trong thẻ input thay đổi thì thuộc tính search trong class Search sẽ thay đổi theo giá trị của thẻ input với điều kiện thuộc tính search là public. Ví dụ chúng ta nhập vào ô input một chuỗi `"Quang"` thì giá trị `$search = "Quang"` và `$search` sẽ được cập nhật liên tục khi ta nhập vào.

Khi `$search` thay đổi có nghĩa là Livewire đã gửi một ajax request tới server, khi đó hàm `render()` sẽ chạy và cập nhật lại danh sách user tìm được theo biến `$search` và trả dữ liệu về cho component search

Tạo một file list-user.blade.php và một route để hiển thị ô input và danh sách user.
```resources/views/list-user.blade.php
<html>

<head>
    @livewireStyles
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                @livewire('search')
            </div>
        </div>
    </div>
    @livewireScripts
</body>
</html>
```
```
Route::get('/users', function () {
    return view('list-user');
});
```
Trong đó `@livewireStyles` và `@livewireScripts` dùng để include css và js của Livewire vào trong trang web, còn `@livewire('search')` dùng để include component search.
### 4.3 Kết quả thực hiện
Bạn hãy mở trình duyệt lên và xem kết quả đã thực hiện được.
![](https://images.viblo.asia/b5f4cfb7-dbc0-45be-aa4b-0f7c9a2643d1.gif)

> Nếu như bạn gặp vấn đề trang web không hoạt động có thể trang web của bạn không thể khởi tạo new Livewire() do quá trình nhúng javascript của livewire vào trang web bị lỗi, không tìm được đường dẫn chính xác tới file js. Hãy vào file `config/livewire.php` và chỉnh sửa key `'asset_url' = env('APP_URL')`, có thể thay `env('APP_URL')` bằng một đường link cụ thể tương ứng với project của bạn.

## 5. Một số Directive	thường dùng của Livewire
* `wire:click="foo"` Nhận sự kiện click chuột và chạy hàm foo bên trong component.
* `wire:keydown.enter="foo"` Nhận sự kiện keydown của phím enter và chạy hàm foo bên trong Component.
* `wire:foo="bar"`	Lắng nghe một sự kiện của trình duyệt được gọi là "foo". (Bạn có thể lắng nghe bất kỳ sự kiện DOM nào của trình duyệt - không chỉ những sự kiện do Livewire kích hoạt).
* `wire:model="foo"`Giả sử `$foo` là một thuộc tính công khai trên lớp thành phần, mỗi khi một phần tử input với chỉ thị này được cập nhật, thuộc tính sẽ đồng bộ hóa với giá trị của nó.
* `wire:init="foo"`	Chạy phương thức foo() trong component ngay sau khi nó hiển thị trên trang web.
*
## 6. Tổng Kết
Vậy là chúng ta đã hoàn thành một ứng dụng live search đơn giản với live wire. Qua quá trình thực hiện thì có thể thấy Livewire là một frame work mạnh mẽ khá dễ sử dụng và có nhiều tính năng, đáng để nghiên cứu trong tương lai. Cảm ơn các bạn đã theo dõi bài viết, hy vọng chúng ta sẽ gặp lại ở những bài viết tiếp theo.

### Tài liệu tham khảo: 
https://laravel-livewire.com/