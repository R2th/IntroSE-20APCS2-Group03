# Tổng quan
Như tất cả chúng ta đều biết, tài liệu dưới định dạng pdf giờ khá là phổ biến. Vì sao nó lại phổ biến thì theo tôi tìm hiểu thì vì do các lý do sau: 
<br>
1/ Tính phổ cập: Tức là các file pdf này dù mở ở hệ điều hành nào ta đều đọc được mà không phụ thuộc đã có font đó hay chưa. 
<br>
2/ Tạo ra file rất dễ dàng: Từ các phần mềm như Word, Excel, Power Point, ... rất dễ dàng trong việc chuyển sang pdf. Có lẽ cái này liệu đúng trong lập trình của chúng ta? 
<br>
3/ Dung lượng file giảm: Có lẽ đây là 1 trong ưu điểm nổi bật, đó chính là dung lượng của 1 file pdf giảm đi khá nhiều so với văn bản gốc. 
     Chính vì sự phổ biến và hữu ích như vậy, khi chúng ta làm dự án không ít khách hàng yêu cầu chúng ta phải tạo ra 1 file pdf. Vậy với Laravel, chúng ta sẽ tạo ra như thế nào. Hôm nay chúng ta cùng đi tìm hiểu nhé.
# Cài đặt
đầu tiên chúng ta phải khởi tạo một project mới. các bạn co thể tham khảo tại `https://laravel.com/docs/5.5/installation` . Sau khi khơir tạo xong project,dể có thể sử dụng được pdf thì chúng ta cần cài thêm một package là DOMPDF Wrapper for Laravel 5.chạy đoạn lệnh sau: 
```
composer require barryvdh/laravel-dompdf
```

# Tạo các sample
sau khi cài xong các package thì các thì các bạn vào file thư mục Route->web.php để chúng ta tạo một đường dẫn URL như sau:
```
Route::get('pdf','pdfController@index');
```
như vậy chúng ta hãy tạo thêm một controller là pdfController
```
php artisan make:controller pdfController
```

Tạo phương thức index trong pdfController:
```
 public function index()
    {
    	$data = ['name' => 'tienduong'];	
    	$pdf = PDF::loadView('invoice',  compact('data'));
    		return $pdf->download('invoice.pdf');
    }
```
ở đây thì trong function `loadView('invoice', $data)` có 2 tham số đó là `invoice` va `$data`.thì `invoice` chính là tên của file `invoice.blade.php` file mà chúng ta sẽ in ra file .pdf còn `$data` chính là những biến chứa giá trị mà chúng ta muốn truyền sang view.
ở hàm download thì chúng ta sẽ điền vào tên của file pdf khi được download về
Tạo file invoice.blade.php
```
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }
            .full-height {
                height: 100vh;
            }
            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }
            .position-ref {
                position: relative;
            }
            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }
            .content {
                text-align: center;
            }
            .title {
                font-size: 84px;
            }
            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }
            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                        <a href="{{ route('register') }}">Register</a>
                    @endauth
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    Hello  { { data['name'] } }
                </div>

                <div class="links">
                    <a href="https://laravel.com/docs">Documentation</a>
                    <a href="https://laracasts.com">Laracasts</a>
                    <a href="https://laravel-news.com">News</a>
                    <a href="https://forge.laravel.com">Forge</a>
                    <a href="https://github.com/laravel/laravel">GitHub</a>
                </div>
            </div>
        </div>
    </body>
</html>
```
.Trong trường hợp này chính là file invoice.pdf sẽ được tải xuống khi chạy url.
   Sau khi bạn chạy đường dẫn url của route chũng ta đã tạo trước đó thì trình duyệt sẽ tự động download file invoice.pdf.
   Các bạn hoàn toàn có thể style hay chèn các image vào file invoice.blade.php khi đó các bạn download file pdf về thì giao diện cũng sẽ tương tự như khi các bạn xây dựng trong file view.
#    Tổng kết
   Trên đây là cách để in ra 1 file pdf trong laravel.thật đơn giản khi chúng ta sử dụng với package DOMPDF Wrapper for Laravel 5.bạn hoàn toàn có thể thêm chức năng này vào project của mình đặc biệt với các project liên quan đến bán hàng.các bạn có thể tạo chức năng download này cho khách hàng khi họ có thể hoàn toàn tải về hóa đơn mua hàng của mình.thật đơn giản phải không nào.Cảm ơn các bạn đã theo dõi.
   # Tham Khảo 
`https://viblo.asia/p/tao-file-pdf-dung-laravel-924lJXe8KPM`

 `https://www.youtube.com/watch?v=hIOz0c2aJmo&index=2&list=PLe30vg_FG4OQRBVk9yNbn0cEfkXqTqUZv`