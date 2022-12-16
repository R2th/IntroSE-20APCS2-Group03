Rất vui được gặp lại các bạn trong series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)". Trong tập ngày hôm nay, chúng ta sẽ cùng nhau tìm hiểu về một component phổ biến trong Laravel, đó chính là "Validation". 

# I. Giới thiệu (Introduction)
Laravel cung cấp một số cách tiếp cận khác nhau để xác thực dữ liệu đến ứng dụng của chúng ta. Mặc định, lớp base controller `App\Http\Controllers\Controller` sử dụng một lớp trait `ValidatesRequests`, điều này cung cấp một số method thuận tiện để xác thực các HTTP request với những quy tắc xác thực (validation rule) mạnh mẽ.

# II. Bắt đầu nhanh validation (Validation quickstart)
Để học về các tính năng xác thực mạnh mẽ của Laravel, hãy xem xét qua ví dụ đầy đủ bên dưới, bao gồm xác thực form và hiển thị lỗi về người dùng.

## 1. Định nghĩa route (Defining the route)
Đầu tiên, chúng ta giả sử đăng ký các route sau trong file `routes/web.php`.

```PHP:routes/web.php
Route::get('post/create', 'PostController@create');

Route::post('post', 'PostController@store');
```

Route `GET` sẽ hiển thị form để người dụng tạo một bài viết mới, trong khi đó route `POST` sẽ nhận request gửi đến từ người dùng và lưu trữ vào database.

## 2. Khởi tạo controller (Creating the controller)
Bằng lệnh Atisan đơn giản, ta có thể khởi tạo controller `PostController` với nội dung như sau:

```PHP:app/Http/Controllers/PostController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    public function create()
    {
        return view('create_post');
    }

    public function store(Request $request)
    {
        // Validate...
    }
}
```

Như bạn thấy, mình đã định nghĩa hai method `create` và `store` tương ứng với hai route ở trên. Tại method `store` tạm thời ta sẽ để trống, lát ta sẽ quay lại viết validation logic sau.

## 3. Khởi tại view (Creating the view)
Theo như ở trên, tiếp theo chúng ta sẽ tạo blade view `create_post`, bạn có thể viết nội dung như sau:

```PHP:resources/views/create_post.blade.php
<h1>Create new post</h1>
<form action="/post" method="POST">
    @csrf

    <div>
        <p>Title</p>
        <input type="text" name="title">
    </div>
    <div>
        <p>Body</p>
        <textarea name="body" cols="30" rows="10"></textarea>
    </div>
    <br>
    <div>
        <button type="submit">Create</button>
    </div>
</form>
```

Bạn có thể truy cập route `GET /post/create` để xem kết quả.

