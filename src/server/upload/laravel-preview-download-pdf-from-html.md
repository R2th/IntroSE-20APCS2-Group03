Trong bài viết này mình sẽ chia sẻ cách preview, download file pdf từ HTML với laravel 5.7+.<br>
Mình sẽ sử dụng dompdf (barryvdh/laravel-dompdf package) để tạo file pdf trong ví dụ nhé.<br>

### Step1: Install laravel-dompdf Package
Đầu tiên mình sẽ cài đặt barryvdh/laravel-dompdf bởi composer command bên dưới trong ứng dụng.<br>
```
composer require barryvdh/laravel-dompdf
```
Sau khi cài đặt thành công package, mình sẽ mở file config/app.php và thêm service provider and alias.<br>
**config/app.php**
```
'providers' => [
	....
	Barryvdh\DomPDF\ServiceProvider::class,
],
  
'aliases' => [
	....
	'PDF' => Barryvdh\DomPDF\Facade::class,
]
```

### Step 2: Create Routes
Mở file routes/web.php và thêm code như bên dưới.<br>
**routes/web.php**
```
Route::get('generate-pdf','ItemController@generatePDF');
```
### Step 3: Create Controller
Mình sẽ tạo ItemController.php với phương thức generatePDF trong route và thêm code như bên dưới.<br>
**app/Http/Controllers/ItemController.php**
```
<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use PDF;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function generatePDF()
    {
        $data = ['title' => 'Welcome to Viet Nam'];
        $pdf = PDF::loadView('myPDF', $data);
        //Nếu muốn hiển thị file pdf theo chiều ngang
        // $pdf->setPaper('A4', 'landscape');
        
        //Nếu muốn download file pdf
        return $pdf->download('myPDF.pdf');
        
        //Nếu muốn preview in pdf
        //return $pdf->stream('myPDF.pdf');
    }
}
```

Trong phương thức generatePDF mình đã ghi chú cách preview, download và hiển thị pdf theo kiểu landscape(bề ngang).<br>

### Step 4: Create Blade File
Mình sẽ tạo file myPDF.blade.php(resources/views/myPDF.blade.php) để hiển thị layout của file pdf và thêm code như bên dưới.<br>
**resources/views/myPDF.blade.php**
```
<!DOCTYPE html>
<html>
<head>
	<title>Hi</title>
</head>
<body>
	<h1>Welcome to ItSolutionStuff.com - {{ $title }}</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</body>
</html>
```
Thay vì fix cứng dữ liệu hiển thị ra file pdf, các bạn có thể hiển thị dữ liệu từ database vào file pdf nhé.<br>
Cuối cùng chạy code và kiểm tra kết quả.