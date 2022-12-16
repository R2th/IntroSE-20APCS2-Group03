Autocomplete là điều bắt buộc nếu bạn đang xử lý bảng dữ liệu lớn, ví như bạn có bảng sản phẩm và hàng nghìn bản ghi, như thế không thể đưa vào drop-down , nhưng sẽ tốt hơn nếu chúng ta sử dụng autocomplete thay vì drop-down.

Trong ví dụ này tôi sử dụng plugin Bootstrap typeahead JS để autocomplete, plugin typeahead.js cung cấp layout sử dụng bootstrap nên rất tiện lợi để sử dụng. Bạn có thể thực hiện autocomlete trong ứng dụng laravel của mình chỉ sau vài bước.
# Tạo bảng items  và module
Đầu tiên chúng ta tạo migration với câu lệnh artisan của laravel:
```php
php artisan make:migration create_items_table
```
Sau đó sửa file vừa tạo trong database/migrations như sau:
```php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::drop("items");
    }
}
```
Tiếp theo sẽ là tạo model bên trong `app/Item.php`:
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public $fillable = ['title','description'];
}
```
# Tạo route
Chúng ta cần tạo hai route cho phần search và autocomplete bên trong file routes/web.php
```php
Route::get('search', ['as'=>'search', 'uses'=>'SearchController@search']);
Route::get('autocomplete', ['as'=>'autocomplete', 'uses'=>'SearchController@autocomplete']);
```

# Tạo Controller
Tiếp theo chúng ta sẽ tạo SearchController trong path: `app/Http/Controllers/SearchController.php`
```php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Item;


class SearchController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search()
    {
        return view('search');
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function autocomplete(Request $request)
    {
        $data = Item::select("title as name")->where("title","LIKE","%{$request->input('query')}%")->get();
        return response()->json($data);
    }
}
```
# Tạo View
Chúng ta tiếp tục tạo search.blade.php trong path `resources/views/search.blade.php`:
```html
@extends('layouts.app')


@section('content')


<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>  


<div class="container">


    <h1>Laravel 5 Autocomplete using Bootstrap Typeahead JS</h1>   
    <input class="typeahead form-control" style="margin:0px auto;width:300px;" type="text">


</div>


<script type="text/javascript">
    var path = "{{ route('autocomplete') }}";
    $('input.typeahead').typeahead({
        source:  function (query, process) {
        return $.get(path, { query: query }, function (data) {
                return process(data);
            });
        }
    });
</script>


@endsection
```

Cuối cùng chúng ta được kết quả như sau:
![](https://images.viblo.asia/5cf40ef2-77d5-4ead-87ea-1475fcd28dde.png)

# Kết luận
Chúng ta có thể thấy typeahead rất đơn giản để sử dụng.
Trên github của typeahead https://github.com/bassjobsen/Bootstrap-3-Typeahead còn rất nhiều ví dụ sử dụng cho autocomplete.
Các option sử dụng cũng rất nhiều. như trên ví dụ sử dụng: `source`, type là array hoặc function, là nguồn dữ liệu để truy vấn. Có thể là một array của chuỗi, một array của object JSON có thuộc tính name hoặc một function. function chấp nhận hai đối số, giá trị truy vấn trong input và callback. function này có thể được sử dụng đồng bộ bằng cách callback nguồn dữ liệu trực tiếp hoặc không đồng bộ thông qua đối số duy nhất của callback.

### Ví dụ sử dụng các object JSON thay vì các chuỗi đơn giản
Bạn có thể thêm tất cả các thuộc tính bạn muốn vào các đối tượng của mình, miễn là bạn cung cấp thuộc tính "name" hoặc bạn cung cấp phương thức displayText của riêng bạn. Các giá trị khác cho phép bạn khớp mục đã chọn với mục nào đó trong model của bạn.
```js
var $input = $(".typeahead");
$input.typeahead({
  source: [
    {id: "someId1", name: "Display name 1"},
    {id: "someId2", name: "Display name 2"}
  ],
  autoSelect: true
});
$input.change(function() {
  var current = $input.typeahead("getActive");
  if (current) {
    // Một số item từ model của bạn đang hoạt động!
    if (current.name == $input.val()) {
      // code cho phần value input được tìm thấy
    } else {
      // code
    }
  } else {
    // Không có gì hoạt động nên nó là một giá trị mới (hoặc có thể là giá trị trống)
  }
});
```
# Tài liệu tham khảo
https://github.com/bassjobsen/Bootstrap-3-Typeahead
https://itsolutionstuff.com/post/laravel-5-autocomplete-using-bootstrap-typeahead-js-example-with-demoexample.html