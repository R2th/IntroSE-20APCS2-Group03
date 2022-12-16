![](https://images.viblo.asia/897d6a30-a392-4ff4-96f7-77155fee6f61.jpeg)

Xin Chào các bạn, đến hẹn lại lên hôm này mình lại up thêm 1 bài chia sẽ mới đến các bạn mong là những chia sẽ của mình có thể giúp ích được 1 số bạn nào đó vô tình đang tìm hướng giải quyết cho vấn đề các bạn đang gặp phải..
Hôm nay mình muốn chia sẽ cùng mọi người cách để upload image trong laravel, nhưng có điều hơi đặc biệt 1 chút đó là chúng ta sẽ sử dụng Dropzonejs.
Thời gian qua trên các website, và nhất là các hệ thống thuộc người dùng Nhật bản, họ rất thích trải nghiệm kéo, thả image mỗi khi cần eidt dữ liệu, hơn là việc phải chọn lựa từng file ảnh có lẽ vì đây là trải nghiệm khá là mượt và tiện dụng nên được nhiều người dùng ưa thích.
Chính vì vậy hôm nay mình muốn cùng các bạn tạo ra 1 chức năng nhỏ về việc kéo, thả image trong laravel 6 ( các version khác đều được nhé) để tăng trải nghiệm người dùng nhé..Let's Go.

* Follow these few steps and upload image using dropzone in laravel:
1. Install Laravel App
2. Setup Database Credentials in .env
3. Create Route
4. Generate a Controller & Model
5. Create a View File
6. Start Development Server

## Laravel Install
Điều đầu tiên tất nhiên sẽ là phải install laravel về local của chúng ta, các bạn copy đoạn code của mình ở bên dưới vào dùng cho tiện.
```
composer create-project --prefer-dist laravel/laravel laravelDropzone
```

## Setup Database Credentials in .env
Các bạn tạo trước 1 database trên phpmysql, và chuyển tới file .env và config các thông tin cần thiết.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=databasename
DB_USERNAME=db_username
DB_PASSWORD=db_password
```

## Create Route
Tiếp theo các bạn vào routes/web.php và tạo 2 route như bên dưới.
```
Route::get('dropzone/image','ImageController@index');
Route::post('dropzone/store','ImageController@store');
```

## Generate a Controller & Model
Bây giờ chúng ta cần khởi tạo thêm Model, Controller và migration để phúc vụ cho công việc nhé
```
php artisan make:model Image -mcr
```
với câu lệnh này đã đồng thời tạo ra cho chúng ta cả 3 file cần sử dụng, các bạn di chuyển vào database/migrations... và thếm đoạn code bên dưới vào file images_table mới được tạo thành.
```
public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->text('filename');
            $table->timestamps();
        });
    }
```
Ở đây, như mình đã nói từ đầu là mình sẽ chia sẽ cách để upload file image bằng Dropzonejs vì vậy mà mình ko chú trọng việc thêm nhiều các columns khác nào.
Nếu các bạn muốn thêm thông tin gì tùy các bạn nhé.
Tiếp theo các bạn chạy lệnh để tạo table lên database.
```
php artisan migrate
```
Tiếp theo các bạn sữa lại trong file ImageController chúng ta vừa tạo.
```
<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
 
use App\Image;
 
class HomeController extends Controller
{
 
    public function index()
    {
        return view('image');
    }
 
 
    public function store(Request $request)
    {
        $image = $request->file('file');
        $avatarName = $image->getClientOriginalName();
        $image->move(public_path('images'),$avatarName);
         
        $imageUpload = new Image();
        $imageUpload->filename = $avatarName;
        $imageUpload->save();
        return response()->json(['success'=>$avatarName]);
    }
 
}
```

## Create Blade view
Tiếp theo là việc tạo file view để thực hiện việc upload image.
Các bạn di chuyển vào app/resources/views và tạo 1 file có tên là image.balde.php và thêm đoạn code bên dưới vào.
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Laravel 6 Upload Image Using Dropzone Tutorial</title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"> 
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.0/min/dropzone.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.0/dropzone.js"></script>
  </head>
  <body>
    <div class="container">
      <h2>Laravel 6 Upload Image Using Dropzone Tutorial</h2><br/>
      <form method="post" action="{{url('dropzone/store')}}" enctype="multipart/form-data"
          class="dropzone" id="dropzone">
        @csrf
    </form>
    </div>
    <script type="text/javascript">
        Dropzone.options.dropzone =
        {
            maxFilesize: 10,
            renameFile: function (file) {
                var dt = new Date();
                var time = dt.getTime();
                return time + file.name;
            },
            acceptedFiles: ".jpeg,.jpg,.png,.gif",
            addRemoveLinks: true,
            timeout: 60000,
            success: function (file, response) {
                console.log(response);
            },
            error: function (file, response) {
                return false;
            }
        };
    </script>
  </body>
</html>
```
    Ở đây trên phần thể <head> mình có sử dụng các link dẫn là CDN được các thư viện hỗ trợ gọi online, mình sử dụng 1 số thư viện để hỗ trợ cho việc test và quan trọng nhất là thư viện dropzone.
Các bạn có thể từ từ để tìm hiểu thêm về các thư viện nhé, ở đây là mình chạy test thôi nên mới kéo link CDN dùng luôn cho tiện, nếu các bạn dùng cho dự án thật thì nên dowload về và đưa vào project để tránh tình trạng lỗi file js trong đường truyền khi gọi CDN và có thể làm việc ngay cả khi môi trường xung quanh ko có internet.

## Start Development Server
Cuối cùng là việc khởi chạy server và test kết quả.
```
php artisan serve
 Nếu các bạn đang chạy dự án trên port khác 80, thì các bạn có thể chạy câu lệnh như bên dưới nhé và thay port tương ứng
 php artisan serve --port=8080 
```
![](https://images.viblo.asia/19722394-f646-4d49-809b-6cba9b33910f.png)

Các bạn click vào khung và kéo ảnh từ local vào để test nhé.

## Tổng Kết.
Vậy là xong nhé, mình vừa chai sẽ với các bạn cách để tạo và test về chức năng upload image trong laravel với việc sử dụng dropzonejs.
Như mình đã nói ở trên, các bạn khi tạo bảng có thể tạo thê các trường thông tin khác theo nhu cầu của công việc và chúng ta chỉ cần thêm các ô input trong form nhập liệu và sử lý lại 1 chút trong Controller là ok nhé.
Chúc các bạn thành công và hẹn gặp lại ở các bài chia sẽ sau nhé.