Trong bài này, mình muốn chia sẻ với các bạn từng bước import excel hoặc csv để lưu trữ trong cơ sở dữ liệu và cách export hoặc tải xuống tệp excel hoặc csv từ cơ sở dữ liệu bằng package maatwebsite trong ứng dụng laravel 5.6.

Thông qua package Maatwebsite bạn có thể dễ dàng lấy dữ liệu, bạn cũng có thể nhóm theo dữ liệu, cũng có thể tạo nhiều hơn một trang (sheet), v.v ... vì vậy bây giờ tôi chỉ cho bạn ví dụ đơn giản về bảng items, bạn có thể tải xuống dưới dạng xls, xlsx và csv và bạn cũng có thể nhập dữ liệu trong tệp định dạng xls, xlsx và csv.

Trong ví dụ này, bạn chỉ cần làm theo vài bước để thực hiện nhập và xuất cả hai chức năng trong dự án của bạn. 

Preview:
![](https://images.viblo.asia/95376d38-3a61-4476-8b9c-b3f882de3d39.png)

Bước 1:
Trước hết, chúng ta sẽ cài đặt ứng dụng Laravel 5.6 bằng lệnh sau, vì vậy hãy mở terminal HOẶC command prompt và chạy lệnh dưới đây:
```
composer create-project --prefer-dist laravel/laravel blog
```

Bước 2:
Trong bước này, chúng ta cần cài đặt package Maatwebsite thông qua Composer, do đó, chạy lệnh sau đây:
```
composer require maatwebsite/excel

OR

composer require "maatwebsite/excel":"~2.1.0"
```
Bây giờ hãy mở tập tin config / app.php và thêm service provider và aliase.
```
'providers' => [

	....

	Maatwebsite\Excel\ExcelServiceProvider::class,

],

'aliases' => [

	....

	'Excel' => Maatwebsite\Excel\Facades\Excel::class,

],
```
Bước 3:
Trong bước này, chúng ta phải tạo migration cho bảng item bằng cách sử dụng lệnh php artisan của Laravel 5.6
```
php artisan make:migration create_items_table
```
Sau lệnh này, bạn sẽ tìm thấy một file trong đường dẫn "database/migrations" sau đây và bạn hãy thêm code dưới đây vào file.
```
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
           $table->increments('id');
           $table->string('title');
           $table->text('description');
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
        Schema::drop("items");
    }
}
```
Sau khi tạo bảng "items", bạn nên tạo Model Item, vì vậy trước tiên hãy tạo file trong đường dẫn này "app/Item.php" :
```
<?php
 
namespace App;
 
use Illuminate\Database\Eloquent\Model;
 
class Item extends Model
{

    public $fillable = ['title','description'];
}
```
Bước 4:
Trong bước này, chúng ta cần tạo route cho import và export file. vì vậy hãy mở file "routes / web.php" của bạn.
```
Route::get('importExport', 'MaatwebsiteDemoController@importExport');
Route::get('downloadExcel/{type}', 'MaatwebsiteDemoController@downloadExcel');
Route::post('importExcel', 'MaatwebsiteDemoController@importExcel');
```
Bước 5:
Trong bước này, bây giờ chúng ta nên tạo Controller với tên MaatwebsiteDemoController trong đường dẫn này "app/Http/Controllers/MaatwebsiteDemoController.php". Controller này sẽ quản lý tất cả các yêu cầu impostExport, downloadExcel và importExcel và trả lại response
```
<?php
 
namespace App\Http\Controllers;
 
use App\Item;
use DB;
use Excel;
use Illuminate\Http\Request;
 
class MaatwebsiteDemoController extends Controller
{
 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function importExport()
    {
        return view('importExport');
    }
 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function downloadExcel($type)
    {
        $data = Item::get()->toArray();
            
        return Excel::create('itsolutionstuff_example', function($excel) use ($data) {
            $excel->sheet('mySheet', function($sheet) use ($data)
            {
                $sheet->fromArray($data);
            });
        })->download($type);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function importExcel(Request $request)
    {
        $request->validate([
            'import_file' => 'required'
        ]);
 
        $path = $request->file('import_file')->getRealPath();
        $data = Excel::load($path)->get();
 
        if($data->count()){
            foreach ($data as $key => $value) {
                $arr[] = ['title' => $value->title, 'description' => $value->description];
            }
 
            if(!empty($arr)){
                Item::insert($arr);
            }
        }
 
        return back()->with('success', 'Insert Record successfully.');
    }
}
```
Bước 6:
Trong bước cuối cùng, hãy tạo importExport.blade.php (resource / Views / importExport.blade.php) 
```
<html lang="en">
<head>
    <title>Laravel 5.6 Import Export to Excel and csv Example - ItSolutionStuff.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" >
</head>
<body>
    <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h1>Laravel 5.6 Import Export to Excel and CSV Example - ItSolutionStuff.com</h1>
          </div>
          <div class="panel-body">
 
            <a href="{{ url('downloadExcel/xls') }}"><button class="btn btn-success">Download Excel xls</button></a>
            <a href="{{ url('downloadExcel/xlsx') }}"><button class="btn btn-success">Download Excel xlsx</button></a>
            <a href="{{ url('downloadExcel/csv') }}"><button class="btn btn-success">Download CSV</button></a>
 
            <form style="border: 4px solid #a1a1a1;margin-top: 15px;padding: 10px;" action="{{ url('importExcel') }}" class="form-horizontal" method="post" enctype="multipart/form-data">
                @csrf
 
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
 
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
                        <p>{{ Session::get('success') }}</p>
                    </div>
                @endif
 
                <input type="file" name="import_file" />
                <button class="btn btn-primary">Import File</button>
            </form>
 
          </div>
        </div>
    </div>
</body>
</html>
```
Giờ thì bạn có thể áp dụng và chạy thử được rồi !!