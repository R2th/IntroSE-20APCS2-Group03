Hôm nay mình sẽ làm một demo Tối ưu hóa dung lượng ảnh trước khi gửi lên storage của server với Laravel. Công việc này chắc hẳn các bạn làm back-end vẫn thường xuyên phải xử lý và khá đau đầu phải không nào? Lý do đơn giản nếu như bạn không làm việc tối ưu này rất dễ làm cho kho lưu trữ của bạn nhanh chóng bị đầy khi lượng người dùng gia tăng, chưa hết nó còn làm cho tốc độ tải dữ liệu bị giảm đi đáng kể.

Không phải là một điều xa lạ mỗi khi bạn gặp trường hợp với 2 tấm ảnh cùng size 720x1280 (HD) nhưng 1 cái dung lượng 1Mb còn cái kia lên tới 3Mb mặc dù việc hiển thị là như nhau. Đương nhiên thời gian tải cái số 2 sẽ lâu hơn và băng thông sẽ nhiều hơn.

Vậy để làm sao giải quyết được việc tối ưu hóa dung lượng ảnh này chúng ta cùng theo dõi bài viết và có thể thực hiện luôn trên thiết bị của mình trong lúc đọc bài nhé. :point_down:

### 1. Tạo Project và Cài đặt Intervention Lib

Việc tạo project chỉ cần 1 thao tác như sau (Đối với máy đã có sẵn Composer rồi)

*Command:*

`composer create-project laravel/laravel --prefer-dist coconut-image-smart`

*Kết quả như hình ảnh sau:*

![](https://images.viblo.asia/1c246bf7-8279-435b-b29f-adff00055316.png)


** Cài đặt thư viện Intervention image:**
 
 Đây là một thư viện rất mạnh mẽ trong việc xử lý ảnh trong PHP và nó được sử dụng rất nhiều. Nó có nhiều tính năng như Cắt, thay đổi kích thước, chèn watermark, crop , v.v Thư viện này theo tiêu chuẩn FIG PSR-2 nên nó đảm bảo khả năng tương thích với mã code PHP của bạn.
 
* Command Install:*
 
 `composer require intervention/image`
 
 Hiện tại mình đang sử dụng bản mới nhất: **2.5.1**
 
 ![](https://images.viblo.asia/cb6565de-3d88-49b6-82d6-4574f2c5cd07.png)

 
 
  Tiếp đến bạn vào phần `config/app.php`
  
  Thêm config như sau:
  


$provides => [
    ......,

    Intervention\Image\ImageServiceProvider::class

],

$aliases => [
    .....,

    'Image' => Intervention\Image\Facades\Image::class

]

### 2. Xử lý Ảnh trong Controller

 Để tách biệt từng chức năng cho dễ kiểm soát, hãy tạo 1 controller FilePhotoController:
 
 `php artisan make:controller FilePhotoController`
 
  Bạn vào file vừa tạo và chỉnh sửa logic như sau:
  
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Image;

class FilePhotoController extends Controller
{
    /**
     * Init view.
     */
    public function index()
    {
        return view('welcome');
    }
  
    /**
     * Image resize
     */
    public function imgResize(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'imgFile' => 'required|image|mimes:jpg,jpeg,png,svg,gif|max:8000',
        ]);

        $image = $request->file('imgFile');
        $input['imagename'] = time().'.'.$image->extension();

        $filePath = public_path('/thumbnails');


        $img = Image::make($image->path());
        $img->resize(300, 200, function ($const) {
            $const->aspectRatio();
        })->save($filePath.'/'.$input['imagename']);

        $filePath = public_path('/images');
        $image->move($filePath, $input['imagename']);

        return back()
            ->with('success','Image uploaded')
            ->with('fileName',$input['imagename']);
    }
}
```

Như vậy phần xử lý ảnh trong Controller đã xong, tiếp đến bạn mở 1 route để kết nối đến phần xử lý này. Hãy sang mục số 3 nhé!

### 3.  Tạo Route và UI

Để có thể thao tác thuận tiện hơn chúng ta làm một cái UI với thao tác Upload ảnh và hiển thị lên thumbnail ảnh đã được optimize. 

Tạo View *home-coconut* đây là giao diện chính khi truy cập


`home-coconut.blade.php`

```
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>Coconut Photo Uploader</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
</head>

<body>

<div class="container mt-5">
    @if (count($errors) > 0)
        <div class="alert alert-danger">
            Error occured.<br><br>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <strong>{{ $message }}</strong>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h3>Primary Image:</h3>
                <img src="/images/{{ Session::get('fileName') }}" />
            </div>
            <div class="col-md-4">
                <h3>Thumbnail:</h3>
                <img src="/thumbnails/{{ Session::get('fileName') }}" />
            </div>
        </div>
    @endif

    <form action="{{ route('img-resize') }}" enctype="multipart/form-data" method="post">
        @csrf
        <div class="form-group">
            <input type="text" name="name" class="form-control" placeholder="Name">
        </div>
        <div class="form-group">
            <input type="file" name="imgFile" class="imgFile">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-success">Save</button>
        </div>
    </form>
</div>

</body>

</html>

```

Tạo Route để link tới phần tính năng optimize ở trên:

`web.php`


```
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilePhotoController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [FilePhotoController::class, 'index']);
Route::post('/coconut-photo', [FilePhotoController::class, 'imgResize'])->name('img-resize');

```

 Sau khi bạn bật serve ở dưới local sẽ được như hình ảnh :
 
 ![](https://images.viblo.asia/c490355e-0f05-4c17-bb68-6bd32644aa5b.png)



Bây giờ mình thử upload một file ảnh bất kỳ để xem nó xử lý thế nào nha:

***File gốc Dung lượng 153Kb (800x533)***

***File upload : Dung lượng 30Kb (300x200)***

### 4. Tổng kết

Trên đây là cách optimize ảnh khi bạn lưu trên server bằng cách sử dụng thư viện của PHP, bạn dễ dàng thực hiện được việc tối ưu đem lại những kết quả mong muốn. Giảm size nhưng vẫn đảm bảo chất lượng, ngoài ra nó còn hỗ trợ nhiều tính năng khác cho bạn sử dụng, chèn watermark hay crop v.v 

Mình hy vọng bài viết đem lại sự hữu ích cho các bạn đang cần tìm kiếm cách tối ưng cho server của mình. Hẹn gặp lại trong bài viết sau! :innocent: