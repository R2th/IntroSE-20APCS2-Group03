## Giới thiệu

Laravel Livewire là một frontend framework package dùng trong Laravel. Với Laravel Livewire, chúng ta có thể chạy code PHP giống như Javascript. Đây thực sự là một frontend framework package thú vị và hay ho dành cho những người đang sử dụng Laravel. Đặc biệt là các dự án Laravel đang muốn build từ hệ thống cũ sang dạng SPA. 

Hôm nay tôi muốn giới thiệu với các bạn Laravel Livewire thông qua ứng dụng CRUD đơn giản, trước tiên chúng ta setup 1 vài thứ và demo xem nó có hoạt động không đã nhé.


### 1. Install project Laravel

Kể từ phiên bản 6 trở đi, khi sử dụng lệnh command `php artisan make:auth` thì laravel không cung cấp view nữa. Để tiết kiệm thời gian thì ta sẽ sử dụng phiên bản 5.8 ổn định.

```
composer create-project --prefer-dist laravel/laravel demo_livewire "5.8.*"
```

Sử dụng view sẵn có thông qua lệnh
```
php artisan make:auth
```

Đừng quên tạo database trong mysql và kết nối laravel với db nhé. Sau đó migrate để tạo các table
```
php artisan migrate
```

### 2. Tạo model và migration
 
Bài toán: Thêm, sửa, xóa, xem danh sách liên lạc bao gồm họ tên, số điện thoại, địa chỉ. Ta sẽ gọi đối tượng này là Contact và tạo migration, model cho chúng bằng lệnh


```
php artisan make:model Contact -m
```

Tạo table contacts:

```
class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('address');
            $table->string('phone_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
```

Model Contact:

```
class Contact extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone_number',
    ];
}
```

### 3. Install Laravel Livewire

Chúng ta sẽ install package thông qua composer command

```
composer require livewire/livewire
```

Hãy thêm vào layouts/app.blade.php

```
<head>
...
    @livewireStyles
</head>
<body>
    ...

    @livewireScripts
</body>
</html>
```

### 4. Chạy thử package với chức năng count

Với Laravel Livewire chúng ta không cần phải sử dụng bất kỳ route API nào cho SPA. Cũng giống như với mọi ứng dụng web sử dụng Laravel ta chỉ cần khai báo 1 route trong routes/web.php. Với chức năng CRUD đơn giản thì ta chỉ cần route như sau

```
Route::view('contacts', 'contacts);
```

Tạo file view contacts.blade.php

```
@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                @livewire('contact-component')
            </div>
        </div>
    </div>
@endsection
```

Bạn sẽ thấy ở file view chúng ta sử dụng directive `@livewire('contact-component')` với contact-component là tên component. Cũng giống như React hay Vue, Laravel Livewire cũng sử dụng component cho việc xây dựng SPA.

Laravel Livewire cung cấp câu lệnh command để tạo component:

```
php artisan make:livewire ContactComponent
```
Với lệnh trên chúng ta sẽ có class ContactComponent và view tương ứng. Mọi class được tạo bởi Livewire sẽ được lưu trữ trong thư mục app/Http/Livewire còn view sẽ là resources/views/livewire
![](https://images.viblo.asia/65b4bf50-0f5d-440e-b8af-be6750ff3439.png)
Chúng ta cùng xem qua class ContactComponent có gì:


```
<?php

namespace App\Http\Livewire;

use Livewire\Component;

class ContactComponent extends Component
{
    public function render()
    {
        return view('livewire.contact-component');
    }
}
```

Ở đây chúng ta có thể thấy class ContactComponent extends Component và override method **render()** để hiển thị view chứa component. Ta sẽ thử xem Livewire có hoạt động không bằng demo count đơn giản. Bạn hãy thêm vào class ContactComponent như sau

```
    public $count = 0;

    public function increment()
    {
        $this->count++;
    }

    public function decrement()
    {
        $this->count--;
    }
```

Chỉnh sửa file view contact-component.blade.php

```
<div style="text-align: center">
    <button wire:click="increment">+</button>
    <h1>{{ $count }}</h1>
    <button wire:click="decrement">-</button>
</div>
```

Chúng ta có thể thấy Livewire gọi sự kiện click bằng cú pháp `wire:click="method_name"` tương tự như Vue `v-on:click="function_name"`

GIờ chúng ta cùng xem kết quả:

![](https://images.viblo.asia/81d0cd72-9689-4cf0-ba22-278b37b48e46.gif)

Từ đầu đến giờ chúng ta chưa hề đụng đến 1 dòng code nào của Javascript nhưng kết quả thật là Awesome phải không nào?

### Tạm kết

Ở phần 1 này mình giới thiệu qua package Laravel Livewire và demo chức năng đơn giản. Ở phần tiếp theo, chúng ta sẽ làm chức năng CRUD cho model Contact để thấy nhiều thứ hay ho hơn của package này. Cảm ơn các bạn đã đọc bài :* 

Nguồn:

* https://laravel-livewire.com/docs/quickstart