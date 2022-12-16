# Introduction
Trong các framework khác việc phân trang khá là đau đầu. Paginator của laravel được tích hợp với `query builder` , `Eloquent ORM`  và cung cấp sử dụng rất thuận tiện, dễ dàng phân trang với kết quả truy xuất từ db. Phần gen HTML của paginator được tích hợp với  [`Bootstrap CSS framework`.](https://getbootstrap.com/)
# Basic Usage
## Paginating Query Builder Results
Có một số cách để phân trang các mục. Cách đơn giản nhất là sử dụng phương thức dựa trên `query builder `hoặc `Eloquent query `. Phương thức paginate sẽ tự động thiết lập limit thích hợp và offset dựa trên trang hiện tại đang được người dùng xem. Theo mặc định, trang hiện tại được phát hiện bởi giá trị của đối số `page` trong chuỗi truy vấn trên yêu cầu HTTP. Tất nhiên, giá trị này được Laravel tự động phát hiện và cũng tự động chèn vào các liên kết được tạo ra bởi paginator. 

Trong ví dụ này, đối số duy nhất được truyền đến phương thức `paginate` là số items bạn muốn hiển thị trên mỗi trang 'per page'. Trong trường hợp này, hãy xác định rằng chúng tôi muốn hiển thị 15 records trên mỗi trang:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show all of the users for the application.
     *
     * @return Response
     */
    public function index()
    {
        $users = DB::table('users')->paginate(15);

        return view('user.index', ['users' => $users]);
    }
}
```
> Hiện tại, các hoạt động pagination sử dụng groupBy không thể được thực hiện hiệu quả bởi Laravel. Nếu bạn muốn sử dụng kết quả `groupBy` để phân trang, recommend là bạn nên truy vấn db và tạo ra `paginator` thủ công.``
### "Simple Pagination"
Nếu bạn chỉ muốn hiển thị `Next` và `Previous` trong phần view phân trang, bạn nên sử dụng phương thức `simplePaginate`  để thực hiện truy vấn hiệu quả hơn. Điều này rất hữu ích cho các bộ dữ liệu lớn khi bạn không cần hiển thị liên kết cho mỗi số trang tại chế độ xem của bạn:
```
$users = DB::table('users')->simplePaginate(15);
```
## Paginating Eloquent Results
Bạn cũng có thể phân trang dựa trên Eloquent query. Trong ví dụ này chúng ta sẽ phân trang với User model và hiển thị 15 item mỗi trang. Như bạn thấy, cú pháp gần như giống với kết quả paginating query builder:
```
$users = App\User::paginate(15);
```
Tất nhiên, bạn có thể gọi paginate sau khi thiết lập các ràng buộc khác trên truy vấn, chẳng hạn như các mệnh đề `where`:
```
$users = User::where('votes', '>', 100)->paginate(15);
```
Bạn cũng có thể sử dụng phương thức `simplePaginate` khi phân trang với Eloquent model:
```
$users = User::where('votes', '>', 100)->simplePaginate(15);
```
## Manually Creating A Paginator
Đôi khi bạn có thể muốn tạo ra một pagination instance thủ công, qua một mảng của các items. Bạn có thể làm như vậy bằng cách tạo ra một `Illuminate\Pagination\Paginator` hoặc `Illuminate\Pagination\LengthAwarePaginator` instance tùy thuộc vào yêu cầu của bạn.
`Paginator` class  không cần phải biết tổng số các items trong tập kết quả; tuy nhiên, vì điều này, class không có phương pháp để lấy ra các chỉ mục index của trang cuối. `LengthAwarePaginator ` chấp nhận hầu hết các đối số tương tự như Paginator; tuy nhiên, nó đòi hỏi tổng số các items trong tập kết quả.
Nói cách khác, `Paginator` tương ứng với phương thức `simplePaginate` trên query builder và Eloquent, trong khi `LengthAwarePaginator` tương ứng với phương thức `paginate`.
Khi tự tạo một paginator instance, bạn nên tự 'slice' hay chia ra thành các mảng kết quả để paginator. Nếu bạn chưa chắc chắn có thể tìm hiểu [`array_slice` PHP function](https://secure.php.net/manual/en/function.array-slice.php)
# Displaying Pagination Results
Khi gọi phương thức `paginate`, bạn sẽ nhận được một instance của `Illuminate\Pagination\LengthAwarePaginator`. Khi gọi phương thức `simplePaginate`, bạn sẽ nhận được một instance của `Illuminate \ Pagination \ Paginator`. Các đối tượng này cung cấp một số phương pháp mô tả tập kết quả. Ngoài các phương pháp trợ giúp này, các paginator instance là các vòng lặp và có thể được lặp lại như một mảng. Vì vậy, một khi bạn đã lấy được kết quả, bạn có thể hiển thị kết quả và hiển thị các liên kết trang sử dụng `Blade`:
```
<div class="container">
    @foreach ($users as $user)
        {{ $user->name }}
    @endforeach
