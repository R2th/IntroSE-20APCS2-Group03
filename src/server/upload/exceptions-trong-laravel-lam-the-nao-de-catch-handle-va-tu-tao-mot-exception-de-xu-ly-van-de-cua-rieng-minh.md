## Giới thiệu

Thông thường, chúng ta trong quá trình viết code đều không thể lường trước được mọi kịch bản lỗi có thể xảy ra. Nếu có sự cố xảy ra, Laravel sẽ trả về thông báo "Whoops, something went wrong" hoặc tệ hơn là trang báo lỗi để lộ source code. Điều này gây ra trải nghiệm không tốt cho người dùng trên môi trường product. Vì vậy bài viết này mình muốn giới thiệu đến các bạn kỹ thuật xử lý ngoại lệ Exceptions trong Laravel. Lý thuyết thì luôn nhàm chán với một đống định nghĩa và giải thích khó nhằn cho nên mình sẽ đưa ra 1 ví dụ để các bạn dễ hình dung. Let's go!!!

### 1. Ví dụ: Chức năng tìm kiếm User

Một ví dụ đơn giản là xây dựng chức năng tìm kiếm User thông qua ID và chúng ta hãy đi từng bước nhé.

Trước tiên hãy chạy seed để tạo dữ liệu mẫu cho quá trình test. 

* Trong file database/seeds/DatabaseSeeder.php:

```
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 50)->create();
    }
}
```
* Sử dụng câu lệnh command: `php artisan db:seed`

Tiếp theo, ta có 2 routes: 

```
Route::get('/users', 'UserController@index')->name('users.index');
Route::post('/users/search', 'UserController@search')->name('users.search');
```

Tương ứng với 2 methods trong controller:

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        return view('users.index');
    }

    public function search(Request $request)
    {
    	$user = User::find($request->input('user_id'));

        return view('users.search', compact('user'));
    }
}
```

Không thể thiếu file view rồi: 
* View users.index sẽ có đường dẫn là  **resources/views/users/index.blade.php**
```

