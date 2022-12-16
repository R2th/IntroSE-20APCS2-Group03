### Introduction
Trong bài viết này chúng ta sẽ chúng ta sẽ tìm hiểu về các sử lý file trong Laravel. Hầu hết các ứng dụng đều liên quan 
đến việc tải file thuộc một số loại như: ảnh, pdf... Trong phạm vi bài viết này chúng ta sẽ cùng xây dựng một ứng dụng đơn giản trong đó người dùng cần nhập thông tin của mình và 
ảnh. Trong ứng dụng này chúng ta cần xử lý quá trình tải tệp lên, xử lý xác thực để tải lên và biết phải làm gì khi tệp tải lên không thành công.

### Setting Up
Để bắt đầu chúng ta cần cài đặt laravel nếu của bạn đã được cài đặt trước đó hãy bỏ qua bước này.
```markdown
composer global require laravel/installer

```
Sau khi command trên hoàn tất chúng ta bắt đầu tạo ứng dụng laravel.
```markdown
laravel new profile-form

```
Chạy lệnh trên sẽ tạo ra một ứng dụng laravel là `profile-form` và lưu trong thư mục hiện tại với tên `profile-form`.
Khởi chaỵ serve ứng dụng:
```markdown
cd profile-form
php artisan serve
```
Hãy mở link : http://localhost:8000/ bạn sẽ thấy hiển thị landing mặc định của laravel.
### Writing the Database Migration
Chúng ta cần tạo một bảng `users` để lưu thông tin chi tiết về người dùng. Laravel cung cấp sẵn bản `users` được tìm thấy tại:
`database\migrations\2014_10_12_000000_create_users_table.php` hãy chỉnh sửa nó.
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
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('photo');
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
Sửa đổi file .env để có được một kết nối đến cơ sở dữ liệu & chạy cmd sau:
```php
php artisan migrate
```
Cập nhật User model:
```php
// App\User.php

protected $fillable = [
    'name', 'email', 'password', 'photo'
];
```
Sau khi hoàn tất chúng ta sẽ tiến hành xây dựng giao diện biểu mẫu.
### Building the Frontend
Tạo file `resources/views/register.blade.php` với nội dung sau:
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register | Profile Form</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!-- Styles -->
    <style>
      .form-box{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px
      }
    </style>
  </head>
  <body>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand" href="#">Profile Form</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Register <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Login</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <div class="container">
      <h1>Register</h1>
      <section class="form-box">
        <form action="#" class="col-md-5">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name"  class="form-control" required>
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" name="email" id="email" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="password">
              Password
            </label>
            <input type="password" name="password" id="password" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="photo">Attach a photograph</label>
            <input type="file" name="photo" id="photo" class="form-control-file" required>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-outline-primary">Submit</button>
          </div>
        </form>
      </section>
    </div>
  </body>
</html>

```
Chúng ta sẽ sử dụng bootstrap cho việc css. Chúng ta đã tạo tất cả các trường đều là bắt buộc và người dùng.

Trường đặc biệt quan trọng đối với chúng tôi ở đây là `<input type="file"`. Cập nhật `web.php` để có route đến trang đăng ký.
```javascript
// web.php
...
Route::get('/register', function () {
    return view('register');
});
```
Đến trang `http://localhost:8000/register` sẽ hiển thị trang đăng ký.

