# Chuẩn bị 

Mình sẽ hướng dẫn các bạn làm một trang CRUD đơn giản với Livewire. Trước hết các bạn cần chuẩn bị như sau :
 - Laravel 7 trở lên 
 - Cài livewire thông qua composer : `composer require livewire/livewire`
 - Tích hợp bootstrap vào để trang web nhìn gọn hơn, code giao diện lẹ hơn (tuỳ chọn)
 
# Bắt đầu
## 1. Chuẩn bị migrate
Ở đây mình sẽ làm CRUD cho user, với đủ loại input để có thể áp dụng các tính năng mà livewire cung cấp khi làm việc với form. Mình sẽ tạo một file migrate như sau :
 
```php
 <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('is_admin'); // chúng ta có thể áp dụng checkbox cho field này 
            $table->string('country'); // chúng ta sẽ áp dụng select box cho field này 
            $table->string('image')->nullable();  // chúng ta sẽ áp dụng upload image cho field này 
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
```

sau khi xong, ta cứ việc chạy `php artisan migrate`. Đừng quên update `$fillable` của `User` nhé :

```php
protected $fillable = [
	'name',
	'email',
	'password',
	'is_admin',
	'country',
	'image',
];
```

## 2. Setup giao diện
Đầu tiên để sử dụng được livewire, bắt buộc bạn phải gắn các script và style của livewire vào :
```app.blade.php

<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <title>CRUD</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    @livewireStyles
  </head>
  <body>
    <main class="container">
      @yield('main')
    </main>
  @livewireScripts
  <script src="{{ mix('js/app.js') }}"></script>
  </body>
</html>
```

Mình có để một `@yield('main')` để Livewire có thể extend layout này và sử dụng, ngoài ra mình còn nhúng thêm `bs5` vào việc setup layout nhanh hơn. Và bắt buộc bạn phải có `@livewireStyles` và `@livewireScripts` nhé, nếu không `livewire` sẽ không hoạt động.

### Khởi tạo Component 
Ở đây mình sẽ tạo hai component :
- `php artisan make:livewire User/Index` : Component này sẽ handle Index/Delete.
- `php artisan make:livewire User/UserForm` : Component này sẽ handle việc Store/Update/Show.

## 3. Create /  Edit / Update

Mình sẽ làm create trước để có data sau đó mình sẽ chuyển qua làm edit.

### Khai báo route: 
```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('user/{id?}', \App\Http\Livewire\User\UserForm::class);
Route::get('/', \App\Http\Livewire\User\Index::class)->name('user_index');
```

Ở đây mình có sử dụng `get('user/{id?}')` nhằm mục đích mình sẽ tái sử dụng Component này cho việc update.

### Setup form
```html
<div class="row col-md-8 mt-5 offset-md-2">
  <form class="row g-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Name</label>
      <input name="name" type="text" class="form-control @error('user.name')is-invalid @enderror" id="name" wire:model.debounce.500ms="user.name">
      @error('user.name')
        <div class="invalid-feedback">
          {{ $message }}
        </div>
      @enderror
    </div>
    <div class="col-md-6">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control @error('user.email')is-invalid @enderror" id="email" wire:model.debounce.500ms="user.email">
      @error('user.email')
      <div class="invalid-feedback">
        {{ $message }}
      </div>
      @enderror
    </div>
    <div class="col-md-6">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control @error('user.password')is-invalid @enderror" id="password" wire:model.debounce.500ms="user.password">
      @error('user.password')
      <div class="invalid-feedback">
        {{ $message }}
      </div>
      @enderror
    </div>
    <div class="col-md-6">
      <label for="country" class="form-label">Country</label>
      <select class="form-select @error('user.country')is-invalid @enderror" id="country" wire:model.debounce.500ms="user.country">
        <option selected disabled value="">Choose...</option>
        @foreach($countries as $country)
          <option value="{{ $country }}">{{ $country }}.</option>
        @endforeach
      </select>
      @error('user.country')
      <div class="invalid-feedback">
        {{ $message }}
      </div>
      @enderror
    </div>
    <div class="col-4">
      <div class="form-check">
        <input class="form-check-input @error('user.is_admin')is-invalid @enderror" type="checkbox" value="" id="is_admin" wire:model.debounce.500ms="user.is_admin">
        <label class="form-check-label" for="is_admin">Is Admin</label>
        @error('user.is_admin')
        <div class="invalid-feedback">
          {{ $message }}
        </div>
        @enderror
      </div>
    </div>
    <div class="col-md-8">
      <label for="inputCity" class="form-label">Image</label>
      <input type="file" class="form-control input-sm @error('image')is-invalid @enderror" placeholder="image" wire:model.lazy="image">
      @error('image') <span class="text-danger fs-6 fw-light"> {{ $message }} </span> @enderror
    </div>
    <div class="col-12">
      <label for="inputCity" class="form-label">Preview</label>
      @if (!$this->image)
        <img src="{{ asset('images/no-image.png') }}" alt="" width="150">
      @else
        @if(is_string($image))
          <img src="{{ asset('storage/'.$user->image) }}" alt="" width="150">
        @else
          <img src="{{ $image->temporaryUrl() }}" alt="" width="150">
        @endif
      @endif
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit" wire:click.prevent="store">Submit form</button>
    </div>
  </form>
</div>
```