</div>

{{ $users->links() }}
```
Phương thức `links` sẽ render liên kết đến phần còn lại của trang trong tập kết quả.
Mỗi liên kết này sẽ chứa biến `page` trong chuỗi truy vấn. Hãy nhớ rằng HTML được tạo ra bởi phương thức `links` tương thích với Bootstrap CSS framework.
### Customizing The Paginator URI
Phương thức `withPath` cho phép bạn tùy chỉnh URI được sử dụng bởi paginator khi tạo các liên kết. Ví dụ: nếu bạn muốn paginator tạo liên kết như `http://example.com/custom/url?page=N` bạn nên pass `custom / url` với phương thức `withPath`:
```
Route::get('users', function () {
    $users = App\User::paginate(15);

    $users->withPath('custom/url');

    //
});
```
### Appending To Pagination Links
Bạn có thể nối với chuỗi truy vấn các liên kết phân trang sử dụng phương thức `append`. Ví dụ để append` sort=votes` cho mỗi liên kết pagination, bạn nên thực hiện call `appends` như sau:
```
{{ $users->appends(['sort' => 'votes'])->links() }}
```
Nếu bạn muốn nối "hash fragment" vào URL của paginator, bạn có thể sử dụng phương pháp `fragment`. Ví dụ: để nối thêm #foo vào cuối mỗi liên kết phân trang, hãy thức hiện call phương thức `fragment` như sau:
```
{{ $users->fragment('foo')->links() }}
```
## Converting Results To JSON
Classes kết quả theo thứ tự Laravel paginator `Illuminate\Contracts\Support\Jsonable` Interface contract và expose phương thức` toJson`, do đó nó rất dễ dàng để chuyển đổi các kết quả pagination của bạn sang `JSON`. Bạn cũng có thể chuyển đổi một paginator instance sang JSON bằng cách trả về nó từ route hoặc collection action:
```
Route::get('users', function () {
    return App\User::paginate();
});
```
Form JSON từ paginator sẽ bao gồm thông tin meta như `total`, `current_page`, `last_page`, và nhiều hơn nữa. Các đối tượng kết quả thực tế sẽ có sẵn thông qua `key` data trong mảng JSON. Dưới đây là một ví dụ về JSON được tạo ra bằng cách trả về một paginator instance từ một route:
```
{
   "total": 50,
   "per_page": 15,
   "current_page": 1,
   "last_page": 4,
   "first_page_url": "http://laravel.app?page=1",
   "last_page_url": "http://laravel.app?page=4",
   "next_page_url": "http://laravel.app?page=2",
   "prev_page_url": null,
   "path": "http://laravel.app",
   "from": 1,
   "to": 15,
   "data":[
        {
            // Result Object
        },
        {
            // Result Object
        }
   ]
}
```
# Customizing The Pagination View
Theo mặc định, views được render để hiển thị các liên kết pagination tương thích với Bootstrap CSS framework. Tuy nhiên, nếu bạn không sử dụng Bootstrap, bạn có thể tự do định nghĩa các chế độ xem của riêng mình để hiển thị các liên kết này. Khi gọi phương thức `links` trên một paginator instance, truyền view name là đối số đầu tiên của phương thức:
```
{{ $paginator->links('view.name') }}

// Passing data to the view...
{{ $paginator->links('view.name', ['foo' => 'bar']) }}
```
Tuy nhiên, cách đơn giản nhất để tùy chỉnh giao diện phân trang là bằng cách export chúng vào thư mục `resources/views/vendor `bằng cách sử dụng lệnh `vendor: publish`:
```
php artisan vendor:publish --tag=laravel-pagination
```
Lệnh này sẽ đặt views trong thư mục` resources / views / vendor / pagination`. Tệp `bootstrap-4.blade.php` trong thư mục này tương ứng với chế độ view phân trang mặc định. Bạn có thể chỉnh sửa tệp này để sửa đổi HTML phân trang.

Nếu bạn muốn định nghĩa một tệp tin khác làm view pagination mặc định, bạn nên sử dụng các `defaultView` và `defaultSimpleView ` của paginator trong `AppServiceProvider`:
```
use Illuminate\Pagination\Paginator;

public function boot()
{
    Paginator::defaultView('pagination::view');

    Paginator::defaultSimpleView('pagination::view');
}
```
# Paginator Instance Methods
Mỗi paginator instance cung cấp thông tin bổ sung pagination thông qua các phương thức sau đây:
* `$results->count()`
* `$results->currentPage()`
*` $results->firstItem()`
* `$results->hasMorePages()`
*` $results->lastItem()`
* `$results->lastPage() (Not available when using simplePaginate)`
* `$results->nextPageUrl()`
* `$results->perPage()`
* `$results->previousPageUrl()`
* `$results->total() (Not available when using simplePaginate)`
* `$results->url($page)`
# Tài liệu tham khảo
https://laravel.com/docs/5.6/pagination#converting-results-to-json