![](https://images.viblo.asia/c3cf1842-df32-4419-abf1-8f8733bb15ca.png)

Chúng ta cần chỉ định loại tệp được hỗ trợ, các tệp hình ảnh, chúng ta cần chỉ định trong phần tử đầu vào rằng chúng tôi chỉ muốn các tệp hình ảnh.
Phần file sẽ như sau:
```javascript
<div class="form-group">
  <label for="photo">Attach a photograph</label>
  <input type="file" name="photo" id="photo" accept="image/*" class="form-control-file">
</div>
```
Chúng ta cần thêm thuộc tính `enctype="multipart/form-data"` để có thế upload file.
```html
<form action="#" class="col-md-5" enctype="multipart/form-data">
```
Tiếp theo chúng ta sẽ viết Controller để xử lý dữ liệu tải lên.

### Writing the Controller

Phần backend của chúng ta có thể xử lý việc xác thực, lưu trữ và chuyển hướng, xác thực người dùng... Laravel đi kèm với `RegisterController`và có thể tìm thấy tại: `app\Http\Controllers\Auth\RegisterController.php`.
### Validation
Phương thức `validator` trong RegisterController có chức năng là xác thực dữ liệu đầu vào. Chúng ta sẽ update lại để phản ánh những gì chúng ta mong muốn.
Sửa đổi phương thức `validator` trong RegisterController.php   
```php
protected function validator(array $data)
{
    return Validator::make($data, [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
        'photo' => ['required', 'image']
    ]);
}
```

Trường `name` là bắt buộc và là một chuỗi mắc 255 ký tự. 

Tương tụ với trường email và password.

Trường mật khẩu cần được xác nhận. Trong giao diện người dùng, chúng ta đã thêm một trường cho password_confirmation. Đây là những gì trường mật khẩu được so sánh với giá trị nhập trước đó.

Laravel cũng có quy tắc xác thực images một các tiện dụng là tệp có một trong các đuôi mở rộng sau: jpeg, png, bmp, gif, or svg.Ngoài ra còn nhiều tùy chọn khác...
### Storing
Ở bước tiếp theo là lưu trữ hình ảnh. Chúng ta sẽ tạo chức năng mới để xử lý:
Tệp của chúng ta có thể lưu trữ được ở nhiều nơi khác nhau ví dụ: s3, google driver, local ... Để đơn giản ở 
bài viết này chúng ta sẽ lưu trữ tại local.

```erlang
$request->file('photo')->store('profile')
```

Ảnh sẽ được lưu trức tại `\app\profile` folder. Tệp được lưu với tên file ngẫu nhiêu và url của tệp được trả về.
Chúng ta có thể custom name của file sử dụng phương thức `storeAs`.
```cpp
$request→file(<inputName>)→storeAs(<folderToBeStored>, <customName.fileExtension>)

```

Phần mở rộng của file có thể được lấy sử dụng `clientExtension`.
```erlang
$request->file('photo')->extension()

```
Sử dụng method này chúng ta có thể lưu trữ hình ảnh của người dùng dựa trên tên người dùng.
```php
$fileName = $request->get('name') . '.' . $request->file('photo')->extension();        
$request->file('photo')->storeAs('profile', $fileName);
```
Tiếp theo chúng ta sẽ sử lý lưu hình ảnh vào `storage`.
Thêm nội dung sau bên dưới function `validator`
```php
protected function storeImage(Request $request) {
  $path = $request->file('photo')->store('public/profile');
  return substr($path, strlen('public/'));
}
```
Function `storeImage` lưu trữ ảnh trên path `storage/app/public/profile` và trả về url đến vị trí lưu file.
### Putting it all together
Vì chúng ta đang chỉnh sửa nên chúng ta cần ghi đè phương thức mặc đinh do laravel cung cấp.Laravel cung cập mặc định đăng ký users được tìm thấy tại `Illuminate\Foundation\Auth\RegistersUsers.php`.
Cập nhật `RegisterController`
```php
protected function create(array $data)
{
    return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'photo' => $data['photo']
    ]);
}

public function register(Request $request)
{
    $this->validator($request->all())->validate();

    $imageUrl = $this->storeImage($request);

    $data = $request->all();
    $data['photo'] = $imageUrl;
    $user = $this->create($data);

    $this->guard()->login($user);

    return $this->registered($request, $user)
                    ?: redirect($this->redirectPath());
}
```
Như đã thấy ví dụ trên hàm tạo được thực hiện khi người dùng gửi đến nó.
Chức năng đăng ký là nơi mọi thứ xảy ra. Việc `validation` được thực hiện đầu tiên trước bất kỳ việc nào khác.
Nếu xác nhận được thông qua, chúng ta lưu trữ file. Sau khi hoàn tất, chúng ta tạo người dùng bằng cách chuyển tất cả dữ liệu vào mảng $data.

Nếu tất cả mọi việc thành công. Chúng ta xác thực users và chuyển đến trang chủ.

### Showing the Uploaded Image
Trang chủ là nơi chúng tôi sẽ hiển thị tất cả các thông tin chi tiết về người dùng.
 Đầu tiên, hãy tạo route and controller.
 Run cmd:
 ```
 php artisan make:controller HomeController

 ```
 Cập nhật `HomeController`
 ```
 <?php
 namespace App\Http\Controllers;

 use Illuminate\Support\Facades\Auth;

 class HomeController extends Controller
 {
     function __construct()
     {
         $this->middleware('auth');
     }
     public function show()
     {
         return view('home')->with('user', Auth::user());
     }
 }
 ```
 Trong hàm `__contructor` chúng ta xác định rằng chúng ta sử dụng `auth` middleware. Có nghĩa là chỉ users đã đăng  nhập mới vào được trang này.

 Cập nhật route
 ```
 // web.php
 ...
 Route::get('/home', 'HomeController@show')->name('home');
 ```
 Cuối cùng tạo file `resources/views/home.blade.php`
 ```
 <!DOCTYPE html>
 <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>Home | Profile Form</title>
     <!-- Fonts -->
     <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
     <style>
       body {
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         height: 500px;
       }
       .card {
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         width: 300px;
         padding: 50px 0;
       }
       .card-img-top {
         width: 200px;
         height: 200px;
         border-radius: 50%;
       }
     </style>
   </head>
   <body>
     <div class="card">
       <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">{{$user->name}}</h5>
         <p class="card-text">{{$user->email}}</p>
         <a class="btn btn-warning">Logout</a>
       </div>
     </div>
   </body>
 </html>
 ```

 Chúng ta cần tạo môi liên kết link từ `public/storage` đến `storage/app/public` bằng câu lệnh cmd sau:
 ```
 php artisan storage:link

 ```
 Cập nhật img tags.
 ```
 <img src="{{asset('storage/'.$user->photo)}}" class="card-img-top" alt="...">

 ```
 ### Conclusion
 Qua bài viết này bạn đã biết các xử lý file với laravel chúng bạn thành công.
 ### References

 https://laravel.com/docs/8.x/filesystem

 https://codesource.io/handling-file-uploads-in-laravel/