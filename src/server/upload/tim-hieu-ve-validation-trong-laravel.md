- Xin chào các bạn, 1 tháng đã trôi qua và hôm nay mình lại tiếp tục hì hục kiếm tìm chủ đề để viết bài.  Đối với một 1 trang web hiện nay hay bất kỳ application nào thì việc validate dữ liệu là 1 phần không thể thiếu. Chính vì thế, hôm nay mình chọn nó  làm chủ đề để giới thiệu tới các bạn, và cụ thể hơn đó là validate dữ liệu trên Framework Laravel.
#  Validation là gì và tại sao cần validate dữ liệu?
- Validation là một công cụ do Laravel cung cấp dùng để validate (kiểm tra) dữ liệu request được gửi lên trước khi nó được xử lý.
- Validate dữ liệu giúp chúng ta đảm bảo được tính đúng đắn của dữ liệu, bắt những lỗi nhập sai dữ liệu của người dùng, bảo vệ hệ thống khỏi nhiều dạng tấn công điển hình như SQL Injection. Khi đảm bảo được dữ liệu là đúng đắn, hệ thống sẽ hoạt động ổn định, ít xảy ra lỗi.
# Bắt đầu nhanh với Validation
- Để tìm hiểu về các tính năng xác thực mạnh mẽ của Laravel. Cùng xem 1 ví dụ đầy đủ về việc xác thực một form gửi lên và hiển thị thông báo lỗi cho người dùng nếu dữ liệu không đúng:
## B1: Tạo routes
- Đầu tiên, mở file `routes/web.php` lên và tạo 2 route sau:
```php
Route::get('post/create', 'PostController@create');

Route::post('post', 'PostController@store');
```
- Route `GET` sẽ hiển thị lên trang chứa form tạo mới 1 blog post và route `POST` sẽ lưu blog post đó vào database
##  Tạo Controller
- Tiếp theo,  tạo 1 file controller xử lý các route trên:
```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Show the form to create a new blog post.
     *
     * @return Response
     */
    public function create()
    {
        return view('post.create');
    }

    /**
     * Store a new blog post.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Validate and store the blog post...
    }
}
```
## Viết Validation Logic
- Ta sử dụng hàm `validate` được cung cấp bởi `Illuminate\Http\Request`. Nếu vượt qua được các validation rules, code của bạn sẽ tiếp tục được chạy, tuy nhiên nếu thất bại, một exception sẽ được bắn ra và hệ thống sẽ tự động trẻ về một error response cho user. 
- Dưới đây là một vài rules mình đã add vào để xác thực dữ liệu trong hàm store:
```php
/**
 * Store a new blog post.
 *
 * @param  Request  $request
 * @return Response
 */
public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);

    // The blog post is valid...
}
```
* Như bạn thấy, mình đã add một vài quy tắc xác thực cho dữ liệu gửi lên
    * `required`: Trường được xác nhận phải có mặt trong dữ liệu đầu vào và không trống.
    * `unique`: Giá trị của trường này là duy nhất trong bảng
    * `max`: Số lượng ký tự tối đa.
* Các validation rules cũng có thể được khai báo như 1 mảng thay vì  1 chuỗi như trên:
```php
$validatedData = $request->validate([
    'title' => ['required', 'unique:posts', 'max:255'],
    'body' => ['required'],
]);
```
- Nếu bạn muốn dừng chạy validate trên 1 phần tử ngay khi rule đầu tiên bị fail, hãy thêm rule `bail` :
```php
$request->validate([
    'title' => 'bail|required|unique:posts|max:255',
    'body' => 'required',
]);
```
## Hiển thị lỗi validation trả về
* Khi các parameters không vượt qua được các validation rules, Laravel sẽ tự động chuyển hướng người dùng quay lại. Tất cả các validation erors message sẽ tự động trả về kèm theo dưới dạng flash session.
* Như trong ví dụ trên, người dùng sẽ được chuyển hướng về trang tạo mới user khi validation thất bại và ta có thể show ra các error messages trong view như sau:
```html
<!-- /resources/views/post/create.blade.php -->

<h1>Create Post</h1>

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<!-- Create Post Form -->
```
## AJAX Requests & Validation
- Trong ví dụ này ta sử dụng cách truyền thống là sử dụng form để gửi dữ liệu lên hệ thống. Nếu ta sử dụng ajax requests để gửi dữ liệu, nếu validate thất bại, Laravel sẽ không chuyển hướng trang của người dùng mà thay vào đó sẽ trả về 1 chuỗi Json chứa tất cả các validation errors. Chuỗi Json này sẽ được gửi với 1 mã trạng thái HTTP 422.
# Form request validation
## Tạo form requests
- Form request thực chất là việc bạn tách riêng phần validation và phần code xử lý. Bạn sẽ tạo 1 file riêng phục vụ cho mục đích validate dữ liệu còn file controller sẽ chỉ chứa code xử lý. Làm như vậy sẽ giúp code của bạn phân chia rõ ràng, sạch sẽ và dễ đọc hơn.
- Để tạo 1 form request, bạn sử dụng câu lệnh command `make:request`, ví dụ:
```
$ php artisan make:request StoreBlogPost
```
* Chạy câu lệnh trên sẽ tự động sinh ra 1 file ở đường dẫn `app/Http/Requests`. Nếu đường dẫn này không tồn tại, nó sẽ tự động được tạo khi chạy câu lệnh `make:request`. Hãy thử thêm 1 vài validation rules vào hàm `rules()`:
```php
/**
 * Get the validation rules that apply to the request.
 *
 * @return array
 */
public function rules()
{
    return [
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ];
}
```
* Và sửa hàm `authorize()` return về `true` 
```php
/**
 * Determine if the user is authorized to make this request.
 *
 * @return bool
 */
public function authorize()
{
    return true;
}
```
* Sau đó gán lớp xác thực vào file controller:
```php
/**
 * Store the incoming blog post.
 *
 * @param  StoreBlogPost  $request
 * @return Response
 */
public function store(StoreBlogPost $request)
{
    // The incoming request is valid...
}
```
* Nhớ kèm theo name space của form request sử dụng vào controller
```php
use App\Http\Requests\StoreBlogPost
```
* Khi có request đến, dữ liệu request sẽ được chạy qua form request trước, nếu pass thì hàm controller mới được gọi.
## Tùy chỉnh các error messages
* Bạn có thể tùy chỉnh các error messages tự động trả về bơi form request bằng cách ghi đè bằng hàm `messages`. 
```php
/**
 * Get the error messages for the defined validation rules.
 *
 * @return array
 */
public function messages()
{
    return [
        'title.required' => 'A title is required',
        'body.required'  => 'A message is required',
    ];
}
```
# Validation rules
- Laravel cung cấp rất nhiều rules mạnh mẽ, tiện lợi hỗ trợ cho việc validate dữ liệu. Để xem tất cả các rules được cung cấp và cách dùng của chúng, các bạn có thể xem [tại đây](https://laravel.com/docs/6.x/validation#available-validation-rules). 
# Kết luận
* Để tìm hiểu kỹ hơn về phần này, các bạn có thể xem [tại đây](https://laravel.com/docs/6.x/validation)
* Mọi ý kiến đóng góp, phản hồi mọi người vui lòng để lại dưới phần bình luận để mình có thể sửa chữa và hoàn thiện bài viết hơn.
* Bài viết của mình đến đây là kết thúc, chúc các bạn áp dụng thành công cho project của mình.