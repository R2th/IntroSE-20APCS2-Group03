Xin chào anh em, lâu lắm rồi mình lại có thời gian ngồi viết những kiến thức mà mình đã tìm hiểu được trong quá trình làm project. Thi để tiếp nối series [Laravel và những điều thú vị](https://viblo.asia/s/laravel-va-nhung-dieu-thu-vi-o754jLreZM6) thì các bạn biết rồi đấy, nếu như có 1 sản phẩm thì chúng ta có thể nhập tay tự động thêm sản phẩm đó vào trong database của chúng ta. Nhưng quả thật cách đó rất thủ công, không chuyên nghiệp tí nào cả. Vì thế hôm nay mình sẽ giới thiệu cho các bạn một package liên quan đến nhập xuất file **Maatwebsite\Excel** mà chúng ta có thể cài được và sử dụng trong project Laravel của chúng ta.
# 1. Giới thiệu
Thì mình sẽ nói ngắn gọn về package này như thế này: package trên được lấy ý tưởng từ PHPExcel, PhpSpreadsheet, với mục đích rất đơn giản đó là import và export các file excel.
Package cũng cấp một số tính năng cơ bản sau đây:
* Import file excel thành collection.
* Export file excel.
* Import nhiều file cùng một lúc.
* Có hỗ trợ catching.
* Hỗ trợ chunk và queues importer.
* Đọc file excel trong chunk.
# 2. Cách cài đặt
Thì đâu yêu cầu để dùng được package này đó chính là:
* PHP: ^7.0
* Laravel: ^5.5
* PhpSpreadsheet: ^1.4
* PHP extension: php_zip enabled
* PHP extension: php_xml enabled
* PHP extension: php_gd2 enabled
* Cài đặt composer
# 2.1. Cài đặt package.
Chúng ta sẽ dùng composer để tải package này về project Laravel của chúng ta.
```PHP
  composer require maatwebsite/excel
```
Sau đó mở file `config/app.php` ra thêm vào 
```PHP
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]

'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```
Và cuối cùng sau đó chúng ta chạy lệnh 
```PHP
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
```
Thế là xong bước cài đặt package vào trong project của chúng ta rồi đó. Bước tiếp theo mình sẽ lấy một ví dụ để các bạn hiểu rõ hơn nhé. :) 
 # 2.2. Ví dụ
 Bây giờ chúng ta sẽ cài đặt một project Laravel để chúng ta cùng sử dụng package này trong project nhé
 ```PHP
 composer create-project --prefer-dist laravel/laravel blog
 ```
 
 Sau đó chúng ta cài đặt các bước giống như trên để cài package vào project của chúng ta, mình không nói lại ở phần này nữa. Bây giờ chúng ta sẽ tạo ra bảng `products` gồm như sau:
 ```PHP
 <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('category');
            $table->text('description');
            $table->string('image');
            $table->string('level');
            $table->string('time');
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
        Schema::dropIfExists('recipes');
    }
}
 ```
 Tạo model Recipe
 ```PHP
 php artisan make:model Recipe
 ```
 Bây giờ chúng ta sẽ thực hiện import dữ liệu từ file exel vào trong database. Đầu tiên chúng ta cần tạo class import bằng câu lệnh
 ```PHP
 php artisan make:import ImportRecipes --model=Recipe
 ```
 ```PHP
 <?php

namespace App\Imports;

use App\Recipe;
use Maatwebsite\Excel\Concerns\ToModel;

class ImportRecipes implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Recipe([
            'name' => $row[0],
            'category' => $row[1],
            'description' => $row[2],
            'image' => $row[3],
            'level' => $row[4],
            'time' => $row[5],
        ]);
    }
}
 ```
 Tạo 1 controller để test chức năng import nhé
 ```PHP
 php artisan make:controller RecipeController
 ```
 ```PHP
 <?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\ImportRecipes;
use Maatwebsite\Excel\Facades\Excel;

class RecipeController extends Controller
{

    public function index()
    {
        return view('import-recipe');
    }

    public function import()
    {
        Excel::import(new ImportRecipes, request()->file('file'));

        return back();
    }
}

 ```
 Và mình tạo một file import-recipe.blade.php đơn giản để nhập file excel vào
 ```HTML
 <!DOCTYPE html>
<html>
<head>
    <title>Laravel Excel</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
</head>
<body>
    
<div class="container">
    <div class="card mt-4">
        <div class="card-header">
            Import File Excel
        </div>
        <div class="card-body">
            {!! Form::open(['method' => 'POST', 'url' => 'import', 'files' => true]) !!}
                {!! Form::file('file')  !!}
                {!!  Form::submit('Import File') !!}
            {!! Form::close() !!}
        </div>
    </div>
</div>
    
</body>
</html>
 ```
 Thế là mình đã hoàn thành xong chức năng import file excel nhé.
 Tiếp đến là mình sẽ làm chức năng export từ database ra file excel. Đầu tiên chúng ta sẽ có câu lệnh sau đây để tạo ra class export
 ```PHP
 php artisan make:export ExportRecipes --model=Recipe
 ```
 ```PHP
 <?php

namespace App\Exports;

use App\Recipe;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportRecipes implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Recipe::all();
    }
}
 ```
 Và sau đó chúng ta chỉnh sửa 1 chút giao diện trong file import-recipe.blade.php như sau để có thêm chức năng export
 ```HTML
<!DOCTYPE html>
<html>
<head>
    <title>Laravel Excel</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
</head>
<body>
    
<div class="container">
    <div class="card mt-4">
        <div class="card-header">
            Import File Excel
        </div>
        <div class="card-body">
            {!! Form::open(['method' => 'POST', 'url' => 'import', 'files' => true]) !!}
                {!! Form::file('file')  !!}
                <a class="btn btn-info" href="{{ url('export') }}"> 
                 Export File</a>
                {!!  Form::submit('Import File') !!}
            {!! Form::close() !!}
        </div>
    </div>
</div>
    
</body>
</html>
```
Thêm Route nữa nhé 
```PHP
Route::get('export', 'RecipeController@export');
```
Thêm function export trong RecipeController.php
```PHP
public function export() 
    {
        return Excel::download(new ExportRecipes, 'recipes.odt');
    }
```
Ez đúng không, ở trong documentation nó hướng dẫn hết rồi. Bây giờ khi các bạn nhấn vào nút `Export File` thì sẽ có một file `recipes.odt` được tải về.
# 3. Kết luận
Qua ví dụ nho nhỏ ở trên mong rằng cũng phần nào mang đến những điều có ích cho các bạn . Cảm ơn các bạn đã đọc bài viết của mình.
# 4. Tài liệu tham khảo
https://laravel-excel.maatwebsite.nl/