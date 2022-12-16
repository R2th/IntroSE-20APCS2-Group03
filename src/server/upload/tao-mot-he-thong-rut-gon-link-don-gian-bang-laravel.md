Hôm nay, tôi muốn chia sẻ cho các bạn cách tạo đường link rút gọn bằng laravel. Đôi khi bạn muốn gửi cho bạn bè một đường link nào đó, nhưng mà vì muốn gây bất ngờ và cũng là tạo sự gọn gàng thì bạn cần phải rút ngắn đường link đó. Hiện nay thì có rất nhiều dịch vụ hỗ trợ giúp bạn việc này, nhưng nếu bạn muốn làm cho mình một cái đơn giản để sử dụng thì bạn có thể làm theo hướng dẫn này nhé.

**Bước 1: Cài đặt Laravel**

Đầu tiên bạn khởi tạo ứng dụng bằng cách chạy lệnh sau trên command:

```
composer create-project --prefer-dist laravel/laravel blog
```

**Bước 2: Tạo bảng**

Chúng ta tiếp tục tạo bảng short_link nhé

```
php artisan make:migration create_short_links_table
```
Sau khi lệnh được chạy xong, chúng ta tìm theo đường dẫn database/migrations đến file vừa tạo, chỉnh sửa file đó như sau:

```
<?php
  
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
   
class CreateShortLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('short_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code');
            $table->string('link');
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
        Schema::dropIfExists('short_links');
    }
}
```
Chúng ta tiếp tục chạy lệnh sau:

```
php artisan migrate
```
**Bước 3: Tạo Model**

Ở bước này, chúng ta sẽ tạo model ShortLinh bằng cách chạy lệnh sau
```
php artisan make:model ShortLink
```
Sau đó sửa lại file model ShortLink.php
```
<?php
   
namespace App;
   
use Illuminate\Database\Eloquent\Model;
   
class ShortLink extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'link'
    ];
}
```
**Bước 4: Tạo Route**

Tại file web.php, ta sửa như sau

```
Route::get('generate-shorten-link', 'ShortLinkController@index');
Route::post('generate-shorten-link', 'ShortLinkController@store')->name('generate.shorten.link.post');
   
Route::get('{code}', 'ShortLinkController@shortenLink')->name('shorten.link');
```
**Bước 5: Tạo Controller**

Chúng ta chạy lệnh sau:
```
php artisan make:controller ShortLinkController
```
Sau đó sửa lại file app/Http/Controllers/ShortLinkController.php
```
<?php
  
namespace App\Http\Controllers;
   
use Illuminate\Http\Request;
use App\ShortLink;
  
class ShortLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shortLinks = ShortLink::latest()->get();
   
        return view('shortenLink', compact('shortLinks'));
    }
     
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
           'link' => 'required|url'
        ]);
   
        $input['link'] = $request->link;
        $input['code'] = str_random(6);
   
        ShortLink::create($input);
  
        return redirect('generate-shorten-link')
             ->with('success', 'Shorten Link Generated Successfully!');
    }
   
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function shortenLink($code)
    {
        $find = ShortLink::where('code', $code)->first();
   
        return redirect($find->link);
    }
}
```
**Bước 6: Tạo view**

Bước cuối cùng, tạo file shortenLink.blade.php trong resource/views/shortenLink.blade.php và sửa lại file này như sau:
```
<!DOCTYPE html>
<html>
<head>
    <title>How to create url shortener using Laravel? - ItSolutionStuff.com</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" />
</head>
<body>
   
<div class="container">
    <h1>How to create url shortener using Laravel? - ItSolutionStuff.com</h1>
   
    <div class="card">
      <div class="card-header">
        <form method="POST" action="{{ route('generate.shorten.link.post') }}">
            @csrf
            <div class="input-group mb-3">
              <input type="text" name="link" class="form-control" placeholder="Enter URL" aria-label="Recipient's username" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-success" type="submit">Generate Shorten Link</button>
              </div>
            </div>
        </form>
      </div>
      <div class="card-body">
   
            @if (Session::has('success'))
                <div class="alert alert-success">
                    <p>{{ Session::get('success') }}</p>
                </div>
            @endif
   
            <table class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Short Link</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($shortLinks as $row)
                        <tr>
                            <td>{{ $row->id }}</td>
                            <td><a href="{{ route('shorten.link', $row->code) }}" target="_blank">{{ route('shorten.link', $row->code) }}</a></td>
                            <td>{{ $row->link }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
      </div>
    </div>
   
</div>
    
</body>
</html>
```
Vậy là đã xong, chúng ta cùng chạy chương trình bằng lệnh này nhé:
```
php artisan serve
```

Bây giờ bạn có thể mở url dưới đây trên trình duyệt của mình:
```
http://localhost:8000/generate-shorten-link
```

Chúc bạn thành công.

Tài liệu tham khảo:

https://laravel.com/

https://itsolutionstuff.com/post/how-to-create-url-shortener-using-laravelexample.html