![](https://images.viblo.asia/5308e8b3-f6b8-4d43-bcad-41ccf5e58265.JPG)

## 4. Viết validation logic (Writing the validation logic)
Bây giờ chúng ta đã sẵn sàng viết validation logic trong method `store` của controller `PostController` rồi. Để làm điều này, chúng ta sẽ sử dụng method `validate` được cung cấp bởi `Illuminate\Http\Request` object. Nếu vượt qua xác thực, các dòng code tiếp theo của bạn sẽ được thực thi bình thường; còn nếu không, một lỗi ngoại lệ sẽ được đưa ra và lỗi phản hồi phù hợp sẽ được trả về phái người dùng. Trong trường hợp sử dụng HTTP request, một redirect response sẽ được khởi tạo, trong khi một json response sẽ được gửi về nếu sử dụng AJAX request.

```PHP:app/Http/Controllers/PostController.php
public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|max:100',
        'body' => 'required|min:50',
    ]);

    // The post is valid...
}
```

Như bạn thấy, mình đã truyền các rule validation vào bên trong method `validate`. Bây giờ mình sẽ giải thích đơn giản.

Sau khi request được gửi đến, dữ liệu sẽ được truyền vào method `validate`, nó sẽ lọc các request có tên trùng với tên các rule validation đã liệt kê trước đó. Trong trường hợp này là request `title` và `body`. Nếu tồn tại nó sẽ tiến hành xác thực, còn không thì sẽ bỏ qua.

Đối với request `title` mình sẽ xác thực hai rule đó là `required` và `max:100`, mỗi rule sẽ ngăn cách nhau bởi ký tự `|`. Với rule `required`, bắt buộc trường `title` phải có trong request và không được bỏ trống. Còn với rule `max:100`, sẽ giới hạn độ dài của trường `title`. Các rule này sẽ được xác thực từ trái sang phải.

Tương tự với trường `body`, ta cũng kiểm tra rule `required`, nhưng với rule `min:50` sẽ bắt buộc độ dài của trường `body` phải lớn hơn hoặc bằng 50.

### a. Dừng lại khi xác thực đầu tiên thất bại (Stopping on first validation failure)
Thỉnh thoảng bạn muốn dừng lại việc xác thực rule nếu như thất bại ở rule đầu tiên trong một trường nào đó. Bạn có thể khai báo rule `bail` như thế này:

```PHP:app/Http/Controllers/PostController.php
$validatedData = $request->validate([
    'title' => 'bail|required|max:100',
    'body' => 'required|min:50',
]);
```
Như vậy ta có thể hiểu rằng khi trường `title` không tồn tại hoặc trống trong request gửi đến, thì dừng ngay việc validate trường này và chuyển sang trường `body` kế tiếp, tức là rule `max:100` sẽ không được xác thực. Việc này sẽ giúp ta giảm thiểu thời gian xác thực hơn.

### b. Lưu ý về các thuộc tính lồng nhau (A note on nested attributes)
Thoát ra ví dụ một chút, giả sử HTTP request của bạn có chứa các tham số lồng nhau, bạn có thể chỉ định chúng trong rule validation với ký tự `.`. Chẳng hạn:

```PHP
$request->validate([
    'author.name' => 'required',
    'author.description' => 'required',
]);
```

## 5. Hiển thị lỗi xác thực (Displaying the validation error)
Vậy, điều gì sẽ xảy ra nếu một trong các trường request không vượt qua rule validation? Như đã đề cập ở trước, Laravel sẽ tự động chuyển hướng người dùng về vị trí trước, tất cả các lỗi xác thực (validation error) sẽ được flash vào session.

Một lần nữa hãy nhớ, bạn không cần phải truyền bất kỳ dữ liệu nào vào view để có thể hiển thị các validation error. Bởi vì trước khi render view, Laravel sẽ kiểm tra xem có tồn tại validation error nào trong session không. Nếu có, một biến `$errors` sẽ được khởi tạo từ lớp `Illuminate\Support\MessageBag` cho phép ta tham chiếu tới các validation error.

> Biến `$errors` được gửi đến view thông qua middleware `Illuminate\View\Middleware\ShareErrorsFromSession`, nó được cung cấp bởi nhóm middleware `web`. Điều này cho phép bạn có thể thoải mái giả định rằng `$errors` luôn xác định và có thể an toàn sử dụng.

Vậy, trong ví dụ của chúng ta, người dùng sẽ được chuyển hướng đến controller action `create` khi thất bại trong validation, từ đó có thể hiển thị được validation error. Bạn chỉ cần thêm đoạn code này ở phía trên đầu của nội dung blade view `create_post`:

```PHP:resources/views/create_post.blade.php
@if ($errors->any())
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
@endif

<h1>Create new post</h1>

// ...
```

Quan sát đoạn code trên, mình đã sử dụng method `any` từ object `$errors` để kiểm tra xem có tồn tại validation error nào không. Nếu có tồn tại thì mình sẽ dùng vòng lặp để in tất cả các lỗi có được thông qua method `all`.

Bây giờ các bạn lưu lại, chạy server và thử click nút "Create" mà không nhập bất kỳ dữ liệu nào xem. Kết quả của chúng ta sẽ là:

![](https://images.viblo.asia/a0074046-9dd3-44b8-8d7e-034680a62646.JPG)

Mặc định Laravel sẽ tự động tạo thông báo lỗi cho mỗi validation rule. Chắc bạn đang suy nghĩ là làm sao mà thay đổi mấy câu thông báo này theo ý mình được đúng không? Cứ yên tâm, mình sẽ đề cập cách làm ở phần bên dưới. Bây giờ hãy quan sát kết quả, Laravel trả về hai thông báo lỗi đó là `title` và `body` đang để trống, lý do chúng ta chưa nhập gì cả. Tiếp theo hãy thử nhập dữ liệu như hình dưới:

![](https://images.viblo.asia/5195d9e2-a978-4d62-bafa-61ffcac9ebb1.JPG)

Giờ hãy thử đoán xem ta có còn bị lỗi nữa không? Câu trả lời là "Có", nếu không tin bạn có thể nhấn "Create" để kiểm chứng.

![](https://images.viblo.asia/97cb9eca-e775-4ad3-8960-1862b05341d8.JPG)

Đến đây chắc các bạn cũng hình dung ra lý do vì sao rồi đúng không? Chính là do rule `min:50` của trường `body`, nên với chuỗi `My body` quá ít ký tự không thể vượt qua validation.

Ngoài ra, bạn cũng có tách các thông báo lỗi này riêng cho từng input với thẻ `@error` trong blade template. Hãy nhìn vào ví dụ bên dưới:

```PHP:resources/views/create_post.php
<style>
    .error {
        color: red;
    }
</style>

<h1>Create new post</h1>
<form action="/post" method="POST">
    @csrf

    <div>
        <p @error('title') class="error" @enderror>
            Title
            @error('title')
                : <span>{{ $message }}</span>
            @enderror
        </p>
        <input type="text" name="title">
    </div>
    <div>
        <p @error('body') class="error" @enderror>
            Body
            @error('body')
                : <span>{{ $message }}</span>
            @enderror
        </p>
        <textarea name="body" cols="30" rows="10"></textarea>
    </div>
    <br>
    <div>
        <button type="submit">Create</button>
    </div>
</form>
```

Mình sử dụng cặp thẻ `@error` để bắt thông báo lỗi cho vị trí nào mà mình muốn, nếu tồn tại validation error thì mọi đoạn code giữa cặp thẻ sẽ được thực thi. Ngoài ra câu thông báo lỗi đầu tiên sẽ được lưu trong `$message`, được khai báo trong cặp thẻ `@error`.

## 6. Lưu ý về các trường tùy chọn (A note on optional fields)
Mặc định, Laralve liên kết với hai middleware `TrimStrings` và `ConvertEmptyStringsToNull`. Vì thế, nếu ứng dụng có những trường tùy chọn, tức là có thể trống cũng được, còn nếu không trống thì phải validate chẳng hạn, thì bạn có thể sử dụng rule `nullable` để thiết lập tùy chọn này.

```PHP
$request->validate([
    'birthday' => 'nullable|date',
]);
```

Với trường `birthday`, nếu bạn nhập dữ liệu thì nó sẽ đi qua rule `date` để kiểm tra xem có phải định dạng ngày tháng hay không; còn nếu bạn không nhập gì thì framework sẽ bỏ qua kiểm duyệt trường `birthday` này.

## 7. AJAX request & validation
Trong ví dụ trên, chúng ta đã sử dụng form truyền thống để gửi dữ liệu đến ứng dụng. Tuy nhiên, một vài ứng dụng cần gửi dữ liệu qua AJAX request. Như đã nói ở trên, khi sử dụng method `validate` trong AJAX request, Laravel sẽ không tạo redirect response mà sẽ trả về json response chứa các validation error kèm theo đó là mã status HTTP 422.

Các bạn có thể thay đổi nội dung blade view `create_post` như sau:

```PHP:resources/views/create_post.php
<h1>Create new post</h1>
<form action="/post" method="POST">
    @csrf

    <div>
        <p>Title</p>
        <input type="text" name="title">
    </div>
    <div>
        <p>Body</p>
        <textarea name="body" cols="30" rows="10"></textarea>
    </div>
    <br>
    <div>
        <button type="submit">Create</button>
    </div>
</form>

<script src="https://code.jquery.com/jquery.min.js"></script>
<script>
    $('form').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/post',
            type: 'POST',
            data: {
                _token: $('input[name=_token]').val(),
                title: $('input[name=title]').val(),
                body: $('textarea[name=body]').val()
            }, success: function(res) {
                //
            }, error: function(error) {
                console.log(error);
            }
        })
    })
</script>
```

Như các bạn thấy, mình đã thay đổi các form truyền thống sang gửi bằng AJAX request. Bây giờ hãy thử click "Create" với hai trường `title` và `body` để trống, bật console lên để xem kết quả.

![](https://images.viblo.asia/8948d7b0-8111-48f3-8905-b13b6246019c.png)

Laravel đã trả về một object error cùng với status code 422, việc của ta bây giờ chỉ tham chiếu object đó là lấy ra các thông báo lỗi cần thiết.

# III. Form request validation
Với form request validation, ứng dụng của chúng ta sẽ có tính tách rời về mặt validate cho các controller để dễ dàng quản lý hay bảo trì. Với nó, ta có thể thực hiện các validation phức tạp hơn, cần inject các dependency mà không phải gọi quá nhiều ở controller.

## 1. Tạo form request (Creating form request)
Ở phần này mình sẽ sử dụng lại đoạn code trong phần [AJAX request & validation](https://viblo.asia/p/tap-20-validation-laravel-GrLZDWAEKk0#_7-ajax-request--validation-10) cho blade view `create_post`.

Để tạo một form request, ta chỉ cần chạy lệnh Artisan sau:

> php artisan make:request StorePost

Lớp này sẽ tạo tự động ở thư mục `app/Http/Requests`, mặc định thì thư mục này không tồn tại, nó sẽ tự động tạo trong khi chạy lệnh Artisan trên.

![](https://images.viblo.asia/bef0a5ca-f1a4-47b5-aca0-0df79bb0b383.png)

Các bạn mở form request `App\Http\Requests\StorePost` vừa tạo lên, quan sát sẽ thấy trong file có chứa hai method `authorize` và `rules`. Trước tiên ta cần để ý đến method `rules`, tại đây ta sẽ trả về mảng chứa các valdation rule.

```PHP:app/Http/Requests/StorePost.php
public function rules()
{
    return [
        'title' => 'required|max:100',
        'body' => 'required|min:50'
    ];        
}
```

> **Lưu ý:** Bạn có thể type-hint bất kỳ class nào cần thiết cho việc xử lý mảng validation rule, service container sẽ tự động load cho bạn.

Vậy, làm sao để form request hoạt động? Việc của bạn rất đơn giản, chỉ cần type-hint tên class form request thay cho `Request` ở controller action. Mình sẽ lấy lại ví dụ trên để tích hợp form request vào, bạn chỉ cần mở file controller `App\Http\Controllers\PostController` và thay đổi nội dung bên trong method `store` như sau:

```PHP:app/Http/Controllers/PostController.php
use App\Http\Requests\StorePost;

public function store(StorePost $request)
{
    $validated = $request->validated();
}
```

Với method `validated` trong object form request, hệ thống validate dựa trên các rule validtion mà ta đã khai báo ở form request. Method này cũng tương tự như `validate` của object request, nó sẽ trả về redirect response nếu gửi request với form truyền thống, trong khi sẽ gửi json response nếu gửi request với AJAX.

## 2. Ủy quyền form request (Authorizing form request)

Các bạn hãy nhìn hình bên dưới:

![](https://images.viblo.asia/80cd8ee8-e47c-4fa7-8925-5e3fb9f49bd1.JPG)

Đây là kết quả mà sau khi mình inject form request vào method `store` và chạy lại. Thay vì mình nhận mã lỗi 422, thì bây giờ lại là 403 cùng với thông báo "This action is unauthorize". Điều này có nghĩa là hiện tai chúng ta chưa được ủy quyền để gửi form request này đến controller `store`. Đến đây chắc các bạn còn nhớ method `authorize` chứ? Đúng vậy, method này sẽ quyết định rằng ta được quyền gửi form request đến controller hay là không với boolean `true` hoặc `false`.

Với method này, ta có thể ứng dụng để kiểm tra xem tài nguyên có thuộc về sở hữu của người dùng trong việc chỉnh sửa hoặc xóa tài nguyên. Chẳng hạn hệ thống sẽ kiểm tra ID bài viết có thuộc về quyền sở hữu của tác giả hay không để tiếp tục thực thi chỉnh sửa hoặc xóa bài viết.

Mặc định khi tạo form request thì method `authorize` sẽ trả về giá trị `false`, tức là chưa được ủy quyền. Tại method `authorize`, bạn có thể code các đoạn xử lý logic nào đó, miễn là cuối cùng trả về một trong hai giá trị `true` hoặc `false`.

Quay lại ví dụ trên, ta chỉ cần thay đổi giá trị trả về của method `authorize` thành `true`.

```PHP:app/Http/Requests/StorePost.php
public function authorize()
{
    return true;
}
```

Một kết quả đầy mong đợi:

![](https://images.viblo.asia/ad628ad6-36e8-438c-a0f4-dd9682d1ccce.JPG)

> **Lưu ý:** Với method `authorize`, ta cũng dễ dàng type-hint một số dependency cần thiết cho việc xử lý logic để ủy quyền.
 
## 3. Adding After Hooks To Form Requests
Tiêu đề này khó dịch sát nghĩa nên mình sẽ để nguyên như Laravel Docs. Việc này sẽ giống như bạn có thể đính kèm một callback sau khi việc validation hoàn tất. Để làm được nó, bạn chỉ cần khai báo method `withValidator` trong form request với nội dung sau:

```PHP
public function withValidator($validator)
{
    $validator->after(function ($validator) {
        // something
    }
}
```

hoặc bạn có thể lồng một câu điều kiện nào đó:

```PHP
protected function isSomeThing(Dependency $object)
{
    //
}

public function withValidator($validator)
{
    $validator->after(function ($validator) {
        if ($this->isSomeThing()) {
            // something...
        }
    }
}
```

Chẳng hạn với ví dụ trên, mình sẽ thêm method `withValidator` cho form request `StorePost` như sau:

```PHP:app/Http/Requests/StorePost.php
public function withValidator($validator)
{
    $validator->after(function ($validator) {
        $validator->errors()->add('field', 'Something is wrong with this field!']
    }
}
```

Và đây là kết quả:

![](https://images.viblo.asia/13b0abe2-5c10-4c22-93b6-ddf5bf2f74ce.JPG)

## 4. Tùy chỉnh thông báo lỗi (Customizing the error message)
Bạn có thể tùy chỉnh thông báo lỗi bằng method `messages` trong form request. Method này sẽ trả về mảng thuộc tính/rule và các thông báo lỗi tương ứng. Chẳng hạn với ví dụ trên, mình sẽ định nghĩa thêm method `messages` cho form request `StorePost`.

```PHP:app/Http/Requests/StorePost.php
public function messages()
{
    return [
        'title.required' => 'Tiêu đề bài viết không được bỏ trống',
        'body.required' => 'Nội dung bài viết không được bỏ trống'
    ];
}
```

Việc này thật sự không quá khó khăn, bạn chỉ cần chú ý đến các key của mảng. Chúng ta sẽ sử dụng cú pháp `name_field.name_rule` hoặc chỉ `name_rule` cho key. Ok, bây giờ hãy test xem nào.

![](https://images.viblo.asia/9808ea8c-28f3-4935-8825-93984db10036.JPG)

Nếu như một rule có cấu trúc thông báo lỗi giống nhau cho tất cả request thì bạn có thể cân nhắc sử dụng key `name_rule`.

```PHP
public function messages()
{
    return [
        'required' => ':attribute không được bỏ trống'
    ];
}
```

Ta sẽ thu được kết quả:

![](https://images.viblo.asia/41e0131c-3c9c-49cb-aba3-935d7aab869e.JPG)

> **Lưu ý:** Các tùy chỉnh này chỉ có hiệu lực trong phạm vi một form request nhất định.

## 5. Tùy chỉnh thuộc tính validation (Customizing the validation attribute)
Nhìn kết quả trên khá ok nhưng các bạn sẽ cảm thấy không chuyên nghiệp cho lắm, vì `:attribute` mặc định sẽ lấy name của request được gửi đến để làm thông báo lỗi. Nhưng Laravel đã cung cấp cho chúng ta method `attributes` để thay đổi thiết lập đó.

```PHP
public function attributes()
{
    return [
        'name_field' => 'Label field',
        // ...
    ];
}
```

Áp dụng cho ví dụ trên, các bạn chỉ việc định nghĩa thêm method `attributes` như sau:

```PHP:app/Http/Requests/StorePost.php
public function attributes()
{
    return [
        'title' => 'Tiêu đề bài viết',
        'body' => 'Nội dung bài viết'
    ];
}
```

Một kết quả không thể tốt hơn được nữa:

![](https://images.viblo.asia/fbd9b334-7536-45a5-b3e3-8e6183aa273b.JPG)

> **Lưu ý:** Các tùy chỉnh này chỉ có hiệu lực trong phạm vi một form request nhất định.
 
# IV. Tạo trình validation thủ công (Manually creating validator)
Nếu bạn không muốn sử dụng method `validate` của request, bạn có thể tạo một trình validation thủ công sử dụng `Validator` facade. Với method `make` trên facade, nó sẽ tạo một lớp validator.

Chẳng hạn:

```PHP
use Illuminate\Support\Facades\Validator;

public function store(Request $request)
{
    $validator = Validator::make($input, $rules);
    
    if ($validator->fails()) {
        // Khởi tạo response thủ công
    }
}
```

Tại method `Validator::make`:
* Tham số đầu tiên là mảng các request cần validate. 
* Tham số thứ hai là mảng validation rule.

Khác với method `validate` thì `Validator::make` chỉ thực hiện validation nhưng không tự động tạo response để trả về cho người dùng. Vì vậy chúng ta sẽ phải tự khai báo thủ công. Để kiểm tra trạng thái validation ta sử dụng method `fails` từ object trả về của `Validator::make`. Từ đó ta thực hiện khởi tạo response, bạn có thể sử dụng hai cách để trả về response:
1. Redirect response

    Cách này sử dụng khi gửi request qua form truyền thống. Chúng ta có thể sử dụng method `withErrors` với tham số là `$validator` để flash các thông báo lỗi tới `$errors` của blade template. Ngoài ra bạn cũng có thể truyền một object `MessageBag` hoặc PHP array vào method `withErrors`.
    ```PHP
    return back()->withErrors($validator);
    ```
    
    Bạn có thể thêm method `withInput` phía sau để flash input.
    
    ```PHP
    return back()->withErrors($validator)->withInput();
    ```
2. JSON response

    Nếu ứng dụng của bạn gửi bằng AJAX thì có thể sử dụng cách này, nhưng ở đây, để lấy các thông báo lỗi từ `$validtor`, ta phải sử dụng method `errors`.
    ```PHP
    return response()->json($validator->errors(), 422);
    ```
    
Bây giờ bạn có thể áp dụng nó cho ví dụ ở trên. Mình sẽ thử gửi request với AJAX nhé.

Với blade view `create_post` thì mình sẽ lấy lại đoạn code phần [AJAX request & validation](https://viblo.asia/p/tap-20-validation-laravel-GrLZDWAEKk0#_7-ajax-request--validation-10).

Tại method `store` trong controller `App\Http\Controllers\PostController` các bạn code như sau:

```PHP:app/Http/Controllers/PostController.php
use Illuminate\Support\Facades\Validator;

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'title' => 'required|max:100',
        'body => 'required|min:50'
    ]);
    
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }
}
```

Và đây là kết quả chúng ta thu được:

![](https://images.viblo.asia/08e9d38f-4ef7-4a4d-a9f0-aa0643f33840.JPG)

## 1. Tự động chuyển hướng (Automatic redirection)
Nếu như bạn đang khởi tạo một validator thủ công nhưng vẫn muốn sử dụng lợi ích tự động chuyển hướng hoặc trả về JSON response của method `validate` thì có thể kết nối thêm method `validate` sau lớp khởi tạo trả về từ `Validator::make`.

```PHP
Validator::make($input, $rules)->validate();
```

## 2. Đặt tên cho các "túi" lỗi (Named error bags)
Nếu như bạn có nhiều form trên một trang đơn, bạn sẽ muốn đặt tên cho từng lỗi của một form nhất định, từ đó giúp bạn dễ dàng lấy nó từ blade template. Để làm việc này rất đơn giản, bạn chỉ cần việc truyền tham số thứ hai là tên mà bạn cần đặt cho "túi" lỗi tại method `withErrors`.

```PHP
withErrors($validator, 'name_error_bag')
```

Bạn có thể truy cập "túi" lỗi ấy tại blade view như sau:

```PHP
$errors->name_error_bag->something();
```

Về một số method để thao tác với "túi" lỗi, mình sẽ ói ở phần bên dưới.

## 3. After validation hook
Validator cũng cho phép chúng ta thêm after validation hook, bạn cần thực hiện theo thứ sau để có thể hoạt động nó:

```PHP
$validator = Validator::make(...);

$validtor->after(function($validator) {
    //
});

if ($validator->fails()) {
    //
}
```

# V. Làm việc với thông báo lỗi (Working with error message)
Sau khi gọi method `errors` từ lớp khởi tạo `Validator`, bạn sẽ nhận một lớp khởi tạo `Iluminate\Support\MessageBag`, lớp này cung cấp nhiều method để làm việc với thông báo lỗi một cách thuận tiện. Biến `$errors` được tạo tự động đến tất cả các view cũng là một lớp khởi tạo `MessageBag`.

## 1. Lấy thông báo lỗi đầu tiên của một trường (Retrieving the first error message for a field)

Chúng ta sẽ sử dụng method `first` với tham số là tên input.

```PHP
$errors = $validator->errors();

echo $errors->first('name_input');
```

## 2. Lấy tất cả thông báo lỗi của một trường (Retrieving all error messages for a field)
Để lấy tất cả thông báo lỗi của một trường bạn có thể sử dụng method `get`.

```PHP
foreach ($errors->get('name_input') as $message) {
    //
}
```

Nếu như bạn validate một mảng input, bạn có thể nhận tất cả thông báo lỗi của mỗi phần tử trong mảng bằng cách sử dụng ký hiệu `*`.

```PHP
foreach ($errors->get('files.*') as $message) {
    //
}
```

## 3. Lấy tất cả thông báo lỗi của tất cả trường (Retrieving all error messages for all fields)
Để làm được điều này, ta chỉ cần gọi method `all`.

```PHP
foreach ($errors->all() as $message) {
    //
}
```

## 4. Kiểm tra thông báo lỗi có tồn tại của một trường (Checking if an message error exists for a field)
Bạn có thể sử dụng method `has` với tham số là tên input cần kiểm tra.

```PHP
if ($errors->has('name_input') {
    //
}
```

> **Lứu ý:** Các method tren có thể áp dụng tại `$errors` trong blade template.

## 5. Tùy chỉnh thông báo lỗi (Customizing error message)
Nếu cần thiết, bạn có thể thay đổi các thông báo lỗi mặc định. Có nhiều cách để làm điều này. Đầu tiên bạn có thể truyền các thông báo lỗi tại tham số thứ ba của method `Validator::make`.

```PHP
$messages = [
    'required' => ':attribute không được bỏ trống.'
];

$validator = Validator::make($input, $rules, $messages);
```

Trong ví dụ trên, từ khóa `:attribute` sẽ được thay thế bằng tên thực của input trong validation. Ngoài ra còn có một số từ khóa khác tương ứng với mỗi rule, bạn có thể mở file `resources/lang/en/validation.php` để tham khảo. Chẳng hạn:

```PHP:resources/lang/en/validation.php
// ...
'required_without_all' => 'The :attribute field is required when none of :values are present.',
'same' => 'The :attribute and :other must match.',
// ...
```    

> **Lưu ý:** Với các từ khóa thay thế, nếu tên input có dạng `name_input` thì sau khi tạo thông báo tùy chỉnh sẽ đổi thành `name input`.

### a. Chỉ định một thông báo tùy chỉnh cho một thuộc tính nhất định (Specifying a custom message for a given field)
Việc này tương tự với việc định nghĩa method `messages` trong form request, bạn có thể sử dụng cú pháp key `name_field.name_rule` để thay đổi thông báo mặc định.

```PHP
$messages = [
    'title.required' => 'Tiêu đề bài viết không được bỏ trống.'
];
```

### b. Chỉ định thông báo tùy chỉnh trong tệp ngôn ngữ (Specifying custom message in language file)
Nếu ứng dụng của bạn có nhiều validator có cùng chung một thông báo tùy chỉnh, nhưng việc khai báo ở từng chỗ như vây sẽ rất tốn thời gian và cực kỳ khó khăn trong việc thay đổi. Bạn có thể khai báo các thông báo tùy chỉnh của mình trong file `resources/lang/xx/validation.php` tại mảng `custom`.

```PHP:resources/lang/xx/validation.php
'custom' => [
    'attribute-name' => [
        'rule-name' => 'custom-message',
    ],
],
```

`xx` ở đây chính là thư mục chứa các file ngôn ngữ của ứng dụng, mặc định Laravel khởi tạo thư mục `en`. Nếu muốn thay đổi mặc định này, bạn có thể tạo thư mục `resources/lang/vi` chẳng hạn, sau đó copy toàn bộ các file ngôn ngữ có trong thư mục `en` qua thư mục vừa khởi tạo. Việc của bạn giờ rất đơn giản, chỉ việc chỉnh sửa các thông báo lỗi tiếng Anh thành tiếng Việt, chú ý giữ nguyên các từ khóa thay thế như `:attribute`, `:other`... Cuối cùng, ta chỉ việc thay đổi config tại `config/app.php`:

```PHP:config/app.php
'locale' => 'vi',
```

Quay trở lại bài, để áp dụng cho ví dụ trên, ta có thể làm như sau:

```PHP:resources/lang/xx/validation.php
'custom' => [
    'title' => [
        'required' => 'Tiêu đề bài viết không được bỏ trống.'
    ],
],
```

Như vậy ta không cần phải khai báo lại ở trình validator nữa.

### c. Chỉ định thuộc tính tùy chỉnh trong tệp ngôn ngữ (Specifying custom attribute in language file)
Cũng giống như method `attributes` trong form request, ta cũng có thể thay thế các tên input thô thành các label linh động, dễ hiểu trong thông báo tùy chỉnh.

```PHP:resources/lang/xx/validation.php
'attributes' => [
    'email' => 'email address',
],
```


### d. Chỉ định giá trị tùy chỉnh trong tệp ngôn ngữ (Specifying custom value in language file)
Thỉnh thoảng bạn sẽ cần thay đổi giá trị của `:value` thay thế các giá trị thô. Chẳng hạn ứng dụng của chúng ta có trang thanh toán. Yêu cầu là nếu người dùng chọn hình thức thanh toán là thẻ tín dụng thì bắt buộc phải nhập số thẻ tín dụng, còn nếu chọn hình thức thanh toán khi nhận hàng thì không cần.

Đầu tiên mình sẽ khai báo hai route:

```PHP:routes/web.php
Route::get('payment', 'PaymentController@show');

Route::post('payment', 'PaymentController@pay');
```

Tiếp theo là khởi tạo blade view `payment` với nội dung như sau:

```PHP:resources/views/payment.blade.php
<h1>Payment</h1>

<form action="/payment" method="POST">
    @csrf 

    {{-- Hiển thị thông báo lỗi --}}
    @if ($errors->any()) 
        <ul>
            @foreach ($errors->all() as $message) 
                <li>{{ $message }}</li>
            @endforeach
        </ul>
    @endif

    <div>
        <p>Payment type</p>
        <select name="payment_type">
            <option value="cc">Credit card</option>
            <option value="od">On delivery</option>
        </select>
    </div>

    <div>
        <p>Credit card number (optional)</p>
        <input type="text" name="credit_card_number">    
    </div>    

    <br>

    <div>
        <button type="submit">Done</button>
    </div>
</form>
```

Đây là giao diện trang thanh toán của chúng ta:

![](https://images.viblo.asia/cd550a07-4e65-4d76-9d1a-84035d6e4efb.JPG)

Cuối cùng ta sẽ khởi tạo controller `PaymentController` với lệnh Artisan. Sau đó khai báo hai method `show` và `pay` như sau:

```PHP
public function show()
{
    return view('payment');
}

public function pay(Request $request)
{
    $request->validate([
        'credit_card_number' => 'required_if:payment_type,cc'
    ]);
    
    return 'Payment success!';
}
```

Hãy chú ý tại rule `required_if`, nó có tác dụng sẽ bật kiểm duyệt require của một input nào đó khi input kia có giá trị nhất định. Như trường hợp trên, input `credit_card_number` sẽ bật kiểm duyệt require nếu input `payment_type` có giá trị là `cc`.

Ok, giờ ta test xem nhé, mình sẽ để `payment_type` là `cc` và không nhập dữ liệu cho `credit_number_card`.

![](https://images.viblo.asia/5efdc8ed-17be-4eb7-baa4-6895d43fabf0.JPG)

Nó xuất ra một câu thống báo lỗi theo cú pháp của `required_if` được khai báo trong file ngôn ngữ `resources/lang/en/validation.php`:

```PHP:resources/lang/en/validation.php
'required_if' => 'The :attribute field is required when :other is :value.',
```

Chú ý đến từ khóa thay thế `:value` ở cuối, nó đã được replace bằng `cc`, ứng với giá trị của input `payment_type`. Nhưng nếu thông báo như vậy, người dùng sẽ không hiểu hết nội dung, chính vì vậy ta có thể thay thế một lần nữa `:value` này bằng cách khai báo thêm mảng `value` trong file validation language.

```PHP:resources/lang/en/validation.php
'values' => [
    'payment_type' => [
        'cc' => 'credit card'
    ],
],
```

Bây giờ hãy nhìn lại kết quả:

![](https://images.viblo.asia/20e51c25-2733-431e-a1e8-9b993eb0f744.JPG)

> **Lưu ý:** Mảng này chỉ áp dụng cho các từ khóa thay thế `:value`.

Còn tiếp...

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