@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header text-center">{{ __('Search for user by ID') }}</div>
                <div class="card-body">
                    <form action="{{ route('users.search') }}" method="POST">
						@csrf
						<div class="form-group row">
							<label for="email" class="col-md-3 col-form-label text-md-right">{{ __('User ID') }}</label>
							<div class="col-md-6">
                                <input id="user_id" class="form-control" name="user_id" type="number" value="{{ old('user_id') }}" placeholder="User ID" required>
                                @if ($errors->has('user_id'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('user_id') }}</strong>
                                    </span>
                                @endif
                            </div>
						</div>
						<div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-5">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Search') }}
                                </button>
                            </div>
                        </div>
					</form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```

Chúng ta xem kết quả tý nào: 
![](https://images.viblo.asia/81f89f0f-5688-4960-9798-ceefec674d01.png)

Ngon rồi! Tiếp đến là view users.search nhé, view này sẽ có đường dẫn là **resources/views/users/search.blade.php:**

```
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header text-center">{{ __('Search result') }}</div>
                <div class="card-body">
                    <h3 class="page-title text-center">{{ __('User found:') }} {{ $user->name }}</h3>
                    <b>{{ __('Email') }}</b>: {{ $user->email }}
                    <br>
                    <b>{{ __('Registered on') }}</b>: {{ $user->created_at }}
                </div>
                <div class="card-footer">
                    <div class="col-md-8 offset-md-5">
                        <a href="{{ route('users.index') }}" class="btn btn-primary">{{ __('Back') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```
Chúng ta search thử 1 User nhé, ID = 10 đi rồi xem kết quả nào

![](https://images.viblo.asia/17e96a2c-429d-467f-81fc-30cab8969856.png)

Đến lúc này mọi thứ đều khá bảnh à nhầm khá ổn. Nhưng nếu user không tồn tại thì sao nhỉ?

### 2. Xử lý ngoại lệ

Năm nay là 2019, chúng ta search thử ID = 2019 xem sao 

![](https://images.viblo.asia/008a0bf7-c7a6-4ec0-a060-ec853b73f052.png)

Ooops, trông có chán không cơ chứ? Có 1 cách nhanh chóng để che giấu lỗi này đi, ta có thể thực hiện bằng cách vào file **.env** và set **APP_DEBUG = false** sau đó trình duyệt trả về trang thông lỗi có code = 500 với 1 message **"Whoops, something went wrong on our servers."**. Điều này không cung cấp bất kỳ thông tin có giá trị nào cho người dùng trong thực tế. 

Laravel cung cấp 1 cách khác cũng nhanh không kém là sử dụng function **findOrFail()** thay vì **find()**. Với cách này, Laravel sẽ hiển thị page 404 với dòng text **"Sorry, the page you are looking for could not be found."** Page 404 này mặc định cho toàn bộ dự án nên việc custom lại view sẽ không phù hợp với từng chức năng riêng biệt.

Vì vậy tối ưu nhất chỉ có thể là sử dụng **try catch** để xử lý **Exception** và chuyển hướng trở lại form tìm kiếm với 1 error message  dễ hiểu. Chúng ta cần biết loại ngoại lệ và tên lớp mà nó sẽ trả về. Trong trường hợp **findOrFail()**, nó sẽ ném ra 1 Eloquent exception có tên là **ModelNotFoundException**, lúc này controller đã thay đổi:
```
public function search(Request $request)
    {
        try {
            $user = User::findOrFail($request->input('user_id'));
        } catch (ModelNotFoundException $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }
        
        return view('users.search', compact('user'));
    }
```

Thêm hiển thị error ở file view index.blade.php:
```
@if (session('error'))
    <div class="alert alert-danger text-center">{{ session('error') }}</div>
@endif
```

Chạy thử xem sao nhé: 

![](https://images.viblo.asia/2a37f0a9-df8c-4717-a4cb-263f289cad4c.png)

Exception bắn ra 1 error message mặc định. Nếu bạn muốn custom lại message theo ý mình thì đơn giản thôi:

`return back()->withError('User has ID = ' . $request->input('user_id') . ' does not exist')->withInput();`


### 3. Sử dụng Services để xử lý Error Message

Chúng ta đã lấy 1 ví dụ hết sức đơn giản nhưng trong thực tế, ứng dụng ngày càng phình to và điều tất yếu là **controller** ngày càng gánh quá nhiều chức năng làm cho nó trở nên cồng kềnh và khó maintain, nâng cấp. Vì thế việc sử dụng 1 số Design pattern vào trong ứng dụng là cần thiết. Thường thì controller sẽ gọi service từ bên ngoài vào và cụ thể trong trường hợp này, nó sẽ không đảm nhận công việc custom error message. Ta sẽ sử dụng [Services Layer](https://m.dotdev.co/design-pattern-service-layer-with-laravel-5-740ff0a7b65f) để xử lý Error Message.

Tạo folder app/Services sau đó là file class UserService:

```
<?php

namespace App\Services;

use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserService
{

    public function search($user_id)
    {
        $user = User::find($user_id);
        if (!$user) {
        throw new ModelNotFoundException('User not found by ID ' . $user_id);
        }

        return $user;
    }
}
```

Tiếp theo ở controller chúng ta cần gọi service này.Đầu tiên,  ta đưa nó vào phương thức **construct ()** :

```
class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    
    ...
}
```

Nếu bạn chưa biết về kỹ thuật Dependency Injection và cách thức hoạt động của Laravel IoC container thì hãy tham khảo bài viết này: 

* https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB#_dependency-injection-va-inversion-of-control-2
* https://toidicodedao.com/2015/11/03/dependency-injection-va-inversion-of-control-phan-1-dinh-nghia/

Đến lúc này method **search()** cũng đã thay đổi:

```
public function search(Request $request)
    {
        try {
            $user = $this->userService->search($request->input('user_id'));
        } catch (ModelNotFoundException $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return view('users.search', compact('user'));
    }
```

### 4. Cách Exception họat động trong Laravel

Tất cả các **exception** được xử lý bởi class **App\Exceptions\Handler**. Chúng ta cùng xem bên trong nó sẽ chứa những gì:

![](https://images.viblo.asia/5dabeee9-548b-475e-b4e0-beb1fafc208f.png)

1. Thuộc tính **$dontReport**:
    * Thuộc tính này chứa một mảng các kiểu exception sẽ không cần log
    * Xem trong class cha của class Handler ta sẽ thấy 1 mảng các Exception đã được thêm vào sẵn ở thuộc tính **$internalDontReport**
 
2. Thuộc tính **$dontFlash**:
    * Từ bản laravel 5.7 trở đi bổ sung thêm thuộc tính này
    * Nó sẽ chứa 1 mảng các input sẽ không bao giờ được truyền đi nếu có exception validate

3. Phương thức **report** :
    * Phương thức report được sử dụng để log các exception hoặc gửi chúng tới các dịch vụ ngoài như Bugsnag hoặc Sentry
    * Mặc định, phương thức report đơn giản chỉ đấy các exception về class nơi mà exception được log lại. Tuy nhiên, chúng ta có thể hoàn toàn tùy biến theo ý mình muốn.
    * Nếu bạn cần report nhiều kiểu exception theo nhiều cách khác nhau, bạn có thể sử dụng toán tử kiểm tra của PHP instanceof, ví dụ:
    
       ![](https://images.viblo.asia/2795781f-33c3-429b-85e6-ee1680777708.png)     
       
4. Phương thức **render** :
    * Phương thức render có tránh nhiệm chuyển đổi một exception thành một HTTP response để trả lại cho trình duyệt
    *  Mặc định, exception được đẩy tới class cơ sở để tạo một response. Tuy nhiên, ta có thể thoải mái trong việc kiểm tra kiểu exception và trả về response tùy biến theo ý của mình, ví dụ:
    
    ![](https://images.viblo.asia/5591c187-e60e-4a38-960c-27203cd54942.png)
    
### 5. Tạo Exception

Các Exception mà Laravel cung cấp sẵn đôi khi không đáp ứng đủ nhu cầu giải quyết vấn đề của chúng ta. Vì vậy, Laravel cho phép tự tạo Exception bằng câu lệnh (mình sẽ tiếp tục sử dụng ví dụ ở phía đầu bài viết cho phần này): 

*   `php artisan make:exception UserException`

Exception sẽ được tạo ra và xem trong đó thì ta sẽ không thấy gì cả nhưng giống như class **App\Exceptions\Handler**, chúng ta sẽ thêm vào 2 method **report** và **render**. Điều này giúp chúng ta thay vì kiểm tra các loại exception trong phương thức **report** và **render** của **Handler**, ta có thể định nghĩa trong tùy chỉnh exception của bạn. Khi các phương thức đó tồn tại, chúng có thể tự động được gọi đến bằng framework:

```
<?php

namespace App\Exceptions;

use Exception;

class UserException extends Exception
{
    /**
     * Report or log an exception.
     *
     * @return void
     */
    public function report()
    {
        \Log::debug('User not found');
    }

    public function render($request)
    {
        return response()->view('errors.user');
    }
}
```

Bây giờ, khi có Exception được bắn ra thì sẽ trả về view thông báo lỗi:
```
@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="page-title text-center">{{ __('User not found') }}</h3>
                    </div>
                    <div class="card-footer">
                        <div class="col-md-8 offset-md-5">
                            <a href="{{ route('users.index') }}" class="btn btn-primary">{{ __('Back') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
```

Đừng quên sửa lại một chút ở bên Service nhé:

```
<?php

namespace App\Services;

use App\Exceptions\UserException;
use App\User;

class UserService
{

    public function search($user_id)
    {
        $user = User::find($user_id);
        if (!$user) {
            throw new UserException();
        }

        return $user;
    }
}

```

Controller nữa, lúc này method search sẽ trông như thế này:

```
public function search(Request $request)
    {
        try {
            $user = $this->userService->search($request->input('user_id'));
        } catch (UserException $exception) {
            throw $exception;
        }

        return view('users.search', compact('user'));
    }
```

Chạy thử ví dụ để xem kết quả nhé:

![](https://images.viblo.asia/c9af5f72-d70d-40d6-8d37-84e8f2b96ed2.png)

Ngon lành rồi đúng không các bạn?

##  Tổng kết

Bài viết khá dài vì vậy cảm ơn bạn đã đọc đến đây. Mình mong rằng với bài viết này các bạn sẽ hiểu và biết cách xử lý ngoại lệ trong Laravel. Nếu có sai sót hoặc nhầm lẫn các bạn có thể comment ở phía dưới nhé. Cảm ơn các bạn rất nhiều!!!

Nguồn tham khảo:
* https://laravel.com/docs/5.7/errors
* https://laraveldaily.com/how-to-catch-handle-create-laravel-exceptions/
* https://code.tutsplus.com/tutorials/exception-handling-in-laravel--cms-30210