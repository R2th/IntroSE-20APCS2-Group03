# Mở đầu
Gần đây mình mới đi thực tập tại công ty và được yêu cầu tìm hiểu Laravel. Thật sự là lúc đi phỏng vấn cũng chuẩn bị khá kỹ rồi đấy nhưng vào công ty mới nhận thấy bản thân còn thiếu sót khá nhiều, phải tìm hiểu thêm khá nhiều thứ nên mình cũng muốn ghi lại quá trình tìm hiểu của mình để chia sẻ với các bạn.
![](https://images.viblo.asia/4051261d-588a-4ea4-aea2-c510a8df14b0.png)
# Cơ bản Laravel
Khi xây dựng các API, các mô hình cung cấp bốn loại chức năng cơ bản. Mô hình phải có khả năng **Create, Read, Update, và Delete** tài nguyên. Các nhà khoa học máy tính thường gọi tên các các chức năng này bằng từ viết tắt **CRUD**. Một mô hình cần có khả năng thực hiện tối đa bốn chức năng này. Nếu một action không thể được mô tả bởi một trong bốn thao tác này, thì rất có thể nó một mô hình của riêng chính nó mà thôi.

## Khởi tạo project
Laravel hiện tại đã ra đến phiên bản 8.* , các bạn có thể truy cập trang chủ của [Laravel](https://laravel.com/) để đọc chi tiết hơn.
Chạy lệnh sau để khởi tạo project nhé:
```html
composer create-project laravel/laravel <name_project>
```
<name_project> : là tên project của các bạn đặt nhé
Sau đó chạy:
```
cd <name_project>
php artisan serve
```
Kết quả terminal sẽ hiển thị:
![](https://images.viblo.asia/fc3e97bd-187b-40d9-aa8e-b452e8e61b76.png)
Các bạn chỉ cần bật trình duyệt và truy cập đường dẫn http://127.0.0.1:8000 là đã khởi động thành công project Laravel của mình rồi. <br>
Laravel được thiết kế theo mô hình **MVC**, tản mạn chút về MVC nhé.
![](https://images.viblo.asia/a2907734-0b83-4376-8187-5022cc0ffc07.png)

MVC là từ viết tắt bởi 3 từ Model – View – Controller. Đây là mô hình thiết kế sử dụng trong kỹ thuật phần mềm. Mô hình source code thành 3 phần, tương ứng mỗi từ. Mỗi từ tương ứng với một hoạt động tách biệt trong một mô hình. <br>
**Model (M):**<br>
Là bộ phận có chức năng lưu trữ toàn bộ dữ liệu của ứng dụng. Bộ phận này là một cầu nối giữa 2 thành phần bên dưới là View và Controller. Model thể hiện dưới hình thức là một cơ sở dữ liệu hoặc có khi chỉ đơn giản là một file XML bình thường. Model thể hiện rõ các thao tác với cơ sở dữ liệu như cho phép xem, truy xuất, xử lý dữ liệu,… <br>
**View (V):** <br>
Đây là phần giao diện (theme) dành cho người sử dụng. Nơi mà người dùng có thể lấy được thông tin dữ liệu của MVC thông qua các thao tác truy vấn như tìm kiếm hoặc sử dụng thông qua các website.<br>
**Controller (C):**<br>
Bộ phận có nhiệm vụ xử lý các yêu cầu người dùng đưa đến thông qua view. Từ đó, C đưa ra dữ liệu phù hợp với người dùng. Bên cạnh đó, Controller còn có chức năng kết nối với model. <br>

Trong project Laravel, 3 folder chính mà các bạn làm việc với MVC là ***(model) app/Models, (controller) app/Http/Controller,  (view) resources/views.*** <br>
Cấu trúc thư mục 1 project Laravel sẽ như hình: <br>
![](https://images.viblo.asia/59490a43-7da3-4d03-b2b7-0063a80653ce.png) <br>
Ngoài việc quan tâm đến 3 mục MVC thì 1 file rất quan trong khi làm việc với Laravel đó là **route**, bất kể bạn làm việc với frameword nào thì chỉ cần nắm được route của nó thì bạn gần như có được bản đồ để ra khỏi mê cung vậy.

Tìm hiểu qua cấu trúc thư mục rồi thì bắt đầu làm việc với nó nhé.
Khi các bạn truy cập đường dẫn  http://127.0.0.1:8000 giao diện sẽ hiển thị như sau:
![](https://images.viblo.asia/6acb6493-f218-4c2b-82ca-92e12afd2f56.png)
Đây là giao diện hiển thị mặc định của Laravel bản 8.* , các bản cũ hơn thì giao diện sẽ khác một chút nhé. <br>
Bây giờ các bạn để ý phía URL, các bạn có thắc mắc nếu URL thay đổi ( ví dụ mình đổi thành  http://127.0.0.1:8000/abc-test) thì chuyện gì sẽ xảy ra? Trình duyệt sẽ hiểu và xử lý như nào? 
Những thắc mắc này sẽ được trả lời khi các bạn truy cập mục routes/web.php
![](https://images.viblo.asia/79a52791-642d-4b30-8e8d-830f24977641.png)
Đó, đơn giản phải không nào, khi bạn gọi route "**/"** trình duyệt sẽ hiểu bạn đang gọi đến Route::get("/", ...)
trong mục web.php (các mục khác cùng cấp như api.php... mình sẽ cùng các bạn tìm hiểu sau nhé) của Laravel và ở đó đang quy định sẽ trả về view welcome, vậy view này nằm ở đâu? Các bạn truy cập vào resources/views nhé:
![](https://images.viblo.asia/7e17b6a9-274a-464e-bd0c-aed27b93c80f.png)
Laravel mặc định khi return view(...) sẽ tự động gọi về mục views trong thư mục resources nhé :) <br>
Trên kia là ví dụ mặc định của Laravel, vẫn chưa thấy MVC ở đâu nhỉ, bây giờ mới đi vào làm project Laravel này.
Theo kinh nghiệm non nớt của mình thì các bạn cứ bắt đầu với route=>model=>Controller=>view nhé. <br>
Bây giờ chúng ta bắt đầu với việc quản lý user nhé (CRUD User đấy :))
Tạo route xử lý việc thêm user đã nhé
![](https://images.viblo.asia/bb10ced6-ed0a-43b7-bbd8-b81476a8a61d.png)
Route trong bản 8.* sẽ có chút khác biệt so với bản 7.* các bạn tìm hiểu thêm để rõ hơn nhé, mình đang tập trung vào chức năng nên sẽ k lan man thêm nữa.<br>
 Trong route sẽ có 4 thành phần cần chú ý: <br>
 **Route::methotds("url", [ClassController, 'function']);** <br>
 methods : get, post, put, delete... các bạn học web chắc đều nắm được hết rồi nhỉ <br>
 url: khi gọi đến url này thì sẽ tự động hiểu là tìm đến dòng khai báo route này để biết được sẽ làm gì tiếp theo <br>
 ClassController: nơi sẽ diễn ra việc xử lý  <br>
 function: hàm xử lý <br>
##  Controller
 Methods, url thì ok nhưng mà cái ClassController mình nhắc đến nãy giờ kia nó ở đâu ấy nhỉ? Tất nhiên là nó sẽ không tự nhiên mà có rồi, làm sao mà người ta biết được bạn sẽ sử dụng những Contronller nào mà xây dựng sẵn từ đầu cho bạn.
 Laravel có hỗ trọ command để tạo controller: <br>
```php
php artisan make:controller UserController
```
OK, xong rồi đó, hệ thống sẽ tự động tạo file UserController trong mục app/Http/Controller cho bạn.
![](https://images.viblo.asia/11072b38-0c04-4e05-8ccf-05bf8085befb.png)<br>
Có Controller xử lý rồi thì tạo hàm để xử lý nó thôi chứ nhỉ :)
![](https://images.viblo.asia/13c7f36f-86df-48b2-a62c-df049e262a71.png) <br>
Ở đây function create của mình sẽ trả về view create nằm trong mục Users nhé. À mà file view này cũng không tự nhiên mà sinh ra đâu, các bạn phải tự tạo folder users và tạo mục create nằm trong nó  nhé. <br>
Laravel mặc định file view sẽ có đuôi ***.blade.php***.

![](https://images.viblo.asia/24467468-fde1-4dbe-8616-8ef4904024b6.png)
![](https://images.viblo.asia/bfc31bcc-5e68-4366-9a66-0a63adecff32.png)
## Model
Rồi nãy giờ tạo là nhắm đến việc quản lý user, thế quản lý thì phải có lưu trữ chứ, dữ liệu lưu trữ ở đâu và gọi ra kiểu gì, tất nhiên là qua Model rồi. Model sẽ là bước trung gian liên kết giữa Database và Controler để gọi và thao tác với dữ liệu.<br>
Đầu tiên thì phải có database đã chứ nhỉ. Mình sẽ hướng dẫn các bạn tạo DB MySQL với phpmyadmin nhé, mình xử dụng Xampp để tạo, các bạn có thể sử dụng workbend hoặc navicat...  các bước làm cũng tưng tự vậy thôi, hoặc master hơn thì có thể chơi luôn hệ Docker :), có thời gian mình sẽ viết 1 bài về việc chơi hệ Docker với Laravel sau nhé.<br>
Bật xampp và khởi động Apache và MySQL lên nhé.
![](https://images.viblo.asia/b7be9c75-6033-4593-9caa-92a235cc80ca.png)
Bật trình duyệt lên và truy câp http://localhost/phpmyadmin/ hoặc nhanh hơn thì các bạn click vào mục admin cùng hàng với dòng MySQL sẽ tự động điều hướng đến trình duyệt cho bạn.
![](https://images.viblo.asia/b87e2516-fb4a-4139-87a9-a85e26370cba.png)
Đây là giao diện quản lý DB bạn đầu nhá, các bạn chọn ***New*** và tạo mới một DB và đặt tên tùy ý mình, nhớ chọn là utf8_unicode_ci nhá
![](https://images.viblo.asia/2f4393df-8eb8-4d97-98c6-12a3c58cb909.png)
Rồi ok tạo xong rồi, có DB rồi, nhưng mà mình quản lý nhiều DB vậy thì project bằng một cách nào đó phải tìm được nó sẽ nhảy vào làm việc với DB nào chứ. Laravel thông qua ***.env*** để nhận viết nhé.
![](https://images.viblo.asia/94b8d004-3734-46b4-ad1c-a2557deef8e0.png)
Các bạn khai báo DB_DATABASE=<name_project> (tên project vừa tạo nhá)
Mặc định `DB_USERNAME=root & DB_PASSWORD=` sau này khi deploy hoặc vào dự án cty sẽ được cấp thông tin DB thì các bạn tùy chỉnh theo nhé. <br>
Mới có DB thôi chứ đã có bảng quản lý users đâu, tạo bảng thôi. Khi các bạn tạo project Laravel sẽ gợi ý cho bạn 3 bảng  trong mục database/migrate:
![](https://images.viblo.asia/10e7fc8b-05e3-4409-adff-c3e314f8c633.png) <br>
Trong đó đã gợi ý sẵn bảng users rồi, các bạn có thể tự tạo 1 bảng users khác theo ý mình bằng cách chạy command:
```html
php artisan make:migration create_users_table
```
Lưu ý là table được tạo ra được quản lý trong mục database/migrate và có tiền tố là thời gian tạo bảng nhé (không đặt trùng tên các bảng nhé, ở đây nếu bạn tạo bảng users mới thì xóa bảng users cũ đi). <br>
Mình giữ nguyên table users do laravel đã gợi ý sẵn từ đầu nhé vì cũng chả có gì thay đổi nhiều, có thì là sẽ thêm trường quản lý vào thôi.
Tiếp đó chạy:
```php
php artisan migrate
```
Hệ thống sẽ tự động tạo mới các bảng vào DB cho bạn. Bật DB lên kiểm tra xem:
![](https://images.viblo.asia/0a84ccbc-e25c-48bd-8b70-521235b9ea5c.png)
![](https://images.viblo.asia/99c1be51-1210-42e9-8048-c79893a99430.png)
Ok tạo được bảng để quản lý rồi đó, nếu các bạn không thích tạo bằng migrate của Laravel thì có thể chơi tay cũng được nhưng thế thì hơi cục xúc và sau này sẽ khó quản lý hơn. Chi tiết thì đọc [Laravel Migration](https://laravel.com/docs/8.x/migrations) nhé :)
 Có cơ sở dữ liệu rồi, bây giờ chỉ định để nó liên kết với Model nữa thôi. Laravel 8.* đã tạo riêng 1 foldel Models để lưu trữ các class Model, các bạn có thể tạo model bằng command: <br>
```markdown
php artisan make:model <name_model>
```
Ở đây Laravel đã tạo sẵn cho các bạn file Model/User nên chúng ta k phải tạo lại nữa nhưng đối với các model khác thì vẫn phải tự tạo nhé. <br>
Trong model các bạn cần khai báo một số thông tin như: <br>
***protected $table*** = "<name_table>" <br>
***protected $fillable*** = [       array_các trường có thể_tác động____] <br>
TRên đây là 2 mục chính cần quan tâm. Ngoài ra có thể có thêm nhiều yếu tố khác, cùng mình thìm hiểu ở các bài viết sau nhé. Ở đây không cần khai báo protected $table vì mình đã đặt tên bảng là users, model user sẽ tự động gọi đến bảng users, các bạn có thể tìm hiểu kỹ hơn về chuẩn-quy tắc đặt tên sau khi đã nắm rõ bản chất nhé.<br>
![](https://images.viblo.asia/6fdd721e-32a0-4be4-bd4c-d08e3c9128e7.png)

Tạo model xong rồi thì chỉ định để Controller được phép xử dụng Model thôi, các bạn chỉ cần thêm dòng `user app\Models\User `vào Controller muốn tác động.sử dụng dữ liệu của bẳng User là được. Ở đây ta sẽ thêm  `user app\Models\User ` vào UserController.

# CRUD với Laravel
Tạm hiểu và tạo xong những yếu tố cần thiết để thực hiện các chức năng rồi, bây giờ quay lại việc thực hiện chức năng nhé.
## Create user
Ở trên chúng ta đã tạo fiel view/user/creste rồi, bây giờ cần tạo form để nhập thông tin tạo mới user thôi, các bạn tự CSS sao cho đẹp nhé. <br>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Create user</h2>
    <form action="/users/create" method="post">
        @csrf
        <label for="Name">
            Name:
            <input type="text" name="name">
        </label><br><br>
        <label for="Email">
            Email:
            <input type="text" name="email">
        </label><br><br>
        <label for="Password">
            Password:
            <input type="text" name="password">
        </label><br><br>
        <button type="submit">Create user</button>
    </form>
</body>
</html>
```

![](https://images.viblo.asia/b9ec7511-aee7-417e-8b88-b8ae13679d97.png)

Ở đây các bạn chú ý thêm  ***@csrf*** vào form nhé, serve sẽ tự động gửi về máy 1 token để xác thực hành động của ng dùng và chúng ta sẽ dùng token này gửi lại serve mỗi khi gửi request để chứng thực tính hợp lệ của request. <br>
Bên cạnh csrf thì nhớ khai báo đúng action (url sẽ xử lý) và method xử lý. <br>
Khai báo action và method rồi thì quay lại route/web.php và khia báo route vào nhé:
```cpp
Route::get('/users/create', [App\Http\Controllers\UserController::class, 'create']);
// Thêm dòng dưới đây vào
Route::post('/users/create', [App\Http\Controllers\UserController::class, 'store']);
```
 Bây giờ quay về UserController và viết hàm store xử lý việc thêm mới user thôi: <br>

```php
<?php

namespace App\Http\Controllers;

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
// Thêm thư viện để mã hóa password
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function create(){
        return view('users.create');
    }

    public function store(Request $request){
        // Kiểm tra xem dữ liệu từ client gửi lên bao gốm những gì
        // dd($request);

        // gán dữ liệu gửi lên vào biến data
        $data = $request->all();
        // dd($data);
        // mã hóa password trước khi đẩy lên DB
        $data['password'] = Hash::make($request->password);

        // Tạo mới user với các dữ liệu tương ứng với dữ liệu được gán trong $data
        User::create($data);
        echo"success create user";
    }
}
```

Ok rồi đó, vào trình duyệt nhập thông tin và submit thôi, các bạn đã thành công tạo mới user đầu tiên rồi.
![](https://images.viblo.asia/db1998e6-7f7b-4db5-8c0c-da3f2cc49eaa.png)
Đơn giản phải không nào, ở đây có một lưu ý nhỏ đấy là mình đặt name input trong view trùng tên với tên trường trong bảng user, như vậy laravel sẽ tự động nhận biết thay vì đặt name input khác với tên trường thì khi nhận request các bạn sẽ phải đặt tên lại cho đúng trước khi thực hiện việc create user. <br>
Các bạn có thể thử bỏ cmt ở từng dòng dd của mình để xem dữ liệu đã thay đổi như nào qua từng bước xử lý nhé.
 ## Update user
 Tạo mới rồi thì sang phần sửa nhé, đầu tiên vẫn là tạo route để chỉ định việc mình sẽ tác động đến data của thằng nào và việc xử lý tác động đó sẽ thực hiện ở đâu:
 ```
 //Create user
Route::get('/users/create', [App\Http\Controllers\UserController::class, 'create']);
Route::post('/users/create', [App\Http\Controllers\UserController::class, 'store']);

// Update user
// Nhớ là phải truyền thêm id để biết được đối tượng muốn sửa nhé
Route::get('/users/update/{id}', [App\Http\Controllers\UserController::class, 'edit']);
Route::post('/users/update/{id}', [App\Http\Controllers\UserController::class, 'update']);
 ```
 Tạo Route rồi thì quay về UserController tạo hàm xử lý thôi: 

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
// Thêm thư viện để mã hóa password
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function create(){
        return view('users.create');
    }

    public function store(Request $request){
        // Kiểm tra xem dữ liệu từ client gửi lên bao gốm những gì
        // dd($request);

        // gán dữ liệu gửi lên vào biến data
        $data = $request->all();
        // dd($data);
        // mã hóa password trước khi đẩy lên DB
        $data['password'] = Hash::make($request->password);

        // Tạo mới user với các dữ liệu tương ứng với dữ liệu được gán trong $data
        User::create($data);
        echo"success create user";
    }

    public function edit($id){
        // Tìm đến đối tượng muốn update
        $user = User::findOrFail($id);

        // điều hướng đến view edit user và truyền sang dữ liệu về user muốn sửa đổi
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, $id){
        // Tìm đến đối tượng muốn update
        $user = User::findOrFail($id);

        // gán dữ liệu gửi lên vào biến data
        $data = $request->all();
        // dd($data);
        // mã hóa password trước khi đẩy lên DB
        $data['password'] = Hash::make($request->password);

        // Update user
        User::update($data);
        echo"success update user";
    }
}

```
Hiển thị dữ liệu ra view để chỉnh sửa (Tạo file edit.blade.php trong mục views/users)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Create user</h2>
    <form action="/users/update/{{ $user->id }}" method="post">
        @csrf
        <label for="Name">
            Name:
            <input type="text" name="name" value="{{ $user->name }}">
        </label><br><br>
        <label for="Email">
            Email:
            <input type="text" name="email" value="{{ $user->email }}">
        </label><br><br>
        <label for="Password">
            Password:
            <input type="text" name="password" >
        </label><br><br>
        <button type="submit">Edit user</button>
    </form>

</body>
</html>
```
![](https://images.viblo.asia/894fa973-e9bf-4e20-a3b8-ef12710be9ac.png)
Lên trình duyệt truy cập url : http://127.0.0.1:8000/users/update/1 => Nhập thông tin muốn sửa rồi submit thôi ( Mình sửa thử name=>"Linh xinh gái" coi sao nhá :) )
![](https://images.viblo.asia/93f04a08-adb8-499d-9b45-3aa197a7ae7a.png)
Oke xinh gái rồi đấy các bạn :)
## Delete user
Rồi bây giờ chuyển qua xóa user nhá. <br>
Lại vào routes/web.php tạo route xóa user thôi
```rust
Route::get('/users/create', [App\Http\Controllers\UserController::class, 'create']);
Route::post('/users/create', [App\Http\Controllers\UserController::class, 'store']);

// Update user
Route::get('/users/update/{id}', [App\Http\Controllers\UserController::class, 'edit']);
Route::post('/users/update/{id}', [App\Http\Controllers\UserController::class, 'update']);

// Delete user
// Vẫn nhớ phải truyền id vào nhá
Route::get('/users/delete/{id}', [App\Http\Controllers\UserController::class, 'delete']);
```
Lại quay lên UserController xử lý nào
```php
 public function delete($id){
        // Tìm đến đối tượng muốn xóa
        $user = User::findOrFail($id);

        $user->delete();
        echo"success delete user";
    }
```

 Lên trình duyệt truy cập url : http://127.0.0.1:8000/users/delete/1 => Ok xóa xong rồi đó các bạn.

## Read user
Nãy h chúng ta làm được ***CUD*** rồi, còn R nữa thôi. Thật ra thì phần R này trong phần Edit user các bạn đã gặp rồi đó.<br>
***Lấy ra dữ liệu muốn xem => return view và gửi kèm dữ liệu*** <br>
Thôi cùng làm tiếp nhá, lần này mình sẽ lấy ra toàn bộ user đang có trong DB nhá.
1. Tạo route
```rust
// Read user
Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
```
2. Xử lý ở Controller
```rust
public function index(){
        // lấy ra toàn bộ user
        $users = User::all();
        //dd($users);

        // trả về view hiển thị danh sách user
        return view('users.index', compact('users'));
    }
```
3. Tạo view xem cho dễ nào
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>List users</h2>
    <table border="1">
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
        </tr>
        @foreach($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>
```
 Lên trình duyệt truy cập url : http://127.0.0.1:8000/users/ => Xem list danh sách các user đã được lưu trong DB nhé.
 Nếu mà k có gì thì quay lại http://127.0.0.1:8000/users/create tạo thêm vài thằng vào nhá.
![](https://images.viblo.asia/7cc320a3-5b52-43b3-a9f4-303b867077eb.png)

Nãy h cứ phải quay qua quay lại truy cập url cũng bất tiện nhỉ, bây giờ chúng ta tạo thêm 1 cột action trong view để dễ thao tác hơn nhá
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>List users</h2>
    <a href="/users/create">Create new user</a> <hr>
    <table border="1">
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
        </tr>
        @foreach($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>
                    <a href="/users/update/{{ $user->id }}">Update</a> <br> 
                    <a href="/users/delete/{{ $user->id }}">Delete</a>
                <td>
            </tr>
        @endforeach

    </table>

</body>
</html>
```

 ![](https://images.viblo.asia/690b24b4-40cc-4e2f-8596-80ecaf72dca7.png)
Ok rồi đấy, bây giờ các bạn có thế click chuột vào update/create/delete để thực hiện các chức năng rồi đấy.

# Tổng kết
Mình đã hướng dẫn các bạn thực hiện ***CRUD*** với Laravel rồi đấy, cũng đơn giản phải không nào. <br>
Trong bài tiếp theo mình sẽ tiếp tục với câu chuyện CRUD nhé nhưng mà sẽ viết ngắn gọn hơn với resource Controller và sẽ đổ thử dữ liệu API nhé.
Nếu thấy bài viết bổ ích thì cho mình 1 lượt vote lấy động lực viết tiếp nhá :)