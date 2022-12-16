# 1. Giới thiệu
Trong dự án tôi có làm task upload file cho student, nên tôi đã tìm hiểu thư viện dzopzone và tôi xin chia sẻ kiến thức tìm hiểu được bằng ví dụ sau.
Trong ví dụ này, tôi sẽ sử dụng dropzone trong dự án Laravel của tôi để tải lên các file. Hơn nữa, tôi sẽ viết một số code để check file upload lên.

Mục tiêu của  ví dụ bao gồm:

* Tải lên nhiều hình ảnh với dropzone
* Lưu hình ảnh với tên tệp duy nhất vào cơ sở dữ liệu
* Xóa hình ảnh trực tiếp từ hộp xem trước dropzone
* Thay đổi kích thước hình ảnh với sự can thiệp
* Bộ đếm hình ảnh trên hình ảnh được tải lên
* Tạo bảng để hiển thị hình ảnh đã tải lên

Tôi sẽ sử dụng Laravel 5.5 cho ví dụ này nhưng bạn cũng có thể sử dụng các phiên bản mới hơn :
![](https://images.viblo.asia/4c19c55f-3bc9-40e9-a958-0a58874aae29.png)
# 2. Bắt đầu
Hãy bắt đầu bằng cách tạo một dự án Laravel mới có tên là upload (bạn có thể đặt tên tùy bạn thích) bằng cách chạy lệnh sau:
```
composer create-project --prefer-dist laravel/laravel upload
```
Trong tệp .env của bạn thiết lập thông tin cơ sở dữ liệu của bạn và tạo cơ sở dữ liệu. Tôi sẽ sử dụng một cơ sở dữ liệu MySQL có tên là upload.

Tiếp theo tải xuống tệp dropzone.css và tệp dropzone.js từ cdnjs.com và lưu chúng trong thư mục public/css và public/js của bạn. Ngoài ra, với styling, bạn hãy tải xuống tệp css bootstrap 4 từ trang web chính thức của nó và lưu nó trong thư mục public/css của bạn dưới dạng boostrap.css. Ngoài ra, tạo một tệp custom.css trống trong thư mục public/css của bạn. tôi sẽ sử dụng nó cho việc tủy chỉnh lại style. Dropzone sử dụng jQuery, vì vậy bạn cũng cần tải xuống và lưu jquery.js trong thư mục public/js của bạn.
# 3. Định nghĩa các route
Tôi sẽ sử dụng 4 route trong ứng dụng của chúng tôi. Các tuyến này sẽ được sử dụng để hiển thị hình ảnh, tải lên hình ảnh, xóa hình ảnh và xem tất cả hình ảnh được tải lên theo thứ tự được xác định. 
```
Route::get('/', 'UploadImagesController@create');
Route::post('/images-save', 'UploadImagesController@store');
Route::post('/images-delete', 'UploadImagesController@destroy');
Route::get('/images-show', 'UploadImagesController@index');
```
# 4. Tạo ra trang upload file
Bây giờ tạo ra file để hiển thị form upload file. Tạo một tệp main.blade.php trong thư mục resource/view. Đây sẽ là tập tin chính của tôi mà tôi sẽ mở rộng hơn nữa. 
```js
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Uploading images in Laravel with DropZone</title>
 
    <link rel="stylesheet" href="{{ url('/css/bootstrap.css') }}">
 
    @yield('head')
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="{{ url('/') }}">Upload</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/') }}">Upload Images</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/images-show') }}">View Uploaded Files</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container-fluid">
        @yield('content')
    </div>
 
    @yield('js')
 
</body>
</html>
```
Trong tệp ở trên, tôi chỉ đơn giản thêm require style-sheets, tạo một bootstrap navbar và thêm một vài component balde
Bây giờ, tạo một tệp xem khác có tên upload.blade.php. Trong tệp này, tôi sẽ thêm dropzone để tải tệp lên. 
```js
@extends('main')
 
@section('head')
    <link rel="stylesheet" href="{{ url('/css/dropzone.css') }}">
    <link rel="stylesheet" href="{{ url('/css/custom.css') }}">
@endsection
 
@section('js')
    <script src="{{ url('/js/jquery.js') }}"></script>
    <script src="{{ url('/js/dropzone.js') }}"></script>
    <script src="{{ url('/js/dropzone-config.js') }}"></script>
@endsection
 
@section('content')
 
    <div class="row">
        <div class="col-sm-10 offset-sm-1">
            <h2 class="page-heading">Upload your Images <span id="counter"></span></h2>
            <form method="post" action="{{ url('/images-save') }}"
                  enctype="multipart/form-data" class="dropzone" id="my-dropzone">
                {{ csrf_field() }}
                <div class="dz-message">
                    <div class="col-xs-8">
                        <div class="message">
                            <p>Drop files here or Click to Upload</p>
                        </div>
                    </div>
                </div>
                <div class="fallback">
                    <input type="file" name="file" multiple>
                </div>
            </form>
        </div>
    </div>
 
    {{--Dropzone Preview Template--}}
    <div id="preview" style="display: none;">
 
        <div class="dz-preview dz-file-preview">
            <div class="dz-image"><img data-dz-thumbnail /></div>
 
            <div class="dz-details">
                <div class="dz-size"><span data-dz-size></span></div>
                <div class="dz-filename"><span data-dz-name></span></div>
            </div>
            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
            <div class="dz-error-message"><span data-dz-errormessage></span></div>
 
 
 
            <div class="dz-success-mark">
 
                <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                    <!-- Generator: Sketch 3.2.1 (9971) - http://www.bohemiancoding.com/sketch -->
                    <title>Check</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>
                    </g>
                </svg>
 
            </div>
            <div class="dz-error-mark">
 
                <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                    <!-- Generator: Sketch 3.2.1 (9971) - http://www.bohemiancoding.com/sketch -->
                    <title>error</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">
                            <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    </div>
    {{--End of Dropzone Preview Template--}}
@endsection
```
Trong đoạn code trên, trước tiên tôi thêm tệp dropzone.css và tệp custom.css của tôi. Sau đó, tôi sẽ thêm jquery.js, dropzone.js và dropzone-config.js mà tôi sẽ tạo sau này.

Trong phần nội dung, tôi có một thẻ h2 chứa một thẻ span với id="counter" để đếm số lượng file. Nó sẽ được tăng lên khi tôi tải lên một hình ảnh và giảm xuống nếu tôi xóa hình ảnh. Tiếp theo, tôi đang tạo một form và gán class dropzone cho nó. Hơn nữa chúng tôi có một số văn bản sẽ được hiển thị trong hộp tải lên của chúng tôi. Ngoài ra còn có div dự phòng, sẽ được hiển thị trong trường hợp JavaScript không được bật và hộp tải lên tệp mặc định sẽ được hiển thị. Bạn có thể kiểm tra nó bằng cách vô hiệu hóa JavaScript. Bên dưới này, chúng tôi có mẫu xem trước Dropzone. Tôi đã sao chép nó từ dropzonejs.com và nó chỉ đơn giản được sử dụng để hiển thị hình thu nhỏ khi chúng tôi đang tải lên các tệp. Ngoài ra, nếu hình ảnh được tải lên thành công, nó sẽ hiển thị một đánh dấu, nếu không nó sẽ hiển thị chéo và lỗi. Đó là những gì mà Dropzone Preview Template phần làm.
# 5. Cấu hình dropzone
Bây giờ chúng tôi sẽ thiết lập tệp dropzone-config.js và viết tất cả các cấu hình cho dropzone, với nội dung như sau:
```js
let total_photos_counter = 0;
Dropzone.options.myDropzone = {
    uploadMultiple: true,
    parallelUploads: 2,
    maxFilesize: 16,
    previewTemplate: document.querySelector('#preview').innerHTML,
    addRemoveLinks: true,
    dictRemoveFile: 'Remove file',
    dictFileTooBig: 'Image is larger than 16MB',
    timeout: 10000,
 
    init: function () {
        this.on("removedfile", function (file) {
            $.post({
                url: '/images-delete',
                data: {id: file.name, _token: $('[name="_token"]').val()},
                dataType: 'json',
                success: function (data) {
                    total_photos_counter--;
                    $("#counter").text("# " + total_photos_counter);
                }
            });
        });
    },
    success: function (file, done) {
        total_photos_counter++;
        $("#counter").text("# " + total_photos_counter);
    }
};
```
Trong tệp trên, chúng tôi đang thêm các tùy chọn cấu hình cho dropzone. Bạn có thể tìm thấy tất cả các tùy chọn cấu hình có sẵn trên tài liệu chính thức của [dropzone](https://www.dropzonejs.com/#config-url).

Đầu tiên, tôi đang tạo một biến có tên là total_photos_corer. Biến này sẽ được sử dụng làm bộ đếm và tôi sẽ tăng hoặc giảm nó khi cần. Sau đó, chúng tôi sẽ hiển thị nó trong khối span với một id của bộ đếm. Tiếp theo, tôi đang tạo một đối tượng có tên Dropzone.options.myDropzone.
Với tùy chọn trong đoạn code trên như sau:

* uploadMultiple: cho phép upload nhiều file
* parallelUploads: thực hiện phép upload song song 2 file cùng lúc
* maxFilesize: file upload tối đa 16mb

Tiếp theo là tôi sẽ thêm đoạn code cho file custom.css để style cho trang upload file
```css
.page-heading {
    margin: 20px 0;
    color: #666;
    -webkit-font-smoothing: antialiased;
    font-family: "Segoe UI Light", "Arial", serif;
    font-weight: 600;
    letter-spacing: 0.05em;
}
 
#my-dropzone .message {
    font-family: "Segoe UI Light", "Arial", serif;
    font-weight: 600;
    color: #0087F7;
    font-size: 1.5em;
    letter-spacing: 0.05em;
}
 
.dropzone {
    border: 2px dashed #0087F7;
    background: white;
    border-radius: 5px;
    min-height: 300px;
    padding: 90px 0;
    vertical-align: baseline;
}
```
# 6. Tạo file migration
Sử dung comman sau để tạo model và file migration 
```php
php artisan make:model Upload -m
```
Bây giờ tôi thay thế file created_uploads_table.php nằm trong thư mục database/migrations với nội dung như sau
```php
public function up()
{
    Schema::create('uploads', function (Blueprint $table) {
        $table->increments('id');
        $table->text('filename');
        $table->text('resized_name');
        $table->text('original_name');
        $table->timestamps();
    });
}
```
chạy lệnh sau để tạo database migration
```
php artisan migrate
```
# 7. Code logic
Bây giờ, hãy tạo ra UploadImagesController bằng cách chạy lệnh sau:
```php
php artisan make:controller UploadImagesController
```
Chúng tôi sẽ sử dụng thư viện intervention image để thay đổi kích thước hình ảnh và tạo biểu tượng. Chạy lệnh sau để yêu cầu thư viện intervention:
```php
composer require intervention/image 2.4
```
Trong file UploadImagesController 
```php
<?php
 
namespace App\Http\Controllers;
 
use App\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\Facades\Image;
 
class UploadImagesController extends Controller
{
 
    private $photos_path;
 
    public function __construct()
    {
        $this->photos_path = public_path('/images');
    }
 
    /**
     * Display all of the images.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $photos = Upload::all();
        return view('uploaded-images', compact('photos'));
    }
 
    /**
     * Show the form for creating uploading new images.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('upload');
    }
 
    /**
     * Saving images uploaded through XHR Request.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $photos = $request->file('file');
 
        if (!is_array($photos)) {
            $photos = [$photos];
        }
 
        if (!is_dir($this->photos_path)) {
            mkdir($this->photos_path, 0777);
        }
 
        for ($i = 0; $i < count($photos); $i++) {
            $photo = $photos[$i];
            $name = sha1(date('YmdHis') . str_random(30));
            $save_name = $name . '.' . $photo->getClientOriginalExtension();
            $resize_name = $name . str_random(2) . '.' . $photo->getClientOriginalExtension();
 
            Image::make($photo)
                ->resize(250, null, function ($constraints) {
                    $constraints->aspectRatio();
                })
                ->save($this->photos_path . '/' . $resize_name);
 
            $photo->move($this->photos_path, $save_name);
 
            $upload = new Upload();
            $upload->filename = $save_name;
            $upload->resized_name = $resize_name;
            $upload->original_name = basename($photo->getClientOriginalName());
            $upload->save();
        }
        return Response::json([
            'message' => 'Image saved Successfully'
        ], 200);
    }
 
    /**
     * Remove the images from the storage.
     *
     * @param Request $request
     */
    public function destroy(Request $request)
    {
        $filename = $request->id;
        $uploaded_image = Upload::where('original_name', basename($filename))->first();
 
        if (empty($uploaded_image)) {
            return Response::json(['message' => 'Sorry file does not exist'], 400);
        }
 
        $file_path = $this->photos_path . '/' . $uploaded_image->filename;
        $resized_file = $this->photos_path . '/' . $uploaded_image->resized_name;
 
        if (file_exists($file_path)) {
            unlink($file_path);
        }
 
        if (file_exists($resized_file)) {
            unlink($resized_file);
        }
 
        if (!empty($uploaded_image)) {
            $uploaded_image->delete();
        }
 
        return Response::json(['message' => 'File successfully delete'], 200);
    }
}
```
Đoạn code phía trên giải thích như sau:

* **Hàm index**: lấy toàn bộ dữ liệu file upload lên rồi trả về phía view
* **Hàm create**: trả về view cho người dùng có thể upload file lên server
* **Hàm store**: được gọi khi tôi tải lên một tệp thông qua dropzone. Dropzone sẽ gửi một mảng hình ảnh vì tôi đặt uploadMultipl thành true trong tệp dropzone-config.js. Hình ảnh tải lên sẽ được lưu trong thư mục public/image. Nếu thư mục không tồn tại, nó sẽ được tạo. Sau đó tôi sẽ lặp qua tất cả các tệp, tạo các name và resize_name. $name sẽ là tên duy nhất cho tệp được tải lên và $resize_name sẽ là tên của biểu tượng được tạo. Thư viện intervention image tiếp tục sử dụng để tạo biểu tượng có chiều rộng 250px mà không thay đổi tỷ lệ khung hình. Cuối cùng, một bản ghi cơ sở dữ liệu được tạo và trả về json thành công được gửi lại
* **Hàm destroy**: sẽ được sử dụng để xóa hình ảnh. tôi đang gửi id với yêu cầu trong tệp dropzone-config.js của tôi. Id này là tên gốc của tệp. Vì vậy, Đơn giản là một truy vấn cơ sở dữ liệu được tạo và nếu bản ghi không tồn tại, 400 sẽ được trả về. Nếu bản ghi tồn tại, tôi xóa các tệp và bản ghi nếu chúng tồn tại và trả về json thành công.
# 8. Hiển thị dữ liệu ra view
Trong hàm index tôi đã trả về view **uploaded-images**, nhưng mà chưa tạo ra nó nên bây giờ tôi tạo một file tên là uploaded-images.blade.php để hiển thị dữ liệu trả về từ serve với nội dung như sau:
```js
@extends('main')
 
@section('js')
    <script src="{{ url('/js/jquery.js') }}"></script>
@endsection
 
@section('content')
    <div class="table-responsive-sm">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Image</th>
                <th scope="col">Filename</th>
                <th scope="col">Original Filename</th>
                <th scope="col">Resized Filename</th>
            </tr>
            </thead>
            <tbody>
            @foreach($photos as $photo)
                <tr>
                    <td><img src="/images/{{ $photo->resized_name }}"></td>
                    <td>{{ $photo->filename }}</td>
                    <td>{{ $photo->original_name }}</td>
                    <td>{{ $photo->resized_name }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
```
# 9. Kết luận
Trong ví dụ trên tôi đã giới thiệu thư viện dzopzone cũng như cách sử dụng khi kết hợp với laravel để có thể upload file lên trên server.
# 10. Tài liệu tham khảo
https://tutsforweb.com/laravel-5-5-and-dropzone-js-uploading-images-with-removal-links/
https://www.dropzonejs.com/#config-url