Form của chúng ta giống như một form bình thường của Laravel thôi, nhưng thay vì bạn khai báo `name="attribute"` cho nó thì bạn sẽ phải khai báo `wire:model="attribute"`. Chúng ta sẽ kích họat method `store` khi nhấn nút submit.

### Setup Component 
```php
<?php

namespace App\Http\Livewire\User;

use Illuminate\Validation\Rule;
use Livewire\Component;
use App\Models\User;
use Livewire\WithFileUploads;

class UserForm extends Component
{
    use WithFileUploads;

    protected string $paginationTheme = 'bootstrap';
    public User $user;
    public $image, $password;
    public array $countries;
    public array $validationAttributes = [
        'user.name' => 'Name',
        'user.email' => 'Email',
        'password' => 'Password',
        'user.is_admin' => 'Is Admin',
        'user.country' => 'Country',
        'image' => 'Image',
    ];

    public function mount($id = null)
    {
        $this->countries = ['Ha Noi', 'Da Nang', 'Ho Chi Minh'];
        $this->user = User::firstOrNew(['id' => $id]);
    }

    public function render()
    {
        return view('livewire.user.user', [
            'countries' => $this->countries,
        ])
            ->extends('app')
            ->section('main');
    }

    public function updated($field)
    {
        $this->validateOnly($field);
    }

    public function store()
    {
        $this->validate();
		try {
            if ($this->image instanceof UploadedFile) {
                $this->user->image = $this->image->store('users');
            }
            $this->user->password = bcrypt($this->password);
            $this->user->save();
            session()->flash('message', [
                'type' => 'success',
                'message' => 'Create user successfully'
            ]);
        } catch (\Exception $e) {
            session()->flash('message', [
                'type' => 'danger',
                'message' => 'Create user failed'
            ]);
        }

        $this->redirectRoute('user_index');
    }

    public function rules()
    {
        $id = $this->user->id ?? 0;

        return [
            'user.name' => 'required|string|min:5|max:100|',
            'user.email' => 'required|string|unique:users,email,'.$id,
            'password' => 'required|string|min:6|max:16',
            'user.is_admin' => 'required|boolean',
            'user.country' => [
                'required',
                Rule::in($this->countries),
            ],
            'image' => 'nullable|file|mimes:jpeg,jpg,png|max:4000',
        ];
    }
}
```

- Để có thể sử dụng được chức năng upload image của livewire, thì bạn cần phải use `use WithFileUploads;` này.
- `public User $user;` : Ở đây mình sử dụng `Binding Directly To Model Properties` .
- `public $image;`: Mình sử dụng prop này riêng ở đây, để prop này chỉ nhận instance file, còn `user.file` sẽ nhận URL khi nó save. Và bạn thấy thằng mình cũng tách riêng pasword ra, bởi vì `User.password` đã set hidden ở model rồi, nên nếu sử dụng binding theo cách này, nó sẽ luôn ẩn
- `public array $countries;` : Đây mình tạo để nhận một mang contries.
- `public array $validationAttributes` : Nó tương tự hàm `attributes` của `Form Request`.
- `public function mount($id = null)` : Tại hàm `mount()`, mình có truyền tham số ID để làm gì ? lúc nữa mình sẽ dùng chung form này cho case edit.
- `public function render()`: Mình sẽ sử dụng luôn `extends()` và `section` , như vậy mình sẽ không cần extend nó ngoài `blade` nữa.
- `public function updated($field)` : Mình sử dụng hàm này cho mục đích, khi attribute nào thay đổi, thì nó sẽ validate field đó (`realtime-validate`).
- `public function store()`: Xử lý logic lưu user. Trong này mình có cho nó validate thêm một lần nữa để đảm bảo chắc data đang đúng.
- `public function rules()`: Khai báo rule giống `Form Request`.

![](https://b29.vn/storage/image_contents/SHYTr829sjnKNTroKq7YTSh2VG7oU1IyvJd7X0q5.png)

### Setup flash message
Để cho lẹ, mình sẻ sử dụng `Toastr` để hiện notification, do đó bạn cần nhúng cdn của thằng này vào :
```html
<!-- app.blade.php -->
...
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"/>
...
<!-- jQuery -->
<script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script>
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

  @if (session()->has('message'))
    let msg = JSON.parse('{{ json_encode(session('message')) }}'.replace(/&quot;/g,'"'));
    toastr[msg.type](msg.message)
  @endif
</script>
```

Để khi save user thành công, nó sẽ hiện notification ở trang index. Vậy là chúng ta xong phần đầu tiên là lưu User.

## Index/Delete
Chúng ta sẽ setup Component `User/Index` như sau :
```php
<?php

namespace App\Http\Livewire\User;

use App\Models\User;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public string $search = '';
    protected $queryString = [
        'search' => ['except' => ''],
    ];

    public function render()
    {
        $users = User::where('name', 'like', '%'.$this->search.'%')
            ->orWhere('email', 'like', '%'.$this->search.'%')
            ->paginate(40);

        return view('livewire.user.index', compact('users'))
            ->extends('app')
            ->section('main');
    }

    public function deletePost($id)
    {
        User::destroy($id);
    }
}
```

- `use WithPagination` : Để sử dụng pagination Livewire
- `public string $search` : Là query string dùng để search.
- `protected $queryString` : Sử dụng [Query String](https://b29.vn/bai-viet/laravel-livewire-esp-3?id=6#t95nzkc6ru) trong Livewire
- `render()` : Chúng ta sẽ query `User` và phân trang trả về view thôi.
- `deletePost()`: Dùng để delete Post.
- 
### View
```html
<!-- resources/views/livewire/user/index.blade.php -->
<div class="row col-md-8 mt-5 offset-md-2">
  <div class="card">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
            <th scope="col">Admin</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          @foreach($users as $user)
            <tr>
              <td><img src="{{ asset('storage/' . $user->image) }}" width="100px"></td>
              <td class="align-middle">{{ $user->name }}</td>
              <td class="align-middle">{{ $user->email }}</td>
              <td class="align-middle">{{ $user->country }}</td>
              <td class="align-middle">{{ $user->is_admin ? 'Yes' : 'No' }}</td>
              <td  class="align-middle">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <a href="{{ route('user_form', $user->id) }}" type="button" class="btn btn-sm btn-warning">Sửa</a>
                  <button type="button" class="btn btn-sm btn-danger" data-id="{{ $user->id }}">Xoá</button>
                </div>
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
</div>
```

![](https://b29.vn/storage/image_contents/e22lu5hJbcoT5iAJyTNvervwi3GsYNOJl8PsfQkK.png)

Như vậy chúng ta đã có List. bây giờ chúng ta sẽ xử lý delete bằng một chút JS :

Chúng ta sẽ thêm `@yield('scripts')` vào cuối script của `resources/views/app.blade.php` để có thể viết script tại index. Sau đó ở  index, ta thêm vào cuối file với nội dung sau :
```html
@section('scripts')
  <script>
    const btns = document.querySelectorAll('.btn-delete');
    btns.forEach(el => el.addEventListener('click', function () {
      if (confirm('Are you sure?')) {
        const id = this.dataset.id;
        Livewire.emit('deletePost', id);
      }
    }));
  </script>
@stop
```

Ở đây mình sẽ `emit` event đến component class. Do đó ở class, bạn cần thêm vào `listeners` để lắng nghe sự kiện này:
```php
...
    public string $search = '';
    protected $queryString = [
        'search' => ['except' => ''],
    ];
	// Vì listener cùng tên nên mình có thể đặt như này
    protected $listeners = ['deletePost'];
	
	..
	
	public function deletePost($id)
    {
        User::destroy($id);
		// mình thêm cái này vào để khi delete xong, nó sẽ emit đến component view, nhằm mục đích show msg và không load lại trang
        $this->emit('alert', [
            'success',
            'Delete user success'
        ]);
    }
```

 Ta cần listen sự kiện xoá thành công để show msg, tại file index :
```html
window.livewire.on('alert', data => {
	const type = data[0];
	const message = data[1];
	toastr[type](message)
});
```

Để mỗi khi xoá user thành công thì xoá luôn image, bạn thêm một event model vào `User`:
```php
...
public static function boot()
{
	parent::boot();

	static::deleting(function ($user) {
		Storage::delete($user->image);
	});
}
```

Vậy là xong
# Kết
CRUD với livewire rất đơn giản mà phải không, Hi vọng bài viết này sẽ giúp ban hiểu hơn một phần nào đó khi làm việc với livewire.

Nếu bạn chưa tìm hiểu livewire thì tìm hiểu ngay tại đây nhé : [Link](https://b29.vn/category/7). 

Cảm ơn các bạn đã theo dõi bài viết này, hẹn gặp lại các bạn ở các bài sau .

Src : https://b29.vn/bai-viet/laravel-crud-don-gian-voi-livewire?id=34