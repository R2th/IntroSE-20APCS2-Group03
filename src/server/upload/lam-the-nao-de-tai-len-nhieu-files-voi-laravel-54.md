*Lưu ý: Đây là bài viết từ năm 2017 và mình đã dịch lại, vì thế mình xin phép được giữ nguyên các ví dụ của tác giả. Bên cạnh đó, nội dung mới nhất sẽ được mình cập nhật ở bài viết tiếp theo.*

Upload files là một trong những tính năng được sử dụng phổ biến nhất trong các dự án website hiện nay. Và nó có vẻ khá dễ dàng với 4 thao tác - form, submit, validation và store. Nhưng nó phức tạp hơn một chút nếu bạn muốn cho phép người dùng của mình tải lên nhiều tệp với một lần - hãy xem cách nó được thực hiện trong Laravel.

# 1. Chuẩn bị database
Để có một ví dụ đơn giản nhất, có lẽ chúng ta sẽ dùng bảng products với 2 trường là name và ảnh của nó. Vì vậy, chúng ta tạo models với migration bằng câu lệnh sau:

```
php artisan make:model Product -m
php artisan make:model ProductsPhoto -m
```

*Lưu ý: tham số -m này có nghĩa là migration sẽ được tạo cùng với model - [Tham khảo thêm tại đây.](https://laraveldaily.com/how-to-create-migration-file-with-makemodel-command/)*

File **app/Product.php**:

```
namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name'];
}
```

**Migration** của bảng **products**:

```
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('products');
    }
}
```

Bây giờ, chúng ta tạo một quan hệ giữa hai bảng **products** và bảng **products_photos** qua model **app/ProductsPhoto.php**:

```
namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductsPhoto extends Model
{
    protected $fillable = ['product_id', 'filename'];

    public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
```

Và cuối cùng, tạo migration cho bảng **products_photos**:

```
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsPhotosTable extends Migration
{
    public function up()
    {
        Schema::create('products_photos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products');
            $table->string('filename');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('products_photos');
    }
}
```

# 2. Structure: Routes, Controllers và Views
Chúng ta bắt đầu với hai trang - upload form và trang kết quả. Về cơ bản, chúng ta cần hai routes và một controller.

File **routes/web.php**:

```
Route::get('/upload', 'UploadController@uploadForm');
Route::post('/upload', 'UploadController@uploadSubmit');
```

Tiếp theo, chúng ta tạo ra một controller - có một command làm việc này:

```
php artisan make:controller UploadController
```

Và sau đó chúng ta viết vào controller tạm thời như thế này:

```
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{

    public function uploadForm()
    {
        return view('upload_form');
    }

    public function uploadSubmit(Request $request)
    {
        // Coming soon...
    }

}
```

Thử chạy URL **/upload** trên trình duyệt.

![](https://images.viblo.asia/dc6991ca-69cb-4cae-8926-7a6943f3fb11.png)

Lỗi này báo **“View [upload_form] not found”**, có nghĩa là:
* **Route** và **Controller** làm việc ok.
* Đang thiếu phần view và ta phải tạo nó.

# 3. Tạo view cho phần upload form
Đối với form này, ta chỉ cần sử dụng các thẻ HTML mặc định mà không cần bất kỳ package form nào - form của chúng ta sẽ như thế này:

![](https://images.viblo.asia/7c122ac3-7d0f-43b8-872b-70747c45e10d.png)

```
<form action="/upload" enctype="multipart/form-data" method="post">
{{ csrf_field() }} 
Product name: <br>
<input name="name" type="text"> 
<br><br>
Product photos (can attach more than one): <br>
<input multiple="multiple" name="photos[]" type="file"> 
<br><br>
<input type="submit" value="Upload">
</form>
```

# 4. Validation Request
Bây giờ, hãy quay lại Controller và điền vào method **uploadSubmit()**. Trước khi thực sự tải tệp lên, ta nên có một bước validate dữ liệu trước.

Giả sử rằng chúng ta có tên sản phẩm và ảnh không lớn hơn 2 MB. Chúng ta tạo một file request như sau:

```
php artisan make:request UploadRequest
```

Và sau đó mở file **app/Http/Requests/UploadRequest.php**

```
class UploadRequest extends FormRequest
{

    public function authorize()
    {
        return false;
    }

    public function rules()
    {
        return [
            //
        ];
    }
}
```

Đầu tiên, ta sửa method **authorize()** để return về true, nếu không, ta sẽ không thể pass qua được khi submit.

Tiếp đến method **rules()**, đầu tiên ta thêm tên sản phẩm không được để trống, vì vậy chúng ta có:

```
return [
    'name' => 'required'
];
```

Tiếp theo, chúng ta cần validate cho hình ảnh. Nếu chúng ta chỉ có một ảnh trường , nó sẽ trông như thế này:

```
return [
    'name' => 'required',
    'photo' => 'image|mimes:jpeg,bmp,png|size:2000'
];
```

*Lưu ý: Bạn có thể xem tất cả các quy tắc validate trên [trang tài liệu chính thức này của Laravel.](https://laravel.com/docs/5.4/validation#rule-mimes)*

Nhưng chúng ta có nhiều hơn một tập tin, phải không? Vì vậy, chúng ta có thể điền vào các **rules()** một mảng linh hoạt như thế này với một vòng lặp:

```
public function rules()
{
    $rules = [
        'name' => 'required'
    ];
    $photos = count($this->input('photos'));
    foreach(range(0, $photos) as $index) {
        $rules['photos.' . $index] = 'image|mimes:jpeg,bmp,png|max:2000';
    }

    return $rules;
}
```

Tiếp theo - chúng ta cần đưa file Request này cho Controller, vì vậy ta sẽ phải thay đổi tham số của method. Cũng đừng quên phải **use** nó nhé:

```
namespace App\Http\Controllers;

use App\Http\Requests\UploadRequest;

class UploadController extends Controller
{

    public function uploadForm()
    {
        return view('upload_form');
    }

    public function uploadSubmit(UploadRequest $request)
    {
        // Coming soon...
    }

}
```

Cuối cùng là hiển thị thông báo nếu dữ liệu đẩy lên có lỗi:

```
@if (count($errors) > 0)
<ul><li>{{ $error }}</li></ul>
@endif

<form action="/upload" enctype="multipart/form-data" method="post">...</form>
```

Bây giờ, nếu ta không nhập tên sản phẩm và tải lên một hình ảnh quá lớn - đây là những gì ta sẽ thấy:

![](https://images.viblo.asia/1058dd16-0d07-418b-a34d-69bbefe4edcb.png)

# 5. Lưu dữ liệu
Sau tất cả công việc khó khăn này - cuối cùng chúng ta đã tải lên được dữ liệu. Chúng ta có hai điều cần quan tâm - database và file storage. Hãy bắt đầu với các tệp và ta cần biết về **filesystems** trong Laravel.

Có một tệp **config/filesystems.php** nơi ta chỉ định vị trí lưu trữ tệp của mình. Nó cho phép ta dễ dàng định cấu hình bộ nhớ ngoài như Amazon S3 , nhưng chúng ta sẽ không làm điều đó trong hướng dẫn này - chúng ta sẽ dùng với các tham số mặc định:

```
return [

    'default' => 'local',

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

    // ...
```

Về cơ bản, điều đó có nghĩa là tất cả các tệp của bạn sẽ được lưu trữ trong thư mục **/storage/app**. Không ở **/public**, vì vậy an toàn và không thể truy cập trực tiếp từ URL của trình duyệt. Nhưng bạn có thể thay đổi nó ở đây, nếu cần.

Bản thân việc tải lên tập tin cực kỳ đơn giản trong Laravel. Toàn bộ phương thức trong Controller sẽ trông như thế này:

```
public function uploadSubmit(UploadRequest $request)
{
    $product = Product::create($request->all());
    foreach ($request->photos as $photo) {
        $filename = $photo->store('photos');
        ProductsPhoto::create([
            'product_id' => $product->id,
            'filename' => $filename
        ]);
    }
    return 'Upload successful!';
}
```

Như bạn có thể thấy, phương pháp duy nhất để tải lên tệp là **$photo->store(‘photos’)**. Tham số kia có nghĩa là thư mục con nào sẽ được sử dụng để lưu trữ, vì vậy trong trường hợp này, nó sẽ là **/storage/app/photos**. Tên tệp sẽ được tạo động thành một chuỗi ngẫu nhiên. Như thế này:

![](https://images.viblo.asia/5d77ea8c-825f-4691-83f0-1e4bfb68cc98.png)

Còn đây là trong database:

![](https://images.viblo.asia/89f9a83d-5449-4193-b755-4a1e093a4c32.png)

![](https://images.viblo.asia/541de940-2a49-47e4-b962-f82ce905bad1.png)

Về cơ bản, chính là như thế này! Tất nhiên, bạn có thể làm thêm những cái khác nữa và thêm nhiều validate, thay đổi kích thước hình ảnh, hình thu nhỏ và nhiều chức năng hơn. Nhưng đó là một chủ đề cho một bài viết khác, mình có thể đề xuất một vài package để làm việc với hình ảnh:

* http://image.intervention.io/getting_started/installation#laravel
* https://freek.dev/684-a-package-to-easily-manipulate-images-in-php

Cuối cùng, nếu các bạn muốn thử với đoạn code trên, mình đã nén vào cho các bạn, các bạn có thể [tải tại đây.](https://laraveldaily.com/wp-content/uploads/2017/02/laravel-multiple-file-upload.zip)

# 6. Tham khảo
Bài trên mình dịch từ: https://laraveldaily.com/upload-multiple-files-laravel-5-4/